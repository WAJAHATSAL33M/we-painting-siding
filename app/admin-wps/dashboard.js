'use client';

import DOMPurify from 'dompurify';
import { useCallback, useEffect, useRef, useState } from 'react';

const emptyPost = { title:'', slug:'', category:'', excerpt:'', seoTitle:'', image:'', alt:'', service:'', html:'', status:'draft' };
const statusOptions = ['new', 'in progress', 'closed'];
const controls = [
  ['bold','Bold','B'], ['italic','Italic','I'], ['underline','Underline','U'],
  ['insertUnorderedList','Bulleted list','• List'], ['insertOrderedList','Numbered list','1. List'],
  ['undo','Undo','↶'], ['redo','Redo','↷'],
];

const escape = value => value.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;');
const slugify = value => value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'').slice(0,150).replace(/-$/,'');
const articleHtml = post => post.html ?? post.sections?.map(section =>
  '<h2>' + escape(section.title) + '</h2>' + section.paragraphs.map(text => '<p>' + escape(text) + '</p>').join('')
).join('\n') ?? '';

async function api(data) {
  const response = await fetch('/api/admin-wps', data ? {
    method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify(data),
  } : { cache:'no-store' });
  const result = await response.json().catch(() => null);
  if (!response.ok || !result) throw new Error(result?.error || 'Could not complete the request.');
  return result;
}

