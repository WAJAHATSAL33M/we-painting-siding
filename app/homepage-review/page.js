'use client';
import {useState} from 'react';
import Homepage from '../components/homepage-original';
import '../homepage-original.css';
export default function Review(){const[width,setWidth]=useState(1280);return <div style={{background:'#dce1e5',minHeight:'100vh'}}><div style={{display:'flex',gap:12,justifyContent:'center',padding:12,background:'#0b2538',position:'sticky',top:0,zIndex:100}}>{[[1280,'Desktop 1280'],[768,'Tablet 768'],[390,'Mobile 390'],[360,'Small mobile 360']].map(([w,label])=><button key={w} aria-pressed={width===w} onClick={()=>setWidth(w)} style={{padding:'10px 16px',border:'1px solid #a9c0d1',borderRadius:4,cursor:'pointer',background:width===w?'#0075b9':'white',color:width===w?'white':'#06243b',fontSize:13}}>{label}</button>)}</div><div style={{overflow:'auto',padding:'20px 0'}}><div style={{width,margin:'auto'}}><Homepage/></div></div></div>}
