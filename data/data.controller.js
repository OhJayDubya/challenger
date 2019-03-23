require('dotenv').config({ path: `${__dirname}/../variables.env` });
const fs = require('fs');
const mongoose = require('mongoose');

mongoose.connect(process.env.DATABASE, {
  useNewUrlParser: true,
  useCreateIndex: true,
});

const User = require('../models/user.model');

const users = JSON.parse(fs.readFileSync(`${__dirname}/users.json`, 'utf-8'));

async function loadData() {
  try {
    console.log('🌱 Seeding data into database');

    await User.insertMany(users);

    console.log('✅ Data has been seeded');
    process.exit();
  } catch (e) {
    console.log(e);
    process.exit();
  }
}

async function deleteData() {
  console.warn('⚠️ Data being deleted from database');

  await User.remove();

  console.log('✅ Data has been deleted');
  process.exit();
}

if (process.argv.includes('--delete')) {
  deleteData();
} else {
  loadData();
}
