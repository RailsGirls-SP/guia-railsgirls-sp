---
title: "04. Como postar um recado?"
parent: Notas do Mural de recados
grand_parent: Notas dos projetos
nav_order: 5
---

# 04. Como postar um recado?

[Ver capítulo]({{ site.baseurl }}{% link projetos/mural-de-recados/04-postar-um-recado/index.md %}) <!-- TODO: quando as tags existirem, voltar com \" · Código de referência: tag `passo-04`\", com link para a tag no repositório RailsGirls-SP/mural-de-recados. -->

## Perguntas para o "Pense antes"

- "Onde você procuraria o lugar para escrever o seu recado?" Leva ao link **Novo recado** na página principal e à página só para o formulário, como no plano.
- "Depois de clicar no botão, o que você espera ver?" Prepara a ideia de voltar para o mural de recados (o `redirect_to`).
- "E se alguém clicar sem escrever nada?" Não precisa responder agora: é o gancho para o capítulo do recado vazio.

## O caminho dos erros

Como nos capítulos 03 e 05, os erros aparecem de propósito, na ordem do caminho da requisição:

1. O link `link_to "Novo recado", new_message_path` com a rota antiga: **NameError**, `undefined local variable or method 'new_message_path'`. **Falta a rota.** Quem quebra é a página principal inteira, porque o link está nela.
2. Com o `resources :messages, only: [ :index, :new ]`, clicar no link: **Unknown action**, `The action 'new' could not be found`. **Falta a ação.**
3. Com a ação `new`: **No view template for interactive request**. **Falta a view.** É a primeira vez que esse erro aparece: no capítulo 03, o gerador criou a view do `index`.
4. Com o `new.html.erb`, enviar o formulário: nada acontece na tela, e o terminal do servidor mostra `ActionController::RoutingError (No route matches [POST] "/messages")`. **Falta a rota para o `POST`.**
5. Com o `:create` na lista do `only`: de novo nada na tela, e o terminal mostra `The action 'create' could not be found`. **Falta a ação.**
6. Com a ação `create`, no Codespaces: nada na tela, e o terminal mostra `ActionController::InvalidAuthenticityToken (HTTP Origin header (https://localhost:3000) didn't match request.base_url (…app.github.dev))`. **Falta o ajuste da proteção de formulários** (passo 9). No computador local, esse erro não aparece.
7. Com a linha do `forgery_protection_origin_check` e o servidor reiniciado: o recado aparece. Comemore! 🎉

O formulário aparece antes de existir a rota do `POST` porque a rota do `index` já cria o nome `messages_path`, que o `form_with` usa para montar o endereço do formulário. O erro só aparece ao enviar.

