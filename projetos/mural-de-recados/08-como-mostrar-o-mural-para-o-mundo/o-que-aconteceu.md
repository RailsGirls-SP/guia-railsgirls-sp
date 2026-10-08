---
title: "O que aconteceu?"
parent: "08. Como mostrar o mural de recados para o mundo?"
grand_parent: Mural de recados
nav_order: 2
---

# O que aconteceu?

<details class="passo" markdown="1" open>
<summary>Por dentro do app</summary>

Agora o seu app existe em dois lugares:

| | No seu codespace | No Render |
|---|---|---|
| **Para quê** | Programar e testar | Qualquer pessoa usar |
| **Quem abre** | Só você | Quem tiver o endereço e a palavra-chave |
| **Banco de dados** | SQLite, um arquivo (`storage/development.sqlite3`) | PostgreSQL, um serviço separado |
| **Os recados** | Os seus testes | Os recados de verdade |

Quem programa chama o primeiro de ambiente de **desenvolvimento** (*development*) e o segundo de ambiente de **produção** (*production*). O código é o mesmo, e o que muda entre os dois fica em configurações separadas.

Você não precisou escolher o ambiente: quem diz ao Rails em qual ambiente ele está é a variável de ambiente `RAILS_ENV`. O Render já cria essa variável sozinho, com o valor `production`, em todo app Ruby. No codespace, ela não existe, e o Rails usa `development`.

Cada ambiente tem o seu arquivo de configurações, na pasta `config/environments`: o `development.rb` e o `production.rb`, que o `rails new` já criou. Você mexeu num deles no capítulo 04: a linha da proteção de formulários foi para o `development.rb`, e por isso só vale no codespace. E o banco de dados de produção vem da variável `DATABASE_URL`, que você colou no Render.

Você está aqui: este é o caminho que uma requisição percorre dentro do app. Ele é o mesmo no codespace e no Render: o que mudou foi o computador onde o app roda.

```mermaid
flowchart LR
  Navegador --> Rota --> Controller
  Controller <--> Model
  Model <--> Banco[(Banco de dados)]
  Controller --> View --> Navegador

  classDef aqui fill:#73121b,stroke:#f2b8be,stroke-width:2px,color:#fff
  classDef visto fill:#fbe3e5,stroke:#c98b91,color:#490606
  class Banco aqui
  class Rota,Controller,Model,View visto
```

Em vermelho escuro, a peça que mudou neste capítulo; em rosa claro, as que você já conhece dos capítulos anteriores.

#### O deploy

**Deploy** (implantação) é o nome do processo de levar o código para o lugar onde o app roda e ligar o app de novo. Cada deploy do Render segue a mesma receita: buscar o código no GitHub, rodar a receita do **Build Command** e ligar o app com o `bin/rails server`. Como ele acompanha o seu repositório, cada **Sync Changes** vira um deploy novo.

#### Segredos ficam fora do código

O `DATABASE_URL` (com a senha do banco de dados), o `RAILS_MASTER_KEY` (a chave secreta do app) e a `ACCESS_PASSWORD` (a palavra-chave do mural de recados) não estão no seu código nem no GitHub: eles foram colados direto no Render, como **variáveis de ambiente**. Assim, mesmo que alguém veja o seu repositório, não consegue entrar no seu banco de dados.

{: .atencao }
Nunca escreva um segredo no código nem faça commit de um arquivo com segredos, mesmo com o repositório privado. Tudo o que vai para o GitHub fica guardado no histórico de commits: apagar o segredo num commit seguinte não tira ele dos commits anteriores. Se um segredo for parar no GitHub, considere que ele vazou e troque por um novo. É por isso que o Rails já deixa o `config/master.key` de fora dos commits.

#### Seus commits contam a história

Desde o capítulo 01, você guardou o progresso com commits e enviou para o GitHub. Foi isso que permitiu o Render buscar o app pronto. O histórico de commits é também a história do seu mural de recados, capítulo por capítulo.

</details>

<details class="passo" markdown="1">
<summary>Não existem perguntas bobas</summary>

<details class="pergunta" markdown="1">
<summary>Por que o app no ar começou sem os meus recados?</summary>

Porque cada lugar tem o seu banco de dados. O banco de dados do codespace é um arquivo que não vai para o GitHub, e o Render só recebe o que está no GitHub. Os recados de teste ficam no codespace, e o mural de recados no ar começa do zero, pronto para os recados de verdade.

</details>

<details class="pergunta" markdown="1">
<summary>O meu mural de recados vai ficar no ar para sempre?</summary>

No plano gratuito do Render, o banco de dados dura 30 dias: depois disso, ele é apagado, e o mural de recados no ar perde os recados. O app continua no ar, mas sem banco de dados ele para de funcionar. Para manter por mais tempo, dá para pagar um plano do Render ou usar outro serviço. Se não for manter, apague o app e o banco de dados no Render quando não precisar mais deles: o capítulo 09 mostra como. O código continua seguro no seu GitHub.

</details>

<details class="pergunta" markdown="1">
<summary>Qualquer pessoa pode apagar os recados do meu mural?</summary>