function Editor({ post, onSave, onBack, busy }) {
  const [form,setForm] = useState(post);
  const [mode,setMode] = useState('visual');
  const [link,setLink] = useState('');
  const editor = useRef(null);
  const preview = useRef(null);
  const selection = useRef(null);
  const [html,setHtml] = useState(() => articleHtml(post));
  const update = (key,value) => setForm(current => ({...current,[key]:value}));
  useEffect(() => {
    const surface = mode === 'visual' ? editor.current : preview.current;
    if (surface && surface.innerHTML !== html) {
      surface.innerHTML = DOMPurify.sanitize(html, { USE_PROFILES: { html: true } });
    }
  },[mode,html]);
  function format(command,value) {
    editor.current?.focus();
    if (selection.current && editor.current?.contains(selection.current.commonAncestorContainer)) {
      const current = window.getSelection();
      current.removeAllRanges();
      current.addRange(selection.current);
    }
    document.execCommand(command,false,value);
    setHtml(editor.current?.innerHTML || '');
  }
  function rememberSelection() {
    const selected = window.getSelection();
    if (selected?.rangeCount && editor.current?.contains(selected.anchorNode)) {
      selection.current = selected.getRangeAt(0).cloneRange();
    }
  }
  function insertLink() {
    if (!/^(https?:\/\/|mailto:|tel:|\/(?!\/))/i.test(link)) return;
    format('createLink',link);
    setLink('');
  }
  const field = (label,key,placeholder) => <label>{label}<input value={form[key]} onChange={e=>update(key,e.target.value)} placeholder={placeholder}/></label>;
  return <form className="wps-edit" onSubmit={e=>e.preventDefault()}>
    <div className="wps-title"><div><button type="button" className="wps-back" onClick={onBack}>← All posts</button><h1>{post.id?'Edit post':'Add new post'}</h1></div>{post.id&&post.status==='published'&&<a className="wps-secondary" href={'/blog/'+post.slug} target="_blank" rel="noreferrer">View live post ↗</a>}</div>
    <div className="wps-editor-grid">
      <div className="wps-panel wps-writing">
        <label>Post title<input required value={form.title} onChange={e=>setForm(current=>({...current,title:e.target.value,slug:!post.id&&(!current.slug||current.slug===slugify(current.title))?slugify(e.target.value):current.slug}))} placeholder="Enter a title"/></label>
        {field('URL slug','slug','your-post-slug')}
        <div className="wps-tabs" aria-label="Editor mode">
          <button type="button" aria-pressed={mode==='visual'} onClick={()=>setMode('visual')}>Visual</button>
          <button type="button" aria-pressed={mode==='html'} onClick={()=>setMode('html')}>HTML</button>
          <button type="button" aria-pressed={mode==='preview'} onClick={()=>setMode('preview')}>Preview</button>
        </div>
        {mode==='visual'?<>
          <div className="wps-tools" aria-label="Text formatting">
            <select aria-label="Text style" value="" onMouseDown={rememberSelection} onChange={e=>format('formatBlock',e.target.value)}><option value="" disabled>Text style</option><option value="p">Paragraph</option><option value="h2">Heading 2</option><option value="h3">Heading 3</option><option value="blockquote">Quote</option><option value="pre">Code block</option></select>
            {controls.map(([command,label,text])=><button key={command} type="button" title={label} aria-label={label} onMouseDown={e=>{rememberSelection();e.preventDefault()}} onClick={()=>format(command)}>{text}</button>)}
            <input aria-label="Link URL" placeholder="Link URL" value={link} onChange={e=>setLink(e.target.value)}/><button type="button" onClick={insertLink} disabled={!link}>Add link</button>
          </div>
          <div className="wps-content" contentEditable suppressContentEditableWarning ref={editor} role="textbox" aria-label="Article content" aria-multiline="true" onMouseUp={rememberSelection} onKeyUp={rememberSelection} onInput={()=>setHtml(editor.current.innerHTML)} onPaste={event=>{event.preventDefault();document.execCommand('insertText',false,event.clipboardData.getData('text/plain'));setHtml(editor.current.innerHTML)}}/>
        </>:mode==='preview'?<div className="wps-content" aria-label="Article preview" ref={preview}/>:<textarea className="wps-code" aria-label="Article HTML" value={html} onChange={e=>setHtml(e.target.value)}/>}
        <label>Excerpt<textarea rows={3} value={form.excerpt} maxLength={500} onChange={e=>update('excerpt',e.target.value)}/></label>
      </div>
      <div className="wps-meta">
        <section className="wps-panel"><h2>Publish</h2><p><span className={'wps-badge '+form.status}>{form.status}</span></p>
          {post.status==='published'
            ? <><button type="button" className="wps-primary" disabled={busy} onClick={()=>onSave({...form,html,status:'published'})}>Update published post</button><button type="button" className="wps-secondary" disabled={busy} onClick={()=>onSave({...form,html,status:'draft'})}>Unpublish to draft</button></>
            : <><button type="button" className="wps-primary" disabled={busy} onClick={()=>onSave({...form,html,status:'published'})}>Publish post</button><button type="button" className="wps-secondary" disabled={busy} onClick={()=>onSave({...form,html,status:'draft'})}>Save draft</button></>}
        </section>
        <section className="wps-panel"><h2>Post details</h2>{field('Category','category','Interior Painting')}{field('SEO title','seoTitle','Defaults to the post title')}{field('Related service path','service','/interior-painting')}</section>
        <section className="wps-panel"><h2>Featured image</h2>{form.image.startsWith('/images/')&&<img src={form.image} alt={form.alt}/>}{field('Existing image path','image','/images/company/photo.webp')}{field('Image alt text','alt','Describe the image')}</section>
      </div>
    </div>
  </form>;
}

function Enquiry({ enquiry, photos, onSave, busy }) {
  const [status,setStatus] = useState(enquiry.status);
  const [notes,setNotes] = useState(enquiry.notes);
  return <section className="wps-panel wps-message">
    <div className="wps-title"><div><h2>Enquiry #{enquiry.id}</h2><a href={'mailto:'+enquiry.email}>{enquiry.email}</a></div><span className={'wps-badge '+enquiry.status}>{enquiry.status}</span></div>
    <p className="wps-muted">{enquiry.created_at} UTC · {enquiry.kind} · {enquiry.page}</p>
    <pre>{enquiry.details}</pre>
    {photos.length>0&&<div className="wps-photos">{photos.map(photo=><a className="wps-secondary" key={photo.id} href={'/api/admin-wps?photo='+photo.id}>{photo.name} ↓</a>)}</div>}
    <label>Status<select value={status} onChange={event=>setStatus(event.target.value)}>{statusOptions.map(value=><option key={value}>{value}</option>)}</select></label>
    <label>Internal notes<textarea rows={3} maxLength={5000} value={notes} onChange={event=>setNotes(event.target.value)}/></label>
    <button className="wps-primary" type="button" disabled={busy} onClick={()=>onSave({action:'update-enquiry',id:enquiry.id,status,notes})}>Save enquiry</button>
  </section>;
}

