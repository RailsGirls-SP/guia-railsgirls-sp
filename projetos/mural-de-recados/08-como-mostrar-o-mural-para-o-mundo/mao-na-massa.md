---
title: Mão na massa
parent: "08. Como mostrar o mural de recados para o mundo?"
grand_parent: Mural de recados
nav_order: 1
---

# Mão na massa

<!-- TODO: testar o capítulo inteiro num deploy de verdade no Render, com um app criado pelo template do Codespaces: confirmar se o Render instala a versão do Ruby do .ruby-version (Ruby 4.0), se o plano gratuito pede cartão de crédito, os nomes dos botões e campos do painel do Render e o tempo do primeiro deploy. Tirar as capturas. -->

Travou em algum passo? Veja [Travou?](#travou), no fim da página.

Neste capítulo, você vai sair do codespace: a maior parte dos passos acontece no site do **Render**. Os botões e as telas do Render podem mudar um pouco com o tempo. Se algo estiver diferente, procure o nome mais parecido ou peça ajuda para alguém da mentoria.

<details class="passo" markdown="1" open>
<summary>1. Crie a sua conta no Render</summary>

Primeiro, você vai preparar o lugar onde o app vai rodar: a conta e o banco de dados no Render. Depois, volta para o codespace para preparar o app.

Numa aba nova do navegador, abra [render.com](https://render.com) e clique em **Get Started** (ou **Sign Up**). Escolha entrar com o **GitHub**, a mesma conta que você usa no codespace.

O GitHub vai perguntar se o Render pode acessar a sua conta. Leia com calma e autorize.

**Confira:** você entra no painel do Render (o *Dashboard*), com a mensagem **You haven't created any services yet** (você ainda não criou nenhum serviço). O botão **New**, que você vai usar nos próximos passos, fica no alto, à direita.

![Painel do Render recém-criado: no alto, à direita, o botão New; no meio, a mensagem "You haven't created any services yet" e os atalhos Deploy a Web Service, Deploy a Static Site, Create a Postgres database e Explore all service types]({{ '/assets/images/mural-de-recados/08/painel-vazio.png' | relative_url }})
{: .ilustracao .ilustracao-larga }

Terminou? Abra o passo **2. Crie o banco de dados**

</details>

<details class="passo" markdown="1">
<summary>2. Crie o banco de dados</summary>

No seu codespace, o banco de dados é um arquivo, o `storage/development.sqlite3`. No Render, o app pode ser reiniciado a qualquer momento, e cada vez que isso acontece os arquivos que ele criou são apagados. Um banco de dados que é um arquivo perderia todos os recados.

Por isso, no Render, o app vai usar outro tipo de banco de dados, o **PostgreSQL**, que roda separado do app e não perde nada quando o app reinicia. No seu codespace, tudo continua como está: o PostgreSQL é só para o app no ar.

No painel do Render, clique em **New** e escolha **Postgres**. Se o painel ainda estiver vazio, também dá para clicar no atalho **Create a Postgres database**. Preencha:

- **Name:** `mural_de_recados_db` (o nome que aparece no painel do Render)
- **Project:** deixe em branco. É opcional e serve para agrupar vários serviços, o que o mural de recados não precisa.
- **Database:** `mural_de_recados_production` (o nome do banco de dados, seguindo o costume do Rails: o nome do app e o ambiente)
- **User:** deixe em branco, o Render cria
- **Region:** **Virginia (US East)**, a mais perto do Brasil. O app vai ficar na mesma região.
- **PostgreSQL Version:** deixe a que já vem escolhida, a mais recente.
- **Datadog API Key** e **Datadog Region:** deixe como estão. São para quem usa o Datadog, um serviço que acompanha o funcionamento do banco de dados.
- **Compute:** a opção **$0 / month**, marcada como **Free** (gratuita). Ela já vem escolhida.

Deixe o resto como está (**Storage**, **Storage Autoscaling** e **High Availability**). Confira se o **Monthly Total**, no fim da página, está em **$0 / month** e clique em **Create database**.

<details class="pergunta" markdown="1">
<summary>Veja o formulário preenchido</summary>

![Formulário New Postgres do Render preenchido: Name mural_de_recados_db, Project vazio, Database mural_de_recados_production, User vazio, Region Virginia (US East), PostgreSQL Version 18, Datadog API Key vazio, Datadog Region US1 (default), Compute com a opção $0 / month (Free) marcada, Storage de 1 GB, Storage Autoscaling e High Availability desligados, Monthly Total de $0 / month e o botão Create database]({{ '/assets/images/mural-de-recados/08/novo-banco-de-dados.png' | relative_url }})
{: .ilustracao .ilustracao-larga }

</details>

**Confira:** o banco de dados aparece com o status **Available** (disponível) depois de um ou dois minutos.

Terminou? Abra o passo **3. Ensine o app a conversar com o PostgreSQL**

</details>

<details class="passo" markdown="1">
<summary>3. Ensine o app a conversar com o PostgreSQL</summary>

O banco de dados está pronto no Render. Agora, o app precisa de uma peça nova para conseguir usar esse tipo de banco de dados.

Abra o seu codespace. No terminal novo, digite:

```
bundle add pg
```

**Confira:** o terminal termina sem erro, e o arquivo `Gemfile` ganhou, no fim, uma linha parecida com esta:

```ruby
gem "pg", "~> 1.7"
```

O `pg` é a peça que deixa o Rails conversar com o PostgreSQL. O `Gemfile` é a lista de todas as peças que o app usa.

Terminou? Abra o passo **4. Proteja o mural de recados com uma palavra-chave**

</details>

<details class="passo" markdown="1">
<summary>4. Proteja o mural de recados com uma palavra-chave</summary>

No ar, qualquer pessoa com o endereço consegue abrir o mural de recados, inclusive **robôs** que vasculham a internet procurando formulários abertos para encher de propaganda. Para evitar isso, o mural de recados vai pedir uma palavra-chave antes de abrir. Quem é do workshop recebe a palavra-chave e entra; os robôs ficam de fora.

Abra o arquivo `app/controllers/application_controller.rb`. Ele é o controller "pai" de todos os outros: o que você escreve nele vale para o app inteiro. Logo abaixo da primeira linha, a do `class`, acrescente:

```ruby
  if ENV["ACCESS_PASSWORD"].present?
    http_basic_authenticate_with name: "mural", password: ENV["ACCESS_PASSWORD"]
  end
```

O arquivo inteiro fica assim:

```ruby
class ApplicationController < ActionController::Base
  if ENV["ACCESS_PASSWORD"].present?
    http_basic_authenticate_with name: "mural", password: ENV["ACCESS_PASSWORD"]
  end
  # Only allow modern browsers supporting webp images, web push, badges, import maps, CSS nesting, and CSS :has.
  allow_browser versions: :modern

  # Changes to the importmap will invalidate the etag for HTML responses
  stale_when_importmap_changes
end
```

Salve o arquivo.

- `http_basic_authenticate_with` faz o navegador pedir um usuário e uma senha antes de abrir qualquer página do app. O usuário é sempre `mural`, e a senha é a palavra-chave.
- `ENV["ACCESS_PASSWORD"]` é uma **variável de ambiente**: um valor que fica guardado fora do código, no lugar onde o app roda. Assim, a palavra-chave não vai para o GitHub. Você vai escolher a palavra-chave no Render, no passo 6.
- O `if ... present?` só liga a proteção quando a variável existe. No seu codespace ela não existe, então nada muda enquanto você programa.

**Dê um palpite:** recarregue o app no codespace. Ele vai pedir a palavra-chave?

**Confira:** não pede. O mural de recados abre normalmente, porque no codespace a variável `ACCESS_PASSWORD` não existe.

Terminou? Abra o passo **5. Guarde e envie para o GitHub**

</details>

<details class="passo" markdown="1">
<summary>5. Guarde e envie para o GitHub</summary>

O Render vai buscar o código no seu repositório do GitHub. Então, as duas mudanças que você acabou de fazer precisam estar lá: a peça `pg` (passo 3) e a palavra-chave (passo 4).

**Dê um palpite:** quais arquivos aparecem em **Changes**, no painel **Source Control**?

**Confira:** três arquivos: o `Gemfile` e o `Gemfile.lock`, que ganharam o `pg`, e o `application_controller.rb`, com a palavra-chave.

Guarde o seu progresso com um [commit]({{ site.baseurl }}{% link glossario.md %}#commit), como no passo **Guarde o seu progresso** de [Por onde começar?]({{ site.baseurl }}{% link projetos/mural-de-recados/01-por-onde-comecar/mao-na-massa.md %}):

1. No painel **Source Control**, clique no **+** ao lado de **Changes** (**Stage All Changes**).
2. Escreva a mensagem `Prepara o app para o Render` e clique em **Commit**.
3. Clique em **Sync Changes** e, na janela que abrir, em **OK**.

**Confira:** em **Graph**, o commit `Prepara o app para o Render` aparece com a etiqueta **main** e o ícone de nuvem.

Terminou? Abra o passo **6. Crie o app no Render**

</details>

<details class="passo" markdown="1">
<summary>6. Crie o app no Render</summary>

Volte para a aba do Render. No painel, clique em **New** e escolha **Web Service**. Em **Git Provider**, escolha o **GitHub**.

O GitHub abre a tela **Authorize Render**. Clique em **Authorize**: essa tela confirma quem você é, mas ainda não deixa o Render ler os seus repositórios.

Agora, procure o repositório do seu mural de recados na lista. Na primeira vez, ele não aparece. A permissão para ler os repositórios é dada à parte, instalando o Render na sua conta do GitHub:

1. Numa aba nova, abra [github.com/apps/render/installations/new](https://github.com/apps/render/installations/new).
2. Escolha a conta do GitHub onde está o seu mural de recados.
3. Em **Repository access**, escolha **Only select repositories** (só os repositórios escolhidos) e, na lista, o repositório do seu mural de recados. Assim, o Render só enxerga esse repositório, e não todos os seus.
4. Clique em **Install**.
5. Volte para a aba do Render e recarregue a página.

<!-- TODO: confirmar no deploy de verdade se o formulário do Web Service tem um link que leva para a instalação (sem precisar abrir o endereço à mão) e os nomes dos botões da tela de instalação. -->

**Confira:** o repositório do seu mural de recados aparece na lista. Clique nele.

Preencha:

O Render percebe que o app é um app Rails e já preenche alguns campos. Confira e mude o que for preciso:

- **Name:** `mural-de-recados` (vira parte do endereço do app; se já existir, o Render acrescenta letras e números).
- **Project:** deixe em branco, como no banco de dados.
- **Language:** **Ruby**. Já vem escolhida.
- **Branch:** `main`. Já vem escolhida.
- **Region:** **Virginia (US East)**, a mesma do banco de dados. Ela já vem escolhida, com o aviso **1 existing service** (o banco de dados).
- **Root Directory:** deixe em branco.
- **Build Command:** o campo já vem com uma receita do Render. Apague e cole a receita abaixo.
- **Start Command:** o campo também vem preenchido. Apague e cole o comando abaixo.
- **Compute:** a opção **$0 / month**, marcada como **Free** (gratuita). Ela já vem escolhida.

No **Build Command**:

```
bundle install && bin/rails assets:precompile && bin/rails db:prepare
```

No **Start Command**, o mesmo comando que você usa no codespace para ligar o app:

```
bin/rails server
```

O **Build Command** é a receita que o Render segue para preparar o app antes de ligá-lo, a cada deploy (veja [Build command](https://render.com/docs/deploys#build-command), na documentação do Render, em inglês):

- `bundle install` instala as peças do `Gemfile`.
- `bin/rails assets:precompile` prepara os arquivos da página, como o CSS.
- `bin/rails db:prepare` cria as tabelas no banco de dados, como o `db:migrate` que você usou no capítulo 02.
- `&&` liga um comando ao outro: o próximo só roda se o anterior der certo. Se algum passo der errado, o deploy para, e o app não vai para o ar pela metade.

Ainda na mesma página, procure **Environment Variables** (variáveis de ambiente). O Render já colocou duas: a `WEB_CONCURRENCY`, que pode ficar como está, e a `RAILS_MASTER_KEY`, ainda sem valor. Complete a lista para ficar assim (para acrescentar uma variável, clique em **Add Environment Variable**):

| Key | Value |
|---|---|
| `WEB_CONCURRENCY` | deixe o valor que o Render colocou |
| `RAILS_MASTER_KEY` | o conteúdo do arquivo `config/master.key`, do seu codespace |
| `ACCESS_PASSWORD` | a palavra-chave do seu mural de recados, que você escolhe agora |
| `DATABASE_URL` | o **Internal Database URL** do banco de dados |

Para pegar o `RAILS_MASTER_KEY`, volte para o codespace, abra o arquivo `config/master.key` no Explorer e copie a linha que está nele (uma sequência de letras e números). Cole no **Value** da `RAILS_MASTER_KEY`, no Render.

{: .atencao }
Não clique em **Generate**, ao lado da `RAILS_MASTER_KEY`. Ele cria uma chave nova, diferente da do seu app, e o app não consegue ligar.

O `config/master.key` é a chave que abre o arquivo `config/credentials.yml.enc`, onde o Rails guarda os segredos do app. O `credentials.yml.enc` vai para o GitHub embaralhado; a chave, não (o Rails já deixa o `master.key` de fora). Por isso, ela precisa ser colada no Render. Não cole essa chave em nenhum outro lugar.

Para pegar o `DATABASE_URL`, abra o painel do Render numa aba nova, clique no banco de dados `mural_de_recados_db` e procure a parte **Connections**. Na linha **Internal Database URL**, clique no botão de copiar, o último à direita. O endereço aparece escondido com pontinhos, mas é copiado inteiro, começando com `postgresql://`.

![Parte Connections da página do banco de dados no Render, com as linhas Hostname, Port, Database, Username, Password, Internal Database URL, External Database URL e PSQL Command; a linha Internal Database URL está destacada]({{ '/assets/images/mural-de-recados/08/internal-database-url.png' | relative_url }})
{: .ilustracao .ilustracao-larga }

Cuidado para não copiar o **External Database URL**, logo abaixo: ele é para acessar o banco de dados de fora do Render.

{: .atencao }
O **Internal Database URL** tem a senha do seu banco de dados. Não cole esse endereço em nenhum outro lugar além do Render.

Para a `ACCESS_PASSWORD`, escolha uma palavra-chave fácil de passar para o pessoal do workshop, como `pao-de-queijo`. Ela vai ser compartilhada com outras pessoas, então **não use uma senha sua de verdade**.

Deixe a parte **Advanced** fechada e clique em **Deploy web service**.

<details class="pergunta" markdown="1">
<summary>Veja o formulário preenchido</summary>

![Formulário New Web Service do Render preenchido: Source Code com o repositório mural-de-recados, Name mural-de-recados, Project vazio, Language Ruby, Branch main, Region Virginia (US East) com 1 existing service, Root Directory vazio, Build Command com bundle install, assets:precompile e db:prepare, Start Command bin/rails server, Compute com a opção $0 / month (Free) marcada, as variáveis WEB_CONCURRENCY, RAILS_MASTER_KEY, ACCESS_PASSWORD e DATABASE_URL com os valores escondidos, a parte Advanced fechada e o botão Deploy web service]({{ '/assets/images/mural-de-recados/08/novo-app.png' | relative_url }})
{: .ilustracao .ilustracao-larga }

</details>

Terminou? Abra o passo **7. Espere o primeiro deploy**

</details>

<details class="passo" markdown="1">
<summary>7. Espere o primeiro deploy</summary>

O Render começa o **deploy**: busca o seu código no GitHub, roda a receita do **Build Command** e liga o app. Na tela, aparecem as mensagens do processo, parecidas com as do terminal.

**Dê um palpite:** o que aparece nas mensagens, pela receita que você colou no **Build Command**?

O primeiro deploy demora alguns minutos. Enquanto espera, procure nas mensagens os passos da receita: o `bundle install` instalando as peças, o `assets:precompile` e o `db:prepare` criando as tabelas.

**Confira:** no fim, aparece a mensagem **Your service is live** 🎉, e o status do app fica **Live**.

<!-- TODO: captura das mensagens do deploy com "Your service is live" -->

Terminou? Abra o passo **8. Abra o seu mural de recados no ar**

</details>

<details class="passo" markdown="1">
<summary>8. Abra o seu mural de recados no ar</summary>

No topo da página do app no Render, tem um endereço parecido com `https://mural-de-recados.onrender.com`. Clique nele.

O navegador abre uma janelinha pedindo um usuário e uma senha. Ela é do navegador, e não do app, então pode aparecer em inglês: **Sign in**, com os campos **Username** (usuário) e **Password** (senha). Digite `mural` no usuário e, na senha, a palavra-chave que você escolheu no passo 6. Clique em **Sign In**.

![Navegador abrindo o endereço do mural de recados no Render, com a janelinha Sign in pedindo Username e Password, e os botões Cancel e Sign In]({{ '/assets/images/mural-de-recados/08/pedir-palavra-chave.png' | relative_url }})
{: .ilustracao .ilustracao-larga }

**Confira:** aparece o seu mural de recados, com o botão **Novo recado** e o convite **Ainda não tem nenhum recado. Que tal postar o primeiro?**. Os recados do seu codespace não vieram: o app no ar tem o seu próprio banco de dados.

Clique em **Novo recado** e poste o primeiro recado do mural de recados no ar. 🎉

![Mural de recados no ar, com o endereço do Render na barra do navegador, o botão Novo recado e um cartão amarelo com o recado "AEEEE! Deu certo!" e os botões Editar e Apagar]({{ '/assets/images/mural-de-recados/08/mural-no-ar.png' | relative_url }})
{: .ilustracao .ilustracao-larga }

Agora abra o mesmo endereço no seu celular, ou mande para alguém do workshop, junto com a palavra-chave: quem souber a palavra-chave pode abrir e deixar um recado.

<!-- TODO: captura do mural de recados no ar, no celular -->

Terminou? Abra o passo **9. Mude e veja mudar no ar**

</details>

<details class="passo" markdown="1">
<summary>9. Mude e veja mudar no ar</summary>

Daqui para a frente, cada mudança que você envia para o GitHub vai para o ar sozinha.

No codespace, abra o `app/views/messages/index.html.erb` e mude o título. Por exemplo:

```erb
    <h1 class="title">Mural de recados do Rails Girls</h1>
```

Salve, faça um commit com a mensagem `Muda o título do mural` e clique em **Sync Changes**.

**Dê um palpite:** o que acontece no Render?

**Confira:** no painel do Render, um novo deploy começa sozinho. Quando ele terminar, recarregue o endereço do app: o título novo aparece no mural de recados no ar.

</details>

## Travou?

Abra o problema que aconteceu com você:

<details class="pergunta" markdown="1">
<summary>O repositório do mural de recados não aparece na lista do Render</summary>

O Render ainda não tem permissão para ler esse repositório. Abra [github.com/apps/render/installations/new](https://github.com/apps/render/installations/new), escolha a conta (ou a organização) onde está o repositório e, em **Repository access**, acrescente o repositório do mural de recados. Clique em **Save** e volte para o Render: o repositório aparece na lista. Funciona com repositórios públicos e privados.

</details>

<details class="pergunta" markdown="1">
<summary>O deploy falhou com um erro de banco de dados ou de conexão</summary>

Confira, no Render, a variável `DATABASE_URL` do app: ela precisa ser o **Internal Database URL** do banco de dados, completo, começando com `postgresql://`. Confira também se o app e o banco de dados estão na **mesma região**. Depois de corrigir, clique em **Manual Deploy** e em **Deploy latest commit**.

</details>

<details class="pergunta" markdown="1">
<summary>Aparece um erro com <code>master key</code>, <code>secret_key_base</code> ou <code>credentials</code></summary>

A variável `RAILS_MASTER_KEY` está faltando ou com o valor errado (por exemplo, se alguém clicou em **Generate**). Copie de novo o conteúdo do `config/master.key` do codespace, sem espaços nem linhas a mais, e cole no Render, na página do app, em **Environment**. Depois de corrigir, clique em **Manual Deploy** e em **Deploy latest commit**.

</details>

<details class="pergunta" markdown="1">
<summary>A janelinha da palavra-chave não aceita a senha</summary>

Confira se você digitou `mural` no usuário, e não a palavra-chave. A senha é exatamente o que está na variável `ACCESS_PASSWORD`, no Render, com as mesmas letras maiúsculas e minúsculas. Se mudar a variável, o Render reinicia o app sozinho.

</details>

<details class="pergunta" markdown="1">
<summary>O app demora muito para abrir</summary>

No plano gratuito, o app "dorme" depois de uns 15 minutos sem ninguém abrir. A primeira pessoa que abre depois disso espera cerca de um minuto. Depois, ele fica rápido de novo.

</details>

<details class="pergunta" markdown="1">
<summary>O deploy falhou e eu não entendi a mensagem</summary>

Leia as últimas linhas das mensagens do deploy: o erro costuma estar lá, como no terminal. Copie a mensagem e peça ajuda para alguém da mentoria. 💜 Você também pode pedir para uma IA explicar a mensagem, como em [Usando IA como tutora]({{ site.baseurl }}{% link comece-aqui/ia-como-tutora.md %}).

</details>

Mentoria: veja as [notas deste capítulo]({{ site.baseurl }}{% link mentoras/projetos/mural-de-recados/08-como-mostrar-o-mural-para-o-mundo.md %}).

## Terminou?

Siga para [O que aconteceu?]({{ site.baseurl }}{% link projetos/mural-de-recados/08-como-mostrar-o-mural-para-o-mundo/o-que-aconteceu.md %}) e entenda cada passo.
