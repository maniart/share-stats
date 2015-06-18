#!/usr/bin/env node

var fs = require('fs');
var cheerio = require('cheerio');
var util = require('util');
var src = fs.readFileSync("./data/white-cop-grabs-black-tween-by-her-neck-and-slams-her-against-his-squad-car.mobile.html", "utf8");
var $ = cheerio.load(src);
// define window as empty object. cuz no browserz, and the script on page assumes it.
var window = window || {}; 
// inject a simple function to return the articles. otherwise `eval` return value is `undefined`.
// oh, and we were `eval`ing the wrong script tag.
var articlesFactory = $('script').eq(2).text().concat(' (function ret() { return window.mobilebeast2.data.articles; }())');
// fuck yes
var articles = eval(articlesFactory);
var shareStats = {};

articles.forEach(function(article) {
    shareStats[article['id']] = article['shares']; 
});


console.log(shareStats);

// example:
// console.log(shareStats['/content/dailybeast/articles/2015/06/16/white-cop-grabs-black-tween-by-her-neck-and-slams-her-against-his-squad-car']);

