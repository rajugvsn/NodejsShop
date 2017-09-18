var express = require('express');
var router = express.Router();

var Cart = require('../models/cart');
var Product = require('../models/product');


router.get('/index', function(req, res, next) {
  Product.find(function(err, result) {
    return res.render('shop/index', { title: 'Shopping cart', products: result });
  });
});

router.get('/search', function(req, res, next) {
  return res.render('shop/search');
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

router.get('/cart', function(req, res, next) {
  if(!req.session.cart) return res.render('shop/cart', {products: null});
  var cart = new Cart(req.session.cart);
  return res.render('shop/cart', {cart: cart, totalPrice: cart.totalPrice});
});

router.get('/checkout', function(req, res, next) {
  return res.render('shop/checkout');
});

router.post('/updatequantity/:id', function(req, res, next) {
  var productId = req.params.id;
  var qty = parseFloat(req.body["qty_" + productId]);
  var cart = new Cart(req.session.cart ? req.session.cart : {items: {}, totalQty: 0, totalPrice: 0});
  cart.updatequantity(productId, qty);
  req.session.cart = cart;
  res.render('shop/cart', {cart: cart});
});

router.post('/removeproduct/:id', function(req, res, next) {
  var productId = req.params.id;
  var cart = new Cart(req.session.cart ? req.session.cart : {items: {}, totalQty: 0, totalPrice: 0});
  cart.removeproduct(productId);
  req.session.cart = cart;
  res.render('shop/cart', {cart: cart});  
});

module.exports = router;