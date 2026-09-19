# Plano de migração para React

Este documento resume a proposta de evoluir o site atual de HTML, CSS e JS puro para uma base mais organizada em React, com foco em manutenção, responsividade e preservação da identidade visual atual.

## 1. Objetivo da migração

O site atual já comunica bem a proposta do projeto, mas a estrutura em páginas soltas e CSS concentrado dificulta evolução, reaproveitamento e ajuste responsivo.

A migração para React deve resolver três pontos principais:

- organizar melhor as seções do site;
- facilitar manutenção e futuras mudanças de conteúdo;
- tornar a adaptação para mobile e tablet mais simples.

## 2. Stack recomendada

### Recomendação principal: Vite + React

Para este projeto, a opção mais recomendada é usar Vite com React.

Motivos:

- inicialização mais simples;
- build mais rápido;
- desenvolvimento local mais leve;
- estrutura moderna para crescer sem retrabalho.

### Quando não escolher CRA

O Create React App hoje é menos indicado para projetos novos. Ele funciona, mas traz mais peso e menos flexibilidade do que o Vite para uma migração desse tipo.

### Complementos sugeridos

- React Router para separar a navegação entre páginas;
- CSS Modules ou SCSS para modularizar o estilo;
- uma pasta de dados para conteúdo estático, como cards, depoimentos e linha do tempo.

## 3. Estrutura de páginas

Hoje o projeto tem, na prática, duas experiências principais:

- página para escolas;
- página para voluntários.

Em React, isso pode virar rotas claras:

- `/` para a página principal;
- `/voluntarios` para a página de voluntariado.

Isso evita duplicação de header, layout e estilos base.

## 4. Componentes que devem ser criados

### Componentes de alto nível

- `App`
- `Layout`
- `Header`
- `Footer`
- `HomePage`
- `VolunteerPage`

### Componentes por seção

- `HeroSection`
- `AboutSection`
- `AulaSection`
- `ContentSection`
- `ImpactSection`
- `TimelineSection`
- `PartnersSection`
- `ContactSection`

### Componentes reutilizáveis

- `Button`
- `SectionTitle`
- `Card`
- `StatCard`
- `TimelineItem`
- `FeatureItem`
- `ImageCard`

## 5. Como dividir o conteúdo atual

O conteúdo que hoje está espalhado em blocos de HTML pode virar objetos e listas no React.

Exemplos do que vale virar dados:

- itens de menu;
- cards de benefícios;
- cards de atuação;
- depoimentos;
- números de impacto;
- etapas da linha do tempo;
- empresas ou parceiros.

Isso reduz repetição e deixa o conteúdo mais fácil de editar depois.

## 6. Responsividade

O CSS atual funciona visualmente, mas ainda depende muito de medidas fixas e espaçamentos grandes. Na migração, a base responsiva deve mudar para um layout mais fluido.

### Regras recomendadas

- usar `max-width` e `minmax()` para larguras de bloco;
- evitar larguras fixas em cards e imagens;
- usar `clamp()` em títulos, espaçamentos e fontes;
- aplicar `grid` para listas de cards;
- permitir `flex-wrap` onde hoje tudo está alinhado em linha;
- adotar breakpoints em mobile, tablet e desktop.

### Pontos críticos do layout atual

- header com muito espaço lateral;
- hero com tipografia grande demais para telas pequenas;
- cards com largura fixa;
- seções com padding horizontal excessivo;
- imagens que precisam escalar melhor sem quebrar o bloco.

### Ajuste prático

No mobile, blocos que hoje estão lado a lado devem empilhar em coluna. No tablet, a ideia é manter 2 colunas sempre que fizer sentido. No desktop, aí sim os blocos maiores podem voltar ao layout horizontal.

## 7. Evolução estética sem perder o padrão atual

A recomendação não é “reinventar” a identidade visual, e sim profissionalizá-la.

### O que manter

- azul escuro como cor principal;
- azul claro como fundo de superfície;
- verde como destaque secundário;
- amarelo como cor de chamada;
- aparência institucional e acolhedora.

### O que melhorar

- criar escala de espaçamento mais consistente;
- padronizar bordas e sombras;
- reduzir o peso visual do header;
- melhorar hierarquia de títulos e subtítulos;
- deixar os cards mais uniformes;
- dar mais respiro entre blocos.

### Diretriz de estilo

A evolução visual deve parecer a mesma marca, só que mais madura, mais limpa e mais adaptável em telas pequenas.

## 8. Organização de CSS

Em vez de um CSS único e grande, a melhor abordagem é separar por responsabilidade.

Sugestão:

- `styles/variables.css` para cores, espaçamento e tipografia;
- `styles/global.css` para reset e base;
- `components/Header.module.css`;
- `components/HeroSection.module.css`;
- `components/Card.module.css`;
- `pages/HomePage.module.css`;
- `pages/VolunteerPage.module.css`.

Se a equipe preferir algo mais simples no início, também dá para começar com CSS Modules e deixar SCSS para uma etapa posterior.

## 9. Ordem recomendada de migração

### Fase 1: base do projeto

- criar o projeto com Vite;
- configurar React Router;
- migrar fontes, cores e variáveis globais;
- montar layout base.

### Fase 2: estrutura das páginas

- migrar header;
- migrar hero;
- migrar seção sobre;
- migrar cards principais.

### Fase 3: conteúdo dinâmico

- transformar listas repetidas em arrays de dados;
- criar componentes reutilizáveis;
- remover duplicações de markup.

### Fase 4: refinamento visual

- revisar responsividade;
- ajustar tipografia;
- revisar sombras, bordas e espaçamentos;
- validar em celular, tablet e desktop.

## 10. Checklist de execução

Para facilitar o trabalho da equipe, este pode ser o passo a passo prático do aprimoramento:

- [ ] alinhar a decisão de usar Vite + React;
- [ ] criar a estrutura inicial do projeto;
- [ ] separar as páginas principais em rotas;
- [ ] montar o layout base com header e navegação;
- [ ] criar os componentes reutilizáveis;
- [ ] migrar os blocos de conteúdo para arrays de dados;
- [ ] organizar o CSS em arquivos menores;
- [ ] revisar a responsividade em mobile, tablet e desktop;
- [ ] ajustar a estética sem mudar a identidade visual;
- [ ] fazer uma revisão final com a equipe.

## 11. Benefícios esperados

- código mais legível;
- manutenção mais simples;
- conteúdo mais fácil de atualizar;
- layout mais responsivo;
- menor risco de quebrar a página ao fazer mudanças;
- base preparada para crescer com novas seções.

## 12. Decisão recomendada para a equipe

Se a equipe quiser uma direção objetiva, a proposta é:

- migrar para Vite + React;
- manter a identidade visual atual como base;
- dividir o site por páginas e componentes;
- usar dados em arrays para listas e cards;
- tornar o CSS mais modular e responsivo desde o começo.

Esse caminho entrega organização sem sacrificar a aparência que o projeto já construiu.
