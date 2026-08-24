import iconPlant from '../assets/icons/icons8-plant-90.png';
import iconHandshake from '../assets/icons/icons8-handshake-90.png';
import iconTree from '../assets/icons/icons8-tree-96.png';
import iconSchool from '../assets/icons/icons8-school-100.png';
import iconPencil from '../assets/icons/icons8-pencil-100.png';
import iconMarketing from '../assets/icons/icons8-marketing-100.png';
import iconCirculoVerde from '../assets/icons/Circulo-verde.png';
import iconWhatsapp from '../assets/icons/icons8-whatsapp-logo-96.png';
import iconInstagram from '../assets/icons/icons8-instagram-96.png';

// Cards da seção "Sobre nós"
export const dadosDosCards = [
  {
    id: 1,
    titulo: "Ensino Gratuito",
    descricao: "Aulas de lógica e programação sem custo para escolas públicas parceiras.",
    imagem: iconPlant
  },
  {
    id: 2,
    titulo: "Voluntariado ativo",
    descricao: "Estudantes universitários como professores, monitores e referência.",
    imagem: iconHandshake
  },
  {
    id: 3,
    titulo: "Crescimento contínuo",
    descricao: "Um projeto que cresce a cada semestre com novas turmas e parcerias.",
    imagem: iconTree
  }
];

// Cards da seção "Cada turma, uma história" (Escolas)
export const dadosDasEscolas = [
  {
    id: 1,
    nome: "Escola 1",
    imagem: "/images/fotos/AlunosEmSala.jpeg",
    corDoCard: "card-verde"
  },
  {
    id: 2,
    nome: "Escola 2",
    imagem: "/images/fotos/Turma.jpeg",
    corDoCard: "card-azul"
  },
  {
    id: 3,
    nome: "Escola 3",
    imagem: "/images/fotos/AlunosCertificado.jpeg",
    corDoCard: "card-verde"
  }
];

// Cards da seção "Onde você pode atuar" (Voluntários)
export const dadosDosVoluntarios = [
  {
    id: 1,
    tituloLinha1: "Professor(a)",
    tituloLinha2: "voluntário(a)",
    descricao: "Ministra as aulas de lógica e programação diretamente com os alunos.",
    imagem: iconSchool,
    corDoCard: "conteudo-azul",
    alt: "Ícone Professor voluntário"
  },
  {
    id: 2,
    tituloLinha1: "Monitor(a)",
    tituloLinha2: "voluntário(a)",
    descricao: "Apoia os professores no suporte aos alunos.",
    imagem: iconPencil,
    corDoCard: "conteudo-verde",
    alt: "Ícone Monitor voluntário"
  },
  {
    id: 3,
    tituloLinha1: "Marketing",
    tituloLinha2: null,
    descricao: "Cuida da comunicação do projeto.",
    imagem: iconMarketing,
    corDoCard: "conteudo-azul",
    alt: "Ícone Marketing"
  }
];

// Depoimentos para visão de Escolas
export const depoimentosEscola = [
  {
    id: 1,
    tipo: "lateral",
    texto: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum beatae fugit, expedita reprehenderit accusantium voluptatem autem minus? Illo quaerat delectus excepturi corrupti dicta eveniet nisi dolor, minus explicabo cumque. Quo?"
  },
  {
    id: 2,
    tipo: "meio",
    texto: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam sit, placeat ad vero ullam natus libero, reprehenderit incidunt praesentium dolore perferendis, facilis deserunt cumque laboriosam. Consequatur quibusdam voluptate ad nisi."
  },
  {
    id: 3,
    tipo: "lateral",
    texto: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed alias distinctio, esse, officia culpa officiis dignissimos veniam enim suscipit asperiores nostrum molestias? Minus unde laudantium facilis voluptatem excepturi omnis qui."
  }
];

// Depoimentos para visão de Voluntários
export const depoimentosVoluntario = [
  {
    id: 1,
    texto: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda odit, itaque nesciunt repellat natus cumque sint, accusamus fugiat dolores unde laborum. Molestias et sequi repellendus impedit nostrum unde alias veniam."
  },
  {
    id: 2,
    texto: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deleniti inventore voluptates expedita natus eaque impedit, perferendis commodi vero iste totam debitis mollitia incidunt magnam quae, eveniet ratione repellendus odio unde."
  },
  {
    id: 3,
    texto: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quibusdam reprehenderit illum, cumque ipsa rem dolor cupiditate vero aliquam iusto repellat, nobis voluptate optics maiores praesentium. Officiis nesciunt est nemo ratione."
  }
];

// Dados da seção "Nosso impacto"
export const dadosImpacto = [
  {
    id: 1,
    numero: "100+",
    descricao: "texto"
  },
  {
    id: 2,
    numero: "100+",
    descricao: "texto"
  },
  {
    id: 3,
    numero: "100+",
    descricao: "texto"
  }
];

// Linha do tempo da seção "História"
export const dadosLinhaDoTempo = [
  {
    id: 1,
    titulo: "fundação e estruturação",
    descricao: "Criação do projeto. Fase de pesquisa, criação da identidade visual, redes sociais, material didático e prospecção das primeiras escolas.",
    imagem: iconCirculoVerde
  },
  {
    id: 2,
    titulo: "2025.1 primeira edição",
    descricao: "Início das atividades práticas com 3 organizadores da Unicamp, impactando diretamente 18 alunos do ensino médio com aulas de programação e contato com a universidade.",
    imagem: iconCirculoVerde
  },
  {
    id: 3,
    titulo: "2025.2 expansão do projeto",
    descricao: "Crescimento da equipe de organização para 7 membros e abertura de 2 turmas simultâneas, atendendo 10 alunos e consolidando a gestão pedagógica.",
    imagem: iconCirculoVerde
  },
  {
    id: 4,
    titulo: "consolidação e transição",
    descricao: "Estruturação de um conselho consultivo para acompanhamento do projeto e suporte contínuo aos novos coordenadores executivos e educacionais.",
    imagem: iconCirculoVerde
  }
];

// Empresas onde os voluntários atuam
export const empresasParceiras = ["Ifood", "EloGroup", "Nubank", "Samsung"];

// Ícones de contato
export const iconesContato = {
  whatsapp: iconWhatsapp,
  instagram: iconInstagram
};
