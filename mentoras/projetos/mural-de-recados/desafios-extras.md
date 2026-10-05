---
title: "Notas dos desafios extras"
parent: Notas do Mural de recados
grand_parent: Notas dos projetos
nav_order: 10
---

# Notas dos desafios extras

[Ver capítulo]({{ site.baseurl }}{% link projetos/mural-de-recados/desafios-extras/index.md %})

- TODO: perguntas para fazer durante o "Pense antes"
- TODO: confusões comuns neste capítulo

## Cores nos recados

É um bom primeiro desafio: repete a migration do capítulo 02 e o formulário do capítulo 04, com uma novidade de cada vez.

### A cor que some, de propósito

Na dica 3, a participante escolhe **Rosa** e o recado é guardado amarelo. Isso é **de propósito**: o `message_params` ainda não tem a `:color`.

{: .atencao }
Não corrija o `message_params` antes da hora. Deixe a participante investigar: primeiro o console (`Message.last.color`), depois a linha `Parameters` no terminal do servidor, e só então o controller. É a primeira vez que um bug aparece **sem mensagem de erro**, e o caminho da investigação é o que mais importa.

Se ela não achar a linha `Parameters`, ajude a encontrar o terminal do servidor na lista de terminais, à direita do painel.


### Confusões comuns

- **Rodar a migration antes de revisar.** Se ela rodou sem o `default`, os recados antigos ficam com a cor vazia (e o `null: false` não foi aplicado). Desfaça com `bin/rails db:rollback`, corrija e rode de novo.
- **Esquecer o campo da cor no `edit.html.erb`.** O formulário foi copiado no capítulo 05, então são dois lugares.
- **A classe com espaço errado.** `card card-<%= message.color %>`: um espaço entre as duas classes e nenhum entre `card-` e o `<%=`.
- **Esquecer de tirar o `has-background-warning-light`.** É a classe do Bulma que deixa todos os cartões amarelos, e ela ganha das cores da participante (as classes de cor do Bulma usam `!important`). Se tudo continuar amarelo, é ela.
- **Cartões brancos no meio da dica 4.** É de propósito: o `card-pink` ainda não existe no CSS.
- **O navegador guarda o CSS antigo.** Recarregar com Cmd+Shift+R (Mac) ou Ctrl+Shift+R resolve.


### Sobre os valores da cor

A cor é guardada em inglês (`yellow`, `pink`, `blue`, `green`), seguindo a regra de nomes de código em inglês, e mostrada em português na caixa de escolha. Ainda não existe validação: um formulário modificado poderia mandar outra cor. Isso fica para o capítulo 07, se der tempo (`validates :color, inclusion: { in: [...] }`).


## Como avançar com o projeto

{: .atencao }
Só para as mentoras. Use esta lista para conversar com quem terminou tudo e quer continuar, no dia ou depois do workshop. **Não precisa apresentar para todas as participantes.**

Cada ideia abaixo é um passo maior que os desafios extras, e quase todas trazem um conceito novo do Rails. Vale seguir o mesmo jeito do guia: começar pelo problema, planejar no papel e construir em etapas pequenas.

| Ideia | O problema | O que ela aprende |
|---|---|---|
| **Respostas aos recados** | "Quero responder ao recado da Bia." | Um segundo model (`Reply`) ligado ao `Message`: o primeiro relacionamento entre tabelas (`belongs_to` e `has_many`) e rotas aninhadas. É o caminho natural da versão 2 do projeto. |
| **Vários murais** | "Quero um mural de recados para cada turma, ou para cada evento." | Um model `Board` (mural) com muitos recados. Relacionamento entre tabelas e endereços como `/boards/3/messages`. |
| **Contas de usuária** | "Só quem escreveu pode corrigir ou apagar o próprio recado." | Login com e-mail e senha. Desde o Rails 8, existe o gerador `bin/rails generate authentication`. Traz sessões, senha guardada com segurança e a ideia de "quem é a dona" de cada recado, que o plano do capítulo 00 decidiu deixar para depois. |
| **Moderação** | "Uma pessoa precisa aprovar os recados antes de aparecerem." | Uma coluna nova (`approved`), um filtro na lista (`where`) e, junto com as contas, a ideia de papéis (quem pode aprovar). |
| **Fotos nos recados** | "Quero colar uma foto no meu post-it." | Upload de arquivos com o Active Storage. |
| **Mural de recados ao vivo** | "Quero ver o recado novo aparecer sem recarregar a página." | Atualização em tempo real com Turbo Streams. |
| **Testes automatizados** | "Como saber que nada quebrou depois de mudar alguma coisa?" | A pasta `test`, que o guia deixou de lado. Um bom começo são testes para as validações do capítulo 07. |

Algumas dicas:

- **Uma ideia por vez.** Antes de começar, peça para ela escrever o plano: que telas mudam, que informações são novas, que regras entram. É o mesmo "Pense antes de programar" dos capítulos.
- **Respostas ou vários murais primeiro.** Os dois ensinam relacionamento entre tabelas, que é a base de quase todo app de verdade, e não dependem de nada além do que o projeto já tem.
- **Contas de usuária são o maior passo.** Envolvem segurança, sessões e mudam várias partes do app de uma vez. Vale fazer com calma, de preferência depois de uma das ideias acima.
- **Commit antes de cada ideia.** Se a mudança der errado, dá para voltar ao mural de recados que funcionava.
- **IA como tutora.** Para ideias maiores, é tentador pedir tudo para uma IA. Incentive o mesmo uso do guia: pedir em etapas pequenas, com o plano, e conferir cada peça. Veja [Usando IA como tutora]({{ site.baseurl }}{% link comece-aqui/ia-como-tutora.md %}).
