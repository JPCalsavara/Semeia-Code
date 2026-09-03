# Design do React e consolidacao na raiz

## Problem Statement

Como equipe do Semeia Code, temos uma aplicacao React funcional, mas ela vive em uma subpasta enquanto a raiz ainda contem a implementacao HTML legada, folhas de estilo duplicadas, entradas HTML concorrentes e artefatos de instalacao acidentais. Isso dificulta saber qual versao deve ser executada, publicada e alterada.

A interface tambem precisa de uma direcao visual mais intencional. O layout atual preserva a identidade azul, verde e amarela do projeto, mas ainda usa dimensoes rigidas, hierarquia visual irregular, conteudo placeholder e pouca validacao visual em mobile. A equipe quer aplicar uma skill de design de frontend encontrada na internet e consolidar o React na raiz sem perder a identidade do Semeia Code.

## Solution

Adotar o React como unica aplicacao do repositorio, movendo sua entrada, configuracao, dependencias, codigo-fonte, assets publicos e scripts para a raiz. Remover ou arquivar a implementacao HTML/CSS legada conforme uma decisao explicita de transicao, deixando uma unica fonte de verdade para o site.

Aplicar a skill `frontend-design` da Anthropic como referencia de direcao visual e usar `web-design-guidelines` da Vercel como checklist de acessibilidade, interacao e qualidade web. O redesign deve ser especifico para o Semeia Code: uma experiencia institucional e acolhedora de educacao em tecnologia, com foco em escolas publicas, voluntarios universitarios e impacto mensuravel.

A raiz deve executar os comandos de desenvolvimento, typecheck, lint, testes e build diretamente. A pagina deve manter as visoes para escolas e voluntarios, incluindo empresas somente na visao de escolas e depoimentos completos somente na visao de voluntarios.

## User Stories

1. Como desenvolvedor, quero iniciar a aplicacao a partir da raiz, para nao precisar conhecer uma subpasta especial.
2. Como colaborador, quero encontrar `package.json`, `index.html` e `vite.config` na raiz, para reconhecer imediatamente o projeto executavel.
3. Como operador, quero executar o build a partir da raiz, para reduzir erros de deploy causados por diretorio incorreto.
4. Como mantenedor, quero uma unica entrada React, para evitar divergencia entre HTML legado e aplicacao migrada.
5. Como editor, quero continuar alterando o conteudo editorial em JSON, para atualizar textos sem editar componentes.
6. Como usuario de escolas, quero ver fotos, depoimentos e nomes de empresas na visao de escolas, para entender o alcance do projeto.
7. Como usuario voluntario, quero ver funcoes disponiveis e depoimentos com nome, empresa, cargo/ano e opiniao, para avaliar como participar.
8. Como visitante, quero que a troca entre escolas e voluntarios atualize apenas o conteudo correspondente, para nao receber informacoes de outra audiencia.
9. Como visitante, quero reconhecer o Semeia Code na primeira tela, para entender rapidamente a proposta do projeto.
10. Como visitante, quero uma hierarquia clara entre chamada principal, secoes, indicadores e depoimentos, para escanear a pagina com facilidade.
11. Como usuario de celular, quero navegar sem overflow horizontal, para ler todo o conteudo em telas pequenas.
12. Como usuario de tablet, quero que cards e secoes usem o espaco disponivel sem parecerem comprimidos, para manter legibilidade.
13. Como usuario de desktop, quero uma composicao equilibrada com largura de leitura controlada, para nao percorrer linhas excessivamente longas.
14. Como usuario de teclado, quero foco visivel e ordem de tabulacao previsivel, para usar a pagina sem mouse.
15. Como usuario de tecnologia assistiva, quero headings, landmarks, imagens e controles descritos corretamente, para compreender a pagina.
16. Como visitante, quero que links de contato tenham destinos reais ou nao sejam exibidos como se fossem ativos, para evitar frustracao.
17. Como equipe de design, quero uma paleta, tipografia, espacamento, bordas e sombras documentados, para manter consistencia entre secoes.
18. Como equipe de design, quero uma decisao estetica especifica para o dominio de educacao em tecnologia, para evitar uma interface generica.
19. Como mantenedor, quero que imagens tenham dimensoes e carregamento apropriados, para reduzir deslocamento de layout.
20. Como mantenedor, quero validar o resultado em larguras de celular, tablet e desktop, para detectar regressao visual antes do deploy.
21. Como contribuinte, quero uma documentacao unica de instalacao e comandos, para configurar o ambiente rapidamente.
22. Como responsavel pelo deploy, quero que assets, favicon e caminhos funcionem a partir da raiz, para publicar sem ajustes manuais.
23. Como equipe, quero preservar o historico e os assets uteis do legado sem manter duas implementacoes executaveis, para concluir a migracao com baixo risco.
24. Como mantenedor, quero typecheck, lint, testes e build no CI, para bloquear regressao estrutural ou visual importante.

## Implementation Decisions

