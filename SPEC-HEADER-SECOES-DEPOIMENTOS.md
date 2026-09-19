# Header responsivo, secoes em viewport e depoimentos de voluntarios

## Problem Statement

Como visitante do Semeia Code, quero navegar confortavelmente em celulares e compreender rapidamente quem participa do projeto. Atualmente, o header mantem a navegacao aberta em telas pequenas, as secoes nao reservam uma altura consistente considerando o header fixo e a area de depoimentos de voluntarios exibe apenas o texto, sem foto ou uma apresentacao adequada dos dados da pessoa.

A area **Onde nossos voluntarios atuam hoje** precisa valorizar os voluntarios com uma foto, nome, empresa e cargo na organizacao, alem da opiniao sobre o projeto. O conteudo deve continuar vindo do JSON e funcionar quando houver mais de tres voluntarios, sem criar uma pagina excessivamente longa ou uma grade comprimida.

## Solution

Implementar um header responsivo com um botao de menu contendo icone e nome da navegacao. Em mobile, o botao abre e fecha um painel com os links e o botao de alternancia entre as visoes; em desktop, os links continuam visiveis conforme o layout atual. O controle deve ser acessivel por teclado e tecnologia assistiva, fechar apos a selecao de um link e fechar com `Escape`.

Ajustar a estrutura visual para que cada secao principal ocupe a altura disponivel da viewport descontando o header fixo, sem cortar conteudo quando uma secao precisar crescer. A area de voluntarios deve apresentar cards com foto, nome, empresa, cargo/ano e opiniao. Quando houver mais de tres cards, a lista deve poder ser arrastada horizontalmente por toque ou mouse, mantendo indicacao visual de que existe mais conteudo e sem depender apenas de setas.

## User Stories

1. Como usuario mobile, quero ver um botao de menu com icone e nome, para entender como acessar a navegacao.
2. Como usuario mobile, quero abrir e fechar o menu pelo botao, para controlar o espaco ocupado pelo header.
3. Como usuario de teclado, quero abrir o menu com foco e ativacao pelo teclado, para navegar sem mouse.
4. Como usuario de tecnologia assistiva, quero que o botao informe se o menu esta aberto ou fechado, para compreender o estado atual.
5. Como usuario, quero que o menu seja fechado ao escolher uma secao, para voltar imediatamente ao conteudo selecionado.
6. Como usuario, quero que `Escape` feche o menu aberto, para sair rapidamente da navegacao.
7. Como usuario mobile, quero que o foco permaneça em uma ordem logica no menu aberto, para nao navegar por elementos escondidos.
8. Como usuario desktop, quero manter acesso direto aos links principais, para nao precisar abrir um menu desnecessariamente.
9. Como visitante, quero que o header fixo nao esconda o inicio das secoes, para saber onde estou ao navegar por ancora.
10. Como visitante, quero que cada secao ocupe a altura disponivel da viewport, para perceber claramente a separacao entre as partes da pagina.
11. Como usuario mobile, quero que secoes com conteudo extenso possam crescer alem da viewport, para que nenhum texto ou controle seja cortado.
12. Como usuario tablet, quero que as secoes usem o espaco vertical e horizontal de forma equilibrada, para manter leitura confortavel.
13. Como usuario desktop, quero que a altura das secoes crie uma composicao consistente, para percorrer a pagina com ritmo visual previsivel.
14. Como voluntario, quero aparecer com minha foto, para que meu depoimento tenha uma identificacao mais humana.
15. Como visitante, quero ver o nome do voluntario, para saber quem forneceu a opiniao.
16. Como visitante, quero ver a empresa do voluntario, para compreender sua experiencia profissional.
17. Como visitante, quero ver o cargo e o ano ou periodo de participacao, para contextualizar o depoimento.
18. Como visitante, quero ler a opiniao do voluntario sobre o projeto, para entender o impacto da experiencia.
19. Como editor, quero cadastrar foto, nome, empresa, cargo/ano e opiniao no JSON, para atualizar os depoimentos sem alterar o componente.
20. Como editor, quero que cada voluntario tenha um identificador estavel, para que a lista seja renderizada sem depender da posicao do item.
21. Como visitante, quero ver ate tres depoimentos organizados de forma legivel na primeira visualizacao, para comparar pessoas sem reduzir demais o card.
22. Como usuario mobile, quero arrastar a lista horizontalmente com o dedo, para acessar voluntarios adicionais naturalmente.
23. Como usuario desktop, quero arrastar a lista com o mouse ou trackpad, para acessar cards alem dos primeiros tres.
24. Como visitante, quero uma indicacao de que ha mais cards, para descobrir conteudo que nao esta inicialmente visivel.
25. Como usuario de teclado, quero acessar todos os depoimentos sem depender de arraste, para que a interacao seja inclusiva.
26. Como usuario com reducao de movimento ativada, quero uma transicao discreta ou nenhuma animacao desnecessaria, para navegar com conforto.
27. Como mantenedor, quero que a ausencia de uma foto nao quebre o card, para que um dado incompleto tenha um fallback controlado.
28. Como mantenedor, quero validar que o JSON possui os campos necessarios, para evitar cards sem identificacao ou opiniao.
29. Como equipe, quero preservar a identidade azul, verde e amarela, para que a melhoria continue reconhecivel como Semeia Code.
30. Como equipe, quero validar o comportamento em celular, tablet e desktop, para reduzir regressao visual.

