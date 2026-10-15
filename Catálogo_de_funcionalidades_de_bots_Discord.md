# Catálogo de funcionalidades de bots Discord

## Escopo

Este catálogo consolida as funcionalidades documentadas para seis bots populares do Discord: **MEE6, Carl-bot, Dyno, YAGPDB, Arcane e ProBot**. Portanto, “todas” significa todas as funcionalidades encontradas nesses seis produtos, e não todos os bots existentes no Discord.

A ausência de um recurso em um bot significa apenas que ele não foi encontrado nas fontes oficiais consultadas. Recursos como Twitch, YouTube, Reddit, RSS, OpenSea, CoinGecko e reCAPTCHA são integrações externas, não recursos nativos do Discord.

## Funcionalidades comuns

### Moderação manual e segurança

Todos os seis documentam alguma combinação de **ban, kick, mute ou timeout, desfazer punições, avisos, limpeza de mensagens e histórico de casos**. Os nomes, durações, DMs, motivos e requisitos de permissão variam por produto. [1] [2] [3] [4] [5] [6]

- Ban, unban, kick, mute, unmute e timeout;
- Punições temporárias com duração;
- Warns, motivos, IDs de caso e histórico de infrações;
- Purge/clear de mensagens;
- Lock/unlock de canais e lockdown;
- Gestão de cargos durante o mute;
- DMs de notificação ao usuário punido;
- Notas privadas de membros em Carl-bot;
- Massban, softban e hardmute em Carl-bot;
- Autopunish após determinado número de warns em Dyno;
- Appeals/apelações de punição em Dyno;
- Consulta e edição de casos em Arcane;
- Reports e modlog no YAGPDB;
- Move, vkick, deafen e gerenciamento avançado de cargos no ProBot.

### AutoModeração e prevenção de abuso

Os seis documentam filtragem de conteúdo ou prevenção de spam, com exceções por canal/cargo e ações configuráveis. [2] [3] [4] [5] [6]

- Palavras proibidas, links, convites e spam;
- Excesso de menções, emojis, imagens, stickers e mensagens;
- Caps lock e texto duplicado;
- Links de phishing, links mascarados e spoilers;
- Regex, listas allow/deny e honeypots no Carl-bot e YAGPDB;
- Regras compostas de gatilho, condição e efeito no YAGPDB;
- Regras de AutoMod do próprio Discord usadas pelo Arcane e ProBot;
- Alteração de nickname, cargo ou slowmode como reação automatizada;
- Delete, warn, mute, timeout, kick e ban como ações de regra;
- Autoban por idade de conta, username ou condições de entrada;
- Anti-Raid por idade da conta, volume de entradas e janela de tempo no ProBot;
- VIP Protection no ProBot para proteger membros, cargos, canais e permissões.

### Logs e auditoria

Todos os bots têm alguma forma de log ou auditoria, ainda que com diferenças importantes de cache, retenção e destino. [1] [2] [3] [4] [5] [6]

- Mensagens editadas, apagadas e purgadas;
- Entradas, saídas, bans, unbans, kicks, warns e timeouts;
- Mudanças de nickname, avatar e cargos;
- Criação, edição e remoção de canais, categorias, cargos, emojis, stickers e threads;
- Entrada, saída, mudança, mute, deaf e vídeo em canais de voz;
- Convites, comandos de moderação e alterações de servidor;
- Canais separados por categoria de evento;
- Filtros para ignorar bots, membros, cargos e canais;
- Modlog com motivo, moderador, alvo, IDs e links;
- Logs de tickets, reputação, AutoMod e verificação;
- Retenção e cache configuráveis conforme o bot e o plano.

### Boas-vindas, cargos e verificação

- Mensagens de entrada e saída em canal ou DM;
- Embeds, imagens, variáveis e mensagens personalizadas;
- Mensagens de banimento e primeira mensagem do membro;
- Autorole imediato ou atrasado;
- Cargos autoatribuíveis por reação, botão e menu dropdown;
- Cargos por link de convite;
- Cargos por voz;
- Cargos temporários;
- Portões de verificação por reação ou botão;
- Verification com reCAPTCHA v2 no YAGPDB;
- Modos de reaction role como toggle, unique, binding, verify, drop, reversed, lock, group lock e persistent;
- Proteção de hierarquia e permissões do Discord.

