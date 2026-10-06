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
<summary>1. Prepare o app para o banco de dados do Render</summary>

No seu codespace, o banco de dados é um arquivo, o `storage/development.sqlite3`. No Render, o app pode ser reiniciado a qualquer momento, e cada vez que isso acontece os arquivos que ele criou são apagados. Um banco de dados que é um arquivo perderia todos os recados.

Por isso, no Render, o app vai usar outro tipo de banco de dados, o **PostgreSQL**, que roda separado do app e não perde nada quando o app reinicia. No seu codespace, tudo continua como está.

Abra o seu codespace. No terminal novo, digite:

```
bundle add pg
```

**Confira:** o terminal termina sem erro, e o arquivo `Gemfile` ganhou, no fim, uma linha parecida com esta:

```ruby
gem "pg", "~> 1.7"
```

O `pg` é a peça que deixa o Rails conversar com o PostgreSQL. O `Gemfile` é a lista de todas as peças que o app usa.

Terminou? Abra o passo **2. Escreva a receita de preparação**

</details>

<details class="passo" markdown="1">
<summary>2. Escreva a receita de preparação</summary>

Antes de ligar o app, o Render precisa prepará-lo: instalar as peças do `Gemfile`, preparar os arquivos da página e criar as tabelas no banco de dados. Você vai escrever esses passos num arquivo.

No Explorer, clique com o botão direito na pasta `bin`, escolha **New File…** e crie o arquivo `render-build.sh`. Escreva nele:

```bash
#!/bin/bash
set -o errexit

bundle install
bin/rails assets:precompile
bin/rails db:prepare
```

Salve o arquivo.

- `bundle install` instala as peças do `Gemfile`.
- `bin/rails assets:precompile` prepara os arquivos da página, como o CSS.
- `bin/rails db:prepare` cria as tabelas no banco de dados, como o `db:migrate` que você usou no capítulo 02.
- `set -o errexit` para tudo se algum passo der errado, para o app não ir para o ar pela metade.

Agora, avise o computador que esse arquivo pode ser executado. No terminal novo:

```
chmod +x bin/render-build.sh
```

Esse comando não mostra nenhuma mensagem quando dá certo.

Terminou? Abra o passo **3. Proteja o mural de recados com uma palavra-chave**

</details>

<details class="passo" markdown="1">
<summary>3. Proteja o mural de recados com uma palavra-chave</summary>

No ar, qualquer pessoa com o endereço consegue abrir o mural de recados, inclusive **robôs** que vasculham a internet procurando formulários abertos para encher de propaganda. Para evitar isso, o mural de recados vai pedir uma palavra-chave antes de abrir. Quem é do workshop recebe a palavra-chave e entra; os robôs ficam de fora.

Abra o arquivo `app/controllers/application_controller.rb`. Ele é o controller "pai" de todos os outros: o que você escreve nele vale para o app inteiro. Logo abaixo da primeira linha, a do `class`, acrescente:

```ruby
  if ENV["ACCESS_PASSWORD"].present?
    http_basic_authenticate_with name: "mural", password: ENV["ACCESS_PASSWORD"]
  end
```

O começo do arquivo fica assim:

```ruby
class ApplicationController < ActionController::Base
  if ENV["ACCESS_PASSWORD"].present?
    http_basic_authenticate_with name: "mural", password: ENV["ACCESS_PASSWORD"]
  end
```

Salve o arquivo.

- `http_basic_authenticate_with` faz o navegador pedir um usuário e uma senha antes de abrir qualquer página do app. O usuário é sempre `mural`, e a senha é a palavra-chave.
- `ENV["ACCESS_PASSWORD"]` é uma **variável de ambiente**: um valor que fica guardado fora do código, no lugar onde o app roda. Assim, a palavra-chave não vai para o GitHub. Você vai escolher a palavra-chave no Render, no passo 7.
- O `if ... present?` só liga a proteção quando a variável existe. No seu codespace ela não existe, então nada muda enquanto você programa.

