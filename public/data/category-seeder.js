var Category = require('../../models/category');

var mongoose = require('mongoose');
//Local connection
//mongoose.connect('localhost:27017/nodejsshop');

//AWS connection
mongoose.connect('mongodb://nodejsshop:client@ec2-18-221-143-128.us-east-2.compute.amazonaws.com:27017/nodejsshop', { useMongoClient: true });

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