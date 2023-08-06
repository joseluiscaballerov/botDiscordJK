const { Client, Intents, MessageAttachment } = require('discord.js');
const { createCanvas, loadImage } = require('canvas');
const config = require('./config/config.js');
const TOKEN = config.token;

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_MESSAGES] });

// Mensaje de bienvenida que se enviará a los nuevos usuarios
const MENSAJE_BIENVENIDA = `
¡Hola! ¡Te doy la bienvenida :hugging:!

¡No olvides que no debes compartir el enlace al servidor para que nadie gente se una! :fire:

Disfruta y pásatelo bien con los de siempre!. :rocket:

Instagram ▶ https://www.instagram.com/joseluiscaballerow
X ▶ https://www.x.com/josecaballerow
`;

client.once('ready', () => {
  console.log(`Bot conectado como ${client.user.tag}`);
});

client.on('guildMemberAdd', async (member) => {
    // Crear una imagen personalizada con el nombre y el avatar del usuario
    const canvas = createCanvas(800, 200);
    const ctx = canvas.getContext('2d');

    // Fondo
    ctx.fillStyle = '#f1c40f'; // Color amarillo suave
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Avatar del usuario
    const avatarSize = 150;
    const avatarX = 20;
    const avatarY = canvas.height / 2 - avatarSize / 2;
    const avatar = await loadImage(member.user.displayAvatarURL({ format: 'png' }));
    ctx.drawImage(avatar, avatarX, avatarY, avatarSize, avatarSize);

    // Nombre del usuario
    ctx.fillStyle = '#000000'; // Color negro
    ctx.font = '40px "Segoe UI", sans-serif'; // Fuente Segoe UI (o elige una fuente bonita)
    ctx.textAlign = 'left';
    ctx.fillText(member.user.username, avatarX + avatarSize + 20, canvas.height / 2 + 15);

    // Crear una imagen adjunta con la imagen personalizada
    const attachment = new MessageAttachment(canvas.toBuffer(), 'bienvenida.png');

    // Enviar mensaje de bienvenida personalizado al usuario con la imagen adjunta
    member.send({ content: MENSAJE_BIENVENIDA, files: [attachment] })
        .then(() => console.log(`Mensaje de bienvenida enviado a ${member.user.tag}`))
        .catch((error) => console.error(`No se pudo enviar el mensaje directo a ${member.user.tag}. Error: ${error}`));
});

// Iniciar sesión en Discord con el token del bot
client.login(TOKEN);
