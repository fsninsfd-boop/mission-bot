import 'dotenv/config';
import Database from 'better-sqlite3';
import {
  Client, GatewayIntentBits, Partials, REST, Routes, SlashCommandBuilder,
  PermissionFlagsBits, ChannelType, EmbedBuilder, ActionRowBuilder,
  ButtonBuilder, ButtonStyle, Events, Collection
} from 'discord.js';

const token = process.env.DISCORD_TOKEN;
const clientId = process.env.CLIENT_ID?.trim();
const guildId = process.env.GUILD_ID;
if (!token || token === 'cole_seu_token_aqui') {
  console.error('Configure DISCORD_TOKEN no arquivo .env antes de iniciar.');
  process.exit(1);
}

const db = new Database('orb-missions.db');
db.pragma('journal_mode = WAL');
db.exec(`
CREATE TABLE IF NOT EXISTS users (guild_id TEXT, user_id TEXT, coins INTEGER DEFAULT 0, daily_at INTEGER DEFAULT 0, work_at INTEGER DEFAULT 0, PRIMARY KEY(guild_id,user_id));
CREATE TABLE IF NOT EXISTS transactions (id INTEGER PRIMARY KEY AUTOINCREMENT, guild_id TEXT, user_id TEXT, amount INTEGER, reason TEXT, created_at INTEGER);
CREATE TABLE IF NOT EXISTS shop (id INTEGER PRIMARY KEY AUTOINCREMENT, guild_id TEXT, name TEXT, price INTEGER, role_id TEXT, custom INTEGER DEFAULT 0);
CREATE TABLE IF NOT EXISTS missions (id INTEGER PRIMARY KEY AUTOINCREMENT, guild_id TEXT, name TEXT, goal INTEGER, reward INTEGER, kind TEXT DEFAULT 'messages');
CREATE TABLE IF NOT EXISTS progress (guild_id TEXT, user_id TEXT, mission_id INTEGER, value INTEGER DEFAULT 0, claimed INTEGER DEFAULT 0, PRIMARY KEY(guild_id,user_id,mission_id));
CREATE TABLE IF NOT EXISTS config (guild_id TEXT PRIMARY KEY, log_channel TEXT, welcome_channel TEXT, ticket_category TEXT, currency TEXT DEFAULT 'moedas');
`);
try { db.exec('ALTER TABLE config ADD COLUMN counter_channel TEXT'); } catch {}

