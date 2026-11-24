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
const topCityMeta={
 'toronto':{title:'Exterior Painting Toronto | 4.9\u2605 Free Quote',description:'Exterior & interior painting in Toronto. Siding, brick & cabinet painting. 4.9\u2605 from 54 Google reviews. Free quote: (647) 699-8228.'},
 'mississauga':{title:'Exterior Painting Mississauga | 4.9\u2605',description:'Exterior & interior painting in Mississauga. Siding, brick & cabinet painting. 4.9\u2605 from 54 Google reviews. Free quote: (647) 699-8228.'},
 'oakville':{title:'Exterior Painting Oakville | 5.0\u2605 Free Quote',description:'Exterior & interior painting in Oakville. Siding, brick & cabinet painting. 5.0\u2605 from 11 Google reviews. Free quote: (647) 699-8228.'},
 'hamilton':{title:'Exterior Painting Hamilton | 4.9\u2605 Free Quote',description:'Exterior & interior painting in Hamilton. Siding, brick & cabinet painting. 4.9\u2605 from 54 Google reviews. Free quote: (647) 699-8228.'},
 'burlington':{title:'Exterior Painting Burlington, Ontario | 4.9\u2605',description:'Exterior & interior painting in Burlington, Ontario. Siding, brick & cabinet painting. 4.9\u2605 from 54 Google reviews. Free quote: (647) 699-8228.'},
 'milton':{title:'Exterior Painting Milton | 4.9\u2605 Free Quote',description:'Exterior & interior painting in Milton. Siding, brick & cabinet painting. 4.9\u2605 from 54 Google reviews. Free quote: (647) 699-8228.'},
 'etobicoke':{title:'Exterior Painting Etobicoke | 4.9\u2605',description:'Exterior & interior painting in Etobicoke. Siding, brick & cabinet painting. 4.9\u2605 from 54 Google reviews. Free quote: (647) 699-8228.'},
 'north-york':{title:'Exterior Painting North York | 4.9\u2605',description:'Exterior & interior painting in North York. Siding, brick & cabinet painting. 4.9\u2605 from 54 Google reviews. Free quote: (647) 699-8228.'}
};
export async function generateMetadata({params}){const {location}=await params;const city=locations.find(l=>l.slug===location);if(!city)return {};const top=topCityMeta[location];return {title:top?top.title:`Exterior & Interior Painting in ${city.name} | We Paint Siding`,description:top?top.description:`Plan exterior and interior painting in ${city.name}, Ontario. Explore siding, walls, trim and cabinet painting, preparation and local project options with We Paint Siding.`,alternates:{canonical:`https://wepaintsiding.com/locations/${location}`}}}
export default async function LocationPage({params}){const {location}=await params;const city=locations.find(l=>l.slug===location);if(!city)notFound();return <LocalPage city={city} local={content[location]}/>}
