# Semeia Code

Aplicacao institucional do Semeia Code, construida com React, Vite e TypeScript.

## Desenvolvimento

```bash
npm install
npm run dev
```

## Validacao

```bash
npm run typecheck
npm run lint
npm run build
```

O build deve ser executado antes de publicar, pois tambem valida imports com a
capitalizacao correta e a resolucao dos assets.

## Organizacao

- `src/components`: header, navegacao, cards e rodape reutilizaveis.
- `src/pages`: secoes apresentadas na pagina principal.
- `src/model/data.json`: conteudo editorial das escolas e voluntarios.
- `src/model/data.ts`: contratos TypeScript e catalogo de assets.
- `src/styles`: estilos por secao e regras responsivas.

O conteudo editorial fica separado da apresentacao. Imagens publicas usam a
pasta `public/images`; icones processados pelo Vite permanecem em `src/assets`.