- Usar Vite + React + TypeScript como stack oficial na raiz do repositorio.
- Mover o conteudo funcional da aplicacao React para a raiz, incluindo entrada HTML, configuracao Vite, scripts, dependencias, fonte, dados e assets necessarios.
- Atualizar todos os imports relativos e caminhos de assets depois da movimentacao; imports devem respeitar capitalizacao para funcionar em sistemas Linux.
- Manter um unico `package.json` executavel na raiz e remover artefatos de instalacao acidentais ou duplicados que nao pertencam ao projeto.
- Remover os HTMLs e CSSs legados da superficie executavel ou move-los para uma area explicitamente historica, sem scripts de deploy apontando para eles.
- Preservar o modelo de dados JSON tipado, com colecoes separadas para escolas, empresas, funcoes de voluntariado, depoimentos, impacto, timeline e contatos.
- Manter `partnerCompanies` somente na visao para escolas.
- Manter `volunteerTestimonials` somente na visao para voluntarios, com os campos `name`, `company`, `roleYear` e `text` obrigatorios para renderizacao.
- Nao inventar URLs, depoimentos, nomes ou empresas; registros incompletos devem ser omitidos da interface ate receberem dados reais.
- Aplicar a skill `frontend-design` da Anthropic como referencia de processo visual. Instalacao recomendada: `npx skills add https://github.com/anthropics/skills --skill frontend-design`.
- Usar `web-design-guidelines` da Vercel como auditoria complementar de acessibilidade, interacao, tipografia e layout. Instalacao recomendada: `npx skills add https://github.com/vercel-labs/agent-skills --skill web-design-guidelines`.
- Antes de codificar o redesign, declarar a direcao visual: educacao tecnologica comunitaria, com composicao editorial modular, contraste entre azul profundo e amarelo de chamada, verde como sinal de crescimento e tipografia expressiva sem depender de fontes genericas.
- Definir tokens CSS para cores, espacamento, tipografia, raio, sombra e largura de conteudo; componentes devem consumir tokens em vez de repetir valores arbitrarios.
- Reestruturar o layout com grids e limites fluidos, usando `minmax`, `clamp`, `max-width` e breakpoints coerentes.
- Criar estados responsivos para header, navegacao, hero, cards, indicadores, timeline, depoimentos e rodape.
- Usar movimento com parcimonia: uma entrada de pagina ou revelacao de secoes e microinteracoes que reforcem a leitura, respeitando `prefers-reduced-motion`.
- Melhorar semantica e acessibilidade: um `h1` principal, landmarks, `aria-current`, `aria-pressed`, foco visivel, alt text correto e links de contato condicionais.
- Manter componentes com responsabilidades claras, evitando concentrar decisao visual, dados e comportamento em um unico arquivo.
- Definir a remocao do estado booleano de visao como melhoria posterior ou converter para um estado de dominio nomeado durante a reorganizacao, sem introduzir roteamento se ele nao for necessario para a primeira entrega.

## Testing Decisions

- A seam principal sera a aplicacao executada a partir da raiz: os mesmos comandos devem instalar, iniciar, verificar e gerar o bundle sem `cd` adicional.
- O teste principal deve observar comportamento externo: a pagina carrega, alterna entre visoes, mostra empresas apenas para escolas e mostra os quatro campos do depoimento apenas para voluntarios.
- O build de producao deve confirmar a entrada HTML, imports, JSON, favicon e assets depois da movimentacao.
- O typecheck deve validar props, dados editoriais e contratos dos componentes.
- O lint deve abranger `js`, `jsx`, `ts` e `tsx`.
- Testes de integracao devem verificar headings, landmarks, links, estados acessiveis e renderizacao condicional das duas audiencias.
- Um teste de contrato deve rejeitar campos ausentes ou assets desconhecidos no conteudo JSON.
- A auditoria visual deve usar a skill `web-design-guidelines` sobre os componentes e estilos finais.
- A validacao responsiva deve cobrir pelo menos 320px, 375px, 768px, 1024px e desktop amplo, incluindo ausencia de overflow horizontal.
- A validacao deve incluir `prefers-reduced-motion` e navegacao por teclado.
- Nao ha suite existente relevante no repositorio; os novos testes devem priorizar integracao e contrato, evitando snapshots extensos de CSS.

## Out of Scope

- Criar backend, CMS, autenticacao ou banco de dados.
- Publicar o site ou escolher um provedor de hospedagem.
- Reescrever o conteudo institucional sem aprovacao da equipe.
- Inventar dados reais para depoimentos, contatos, escolas ou empresas.
- Transformar a pagina em um produto administrativo.
- Adicionar uma biblioteca de componentes grande sem necessidade comprovada.
- Manter duas aplicacoes executaveis apos a consolidacao na raiz.
- Fazer uma rebrand completa ou abandonar as cores reconheciveis do Semeia Code.

## Further Notes

Fontes consultadas:

- Skill `frontend-design`: https://www.skills.sh/anthropics/skills/frontend-design. A pagina descreve direcao estetica intencional, tipografia, tokens de cor, composicao, textura e movimento, alem de recomendar evitar interfaces genericas.
- Skill `web-design-guidelines`: https://www.skills.sh/vercel-labs/agent-skills/web-design-guidelines. A pagina descreve uma auditoria atualizada de espacamento, tipografia, interacao e acessibilidade.
- Documentacao oficial do Vite: https://vite.dev/guide/. Vite trata `index.html` como ponto de entrada e usa o diretorio de execucao como raiz; a documentacao tambem descreve a possibilidade de raiz alternativa, que deixa de ser necessaria apos a consolidacao.
- Documentacao oficial do React: https://react.dev/learn. A organizacao por componentes, renderizacao condicional, listas e estado compartilhado orienta a separacao das duas visoes.

O primeiro criterio de aceite e executar `npm install`, `npm run typecheck`, `npm run lint`, `npm run build` e `npm run dev` a partir da raiz. O segundo e confirmar visualmente as duas audiencias em desktop e mobile.

A publicacao no issue tracker permanece pendente porque `docs/agents/issue-tracker.md` nao existe no repositorio. Execute `/setup-matt-pocock-skills` antes de publicar e aplicar a triagem `ready-for-agent`.
