require('dotenv').config({ path: `${__dirname}/../variables.env` });
const fs = require('fs');
const mongoose = require('mongoose');

mongoose.connect(process.env.DATABASE, {
  useNewUrlParser: true,
  useCreateIndex: true,
});

const User = require('../models/user.model');
const Challenge = require('../models/challenge.model');

const users = JSON.parse(fs.readFileSync(`${__dirname}/users.json`, 'utf-8'));
const challenges = JSON.parse(fs.readFileSync(`${__dirname}/challenges.json`, 'utf-8'));

async function deleteData() {
  console.warn('⚠️ Data being deleted from database');

  await User.deleteMany();
  await Challenge.deleteMany();

  console.log('✅ Data has been deleted');
  process.exit();
}

async function loadData() {
  try {
    console.log('♻️ Clearing database for seed')

    deleteData();

    console.log('🌱 Seeding data into database');

    await User.insertMany(users);
    await Challenge.insertMany(challenges);

    console.log('✅ Data has been seeded');
    process.exit();
  } catch (e) {
    console.log(e);
    process.exit();
  }
}

if (process.argv.includes('--delete')) {
  deleteData();
} else {
  loadData();
}
