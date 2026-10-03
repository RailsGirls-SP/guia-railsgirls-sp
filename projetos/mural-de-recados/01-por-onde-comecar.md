---
title: "Por onde começar?"
parent: Mural de recados
grand_parent: Projetos
nav_order: 2
---

# Por onde começar?

Tempo: uns 30 minutos.
{: .fs-5 }

## O desafio

Você já tem um plano para o mural, mas ele ainda está no papel. Como ele vira um site que você abre no navegador e usa de verdade?

Um site começa como **texto**: arquivos com instruções escritas numa linguagem de programação. É parecido com uma receita: sozinha, ela não faz nada; alguém precisa ler e seguir cada passo.

No app Mural de recados:

- O seu código é a **receita**.
- O **Ruby** é a **cozinheira**: entende a língua em que a receita está escrita e segue cada passo.
- O **Rails** é uma **cozinha já equipada**, com utensílios e preparos básicos prontos (feitos em Ruby também). Você não precisa fazer a massa do zero: pode se concentrar no que é especial no seu prato.

```mermaid
flowchart LR
  A["📄 A receita<br/>(o seu código)"] -->|usa| B["🧰 A cozinha equipada<br/>(Rails)"]
  A -->|seguida pela| C["👩‍🍳 A cozinheira<br/>(Ruby)"]
  B -->|usada pela| C
```

Mas um site não é um prato que se prepara uma vez só. Ele funciona mais como um restaurante: cada vez que alguém abre o app ou clica num botão, faz um **pedido**, e a página é preparada na hora. Acompanhe um pedido:

```mermaid
sequenceDiagram
  actor Voce as Você
  participant N as Navegador (a atendente)
  participant S as Servidor (o balcão)
  participant R as Rails (a cozinha)
  Voce->>N: clica no botão Postar recado
  N->>S: leva o pedido
  S->>R: passa o pedido para a cozinha
  R->>R: a cozinheira (Ruby) segue a receita e monta a página
  R-->>S: entrega a página pronta
  S-->>N: devolve a página
  N-->>Voce: mostra o mural com o recado novo
```

Este diagrama é uma versão simplificada. O servidor já vem junto com o Rails: quando você cria um app Rails, ele vem pronto para usar. E, nos próximos capítulos, você vai descobrir o que acontece dentro da cozinha.

Para o app Mural de recados conseguir atender esses pedidos, do que ele precisa?

## Pense antes de programar

Reserve uns 5 minutos. Não existe resposta errada.

- Olhe o diagrama: o que precisa existir para um pedido ser atendido? Faça uma lista.
- O navegador está no seu computador. E o resto, onde poderia ficar?

## Compare com o nosso plano

<details markdown="1">
<summary>Abrir o nosso plano</summary>

Para o app funcionar, a gente precisa de quatro coisas:

| O que precisa | Papel | Onde fica |
|---|---|---|
| Os arquivos com o código | Dizem o que o app deve fazer | Num **repositório** no GitHub |
| Um computador que entende Ruby | Lê e executa o código | No seu computador, no **GitHub Codespaces** ou em outro computador na internet |
| Um lugar para os dados | Guarda as informações do app, como os recados do nosso mural | Num **banco de dados** (aparece no próximo capítulo) |
| Um programa que cuida da conversa com o navegador | Recebe o que o navegador pede e devolve as páginas | No mesmo computador que roda o Ruby e o Rails: ele já vem pronto quando você cria o app |

Quando você abre um site na internet, o código dele não está no seu computador: está num computador em outro lugar, que manda as páginas para você. Com o app Mural de recados vai ser igual, só que o "outro lugar", por enquanto, é o seu codespace.

Tudo isso pode ficar no seu próprio computador: é só instalar o Ruby e o Rails. Neste guia, a gente usa o codespace, um computador emprestado na nuvem que já vem preparado, para você começar a programar sem gastar tempo com instalação.

</details>

## Mão na massa

Você vai precisar de uma conta no GitHub. Se ainda não tem, veja [Criando uma conta no GitHub]({{ site.baseurl }}{% link comece-aqui/conta-no-github.md %}).

### 1. Crie o seu repositório

Um **repositório** é uma pasta no GitHub que guarda todos os arquivos de um projeto. A Rails Girls SP preparou um modelo de repositório que deixa o seu codespace pronto, com o Ruby e o Rails instalados. Ele ainda não tem o app: você vai criar o app no passo 4.