const cmds = [
  new SlashCommandBuilder().setName('orb').setDescription('Controla seus registros de Orbs').addSubcommand(s=>s.setName('saldo').setDescription('Mostra seu saldo de Orbs')).addSubcommand(s=>s.setName('registrar').setDescription('Registra Orbs manualmente').addIntegerOption(o=>o.setName('quantidade').setDescription('Quantidade').setMinValue(1).setRequired(true)).addStringOption(o=>o.setName('missao').setDescription('Missão').setMaxLength(100).setRequired(true))).addSubcommand(s=>s.setName('historico').setDescription('Mostra seu histórico')).addSubcommand(s=>s.setName('ranking').setDescription('Ranking de Orbs')).addSubcommand(s=>s.setName('ajuda').setDescription('Mostra a ajuda')),
  new SlashCommandBuilder().setName('saldo').setDescription('Mostra seu saldo'),
  new SlashCommandBuilder().setName('trabalhar').setDescription('Trabalhe e receba moedas'),
  new SlashCommandBuilder().setName('daily').setDescription('Resgate sua recompensa diária'),
  new SlashCommandBuilder().setName('ranking').setDescription('Ranking de moedas'),
  new SlashCommandBuilder().setName('pagar').setDescription('Transfere moedas').addUserOption(o=>o.setName('usuario').setDescription('Destinatário').setRequired(true)).addIntegerOption(o=>o.setName('valor').setDescription('Valor').setMinValue(1).setRequired(true)),
  new SlashCommandBuilder().setName('loja').setDescription('Lista as recompensas da loja'),
  new SlashCommandBuilder().setName('comprar').setDescription('Compra uma recompensa').addIntegerOption(o=>o.setName('id').setDescription('ID da recompensa').setRequired(true)),
  new SlashCommandBuilder().setName('missoes').setDescription('Lista suas missões'),
  new SlashCommandBuilder().setName('ticket').setDescription('Abre um ticket de suporte'),
  new SlashCommandBuilder().setName('fechar').setDescription('Fecha o ticket atual'),
  new SlashCommandBuilder().setName('limpar').setDescription('Apaga mensagens').addIntegerOption(o=>o.setName('quantidade').setDescription('1 a 100').setMinValue(1).setMaxValue(100).setRequired(true)).setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),
  new SlashCommandBuilder().setName('banir').setDescription('Bane um membro').addUserOption(o=>o.setName('usuario').setDescription('Membro').setRequired(true)).addStringOption(o=>o.setName('motivo').setDescription('Motivo')).setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),
  new SlashCommandBuilder().setName('expulsar').setDescription('Expulsa um membro').addUserOption(o=>o.setName('usuario').setDescription('Membro').setRequired(true)).addStringOption(o=>o.setName('motivo').setDescription('Motivo')).setDefaultMemberPermissions(PermissionFlagsBits.KickMembers),
  new SlashCommandBuilder().setName('avisar').setDescription('Registra um aviso').addUserOption(o=>o.setName('usuario').setDescription('Membro').setRequired(true)).addStringOption(o=>o.setName('motivo').setDescription('Motivo').setRequired(true)).setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers),
  new SlashCommandBuilder().setName('configurar-log').setDescription('Define o canal de logs').addChannelOption(o=>o.setName('canal').setDescription('Canal').addChannelTypes(ChannelType.GuildText).setRequired(true)).setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild),
  new SlashCommandBuilder().setName('configurar-contador').setDescription('Cria ou define o canal de voz com a contagem de membros').setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild),
  new SlashCommandBuilder().setName('criar-recompensa').setDescription('Cria item na loja').addStringOption(o=>o.setName('nome').setDescription('Nome').setRequired(true)).addIntegerOption(o=>o.setName('preco').setDescription('Preço').setMinValue(1).setRequired(true)).addRoleOption(o=>o.setName('cargo').setDescription('Cargo entregue').setRequired(true)).setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild),
  new SlashCommandBuilder().setName('criar-missao').setDescription('Cria missão de mensagens').addStringOption(o=>o.setName('nome').setDescription('Nome').setRequired(true)).addIntegerOption(o=>o.setName('meta').setDescription('Quantidade').setMinValue(1).setRequired(true)).addIntegerOption(o=>o.setName('recompensa').setDescription('Moedas').setMinValue(1).setRequired(true)).setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild),
].map(c=>c.toJSON());

const client = new Client({intents:[GatewayIntentBits.Guilds,GatewayIntentBits.GuildMessages],partials:[Partials.Channel]});
const cooldown = (ms)=>Math.floor(Date.now()/1000)-ms/1000;
function ensure(g,u){ db.prepare('INSERT OR IGNORE INTO users(guild_id,user_id) VALUES(?,?)').run(g,u); }
function addCoins(g,u,amount,reason){ ensure(g,u); db.prepare('UPDATE users SET coins=coins+? WHERE guild_id=? AND user_id=?').run(amount,g,u); db.prepare('INSERT INTO transactions(guild_id,user_id,amount,reason,created_at) VALUES(?,?,?,?,?)').run(g,u,amount,reason,Date.now()); }
function coins(g,u){ ensure(g,u); return db.prepare('SELECT coins FROM users WHERE guild_id=? AND user_id=?').get(g,u).coins; }
function currency(g){ return db.prepare('SELECT currency FROM config WHERE guild_id=?').get(g)?.currency || 'moedas'; }
async function log(guild, text){ const id=db.prepare('SELECT log_channel FROM config WHERE guild_id=?').get(guild.id)?.log_channel; const ch=id && guild.channels.cache.get(id); if(ch) ch.send({embeds:[new EmbedBuilder().setColor(0x5865f2).setDescription(text).setTimestamp()]}).catch(()=>{}); }
async function updateCounter(guild){ const id=db.prepare('SELECT counter_channel FROM config WHERE guild_id=?').get(guild.id)?.counter_channel; const ch=id&&guild.channels.cache.get(id); if(ch) ch.setName(`👥 Membros: ${guild.memberCount}`).catch(()=>{}); }
function admin(i){ return i.memberPermissions?.has(PermissionFlagsBits.ManageGuild); }

