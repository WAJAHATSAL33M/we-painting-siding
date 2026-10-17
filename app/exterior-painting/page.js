import MainServiceSchema from '../components/main-service-schema';
import mainSeo from '../data/main-service-seo.json';
import ReferenceExterior from './reference-exterior';
import '../approved-homepage.css';
import './reference-exterior.css';
const seo=mainSeo['/exterior-painting'];
export const metadata={title:seo.metaTitle,description:seo.metaDescription,alternates:{canonical:'https://we-painting-siding.vercel.app/exterior-painting'},openGraph:{title:seo.metaTitle,description:seo.metaDescription,url:'https://we-painting-siding.vercel.app/exterior-painting'}};
export default function ExteriorPage(){return <><ReferenceExterior/><MainServiceSchema name="Exterior Painting" path="/exterior-painting" description={seo.metaDescription}/></>}