**Erros de formulário só aparecem no terminal.** Quando um formulário é enviado, o Turbo (a parte do Rails que envia formulários sem recarregar a página) recebe a página de erro, mas ela pede para recarregar a página (`turbo-visit-control: reload`). O navegador recarrega a página do formulário, a tela fica igual, e o erro aparece só no terminal do servidor. É assim nos passos 4, 5 e 6 acima, e no `update` e no `destroy` do capítulo 05. Se alguém disser "cliquei e nada aconteceu", a primeira pergunta é: "o que diz o terminal do servidor?". Para saber mais sobre o Turbo (em inglês): [Turbo Handbook](https://turbo.hotwired.dev/handbook/introduction) e [Ensuring Specific Pages Trigger a Full Reload](https://turbo.hotwired.dev/handbook/drive#ensuring-specific-pages-trigger-a-full-reload), que explica o `turbo-visit-control`. A explicação dos códigos de status está nas notas do [capítulo 05]({{ site.baseurl }}{% link mentoras/projetos/mural-de-recados/05-corrigir-ou-apagar.md %}#rest-verbos-http-e-códigos-de-status).

O `NameError` do primeiro passo é diferente dos outros: a mensagem não fala de rota. Vale perguntar "de onde o Rails tiraria esse `new_message_path`?" para ligar o nome do endereço à rota.

**Por que a mensagem não fala de rota.** Para o Ruby, `new_message_path` é só um nome que ele não conhece: ele procura uma variável ou um método com esse nome, não acha e reclama (`undefined local variable or method`). Quem sabe que esse nome tem a ver com as rotas é o Rails, e o Ruby não leva isso em conta na mensagem.

**De onde o nome vem.** Cada rota com nome ganha um método com o nome dela mais `_path` (o endereço, como `/messages/new`) e `_url` (o endereço completo, com o domínio). O nome da rota aparece na coluna `Prefix` do `bin/rails routes`:

| Prefix | Rota | Métodos criados |
|---|---|---|
| `messages` | `GET /messages` (`index`) | `messages_path` e `messages_url` |
| `new_message` | `GET /messages/new` (`new`) | `new_message_path` e `new_message_url` |
| `root` | `GET /` (`root "messages#index"`) | `root_path` e `root_url` |

O `resources :messages` escolhe esses nomes pela convenção: `new_` mais o singular para a página do formulário, e o plural para a lista. Sem a rota `new`, o método não existe, e o link da página principal quebra. O erro está na falta da rota, e não no link. Para a participante ver isso, `bin/rails routes` mostra a coluna `Prefix`: o `new_message` só aparece na lista depois do `:new` no `only`.

## Confusões comuns

- **`@message` e `@messages`.** Uma letra de diferença: `@message` é o recado em branco do formulário, na ação `new`, e `@messages` é a lista, na ação `index`. Trocar um pelo outro dá erros confusos, como `Passed nil to the :model argument`.
- **Criar o `new.html.erb` na pasta errada.** O arquivo precisa ficar em `app/views/messages`, junto com o `index.html.erb`. Em outra pasta, o erro de view continua.
- **Esquecer o `=` no `<%= form_with`.** Sem o `=`, o formulário não aparece, e não aparece erro nenhum.
- **Ações depois do `private`.** O `def new` ou o `def create` escrito depois do `private` não é uma ação, e o erro é o mesmo de quando ela não existe.
- **Não reiniciar o servidor depois do passo 9.** O `config/environments/development.rb` só é lido quando o servidor liga.
- **O recado vazio do passo 10.** É de propósito: o Rails aceita, porque ninguém disse que é proibido. Não adiante a solução; ela é o capítulo do recado vazio.
- **O `params.expect`.** Quem conhece versões antigas do Rails pode esperar `params.require(:message).permit(:author, :content)`. O `params.expect` é a forma nova (Rails 8), e faz a mesma coisa com uma checagem a mais do formato do que chegou. Veja [Por que o `params.expect`](#por-que-o-paramsexpect).

## Por que o `params.expect`

{: .atencao }
Contexto só para a mentoria. **Não precisa levar para as participantes**: no capítulo, basta que o `message_params` é "a lista do que o controller aceita do formulário".

O `params.expect(message: [ :author, :content ])` faz duas coisas ao mesmo tempo: **exige** que o `message` tenha chegado e **permite** só os campos da lista. Ele existe desde o Rails 8.0 (conferi nos pacotes: o 7.2.3 não tem, e o 8.0.0 tem). Antes, o jeito era `params.require(:message).permit(:author, :content)`.

**1. A lista de campos protege contra o "mass assignment".** Quem manda a requisição não é só o formulário do guia: qualquer pessoa pode abrir as ferramentas do navegador (**Inspecionar**), acrescentar um campo ao formulário que está na tela e enviar. O Rails não percebe a diferença, porque o formulário editado leva o mesmo token da proteção de formulários do passo 9. Se o controller aceitasse tudo, ela poderia alterar o que não devia. Um exemplo do próprio guia: a ideia "Moderação" dos desafios extras acrescenta a coluna `approved` ao recado. Se o `message_params` incluísse o `:approved` (ou se o controller aceitasse todos os campos), qualquer pessoa postaria um recado já aprovado, bastando acrescentar ao formulário um campo assim:

```html
<input type="hidden" name="message[approved]" value="true">
```

Com a lista de dois campos, o `approved` é descartado. Testei: o `expect` devolveu só `author` e `content`. Isso vale para o `expect` e para o `require.permit`: é o *strong parameters*, do Rails. O caso mais famoso foi em 2012, quando um pesquisador usou esse tipo de falha para colocar uma chave SSH numa conta do GitHub (o resumo está na [Wikipédia](https://en.wikipedia.org/wiki/Mass_assignment_vulnerability)).

**2. O `expect` confere o formato do que chegou.** É a diferença dele para o `require.permit`. Se alguém mandar `message=hack` (um texto) em vez de um recado com campos:

| | O que acontece | Resposta ao navegador |
|---|---|---|
| `params.require(:message).permit(:author, :content)` | `NoMethodError: undefined method 'permit' for an instance of String` | **500**, erro do servidor |
| `params.expect(message: [ :author, :content ])` | `ActionController::ParameterMissing: param is missing or the value is empty or invalid: message` | **400**, pedido inválido |

O Rails trata uma entrada mal formada como um problema de quem enviou (400), e não do app (500). Isso importa por três motivos: o app não "quebra" com entrada inválida, os erros 500 de verdade não ficam misturados com tentativas de abuso (quem monitora o app, com alertas de erro, agradece), e o risco de o código seguir adiante com um formato inesperado diminui. A documentação do Rails descreve o `expect` como protegido contra "array tampering": no caso de campos que são listas (como `comments`), o `require.permit` aceita um hash onde se esperava uma lista de hashes, e o `expect`, não.

**O risco é real, mas moderado.** O `expect` não troca a autorização nem fecha sozinho uma falha séria: a falha clássica é o mass assignment, e quem a evita é a lista de campos. O `expect` fecha uma porta menor, a das entradas mal formadas, e é por isso que o Rails 8 o recomenda como padrão. Fontes: o [guia Action Controller Overview](https://guides.rubyonrails.org/action_controller_overview.html#strong-parameters) e a documentação do `expect` no código do Rails 8.1.

## O Simple Form: por que o guia não usa

{: .atencao }
Contexto só para a mentoria. **Não precisa levar para as participantes**: só se alguém perguntar, por ter visto em outro projeto.

O [Simple Form](https://github.com/heartcombo/simple_form) é uma gem que simplifica a criação de formulários. Em vez de escrever o `label` e o campo de cada informação, a pessoa escreve uma linha por campo (`f.input :author`), e a gem escolhe o campo pelo tipo da coluna (`string` vira uma caixa de uma linha, e `text`, uma caixa maior), coloca o rótulo, marca o que é obrigatório e mostra os avisos de erro.

**Ainda é usado?** Sim. Continua mantido pelo grupo Heartcombo (Rafael França e Carlos Antonio da Silva; antes, pela Plataformatec), com a versão 5.4.1 de janeiro de 2026, que pede o Rails 7.0 ou mais novo, e passa de 99 milhões de downloads. Testei num app com o Rails 8.1.4: o `simple_form_for` gerou o formulário normalmente. Mesmo assim, ele não vem num app novo, e a minha impressão é que, em apps novos, é comum ficar só com o `form_with` do próprio Rails. Essa impressão é minha, e não vem de uma pesquisa.

**Por que o guia não usa:**

- **Esconde o que a participante precisa ver.** O capítulo mostra que cada campo do `form_with` (`text_field`, `text_area`) vira um campo do formulário no HTML, e que o `name` do campo vira o `params` do controller. Com o Simple Form, uma linha faz tudo isso, e a ligação entre o código e a tela some.
- **É mais um conceito e mais passos.** São uma gem nova, um gerador (`bin/rails generate simple_form:install`) e um arquivo de configuração (`config/initializers/simple_form.rb`), para um formulário de dois campos.
- **Combina com o Bulma só com configuração.** O capítulo 06 escreve as classes do Bulma à mão (`field`, `label`, `input`, `textarea`). Com o Simple Form, seria preciso configurar um *wrapper* para gerar essa marcação.
- **Mostra os avisos de erro sozinho.** No capítulo 07, a participante escreve na view o bloco dos avisos do `@message.errors`, e é isso que ensina como o model e a view conversam. Com o Simple Form, os avisos apareceriam sem ela escrever nada.
- **O padrão do Rails é o que ela vai achar** na documentação e na maioria dos tutoriais.

**Quando vale a pena:** apps com muitos formulários, em que o mesmo visual, os rótulos, os avisos de erro e a tradução precisam ser iguais em todos. Aí, escrever uma vez a configuração compensa, e cada campo novo leva uma linha.

**O que o Simple Form faz sozinho e pode surpreender:** no teste, ele marcou os dois campos como obrigatórios (com um `*` no rótulo), mesmo sem validação no model, porque considera tudo obrigatório por padrão (`required_by_default`). Também desligou a validação do navegador (`novalidate`) e usou os nomes dos atributos em inglês nos rótulos (`Author`, `Content`), a não ser que o rótulo seja informado.

## Erro ao enviar o formulário no Codespaces

No Codespaces, o navegador acessa o app por um endereço `https://…app.github.dev`, mas o Rails recebe a requisição como se viesse de outro endereço. Ao enviar um formulário, a proteção contra envio de formulários de outros sites pode bloquear o pedido, com um erro como `ActionController::InvalidAuthenticityToken` ou "HTTP Origin header didn't match request.base_url".

Na Imersão 2025, a solução foi acrescentar esta linha em `config/environments/development.rb`, antes do último `end`:

```ruby
config.action_controller.forgery_protection_origin_check = false
```

Ela desliga só a conferência do endereço de origem, e só em desenvolvimento. Depois, desligue o servidor (Ctrl+C) e ligue de novo.

Testado no Codespaces em 2026-10-06, com o Rails 8.1: sem a linha, o formulário é recusado com `HTTP Origin header (https://localhost:3000) didn't match request.base_url`. O Codespaces entrega a requisição ao app com a origem `localhost:3000`, enquanto o endereço do app é o `.app.github.dev`. O `RAILS_DEVELOPMENT_HOSTS` do template resolve o "Blocked hosts", mas não esse erro.

Decisão: a linha entra no passo 9 do capítulo 04, como mais um erro do caminho, depois da ação `create`.

<!-- TODO: confirmar se a linha `config.hosts << /.*\.app\.github\.dev/` da Imersão 2025 faz falta (o template já libera o endereço pela variável `RAILS_DEVELOPMENT_HOSTS`). -->

## Próximas notas

[05. Errei! Como corrigir ou apagar?]({{ site.baseurl }}{% link mentoras/projetos/mural-de-recados/05-corrigir-ou-apagar.md %})
