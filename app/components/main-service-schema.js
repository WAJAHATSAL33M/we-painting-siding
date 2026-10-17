import {featuredCities} from '../data/service-pages';
export default function MainServiceSchema({name,path,description}){
 const origin='https://we-painting-siding.vercel.app';
 const graph={'@context':'https://schema.org','@graph':[{'@type':'Service','@id':origin+path+'#service',name,serviceType:name,description,url:origin+path,provider:{'@type':'Organization','@id':origin+'/#organization',name:'We Paint Siding',url:origin,logo:origin+'/images/we-paint-siding-logo.jpg'},areaServed:featuredCities.map(city=>({'@type':'City',name:city+', Ontario'}))},{'@type':'BreadcrumbList',itemListElement:[{'@type':'ListItem',position:1,name:'Home',item:origin+'/'},{'@type':'ListItem',position:2,name,item:origin+path}]}]};
 return <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(graph).replaceAll('<','\\u003c')}}/>;
}
