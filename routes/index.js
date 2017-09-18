var express = require('express');
var router = express.Router();
var Cart = require('../models/cart');

//Get data from JSON file
//var fs = require('fs');
//var path = require('path');

//Get data from MongoDB
var Product = require('../models/product');

/* GET home page. */
router.get('/', function(req, res, next) {
  /*
  var jsonPath = path.join(__dirname, '..', 'public', 'data', 'products.json');
  var jsonData = {"products":{}};
  fs.readFile(jsonPath, 'utf8', function (err, data) {
    if (err) console.log(err);
    else {
      jsonData = JSON.parse(data);
      res.render('shop/index', { title: 'Shopping cart', products: jsonData.products });
    }
  });
  */
  Product.find(function(err, result) {
    res.render('shop/index', { title: 'Shopping cart', products: result });
  });
});

router.post('/search', function(req, res, next) {
  var filters = {"name":RegExp};
  filters.name = new RegExp(req.body.search, 'i');
  Product.find(filters, function(err, result) {
    if(err) console.log(err);
    return res.render('shop/search', {products: result});
  });
});

router.get('/product', function(req, res, next) {
  return res.render('shop/product');
});

router.get('/addtocart/:id', function(req, res, next) {
  var productId = req.params.id;
  var cart = new Cart(req.session.cart ? req.session.cart : {items: {}, totalQty: 0, totalPrice: 0});

  Product.findById(productId, function(err, product) {
    if(err) return res.redirect('/');
    cart.add(product, product.id);
    req.session.cart = cart;
    res.redirect('/');
  });
});

module.exports = router;