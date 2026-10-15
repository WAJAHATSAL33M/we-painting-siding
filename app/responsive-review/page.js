'use client';
import {useState} from 'react';
import Homepage from '../components/homepage-original';
import '../homepage-original.css';
export default function Review(){const[w,setW]=useState(390);return <div style={{background:'#dce3e7'}}><div style={{position:'sticky',top:0,zIndex:1000,display:'flex',gap:8,padding:10,background:'#062b40',flexWrap:'wrap'}}>{[1920,1440,1280,1024,768,640,390,360,320].map(n=><button key={n} onClick={()=>setW(n)} aria-pressed={w===n} style={{padding:10,background:w===n?'#9bd6f4':'white'}}>Width {n}</button>)}</div><div style={{overflow:'auto'}}><div style={{width:w,margin:'auto'}}><Homepage/></div></div></div>}