Qualquer pessoa que tenha a palavra-chave, sim. A palavra-chave segura os robôs e quem achar o link por acaso, mas todo mundo usa a mesma, então o app não sabe quem é quem. Foi a decisão que a gente tomou lá no [planejamento]({{ site.baseurl }}{% link projetos/mural-de-recados/00-planejando-o-mural.md %}): para um mural de recados do workshop, aceitar esse risco é razoável. Num app de verdade, aberto para qualquer pessoa, valeria ter contas e regras de quem pode fazer o quê. Isso fica para um próximo projeto.

</details>

<details class="pergunta" markdown="1">
<summary>Por que o Render, e não outro serviço? <span class="label label-purple">Para ir além</span></summary>

O Render tem um plano gratuito que funciona com apps Rails sem precisar configurar um servidor, e que não pede cartão de crédito para criar a conta, o app e o banco de dados. Existem muitos outros serviços para colocar apps no ar, cada um com as suas vantagens, e o próprio Rails traz uma ferramenta para isso, o [Kamal](https://kamal-deploy.org/), que coloca o app no ar num servidor seu (veja também [Deploying to Production](https://guides.rubyonrails.org/getting_started.html#deploying-to-production), no guia oficial do Rails, em inglês). O que você aprendeu aqui vale para quase todos: o código vem do GitHub, os segredos ficam em variáveis de ambiente, e o banco de dados de produção é separado do de desenvolvimento.

</details>

<details class="pergunta" markdown="1">
<summary>Dá para usar um endereço meu, como <code>mural.meusite.com.br</code>? <span class="label label-purple">Para ir além</span></summary>

Dá. Esse endereço próprio se chama **domínio personalizado** (*custom domain*). O caminho é este:

1. **Ter um domínio.** Ele é comprado num serviço de registro de domínios. Os terminados em `.br`, por exemplo, são registrados no [Registro.br](https://registro.br). O registro é pago por ano.
2. **Avisar o Render.** Na página do app, em **Settings**, procure **Custom Domains** e acrescente o endereço, por exemplo `mural.meusite.com.br`.
3. **Apontar o domínio para o Render.** No serviço onde o domínio foi registrado, crie o registro de **DNS** que o Render mostrar (em geral, um `CNAME` apontando para o endereço `.onrender.com` do app). O DNS é a "lista telefônica" da internet: ele diz para qual computador cada endereço leva.
4. **Verificar.** De volta ao Render, clique em **Verify**. A mudança no DNS pode levar de alguns minutos a algumas horas para valer.

Funciona no plano gratuito do Render: o único custo é o registro do domínio. O Render também cuida sozinho do **HTTPS** (o cadeado do navegador) para o seu domínio. Veja os detalhes em [Custom Domains](https://render.com/docs/custom-domains), na documentação do Render, em inglês.

</details>

</details>

<details class="passo" markdown="1">
<summary>Preciso de IA para este capítulo?</summary>

Não. Os passos são cliques no Render e duas mudanças pequenas no código.

Onde uma IA pode ajudar: entender uma mensagem de erro do deploy. Copie as últimas linhas das mensagens e peça uma explicação, como em [Usando IA como tutora]({{ site.baseurl }}{% link comece-aqui/ia-como-tutora.md %}).

{: .atencao }
Nunca cole numa IA, nem em nenhum outro lugar, o `DATABASE_URL` nem o conteúdo do `config/master.key`. Antes de colar uma mensagem de erro, confira se ela não tem nenhum desses dois.

</details>

<details class="passo" markdown="1">
<summary>Não esqueça</summary>

- O mesmo app roda em dois lugares: no codespace, para programar (desenvolvimento), e no Render, para as pessoas usarem (produção).
- Cada lugar tem o seu banco de dados.
- Deploy é levar o código para onde o app roda. No Render, cada **Sync Changes** vira um deploy.
- Segredos, como senhas e chaves, ficam em variáveis de ambiente, e não no código.

</details>

<details class="passo" markdown="1">
<summary>Quiz</summary>

1. Você mudou a cor do botão no codespace, mas o mural de recados no ar continua igual. O que faltou?
2. Por que o app no Render usa PostgreSQL, e não o arquivo do SQLite?
3. Onde fica o `RAILS_MASTER_KEY` do app no ar: no código, no GitHub ou no Render?

<details markdown="1">
<summary>Ver respostas</summary>

1. Fazer um commit e clicar em **Sync Changes**: o Render só atualiza com o que chega no GitHub.
2. Porque, no Render, os arquivos que o app cria são apagados quando ele reinicia. O PostgreSQL roda separado e não perde os recados.
3. No Render, como variável de ambiente.

</details>

</details>

<details class="passo" markdown="1">
<summary>Para saber mais</summary>

Em inglês:

- [Deploying Rails on Render](https://render.com/docs/deploy-rails-8): o guia do Render para apps Rails.
- [Build command](https://render.com/docs/deploys#build-command): o que é a receita de preparação que o Render roda a cada deploy.
- [Free instances](https://render.com/docs/free): o que o plano gratuito do Render oferece e os seus limites.

</details>

## E agora?

Você construiu um app do zero e colocou no ar. 🎉 Para fechar o dia: [Terminei! E agora?]({{ site.baseurl }}{% link projetos/mural-de-recados/09-terminei-e-agora/index.md %})
