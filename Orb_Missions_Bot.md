# Orb Missions Bot

Bot multifunção para Discord com economia, missões, loja de cargos, tickets, moderação, logs e boas-vindas.

## Recursos incluídos

- Economia: `/saldo`, `/trabalhar`, `/daily`, `/ranking` e `/pagar`.
- Loja de recompensas com cargos: `/loja`, `/comprar` e `/criar-recompensa`.
- Missões de mensagens: `/missoes` e `/criar-missao`.
- Tickets: `/ticket`, botão de fechar e `/fechar`.
- Moderação: `/limpar`, `/banir`, `/expulsar` e `/avisar`.
- Logs de entradas, mensagens apagadas e ações de moderação.
- Boas-vindas em canal configurado no banco.
- Comunidade: eventos com confirmação de presença, sugestões, enquetes e anúncios.
- Sorteios com reação, duração automática, múltiplos vencedores e encerramento manual.
- Painel administrativo com resumo de configuração, moeda e regras personalizáveis.
- XP e níveis por atividade, ranking de experiência e cargos por reação.
- Estatísticas do servidor, tranca/destranca de canais e modo lento.
- Banco SQLite local, cooldowns e proteção para o bot não gerenciar cargos acima dele.

## Configuração local

1. Copie `.env.example` para `.env`.
2. Preencha `DISCORD_TOKEN` e `CLIENT_ID`. `GUILD_ID` é opcional e acelera o registro dos comandos em um servidor específico.
3. Rode `npm install` e depois `npm start`.

Nunca envie o token para mensagens, GitHub ou este arquivo.

## Permissões do bot

Na criação do convite no Discord Developer Portal, habilite os scopes `bot` e `applications.commands`. Para os recursos incluídos, conceda pelo menos:

- View Channels
- Send Messages
- Embed Links
- Manage Messages
- Manage Channels
- Manage Roles
- Kick Members
- Ban Members
- Read Message History
- Add Reactions e Manage Roles para cargos por reação
- Message Content Intent e Server Members Intent (este último é opcional no código)

O cargo do bot precisa ficar acima dos cargos que ele deve entregar, mas abaixo dos cargos de administrador.

## Railway

1. Envie esta pasta para um repositório privado no GitHub.
2. No Railway, escolha **New Project > Deploy from GitHub repo**.
3. Em **Variables**, adicione `DISCORD_TOKEN`, `CLIENT_ID` e, opcionalmente, `GUILD_ID`.
4. O comando de inicialização é `npm start`.
5. Para persistir a economia, use um volume Railway montado na pasta do projeto; sem volume, o SQLite pode ser perdido em redeploy.

## Comandos administrativos

- `/configuracao`
- `/configurar-moeda nome:Orbs`
- `/configurar-regras texto:...`
- `/nivel`, `/ranking-xp` e `/estatisticas`
- `/configurar-cargo-reacao canal:#cargos mensagem:ID emoji:✅ cargo:@Cargo`
- `/trancar`, `/destrancar` e `/modo-lento segundos:10`
- `/configurar-log canal:#logs`
- `/criar-recompensa nome:VIP preco:1000 cargo:@VIP`
- `/criar-missao nome:Ativo meta:50 recompensa:250`
- `/evento-criar titulo:Campeonato descricao:... minutos:60`
- `/eventos` e `/evento-cancelar id:1`
- `/sorteio-criar premio:Cargo VIP minutos:30 vencedores:2`
- `/sorteios` e `/sorteio-encerrar id:1`

Os nomes dos comandos não usam acentos porque o Discord não aceita acentos em nomes de slash commands.
