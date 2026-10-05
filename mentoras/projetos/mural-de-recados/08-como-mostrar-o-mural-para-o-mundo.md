---
title: "08. Como mostrar o mural de recados para o mundo?"
parent: Notas do Mural de recados
grand_parent: Notas dos projetos
nav_order: 9
---

# 08. Como mostrar o mural de recados para o mundo?

[Ver capítulo]({{ site.baseurl }}{% link projetos/mural-de-recados/08-como-mostrar-o-mural-para-o-mundo/index.md %}) · Código de referência: tag `passo-08`.

{: .atencao }
Este capítulo é **opcional** e ainda **não foi testado num deploy de verdade** (veja o TODO no Mão na massa). Antes do workshop, alguém da organização precisa fazer o capítulo inteiro, do zero, com uma conta nova no Render.

## Perguntas para o "Pense antes"

- "Onde o app roda hoje? E quando você fecha o codespace?" Leva à ideia de um computador ligado o tempo todo.
- "Os seus recados de teste vão junto?" Leva à separação entre desenvolvimento e produção.
- "Se qualquer pessoa pode abrir, o que pode dar errado?" Abre a conversa sobre segurança (veja abaixo).

## Confusões comuns

- **A janelinha da palavra-chave.** O usuário é sempre `mural`; a senha é a `ACCESS_PASSWORD`. É comum digitar a palavra-chave no campo do usuário. A janelinha é do navegador, então o texto aparece no idioma dele.

- **Esquecer o commit e o Sync Changes do passo 3.** O Render só enxerga o que está no GitHub.
- **Esquecer o `chmod +x`.** O deploy falha com `Permission denied` no `render-build.sh`.
- **Copiar a URL errada do banco de dados.** É o **Internal Database URL**, não o External.
- **Regiões diferentes** para o app e o banco de dados: o endereço interno não funciona entre regiões.
- **O app "dormindo".** Depois de 15 minutos sem acesso, a primeira visita demora cerca de um minuto. Não é erro.

## Decisões técnicas do capítulo

- **PostgreSQL em produção, SQLite em desenvolvimento.** No plano gratuito, o Render não tem disco permanente: um arquivo SQLite seria apagado a cada deploy ou reinício. O PostgreSQL gratuito dura 30 dias, o que basta para o workshop. O `database.yml` não muda: o `DATABASE_URL` substitui a configuração do banco principal em produção. Testado localmente com Rails 8.1.4 e PostgreSQL 17.
- **O cache, a fila e o cable continuam em SQLite** em produção (as bases `cache`, `queue` e `cable` do Rails 8). Como o app não usa cache, jobs nem Turbo Streams, não tem problema se esses arquivos forem apagados.
- **`db:prepare`, e não `db:migrate`, na receita.** O `db:prepare` cria as tabelas dessas bases a partir dos arquivos `*_schema.rb`, e o `db:migrate` não.
- **A gem `pg` em todos os ambientes.** Desde a versão 1.6, a gem `pg` tem versões pré-compiladas para Linux, então o `bundle add pg` funciona no Codespaces sem instalar nada no sistema.
- **Ruby 4.0 no Render.** O `.ruby-version` do app tem a versão do Codespaces (Ruby 4.0). A documentação do Render ainda não confirma Ruby 4.0. Se o deploy falhar por isso, a alternativa é o deploy com Docker, usando o `Dockerfile` que o `rails new` já criou (escolher **Docker** como linguagem no Render). Precisa ser testado.

## Segurança

O app no ar é público: qualquer pessoa com o endereço consegue abrir. Vale conversar sobre isso, sem assustar. O que o guia já cobre e o que fica de fora:

| Tema | Situação | O que fazer |
|---|---|---|
| **Segredos** (`config/master.key` e `DATABASE_URL`) | O guia manda colar só no Render. O `master.key` já fica fora do Git pelo `.gitignore` do Rails. | Confira que a participante não colou a chave em nenhum outro lugar (chat, IA, print, commit). Se vazar, apague e recrie o banco de dados e gere uma chave nova (`bin/rails credentials:edit` com outra chave). |
| **Robôs e curiosos** | O passo 3 protege o app inteiro com uma palavra-chave (`http_basic_authenticate_with`, usuário `mural`, senha na variável `ACCESS_PASSWORD` do Render). Sem a variável, como no codespace, a proteção fica desligada. | Lembre que a palavra-chave é compartilhada: não pode ser uma senha pessoal. O `/up` (verificação de saúde do Render) continua aberto, porque não passa pelo `ApplicationController`. |
| **Quem tem a palavra-chave pode postar, corrigir e apagar** | Decisão do plano do capítulo 00: aceito para um mural de recados de workshop. | Sugira compartilhar o endereço e a palavra-chave só com o pessoal do workshop. Contas de usuária ficam em "Como avançar com o projeto", nos desafios extras. |
| **Conteúdo ofensivo ou spam** | A palavra-chave segura os robôs, mas não há moderação nem limite de envios para quem tem a palavra. | Se acontecer, a própria participante apaga pelo botão **Apagar**. Ir além: o Rails 8 tem `rate_limit` no controller, por exemplo `rate_limit to: 10, within: 1.minute, only: :create`. |
| **Dados pessoais** | Os recados ficam públicos. | Oriente a não postar e-mail, telefone, endereço nem sobrenome completo de ninguém nos recados. |
| **Código malicioso nos recados** (como `<script>`) | Protegido: o `<%= %>` do ERB escapa o HTML, e o texto aparece como texto. | Nada. Se alguém testar, é uma boa demonstração de por que o Rails escapa o conteúdo por padrão. |
| **Proteção de formulários (CSRF)** | O `forgery_protection_origin_check = false` do capítulo 04 está só no `development.rb`. Em produção, a proteção está completa. | Nada. |
| **HTTPS** | O Render serve o app com HTTPS. | Nada. |
| **Acesso do Render ao GitHub** | O Render pede permissão para ler repositórios. | Sugira dar acesso só ao repositório do mural de recados (**Only select repositories**). |
| **Dados apagados depois de 30 dias** | O banco de dados gratuito expira. | Avise a participante, para não estranhar quando os recados sumirem. |