1. Abra o modelo do app: TODO: link para o repositório-modelo da Rails Girls SP.
2. Clique no botão **Use this template** e depois em **Create a new repository**.
3. Em **Repository name**, escreva `mural-de-recados`.
4. Clique em **Create repository**.

**Confira:** você está na página do seu repositório, com o seu nome de usuária antes de `/mural-de-recados`.

### 2. Abra o seu codespace

Um **codespace** é um computador na nuvem, ligado ao seu repositório. Você usa pelo navegador.

1. Na página do repositório, clique no botão verde **Code**.
2. Escolha a aba **Codespaces** e clique em **Create codespace on main**.

![Página de um repositório no GitHub com o botão Code aberto, a aba Codespaces selecionada e o botão Create codespace on main destacado]({{ '/assets/images/mural-de-recados/01/criar-codespace.png' | relative_url }})

**Preveja:** o que você acha que vai abrir?

Na primeira vez, o codespace leva alguns minutos para ficar pronto: ele está instalando o Rails para você. Espere o terminal, na parte de baixo da tela, terminar de mostrar mensagens.

**Confira:** a tela tem três áreas.

- À esquerda, o **Explorer**: a lista de arquivos do projeto.
- No meio, o **editor**: onde os arquivos abrem quando você clica neles.
- Embaixo, o **terminal**: onde você digita comandos. Se ele não aparecer, abra pelo menu ☰ → **Terminal** → **New Terminal**. Veja mais sobre o terminal em [Terminal básico]({{ site.baseurl }}{% link comece-aqui/terminal-basico.md %}).

![Codespace aberto no navegador: Explorer à esquerda, área do editor no meio, terminal embaixo e um painel de chat à direita]({{ '/assets/images/mural-de-recados/01/codespace-aberto.png' | relative_url }})

À direita, pode aparecer um painel de chat com IA. Você pode fechar esse painel clicando no **X**.

### 3. Confira as ferramentas

No terminal, digite:

```
ruby -v
```

E depois:

```
rails -v
```

**Confira:** o primeiro comando mostra a versão do Ruby, e o segundo, a versão do Rails. Se aparecerem números de versão, as ferramentas estão prontas.

### 4. Crie o app

**Preveja:** você vai rodar um único comando. Quantos arquivos você acha que ele vai criar? Anote um número.

No terminal, digite (o ponto no final faz parte do comando):

```
rails new .
```

O comando leva um ou dois minutos. Ele cria os arquivos e depois baixa as bibliotecas que o Rails usa.

**Confira:** o terminal mostrou uma lista enorme de linhas começando com `create`, e o Explorer agora tem várias pastas novas, como `app`, `config` e `db`. Compare com o número que você anotou.

![Explorer com as pastas criadas pelo rails new, como app, bin, config e db, e o terminal mostrando as linhas do comando]({{ '/assets/images/mural-de-recados/01/rails-new-arquivos.png' | relative_url }})

### 5. Ligue o servidor

No terminal, digite:

```
bin/rails server
```

**Preveja:** o que vai acontecer com o terminal depois desse comando?

**Confira:**

- O terminal mostra algumas mensagens e fica parado, sem voltar para o lugar de digitar. Isso é normal: o servidor está ligado, esperando visitas.
- No canto da tela, aparece um aviso dizendo que a aplicação está rodando na porta 3000. Clique em **Open in Browser**.

![Terminal com as mensagens do servidor depois do comando, terminando em Listening on, e o aviso Your application running on port 3000 is available com o botão Open in Browser]({{ '/assets/images/mural-de-recados/01/rails-server.png' | relative_url }})

- Abre uma aba nova com a página de boas-vindas do Rails.

![Página de boas-vindas do Rails: o logo do Rails num círculo vermelho e, embaixo, as versões do Rails e do Ruby]({{ '/assets/images/mural-de-recados/01/pagina-boas-vindas-rails.png' | relative_url }})

Essa é a primeira página do seu app Mural de recados. Ainda não tem nenhum recado, mas o app já existe!

### 6. Guarde o seu progresso

Os arquivos do app estão no codespace, mas ainda não foram guardados no seu repositório no GitHub. Para guardar, você vai fazer um **commit**: um registro de como o projeto está agora, com uma mensagem dizendo o que mudou. Veja mais em [Git básico]({{ site.baseurl }}{% link comece-aqui/git-basico.md %}).

