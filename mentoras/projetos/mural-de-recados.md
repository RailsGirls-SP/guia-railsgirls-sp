---
title: Notas do Mural de recados
parent: Notas dos projetos
grand_parent: Mentoras
nav_order: 1
---

# Notas do Mural de recados

- TODO: como usar as tags `passo-NN` do repositório do app
- TODO: como conduzir o "Pense antes de programar": dar tempo, perguntar em vez de responder, só abrir "o nosso plano" depois

## Sem testes automatizados por enquanto

Neste primeiro projeto, não incentive as participantes a escrever testes automatizados. Testes são importantes, mas aqui o foco é outro: entender o caminho de um pedido, planejar antes de programar e chegar num app que funciona dentro do dia. Escrever testes ao mesmo tempo dobra o que elas precisam aprender de uma vez.

- O `rails new` cria uma pasta `test` com arquivos de exemplo. Se alguém perguntar, explique em uma frase: são programas que conferem sozinhos se o app funciona; a gente vai deixar para depois.
- Neste projeto, a conferência é manual: as seções **Confira** e **Quebre de propósito** de cada capítulo.
- Se uma participante já tiver experiência e terminar antes, testes podem virar um desafio extra.

## 00. Planejando o mural

[Ver capítulo]({{ site.baseurl }}{% link projetos/mural-de-recados/00-planejando-o-mural.md %})

- TODO: perguntas para fazer durante o "Pense antes"
- TODO: confusões comuns neste capítulo

### Foco no MVP

