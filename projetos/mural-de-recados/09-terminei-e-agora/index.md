---
title: "09. Terminei! E agora?"
parent: Mural de recados
grand_parent: Projetos
nav_order: 10
---

# 09. Terminei! E agora?

Tempo: uns 10 minutos.
{: .fs-5 }

Parabéns! 🎉 Você construiu um app do zero, com Ruby on Rails. Não importa em qual capítulo você parou: o seu mural de recados funciona, e o código está guardado no seu repositório do GitHub.

Este capítulo fecha o dia: desligar o que ficou ligado, saber como voltar ao projeto e escolher o que fazer depois.

<details class="passo" markdown="1" open>
<summary>1. Desligue o servidor e o codespace</summary>

O servidor e o codespace só precisam ficar ligados enquanto você programa.

**O servidor.** Clique no terminal onde o servidor está rodando e aperte **Ctrl+C**. O servidor desliga, e o terminal volta para o lugar de digitar.

**O codespace.** Abra a paleta de comandos do editor (**Cmd+Shift+P** no Mac, **Ctrl+Shift+P** no Windows e no Linux), digite `Stop Current Codespace` e escolha **Codespaces: Stop Current Codespace**.

Se preferir, dá para desligar pela lista de codespaces, em [github.com/codespaces](https://github.com/codespaces): clique nos **…** ao lado do seu codespace e escolha **Stop codespace**.

- Desligar não apaga nada: o código e o banco de dados do codespace continuam lá.
- O GitHub também desliga o codespace sozinho depois de um tempo sem uso, mas desligar na hora economiza as horas gratuitas do Codespaces.

**Dê um palpite:** fez o capítulo 08 e colocou o mural de recados no ar? Com o codespace desligado, ele continua funcionando?

**Confira:** continua. O app no ar roda no Render, e não no seu codespace.

**E o app no Render?** Pode deixar no ar: é para isso que ele existe, e no plano gratuito ele não custa nada. Mas ele não fica lá para sempre: o banco de dados gratuito é apagado depois de 30 dias, e o app passa a dar erro. Quando não precisar mais do mural de recados no ar (no máximo, perto dos 30 dias), apague os dois, para não deixar um app quebrado na internet nem recados guardados sem uso:

1. No Render, abra o app `mural-de-recados`, clique em **Settings** e, no fim da página, em **Delete Web Service**.
2. Abra o banco de dados `mural_de_recados_db` e, no fim da página **Info**, clique em **Delete Database**.

Apagar no Render não mexe no seu código: ele continua no GitHub, e dá para colocar no ar de novo seguindo o capítulo 08.

<!-- TODO: confirmar os nomes dos botões de apagar no Render (o menu do app mostra "Delete or suspend"). -->

{: .dica }
Está usando o seu próprio computador, e não o Codespaces? Basta desligar o servidor com **Ctrl+C**.

Terminou? Abra o passo **2. Como voltar ao projeto**

</details>

<details class="passo" markdown="1">
<summary>2. Como voltar ao projeto</summary>

Quando quiser continuar, em casa ou em outro dia:

1. Abra [github.com/codespaces](https://github.com/codespaces), entrando com a sua conta do GitHub.
2. Clique no seu codespace, o do repositório do mural de recados. Ele liga de novo, do jeito que você deixou.
3. No terminal, ligue o servidor com `bin/rails server`, e continue de onde parou no guia.

O seu código também está no seu repositório, no GitHub, com todos os commits que você fez. Se um dia o codespace for apagado (o GitHub apaga os que ficam muito tempo sem uso), dá para criar um codespace novo a partir do repositório, e só os recados de teste se perdem: eles ficam no banco de dados do codespace, que não vai para o GitHub.

Terminou? Abra o passo **3. E depois?**

</details>

<details class="passo" markdown="1">
<summary>3. E depois?</summary>

Algumas ideias para continuar:

- **Termine o projeto.** Se você parou antes do fim, continue do capítulo em que estava. O guia fica no ar, e você pode seguir no seu ritmo.
- **Coloque o mural de recados no ar,** se ainda não colocou: veja o capítulo [Como mostrar o mural de recados para o mundo?]({{ site.baseurl }}{% link projetos/mural-de-recados/08-como-mostrar-o-mural-para-o-mundo/index.md %}).
- **Faça os desafios extras.** Em [Desafios extras]({{ site.baseurl }}{% link projetos/mural-de-recados/desafios-extras/index.md %}), tem desafios para mostrar a data dos recados, escolher a cor de cada recado e mais.
- **Programe no seu próprio computador.** Veja como instalar tudo em [Instalando no seu computador]({{ site.baseurl }}{% link extras/no-seu-computador.md %}).
- **Mostre o que você fez.** Compartilhe o link do seu repositório no GitHub, ou do seu mural de recados no ar, com quem você quiser.

Obrigada por participar! 💜

</details>
