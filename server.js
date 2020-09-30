const Discord = require("discord.js");
const client = new Discord.Client();
client.on("ready", () => {
  console.log("Logged in as");
  console.log(client.user.username);
  console.log(client.user.id);
  console.log("------");
  console.log("Online!");
  client.user.setStatus("online");
  client.user.setActivity("your status");
});

client.on("message", msg => {
  if (msg.content === "!help") {
    msg.reply(
      "Hello, Help is here! Commands:!ping,!kick @user,!ban @user,!avater,!creators and !servercount!"
    );
  }
});

client.on("ready", () => {
  console.log("Online");
});
client.on("message", msg => {
  if (msg.content === "!ping") {
    msg.reply("Pong!");
  }
});
client.on("guildMemberAdd", member => {
  const channel = member.guild.channels.cache.find(
    channel => channel.name === "welcomes"
  );
  if (!channel) return;
  channel.send(`Welcome to the server, ${member}`);
});
client.on("message", message => {
  if (!message.guild) return;

  if (message.content.startsWith("!kick")) {
    const user = message.mentions.users.first();
    if (user) {
      const member = message.guild.member(user);
      if (member) {
        member
          .kick("Optional reason that will display in the audit logs")
          .then(() => {
            message.reply(`Successfully kicked ${user.tag}`);
          })
          .catch(err => {
            message.reply("I was unable to kick the member");
            console.error(err);
          });
      } else {
        message.reply("That user isn't in this guild!");
      }
    } else {
      message.reply("You didn't mention the user to kick!");
    }
  }
});
client.on("message", message => {
  if (!message.guild) return;

  if (message.content.startsWith("!ban")) {
    const user = message.mentions.users.first();
    if (user) {
      const member = message.guild.member(user);
      if (member) {
        member
          .ban({
            reason: "They were bad!"
          })
          .then(() => {
            message.reply(`Successfully banned ${user.tag}`);
          })
          .catch(err => {
            message.reply("I was unable to ban the member");
            console.error(err);
          });
      } else {
        message.reply("That user isn't in this guild!");
      }
    } else {
      message.reply("You didn't mention the user to ban!");
    }
  }
});
client.on("message", message => {
  if (message.content === "!avatar") {
    message.reply(message.author.displayAvatarURL());
  }
});
client.on("message", msg => {
  if (msg.content === "!servercount") {
    msg.reply("I am currently in 1 server!");
  }
});
client.login("token");
