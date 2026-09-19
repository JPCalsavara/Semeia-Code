# Migracao para TypeScript e dados em JSON

## Problem Statement

Como equipe do Semeia Code, precisamos manter uma aplicacao React cuja camada de dados atualmente esta espalhada em um modulo JavaScript unico e sem validacao de tipos. Isso torna facil introduzir nomes inconsistentes, quebrar consumidores ao editar conteudo e dificultar a evolucao das duas visoes do site: escolas e voluntarios.

A migracao tambem esta bloqueada por um erro de resolucao sensivel a maiusculas e minusculas no import da pagina inicial, e o build de producao nao pode ser usado como criterio de entrega enquanto esse problema existir.

## Solution

Migrar os componentes, paginas e modelo de dados da aplicacao para TypeScript, centralizando o conteudo editorial em um arquivo `data.json` validado por tipos em tempo de compilacao. A interface deve continuar oferecendo as visoes de escolas e voluntarios, mas com contratos explicitos para cards, escolas, depoimentos, indicadores, linha do tempo, empresas e contatos.

A migracao deve corrigir o import da pagina inicial, manter os assets funcionando no build de producao e estabelecer comandos de lint e build como verificacoes obrigatorias. O conteudo real deve substituir placeholders antes da publicacao.

## User Stories

1. Como desenvolvedor, quero que componentes React usem TypeScript, para detectar contratos invalidos antes da execucao.
2. Como desenvolvedor, quero tipar as propriedades de cada componente, para tornar explicito quais dados cada componente aceita.
3. Como desenvolvedor, quero tipar o estado que alterna entre escolas e voluntarios, para evitar estados booleanos ambiguos conforme a aplicacao crescer.
4. Como editor de conteudo, quero alterar textos e listas em um arquivo JSON, para nao precisar editar componentes React.
5. Como editor de conteudo, quero que o JSON tenha uma estrutura previsivel, para reduzir erros de nomes e campos ausentes.
6. Como usuario de escolas, quero visualizar nomes reais das escolas, fotos e depoimentos reais, para confiar nas informacoes apresentadas.
7. Como candidato a voluntario, quero ver funcoes, descricoes e depoimentos reais, para entender como posso participar.
8. Como visitante, quero ver indicadores de impacto com descricao significativa, para compreender o resultado do projeto.
9. Como visitante, quero acompanhar uma linha do tempo coerente, para entender a evolucao do Semeia Code.
10. Como usuario, quero alternar entre escolas e voluntarios sem perder o conteudo ou quebrar a navegacao, para explorar as duas experiencias.
11. Como usuario de celular, quero que todas as secoes se ajustem a telas pequenas, para ler e navegar sem rolagem horizontal.
12. Como usuario de teclado, quero identificar o foco nos links e controles, para navegar sem mouse.
13. Como usuario de tecnologia assistiva, quero que controles e imagens tenham nomes acessiveis, para entender o conteudo e as acoes disponiveis.
14. Como operador, quero que o build de producao resolva imports e assets em ambiente Linux, para publicar a aplicacao com confianca.
15. Como mantenedor, quero que lint e build sejam executados no CI, para impedir que regressao de compilacao chegue ao repositorio principal.
16. Como mantenedor, quero uma documentacao atualizada da arquitetura e dos comandos, para que novos contribuidores consigam executar o projeto.
17. Como equipe, quero remover ou isolar a implementacao HTML legada, para evitar duas fontes de verdade para o mesmo site.
18. Como equipe, quero preservar a identidade visual existente enquanto modernizamos o layout, para melhorar a experiencia sem descaracterizar o projeto.

## Implementation Decisions

