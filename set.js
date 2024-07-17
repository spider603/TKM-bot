const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiRURRbEthSnIxKzlWUFp0OVFiRmpuVy84OUNwVGRQREsvSHgzd0ZTZVpIdz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTWVOaThQclRoYis2cGFGdkNDQUhlb2VQNWRPYmxzeW9SZHVWektRZXF5Zz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJxTlBpY2pYekZHL2pLbWJnNjhhNXdJbGZ0a0lFQlRNS2FEVkg3ZDlsTWxrPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJXT002K3RhZ1I3ZThLM052QmhMR2ptalViT1VFRHFiY3NmQ0k0dGxwcDNVPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjRIQ2w3OWQ0QzZQTHUyUmlsVVJmZ0hNNnBHU29uRWJraTV0WmFCL05lRzA9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImZ6WElNMUFpaDFqOTFUL3QvS29iRGV0U0Q4VkhrSWFJdWl1dXIydGxLUTQ9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMk1tdDNaTG5BVzJDa0Y1N21qMnhqU215VW5KcndvWHdMbWZ0TFZnZGVXND0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiSW9JSHVjSmVYUUh2SFFCZllidmVoZG02T0xWd2wvenFwZVczZU1XdlNnND0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IndaUUpNYk43Wm5uYmZ4dGJtM2l6R1E2UWk2TGRuRHZWbHFLZ3NBWWpxc3RwNWtwSENlb1JBSmxtNC90ZkVvem80T0pzQzFVYkZmbWVBZjFWUU1LVWlnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjIzLCJhZHZTZWNyZXRLZXkiOiJFWEZuMDBYS2psY2hXcWRQMDhoSUxHQm41ZXhoeERqU1I1R1FjbXdNUVVBPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJfU0NwZkZ0QVJWYVR0cHRudU1sbDZRIiwicGhvbmVJZCI6IjE2OTM2NTQ4LTIxOTktNGQ5Mi1hNGE0LTg0Y2Y3OWNhNmUxZiIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJPZG9tWVFJNlhpdFNkS1RoLy9PajZweWcrNjA9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoibjd5aGpoRUVlTWo3RFVoU0orSkdIT3lUNGUwPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IkFLOFQ2RTNFIiwibWUiOnsiaWQiOiIyNjM3MTUyNzU2MTE6NjBAcy53aGF0c2FwcC5uZXQifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ01hMXQ4VUJFS2VoNGJRR0dBSWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6ImZEeUlUR3NKdlROallpOHJkOG1VSGFyUVdpNHNlSkRib3dXMkVERzFoa2c9IiwiYWNjb3VudFNpZ25hdHVyZSI6IlRtMk8zK1lRbi80YjEwdmNZd1hsS0ZtQzhodS9CYTFaR2VuUXYyZEUzWHhJRVRyRDF6dlV2WDlTQXlyMXFmMlFMa0tLV1ZaVzVnVEhGM0JUdnVXeEJnPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJJYWYxY056WmtERjdpMzc0MUNOaThndGJqNFAwRk5CS2NKcjllU3laTE10aXo4VHhna0ZwLzhjTU11TkR0SUlYdDJCN2Z3Kzl3MlJ2RTd6T243QnZoQT09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjI2MzcxNTI3NTYxMTo2MEBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJYdzhpRXhyQ2IwelkySXZLM2ZKbEIycTBGb3VMSGlRMjZNRnRoQXh0WVpJIn19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzIxMjU4MTc0fQ==',
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
