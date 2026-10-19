import {notFound} from 'next/navigation';
import ExteriorServicePage from '../../components/exterior-service-page';
import {allServices,getService,serviceMetadata} from '../../data/service-pages';
import '../../approved-homepage.css';
import '../../service-template.css';
import '../../service-refinements.css';
import '../../interior-service.css';
import './vinyl-page.css';
export const dynamicParams=false;
const prefix='/exterior-painting/';
export function generateStaticParams(){return allServices.filter(s=>s.path.startsWith(prefix)).map(s=>({service:s.slug}))}
export async function generateMetadata({params}){const {service}=await params;const s=getService(prefix+service);return s?serviceMetadata(s):{}}
export default async function ServicePage({params}){const {service}=await params;const s=getService(prefix+service);if(!s)notFound();return <ExteriorServicePage service={s}/>;}


