# Semeia Code — Site Institucional

Este é o repositório oficial do site institucional do **Semeia Code**, um projeto de extensão universitária focado em democratizar o acesso à tecnologia e à programação por meio da educação e do impacto social.

Este repositório contém o código-fonte da plataforma web criada para apresentar o projeto, divulgar nossas iniciativas e conectar a comunidade com os nossos voluntários e parceiros. Aplicação institucional construída com React, Vite e TypeScript.

## Desenvolvimento

```bash
npm install
npm run dev
```

## Validação

```bash
npm test
npm run typecheck
npm run lint
npm run build
```

O build deve ser executado antes de publicar, pois também valida imports com a capitalização correta e a resolução dos assets.

## Organização

- `src/components`: header, navegação, cards e rodapé reutilizáveis.
- `src/pages`: seções apresentadas na página principal.
- `src/model/data.json`: conteúdo editorial das escolas e voluntários.
- `src/model/data.ts`: contratos TypeScript e catálogo de assets.
- `src/styles`: estilos por seção e regras responsivas.

O conteúdo editorial fica separado da apresentação. Imagens públicas usam a pasta `public/images`; ícones processados pelo Vite permanecem em `src/assets`.
