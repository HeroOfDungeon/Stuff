const { Client, GatewayIntentBits } = require('discord.js');
require('dotenv').config();

const channel_id = "1243869409265844277"
const correct_content = ["#uselessstory", `<#${channel_id}>`]
const message_delete_delay = 60000 // Messured in ms

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

client.on('ready', () => { // Notify that the bot is running
    console.log(`Logged in as ${client.user.tag}`);
});

client.on('messageCreate', async message => {
    if (message.channelId != channel_id) return; // Skip messegas not sent in the correct channel
    if (message.author.bot) return; // Skip messages from bots

    if (!correct_content.some(word => message.content.toLowerCase().includes(word))) { // Check if none of the correct words are in the message
        const msg = await message.reply({ // Reply with message
            content: `Remember to add \`#uselessstory\` to your message!\n-# This message deletes itself in 2 minutes`
        });

        setTimeout(() => { // Delete after 5000ms
            msg.delete().catch(console.error)
        }, message_delete_delay);
    }
});

client.login(process.env.TOKEN);
