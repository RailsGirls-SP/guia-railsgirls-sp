---
title: "Filtrar recados por cor 🔎"
parent: Desafios extras
grand_parent: Mural de recados
nav_order: 3
---

# Filtrar recados por cor 🔎

Este desafio só funciona depois do desafio [Cores nos recados]({{ site.baseurl }}{% link projetos/mural-de-recados/desafios-extras/cores-nos-recados.md %}).
{: .fs-5 }

## O desafio

O mural de recados ficou colorido. Agora, em cima dos cartões, aparecem links com o nome de cada cor: **Todos**, **Amarelo**, **Rosa**, **Azul** e **Verde**. Ao clicar numa cor, o mural de recados mostra só os recados daquela cor. Ao clicar em **Todos**, volta a mostrar todos.

Desta vez, não tem dicas: só o problema. Use o que você aprendeu nos capítulos e nos outros desafios, a documentação e, se quiser, uma IA como tutora. Você consegue! 💪

## Pense antes de programar

- O que muda no endereço quando a pessoa escolhe uma cor? Como o controller fica sabendo qual cor foi escolhida?
- Qual ação do controller busca os recados? O que muda nela?
- O que o mural de recados mostra quando nenhum recado tem a cor escolhida?
- Precisa de rota nova, ou dá para usar a que já existe?

## Você vai praticar

- Passar uma informação pelo endereço, como `/?color=pink`, e ler essa informação no controller com o `params`.
- Buscar só alguns recados no banco de dados, com uma condição.
- Planejar e resolver um problema por conta própria, do começo ao fim.

Se travar, peça ajuda para alguém da mentoria ou leia [Usando IA como tutora]({{ site.baseurl }}{% link comece-aqui/ia-como-tutora.md %}) e peça uma explicação, e não a resposta pronta. Uma palavra que ajuda a procurar na documentação do Rails: `where`.