1. Na barra da esquerda, clique no ícone de **Source Control** (o terceiro, com bolinhas ligadas por linhas). O número em cima dele mostra quantos arquivos mudaram.
2. Clique com o botão direito em **Changes** e escolha **Stage All Changes**.

   ![Painel Source Control com o menu do botão direito aberto sobre Changes e a opção Stage All Changes destacada]({{ '/assets/images/mural-de-recados/01/commit-stage-all.png' | relative_url }})

3. Confira se a lista agora se chama **Staged Changes**. No campo de mensagem, escreva o que mudou, por exemplo `Cria o app Mural de recados`, e clique em **Commit**.

   ![Painel Source Control com a lista Staged Changes, uma mensagem escrita no campo de cima e o botão Commit]({{ '/assets/images/mural-de-recados/01/commit-mensagem.png' | relative_url }})

   **Preveja:** depois do commit, os arquivos já aparecem no seu repositório no GitHub?

4. Ainda não: o commit está guardado só no codespace. Para mandar para o GitHub, clique em **Sync Changes**.

   ![Painel Source Control com o botão Sync Changes destacado]({{ '/assets/images/mural-de-recados/01/commit-sync.png' | relative_url }})

5. Na janela que abrir, clique em **OK**.

   ![Janela de confirmação dizendo que a ação vai enviar e receber commits, com o botão OK]({{ '/assets/images/mural-de-recados/01/commit-sync-ok.png' | relative_url }})

**Confira:** abra a página do seu repositório no GitHub e recarregue. As pastas do app aparecem lá, com a sua mensagem de commit.

![Página do repositório no GitHub mostrando as pastas do app, como app, bin, config e db, todas com a mensagem do commit]({{ '/assets/images/mural-de-recados/01/commit-github.png' | relative_url }})

Daqui pra frente, todo capítulo termina assim: com o app funcionando e um commit guardando o seu progresso.

## Entenda

### O que o `rails new` fez

O **Rails** é um **framework**: um conjunto de ferramentas que já resolve o que quase todo site precisa, para você se concentrar no que é só do seu projeto. O `rails new` montou a estrutura inteira de um site em segundos.

Das muitas pastas criadas, três importam agora:

- **`app`**: o código do app. É aqui que você vai trabalhar na maior parte do tempo.
- **`config`**: as configurações, como o endereço de cada página.
- **`db`**: tudo sobre o banco de dados, onde os recados vão ficar guardados.

O resto existe, funciona e pode ficar quieto por enquanto.

### O que é o servidor

O **servidor** é um programa que fica esperando o navegador pedir uma página e responde com ela. Enquanto ele está ligado, o terminal fica ocupado com ele. Se o servidor desligar, ninguém consegue abrir o app.

O endereço da aba que abriu termina em `app.github.dev`: é o endereço do seu app dentro do codespace. Por enquanto, só você consegue abrir.

### Você está aqui

```mermaid
flowchart LR
  Navegador --> Rota --> Controller
  Controller <--> Model
  Model <--> Banco[(Banco de dados)]
  Controller --> View --> Navegador
```

Todas as peças desse caminho já existem no seu app, mas ainda estão vazias. Nos próximos capítulos, você vai preencher uma por uma. Veja o que cada palavra quer dizer no [glossário]({{ site.baseurl }}{% link comece-aqui/glossario.md %}).

### Para saber mais

Vídeos do Rails Girls São Paulo 2025:

