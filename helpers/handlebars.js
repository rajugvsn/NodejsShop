var register = function(Handlebars) {
  var helpers = {
    debug: function(name, value) {
      console.log("Value of '" + name +"' = " + value);
    },
    ifNumberNotDefined: function(value, options) {
      if(value) return value;
      else return 0;
    },
    ifOffer: function(v1, v2, options) {
      v1 = parseFloat(v1);
      v2 = parseFloat(v2);
      if(v1 < v2) {
        return options.fn(this);
      }
      return options.inverse(this);
    },
    money: function(value) {
      value = value || 0;
      value = parseFloat(value).toFixed(2);
      return '$ ' + value.replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
    },
    math: function(lvalue, operator, rvalue, options) {
      lvalue = parseFloat(lvalue);
      rvalue = parseFloat(rvalue);
      return {
        "+": lvalue + rvalue,
        "-": lvalue - rvalue,
        "*": lvalue * rvalue,
        "/": lvalue / rvalue,
        "%": lvalue % rvalue
      }[operator];
    },
    percent: function(value, percentage, options) {
      value = parseFloat(value);
      percentage = parseFloat(percentage);
      return value * (percentage / 100);
    }    
  };

  if (Handlebars && typeof Handlebars.registerHelper === "function") {
    for (var prop in helpers) {
        Handlebars.registerHelper(prop, helpers[prop]);
    }
  } else {
    return helpers;
  }
};

module.exports.register = register;
module.exports.helpers = register(null); 