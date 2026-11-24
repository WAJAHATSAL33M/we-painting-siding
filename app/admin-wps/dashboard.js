'use client';

import DOMPurify from 'dompurify';
import { useCallback, useEffect, useRef, useState } from 'react';

const emptyPost = { title:'', slug:'', category:'', excerpt:'', seoTitle:'', seoDescription:'', image:'', alt:'', service:'', html:'', status:'draft' };
const statusOptions = ['new', 'in progress', 'closed'];
const controls = [
  ['bold','Bold','B'], ['italic','Italic','I'], ['underline','Underline','U'], ['strikeThrough','Strikethrough','S'],
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

function Editor({ post, onSave, onBack, busy, categories, tags }) {
  const [form,setForm] = useState(() => ({...emptyPost,...post}));
  const [mode,setMode] = useState('visual');
  const [link,setLink] = useState('');
  const [tagText,setTagText] = useState((post.tags ?? []).join(', '));
  const [inlineAlt,setInlineAlt] = useState('');
  const [selectedImage,setSelectedImage] = useState(null);
  const [mediaTarget,setMediaTarget] = useState('featured');
  const [uploading,setUploading] = useState(false);
  const [mediaError,setMediaError] = useState('');
  const uploadInput = useRef(null);
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
  async function upload(event) {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file) return;
    setMediaError('');
    setUploading(true);
    try {
      if (file.size > 8 * 1024 * 1024) throw new Error('Images must be no larger than 8 MB.');
      const response = await fetch('/api/admin-wps/media', {
        method: 'POST', headers: { 'Content-Type': file.type }, body: file,
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error);
      if (mediaTarget === 'featured') update('image', result.src);
      else {
        const img = document.createElement('img');
        img.setAttribute('src', result.src);
        img.alt = inlineAlt.trim();
        format('insertHTML', img.outerHTML);
        setInlineAlt('');
      }
    } catch (error) { setMediaError(error.message || 'The image could not be uploaded.'); }
    finally { setUploading(false); }
  }

  function save(status) {
    onSave({...form, html, status, tags:tagText.split(',').map(tag=>tag.trim()).filter(Boolean)});
  }

  const field = (label,key,placeholder) => <label>{label}<input value={form[key]} onChange={e=>update(key,e.target.value)} placeholder={placeholder}/></label>;
  return <form className="wps-edit" onSubmit={e=>e.preventDefault()}>
    <div className="wps-title"><div><button type="button" className="wps-back" onClick={onBack}>← All posts</button><h1>{post.id?'Edit post':'Add new post'}</h1></div>{post.id&&post.status==='published'&&<a className="wps-secondary" href={'/blog/'+post.slug} target="_blank" rel="noreferrer">View live post ↗</a>}</div>
    <input ref={uploadInput} type="file" accept="image/jpeg,image/png,image/webp" hidden onChange={upload}/>
    {mediaError&&<p role="alert" className="wps-error">{mediaError}</p>}
    <div className="wps-editor-grid">
      <div className="wps-panel wps-writing">
        <label>Post title<input required value={form.title} onChange={e=>setForm(current=>({...current,title:e.target.value,slug:!post.id&&(!current.slug||current.slug===slugify(current.title))?slugify(e.target.value):current.slug}))} placeholder="Enter a title"/></label>
        {field('URL slug','slug','your-post-slug')}
        <div className="wps-tabs" aria-label="Editor mode">
          <button type="button" aria-pressed={mode==='visual'} onClick={()=>setMode('visual')}>Visual</button>
          <button type="button" aria-pressed={mode==='html'} onClick={()=>{setSelectedImage(null);setMode('html')}}>HTML</button>
          <button type="button" aria-pressed={mode==='preview'} onClick={()=>{setSelectedImage(null);setMode('preview')}}>Preview</button>
        </div>
        {mode==='visual'?<>
          <div className="wps-tools" aria-label="Text formatting">
            <input aria-label="Inline image alt text" placeholder="Describe the image before uploading" value={inlineAlt} maxLength={250} onChange={e=>setInlineAlt(e.target.value)}/>
            <button type="button" disabled={!inlineAlt.trim()||uploading||busy} onMouseDown={rememberSelection} onClick={()=>{setMediaTarget('inline');uploadInput.current?.click()}}>Add image</button>
            {selectedImage&&<button type="button" disabled={!inlineAlt.trim()} onClick={()=>{
              if (editor.current?.contains(selectedImage)) {
                selectedImage.alt=inlineAlt.trim();
                setHtml(editor.current.innerHTML);
              }
              setSelectedImage(null);
              setInlineAlt('');
            }}>Update selected image alt text</button>}
            <select aria-label="Text style" value="" onMouseDown={rememberSelection} onChange={e=>format('formatBlock',e.target.value)}><option value="" disabled>Text style</option><option value="p">Paragraph</option><option value="h2">Heading 2</option><option value="h3">Heading 3</option><option value="blockquote">Quote</option><option value="pre">Code block</option></select>
            {controls.map(([command,label,text])=><button key={command} type="button" title={label} aria-label={label} onMouseDown={e=>{rememberSelection();e.preventDefault()}} onClick={()=>format(command)}>{text}</button>)}
            <input aria-label="Link URL" placeholder="Link URL" value={link} onChange={e=>setLink(e.target.value)}/><button type="button" onClick={insertLink} disabled={!link}>Add link</button>
          </div>
          <div className="wps-content" contentEditable suppressContentEditableWarning ref={editor} role="textbox" aria-label="Article content" aria-multiline="true" onClick={event=>{
            const image = event.target.tagName === 'IMG' ? event.target : null;
            setSelectedImage(image);
            if(image) setInlineAlt(image.alt);
          }} onMouseUp={rememberSelection} onKeyUp={rememberSelection} onInput={()=>setHtml(editor.current.innerHTML)} onPaste={event=>{event.preventDefault();document.execCommand('insertText',false,event.clipboardData.getData('text/plain'));setHtml(editor.current.innerHTML)}}/>
        </>:mode==='preview'?<div className="wps-content" aria-label="Article preview" ref={preview}/>:<textarea className="wps-code" aria-label="Article HTML" value={html} onChange={e=>setHtml(e.target.value)}/>}
        <label>Excerpt<textarea rows={3} value={form.excerpt} maxLength={500} onChange={e=>update('excerpt',e.target.value)}/></label>
      </div>
      <aside className="wps-meta" aria-label="Post settings">
        <section className="wps-panel"><h2>Publish</h2><p><span className={'wps-badge '+post.status}>{post.status}</span></p>
          {post.status==='published'
            ? <><button type="button" className="wps-primary" disabled={busy||uploading} onClick={()=>save('published')}>Update published post</button><button type="button" className="wps-secondary" disabled={busy||uploading} onClick={()=>save('draft')}>Unpublish to draft</button></>
            : <><button type="button" className="wps-primary" disabled={busy||uploading} onClick={()=>save('published')}>Publish post</button><button type="button" className="wps-secondary" disabled={busy||uploading} onClick={()=>save('draft')}>Save draft</button></>}
        </section>
        <section className="wps-panel"><h2>Post details</h2>
          <label>Category<input list="wps-blog-categories" maxLength={100} placeholder="Choose or enter a category" value={form.category} onChange={e=>update('category',e.target.value)}/></label>
          <datalist id="wps-blog-categories">{categories.map(category=><option key={category} value={category}/>)}</datalist>
          <label>Tags<input value={tagText} placeholder="Separate tags with commas" onChange={e=>setTagText(e.target.value)}/></label>
          {tags.length>0&&<label>Add existing tag<select value="" onChange={e=>{const tag=e.target.value;setTagText(current=>[...new Set([...current.split(',').map(t=>t.trim()).filter(Boolean),tag])].join(', '))}}><option value="" disabled>Choose a tag</option>{tags.map(tag=><option key={tag}>{tag}</option>)}</select></label>}{field('Related service path','service','/interior-painting')}</section>
        <section className="wps-panel wps-seo">
          <h2>Search appearance</h2>
          <label>SEO title<input value={form.seoTitle} maxLength={180} placeholder="Uses the post title when blank" onChange={e=>update('seoTitle',e.target.value)}/><small>{form.seoTitle.length} / 180 characters</small></label>
          <label>SEO description<textarea rows={3} value={form.seoDescription} maxLength={320} placeholder="Uses the excerpt when blank" onChange={e=>update('seoDescription',e.target.value)}/><small>{form.seoDescription.length} / 320 characters</small></label>
          <div className="wps-search-preview" aria-label="Search result preview">
            <small>wepaintsiding.com / blog / {form.slug || 'post-slug'}</small>
            <strong>{form.seoTitle.trim() || form.title.trim() || 'Post title'}</strong>
            <p>{form.seoDescription.trim() || form.excerpt.trim() || 'Post description'}</p>
          </div>
        </section>
        <section className="wps-panel"><h2>Featured image</h2>{/^\/(images|blog-media)\//.test(form.image)&&<img src={form.image} alt={form.alt}/>}<button type="button" className="wps-secondary" disabled={uploading||busy} onClick={()=>{setMediaTarget('featured');uploadInput.current?.click()}}>{uploading?'Uploading…':'Upload featured image'}</button>{field('Image path','image','/images/company/photo.webp')}{field('Image alt text','alt','Describe the image')}</section>
      </aside>
    </div>
  </form>;
}

function Enquiry({ enquiry, photos, onSave, busy }) {
  const [status,setStatus] = useState(enquiry.status);
  const [notes,setNotes] = useState(enquiry.notes);
  return <section className="wps-panel wps-message">
    <div className="wps-title"><div><h2>Enquiry #{enquiry.id}</h2><a href={'mailto:'+enquiry.email}>{enquiry.email}</a></div><span className={'wps-badge '+enquiry.status}>{enquiry.status}</span></div>
    <p className="wps-muted">{enquiry.created_at} UTC · {enquiry.kind} · {enquiry.page}</p>
    <h3>Request details</h3><pre>{enquiry.details}</pre>
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
        <h1 className="wps-overview-heading">Overview</h1>
        <div className="wps-stats">
          {[['New enquiries',enquiries.filter(x=>x.status==='new').length,'enquiries'],['Published posts',posts.filter(x=>x.status==='published').length,'posts'],['Drafts',posts.filter(x=>x.status==='draft').length,'posts']].map(([label,count,target])=><button className="wps-panel" key={label} onClick={()=>{go(target);setFilter(label==='New enquiries'?'new':label==='Drafts'?'draft':'published')}}><span>{label}</span><strong>{count}</strong></button>)}
        </div>
        <div className="wps-overview-grid">
          <section className="wps-panel"><div className="wps-title"><h2>Recent enquiries</h2><button className="wps-back" onClick={()=>go('enquiries')}>View inbox →</button></div>{enquiries.length?enquiries.slice(0,5).map(item=><button className="wps-summary" key={item.id} onClick={()=>{go('enquiries');setMessageId(item.id)}}><strong>{item.email}</strong><span className={'wps-badge '+item.status}>{item.status}</span></button>):<p className="wps-muted">New submissions will appear here.</p>}</section>
          <section className="wps-panel"><div className="wps-title"><h2>Blog posts</h2><button className="wps-back" onClick={()=>go('posts')}>View posts →</button></div>{posts.length?posts.slice(0,5).map(post=><button key={post.id} className="wps-summary" onClick={()=>edit(post)}><strong>{post.title}</strong><span className={'wps-badge '+post.status}>{post.status}</span></button>):<p className="wps-muted">Create your first post.</p>}</section>
        </div>
      </>}
      {data&&panel==='posts'&&<>
        <header className="wps-title"><h1>Blog posts</h1></header>
        <div className="wps-panel">
          <div className="wps-filters"><input aria-label="Search posts" placeholder="Search posts" value={query} onChange={e=>{setQuery(e.target.value);setLimit(20)}}/><select aria-label="Publication status" value={filter} onChange={e=>{setFilter(e.target.value);setLimit(20)}}><option value="all">All statuses</option><option value="published">Published</option><option value="draft">Draft</option></select></div>
          <div className="wps-table"><table><thead><tr><th>Title</th><th>Category</th><th>Status</th><th>Actions</th></tr></thead><tbody>{visiblePosts.slice(0,limit).map(post=><tr key={post.id}><td><button className="wps-back" onClick={()=>edit(post)}>{post.title}</button><small>/blog/{post.slug}</small></td><td className="wps-post-category">{post.category||'—'}</td><td className="wps-post-status"><span className={'wps-badge '+post.status}>{post.status}</span></td><td className="wps-post-actions"><button className="wps-secondary" type="button" onClick={()=>edit(post)}>Edit</button> <button className="wps-danger" disabled={busy} onClick={()=>{if(window.confirm('Permanently delete this post?'))mutate({action:'delete-post',id:post.id})}}>Delete</button></td></tr>)}</tbody></table></div>
          {visiblePosts.length>limit&&<button type="button" className="wps-secondary wps-more" onClick={()=>setLimit(value=>value+20)}>Show more posts</button>}{!visiblePosts.length&&<p className="wps-muted">No matching posts.</p>}
        </div>
      </>}
      {data&&panel==='editor'&&editing&&<Editor key={editing.id||'new'} post={editing} categories={[...new Set(posts.map(post=>post.category).filter(Boolean))].sort()} tags={[...new Set(posts.flatMap(post=>post.tags??[]))].sort()} onBack={()=>go('posts')} busy={busy} onSave={post=>mutate({action:'save-post',...post},result=>setEditing(result))}/>}
      {data&&panel==='enquiries'&&<>
        <header className="wps-title"><h1>Enquiries</h1></header>
        <div className="wps-inbox">
          <section className="wps-panel wps-inbox-list">
            <div className="wps-filters"><input aria-label="Search enquiries" placeholder="Search enquiries" value={query} onChange={e=>{setQuery(e.target.value);setLimit(20)}}/><select aria-label="Enquiry status" value={filter} onChange={e=>{setFilter(e.target.value);setLimit(20)}}><option value="all">All statuses</option>{statusOptions.map(value=><option key={value}>{value}</option>)}</select></div>
            {visibleEnquiries.slice(0,limit).map(item=><button className="wps-summary" aria-pressed={messageId===item.id} key={item.id} onClick={()=>setMessageId(item.id)}><strong>{item.email}</strong><span className={'wps-badge '+item.status}>{item.status}</span></button>)}
            {visibleEnquiries.length>limit&&<button type="button" className="wps-secondary wps-more" onClick={()=>setLimit(value=>value+20)}>Show more enquiries</button>}{!visibleEnquiries.length&&<p className="wps-muted">No matching enquiries.</p>}
          </section>
          {selected?<Enquiry key={selected.id} enquiry={selected} photos={data.photos.filter(photo=>photo.enquiry_id===selected.id)} busy={busy} onSave={mutate}/>:<section className="wps-panel wps-empty"><p>Select an enquiry to view its details and photos.</p></section>}
        </div>
      </>}
    </main>
  </div>;
}
