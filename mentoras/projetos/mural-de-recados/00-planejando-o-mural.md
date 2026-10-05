---
title: "00. Planejando o app"
parent: Notas do Mural de recados
grand_parent: Notas dos projetos
nav_order: 1
---

# 00. Planejando o app

[Ver capítulo]({{ site.baseurl }}{% link projetos/mural-de-recados/00-planejando-o-mural.md %})

## Perguntas para o "Pense antes"

- "Você chega no mural de recados pela primeira vez. O que você vê? Onde clica?" Ajuda a desenhar as telas a partir de quem usa, e não do código.
- "Pense num post-it de verdade: o que está escrito nele?" Leva às informações do recado: quem escreveu e a mensagem.
- "Escreveu errado. E agora?" Leva às ações de corrigir e apagar.
- "Alguém com pressa clicou em postar sem escrever nada. O que acontece?" Leva à tabela "O que pode dar errado".

Dê tempo de verdade: 10 a 15 minutos, em silêncio, antes de qualquer resposta. Pergunte mais do que responde. E só abra "o nosso plano" depois que a participante tiver o dela.

## Confusões comuns

- **Achar que existe uma resposta certa.** O plano dela não precisa ser igual ao nosso. O valor está em comparar e entender o motivo de cada diferença.
- **Desenhar demais.** Cores, fontes, ícones e logos não são o foco. Caixas, campos e botões bastam.
- **Pensar no código cedo demais.** Se aparecerem palavras como "tabela" ou "banco de dados", ótimo, mas o capítulo é sobre o problema e as pessoas, não sobre o Rails.
- **Querer resolver tudo.** Veja "Foco no MVP", abaixo.
- **"Não sei desenhar."** Ninguém precisa. Retângulos com nomes dentro são um ótimo desenho de tela.

## Foco no MVP

O ponto mais importante deste capítulo é o trecho do "nosso plano" que diz que alguns problemas a gente resolve e outros a gente **aceita por enquanto** (o exemplo é alguém apagar o recado de outra pessoa). Reforce essa ideia: o objetivo do plano não é prever todos os detalhes do projeto inteiro, é chegar no skate, a menor versão que já funciona (veja [Como os projetos crescem]({{ site.baseurl }}{% link projetos/index.md %}#como-os-projetos-crescem)).

É comum que, ao planejar, apareçam ideias como login, curtidas, respostas aos recados, fotos ou emojis. São ótimas ideias: valorize, mas não deixe o plano crescer com elas.

- **A pergunta-chave:** "o mural de recados funciona sem isso?". Se funciona, fica para depois.
- **Anote numa lista de "depois",** no próprio papel. Ninguém precisa abrir mão da ideia, só da ordem. Muitas viram desafios extras.
- **Respeite o tempo** de 10 a 15 minutos do "Pense antes". Um plano simples e terminado vale mais do que um plano completo pela metade.
- **Aceitar um risco é uma decisão, não um descuido.** Se alguém insistir em resolver tudo, use o exemplo do recado apagado: resolver exigiria contas, senhas e recados com dona, quase um projeto inteiro, para um mural de recados de uma sala onde todo mundo se conhece.

## Dívida técnica

No "nosso plano", a gente decide aceitar por enquanto que qualquer pessoa apague o recado de outra. Se a conversa chegar nisso, é um bom momento para apresentar o termo **dívida técnica**: um atalho que a gente toma agora, sabendo que vai custar mais caro depois.

**Use "dívida técnica", não "débito técnico".** O termo original, em inglês, é *technical debt*, e *debt* quer dizer dívida. A metáfora, criada por Ward Cunningham, é a de um empréstimo: você ganha tempo agora (pega o dinheiro emprestado), paga juros enquanto não resolve (cada mudança fica mais trabalhosa por causa do atalho) e um dia quita a dívida (refaz do jeito certo). "Débito" é outra coisa: em português, é um lançamento contábil ou uma cobrança na conta, como no cartão de débito. "Débito técnico" é uma tradução apressada que perde a ideia do empréstimo e dos juros.

**Nem tudo que fica para depois é dívida técnica.** Deixar uma funcionalidade de fora é uma decisão de escopo. Vira dívida quando a decisão de agora encarece a mudança futura. No app Mural de recados, as duas coisas aparecem juntas: hoje os recados não têm dona; quando o login chegar, além de criar as contas, vai ser preciso decidir o que fazer com todos os recados antigos, que não têm dona. Esse trabalho extra são os juros.

**Dívida técnica não é sinônimo de erro.** Quando é consciente e bem pensada, como aqui, é uma ferramenta legítima: Martin Fowler chama de dívida "deliberada e prudente". O problema é a dívida que ninguém percebeu que fez, ou que nunca é paga.

Referências (em inglês):

- [Technical Debt](https://martinfowler.com/bliki/TechnicalDebt.html), de Martin Fowler.
- [Technical Debt Quadrant](https://martinfowler.com/bliki/TechnicalDebtQuadrant.html), de Martin Fowler: dívida deliberada ou acidental, prudente ou imprudente.
- [The WyCash Portfolio Management System](http://c2.com/doc/oopsla92.html), de Ward Cunningham (1992): onde a metáfora apareceu pela primeira vez.
