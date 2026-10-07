---
title: "Notas dos desafios extras"
parent: Notas do Mural de recados
grand_parent: Notas dos projetos
nav_order: 11
---

# Notas dos desafios extras

[Ver capítulo]({{ site.baseurl }}{% link projetos/mural-de-recados/desafios-extras/index.md %})

Os desafios são para quem termina antes. Não precisa garantir que todo mundo chegue neles.

## Como conduzir

- **Deixe a pessoa escolher.** A ordem da página vai do mais fácil ao mais difícil, mas a participante pode começar pelo que achar mais divertido. A exceção é o "Filtrar recados por cor", que depende do "Cores nos recados".
- **As dicas são uma escada.** Antes de abrir a próxima dica, pergunte o que já foi tentado. Muitas vezes, falta pouco.
- **Commit antes de começar cada desafio.** Se der errado, dá para voltar ao mural de recados que funcionava.

## Data dos recados

- **Perguntas para o "Pense antes":** "Precisa de coluna nova?" (não: o `created_at` já existe) e "Que horas são no relógio do app?" (prepara o fuso horário).
- **Confusões comuns:** a hora 3 horas adiantada (é o UTC; a dica 3 resolve) e esquecer de reiniciar o servidor depois de mudar o `config/application.rb`.
- **Ir além:** o `time_ago_in_words` ("há 5 minutos") aparece em inglês sem traduzir o app. É um bom gancho para a gem `rails-i18n`, mas é bastante coisa nova.

## Postar direto do mural de recados

O guia separou o formulário numa página própria (a ação `new`), seguindo o CRUD padrão do Rails. Este desafio leva o formulário de volta para a página principal, como um mural de verdade. É um bom jeito de mostrar que as duas formas funcionam, e que a escolha é de quem planeja o app.

- **Perguntas para o "Pense antes":** "Quem prepara o recado em branco na página principal?" (a ação `index`, com `@message = Message.new`) e "Onde os avisos aparecem quando o recado é recusado?" (prepara a dica 3).
- **Confusões comuns:** trocar `@message` por `@messages`; e, ao trocar o `render :new` por `render :index`, esquecer de buscar o `@messages` de novo, o que dá `undefined method 'empty?' for nil`.
- **A partial ajuda muito aqui:** com o bônus do capítulo 07 feito, o formulário entra com uma linha. Sem ele, o mesmo formulário passa a existir em três lugares, e vale sugerir a partial.
- **Ir além:** tirar a página Novo recado é um bom exercício de conferir o que ainda usa o quê antes de apagar (o link, a ação, a rota e a view).

## Cores nos recados

É um bom primeiro desafio: repete a migration do capítulo 02 e o formulário do capítulo 04, com uma novidade de cada vez.

### A cor que some, de propósito

Na dica 3, a participante escolhe **Rosa** e o recado é guardado amarelo. Isso é **de propósito**: o `message_params` ainda não tem a `:color`.

{: .atencao }
Não corrija o `message_params` antes da hora. Deixe a participante investigar: primeiro o console (`Message.last.color`), depois a linha `Parameters` no terminal do servidor, e só então o controller. É a primeira vez que um bug aparece **sem mensagem de erro**, e o caminho da investigação é o que mais importa.

Se a pessoa não achar a linha `Parameters`, ajude a encontrar o terminal do servidor na lista de terminais, à direita do painel.


### Confusões comuns

- **Rodar a migration antes de revisar.** Se a migration rodou sem o `default`, os recados antigos ficam com a cor vazia (e o `null: false` não foi aplicado). Desfaça com `bin/rails db:rollback`, corrija e rode de novo.
- **Esquecer o campo da cor no `edit.html.erb`.** O formulário está no `new.html.erb` e foi copiado para o `edit.html.erb` no capítulo 05, então são dois lugares.
- **A classe com espaço errado.** `card card-<%= message.color %>`: um espaço entre as duas classes e nenhum entre `card-` e o `<%=`.
- **Esquecer de tirar o `has-background-warning-light`.** É a classe do Bulma que deixa todos os cartões amarelos, e ela ganha das cores da participante (as classes de cor do Bulma usam `!important`). Se tudo continuar amarelo, é ela.
- **Cartões brancos no meio da dica 4.** É de propósito: o `card-pink` ainda não existe no CSS.
- **O navegador guarda o CSS antigo.** Recarregar com Cmd+Shift+R (Mac) ou Ctrl+Shift+R resolve.


### Sobre os valores da cor

A cor é guardada em inglês (`yellow`, `pink`, `blue`, `green`), seguindo a regra de nomes de código em inglês, e mostrada em português na caixa de escolha. Ainda não existe validação: um formulário modificado poderia mandar outra cor. Isso fica para o capítulo 07, se der tempo (`validates :color, inclusion: { in: [...] }`).


