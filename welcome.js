const welcomeMessage = `
Hey @{{user}}, welcome to **Nebula Hosting Tools • 24/7 • Free Host For Discord Bots!**
•  We're thrilled to have you here. Get ready to explore our fantastic hosting services, available 24/7, and the best part is, it's all for free!
•  Now you can easily host your Discord bots with us and take your server to the next level. Experience seamless bot hosting with Nebula Hosting Tools.
•  Should you need any assistance or have any questions, feel free to reach out to our support team. We're here to help! Check out ⁠**<#1284680816126988379>**.
`;

const sendWelcomeMessage = async (member, client) => {
  const welcomeChannel = member.guild.channels.cache.find(
    channel => channel.name === 'welcome'
  );

  if (!welcomeChannel) {
    console.error('Welcome channel not found.');
    return;
  }

  const personalizedWelcomeMessage = welcomeMessage.replace('{{user}}', member.user.tag);
  try {
    await welcomeChannel.send(personalizedWelcomeMessage);
    console.log(`Sent welcome message to ${member.user.tag}`);
  } catch (error) {
    console.error('Failed to send welcome message:', error);
  }
};

module.exports = { sendWelcomeMessage };
