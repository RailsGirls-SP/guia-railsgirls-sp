---
title: "05. Errei! Como corrigir ou apagar?"
parent: Notas do Mural de recados
grand_parent: Notas dos projetos
nav_order: 6
---

# 05. Errei! Como corrigir ou apagar?

[Ver capítulo]({{ site.baseurl }}{% link projetos/mural-de-recados/05-corrigir-ou-apagar/index.md %}) <!-- TODO: quando as tags existirem, voltar com \" · Código de referência: tag `passo-05`\", com link para a tag no repositório RailsGirls-SP/mural-de-recados. -->

## Perguntas para o "Pense antes"

- "Se duas pessoas escreverem 'Oi!', como o app sabe qual das duas apagar?" Leva ao `id`.
- "Você já apagou alguma coisa sem querer? O que teria ajudado?" Leva à confirmação.
- "Corrigir é parecido com postar? O que muda?" Leva à ideia de formulário preenchido e às duas ações, `edit` e `update`, que fazem par com o `new` e o `create` do capítulo 04.

## O caminho dos erros

Como no capítulo 04, os erros aparecem de propósito e seguem o caminho da requisição, começando pelo link:

1. O link `link_to "Editar", edit_message_path(message)` sem a rota: **NoMethodError**, `undefined method 'edit_message_path'`. **Falta a rota.** Como no `new_message_path`, quem quebra é a página principal inteira.
2. Com `:edit` no `only`, clicar em **Editar**: **Unknown action**, `The action 'edit' could not be found`. **Falta a ação.**
3. Com a ação: **No view template for interactive request**. **Falta a view.**
4. Com o `edit.html.erb`: **NoMethodError in Messages#edit**, `undefined method 'message_path'`. O `form_with` de um recado que já existe aponta para `/messages/3` (o `update`), e essa rota ainda não existe. **Falta a rota do `update`.**
5. Clicar em **Salvar**: nada acontece na tela. No terminal do servidor, aparece `The action 'update' could not be found`. Como no capítulo 04, erros de formulário só aparecem no terminal.

No passo 4, a participante vê o número do recado no endereço (`/messages/3/edit`) e liga ele ao `id` do capítulo 02. No passo 8, ela é convidada a prever o erro do `update` antes de ver. Se a pessoa acertar, vale comemorar: é o sinal de que entendeu o caminho. No passo 9 (apagar), rota, ação e botão entram de uma vez.

## Confusões comuns

- **O número do recado.** Cada pessoa vai ter um `id` diferente. Se aparecer `Couldn't find Message`, o número no endereço não existe: use o link **Editar**.
- **Onde colocar as ações.** As ações novas ficam **antes** do `private`. Depois dele, o Rails não encontra a ação, e o erro é o mesmo de quando ela não existe.
- **O `@`.** O `edit` e o `update` usam `@message`; o `destroy` usa `message`, sem `@`. A diferença está explicada no "O que aconteceu?".
- **A confirmação não aparece.** Normalmente é a sintaxe das chaves em `form: { data: { turbo_confirm: "..." } }`, ou a página guardada no navegador (Cmd+Shift+R).
- **O formulário copiado.** O `edit.html.erb` é uma cópia do `new.html.erb`, com outro título e outro botão. Alguém pode perguntar se dá para não repetir o formulário. Dá, com uma *partial*, mas a gente deixou de fora de propósito. Se houver tempo e curiosidade, é um bom desafio.

## REST, verbos HTTP e códigos de status

{: .atencao }
Contexto só para a mentoria. **Não precisa levar isso para as participantes**: o guia mostra os verbos na prática (a tabela do "O que aconteceu?" deste capítulo), sem usar a palavra REST. Se alguém se interessar, é um ótimo assunto para depois do workshop.

**O que é REST.** É um jeito de organizar um app web (ou uma API) em torno de **recursos**, como "recados", em que cada operação é a combinação de um **endereço** com um **verbo HTTP**. O `resources :messages` é o REST do Rails: ele cria as sete rotas padrão, e o `only` escolhe quais. O Mural de recados usa seis delas (todas menos o `show`).

| Verbo | Endereço | Ação | Para quê |
|---|---|---|---|
| `GET` | `/messages` | `index` | ver a lista |
| `GET` | `/messages/new` | `new` | abrir o formulário de recado novo |
| `POST` | `/messages` | `create` | criar |
| `GET` | `/messages/3/edit` | `edit` | abrir o formulário de correção |
| `PATCH` | `/messages/3` | `update` | atualizar |
| `DELETE` | `/messages/3` | `destroy` | apagar |

