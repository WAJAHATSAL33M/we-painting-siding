import SharedServiceTemplate from './interior-service-template';
import {SiteFooter} from './site-chrome';
export function Arrow(){return <svg className="sp-arrow" viewBox="0 0 28 16" fill="none" aria-hidden="true"><path d="M1 8h24M19 2l6 6-6 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>}
export function ServiceFooter(){return <SiteFooter/>}
export default function ServiceTemplate(props){return <SharedServiceTemplate {...props}/>}