- [Introdução a Ruby](https://www.youtube.com/watch?v=hkSSRm8SQDU), com Isadora Silva.
- [Introdução a Ruby on Rails](https://www.youtube.com/watch?v=6vSvbInY0Bc), com Beatriz Mitre.

### Não existem perguntas bobas

**Preciso deixar o terminal do servidor aberto?**
Sim, enquanto quiser ver o app. Para digitar outros comandos, abra um terminal novo pelo botão **+** do terminal.

**O codespace fica ligado para sempre?**
Não. Ele desliga sozinho depois de um tempo sem uso, mas os seus arquivos ficam guardados. Para voltar, abra [github.com/codespaces](https://github.com/codespaces), clique no seu codespace e ligue o servidor de novo.

**Os arquivos estão no meu computador?**
Quando você usa o codespace, não: eles ficam na nuvem. Por isso você pode continuar de outro computador, é só entrar na sua conta do GitHub.

## Quebre de propósito

1. Clique no terminal onde o servidor está rodando e aperte **Ctrl+C**. O servidor desliga e o terminal volta para o lugar de digitar.
2. Volte para a aba do app e recarregue a página.

**Preveja:** o que vai aparecer?

Em vez da página do Rails, aparece uma página de erro: não tem ninguém do outro lado para responder. Ligue o servidor de novo com `bin/rails server`, recarregue a aba e tudo volta.

## E se fosse com IA?

<details markdown="1">
<summary>Abrir</summary>

O `rails new` também gera código: dezenas de arquivos com um único comando. Mas ele é **previsível**: o mesmo comando sempre gera os mesmos arquivos, do jeito que o Rails recomenda.

Uma IA também gera código, só que cada resposta pode vir diferente, e você precisa conferir tudo o que ela fez.

Saber o que as ferramentas do Rails já fazem sozinhas evita pedir para a IA uma coisa que um comando resolve, mais rápido e sem surpresas.

</details>

## Não esqueça

- Um site precisa de arquivos com código, um computador que rode esse código e um servidor que entregue as páginas.
- O **repositório** guarda os arquivos; o **codespace** é o computador na nuvem onde você trabalha.
- `rails new` cria a estrutura inteira do app; por enquanto, importam as pastas `app`, `config` e `db`.
- O app só abre enquanto o servidor estiver ligado.
- Um **commit** guarda como o projeto está agora; o **Sync Changes** manda esse registro para o GitHub.

## Teste-se

1. O que acontece com o app se você desligar o servidor?
2. Em qual pasta vai ficar a maior parte do código do app?
3. Qual a diferença entre o repositório e o codespace?

<details markdown="1">
<summary>Ver respostas</summary>

1. Ele para de abrir: o navegador mostra um erro, porque não tem ninguém para responder. Basta ligar o servidor de novo com `bin/rails server`.
2. Na pasta `app`.
3. O repositório é onde os arquivos ficam guardados, no GitHub. O codespace é o computador na nuvem onde você abre esses arquivos, roda comandos e liga o servidor.

</details>

## Travou?

**O terminal diz `rails: command not found`.**
O codespace ainda está instalando o Rails. Espere o terminal parar de mostrar mensagens e tente de novo. Se o erro continuar, peça ajuda.

**O aviso da porta 3000 não apareceu, ou você fechou sem querer.**
No painel de baixo, abra a aba **Ports**, encontre a porta 3000 e clique no ícone de globo, na coluna **Forwarded Address**, para abrir no navegador.

![Aba Ports com a porta 3000 e o ícone de globo destacado na coluna Forwarded Address]({{ '/assets/images/mural-de-recados/01/aba-ports.png' | relative_url }})

**O `rails new .` perguntou se pode sobrescrever o `README.md`.**
Isso acontece quando o repositório já tem um arquivo `README.md`. Aperte **Enter**: o Rails troca o arquivo pelo dele e continua.

![Terminal mostrando conflict README.md e a pergunta Overwrite README.md com as opções Ynaqdhm]({{ '/assets/images/mural-de-recados/01/rails-new-conflito-readme.png' | relative_url }})

**A página mostra o erro "Blocked hosts".**
O Rails bloqueou o endereço do codespace. Peça ajuda a uma mentora ou veja a solução nas notas das mentoras.

**O codespace desligou ou você fechou a aba.**
Abra [github.com/codespaces](https://github.com/codespaces) e clique no seu codespace. Quando ele abrir, ligue o servidor de novo com `bin/rails server`.

![Página Your codespaces do GitHub com um codespace na lista]({{ '/assets/images/mural-de-recados/01/github-codespaces-lista.png' | relative_url }})

O codespace também aparece na página do repositório, no botão **Code**, aba **Codespaces**:

![Botão Code aberto na aba Codespaces, com um codespace ativo destacado]({{ '/assets/images/mural-de-recados/01/repositorio-codespace-ativo.png' | relative_url }})

<details markdown="1">
<summary>Código completo deste passo</summary>

Neste capítulo, todo o código foi criado pelo `rails new`. Não tem nada para copiar.

</details>

Mentoras: código de referência na tag `passo-01` do repositório do app.
