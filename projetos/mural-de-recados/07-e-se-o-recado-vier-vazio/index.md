---
title: "07. E se alguém mandar um recado vazio?"
parent: Mural de recados
grand_parent: Projetos
nav_order: 8
has_children: true
---

# 07. E se alguém mandar um recado vazio?

Tempo: uns 45 minutos.
{: .fs-5 }

## O desafio

Você já viu isso duas vezes: no console, em [Como guardar os recados?]({{ site.baseurl }}{% link projetos/mural-de-recados/02-como-guardar-os-recados/o-que-aconteceu.md %}), e no formulário, em [Como postar um recado?]({{ site.baseurl }}{% link projetos/mural-de-recados/04-postar-um-recado/mao-na-massa.md %}). Se alguém clicar em **Postar recado** sem escrever nada, aparece um cartão vazio no mural de recados.

O Rails aceita porque ninguém disse a ele que isso é proibido. O desafio agora é decidir **o que é um recado válido** e fazer o app recusar o que não for, avisando a pessoa do que falta.

## Pense antes de programar

Reserve uns 5 minutos. Não existe resposta errada.

- Volte à tabela "O que pode dar errado" do seu plano, em [Planejando o app]({{ site.baseurl }}{% link projetos/mural-de-recados/00-planejando-o-mural.md %}). Que recados não deveriam ser aceitos?
- Um recado só com espaços em branco é um recado vazio?
- Uma mensagem pode ter qualquer tamanho? Qual seria um limite razoável para caber num post-it?
- Quando um recado é recusado, o que a pessoa vê na tela? O que ela escreveu some ou continua lá?
- E na correção: dá para apagar a mensagem de um recado e salvar?

## Compare com o nosso plano

<details markdown="1">
<summary>Abrir o nosso plano</summary>

No fim deste capítulo, quem tentar postar um recado vazio vai ver isto:

![Página Novo recado com o formulário: embaixo do campo Seu nome, em vermelho, a mensagem "Escreva o seu nome."; embaixo do campo Recado, "Escreva o seu recado."; depois, o botão Postar recado e o link Voltar]({{ '/assets/images/mural-de-recados/07/recado-recusado.png' | relative_url }})
{: .ilustracao }

**As regras de um recado:**

| Regra | O que a pessoa vê se não cumprir |
|---|---|
| Precisa ter o nome de quem escreveu | Escreva o seu nome. |
| Precisa ter a mensagem | Escreva o seu recado. |
| A mensagem pode ter no máximo 280 caracteres | O recado pode ter no máximo 280 caracteres. |

- **Espaços em branco** não contam: um nome só com espaços é um nome vazio.
- **Quando o recado é recusado,** a página volta com o aviso embaixo do campo que falta, e o que a pessoa já escreveu continua no formulário.
- **A correção segue as mesmas regras:** não dá para salvar um recado sem mensagem.
- **O mínimo:** essas três regras. Outras, como recusar palavrões, ficam de fora.

</details>

## Mão na massa

Agora é com você: siga os passos em [Mão na massa]({{ site.baseurl }}{% link projetos/mural-de-recados/07-e-se-o-recado-vier-vazio/mao-na-massa.md %}). Quando terminar, siga para [O que aconteceu?]({{ site.baseurl }}{% link projetos/mural-de-recados/07-e-se-o-recado-vier-vazio/o-que-aconteceu.md %}).

## O que aconteceu?

Terminou os passos? Em [O que aconteceu?]({{ site.baseurl }}{% link projetos/mural-de-recados/07-e-se-o-recado-vier-vazio/o-que-aconteceu.md %}) você entende cada passo, quebra o app de propósito, vê se precisa de IA e responde um quiz.
