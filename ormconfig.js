module.exports = {
    "type": "sqlite",
    "database": 'database.db',
    "synchronize": true,
    "logging": true,
    "dropSchema": true,
    "entities": ["models/*.ts", "models/*.js"],
    "cli": {
      "entitiesDir": "models",
    }
};