### Automação e comandos personalizados

Todos os seis oferecem algum mecanismo de automação, embora a profundidade varie. [1] [2] [3] [4] [5] [6]

- Triggers, condições e ações;
- Comandos personalizados e aliases;
- Respostas automáticas por palavra, frase, wildcard ou regex;
- Mensagens automáticas únicas ou recorrentes;
- Variáveis de usuário, servidor, canal, cargo, data e hora;
- Embeds, botões, reações e menus;
- Respostas condicionais;
- Restrições por cargo, canal e permissão;
- Exclusão automática da mensagem de comando ou resposta;
- Tags e templates;
- TagScript no Carl-bot;
- Custom Commands com banco de dados e componentes no YAGPDB;
- Tag System com matemática, arrays, condicionais, cargos e purge no Arcane;
- Formulários e ações de staff no Dyno;
- Auto Responder com respostas aleatórias no ProBot;
- Bot Maker Beta com módulos, sandbox, versões e deploy no MEE6.

### Tickets, formulários e atendimento

Tickets foram documentados em MEE6, Dyno, YAGPDB e ProBot. [1] [3] [4] [6]

- Painel de abertura por botão, comando ou reação;
- Canal ou thread privado;
- Categorias aberta, resolvida, fechada e reivindicada;
- Claim, reassign e gestão de equipe;
- Adição e remoção de usuários;
- Formulário de entrada;
- Campos personalizados;
- Cooldown e limite por usuário;
- Auto-close, auto-delete e auto-pin;
- Mensagens do ciclo de vida do ticket;
- Transcripts em HTML, JSON ou texto;
- Logs de atendimento;
- Apelações e questionários no Dyno.

### Engajamento, eventos e comunidade

- Polls e enquetes;
- Giveaways com vencedores, data final, cargos elegíveis e reroll;
- Entradas diárias ou por indicação;
- Sugestões com votação e estados approve/deny/consider/implemented no Carl-bot;
- Starboard com limiar, canal e emoji configuráveis;
- Birthday messages;
- Server Discovery e bump no Carl-bot;
- Events e lembretes no YAGPDB;
- Trivia, Cards Against Humanity e soundboard no YAGPDB;
- Jogos, TopRoll e jogos de diversão no Carl-bot;
- Points e reputação;
- Comandos de animais, dados, coinflip, 8ball, jokes, Pokémon e informações diversas;
- Superbumps e Bump Multipliers no Carl-bot.

## Níveis, XP e progressão

MEE6, Carl-bot, Dyno, Arcane e ProBot documentam sistemas de XP ou níveis. O YAGPDB documenta reputação, mas não um sistema de níveis/XP nas páginas consultadas. [1] [2] [3] [5] [6]

- XP por mensagens;
- XP por voz;
- XP por reações;
- XP manual por comando;
- Mensagem de level-up no canal ou por DM;
- Rank card e perfil;
- Leaderboards;
- Cargos por nível;
- Cargos acumulados ou substituídos;
- Exclusão de canais e cargos do cálculo;
- Multiplicadores por canal, cargo ou servidor;
- Curvas linear, exponencial e constante no Arcane;
- Nível máximo;
- Boosters de XP;
- Detecção anti-AFK em voz;
- Leaderboards semanal e mensal;
- Highlights dos membros mais ativos;
- Importação do XP do MEE6 no Carl-bot;
- Reset de XP individual ou do servidor;
- First Place Role no Arcane;
- XP de texto e voz de 0 a 100 níveis no ProBot.

## Economia, pontos e reputação

A economia é documentada principalmente no MEE6 e no Dyno. YAGPDB documenta reputação, e ProBot documenta créditos e reputação de perfil. Carl-bot e Arcane não tiveram economia nativa documentada nas fontes consultadas. [1] [3] [4] [6]

### MEE6

- Moeda própria;
- `/daily` e `/work`;
- Itens e cargos pagos;
- Jogos como pedra-papel-tesoura, adivinhar número e roleta;
- Boosts temporários;
- Leaderboard e informações de economia;
- Limites de moedas, itens e boosts.

### Dyno

- Dyno Coins;
- Daily, work e pay;
- Leaderboard;
- Dyno Battles;
- Cartas, arenas, gems, fusões e raids;
- Pontos e reputação com recompensas por cargo.

