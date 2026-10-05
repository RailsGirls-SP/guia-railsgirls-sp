---
title: "06. Como deixar o mural de recados mais bonito?"
parent: Mural de recados
grand_parent: Projetos
nav_order: 7
has_children: true
---

# 06. Como deixar o mural de recados mais bonito?

Tempo: uns 45 minutos.
{: .fs-5 }

## O desafio

O app Mural de recados já faz tudo que o plano pede: postar, ver, corrigir e apagar. Mas ainda não parece um mural de recados de verdade: os recados aparecem como texto, um embaixo do outro.

Num mural de verdade, cada recado é um post-it colorido, e quem escreve escolhe a cor. O desafio agora é deixar os recados com cara de cartões coloridos, cada um na cor que a autora escolheu.

Repare que são dois problemas diferentes: a **aparência** dos cartões e uma **informação nova**, a cor, que o recado ainda não tem.

## Pense antes de programar

Reserve uns 5 minutos. Não existe resposta errada.

- Desenhe um cartão de recado. Onde fica a autora? E a mensagem? E os botões?
- Que cores a pessoa pode escolher? Qualquer cor ou uma lista pequena?
- A cor é uma informação nova. Onde ela fica guardada? O que precisa mudar na planilha de recados?
- Os recados que já existem não têm cor. Com qual cor eles ficam?
- Como os cartões se organizam na tela: um embaixo do outro, ou lado a lado, em grade?

## Compare com o nosso plano

<details markdown="1">
<summary>Abrir o nosso plano</summary>

O formulário ganha um campo para escolher a cor, e os cartões ficam lado a lado, em grade:

<!-- TODO: acessibilidade: esconder o rascunho do leitor de tela (aria-hidden) e dar uma descrição em texto da tela com os cartões coloridos. -->
```
┌────────────────────────────────────────────────┐
│  Mural de recados                              │
│                                                │
│  Seu nome:  [__________________]               │
│  Recado:    [__________________]               │
│             [__________________]               │
│  Cor:       [ Amarelo        ▾ ]               │
│             ( Postar recado )                  │
│                                                │
│  ┌────────────┐ ┌────────────┐ ┌────────────┐  │
│  │ (rosa)     │ │ (azul)     │ │ (amarelo)  │  │
│  │ Obrigada,  │ │ Meu 1º app │ │ Meu        │  │
│  │ mentoras!  │ │ em Rails!  │ │ primeiro   │  │
│  │ — Duda     │ │ — Carla    │ │ recado!    │  │
│  │            │ │            │ │ — Ana      │  │
│  │ Editar     │ │ Editar     │ │ Editar     │  │
│  │ (Apagar)   │ │ (Apagar)   │ │ (Apagar)   │  │
│  └────────────┘ └────────────┘ └────────────┘  │
│                                                │
└────────────────────────────────────────────────┘
```

**As informações de um recado** ganham uma linha nova:

| Informação | Exemplo | Tipo |
|---|---|---|
| Autora | Bia | texto curto |
| Mensagem | Adorei o workshop! | texto longo |
| Cor | Rosa | escolha entre algumas opções |

- **As cores:** uma lista pequena, que combina com o resto da página: amarelo, rosa, azul e verde. Uma lista fechada também garante que o texto fique fácil de ler em qualquer cartão.
- **Os recados antigos:** ficam amarelos, a cor clássica do post-it. Todo recado novo também começa amarelo, até alguém escolher outra cor.
- **A grade:** os cartões ficam lado a lado e descem para a linha de baixo quando não cabem mais. Numa tela de celular, cabe um por linha.
- **A página de correção** também ganha o campo da cor, para dar para trocar a cor depois.

</details>

## Mão na massa

Agora é com você: siga os passos em [Mão na massa]({{ site.baseurl }}{% link projetos/mural-de-recados/06-como-deixar-o-mural-mais-bonito/mao-na-massa.md %}). Quando terminar, siga para [O que aconteceu?]({{ site.baseurl }}{% link projetos/mural-de-recados/06-como-deixar-o-mural-mais-bonito/o-que-aconteceu.md %}).

## O que aconteceu?

Terminou os passos? Em [O que aconteceu?]({{ site.baseurl }}{% link projetos/mural-de-recados/06-como-deixar-o-mural-mais-bonito/o-que-aconteceu.md %}) você entende cada passo, quebra o app de propósito, vê se precisa de IA e responde um quiz.
