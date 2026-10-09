---
title: "03. Como ver todos os recados?"
parent: Notas do Mural de recados
grand_parent: Notas dos projetos
nav_order: 4
---

# 03. Como ver todos os recados?

[Ver capítulo]({{ site.baseurl }}{% link projetos/mural-de-recados/03-ver-todos-os-recados/index.md %}) <!-- TODO: quando as tags existirem, voltar com \" · Código de referência: tag `passo-03`\", com link para a tag no repositório RailsGirls-SP/mural-de-recados. -->

## Perguntas para o "Pense antes"

- "Quando você abre um site, qual é a primeira coisa que aparece?" Leva à ideia de página principal (`root`).
- "O que aparece em cada recado?" Ajuda a ligar a tela às colunas `author` e `content`.
- "E se ninguém tiver postado ainda?" Prepara o passo do mural de recados vazio.

## Telas de erro de propósito

{: .atencao }
As telas de erro deste capítulo aparecem **de propósito**. Não pule os passos que geram erro, não corrija no lugar da pessoa e não tranquilize dizendo "é só um erro, ignora": o objetivo é justamente ler o erro.

O capítulo começa pelo navegador e segue o caminho da requisição, uma peça de cada vez:

1. Abrir `/messages` antes de existir qualquer coisa: **Routing Error**, `No route matches [GET] "/messages"`. **Falta a rota.**
2. Criar a rota: **ActionDispatch::MissingController**, `uninitialized constant MessagesController`. **A rota existe, mas falta o controller.**
3. Gerar o controller com `bin/rails generate controller Messages index`: a página de exemplo aparece.
4. Apagar a rota `get "messages/index"` que o gerador acrescentou: `/messages/index` volta a dar **Routing Error**, `No route matches`.

Quando a tela de erro aparecer, pergunte: "o que a mensagem está dizendo que falta?". Comparar os dois primeiros erros ("não tem rota" e "não tem controller") é uma das melhores formas de entender o que cada peça faz. Ler mensagens de erro é uma das habilidades mais importantes do dia, e este capítulo é o lugar seguro para treinar.

### Celebre os erros novos

Um erro **diferente** do anterior quer dizer que a participante avançou: a peça de antes está funcionando, e agora a mensagem aponta a próxima. O guia diz isso no passo 4 ("Progresso!"), e vale reforçar em voz alta: "Olha, mudou o erro! A rota já funciona."

Para quem está começando, uma tela de erro parece fracasso. Comemorar cada erro novo ajuda a trocar esse sentimento por curiosidade, e esse jeito de ver os erros serve para o resto do dia, e não só para este capítulo.

## Confusões comuns

- **Arquivo não salvo.** A causa mais comum de "corrigi e o erro continua". No editor, a aba de um arquivo não salvo mostra uma bolinha no lugar do **X**.
- **O nome no `generate controller`.** Tem que ser `Messages`, no plural. Com o nome errado, o `bin/rails destroy controller` desfaz.
- **Esquecer de apagar a rota do gerador.** Não quebra nada, mas deixa o endereço `/messages/index` sobrando. Vale perguntar: "por que essa linha está aqui?".
- **Esquecer de apagar o texto de exemplo da view** (*Find me in…*).
- **O `@`.** Esquecer o `@` no controller ou na view. O erro na view costuma ser `undefined method 'each' for nil`.
- **`<%=` e `<%`.** Usar `<%` onde deveria ser `<%=` faz o conteúdo não aparecer, sem erro nenhum, o que confunde mais do que um erro.
- **O `Message.destroy_all` do passo 8.** É de propósito: a participante apaga os recados para ver a página vazia e o convite. Os recados voltam no capítulo 04, postados pelo navegador. Se alguém ficar triste de perder o recado da Ana, lembre que ele pode ser postado de novo pelo formulário.

  {: .atencao }
  > O `destroy_all` apaga tudo e **não tem como desfazer**. Aqui não tem risco: é o banco de dados de desenvolvimento, com recados de teste. Mas vale um cuidado ao mostrar o comando: confira que a participante está no console do próprio codespace, e não num app de verdade. Se surgir a conversa, explique que, num app no ar, um comando assim apagaria os dados de todas as pessoas que usam o app, e que por isso quem programa evita rodar comandos que apagam dados no banco de produção, ou faz isso com muito cuidado e com cópia de segurança.
- **Mural de recados vazio num codespace novo.** O banco de dados não vai para o GitHub (veja as notas do capítulo 02). Basta criar um recado pelo console.

## Por que o passo 8 usa só `if`, sem `else`

Quem já programa pode estranhar o passo 8: o convite aparece com um `if`, mas a lista de recados fica fora dele, sem `else`.

```erb
<% if @messages.empty? %>
  <p>Ainda não tem nenhum recado. Que tal postar o primeiro?</p>
<% end %>

<% @messages.each do |message| %>
  ...
<% end %>
```

Não precisa de `else` porque o `each` já resolve o caso vazio sozinho: numa lista sem recados, ele repete o trecho **zero vezes**, e nenhum recado aparece. Então só falta o `if` para mostrar o convite. Com recados, o `if` é falso e o convite não aparece.

