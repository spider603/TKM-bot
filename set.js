const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoia0Y2cEZvcmFDOXQ2YmJ1b0I1c1NsdXZxMHQwN3dER0tPdVNsS1JnTWMwZz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMWxRMGVtWDJmcjh3TTdCbFBBUno5dmozODJUYzRKdmpMUFBtZmJJMlMxaz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJXR3JYaUhWT0wvRitQSE43SmpHT1NDSjMxY1FtL29BQ3VRK0M4bmFsa1Y0PSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJTWWVZOXRwTktHZVJnOVBxOWJ4bGhrdlBVY1hCVTRBcWtkdUk1T25FL0c0PSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImNPZGpXUG1maEZrcmRBWDZuUVlQdWxNRzNIZnhtbHRnaDAzQitRZXc4azg9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjdpWlJqbkRKYm9mNHBHT2V0OURlL05rN0RnRXlFVlFNQi9CNVVWZjh5Z2M9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoic05SRUw5Zm45MlVwVUYybGs4ZzAzVXRMdjhOT3pPK0o0YmJsUTFkcGswUT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoidDNVaHROOVRIRDBPNDNTdzBTemVUTHJXWWdPMWhadFhybEJEKzlWMzRIaz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Im9xdy9IbzJEeVlqNXlidWcxc0JDRWRnNG5zUVcvdkpkQVI2WG8xcnhiR0o5b2NIdDVQMzRiWCtGenduQVFOQk1sRERrVmRObVhIMnk3T0s5Q0xWRkF3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTQsImFkdlNlY3JldEtleSI6ImVOWExZMUlqbmM4Z0d0eXdTc0VpVkJ6bG9Xc1pUYUlaa3ZCdk1vR3FPZDA9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbXSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6IjJiYkg2OXpIUkZLalJWZ3NrWHJ5NVEiLCJwaG9uZUlkIjoiZjE1MDk4ZDYtOTIyYy00NjY5LWE0MzYtOGNiZGNmOGU4M2I2IiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImZtMlZHbFRmekI1M2xZMFhyNmxlM1dHOHlnUT0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI3Rk5ocVZFa0ZyNjIwenRyUGs1czBOdEYzRWc9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiWU5HTTc0NUUiLCJtZSI6eyJpZCI6IjI2Mzc4MTY4NjU2ODoxMUBzLndoYXRzYXBwLm5ldCIsIm5hbWUiOiJMYWR5YnVnICBBaSJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDSlhrNDd3SEVKV2hnN1VHR0FJZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5Ijoia2tPbW5WT2RnSCtWZytWWkNYUVRYOGhuU3BpSnJUNGlZam1jY1l0RUIyWT0iLCJhY2NvdW50U2lnbmF0dXJlIjoiSStnTkxBRUlBNmtpTm9JTGxaZ1RMQUc4ZTBkQ3ZxR0doRTRnblZDN3lVZ2RmVHJva2lXbnBOWFhrQkMwemZGQzgyTmRvUDNkYW1GVHhQSHpMYmNYQnc9PSIsImRldmljZVNpZ25hdHVyZSI6IndLcDg5ZmZiRGZ0QUVpdWw5aVZ6aStHdVpzeEVVV2RVTXRvN3RyUGNyUzJiajZDQVhHa05QYjNVRmFmMmFaZ3NSZWxOY3VxdkZlNW04dWROQzN5UEJnPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjYzNzgxNjg2NTY4OjExQHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQlpKRHBwMVRuWUIvbFlQbFdRbDBFMS9JWjBxWWlhMCtJbUk1bkhHTFJBZG0ifX1dLCJwbGF0Zm9ybSI6InNtYmEiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3MjE4MTUyMDJ9',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "Cod3huchiha",
    NUMERO_OWNER : process.env.OWNER_NUM || "254728842688",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "non",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    BOT : process.env.BOT_NAME || 'TKM bot',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/e07a3d933fb4cad0b3791.jpg',
    MODE: process.env.PUBLIC_MODE || "no",
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    //GPT : process.env.OPENAI_API_KEY || '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',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    TZ : process.env.TIME_ZONE || 'Etc/GMT',
    ADM : process.env.ANTI_DELETE_MESSAGE || 'yes',
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
