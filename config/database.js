const mongoose = require('mongoose');

mongoose.connect(process.env.DATABASE_URL, {dbName: "PerScholas_Week14"});

const db = mongoose.connection;

db.on('connected', function () {
  console.log(`Connected to ${db.name} at ${db.host}:${db.port}`);
});
