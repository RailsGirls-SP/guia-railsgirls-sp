---
title: "09. Terminei! E agora?"
parent: Notas do Mural de recados
grand_parent: Notas dos projetos
nav_order: 10
---

# 09. Terminei! E agora?

[Ver capítulo]({{ site.baseurl }}{% link projetos/mural-de-recados/09-terminei-e-agora/index.md %})

Este capítulo fecha o dia para **todo mundo**, em qualquer capítulo em que a pessoa tenha parado. Vale fazer junto, no começo do encerramento, antes das apresentações.

## No fim do dia

- **Confira se o último commit foi para o GitHub.** O progresso só fica guardado de verdade depois do **Sync Changes**. Peça para cada pessoa abrir o repositório no GitHub e ver o último commit lá.
- **Desligar o codespace** economiza as horas gratuitas do Codespaces. Se alguém esquecer, o GitHub desliga sozinho depois de um tempo sem uso, então não é grave.
- **Quem parou no meio de um capítulo** pode fazer um commit mesmo assim, com uma mensagem como `Começa o capítulo 05`. Fica mais fácil continuar em casa.
- **Reforce que dá para continuar.** O guia fica no ar, e o codespace também. Mostre onde fica a lista em [github.com/codespaces](https://github.com/codespaces).

## Confusões comuns

- **"Apaguei o codespace sem querer."** O código está no GitHub (se o último Sync foi feito). Dá para criar um codespace novo a partir do repositório. Os recados de teste se perdem, porque o banco de dados não vai para o GitHub, e é preciso rodar `bin/rails db:migrate` de novo.
- **"O mural de recados no ar parou depois que desliguei."** Não deveria: o app no ar roda no Render. O mais provável é o app ter "dormido" (plano gratuito); a primeira visita demora cerca de um minuto.

## Próximas notas

[Notas dos desafios extras]({{ site.baseurl }}{% link mentoras/projetos/mural-de-recados/desafios-extras.md %})
