/* Hand-written, not theme output. Currently: tag filtering for the
   "Other" publications list. The highlighted list is deliberately
   untouched — it always shows everything. */
(function () {
  'use strict';

  var toolbar = document.querySelector('.pub-filters');
  var list = document.querySelector('.pub-rows');
  if (!toolbar || !list) return;

  var buttons = toolbar.querySelectorAll('[data-pubfilter]');
  var rows = list.querySelectorAll('li');

  function apply(tag) {
    for (var i = 0; i < buttons.length; i++) {
      var isActive = buttons[i].getAttribute('data-pubfilter') === tag;
      buttons[i].classList.toggle('active', isActive);
    }
    for (var j = 0; j < rows.length; j++) {
      var tags = (rows[j].getAttribute('data-tags') || '').split(/\s+/);
      rows[j].hidden = !(tag === '*' || tags.indexOf(tag) !== -1);
    }
  }

  toolbar.addEventListener('click', function (e) {
    var btn = e.target;
    while (btn && btn !== toolbar && !btn.hasAttribute('data-pubfilter')) {
      btn = btn.parentNode;
    }
    if (!btn || btn === toolbar) return;
    e.preventDefault();
    apply(btn.getAttribute('data-pubfilter'));
  });
})();
