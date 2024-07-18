const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiSUZhTkR1LzNiY05TTFozcXdhODRUYTNleUdJeGlrTTN4djlLMmFEMnhrUT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiSzduckcwektveitiQ1JWeU83TkVEaDZTOHBtQUd3d1dHMUJ5OVVEL0NWRT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJnRGNhZkJ3TVZvYVJvSzFLNlFOdG9tN2Joc2xBSkRlWUN2NXUvcUFVSkVBPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJrVTNudmw4V3dQTHV3SGtOSmZxbDRFMWVFOEg2Tm9mNnBSRzNHTG1lelhVPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InFPZmdJbzdGbTcvem4xeHl3OUl3Tk0wcGNSejFvOGxHemVvcHZ6WjFOMWc9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IllFcFgxcXJLQWtQVytuREhRTFZUNWRWUzh1cndYZDhXbmpyQ2cyTlJOMGc9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoid0V3Ny9ERURoSmRlcDF5aU9wR3F5QlFyR3g3WVEyNjNLT1FlNHd2dWZFVT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiSzh4Z2UyTVVJSXBJTmJMNnkzaTZobzVLdnRZVzdtL3NmdlFJZy9MMVVrWT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ik05L1hCdjk0dERDc3VaYlI0N3Q5VmVrWlBCeENDd096UjU0TWdZR1h4aDBQbXlreFV5REhjaFB6R0JCMmM3WWcvVllQMjBhc2FkekMvaEJ3ZFl1ekFBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjMwLCJhZHZTZWNyZXRLZXkiOiJVNGdLT2VLdWppcGpGUkVFb21OWExiWVdjOEVVaTRwVEJ6SVl0UlFoLzFNPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJTQTlkdF85dFRONjZSSXpHOWFtRmdRIiwicGhvbmVJZCI6ImUwYTdlYTZjLTFjMGYtNDkzMS1hMzQ4LTFlYTY4MDczOTJhMSIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJoZkM2V2Z6Z0tOUzVXYnRtODBSRXhMTE53alE9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTlZycHdib2J2OW8wY00yUFpkbEhzTUtVdUNrPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IjQ0NVI1OUU5IiwibWUiOnsiaWQiOiIyNjM3ODE2ODY1Njg6OUBzLndoYXRzYXBwLm5ldCJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDTmU4LzdRRUVQdVg1clFHR0FRZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiRjlRYjVlTng4MmtVNlg2VExXbGdPR21vcS96NzZlK1RrdGVXNzZFUmwxWT0iLCJhY2NvdW50U2lnbmF0dXJlIjoicTJhZUpGVityK1hKUVRITkZPckkzWTg2UC9WeElpNlpsSWFaM1BoNmJVOVBjNkcrdW1vR0s0eVJVZDhBay9Pem5SdTFINSt6Tk5Oa3p3NmRNdm1tQUE9PSIsImRldmljZVNpZ25hdHVyZSI6IkdnajBoS1NMSmxZWlkvVk40MjYrT2c3VVRWa0YyRlc3TWZMVkNWaUpab0RiMzl0UitnV2Jrb0lhSWFSSHZHVTRnV05xNFhVWk11Q0ppSHdZUXdoREJBPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjYzNzgxNjg2NTY4OjlAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCUmZVRytYamNmTnBGT2wra3kxcFlEaHBxS3Y4Kytudms1TFhsdStoRVpkVyJ9fV0sInBsYXRmb3JtIjoiYW5kcm9pZCIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTcyMTMzODg5M30=',
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
