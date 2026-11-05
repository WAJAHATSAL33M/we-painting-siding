const exteriorPath = '/exterior-painting/';
const interiorPath = '/interior-painting/';

export const surfaceGuides = {
 exterior: {
  eyebrow: 'Know your exterior', heading: 'Know the surface.', accent: 'Choose the right service.',
  intro: 'Tap a part of the house to see what it is and explore the matching service.',
  image: '/images/surface-guide/exterior.webp',
  alt: 'Illustrative home with blue-grey siding, red brick, white window frames and an installed front door',
  initial: 'siding',
  surfaces: [
   {id:'siding',name:'Siding',number:'01',x:38,y:39,lx:23,ly:29,crop:'38% 39%',description:'The cladding on your exterior walls. Vinyl, aluminum and wood need a surface-specific approach.',tags:['Vinyl','Aluminum','Wood'],href:exteriorPath+'siding-painting',link:'Explore siding painting'},
   {id:'brick',name:'Brick & masonry',number:'02',x:16,y:79,lx:17,ly:87,crop:'16% 79%',description:'The brick and mortar that form a wall’s masonry surface. Painting or staining is assessed separately from siding and trim.',href:exteriorPath+'brick-painting',link:'Explore brick painting & staining'},
   {id:'windows',name:'Window frames',number:'03',x:22,y:57,lx:44,ly:56,crop:'22% 57%',description:'The opaque frame around the glass. Suitable frames can be assessed for painting; glass and surrounding walls are separate surfaces.',href:exteriorPath+'window-painting',link:'Explore window painting'},
   {id:'doors',name:'Exterior doors',number:'04',x:78,y:72,lx:76,ly:84,crop:'78% 72%',description:'The installed entrance door. The door face, frame and adjacent trim are identified separately in your painting scope.',href:exteriorPath+'door-painting',link:'Explore exterior door painting'},
   {id:'fascia',name:'Fascia',number:'05',detail:true,x:22,y:30,lx:30,ly:19,crop:'22% 30%',description:'The vertical board at the roof edge, behind the eavestrough. It is distinct from the soffit underneath and the gutter in front.',href:exteriorPath+'eavestrough-fascia-painting',link:'Explore roof-edge painting'},
   {id:'soffits',name:'Soffits',number:'06',detail:true,x:36,y:78,lx:35,ly:86,crop:'36% 78%',description:'The underside of a roof overhang. We assess its material and condition and protect ventilation openings during the agreed work.',href:exteriorPath+'eavestrough-fascia-painting',link:'Explore roof-edge painting'},
   {id:'eavestroughs',name:'Eavestroughs',number:'07',detail:true,x:77,y:43,lx:73,ly:62,crop:'77% 43%',description:'The gutter channel that collects rainwater at the roof edge. Painting suitable exposed surfaces is separate from gutter repair or replacement.',href:exteriorPath+'eavestrough-fascia-painting',link:'Explore roof-edge painting'},
  ],
 },
 interior: {
  eyebrow:'Know your interior',heading:'Every room.',accent:'Every finishing detail.',
  intro:'Explore the surfaces and spaces in your painting plan.',
  image:'/images/surface-guide/interior.webp',
  alt:'Illustrative room showing sage walls, a white ceiling and trim, an installed charcoal door and fitted navy cabinets',
  initial:'trim',
  surfaces:[
   {id:'walls',name:'Walls',number:'01',x:15,y:48,lx:14,ly:35,crop:'15% 48%',description:'The main painted surfaces around a room. Ceilings, baseboards, doors and cabinetry are listed separately in your quote.',href:interiorPath+'wall-painting',link:'Explore wall painting'},
   {id:'ceilings',name:'Ceilings',number:'02',x:65,y:12,lx:55,ly:10,crop:'65% 12%',description:'The overhead surface of a room. Its texture, height and any staining are assessed before preparation and painting are agreed.',href:interiorPath+'ceiling-painting',link:'Explore ceiling painting'},
   {id:'trim',name:'Trim',number:'03',x:21,y:89,lx:17,ly:76,crop:'21% 89%',description:'Baseboards, door casings and other agreed mouldings. Walls and doors are listed separately in your quote.',href:interiorPath+'trim-painting',link:'Explore trim painting'},
   {id:'doors',name:'Doors',number:'04',x:43,y:58,lx:45,ly:45,crop:'43% 58%',description:'The installed door panel within its frame. We confirm the faces and edges to include; frames and casings are agreed separately.',href:interiorPath+'door-painting',link:'Explore door painting'},
   {id:'cabinets',name:'Cabinets',number:'05',x:80,y:43,lx:77,ly:29,crop:'80% 43%',description:'Installed kitchen cabinets, vanities and built-ins. Doors, drawer fronts, frames and panels are defined in the agreed scope.',href:'/cabinet-painting',link:'Explore cabinet painting'},
  ],
 },
};
