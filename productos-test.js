const { faker } = require("@faker-js/faker");
faker.locale = "es";

async function renderProducts() {
  const products = [];
  while (products.length < 5) {
    const product = {
      title: faker.commerce.product(),
      price: faker.commerce.price(100, 10000),
      thumbnail: faker.image.imageUrl(100, 100, "", true, true),
    };
    products.push(product);
  }

  return products;
}
console.log(renderProducts());

module.exports = renderProducts;
