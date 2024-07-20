const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNkRTQnMwbmpvNXdHMkQxeStFTVRHM2ZPZngwTTNiV28xa2pNeDF2VmtXVT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiWURZeEdzSXhwQ1JKbzFkR0hKQnpaSWdxUkpxSGp2Q2w2OTNLL3hFbGF3TT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJHT2txODJjTWhhRjJvZ09McGlkLzZiMkpQd294Y2JvK1hweHZPbDNsbEVjPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJtMitFMGwyWWI5bUhqZ0w4QW45UU05V1JDODJnUXplT21Ib3ZXUUVQZXhBPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IklQRGJuZnVGNzQ2OXNmUExENHk0RmdQR0Z3MkpmTWE4QjlaajlJeGhRM1U9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IldNaEU2T0lra1A5cnd1WjQ2RDhBR2dML3RTY3E4UVdCcDFhMU9wUWxpeGs9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiOElveTRQeXd2NHFNQWFyL2tOWVVzRmVEeis2K1QyamtwcTV1SEdsMEdXQT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoia2s0cDVodUUyMVVDUTlVUVg4LzhGK0FLTkVGejNIZldrMDFlL211RHlWWT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkNoNXdMUXUxRnFYNGU3ZzB3TURwZmxqMXBTTjlpUXF1dTZJa2ZpK01vK2U3U2VUM21GR0M4bFlOQm03QXVDRzYyTmZ4MjV1MHJCYlRpMkFFVE5pSmhnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTMwLCJhZHZTZWNyZXRLZXkiOiJoRXFra0daLzFoTFh5b3g3SzdnMW81YWRrdjFiM1pqREJOQUNVd2xSYVI0PSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJseVl6OGVfVlFmaVlKblBYOHhFdmpnIiwicGhvbmVJZCI6IjQyNTVjNGQzLTE2ZjktNGEwZC05ZTdjLTMxZmRkYjUxN2IyMiIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJMWWxzTDBINlVxeUFnQStZRkptZHlUYkdldzA9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiU0t5VEFXUUFuQnB3YWFGYVkzYyt0dHBUOGZrPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IjY3S1g1NkM5IiwibWUiOnsiaWQiOiIyNjM3MTUyNzU2MTE6NjlAcy53aGF0c2FwcC5uZXQifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ011MXQ4VUJFS1hnN2JRR0dBVWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6ImZEeUlUR3NKdlROallpOHJkOG1VSGFyUVdpNHNlSkRib3dXMkVERzFoa2c9IiwiYWNjb3VudFNpZ25hdHVyZSI6IjBtakwzM09MM1pPcDhYN0o4a2xTQjJ2YSs0a0N0VXdGblZQdFI3eW5WU0VvZEMzbHZHb1VZdGhiUlZ1bGJVSVVmMGJqNk1rYkJxT0tkSlNXcHptZEJRPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJWYlQzcXcxaUw5SVpTMjB3TWxTbUhSdWs0VDZmNzJaQ2pGemQrZGxXdUN2MDRTVEI0QkZkN3VTaFpBZkdwM1BENllKNjlhdnhqUHpIWFFydmtxOEhoQT09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjI2MzcxNTI3NTYxMTo2OUBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJYdzhpRXhyQ2IwelkySXZLM2ZKbEIycTBGb3VMSGlRMjZNRnRoQXh0WVpJIn19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzIxNDYyODM0fQ==',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "Cod3Uchiha",
    NUMERO_OWNER : process.env.OWNER_NUM || "254728842688",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "non",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    BOT : process.env.BOT_NAME || 'TKM bot',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/e07a3d933fb4cad0b3791.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    //GPT : process.env.OPENAI_API_KEY || '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',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    TZ : process.env.TIME_ZONE || 'Etc/GMT',
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    BOOM_MESSAGE_LIMIT : process.env.BOOM_MESSAGE_LIMIT || 100,
    PORT : process.env.PORT || 8000,
    LINK : process.env.LINK || '',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://tkm:Aqi6tqwyv5IwDHncTtVi5XtMGZvfndDJ@dpg-cqahogtds78s739sl81g-a.oregon-postgres.render.com/takudzwa" : "postgresql://tkm:Aqi6tqwyv5IwDHncTtVi5XtMGZvfndDJ@dpg-cqahogtds78s739sl81g-a.oregon-postgres.render.com/takudzwa",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`update ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
