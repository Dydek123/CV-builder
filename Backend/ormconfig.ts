require('dotenv').config();
export default {
   "type": "postgres",
   "host": process.env.HOST,
   "port": process.env.DBPORT,
   "username": process.env.USERDB,
   "password": process.env.PASSWORD,
   "database": process.env.DATABASE,
   "synchronize": true,
   "logging": false,
   "ssl": true,
   "extra": {
      ssl: {
         rejectUnauthorized: false,
      },
   },
   "entities": [
      "entity/**/*.ts"
   ],
   "migrations": [
      "migration/**/*.ts"
   ],
   "subscribers": [
      "subscriber/**/*.ts"
   ],
   "cli": {
      "entitiesDir": "entity",
      "migrationsDir": "migration",
      "subscribersDir": "subscriber"
   }
}