export default function Dashboard() {
  const [data,setData] = useState(null);
  const [panel,setPanel] = useState('overview');
  const [editing,setEditing] = useState(null);
  const [messageId,setMessageId] = useState(null);
  const [query,setQuery] = useState('');
  const [filter,setFilter] = useState('all');
  const [notice,setNotice] = useState('');
  const [error,setError] = useState('');
  const [busy,setBusy] = useState(false);
  const [refreshing,setRefreshing] = useState(false);
  const [limit,setLimit] = useState(20);
  const refresh = useCallback(async () => setData(await api()),[]);
  useEffect(()=>{refresh().catch(error=>setError(error.message))},[refresh]);

  function go(next) { window.scrollTo(0, 0); setLimit(20); setPanel(next); setEditing(null); setMessageId(null); setQuery(''); setFilter('all'); setNotice(''); setError(''); }
  function edit(post) { go('editor'); setEditing(post); }
  async function reloadDashboard() {
    setRefreshing(true);
    setError('');
    try { await refresh(); }
    catch (error) { setError(error.message); }
    finally { setRefreshing(false); }
  }

  async function mutate(payload, success) {
    setBusy(true); setError(''); setNotice('');
    try { const result=await api(payload); await refresh(); success?.(result); setNotice('Changes saved.'); }
    catch (error) { setError(error.message); }
    finally { setBusy(false); }
  }

  const posts=data?.posts || [];
  const enquiries=data?.enquiries || [];
  const selected=enquiries.find(message=>message.id===messageId);
  const search=query.toLowerCase().trim();
  const visiblePosts=posts.filter(post=>(filter==='all'||post.status===filter)&&[post.title,post.category,post.slug].some(value=>value.toLowerCase().includes(search)));
  const visibleEnquiries=enquiries.filter(message=>(filter==='all'||message.status===filter)&&[message.email,message.details,message.kind].some(value=>value.toLowerCase().includes(search)));
  return <div className="wps-admin">
    <aside className="wps-nav">
      <a className="wps-brand" href="/admin-wps"><span>W</span><div>We Paint Siding<small>Site administration</small></div></a>
      <nav aria-label="Administration">{[['overview','Overview','◈'],['enquiries','Enquiries','✉'],['posts','Blog posts','▤']].map(([value,label,icon])=><button key={value} aria-current={(panel===value||panel==='editor'&&value==='posts')?'page':undefined} onClick={()=>go(value)}><span aria-hidden="true">{icon}</span>{label}</button>)}</nav>
      <div className="wps-nav-footer">
        <a className="wps-site" href="/" target="_blank" rel="noreferrer">View website ↗</a>
        <form action="/api/admin-wps/session" method="post">
          <button className="wps-signout" type="submit" name="action" value="logout">Sign out</button>
        </form>
      </div>
    </aside>
    <main className="wps-main">
      <header className="wps-section-bar">
        <strong>{({overview:'Overview', enquiries:'Enquiries', posts:'Blog posts', editor:'Blog editor'})[panel]}</strong>
        <div className="wps-section-tools">
          {panel!=='editor'&&<button className="wps-secondary" type="button" disabled={busy||refreshing} onClick={reloadDashboard}>{refreshing?'Refreshing…':'Refresh'}</button>}
          {data&&panel!=='editor'&&<button className="wps-primary" type="button" onClick={()=>edit({...emptyPost})}>+ New post</button>}
        </div>
      </header>
      {notice&&<p role="status" className="wps-notice">{notice}</p>}{error&&<p role="alert" className="wps-error">{error}</p>}
      {!data&&!error&&<p role="status">Loading dashboard…</p>}
      {data&&panel==='overview'&&<>
        <div className="wps-hero"><div><h1>Site overview</h1><p>Manage painting enquiries and articles from one place.</p></div></div>
        <div className="wps-stats">
          {[['New enquiries',enquiries.filter(x=>x.status==='new').length,'enquiries'],['Published posts',posts.filter(x=>x.status==='published').length,'posts'],['Drafts',posts.filter(x=>x.status==='draft').length,'posts']].map(([label,count,target])=><button className="wps-panel" key={label} onClick={()=>{go(target);setFilter(label==='New enquiries'?'new':label==='Drafts'?'draft':'published')}}><span>{label}</span><strong>{count}</strong></button>)}
        </div>
        <div className="wps-overview-grid">
          <section className="wps-panel"><div className="wps-title"><h2>Recent enquiries</h2><button className="wps-back" onClick={()=>go('enquiries')}>View inbox →</button></div>{enquiries.length?enquiries.slice(0,5).map(item=><button className="wps-summary" key={item.id} onClick={()=>{go('enquiries');setMessageId(item.id)}}><strong>{item.email}</strong><span>{item.status}</span></button>):<p className="wps-muted">New submissions will appear here.</p>}</section>
          <section className="wps-panel"><div className="wps-title"><h2>Blog posts</h2><button className="wps-back" onClick={()=>go('posts')}>View posts →</button></div>{posts.length?posts.slice(0,5).map(post=><button key={post.id} className="wps-summary" onClick={()=>edit(post)}><strong>{post.title}</strong><span>{post.status}</span></button>):<p className="wps-muted">Create your first post.</p>}</section>
        </div>
      </>}
      {data&&panel==='posts'&&<>
        <header className="wps-title"><h1>Blog posts</h1></header>
        <div className="wps-panel">
          <div className="wps-filters"><input aria-label="Search posts" placeholder="Search posts" value={query} onChange={e=>{setQuery(e.target.value);setLimit(20)}}/><select aria-label="Publication status" value={filter} onChange={e=>{setFilter(e.target.value);setLimit(20)}}><option value="all">All statuses</option><option value="published">Published</option><option value="draft">Draft</option></select></div>
          <div className="wps-table"><table><thead><tr><th>Title</th><th>Category</th><th>Status</th><th>Actions</th></tr></thead><tbody>{visiblePosts.slice(0,limit).map(post=><tr key={post.id}><td><button className="wps-back" onClick={()=>edit(post)}>{post.title}</button><small>/blog/{post.slug}</small></td><td>{post.category||'—'}</td><td><span className={'wps-badge '+post.status}>{post.status}</span></td><td><button className="wps-danger" disabled={busy} onClick={()=>{if(window.confirm('Permanently delete this post?'))mutate({action:'delete-post',id:post.id})}}>Delete</button></td></tr>)}</tbody></table></div>
          {visiblePosts.length>limit&&<button type="button" className="wps-secondary wps-more" onClick={()=>setLimit(value=>value+20)}>Show more posts</button>}{!visiblePosts.length&&<p className="wps-muted">No matching posts.</p>}
        </div>
      </>}
      {data&&panel==='editor'&&editing&&<Editor key={editing.id||'new'} post={editing} onBack={()=>go('posts')} busy={busy} onSave={post=>mutate({action:'save-post',...post},result=>{setEditing(result);setPanel('posts')})}/>}
      {data&&panel==='enquiries'&&<>
        <header className="wps-title"><h1>Enquiries</h1></header>
        <div className="wps-inbox">
          <section className="wps-panel wps-inbox-list">
            <div className="wps-filters"><input aria-label="Search enquiries" placeholder="Search enquiries" value={query} onChange={e=>{setQuery(e.target.value);setLimit(20)}}/><select aria-label="Enquiry status" value={filter} onChange={e=>{setFilter(e.target.value);setLimit(20)}}><option value="all">All statuses</option>{statusOptions.map(value=><option key={value}>{value}</option>)}</select></div>
            {visibleEnquiries.slice(0,limit).map(item=><button className="wps-summary" aria-pressed={messageId===item.id} key={item.id} onClick={()=>setMessageId(item.id)}><strong>{item.email}</strong><span>{item.status}</span></button>)}
            {visibleEnquiries.length>limit&&<button type="button" className="wps-secondary wps-more" onClick={()=>setLimit(value=>value+20)}>Show more enquiries</button>}{!visibleEnquiries.length&&<p className="wps-muted">No matching enquiries.</p>}
          </section>
          {selected?<Enquiry key={selected.id} enquiry={selected} photos={data.photos.filter(photo=>photo.enquiry_id===selected.id)} busy={busy} onSave={mutate}/>:<section className="wps-panel wps-empty"><p>Select an enquiry to view its details and photos.</p></section>}
        </div>
      </>}
    </main>
  </div>;
}