client.once(Events.ClientReady, async c=>{
  const rest=new REST({version:'10'}).setToken(token);
  const applicationId=clientId || c.application.id;
  if(guildId) await rest.put(Routes.applicationGuildCommands(applicationId,guildId),{body:cmds}); else await rest.put(Routes.applicationCommands(applicationId),{body:cmds});
  console.log(`Online como ${c.user.tag}`);
});

client.on(Events.GuildMemberAdd, async m=>{
  const id=db.prepare('SELECT welcome_channel FROM config WHERE guild_id=?').get(m.guild.id)?.welcome_channel; const ch=id&&m.guild.channels.cache.get(id);
  if(ch) ch.send(`Bem-vindo(a), ${m}! Leia as regras e divirta-se.`).catch(()=>{}); await updateCounter(m.guild); await log(m.guild,`Entrou: ${m.user.tag}`);
});
client.on(Events.GuildMemberRemove, async m=>{ await updateCounter(m.guild); await log(m.guild,`Saiu: ${m.user.tag}`); });
client.on(Events.MessageDelete, m=>{ if(m.guild) log(m.guild,`Mensagem apagada em ${m.channel}: ${m.author?.tag||'desconhecido'}`); });
client.on(Events.MessageCreate, m=>{ if(!m.guild||m.author.bot)return; ensure(m.guild.id,m.author.id); const ms=db.prepare("SELECT * FROM missions WHERE guild_id=? AND kind='messages'").all(m.guild.id); for(const x of ms){db.prepare('INSERT OR IGNORE INTO progress(guild_id,user_id,mission_id) VALUES(?,?,?)').run(m.guild.id,m.author.id,x.id);db.prepare('UPDATE progress SET value=value+1 WHERE guild_id=? AND user_id=? AND mission_id=? AND claimed=0').run(m.guild.id,m.author.id,x.id);} });

