---
title: "06. Como deixar o mural de recados mais bonito?"
parent: Notas do Mural de recados
grand_parent: Notas dos projetos
nav_order: 7
---

# 06. Como deixar o mural de recados mais bonito?

[Ver capítulo]({{ site.baseurl }}{% link projetos/mural-de-recados/06-como-deixar-o-mural-mais-bonito/index.md %}) <!-- TODO: quando as tags existirem, voltar com \" · Código de referência: tag `passo-06`\", com link para a tag no repositório RailsGirls-SP/mural-de-recados. -->

## Perguntas para o "Pense antes"

- "Como é um post-it de verdade? O que faz ele parecer um papel colado na parede?" Leva à cor de fundo e à sombra.
- "Num celular, os cartões cabem lado a lado?" Leva à grade que se ajusta à largura da tela.
- "O que muda nos dados para os recados ficarem bonitos?" Nada: é o ponto do capítulo, só a aparência muda.

## Confusões comuns

- **A linha do Bulma fora do lugar.** O `<link>` precisa ficar dentro do `<head>` do layout, antes da linha do `stylesheet_link_tag`. Assim, o `application.css`, que entra no desafio extra das cores, é lido depois do Bulma e consegue mudar as cores dos cartões.
- **Esquecer o `data-theme="light"`.** Quem usa o computador no modo escuro vê o mural de recados escuro, diferente dos prints do guia.
- **A vírgula antes do `class:`.** Em `form.text_field :author, class: "input"`, sem a vírgula aparece um erro de sintaxe.
- **Sobras do código antigo.** Os passos 3, 4 e 5 trocam pedaços grandes das views. É comum sobrar um `<% end %>` a mais ou faltar um. Peça para comparar o arquivo inteiro com o guia.
- **`</div>` faltando.** Não dá erro, mas bagunça a página. O editor ajuda: ao clicar numa `<div>`, ele destaca o `</div>` correspondente.
- **Sem internet, sem Bulma.** O endereço do `<link>` é de uma **CDN** (*Content Delivery Network*, rede de entrega de conteúdo): um serviço, aqui o jsDelivr, que guarda arquivos públicos como o Bulma em servidores pelo mundo e entrega o mais próximo de quem pede. Por isso não é preciso instalar nada, mas o navegador precisa de internet para buscar o arquivo. Se a rede do evento cair, a página volta a ser só texto, mas o app continua funcionando. O guia não usa a palavra "CDN" com as participantes: para elas, a linha do `<link>` só "busca os estilos do Bulma na internet".
- **Inspecionar.** Vale mostrar o **Inspecionar** do navegador: dá para ver as classes de cada cartão e pode testar outras classes ao vivo, sem medo de quebrar o arquivo.

## Por que Bulma, e não Tailwind

{: .atencao }
Só para a mentoria. **Não precisa explicar isso para as participantes**: para elas, o guia só diz que o Bulma é um conjunto de estilos prontos.

O objetivo do capítulo é deixar o mural de recados bonito no fim do dia, com o mínimo de informação nova. O Bulma ganhou por isso:

| | Bulma | Tailwind |
|---|---|---|
| **Instalação** | Uma linha no layout, pela CDN. Nada para instalar. | No Rails, usa a gem `tailwindcss-rails`, um passo de build e o `bin/dev` no lugar do `bin/rails server`. Mais uma peça para dar errado no Codespaces. |
| **Nomes das classes** | Nomes de componentes, que se leem quase como palavras: `card`, `button`, `box`, `title`. | Classes utilitárias, uma para cada detalhe: `p-4 bg-yellow-100 rounded shadow`. Cada elemento ganha uma lista longa. |
| **Para quem está começando** | O HTML continua fácil de ler, e a participante entende o que cada classe faz pelo nome. | Exige saber CSS para entender o que cada classe faz, e a view fica cheia de classes. |
| **JavaScript** | Nenhum: só CSS. | Nenhum também, mas o build roda em paralelo. |

O Tailwind é muito usado no mercado, e o próprio Rails oferece a opção `--css tailwind` no `rails new`. Para quem quiser continuar depois do workshop, é um bom próximo passo, junto com aprender a escrever CSS do zero.

Também ficou de fora o **Bootstrap**: ele é parecido com o Bulma nos nomes de componentes, mas alguns componentes dependem de JavaScript, e o visual padrão é mais reconhecível como "cara de Bootstrap".

## Ir além com o Bulma

Se sobrar tempo, sugestões para brincar sem ajuda, com a [documentação do Bulma](https://bulma.io/documentation/) aberta:

- Trocar a cor do botão **Postar recado** (`is-link`, `is-info`, `is-success`, `is-warning`).
- Colocar um cabeçalho com o componente `hero`, com título e subtítulo.
- Mostrar o número de recados com uma `tag`, por exemplo "4 recados" (`@messages.count`).
- Girar os cartões um pouquinho, como post-its, com CSS próprio no `application.css`: `.card { rotate: -1deg; }`.
