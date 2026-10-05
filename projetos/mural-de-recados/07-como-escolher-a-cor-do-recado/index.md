---
title: "07. Como escolher a cor do recado?"
parent: Mural de recados
grand_parent: Projetos
nav_order: 8
has_children: true
---

# 07. Como escolher a cor do recado?

Tempo: uns 35 minutos.
{: .fs-5 }

## O desafio

Os recados já parecem post-its, mas todos são amarelos. Num mural de verdade, cada pessoa escolhe a cor do seu post-it.

O desafio agora é deixar cada pessoa escolher a cor do seu recado. Diferente do capítulo anterior, isso não é só aparência: a cor é uma **informação nova**, que o recado ainda não tem e que precisa ficar guardada.

## Pense antes de programar

Reserve uns 5 minutos. Não existe resposta errada.

- Que cores a pessoa pode escolher? Qualquer cor ou uma lista pequena?
- A cor é uma informação nova. Onde ela fica guardada? O que precisa mudar no banco de dados?
- Os recados que já existem não têm cor. Com qual cor eles ficam?
- Onde a pessoa escolhe a cor? E dá para trocar a cor depois?

## Compare com o nosso plano

<details markdown="1">
<summary>Abrir o nosso plano</summary>

No fim deste capítulo, quem abrir o app vai ver isto:

![Mural de recados com fundo bege, o formulário com os campos Seu nome, Recado e Cor e quatro cartões lado a lado: rosa, azul, verde e amarelo, cada um com a mensagem, a autora em itálico, o link Editar e o botão Apagar]({{ '/assets/images/mural-de-recados/07/mural-colorido.png' | relative_url }})
{: .ilustracao }

**As informações de um recado** ganham uma linha nova:

| Informação | Exemplo | Tipo |
|---|---|---|
| Autora | Bia | texto curto |
| Mensagem | Adorei o workshop! | texto longo |
| Cor | Rosa | escolha entre algumas opções |

- **As cores:** uma lista pequena, que combina com o resto da página: amarelo, rosa, azul e verde. Uma lista fechada também garante que o texto fique fácil de ler em qualquer cartão.
- **Os recados antigos:** ficam amarelos, a cor clássica do post-it. Todo recado novo também começa amarelo, até alguém escolher outra cor.
- **A página de correção** também ganha o campo da cor, para dar para trocar a cor depois.
- **O mínimo:** só quatro cores, numa caixa de escolha. Escolher qualquer cor fica de fora.

</details>

## Mão na massa

Agora é com você: siga os passos em [Mão na massa]({{ site.baseurl }}{% link projetos/mural-de-recados/07-como-escolher-a-cor-do-recado/mao-na-massa.md %}). Quando terminar, siga para [O que aconteceu?]({{ site.baseurl }}{% link projetos/mural-de-recados/07-como-escolher-a-cor-do-recado/o-que-aconteceu.md %}).

## O que aconteceu?

Terminou os passos? Em [O que aconteceu?]({{ site.baseurl }}{% link projetos/mural-de-recados/07-como-escolher-a-cor-do-recado/o-que-aconteceu.md %}) você entende cada passo, quebra o app de propósito, vê se precisa de IA e responde um quiz.
