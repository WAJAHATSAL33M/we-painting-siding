'use client';
import {useState} from 'react';
import Homepage from '../components/homepage-original';
import '../homepage-original.css';
export default function Review(){const [width,setWidth]=useState(1360);return <><div style={{position:'sticky',top:0,zIndex:999,background:'#062b40',padding:8,display:'flex',gap:8}}>{[1360,768,390,320].map(w=><button key={w} onClick={()=>setWidth(w)} style={{padding:10,background:'white'}}>Width {w}</button>)}</div><div style={{width,maxWidth:'100%',margin:'auto','--shell-gutter':width<761?'0px':'48px'}}><Homepage/></div></>}
