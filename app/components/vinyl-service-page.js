import ExteriorServicePage from './exterior-service-page';
import {getService} from '../data/service-pages';
export default function VinylServicePage({service}){return <ExteriorServicePage service={service||getService('/exterior-painting/vinyl-siding-painting')}/>;}
