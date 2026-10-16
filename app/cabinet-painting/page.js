import ServiceTemplate from '../components/service-template';
import {getService,serviceMetadata} from '../data/service-pages';
import '../approved-homepage.css';
import '../service-template.css';
import '../service-refinements.css';
const service=getService('/cabinet-painting');
export const metadata=serviceMetadata(service);
export default function CabinetPage(){return <ServiceTemplate service={service}/>;}