### YAGPDB e ProBot

- Reputação por usuário;
- Cooldown, limiar e cargos por reputação;
- Créditos, título, perfil e rank no ProBot;
- Memberships do ProBot têm benefícios próprios, mas não devem ser confundidos com a economia do bot de servidor.

## Integrações e alertas externos

Alertas e feeds dependem de serviços externos e publicam mensagens no Discord. [1] [2] [3] [4] [5] [6]

- **MEE6:** Twitch, YouTube, X, Instagram, Reddit, RSS, TikTok, Bluesky, Kick e podcasts;
- **Carl-bot:** Twitch, YouTube e alertas de jogos gratuitos da Steam, Origin, Ubisoft, Epic Games Store, Android e GOG;
- **Dyno:** YouTube, Twitch, Kick, TikTok e Reddit;
- **YAGPDB:** Reddit, YouTube, Twitch e RSS;
- **Arcane:** YouTube para vídeos, streams e shorts;
- **ProBot:** a página oficial menciona notificações sociais, mas não detalha plataformas nas fontes consultadas;
- **MEE6 Web3:** estatísticas de OpenSea e CoinGecko, cargos por NFT/crypto e gating por carteira;
- **MEE6 Monetize:** planos de assinatura para membros, com gestão via Stripe.

## Utilidades e administração

- Dashboard web;
- Ativação e desativação de módulos;
- Permissões por cargo, canal e comando;
- Slash commands e, em alguns bots, prefix/message commands;
- Respostas efêmeras;
- Help e lista de comandos;
- Embeds e rich messages;
- Reminders e timers;
- AFK;
- Counters de membros, cargos, canais, boosts e presença;
- Goal counters;
- Canais de voz temporários;
- Temp Links e convites com expiração;
- Voice Text Linking;
- Message Creator;
- Calculadora, hora atual, informações de servidor e usuário;
- Search Anything no MEE6;
- Logs online no YAGPDB;
- Soundboard no YAGPDB;
- Colors e personalização de perfil no ProBot;
- Server Discovery no Carl-bot;
- Self-hosting no YAGPDB.

## Diferenciais por bot

### MEE6

- Mais de 25 plugins documentados;
- Automations com trigger, condition e action;
- Economia, giveaways, ticketing e monetização;
- Alertas sociais amplos;
- Web3 Gating e estatísticas NFT/crypto;
- `/write`, `/imagine`, AI Characters e Bot Backstory;
- Bot Maker Beta;
- Custom Bot/Personalizer;
- Serviços AI, Pro e Premium separados.

### Carl-bot

- AutoMod com regras e ações combináveis;
- Massban, softban, hardmute, lockdown, notas e warns;
- Reaction roles com muitos modos;
- TagScript, triggers e feeds;
- Sugestões estruturadas;
- Starboard, sticky messages, TopRoll e jogos;
- Alertas Twitch/YouTube e jogos gratuitos;
- Server Discovery, bump e Perks.

### Dyno

- Grande quantidade de módulos configuráveis pelo dashboard;
- Auto Delete, Auto Message, Auto Purge e Voice Text Linking;
- Tickets e Forms robustos;
- Dyno Coins e Dyno Battles;
- Custom Commands e Tags;
- Feeds YouTube, Twitch, Kick, TikTok e Reddit;
- Appeals, Points, Starboard e Giveaways.

### YAGPDB

- Open source e self-hosting;
- AutoMod avançado com gatilhos, condições e efeitos;
- Custom Commands com banco de dados, templates e código;
- Botões, menus, modais e respostas de interação;
- Verification com reCAPTCHA;
- Reputação, soundboard, Trivia e Cards Against Humanity;
- Tickets e feeds Reddit/YouTube/Twitch/RSS.

### Arcane

- Especialização em XP e leveling;
- XP por mensagens, voz, reações e atribuição manual;
- Curvas, boosters, anti-AFK, cinco leaderboards e highlights;
- 19 tipos de counters e seis tipos de goal counter;
- Tag System com condicionais, arrays e ações;
- Reaction roles com cinco modos;
- Custom Bot e logs detalhados.

### ProBot

- Anti-Raid e VIP Protection;
- Welcome/goodbye com imagens e posicionamento detalhado;
- Tickets com formulários, claim, reassign e transcripts;
- Temporary Channels e Temp Links;
- Auto Responder e Color Feature;
- XP de texto/voz, créditos e reputação;
- Premium Tier 1/Tier 2 e memberships de usuário separados.

