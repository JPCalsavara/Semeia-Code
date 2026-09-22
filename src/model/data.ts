import rawData from "./data.json";
import iconPlant from "../assets/icons/icons8-plant-90.png";
import iconHandshake from "../assets/icons/icons8-handshake-90.png";
import iconTree from "../assets/icons/icons8-tree-96.png";
import iconSchool from "../assets/icons/icons8-school-100.png";
import iconPencil from "../assets/icons/icons8-pencil-100.png";
import iconMarketing from "../assets/icons/icons8-marketing-100.png";
import iconCirculoVerde from "../assets/icons/Circulo-verde.png";
import iconWhatsapp from "../assets/icons/icons8-whatsapp-logo-96.png";
import iconInstagram from "../assets/icons/icons8-instagram-96.png";
import iconLinkedIn from "../assets/icons/icons8-linkedin-96.png";

export type AssetName =
  | "plant"
  | "handshake"
  | "tree"
  | "school"
  | "pencil"
  | "marketing"
  | "whatsapp"
  | "instagram"
  | "linkedIn";

export type CardData = {
  id: string | number;
  title: string;
  description: string;
  image: string;
};

export type SchoolData = {
  id: string | number;
  name: string;
  image: string;
  images?: string[];
  color: string;
};

export type VolunteerRole = {
  id: string | number;
  titleLine1: string;
  titleLine2: string | null;
  description: string;
  image: string;
  color: string;
  alt: string;
};

export type Testimonial = { id: string | number; text: string };
export type VolunteerTestimonial = {
  id: string | number;
  memberId: string | number;
  name: string;
  image: string | null;
  semester: string;
  semesters: string[];
  company: string | null;
  roleYear: string;
  text: string;
};
export type RawVolunteerMember = {
  id: number | string;
  name: string;
  company: string | null;
  semestre: string[];
  cargos: string[];
  image: string | null;
  linkedin?: string | null;
};
export type VolunteerMember = {
  id: string | number;
  semester: string;
  name: string;
  company: string | null;
  role: string;
  image: string | null;
  linkedin?: string | null;
};
export type ImpactData = { id: string | number; number: string; description: string };
export type TimelineData = {
  id: string | number;
  title: string;
  description: string;
  image: string;
};
export type DetailedTimelineItem = {
  id: string | number;
  semester?: string;
  period: string;
  title: string;
  role: string;
  location: string;
  image: string;
  images?: string[];
  description: string;
  highlights: string[];
};
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
  linkedIn: iconLinkedIn,
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
  images: (school as unknown as { images?: string[] }).images ?? [school.image],
  color: school.color,
}));

export const dadosDosVoluntarios: VolunteerRole[] = rawData.volunteerRoles.map(
  (role) => ({
    id: role.id,
    titleLine1: role.titleLine1,
    titleLine2: role.titleLine2,
    description: role.description,
    image: resolveAsset(role.asset),
    color: role.color,
    alt: role.alt,
  }),
);

export const depoimentosEscola: Testimonial[] = rawData.schoolTestimonials;
export const membrosUnicos: RawVolunteerMember[] = rawData.volunteerMembers;

export const membrosPorId = new Map<string | number, RawVolunteerMember>(
  membrosUnicos.map((member) => [member.id, member]),
);

export const semestresDisponiveis: string[] = Array.from(
  new Set(membrosUnicos.flatMap((m) => m.semestre)),
).sort((a, b) => a.localeCompare(b));

export const membrosVoluntarioPorSemestre: Record<string, VolunteerMember[]> = {};

for (const sem of semestresDisponiveis) {
  membrosVoluntarioPorSemestre[sem] = [];
  for (const rawMember of membrosUnicos) {
    const idx = rawMember.semestre.indexOf(sem);
    if (idx !== -1) {
      membrosVoluntarioPorSemestre[sem].push({
        id: rawMember.id,
        semester: sem,
        name: rawMember.name,
        company: rawMember.company,
        role: rawMember.cargos[idx] ?? "",
        image: rawMember.image,
        linkedin: rawMember.linkedin ?? null,
      });
    }
  }
}

export const membrosVoluntario: VolunteerMember[] = Object.values(
  membrosVoluntarioPorSemestre,
).flat();

export const depoimentosVoluntario: VolunteerTestimonial[] =
  rawData.volunteerTestimonials
    .map((testimonial): VolunteerTestimonial | null => {
      const member = membrosPorId.get(testimonial.memberId);
      if (!member || !testimonial.text.trim()) return null;

      const targetSemester =
        "semester" in testimonial && typeof testimonial.semester === "string"
          ? testimonial.semester
          : member.semestre[0];
      const semIndex = member.semestre.indexOf(targetSemester);
      const validIndex = semIndex !== -1 ? semIndex : 0;
      const role = member.cargos[validIndex] ?? "";

      return {
        id: testimonial.id,
        memberId: member.id,
        name: member.name,
        image: member.image,
        semester: targetSemester,
        semesters: member.semestre,
        company: member.company,
        roleYear: role,
        text: testimonial.text,
      };
    })
    .filter(
      (testimonial): testimonial is VolunteerTestimonial =>
        testimonial !== null,
    );

export const dadosImpacto: ImpactData[] = rawData.impact;

export const dadosLinhaDoTempo: TimelineData[] = rawData.timeline.map(
  (item) => ({
    ...item,
    image: iconCirculoVerde,
  }),
);

export const dadosLinhaDoTempoVoluntario: DetailedTimelineItem[] =
  rawData.volunteerTimeline.map((item) => ({
    ...item,
    images: (item as unknown as { images?: string[] }).images ?? [item.image],
  }));

export const empresasParceiras = rawData.partnerCompanies;

export const iconesContato: Record<"whatsapp" | "instagram" | "linkedIn", ContactData> = {
  whatsapp: { ...rawData.contacts.whatsapp, image: assets.whatsapp },
  instagram: { ...rawData.contacts.instagram, image: assets.instagram },
  linkedIn: { ...rawData.contacts.linkedIn, image: assets.linkedIn },
};

export type Audience = "schools" | "volunteers";

export type SemesterMembersGroup = {
  semester: string;
  isCurrent: boolean;
  members: VolunteerMember[];
};

export function getSemestresComMembrosOrdenados(): SemesterMembersGroup[] {
  const semestres = Object.keys(membrosVoluntarioPorSemestre).sort((a, b) =>
    b.localeCompare(a),
  );

  return semestres.map((semester, index) => ({
    semester,
    isCurrent: index === 0,
    members: membrosVoluntarioPorSemestre[semester] ?? [],
  }));
}

export function getLinhaDoTempo(audience: Audience | boolean) {
  const isVol =
    typeof audience === "boolean" ? audience : audience === "volunteers";
  return isVol ? dadosLinhaDoTempoVoluntario : dadosLinhaDoTempo;
}

export function getDepoimentosVoluntarios(): VolunteerTestimonial[] {
  return depoimentosVoluntario;
}

export function getDepoimentosEscola(): Testimonial[] {
  return depoimentosEscola;
}

export function getPapeisVoluntario(): VolunteerRole[] {
  return dadosDosVoluntarios;
}

export function getEscolasAtendidas(): SchoolData[] {
  return dadosDasEscolas;
}