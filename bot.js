const { Client, GatewayIntentBits, ActivityType, EmbedBuilder } = require('discord.js');
const { token, prefix } = require('./config.json');
const express = require('express');
const { sendWelcomeMessage } = require('./welcome.js'); // Import sendWelcomeMessage

// Setup Discord client
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers
  ]
});

// Express server setup
const app = express();
const port = process.env.PORT || 3001;

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.send('Welcome to Nebula Host Bot!');
});

app.use((req, res) => {
  res.status(404).send('404: Page Not Found');
});

app.listen(port, () => {
  console.log(`Web server running on port ${port}`);
});

client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);

  client.user.setPresence({
    activities: [{ name: 'with bots', type: ActivityType.Playing }],
    status: 'dnd'
  })
  .then(() => console.log('Custom status set to DND'))
  .catch(error => console.error('Error setting custom status:', error));
});

client.on('messageCreate', async (message) => {
  if (message.author.bot) return;
  
  // Ensure the message starts with the correct prefix
  if (!message.content.startsWith(prefix) || message.content.length < prefix.length) return;

  console.log(`Message received: ${message.content}`);

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  if (command === 'info') {
    const embed = new EmbedBuilder()
      .setTitle('Bot Info')
      .setDescription('This bot provides hosting services for other bots.')
      .setColor('#00FF00');
    await message.channel.send({ embeds: [embed] });
  }

  if (command === 'sethost') {
    if (args.length < 1) {
      const embed = new EmbedBuilder()
        .setTitle('Error')
        .setDescription('Please provide a URL or bot info to host.')
        .setColor('#FF0000');
      return await message.channel.send({ embeds: [embed] });
    }

    const urlOrBot = args.join(' ');
    const embed = new EmbedBuilder()
      .setTitle('Success')
      .setDescription(`Hosting setup for ${urlOrBot} is being processed.`)
      .setColor('#00FF00');
    await message.channel.send({ embeds: [embed] });
  }

  if (command === 'credits') {
    const embed = new EmbedBuilder()
      .setTitle('Bot Credits')
      .setDescription('This bot was developed by **24k_onlyy**.')
      .addFields(
        { name: 'Developer Rank', value: 'Bot Development', inline: true }
      )
      .setColor('#FFD700');
    await message.channel.send({ embeds: [embed] });
  }

  if (command === 'ping') {
    const embed = new EmbedBuilder()
      .setTitle('Pong!')
      .setDescription('The bot is responsive.')
      .setColor('#00FF00');
    await message.channel.send({ embeds: [embed] });
  }
});

client.on('guildMemberAdd', member => {
  sendWelcomeMessage(member, client);
});

// Login to Discord with error handling
client.login(token).catch(error => {
  console.error('Failed to log in:', error);
});
