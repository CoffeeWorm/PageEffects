var canvas = {};

canvas.util = {
  $: function(tag, node) {
    return (node || document).querySelector(tag);
  },
  random: function(min, max) {
    switch (arguments.length) {
      case 1:
        return Math.random() * arguments[0];
      case 2:
        return Math.random() * arguments[1] - arguments[0];
      default:
        return Math.random() > 0.5 ? -1 : 1;
    }
  },
  zone: {
    width: function() { return window.innerWidth },
    height: function() { return window.innerHeight }
  },
  length: 200
};

(function(util) {
  var $ = util.$;

  function Dot(width, height) {
    this.changeZone(width, height);
    this.posX = util.random(width);
    this.posY = util.random(height);
    this.dirX = util.random();
    this.dirY = util.random();
    this.velX = util.random(2, 4);
    this.velY = util.random(2, 4);
  }

  Dot.prototype = {
    constructor: Dot,
    move: function() {
      this.rebound();
      this.posX += this.dirX * this.velX;
      this.posY += this.dirY * this.velY;
    },
    rebound: function() {
      if (this.posX < 0 || this.posX > this.width) {
        this.dirX *= -1;
      }
      if (this.posY < 0 || this.posY > this.height) {
        this.dirY *= -1;
      }
    },
    changeZone: function(width, height) {
      this.width = width;
      this.height = height;
    }
  };

  //存储点的数据结构
  var dots = [];
  for (var i = 0; i <= util.length; i++) {
    dots[i] = new Dot(util.zone.width(), util.zone.height());
  }

  var cvs = $("#bg");
  cvs.paintDot = function(posX, posY) {
    if (this.getContext) {
      var ctx = this.getContext('2d');
      ctx.strokeStyle = "#fff";
      ctx.beginPath();
      ctx.arc(posX, posY, .5, 0, 2 * Math.PI);
      ctx.closePath();
      ctx.stroke();
    }
  };

  cvs.clear = function() {
    if (this.getContext) {
      var ctx = this.getContext('2d');
      ctx.clearRect(0, 0, util.zone.width(), util.zone.height());
    }
  };

  cvs.step = function() {
    cvs.clear();
    cvs.paintLine();
    dots.forEach(function(dot) {
      cvs.paintDot(dot.posX, dot.posY);
      dot.move();
    });
  };

  cvs.paintLine = function() {
    var threshold = 8100;
    for (var m = 0; m < dots.length; m++) {
      for (var n = m + 1; n < dots.length; n++) {
        var distence = Math.pow((dots[m].posX - dots[n].posX), 2) + Math.pow((dots[m].posY - dots[n].posY), 2);
        if (distence <= threshold) {
          var ctx = this.getContext('2d');
          ctx.beginPath();
          ctx.strokeStyle = "#fff";
          ctx.globalAlpha = 0.7;
          ctx.lineWidth = 0.5 - (distence / threshold) * 0.5;
          ctx.moveTo(dots[m].posX, dots[m].posY);
          ctx.lineTo(dots[n].posX, dots[n].posY);
          ctx.stroke();
          ctx.closePath();
        }
      }
    }
  };

  setInterval(cvs.step, 30);
  document.addEventListener("DOMContentLoaded", function() {
    cvs.width = util.zone.width();
    cvs.height = util.zone.height();

    window.addEventListener('mousemove', function(e) {
      dots[util.length].posX = e.offsetX;
      dots[util.length].posY = e.offsetY;
      dots[util.length].dirX = 0;
      dots[util.length].dirY = 0;
      window.addEventListener('resize', function(e) {
        cvs.width = util.zone.width();
        cvs.height = util.zone.height();
        for (var i = dots.length - 1; i >= 0; i--) {
          dots[i].changeZone(util.zone.width(), util.zone.height());
        }
      });
    });

  });

})(canvas.util)