Com `else` também funcionaria:

```erb
<% if @messages.empty? %>
  <p>Ainda não tem nenhum recado. Que tal postar o primeiro?</p>
<% else %>
  <% @messages.each do |message| %>
    ...
  <% end %>
<% end %>
```

O guia prefere a primeira forma porque a participante só **acrescenta** três linhas, sem mexer no código que já funciona, e aprende um conceito novo (`if`) de cada vez. Se a pessoa perguntar "e se tiver recados?", é uma boa hora para mostrar o que o `each` faz com uma lista vazia.

## Por que a rota do gerador é diferente da do guia

No passo 9, a participante compara duas rotas que levam à mesma ação:

```ruby
get "messages/index"                    # a do gerador
get "messages", to: "messages#index"    # a do guia, do passo 3
```

- **A do gerador é a forma curta.** Sem o `to:`, o Rails deduz o controller e a ação pelo próprio endereço: `messages/index` vai para `messages#index`. O `generate controller` não sabe para que serve cada ação, então cria uma rota por ação com esse formato, e o endereço fica com o nome da ação (`/messages/index`).
- **A do guia escolhe o endereço.** Com o `to:`, o endereço (`/messages`) e o destino (`messages#index`) são escritos separados. Assim, a lista de recados fica no endereço que a gente quer, sem o `index` no fim.
- **As duas funcionam.** O motivo de apagar a do gerador é não ter dois endereços para a mesma página. No capítulo 04, as duas formas dão lugar ao `resources :messages`, que cria as rotas no padrão do Rails.

Quem aprendeu Rails há mais tempo pode lembrar da rota do gerador com aspas simples (`get 'messages/index'`). As versões recentes do Rails geram o código com aspas duplas, seguindo o estilo do RuboCop que vem com os apps novos. Para o Ruby, as duas formas são iguais.

## MVC

{: .atencao }
Contexto só para a mentoria. **Não precisa levar isso para as participantes**: o nome MVC não aparece no capítulo. O "Por dentro do app" só explica por que a view fica separada do model ("Por que separar a view do model?"). Se alguém se interessar, ótimo, mas não é objetivo do dia.

**O que é.** MVC (*Model-View-Controller*) é um padrão de arquitetura que divide o app em três responsabilidades:

| Peça | Responsabilidade | No Mural de recados |
|---|---|---|
| **Model** | os dados e as regras sobre eles | `Message`: o que um recado tem, como guardar e buscar, e (no capítulo 07) o que é um recado válido |
| **View** | a apresentação | `app/views/messages/index.html.erb`: como os recados aparecem na tela |
| **Controller** | recebe a requisição e coordena model e view | `MessagesController#index`: busca os recados e entrega para a view |

**De onde vem.** O padrão foi criado no fim dos anos 1970 por Trygve Reenskaug, no Xerox PARC, para interfaces gráficas em Smalltalk. Ele chegou à web nos anos 1990 e 2000, com frameworks como o Struts (Java), e o Rails ajudou a popularizar. Hoje aparece com variações em muitos frameworks, como Django, Laravel, Phoenix e ASP.NET MVC.

**No Rails.** O MVC aparece nos nomes das pastas: `app/models`, `app/views` e `app/controllers`. Mas o Rails tem mais peças em volta, que o guia apresenta aos poucos: as **rotas** (`config/routes.rb`), que vêm antes do controller; os **layouts**, que envolvem todas as views; os **helpers**; e as **migrations**, que mudam o banco de dados, mas não fazem parte do MVC em si. Se uma participante perguntar "e a rota, é o quê no MVC?", a resposta honesta é: nenhuma das três; ela é a porta de entrada que escolhe o controller.

**Por que separar.** O argumento do capítulo é o mesmo que se usa no dia a dia: mudar a aparência sem mexer nos dados, usar os mesmos dados em telas diferentes e saber onde procurar cada problema. O capítulo 06 é a prova prática: os cartões mudam por completo, e o model não muda nada.

**Dicas para conversar sobre isso:**

- Fique nas três responsabilidades e nos arquivos do Mural de recados. Termos como "camada", "arquitetura" ou "separação de responsabilidades" não ajudam quem está começando.
- O guia usa analogias diferentes em lugares diferentes: a planilha e a assistente para o model (capítulo 02) e o restaurante no glossário (o controller como quem atende o pedido, a view como a montagem do prato). Elas se completam, mas não force uma analogia única para as três peças.
- Uma regra comum na comunidade Rails é "controller magro, model gordo": as regras ficam no model, e o controller só coordena. Não precisa falar disso agora, mas é o que o guia segue quando, no capítulo 07, a regra "recado não pode ser vazio" vai para o model.

## A página de erro no Codespaces

No terminal do servidor, pode aparecer `Cannot render console from …! Allowed networks: …`. É o Rails dizendo que não vai mostrar o console interativo na página de erro, porque o acesso vem pelo endereço do Codespaces, e não do próprio computador. A página de erro aparece normalmente, só sem esse console. Pode ignorar.

## Próximas notas

[04. Como postar um recado?]({{ site.baseurl }}{% link mentoras/projetos/mural-de-recados/04-postar-um-recado.md %})
