'use client';
import {useState} from 'react';
import Homepage from '../components/homepage-original';
import '../homepage-original.css';
export default function Review(){const [width,setWidth]=useState(1348);return <div style={{background:'#dce3e7',minHeight:'100vh'}}><div style={{position:'sticky',top:0,zIndex:1000,display:'flex',gap:8,padding:10,background:'#062b40',flexWrap:'wrap'}}>{[1920,1440,1348,1280,1024,768,390,320].map(w=><button key={w} onClick={()=>setWidth(w)} aria-pressed={w===width} style={{padding:10,background:width===w?'#9bd6f4':'white'}}>Width {w}</button>)}</div><div style={{overflow:'auto',paddingBlock:12}}><div style={{width,maxWidth:'none',margin:'auto'}}><Homepage/></div></div></div>}
