# Guia Rails Girls São Paulo

Guia de autoestudo do [Rails Girls São Paulo](https://railsgirls.com.br/), um workshop gratuito, de um dia, para mulheres, pessoas trans e pessoas não-binárias que querem dar os primeiros passos em programação.

O guia acompanha o projeto do workshop, o **Mural de recados**: um app em Ruby on Rails, construído capítulo por capítulo, do planejamento no papel até o app no ar. Ele serve para o dia do workshop e para continuar depois, no próprio ritmo.

- **Site:** https://railsgirls-sp.github.io/guia-railsgirls-sp/
- **Repositório:** https://github.com/RailsGirls-SP/guia-railsgirls-sp
- **Código de conduta:** https://railsgirls.com.br/codigo-de-conduta/

## O que tem no guia

| Parte | Pasta | O que tem lá |
|---|---|---|
| Início | `index.md` | Boas-vindas e como navegar pelo guia |
| Por que aprender a programar? | `por-que-aprender-a-programar.md` | O que continua sendo trabalho de quem programa, mesmo com IA |
| Comece aqui | `comece-aqui/` | Conta no GitHub, GitHub Codespaces, Ruby, Rails e Git, e IA como tutora |
| Projetos | `projetos/` | O Mural de recados, capítulo por capítulo, e os desafios extras |
| Glossário | `glossario.md` | O significado de cada termo do guia |
| Guia para mentoria | `mentoras/` | Postura de mentoria, roteiro do dia, erros comuns e notas de cada capítulo |
| Extras | `extras/` | Terminal, Git, instalação no próprio computador e como pedir código para uma IA |

As imagens ficam em `assets/images/`, e os estilos do site, em `_sass/custom/`.

## Rodar o site no seu computador

O site é feito com [Jekyll](https://jekyllrb.com/) e o tema [Just the Docs](https://just-the-docs.com/), e é publicado pelo GitHub Pages a cada push na branch `main`.

Para ver o site no seu computador, você precisa do Ruby na versão do arquivo `.tool-versions` (hoje, a 3.3). Com um gerenciador de versões, como o [mise](https://mise.jdx.dev/) ou o [asdf](https://asdf-vm.com/), a versão certa é escolhida sozinha dentro da pasta do projeto.

```sh
git clone https://github.com/RailsGirls-SP/guia-railsgirls-sp.git
cd guia-railsgirls-sp
bundle install
bundle exec jekyll serve --livereload
```

Abra http://127.0.0.1:4000. As páginas são recarregadas sozinhas quando você salva um arquivo.

Para conferir se o site gera sem erro, sem ligar o servidor:

```sh
bundle exec jekyll build
```

## Como contribuir

Achou um erro, um passo que não funciona ou um texto confuso? Toda ajuda é bem-vinda, principalmente de quem participou do workshop ou mentorou.

- **Para avisar de um problema,** abra uma [issue](https://github.com/RailsGirls-SP/guia-railsgirls-sp/issues) contando a página, o passo e o que aconteceu. Se for um erro do app, cole a mensagem de erro e diga se você estava no Codespaces ou no seu computador.
- **Para propor uma mudança,** faça um fork, crie uma branch e abra um pull request. Antes, rode o site no seu computador e confira a página que você mudou.

Algumas combinações do guia, para manter o mesmo jeito em todas as páginas:

- **Português do Brasil,** com linguagem acolhedora e neutra. Com quem lê, prefira formas neutras, como "a pessoa" e "por conta própria".
- **Termos técnicos em inglês,** como model, controller e commit, com a tradução na primeira vez. Os nomes no código também ficam em inglês (`Message`, `author`, `content`).
- **Um passo de cada vez,** com "Dê um palpite" antes de rodar e "Confira" depois. Os erros fazem parte do caminho: muitos aparecem de propósito.
- **Comandos por extenso,** como `bin/rails server`, e não `rails s`.
- **Teste o que mudar no código do Mural de recados** num app de verdade, de preferência no GitHub Codespaces, que é onde as participantes trabalham.
- **Mensagens de commit no imperativo,** em português, contando o que mudou e por quê.

Todas as pessoas que participam do Rails Girls São Paulo, inclusive deste repositório, seguem o [código de conduta](https://railsgirls.com.br/codigo-de-conduta/).

## Licença

[CC BY-NC-SA 4.0](LICENSE.md): você pode copiar, adaptar e compartilhar o guia, de graça, dando o crédito ao Rails Girls São Paulo e usando a mesma licença. Uso comercial não é permitido.
