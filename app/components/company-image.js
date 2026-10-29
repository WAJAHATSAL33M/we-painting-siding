import metadata from '../data/company-photo-metadata.json';
import sprayReplacements from '../data/spray-replacements.json';

// Keep the original layout props while replacing legacy application photography.
export default function CompanyImage({src,alt,width,height,loading,fetchPriority,...props}){
 const replacement=sprayReplacements[src];
 const photo=replacement||metadata[src];
 return <img {...props} src={replacement?.src||src} alt={photo?.alt||alt||'Painting project'} width={photo?.width||width} height={photo?.height||height} loading={loading||(fetchPriority==='high'?undefined:'lazy')} fetchPriority={fetchPriority} data-photo-origin={replacement||src?.startsWith('/images/spray/')?'generated-spray':photo?.origin}/>;
}
