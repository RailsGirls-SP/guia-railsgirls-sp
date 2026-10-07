---
title: "Postar direto do mural de recados 📝"
parent: Desafios extras
grand_parent: Mural de recados
nav_order: 2
---

# Postar direto do mural de recados 📝

## O desafio

Hoje, para postar um recado, a pessoa clica em **Novo recado** e vai para outra página. Num mural de verdade, você escreve o recado ali mesmo, na frente da parede.

O desafio é colocar o formulário **na página principal**, em cima dos cartões, para postar sem sair do mural de recados:

![Mural de recados com o formulário numa caixa branca, com os campos Seu nome e Recado e o botão Postar recado e, embaixo, três cartões amarelos com os recados da Carla, da Bia e da Ana]({{ '/assets/images/mural-de-recados/desafios/formulario-no-mural.png' | relative_url }})
{: .ilustracao .ilustracao-larga }

Este desafio é para depois do capítulo [E se alguém mandar um recado vazio?]({{ site.baseurl }}{% link projetos/mural-de-recados/07-e-se-o-recado-vier-vazio/index.md %}), porque mexe nos avisos do formulário.

## Pense antes de programar

- O formulário precisa de um recado em branco para preencher. Na página Novo recado, quem prepara esse recado é a ação `new`. E na página principal?
- O botão **Novo recado** e a página Novo recado ainda fazem sentido? Ficam, ou saem?
- Quando um recado é recusado, onde os avisos devem aparecer: na página Novo recado ou na página principal?

## Você vai praticar

- Usar o mesmo formulário em mais de uma página.
- Preparar, na ação `index`, o que a view precisa.
- Escolher qual view o controller mostra quando o recado é recusado.

Tente resolver sem ajuda antes de abrir as dicas. Abra uma de cada vez, só se precisar.

<details markdown="1">
<summary>Dica 1: o recado em branco</summary>

O formulário usa o `@message`, um recado em branco. Na ação `index` do controller, logo abaixo da linha do `@messages`, acrescente:

```ruby
@message = Message.new
```

Repare na diferença de uma letra, como no capítulo 04: o `@message` é o recado em branco, e o `@messages` é a lista.

</details>

<details markdown="1">
<summary>Dica 2: o formulário na página principal</summary>

No `app/views/messages/index.html.erb`, troque a linha do link **Novo recado** pelo formulário.

Se você fez o bônus da partial, no passo 9 do capítulo 07, é uma linha só:

```erb
<%= render "form", message: @message, submit_text: "Postar recado" %>
```

Se não fez, copie o formulário do `new.html.erb`, do `<%= form_with` até o `<% end %>` dele. É uma boa hora para experimentar a partial: agora o mesmo formulário aparece em três lugares.

</details>

<details markdown="1">
<summary>Dica 3: e quando o recado é recusado?</summary>

Poste um recado sem nome. A pessoa vai parar na página **Novo recado**, com o aviso. Funciona, mas tira a pessoa do mural de recados.

Para os avisos aparecerem na página principal, troque, na ação `create`, a linha do `render :new` por estas duas:

```ruby
@messages = Message.order(created_at: :desc)
render :index, status: :unprocessable_entity
```

O `render :index` mostra a view do mural de recados, e ela precisa da lista de recados. Por isso o `@messages` é buscado de novo, como na ação `index`. Sem essa linha, aparece o erro `undefined method 'empty?' for nil`.

</details>

## Indo além

- Tire o que não é mais usado: a página Novo recado (o `new.html.erb`), a ação `new` e o `:new` da lista do `only`, no `config/routes.rb`. O app continua funcionando? O que você precisou conferir antes de apagar?
- Deixe o formulário menor, numa coluna ao lado dos cartões. Dica: procure por `columns` na [documentação do Bulma](https://bulma.io/documentation/).
