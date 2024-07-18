const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoia1A4Rmg3TkdZcmYxMElrb1V4M25DSlJYV0twbUFidGQycWlrV1k1UnptQT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiUkRwZk05dm1nRmFiZ1g4d0Q0MnhvbW1SWUcvRUQ2emQ4dWQxZ0RKWVBRZz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI4UEpqcTl3RGJBQS9aU2lzRXpUaUxCWmljd2hSQjZ6OUhta0ZKMHRhT0VBPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJPNDJSZEJZRGVGbmwwNkRMSVVsdDFSVTYyWHZnZlJUOElOTDJzTU5IekJ3PSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IklKKzVoN3FhcG04ZnZxcFZjemM3ejhvV0VBdWZNRFI1QjBZejFLNkpZMUE9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InZEQ3FYakMydWw2QmU4L2NTTitEelExNzFNbkNYckVLQmFhSW5ISThxemc9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoicUphUnRMZmx6ZTRhT1haZVBUVTVRaEJWblk4SmFwUG52M01kQ2VFVEoxaz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiS3p5RVVwVUE1eFNjTkt1bCtIL1VFZnMxajV0YVByd2wramFYRWpCaG8xTT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImZBSnl0OW0xWmRpL3RSRSttTjE1N0tKaXNYZWo3RFU3QmpGQ0d2UW5ocTMycHlKcTRNRTU4R1VXR0tmSnFDUGxnSndBNDM1c2xzLy9qS1Vta0QyUGpnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjQ3LCJhZHZTZWNyZXRLZXkiOiIxVDNtQUoyY3hjRVA2NWZtNjhYSHk2TjdFNlFYNC9pbjMzUzZiRk1PWGtBPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJJOTdkNjV5TlNFV01hMEFOQWN6LVp3IiwicGhvbmVJZCI6ImQxMDhkMGRjLWIxOTYtNDlmZS1iNWU4LThkMzg3NzQ2YjA2ZiIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI4QnBKcWNLUk4rQkpPb2N3S2ZMREVTM2tYOHc9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQzdwMDBpOXVxNFRSdnRTdDBSTHRyU0dqYm1NPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6Iko0RUtXTDNaIiwibWUiOnsiaWQiOiIyNjM3Nzk0MjQzNDI6MTVAcy53aGF0c2FwcC5uZXQifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ08vUzhxc0hFUERNNWJRR0dBWWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6ImgxUEQ5ZUF6dXpEd2FrVDl6QkVGZUJVUGMyNWNXR0lBeDJyTERDZ2J6VTQ9IiwiYWNjb3VudFNpZ25hdHVyZSI6Ino4TlRVd0VVMjZaVE9GQTg4V2RlbncxY24xbFNUakF3QURsU25GbDUrc085SVoyQWJsREU0NEZOSGxYbDZDS05NRnpnK2V1Q2xTdGpiaXlUVVhjWkNBPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJRemJBc1R2dXZVWjdEbS80ZmEwWkRuUXZSaldpeDAvNDhBTzJnaER3eEtSQXhpM2tsaG16RDBoZWlYcndkRDN1OXN1Q2hiWFk5OENlWUQrSnhPalRqUT09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjI2Mzc3OTQyNDM0MjoxNUBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJZZFR3L1hnTTdzdzhHcEUvY3dSQlhnVkQzTnVYRmhpQU1kcXl3d29HODFPIn19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzIxMzI5Mjc3LCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQUdkKyJ9',
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
