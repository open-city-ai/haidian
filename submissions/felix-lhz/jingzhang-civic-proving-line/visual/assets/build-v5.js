const { build } = require('./build-v4');

build().catch((error) => {
  console.error(error);
  process.exit(1);
});