## Implementation Decisions

- Manter o header como componente compartilhado e adicionar um estado local de menu aberto, sem criar estado global para uma interacao restrita ao header.
- Usar um botao semantico para o menu, com icone visual, texto visivel como `Menu` ou `Navegacao`, `aria-expanded` e `aria-controls` apontando para o painel.
- Em telas mobile, ocultar visualmente os links quando o menu estiver fechado e impedir que elementos escondidos recebam foco; em telas maiores, manter a navegacao aberta.
- Fechar o menu ao clicar em um link, ao pressionar `Escape` e ao alternar a visao, quando essa acao for realizada dentro do painel mobile.
- Preservar o botao de alternancia entre escolas e voluntarios dentro do fluxo de navegacao e manter seu estado acessivel com `aria-pressed`.
- Usar uma variavel CSS para a altura do header e definir a altura minima das secoes como `calc(100svh - var(--header-height))`, com `min-height` como limite, permitindo que secoes com muito conteudo crescam naturalmente.
- Considerar `100svh` para mobile, evitando problemas do viewport dinamico causado pelas barras do navegador; fornecer fallback razoavel para navegadores sem suporte.
- Adicionar `scroll-margin-top` nas secoes de ancora para que o header fixo nao cubra seus titulos.
- Estender o contrato de `VolunteerTestimonial` com `image`, mantendo `id`, `name`, `company`, `roleYear` e `text` obrigatorios para um registro completo.
- Atualizar `volunteerTestimonials` no JSON para ser a unica fonte editorial dos cards de voluntarios; nao duplicar esses dados no JSX.
- Resolver imagens pela camada TypeScript e usar uma imagem fallback ou um placeholder sem texto enganoso quando a foto nao estiver disponivel.
- Renderizar a area **Onde nossos voluntarios atuam hoje** somente na visao de voluntarios; a visao para escolas continua exibindo somente os nomes das empresas parceiras.
- Usar uma faixa horizontal com `overflow-x: auto`, `scroll-snap-type` opcional e cards com largura estavel. O layout deve mostrar no maximo tres cards por vez em desktop e adaptar a largura para um ou dois em telas menores.
- Tornar a faixa arrastavel por gesto nativo de toque e trackpad. Se for adicionado suporte de arraste com ponteiro, ele nao pode impedir selecao de texto, foco de links ou acessibilidade do teclado.
- Exibir uma dica visual de continuidade, como parte do proximo card parcialmente visivel, sem depender exclusivamente de texto explicativo.
- Manter cada card com hierarquia visual: foto, nome, empresa/cargo/ano e opiniao. A opiniao deve continuar legivel e nao ser comprimida para caber em uma unica linha.
- Usar `alt` descritivo para fotos reais e `alt=""` somente para imagens decorativas ou fallback puramente visual.
- Respeitar `prefers-reduced-motion` nas transicoes do menu, scroll suave e qualquer entrada visual dos cards.
- Preservar as cores e tokens existentes, mas ajustar espacamento e contraste quando necessario para que os novos cards nao parecam uma caixa aninhada sem hierarquia.

