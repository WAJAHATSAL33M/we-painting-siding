import MainServiceSchema from '../components/main-service-schema';
import mainSeo from '../data/main-service-seo.json';
import ReferenceInterior from './reference-interior';
import '../approved-homepage.css';
import '../exterior-painting/reference-exterior.css';
import './reference-interior.css';
const seo=mainSeo['/interior-painting'];
export const metadata={title:seo.metaTitle,description:seo.metaDescription,alternates:{canonical:'https://we-painting-siding.vercel.app/interior-painting'},openGraph:{title:seo.metaTitle,description:seo.metaDescription,url:'https://we-painting-siding.vercel.app/interior-painting'}};
export default function InteriorPage(){return <><ReferenceInterior/><MainServiceSchema name="Interior Painting" path="/interior-painting" description={seo.metaDescription}/></>}
