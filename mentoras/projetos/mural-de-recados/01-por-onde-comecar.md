---
title: "01. Por onde começar?"
parent: Notas do Mural de recados
grand_parent: Notas dos projetos
nav_order: 2
---

# 01. Por onde começar?

[Ver capítulo]({{ site.baseurl }}{% link projetos/mural-de-recados/01-por-onde-comecar/index.md %}) <!-- TODO: quando as tags existirem, voltar com \" · Código de referência: tag `passo-01`\", com link para a tag no repositório RailsGirls-SP/mural-de-recados. -->

## Perguntas para o "Pense antes"

- "Quando você abre um site, quem responde do outro lado?" Leva à ideia de servidor.
- "O navegador está no seu computador. E o resto, onde poderia ficar?" Prepara o Codespaces: um computador na nuvem.
- "O que precisa existir antes de o app mostrar alguma coisa?" Ajuda a ler o diagrama do capítulo como um caminho.

## Confusões comuns

- **O primeiro codespace demora.** A primeira vez pode levar alguns minutos para abrir. Não é erro: é o computador na nuvem sendo preparado.
- **A pergunta "Do you trust the authors…?"** aparece no editor. Os arquivos vêm do modelo do Rails Girls SP: pode confiar.
- **Esquecer o ponto no `rails new .`.** Sem o ponto, o comando reclama que falta o nome do app. Com outro nome no lugar do ponto, o app é criado numa pasta nova, dentro do repositório, e os comandos seguintes não funcionam da pasta principal.
- **A pergunta `Overwrite README.md?`** no meio do `rails new`. O guia mostra o que responder: o README do modelo é substituído pelo do app.
- **Digitar no terminal do servidor.** Enquanto o servidor está ligado, aquele terminal fica ocupado. Para outros comandos, abra um terminal novo pelo botão **+**.
- **Esquecer o Sync Changes.** O commit fica só no codespace até o Sync. O passo 7 serve justamente para conferir no GitHub.
- **Fechar a aba do codespace.** Nada se perde: o codespace continua na lista de [github.com/codespaces](https://github.com/codespaces). Só é preciso ligar o servidor de novo.

## Quem responde ao pedido: o Puma ou o Rails?

{: .atencao }
Contexto só para a mentoria. **Não precisa levar para as participantes**: o capítulo só fala em "o servidor". O nome Puma aparece para elas apenas no glossário e na lista de terminais do capítulo 02. Use só se alguém perguntar.

O capítulo simplifica e diz que "o servidor" atende os pedidos. Se alguém perguntar quem responde, são dois programas trabalhando juntos:

- **O Puma** é o servidor que liga quando você roda `bin/rails server`. Ele vem instalado em todo app Rails novo, mas é um programa separado. Ele recebe o pedido do navegador e devolve a página pronta, sem saber nada sobre recados.
- **O Rails, junto com o código do app,** decide o que responder: olha o endereço pedido, escolhe qual parte do código cuida daquilo (rota → controller), busca os recados no banco e monta a página (view).

Na analogia do restaurante usada no capítulo:

| No restaurante | No app |
|---|---|
| A atendente, que leva o pedido e traz o prato | O navegador |
| O balcão, que recebe o pedido e entrega o prato | O Puma |
| A cozinha equipada | O Rails |
| A receita | O código do app |
| A cozinheira, que segue a receita | O Ruby |

Só aprofunde se a pergunta aparecer. Para quem está começando, "o servidor recebe o pedido e devolve a página" é suficiente neste capítulo.

## O primeiro commit com "Stage All Changes"

{: .atencao }
Contexto só para a mentoria. **Não precisa levar para as participantes**: o passo 6 só diz que o **Stage All Changes** coloca todos os arquivos no commit. Use só se o grupo tiver curiosidade.

No passo 6, o capítulo usa **Stage All Changes**, que coloca todos os arquivos alterados no commit de uma vez. É o jeito mais simples para começar, mas nem sempre é o ideal: num projeto real, às vezes vale escolher só alguns arquivos para cada commit. Se o grupo tiver curiosidade, é um bom assunto para conversar.

## O ❌ vermelho e os pull requests automáticos

{: .atencao }
Contexto só para a mentoria. **Não precisa levar para as participantes**: o capítulo não fala do ❌ nem dos pull requests. Use só se alguém perguntar, ao ver a página do repositório.

Depois do Sync Changes (passos 6 e 7), a página do repositório no GitHub pode mostrar três coisas que a participante não fez:

- **Um ❌ vermelho ao lado do commit.** O `rails new` cria o arquivo `.github/workflows/ci.yml`, e a cada push o **GitHub Actions** roda verificações automáticas (testes, análise de segurança e estilo do código). O ❌ quer dizer que alguma delas falhou. Não é erro da participante e não impede o app de funcionar.
- **"Pull requests" com um número e várias branches.** O `rails new` também cria `.github/dependabot.yml`. O **Dependabot**, um robô do GitHub, confere se saíram versões novas das bibliotecas do app e, para cada uma, cria uma branch e abre um pull request propondo a atualização. Nada muda no app se ninguém clicar em **Merge**.

Como explicar: são ferramentas que projetos reais usam para manter a qualidade e as bibliotecas em dia, e o Rails já deixa tudo preparado. Neste projeto, a gente não vai usar nenhuma delas (veja [Sem testes automatizados por enquanto]({{ site.baseurl }}{% link mentoras/projetos/mural-de-recados/index.md %}#sem-testes-automatizados-por-enquanto)). A participante pode ignorar ou fechar os pull requests na aba **Pull requests**.

Se a organização preferir que nada disso apareça, o `rails new . --skip-ci` não cria esses dois arquivos.

## O botão "Make Public" da porta 3000

{: .atencao }
Contexto só para a mentoria. **Não precisa levar para as participantes**: o capítulo só pede o **Open in Browser**. Use só se alguém perguntar sobre o outro botão.

No passo 5, o aviso da porta 3000 mostra dois botões: **Open in Browser** e **Make Public**. Só o primeiro é necessário. Se alguém perguntar sobre o segundo:

- **O codespace em si nunca fica público.** Editor, arquivos e terminal são sempre só da dona da conta.
- **O que fica público é o endereço do app** (`…-3000.app.github.dev`). Com a porta pública, qualquer pessoa com o link abre o app, sem login. Com a porta privada, que é o padrão, só a dona da conta abre.
- **O app roda em modo de desenvolvimento,** que não foi feito para ficar exposto: as páginas de erro mostram detalhes do código, e qualquer pessoa com o link pode postar, editar e apagar recados.
- **Só funciona com o codespace ligado,** então não serve para colocar o app no ar. Para isso, existe o capítulo 08.
- **Quem abre o app gasta a cota do Codespaces** de quem é dona do codespace.

Oriente a deixar a porta **privada**. Se uma participante quiser mostrar o mural de recados para alguém na sala, pode deixar pública por alguns minutos e voltar para privada depois: na aba **Ports**, clique com o botão direito na porta 3000 e escolha **Port Visibility** → **Private**.

## Erro "Blocked hosts"

{: .atencao }
Para a mentoria resolver. O "Travou?" do capítulo manda a participante pedir ajuda a alguém da mentoria, ou vir para esta seção.

Em modo de desenvolvimento, o Rails só aceita requisições de endereços conhecidos, e o endereço do codespace (`*.app.github.dev`) não está na lista. Para liberar, abra `config/environments/development.rb` e acrescente, antes do último `end`:

```ruby
config.hosts << ".app.github.dev"
```

Na Imersão 2025, a gente usou uma expressão regular, que tem o mesmo efeito:

```ruby
config.hosts << /.*\.app\.github\.dev/
```

Depois, desligue o servidor (Ctrl+C) e ligue de novo com `bin/rails server`.

Com o repositório-modelo do Rails Girls SP, esse erro **não deve aparecer**: o modelo já libera o endereço do Codespaces pela variável de ambiente `RAILS_DEVELOPMENT_HOSTS`, no `.devcontainer/devcontainer.json`, e isso foi conferido ao testar o modelo. Se o erro aparecer, provavelmente o codespace foi criado sem o modelo (por exemplo, de um repositório vazio). Nesse caso, a linha acima resolve.

## Próximas notas

[02. Como guardar os recados?]({{ site.baseurl }}{% link mentoras/projetos/mural-de-recados/02-como-guardar-os-recados.md %})
