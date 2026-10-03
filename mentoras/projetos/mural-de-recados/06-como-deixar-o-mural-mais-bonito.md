---
title: "06. Como deixar o mural de recados mais bonito?"
parent: Notas do Mural de recados
grand_parent: Notas dos projetos
nav_order: 7
---

# 06. Como deixar o mural de recados mais bonito?

[Ver capítulo]({{ site.baseurl }}{% link projetos/mural-de-recados/06-como-deixar-o-mural-mais-bonito/index.md %}) · Código de referência: tag `passo-06`.

## Perguntas para o "Pense antes"

- "Se a pessoa pudesse escolher qualquer cor, o que poderia dar errado?" Leva à lista fechada e à leitura do texto (contraste).
- "Os recados antigos foram postados antes da cor existir. Com qual cor eles ficam?" Leva ao `default`.
- "O que muda no app: a aparência, os dados ou os dois?" Ajuda a separar as duas partes do capítulo.

## A cor que some, de propósito

No passo 6, a participante escolhe **Rosa** e o recado é guardado amarelo. Isso é **de propósito**: o `message_params` ainda não tem a `:color`.

{: .atencao }
Não corrija o `message_params` antes da hora. O passo leva a participante a investigar: primeiro o console (`Message.last.color`), depois a linha `Parameters` no terminal do servidor, e só então o controller. É a primeira vez que um bug aparece **sem mensagem de erro**, e o caminho da investigação é o que mais importa.

Se ela não achar a linha `Parameters`, ajude a encontrar o terminal do servidor na lista de terminais, à direita do painel.

## Confusões comuns

- **Rodar a migration antes de revisar.** Se ela rodou sem o `default`, os recados antigos ficam com a cor vazia (e o `null: false` não foi aplicado). Desfaça com `bin/rails db:rollback`, corrija e rode de novo.
- **Esquecer o campo da cor no `edit.html.erb`.** O formulário foi copiado no capítulo 05, então são dois lugares.
- **A classe com espaço errado.** `card card-<%= message.color %>`: um espaço entre as duas classes e nenhum entre `card-` e o `<%=`.
- **O ponto no CSS.** No CSS, a classe começa com ponto (`.card`); na view, não (`class="card"`).
- **O navegador guarda o CSS antigo.** Recarregar com Cmd+Shift+R (Mac) ou Ctrl+Shift+R resolve.
- **Inspecionar.** Vale mostrar o **Inspecionar** do navegador: ela vê as classes de cada cartão e pode mudar o CSS ao vivo para testar, sem medo de quebrar o arquivo.

## Sobre os valores da cor

A cor é guardada em inglês (`yellow`, `pink`, `blue`, `green`), seguindo a regra de nomes de código em inglês, e mostrada em português na caixa de escolha. Ainda não existe validação: um formulário modificado poderia mandar outra cor. Isso fica para o capítulo 07, se der tempo (`validates :color, inclusion: { in: [...] }`).

## Ir além com o CSS

Se sobrar tempo, sugestões para ela brincar sozinha no `application.css`:

- Girar os cartões um pouquinho, como post-its: `.card:nth-child(odd) { rotate: -1deg; }` e `.card:nth-child(even) { rotate: 1deg; }`.
- Trocar a fonte por uma do [Google Fonts](https://fonts.google.com/).
- Criar uma cor nova: um valor novo na caixa de escolha e um bloco novo no CSS (sem migration, porque a coluna já existe).
