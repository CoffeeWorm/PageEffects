Array.prototype.indexOf = function(str) {
  for (var i = this.length - 1; i >= 0; i--) {
    if (this[i] === str) {
      return i;
    }
  }
  return i;
}

function addClass(node, className) {
  if (node.className) {
    var arr = node.className.split(' ');
    if (arr.indexOf(className) === -1) {
      arr.push(className);
    }
    node.className = arr.join(' ');
  } else {
    node.className = className;
  }
}

function delClass(node, className) {
  if (node.className) {
    var arr = node.className.split(' ');
    var num = arr.indexOf(className)
    if (num !== -1) {
      arr.splice(num, 1);
      node.className = arr.join(' ');
    }
  }
}

function fadeIn(node, time) {
  time = time < 0.1 ? 0.1 : parseFloat(time);
  var num = time * 30;
  node.style.opacity = 0;
  var st = setInterval(function() {
    node.style.opacity = parseFloat(node.style.opacity) + 1.0 / num;
    if (node.style.opacity >= 1) {
      node.style.opacity = 1;
      clearInterval(st);
    }
  }, 30);
}



var slider = document.getElementsByClassName('slider');
var sliderImg = document.getElementsByClassName('slider-img');
var counter1 = 0;
var counter2 = counter1 - 1 < 0 ? sliderImg.length - 1 : counter1 - 1;
setInterval(function() {
  delClass(sliderImg[counter2], 'behind');
  delClass(sliderImg[counter1], 'active');
  counter1 = (counter1 + 1) % sliderImg.length;
  counter2 = (counter2 + 1) % sliderImg.length;
  addClass(sliderImg[counter2], 'behind');
  addClass(sliderImg[counter1], 'active');
  fadeIn(sliderImg[counter1], 1);
}, 10000);