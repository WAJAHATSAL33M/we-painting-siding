import {notFound} from 'next/navigation';
import locations from '../../data/locations.json';
import content from '../../data/location-content.json';
import LocalPage from '../local-page';
import '../../approved-homepage.css';
import '../../service-template.css';
import '../reference-locations.css';
import '../local-page.css';
export const dynamicParams=false;
export function generateStaticParams(){return locations.map(({slug})=>({location:slug}))}
export async function generateMetadata({params}){const {location}=await params;const city=locations.find(l=>l.slug===location);return city?{title:`Exterior & Interior Painting in ${city.name} | We Paint Siding`,description:`Plan exterior and interior painting in ${city.name}, Ontario. Explore siding, walls, trim and cabinet painting, preparation and local project options with We Paint Siding.`,alternates:{canonical:`https://we-painting-siding.vercel.app/locations/${location}`}}:{}}
export default async function LocationPage({params}){const {location}=await params;const city=locations.find(l=>l.slug===location);if(!city)notFound();return <LocalPage city={city} local={content[location]}/>}
