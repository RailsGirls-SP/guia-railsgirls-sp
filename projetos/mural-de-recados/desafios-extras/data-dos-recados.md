---
title: "Data dos recados 📅"
parent: Desafios extras
grand_parent: Mural de recados
nav_order: 1
---

# Data dos recados 📅

## O desafio

Num mural de recados cheio, dá vontade de saber quando cada recado foi postado. Cada cartão ganha a data e a hora em que o recado foi escrito, embaixo do nome de quem escreveu:

> Adorei o workshop!
>
> — Bia
>
> 05/10/2026 às 11:53

## Pense antes de programar

- Onde essa informação fica guardada? Você precisa criar uma coluna nova? Lembre das colunas que o Rails cria sozinho, no capítulo [Como guardar os recados?]({{ site.baseurl }}{% link projetos/mural-de-recados/02-como-guardar-os-recados/mao-na-massa.md %}).
- Em que formato a data aparece no Brasil? Dia, mês e ano, em que ordem?
- O horário do app é o mesmo do seu relógio?

## Você vai praticar

- Usar uma informação que o Rails já guarda sozinho.
- Mudar o formato de uma data.
- Mudar uma configuração do app.

Tente resolver sem ajuda antes de abrir as dicas. Abra uma de cada vez, só se precisar.

<details markdown="1">
<summary>Dica 1: a data já existe</summary>

Não precisa de migration: o Rails guarda a data e a hora em que cada recado foi criado na coluna `created_at`, a mesma que o mural de recados usa para mostrar os mais novos primeiro.

No cartão de cada recado, na view, logo abaixo da linha da autora, acrescente:

```erb
<p class="is-size-7"><%= message.created_at %></p>
```

O `is-size-7` é do Bulma: deixa o texto pequeno. Recarregue e veja o que aparece.

</details>

<details markdown="1">
<summary>Dica 2: o formato brasileiro</summary>

A data aparece num formato estranho, parecido com `2026-10-05 14:53:21 UTC`. Para escolher o formato, use o `strftime`:

```erb
<p class="is-size-7"><%= message.created_at.strftime("%d/%m/%Y às %H:%M") %></p>
```

Cada código com `%` vira um pedaço da data: `%d` é o dia, `%m` o mês, `%Y` o ano, `%H` a hora e `%M` os minutos. O resto, como as barras e o "às", aparece do jeito que está.

</details>

<details markdown="1">
<summary>Dica 3: o horário certo</summary>

A hora está adiantada? O Rails usa o horário de Greenwich (o `UTC` do formato estranho), que fica 3 horas à frente do horário de Brasília.

Abra o arquivo `config/application.rb` e procure a linha:

```ruby
    # config.time_zone = "Central Time (US & Canada)"
```

Troque por:

```ruby
    config.time_zone = "Brasilia"
```

Salve, desligue o servidor (**Ctrl+C**) e ligue de novo com `bin/rails server`: esse arquivo só é lido quando o servidor liga. Recarregue a página.

</details>

## Indo além

- Mostre a data também na página de correção.
- Mostre "corrigido em…" nos recados que foram corrigidos. Dica: compare o `created_at` com o `updated_at`.
