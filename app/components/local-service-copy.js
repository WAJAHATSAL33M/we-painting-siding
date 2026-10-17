import locations from '../data/locations.json';
const names=locations.map(c=>c.name).sort((a,b)=>b.length-a.length);
const matcher=new RegExp('('+names.map(n=>n.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')).join('|')+')','g');
export default function LocalServiceCopy({text=''}){return <>{text.split(matcher).map((part,i)=>{const city=locations.find(c=>c.name===part);return city?<a href={'/locations/'+city.slug} key={i}>{part}</a>:part})}</>}
