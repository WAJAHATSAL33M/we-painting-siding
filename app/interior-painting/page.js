import MainServiceSchema from '../components/main-service-schema';
import metaTitles from '../data/service-meta-titles.json';
import ReferenceInterior from './reference-interior';
import '../approved-homepage.css';
import '../exterior-painting/reference-exterior.css';
import './reference-interior.css';
export const metadata={title:metaTitles['/interior-painting'],description:'Refresh walls, ceilings, trim, doors and cabinets with interior painting across Southern Ontario. Explore coordinated finishes for homes and commercial spaces.'};
export default function InteriorPage(){return <><ReferenceInterior/><MainServiceSchema name="Interior Painting" path="/interior-painting" description={metadata.description}/></>}
