const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const puppeteer = require('puppeteer-core');  // pastikan puppeteer-core digunakan

const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        executablePath: '/usr/bin/chromium-browser', // pastikan path ke chromium sesuai
        headless: true,  // set headless mode
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    }
});

client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('Client is ready!');
});

client.on('authenticated', (session) => {
    console.log('Authenticated!');
});

client.on('message', async (message) => {
    if (message.body === 'halo') {
        await message.reply('Halo, apa kabar?');
    }
});

client.initialize();
