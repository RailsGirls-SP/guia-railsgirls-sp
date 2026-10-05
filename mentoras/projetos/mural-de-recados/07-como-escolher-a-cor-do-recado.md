---
title: "07. Como escolher a cor do recado?"
parent: Notas do Mural de recados
grand_parent: Notas dos projetos
nav_order: 8
---

# 07. Como escolher a cor do recado?

[Ver capítulo]({{ site.baseurl }}{% link projetos/mural-de-recados/07-como-escolher-a-cor-do-recado/index.md %}) · Código de referência: tag `passo-07`.

## Perguntas para o "Pense antes"

- "Se a pessoa pudesse escolher qualquer cor, o que poderia dar errado?" Leva à lista fechada e à leitura do texto (contraste).
- "Os recados antigos foram postados antes da cor existir. Com qual cor eles ficam?" Leva ao `default`.
- "No capítulo anterior, só a aparência mudou. E agora, o que muda: a aparência, os dados ou os dois?" Mostra que a cor é uma informação nova, e não só visual.

## A cor que some, de propósito

No passo 6, a participante escolhe **Rosa** e o recado é guardado amarelo. Isso é **de propósito**: o `message_params` ainda não tem a `:color`.

{: .atencao }
Não corrija o `message_params` antes da hora. O passo leva a participante a investigar: primeiro o console (`Message.last.color`), depois a linha `Parameters` no terminal do servidor, e só então o controller. É a primeira vez que um bug aparece **sem mensagem de erro**, e o caminho da investigação é o que mais importa.

Se ela não achar a linha `Parameters`, ajude a encontrar o terminal do servidor na lista de terminais, à direita do painel.

## Confusões comuns

- **Rodar a migration antes de revisar.** Se ela rodou sem o `default`, os recados antigos ficam com a cor vazia (e o `null: false` não foi aplicado). Desfaça com `bin/rails db:rollback`, corrija e rode de novo.
- **Esquecer o campo da cor no `edit.html.erb`.** O formulário foi copiado no capítulo 05, então são dois lugares.
- **A classe com espaço errado.** `card card-<%= message.color %>`: um espaço entre as duas classes e nenhum entre `card-` e o `<%=`.
- **A ordem no CSS.** As classes das cores precisam vir **depois** do `.card`, que já tem o fundo amarelo. Se vierem antes, o amarelo ganha e tudo continua amarelo.
- **O navegador guarda o CSS antigo.** Recarregar com Cmd+Shift+R (Mac) ou Ctrl+Shift+R resolve.

## Sobre os valores da cor

A cor é guardada em inglês (`yellow`, `pink`, `blue`, `green`), seguindo a regra de nomes de código em inglês, e mostrada em português na caixa de escolha. Ainda não existe validação: um formulário modificado poderia mandar outra cor. Isso fica para o capítulo 08, se der tempo (`validates :color, inclusion: { in: [...] }`).

## Ir além com as cores

- Criar uma cor nova: um valor novo na caixa de escolha (nos dois formulários) e uma linha nova no CSS. Não precisa de migration, porque a coluna já existe.
