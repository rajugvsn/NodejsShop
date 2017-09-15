module.exports = function Cart(oldCart) {
  this.items = oldCart.items || {};
  this.totalQty = oldCart.totalQty || 0;
  this.totalPrice = oldCart.totalPrice || 0;
  this.totalTax = oldCart.totalTax || 0;
  this.totalVAT = oldCart.totalVAT || 0;
  this.totalPriceWithTax = oldCart.totalPriceWithTax || 0;

  this.add = function(item, id) {
    var storedItem = this.items[id];
    if(!storedItem) {
      storedItem = this.items[id] = {item: item, qty: 0, price: 0};
    }
    storedItem.qty++;
    storedItem.price = storedItem.item.price * storedItem.qty;
    storedItem.tax = (storedItem.item.price * (storedItem.item.taxpercent/100)) * storedItem.qty;
    storedItem.priceWithTax = storedItem.price + storedItem.tax;
    this.totalQty++;
    this.totalPrice += storedItem.item.price;
    this.totalTax += storedItem.tax;
    this.totalVAT += storedItem.priceWithTax * 20/100;
    this.totalPriceWithTax += storedItem.priceWithTax + (storedItem.priceWithTax * 20/100);
  };

  this.updatequantity = function(id, qty) {
    var cartitems = this.items;
    if(cartitems[id]) {
      if(qty <= 0 ) {
        delete cartitems[id];
      }
      else {
        cartitems[id].qty = qty;
        cartitems[id].price = cartitems[id].item.price * cartitems[id].qty;
        cartitems[id].tax = (cartitems[id].item.price * (cartitems[id].item.taxpercent/100)) * cartitems[id].qty;
        cartitems[id].priceWithTax = cartitems[id].price + cartitems[id].tax;
      }
      var totalQty = 0;
      var totalPrice = 0;
      var totalTax = 0;
      var totalVAT = 0;
      var totalPriceWithTax = 0;  
      
      for(var key in cartitems){
        if(cartitems.hasOwnProperty(key)) {
          totalQty += cartitems[key].qty;
          totalPrice += cartitems[key].price;
          totalTax += cartitems[key].tax;
          totalVAT += cartitems[key].priceWithTax * 20/100;
          totalPriceWithTax += cartitems[key].priceWithTax + (cartitems[key].priceWithTax * 20/100); 
  
        }
      }

      this.totalQty = totalQty;
      this.totalPrice = totalPrice;
      this.totalTax = totalTax;
      this.totalVAT = totalVAT;
      this.totalPriceWithTax = totalPriceWithTax;  

      this.items = cartitems;
    }
  };

  this.removeproduct = function(id) {
    var cartitems = this.items;
    if(cartitems[id]) delete cartitems[id];

    var totalQty = 0;
    var totalPrice = 0;
    var totalTax = 0;
    var totalVAT = 0;
    var totalPriceWithTax = 0;  

    for(var key in cartitems){
      if(cartitems.hasOwnProperty(key)) {
        totalQty += cartitems[key].qty;
        totalPrice += cartitems[key].price;
        totalTax += cartitems[key].tax;
        totalVAT += cartitems[key].priceWithTax * 20/100;
        totalPriceWithTax += cartitems[key].priceWithTax + (cartitems[key].priceWithTax * 20/100); 

      }
    }

    this.totalQty = totalQty;
    this.totalPrice = totalPrice;
    this.totalTax = totalTax;
    this.totalVAT = totalVAT;
    this.totalPriceWithTax = totalPriceWithTax;  

    this.items = cartitems;
    
  };

  this.generateArray = function() {
    var arr = [];
    for (var id in this.items) {
      arr.push(this.items[id]);
    }
    return arr;
  };
};