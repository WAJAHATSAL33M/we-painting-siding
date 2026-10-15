'use client';
import {useState} from 'react';
import Hero from '../components/homepage-hero';
import '../homepage-original.css';
import '../homepage-hero.css';
export default function Review(){const [width,setWidth]=useState(1440);return <div style={{background:'#dce3e7'}}><div style={{display:'flex',gap:10,padding:10,flexWrap:'wrap'}}>{[1440,1280,1024,768,640,390,360,320].map(w=><button key={w} onClick={()=>setWidth(w)} style={{padding:10}}>Width {w}</button>)}</div><div style={{overflow:'auto'}}><div style={{width,margin:'auto'}}><Hero/></div></div></div>}
