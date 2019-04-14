/*
  File used for any data or functions that need to be accessed globally
*/

const fs = require('fs');

// Used for displaying SVG's in the layout
exports.icon = name => fs.readFileSync(`./public/images/icons/${name}.svg`);

// Site wide details
exports.siteName = 'Challenger';