## Testing Decisions

- A seam principal sera a aplicacao React renderizada no navegador, porque header, altura das secoes e faixa de depoimentos formam uma experiencia integrada.
- Os testes devem verificar comportamento externo: menu abre e fecha, links continuam acessiveis, secoes nao ficam ocultas pelo header e os dados aparecem nos cards.
- Um teste de integracao deve abrir a visao de voluntarios e confirmar a presenca de foto, nome, empresa, cargo/ano e opiniao para cada registro completo.
- O mesmo teste deve confirmar que a visao para escolas mostra somente os nomes das empresas e nao renderiza os metadados dos voluntarios.
- Um teste de acessibilidade deve verificar `aria-expanded`, `aria-controls`, `aria-pressed`, foco visivel e fechamento com `Escape`.
- Um teste de contrato deve garantir que cada depoimento de voluntario completo tenha `id`, `image`, `name`, `company`, `roleYear` e `text` nao vazios.
- A validacao responsiva deve cobrir 320px, 375px, 768px, 1024px e desktop amplo, verificando menu, altura minima, ausencia de overflow vertical acidental e existencia de rolagem horizontal somente na faixa de cards.
- A validacao de arraste deve usar pelo menos um viewport mobile e um desktop, confirmando que uma lista com mais de tres voluntarios pode revelar o quarto item.
- A validacao deve incluir teclado para acessar cards alem do primeiro conjunto, sem exigir arraste.
- A validacao visual deve incluir `prefers-reduced-motion` e verificar que o conteudo continua disponivel sem animacao.
- Nao ha testes equivalentes existentes no repositorio; a cobertura deve ser de integracao e contrato, evitando testar detalhes internos de estado ou classes CSS especificas sem efeito observavel.

## Out of Scope

- Criar backend ou painel administrativo para cadastro de voluntarios.
- Inventar fotos, nomes, empresas, cargos, anos ou opinioes que nao tenham sido fornecidos pela equipe.
- Implementar um carrossel automatico que avance sozinho.
- Exigir uma biblioteca externa de carousel ou drag-and-drop sem necessidade comprovada.
- Alterar o conteudo da visao para escolas alem de preservar a lista de nomes das empresas.
- Redesenhar integralmente a marca, substituir todas as fontes ou trocar a paleta sem aprovacao.
- Alterar a implementacao HTML legada caso ela ja esteja arquivada fora da superficie executavel do React.
- Criar rotas novas apenas para atender o menu mobile.

## Further Notes

A implementacao deve considerar que o JSON atual possui quatro depoimentos de voluntarios, mas ainda nao possui o campo de imagem. Os dados reais existentes devem ser preservados; a equipe precisara fornecer ou aprovar as fotos correspondentes antes da publicacao.

A especificacao usa como referencia de processo a skill `frontend-design` da Anthropic, que recomenda escolhas visuais deliberadas, tipografia com personalidade, tokens de cor, composicao e movimento com proposito: https://www.skills.sh/anthropics/skills/frontend-design.

Como referencia de auditoria de interacao e acessibilidade, pode ser usada a skill `web-design-guidelines` da Vercel: https://www.skills.sh/vercel-labs/agent-skills/web-design-guidelines.

A documentacao oficial do Vite trata `index.html` como ponto de entrada e o diretorio de execucao como raiz do projeto: https://vite.dev/guide/. A documentacao oficial do React orienta componentes, renderizacao condicional, listas e estado compartilhado: https://react.dev/learn.

O primeiro criterio de aceite e que a aplicacao continue passando `npm run typecheck`, `npm run lint` e `npm run build`. O segundo e validar no navegador as duas visoes em mobile e desktop.

A publicacao no issue tracker permanece pendente porque `docs/agents/issue-tracker.md` nao existe no repositorio. Execute `/setup-matt-pocock-skills` antes de publicar e aplicar a triagem `ready-for-agent`.
