(function() {
  var tpl = '<div class="tip">\
    <h2 class="title">{title}</h2>\
    <p class="content">{content}</p>\
    <button class="confirm">知道了</button>\
  </div>';

  function Tip(title, content) {
    this.tpl = tpl.replace('{title}', title || '标题');
    this.tpl = this.tpl.replace('{content}', content || '内容');
    this.tag = document.createElement('div');
    this.tag.innerHTML = this.tpl;
    this.tag = this.tag.childNodes[0];
    this.initEvent();

  }
  Tip.prototype = {
    constructor: Tip,
    show: function() {
      document.body.appendChild(this.tag);
    },
    hide: function() {
      document.body.removeChild(this.tag);
    },
    initEvent: function() {
      var cfmBtn = this.tag.querySelector('.confirm');
      cfmBtn.addEventListener('click', function(e) {
        this.hide();
      }.bind(this));
    }
  }
  window.Tip = Tip;
})()