- Converter arquivos de componentes, paginas e modelo de dados para TypeScript, adotando extensoes adequadas para arquivos com JSX.
- Configurar compilacao e verificacao TypeScript com regras estritas o suficiente para capturar propriedades ausentes, imports invalidos e valores incompatíveis.
- Manter o Vite como ferramenta de desenvolvimento e build, adicionando apenas os plugins e tipos necessarios.
- Substituir o modulo JavaScript monolitico por um arquivo JSON de conteudo e um modulo TypeScript responsavel por expor os dados tipados.
- Definir contratos para: card institucional, escola, funcao de voluntariado, depoimento, indicador de impacto, evento da linha do tempo, empresa parceira e canal de contato.
- Usar identificadores estaveis definidos no conteudo para renderizacao de listas; indices de arrays nao serao usados como chaves React.
- Manter imports de imagens e icones como responsabilidade da camada de apresentacao ou de um catalogo de assets, sem gravar caminhos de `src` diretamente no HTML de entrada.
- Corrigir a capitalizacao dos imports para que o build seja deterministico em sistemas de arquivos sensiveis a maiusculas e minusculas.
- Representar a visao atual como um estado de dominio nomeado, preparado para evoluir para rotas distintas sem duplicar o layout compartilhado.
- Preservar Header, Navbar, Footer e as secoes existentes como unidades reutilizaveis, explicitando suas interfaces TypeScript.
- Tornar contatos interativos, com URLs e rotulos acessiveis fornecidos pelo JSON.
- Organizar tokens visuais e regras responsivas em uma base comum, substituindo dimensoes fixas por limites fluidos quando necessario.
- Definir uma estrategia para a implementacao legada: removela ao concluir a migracao ou marca-la explicitamente como temporaria, sem alterar ambas as versoes em paralelo.
- Atualizar a documentacao para descrever instalacao, desenvolvimento, lint, build, estrutura de dados e criterio de aceite.

## Testing Decisions

- A seam principal sera o fluxo da aplicacao React compilada: executar build e renderizar as duas visoes, verificando que os dados do JSON aparecem nos elementos visiveis e que a alternancia funciona.
- Os testes devem observar comportamento externo, como conteudo renderizado, links, estados acessiveis e ausencia de overflow, e nao detalhes internos de implementacao ou nomes privados de funcoes.
- O build de producao sera um teste obrigatorio para detectar imports com capitalizacao incorreta, JSON invalido e assets nao resolvidos.
- O lint e a verificacao TypeScript serao executados como testes estaticos obrigatorios.
- O carregamento do JSON sera testado por um contrato que confirme a presenca e o tipo das colecoes consumidas pelas paginas.
- Componentes de apresentacao serao cobertos por testes de integracao focados nas visoes de escolas e voluntarios, incluindo listas, indicadores, timeline e contatos.
- A navegacao por teclado sera validada nos controles principais, incluindo foco visivel, estado do controle de visao e links de contato.
- A responsividade sera verificada em larguras de celular, tablet e desktop, incluindo uma assercao de que o documento nao produz overflow horizontal.
- Nao ha testes equivalentes existentes no repositorio; a suite inicial deve estabelecer esses testes no nivel de integracao da aplicacao, evitando testes unitarios excessivos para markup trivial.

## Out of Scope

- Criar backend, CMS ou banco de dados para editar o conteudo.
- Implementar autenticacao ou area administrativa.
- Alterar a identidade de marca, textos institucionais aprovados ou estrategia de comunicacao sem validacao da equipe.
- Adicionar animacoes complexas ou uma biblioteca visual completa.
- Migrar o site legado para uma segunda implementacao TypeScript em paralelo.
- Reescrever toda a aplicacao com uma nova arquitetura de estado global.
- Publicar o site ou configurar infraestrutura de hospedagem nesta etapa.

## Further Notes

O primeiro criterio de aceite e `npm run build` passar em ambiente Linux. A migracao deve ser feita em etapas pequenas: corrigir a compilacao, configurar TypeScript, introduzir o contrato do JSON, migrar dados e componentes, e entao validar acessibilidade e responsividade.

A publicacao desta especificacao no issue tracker ficou pendente porque o repositorio nao possui o arquivo de configuracao de issue tracker esperado pela skill (`docs/agents/issue-tracker.md`). Execute `/setup-matt-pocock-skills` para configurar esse fluxo e aplicar a triagem `ready-for-agent`.
