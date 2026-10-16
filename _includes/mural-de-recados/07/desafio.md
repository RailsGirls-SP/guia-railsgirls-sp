Você já viu isso duas vezes: no console, em [Como guardar os recados?]({{ site.baseurl }}{% link projetos/mural-de-recados/02-como-guardar-os-recados/o-que-aconteceu.md %}), e no formulário, em [Como postar um recado?]({{ site.baseurl }}{% link projetos/mural-de-recados/04-postar-um-recado/mao-na-massa.md %}). Se alguém clicar em **Postar recado** sem escrever nada, aparece um cartão vazio no mural de recados.

![Mural de recados com o botão Novo recado e quatro cartões amarelos: o primeiro está vazio, só com o travessão e os botões Editar e Apagar; os outros têm os recados da Carla, da Bia e da Ana]({{ '/assets/images/mural-de-recados/07/recado-vazio.png' | relative_url }})
{: .ilustracao .ilustracao-larga }

O Rails aceita porque ninguém disse a ele que isso é proibido.

{: .desafio }
Decida **o que é um recado válido** e faça o app recusar o que não for, avisando a pessoa do que falta.
