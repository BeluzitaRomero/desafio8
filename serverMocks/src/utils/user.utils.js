const { faker } = require("@faker-js/faker");
faker.locale = "es";

function generateUsers() {
  return {
    nombre: faker.name.findName(),
    email: faker.internet.email(),
    website: faker.internet.url(),
    imagen: faker.image.imageUrl(),
  };
}

module.exports = generateUsers;