## Filtrar recados por cor

Este desafio não tem dicas de propósito: é para a participante planejar e resolver por conta própria. Ajude com perguntas, e não com o código. Uma solução possível, só para consulta:

```ruby
# app/controllers/messages_controller.rb, na ação index
@messages = Message.order(created_at: :desc)
@messages = @messages.where(color: params[:color]) if params[:color].present?
```

```erb
<%# app/views/messages/index.html.erb, em cima dos cartões %>
<div class="buttons">
  <%= link_to "Todos", root_path, class: "button is-small" %>
  <%= link_to "Amarelo", root_path(color: "yellow"), class: "button is-small" %>
  <%= link_to "Rosa", root_path(color: "pink"), class: "button is-small" %>
  <%= link_to "Azul", root_path(color: "blue"), class: "button is-small" %>
  <%= link_to "Verde", root_path(color: "green"), class: "button is-small" %>
</div>
```

- **Perguntas para ajudar:** "Como o controller sabe a cor escolhida?" (o `params`, como o `params[:id]` do capítulo 05), "Onde os recados são buscados?" (na ação `index`) e "E quando não vem cor nenhuma?" (mostra todos).
- **Confusões comuns:** criar uma rota nova sem precisar e esquecer o caso sem cor (o `where(color: nil)` não mostra nenhum recado).

## Curtidas

- **Perguntas para o "Pense antes":** "O número de curtidas é texto ou número?" e "Um recado novo tem quantas curtidas?" (leva ao `default: 0`).
- **Confusões comuns:** esquecer o `default: 0` na migration, e aí os recados antigos mostram o ❤️ sem número; e a rota `member`, que é nova. Vale mostrar o `bin/rails routes` para mostrar a rota `like_message`.

## Como avançar com o projeto

{: .atencao }
Só para a mentoria. Use esta lista para conversar com quem terminou tudo e quer continuar, no dia ou depois do workshop. **Não precisa apresentar para todas as participantes.**

Cada ideia abaixo é um passo maior que os desafios extras, e quase todas trazem um conceito novo do Rails. Vale seguir o mesmo jeito do guia: começar pelo problema, planejar no papel e construir em etapas pequenas.

| Ideia | O problema | O que se aprende |
|---|---|---|
| **Respostas aos recados** | "Quero responder ao recado da Bia." | Um segundo model (`Reply`) ligado ao `Message`: o primeiro relacionamento entre tabelas (`belongs_to` e `has_many`) e rotas aninhadas. É o caminho natural da versão 2 do projeto. |
| **Vários murais** | "Quero um mural de recados para cada turma, ou para cada evento." | Um model `Board` (mural) com muitos recados. Relacionamento entre tabelas e endereços como `/boards/3/messages`. |
| **Contas de usuária** | "Só quem escreveu pode corrigir ou apagar o próprio recado." | Login com e-mail e senha. Desde o Rails 8, existe o gerador `bin/rails generate authentication`. Traz sessões, senha guardada com segurança e a ideia de "quem é a dona" de cada recado, que o plano do capítulo 00 decidiu deixar para depois. |
| **Moderação** | "Uma pessoa precisa aprovar os recados antes de aparecerem." | Uma coluna nova (`approved`), um filtro na lista (`where`) e, junto com as contas, a ideia de papéis (quem pode aprovar). |
| **Fotos nos recados** | "Quero colar uma foto no meu post-it." | Upload de arquivos com o Active Storage. |
| **Mural de recados ao vivo** | "Quero ver o recado novo aparecer sem recarregar a página." | Atualização em tempo real com Turbo Streams. |
| **Testes automatizados** | "Como saber que nada quebrou depois de mudar alguma coisa?" | A pasta `test`, que o guia deixou de lado. Um bom começo são testes para as validações do capítulo 07. |

Algumas dicas:

- **Uma ideia por vez.** Antes de começar, peça para escrever o plano: que telas mudam, que informações são novas, que regras entram. É o mesmo "Pense antes de programar" dos capítulos.
- **Respostas ou vários murais primeiro.** Os dois ensinam relacionamento entre tabelas, que é a base de quase todo app de verdade, e não dependem de nada além do que o projeto já tem.
- **Contas de usuária são o maior passo.** Envolvem segurança, sessões e mudam várias partes do app de uma vez. Vale fazer com calma, de preferência depois de uma das ideias acima.
- **Commit antes de cada ideia.** Se a mudança der errado, dá para voltar ao mural de recados que funcionava.
- **IA como tutora.** Para ideias maiores, é tentador pedir tudo para uma IA. Incentive o mesmo uso do guia: pedir em etapas pequenas, com o plano, e conferir cada peça. Veja [Usando IA como tutora]({{ site.baseurl }}{% link comece-aqui/ia-como-tutora.md %}).
