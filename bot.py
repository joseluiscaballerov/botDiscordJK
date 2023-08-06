import discord

intents = discord.Intents.default()
intents.members = True
intents.messages = True  # Añade esta línea para la intención de mensajes

client = discord.Client(intents=intents)

# Token de tu bot proporcionado por Discord Developer Portal
TOKEN = ''

# Mensaje de bienvenida que se enviará a los nuevos usuarios
MENSAJE_BIENVENIDA = "¡Hola! Bienvenido/a al servidor. Esperamos que te diviertas aquí."

@client.event
async def on_ready():
    print(f'Bot conectado como {client.user}')

@client.event
async def on_member_join(member):
    try:
        # Envía el mensaje de bienvenida al usuario
        await member.send(MENSAJE_BIENVENIDA)
    except discord.Forbidden:
        # Si el bot no tiene permiso para enviar mensajes directos al usuario, manejar el error
        print(f"No se pudo enviar el mensaje directo a {member.name}")

# Ejecutar el bot
client.run(TOKEN)
