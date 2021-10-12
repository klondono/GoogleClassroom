// Support storing environment variables in a file named "testenv"
const path = require('path');
const dotenv = require('dotenv');
const fs = require('fs');

console.log('fs', fs);
console.log('dotenv', dotenv);
console.log('path', path);


// Read environment variables from "testenv". Override environment vars if they are already set.
const TESTENV = path.resolve(__dirname, '..', 'testenv');

if (fs.existsSync(TESTENV)) {
  const envConfig = dotenv.parse(fs.readFileSync(TESTENV));
  Object.keys(envConfig).forEach((k) => {
    process.env[k] = envConfig[k];
  });
}

const env = {};

// List of environment variables made available to the app
[
  'GOOGLE_CLIENT_ID'
].forEach(function (key) {

console.log('key', key);

  if (!process.env[key]) {
    throw new Error(`Environment variable ${key} must be set. See README.md`);
  }
  env[key] = JSON.stringify(process.env[key]);
});

module.exports = {
  chainWebpack: config => {
    config
      .plugin('define')
      .tap(args => {
        const base = args[0]['process.env'];
        args[0]['process.env'] = {
          ...base,
          ...env,
        };
        return args;
      })
  },
  runtimeCompiler: true,
  publicPath: process.env.NODE_ENV === 'production' ? '/' : '/'
}
