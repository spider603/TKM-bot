const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZUhkMlZaZ0VhYnJ5dWxTcXNETCtyaXNxQlQrWGI0RkNOOE1xYmhLeWhtZz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiWDhqU05IbTFXTUVndTZVbURyd2pwOHBQSTlIb3pCcmVLU2JJZWVocEttRT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ5RDVVNWVjczdLbmUzeHlPeHFaYzdjK0ZCalVMZDdIT2hVdFFqdzhSbVYwPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI4clh4N3hTaWc3VStjTGFXYzMrRGxoTU8xY3lhQlJOdjdWL3htTTVaeENvPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkNDcVk1WE9KcnZLbGxhaWc0akVqQ3Q5V2RQbFVBSlNGV2lRUXRzaFdObUU9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImRGeHBCa21lejVldTEzU1BjcnRBNklvalo1RXFXMEhnSjROWTNkQTlKR1U9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiYUI0bUVuWjNKWTVyajluRGQwSllweVFENFFxQXRaYjc4ZWV1Vms5cDltQT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiVkdzNDJxc2dxQUI3SWovL1hKQy9SdnpvM29lQ0t2QWRQcHFLZkpiYXpHMD0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ii9QS095V2lpV2VRUTZ1S0pwZzNtT2pVaU9wZEFkVE94WFJiNXRhUUYwRGd6RHVSN0g2b01pOG9GbjdvbGV3Zk80QUVrUGJDd3VtS0N1amtxZUtoTmhBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6NTcsImFkdlNlY3JldEtleSI6InhsQVVHSXRqcWtDMFZkR0wvVTZJRXN3RTdlQVZwV0p4Y3JPTkpEd2V6WnM9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbXSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6ImlHeVJONm54U25HUG9iNW8xMWVVNUEiLCJwaG9uZUlkIjoiZWQ4ZTMyM2ItMGE5NS00OTJlLWJjZTYtN2E2NzUyZTM0YjJjIiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlNjazh1dGNZRURPTTlLTUJoN1hDTjFoTmdJWT0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJBMVRlYlVMZWhVVUczbTA2OWRDMU1qbDBETTg9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiUEwyTVBWNVoiLCJtZSI6eyJpZCI6IjI2Mzc4MTY4NjU2ODoxMEBzLndoYXRzYXBwLm5ldCIsIm5hbWUiOiJTdWJ6ZXJvdjEifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ0pYazQ3d0hFT2JSOHJRR0dBRWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6ImtrT21uVk9kZ0grVmcrVlpDWFFUWDhoblNwaUpyVDRpWWptY2NZdEVCMlk9IiwiYWNjb3VudFNpZ25hdHVyZSI6Ii92V2pnajlkeUViaG5OUGNQejNJdFA1MFA1QXZCaU92L3k5MlFkNjdGVXhQemZLL044Yzl0STJJbWd2SmhWUlpIS3h1Q0dIWXg1Qmx3bFVnQ2hibERnPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJ4dlVIR092UlBCejZ4MW42VUpzYUJ4T2ZRQWdrcWNnTERYU29sdXZ0SUNKNTNUMFp2b09GNzlKbkp3MDVuZEphREFldHVVWTFzdkVYdW5ETnNKS21qUT09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjI2Mzc4MTY4NjU2ODoxMEBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJaSkRwcDFUbllCL2xZUGxXUWwwRTEvSVowcVlpYTArSW1JNW5IR0xSQWRtIn19XSwicGxhdGZvcm0iOiJzbWJhIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzIxNTQyOTAyfQ==',
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
