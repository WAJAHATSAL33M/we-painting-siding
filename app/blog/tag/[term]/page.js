import TaxonomyArchive, { archiveMetadata } from '../../taxonomy-archive';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }) {
  return archiveMetadata('tag', (await params).term);
}

export default async function Page({ params }) {
  return <TaxonomyArchive kind="tag" slug={(await params).term}/>;
}
