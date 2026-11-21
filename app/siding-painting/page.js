import ExteriorServicePage from '../components/exterior-service-page';
import { getService, serviceMetadata } from '../data/service-pages';
import '../approved-homepage.css';
import '../service-template.css';
import '../service-refinements.css';
import '../interior-service.css';
import '../exterior-painting/[service]/vinyl-page.css';

const service = getService('/siding-painting');
export const metadata = serviceMetadata(service);

export default function SidingPaintingPage() {
  return <ExteriorServicePage service={service}/>;
}
