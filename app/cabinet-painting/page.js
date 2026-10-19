import ServiceTemplate from '../components/interior-detail-page';
import {getService,serviceMetadata} from '../data/service-pages';
import '../approved-homepage.css';
import '../service-template.css';
import '../service-refinements.css';
import '../interior-service.css';
const service=getService('/cabinet-painting');
export const metadata=serviceMetadata(service);
export default function CabinetPage(){return <ServiceTemplate service={service}/>;}


import '../exterior-painting/[service]/vinyl-page.css';
import '../interior-detail.css';
