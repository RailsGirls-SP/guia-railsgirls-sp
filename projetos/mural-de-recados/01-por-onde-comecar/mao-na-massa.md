---
title: Mão na massa
parent: "01. Por onde começar?"
grand_parent: Mural de recados
nav_order: 1
---

# Mão na massa

Você vai precisar de uma conta no GitHub. Se ainda não tem, veja [Criando uma conta no GitHub]({{ site.baseurl }}{% link comece-aqui/conta-no-github.md %}).

Travou em algum passo? Veja [Travou?](#travou), no fim da página.

<details class="passo" markdown="1" open>
<summary>1. Crie o seu repositório</summary>

Um **repositório** é uma pasta no GitHub que guarda todos os arquivos de um projeto. O Rails Girls SP preparou um modelo de repositório que deixa o seu codespace pronto, com o Ruby e o Rails instalados. Ele ainda não tem o app: você vai criar o app no passo 4.

1. Abra o modelo: [github.com/RailsGirls-SP/codespaces-rails](https://github.com/RailsGirls-SP/codespaces-rails).
2. Clique no botão **Use this template** e depois em **Create a new repository**.
3. Em **Repository name**, escreva `mural-de-recados`.
4. Em **Choose visibility**, escolha **Public**. Assim, a equipe de mentoria consegue ver o seu código pelo link, e o seu app fica no seu perfil do GitHub. Você pode mudar isso depois, se quiser.
5. Clique em **Create repository**.

![Formulário Create a new repository com o modelo RailsGirls-SP/codespaces-rails selecionado, o nome mural-de-recados em Repository name, Public em Choose visibility e o botão Create repository]({{ '/assets/images/mural-de-recados/01/criar-repositorio-template.png' | relative_url }})

{: .atencao }
Repositórios públicos podem ser vistos por qualquer pessoa: nunca coloque senhas ou dados pessoais nos arquivos do projeto.

**Confira:** você está na página do seu repositório, com o seu nome de usuária antes de `/mural-de-recados`.

Terminou? Abra o passo **2. Abra o seu codespace**

</details>

<details class="passo" markdown="1">
<summary>2. Abra o seu codespace</summary>

Um **codespace** é um computador na nuvem, ligado ao seu repositório. Você usa pelo navegador.

1. Na página do repositório, clique no botão verde **Code**.
2. Escolha a aba **Codespaces**.
3. Clique em **Create codespace on main**.

![Página do repositório mural-de-recados com o menu do botão Code aberto: 1 marca o botão Code, 2 marca a aba Codespaces e 3 marca o botão Create codespace on main]({{ '/assets/images/mural-de-recados/01/criar-codespace.png' | relative_url }})

**Dê um palpite:** o que você acha que vai abrir?

Na primeira vez, o codespace leva alguns minutos para ficar pronto: ele está instalando o Rails para você. Enquanto isso, aparece o aviso **Building codespace…** no canto inferior direito.

![Codespace abrindo no navegador, com o terminal ainda vazio e o aviso Setting up remote connection: Building codespace no canto inferior direito]({{ '/assets/images/mural-de-recados/01/codespace-carregando.png' | relative_url }})

Pode aparecer a pergunta **Do you trust the authors of the files in this folder?** (Você confia em quem criou os arquivos desta pasta?). Os arquivos vieram do modelo do Rails Girls SP, então clique em **Trust Folder & Continue**.

![Janela Do you trust the authors of the files in this folder? com os botões Manage, Cancel e Trust Folder & Continue, este último destacado]({{ '/assets/images/mural-de-recados/01/codespace-confiar.png' | relative_url }})

Quando o codespace terminar de carregar, o [terminal]({{ site.baseurl }}{% link comece-aqui/glossario.md %}#terminal) mostra uma mensagem de boas-vindas e fica pronto para receber comandos.

**Confira:** a tela tem três áreas.

- À esquerda, o **Explorer**: a lista de arquivos do projeto.
- No meio, o **editor**: onde os arquivos abrem quando você clica neles.
- Embaixo, o **terminal**: onde você digita comandos. Se ele não aparecer, abra pelo menu ☰ → **Terminal** → **New Terminal**. Veja mais sobre o terminal em [Terminal básico]({{ site.baseurl }}{% link comece-aqui/terminal-basico.md %}).

![Codespace pronto: Explorer à esquerda com .devcontainer, LICENSE e README.md, o README do modelo aberto no meio, o terminal com a mensagem Welcome to Codespaces embaixo e o painel de chat à direita]({{ '/assets/images/mural-de-recados/01/codespace-aberto.png' | relative_url }})

À direita, pode aparecer um painel de chat com IA. Você pode fechar esse painel clicando no **X**.

Terminou? Abra o passo **3. Confira as ferramentas**

</details>

<details class="passo" markdown="1">
<summary>3. Confira as ferramentas</summary>

No terminal, digite:

```
ruby -v
```

E depois:

```
rails -v
```

**Confira:** o resultado de cada comando aparece logo abaixo dele. O primeiro mostra a versão do Ruby, e o segundo, a versão do Rails. Se aparecerem números de versão, as ferramentas estão prontas.

![Codespace com a área do terminal destacada, mostrando os comandos ruby -v e rails -v e os resultados ruby 4.0.6 e Rails 8.1.4]({{ '/assets/images/mural-de-recados/01/terminal-versoes.png' | relative_url }})

Terminou? Abra o passo **4. Crie o app**

</details>

<details class="passo" markdown="1">
<summary>4. Crie o app</summary>

**Dê um palpite:** o comando se chama `rails new`. O que você acha que ele vai criar?

No terminal, digite (o ponto no final faz parte do comando):

```
rails new .
```

O comando leva um ou dois minutos. Ele cria os arquivos e depois baixa as bibliotecas que o Rails usa.

Logo no começo, o Rails vai perguntar se pode sobrescrever o arquivo `README.md`, que veio do modelo. Digite **Y** (de *yes*, sim) e aperte **Enter** para confirmar: o README do modelo é trocado pelo README do seu app.

![Terminal depois do comando rails new, mostrando conflict README.md e a pergunta Overwrite README.md com as opções Ynaqdhm, esperando a resposta]({{ '/assets/images/mural-de-recados/01/rails-new-conflito-readme.png' | relative_url }})

**Confira:** o terminal mostrou uma lista enorme de linhas começando com `create`, e o Explorer agora tem várias pastas novas, como `app`, `config` e `db`. Era o que você esperava?

![Codespace depois do rails new: o Explorer mostra as pastas e arquivos novos, como app, bin, config, db e Gemfile, e o terminal mostra as linhas do comando terminando com create e force]({{ '/assets/images/mural-de-recados/01/rails-new-arquivos.png' | relative_url }})

Terminou? Abra o passo **5. Ligue o servidor**

</details>

<details class="passo" markdown="1">
<summary>5. Ligue o servidor</summary>

No terminal, digite:

```
bin/rails server
```

**Dê um palpite:** o que vai acontecer com o terminal depois desse comando?

**Confira:**

- O terminal mostra algumas mensagens e fica parado, sem voltar para o lugar de digitar. Isso é normal: o servidor está ligado, esperando visitas.
- No canto da tela, aparece um aviso dizendo que a aplicação está rodando na porta 3000. Clique em **Open in Browser**.

![Terminal com as mensagens do servidor depois do comando bin/rails server: as linhas Listening on e Use Ctrl-C to stop estão destacadas como Servidor ligado, e o botão Open in Browser, no aviso do canto inferior direito, também está destacado]({{ '/assets/images/mural-de-recados/01/rails-server.png' | relative_url }})

- Abre uma aba nova com a página de boas-vindas do Rails. 🎉

![Página de boas-vindas do Rails aberta num endereço terminado em app.github.dev: o logo do Rails num círculo vermelho e, embaixo, Rails version 8.1.4 e Ruby version 4.0.6]({{ '/assets/images/mural-de-recados/01/pagina-boas-vindas-rails.png' | relative_url }})

Essa é a primeira página do seu app Mural de recados. Ainda não tem nenhum recado, mas o app já existe!

Terminou? Abra o passo **6. Guarde o seu progresso**

</details>

<details class="passo" markdown="1">
<summary>6. Guarde o seu progresso</summary>

Os arquivos do app estão no codespace, mas ainda não foram guardados no seu repositório no GitHub. Para guardar, você vai fazer um **commit**: um registro de como o projeto está agora, com uma mensagem dizendo o que mudou. Veja mais em [Git básico]({{ site.baseurl }}{% link comece-aqui/git-basico.md %}).

1. Na barra da esquerda, clique no ícone de **Source Control** (o terceiro, com bolinhas ligadas por linhas). O número em cima dele mostra quantos arquivos mudaram.
2. Ao lado de **Changes**, clique no **+** (**Stage All Changes**). Assim, todos os arquivos vão entrar no commit.

   ![Painel Source Control: 1 marca o ícone de Source Control na barra da esquerda, com o número 106, e 2 marca o botão + ao lado de Changes, com a dica Stage All Changes]({{ '/assets/images/mural-de-recados/01/commit-stage-all.png' | relative_url }})

3. Confira se a lista agora se chama **Staged Changes**. No campo de mensagem, escreva o que mudou, por exemplo `Cria o app Mural de recados`, e clique em **Commit**.

   ![Painel Source Control: 1 marca o campo de mensagem com o texto Cria o app Mural de recados e 2 marca o botão Commit; abaixo, a lista Staged Changes]({{ '/assets/images/mural-de-recados/01/commit-mensagem.png' | relative_url }})

   **Dê um palpite:** depois do commit, os arquivos já aparecem no seu repositório no GitHub?

4. Ainda não: o commit está guardado só no codespace. Para mandar para o GitHub, clique em **Sync Changes**.

   ![Painel Source Control com o botão Sync Changes destacado]({{ '/assets/images/mural-de-recados/01/commit-sync.png' | relative_url }})

5. Na janela que abrir, clique em **OK**.

   ![Janela This action will pull and push commits from and to origin/main, com o botão OK destacado]({{ '/assets/images/mural-de-recados/01/commit-sync-ok.png' | relative_url }})

**Confira:** em **Graph**, na parte de baixo do painel, o seu commit aparece com a etiqueta **main** e um ícone de nuvem ao lado: isso quer dizer que ele já está no GitHub.

![Seção Graph do painel Source Control com o commit Cria o app Mural de recados destacado, com a etiqueta main e o ícone de nuvem]({{ '/assets/images/mural-de-recados/01/commit-sincronizado.png' | relative_url }})

{: .atencao }
Um codespace parado por muito tempo é apagado pelo GitHub (o padrão é depois de 30 dias). O que não foi enviado com **Sync Changes** se perde junto. Por isso, termine sempre com o commit e o Sync.

Daqui pra frente, todo capítulo termina assim: com o app funcionando e um commit guardando o seu progresso.

Terminou? Abra o passo **7. Confira no GitHub**

</details>

<details class="passo" markdown="1">
<summary>7. Confira no GitHub</summary>

Agora o seu código não está só no codespace: ele também está guardado no seu repositório no GitHub.

**Dê um palpite:** o que vai aparecer na página do seu repositório?

1. Volte para a aba do navegador com a página do seu repositório (aquela do passo 1) ou abra `github.com/seu-nome-de-usuária/mural-de-recados`.
2. Recarregue a página.

**Confira:** as pastas e os arquivos do app aparecem na lista, e ao lado de quase todos está a mensagem do seu commit, **Cria o app Mural de recados**. Só a pasta `.devcontainer` e o `LICENSE` continuam com **Initial commit**: eles vieram do modelo.

![Página do repositório mural-de-recados no GitHub com a lista de pastas e arquivos do app destacada, quase todos com a mensagem Cria o app Mural de recados]({{ '/assets/images/mural-de-recados/01/commit-github.png' | relative_url }})

</details>

## Travou?

Abra o problema que aconteceu com você:

<details class="pergunta" markdown="1">
<summary>O terminal diz <code>rails: command not found</code></summary>

O codespace ainda está instalando o Rails. Espere o terminal parar de mostrar mensagens e tente de novo. Se o erro continuar, peça ajuda.

</details>

<details class="pergunta" markdown="1">
<summary>O aviso da porta 3000 não apareceu, ou você fechou sem querer</summary>

No painel de baixo, abra a aba **Ports** e procure a linha **App (3000)**. As outras portas da lista são do próprio editor e podem ser ignoradas. Passe o mouse sobre o endereço da coluna **Forwarded Address** e clique no ícone de globo que aparece, para abrir o app no navegador.

![Aba Ports com três portas: 1 marca a aba Ports e 2 marca a linha App (3000), com o endereço na coluna Forwarded Address]({{ '/assets/images/mural-de-recados/01/aba-ports.png' | relative_url }})

</details>

<details class="pergunta" markdown="1">
<summary>A página mostra o erro "Blocked hosts"</summary>

O Rails bloqueou o endereço do codespace. Peça ajuda para alguém da mentoria ou veja a solução nas [notas para a mentoria]({{ site.baseurl }}{% link mentoras/projetos/mural-de-recados/01-por-onde-comecar.md %}#erro-blocked-hosts).

</details>

<details class="pergunta" markdown="1">
<summary>O codespace desligou ou você fechou a aba</summary>

1. Abra a página do seu repositório no GitHub e clique no botão verde **Code**.
2. Escolha a aba **Codespaces**.
3. Clique no seu codespace. O GitHub dá a ele um nome aleatório, como *literate invention*.

![Página do repositório com o menu do botão Code aberto: 1 marca o botão Code, 2 marca a aba Codespaces e 3 marca o codespace literate invention, com o status Active]({{ '/assets/images/mural-de-recados/01/repositorio-codespace-ativo.png' | relative_url }})

Quando ele abrir, ligue o servidor de novo com `bin/rails server`.

Também dá para encontrar todos os seus codespaces em [github.com/codespaces](https://github.com/codespaces). Clique no seu codespace, na lista de baixo:

![Página Your codespaces do GitHub com o codespace literate invention, do repositório mural-de-recados, destacado na lista de baixo]({{ '/assets/images/mural-de-recados/01/github-codespaces-lista.png' | relative_url }})

Não clique em **New codespace** nem em **Use this template**: eles criam outro codespace, vazio, sem o seu app.

</details>

<details class="pergunta" markdown="1">
<summary>Fechou sem dar Sync das mudanças?</summary>

Calma: nada se perdeu. Os seus arquivos e o seu commit continuam guardados no codespace. Abra o codespace de novo (veja "O codespace desligou ou você fechou a aba") e, no painel **Source Control**, clique em **Sync Changes**. Se você ainda não tinha feito o commit, faça os passos do commit antes.

</details>

Mentoria: veja as [notas deste capítulo]({{ site.baseurl }}{% link mentoras/projetos/mural-de-recados/01-por-onde-comecar.md %}).

## Terminou?

Siga para [O que aconteceu?]({{ site.baseurl }}{% link projetos/mural-de-recados/01-por-onde-comecar/o-que-aconteceu.md %}) e entenda cada passo.
