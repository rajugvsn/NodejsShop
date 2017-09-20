var Product = require('../../models/product');


var mongoose = require('mongoose');

//Local connection
//mongoose.connect('localhost:27017/nodejsshop');

//AWS connection
mongoose.connect('mongodb://nodejsshop:client@ec2-18-221-143-128.us-east-2.compute.amazonaws.com:27017/nodejsshop', { useMongoClient: true });

var products = [
  new Product({
    image:"/data/images/macbook_1-200x200.jpg",
    name:"MacBook",
    description:"The new MacBook now comes with 1GB of memory standard and larger hard drives for the entire line perfect for running more of your favorite applications and storing growing media collections.",
    specifications:{"memory":"8GB", "processor":"Dual Core"},
    brand:"Apple",
    categoryId:2,
    price:657.00,
    offerprice:608.00,
    taxpercent:12,
    stock:4,
    rewardpoints:600,
    isfeatured:true,
    datestamp: Date.now()
  }),
  new Product({
    image:"/data/images/iphone_1-200x200.jpg",
    name:"iPhone",
    description:"iPhone is a revolutionary new mobile phone that allows you to make a call by simply tapping a name or number in your address book, a favorites list, or a call log. It also automatically syncs all your contacts from a PC, Mac, or Internet service. And it lets you select and listen to voicemail messages in whatever order you want just like email.",
    specifications:{},
    brand:"Apple",
    categoryId:6,
    price:123.00,
    offerprice:123.00,
    taxpercent:12,
    stock:7,
    rewardpoints:0,
    isfeatured:true,
    datestamp: Date.now()
  }),
  new Product({
    image:"/data/images/apple_cinema_30-200x200.jpg",
    name:"Apple Cinema 30 Inch",
    description:"The 30-inch Apple Cinema HD Display delivers an amazing 2560 x 1600 pixel resolution. Designed specifically for the creative professional, this display provides more space for easier access to all the tools and palettes needed to edit, format and composite your work. Combine this display with a Mac Pro, MacBook Pro, or PowerMac G5 and there's no limit to what you can achieve.",
    specifications:{"clockspeed":"100mhz"},
    brand:"Apple",
    categoryId:1,
    price:110.00,
    offerprice:98.00,
    taxpercent:12,
    stock:2,
    rewardpoints:100,
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