**Por que os verbos importam.**

- **O endereço diz o quê, o verbo diz o que fazer.** `/messages/3` serve para atualizar (`PATCH`) e para apagar (`DELETE`). Sem o verbo, a rota não saberia qual ação chamar.
- **`GET` não muda nada.** É a regra mais importante: um `GET` só lê. Navegadores, buscadores e ferramentas que "pré-carregam" links fazem `GET` à vontade. Se apagar um recado fosse um `GET`, um robô passando pelo site apagaria tudo. Por isso o **Apagar** é um botão (`button_to`), e não um link.
- **Formulários HTML só sabem `GET` e `POST`.** O Rails simula o `PATCH` e o `DELETE` com um campo escondido, `_method`, que o `form_with` e o `button_to` colocam sozinhos. No terminal do servidor, aparece o verbo final (`PATCH`, `DELETE`).

**Os códigos de status.** Toda resposta leva um número que diz como foi a requisição. Os que aparecem no projeto, no terminal do servidor (na linha `Completed …`):

| Código | Nome | Onde aparece |
|---|---|---|
| `200` | OK | qualquer página que abriu certinho |
| `302` | Found (redirecionamento) | depois do `create`, do `update` e do `destroy`, com o `redirect_to` |
| `404` | Not Found | rota que não existe, ou ação que não existe |
| `422` | Unprocessable Content | recado recusado pelas validações, no capítulo 07 |
| `500` | Internal Server Error | erro no código do app, como um `NoMethodError` |

- **O `422` do capítulo 07 é o que faz o Turbo mostrar a página.** Depois de enviar um formulário, o Turbo só troca a tela se a resposta for um redirecionamento ou um erro (`4xx` ou `5xx`). Com `render :new` e status `200`, nada aparece, e o console do navegador avisa "Form responses must redirect to another location". Daí o `status: :unprocessable_entity`.
- **O nome mudou.** O guia usa `:unprocessable_entity`, que é o nome que a maioria dos exemplos na internet usa. No Rails 8.1, o nome oficial passou a ser `:unprocessable_content`, e o terminal mostra `422 Unprocessable Content`. Os dois funcionam, sem aviso.
- **Os erros de formulário do capítulo 04 também não aparecem na tela.** Eles são `404` (falta a rota ou a ação do `create`) e `422` (a proteção de formulários, no Codespaces). Por que eles não aparecem, se o `422` do capítulo 07 aparece? A página de erro do Rails tem a linha `<meta name="turbo-visit-control" content="reload">`, que pede ao Turbo para recarregar a página em vez de mostrar a resposta. O navegador recarrega a página Novo recado, e o erro só fica no terminal. A página do `422` é uma view do próprio app, sem essa linha, e por isso aparece.
- **Para saber mais sobre o Turbo** (em inglês), na documentação oficial do Turbo Drive: [Redirecting After a Form Submission](https://turbo.hotwired.dev/handbook/drive#redirecting-after-a-form-submission) (o que o Turbo espera como resposta a um formulário: um redirecionamento ou um erro `4xx` ou `5xx`) e [Ensuring Specific Pages Trigger a Full Reload](https://turbo.hotwired.dev/handbook/drive#ensuring-specific-pages-trigger-a-full-reload) (o `turbo-visit-control`). A explicação geral do Turbo está no [Turbo Handbook](https://turbo.hotwired.dev/handbook/introduction). O capítulo 04 também fala disso, em "Erros de formulário só aparecem no terminal".

**Para quem quiser ir além depois do workshop:** uma API REST usa as mesmas rotas e os mesmos verbos, mas responde com dados (geralmente JSON) em vez de páginas HTML. É um bom próximo passo, junto com o guia oficial [Rails Routing from the Outside In](https://guides.rubyonrails.org/routing.html), em inglês.

## Por que não usamos `status: :see_other`

O scaffold do Rails usa `redirect_to ..., status: :see_other` no `destroy`. Ele é necessário quando a requisição sai do navegador como `DELETE` de verdade, por exemplo num link com `data-turbo-method="delete"`. O `button_to` manda um `POST` com `_method=delete`, e o redirecionamento comum funciona. Por isso, o guia deixa o `status` de fora. Se a pessoa trocar o botão por um link, ele passa a ser necessário.

## Próximas notas

[06. Como deixar o mural de recados mais bonito?]({{ site.baseurl }}{% link mentoras/projetos/mural-de-recados/06-como-deixar-o-mural-mais-bonito.md %})
