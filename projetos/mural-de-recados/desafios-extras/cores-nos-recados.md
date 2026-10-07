---
title: "Cores nos recados 🎨"
parent: Desafios extras
grand_parent: Mural de recados
nav_order: 2
---

# Cores nos recados 🎨

## O desafio

Num mural de verdade, cada pessoa escolhe a cor do seu post-it. Hoje, todos os recados são amarelos.

Cada recado ganha uma **cor**, escolhida por quem escreveu, numa lista pequena: amarelo, rosa, azul ou verde. O cartão aparece na cor escolhida, e dá para trocar a cor na correção.

![Mural de recados com o botão Novo recado e quatro cartões lado a lado: rosa, azul, verde e amarelo, cada um com a mensagem, a autora em itálico e os botões Editar e Apagar]({{ '/assets/images/mural-de-recados/desafios/cores.png' | relative_url }})
{: .ilustracao }

![Página Novo recado com os campos Seu nome, Recado e Cor, esta com a opção Amarelo escolhida, o botão Postar recado e o link Voltar]({{ '/assets/images/mural-de-recados/desafios/cores-formulario.png' | relative_url }})
{: .ilustracao }

## Pense antes de programar

- A cor é uma informação nova. Onde ela fica guardada? O que precisa mudar no banco de dados?
- Os recados que já existem não têm cor. Com qual cor eles ficam?
- Onde a pessoa escolhe a cor? E na correção?
- Como a cor guardada vira a cor do cartão na tela?

## Você vai praticar

- Acrescentar uma coluna a uma tabela que já existe, com uma [migration]({{ site.baseurl }}{% link glossario.md %}#migration) nova, e dar um valor padrão a ela.
- Acrescentar um campo de escolha ao formulário.
- Usar um valor guardado para montar o nome de uma classe, e escrever um pouco de [CSS]({{ site.baseurl }}{% link glossario.md %}#css) seu.

No código, os nomes ficam em inglês: a coluna se chama `color`, e as cores, `yellow`, `pink`, `blue` e `green`. Na tela, aparecem em português.

Tente resolver sem ajuda antes de abrir as dicas. Abra uma de cada vez, só se precisar.

<details markdown="1">
<summary>Dica 1: a coluna nova</summary>

Gere uma migration que acrescenta a coluna `color` à tabela `messages` (os recados):

```
bin/rails generate migration AddColorToMessages color:string
```

Antes de rodar, abra a migration e faça os recados antigos (e os novos, se ninguém escolher) ficarem amarelos, mudando a linha do `add_column` para:

```ruby
add_column :messages, :color, :string, default: "yellow", null: false
```

Depois, rode `bin/rails db:migrate` e confira no console: `Message.first.color` responde `"yellow"`.

</details>

<details markdown="1">
<summary>Dica 2: o campo de escolha</summary>

No formulário do `new.html.erb`, logo depois do campo do recado, acrescente:

```erb
      <div class="field">
        <%= form.label :color, "Cor", class: "label" %>
        <div class="select">
          <%= form.select :color, [ [ "Amarelo", "yellow" ], [ "Rosa", "pink" ], [ "Azul", "blue" ], [ "Verde", "green" ] ] %>
        </div>
      </div>
```

Cada opção tem o texto que a pessoa vê (`"Rosa"`) e o valor que é guardado (`"pink"`). Faça o mesmo no `edit.html.erb`, para dar para trocar a cor na correção.

</details>

<details markdown="1">
<summary>Dica 3: a cor some!</summary>

Escolheu **Rosa**, postou, e no console `Message.last.color` continua `"yellow"`? Olhe a linha `Parameters` no terminal do servidor: a cor chegou. Ela se perdeu no controller.

O `message_params` é a lista do que o controller aceita do formulário, e a `color` não está nela:

```ruby
  def message_params
    params.expect(message: [ :author, :content, :color ])
  end
```

</details>

<details markdown="1">
<summary>Dica 4: o cartão na cor certa</summary>

No `index.html.erb`, troque a classe amarela do Bulma pela cor do recado:

```erb
<div class="card card-<%= message.color %>">
```

Os cartões ficam brancos: o Bulma não conhece `card-pink`. Ensine no seu arquivo de CSS, o `app/assets/stylesheets/application.css`, logo depois do comentário:

```css
.card-yellow { background-color: #feecc3; }
.card-pink   { background-color: #ffd6dd; }
.card-blue   { background-color: #d6ecff; }
.card-green  { background-color: #d4f5df; }
```

Esse arquivo é lido depois do Bulma, então as suas cores ganham do branco.

</details>

## Indo além

- Crie uma quinta cor: um valor novo nos dois formulários e uma linha nova no CSS. Precisa de migration? Por quê?
- Mostre no topo do mural de recados quantos recados existem de cada cor. Dica: `Message.group(:color).count`.
- Um formulário modificado poderia mandar uma cor que não está na lista. Como o app poderia recusar? Veja o capítulo [E se alguém mandar um recado vazio?]({{ site.baseurl }}{% link projetos/mural-de-recados/07-e-se-o-recado-vier-vazio/index.md %}).
