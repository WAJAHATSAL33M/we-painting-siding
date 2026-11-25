import MainServiceSchema from '../components/main-service-schema';
import metaTitles from '../data/service-meta-titles.json';
import ReferenceInterior from './reference-interior';
import '../approved-homepage.css';
import '../exterior-painting/reference-exterior.css';
import './reference-interior.css';
export const metadata={title:metaTitles['/interior-painting'],description:'Refresh walls, ceilings, trim, doors and cabinets with interior painting across Ontario. Explore coordinated finishes for homes and commercial spaces.',alternates:{canonical:'https://wepaintsiding.com/interior-painting'},openGraph:{type:'website',locale:'en_CA',siteName:'We Paint Siding',url:'https://wepaintsiding.com/interior-painting',title:metaTitles['/interior-painting'],description:'Refresh walls, ceilings, trim, doors and cabinets with interior painting across Ontario. Explore coordinated finishes for homes and commercial spaces.',images:[{url:'https://wepaintsiding.com/images/approved-home/living.webp',width:1536,height:1024,alt:'Freshly painted living room with white trim and garden-facing windows in Ontario'}]},twitter:{card:'summary_large_image',images:['https://wepaintsiding.com/images/approved-home/living.webp']}};
export default function InteriorPage(){return <><ReferenceInterior/><MainServiceSchema name="Interior Painting" path="/interior-painting" description={metadata.description}/></>}
