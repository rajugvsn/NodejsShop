var Category = require('../../models/category');

var mongoose = require('mongoose');
mongoose.connect('localhost:27017/nodejsshop');

var categories = [
  new Category({
    categoryId:1,
    category:"Desktops",
    datestamp: Date.now()
  }),
  new Category({
    categoryId:2,
    category:"Laptops & Notebooks",
    datestamp: Date.now()
  }),
  new Category({
    categoryId:3,
    category:"Components",
    datestamp: Date.now()
  }),
  new Category({
    categoryId:4,
    category:"Tablets",
    datestamp: Date.now()
  }),
  new Category({
    categoryId:5,
    category:"Software",
    datestamp: Date.now()
  }),
  new Category({
    categoryId:6,
    category:"Phones & PDAs",
    datestamp: Date.now()
  }),
  new Category({
    categoryId:7,
    category:"Cameras",
    datestamp: Date.now()
  }),
  new Category({
    categoryId:8,
    category:"MP3 Players",
    datestamp: Date.now()
  })           
];

var done = 0;
for (var i=0; i<categories.length; i++) {
  categories[i].save(function (err, result) {
    done++;
    if(done === categories.length) {
      mongoose.disconnect();
    }
  });
}