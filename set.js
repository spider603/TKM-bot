const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiVUZoa2xNMHFUUFFEMjZMWHJ0ck55TWpJOFRVejZieUE5azR6c3UrUWNtUT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoicW9ZUFFtNktRUlM5UytScVh1cU5QM05ieWlvL3g0K09sR3luaW8xWGREWT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJBQVgyNmRjbkZ1V2NuN1BqK3RQR2lBbEtiZ2tJSkZlVDFqRXNSN0VPejA4PSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJMM1hnMjBWRXpLY2dWZi81Y0ZPSUxldDErSXZMZGxsSkdadExITXRkbVgwPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjZOa28vRmRER0tHLzlHNlNPNTBGSmQ0OGJ1MS9vbWRFZ1lPeXAzQ2w3MUE9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Im9zRmFyMDUxKzFBeHFOVVFFNnQ5Nm9SZnF1YTgzdmpUdTdsYUNJb3hqVkk9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQUhzQnRPa0xXTGdxUE1UMFZGWjh2b0FuY0cwSm1NVlBSM0ZFd1RqeHpXND0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTUdzSCtTQ29NbGk0aDEraFd0ZHgxVE5xY1kxQ1d6QTIrWlFDUjM1QitWND0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjhWdCsxZytjemRiaHp2Q295RkZDNHgwSDBHLzNXZEt1VTRsLzZtZnd1WVpwY1ltcnhMbDhocmtCNTZRVGw2MnJUVHpKMXArWGJheU0rVXZVcEVZbENBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTEyLCJhZHZTZWNyZXRLZXkiOiJ5c2tnd1pYMnlyamFmN0Y4b1RTT0x3RVAxZ2djN0RsRDllWmZNQ2VVUjlRPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJ3aDlkTktSTVRCcTk1QXR5NVdBRzBRIiwicGhvbmVJZCI6ImViZjM0YjQzLWZjZWEtNDllYS1iYjRlLTUzMTEwNTAzZTU0OCIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJGczQyN0FLVVFXYlpMK1U3eVVzUllzcUpVTFU9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiYW1ibUNKbmRTMkozY042NStuNDF5RUpzNGRJPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6Ik1RRkVNSlZDIiwibWUiOnsiaWQiOiIyNjM3ODE2ODY1Njg6MTNAcy53aGF0c2FwcC5uZXQiLCJuYW1lIjoiTGFkeWJ1ZyAgQWkifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ0pYazQ3d0hFS2FSaTdVR0dBUWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6ImtrT21uVk9kZ0grVmcrVlpDWFFUWDhoblNwaUpyVDRpWWptY2NZdEVCMlk9IiwiYWNjb3VudFNpZ25hdHVyZSI6Ik9pQW9nck4yRytyTS9qT2Q0bTJJR21rNUFHK2lSRkNOYkJrVE5nc3dXZW10bjNIWGFtSVJtTTg4WTh3RExQb05MUUFseFVaZ1BwOGNGNUt6cUNlRUJ3PT0iLCJkZXZpY2VTaWduYXR1cmUiOiIvSkgzQmdpREkxNFZSZ0RXNEdPS0RDZDZHcGlDL0wyT2h5eEphZGhTMEs0T08zMDI1SUNLRytUQXh2YVA3bjNUTU03eUhHOWEwYVgvNUltdVMxV3JEZz09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjI2Mzc4MTY4NjU2ODoxM0BzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJaSkRwcDFUbllCL2xZUGxXUWwwRTEvSVowcVlpYTArSW1JNW5IR0xSQWRtIn19XSwicGxhdGZvcm0iOiJzbWJhIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzIxOTQ0MjQzfQ==',
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
