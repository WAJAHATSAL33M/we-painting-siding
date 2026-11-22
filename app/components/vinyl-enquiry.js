'use client';
import {createContext,useContext,useState} from 'react';
import cities from '../data/locations.json';
import QuoteForm from './quote-form';
const ProjectContext=createContext(null);
export function VinylProjectProvider({children}){const[city,setCity]=useState('');return <ProjectContext.Provider value={{city,setCity}}>{children}</ProjectContext.Provider>}
export function VinylLocationStart(){const{city,setCity}=useContext(ProjectContext);return <div className="vp-location-start"><label className="ah-sr-only" htmlFor="vp-start-city">Select your community</label><select id="vp-start-city" value={cities.some(c=>c.name===city)?city:city?'other':''} onChange={e=>setCity(e.target.value==='other'?'Other community':e.target.value)}><option value="">Select your community</option>{cities.map(c=><option key={c.slug} value={c.name}>{c.name}</option>)}<option value="other">Other community / not listed</option></select><a className="ah-button" href="#quote">Plan Your Project <span aria-hidden="true">→</span></a></div>}
export function VinylProjectForm({ formTitle }) {
  const { city } = useContext(ProjectContext);
  return <QuoteForm kind="vinyl" heading={formTitle} city={city === 'Other community' ? '' : city}/>;
}
