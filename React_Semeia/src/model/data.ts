import rawData from './data.json';
import iconPlant from '../assets/icons/icons8-plant-90.png';
import iconHandshake from '../assets/icons/icons8-handshake-90.png';
import iconTree from '../assets/icons/icons8-tree-96.png';
import iconSchool from '../assets/icons/icons8-school-100.png';
import iconPencil from '../assets/icons/icons8-pencil-100.png';
import iconMarketing from '../assets/icons/icons8-marketing-100.png';
import iconCirculoVerde from '../assets/icons/Circulo-verde.png';
import iconWhatsapp from '../assets/icons/icons8-whatsapp-logo-96.png';
import iconInstagram from '../assets/icons/icons8-instagram-96.png';

export type AssetName = 'plant' | 'handshake' | 'tree' | 'school' | 'pencil' | 'marketing' | 'whatsapp' | 'instagram';

export type CardData = {
  id: string;
  title: string;
  description: string;
  image: string;
};

export type SchoolData = {
  id: string;
  name: string;
  image: string;
  color: string;
};

export type VolunteerRole = {
  id: string;
  titleLine1: string;
  titleLine2: string | null;
  description: string;
  image: string;
  color: string;
  alt: string;
};

export type Testimonial = { id: string; text: string };
export type ImpactData = { id: string; number: string; description: string };
export type TimelineData = { id: string; title: string; description: string; image: string };
export type ContactData = { label: string; url: string | null; image: string };

const assets: Record<AssetName, string> = {
  plant: iconPlant,
  handshake: iconHandshake,
  tree: iconTree,
  school: iconSchool,
  pencil: iconPencil,
  marketing: iconMarketing,
  whatsapp: iconWhatsapp,
  instagram: iconInstagram,
};

const resolveAsset = (assetName: string): string => {
  if (!(assetName in assets)) {
    throw new Error(`Unknown asset: ${assetName}`);
  }

  return assets[assetName as AssetName];
};

export const dadosDosCards: CardData[] = rawData.cards.map((card) => ({
  id: card.id,
  title: card.title,
  description: card.description,
  image: resolveAsset(card.asset),
}));

export const dadosDasEscolas: SchoolData[] = rawData.schools.map((school) => ({
  id: school.id,
  name: school.name,
  image: school.image,
  color: school.color,
}));

export const dadosDosVoluntarios: VolunteerRole[] = rawData.volunteerRoles.map((role) => ({
  id: role.id,
  titleLine1: role.titleLine1,
  titleLine2: role.titleLine2,
  description: role.description,
  image: resolveAsset(role.asset),
  color: role.color,
  alt: role.alt,
}));

export const depoimentosEscola: Testimonial[] = rawData.schoolTestimonials;
export const depoimentosVoluntario: Testimonial[] = rawData.volunteerTestimonials;
export const dadosImpacto: ImpactData[] = rawData.impact;
export const dadosLinhaDoTempo: TimelineData[] = rawData.timeline.map((item) => ({
  ...item,
  image: iconCirculoVerde,
}));
export const empresasParceiras = rawData.partnerCompanies;
export const iconesContato: Record<'whatsapp' | 'instagram', ContactData> = {
  whatsapp: { ...rawData.contacts.whatsapp, image: assets.whatsapp },
  instagram: { ...rawData.contacts.instagram, image: assets.instagram },
};
