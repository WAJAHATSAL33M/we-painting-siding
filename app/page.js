import ApprovedHomepage from './components/approved-homepage';
import {LocalBusinessSchema} from './components/seo-jsonld';
import './approved-homepage.css';
export const metadata={title:'Exterior & Interior Painting Ontario | We Paint Siding',description:'Explore exterior and interior painting, including cabinet painting, our process, finish inspiration and free quote requests across Ontario.',alternates:{canonical:'https://wepaintsiding.com/'}};
export default function Home(){return <><ApprovedHomepage/><LocalBusinessSchema/></>}
