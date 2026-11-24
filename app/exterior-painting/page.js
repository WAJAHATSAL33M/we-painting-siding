import MainServiceSchema from '../components/main-service-schema';
import metaTitles from '../data/service-meta-titles.json';
import ReferenceExterior from './reference-exterior';
import '../approved-homepage.css';
import './reference-exterior.css';
export const metadata={title:metaTitles['/exterior-painting'],description:'Explore exterior painting for siding, brick, stucco, windows and doors across Ontario. Thoughtful preparation and coordinated finishes for homes and businesses.',alternates:{canonical:'https://wepaintsiding.com/exterior-painting'}};
export default function ExteriorPage(){return <><ReferenceExterior/><MainServiceSchema name="Exterior Painting" path="/exterior-painting" description={metadata.description}/></>}
