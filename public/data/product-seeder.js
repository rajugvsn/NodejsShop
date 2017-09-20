var Product = require('../../models/product');


var mongoose = require('mongoose');

//Local connection
//mongoose.connect('localhost:27017/nodejsshop');

//AWS connection
mongoose.connect('mongodb://nodejsshop:client@ec2-18-221-143-128.us-east-2.compute.amazonaws.com:27017/nodejsshop', { useMongoClient: true });

var products = [
  new Product({
    image:"/data/images/canon_eos_5d_1-200x200.jpg",
    name:"Canon EOS 5D",
    description:"Canon's press material for the EOS 5D states that it 'defines (a) new D-SLR category', while we're not typically too concerned with marketing talk this particular statement is clearly pretty accurate.",
    specifications:{},
    brand:"Canon",
    categoryId:7,
    price:98.00,
    offerprice:98.00,
    taxpercent:12,
    stock:2,
    rewardpoints:200,
    isfeatured:true,
    datestamp: Date.now()
  })
];

var done = 0;
for (var i=0; i<products.length; i++) {
  products[i].save(function(err, result) {
    done++;
    if(done === products.length) {
      mongoose.disconnect();
    }
  });
}