O ponto mais importante deste capítulo é o trecho do "nosso plano" que diz que alguns problemas a gente resolve e outros a gente **aceita por enquanto** (o exemplo é alguém apagar o recado de outra pessoa). Reforce essa ideia: o objetivo do plano não é prever todos os detalhes do projeto inteiro, é chegar no skate, a menor versão que já funciona (veja [Como os projetos crescem]({{ site.baseurl }}{% link projetos/index.md %}#como-os-projetos-crescem)).

É comum que, ao planejar, apareçam ideias como login, curtidas, respostas aos recados, fotos ou emojis. São ótimas ideias: valorize, mas não deixe o plano crescer com elas.

- **A pergunta-chave:** "o mural funciona sem isso?". Se funciona, fica para depois.
- **Anote numa lista de "depois",** no próprio papel. Ninguém precisa abrir mão da ideia, só da ordem. Muitas viram desafios extras.
- **Respeite o tempo** de 10 a 15 minutos do "Pense antes". Um plano simples e terminado vale mais do que um plano completo pela metade.
- **Aceitar um risco é uma decisão, não um descuido.** Se alguém insistir em resolver tudo, use o exemplo do recado apagado: resolver exigiria contas, senhas e recados com dona, quase um projeto inteiro, para um mural de uma sala onde todo mundo se conhece.

### Dívida técnica

No "nosso plano", a gente decide aceitar por enquanto que qualquer pessoa apague o recado de outra. Se a conversa chegar nisso, é um bom momento para apresentar o termo **dívida técnica**: um atalho que a gente toma agora, sabendo que vai custar mais caro depois.

**Use "dívida técnica", não "débito técnico".** O termo original, em inglês, é *technical debt*, e *debt* quer dizer dívida. A metáfora, criada por Ward Cunningham, é a de um empréstimo: você ganha tempo agora (pega o dinheiro emprestado), paga juros enquanto não resolve (cada mudança fica mais trabalhosa por causa do atalho) e um dia quita a dívida (refaz do jeito certo). "Débito" é outra coisa: em português, é um lançamento contábil ou uma cobrança na conta, como no cartão de débito. "Débito técnico" é uma tradução apressada que perde a ideia do empréstimo e dos juros.

**Nem tudo que fica para depois é dívida técnica.** Deixar uma funcionalidade de fora é uma decisão de escopo. Vira dívida quando a decisão de agora encarece a mudança futura. No mural, as duas coisas aparecem juntas: hoje os recados não têm dona; quando o login chegar, além de criar as contas, vai ser preciso decidir o que fazer com todos os recados antigos, que não têm dona. Esse trabalho extra são os juros.

**Dívida técnica não é sinônimo de erro.** Quando é consciente e bem pensada, como aqui, é uma ferramenta legítima: Martin Fowler chama de dívida "deliberada e prudente". O problema é a dívida que ninguém percebeu que fez, ou que nunca é paga.

Referências (em inglês):

- [Technical Debt](https://martinfowler.com/bliki/TechnicalDebt.html), de Martin Fowler.
- [Technical Debt Quadrant](https://martinfowler.com/bliki/TechnicalDebtQuadrant.html), de Martin Fowler: dívida deliberada ou acidental, prudente ou imprudente.
- [The WyCash Portfolio Management System](http://c2.com/doc/oopsla92.html), de Ward Cunningham (1992): onde a metáfora apareceu pela primeira vez.

## 01. Por onde começar?

[Ver capítulo]({{ site.baseurl }}{% link projetos/mural-de-recados/01-por-onde-comecar/index.md %}) · Código de referência: tag `passo-01`.

- TODO: perguntas para fazer durante o "Pense antes"
- TODO: confusões comuns neste capítulo

### Quem responde ao pedido: o Puma ou o Rails?

O capítulo simplifica e diz que "o servidor" atende os pedidos. Se alguém perguntar quem responde, são dois programas trabalhando juntos:

- **O Puma** é o servidor que liga quando você roda `bin/rails server`. Ele vem instalado em todo app Rails novo, mas é um programa separado. Ele recebe o pedido do navegador e devolve a página pronta, sem saber nada sobre recados.
- **O Rails, junto com o código do app,** decide o que responder: olha o endereço pedido, escolhe qual parte do código cuida daquilo (rota → controller), busca os recados no banco e monta a página (view).

Na analogia do restaurante usada no capítulo:

| No restaurante | No app |
|---|---|
| A atendente, que leva o pedido e traz o prato | O navegador |
| O balcão, que recebe o pedido e entrega o prato | O Puma |
| A cozinha equipada | O Rails |
| A receita | O código do app |
| A cozinheira, que segue a receita | O Ruby |

Só aprofunde se a pergunta aparecer. Para quem está começando, "o servidor recebe o pedido e devolve a página" é suficiente neste capítulo.

### O primeiro commit com "Stage All Changes"

No passo 6, o capítulo usa **Stage All Changes**, que coloca todos os arquivos alterados no commit de uma vez. É o jeito mais simples para começar, mas nem sempre é o ideal: num projeto real, às vezes vale escolher só alguns arquivos para cada commit. Se o grupo tiver curiosidade, é um bom assunto para conversar.

### O ❌ vermelho e os pull requests automáticos

Depois do Sync Changes (passos 6 e 7), a página do repositório no GitHub pode mostrar três coisas que a participante não fez:

- **Um ❌ vermelho ao lado do commit.** O `rails new` cria o arquivo `.github/workflows/ci.yml`, e a cada push o **GitHub Actions** roda verificações automáticas (testes, análise de segurança e estilo do código). O ❌ quer dizer que alguma delas falhou. Não é erro da participante e não impede o app de funcionar.
- **"Pull requests" com um número e várias branches.** O `rails new` também cria `.github/dependabot.yml`. O **Dependabot**, um robô do GitHub, confere se saíram versões novas das bibliotecas do app e, para cada uma, cria uma branch e abre um pull request propondo a atualização. Nada muda no app se ninguém clicar em **Merge**.

Como explicar: são ferramentas que projetos reais usam para manter a qualidade e as bibliotecas em dia, e o Rails já deixa tudo preparado. Neste projeto, a gente não vai usar nenhuma delas (veja [Sem testes automatizados por enquanto](#sem-testes-automatizados-por-enquanto)). A participante pode ignorar ou fechar os pull requests na aba **Pull requests**.

Se a organização preferir que nada disso apareça, o `rails new . --skip-ci` não cria esses dois arquivos.

### O botão "Make Public" da porta 3000

No passo 5, o aviso da porta 3000 mostra dois botões: **Open in Browser** e **Make Public**. Só o primeiro é necessário. Se alguém perguntar sobre o segundo:

- **O codespace em si nunca fica público.** Editor, arquivos e terminal são sempre só da dona da conta.
- **O que fica público é o endereço do app** (`…-3000.app.github.dev`). Com a porta pública, qualquer pessoa com o link abre o app, sem login. Com a porta privada, que é o padrão, só a dona da conta abre.
- **O app roda em modo de desenvolvimento,** que não foi feito para ficar exposto: as páginas de erro mostram detalhes do código, e qualquer pessoa com o link pode postar, editar e apagar recados.
- **Só funciona com o codespace ligado,** então não serve para colocar o app no ar. Para isso, existe o capítulo 08.
- **Quem abre o app gasta a cota do Codespaces** de quem é dona do codespace.

Oriente a deixar a porta **privada**. Se uma participante quiser mostrar o mural para alguém na sala, pode deixar pública por alguns minutos e voltar para privada depois: na aba **Ports**, clique com o botão direito na porta 3000 e escolha **Port Visibility** → **Private**.

### Erro "Blocked hosts"

Em modo de desenvolvimento, o Rails só aceita pedidos de endereços conhecidos, e o endereço do codespace (`*.app.github.dev`) não está na lista. Para liberar, abra `config/environments/development.rb` e acrescente, antes do último `end`:

```ruby
config.hosts << ".app.github.dev"
```

Na Imersão 2025, a gente usou uma expressão regular, que tem o mesmo efeito:

```ruby
config.hosts << /.*\.app\.github\.dev/
```

Depois, desligue o servidor (Ctrl+C) e ligue de novo com `bin/rails server`.

TODO: se o repositório-modelo já liberar esse endereço (por exemplo, com a variável de ambiente `RAILS_DEVELOPMENT_HOSTS`), este erro não deve aparecer. Confirmar ao testar o modelo.

## 02. Onde os recados ficam guardados?

[Ver capítulo]({{ site.baseurl }}{% link projetos/mural-de-recados/02-onde-os-recados-ficam-guardados.md %}) · Código de referência: tag `passo-02`.

- TODO: perguntas para fazer durante o "Pense antes"
- TODO: confusões comuns neste capítulo

## 03. Como ver todos os recados?

[Ver capítulo]({{ site.baseurl }}{% link projetos/mural-de-recados/03-ver-todos-os-recados.md %}) · Código de referência: tag `passo-03`.

- TODO: perguntas para fazer durante o "Pense antes"
- TODO: confusões comuns neste capítulo

## 04. Como postar um recado?

[Ver capítulo]({{ site.baseurl }}{% link projetos/mural-de-recados/04-postar-um-recado.md %}) · Código de referência: tag `passo-04`.

- TODO: perguntas para fazer durante o "Pense antes"
- TODO: confusões comuns neste capítulo

### Erro ao enviar o formulário no Codespaces

No Codespaces, o navegador acessa o app por um endereço `https://…app.github.dev`, mas o Rails recebe o pedido como se viesse de outro endereço. Ao enviar um formulário, a proteção contra envio de formulários de outros sites pode bloquear o pedido, com um erro como `ActionController::InvalidAuthenticityToken` ou "HTTP Origin header didn't match request.base_url".

Na Imersão 2025, a solução foi acrescentar esta linha em `config/environments/development.rb`, antes do último `end`:

```ruby
config.action_controller.forgery_protection_origin_check = false
```

Ela desliga só a conferência do endereço de origem, e só em desenvolvimento. Depois, desligue o servidor (Ctrl+C) e ligue de novo.

TODO: decidir se essa linha entra num passo do capítulo 01 ou 04, para ninguém esbarrar no erro, e confirmar se ainda é necessária com a versão atual do Rails e do Codespaces.

## 05. Errei! Como corrigir ou apagar?

[Ver capítulo]({{ site.baseurl }}{% link projetos/mural-de-recados/05-corrigir-ou-apagar.md %}) · Código de referência: tag `passo-05`.

- TODO: perguntas para fazer durante o "Pense antes"
- TODO: confusões comuns neste capítulo

## 06. Como fazer um mural que dá vontade de usar?

[Ver capítulo]({{ site.baseurl }}{% link projetos/mural-de-recados/06-um-mural-que-da-vontade-de-usar.md %}) · Código de referência: tag `passo-06`.

- TODO: perguntas para fazer durante o "Pense antes"
- TODO: confusões comuns neste capítulo

## 07. E se alguém mandar um recado vazio?

[Ver capítulo]({{ site.baseurl }}{% link projetos/mural-de-recados/07-e-se-o-recado-vier-vazio.md %}) · Código de referência: tag `passo-07`.

- TODO: perguntas para fazer durante o "Pense antes"
- TODO: confusões comuns neste capítulo

## 08. Como mostrar o mural para o mundo?

[Ver capítulo]({{ site.baseurl }}{% link projetos/mural-de-recados/08-como-mostrar-o-mural-para-o-mundo.md %}) · Código de referência: tag `passo-08`.

- TODO: perguntas para fazer durante o "Pense antes"
- TODO: confusões comuns neste capítulo

## Desafios extras

[Ver capítulo]({{ site.baseurl }}{% link projetos/mural-de-recados/desafios-extras.md %})

- TODO: perguntas para fazer durante o "Pense antes"
- TODO: confusões comuns neste capítulo
