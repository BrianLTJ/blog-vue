var fs = require('fs');
var path = require('path');
var marked = require('marked');
var yaml = require('yamljs');

var markfile = 'aa';

var filepath = path.join(__dirname,"posts","publish","hello-world.md");

markfile = fs.readFileSync(filepath,
    {flag: 'r+', encoding:'utf8'}
);

// console.log(markfile);

var metareg = new RegExp('^---\s*$([^]*)^---\s*$','m');
var meta = metareg.exec(markfile)[1];
var marktext = markfile.replace(metareg,"");
var metadata = yaml.parse(meta);
console.log(metadata);
console.log(marktext);

