const Discord = require('discord.js');
const Docker = require('dockerode');

const bot = new Discord.Client();
const docker = new Docker();

const PREFIX = '!';

bot.on('ready', () => {
  console.log('Bot is online!');
});

bot.on('message', (message) => {
  if (message.author.bot) return;
  if (!message.content.startsWith(PREFIX)) return;

  const args = message.content.slice(PREFIX.length).trim().split(' ');
  const command = args.shift().toLowerCase();

  if (command === 'startcontainer') {
    startContainer(message);
  } else if (command === 'stopcontainer') {
    stopContainer(message);
  }
});

function startContainer(message) {
  const containerName = 'mcserver';
  const container = docker.getContainer(containerName);

  container.start((err) => {
    if (err) {
      message.channel.send(`Failed to start container: ${err.message}`);
    } else {
      message.channel.send(`Container ${containerName} started successfully!`);
    }
  });
}

function stopContainer(message) {
  const containerName = 'mcserver';
  const container = docker.getContainer(containerName);

  container.stop((err) => {
    if (err) {
      message.channel.send(`Failed to stop container: ${err.message}`);
    } else {
      message.channel.send(`Container ${containerName} stopped successfully!`);
    }
  });
}

bot.login('token');
