---
title: Instalando no seu computador
parent: Extras
nav_order: 1
has_children: true
---

# Instalando no seu computador

Para programar no seu próprio computador, você instala o **Ruby**, o **Rails**, o **Git** e um **editor de código**. O guia oficial do Rails, [Install Ruby on Rails](https://guides.rubyonrails.org/install_ruby_on_rails.html) (em inglês), é a base destes passos.

{: .atencao }
A instalação no próprio computador pode demorar e dar erros que dependem de cada máquina. No workshop, use o [Codespaces]({{ site.baseurl }}{% link comece-aqui/instalacao.md %}).

## Um gerenciador de versões para o Ruby

O Ruby é instalado com um **gerenciador de versões**: um programa que instala o Ruby só para você, sem mexer no resto do sistema, e deixa ter mais de uma versão no mesmo computador. Ele ajuda porque:

- **o Ruby que já vem no sistema** (como no Mac) costuma ser antigo, e mexer nele pode atrapalhar outros programas do computador;
- **cada projeto pode pedir uma versão diferente** do Ruby, e o gerenciador troca de versão sozinho quando você entra na pasta do projeto;
- **dá para instalar e atualizar sem precisar da senha de administração** do computador.

O guia do Rails recomenda o gerenciador **mise**, e é ele que os passos usam.

## Escolha o seu sistema

| Sistema | Passo a passo |
|---|---|
| Mac | [No Mac]({{ site.baseurl }}{% link extras/mac.md %}) |
| Ubuntu e outros Linux parecidos | [No Ubuntu (Linux)]({{ site.baseurl }}{% link extras/ubuntu.md %}) |
| Windows | [No Windows]({{ site.baseurl }}{% link extras/windows.md %}), usando o WSL, um Linux dentro do Windows |

## E o projeto?

No capítulo [Por onde começar?]({{ site.baseurl }}{% link projetos/mural-de-recados/01-por-onde-comecar/index.md %}), crie o seu repositório a partir do modelo, como no passo 1. Depois, em vez de abrir o codespace:

1. No VS Code, abra a paleta de comandos (**Cmd+Shift+P** no Mac, **Ctrl+Shift+P** no Windows e no Linux), escolha **Git: Clone** e cole o endereço do seu repositório.
2. Abra a pasta do repositório no VS Code e siga o capítulo a partir do passo 3, **Confira as ferramentas**.

Os passos são os mesmos, com uma diferença: o app abre no endereço `http://localhost:3000`, e não num endereço do Codespaces. Os passos que só existem no Codespaces, como a linha do passo 9 do capítulo 04, podem ser pulados: o guia avisa quando é o caso.
