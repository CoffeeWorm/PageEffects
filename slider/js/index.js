var app = {};

app.util = {
  $: function(name, node) {
    return (node || document).querySelector(name);
  },
  $$: function(name, node) {
    return (node || document).querySelectorAll(name);
  },
  indexOfArray: function(arr, content) {
    for (var i = 0; i <= arr.length - 1; i++) {
      if (arr[i] === content) {
        return i;
      }
    }
    return -1;
  },
  addClass: function(node, className) {
    var classLst = node.className.split(" ");
    if (this.indexOfArray(classLst, className) === -1) {
      classLst.push(className);
      node.className = classLst.join(" ");
    }
  },
  delClass: function(node, className) {
    var classLst = node.className.split(" ");
    var sub = this.indexOfArray(classLst, className);
    if (sub !== -1) {
      classLst.splice(sub, 1);
      node.className = classLst.join(" ");
    }
  },
  fadeIn: function(node, time) {
    time = time < 0.1 ? 0.1 : time;
    node.style.opacity = 0;
    var tmp = setInterval(function() {
      node.style.opacity = parseFloat(node.style.opacity) + 1 / (time * 30);
      if (node.style.opacity >= 1) {
        node.style.opacity = 1;
        clearInterval(tmp);
      }
    }, time * 30);
  }
};

(function(util) {
  var $ = util.$;
  var $$ = util.$$;

  function Slider() {
    this.container = $('.slider-container');
    this.elements = $$('.slider-lst', this.container);
    this.sub = 0;
    this.afterSub = this.sub - 1 < 0 ? this.elements.length - 1 : this.sub - 1;
    this.elementInit();
    this.eventInit();
    this.autoSwitch();
  }
  Slider.prototype = {
    constructor: Slider,
    elementInit: function() {
      //添加slider层级
      util.addClass(this.elements[0], 'active');
      util.addClass(this.elements[this.elements.length - 1], 'behind');
      //根据slider图片数量添加
      var liTpl = '<li class="slider-dot"></li>';
      var ul = document.createElement("ul");
      ul.className = 'slider-dots';
      for (var i = 0; i < this.elements.length; i++) {
        ul.innerHTML += liTpl;
      }
      this.container.appendChild(ul);
      this.dots = $$('.slider-dot', this.container);
      util.addClass(this.dots[this.sub], 'active');
    },
    eventInit: function() {
      $('.arrow-left').addEventListener('click', this.forward.bind(this));
      $('.arrow-right').addEventListener('click', this.backward.bind(this));
      var self = this;
      for (var i = this.dots.length - 1; i >= 0; i--) {
        (function(i) {
          self.dots[i].addEventListener('click', function() {
            self.switchTo(i);
          });
        })(i);
      }
    },
    forward: function() {
      this.delActive();
      this.afterSub = this.sub;
      this.sub = this.sub - 1 < 0 ? this.elements.length - 1 : this.sub - 1;
      this.addActive();
      this.autoSwitch();
    },
    backward: function() {
      this.delActive();
      this.sub = (this.sub + 1) % this.elements.length;
      this.afterSub = this.sub - 1 < 0 ? this.elements.length - 1 : this.sub - 1;
      this.addActive();
      this.autoSwitch();
    },
    switchTo: function(num) {
      this.delActive();
      this.afterSub = this.sub;
      this.sub = num;
      this.addActive();
      this.autoSwitch();
    },
    delActive: function() {
      util.delClass(this.elements[this.afterSub], 'behind');
      util.delClass(this.elements[this.sub], 'active');
      util.delClass(this.dots[this.sub], 'active');
    },
    addActive: function() {
      util.addClass(this.elements[this.afterSub], 'behind');
      util.addClass(this.elements[this.sub], 'active');
      util.fadeIn(this.elements[this.sub], 0.4);
      util.addClass(this.dots[this.sub], 'active');
    },
    autoSwitch: function() {
      if (this.tmp) {
        clearInterval(this.tmp);
      }
      var self = this;
      this.tmp = setInterval(function() {
        self.backward();
      }, 5000);
    }
  }
  var slider = new Slider();
})(app.util);