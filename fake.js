const _ = require('lodash');
const faker = require('faker');
const fs = require('fs');

const DATA_COUNT = 30000;

const books = _.times(DATA_COUNT, () => ({
  id: faker.random.uuid(),
  title: faker.name.title(),
  description: faker.lorem.lines(2),
  img: faker.image.abstract(480, 600),
  author: `${faker.name.firstName()} ${faker.name.lastName()}`,
  url: faker.internet.url,
}));

const dataToWrite = JSON.stringify({
  books,
});

fs.writeFileSync('./db.json', dataToWrite);