## Limitações e diferenças importantes

- Tiers, preços, limites e disponibilidade podem mudar;
- MEE6 separa Premium, AI, Pro, Bot Personalizer e Bot Maker;
- Dyno, Carl-bot, Arcane, YAGPDB e ProBot também possuem limites Free/Premium;
- As fontes oficiais apresentaram divergências em alguns limites de Twitch, Reddit, Giveaways, YouTube e descontos anuais;
- AutoMod de Arcane e parte do ProBot dependem do Discord AutoMod;
- Integrações externas precisam de retries, deduplicação, rate limits e tratamento de indisponibilidade;
- Todos os bots dependem da hierarquia de cargos e permissões do Discord;
- YAGPDB não deve ser descrito como bot de economia ou XP apenas por possuir reputação;
- Memberships de usuário do ProBot não são a mesma coisa que Premium do bot;
- Prioridades de implementação abaixo são julgamento de produto, não fatos de mercado.

## Ordem recomendada para o Mobl-bot

### P0 — fundação segura

1. Permissões e hierarquia de cargos;
2. Moderação manual com ban, kick, mute, timeout, warn e purge;
3. Motivo, duração, confirmação e histórico de casos;
4. AutoMod com filtros, exceções e logs;
5. Logs e auditoria;
6. Boas-vindas, autorole e reaction roles;
7. Dashboard/configuração por servidor.

### P1 — recursos de alto valor

1. XP, rank, level-up e recompensas por cargo;
2. Comandos personalizados com engine limitada de trigger/condição/ação;
3. Embeds e reminders;
4. Tickets básicos com claim, fechamento, permissões e transcript;
5. Polls, sugestões e Starboard;
6. Counters e canais temporários.

### P2 — diferenciação

1. Giveaways avançados;
2. Economia e reputação com antifraude;
3. Integrações com um provedor prioritário, começando por YouTube ou Twitch;
4. Formulários e automações avançadas;
5. Soundboard, jogos e descoberta de servidores.

### P3 — apostas posteriores

1. IA;
2. Web3 e gating por carteira;
3. Monetização via assinaturas;
4. Custom Bot;
5. Builder visual ou por linguagem natural;
6. Self-hosting e marketplace de extensões.

## Referências oficiais

[1]: https://mee6.xyz/ "MEE6 — página oficial"
[2]: https://carl.gg/ "Carl-bot — página oficial"
[3]: https://dyno.gg/ "Dyno — página oficial"
[4]: https://yagpdb.xyz/ "YAGPDB — página oficial"
[5]: https://arcane.bot/ "Arcane — página oficial"
[6]: https://probot.io/ "ProBot — página oficial"
[7]: https://help.mee6.xyz/en/ "MEE6 — documentação oficial"
[8]: https://docs.carl.gg/ "Carl-bot — documentação oficial"
[9]: https://docs.dyno.gg/en/modules "Dyno — módulos oficiais"
[10]: https://help.yagpdb.xyz/docs/ "YAGPDB — documentação oficial"
[11]: https://docs.arcane.bot/ "Arcane — documentação oficial"
[12]: https://docs.probot.io/ "ProBot — documentação oficial"
[13]: https://help.mee6.xyz/en/articles/710936-mee6-free-vs-premium-plans-comparison "MEE6 — comparação Free/Premium"
[14]: https://carl.gg/get-premium "Carl-bot — comparação Free/Premium"
[15]: https://docs.dyno.gg/en/premium "Dyno — recursos Premium"
[16]: https://yagpdb.xyz/premium-perks "YAGPDB — recursos Premium"
[17]: https://arcane.bot/premium "Arcane — recursos Premium"
[18]: https://probot.io/pricing "ProBot — preços e recursos"
[19]: https://help.mee6.xyz/en/articles/618572-getting-started-with-mee6-automations "MEE6 — Automations"
[20]: https://help.yagpdb.xyz/docs/moderation/advanced-automoderator/overview/ "YAGPDB — AutoMod avançado"
[21]: https://docs.arcane.bot/plugins/leveling/ "Arcane — leveling"
[22]: https://docs.probot.io/docs/modules/tickets "ProBot — tickets"
