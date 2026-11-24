import FaqPage from './faq-page';
import {faqGroups} from './faq-data';
import {FaqSchema} from '../components/seo-jsonld';
const faqQuestions=faqGroups.flatMap(g=>g.sections.flatMap(s=>s.questions.map(q=>[q.q,q.a])));
import '../approved-homepage.css';
import '../service-template.css';
import './faq-page.css';
export const metadata={title:'Painting FAQ | Exterior & Interior | We Paint Siding',description:'Answers to common Ontario painting questions about service areas, exterior and interior painting, cabinets, preparation, quotes and project planning.',alternates:{canonical:'https://wepaintsiding.com/faq'}};
export default function Page(){return <><FaqSchema questions={faqQuestions}/><FaqPage/></>}
