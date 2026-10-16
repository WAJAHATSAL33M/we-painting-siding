'use client';
import {useEffect} from 'react';
import {usePathname} from 'next/navigation';

// Content stays visible without JavaScript. Motion is added once on entry.
export default function SiteEffects(){
 const path=usePathname();
 useEffect(()=>{
  const preference=matchMedia('(prefers-reduced-motion: reduce)');
  if(preference.matches||!('IntersectionObserver' in window))return;
  const targets=document.querySelectorAll('main h1, main h2, .re-service-grid>article, .sp-scope-grid>article, .blog-grid>.blog-card, .lm-service-grid>article');
  const observer=new IntersectionObserver(entries=>{
   for(const entry of entries){
    if(entry.isIntersecting){entry.target.classList.add('wps-enter');observer.unobserve(entry.target)}
   }
  },{threshold:.12,rootMargin:'0px 0px -24px 0px'});
  targets.forEach(el=>observer.observe(el));
  function stop(){if(preference.matches){observer.disconnect();targets.forEach(el=>el.classList.remove('wps-enter'))}}
  preference.addEventListener('change',stop);
  return()=>{observer.disconnect();preference.removeEventListener('change',stop);targets.forEach(el=>el.classList.remove('wps-enter'))};
 },[path]);
 return null;
}