**Dê um palpite:** recarregue o app no codespace. Ele vai pedir a palavra-chave?

**Confira:** não pede. O mural de recados abre normalmente, porque no codespace a variável `ACCESS_PASSWORD` não existe.

Terminou? Abra o passo **4. Guarde e envie para o GitHub**

</details>

<details class="passo" markdown="1">
<summary>4. Guarde e envie para o GitHub</summary>

O Render vai buscar o código no seu repositório do GitHub. Então, as mudanças precisam estar lá.

Guarde o seu progresso com um [commit]({{ site.baseurl }}{% link extras/glossario.md %}#commit), como no passo **Guarde o seu progresso** de [Por onde começar?]({{ site.baseurl }}{% link projetos/mural-de-recados/01-por-onde-comecar/mao-na-massa.md %}):

1. No painel **Source Control**, clique no **+** ao lado de **Changes** (**Stage All Changes**).
2. Escreva a mensagem `Prepara o app para o Render` e clique em **Commit**.
3. Clique em **Sync Changes** e, na janela que abrir, em **OK**.

**Confira:** em **Graph**, o commit `Prepara o app para o Render` aparece com a etiqueta **main** e o ícone de nuvem.

Terminou? Abra o passo **5. Crie a sua conta no Render**

</details>

<details class="passo" markdown="1">
<summary>5. Crie a sua conta no Render</summary>

Numa aba nova do navegador, abra [render.com](https://render.com) e clique em **Get Started** (ou **Sign Up**). Escolha entrar com o **GitHub**, a mesma conta que você usa no codespace.

O GitHub vai perguntar se o Render pode acessar a sua conta. Leia com calma e autorize.

**Confira:** você entra no painel do Render (o *Dashboard*), ainda sem nenhum serviço.

<!-- TODO: captura do painel do Render vazio -->

Terminou? Abra o passo **6. Crie o banco de dados**

</details>

<details class="passo" markdown="1">
<summary>6. Crie o banco de dados</summary>

No painel do Render, clique em **New** (ou **+ New**) e escolha **Postgres**. Preencha:

- **Name:** `mural-de-recados-db`
- **Region:** a mais perto de você. Anote qual foi: o app precisa ficar na mesma.
- **Instance Type** (ou **Plan**): **Free**

Deixe o resto como está e clique em **Create Database**.

**Confira:** o banco de dados aparece com o status **Available** (disponível) depois de um ou dois minutos.

Na página do banco de dados, procure a parte **Connections** e copie o endereço **Internal Database URL**. Ele começa com `postgresql://`. Você vai usar no próximo passo.

<!-- TODO: captura da parte Connections, com o Internal Database URL -->

{: .atencao }
O **Internal Database URL** tem a senha do seu banco de dados. Não cole esse endereço em nenhum outro lugar além do Render.

Terminou? Abra o passo **7. Crie o app no Render**

</details>

<details class="passo" markdown="1">
<summary>7. Crie o app no Render</summary>

No painel do Render, clique em **New** e escolha **Web Service**. Escolha o **GitHub** e, na lista, o repositório do seu mural de recados. Se ele não aparecer, clique em **Configure account** e dê acesso a esse repositório.

Preencha:

- **Name:** `mural-de-recados` (vira parte do endereço do app; se já existir, o Render acrescenta letras e números).
- **Language** (ou **Runtime**): **Ruby**
- **Branch:** `main`
- **Region:** a mesma do banco de dados.
- **Build Command:** `bin/render-build.sh`
- **Start Command:** `bin/rails server`
- **Instance Type:** **Free**

Ainda na mesma página, procure **Environment Variables** (variáveis de ambiente) e acrescente três:

| Name | Value |
|---|---|
| `DATABASE_URL` | o **Internal Database URL** que você copiou no passo 6 |
| `RAILS_MASTER_KEY` | o conteúdo do arquivo `config/master.key` |
| `ACCESS_PASSWORD` | a palavra-chave do seu mural de recados, que você escolhe agora |

Para a `ACCESS_PASSWORD`, escolha uma palavra-chave fácil de passar para o pessoal do workshop, como `pao-de-queijo`. Ela vai ser compartilhada com outras pessoas, então **não use uma senha sua de verdade**.

Para pegar o `RAILS_MASTER_KEY`, volte para o codespace, abra o arquivo `config/master.key` no Explorer e copie a linha que está nele (uma sequência de letras e números).

{: .atencao }
O `config/master.key` é uma chave secreta do seu app. Ele não vai para o GitHub (o Rails já deixa ele de fora) e só deve ser colado aqui, no Render.

Clique em **Deploy Web Service** (ou **Create Web Service**).

<!-- TODO: captura do formulário do Web Service preenchido -->

Terminou? Abra o passo **8. Espere o primeiro deploy**

</details>

<details class="passo" markdown="1">
<summary>8. Espere o primeiro deploy</summary>

O Render começa o **deploy**: busca o seu código no GitHub, roda a receita do `bin/render-build.sh` e liga o app. Na tela, aparecem as mensagens do processo, parecidas com as do terminal.

**Dê um palpite:** o que aparece nas mensagens, pelo que você escreveu no `bin/render-build.sh`?

O primeiro deploy demora alguns minutos. Enquanto espera, procure nas mensagens os passos da receita: o `bundle install` instalando as peças, o `assets:precompile` e o `db:prepare` criando as tabelas.

**Confira:** no fim, aparece a mensagem **Your service is live** 🎉, e o status do app fica **Live**.

<!-- TODO: captura das mensagens do deploy com "Your service is live" -->

Terminou? Abra o passo **9. Abra o seu mural de recados no ar**

</details>

<details class="passo" markdown="1">
<summary>9. Abra o seu mural de recados no ar</summary>

No topo da página do app no Render, tem um endereço parecido com `https://mural-de-recados.onrender.com`. Clique nele.

O navegador abre uma janelinha pedindo um usuário e uma senha. Digite `mural` no usuário e, na senha, a palavra-chave que você escolheu no passo 7.

**Confira:** aparece o seu mural de recados, com o formulário e o convite **Ainda não tem nenhum recado. Que tal postar o primeiro?**. Os recados do seu codespace não vieram: o app no ar tem o seu próprio banco de dados.

Poste o primeiro recado do mural de recados no ar. 🎉

Agora abra o mesmo endereço no seu celular, ou mande para alguém do workshop, junto com a palavra-chave: quem souber a palavra-chave pode abrir e deixar um recado.

<!-- TODO: captura do mural de recados no ar, no celular -->

Terminou? Abra o passo **10. Mude e veja mudar no ar**

</details>

<details class="passo" markdown="1">
<summary>10. Mude e veja mudar no ar</summary>

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
<summary>O deploy falhou com <code>Permission denied</code> no <code>render-build.sh</code></summary>

Falta avisar que o arquivo pode ser executado. No codespace, rode `chmod +x bin/render-build.sh`, faça um commit e clique em **Sync Changes**. O Render tenta de novo sozinho.

</details>

<details class="pergunta" markdown="1">
<summary>O deploy falhou com um erro de banco de dados ou de conexão</summary>

Confira, no Render, a variável `DATABASE_URL` do app: ela precisa ser o **Internal Database URL** do banco de dados, completo, começando com `postgresql://`. Confira também se o app e o banco de dados estão na **mesma região**. Depois de corrigir, clique em **Manual Deploy** e em **Deploy latest commit**.

</details>

<details class="pergunta" markdown="1">
<summary>Aparece um erro com <code>master key</code> ou <code>credentials</code></summary>

A variável `RAILS_MASTER_KEY` está faltando ou com o valor errado. Copie de novo o conteúdo do `config/master.key` do codespace, sem espaços nem linhas a mais, e cole no Render.

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
