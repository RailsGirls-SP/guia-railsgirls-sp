---
title: "03. Como ver todos os recados?"
parent: Mural de recados
grand_parent: Projetos
nav_order: 4
has_children: true
---

# 03. Como ver todos os recados?

Tempo: uns 40 minutos.
{: .fs-5 }

## O desafio

O recado da Ana está guardado no banco de dados, mas só dá para ver pelo console. Quem abre o app no navegador ainda vê a página de boas-vindas do Rails.

O desafio agora é fazer o mural de recados aparecer: quem abrir o app tem que ver os recados que já foram postados.

## Pense antes de programar

Reserve uns 5 minutos. Não existe resposta errada.

Neste capítulo, a gente só vai **mostrar** os recados que já existem. Postar um recado novo fica para o próximo capítulo, então não precisa pensar em formulário agora.

- Volte ao desenho da tela principal que você fez em [Planejando o app]({{ site.baseurl }}{% link projetos/mural-de-recados/00-planejando-o-mural.md %}). Por enquanto, olhe só para os cartões: o que aparece em cada um?
- Qual é o mínimo que essa tela precisa mostrar para já ser útil para quem abre o app? O que pode ficar para depois?
- Em que ordem os recados aparecem? Os mais novos primeiro?
- O que a tela mostra quando ainda não existe nenhum recado?

## Compare com o nosso plano

<details markdown="1">
<summary>Abrir o nosso plano</summary>

No fim deste capítulo, quem abrir o app vai ver isto:

![Página com o título Mural de recados e, embaixo, dois recados: primeiro "Adorei o workshop!", da Bia, e depois "Meu primeiro recado!", da Ana]({{ '/assets/images/mural-de-recados/03/resultado-final.png' | relative_url }})
{: .ilustracao }

- **Onde fica:** o mural de recados é a página principal do app. Quem abrir o endereço do app cai direto nele.
- **A ordem:** os recados mais novos aparecem primeiro, como numa rede social. Por isso a Bia, que postou depois, aparece em cima.
- **Sem recados:** em vez de uma página vazia, aparece um convite: "Ainda não tem nenhum recado. Que tal postar o primeiro?".
- **O mínimo:** cada recado mostra só a mensagem e quem escreveu. Ainda sem cartões coloridos, sem formulário e sem botões: isso vem nos próximos capítulos.

</details>

## Mão na massa

Agora é com você: siga os passos em [Mão na massa]({{ site.baseurl }}{% link projetos/mural-de-recados/03-ver-todos-os-recados/mao-na-massa.md %}). Quando terminar, siga para [O que aconteceu?]({{ site.baseurl }}{% link projetos/mural-de-recados/03-ver-todos-os-recados/o-que-aconteceu.md %}).

## O que aconteceu?

Terminou os passos? Em [O que aconteceu?]({{ site.baseurl }}{% link projetos/mural-de-recados/03-ver-todos-os-recados/o-que-aconteceu.md %}) você entende cada passo, quebra o app de propósito, vê se precisa de IA e responde um quiz.
