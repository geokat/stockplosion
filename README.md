# Stockplosion

[![Build Status](https://travis-ci.org/geokat/stockplosion.svg?branch=master)](https://travis-ci.org/geokat/stockplosion.svg?branch=master)

A small single-page React.js app using D3 for visualization.  The app
has no back-end and can be served from a static web server (or run
from the file system). To see it in action, visit
[http://geokat.github.io/stockplosion/](http://geokat.github.io/stockplosion/).

## Running/testing

Clone this repository into a directory, `cd` into it and run the following commands:
```
npm install
npm test
npm start
```
The app will be available on [http://localhost:3000/](http://localhost:3000/).

## Continuous development

Clone the repository and run:
```
npm install
npm run webpack-server
```
Visit [http://localhost:3000/webpack-dev-server/](http://localhost:3000/webpack-dev-server/).

## Release

To prepare the app for release, run
```
npm run release
```
Copy the files from the `dist` directory to a web server.