client.on(Events.InteractionCreate, async i=>{
 try {
  if(i.isButton() && i.customId==='close_ticket'){ await i.reply('Ticket fechado.'); setTimeout(()=>i.channel?.delete().catch(()=>{}),1500); return; }
  if(!i.isChatInputCommand()) return; const g=i.guild.id,u=i.user.id; const name=i.commandName;
  if(name==='orb') { const sub=i.options.getSubcommand(); if(sub==='saldo') return i.reply(`Você tem **${coins(g,u)} Orbs**.`); if(sub==='registrar'){const n=i.options.getInteger('quantidade'), mission=i.options.getString('missao'); addCoins(g,u,n,`Orb: ${mission}`); return i.reply(`Registro salvo: **+${n} Orbs** pela missão **${mission}**.`);} if(sub==='historico'){const rows=db.prepare('SELECT amount,reason,created_at FROM transactions WHERE guild_id=? AND user_id=? ORDER BY id DESC LIMIT 10').all(g,u); return i.reply({content:rows.length?rows.map(x=>`+${x.amount} — ${x.reason}`).join('\n'):'Você ainda não tem registros.',ephemeral:true});} if(sub==='ranking'){const rows=db.prepare('SELECT user_id,coins FROM users WHERE guild_id=? ORDER BY coins DESC LIMIT 10').all(g); return i.reply(rows.length?rows.map((x,n)=>`${n+1}. <@${x.user_id}> — ${x.coins} Orbs`).join('\n'):'Ainda não há registros.');} return i.reply({content:'Use `/orb saldo`, `/orb registrar`, `/orb historico` ou `/orb ranking`.',ephemeral:true}); }
  if(name==='saldo') return i.reply(`Você tem **${coins(g,u)} ${currency(g)}**.`);
  if(name==='trabalhar'){ ensure(g,u); const row=db.prepare('SELECT work_at FROM users WHERE guild_id=? AND user_id=?').get(g,u); if(row.work_at>Date.now()-3600000) return i.reply({content:'Você já trabalhou nesta hora. Tente novamente depois.',ephemeral:true}); const n=Math.floor(Math.random()*101)+50; db.prepare('UPDATE users SET work_at=? WHERE guild_id=? AND user_id=?').run(Date.now(),g,u); addCoins(g,u,n,'trabalho'); return i.reply(`Você trabalhou e recebeu **${n} ${currency(g)}**.`); }
  if(name==='daily'){ ensure(g,u); const row=db.prepare('SELECT daily_at FROM users WHERE guild_id=? AND user_id=?').get(g,u); if(row.daily_at>Date.now()-86400000) return i.reply({content:'Sua recompensa diária ainda não está disponível.',ephemeral:true}); const n=500; db.prepare('UPDATE users SET daily_at=? WHERE guild_id=? AND user_id=?').run(Date.now(),g,u); addCoins(g,u,n,'daily'); return i.reply(`Recompensa diária: **${n} ${currency(g)}**.`); }
  if(name==='ranking'){ const rows=db.prepare('SELECT user_id,coins FROM users WHERE guild_id=? ORDER BY coins DESC LIMIT 10').all(g); return i.reply('**Ranking**\n'+(rows.map((x,n)=>`${n+1}. <@${x.user_id}> — ${x.coins}`).join('\n')||'Ainda não há dados.')); }
  if(name==='pagar'){ const target=i.options.getUser('usuario'), n=i.options.getInteger('valor'); if(target.bot||target.id===u)return i.reply({content:'Escolha um membro válido.',ephemeral:true}); if(coins(g,u)<n)return i.reply({content:'Saldo insuficiente.',ephemeral:true}); addCoins(g,u,-n,`pagamento para ${target.id}`); addCoins(g,target.id,n,`pagamento de ${u}`); return i.reply(`Transferência concluída: <@${target.id}> recebeu **${n}**.`); }
  if(name==='loja'){ const rows=db.prepare('SELECT * FROM shop WHERE guild_id=?').all(g); return i.reply(rows.length?rows.map(x=>`**#${x.id} — ${x.name}**: ${x.price} ${currency(g)} — cargo <@&${x.role_id}>`).join('\n'):'A loja está vazia.'); }
  if(name==='comprar'){ const id=i.options.getInteger('id'), x=db.prepare('SELECT * FROM shop WHERE guild_id=? AND id=?').get(g,id); if(!x)return i.reply({content:'Recompensa não encontrada.',ephemeral:true}); if(coins(g,u)<x.price)return i.reply({content:'Saldo insuficiente.',ephemeral:true}); const role=i.guild.roles.cache.get(x.role_id); if(!role||role.position>=i.guild.members.me.roles.highest.position)return i.reply({content:'Não consigo gerenciar esse cargo. Coloque-o abaixo do meu cargo.',ephemeral:true}); addCoins(g,u,-x.price,`compra #${id}`); await i.member.roles.add(role); return i.reply(`Compra realizada: você recebeu ${role}.`); }
  if(name==='missoes'){ const rows=db.prepare('SELECT m.*,COALESCE(p.value,0) value,p.claimed FROM missions m LEFT JOIN progress p ON p.mission_id=m.id AND p.guild_id=? AND p.user_id=? WHERE m.guild_id=?').all(g,u,g); return i.reply(rows.length?rows.map(x=>`**#${x.id} ${x.name}** — ${Math.min(x.value,x.goal)}/${x.goal} — recompensa ${x.reward}${x.claimed?' (resgatada)':''}`).join('\n'):'Nenhuma missão cadastrada.'); }
  if(name==='ticket'){ const existing=i.guild.channels.cache.find(c=>c.name===`ticket-${i.user.username.toLowerCase()}`); if(existing)return i.reply({content:`Você já tem um ticket: ${existing}`,ephemeral:true}); const ch=await i.guild.channels.create({name:`ticket-${i.user.username}`.slice(0,90),type:ChannelType.GuildText,permissionOverwrites:[{id:i.guild.roles.everyone.id,deny:[PermissionFlagsBits.ViewChannel]},{id:u,allow:[PermissionFlagsBits.ViewChannel,PermissionFlagsBits.SendMessages]}]}); const row=new ActionRowBuilder().addComponents(new ButtonBuilder().setCustomId('close_ticket').setLabel('Fechar ticket').setStyle(ButtonStyle.Danger)); await ch.send({content:`Olá ${i.user}, descreva seu problema.`,components:[row]}); return i.reply({content:`Ticket criado: ${ch}`,ephemeral:true}); }
  if(name==='fechar') { if(!i.channel.name.startsWith('ticket-'))return i.reply({content:'Use este comando dentro de um ticket.',ephemeral:true}); await i.reply('Fechando ticket...'); return setTimeout(()=>i.channel.delete().catch(()=>{}),1000); }
  if(name==='limpar'){ const n=i.options.getInteger('quantidade'); await i.channel.bulkDelete(n,true); return i.reply({content:`${n} mensagens apagadas.`,ephemeral:true}); }
  if(name==='banir'||name==='expulsar'){ const target=i.options.getMember('usuario'), reason=i.options.getString('motivo')||'Sem motivo'; if(!target)return i.reply({content:'Membro não encontrado.',ephemeral:true}); if(name==='banir')await target.ban({reason});else await target.kick(reason); await log(i.guild,`${name} executado por ${i.user.tag} em ${target.user.tag}: ${reason}`); return i.reply(`Ação executada em ${target.user.tag}.`); }
  if(name==='avisar'){ const target=i.options.getUser('usuario'), reason=i.options.getString('motivo'); addCoins(g,target.id,0,`aviso: ${reason}`); await log(i.guild,`Aviso para ${target.tag} por ${i.user.tag}: ${reason}`); return i.reply(`Aviso registrado para ${target.tag}.`); }
  if(name==='configurar-log'){ const ch=i.options.getChannel('canal'); db.prepare('INSERT INTO config(guild_id,log_channel) VALUES(?,?) ON CONFLICT(guild_id) DO UPDATE SET log_channel=excluded.log_channel').run(g,ch.id); return i.reply(`Canal de logs definido: ${ch}.`); }
  if(name==='configurar-contador'){ const old=db.prepare('SELECT counter_channel FROM config WHERE guild_id=?').get(g)?.counter_channel; let ch=old&&i.guild.channels.cache.get(old); if(!ch) ch=await i.guild.channels.create({name:`👥 Membros: ${i.guild.memberCount}`,type:ChannelType.GuildVoice,permissionOverwrites:[{id:i.guild.roles.everyone.id,deny:[PermissionFlagsBits.Connect]}]}); else await ch.setName(`👥 Membros: ${i.guild.memberCount}`); db.prepare('INSERT INTO config(guild_id,counter_channel) VALUES(?,?) ON CONFLICT(guild_id) DO UPDATE SET counter_channel=excluded.counter_channel').run(g,ch.id); return i.reply(`Contador criado: **${ch.name}**.`); }
  if(name==='criar-recompensa'){ const nome=i.options.getString('nome'), price=i.options.getInteger('preco'), role=i.options.getRole('cargo'); db.prepare('INSERT INTO shop(guild_id,name,price,role_id) VALUES(?,?,?,?)').run(g,nome,price,role.id); return i.reply(`Recompensa **${nome}** criada por ${price}.`); }
  if(name==='criar-missao'){ const nome=i.options.getString('nome'), goal=i.options.getInteger('meta'), reward=i.options.getInteger('recompensa'); db.prepare("INSERT INTO missions(guild_id,name,goal,reward,kind) VALUES(?,?,?,?, 'messages')").run(g,nome,goal,reward); return i.reply(`Missão criada: **${nome}**.`); }
 } catch(e){ console.error(e); if(!i.replied&&!i.deferred) await i.reply({content:'Ocorreu um erro ao executar o comando.',ephemeral:true}); }
});
client.login(token);
