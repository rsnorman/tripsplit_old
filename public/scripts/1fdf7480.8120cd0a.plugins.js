!function (a, b) {
  function c(a) {
    var b = ob[a] = {};
    return $.each(a.split(bb), function (a, c) {
      b[c] = !0;
    }), b;
  }
  function d(a, c, d) {
    if (d === b && 1 === a.nodeType) {
      var e = 'data-' + c.replace(qb, '-$1').toLowerCase();
      if (d = a.getAttribute(e), 'string' == typeof d) {
        try {
          d = 'true' === d ? !0 : 'false' === d ? !1 : 'null' === d ? null : +d + '' === d ? +d : pb.test(d) ? $.parseJSON(d) : d;
        } catch (f) {
        }
        $.data(a, c, d);
      } else
        d = b;
    }
    return d;
  }
  function e(a) {
    var b;
    for (b in a)
      if (('data' !== b || !$.isEmptyObject(a[b])) && 'toJSON' !== b)
        return !1;
    return !0;
  }
  function f() {
    return !1;
  }
  function g() {
    return !0;
  }
  function h(a) {
    return !a || !a.parentNode || 11 === a.parentNode.nodeType;
  }
  function i(a, b) {
    do
      a = a[b];
    while (a && 1 !== a.nodeType);
    return a;
  }
  function j(a, b, c) {
    if (b = b || 0, $.isFunction(b))
      return $.grep(a, function (a, d) {
        var e = !!b.call(a, d, a);
        return e === c;
      });
    if (b.nodeType)
      return $.grep(a, function (a) {
        return a === b === c;
      });
    if ('string' == typeof b) {
      var d = $.grep(a, function (a) {
          return 1 === a.nodeType;
        });
      if (Kb.test(b))
        return $.filter(b, d, !c);
      b = $.filter(b, d);
    }
    return $.grep(a, function (a) {
      return $.inArray(a, b) >= 0 === c;
    });
  }
  function k(a) {
    var b = Nb.split('|'), c = a.createDocumentFragment();
    if (c.createElement)
      for (; b.length;)
        c.createElement(b.pop());
    return c;
  }
  function l(a, b) {
    return a.getElementsByTagName(b)[0] || a.appendChild(a.ownerDocument.createElement(b));
  }
  function m(a, b) {
    if (1 === b.nodeType && $.hasData(a)) {
      var c, d, e, f = $._data(a), g = $._data(b, f), h = f.events;
      if (h) {
        delete g.handle, g.events = {};
        for (c in h)
          for (d = 0, e = h[c].length; e > d; d++)
            $.event.add(b, c, h[c][d]);
      }
      g.data && (g.data = $.extend({}, g.data));
    }
  }
  function n(a, b) {
    var c;
    1 === b.nodeType && (b.clearAttributes && b.clearAttributes(), b.mergeAttributes && b.mergeAttributes(a), c = b.nodeName.toLowerCase(), 'object' === c ? (b.parentNode && (b.outerHTML = a.outerHTML), $.support.html5Clone && a.innerHTML && !$.trim(b.innerHTML) && (b.innerHTML = a.innerHTML)) : 'input' === c && Xb.test(a.type) ? (b.defaultChecked = b.checked = a.checked, b.value !== a.value && (b.value = a.value)) : 'option' === c ? b.selected = a.defaultSelected : 'input' === c || 'textarea' === c ? b.defaultValue = a.defaultValue : 'script' === c && b.text !== a.text && (b.text = a.text), b.removeAttribute($.expando));
  }
  function o(a) {
    return 'undefined' != typeof a.getElementsByTagName ? a.getElementsByTagName('*') : 'undefined' != typeof a.querySelectorAll ? a.querySelectorAll('*') : [];
  }
  function p(a) {
    Xb.test(a.type) && (a.defaultChecked = a.checked);
  }
  function q(a, b) {
    if (b in a)
      return b;
    for (var c = b.charAt(0).toUpperCase() + b.slice(1), d = b, e = qc.length; e--;)
      if (b = qc[e] + c, b in a)
        return b;
    return d;
  }
  function r(a, b) {
    return a = b || a, 'none' === $.css(a, 'display') || !$.contains(a.ownerDocument, a);
  }
  function s(a, b) {
    for (var c, d, e = [], f = 0, g = a.length; g > f; f++)
      c = a[f], c.style && (e[f] = $._data(c, 'olddisplay'), b ? (!e[f] && 'none' === c.style.display && (c.style.display = ''), '' === c.style.display && r(c) && (e[f] = $._data(c, 'olddisplay', w(c.nodeName)))) : (d = cc(c, 'display'), !e[f] && 'none' !== d && $._data(c, 'olddisplay', d)));
    for (f = 0; g > f; f++)
      c = a[f], c.style && (b && 'none' !== c.style.display && '' !== c.style.display || (c.style.display = b ? e[f] || '' : 'none'));
    return a;
  }
  function t(a, b, c) {
    var d = jc.exec(b);
    return d ? Math.max(0, d[1] - (c || 0)) + (d[2] || 'px') : b;
  }
  function u(a, b, c, d) {
    for (var e = c === (d ? 'border' : 'content') ? 4 : 'width' === b ? 1 : 0, f = 0; 4 > e; e += 2)
      'margin' === c && (f += $.css(a, c + pc[e], !0)), d ? ('content' === c && (f -= parseFloat(cc(a, 'padding' + pc[e])) || 0), 'margin' !== c && (f -= parseFloat(cc(a, 'border' + pc[e] + 'Width')) || 0)) : (f += parseFloat(cc(a, 'padding' + pc[e])) || 0, 'padding' !== c && (f += parseFloat(cc(a, 'border' + pc[e] + 'Width')) || 0));
    return f;
  }
  function v(a, b, c) {
    var d = 'width' === b ? a.offsetWidth : a.offsetHeight, e = !0, f = $.support.boxSizing && 'border-box' === $.css(a, 'boxSizing');
    if (0 >= d) {
      if (d = cc(a, b), (0 > d || null == d) && (d = a.style[b]), kc.test(d))
        return d;
      e = f && ($.support.boxSizingReliable || d === a.style[b]), d = parseFloat(d) || 0;
    }
    return d + u(a, b, c || (f ? 'border' : 'content'), e) + 'px';
  }
  function w(a) {
    if (mc[a])
      return mc[a];
    var b = $('<' + a + '>').appendTo(P.body), c = b.css('display');
    return b.remove(), ('none' === c || '' === c) && (dc = P.body.appendChild(dc || $.extend(P.createElement('iframe'), {
      frameBorder: 0,
      width: 0,
      height: 0
    })), ec && dc.createElement || (ec = (dc.contentWindow || dc.contentDocument).document, ec.write('<!doctype html><html><body>'), ec.close()), b = ec.body.appendChild(ec.createElement(a)), c = cc(b, 'display'), P.body.removeChild(dc)), mc[a] = c, c;
  }
  function x(a, b, c, d) {
    var e;
    if ($.isArray(b))
      $.each(b, function (b, e) {
        c || tc.test(a) ? d(a, e) : x(a + '[' + ('object' == typeof e ? b : '') + ']', e, c, d);
      });
    else if (c || 'object' !== $.type(b))
      d(a, b);
    else
      for (e in b)
        x(a + '[' + e + ']', b[e], c, d);
  }
  function y(a) {
    return function (b, c) {
      'string' != typeof b && (c = b, b = '*');
      var d, e, f, g = b.toLowerCase().split(bb), h = 0, i = g.length;
      if ($.isFunction(c))
        for (; i > h; h++)
          d = g[h], f = /^\+/.test(d), f && (d = d.substr(1) || '*'), e = a[d] = a[d] || [], e[f ? 'unshift' : 'push'](c);
    };
  }
  function z(a, c, d, e, f, g) {
    f = f || c.dataTypes[0], g = g || {}, g[f] = !0;
    for (var h, i = a[f], j = 0, k = i ? i.length : 0, l = a === Jc; k > j && (l || !h); j++)
      h = i[j](c, d, e), 'string' == typeof h && (!l || g[h] ? h = b : (c.dataTypes.unshift(h), h = z(a, c, d, e, h, g)));
    return (l || !h) && !g['*'] && (h = z(a, c, d, e, '*', g)), h;
  }
  function A(a, c) {
    var d, e, f = $.ajaxSettings.flatOptions || {};
    for (d in c)
      c[d] !== b && ((f[d] ? a : e || (e = {}))[d] = c[d]);
    e && $.extend(!0, a, e);
  }
  function B(a, c, d) {
    var e, f, g, h, i = a.contents, j = a.dataTypes, k = a.responseFields;
    for (f in k)
      f in d && (c[k[f]] = d[f]);
    for (; '*' === j[0];)
      j.shift(), e === b && (e = a.mimeType || c.getResponseHeader('content-type'));
    if (e)
      for (f in i)
        if (i[f] && i[f].test(e)) {
          j.unshift(f);
          break;
        }
    if (j[0] in d)
      g = j[0];
    else {
      for (f in d) {
        if (!j[0] || a.converters[f + ' ' + j[0]]) {
          g = f;
          break;
        }
        h || (h = f);
      }
      g = g || h;
    }
    return g ? (g !== j[0] && j.unshift(g), d[g]) : void 0;
  }
  function C(a, b) {
    var c, d, e, f, g = a.dataTypes.slice(), h = g[0], i = {}, j = 0;
    if (a.dataFilter && (b = a.dataFilter(b, a.dataType)), g[1])
      for (c in a.converters)
        i[c.toLowerCase()] = a.converters[c];
    for (; e = g[++j];)
      if ('*' !== e) {
        if ('*' !== h && h !== e) {
          if (c = i[h + ' ' + e] || i['* ' + e], !c)
            for (d in i)
              if (f = d.split(' '), f[1] === e && (c = i[h + ' ' + f[0]] || i['* ' + f[0]])) {
                c === !0 ? c = i[d] : i[d] !== !0 && (e = f[0], g.splice(j--, 0, e));
                break;
              }
          if (c !== !0)
            if (c && a['throws'])
              b = c(b);
            else
              try {
                b = c(b);
              } catch (k) {
                return {
                  state: 'parsererror',
                  error: c ? k : 'No conversion from ' + h + ' to ' + e
                };
              }
        }
        h = e;
      }
    return {
      state: 'success',
      data: b
    };
  }
  function D() {
    try {
      return new a.XMLHttpRequest();
    } catch (b) {
    }
  }
  function E() {
    try {
      return new a.ActiveXObject('Microsoft.XMLHTTP');
    } catch (b) {
    }
  }
  function F() {
    return setTimeout(function () {
      Uc = b;
    }, 0), Uc = $.now();
  }
  function G(a, b) {
    $.each(b, function (b, c) {
      for (var d = ($c[b] || []).concat($c['*']), e = 0, f = d.length; f > e; e++)
        if (d[e].call(a, b, c))
          return;
    });
  }
  function H(a, b, c) {
    var d, e = 0, f = Zc.length, g = $.Deferred().always(function () {
        delete h.elem;
      }), h = function () {
        for (var b = Uc || F(), c = Math.max(0, i.startTime + i.duration - b), d = 1 - (c / i.duration || 0), e = 0, f = i.tweens.length; f > e; e++)
          i.tweens[e].run(d);
        return g.notifyWith(a, [
          i,
          d,
          c
        ]), 1 > d && f ? c : (g.resolveWith(a, [i]), !1);
      }, i = g.promise({
        elem: a,
        props: $.extend({}, b),
        opts: $.extend(!0, { specialEasing: {} }, c),
        originalProperties: b,
        originalOptions: c,
        startTime: Uc || F(),
        duration: c.duration,
        tweens: [],
        createTween: function (b, c) {
          var d = $.Tween(a, i.opts, b, c, i.opts.specialEasing[b] || i.opts.easing);
          return i.tweens.push(d), d;
        },
        stop: function (b) {
          for (var c = 0, d = b ? i.tweens.length : 0; d > c; c++)
            i.tweens[c].run(1);
          return b ? g.resolveWith(a, [
            i,
            b
          ]) : g.rejectWith(a, [
            i,
            b
          ]), this;
        }
      }), j = i.props;
    for (I(j, i.opts.specialEasing); f > e; e++)
      if (d = Zc[e].call(i, a, j, i.opts))
        return d;
    return G(i, j), $.isFunction(i.opts.start) && i.opts.start.call(a, i), $.fx.timer($.extend(h, {
      anim: i,
      queue: i.opts.queue,
      elem: a
    })), i.progress(i.opts.progress).done(i.opts.done, i.opts.complete).fail(i.opts.fail).always(i.opts.always);
  }
  function I(a, b) {
    var c, d, e, f, g;
    for (c in a)
      if (d = $.camelCase(c), e = b[d], f = a[c], $.isArray(f) && (e = f[1], f = a[c] = f[0]), c !== d && (a[d] = f, delete a[c]), g = $.cssHooks[d], g && 'expand' in g) {
        f = g.expand(f), delete a[d];
        for (c in f)
          c in a || (a[c] = f[c], b[c] = e);
      } else
        b[d] = e;
  }
  function J(a, b, c) {
    var d, e, f, g, h, i, j, k, l = this, m = a.style, n = {}, o = [], p = a.nodeType && r(a);
    c.queue || (j = $._queueHooks(a, 'fx'), null == j.unqueued && (j.unqueued = 0, k = j.empty.fire, j.empty.fire = function () {
      j.unqueued || k();
    }), j.unqueued++, l.always(function () {
      l.always(function () {
        j.unqueued--, $.queue(a, 'fx').length || j.empty.fire();
      });
    })), 1 === a.nodeType && ('height' in b || 'width' in b) && (c.overflow = [
      m.overflow,
      m.overflowX,
      m.overflowY
    ], 'inline' === $.css(a, 'display') && 'none' === $.css(a, 'float') && ($.support.inlineBlockNeedsLayout && 'inline' !== w(a.nodeName) ? m.zoom = 1 : m.display = 'inline-block')), c.overflow && (m.overflow = 'hidden', $.support.shrinkWrapBlocks || l.done(function () {
      m.overflow = c.overflow[0], m.overflowX = c.overflow[1], m.overflowY = c.overflow[2];
    }));
    for (d in b)
      if (f = b[d], Wc.exec(f)) {
        if (delete b[d], f === (p ? 'hide' : 'show'))
          continue;
        o.push(d);
      }
    if (g = o.length)
      for (h = $._data(a, 'fxshow') || $._data(a, 'fxshow', {}), p ? $(a).show() : l.done(function () {
          $(a).hide();
        }), l.done(function () {
          var b;
          $.removeData(a, 'fxshow', !0);
          for (b in n)
            $.style(a, b, n[b]);
        }), d = 0; g > d; d++)
        e = o[d], i = l.createTween(e, p ? h[e] : 0), n[e] = h[e] || $.style(a, e), e in h || (h[e] = i.start, p && (i.end = i.start, i.start = 'width' === e || 'height' === e ? 1 : 0));
  }
  function K(a, b, c, d, e) {
    return new K.prototype.init(a, b, c, d, e);
  }
  function L(a, b) {
    for (var c, d = { height: a }, e = 0; 4 > e; e += 2 - b)
      c = pc[e], d['margin' + c] = d['padding' + c] = a;
    return b && (d.opacity = d.width = a), d;
  }
  function M(a) {
    return $.isWindow(a) ? a : 9 === a.nodeType ? a.defaultView || a.parentWindow : !1;
  }
  var N, O, P = a.document, Q = a.location, R = a.navigator, S = a.jQuery, T = a.$, U = Array.prototype.push, V = Array.prototype.slice, W = Array.prototype.indexOf, X = Object.prototype.toString, Y = Object.prototype.hasOwnProperty, Z = String.prototype.trim, $ = function (a, b) {
      return new $.fn.init(a, b, N);
    }, _ = /[\-+]?(?:\d*\.|)\d+(?:[eE][\-+]?\d+|)/.source, ab = /\S/, bb = /\s+/, cb = ab.test('\xa0') ? /^[\s\xA0]+|[\s\xA0]+$/g : /^\s+|\s+$/g, db = /^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/, eb = /^<(\w+)\s*\/?>(?:<\/\1>|)$/, fb = /^[\],:{}\s]*$/, gb = /(?:^|:|,)(?:\s*\[)+/g, hb = /\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g, ib = /"[^"\\\r\n]*"|true|false|null|-?(?:\d\d*\.|)\d+(?:[eE][\-+]?\d+|)/g, jb = /^-ms-/, kb = /-([\da-z])/gi, lb = function (a, b) {
      return (b + '').toUpperCase();
    }, mb = function () {
      P.addEventListener ? (P.removeEventListener('DOMContentLoaded', mb, !1), $.ready()) : 'complete' === P.readyState && (P.detachEvent('onreadystatechange', mb), $.ready());
    }, nb = {};
  $.fn = $.prototype = {
    constructor: $,
    init: function (a, c, d) {
      var e, f, g;
      if (!a)
        return this;
      if (a.nodeType)
        return this.context = this[0] = a, this.length = 1, this;
      if ('string' == typeof a) {
        if (e = '<' === a.charAt(0) && '>' === a.charAt(a.length - 1) && a.length >= 3 ? [
            null,
            a,
            null
          ] : db.exec(a), e && (e[1] || !c)) {
          if (e[1])
            return c = c instanceof $ ? c[0] : c, g = c && c.nodeType ? c.ownerDocument || c : P, a = $.parseHTML(e[1], g, !0), eb.test(e[1]) && $.isPlainObject(c) && this.attr.call(a, c, !0), $.merge(this, a);
          if (f = P.getElementById(e[2]), f && f.parentNode) {
            if (f.id !== e[2])
              return d.find(a);
            this.length = 1, this[0] = f;
          }
          return this.context = P, this.selector = a, this;
        }
        return !c || c.jquery ? (c || d).find(a) : this.constructor(c).find(a);
      }
      return $.isFunction(a) ? d.ready(a) : (a.selector !== b && (this.selector = a.selector, this.context = a.context), $.makeArray(a, this));
    },
    selector: '',
    jquery: '1.8.0',
    length: 0,
    size: function () {
      return this.length;
    },
    toArray: function () {
      return V.call(this);
    },
    get: function (a) {
      return null == a ? this.toArray() : 0 > a ? this[this.length + a] : this[a];
    },
    pushStack: function (a, b, c) {
      var d = $.merge(this.constructor(), a);
      return d.prevObject = this, d.context = this.context, 'find' === b ? d.selector = this.selector + (this.selector ? ' ' : '') + c : b && (d.selector = this.selector + '.' + b + '(' + c + ')'), d;
    },
    each: function (a, b) {
      return $.each(this, a, b);
    },
    ready: function (a) {
      return $.ready.promise().done(a), this;
    },
    eq: function (a) {
      return a = +a, -1 === a ? this.slice(a) : this.slice(a, a + 1);
    },
    first: function () {
      return this.eq(0);
    },
    last: function () {
      return this.eq(-1);
    },
    slice: function () {
      return this.pushStack(V.apply(this, arguments), 'slice', V.call(arguments).join(','));
    },
    map: function (a) {
      return this.pushStack($.map(this, function (b, c) {
        return a.call(b, c, b);
      }));
    },
    end: function () {
      return this.prevObject || this.constructor(null);
    },
    push: U,
    sort: [].sort,
    splice: [].splice
  }, $.fn.init.prototype = $.fn, $.extend = $.fn.extend = function () {
    var a, c, d, e, f, g, h = arguments[0] || {}, i = 1, j = arguments.length, k = !1;
    for ('boolean' == typeof h && (k = h, h = arguments[1] || {}, i = 2), 'object' != typeof h && !$.isFunction(h) && (h = {}), j === i && (h = this, --i); j > i; i++)
      if (null != (a = arguments[i]))
        for (c in a)
          d = h[c], e = a[c], h !== e && (k && e && ($.isPlainObject(e) || (f = $.isArray(e))) ? (f ? (f = !1, g = d && $.isArray(d) ? d : []) : g = d && $.isPlainObject(d) ? d : {}, h[c] = $.extend(k, g, e)) : e !== b && (h[c] = e));
    return h;
  }, $.extend({
    noConflict: function (b) {
      return a.$ === $ && (a.$ = T), b && a.jQuery === $ && (a.jQuery = S), $;
    },
    isReady: !1,
    readyWait: 1,
    holdReady: function (a) {
      a ? $.readyWait++ : $.ready(!0);
    },
    ready: function (a) {
      if (a === !0 ? !--$.readyWait : !$.isReady) {
        if (!P.body)
          return setTimeout($.ready, 1);
        $.isReady = !0, a !== !0 && --$.readyWait > 0 || (O.resolveWith(P, [$]), $.fn.trigger && $(P).trigger('ready').off('ready'));
      }
    },
    isFunction: function (a) {
      return 'function' === $.type(a);
    },
    isArray: Array.isArray || function (a) {
      return 'array' === $.type(a);
    },
    isWindow: function (a) {
      return null != a && a == a.window;
    },
    isNumeric: function (a) {
      return !isNaN(parseFloat(a)) && isFinite(a);
    },
    type: function (a) {
      return null == a ? String(a) : nb[X.call(a)] || 'object';
    },
    isPlainObject: function (a) {
      if (!a || 'object' !== $.type(a) || a.nodeType || $.isWindow(a))
        return !1;
      try {
        if (a.constructor && !Y.call(a, 'constructor') && !Y.call(a.constructor.prototype, 'isPrototypeOf'))
          return !1;
      } catch (c) {
        return !1;
      }
      var d;
      for (d in a);
      return d === b || Y.call(a, d);
    },
    isEmptyObject: function (a) {
      var b;
      for (b in a)
        return !1;
      return !0;
    },
    error: function (a) {
      throw new Error(a);
    },
    parseHTML: function (a, b, c) {
      var d;
      return a && 'string' == typeof a ? ('boolean' == typeof b && (c = b, b = 0), b = b || P, (d = eb.exec(a)) ? [b.createElement(d[1])] : (d = $.buildFragment([a], b, c ? null : []), $.merge([], (d.cacheable ? $.clone(d.fragment) : d.fragment).childNodes))) : null;
    },
    parseJSON: function (b) {
      return b && 'string' == typeof b ? (b = $.trim(b), a.JSON && a.JSON.parse ? a.JSON.parse(b) : fb.test(b.replace(hb, '@').replace(ib, ']').replace(gb, '')) ? new Function('return ' + b)() : ($.error('Invalid JSON: ' + b), void 0)) : null;
    },
    parseXML: function (c) {
      var d, e;
      if (!c || 'string' != typeof c)
        return null;
      try {
        a.DOMParser ? (e = new DOMParser(), d = e.parseFromString(c, 'text/xml')) : (d = new ActiveXObject('Microsoft.XMLDOM'), d.async = 'false', d.loadXML(c));
      } catch (f) {
        d = b;
      }
      return (!d || !d.documentElement || d.getElementsByTagName('parsererror').length) && $.error('Invalid XML: ' + c), d;
    },
    noop: function () {
    },
    globalEval: function (b) {
      b && ab.test(b) && (a.execScript || function (b) {
        a.eval.call(a, b);
      })(b);
    },
    camelCase: function (a) {
      return a.replace(jb, 'ms-').replace(kb, lb);
    },
    nodeName: function (a, b) {
      return a.nodeName && a.nodeName.toUpperCase() === b.toUpperCase();
    },
    each: function (a, c, d) {
      var e, f = 0, g = a.length, h = g === b || $.isFunction(a);
      if (d)
        if (h) {
          for (e in a)
            if (c.apply(a[e], d) === !1)
              break;
        } else
          for (; g > f && c.apply(a[f++], d) !== !1;);
      else if (h) {
        for (e in a)
          if (c.call(a[e], e, a[e]) === !1)
            break;
      } else
        for (; g > f && c.call(a[f], f, a[f++]) !== !1;);
      return a;
    },
    trim: Z ? function (a) {
      return null == a ? '' : Z.call(a);
    } : function (a) {
      return null == a ? '' : a.toString().replace(cb, '');
    },
    makeArray: function (a, b) {
      var c, d = b || [];
      return null != a && (c = $.type(a), null == a.length || 'string' === c || 'function' === c || 'regexp' === c || $.isWindow(a) ? U.call(d, a) : $.merge(d, a)), d;
    },
    inArray: function (a, b, c) {
      var d;
      if (b) {
        if (W)
          return W.call(b, a, c);
        for (d = b.length, c = c ? 0 > c ? Math.max(0, d + c) : c : 0; d > c; c++)
          if (c in b && b[c] === a)
            return c;
      }
      return -1;
    },
    merge: function (a, c) {
      var d = c.length, e = a.length, f = 0;
      if ('number' == typeof d)
        for (; d > f; f++)
          a[e++] = c[f];
      else
        for (; c[f] !== b;)
          a[e++] = c[f++];
      return a.length = e, a;
    },
    grep: function (a, b, c) {
      var d, e = [], f = 0, g = a.length;
      for (c = !!c; g > f; f++)
        d = !!b(a[f], f), c !== d && e.push(a[f]);
      return e;
    },
    map: function (a, c, d) {
      var e, f, g = [], h = 0, i = a.length, j = a instanceof $ || i !== b && 'number' == typeof i && (i > 0 && a[0] && a[i - 1] || 0 === i || $.isArray(a));
      if (j)
        for (; i > h; h++)
          e = c(a[h], h, d), null != e && (g[g.length] = e);
      else
        for (f in a)
          e = c(a[f], f, d), null != e && (g[g.length] = e);
      return g.concat.apply([], g);
    },
    guid: 1,
    proxy: function (a, c) {
      var d, e, f;
      return 'string' == typeof c && (d = a[c], c = a, a = d), $.isFunction(a) ? (e = V.call(arguments, 2), f = function () {
        return a.apply(c, e.concat(V.call(arguments)));
      }, f.guid = a.guid = a.guid || f.guid || $.guid++, f) : b;
    },
    access: function (a, c, d, e, f, g, h) {
      var i, j = null == d, k = 0, l = a.length;
      if (d && 'object' == typeof d) {
        for (k in d)
          $.access(a, c, k, d[k], 1, g, e);
        f = 1;
      } else if (e !== b) {
        if (i = h === b && $.isFunction(e), j && (i ? (i = c, c = function (a, b, c) {
            return i.call($(a), c);
          }) : (c.call(a, e), c = null)), c)
          for (; l > k; k++)
            c(a[k], d, i ? e.call(a[k], k, c(a[k], d)) : e, h);
        f = 1;
      }
      return f ? a : j ? c.call(a) : l ? c(a[0], d) : g;
    },
    now: function () {
      return new Date().getTime();
    }
  }), $.ready.promise = function (b) {
    if (!O)
      if (O = $.Deferred(), 'complete' === P.readyState || 'loading' !== P.readyState && P.addEventListener)
        setTimeout($.ready, 1);
      else if (P.addEventListener)
        P.addEventListener('DOMContentLoaded', mb, !1), a.addEventListener('load', $.ready, !1);
      else {
        P.attachEvent('onreadystatechange', mb), a.attachEvent('onload', $.ready);
        var c = !1;
        try {
          c = null == a.frameElement && P.documentElement;
        } catch (d) {
        }
        c && c.doScroll && function e() {
          if (!$.isReady) {
            try {
              c.doScroll('left');
            } catch (a) {
              return setTimeout(e, 50);
            }
            $.ready();
          }
        }();
      }
    return O.promise(b);
  }, $.each('Boolean Number String Function Array Date RegExp Object'.split(' '), function (a, b) {
    nb['[object ' + b + ']'] = b.toLowerCase();
  }), N = $(P);
  var ob = {};
  $.Callbacks = function (a) {
    a = 'string' == typeof a ? ob[a] || c(a) : $.extend({}, a);
    var d, e, f, g, h, i, j = [], k = !a.once && [], l = function (b) {
        for (d = a.memory && b, e = !0, i = g || 0, g = 0, h = j.length, f = !0; j && h > i; i++)
          if (j[i].apply(b[0], b[1]) === !1 && a.stopOnFalse) {
            d = !1;
            break;
          }
        f = !1, j && (k ? k.length && l(k.shift()) : d ? j = [] : m.disable());
      }, m = {
        add: function () {
          if (j) {
            var b = j.length;
            !function c(b) {
              $.each(b, function (b, d) {
                !$.isFunction(d) || a.unique && m.has(d) ? d && d.length && c(d) : j.push(d);
              });
            }(arguments), f ? h = j.length : d && (g = b, l(d));
          }
          return this;
        },
        remove: function () {
          return j && $.each(arguments, function (a, b) {
            for (var c; (c = $.inArray(b, j, c)) > -1;)
              j.splice(c, 1), f && (h >= c && h--, i >= c && i--);
          }), this;
        },
        has: function (a) {
          return $.inArray(a, j) > -1;
        },
        empty: function () {
          return j = [], this;
        },
        disable: function () {
          return j = k = d = b, this;
        },
        disabled: function () {
          return !j;
        },
        lock: function () {
          return k = b, d || m.disable(), this;
        },
        locked: function () {
          return !k;
        },
        fireWith: function (a, b) {
          return b = b || [], b = [
            a,
            b.slice ? b.slice() : b
          ], j && (!e || k) && (f ? k.push(b) : l(b)), this;
        },
        fire: function () {
          return m.fireWith(this, arguments), this;
        },
        fired: function () {
          return !!e;
        }
      };
    return m;
  }, $.extend({
    Deferred: function (a) {
      var b = [
          [
            'resolve',
            'done',
            $.Callbacks('once memory'),
            'resolved'
          ],
          [
            'reject',
            'fail',
            $.Callbacks('once memory'),
            'rejected'
          ],
          [
            'notify',
            'progress',
            $.Callbacks('memory')
          ]
        ], c = 'pending', d = {
          state: function () {
            return c;
          },
          always: function () {
            return e.done(arguments).fail(arguments), this;
          },
          then: function () {
            var a = arguments;
            return $.Deferred(function (c) {
              $.each(b, function (b, d) {
                var f = d[0], g = a[b];
                e[d[1]]($.isFunction(g) ? function () {
                  var a = g.apply(this, arguments);
                  a && $.isFunction(a.promise) ? a.promise().done(c.resolve).fail(c.reject).progress(c.notify) : c[f + 'With'](this === e ? c : this, [a]);
                } : c[f]);
              }), a = null;
            }).promise();
          },
          promise: function (a) {
            return 'object' == typeof a ? $.extend(a, d) : d;
          }
        }, e = {};
      return d.pipe = d.then, $.each(b, function (a, f) {
        var g = f[2], h = f[3];
        d[f[1]] = g.add, h && g.add(function () {
          c = h;
        }, b[1 ^ a][2].disable, b[2][2].lock), e[f[0]] = g.fire, e[f[0] + 'With'] = g.fireWith;
      }), d.promise(e), a && a.call(e, e), e;
    },
    when: function (a) {
      var b, c, d, e = 0, f = V.call(arguments), g = f.length, h = 1 !== g || a && $.isFunction(a.promise) ? g : 0, i = 1 === h ? a : $.Deferred(), j = function (a, c, d) {
          return function (e) {
            c[a] = this, d[a] = arguments.length > 1 ? V.call(arguments) : e, d === b ? i.notifyWith(c, d) : --h || i.resolveWith(c, d);
          };
        };
      if (g > 1)
        for (b = new Array(g), c = new Array(g), d = new Array(g); g > e; e++)
          f[e] && $.isFunction(f[e].promise) ? f[e].promise().done(j(e, d, f)).fail(i.reject).progress(j(e, c, b)) : --h;
      return h || i.resolveWith(d, f), i.promise();
    }
  }), $.support = function () {
    var b, c, d, e, f, g, h, i, j, k, l, m = P.createElement('div');
    if (m.setAttribute('className', 't'), m.innerHTML = '  <link/><table></table><a href=\'/a\'>a</a><input type=\'checkbox\'/>', c = m.getElementsByTagName('*'), d = m.getElementsByTagName('a')[0], d.style.cssText = 'top:1px;float:left;opacity:.5', !c || !c.length || !d)
      return {};
    e = P.createElement('select'), f = e.appendChild(P.createElement('option')), g = m.getElementsByTagName('input')[0], b = {
      leadingWhitespace: 3 === m.firstChild.nodeType,
      tbody: !m.getElementsByTagName('tbody').length,
      htmlSerialize: !!m.getElementsByTagName('link').length,
      style: /top/.test(d.getAttribute('style')),
      hrefNormalized: '/a' === d.getAttribute('href'),
      opacity: /^0.5/.test(d.style.opacity),
      cssFloat: !!d.style.cssFloat,
      checkOn: 'on' === g.value,
      optSelected: f.selected,
      getSetAttribute: 't' !== m.className,
      enctype: !!P.createElement('form').enctype,
      html5Clone: '<:nav></:nav>' !== P.createElement('nav').cloneNode(!0).outerHTML,
      boxModel: 'CSS1Compat' === P.compatMode,
      submitBubbles: !0,
      changeBubbles: !0,
      focusinBubbles: !1,
      deleteExpando: !0,
      noCloneEvent: !0,
      inlineBlockNeedsLayout: !1,
      shrinkWrapBlocks: !1,
      reliableMarginRight: !0,
      boxSizingReliable: !0,
      pixelPosition: !1
    }, g.checked = !0, b.noCloneChecked = g.cloneNode(!0).checked, e.disabled = !0, b.optDisabled = !f.disabled;
    try {
      delete m.test;
    } catch (n) {
      b.deleteExpando = !1;
    }
    if (!m.addEventListener && m.attachEvent && m.fireEvent && (m.attachEvent('onclick', l = function () {
        b.noCloneEvent = !1;
      }), m.cloneNode(!0).fireEvent('onclick'), m.detachEvent('onclick', l)), g = P.createElement('input'), g.value = 't', g.setAttribute('type', 'radio'), b.radioValue = 't' === g.value, g.setAttribute('checked', 'checked'), g.setAttribute('name', 't'), m.appendChild(g), h = P.createDocumentFragment(), h.appendChild(m.lastChild), b.checkClone = h.cloneNode(!0).cloneNode(!0).lastChild.checked, b.appendChecked = g.checked, h.removeChild(g), h.appendChild(m), m.attachEvent)
      for (j in {
          submit: !0,
          change: !0,
          focusin: !0
        })
        i = 'on' + j, k = i in m, k || (m.setAttribute(i, 'return;'), k = 'function' == typeof m[i]), b[j + 'Bubbles'] = k;
    return $(function () {
      var c, d, e, f, g = 'padding:0;margin:0;border:0;display:block;overflow:hidden;', h = P.getElementsByTagName('body')[0];
      h && (c = P.createElement('div'), c.style.cssText = 'visibility:hidden;border:0;width:0;height:0;position:static;top:0;margin-top:1px', h.insertBefore(c, h.firstChild), d = P.createElement('div'), c.appendChild(d), d.innerHTML = '<table><tr><td></td><td>t</td></tr></table>', e = d.getElementsByTagName('td'), e[0].style.cssText = 'padding:0;margin:0;border:0;display:none', k = 0 === e[0].offsetHeight, e[0].style.display = '', e[1].style.display = 'none', b.reliableHiddenOffsets = k && 0 === e[0].offsetHeight, d.innerHTML = '', d.style.cssText = 'box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%;', b.boxSizing = 4 === d.offsetWidth, b.doesNotIncludeMarginInBodyOffset = 1 !== h.offsetTop, a.getComputedStyle && (b.pixelPosition = '1%' !== (a.getComputedStyle(d, null) || {}).top, b.boxSizingReliable = '4px' === (a.getComputedStyle(d, null) || { width: '4px' }).width, f = P.createElement('div'), f.style.cssText = d.style.cssText = g, f.style.marginRight = f.style.width = '0', d.style.width = '1px', d.appendChild(f), b.reliableMarginRight = !parseFloat((a.getComputedStyle(f, null) || {}).marginRight)), 'undefined' != typeof d.style.zoom && (d.innerHTML = '', d.style.cssText = g + 'width:1px;padding:1px;display:inline;zoom:1', b.inlineBlockNeedsLayout = 3 === d.offsetWidth, d.style.display = 'block', d.style.overflow = 'visible', d.innerHTML = '<div></div>', d.firstChild.style.width = '5px', b.shrinkWrapBlocks = 3 !== d.offsetWidth, c.style.zoom = 1), h.removeChild(c), c = d = e = f = null);
    }), h.removeChild(m), c = d = e = f = g = h = m = null, b;
  }();
  var pb = /^(?:\{.*\}|\[.*\])$/, qb = /([A-Z])/g;
  $.extend({
    cache: {},
    deletedIds: [],
    uuid: 0,
    expando: 'jQuery' + ($.fn.jquery + Math.random()).replace(/\D/g, ''),
    noData: {
      embed: !0,
      object: 'clsid:D27CDB6E-AE6D-11cf-96B8-444553540000',
      applet: !0
    },
    hasData: function (a) {
      return a = a.nodeType ? $.cache[a[$.expando]] : a[$.expando], !!a && !e(a);
    },
    data: function (a, c, d, e) {
      if ($.acceptData(a)) {
        var f, g, h = $.expando, i = 'string' == typeof c, j = a.nodeType, k = j ? $.cache : a, l = j ? a[h] : a[h] && h;
        if (l && k[l] && (e || k[l].data) || !i || d !== b)
          return l || (j ? a[h] = l = $.deletedIds.pop() || ++$.uuid : l = h), k[l] || (k[l] = {}, j || (k[l].toJSON = $.noop)), ('object' == typeof c || 'function' == typeof c) && (e ? k[l] = $.extend(k[l], c) : k[l].data = $.extend(k[l].data, c)), f = k[l], e || (f.data || (f.data = {}), f = f.data), d !== b && (f[$.camelCase(c)] = d), i ? (g = f[c], null == g && (g = f[$.camelCase(c)])) : g = f, g;
      }
    },
    removeData: function (a, b, c) {
      if ($.acceptData(a)) {
        var d, f, g, h = a.nodeType, i = h ? $.cache : a, j = h ? a[$.expando] : $.expando;
        if (i[j]) {
          if (b && (d = c ? i[j] : i[j].data)) {
            $.isArray(b) || (b in d ? b = [b] : (b = $.camelCase(b), b = b in d ? [b] : b.split(' ')));
            for (f = 0, g = b.length; g > f; f++)
              delete d[b[f]];
            if (!(c ? e : $.isEmptyObject)(d))
              return;
          }
          (c || (delete i[j].data, e(i[j]))) && (h ? $.cleanData([a], !0) : $.support.deleteExpando || i != i.window ? delete i[j] : i[j] = null);
        }
      }
    },
    _data: function (a, b, c) {
      return $.data(a, b, c, !0);
    },
    acceptData: function (a) {
      var b = a.nodeName && $.noData[a.nodeName.toLowerCase()];
      return !b || b !== !0 && a.getAttribute('classid') === b;
    }
  }), $.fn.extend({
    data: function (a, c) {
      var e, f, g, h, i, j = this[0], k = 0, l = null;
      if (a === b) {
        if (this.length && (l = $.data(j), 1 === j.nodeType && !$._data(j, 'parsedAttrs'))) {
          for (g = j.attributes, i = g.length; i > k; k++)
            h = g[k].name, 0 === h.indexOf('data-') && (h = $.camelCase(h.substring(5)), d(j, h, l[h]));
          $._data(j, 'parsedAttrs', !0);
        }
        return l;
      }
      return 'object' == typeof a ? this.each(function () {
        $.data(this, a);
      }) : (e = a.split('.', 2), e[1] = e[1] ? '.' + e[1] : '', f = e[1] + '!', $.access(this, function (c) {
        return c === b ? (l = this.triggerHandler('getData' + f, [e[0]]), l === b && j && (l = $.data(j, a), l = d(j, a, l)), l === b && e[1] ? this.data(e[0]) : l) : (e[1] = c, this.each(function () {
          var b = $(this);
          b.triggerHandler('setData' + f, e), $.data(this, a, c), b.triggerHandler('changeData' + f, e);
        }), void 0);
      }, null, c, arguments.length > 1, null, !1));
    },
    removeData: function (a) {
      return this.each(function () {
        $.removeData(this, a);
      });
    }
  }), $.extend({
    queue: function (a, b, c) {
      var d;
      return a ? (b = (b || 'fx') + 'queue', d = $._data(a, b), c && (!d || $.isArray(c) ? d = $._data(a, b, $.makeArray(c)) : d.push(c)), d || []) : void 0;
    },
    dequeue: function (a, b) {
      b = b || 'fx';
      var c = $.queue(a, b), d = c.shift(), e = $._queueHooks(a, b), f = function () {
          $.dequeue(a, b);
        };
      'inprogress' === d && (d = c.shift()), d && ('fx' === b && c.unshift('inprogress'), delete e.stop, d.call(a, f, e)), !c.length && e && e.empty.fire();
    },
    _queueHooks: function (a, b) {
      var c = b + 'queueHooks';
      return $._data(a, c) || $._data(a, c, {
        empty: $.Callbacks('once memory').add(function () {
          $.removeData(a, b + 'queue', !0), $.removeData(a, c, !0);
        })
      });
    }
  }), $.fn.extend({
    queue: function (a, c) {
      var d = 2;
      return 'string' != typeof a && (c = a, a = 'fx', d--), arguments.length < d ? $.queue(this[0], a) : c === b ? this : this.each(function () {
        var b = $.queue(this, a, c);
        $._queueHooks(this, a), 'fx' === a && 'inprogress' !== b[0] && $.dequeue(this, a);
      });
    },
    dequeue: function (a) {
      return this.each(function () {
        $.dequeue(this, a);
      });
    },
    delay: function (a, b) {
      return a = $.fx ? $.fx.speeds[a] || a : a, b = b || 'fx', this.queue(b, function (b, c) {
        var d = setTimeout(b, a);
        c.stop = function () {
          clearTimeout(d);
        };
      });
    },
    clearQueue: function (a) {
      return this.queue(a || 'fx', []);
    },
    promise: function (a, c) {
      var d, e = 1, f = $.Deferred(), g = this, h = this.length, i = function () {
          --e || f.resolveWith(g, [g]);
        };
      for ('string' != typeof a && (c = a, a = b), a = a || 'fx'; h--;)
        (d = $._data(g[h], a + 'queueHooks')) && d.empty && (e++, d.empty.add(i));
      return i(), f.promise(c);
    }
  });
  var rb, sb, tb, ub = /[\t\r\n]/g, vb = /\r/g, wb = /^(?:button|input)$/i, xb = /^(?:button|input|object|select|textarea)$/i, yb = /^a(?:rea|)$/i, zb = /^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i, Ab = $.support.getSetAttribute;
  $.fn.extend({
    attr: function (a, b) {
      return $.access(this, $.attr, a, b, arguments.length > 1);
    },
    removeAttr: function (a) {
      return this.each(function () {
        $.removeAttr(this, a);
      });
    },
    prop: function (a, b) {
      return $.access(this, $.prop, a, b, arguments.length > 1);
    },
    removeProp: function (a) {
      return a = $.propFix[a] || a, this.each(function () {
        try {
          this[a] = b, delete this[a];
        } catch (c) {
        }
      });
    },
    addClass: function (a) {
      var b, c, d, e, f, g, h;
      if ($.isFunction(a))
        return this.each(function (b) {
          $(this).addClass(a.call(this, b, this.className));
        });
      if (a && 'string' == typeof a)
        for (b = a.split(bb), c = 0, d = this.length; d > c; c++)
          if (e = this[c], 1 === e.nodeType)
            if (e.className || 1 !== b.length) {
              for (f = ' ' + e.className + ' ', g = 0, h = b.length; h > g; g++)
                ~f.indexOf(' ' + b[g] + ' ') || (f += b[g] + ' ');
              e.className = $.trim(f);
            } else
              e.className = a;
      return this;
    },
    removeClass: function (a) {
      var c, d, e, f, g, h, i;
      if ($.isFunction(a))
        return this.each(function (b) {
          $(this).removeClass(a.call(this, b, this.className));
        });
      if (a && 'string' == typeof a || a === b)
        for (c = (a || '').split(bb), h = 0, i = this.length; i > h; h++)
          if (e = this[h], 1 === e.nodeType && e.className) {
            for (d = (' ' + e.className + ' ').replace(ub, ' '), f = 0, g = c.length; g > f; f++)
              for (; d.indexOf(' ' + c[f] + ' ') > -1;)
                d = d.replace(' ' + c[f] + ' ', ' ');
            e.className = a ? $.trim(d) : '';
          }
      return this;
    },
    toggleClass: function (a, b) {
      var c = typeof a, d = 'boolean' == typeof b;
      return $.isFunction(a) ? this.each(function (c) {
        $(this).toggleClass(a.call(this, c, this.className, b), b);
      }) : this.each(function () {
        if ('string' === c)
          for (var e, f = 0, g = $(this), h = b, i = a.split(bb); e = i[f++];)
            h = d ? h : !g.hasClass(e), g[h ? 'addClass' : 'removeClass'](e);
        else
          ('undefined' === c || 'boolean' === c) && (this.className && $._data(this, '__className__', this.className), this.className = this.className || a === !1 ? '' : $._data(this, '__className__') || '');
      });
    },
    hasClass: function (a) {
      for (var b = ' ' + a + ' ', c = 0, d = this.length; d > c; c++)
        if (1 === this[c].nodeType && (' ' + this[c].className + ' ').replace(ub, ' ').indexOf(b) > -1)
          return !0;
      return !1;
    },
    val: function (a) {
      var c, d, e, f = this[0];
      {
        if (arguments.length)
          return e = $.isFunction(a), this.each(function (d) {
            var f, g = $(this);
            1 === this.nodeType && (f = e ? a.call(this, d, g.val()) : a, null == f ? f = '' : 'number' == typeof f ? f += '' : $.isArray(f) && (f = $.map(f, function (a) {
              return null == a ? '' : a + '';
            })), c = $.valHooks[this.type] || $.valHooks[this.nodeName.toLowerCase()], c && 'set' in c && c.set(this, f, 'value') !== b || (this.value = f));
          });
        if (f)
          return c = $.valHooks[f.type] || $.valHooks[f.nodeName.toLowerCase()], c && 'get' in c && (d = c.get(f, 'value')) !== b ? d : (d = f.value, 'string' == typeof d ? d.replace(vb, '') : null == d ? '' : d);
      }
    }
  }), $.extend({
    valHooks: {
      option: {
        get: function (a) {
          var b = a.attributes.value;
          return !b || b.specified ? a.value : a.text;
        }
      },
      select: {
        get: function (a) {
          var b, c, d, e, f = a.selectedIndex, g = [], h = a.options, i = 'select-one' === a.type;
          if (0 > f)
            return null;
          for (c = i ? f : 0, d = i ? f + 1 : h.length; d > c; c++)
            if (e = h[c], !(!e.selected || ($.support.optDisabled ? e.disabled : null !== e.getAttribute('disabled')) || e.parentNode.disabled && $.nodeName(e.parentNode, 'optgroup'))) {
              if (b = $(e).val(), i)
                return b;
              g.push(b);
            }
          return i && !g.length && h.length ? $(h[f]).val() : g;
        },
        set: function (a, b) {
          var c = $.makeArray(b);
          return $(a).find('option').each(function () {
            this.selected = $.inArray($(this).val(), c) >= 0;
          }), c.length || (a.selectedIndex = -1), c;
        }
      }
    },
    attrFn: {},
    attr: function (a, c, d, e) {
      var f, g, h, i = a.nodeType;
      if (a && 3 !== i && 8 !== i && 2 !== i)
        return e && $.isFunction($.fn[c]) ? $(a)[c](d) : 'undefined' == typeof a.getAttribute ? $.prop(a, c, d) : (h = 1 !== i || !$.isXMLDoc(a), h && (c = c.toLowerCase(), g = $.attrHooks[c] || (zb.test(c) ? sb : rb)), d !== b ? null === d ? ($.removeAttr(a, c), void 0) : g && 'set' in g && h && (f = g.set(a, d, c)) !== b ? f : (a.setAttribute(c, '' + d), d) : g && 'get' in g && h && null !== (f = g.get(a, c)) ? f : (f = a.getAttribute(c), null === f ? b : f));
    },
    removeAttr: function (a, b) {
      var c, d, e, f, g = 0;
      if (b && 1 === a.nodeType)
        for (d = b.split(bb); g < d.length; g++)
          e = d[g], e && (c = $.propFix[e] || e, f = zb.test(e), f || $.attr(a, e, ''), a.removeAttribute(Ab ? e : c), f && c in a && (a[c] = !1));
    },
    attrHooks: {
      type: {
        set: function (a, b) {
          if (wb.test(a.nodeName) && a.parentNode)
            $.error('type property can\'t be changed');
          else if (!$.support.radioValue && 'radio' === b && $.nodeName(a, 'input')) {
            var c = a.value;
            return a.setAttribute('type', b), c && (a.value = c), b;
          }
        }
      },
      value: {
        get: function (a, b) {
          return rb && $.nodeName(a, 'button') ? rb.get(a, b) : b in a ? a.value : null;
        },
        set: function (a, b, c) {
          return rb && $.nodeName(a, 'button') ? rb.set(a, b, c) : (a.value = b, void 0);
        }
      }
    },
    propFix: {
      tabindex: 'tabIndex',
      readonly: 'readOnly',
      'for': 'htmlFor',
      'class': 'className',
      maxlength: 'maxLength',
      cellspacing: 'cellSpacing',
      cellpadding: 'cellPadding',
      rowspan: 'rowSpan',
      colspan: 'colSpan',
      usemap: 'useMap',
      frameborder: 'frameBorder',
      contenteditable: 'contentEditable'
    },
    prop: function (a, c, d) {
      var e, f, g, h = a.nodeType;
      if (a && 3 !== h && 8 !== h && 2 !== h)
        return g = 1 !== h || !$.isXMLDoc(a), g && (c = $.propFix[c] || c, f = $.propHooks[c]), d !== b ? f && 'set' in f && (e = f.set(a, d, c)) !== b ? e : a[c] = d : f && 'get' in f && null !== (e = f.get(a, c)) ? e : a[c];
    },
    propHooks: {
      tabIndex: {
        get: function (a) {
          var c = a.getAttributeNode('tabindex');
          return c && c.specified ? parseInt(c.value, 10) : xb.test(a.nodeName) || yb.test(a.nodeName) && a.href ? 0 : b;
        }
      }
    }
  }), sb = {
    get: function (a, c) {
      var d, e = $.prop(a, c);
      return e === !0 || 'boolean' != typeof e && (d = a.getAttributeNode(c)) && d.nodeValue !== !1 ? c.toLowerCase() : b;
    },
    set: function (a, b, c) {
      var d;
      return b === !1 ? $.removeAttr(a, c) : (d = $.propFix[c] || c, d in a && (a[d] = !0), a.setAttribute(c, c.toLowerCase())), c;
    }
  }, Ab || (tb = {
    name: !0,
    id: !0,
    coords: !0
  }, rb = $.valHooks.button = {
    get: function (a, c) {
      var d;
      return d = a.getAttributeNode(c), d && (tb[c] ? '' !== d.value : d.specified) ? d.value : b;
    },
    set: function (a, b, c) {
      var d = a.getAttributeNode(c);
      return d || (d = P.createAttribute(c), a.setAttributeNode(d)), d.value = b + '';
    }
  }, $.each([
    'width',
    'height'
  ], function (a, b) {
    $.attrHooks[b] = $.extend($.attrHooks[b], {
      set: function (a, c) {
        return '' === c ? (a.setAttribute(b, 'auto'), c) : void 0;
      }
    });
  }), $.attrHooks.contenteditable = {
    get: rb.get,
    set: function (a, b, c) {
      '' === b && (b = 'false'), rb.set(a, b, c);
    }
  }), $.support.hrefNormalized || $.each([
    'href',
    'src',
    'width',
    'height'
  ], function (a, c) {
    $.attrHooks[c] = $.extend($.attrHooks[c], {
      get: function (a) {
        var d = a.getAttribute(c, 2);
        return null === d ? b : d;
      }
    });
  }), $.support.style || ($.attrHooks.style = {
    get: function (a) {
      return a.style.cssText.toLowerCase() || b;
    },
    set: function (a, b) {
      return a.style.cssText = '' + b;
    }
  }), $.support.optSelected || ($.propHooks.selected = $.extend($.propHooks.selected, {
    get: function (a) {
      var b = a.parentNode;
      return b && (b.selectedIndex, b.parentNode && b.parentNode.selectedIndex), null;
    }
  })), $.support.enctype || ($.propFix.enctype = 'encoding'), $.support.checkOn || $.each([
    'radio',
    'checkbox'
  ], function () {
    $.valHooks[this] = {
      get: function (a) {
        return null === a.getAttribute('value') ? 'on' : a.value;
      }
    };
  }), $.each([
    'radio',
    'checkbox'
  ], function () {
    $.valHooks[this] = $.extend($.valHooks[this], {
      set: function (a, b) {
        return $.isArray(b) ? a.checked = $.inArray($(a).val(), b) >= 0 : void 0;
      }
    });
  });
  var Bb = /^(?:textarea|input|select)$/i, Cb = /^([^\.]*|)(?:\.(.+)|)$/, Db = /(?:^|\s)hover(\.\S+|)\b/, Eb = /^key/, Fb = /^(?:mouse|contextmenu)|click/, Gb = /^(?:focusinfocus|focusoutblur)$/, Hb = function (a) {
      return $.event.special.hover ? a : a.replace(Db, 'mouseenter$1 mouseleave$1');
    };
  $.event = {
    add: function (a, c, d, e, f) {
      var g, h, i, j, k, l, m, n, o, p, q;
      if (3 !== a.nodeType && 8 !== a.nodeType && c && d && (g = $._data(a))) {
        for (d.handler && (o = d, d = o.handler, f = o.selector), d.guid || (d.guid = $.guid++), i = g.events, i || (g.events = i = {}), h = g.handle, h || (g.handle = h = function (a) {
            return 'undefined' == typeof $ || a && $.event.triggered === a.type ? b : $.event.dispatch.apply(h.elem, arguments);
          }, h.elem = a), c = $.trim(Hb(c)).split(' '), j = 0; j < c.length; j++)
          k = Cb.exec(c[j]) || [], l = k[1], m = (k[2] || '').split('.').sort(), q = $.event.special[l] || {}, l = (f ? q.delegateType : q.bindType) || l, q = $.event.special[l] || {}, n = $.extend({
            type: l,
            origType: k[1],
            data: e,
            handler: d,
            guid: d.guid,
            selector: f,
            namespace: m.join('.')
          }, o), p = i[l], p || (p = i[l] = [], p.delegateCount = 0, q.setup && q.setup.call(a, e, m, h) !== !1 || (a.addEventListener ? a.addEventListener(l, h, !1) : a.attachEvent && a.attachEvent('on' + l, h))), q.add && (q.add.call(a, n), n.handler.guid || (n.handler.guid = d.guid)), f ? p.splice(p.delegateCount++, 0, n) : p.push(n), $.event.global[l] = !0;
        a = null;
      }
    },
    global: {},
    remove: function (a, b, c, d, e) {
      var f, g, h, i, j, k, l, m, n, o, p, q = $.hasData(a) && $._data(a);
      if (q && (m = q.events)) {
        for (b = $.trim(Hb(b || '')).split(' '), f = 0; f < b.length; f++)
          if (g = Cb.exec(b[f]) || [], h = i = g[1], j = g[2], h) {
            for (n = $.event.special[h] || {}, h = (d ? n.delegateType : n.bindType) || h, o = m[h] || [], k = o.length, j = j ? new RegExp('(^|\\.)' + j.split('.').sort().join('\\.(?:.*\\.|)') + '(\\.|$)') : null, l = 0; l < o.length; l++)
              p = o[l], !(!e && i !== p.origType || c && c.guid !== p.guid || j && !j.test(p.namespace) || d && d !== p.selector && ('**' !== d || !p.selector) || (o.splice(l--, 1), p.selector && o.delegateCount--, !n.remove || !n.remove.call(a, p)));
            0 === o.length && k !== o.length && ((!n.teardown || n.teardown.call(a, j, q.handle) === !1) && $.removeEvent(a, h, q.handle), delete m[h]);
          } else
            for (h in m)
              $.event.remove(a, h + b[f], c, d, !0);
        $.isEmptyObject(m) && (delete q.handle, $.removeData(a, 'events', !0));
      }
    },
    customEvent: {
      getData: !0,
      setData: !0,
      changeData: !0
    },
    trigger: function (c, d, e, f) {
      if (!e || 3 !== e.nodeType && 8 !== e.nodeType) {
        var g, h, i, j, k, l, m, n, o, p, q = c.type || c, r = [];
        if (Gb.test(q + $.event.triggered))
          return;
        if (q.indexOf('!') >= 0 && (q = q.slice(0, -1), h = !0), q.indexOf('.') >= 0 && (r = q.split('.'), q = r.shift(), r.sort()), (!e || $.event.customEvent[q]) && !$.event.global[q])
          return;
        if (c = 'object' == typeof c ? c[$.expando] ? c : new $.Event(q, c) : new $.Event(q), c.type = q, c.isTrigger = !0, c.exclusive = h, c.namespace = r.join('.'), c.namespace_re = c.namespace ? new RegExp('(^|\\.)' + r.join('\\.(?:.*\\.|)') + '(\\.|$)') : null, l = q.indexOf(':') < 0 ? 'on' + q : '', !e) {
          g = $.cache;
          for (i in g)
            g[i].events && g[i].events[q] && $.event.trigger(c, d, g[i].handle.elem, !0);
          return;
        }
        if (c.result = b, c.target || (c.target = e), d = null != d ? $.makeArray(d) : [], d.unshift(c), m = $.event.special[q] || {}, m.trigger && m.trigger.apply(e, d) === !1)
          return;
        if (o = [[
              e,
              m.bindType || q
            ]], !f && !m.noBubble && !$.isWindow(e)) {
          for (p = m.delegateType || q, j = Gb.test(p + q) ? e : e.parentNode, k = e; j; j = j.parentNode)
            o.push([
              j,
              p
            ]), k = j;
          k === (e.ownerDocument || P) && o.push([
            k.defaultView || k.parentWindow || a,
            p
          ]);
        }
        for (i = 0; i < o.length && !c.isPropagationStopped(); i++)
          j = o[i][0], c.type = o[i][1], n = ($._data(j, 'events') || {})[c.type] && $._data(j, 'handle'), n && n.apply(j, d), n = l && j[l], n && $.acceptData(j) && n.apply(j, d) === !1 && c.preventDefault();
        return c.type = q, !(f || c.isDefaultPrevented() || m._default && m._default.apply(e.ownerDocument, d) !== !1 || 'click' === q && $.nodeName(e, 'a') || !$.acceptData(e) || !l || !e[q] || ('focus' === q || 'blur' === q) && 0 === c.target.offsetWidth || $.isWindow(e) || (k = e[l], k && (e[l] = null), $.event.triggered = q, e[q](), $.event.triggered = b, !k || !(e[l] = k))), c.result;
      }
    },
    dispatch: function (c) {
      c = $.event.fix(c || a.event);
      var d, e, f, g, h, i, j, k, l, m, n = ($._data(this, 'events') || {})[c.type] || [], o = n.delegateCount, p = [].slice.call(arguments), q = !c.exclusive && !c.namespace, r = $.event.special[c.type] || {}, s = [];
      if (p[0] = c, c.delegateTarget = this, !r.preDispatch || r.preDispatch.call(this, c) !== !1) {
        if (o && (!c.button || 'click' !== c.type))
          for (g = $(this), g.context = this, f = c.target; f != this; f = f.parentNode || this)
            if (f.disabled !== !0 || 'click' !== c.type) {
              for (i = {}, k = [], g[0] = f, d = 0; o > d; d++)
                l = n[d], m = l.selector, i[m] === b && (i[m] = g.is(m)), i[m] && k.push(l);
              k.length && s.push({
                elem: f,
                matches: k
              });
            }
        for (n.length > o && s.push({
            elem: this,
            matches: n.slice(o)
          }), d = 0; d < s.length && !c.isPropagationStopped(); d++)
          for (j = s[d], c.currentTarget = j.elem, e = 0; e < j.matches.length && !c.isImmediatePropagationStopped(); e++)
            l = j.matches[e], (q || !c.namespace && !l.namespace || c.namespace_re && c.namespace_re.test(l.namespace)) && (c.data = l.data, c.handleObj = l, h = (($.event.special[l.origType] || {}).handle || l.handler).apply(j.elem, p), h !== b && (c.result = h, h === !1 && (c.preventDefault(), c.stopPropagation())));
        return r.postDispatch && r.postDispatch.call(this, c), c.result;
      }
    },
    props: 'attrChange attrName relatedNode srcElement altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which'.split(' '),
    fixHooks: {},
    keyHooks: {
      props: 'char charCode key keyCode'.split(' '),
      filter: function (a, b) {
        return null == a.which && (a.which = null != b.charCode ? b.charCode : b.keyCode), a;
      }
    },
    mouseHooks: {
      props: 'button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement'.split(' '),
      filter: function (a, c) {
        var d, e, f, g = c.button, h = c.fromElement;
        return null == a.pageX && null != c.clientX && (d = a.target.ownerDocument || P, e = d.documentElement, f = d.body, a.pageX = c.clientX + (e && e.scrollLeft || f && f.scrollLeft || 0) - (e && e.clientLeft || f && f.clientLeft || 0), a.pageY = c.clientY + (e && e.scrollTop || f && f.scrollTop || 0) - (e && e.clientTop || f && f.clientTop || 0)), !a.relatedTarget && h && (a.relatedTarget = h === a.target ? c.toElement : h), !a.which && g !== b && (a.which = 1 & g ? 1 : 2 & g ? 3 : 4 & g ? 2 : 0), a;
      }
    },
    fix: function (a) {
      if (a[$.expando])
        return a;
      var b, c, d = a, e = $.event.fixHooks[a.type] || {}, f = e.props ? this.props.concat(e.props) : this.props;
      for (a = $.Event(d), b = f.length; b;)
        c = f[--b], a[c] = d[c];
      return a.target || (a.target = d.srcElement || P), 3 === a.target.nodeType && (a.target = a.target.parentNode), a.metaKey = !!a.metaKey, e.filter ? e.filter(a, d) : a;
    },
    special: {
      ready: { setup: $.bindReady },
      load: { noBubble: !0 },
      focus: { delegateType: 'focusin' },
      blur: { delegateType: 'focusout' },
      beforeunload: {
        setup: function (a, b, c) {
          $.isWindow(this) && (this.onbeforeunload = c);
        },
        teardown: function (a, b) {
          this.onbeforeunload === b && (this.onbeforeunload = null);
        }
      }
    },
    simulate: function (a, b, c, d) {
      var e = $.extend(new $.Event(), c, {
          type: a,
          isSimulated: !0,
          originalEvent: {}
        });
      d ? $.event.trigger(e, null, b) : $.event.dispatch.call(b, e), e.isDefaultPrevented() && c.preventDefault();
    }
  }, $.event.handle = $.event.dispatch, $.removeEvent = P.removeEventListener ? function (a, b, c) {
    a.removeEventListener && a.removeEventListener(b, c, !1);
  } : function (a, b, c) {
    var d = 'on' + b;
    a.detachEvent && ('undefined' == typeof a[d] && (a[d] = null), a.detachEvent(d, c));
  }, $.Event = function (a, b) {
    return this instanceof $.Event ? (a && a.type ? (this.originalEvent = a, this.type = a.type, this.isDefaultPrevented = a.defaultPrevented || a.returnValue === !1 || a.getPreventDefault && a.getPreventDefault() ? g : f) : this.type = a, b && $.extend(this, b), this.timeStamp = a && a.timeStamp || $.now(), this[$.expando] = !0, void 0) : new $.Event(a, b);
  }, $.Event.prototype = {
    preventDefault: function () {
      this.isDefaultPrevented = g;
      var a = this.originalEvent;
      a && (a.preventDefault ? a.preventDefault() : a.returnValue = !1);
    },
    stopPropagation: function () {
      this.isPropagationStopped = g;
      var a = this.originalEvent;
      a && (a.stopPropagation && a.stopPropagation(), a.cancelBubble = !0);
    },
    stopImmediatePropagation: function () {
      this.isImmediatePropagationStopped = g, this.stopPropagation();
    },
    isDefaultPrevented: f,
    isPropagationStopped: f,
    isImmediatePropagationStopped: f
  }, $.each({
    mouseenter: 'mouseover',
    mouseleave: 'mouseout'
  }, function (a, b) {
    $.event.special[a] = {
      delegateType: b,
      bindType: b,
      handle: function (a) {
        var c, d = this, e = a.relatedTarget, f = a.handleObj;
        return f.selector, (!e || e !== d && !$.contains(d, e)) && (a.type = f.origType, c = f.handler.apply(this, arguments), a.type = b), c;
      }
    };
  }), $.support.submitBubbles || ($.event.special.submit = {
    setup: function () {
      return $.nodeName(this, 'form') ? !1 : ($.event.add(this, 'click._submit keypress._submit', function (a) {
        var c = a.target, d = $.nodeName(c, 'input') || $.nodeName(c, 'button') ? c.form : b;
        d && !$._data(d, '_submit_attached') && ($.event.add(d, 'submit._submit', function (a) {
          a._submit_bubble = !0;
        }), $._data(d, '_submit_attached', !0));
      }), void 0);
    },
    postDispatch: function (a) {
      a._submit_bubble && (delete a._submit_bubble, this.parentNode && !a.isTrigger && $.event.simulate('submit', this.parentNode, a, !0));
    },
    teardown: function () {
      return $.nodeName(this, 'form') ? !1 : ($.event.remove(this, '._submit'), void 0);
    }
  }), $.support.changeBubbles || ($.event.special.change = {
    setup: function () {
      return Bb.test(this.nodeName) ? (('checkbox' === this.type || 'radio' === this.type) && ($.event.add(this, 'propertychange._change', function (a) {
        'checked' === a.originalEvent.propertyName && (this._just_changed = !0);
      }), $.event.add(this, 'click._change', function (a) {
        this._just_changed && !a.isTrigger && (this._just_changed = !1), $.event.simulate('change', this, a, !0);
      })), !1) : ($.event.add(this, 'beforeactivate._change', function (a) {
        var b = a.target;
        Bb.test(b.nodeName) && !$._data(b, '_change_attached') && ($.event.add(b, 'change._change', function (a) {
          this.parentNode && !a.isSimulated && !a.isTrigger && $.event.simulate('change', this.parentNode, a, !0);
        }), $._data(b, '_change_attached', !0));
      }), void 0);
    },
    handle: function (a) {
      var b = a.target;
      return this !== b || a.isSimulated || a.isTrigger || 'radio' !== b.type && 'checkbox' !== b.type ? a.handleObj.handler.apply(this, arguments) : void 0;
    },
    teardown: function () {
      return $.event.remove(this, '._change'), Bb.test(this.nodeName);
    }
  }), $.support.focusinBubbles || $.each({
    focus: 'focusin',
    blur: 'focusout'
  }, function (a, b) {
    var c = 0, d = function (a) {
        $.event.simulate(b, a.target, $.event.fix(a), !0);
      };
    $.event.special[b] = {
      setup: function () {
        0 === c++ && P.addEventListener(a, d, !0);
      },
      teardown: function () {
        0 === --c && P.removeEventListener(a, d, !0);
      }
    };
  }), $.fn.extend({
    on: function (a, c, d, e, g) {
      var h, i;
      if ('object' == typeof a) {
        'string' != typeof c && (d = d || c, c = b);
        for (i in a)
          this.on(i, c, d, a[i], g);
        return this;
      }
      if (null == d && null == e ? (e = c, d = c = b) : null == e && ('string' == typeof c ? (e = d, d = b) : (e = d, d = c, c = b)), e === !1)
        e = f;
      else if (!e)
        return this;
      return 1 === g && (h = e, e = function (a) {
        return $().off(a), h.apply(this, arguments);
      }, e.guid = h.guid || (h.guid = $.guid++)), this.each(function () {
        $.event.add(this, a, e, d, c);
      });
    },
    one: function (a, b, c, d) {
      return this.on(a, b, c, d, 1);
    },
    off: function (a, c, d) {
      var e, g;
      if (a && a.preventDefault && a.handleObj)
        return e = a.handleObj, $(a.delegateTarget).off(e.namespace ? e.origType + '.' + e.namespace : e.origType, e.selector, e.handler), this;
      if ('object' == typeof a) {
        for (g in a)
          this.off(g, c, a[g]);
        return this;
      }
      return (c === !1 || 'function' == typeof c) && (d = c, c = b), d === !1 && (d = f), this.each(function () {
        $.event.remove(this, a, d, c);
      });
    },
    bind: function (a, b, c) {
      return this.on(a, null, b, c);
    },
    unbind: function (a, b) {
      return this.off(a, null, b);
    },
    live: function (a, b, c) {
      return $(this.context).on(a, this.selector, b, c), this;
    },
    die: function (a, b) {
      return $(this.context).off(a, this.selector || '**', b), this;
    },
    delegate: function (a, b, c, d) {
      return this.on(b, a, c, d);
    },
    undelegate: function (a, b, c) {
      return 1 == arguments.length ? this.off(a, '**') : this.off(b, a || '**', c);
    },
    trigger: function (a, b) {
      return this.each(function () {
        $.event.trigger(a, b, this);
      });
    },
    triggerHandler: function (a, b) {
      return this[0] ? $.event.trigger(a, b, this[0], !0) : void 0;
    },
    toggle: function (a) {
      var b = arguments, c = a.guid || $.guid++, d = 0, e = function (c) {
          var e = ($._data(this, 'lastToggle' + a.guid) || 0) % d;
          return $._data(this, 'lastToggle' + a.guid, e + 1), c.preventDefault(), b[e].apply(this, arguments) || !1;
        };
      for (e.guid = c; d < b.length;)
        b[d++].guid = c;
      return this.click(e);
    },
    hover: function (a, b) {
      return this.mouseenter(a).mouseleave(b || a);
    }
  }), $.each('blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu'.split(' '), function (a, b) {
    $.fn[b] = function (a, c) {
      return null == c && (c = a, a = null), arguments.length > 0 ? this.on(b, null, a, c) : this.trigger(b);
    }, Eb.test(b) && ($.event.fixHooks[b] = $.event.keyHooks), Fb.test(b) && ($.event.fixHooks[b] = $.event.mouseHooks);
  }), function (a, b) {
    function c(a, b, c, d) {
      for (var e = 0, f = b.length; f > e; e++)
        fb(a, b[e], c, d);
    }
    function d(a, b, d, e, f, g) {
      var h, i = gb.setFilters[b.toLowerCase()];
      return i || fb.error(b), (a || !(h = f)) && c(a || '*', e, h = [], f), h.length > 0 ? i(h, d, g) : [];
    }
    function e(a, e, f, g, h) {
      for (var i, j, k, l, m, n, o, p, q = 0, r = h.length, s = S.POS, t = new RegExp('^' + s.source + '(?!' + y + ')', 'i'), u = function () {
            for (var a = 1, c = arguments.length - 2; c > a; a++)
              arguments[a] === b && (i[a] = b);
          }; r > q; q++) {
        for (s.exec(''), a = h[q], l = [], k = 0, m = g; i = s.exec(a);)
          p = s.lastIndex = i.index + i[0].length, p > k && (o = a.slice(k, i.index), k = p, n = [e], I.test(o) && (m && (n = m), m = g), (j = O.test(o)) && (o = o.slice(0, -5).replace(I, '$&*')), i.length > 1 && i[0].replace(t, u), m = d(o, i[1], i[2], n, m, j));
        m ? (l = l.concat(m), (o = a.slice(k)) && ')' !== o ? I.test(o) ? c(o, l, f, g) : fb(o, e, f, g ? g.concat(m) : m) : w.apply(f, l)) : fb(a, e, f, g);
      }
      return 1 === r ? f : fb.uniqueSort(f);
    }
    function f(a, b, c) {
      for (var d, e, f, g = [], h = 0, i = K.exec(a), j = !i.pop() && !i.pop(), k = j && a.match(J) || [''], l = gb.preFilter, m = gb.filter, n = !c && b !== p; null != (e = k[h]) && j; h++)
        for (g.push(d = []), n && (e = ' ' + e); e;) {
          j = !1, (i = I.exec(e)) && (e = e.slice(i[0].length), j = d.push({
            part: i.pop().replace(H, ' '),
            captures: i
          }));
          for (f in m)
            (i = S[f].exec(e)) && (!l[f] || (i = l[f](i, b, c))) && (e = e.slice(i.shift().length), j = d.push({
              part: f,
              captures: i
            }));
          if (!j)
            break;
        }
      return j || fb.error(a), g;
    }
    function g(a, b, c) {
      var d = b.dir, e = u++;
      return a || (a = function (a) {
        return a === c;
      }), b.first ? function (b, c) {
        for (; b = b[d];)
          if (1 === b.nodeType)
            return a(b, c) && b;
      } : function (b, c) {
        for (var f, g = e + '.' + l, h = g + '.' + k; b = b[d];)
          if (1 === b.nodeType) {
            if ((f = b[x]) === h)
              return b.sizset;
            if ('string' == typeof f && 0 === f.indexOf(g)) {
              if (b.sizset)
                return b;
            } else {
              if (b[x] = h, a(b, c))
                return b.sizset = !0, b;
              b.sizset = !1;
            }
          }
      };
    }
    function h(a, b) {
      return a ? function (c, d) {
        var e = b(c, d);
        return e && a(e === !0 ? c : e, d);
      } : b;
    }
    function i(a, b, c) {
      for (var d, e, f = 0; d = a[f]; f++)
        gb.relative[d.part] ? e = g(e, gb.relative[d.part], b) : (d.captures.push(b, c), e = h(e, gb.filter[d.part].apply(null, d.captures)));
      return e;
    }
    function j(a) {
      return function (b, c) {
        for (var d, e = 0; d = a[e]; e++)
          if (d(b, c))
            return !0;
        return !1;
      };
    }
    var k, l, m, n, o, p = a.document, q = p.documentElement, r = 'undefined', s = !1, t = !0, u = 0, v = [].slice, w = [].push, x = ('sizcache' + Math.random()).replace('.', ''), y = '[\\x20\\t\\r\\n\\f]', z = '(?:\\\\.|[-\\w]|[^\\x00-\\xa0])+', A = z.replace('w', 'w#'), B = '([*^$|!~]?=)', C = '\\[' + y + '*(' + z + ')' + y + '*(?:' + B + y + '*(?:([\'"])((?:\\\\.|[^\\\\])*?)\\3|(' + A + ')|)|)' + y + '*\\]', D = ':(' + z + ')(?:\\((?:([\'"])((?:\\\\.|[^\\\\])*?)\\2|((?:[^,]|\\\\,|(?:,(?=[^\\[]*\\]))|(?:,(?=[^\\(]*\\))))*))\\)|)', E = ':(nth|eq|gt|lt|first|last|even|odd)(?:\\((\\d*)\\)|)(?=[^-]|$)', F = y + '*([\\x20\\t\\r\\n\\f>+~])' + y + '*', G = '(?=[^\\x20\\t\\r\\n\\f])(?:\\\\.|' + C + '|' + D.replace(2, 7) + '|[^\\\\(),])+', H = new RegExp('^' + y + '+|((?:^|[^\\\\])(?:\\\\.)*)' + y + '+$', 'g'), I = new RegExp('^' + F), J = new RegExp(G + '?(?=' + y + '*,|$)', 'g'), K = new RegExp('^(?:(?!,)(?:(?:^|,)' + y + '*' + G + ')*?|' + y + '*(.*?))(\\)|$)'), L = new RegExp(G.slice(19, -6) + '\\x20\\t\\r\\n\\f>+~])+|' + F, 'g'), M = /^(?:#([\w\-]+)|(\w+)|\.([\w\-]+))$/, N = /[\x20\t\r\n\f]*[+~]/, O = /:not\($/, P = /h\d/i, Q = /input|select|textarea|button/i, R = /\\(?!\\)/g, S = {
        ID: new RegExp('^#(' + z + ')'),
        CLASS: new RegExp('^\\.(' + z + ')'),
        NAME: new RegExp('^\\[name=[\'"]?(' + z + ')[\'"]?\\]'),
        TAG: new RegExp('^(' + z.replace('[-', '[-\\*') + ')'),
        ATTR: new RegExp('^' + C),
        PSEUDO: new RegExp('^' + D),
        CHILD: new RegExp('^:(only|nth|last|first)-child(?:\\(' + y + '*(even|odd|(([+-]|)(\\d*)n|)' + y + '*(?:([+-]|)' + y + '*(\\d+)|))' + y + '*\\)|)', 'i'),
        POS: new RegExp(E, 'ig'),
        needsContext: new RegExp('^' + y + '*[>+~]|' + E, 'i')
      }, T = {}, U = [], V = {}, W = [], X = function (a) {
        return a.sizzleFilter = !0, a;
      }, Y = function (a) {
        return function (b) {
          return 'input' === b.nodeName.toLowerCase() && b.type === a;
        };
      }, Z = function (a) {
        return function (b) {
          var c = b.nodeName.toLowerCase();
          return ('input' === c || 'button' === c) && b.type === a;
        };
      }, _ = function (a) {
        var b = !1, c = p.createElement('div');
        try {
          b = a(c);
        } catch (d) {
        }
        return c = null, b;
      }, ab = _(function (a) {
        a.innerHTML = '<select></select>';
        var b = typeof a.lastChild.getAttribute('multiple');
        return 'boolean' !== b && 'string' !== b;
      }), bb = _(function (a) {
        a.id = x + 0, a.innerHTML = '<a name=\'' + x + '\'></a><div name=\'' + x + '\'></div>', q.insertBefore(a, q.firstChild);
        var b = p.getElementsByName && p.getElementsByName(x).length === 2 + p.getElementsByName(x + 0).length;
        return o = !p.getElementById(x), q.removeChild(a), b;
      }), cb = _(function (a) {
        return a.appendChild(p.createComment('')), 0 === a.getElementsByTagName('*').length;
      }), db = _(function (a) {
        return a.innerHTML = '<a href=\'#\'></a>', a.firstChild && typeof a.firstChild.getAttribute !== r && '#' === a.firstChild.getAttribute('href');
      }), eb = _(function (a) {
        return a.innerHTML = '<div class=\'hidden e\'></div><div class=\'hidden\'></div>', a.getElementsByClassName && 0 !== a.getElementsByClassName('e').length ? (a.lastChild.className = 'e', 1 !== a.getElementsByClassName('e').length) : !1;
      }), fb = function (a, b, c, d) {
        c = c || [], b = b || p;
        var e, f, g, h, i = b.nodeType;
        if (1 !== i && 9 !== i)
          return [];
        if (!a || 'string' != typeof a)
          return c;
        if (g = ib(b), !g && !d && (e = M.exec(a)))
          if (h = e[1]) {
            if (9 === i) {
              if (f = b.getElementById(h), !f || !f.parentNode)
                return c;
              if (f.id === h)
                return c.push(f), c;
            } else if (b.ownerDocument && (f = b.ownerDocument.getElementById(h)) && jb(b, f) && f.id === h)
              return c.push(f), c;
          } else {
            if (e[2])
              return w.apply(c, v.call(b.getElementsByTagName(a), 0)), c;
            if ((h = e[3]) && eb && b.getElementsByClassName)
              return w.apply(c, v.call(b.getElementsByClassName(h), 0)), c;
          }
        return mb(a, b, c, d, g);
      }, gb = fb.selectors = {
        cacheLength: 50,
        match: S,
        order: [
          'ID',
          'TAG'
        ],
        attrHandle: {},
        createPseudo: X,
        find: {
          ID: o ? function (a, b, c) {
            if (typeof b.getElementById !== r && !c) {
              var d = b.getElementById(a);
              return d && d.parentNode ? [d] : [];
            }
          } : function (a, c, d) {
            if (typeof c.getElementById !== r && !d) {
              var e = c.getElementById(a);
              return e ? e.id === a || typeof e.getAttributeNode !== r && e.getAttributeNode('id').value === a ? [e] : b : [];
            }
          },
          TAG: cb ? function (a, b) {
            return typeof b.getElementsByTagName !== r ? b.getElementsByTagName(a) : void 0;
          } : function (a, b) {
            var c = b.getElementsByTagName(a);
            if ('*' === a) {
              for (var d, e = [], f = 0; d = c[f]; f++)
                1 === d.nodeType && e.push(d);
              return e;
            }
            return c;
          }
        },
        relative: {
          '>': {
            dir: 'parentNode',
            first: !0
          },
          ' ': { dir: 'parentNode' },
          '+': {
            dir: 'previousSibling',
            first: !0
          },
          '~': { dir: 'previousSibling' }
        },
        preFilter: {
          ATTR: function (a) {
            return a[1] = a[1].replace(R, ''), a[3] = (a[4] || a[5] || '').replace(R, ''), '~=' === a[2] && (a[3] = ' ' + a[3] + ' '), a.slice(0, 4);
          },
          CHILD: function (a) {
            return a[1] = a[1].toLowerCase(), 'nth' === a[1] ? (a[2] || fb.error(a[0]), a[3] = +(a[3] ? a[4] + (a[5] || 1) : 2 * ('even' === a[2] || 'odd' === a[2])), a[4] = +(a[6] + a[7] || 'odd' === a[2])) : a[2] && fb.error(a[0]), a;
          },
          PSEUDO: function (a) {
            var b, c = a[4];
            return S.CHILD.test(a[0]) ? null : (c && (b = K.exec(c)) && b.pop() && (a[0] = a[0].slice(0, b[0].length - c.length - 1), c = b[0].slice(0, -1)), a.splice(2, 3, c || a[3]), a);
          }
        },
        filter: {
          ID: o ? function (a) {
            return a = a.replace(R, ''), function (b) {
              return b.getAttribute('id') === a;
            };
          } : function (a) {
            return a = a.replace(R, ''), function (b) {
              var c = typeof b.getAttributeNode !== r && b.getAttributeNode('id');
              return c && c.value === a;
            };
          },
          TAG: function (a) {
            return '*' === a ? function () {
              return !0;
            } : (a = a.replace(R, '').toLowerCase(), function (b) {
              return b.nodeName && b.nodeName.toLowerCase() === a;
            });
          },
          CLASS: function (a) {
            var b = T[a];
            return b || (b = T[a] = new RegExp('(^|' + y + ')' + a + '(' + y + '|$)'), U.push(a), U.length > gb.cacheLength && delete T[U.shift()]), function (a) {
              return b.test(a.className || typeof a.getAttribute !== r && a.getAttribute('class') || '');
            };
          },
          ATTR: function (a, b, c) {
            return b ? function (d) {
              var e = fb.attr(d, a), f = e + '';
              if (null == e)
                return '!=' === b;
              switch (b) {
              case '=':
                return f === c;
              case '!=':
                return f !== c;
              case '^=':
                return c && 0 === f.indexOf(c);
              case '*=':
                return c && f.indexOf(c) > -1;
              case '$=':
                return c && f.substr(f.length - c.length) === c;
              case '~=':
                return (' ' + f + ' ').indexOf(c) > -1;
              case '|=':
                return f === c || f.substr(0, c.length + 1) === c + '-';
              }
            } : function (b) {
              return null != fb.attr(b, a);
            };
          },
          CHILD: function (a, b, c, d) {
            if ('nth' === a) {
              var e = u++;
              return function (a) {
                var b, f, g = 0, h = a;
                if (1 === c && 0 === d)
                  return !0;
                if (b = a.parentNode, b && (b[x] !== e || !a.sizset)) {
                  for (h = b.firstChild; h && (1 !== h.nodeType || (h.sizset = ++g, h !== a)); h = h.nextSibling);
                  b[x] = e;
                }
                return f = a.sizset - d, 0 === c ? 0 === f : 0 === f % c && f / c >= 0;
              };
            }
            return function (b) {
              var c = b;
              switch (a) {
              case 'only':
              case 'first':
                for (; c = c.previousSibling;)
                  if (1 === c.nodeType)
                    return !1;
                if ('first' === a)
                  return !0;
                c = b;
              case 'last':
                for (; c = c.nextSibling;)
                  if (1 === c.nodeType)
                    return !1;
                return !0;
              }
            };
          },
          PSEUDO: function (a, b, c, d) {
            var e = gb.pseudos[a] || gb.pseudos[a.toLowerCase()];
            return e || fb.error('unsupported pseudo: ' + a), e.sizzleFilter ? e(b, c, d) : e;
          }
        },
        pseudos: {
          not: X(function (a, b, c) {
            var d = lb(a.replace(H, '$1'), b, c);
            return function (a) {
              return !d(a);
            };
          }),
          enabled: function (a) {
            return a.disabled === !1;
          },
          disabled: function (a) {
            return a.disabled === !0;
          },
          checked: function (a) {
            var b = a.nodeName.toLowerCase();
            return 'input' === b && !!a.checked || 'option' === b && !!a.selected;
          },
          selected: function (a) {
            return a.parentNode && a.parentNode.selectedIndex, a.selected === !0;
          },
          parent: function (a) {
            return !gb.pseudos.empty(a);
          },
          empty: function (a) {
            var b;
            for (a = a.firstChild; a;) {
              if (a.nodeName > '@' || 3 === (b = a.nodeType) || 4 === b)
                return !1;
              a = a.nextSibling;
            }
            return !0;
          },
          contains: X(function (a) {
            return function (b) {
              return (b.textContent || b.innerText || kb(b)).indexOf(a) > -1;
            };
          }),
          has: X(function (a) {
            return function (b) {
              return fb(a, b).length > 0;
            };
          }),
          header: function (a) {
            return P.test(a.nodeName);
          },
          text: function (a) {
            var b, c;
            return 'input' === a.nodeName.toLowerCase() && 'text' === (b = a.type) && (null == (c = a.getAttribute('type')) || c.toLowerCase() === b);
          },
          radio: Y('radio'),
          checkbox: Y('checkbox'),
          file: Y('file'),
          password: Y('password'),
          image: Y('image'),
          submit: Z('submit'),
          reset: Z('reset'),
          button: function (a) {
            var b = a.nodeName.toLowerCase();
            return 'input' === b && 'button' === a.type || 'button' === b;
          },
          input: function (a) {
            return Q.test(a.nodeName);
          },
          focus: function (a) {
            var b = a.ownerDocument;
            return !(a !== b.activeElement || b.hasFocus && !b.hasFocus() || !a.type && !a.href);
          },
          active: function (a) {
            return a === a.ownerDocument.activeElement;
          }
        },
        setFilters: {
          first: function (a, b, c) {
            return c ? a.slice(1) : [a[0]];
          },
          last: function (a, b, c) {
            var d = a.pop();
            return c ? a : [d];
          },
          even: function (a, b, c) {
            for (var d = [], e = c ? 1 : 0, f = a.length; f > e; e += 2)
              d.push(a[e]);
            return d;
          },
          odd: function (a, b, c) {
            for (var d = [], e = c ? 0 : 1, f = a.length; f > e; e += 2)
              d.push(a[e]);
            return d;
          },
          lt: function (a, b, c) {
            return c ? a.slice(+b) : a.slice(0, +b);
          },
          gt: function (a, b, c) {
            return c ? a.slice(0, +b + 1) : a.slice(+b + 1);
          },
          eq: function (a, b, c) {
            var d = a.splice(+b, 1);
            return c ? a : d;
          }
        }
      };
    gb.setFilters.nth = gb.setFilters.eq, gb.filters = gb.pseudos, db || (gb.attrHandle = {
      href: function (a) {
        return a.getAttribute('href', 2);
      },
      type: function (a) {
        return a.getAttribute('type');
      }
    }), bb && (gb.order.push('NAME'), gb.find.NAME = function (a, b) {
      return typeof b.getElementsByName !== r ? b.getElementsByName(a) : void 0;
    }), eb && (gb.order.splice(1, 0, 'CLASS'), gb.find.CLASS = function (a, b, c) {
      return typeof b.getElementsByClassName === r || c ? void 0 : b.getElementsByClassName(a);
    });
    try {
      v.call(q.childNodes, 0)[0].nodeType;
    } catch (hb) {
      v = function (a) {
        for (var b, c = []; b = this[a]; a++)
          c.push(b);
        return c;
      };
    }
    var ib = fb.isXML = function (a) {
        var b = a && (a.ownerDocument || a).documentElement;
        return b ? 'HTML' !== b.nodeName : !1;
      }, jb = fb.contains = q.compareDocumentPosition ? function (a, b) {
        return !!(16 & a.compareDocumentPosition(b));
      } : q.contains ? function (a, b) {
        var c = 9 === a.nodeType ? a.documentElement : a, d = b.parentNode;
        return a === d || !!(d && 1 === d.nodeType && c.contains && c.contains(d));
      } : function (a, b) {
        for (; b = b.parentNode;)
          if (b === a)
            return !0;
        return !1;
      }, kb = fb.getText = function (a) {
        var b, c = '', d = 0, e = a.nodeType;
        if (e) {
          if (1 === e || 9 === e || 11 === e) {
            if ('string' == typeof a.textContent)
              return a.textContent;
            for (a = a.firstChild; a; a = a.nextSibling)
              c += kb(a);
          } else if (3 === e || 4 === e)
            return a.nodeValue;
        } else
          for (; b = a[d]; d++)
            c += kb(b);
        return c;
      };
    fb.attr = function (a, b) {
      var c, d = ib(a);
      return d || (b = b.toLowerCase()), gb.attrHandle[b] ? gb.attrHandle[b](a) : ab || d ? a.getAttribute(b) : (c = a.getAttributeNode(b), c ? 'boolean' == typeof a[b] ? a[b] ? b : null : c.specified ? c.value : null : null);
    }, fb.error = function (a) {
      throw new Error('Syntax error, unrecognized expression: ' + a);
    }, [
      0,
      0
    ].sort(function () {
      return t = 0;
    }), q.compareDocumentPosition ? m = function (a, b) {
      return a === b ? (s = !0, 0) : (a.compareDocumentPosition && b.compareDocumentPosition ? 4 & a.compareDocumentPosition(b) : a.compareDocumentPosition) ? -1 : 1;
    } : (m = function (a, b) {
      if (a === b)
        return s = !0, 0;
      if (a.sourceIndex && b.sourceIndex)
        return a.sourceIndex - b.sourceIndex;
      var c, d, e = [], f = [], g = a.parentNode, h = b.parentNode, i = g;
      if (g === h)
        return n(a, b);
      if (!g)
        return -1;
      if (!h)
        return 1;
      for (; i;)
        e.unshift(i), i = i.parentNode;
      for (i = h; i;)
        f.unshift(i), i = i.parentNode;
      c = e.length, d = f.length;
      for (var j = 0; c > j && d > j; j++)
        if (e[j] !== f[j])
          return n(e[j], f[j]);
      return j === c ? n(a, f[j], -1) : n(e[j], b, 1);
    }, n = function (a, b, c) {
      if (a === b)
        return c;
      for (var d = a.nextSibling; d;) {
        if (d === b)
          return -1;
        d = d.nextSibling;
      }
      return 1;
    }), fb.uniqueSort = function (a) {
      var b, c = 1;
      if (m && (s = t, a.sort(m), s))
        for (; b = a[c]; c++)
          b === a[c - 1] && a.splice(c--, 1);
      return a;
    };
    var lb = fb.compile = function (a, b, c) {
        var d, e, g, h = V[a];
        if (h && h.context === b)
          return h;
        for (e = f(a, b, c), g = 0; d = e[g]; g++)
          e[g] = i(d, b, c);
        return h = V[a] = j(e), h.context = b, h.runs = h.dirruns = 0, W.push(a), W.length > gb.cacheLength && delete V[W.shift()], h;
      };
    fb.matches = function (a, b) {
      return fb(a, null, null, b);
    }, fb.matchesSelector = function (a, b) {
      return fb(b, null, null, [a]).length > 0;
    };
    var mb = function (a, b, c, d, f) {
      a = a.replace(H, '$1');
      var g, h, i, j, m, n, o, p, q, r = a.match(J), s = a.match(L), t = b.nodeType;
      if (S.POS.test(a))
        return e(a, b, c, d, r);
      if (d)
        g = v.call(d, 0);
      else if (r && 1 === r.length) {
        if (s.length > 1 && 9 === t && !f && (r = S.ID.exec(s[0]))) {
          if (b = gb.find.ID(r[1], b, f)[0], !b)
            return c;
          a = a.slice(s.shift().length);
        }
        for (p = (r = N.exec(s[0])) && !r.index && b.parentNode || b, q = s.pop(), n = q.split(':not')[0], i = 0, j = gb.order.length; j > i; i++)
          if (o = gb.order[i], r = S[o].exec(n)) {
            if (g = gb.find[o]((r[1] || '').replace(R, ''), p, f), null == g)
              continue;
            n === q && (a = a.slice(0, a.length - q.length) + n.replace(S[o], ''), a || w.apply(c, v.call(g, 0)));
            break;
          }
      }
      if (a)
        for (h = lb(a, b, f), l = h.dirruns++, null == g && (g = gb.find.TAG('*', N.test(a) && b.parentNode || b)), i = 0; m = g[i]; i++)
          k = h.runs++, h(m, b) && c.push(m);
      return c;
    };
    p.querySelectorAll && function () {
      var a, b = mb, c = /'|\\/g, d = /\=[\x20\t\r\n\f]*([^'"\]]*)[\x20\t\r\n\f]*\]/g, e = [], f = [':active'], g = q.matchesSelector || q.mozMatchesSelector || q.webkitMatchesSelector || q.oMatchesSelector || q.msMatchesSelector;
      _(function (a) {
        a.innerHTML = '<select><option selected></option></select>', a.querySelectorAll('[selected]').length || e.push('\\[' + y + '*(?:checked|disabled|ismap|multiple|readonly|selected|value)'), a.querySelectorAll(':checked').length || e.push(':checked');
      }), _(function (a) {
        a.innerHTML = '<p test=\'\'></p>', a.querySelectorAll('[test^=\'\']').length && e.push('[*^$]=' + y + '*(?:""|\'\')'), a.innerHTML = '<input type=\'hidden\'>', a.querySelectorAll(':enabled').length || e.push(':enabled', ':disabled');
      }), e = e.length && new RegExp(e.join('|')), mb = function (a, d, f, g, h) {
        if (!(g || h || e && e.test(a)))
          if (9 === d.nodeType)
            try {
              return w.apply(f, v.call(d.querySelectorAll(a), 0)), f;
            } catch (i) {
            }
          else if (1 === d.nodeType && 'object' !== d.nodeName.toLowerCase()) {
            var j = d.getAttribute('id'), k = j || x, l = N.test(a) && d.parentNode || d;
            j ? k = k.replace(c, '\\$&') : d.setAttribute('id', k);
            try {
              return w.apply(f, v.call(l.querySelectorAll(a.replace(J, '[id=\'' + k + '\'] $&')), 0)), f;
            } catch (i) {
            } finally {
              j || d.removeAttribute('id');
            }
          }
        return b(a, d, f, g, h);
      }, g && (_(function (b) {
        a = g.call(b, 'div');
        try {
          g.call(b, '[test!=\'\']:sizzle'), f.push(gb.match.PSEUDO);
        } catch (c) {
        }
      }), f = new RegExp(f.join('|')), fb.matchesSelector = function (b, c) {
        if (c = c.replace(d, '=\'$1\']'), !(ib(b) || f.test(c) || e && e.test(c)))
          try {
            var h = g.call(b, c);
            if (h || a || b.document && 11 !== b.document.nodeType)
              return h;
          } catch (i) {
          }
        return fb(c, null, null, [b]).length > 0;
      });
    }(), fb.attr = $.attr, $.find = fb, $.expr = fb.selectors, $.expr[':'] = $.expr.pseudos, $.unique = fb.uniqueSort, $.text = fb.getText, $.isXMLDoc = fb.isXML, $.contains = fb.contains;
  }(a);
  var Ib = /Until$/, Jb = /^(?:parents|prev(?:Until|All))/, Kb = /^.[^:#\[\.,]*$/, Lb = $.expr.match.needsContext, Mb = {
      children: !0,
      contents: !0,
      next: !0,
      prev: !0
    };
  $.fn.extend({
    find: function (a) {
      var b, c, d, e, f, g, h = this;
      if ('string' != typeof a)
        return $(a).filter(function () {
          for (b = 0, c = h.length; c > b; b++)
            if ($.contains(h[b], this))
              return !0;
        });
      for (g = this.pushStack('', 'find', a), b = 0, c = this.length; c > b; b++)
        if (d = g.length, $.find(a, this[b], g), b > 0)
          for (e = d; e < g.length; e++)
            for (f = 0; d > f; f++)
              if (g[f] === g[e]) {
                g.splice(e--, 1);
                break;
              }
      return g;
    },
    has: function (a) {
      var b, c = $(a, this), d = c.length;
      return this.filter(function () {
        for (b = 0; d > b; b++)
          if ($.contains(this, c[b]))
            return !0;
      });
    },
    not: function (a) {
      return this.pushStack(j(this, a, !1), 'not', a);
    },
    filter: function (a) {
      return this.pushStack(j(this, a, !0), 'filter', a);
    },
    is: function (a) {
      return !!a && ('string' == typeof a ? Lb.test(a) ? $(a, this.context).index(this[0]) >= 0 : $.filter(a, this).length > 0 : this.filter(a).length > 0);
    },
    closest: function (a, b) {
      for (var c, d = 0, e = this.length, f = [], g = Lb.test(a) || 'string' != typeof a ? $(a, b || this.context) : 0; e > d; d++)
        for (c = this[d]; c && c.ownerDocument && c !== b && 11 !== c.nodeType;) {
          if (g ? g.index(c) > -1 : $.find.matchesSelector(c, a)) {
            f.push(c);
            break;
          }
          c = c.parentNode;
        }
      return f = f.length > 1 ? $.unique(f) : f, this.pushStack(f, 'closest', a);
    },
    index: function (a) {
      return a ? 'string' == typeof a ? $.inArray(this[0], $(a)) : $.inArray(a.jquery ? a[0] : a, this) : this[0] && this[0].parentNode ? this.prevAll().length : -1;
    },
    add: function (a, b) {
      var c = 'string' == typeof a ? $(a, b) : $.makeArray(a && a.nodeType ? [a] : a), d = $.merge(this.get(), c);
      return this.pushStack(h(c[0]) || h(d[0]) ? d : $.unique(d));
    },
    addBack: function (a) {
      return this.add(null == a ? this.prevObject : this.prevObject.filter(a));
    }
  }), $.fn.andSelf = $.fn.addBack, $.each({
    parent: function (a) {
      var b = a.parentNode;
      return b && 11 !== b.nodeType ? b : null;
    },
    parents: function (a) {
      return $.dir(a, 'parentNode');
    },
    parentsUntil: function (a, b, c) {
      return $.dir(a, 'parentNode', c);
    },
    next: function (a) {
      return i(a, 'nextSibling');
    },
    prev: function (a) {
      return i(a, 'previousSibling');
    },
    nextAll: function (a) {
      return $.dir(a, 'nextSibling');
    },
    prevAll: function (a) {
      return $.dir(a, 'previousSibling');
    },
    nextUntil: function (a, b, c) {
      return $.dir(a, 'nextSibling', c);
    },
    prevUntil: function (a, b, c) {
      return $.dir(a, 'previousSibling', c);
    },
    siblings: function (a) {
      return $.sibling((a.parentNode || {}).firstChild, a);
    },
    children: function (a) {
      return $.sibling(a.firstChild);
    },
    contents: function (a) {
      return $.nodeName(a, 'iframe') ? a.contentDocument || a.contentWindow.document : $.merge([], a.childNodes);
    }
  }, function (a, b) {
    $.fn[a] = function (c, d) {
      var e = $.map(this, b, c);
      return Ib.test(a) || (d = c), d && 'string' == typeof d && (e = $.filter(d, e)), e = this.length > 1 && !Mb[a] ? $.unique(e) : e, this.length > 1 && Jb.test(a) && (e = e.reverse()), this.pushStack(e, a, V.call(arguments).join(','));
    };
  }), $.extend({
    filter: function (a, b, c) {
      return c && (a = ':not(' + a + ')'), 1 === b.length ? $.find.matchesSelector(b[0], a) ? [b[0]] : [] : $.find.matches(a, b);
    },
    dir: function (a, c, d) {
      for (var e = [], f = a[c]; f && 9 !== f.nodeType && (d === b || 1 !== f.nodeType || !$(f).is(d));)
        1 === f.nodeType && e.push(f), f = f[c];
      return e;
    },
    sibling: function (a, b) {
      for (var c = []; a; a = a.nextSibling)
        1 === a.nodeType && a !== b && c.push(a);
      return c;
    }
  });
  var Nb = 'abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video', Ob = / jQuery\d+="(?:null|\d+)"/g, Pb = /^\s+/, Qb = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi, Rb = /<([\w:]+)/, Sb = /<tbody/i, Tb = /<|&#?\w+;/, Ub = /<(?:script|style|link)/i, Vb = /<(?:script|object|embed|option|style)/i, Wb = new RegExp('<(?:' + Nb + ')[\\s/>]', 'i'), Xb = /^(?:checkbox|radio)$/, Yb = /checked\s*(?:[^=]|=\s*.checked.)/i, Zb = /\/(java|ecma)script/i, $b = /^\s*<!(?:\[CDATA\[|\-\-)|[\]\-]{2}>\s*$/g, _b = {
      option: [
        1,
        '<select multiple=\'multiple\'>',
        '</select>'
      ],
      legend: [
        1,
        '<fieldset>',
        '</fieldset>'
      ],
      thead: [
        1,
        '<table>',
        '</table>'
      ],
      tr: [
        2,
        '<table><tbody>',
        '</tbody></table>'
      ],
      td: [
        3,
        '<table><tbody><tr>',
        '</tr></tbody></table>'
      ],
      col: [
        2,
        '<table><tbody></tbody><colgroup>',
        '</colgroup></table>'
      ],
      area: [
        1,
        '<map>',
        '</map>'
      ],
      _default: [
        0,
        '',
        ''
      ]
    }, ac = k(P), bc = ac.appendChild(P.createElement('div'));
  _b.optgroup = _b.option, _b.tbody = _b.tfoot = _b.colgroup = _b.caption = _b.thead, _b.th = _b.td, $.support.htmlSerialize || (_b._default = [
    1,
    'X<div>',
    '</div>'
  ]), $.fn.extend({
    text: function (a) {
      return $.access(this, function (a) {
        return a === b ? $.text(this) : this.empty().append((this[0] && this[0].ownerDocument || P).createTextNode(a));
      }, null, a, arguments.length);
    },
    wrapAll: function (a) {
      if ($.isFunction(a))
        return this.each(function (b) {
          $(this).wrapAll(a.call(this, b));
        });
      if (this[0]) {
        var b = $(a, this[0].ownerDocument).eq(0).clone(!0);
        this[0].parentNode && b.insertBefore(this[0]), b.map(function () {
          for (var a = this; a.firstChild && 1 === a.firstChild.nodeType;)
            a = a.firstChild;
          return a;
        }).append(this);
      }
      return this;
    },
    wrapInner: function (a) {
      return $.isFunction(a) ? this.each(function (b) {
        $(this).wrapInner(a.call(this, b));
      }) : this.each(function () {
        var b = $(this), c = b.contents();
        c.length ? c.wrapAll(a) : b.append(a);
      });
    },
    wrap: function (a) {
      var b = $.isFunction(a);
      return this.each(function (c) {
        $(this).wrapAll(b ? a.call(this, c) : a);
      });
    },
    unwrap: function () {
      return this.parent().each(function () {
        $.nodeName(this, 'body') || $(this).replaceWith(this.childNodes);
      }).end();
    },
    append: function () {
      return this.domManip(arguments, !0, function (a) {
        (1 === this.nodeType || 11 === this.nodeType) && this.appendChild(a);
      });
    },
    prepend: function () {
      return this.domManip(arguments, !0, function (a) {
        (1 === this.nodeType || 11 === this.nodeType) && this.insertBefore(a, this.firstChild);
      });
    },
    before: function () {
      if (!h(this[0]))
        return this.domManip(arguments, !1, function (a) {
          this.parentNode.insertBefore(a, this);
        });
      if (arguments.length) {
        var a = $.clean(arguments);
        return this.pushStack($.merge(a, this), 'before', this.selector);
      }
    },
    after: function () {
      if (!h(this[0]))
        return this.domManip(arguments, !1, function (a) {
          this.parentNode.insertBefore(a, this.nextSibling);
        });
      if (arguments.length) {
        var a = $.clean(arguments);
        return this.pushStack($.merge(this, a), 'after', this.selector);
      }
    },
    remove: function (a, b) {
      for (var c, d = 0; null != (c = this[d]); d++)
        (!a || $.filter(a, [c]).length) && (!b && 1 === c.nodeType && ($.cleanData(c.getElementsByTagName('*')), $.cleanData([c])), c.parentNode && c.parentNode.removeChild(c));
      return this;
    },
    empty: function () {
      for (var a, b = 0; null != (a = this[b]); b++)
        for (1 === a.nodeType && $.cleanData(a.getElementsByTagName('*')); a.firstChild;)
          a.removeChild(a.firstChild);
      return this;
    },
    clone: function (a, b) {
      return a = null == a ? !1 : a, b = null == b ? a : b, this.map(function () {
        return $.clone(this, a, b);
      });
    },
    html: function (a) {
      return $.access(this, function (a) {
        var c = this[0] || {}, d = 0, e = this.length;
        if (a === b)
          return 1 === c.nodeType ? c.innerHTML.replace(Ob, '') : b;
        if (!('string' != typeof a || Ub.test(a) || !$.support.htmlSerialize && Wb.test(a) || !$.support.leadingWhitespace && Pb.test(a) || _b[(Rb.exec(a) || [
            '',
            ''
          ])[1].toLowerCase()])) {
          a = a.replace(Qb, '<$1></$2>');
          try {
            for (; e > d; d++)
              c = this[d] || {}, 1 === c.nodeType && ($.cleanData(c.getElementsByTagName('*')), c.innerHTML = a);
            c = 0;
          } catch (f) {
          }
        }
        c && this.empty().append(a);
      }, null, a, arguments.length);
    },
    replaceWith: function (a) {
      return h(this[0]) ? this.length ? this.pushStack($($.isFunction(a) ? a() : a), 'replaceWith', a) : this : $.isFunction(a) ? this.each(function (b) {
        var c = $(this), d = c.html();
        c.replaceWith(a.call(this, b, d));
      }) : ('string' != typeof a && (a = $(a).detach()), this.each(function () {
        var b = this.nextSibling, c = this.parentNode;
        $(this).remove(), b ? $(b).before(a) : $(c).append(a);
      }));
    },
    detach: function (a) {
      return this.remove(a, !0);
    },
    domManip: function (a, c, d) {
      a = [].concat.apply([], a);
      var e, f, g, h, i = 0, j = a[0], k = [], m = this.length;
      if (!$.support.checkClone && m > 1 && 'string' == typeof j && Yb.test(j))
        return this.each(function () {
          $(this).domManip(a, c, d);
        });
      if ($.isFunction(j))
        return this.each(function (e) {
          var f = $(this);
          a[0] = j.call(this, e, c ? f.html() : b), f.domManip(a, c, d);
        });
      if (this[0]) {
        if (e = $.buildFragment(a, this, k), g = e.fragment, f = g.firstChild, 1 === g.childNodes.length && (g = f), f)
          for (c = c && $.nodeName(f, 'tr'), h = e.cacheable || m - 1; m > i; i++)
            d.call(c && $.nodeName(this[i], 'table') ? l(this[i], 'tbody') : this[i], i === h ? g : $.clone(g, !0, !0));
        g = f = null, k.length && $.each(k, function (a, b) {
          b.src ? $.ajax ? $.ajax({
            url: b.src,
            type: 'GET',
            dataType: 'script',
            async: !1,
            global: !1,
            'throws': !0
          }) : $.error('no ajax') : $.globalEval((b.text || b.textContent || b.innerHTML || '').replace($b, '')), b.parentNode && b.parentNode.removeChild(b);
        });
      }
      return this;
    }
  }), $.buildFragment = function (a, c, d) {
    var e, f, g, h = a[0];
    return c = c || P, c = (c[0] || c).ownerDocument || c[0] || c, 'undefined' == typeof c.createDocumentFragment && (c = P), 1 === a.length && 'string' == typeof h && h.length < 512 && c === P && '<' === h.charAt(0) && !Vb.test(h) && ($.support.checkClone || !Yb.test(h)) && ($.support.html5Clone || !Wb.test(h)) && (f = !0, e = $.fragments[h], g = e !== b), e || (e = c.createDocumentFragment(), $.clean(a, c, e, d), f && ($.fragments[h] = g && e)), {
      fragment: e,
      cacheable: f
    };
  }, $.fragments = {}, $.each({
    appendTo: 'append',
    prependTo: 'prepend',
    insertBefore: 'before',
    insertAfter: 'after',
    replaceAll: 'replaceWith'
  }, function (a, b) {
    $.fn[a] = function (c) {
      var d, e = 0, f = [], g = $(c), h = g.length, i = 1 === this.length && this[0].parentNode;
      if ((null == i || i && 11 === i.nodeType && 1 === i.childNodes.length) && 1 === h)
        return g[b](this[0]), this;
      for (; h > e; e++)
        d = (e > 0 ? this.clone(!0) : this).get(), $(g[e])[b](d), f = f.concat(d);
      return this.pushStack(f, a, g.selector);
    };
  }), $.extend({
    clone: function (a, b, c) {
      var d, e, f, g;
      if ($.support.html5Clone || $.isXMLDoc(a) || !Wb.test('<' + a.nodeName + '>') ? g = a.cloneNode(!0) : (bc.innerHTML = a.outerHTML, bc.removeChild(g = bc.firstChild)), !($.support.noCloneEvent && $.support.noCloneChecked || 1 !== a.nodeType && 11 !== a.nodeType || $.isXMLDoc(a)))
        for (n(a, g), d = o(a), e = o(g), f = 0; d[f]; ++f)
          e[f] && n(d[f], e[f]);
      if (b && (m(a, g), c))
        for (d = o(a), e = o(g), f = 0; d[f]; ++f)
          m(d[f], e[f]);
      return d = e = null, g;
    },
    clean: function (a, b, c, d) {
      var e, f, g, h, i, j, l, m, n, o, q, r = 0, s = [];
      for (b && 'undefined' != typeof b.createDocumentFragment || (b = P), f = b === P && ac; null != (g = a[r]); r++)
        if ('number' == typeof g && (g += ''), g) {
          if ('string' == typeof g)
            if (Tb.test(g)) {
              for (f = f || k(b), l = l || f.appendChild(b.createElement('div')), g = g.replace(Qb, '<$1></$2>'), h = (Rb.exec(g) || [
                  '',
                  ''
                ])[1].toLowerCase(), i = _b[h] || _b._default, j = i[0], l.innerHTML = i[1] + g + i[2]; j--;)
                l = l.lastChild;
              if (!$.support.tbody)
                for (m = Sb.test(g), n = 'table' !== h || m ? '<table>' !== i[1] || m ? [] : l.childNodes : l.firstChild && l.firstChild.childNodes, e = n.length - 1; e >= 0; --e)
                  $.nodeName(n[e], 'tbody') && !n[e].childNodes.length && n[e].parentNode.removeChild(n[e]);
              !$.support.leadingWhitespace && Pb.test(g) && l.insertBefore(b.createTextNode(Pb.exec(g)[0]), l.firstChild), g = l.childNodes, l = f.lastChild;
            } else
              g = b.createTextNode(g);
          g.nodeType ? s.push(g) : s = $.merge(s, g);
        }
      if (l && (f.removeChild(l), g = l = f = null), !$.support.appendChecked)
        for (r = 0; null != (g = s[r]); r++)
          $.nodeName(g, 'input') ? p(g) : 'undefined' != typeof g.getElementsByTagName && $.grep(g.getElementsByTagName('input'), p);
      if (c)
        for (o = function (a) {
            return !a.type || Zb.test(a.type) ? d ? d.push(a.parentNode ? a.parentNode.removeChild(a) : a) : c.appendChild(a) : void 0;
          }, r = 0; null != (g = s[r]); r++)
          $.nodeName(g, 'script') && o(g) || (c.appendChild(g), 'undefined' != typeof g.getElementsByTagName && (q = $.grep($.merge([], g.getElementsByTagName('script')), o), s.splice.apply(s, [
            r + 1,
            0
          ].concat(q)), r += q.length));
      return s;
    },
    cleanData: function (a, b) {
      for (var c, d, e, f, g = 0, h = $.expando, i = $.cache, j = $.support.deleteExpando, k = $.event.special; null != (e = a[g]); g++)
        if ((b || $.acceptData(e)) && (d = e[h], c = d && i[d])) {
          if (c.events)
            for (f in c.events)
              k[f] ? $.event.remove(e, f) : $.removeEvent(e, f, c.handle);
          i[d] && (delete i[d], j ? delete e[h] : e.removeAttribute ? e.removeAttribute(h) : e[h] = null, $.deletedIds.push(d));
        }
    }
  }), function () {
    var a, b;
    $.uaMatch = function (a) {
      a = a.toLowerCase();
      var b = /(chrome)[ \/]([\w.]+)/.exec(a) || /(webkit)[ \/]([\w.]+)/.exec(a) || /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(a) || /(msie) ([\w.]+)/.exec(a) || a.indexOf('compatible') < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(a) || [];
      return {
        browser: b[1] || '',
        version: b[2] || '0'
      };
    }, a = $.uaMatch(R.userAgent), b = {}, a.browser && (b[a.browser] = !0, b.version = a.version), b.webkit && (b.safari = !0), $.browser = b, $.sub = function () {
      function a(b, c) {
        return new a.fn.init(b, c);
      }
      $.extend(!0, a, this), a.superclass = this, a.fn = a.prototype = this(), a.fn.constructor = a, a.sub = this.sub, a.fn.init = function c(c, d) {
        return d && d instanceof $ && !(d instanceof a) && (d = a(d)), $.fn.init.call(this, c, d, b);
      }, a.fn.init.prototype = a.fn;
      var b = a(P);
      return a;
    };
  }();
  var cc, dc, ec, fc = /alpha\([^)]*\)/i, gc = /opacity=([^)]*)/, hc = /^(top|right|bottom|left)$/, ic = /^margin/, jc = new RegExp('^(' + _ + ')(.*)$', 'i'), kc = new RegExp('^(' + _ + ')(?!px)[a-z%]+$', 'i'), lc = new RegExp('^([-+])=(' + _ + ')', 'i'), mc = {}, nc = {
      position: 'absolute',
      visibility: 'hidden',
      display: 'block'
    }, oc = {
      letterSpacing: 0,
      fontWeight: 400,
      lineHeight: 1
    }, pc = [
      'Top',
      'Right',
      'Bottom',
      'Left'
    ], qc = [
      'Webkit',
      'O',
      'Moz',
      'ms'
    ], rc = $.fn.toggle;
  $.fn.extend({
    css: function (a, c) {
      return $.access(this, function (a, c, d) {
        return d !== b ? $.style(a, c, d) : $.css(a, c);
      }, a, c, arguments.length > 1);
    },
    show: function () {
      return s(this, !0);
    },
    hide: function () {
      return s(this);
    },
    toggle: function (a, b) {
      var c = 'boolean' == typeof a;
      return $.isFunction(a) && $.isFunction(b) ? rc.apply(this, arguments) : this.each(function () {
        (c ? a : r(this)) ? $(this).show() : $(this).hide();
      });
    }
  }), $.extend({
    cssHooks: {
      opacity: {
        get: function (a, b) {
          if (b) {
            var c = cc(a, 'opacity');
            return '' === c ? '1' : c;
          }
        }
      }
    },
    cssNumber: {
      fillOpacity: !0,
      fontWeight: !0,
      lineHeight: !0,
      opacity: !0,
      orphans: !0,
      widows: !0,
      zIndex: !0,
      zoom: !0
    },
    cssProps: { 'float': $.support.cssFloat ? 'cssFloat' : 'styleFloat' },
    style: function (a, c, d, e) {
      if (a && 3 !== a.nodeType && 8 !== a.nodeType && a.style) {
        var f, g, h, i = $.camelCase(c), j = a.style;
        if (c = $.cssProps[i] || ($.cssProps[i] = q(j, i)), h = $.cssHooks[c] || $.cssHooks[i], d === b)
          return h && 'get' in h && (f = h.get(a, !1, e)) !== b ? f : j[c];
        if (g = typeof d, 'string' === g && (f = lc.exec(d)) && (d = (f[1] + 1) * f[2] + parseFloat($.css(a, c)), g = 'number'), !(null == d || 'number' === g && isNaN(d) || ('number' === g && !$.cssNumber[i] && (d += 'px'), h && 'set' in h && (d = h.set(a, d, e)) === b)))
          try {
            j[c] = d;
          } catch (k) {
          }
      }
    },
    css: function (a, c, d, e) {
      var f, g, h, i = $.camelCase(c);
      return c = $.cssProps[i] || ($.cssProps[i] = q(a.style, i)), h = $.cssHooks[c] || $.cssHooks[i], h && 'get' in h && (f = h.get(a, !0, e)), f === b && (f = cc(a, c)), 'normal' === f && c in oc && (f = oc[c]), d || e !== b ? (g = parseFloat(f), d || $.isNumeric(g) ? g || 0 : f) : f;
    },
    swap: function (a, b, c) {
      var d, e, f = {};
      for (e in b)
        f[e] = a.style[e], a.style[e] = b[e];
      d = c.call(a);
      for (e in b)
        a.style[e] = f[e];
      return d;
    }
  }), a.getComputedStyle ? cc = function (a, b) {
    var c, d, e, f, g = getComputedStyle(a, null), h = a.style;
    return g && (c = g[b], '' === c && !$.contains(a.ownerDocument.documentElement, a) && (c = $.style(a, b)), kc.test(c) && ic.test(b) && (d = h.width, e = h.minWidth, f = h.maxWidth, h.minWidth = h.maxWidth = h.width = c, c = g.width, h.width = d, h.minWidth = e, h.maxWidth = f)), c;
  } : P.documentElement.currentStyle && (cc = function (a, b) {
    var c, d, e = a.currentStyle && a.currentStyle[b], f = a.style;
    return null == e && f && f[b] && (e = f[b]), kc.test(e) && !hc.test(b) && (c = f.left, d = a.runtimeStyle && a.runtimeStyle.left, d && (a.runtimeStyle.left = a.currentStyle.left), f.left = 'fontSize' === b ? '1em' : e, e = f.pixelLeft + 'px', f.left = c, d && (a.runtimeStyle.left = d)), '' === e ? 'auto' : e;
  }), $.each([
    'height',
    'width'
  ], function (a, b) {
    $.cssHooks[b] = {
      get: function (a, c, d) {
        return c ? 0 !== a.offsetWidth || 'none' !== cc(a, 'display') ? v(a, b, d) : $.swap(a, nc, function () {
          return v(a, b, d);
        }) : void 0;
      },
      set: function (a, c, d) {
        return t(a, c, d ? u(a, b, d, $.support.boxSizing && 'border-box' === $.css(a, 'boxSizing')) : 0);
      }
    };
  }), $.support.opacity || ($.cssHooks.opacity = {
    get: function (a, b) {
      return gc.test((b && a.currentStyle ? a.currentStyle.filter : a.style.filter) || '') ? 0.01 * parseFloat(RegExp.$1) + '' : b ? '1' : '';
    },
    set: function (a, b) {
      var c = a.style, d = a.currentStyle, e = $.isNumeric(b) ? 'alpha(opacity=' + 100 * b + ')' : '', f = d && d.filter || c.filter || '';
      c.zoom = 1, b >= 1 && '' === $.trim(f.replace(fc, '')) && c.removeAttribute && (c.removeAttribute('filter'), d && !d.filter) || (c.filter = fc.test(f) ? f.replace(fc, e) : f + ' ' + e);
    }
  }), $(function () {
    $.support.reliableMarginRight || ($.cssHooks.marginRight = {
      get: function (a, b) {
        return $.swap(a, { display: 'inline-block' }, function () {
          return b ? cc(a, 'marginRight') : void 0;
        });
      }
    }), !$.support.pixelPosition && $.fn.position && $.each([
      'top',
      'left'
    ], function (a, b) {
      $.cssHooks[b] = {
        get: function (a, c) {
          if (c) {
            var d = cc(a, b);
            return kc.test(d) ? $(a).position()[b] + 'px' : d;
          }
        }
      };
    });
  }), $.expr && $.expr.filters && ($.expr.filters.hidden = function (a) {
    return 0 === a.offsetWidth && 0 === a.offsetHeight || !$.support.reliableHiddenOffsets && 'none' === (a.style && a.style.display || cc(a, 'display'));
  }, $.expr.filters.visible = function (a) {
    return !$.expr.filters.hidden(a);
  }), $.each({
    margin: '',
    padding: '',
    border: 'Width'
  }, function (a, b) {
    $.cssHooks[a + b] = {
      expand: function (c) {
        var d, e = 'string' == typeof c ? c.split(' ') : [c], f = {};
        for (d = 0; 4 > d; d++)
          f[a + pc[d] + b] = e[d] || e[d - 2] || e[0];
        return f;
      }
    }, ic.test(a) || ($.cssHooks[a + b].set = t);
  });
  var sc = /%20/g, tc = /\[\]$/, uc = /\r?\n/g, vc = /^(?:color|date|datetime|datetime-local|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i, wc = /^(?:select|textarea)/i;
  $.fn.extend({
    serialize: function () {
      return $.param(this.serializeArray());
    },
    serializeArray: function () {
      return this.map(function () {
        return this.elements ? $.makeArray(this.elements) : this;
      }).filter(function () {
        return this.name && !this.disabled && (this.checked || wc.test(this.nodeName) || vc.test(this.type));
      }).map(function (a, b) {
        var c = $(this).val();
        return null == c ? null : $.isArray(c) ? $.map(c, function (a) {
          return {
            name: b.name,
            value: a.replace(uc, '\r\n')
          };
        }) : {
          name: b.name,
          value: c.replace(uc, '\r\n')
        };
      }).get();
    }
  }), $.param = function (a, c) {
    var d, e = [], f = function (a, b) {
        b = $.isFunction(b) ? b() : null == b ? '' : b, e[e.length] = encodeURIComponent(a) + '=' + encodeURIComponent(b);
      };
    if (c === b && (c = $.ajaxSettings && $.ajaxSettings.traditional), $.isArray(a) || a.jquery && !$.isPlainObject(a))
      $.each(a, function () {
        f(this.name, this.value);
      });
    else
      for (d in a)
        x(d, a[d], c, f);
    return e.join('&').replace(sc, '+');
  };
  var xc, yc, zc = /#.*$/, Ac = /^(.*?):[ \t]*([^\r\n]*)\r?$/gm, Bc = /^(?:about|app|app\-storage|.+\-extension|file|res|widget):$/, Cc = /^(?:GET|HEAD)$/, Dc = /^\/\//, Ec = /\?/, Fc = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, Gc = /([?&])_=[^&]*/, Hc = /^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/, Ic = $.fn.load, Jc = {}, Kc = {}, Lc = ['*/'] + ['*'];
  try {
    xc = Q.href;
  } catch (Mc) {
    xc = P.createElement('a'), xc.href = '', xc = xc.href;
  }
  yc = Hc.exec(xc.toLowerCase()) || [], $.fn.load = function (a, c, d) {
    if ('string' != typeof a && Ic)
      return Ic.apply(this, arguments);
    if (!this.length)
      return this;
    var e, f, g, h = this, i = a.indexOf(' ');
    return i >= 0 && (e = a.slice(i, a.length), a = a.slice(0, i)), $.isFunction(c) ? (d = c, c = b) : 'object' == typeof c && (f = 'POST'), $.ajax({
      url: a,
      type: f,
      dataType: 'html',
      data: c,
      complete: function (a, b) {
        d && h.each(d, g || [
          a.responseText,
          b,
          a
        ]);
      }
    }).done(function (a) {
      g = arguments, h.html(e ? $('<div>').append(a.replace(Fc, '')).find(e) : a);
    }), this;
  }, $.each('ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend'.split(' '), function (a, b) {
    $.fn[b] = function (a) {
      return this.on(b, a);
    };
  }), $.each([
    'get',
    'post'
  ], function (a, c) {
    $[c] = function (a, d, e, f) {
      return $.isFunction(d) && (f = f || e, e = d, d = b), $.ajax({
        type: c,
        url: a,
        data: d,
        success: e,
        dataType: f
      });
    };
  }), $.extend({
    getScript: function (a, c) {
      return $.get(a, b, c, 'script');
    },
    getJSON: function (a, b, c) {
      return $.get(a, b, c, 'json');
    },
    ajaxSetup: function (a, b) {
      return b ? A(a, $.ajaxSettings) : (b = a, a = $.ajaxSettings), A(a, b), a;
    },
    ajaxSettings: {
      url: xc,
      isLocal: Bc.test(yc[1]),
      global: !0,
      type: 'GET',
      contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
      processData: !0,
      async: !0,
      accepts: {
        xml: 'application/xml, text/xml',
        html: 'text/html',
        text: 'text/plain',
        json: 'application/json, text/javascript',
        '*': Lc
      },
      contents: {
        xml: /xml/,
        html: /html/,
        json: /json/
      },
      responseFields: {
        xml: 'responseXML',
        text: 'responseText'
      },
      converters: {
        '* text': a.String,
        'text html': !0,
        'text json': $.parseJSON,
        'text xml': $.parseXML
      },
      flatOptions: {
        context: !0,
        url: !0
      }
    },
    ajaxPrefilter: y(Jc),
    ajaxTransport: y(Kc),
    ajax: function (a, c) {
      function d(a, c, d, g) {
        var j, l, s, t, v, x = c;
        2 !== u && (u = 2, i && clearTimeout(i), h = b, f = g || '', w.readyState = a > 0 ? 4 : 0, d && (t = B(m, w, d)), a >= 200 && 300 > a || 304 === a ? (m.ifModified && (v = w.getResponseHeader('Last-Modified'), v && ($.lastModified[e] = v), v = w.getResponseHeader('Etag'), v && ($.etag[e] = v)), 304 === a ? (x = 'notmodified', j = !0) : (j = C(m, t), x = j.state, l = j.data, s = j.error, j = !s)) : (s = x, (!x || a) && (x = 'error', 0 > a && (a = 0))), w.status = a, w.statusText = '' + (c || x), j ? p.resolveWith(n, [
          l,
          x,
          w
        ]) : p.rejectWith(n, [
          w,
          x,
          s
        ]), w.statusCode(r), r = b, k && o.trigger('ajax' + (j ? 'Success' : 'Error'), [
          w,
          m,
          j ? l : s
        ]), q.fireWith(n, [
          w,
          x
        ]), k && (o.trigger('ajaxComplete', [
          w,
          m
        ]), --$.active || $.event.trigger('ajaxStop')));
      }
      'object' == typeof a && (c = a, a = b), c = c || {};
      var e, f, g, h, i, j, k, l, m = $.ajaxSetup({}, c), n = m.context || m, o = n !== m && (n.nodeType || n instanceof $) ? $(n) : $.event, p = $.Deferred(), q = $.Callbacks('once memory'), r = m.statusCode || {}, s = {}, t = {}, u = 0, v = 'canceled', w = {
          readyState: 0,
          setRequestHeader: function (a, b) {
            if (!u) {
              var c = a.toLowerCase();
              a = t[c] = t[c] || a, s[a] = b;
            }
            return this;
          },
          getAllResponseHeaders: function () {
            return 2 === u ? f : null;
          },
          getResponseHeader: function (a) {
            var c;
            if (2 === u) {
              if (!g)
                for (g = {}; c = Ac.exec(f);)
                  g[c[1].toLowerCase()] = c[2];
              c = g[a.toLowerCase()];
            }
            return c === b ? null : c;
          },
          overrideMimeType: function (a) {
            return u || (m.mimeType = a), this;
          },
          abort: function (a) {
            return a = a || v, h && h.abort(a), d(0, a), this;
          }
        };
      if (p.promise(w), w.success = w.done, w.error = w.fail, w.complete = q.add, w.statusCode = function (a) {
          if (a) {
            var b;
            if (2 > u)
              for (b in a)
                r[b] = [
                  r[b],
                  a[b]
                ];
            else
              b = a[w.status], w.always(b);
          }
          return this;
        }, m.url = ((a || m.url) + '').replace(zc, '').replace(Dc, yc[1] + '//'), m.dataTypes = $.trim(m.dataType || '*').toLowerCase().split(bb), null == m.crossDomain && (j = Hc.exec(m.url.toLowerCase()), m.crossDomain = !(!j || j[1] == yc[1] && j[2] == yc[2] && (j[3] || ('http:' === j[1] ? 80 : 443)) == (yc[3] || ('http:' === yc[1] ? 80 : 443)))), m.data && m.processData && 'string' != typeof m.data && (m.data = $.param(m.data, m.traditional)), z(Jc, m, c, w), 2 === u)
        return w;
      if (k = m.global, m.type = m.type.toUpperCase(), m.hasContent = !Cc.test(m.type), k && 0 === $.active++ && $.event.trigger('ajaxStart'), !m.hasContent && (m.data && (m.url += (Ec.test(m.url) ? '&' : '?') + m.data, delete m.data), e = m.url, m.cache === !1)) {
        var x = $.now(), y = m.url.replace(Gc, '$1_=' + x);
        m.url = y + (y === m.url ? (Ec.test(m.url) ? '&' : '?') + '_=' + x : '');
      }
      (m.data && m.hasContent && m.contentType !== !1 || c.contentType) && w.setRequestHeader('Content-Type', m.contentType), m.ifModified && (e = e || m.url, $.lastModified[e] && w.setRequestHeader('If-Modified-Since', $.lastModified[e]), $.etag[e] && w.setRequestHeader('If-None-Match', $.etag[e])), w.setRequestHeader('Accept', m.dataTypes[0] && m.accepts[m.dataTypes[0]] ? m.accepts[m.dataTypes[0]] + ('*' !== m.dataTypes[0] ? ', ' + Lc + '; q=0.01' : '') : m.accepts['*']);
      for (l in m.headers)
        w.setRequestHeader(l, m.headers[l]);
      if (!m.beforeSend || m.beforeSend.call(n, w, m) !== !1 && 2 !== u) {
        v = 'abort';
        for (l in {
            success: 1,
            error: 1,
            complete: 1
          })
          w[l](m[l]);
        if (h = z(Kc, m, c, w)) {
          w.readyState = 1, k && o.trigger('ajaxSend', [
            w,
            m
          ]), m.async && m.timeout > 0 && (i = setTimeout(function () {
            w.abort('timeout');
          }, m.timeout));
          try {
            u = 1, h.send(s, d);
          } catch (A) {
            if (!(2 > u))
              throw A;
            d(-1, A);
          }
        } else
          d(-1, 'No Transport');
        return w;
      }
      return w.abort();
    },
    active: 0,
    lastModified: {},
    etag: {}
  });
  var Nc = [], Oc = /\?/, Pc = /(=)\?(?=&|$)|\?\?/, Qc = $.now();
  $.ajaxSetup({
    jsonp: 'callback',
    jsonpCallback: function () {
      var a = Nc.pop() || $.expando + '_' + Qc++;
      return this[a] = !0, a;
    }
  }), $.ajaxPrefilter('json jsonp', function (c, d, e) {
    var f, g, h, i = c.data, j = c.url, k = c.jsonp !== !1, l = k && Pc.test(j), m = k && !l && 'string' == typeof i && !(c.contentType || '').indexOf('application/x-www-form-urlencoded') && Pc.test(i);
    return 'jsonp' === c.dataTypes[0] || l || m ? (f = c.jsonpCallback = $.isFunction(c.jsonpCallback) ? c.jsonpCallback() : c.jsonpCallback, g = a[f], l ? c.url = j.replace(Pc, '$1' + f) : m ? c.data = i.replace(Pc, '$1' + f) : k && (c.url += (Oc.test(j) ? '&' : '?') + c.jsonp + '=' + f), c.converters['script json'] = function () {
      return h || $.error(f + ' was not called'), h[0];
    }, c.dataTypes[0] = 'json', a[f] = function () {
      h = arguments;
    }, e.always(function () {
      a[f] = g, c[f] && (c.jsonpCallback = d.jsonpCallback, Nc.push(f)), h && $.isFunction(g) && g(h[0]), h = g = b;
    }), 'script') : void 0;
  }), $.ajaxSetup({
    accepts: { script: 'text/javascript, application/javascript, application/ecmascript, application/x-ecmascript' },
    contents: { script: /javascript|ecmascript/ },
    converters: {
      'text script': function (a) {
        return $.globalEval(a), a;
      }
    }
  }), $.ajaxPrefilter('script', function (a) {
    a.cache === b && (a.cache = !1), a.crossDomain && (a.type = 'GET', a.global = !1);
  }), $.ajaxTransport('script', function (a) {
    if (a.crossDomain) {
      var c, d = P.head || P.getElementsByTagName('head')[0] || P.documentElement;
      return {
        send: function (e, f) {
          c = P.createElement('script'), c.async = 'async', a.scriptCharset && (c.charset = a.scriptCharset), c.src = a.url, c.onload = c.onreadystatechange = function (a, e) {
            (e || !c.readyState || /loaded|complete/.test(c.readyState)) && (c.onload = c.onreadystatechange = null, d && c.parentNode && d.removeChild(c), c = b, e || f(200, 'success'));
          }, d.insertBefore(c, d.firstChild);
        },
        abort: function () {
          c && c.onload(0, 1);
        }
      };
    }
  });
  var Rc, Sc = a.ActiveXObject ? function () {
      for (var a in Rc)
        Rc[a](0, 1);
    } : !1, Tc = 0;
  $.ajaxSettings.xhr = a.ActiveXObject ? function () {
    return !this.isLocal && D() || E();
  } : D, function (a) {
    $.extend($.support, {
      ajax: !!a,
      cors: !!a && 'withCredentials' in a
    });
  }($.ajaxSettings.xhr()), $.support.ajax && $.ajaxTransport(function (c) {
    if (!c.crossDomain || $.support.cors) {
      var d;
      return {
        send: function (e, f) {
          var g, h, i = c.xhr();
          if (c.username ? i.open(c.type, c.url, c.async, c.username, c.password) : i.open(c.type, c.url, c.async), c.xhrFields)
            for (h in c.xhrFields)
              i[h] = c.xhrFields[h];
          c.mimeType && i.overrideMimeType && i.overrideMimeType(c.mimeType), !c.crossDomain && !e['X-Requested-With'] && (e['X-Requested-With'] = 'XMLHttpRequest');
          try {
            for (h in e)
              i.setRequestHeader(h, e[h]);
          } catch (j) {
          }
          i.send(c.hasContent && c.data || null), d = function (a, e) {
            var h, j, k, l, m;
            try {
              if (d && (e || 4 === i.readyState))
                if (d = b, g && (i.onreadystatechange = $.noop, Sc && delete Rc[g]), e)
                  4 !== i.readyState && i.abort();
                else {
                  h = i.status, k = i.getAllResponseHeaders(), l = {}, m = i.responseXML, m && m.documentElement && (l.xml = m);
                  try {
                    l.text = i.responseText;
                  } catch (a) {
                  }
                  try {
                    j = i.statusText;
                  } catch (n) {
                    j = '';
                  }
                  h || !c.isLocal || c.crossDomain ? 1223 === h && (h = 204) : h = l.text ? 200 : 404;
                }
            } catch (o) {
              e || f(-1, o);
            }
            l && f(h, j, l, k);
          }, c.async ? 4 === i.readyState ? setTimeout(d, 0) : (g = ++Tc, Sc && (Rc || (Rc = {}, $(a).unload(Sc)), Rc[g] = d), i.onreadystatechange = d) : d();
        },
        abort: function () {
          d && d(0, 1);
        }
      };
    }
  });
  var Uc, Vc, Wc = /^(?:toggle|show|hide)$/, Xc = new RegExp('^(?:([-+])=|)(' + _ + ')([a-z%]*)$', 'i'), Yc = /queueHooks$/, Zc = [J], $c = {
      '*': [function (a, b) {
          var c, d, e, f = this.createTween(a, b), g = Xc.exec(b), h = f.cur(), i = +h || 0, j = 1;
          if (g) {
            if (c = +g[2], d = g[3] || ($.cssNumber[a] ? '' : 'px'), 'px' !== d && i) {
              i = $.css(f.elem, a, !0) || c || 1;
              do
                e = j = j || '.5', i /= j, $.style(f.elem, a, i + d), j = f.cur() / h;
              while (1 !== j && j !== e);
            }
            f.unit = d, f.start = i, f.end = g[1] ? i + (g[1] + 1) * c : c;
          }
          return f;
        }]
    };
  $.Animation = $.extend(H, {
    tweener: function (a, b) {
      $.isFunction(a) ? (b = a, a = ['*']) : a = a.split(' ');
      for (var c, d = 0, e = a.length; e > d; d++)
        c = a[d], $c[c] = $c[c] || [], $c[c].unshift(b);
    },
    prefilter: function (a, b) {
      b ? Zc.unshift(a) : Zc.push(a);
    }
  }), $.Tween = K, K.prototype = {
    constructor: K,
    init: function (a, b, c, d, e, f) {
      this.elem = a, this.prop = c, this.easing = e || 'swing', this.options = b, this.start = this.now = this.cur(), this.end = d, this.unit = f || ($.cssNumber[c] ? '' : 'px');
    },
    cur: function () {
      var a = K.propHooks[this.prop];
      return a && a.get ? a.get(this) : K.propHooks._default.get(this);
    },
    run: function (a) {
      var b, c = K.propHooks[this.prop];
      return this.pos = b = $.easing[this.easing](a, this.options.duration * a, 0, 1, this.options.duration), this.now = (this.end - this.start) * b + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), c && c.set ? c.set(this) : K.propHooks._default.set(this), this;
    }
  }, K.prototype.init.prototype = K.prototype, K.propHooks = {
    _default: {
      get: function (a) {
        var b;
        return null == a.elem[a.prop] || a.elem.style && null != a.elem.style[a.prop] ? (b = $.css(a.elem, a.prop, !1, ''), b && 'auto' !== b ? b : 0) : a.elem[a.prop];
      },
      set: function (a) {
        $.fx.step[a.prop] ? $.fx.step[a.prop](a) : a.elem.style && (null != a.elem.style[$.cssProps[a.prop]] || $.cssHooks[a.prop]) ? $.style(a.elem, a.prop, a.now + a.unit) : a.elem[a.prop] = a.now;
      }
    }
  }, K.propHooks.scrollTop = K.propHooks.scrollLeft = {
    set: function (a) {
      a.elem.nodeType && a.elem.parentNode && (a.elem[a.prop] = a.now);
    }
  }, $.each([
    'toggle',
    'show',
    'hide'
  ], function (a, b) {
    var c = $.fn[b];
    $.fn[b] = function (d, e, f) {
      return null == d || 'boolean' == typeof d || !a && $.isFunction(d) && $.isFunction(e) ? c.apply(this, arguments) : this.animate(L(b, !0), d, e, f);
    };
  }), $.fn.extend({
    fadeTo: function (a, b, c, d) {
      return this.filter(r).css('opacity', 0).show().end().animate({ opacity: b }, a, c, d);
    },
    animate: function (a, b, c, d) {
      var e = $.isEmptyObject(a), f = $.speed(b, c, d), g = function () {
          var b = H(this, $.extend({}, a), f);
          e && b.stop(!0);
        };
      return e || f.queue === !1 ? this.each(g) : this.queue(f.queue, g);
    },
    stop: function (a, c, d) {
      var e = function (a) {
        var b = a.stop;
        delete a.stop, b(d);
      };
      return 'string' != typeof a && (d = c, c = a, a = b), c && a !== !1 && this.queue(a || 'fx', []), this.each(function () {
        var b = !0, c = null != a && a + 'queueHooks', f = $.timers, g = $._data(this);
        if (c)
          g[c] && g[c].stop && e(g[c]);
        else
          for (c in g)
            g[c] && g[c].stop && Yc.test(c) && e(g[c]);
        for (c = f.length; c--;)
          f[c].elem === this && (null == a || f[c].queue === a) && (f[c].anim.stop(d), b = !1, f.splice(c, 1));
        (b || !d) && $.dequeue(this, a);
      });
    }
  }), $.each({
    slideDown: L('show'),
    slideUp: L('hide'),
    slideToggle: L('toggle'),
    fadeIn: { opacity: 'show' },
    fadeOut: { opacity: 'hide' },
    fadeToggle: { opacity: 'toggle' }
  }, function (a, b) {
    $.fn[a] = function (a, c, d) {
      return this.animate(b, a, c, d);
    };
  }), $.speed = function (a, b, c) {
    var d = a && 'object' == typeof a ? $.extend({}, a) : {
        complete: c || !c && b || $.isFunction(a) && a,
        duration: a,
        easing: c && b || b && !$.isFunction(b) && b
      };
    return d.duration = $.fx.off ? 0 : 'number' == typeof d.duration ? d.duration : d.duration in $.fx.speeds ? $.fx.speeds[d.duration] : $.fx.speeds._default, (null == d.queue || d.queue === !0) && (d.queue = 'fx'), d.old = d.complete, d.complete = function () {
      $.isFunction(d.old) && d.old.call(this), d.queue && $.dequeue(this, d.queue);
    }, d;
  }, $.easing = {
    linear: function (a) {
      return a;
    },
    swing: function (a) {
      return 0.5 - Math.cos(a * Math.PI) / 2;
    }
  }, $.timers = [], $.fx = K.prototype.init, $.fx.tick = function () {
    for (var a, b = $.timers, c = 0; c < b.length; c++)
      a = b[c], !a() && b[c] === a && b.splice(c--, 1);
    b.length || $.fx.stop();
  }, $.fx.timer = function (a) {
    a() && $.timers.push(a) && !Vc && (Vc = setInterval($.fx.tick, $.fx.interval));
  }, $.fx.interval = 13, $.fx.stop = function () {
    clearInterval(Vc), Vc = null;
  }, $.fx.speeds = {
    slow: 600,
    fast: 200,
    _default: 400
  }, $.fx.step = {}, $.expr && $.expr.filters && ($.expr.filters.animated = function (a) {
    return $.grep($.timers, function (b) {
      return a === b.elem;
    }).length;
  });
  var _c = /^(?:body|html)$/i;
  $.fn.offset = function (a) {
    if (arguments.length)
      return a === b ? this : this.each(function (b) {
        $.offset.setOffset(this, a, b);
      });
    var c, d, e, f, g, h, i, j, k, l, m = this[0], n = m && m.ownerDocument;
    if (n)
      return (e = n.body) === m ? $.offset.bodyOffset(m) : (d = n.documentElement, $.contains(d, m) ? (c = m.getBoundingClientRect(), f = M(n), g = d.clientTop || e.clientTop || 0, h = d.clientLeft || e.clientLeft || 0, i = f.pageYOffset || d.scrollTop, j = f.pageXOffset || d.scrollLeft, k = c.top + i - g, l = c.left + j - h, {
        top: k,
        left: l
      }) : {
        top: 0,
        left: 0
      });
  }, $.offset = {
    bodyOffset: function (a) {
      var b = a.offsetTop, c = a.offsetLeft;
      return $.support.doesNotIncludeMarginInBodyOffset && (b += parseFloat($.css(a, 'marginTop')) || 0, c += parseFloat($.css(a, 'marginLeft')) || 0), {
        top: b,
        left: c
      };
    },
    setOffset: function (a, b, c) {
      var d = $.css(a, 'position');
      'static' === d && (a.style.position = 'relative');
      var e, f, g = $(a), h = g.offset(), i = $.css(a, 'top'), j = $.css(a, 'left'), k = ('absolute' === d || 'fixed' === d) && $.inArray('auto', [
          i,
          j
        ]) > -1, l = {}, m = {};
      k ? (m = g.position(), e = m.top, f = m.left) : (e = parseFloat(i) || 0, f = parseFloat(j) || 0), $.isFunction(b) && (b = b.call(a, c, h)), null != b.top && (l.top = b.top - h.top + e), null != b.left && (l.left = b.left - h.left + f), 'using' in b ? b.using.call(a, l) : g.css(l);
    }
  }, $.fn.extend({
    position: function () {
      if (this[0]) {
        var a = this[0], b = this.offsetParent(), c = this.offset(), d = _c.test(b[0].nodeName) ? {
            top: 0,
            left: 0
          } : b.offset();
        return c.top -= parseFloat($.css(a, 'marginTop')) || 0, c.left -= parseFloat($.css(a, 'marginLeft')) || 0, d.top += parseFloat($.css(b[0], 'borderTopWidth')) || 0, d.left += parseFloat($.css(b[0], 'borderLeftWidth')) || 0, {
          top: c.top - d.top,
          left: c.left - d.left
        };
      }
    },
    offsetParent: function () {
      return this.map(function () {
        for (var a = this.offsetParent || P.body; a && !_c.test(a.nodeName) && 'static' === $.css(a, 'position');)
          a = a.offsetParent;
        return a || P.body;
      });
    }
  }), $.each({
    scrollLeft: 'pageXOffset',
    scrollTop: 'pageYOffset'
  }, function (a, c) {
    var d = /Y/.test(c);
    $.fn[a] = function (e) {
      return $.access(this, function (a, e, f) {
        var g = M(a);
        return f === b ? g ? c in g ? g[c] : g.document.documentElement[e] : a[e] : (g ? g.scrollTo(d ? $(g).scrollLeft() : f, d ? f : $(g).scrollTop()) : a[e] = f, void 0);
      }, a, e, arguments.length, null);
    };
  }), $.each({
    Height: 'height',
    Width: 'width'
  }, function (a, c) {
    $.each({
      padding: 'inner' + a,
      content: c,
      '': 'outer' + a
    }, function (d, e) {
      $.fn[e] = function (e, f) {
        var g = arguments.length && (d || 'boolean' != typeof e), h = d || (e === !0 || f === !0 ? 'margin' : 'border');
        return $.access(this, function (c, d, e) {
          var f;
          return $.isWindow(c) ? c.document.documentElement['client' + a] : 9 === c.nodeType ? (f = c.documentElement, Math.max(c.body['scroll' + a], f['scroll' + a], c.body['offset' + a], f['offset' + a], f['client' + a])) : e === b ? $.css(c, d, e, h) : $.style(c, d, e, h);
        }, c, g ? e : b, g);
      };
    });
  }), a.jQuery = a.$ = $, 'function' == typeof define && define.amd && define.amd.jQuery && define('jquery', [], function () {
    return $;
  });
}(window), function (a) {
  var b = function (a, b) {
    for (var c = b.length - 1; c >= 0; c--)
      if (void 0 !== a.style[b[c]])
        return b[c];
  };
  a.Transform = function (a, c) {
    this.element = a, this.style = b(a, c || [
      'WebkitTransform',
      'MozTransform',
      'OTransform',
      'msTransform'
    ]);
  }, a.Transform.prototype = {
    translate: function (a, b) {
      return this.setter(a, b, 'translate');
    },
    rotate: function (a, b) {
      return 'number' == typeof a ? this.add('rotate', a) : this.setter(a, b, 'rotate');
    },
    skew: function (a, b) {
      return this.setter(a, b, 'skew');
    },
    scale: function (a, b) {
      return 'number' == typeof a ? this.add('scale', a) : (this.setter(a, b, 'scale'), this);
    },
    matrix: function () {
      var a = this.element.style[this.style], b = new RegExp(this.rules.matrix.regex).test(a), c = 'matrix(' + Array.prototype.slice.call(arguments, 0).join(',') + ')';
      return 'none' === a && (a = ''), b ? this.set(a.replace(this.rules[rule].regex, c)) : this.set(a + ' ' + c);
    },
    clear: function () {
      return this.set('');
    },
    set: function (a) {
      return this.element.style[this.style] = a, this;
    },
    setter: function (a, b, c) {
      if ('string' == typeof a)
        return this.add(c + a.toUpperCase(), b);
      for (i in a)
        a.hasOwnProperty(i) && this[c](i, a[i]);
      return this;
    },
    add: function (a, b) {
      var c = this.element.style[this.style], a = 'rotateZ' === a ? 'rotate' : a, d = new RegExp(this.rules[a].regex).test(c), e = this.rules[a].unit, f = a + '(' + b + e + ')';
      return 'none' === c && (c = ''), d ? this.set(c.replace(this.rules[a].regex, f)) : this.set(c + ' ' + f);
    },
    remove: function (a) {
      return this.set(this.element.style[this.style].replace(this.rules[a].regex, ''));
    },
    rules: {
      rotateX: {
        regex: /rotateX\((-?[0-9]+deg)\)/,
        unit: 'deg'
      },
      rotateY: {
        regex: /rotateY\((-?[0-9]+deg)\)/,
        unit: 'deg'
      },
      rotateZ: {
        regex: /rotateZ\((-?[0-9]+deg)\)/,
        unit: 'deg'
      },
      rotate: {
        regex: /rotate\((-?[0-9]+deg)\)/,
        unit: 'deg'
      },
      translateX: {
        regex: /translateX\((-?[0-9]+%)\)/,
        unit: '%'
      },
      translateY: {
        regex: /translateY\((-?[0-9]+%)\)/,
        unit: '%'
      },
      translateZ: {
        regex: /translateZ\((-?[0-9]+px)\)/,
        unit: 'px'
      },
      scale: {
        regex: /scale\((-?[0-9]+)\)/,
        unit: ''
      },
      scaleX: {
        regex: /scaleX\((-?[0-9]+)\)/,
        unit: ''
      },
      scaleY: {
        regex: /scaleY\((-?[0-9]+)\)/,
        unit: ''
      },
      skewX: {
        regex: /skewX\((-?[0-9]+deg)\)/,
        unit: 'deg'
      },
      skewY: {
        regex: /skewY\((-?[0-9]+deg)\)/,
        unit: 'deg'
      },
      scale: {
        regex: /scale\((-?[0-9]+\.?[0-9]+?)\)/,
        unit: ''
      },
      scaleX: {
        regex: /scaleX\((-?[0-9]+\.?[0-9]+?)\)/,
        unit: ''
      },
      scaleY: {
        regex: /scaleY\((-?[0-9]+\.?[0-9]+?)\)/,
        unit: ''
      },
      matrix: {
        regex: /matrix(.+)/,
        unit: ''
      }
    }
  }, a.Transition = function (a, c) {
    this.element = a, this.supported = c || {
      prefixes: [
        'WebkitTransition',
        'MozTransition',
        'OTransition',
        'msTransition'
      ],
      transformPrefixes: [
        '-webkit-',
        '-moz-',
        '-o-',
        '-ms-'
      ]
    }, this.style = b(a, this.supported.prefixes), this.supported.index = this.supported.prefixes.indexOf(this.style);
  }, a.Transition.prototype = {
    map: {
      duration: 'Duration',
      property: 'Property',
      'timing-function': 'TimingFunction'
    },
    set: function (a, b) {
      if ('string' == typeof a)
        return 'transform' === b && (b = this.supported.transformPrefixes[this.supported.index] + 'transform'), this.element.style[this.style + this.map[a]] = b, this;
      for (i in a)
        a.hasOwnProperty(i) && this.set(i, a[i]);
      return this;
    },
    clear: function (a) {
      return a ? this.set(a, '') : this.set({
        duration: '',
        property: '',
        'timing-function': ''
      });
    }
  };
}(window), function (a, b, c) {
  'use strict';
  function d(a) {
    return a && 'number' == typeof a.length ? 'function' != typeof a.hasOwnProperty && 'function' != typeof a.constructor ? !0 : a instanceof fb || Vc && a instanceof Vc || '[object Object]' !== _c.call(a) || 'function' == typeof a.callee : !1;
  }
  function e(a, b, c) {
    var f;
    if (a)
      if (x(a))
        for (f in a)
          'prototype' != f && 'length' != f && 'name' != f && a.hasOwnProperty(f) && b.call(c, a[f], f);
      else if (a.forEach && a.forEach !== e)
        a.forEach(b, c);
      else if (d(a))
        for (f = 0; f < a.length; f++)
          b.call(c, a[f], f);
      else
        for (f in a)
          a.hasOwnProperty(f) && b.call(c, a[f], f);
    return a;
  }
  function f(a) {
    var b = [];
    for (var c in a)
      a.hasOwnProperty(c) && b.push(c);
    return b.sort();
  }
  function g(a, b, c) {
    for (var d = f(a), e = 0; e < d.length; e++)
      b.call(c, a[d[e]], d[e]);
    return d;
  }
  function h(a) {
    return function (b, c) {
      a(c, b);
    };
  }
  function i() {
    for (var a, b = bd.length; b;) {
      if (b--, a = bd[b].charCodeAt(0), 57 == a)
        return bd[b] = 'A', bd.join('');
      if (90 != a)
        return bd[b] = String.fromCharCode(a + 1), bd.join('');
      bd[b] = '0';
    }
    return bd.unshift('0'), bd.join('');
  }
  function j(a, b) {
    b ? a.$$hashKey = b : delete a.$$hashKey;
  }
  function k(a) {
    var b = a.$$hashKey;
    return e(arguments, function (b) {
      b !== a && e(b, function (b, c) {
        a[c] = b;
      });
    }), j(a, b), a;
  }
  function l(a) {
    return parseInt(a, 10);
  }
  function m(a, b) {
    return k(new (k(function () {
    }, { prototype: a }))(), b);
  }
  function n() {
  }
  function o(a) {
    return a;
  }
  function p(a) {
    return function () {
      return a;
    };
  }
  function q(a) {
    return 'undefined' == typeof a;
  }
  function r(a) {
    return 'undefined' != typeof a;
  }
  function s(a) {
    return null != a && 'object' == typeof a;
  }
  function t(a) {
    return 'string' == typeof a;
  }
  function u(a) {
    return 'number' == typeof a;
  }
  function v(a) {
    return '[object Date]' == _c.apply(a);
  }
  function w(a) {
    return '[object Array]' == _c.apply(a);
  }
  function x(a) {
    return 'function' == typeof a;
  }
  function y(a) {
    return a && a.document && a.location && a.alert && a.setInterval;
  }
  function z(a) {
    return a && a.$evalAsync && a.$watch;
  }
  function A(a) {
    return '[object File]' === _c.apply(a);
  }
  function B(a) {
    return t(a) ? a.replace(/^\s*/, '').replace(/\s*$/, '') : a;
  }
  function C(a) {
    return a && (a.nodeName || a.bind && a.find);
  }
  function D(a, b, c) {
    var d = [];
    return e(a, function (a, e, f) {
      d.push(b.call(c, a, e, f));
    }), d;
  }
  function E(a, b) {
    return -1 != F(a, b);
  }
  function F(a, b) {
    if (a.indexOf)
      return a.indexOf(b);
    for (var c = 0; c < a.length; c++)
      if (b === a[c])
        return c;
    return -1;
  }
  function G(a, b) {
    var c = F(a, b);
    return c >= 0 && a.splice(c, 1), b;
  }
  function H(a, b) {
    if (y(a) || z(a))
      throw Error('Can\'t copy Window or Scope');
    if (b) {
      if (a === b)
        throw Error('Can\'t copy equivalent objects or arrays');
      if (w(a)) {
        b.length = 0;
        for (var c = 0; c < a.length; c++)
          b.push(H(a[c]));
      } else {
        var d = b.$$hashKey;
        e(b, function (a, c) {
          delete b[c];
        });
        for (var f in a)
          b[f] = H(a[f]);
        j(b, d);
      }
    } else
      b = a, a && (w(a) ? b = H(a, []) : v(a) ? b = new Date(a.getTime()) : s(a) && (b = H(a, {})));
    return b;
  }
  function I(a, b) {
    b = b || {};
    for (var c in a)
      a.hasOwnProperty(c) && '$$' !== c.substr(0, 2) && (b[c] = a[c]);
    return b;
  }
  function J(a, b) {
    if (a === b)
      return !0;
    if (null === a || null === b)
      return !1;
    if (a !== a && b !== b)
      return !0;
    var d, e, f, g = typeof a, h = typeof b;
    if (g == h && 'object' == g) {
      if (!w(a)) {
        if (v(a))
          return v(b) && a.getTime() == b.getTime();
        if (z(a) || z(b) || y(a) || y(b))
          return !1;
        f = {};
        for (e in a)
          if ('$' !== e.charAt(0) && !x(a[e])) {
            if (!J(a[e], b[e]))
              return !1;
            f[e] = !0;
          }
        for (e in b)
          if (!f[e] && '$' !== e.charAt(0) && b[e] !== c && !x(b[e]))
            return !1;
        return !0;
      }
      if ((d = a.length) == b.length) {
        for (e = 0; d > e; e++)
          if (!J(a[e], b[e]))
            return !1;
        return !0;
      }
    }
    return !1;
  }
  function K(a, b, c) {
    return a.concat(Zc.call(b, c));
  }
  function L(a, b) {
    return Zc.call(a, b || 0);
  }
  function M(a, b) {
    var c = arguments.length > 2 ? L(arguments, 2) : [];
    return !x(b) || b instanceof RegExp ? b : c.length ? function () {
      return arguments.length ? b.apply(a, c.concat(Zc.call(arguments, 0))) : b.apply(a, c);
    } : function () {
      return arguments.length ? b.apply(a, arguments) : b.call(a);
    };
  }
  function N(a, d) {
    var e = d;
    return /^\$+/.test(a) ? e = c : y(d) ? e = '$WINDOW' : d && b === d ? e = '$DOCUMENT' : z(d) && (e = '$SCOPE'), e;
  }
  function O(a, b) {
    return JSON.stringify(a, N, b ? '  ' : null);
  }
  function P(a) {
    return t(a) ? JSON.parse(a) : a;
  }
  function Q(a) {
    if (a && 0 !== a.length) {
      var b = Qc('' + a);
      a = !('f' == b || '0' == b || 'false' == b || 'no' == b || 'n' == b || '[]' == b);
    } else
      a = !1;
    return a;
  }
  function R(a) {
    a = Uc(a).clone();
    try {
      a.html('');
    } catch (b) {
    }
    var c = 3, d = Uc('<div>').append(a).html();
    try {
      return a[0].nodeType === c ? Qc(d) : d.match(/^(<[^>]+>)/)[1].replace(/^<([\w\-]+)/, function (a, b) {
        return '<' + Qc(b);
      });
    } catch (b) {
      return Qc(d);
    }
  }
  function S(a) {
    var b, c, d = {};
    return e((a || '').split('&'), function (a) {
      a && (b = a.split('='), c = decodeURIComponent(b[0]), d[c] = r(b[1]) ? decodeURIComponent(b[1]) : !0);
    }), d;
  }
  function T(a) {
    var b = [];
    return e(a, function (a, c) {
      b.push(V(c, !0) + (a === !0 ? '' : '=' + V(a, !0)));
    }), b.length ? b.join('&') : '';
  }
  function U(a) {
    return V(a, !0).replace(/%26/gi, '&').replace(/%3D/gi, '=').replace(/%2B/gi, '+');
  }
  function V(a, b) {
    return encodeURIComponent(a).replace(/%40/gi, '@').replace(/%3A/gi, ':').replace(/%24/g, '$').replace(/%2C/gi, ',').replace(/%20/g, b ? '%20' : '+');
  }
  function W(a, c) {
    function d(a) {
      a && h.push(a);
    }
    var f, g, h = [a], i = [
        'ng:app',
        'ng-app',
        'x-ng-app',
        'data-ng-app'
      ], j = /\sng[:\-]app(:\s*([\w\d_]+);?)?\s/;
    e(i, function (c) {
      i[c] = !0, d(b.getElementById(c)), c = c.replace(':', '\\:'), a.querySelectorAll && (e(a.querySelectorAll('.' + c), d), e(a.querySelectorAll('.' + c + '\\:'), d), e(a.querySelectorAll('[' + c + ']'), d));
    }), e(h, function (a) {
      if (!f) {
        var b = ' ' + a.className + ' ', c = j.exec(b);
        c ? (f = a, g = (c[2] || '').replace(/\s+/g, ',')) : e(a.attributes, function (b) {
          !f && i[b.name] && (f = a, g = b.value);
        });
      }
    }), f && c(f, g ? [g] : []);
  }
  function X(b, c) {
    var d = function () {
        b = Uc(b), c = c || [], c.unshift([
          '$provide',
          function (a) {
            a.value('$rootElement', b);
          }
        ]), c.unshift('ng');
        var a = yb(c);
        return a.invoke([
          '$rootScope',
          '$rootElement',
          '$compile',
          '$injector',
          function (a, b, c, d) {
            a.$apply(function () {
              b.data('$injector', d), c(b)(a);
            });
          }
        ]), a;
      }, f = /^NG_DEFER_BOOTSTRAP!/;
    return a && !f.test(a.name) ? d() : (a.name = a.name.replace(f, ''), ad.resumeBootstrap = function (a) {
      e(a, function (a) {
        c.push(a);
      }), d();
    }, void 0);
  }
  function Y(a, b) {
    return b = b || '_', a.replace(cd, function (a, c) {
      return (c ? b : '') + a.toLowerCase();
    });
  }
  function Z() {
    Vc = a.jQuery, Vc ? (Uc = Vc, k(Vc.fn, {
      scope: ld.scope,
      controller: ld.controller,
      injector: ld.injector,
      inheritedData: ld.inheritedData
    }), eb('remove', !0), eb('empty'), eb('html')) : Uc = fb, ad.element = Uc;
  }
  function $(a, b, c) {
    if (!a)
      throw new Error('Argument \'' + (b || '?') + '\' is ' + (c || 'required'));
    return a;
  }
  function _(a, b, c) {
    return c && w(a) && (a = a[a.length - 1]), $(x(a), b, 'not a function, got ' + (a && 'object' == typeof a ? a.constructor.name || 'Object' : typeof a)), a;
  }
  function ab(a) {
    function b(a, b, c) {
      return a[b] || (a[b] = c());
    }
    return b(b(a, 'angular', Object), 'module', function () {
      var a = {};
      return function (c, d, e) {
        return d && a.hasOwnProperty(c) && (a[c] = null), b(a, c, function () {
          function a(a, c, d) {
            return function () {
              return b[d || 'push']([
                a,
                c,
                arguments
              ]), h;
            };
          }
          if (!d)
            throw Error('No module: ' + c);
          var b = [], f = [], g = a('$injector', 'invoke'), h = {
              _invokeQueue: b,
              _runBlocks: f,
              requires: d,
              name: c,
              provider: a('$provide', 'provider'),
              factory: a('$provide', 'factory'),
              service: a('$provide', 'service'),
              value: a('$provide', 'value'),
              constant: a('$provide', 'constant', 'unshift'),
              filter: a('$filterProvider', 'register'),
              controller: a('$controllerProvider', 'register'),
              directive: a('$compileProvider', 'directive'),
              config: g,
              run: function (a) {
                return f.push(a), this;
              }
            };
          return e && g(e), h;
        });
      };
    });
  }
  function bb(b) {
    k(b, {
      bootstrap: X,
      copy: H,
      extend: k,
      equals: J,
      element: Uc,
      forEach: e,
      injector: yb,
      noop: n,
      bind: M,
      toJson: O,
      fromJson: P,
      identity: o,
      isUndefined: q,
      isDefined: r,
      isString: t,
      isFunction: x,
      isObject: s,
      isNumber: u,
      isElement: C,
      isArray: w,
      version: dd,
      isDate: v,
      lowercase: Qc,
      uppercase: Rc,
      callbacks: { counter: 0 }
    }), Wc = ab(a);
    try {
      Wc('ngLocale');
    } catch (c) {
      Wc('ngLocale', []).provider('$locale', qc);
    }
    Wc('ng', ['ngLocale'], [
      '$provide',
      function (a) {
        a.provider('$compile', Eb).directive({
          a: Id,
          input: Sd,
          textarea: Sd,
          form: Md,
          script: Ae,
          select: Ce,
          style: Ee,
          option: De,
          ngBind: ce,
          ngBindHtmlUnsafe: ee,
          ngBindTemplate: de,
          ngClass: fe,
          ngClassEven: he,
          ngClassOdd: ge,
          ngCsp: ke,
          ngCloak: ie,
          ngController: je,
          ngForm: Nd,
          ngHide: te,
          ngInclude: ne,
          ngInit: oe,
          ngNonBindable: pe,
          ngPluralize: qe,
          ngRepeat: re,
          ngShow: se,
          ngSubmit: me,
          ngStyle: ue,
          ngSwitch: ve,
          ngSwitchWhen: we,
          ngSwitchDefault: xe,
          ngOptions: Be,
          ngView: ze,
          ngTransclude: ye,
          ngModel: Yd,
          ngList: _d,
          ngChange: Zd,
          required: $d,
          ngRequired: $d,
          ngValue: be
        }).directive(Jd).directive(le), a.provider({
          $anchorScroll: zb,
          $browser: Bb,
          $cacheFactory: Cb,
          $controller: Gb,
          $document: Hb,
          $exceptionHandler: Ib,
          $filter: sc,
          $interpolate: Jb,
          $http: nc,
          $httpBackend: oc,
          $location: Vb,
          $log: Wb,
          $parse: bc,
          $route: ec,
          $routeParams: fc,
          $rootScope: gc,
          $q: cc,
          $sniffer: hc,
          $templateCache: Db,
          $timeout: rc,
          $window: ic
        });
      }
    ]);
  }
  function cb() {
    return ++gd;
  }
  function db(a) {
    return a.replace(jd, function (a, b, c, d) {
      return d ? c.toUpperCase() : c;
    }).replace(kd, 'Moz$1');
  }
  function eb(a, b) {
    function c() {
      for (var a, c, e, f, g, h, i, j = [this], k = b; j.length;)
        for (a = j.shift(), c = 0, e = a.length; e > c; c++)
          for (f = Uc(a[c]), k ? f.triggerHandler('$destroy') : k = !k, g = 0, h = (i = f.children()).length; h > g; g++)
            j.push(Vc(i[g]));
      return d.apply(this, arguments);
    }
    var d = Vc.fn[a];
    d = d.$original || d, c.$original = d, Vc.fn[a] = c;
  }
  function fb(a) {
    if (a instanceof fb)
      return a;
    if (!(this instanceof fb)) {
      if (t(a) && '<' != a.charAt(0))
        throw Error('selectors not implemented');
      return new fb(a);
    }
    if (t(a)) {
      var c = b.createElement('div');
      c.innerHTML = '<div>&#160;</div>' + a, c.removeChild(c.firstChild), pb(this, c.childNodes), this.remove();
    } else
      pb(this, a);
  }
  function gb(a) {
    return a.cloneNode(!0);
  }
  function hb(a) {
    jb(a);
    for (var b = 0, c = a.childNodes || []; b < c.length; b++)
      hb(c[b]);
  }
  function ib(a, b, c) {
    var d = kb(a, 'events'), f = kb(a, 'handle');
    f && (q(b) ? e(d, function (b, c) {
      id(a, c, b), delete d[c];
    }) : q(c) ? (id(a, b, d[b]), delete d[b]) : G(d[b], c));
  }
  function jb(a) {
    var b = a[fd], d = ed[b];
    d && (d.handle && (d.events.$destroy && d.handle({}, '$destroy'), ib(a)), delete ed[b], a[fd] = c);
  }
  function kb(a, b, c) {
    var d = a[fd], e = ed[d || -1];
    return r(c) ? (e || (a[fd] = d = cb(), e = ed[d] = {}), e[b] = c, void 0) : e && e[b];
  }
  function lb(a, b, c) {
    var d = kb(a, 'data'), e = r(c), f = !e && r(b), g = f && !s(b);
    if (d || g || kb(a, 'data', d = {}), e)
      d[b] = c;
    else {
      if (!f)
        return d;
      if (g)
        return d && d[b];
      k(d, b);
    }
  }
  function mb(a, b) {
    return (' ' + a.className + ' ').replace(/[\n\t]/g, ' ').indexOf(' ' + b + ' ') > -1;
  }
  function nb(a, b) {
    b && e(b.split(' '), function (b) {
      a.className = B((' ' + a.className + ' ').replace(/[\n\t]/g, ' ').replace(' ' + B(b) + ' ', ' '));
    });
  }
  function ob(a, b) {
    b && e(b.split(' '), function (b) {
      mb(a, b) || (a.className = B(a.className + ' ' + B(b)));
    });
  }
  function pb(a, b) {
    if (b) {
      b = b.nodeName || !r(b.length) || y(b) ? [b] : b;
      for (var c = 0; c < b.length; c++)
        a.push(b[c]);
    }
  }
  function qb(a, b) {
    return rb(a, '$' + (b || 'ngController') + 'Controller');
  }
  function rb(a, b, c) {
    for (a = Uc(a), 9 == a[0].nodeType && (a = a.find('html')); a.length;) {
      if (c = a.data(b))
        return c;
      a = a.parent();
    }
  }
  function sb(a, b) {
    var c = md[b.toLowerCase()];
    return c && nd[a.nodeName] && c;
  }
  function tb(a, c) {
    var d = function (d, f) {
      if (d.preventDefault || (d.preventDefault = function () {
          d.returnValue = !1;
        }), d.stopPropagation || (d.stopPropagation = function () {
          d.cancelBubble = !0;
        }), d.target || (d.target = d.srcElement || b), q(d.defaultPrevented)) {
        var g = d.preventDefault;
        d.preventDefault = function () {
          d.defaultPrevented = !0, g.call(d);
        }, d.defaultPrevented = !1;
      }
      d.isDefaultPrevented = function () {
        return d.defaultPrevented;
      }, e(c[f || d.type], function (b) {
        b.call(a, d);
      }), 8 >= Yc ? (d.preventDefault = null, d.stopPropagation = null, d.isDefaultPrevented = null) : (delete d.preventDefault, delete d.stopPropagation, delete d.isDefaultPrevented);
    };
    return d.elem = a, d;
  }
  function ub(a) {
    var b, d = typeof a;
    return 'object' == d && null !== a ? 'function' == typeof (b = a.$$hashKey) ? b = a.$$hashKey() : b === c && (b = a.$$hashKey = i()) : b = a, d + ':' + b;
  }
  function vb(a) {
    e(a, this.put, this);
  }
  function wb() {
  }
  function xb(a) {
    var b, c, d, f;
    return 'function' == typeof a ? (b = a.$inject) || (b = [], c = a.toString().replace(rd, ''), d = c.match(od), e(d[1].split(pd), function (a) {
      a.replace(qd, function (a, c, d) {
        b.push(d);
      });
    }), a.$inject = b) : w(a) ? (f = a.length - 1, _(a[f], 'fn'), b = a.slice(0, f)) : _(a, 'fn', !0), b;
  }
  function yb(a) {
    function b(a) {
      return function (b, c) {
        return s(b) ? (e(b, h(a)), void 0) : a(b, c);
      };
    }
    function c(a, b) {
      if ((x(b) || w(b)) && (b = v.instantiate(b)), !b.$get)
        throw Error('Provider ' + a + ' must define $get factory method.');
      return u[a + o] = b;
    }
    function d(a, b) {
      return c(a, { $get: b });
    }
    function f(a, b) {
      return d(a, [
        '$injector',
        function (a) {
          return a.instantiate(b);
        }
      ]);
    }
    function g(a, b) {
      return d(a, p(b));
    }
    function i(a, b) {
      u[a] = b, y[a] = b;
    }
    function j(a, b) {
      var c = v.get(a + o), d = c.$get;
      c.$get = function () {
        var a = z.invoke(d, c);
        return z.invoke(b, null, { $delegate: a });
      };
    }
    function k(a) {
      var b = [];
      return e(a, function (a) {
        if (!r.get(a))
          if (r.put(a, !0), t(a)) {
            var c = Wc(a);
            b = b.concat(k(c.requires)).concat(c._runBlocks);
            try {
              for (var d = c._invokeQueue, e = 0, f = d.length; f > e; e++) {
                var g = d[e], h = '$injector' == g[0] ? v : v.get(g[0]);
                h[g[1]].apply(h, g[2]);
              }
            } catch (i) {
              throw i.message && (i.message += ' from ' + a), i;
            }
          } else if (x(a))
            try {
              b.push(v.invoke(a));
            } catch (i) {
              throw i.message && (i.message += ' from ' + a), i;
            }
          else if (w(a))
            try {
              b.push(v.invoke(a));
            } catch (i) {
              throw i.message && (i.message += ' from ' + String(a[a.length - 1])), i;
            }
          else
            _(a, 'module');
      }), b;
    }
    function l(a, b) {
      function c(c) {
        if ('string' != typeof c)
          throw Error('Service name expected');
        if (a.hasOwnProperty(c)) {
          if (a[c] === m)
            throw Error('Circular dependency: ' + q.join(' <- '));
          return a[c];
        }
        try {
          return q.unshift(c), a[c] = m, a[c] = b(c);
        } finally {
          q.shift();
        }
      }
      function d(a, b, d) {
        var e, f, g, h = [], i = xb(a);
        for (f = 0, e = i.length; e > f; f++)
          g = i[f], h.push(d && d.hasOwnProperty(g) ? d[g] : c(g));
        switch (a.$inject || (a = a[e]), b ? -1 : h.length) {
        case 0:
          return a();
        case 1:
          return a(h[0]);
        case 2:
          return a(h[0], h[1]);
        case 3:
          return a(h[0], h[1], h[2]);
        case 4:
          return a(h[0], h[1], h[2], h[3]);
        case 5:
          return a(h[0], h[1], h[2], h[3], h[4]);
        case 6:
          return a(h[0], h[1], h[2], h[3], h[4], h[5]);
        case 7:
          return a(h[0], h[1], h[2], h[3], h[4], h[5], h[6]);
        case 8:
          return a(h[0], h[1], h[2], h[3], h[4], h[5], h[6], h[7]);
        case 9:
          return a(h[0], h[1], h[2], h[3], h[4], h[5], h[6], h[7], h[8]);
        case 10:
          return a(h[0], h[1], h[2], h[3], h[4], h[5], h[6], h[7], h[8], h[9]);
        default:
          return a.apply(b, h);
        }
      }
      function e(a, b) {
        var c, e, f = function () {
          };
        return f.prototype = (w(a) ? a[a.length - 1] : a).prototype, c = new f(), e = d(a, c, b), s(e) ? e : c;
      }
      return {
        invoke: d,
        instantiate: e,
        get: c,
        annotate: xb
      };
    }
    var m = {}, o = 'Provider', q = [], r = new vb(), u = {
        $provide: {
          provider: b(c),
          factory: b(d),
          service: b(f),
          value: b(g),
          constant: b(i),
          decorator: j
        }
      }, v = l(u, function () {
        throw Error('Unknown provider: ' + q.join(' <- '));
      }), y = {}, z = y.$injector = l(y, function (a) {
        var b = v.get(a + o);
        return z.invoke(b.$get, b);
      });
    return e(k(a), function (a) {
      z.invoke(a || n);
    }), z;
  }
  function zb() {
    var a = !0;
    this.disableAutoScrolling = function () {
      a = !1;
    }, this.$get = [
      '$window',
      '$location',
      '$rootScope',
      function (b, c, d) {
        function f(a) {
          var b = null;
          return e(a, function (a) {
            b || 'a' !== Qc(a.nodeName) || (b = a);
          }), b;
        }
        function g() {
          var a, d = c.hash();
          d ? (a = h.getElementById(d)) ? a.scrollIntoView() : (a = f(h.getElementsByName(d))) ? a.scrollIntoView() : 'top' === d && b.scrollTo(0, 0) : b.scrollTo(0, 0);
        }
        var h = b.document;
        return a && d.$watch(function () {
          return c.hash();
        }, function () {
          d.$evalAsync(g);
        }), g;
      }
    ];
  }
  function Ab(a, b, d, f) {
    function g(a) {
      try {
        a.apply(null, L(arguments, 1));
      } finally {
        if (s--, 0 === s)
          for (; u.length;)
            try {
              u.pop()();
            } catch (b) {
              d.error(b);
            }
      }
    }
    function h(a, b) {
      !function c() {
        e(w, function (a) {
          a();
        }), v = b(c, a);
      }();
    }
    function i() {
      x != j.url() && (x = j.url(), e(z, function (a) {
        a(j.url());
      }));
    }
    var j = this, k = b[0], l = a.location, m = a.history, o = a.setTimeout, p = a.clearTimeout, r = {};
    j.isMock = !1;
    var s = 0, u = [];
    j.$$completeOutstandingRequest = g, j.$$incOutstandingRequestCount = function () {
      s++;
    }, j.notifyWhenNoOutstandingRequests = function (a) {
      e(w, function (a) {
        a();
      }), 0 === s ? a() : u.push(a);
    };
    var v, w = [];
    j.addPollFn = function (a) {
      return q(v) && h(100, o), w.push(a), a;
    };
    var x = l.href, y = b.find('base');
    j.url = function (a, b) {
      if (a) {
        if (x == a)
          return;
        return x = a, f.history ? b ? m.replaceState(null, '', a) : (m.pushState(null, '', a), y.attr('href', y.attr('href'))) : b ? l.replace(a) : l.href = a, j;
      }
      return l.href.replace(/%27/g, '\'');
    };
    var z = [], A = !1;
    j.onUrlChange = function (b) {
      return A || (f.history && Uc(a).bind('popstate', i), f.hashchange ? Uc(a).bind('hashchange', i) : j.addPollFn(i), A = !0), z.push(b), b;
    }, j.baseHref = function () {
      var a = y.attr('href');
      return a ? a.replace(/^https?\:\/\/[^\/]*/, '') : '';
    };
    var B = {}, C = '', D = j.baseHref();
    j.cookies = function (a, b) {
      var e, f, g, h, i;
      if (!a) {
        if (k.cookie !== C)
          for (C = k.cookie, f = C.split('; '), B = {}, h = 0; h < f.length; h++)
            if (g = f[h], i = g.indexOf('='), i > 0) {
              var a = unescape(g.substring(0, i));
              B[a] === c && (B[a] = unescape(g.substring(i + 1)));
            }
        return B;
      }
      b === c ? k.cookie = escape(a) + '=;path=' + D + ';expires=Thu, 01 Jan 1970 00:00:00 GMT' : t(b) && (e = (k.cookie = escape(a) + '=' + escape(b) + ';path=' + D).length + 1, e > 4096 && d.warn('Cookie \'' + a + '\' possibly not set or overflowed because it was too large (' + e + ' > 4096 bytes)!'));
    }, j.defer = function (a, b) {
      var c;
      return s++, c = o(function () {
        delete r[c], g(a);
      }, b || 0), r[c] = !0, c;
    }, j.defer.cancel = function (a) {
      return r[a] ? (delete r[a], p(a), g(n), !0) : !1;
    };
  }
  function Bb() {
    this.$get = [
      '$window',
      '$log',
      '$sniffer',
      '$document',
      function (a, b, c, d) {
        return new Ab(a, d, b, c);
      }
    ];
  }
  function Cb() {
    this.$get = function () {
      function a(a, c) {
        function d(a) {
          a != l && (m ? m == a && (m = a.n) : m = a, e(a.n, a.p), e(a, l), l = a, l.n = null);
        }
        function e(a, b) {
          a != b && (a && (a.p = b), b && (b.n = a));
        }
        if (a in b)
          throw Error('cacheId ' + a + ' taken');
        var f = 0, g = k({}, c, { id: a }), h = {}, i = c && c.capacity || Number.MAX_VALUE, j = {}, l = null, m = null;
        return b[a] = {
          put: function (a, b) {
            var c = j[a] || (j[a] = { key: a });
            d(c), q(b) || (a in h || f++, h[a] = b, f > i && this.remove(m.key));
          },
          get: function (a) {
            var b = j[a];
            if (b)
              return d(b), h[a];
          },
          remove: function (a) {
            var b = j[a];
            b && (b == l && (l = b.p), b == m && (m = b.n), e(b.n, b.p), delete j[a], delete h[a], f--);
          },
          removeAll: function () {
            h = {}, f = 0, j = {}, l = m = null;
          },
          destroy: function () {
            h = null, g = null, j = null, delete b[a];
          },
          info: function () {
            return k({}, g, { size: f });
          }
        };
      }
      var b = {};
      return a.info = function () {
        var a = {};
        return e(b, function (b, c) {
          a[c] = b.info();
        }), a;
      }, a.get = function (a) {
        return b[a];
      }, a;
    };
  }
  function Db() {
    this.$get = [
      '$cacheFactory',
      function (a) {
        return a('templates');
      }
    ];
  }
  function Eb(a) {
    var d = {}, f = 'Directive', g = /^\s*directive\:\s*([\d\w\-_]+)\s+(.*)$/, i = /(([\d\w\-_]+)(?:\:([^;]+))?;?)/, j = 'Template must have exactly one root element. was: ', l = /^\s*(https?|ftp|mailto|file):/;
    this.directive = function m(b, c) {
      return t(b) ? ($(c, 'directive'), d.hasOwnProperty(b) || (d[b] = [], a.factory(b + f, [
        '$injector',
        '$exceptionHandler',
        function (a, c) {
          var f = [];
          return e(d[b], function (d) {
            try {
              var e = a.invoke(d);
              x(e) ? e = { compile: p(e) } : !e.compile && e.link && (e.compile = p(e.link)), e.priority = e.priority || 0, e.name = e.name || b, e.require = e.require || e.controller && e.name, e.restrict = e.restrict || 'A', f.push(e);
            } catch (g) {
              c(g);
            }
          }), f;
        }
      ])), d[b].push(c)) : e(b, h(m)), this;
    }, this.urlSanitizationWhitelist = function (a) {
      return r(a) ? (l = a, this) : l;
    }, this.$get = [
      '$injector',
      '$interpolate',
      '$exceptionHandler',
      '$http',
      '$templateCache',
      '$parse',
      '$controller',
      '$rootScope',
      '$document',
      function (a, h, m, n, q, r, u, v, y) {
        function z(a, b, c) {
          a instanceof Uc || (a = Uc(a)), e(a, function (b, c) {
            3 == b.nodeType && b.nodeValue.match(/\S+/) && (a[c] = Uc(b).wrap('<span></span>').parent()[0]);
          });
          var d = C(a, b, a, c);
          return function (b, c) {
            $(b, 'scope');
            for (var e = c ? ld.clone.call(a) : a, f = 0, g = e.length; g > f; f++) {
              var h = e[f];
              (1 == h.nodeType || 9 == h.nodeType) && e.eq(f).data('$scope', b);
            }
            return A(e, 'ng-scope'), c && c(e, b), d && d(b, e, e), e;
          };
        }
        function A(a, b) {
          try {
            a.addClass(b);
          } catch (c) {
          }
        }
        function C(a, b, d, e) {
          function f(a, d, e, f) {
            var g, h, i, j, k, m, n, o, p = [];
            for (m = 0, n = d.length; n > m; m++)
              p.push(d[m]);
            for (m = 0, o = 0, n = l.length; n > m; o++)
              i = p[o], g = l[m++], h = l[m++], g ? (g.scope ? (j = a.$new(s(g.scope)), Uc(i).data('$scope', j)) : j = a, k = g.transclude, k || !f && b ? g(h, j, i, e, function (b) {
                return function (c) {
                  var d = a.$new();
                  return d.$$transcluded = !0, b(d, c).bind('$destroy', M(d, d.$destroy));
                };
              }(k || b)) : g(h, j, i, c, f)) : h && h(a, i.childNodes, c, f);
          }
          for (var g, h, i, j, k, l = [], m = 0; m < a.length; m++)
            j = new P(), i = D(a[m], [], j, e), g = i.length ? E(i, a[m], j, b, d) : null, h = g && g.terminal || !a[m].childNodes || !a[m].childNodes.length ? null : C(a[m].childNodes, g ? g.transclude : b), l.push(g), l.push(h), k = k || g || h;
          return k ? f : null;
        }
        function D(a, b, c, d) {
          var e, f, h = a.nodeType, j = c.$attr;
          switch (h) {
          case 1:
            F(b, Fb(Xc(a).toLowerCase()), 'E', d);
            for (var k, l, m, n, o = a.attributes, p = 0, q = o && o.length; q > p; p++)
              k = o[p], k.specified && (l = k.name, m = Fb(l.toLowerCase()), j[m] = l, c[m] = n = B(Yc && 'href' == l ? decodeURIComponent(a.getAttribute(l, 2)) : k.value), sb(a, m) && (c[m] = !0), N(a, b, n, m), F(b, m, 'A', d));
            if (f = a.className, t(f) && '' !== f)
              for (; e = i.exec(f);)
                m = Fb(e[2]), F(b, m, 'C', d) && (c[m] = B(e[3])), f = f.substr(e.index + e[0].length);
            break;
          case 3:
            L(b, a.nodeValue);
            break;
          case 8:
            try {
              e = g.exec(a.nodeValue), e && (m = Fb(e[1]), F(b, m, 'M', d) && (c[m] = B(e[2])));
            } catch (r) {
            }
          }
          return b.sort(J), b;
        }
        function E(a, d, f, g, h) {
          function i(a, b) {
            a && (a.require = n.require, F.push(a)), b && (b.require = n.require, J.push(b));
          }
          function k(a, b) {
            var c, d = 'data', f = !1;
            if (t(a)) {
              for (; '^' == (c = a.charAt(0)) || '?' == c;)
                a = a.substr(1), '^' == c && (d = 'inheritedData'), f = f || '?' == c;
              if (c = b[d]('$' + a + 'Controller'), !c && !f)
                throw Error('No controller: ' + a);
              return c;
            }
            return w(a) && (c = [], e(a, function (a) {
              c.push(k(a, b));
            })), c;
          }
          function l(a, b, g, h, i) {
            var j, l, n, o, p, q;
            if (j = d === g ? f : I(f, new P(Uc(g), f.$attr)), l = j.$$element, M) {
              var s = /^\s*([@=&])\s*(\w*)\s*$/, t = b.$parent || b;
              e(M.scope, function (a, c) {
                var d, e, f, g = a.match(s) || [], h = g[2] || c, i = g[1];
                switch (b.$$isolateBindings[c] = i + h, i) {
                case '@':
                  j.$observe(h, function (a) {
                    b[c] = a;
                  }), j.$$observers[h].$$scope = t;
                  break;
                case '=':
                  e = r(j[h]), f = e.assign || function () {
                    throw d = b[c] = e(t), Error(sd + j[h] + ' (directive: ' + M.name + ')');
                  }, d = b[c] = e(t), b.$watch(function () {
                    var a = e(t);
                    return a !== b[c] && (a !== d ? d = b[c] = a : f(t, a = d = b[c])), a;
                  });
                  break;
                case '&':
                  e = r(j[h]), b[c] = function (a) {
                    return e(t, a);
                  };
                  break;
                default:
                  throw Error('Invalid isolate scope definition for directive ' + M.name + ': ' + a);
                }
              });
            }
            for (v && e(v, function (a) {
                var c = {
                    $scope: b,
                    $element: l,
                    $attrs: j,
                    $transclude: i
                  };
                q = a.controller, '@' == q && (q = j[a.name]), l.data('$' + a.name + 'Controller', u(q, c));
              }), n = 0, o = F.length; o > n; n++)
              try {
                p = F[n], p(b, l, j, p.require && k(p.require, l));
              } catch (w) {
                m(w, R(l));
              }
            for (a && a(b, g.childNodes, c, i), n = 0, o = J.length; o > n; n++)
              try {
                p = J[n], p(b, l, j, p.require && k(p.require, l));
              } catch (w) {
                m(w, R(l));
              }
          }
          for (var n, o, p, q, v, y, C, E = -Number.MAX_VALUE, F = [], J = [], L = null, M = null, N = null, Q = f.$$element = Uc(d), S = g, T = 0, V = a.length; V > T && (n = a[T], p = c, !(E > n.priority)); T++) {
            if ((C = n.scope) && (K('isolated scope', M, n, Q), s(C) && (A(Q, 'ng-isolate-scope'), M = n), A(Q, 'ng-scope'), L = L || n), o = n.name, (C = n.controller) && (v = v || {}, K('\'' + o + '\' controller', v[o], n, Q), v[o] = n), (C = n.transclude) && (K('transclusion', q, n, Q), q = n, E = n.priority, 'element' == C ? (p = Uc(d), Q = f.$$element = Uc(b.createComment(' ' + o + ': ' + f[o] + ' ')), d = Q[0], O(h, Uc(p[0]), d), S = z(p, g, E)) : (p = Uc(gb(d)).contents(), Q.html(''), S = z(p, g))), C = n.template)
              if (K('template', N, n, Q), N = n, C = U(C), n.replace) {
                if (p = Uc('<div>' + B(C) + '</div>').contents(), d = p[0], 1 != p.length || 1 !== d.nodeType)
                  throw new Error(j + C);
                O(h, Q, d);
                var W = { $attr: {} };
                a = a.concat(D(d, a.splice(T + 1, a.length - (T + 1)), W)), G(f, W), V = a.length;
              } else
                Q.html(C);
            if (n.templateUrl)
              K('template', N, n, Q), N = n, l = H(a.splice(T, a.length - T), l, Q, f, h, n.replace, S), V = a.length;
            else if (n.compile)
              try {
                y = n.compile(Q, f, S), x(y) ? i(null, y) : y && i(y.pre, y.post);
              } catch (X) {
                m(X, R(Q));
              }
            n.terminal && (l.terminal = !0, E = Math.max(E, n.priority));
          }
          return l.scope = L && L.scope, l.transclude = q && S, l;
        }
        function F(b, e, g, h) {
          var i = !1;
          if (d.hasOwnProperty(e))
            for (var j, k = a.get(e + f), l = 0, n = k.length; n > l; l++)
              try {
                j = k[l], (h === c || h > j.priority) && -1 != j.restrict.indexOf(g) && (b.push(j), i = !0);
              } catch (o) {
                m(o);
              }
          return i;
        }
        function G(a, b) {
          var c = b.$attr, d = a.$attr, f = a.$$element;
          e(a, function (d, e) {
            '$' != e.charAt(0) && (b[e] && (d += ('style' === e ? ';' : ' ') + b[e]), a.$set(e, d, !0, c[e]));
          }), e(b, function (b, e) {
            'class' == e ? (A(f, b), a['class'] = (a['class'] ? a['class'] + ' ' : '') + b) : 'style' == e ? f.attr('style', f.attr('style') + ';' + b) : '$' == e.charAt(0) || a.hasOwnProperty(e) || (a[e] = b, d[e] = c[e]);
          });
        }
        function H(a, b, c, d, e, f, g) {
          var h, i, l = [], m = c[0], o = a.shift(), p = k({}, o, {
              controller: null,
              templateUrl: null,
              transclude: null,
              scope: null
            });
          return c.html(''), n.get(o.templateUrl, { cache: q }).success(function (k) {
            var n, o, q;
            if (k = U(k), f) {
              if (q = Uc('<div>' + B(k) + '</div>').contents(), n = q[0], 1 != q.length || 1 !== n.nodeType)
                throw new Error(j + k);
              o = { $attr: {} }, O(e, c, n), D(n, a, o), G(d, o);
            } else
              n = m, c.html(k);
            for (a.unshift(p), h = E(a, n, d, g), i = C(c[0].childNodes, g); l.length;) {
              var r = l.pop(), s = l.pop(), t = l.pop(), u = l.pop(), v = n;
              t !== m && (v = gb(n), O(s, Uc(t), v)), h(function () {
                b(i, u, v, e, r);
              }, u, v, e, r);
            }
            l = null;
          }).error(function (a, b, c, d) {
            throw Error('Failed to load template: ' + d.url);
          }), function (a, c, d, e, f) {
            l ? (l.push(c), l.push(d), l.push(e), l.push(f)) : h(function () {
              b(i, c, d, e, f);
            }, c, d, e, f);
          };
        }
        function J(a, b) {
          return b.priority - a.priority;
        }
        function K(a, b, c, d) {
          if (b)
            throw Error('Multiple directives [' + b.name + ', ' + c.name + '] asking for ' + a + ' on: ' + R(d));
        }
        function L(a, b) {
          var c = h(b, !0);
          c && a.push({
            priority: 0,
            compile: p(function (a, b) {
              var d = b.parent(), e = d.data('$binding') || [];
              e.push(c), A(d.data('$binding', e), 'ng-binding'), a.$watch(c, function (a) {
                b[0].nodeValue = a;
              });
            })
          });
        }
        function N(a, b, d, e) {
          var f = h(d, !0);
          f && b.push({
            priority: 100,
            compile: p(function (a, b, d) {
              var g = d.$$observers || (d.$$observers = {});
              'class' === e && (f = h(d[e], !0)), d[e] = c, (g[e] || (g[e] = [])).$$inter = !0, (d.$$observers && d.$$observers[e].$$scope || a).$watch(f, function (a) {
                d.$set(e, a);
              });
            })
          });
        }
        function O(a, b, c) {
          var d, e, f = b[0], g = f.parentNode;
          if (a)
            for (d = 0, e = a.length; e > d; d++)
              if (a[d] == f) {
                a[d] = c;
                break;
              }
          g && g.replaceChild(c, f), c[Uc.expando] = f[Uc.expando], b[0] = c;
        }
        var P = function (a, b) {
          this.$$element = a, this.$attr = b || {};
        };
        P.prototype = {
          $normalize: Fb,
          $set: function (a, b, d, f) {
            var g, h = sb(this.$$element[0], a), i = this.$$observers;
            h && (this.$$element.prop(a, b), f = h), this[a] = b, f ? this.$attr[a] = f : (f = this.$attr[a], f || (this.$attr[a] = f = Y(a, '-'))), 'A' === Xc(this.$$element[0]) && 'href' === a && (Q.setAttribute('href', b), g = Q.href, g.match(l) || (this[a] = b = 'unsafe:' + g)), d !== !1 && (null === b || b === c ? this.$$element.removeAttr(f) : this.$$element.attr(f, b)), i && e(i[a], function (a) {
              try {
                a(b);
              } catch (c) {
                m(c);
              }
            });
          },
          $observe: function (a, b) {
            var c = this, d = c.$$observers || (c.$$observers = {}), e = d[a] || (d[a] = []);
            return e.push(b), v.$evalAsync(function () {
              e.$$inter || b(c[a]);
            }), b;
          }
        };
        var Q = y[0].createElement('a'), S = h.startSymbol(), T = h.endSymbol(), U = '{{' == S || '}}' == T ? o : function (a) {
            return a.replace(/\{\{/g, S).replace(/}}/g, T);
          };
        return z;
      }
    ];
  }
  function Fb(a) {
    return db(a.replace(td, ''));
  }
  function Gb() {
    var a = {};
    this.register = function (b, c) {
      s(b) ? k(a, b) : a[b] = c;
    }, this.$get = [
      '$injector',
      '$window',
      function (b, c) {
        return function (d, e) {
          if (t(d)) {
            var f = d;
            d = a.hasOwnProperty(f) ? a[f] : $b(e.$scope, f, !0) || $b(c, f, !0), _(d, f, !0);
          }
          return b.instantiate(d, e);
        };
      }
    ];
  }
  function Hb() {
    this.$get = [
      '$window',
      function (a) {
        return Uc(a.document);
      }
    ];
  }
  function Ib() {
    this.$get = [
      '$log',
      function (a) {
        return function () {
          a.error.apply(a, arguments);
        };
      }
    ];
  }
  function Jb() {
    var a = '{{', b = '}}';
    this.startSymbol = function (b) {
      return b ? (a = b, this) : a;
    }, this.endSymbol = function (a) {
      return a ? (b = a, this) : b;
    }, this.$get = [
      '$parse',
      function (d) {
        function e(e, h) {
          for (var i, j, k, l, m = 0, n = [], o = e.length, p = !1, q = []; o > m;)
            -1 != (i = e.indexOf(a, m)) && -1 != (j = e.indexOf(b, i + f)) ? (m != i && n.push(e.substring(m, i)), n.push(k = d(l = e.substring(i + f, j))), k.exp = l, m = j + g, p = !0) : (m != o && n.push(e.substring(m)), m = o);
          return (o = n.length) || (n.push(''), o = 1), !h || p ? (q.length = o, k = function (a) {
            for (var b, d = 0, e = o; e > d; d++)
              'function' == typeof (b = n[d]) && (b = b(a), null == b || b == c ? b = '' : 'string' != typeof b && (b = O(b))), q[d] = b;
            return q.join('');
          }, k.exp = e, k.parts = n, k) : void 0;
        }
        var f = a.length, g = b.length;
        return e.startSymbol = function () {
          return a;
        }, e.endSymbol = function () {
          return b;
        }, e;
      }
    ];
  }
  function Kb(a) {
    for (var b = a.split('/'), c = b.length; c--;)
      b[c] = U(b[c]);
    return b.join('/');
  }
  function Lb(a, b) {
    var c = ud.exec(a);
    return c = {
      protocol: c[1],
      host: c[3],
      port: l(c[5]) || xd[c[1]] || null,
      path: c[6] || '/',
      search: c[8],
      hash: c[10]
    }, b && (b.$$protocol = c.protocol, b.$$host = c.host, b.$$port = c.port), c;
  }
  function Mb(a, b, c) {
    return a + '://' + b + (c == xd[a] ? '' : ':' + c);
  }
  function Nb(a) {
    return a.substr(0, a.lastIndexOf('/'));
  }
  function Ob(a, b, c) {
    var d = Lb(a);
    return decodeURIComponent(d.path) != b || q(d.hash) || 0 !== d.hash.indexOf(c) ? a : Mb(d.protocol, d.host, d.port) + Nb(b) + d.hash.substr(c.length);
  }
  function Pb(a, b, c) {
    var d = Lb(a);
    if (decodeURIComponent(d.path) != b || q(d.hash) || 0 !== d.hash.indexOf(c)) {
      var e = d.search && '?' + d.search || '', f = d.hash && '#' + d.hash || '', g = Nb(b), h = d.path.substr(g.length);
      if (0 !== d.path.indexOf(g))
        throw Error('Invalid url "' + a + '", missing path prefix "' + g + '" !');
      return Mb(d.protocol, d.host, d.port) + b + '#' + c + h + e + f;
    }
    return a;
  }
  function Qb(a, b, c) {
    b = b || '', this.$$parse = function (a) {
      var c = Lb(a, this);
      if (0 !== c.path.indexOf(b))
        throw Error('Invalid url "' + a + '", missing path prefix "' + b + '" !');
      this.$$path = decodeURIComponent(c.path.substr(b.length)), this.$$search = S(c.search), this.$$hash = c.hash && decodeURIComponent(c.hash) || '', this.$$compose();
    }, this.$$compose = function () {
      var a = T(this.$$search), c = this.$$hash ? '#' + U(this.$$hash) : '';
      this.$$url = Kb(this.$$path) + (a ? '?' + a : '') + c, this.$$absUrl = Mb(this.$$protocol, this.$$host, this.$$port) + b + this.$$url;
    }, this.$$rewriteAppUrl = function (a) {
      return 0 == a.indexOf(c) ? a : void 0;
    }, this.$$parse(a);
  }
  function Rb(a, b, c) {
    var d;
    this.$$parse = function (a) {
      var c = Lb(a, this);
      if (c.hash && 0 !== c.hash.indexOf(b))
        throw Error('Invalid url "' + a + '", missing hash prefix "' + b + '" !');
      d = c.path + (c.search ? '?' + c.search : ''), c = wd.exec((c.hash || '').substr(b.length)), this.$$path = c[1] ? ('/' == c[1].charAt(0) ? '' : '/') + decodeURIComponent(c[1]) : '', this.$$search = S(c[3]), this.$$hash = c[5] && decodeURIComponent(c[5]) || '', this.$$compose();
    }, this.$$compose = function () {
      var a = T(this.$$search), c = this.$$hash ? '#' + U(this.$$hash) : '';
      this.$$url = Kb(this.$$path) + (a ? '?' + a : '') + c, this.$$absUrl = Mb(this.$$protocol, this.$$host, this.$$port) + d + (this.$$url ? '#' + b + this.$$url : '');
    }, this.$$rewriteAppUrl = function (a) {
      return 0 == a.indexOf(c) ? a : void 0;
    }, this.$$parse(a);
  }
  function Sb(a, b, c, d) {
    Rb.apply(this, arguments), this.$$rewriteAppUrl = function (a) {
      return 0 == a.indexOf(c) ? c + d + '#' + b + a.substr(c.length) : void 0;
    };
  }
  function Tb(a) {
    return function () {
      return this[a];
    };
  }
  function Ub(a, b) {
    return function (c) {
      return q(c) ? this[a] : (this[a] = b(c), this.$$compose(), this);
    };
  }
  function Vb() {
    var b = '', c = !1;
    this.hashPrefix = function (a) {
      return r(a) ? (b = a, this) : b;
    }, this.html5Mode = function (a) {
      return r(a) ? (c = a, this) : c;
    }, this.$get = [
      '$rootScope',
      '$browser',
      '$sniffer',
      '$rootElement',
      function (d, e, f, g) {
        function h(a) {
          d.$broadcast('$locationChangeSuccess', i.absUrl(), a);
        }
        var i, j, k, l, m = e.url(), n = Lb(m);
        c ? (j = e.baseHref() || '/', k = Nb(j), l = Mb(n.protocol, n.host, n.port) + k + '/', i = f.history ? new Qb(Ob(m, j, b), k, l) : new Sb(Pb(m, j, b), b, l, j.substr(k.length + 1))) : (l = Mb(n.protocol, n.host, n.port) + (n.path || '') + (n.search ? '?' + n.search : '') + '#' + b + '/', i = new Rb(m, b, l)), g.bind('click', function (b) {
          if (!b.ctrlKey && !b.metaKey && 2 != b.which) {
            for (var c = Uc(b.target); 'a' !== Qc(c[0].nodeName);)
              if (c[0] === g[0] || !(c = c.parent())[0])
                return;
            var e = c.prop('href'), f = i.$$rewriteAppUrl(e);
            e && !c.attr('target') && f && (i.$$parse(f), d.$apply(), b.preventDefault(), a.angular['ff-684208-preventDefault'] = !0);
          }
        }), i.absUrl() != m && e.url(i.absUrl(), !0), e.onUrlChange(function (a) {
          if (i.absUrl() != a) {
            if (d.$broadcast('$locationChangeStart', a, i.absUrl()).defaultPrevented)
              return e.url(i.absUrl()), void 0;
            d.$evalAsync(function () {
              var b = i.absUrl();
              i.$$parse(a), h(b);
            }), d.$$phase || d.$digest();
          }
        });
        var o = 0;
        return d.$watch(function () {
          var a = e.url(), b = i.$$replace;
          return o && a == i.absUrl() || (o++, d.$evalAsync(function () {
            d.$broadcast('$locationChangeStart', i.absUrl(), a).defaultPrevented ? i.$$parse(a) : (e.url(i.absUrl(), b), h(a));
          })), i.$$replace = !1, o;
        }), i;
      }
    ];
  }
  function Wb() {
    this.$get = [
      '$window',
      function (a) {
        function b(a) {
          return a instanceof Error && (a.stack ? a = a.message && -1 === a.stack.indexOf(a.message) ? 'Error: ' + a.message + '\n' + a.stack : a.stack : a.sourceURL && (a = a.message + '\n' + a.sourceURL + ':' + a.line)), a;
        }
        function c(c) {
          var d = a.console || {}, f = d[c] || d.log || n;
          return f.apply ? function () {
            var a = [];
            return e(arguments, function (c) {
              a.push(b(c));
            }), f.apply(d, a);
          } : function (a, b) {
            f(a, b);
          };
        }
        return {
          log: c('log'),
          warn: c('warn'),
          info: c('info'),
          error: c('error')
        };
      }
    ];
  }
  function Xb(a, b) {
    function c(a) {
      return -1 != a.indexOf(p);
    }
    function d(a) {
      return -1 != a.indexOf(u);
    }
    function e() {
      return s + 1 < a.length ? a.charAt(s + 1) : !1;
    }
    function f(a) {
      return a >= '0' && '9' >= a;
    }
    function g(a) {
      return ' ' == a || '\r' == a || '\t' == a || '\n' == a || '\x0B' == a || '\xa0' == a;
    }
    function h(a) {
      return a >= 'a' && 'z' >= a || a >= 'A' && 'Z' >= a || '_' == a || '$' == a;
    }
    function i(a) {
      return '-' == a || '+' == a || f(a);
    }
    function j(b, c, d) {
      throw d = d || s, Error('Lexer Error: ' + b + ' at column' + (r(c) ? 's ' + c + '-' + s + ' [' + a.substring(c, d) + ']' : ' ' + d) + ' in expression [' + a + '].');
    }
    function l() {
      for (var b = '', c = s; s < a.length;) {
        var d = Qc(a.charAt(s));
        if ('.' == d || f(d))
          b += d;
        else {
          var g = e();
          if ('e' == d && i(g))
            b += d;
          else if (i(d) && g && f(g) && 'e' == b.charAt(b.length - 1))
            b += d;
          else {
            if (!i(d) || g && f(g) || 'e' != b.charAt(b.length - 1))
              break;
            j('Invalid exponent');
          }
        }
        s++;
      }
      b = 1 * b, q.push({
        index: c,
        text: b,
        json: !0,
        fn: function () {
          return b;
        }
      });
    }
    function m() {
      for (var c, d, e, i, j = '', l = s; s < a.length && (i = a.charAt(s), '.' == i || h(i) || f(i));)
        '.' == i && (c = s), j += i, s++;
      if (c)
        for (d = s; d < a.length;) {
          if (i = a.charAt(d), '(' == i) {
            e = j.substr(c - l + 1), j = j.substr(0, c - l), s = d;
            break;
          }
          if (!g(i))
            break;
          d++;
        }
      var m = {
          index: l,
          text: j
        };
      if (yd.hasOwnProperty(j))
        m.fn = m.json = yd[j];
      else {
        var n = ac(j, b);
        m.fn = k(function (a, b) {
          return n(a, b);
        }, {
          assign: function (a, b) {
            return Zb(a, j, b);
          }
        });
      }
      q.push(m), e && (q.push({
        index: c,
        text: '.',
        json: !1
      }), q.push({
        index: c + 1,
        text: e,
        json: !1
      }));
    }
    function n(b) {
      var c = s;
      s++;
      for (var d = '', e = b, f = !1; s < a.length;) {
        var g = a.charAt(s);
        if (e += g, f) {
          if ('u' == g) {
            var h = a.substring(s + 1, s + 5);
            h.match(/[\da-f]{4}/i) || j('Invalid unicode escape [\\u' + h + ']'), s += 4, d += String.fromCharCode(parseInt(h, 16));
          } else {
            var i = zd[g];
            d += i ? i : g;
          }
          f = !1;
        } else if ('\\' == g)
          f = !0;
        else {
          if (g == b)
            return s++, q.push({
              index: c,
              text: e,
              string: d,
              json: !0,
              fn: function () {
                return d;
              }
            }), void 0;
          d += g;
        }
        s++;
      }
      j('Unterminated quote', c);
    }
    for (var o, p, q = [], s = 0, t = [], u = ':'; s < a.length;) {
      if (p = a.charAt(s), c('"\''))
        n(p);
      else if (f(p) || c('.') && f(e()))
        l();
      else if (h(p))
        m(), d('{,') && '{' == t[0] && (o = q[q.length - 1]) && (o.json = -1 == o.text.indexOf('.'));
      else if (c('(){}[].,;:'))
        q.push({
          index: s,
          text: p,
          json: d(':[,') && c('{[') || c('}]:,')
        }), c('{[') && t.unshift(p), c('}]') && t.shift(), s++;
      else {
        if (g(p)) {
          s++;
          continue;
        }
        var v = p + e(), w = yd[p], x = yd[v];
        x ? (q.push({
          index: s,
          text: v,
          fn: x
        }), s += 2) : w ? (q.push({
          index: s,
          text: p,
          fn: w,
          json: d('[,:') && c('+-')
        }), s += 1) : j('Unexpected next character ', s, s + 1);
      }
      u = p;
    }
    return q;
  }
  function Yb(a, b, d, e) {
    function f(b, c) {
      throw Error('Syntax Error: Token \'' + c.text + '\' ' + b + ' at column ' + (c.index + 1) + ' of the expression [' + a + '] starting at [' + a.substring(c.index) + '].');
    }
    function g() {
      if (0 === J.length)
        throw Error('Unexpected end of expression: ' + a);
      return J[0];
    }
    function h(a, b, c, d) {
      if (J.length > 0) {
        var e = J[0], f = e.text;
        if (f == a || f == b || f == c || f == d || !a && !b && !c && !d)
          return e;
      }
      return !1;
    }
    function i(a, c, d, e) {
      var g = h(a, c, d, e);
      return g ? (b && !g.json && f('is not valid json', g), J.shift(), g) : !1;
    }
    function j(a) {
      i(a) || f('is unexpected, expecting [' + a + ']', h());
    }
    function l(a, b) {
      return function (c, d) {
        return a(c, d, b);
      };
    }
    function m(a, b, c) {
      return function (d, e) {
        return b(d, e, a, c);
      };
    }
    function o() {
      for (var a = [];;)
        if (J.length > 0 && !h('}', ')', ';', ']') && a.push(O()), !i(';'))
          return 1 == a.length ? a[0] : function (b, c) {
            for (var d, e = 0; e < a.length; e++) {
              var f = a[e];
              f && (d = f(b, c));
            }
            return d;
          };
    }
    function q() {
      for (var a, b = s();;) {
        if (!(a = i('|')))
          return b;
        b = m(b, a.fn, r());
      }
    }
    function r() {
      for (var a = i(), b = d(a.text), c = [];;) {
        if (!(a = i(':'))) {
          var e = function (a, d, e) {
            for (var f = [e], g = 0; g < c.length; g++)
              f.push(c[g](a, d));
            return b.apply(a, f);
          };
          return function () {
            return e;
          };
        }
        c.push(s());
      }
    }
    function s() {
      return K();
    }
    function t() {
      var b, c, d = u();
      return (c = i('=')) ? (d.assign || f('implies assignment but [' + a.substring(0, c.index) + '] can not be assigned to', c), b = u(), function (a, c) {
        return d.assign(a, b(a, c), c);
      }) : d;
    }
    function u() {
      for (var a, b = v();;) {
        if (!(a = i('||')))
          return b;
        b = m(b, a.fn, v());
      }
    }
    function v() {
      var a, b = w();
      return (a = i('&&')) && (b = m(b, a.fn, v())), b;
    }
    function w() {
      var a, b = x();
      return (a = i('==', '!=')) && (b = m(b, a.fn, w())), b;
    }
    function x() {
      var a, b = y();
      return (a = i('<', '>', '<=', '>=')) && (b = m(b, a.fn, x())), b;
    }
    function y() {
      for (var a, b = z(); a = i('+', '-');)
        b = m(b, a.fn, z());
      return b;
    }
    function z() {
      for (var a, b = A(); a = i('*', '/', '%');)
        b = m(b, a.fn, A());
      return b;
    }
    function A() {
      var a;
      return i('+') ? B() : (a = i('-')) ? m(I, a.fn, A()) : (a = i('!')) ? l(a.fn, A()) : B();
    }
    function B() {
      var a;
      if (i('('))
        a = O(), j(')');
      else if (i('['))
        a = F();
      else if (i('{'))
        a = G();
      else {
        var b = i();
        a = b.fn, a || f('not a primary expression', b);
      }
      for (var c, d; c = i('(', '[', '.');)
        '(' === c.text ? (a = L(a, d), d = null) : '[' === c.text ? (d = a, a = N(a)) : '.' === c.text ? (d = a, a = M(a)) : f('IMPOSSIBLE');
      return a;
    }
    function C(a) {
      var b = i().text, c = ac(b, e);
      return k(function (b, d, e) {
        return c(e || a(b, d), d);
      }, {
        assign: function (c, d, e) {
          return Zb(a(c, e), b, d);
        }
      });
    }
    function D(a) {
      var b = s();
      return j(']'), k(function (d, e) {
        var f, g, h = a(d, e), i = b(d, e);
        return h ? (f = h[i], f && f.then && (g = f, '$$v' in f || (g.$$v = c, g.then(function (a) {
          g.$$v = a;
        })), f = f.$$v), f) : c;
      }, {
        assign: function (c, d, e) {
          return a(c, e)[b(c, e)] = d;
        }
      });
    }
    function E(a, b) {
      var c = [];
      if (')' != g().text)
        do
          c.push(s());
        while (i(','));
      return j(')'), function (d, e) {
        for (var f = [], g = b ? b(d, e) : d, h = 0; h < c.length; h++)
          f.push(c[h](d, e));
        var i = a(d, e, g) || n;
        return i.apply ? i.apply(g, f) : i(f[0], f[1], f[2], f[3], f[4]);
      };
    }
    function F() {
      var a = [];
      if (']' != g().text)
        do
          a.push(s());
        while (i(','));
      return j(']'), function (b, c) {
        for (var d = [], e = 0; e < a.length; e++)
          d.push(a[e](b, c));
        return d;
      };
    }
    function G() {
      var a = [];
      if ('}' != g().text)
        do {
          var b = i(), c = b.string || b.text;
          j(':');
          var d = s();
          a.push({
            key: c,
            value: d
          });
        } while (i(','));
      return j('}'), function (b, c) {
        for (var d = {}, e = 0; e < a.length; e++) {
          var f = a[e];
          d[f.key] = f.value(b, c);
        }
        return d;
      };
    }
    var H, I = p(0), J = Xb(a, e), K = t, L = E, M = C, N = D, O = q;
    return b ? (K = u, L = M = N = O = function () {
      f('is not valid json', {
        text: a,
        index: 0
      });
    }, H = B()) : H = o(), 0 !== J.length && f('is an unexpected token', J[0]), H;
  }
  function Zb(a, b, c) {
    for (var d = b.split('.'), e = 0; d.length > 1; e++) {
      var f = d.shift(), g = a[f];
      g || (g = {}, a[f] = g), a = g;
    }
    return a[d.shift()] = c, c;
  }
  function $b(a, b, c) {
    if (!b)
      return a;
    for (var d, e = b.split('.'), f = a, g = e.length, h = 0; g > h; h++)
      d = e[h], a && (a = (f = a)[d]);
    return !c && x(a) ? M(f, a) : a;
  }
  function _b(a, b, d, e, f) {
    return function (g, h) {
      var i, j = h && h.hasOwnProperty(a) ? h : g;
      return null === j || j === c ? j : (j = j[a], j && j.then && ('$$v' in j || (i = j, i.$$v = c, i.then(function (a) {
        i.$$v = a;
      })), j = j.$$v), b && null !== j && j !== c ? (j = j[b], j && j.then && ('$$v' in j || (i = j, i.$$v = c, i.then(function (a) {
        i.$$v = a;
      })), j = j.$$v), d && null !== j && j !== c ? (j = j[d], j && j.then && ('$$v' in j || (i = j, i.$$v = c, i.then(function (a) {
        i.$$v = a;
      })), j = j.$$v), e && null !== j && j !== c ? (j = j[e], j && j.then && ('$$v' in j || (i = j, i.$$v = c, i.then(function (a) {
        i.$$v = a;
      })), j = j.$$v), f && null !== j && j !== c ? (j = j[f], j && j.then && ('$$v' in j || (i = j, i.$$v = c, i.then(function (a) {
        i.$$v = a;
      })), j = j.$$v), j) : j) : j) : j) : j);
    };
  }
  function ac(a, b) {
    if (Ad.hasOwnProperty(a))
      return Ad[a];
    var d, f = a.split('.'), g = f.length;
    if (b)
      d = 6 > g ? _b(f[0], f[1], f[2], f[3], f[4]) : function (a, b) {
        var d, e = 0;
        do
          d = _b(f[e++], f[e++], f[e++], f[e++], f[e++])(a, b), b = c, a = d;
        while (g > e);
        return d;
      };
    else {
      var h = 'var l, fn, p;\n';
      e(f, function (a, b) {
        h += 'if(s === null || s === undefined) return s;\nl=s;\ns=' + (b ? 's' : '((k&&k.hasOwnProperty("' + a + '"))?k:s)') + '["' + a + '"]' + ';\n' + 'if (s && s.then) {\n' + ' if (!("$$v" in s)) {\n' + ' p=s;\n' + ' p.$$v = undefined;\n' + ' p.then(function(v) {p.$$v=v;});\n' + '}\n' + ' s=s.$$v\n' + '}\n';
      }), h += 'return s;', d = Function('s', 'k', h), d.toString = function () {
        return h;
      };
    }
    return Ad[a] = d;
  }
  function bc() {
    var a = {};
    this.$get = [
      '$filter',
      '$sniffer',
      function (b, c) {
        return function (d) {
          switch (typeof d) {
          case 'string':
            return a.hasOwnProperty(d) ? a[d] : a[d] = Yb(d, !1, b, c.csp);
          case 'function':
            return d;
          default:
            return n;
          }
        };
      }
    ];
  }
  function cc() {
    this.$get = [
      '$rootScope',
      '$exceptionHandler',
      function (a, b) {
        return dc(function (b) {
          a.$evalAsync(b);
        }, b);
      }
    ];
  }
  function dc(a, b) {
    function d(a) {
      return a;
    }
    function f(a) {
      return j(a);
    }
    function g(a) {
      var b = h(), c = a.length, d = [];
      return c ? e(a, function (a, e) {
        i(a).then(function (a) {
          e in d || (d[e] = a, --c || b.resolve(d));
        }, function (a) {
          e in d || b.reject(a);
        });
      }) : b.resolve(d), b.promise;
    }
    var h = function () {
        var e, g, k = [];
        return g = {
          resolve: function (b) {
            if (k) {
              var d = k;
              k = c, e = i(b), d.length && a(function () {
                for (var a, b = 0, c = d.length; c > b; b++)
                  a = d[b], e.then(a[0], a[1]);
              });
            }
          },
          reject: function (a) {
            g.resolve(j(a));
          },
          promise: {
            then: function (a, c) {
              var g = h(), i = function (c) {
                  try {
                    g.resolve((a || d)(c));
                  } catch (e) {
                    b(e), g.reject(e);
                  }
                }, j = function (a) {
                  try {
                    g.resolve((c || f)(a));
                  } catch (d) {
                    b(d), g.reject(d);
                  }
                };
              return k ? k.push([
                i,
                j
              ]) : e.then(i, j), g.promise;
            }
          }
        };
      }, i = function (b) {
        return b && b.then ? b : {
          then: function (c) {
            var d = h();
            return a(function () {
              d.resolve(c(b));
            }), d.promise;
          }
        };
      }, j = function (b) {
        return {
          then: function (c, d) {
            var e = h();
            return a(function () {
              e.resolve((d || f)(b));
            }), e.promise;
          }
        };
      }, k = function (c, e, g) {
        var k, l = h(), m = function (a) {
            try {
              return (e || d)(a);
            } catch (c) {
              return b(c), j(c);
            }
          }, n = function (a) {
            try {
              return (g || f)(a);
            } catch (c) {
              return b(c), j(c);
            }
          };
        return a(function () {
          i(c).then(function (a) {
            k || (k = !0, l.resolve(i(a).then(m, n)));
          }, function (a) {
            k || (k = !0, l.resolve(n(a)));
          });
        }), l.promise;
      };
    return {
      defer: h,
      reject: j,
      when: k,
      all: g
    };
  }
  function ec() {
    var a = {};
    this.when = function (b, c) {
      if (a[b] = k({ reloadOnSearch: !0 }, c), b) {
        var d = '/' == b[b.length - 1] ? b.substr(0, b.length - 1) : b + '/';
        a[d] = { redirectTo: b };
      }
      return this;
    }, this.otherwise = function (a) {
      return this.when(null, a), this;
    }, this.$get = [
      '$rootScope',
      '$location',
      '$routeParams',
      '$q',
      '$injector',
      '$http',
      '$templateCache',
      function (b, c, d, f, g, h, i) {
        function j(a, b) {
          b = '^' + b.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&') + '$';
          for (var c, d = '', f = [], g = {}, h = /:(\w+)/g, i = 0; null !== (c = h.exec(b));)
            d += b.slice(i, c.index), d += '([^\\/]*)', f.push(c[1]), i = h.lastIndex;
          d += b.substr(i);
          var j = a.match(new RegExp(d));
          return j && e(f, function (a, b) {
            g[a] = j[b + 1];
          }), j ? g : null;
        }
        function l() {
          var a = n(), j = q.current;
          a && j && a.$$route === j.$$route && J(a.pathParams, j.pathParams) && !a.reloadOnSearch && !p ? (j.params = a.params, H(j.params, d), b.$broadcast('$routeUpdate', j)) : (a || j) && (p = !1, b.$broadcast('$routeChangeStart', a, j), q.current = a, a && a.redirectTo && (t(a.redirectTo) ? c.path(o(a.redirectTo, a.params)).search(a.params).replace() : c.url(a.redirectTo(a.pathParams, c.path(), c.search())).replace()), f.when(a).then(function () {
            if (a) {
              var b, c = [], d = [];
              return e(a.resolve || {}, function (a, b) {
                c.push(b), d.push(t(a) ? g.get(a) : g.invoke(a));
              }), r(b = a.template) || r(b = a.templateUrl) && (b = h.get(b, { cache: i }).then(function (a) {
                return a.data;
              })), r(b) && (c.push('$template'), d.push(b)), f.all(d).then(function (a) {
                var b = {};
                return e(a, function (a, d) {
                  b[c[d]] = a;
                }), b;
              });
            }
          }).then(function (c) {
            a == q.current && (a && (a.locals = c, H(a.params, d)), b.$broadcast('$routeChangeSuccess', a, j));
          }, function (c) {
            a == q.current && b.$broadcast('$routeChangeError', a, j, c);
          }));
        }
        function n() {
          var b, d;
          return e(a, function (a, e) {
            !d && (b = j(c.path(), e)) && (d = m(a, {
              params: k({}, c.search(), b),
              pathParams: b
            }), d.$$route = a);
          }), d || a[null] && m(a[null], {
            params: {},
            pathParams: {}
          });
        }
        function o(a, b) {
          var c = [];
          return e((a || '').split(':'), function (a, d) {
            if (0 == d)
              c.push(a);
            else {
              var e = a.match(/(\w+)(.*)/), f = e[1];
              c.push(b[f]), c.push(e[2] || ''), delete b[f];
            }
          }), c.join('');
        }
        var p = !1, q = {
            routes: a,
            reload: function () {
              p = !0, b.$evalAsync(l);
            }
          };
        return b.$on('$locationChangeSuccess', l), q;
      }
    ];
  }
  function fc() {
    this.$get = p({});
  }
  function gc() {
    var a = 10;
    this.digestTtl = function (b) {
      return arguments.length && (a = b), a;
    }, this.$get = [
      '$injector',
      '$exceptionHandler',
      '$parse',
      function (b, c, d) {
        function e() {
          this.$id = i(), this.$$phase = this.$parent = this.$$watchers = this.$$nextSibling = this.$$prevSibling = this.$$childHead = this.$$childTail = null, this['this'] = this.$root = this, this.$$destroyed = !1, this.$$asyncQueue = [], this.$$listeners = {}, this.$$isolateBindings = {};
        }
        function f(a) {
          if (k.$$phase)
            throw Error(k.$$phase + ' already in progress');
          k.$$phase = a;
        }
        function g() {
          k.$$phase = null;
        }
        function h(a, b) {
          var c = d(a);
          return _(c, b), c;
        }
        function j() {
        }
        e.prototype = {
          $new: function (a) {
            var b, c;
            if (x(a))
              throw Error('API-CHANGE: Use $controller to instantiate controllers.');
            return a ? (c = new e(), c.$root = this.$root) : (b = function () {
            }, b.prototype = this, c = new b(), c.$id = i()), c['this'] = c, c.$$listeners = {}, c.$parent = this, c.$$asyncQueue = [], c.$$watchers = c.$$nextSibling = c.$$childHead = c.$$childTail = null, c.$$prevSibling = this.$$childTail, this.$$childHead ? (this.$$childTail.$$nextSibling = c, this.$$childTail = c) : this.$$childHead = this.$$childTail = c, c;
          },
          $watch: function (a, b, c) {
            var d = this, e = h(a, 'watch'), f = d.$$watchers, g = {
                fn: b,
                last: j,
                get: e,
                exp: a,
                eq: !!c
              };
            if (!x(b)) {
              var i = h(b || n, 'listener');
              g.fn = function (a, b, c) {
                i(c);
              };
            }
            return f || (f = d.$$watchers = []), f.unshift(g), function () {
              G(f, g);
            };
          },
          $digest: function () {
            var b, d, e, h, i, k, l, m, n, o, p, q = a, r = this, s = [];
            f('$digest');
            do {
              l = !1, n = r;
              do {
                for (i = n.$$asyncQueue; i.length;)
                  try {
                    n.$eval(i.shift());
                  } catch (t) {
                    c(t);
                  }
                if (h = n.$$watchers)
                  for (k = h.length; k--;)
                    try {
                      b = h[k], (d = b.get(n)) === (e = b.last) || (b.eq ? J(d, e) : 'number' == typeof d && 'number' == typeof e && isNaN(d) && isNaN(e)) || (l = !0, b.last = b.eq ? H(d) : d, b.fn(d, e === j ? d : e, n), 5 > q && (o = 4 - q, s[o] || (s[o] = []), p = x(b.exp) ? 'fn: ' + (b.exp.name || b.exp.toString()) : b.exp, p += '; newVal: ' + O(d) + '; oldVal: ' + O(e), s[o].push(p)));
                    } catch (t) {
                      c(t);
                    }
                if (!(m = n.$$childHead || n !== r && n.$$nextSibling))
                  for (; n !== r && !(m = n.$$nextSibling);)
                    n = n.$parent;
              } while (n = m);
              if (l && !q--)
                throw g(), Error(a + ' $digest() iterations reached. Aborting!\n' + 'Watchers fired in the last 5 iterations: ' + O(s));
            } while (l || i.length);
            g();
          },
          $destroy: function () {
            if (k != this && !this.$$destroyed) {
              var a = this.$parent;
              this.$broadcast('$destroy'), this.$$destroyed = !0, a.$$childHead == this && (a.$$childHead = this.$$nextSibling), a.$$childTail == this && (a.$$childTail = this.$$prevSibling), this.$$prevSibling && (this.$$prevSibling.$$nextSibling = this.$$nextSibling), this.$$nextSibling && (this.$$nextSibling.$$prevSibling = this.$$prevSibling), this.$parent = this.$$nextSibling = this.$$prevSibling = this.$$childHead = this.$$childTail = null;
            }
          },
          $eval: function (a, b) {
            return d(a)(this, b);
          },
          $evalAsync: function (a) {
            this.$$asyncQueue.push(a);
          },
          $apply: function (a) {
            try {
              return f('$apply'), this.$eval(a);
            } catch (b) {
              c(b);
            } finally {
              g();
              try {
                k.$digest();
              } catch (b) {
                throw c(b), b;
              }
            }
          },
          $on: function (a, b) {
            var c = this.$$listeners[a];
            return c || (this.$$listeners[a] = c = []), c.push(b), function () {
              c[F(c, b)] = null;
            };
          },
          $emit: function (a) {
            var b, d, e, f = [], g = this, h = !1, i = {
                name: a,
                targetScope: g,
                stopPropagation: function () {
                  h = !0;
                },
                preventDefault: function () {
                  i.defaultPrevented = !0;
                },
                defaultPrevented: !1
              }, j = K([i], arguments, 1);
            do {
              for (b = g.$$listeners[a] || f, i.currentScope = g, d = 0, e = b.length; e > d; d++)
                if (b[d])
                  try {
                    if (b[d].apply(null, j), h)
                      return i;
                  } catch (k) {
                    c(k);
                  }
                else
                  b.splice(d, 1), d--, e--;
              g = g.$parent;
            } while (g);
            return i;
          },
          $broadcast: function (a) {
            var b, d, e, f = this, g = f, h = f, i = {
                name: a,
                targetScope: f,
                preventDefault: function () {
                  i.defaultPrevented = !0;
                },
                defaultPrevented: !1
              }, j = K([i], arguments, 1);
            do {
              for (g = h, i.currentScope = g, b = g.$$listeners[a] || [], d = 0, e = b.length; e > d; d++)
                if (b[d])
                  try {
                    b[d].apply(null, j);
                  } catch (k) {
                    c(k);
                  }
                else
                  b.splice(d, 1), d--, e--;
              if (!(h = g.$$childHead || g !== f && g.$$nextSibling))
                for (; g !== f && !(h = g.$$nextSibling);)
                  g = g.$parent;
            } while (g = h);
            return i;
          }
        };
        var k = new e();
        return k;
      }
    ];
  }
  function hc() {
    this.$get = [
      '$window',
      function (a) {
        var b = {}, c = l((/android (\d+)/.exec(Qc(a.navigator.userAgent)) || [])[1]);
        return {
          history: !(!a.history || !a.history.pushState || 4 > c),
          hashchange: 'onhashchange' in a && (!a.document.documentMode || a.document.documentMode > 7),
          hasEvent: function (c) {
            if ('input' == c && 9 == Yc)
              return !1;
            if (q(b[c])) {
              var d = a.document.createElement('div');
              b[c] = 'on' + c in d;
            }
            return b[c];
          },
          csp: !1
        };
      }
    ];
  }
  function ic() {
    this.$get = p(a);
  }
  function jc(a) {
    var b, c, d, f = {};
    return a ? (e(a.split('\n'), function (a) {
      d = a.indexOf(':'), b = Qc(B(a.substr(0, d))), c = B(a.substr(d + 1)), b && (f[b] ? f[b] += ', ' + c : f[b] = c);
    }), f) : f;
  }
  function kc(a) {
    var b = s(a) ? a : c;
    return function (c) {
      return b || (b = jc(a)), c ? b[Qc(c)] || null : b;
    };
  }
  function lc(a, b, c) {
    return x(c) ? c(a, b) : (e(c, function (c) {
      a = c(a, b);
    }), a);
  }
  function mc(a) {
    return a >= 200 && 300 > a;
  }
  function nc() {
    var a = /^\s*(\[|\{[^\{])/, b = /[\}\]]\s*$/, d = /^\)\]\}',?\n/, f = this.defaults = {
        transformResponse: [function (c) {
            return t(c) && (c = c.replace(d, ''), a.test(c) && b.test(c) && (c = P(c, !0))), c;
          }],
        transformRequest: [function (a) {
            return s(a) && !A(a) ? O(a) : a;
          }],
        headers: {
          common: {
            Accept: 'application/json, text/plain, */*',
            'X-Requested-With': 'XMLHttpRequest'
          },
          post: { 'Content-Type': 'application/json;charset=utf-8' },
          put: { 'Content-Type': 'application/json;charset=utf-8' }
        }
      }, h = this.responseInterceptors = [];
    this.$get = [
      '$httpBackend',
      '$browser',
      '$cacheFactory',
      '$rootScope',
      '$q',
      '$injector',
      function (a, b, d, i, j, l) {
        function m(a) {
          function c(a) {
            var b = k({}, a, { data: lc(a.data, a.headers, h) });
            return mc(a.status) ? b : j.reject(b);
          }
          a.method = Rc(a.method);
          var d, g = a.transformRequest || f.transformRequest, h = a.transformResponse || f.transformResponse, i = f.headers, l = k({ 'X-XSRF-TOKEN': b.cookies()['XSRF-TOKEN'] }, i.common, i[Qc(a.method)], a.headers), m = lc(a.data, kc(l), g);
          return q(a.data) && delete l['Content-Type'], d = p(a, m, l), d = d.then(c, c), e(v, function (a) {
            d = a(d);
          }), d.success = function (b) {
            return d.then(function (c) {
              b(c.data, c.status, c.headers, a);
            }), d;
          }, d.error = function (b) {
            return d.then(null, function (c) {
              b(c.data, c.status, c.headers, a);
            }), d;
          }, d;
        }
        function n() {
          e(arguments, function (a) {
            m[a] = function (b, c) {
              return m(k(c || {}, {
                method: a,
                url: b
              }));
            };
          });
        }
        function o() {
          e(arguments, function (a) {
            m[a] = function (b, c, d) {
              return m(k(d || {}, {
                method: a,
                url: b,
                data: c
              }));
            };
          });
        }
        function p(b, c, d) {
          function e(a, b, c) {
            h && (mc(a) ? h.put(o, [
              a,
              b,
              jc(c)
            ]) : h.remove(o)), f(b, a, c), i.$apply();
          }
          function f(a, c, d) {
            c = Math.max(c, 0), (mc(c) ? l.resolve : l.reject)({
              data: a,
              status: c,
              headers: kc(d),
              config: b
            });
          }
          function g() {
            var a = F(m.pendingRequests, b);
            -1 !== a && m.pendingRequests.splice(a, 1);
          }
          var h, k, l = j.defer(), n = l.promise, o = r(b.url, b.params);
          if (m.pendingRequests.push(b), n.then(g, g), b.cache && 'GET' == b.method && (h = s(b.cache) ? b.cache : u), h)
            if (k = h.get(o)) {
              if (k.then)
                return k.then(g, g), k;
              w(k) ? f(k[1], k[0], H(k[2])) : f(k, 200, {});
            } else
              h.put(o, n);
          return k || a(b.method, o, c, e, d, b.timeout, b.withCredentials), n;
        }
        function r(a, b) {
          if (!b)
            return a;
          var d = [];
          return g(b, function (a, b) {
            null != a && a != c && (s(a) && (a = O(a)), d.push(encodeURIComponent(b) + '=' + encodeURIComponent(a)));
          }), a + (-1 == a.indexOf('?') ? '?' : '&') + d.join('&');
        }
        var u = d('$http'), v = [];
        return e(h, function (a) {
          v.push(t(a) ? l.get(a) : l.invoke(a));
        }), m.pendingRequests = [], n('get', 'delete', 'head', 'jsonp'), o('post', 'put'), m.defaults = f, m;
      }
    ];
  }
  function oc() {
    this.$get = [
      '$browser',
      '$window',
      '$document',
      function (a, b, c) {
        return pc(a, Bd, a.defer, b.angular.callbacks, c[0], b.location.protocol.replace(':', ''));
      }
    ];
  }
  function pc(a, b, c, d, f, g) {
    function h(a, b) {
      var c = f.createElement('script'), d = function () {
          f.body.removeChild(c), b && b();
        };
      c.type = 'text/javascript', c.src = a, Yc ? c.onreadystatechange = function () {
        /loaded|complete/.test(c.readyState) && d();
      } : c.onload = c.onerror = d, f.body.appendChild(c);
    }
    return function (f, i, j, k, l, m, o) {
      function p(b, c, d, e) {
        var f = (i.match(ud) || [
            '',
            g
          ])[1];
        c = 'file' == f ? d ? 200 : 404 : c, c = 1223 == c ? 204 : c, b(c, d, e), a.$$completeOutstandingRequest(n);
      }
      if (a.$$incOutstandingRequestCount(), i = i || a.url(), 'jsonp' == Qc(f)) {
        var q = '_' + (d.counter++).toString(36);
        d[q] = function (a) {
          d[q].data = a;
        }, h(i.replace('JSON_CALLBACK', 'angular.callbacks.' + q), function () {
          d[q].data ? p(k, 200, d[q].data) : p(k, -2), delete d[q];
        });
      } else {
        var r = new b();
        r.open(f, i, !0), e(l, function (a, b) {
          a && r.setRequestHeader(b, a);
        });
        var s;
        r.onreadystatechange = function () {
          if (4 == r.readyState) {
            var a = r.getAllResponseHeaders(), b = [
                'Cache-Control',
                'Content-Language',
                'Content-Type',
                'Expires',
                'Last-Modified',
                'Pragma'
              ];
            a || (a = '', e(b, function (b) {
              var c = r.getResponseHeader(b);
              c && (a += b + ': ' + c + '\n');
            })), p(k, s || r.status, r.responseText, a);
          }
        }, o && (r.withCredentials = !0), r.send(j || ''), m > 0 && c(function () {
          s = -1, r.abort();
        }, m);
      }
    };
  }
  function qc() {
    this.$get = function () {
      return {
        id: 'en-us',
        NUMBER_FORMATS: {
          DECIMAL_SEP: '.',
          GROUP_SEP: ',',
          PATTERNS: [
            {
              minInt: 1,
              minFrac: 0,
              maxFrac: 3,
              posPre: '',
              posSuf: '',
              negPre: '-',
              negSuf: '',
              gSize: 3,
              lgSize: 3
            },
            {
              minInt: 1,
              minFrac: 2,
              maxFrac: 2,
              posPre: '\xa4',
              posSuf: '',
              negPre: '(\xa4',
              negSuf: ')',
              gSize: 3,
              lgSize: 3
            }
          ],
          CURRENCY_SYM: '$'
        },
        DATETIME_FORMATS: {
          MONTH: 'January,February,March,April,May,June,July,August,September,October,November,December'.split(','),
          SHORTMONTH: 'Jan,Feb,Mar,Apr,May,Jun,Jul,Aug,Sep,Oct,Nov,Dec'.split(','),
          DAY: 'Sunday,Monday,Tuesday,Wednesday,Thursday,Friday,Saturday'.split(','),
          SHORTDAY: 'Sun,Mon,Tue,Wed,Thu,Fri,Sat'.split(','),
          AMPMS: [
            'AM',
            'PM'
          ],
          medium: 'MMM d, y h:mm:ss a',
          'short': 'M/d/yy h:mm a',
          fullDate: 'EEEE, MMMM d, y',
          longDate: 'MMMM d, y',
          mediumDate: 'MMM d, y',
          shortDate: 'M/d/yy',
          mediumTime: 'h:mm:ss a',
          shortTime: 'h:mm a'
        },
        pluralCat: function (a) {
          return 1 === a ? 'one' : 'other';
        }
      };
    };
  }
  function rc() {
    this.$get = [
      '$rootScope',
      '$browser',
      '$q',
      '$exceptionHandler',
      function (a, b, c, d) {
        function e(e, g, h) {
          var i, j, k = c.defer(), l = k.promise, m = r(h) && !h;
          return i = b.defer(function () {
            try {
              k.resolve(e());
            } catch (b) {
              k.reject(b), d(b);
            }
            m || a.$apply();
          }, g), j = function () {
            delete f[l.$$timeoutId];
          }, l.$$timeoutId = i, f[i] = k, l.then(j, j), l;
        }
        var f = {};
        return e.cancel = function (a) {
          return a && a.$$timeoutId in f ? (f[a.$$timeoutId].reject('canceled'), b.defer.cancel(a.$$timeoutId)) : !1;
        }, e;
      }
    ];
  }
  function sc(a) {
    function b(b, d) {
      return a.factory(b + c, d);
    }
    var c = 'Filter';
    this.register = b, this.$get = [
      '$injector',
      function (a) {
        return function (b) {
          return a.get(b + c);
        };
      }
    ], b('currency', uc), b('date', Cc), b('filter', tc), b('json', Dc), b('limitTo', Ec), b('lowercase', Gd), b('number', vc), b('orderBy', Fc), b('uppercase', Hd);
  }
  function tc() {
    return function (a, b) {
      if (!w(a))
        return a;
      var c = [];
      c.check = function (a) {
        for (var b = 0; b < c.length; b++)
          if (!c[b](a))
            return !1;
        return !0;
      };
      var d = function (a, b) {
        if ('!' === b.charAt(0))
          return !d(a, b.substr(1));
        switch (typeof a) {
        case 'boolean':
        case 'number':
        case 'string':
          return ('' + a).toLowerCase().indexOf(b) > -1;
        case 'object':
          for (var c in a)
            if ('$' !== c.charAt(0) && d(a[c], b))
              return !0;
          return !1;
        case 'array':
          for (var e = 0; e < a.length; e++)
            if (d(a[e], b))
              return !0;
          return !1;
        default:
          return !1;
        }
      };
      switch (typeof b) {
      case 'boolean':
      case 'number':
      case 'string':
        b = { $: b };
      case 'object':
        for (var e in b)
          '$' == e ? function () {
            var a = ('' + b[e]).toLowerCase();
            a && c.push(function (b) {
              return d(b, a);
            });
          }() : function () {
            var a = e, f = ('' + b[e]).toLowerCase();
            f && c.push(function (b) {
              return d($b(b, a), f);
            });
          }();
        break;
      case 'function':
        c.push(b);
        break;
      default:
        return a;
      }
      for (var f = [], g = 0; g < a.length; g++) {
        var h = a[g];
        c.check(h) && f.push(h);
      }
      return f;
    };
  }
  function uc(a) {
    var b = a.NUMBER_FORMATS;
    return function (a, c) {
      return q(c) && (c = b.CURRENCY_SYM), wc(a, b.PATTERNS[1], b.GROUP_SEP, b.DECIMAL_SEP, 2).replace(/\u00A4/g, c);
    };
  }
  function vc(a) {
    var b = a.NUMBER_FORMATS;
    return function (a, c) {
      return wc(a, b.PATTERNS[0], b.GROUP_SEP, b.DECIMAL_SEP, c);
    };
  }
  function wc(a, b, c, d, e) {
    if (isNaN(a) || !isFinite(a))
      return '';
    var f = 0 > a;
    a = Math.abs(a);
    var g = a + '', h = '', i = [], j = !1;
    if (-1 !== g.indexOf('e')) {
      var k = g.match(/([\d\.]+)e(-?)(\d+)/);
      k && '-' == k[2] && k[3] > e + 1 ? g = '0' : (h = g, j = !0);
    }
    if (!j) {
      var l = (g.split(Cd)[1] || '').length;
      q(e) && (e = Math.min(Math.max(b.minFrac, l), b.maxFrac));
      var m = Math.pow(10, e);
      a = Math.round(a * m) / m;
      var n = ('' + a).split(Cd), o = n[0];
      n = n[1] || '';
      var p = 0, r = b.lgSize, s = b.gSize;
      if (o.length >= r + s) {
        p = o.length - r;
        for (var t = 0; p > t; t++)
          0 === (p - t) % s && 0 !== t && (h += c), h += o.charAt(t);
      }
      for (t = p; t < o.length; t++)
        0 === (o.length - t) % r && 0 !== t && (h += c), h += o.charAt(t);
      for (; n.length < e;)
        n += '0';
      e && '0' !== e && (h += d + n.substr(0, e));
    }
    return i.push(f ? b.negPre : b.posPre), i.push(h), i.push(f ? b.negSuf : b.posSuf), i.join('');
  }
  function xc(a, b, c) {
    var d = '';
    for (0 > a && (d = '-', a = -a), a = '' + a; a.length < b;)
      a = '0' + a;
    return c && (a = a.substr(a.length - b)), d + a;
  }
  function yc(a, b, c, d) {
    return c = c || 0, function (e) {
      var f = e['get' + a]();
      return (c > 0 || f > -c) && (f += c), 0 === f && -12 == c && (f = 12), xc(f, b, d);
    };
  }
  function zc(a, b) {
    return function (c, d) {
      var e = c['get' + a](), f = Rc(b ? 'SHORT' + a : a);
      return d[f][e];
    };
  }
  function Ac(a) {
    var b = -1 * a.getTimezoneOffset(), c = b >= 0 ? '+' : '';
    return c += xc(Math[b > 0 ? 'floor' : 'ceil'](b / 60), 2) + xc(Math.abs(b % 60), 2);
  }
  function Bc(a, b) {
    return a.getHours() < 12 ? b.AMPMS[0] : b.AMPMS[1];
  }
  function Cc(a) {
    function b(a) {
      var b;
      if (b = a.match(c)) {
        var d = new Date(0), e = 0, f = 0;
        return b[9] && (e = l(b[9] + b[10]), f = l(b[9] + b[11])), d.setUTCFullYear(l(b[1]), l(b[2]) - 1, l(b[3])), d.setUTCHours(l(b[4] || 0) - e, l(b[5] || 0) - f, l(b[6] || 0), l(b[7] || 0)), d;
      }
      return a;
    }
    var c = /^(\d{4})-?(\d\d)-?(\d\d)(?:T(\d\d)(?::?(\d\d)(?::?(\d\d)(?:\.(\d+))?)?)?(Z|([+-])(\d\d):?(\d\d))?)?$/;
    return function (c, d) {
      var f, g, h = '', i = [];
      if (d = d || 'mediumDate', d = a.DATETIME_FORMATS[d] || d, t(c) && (c = Fd.test(c) ? l(c) : b(c)), u(c) && (c = new Date(c)), !v(c))
        return c;
      for (; d;)
        g = Ed.exec(d), g ? (i = K(i, g, 1), d = i.pop()) : (i.push(d), d = null);
      return e(i, function (b) {
        f = Dd[b], h += f ? f(c, a.DATETIME_FORMATS) : b.replace(/(^'|'$)/g, '').replace(/''/g, '\'');
      }), h;
    };
  }
  function Dc() {
    return function (a) {
      return O(a, !0);
    };
  }
  function Ec() {
    return function (a, b) {
      if (!(a instanceof Array))
        return a;
      b = l(b);
      var c, d, e = [];
      if (!(a && a instanceof Array))
        return e;
      for (b > a.length ? b = a.length : b < -a.length && (b = -a.length), b > 0 ? (c = 0, d = b) : (c = a.length + b, d = a.length); d > c; c++)
        e.push(a[c]);
      return e;
    };
  }
  function Fc(a) {
    return function (b, c, d) {
      function e(a, b) {
        for (var d = 0; d < c.length; d++) {
          var e = c[d](a, b);
          if (0 !== e)
            return e;
        }
        return 0;
      }
      function f(a, b) {
        return Q(b) ? function (b, c) {
          return a(c, b);
        } : a;
      }
      function g(a, b) {
        var c = typeof a, d = typeof b;
        return c == d ? ('string' == c && (a = a.toLowerCase()), 'string' == c && (b = b.toLowerCase()), a === b ? 0 : b > a ? -1 : 1) : d > c ? -1 : 1;
      }
      if (!w(b))
        return b;
      if (!c)
        return b;
      c = w(c) ? c : [c], c = D(c, function (b) {
        var c = !1, d = b || o;
        return t(b) && (('+' == b.charAt(0) || '-' == b.charAt(0)) && (c = '-' == b.charAt(0), b = b.substring(1)), d = a(b)), f(function (a, b) {
          return g(d(a), d(b));
        }, c);
      });
      for (var h = [], i = 0; i < b.length; i++)
        h.push(b[i]);
      return h.sort(f(e, d));
    };
  }
  function Gc(a) {
    return x(a) && (a = { link: a }), a.restrict = a.restrict || 'AC', p(a);
  }
  function Hc(a, b) {
    function c(b, c) {
      c = c ? '-' + Y(c, '-') : '', a.removeClass((b ? Ud : Td) + c).addClass((b ? Td : Ud) + c);
    }
    var d = this, f = a.parent().controller('form') || Kd, g = 0, h = d.$error = {};
    d.$name = b.name, d.$dirty = !1, d.$pristine = !0, d.$valid = !0, d.$invalid = !1, f.$addControl(d), a.addClass(Vd), c(!0), d.$addControl = function (a) {
      a.$name && !d.hasOwnProperty(a.$name) && (d[a.$name] = a);
    }, d.$removeControl = function (a) {
      a.$name && d[a.$name] === a && delete d[a.$name], e(h, function (b, c) {
        d.$setValidity(c, !0, a);
      });
    }, d.$setValidity = function (a, b, e) {
      var i = h[a];
      if (b)
        i && (G(i, e), i.length || (g--, g || (c(b), d.$valid = !0, d.$invalid = !1), h[a] = !1, c(!0, a), f.$setValidity(a, !0, d)));
      else {
        if (g || c(b), i) {
          if (E(i, e))
            return;
        } else
          h[a] = i = [], g++, c(!1, a), f.$setValidity(a, !1, d);
        i.push(e), d.$valid = !1, d.$invalid = !0;
      }
    }, d.$setDirty = function () {
      a.removeClass(Vd).addClass(Wd), d.$dirty = !0, d.$pristine = !1, f.$setDirty();
    };
  }
  function Ic(a) {
    return q(a) || '' === a || null === a || a !== a;
  }
  function Jc(a, b, d, e, f, g) {
    var h = function () {
      var c = B(b.val());
      e.$viewValue !== c && a.$apply(function () {
        e.$setViewValue(c);
      });
    };
    if (f.hasEvent('input'))
      b.bind('input', h);
    else {
      var i, j = function () {
          i || (i = g.defer(function () {
            h(), i = null;
          }));
        };
      b.bind('keydown', function (a) {
        var b = a.keyCode;
        91 === b || b > 15 && 19 > b || b >= 37 && 40 >= b || j();
      }), b.bind('change', h), f.hasEvent('paste') && b.bind('paste cut', j);
    }
    e.$render = function () {
      b.val(Ic(e.$viewValue) ? '' : e.$viewValue);
    };
    var k, m = d.ngPattern, n = function (a, b) {
        return Ic(b) || a.test(b) ? (e.$setValidity('pattern', !0), b) : (e.$setValidity('pattern', !1), c);
      };
    if (m && (m.match(/^\/(.*)\/$/) ? (m = new RegExp(m.substr(1, m.length - 2)), k = function (a) {
        return n(m, a);
      }) : k = function (b) {
        var c = a.$eval(m);
        if (!c || !c.test)
          throw new Error('Expected ' + m + ' to be a RegExp but was ' + c);
        return n(c, b);
      }, e.$formatters.push(k), e.$parsers.push(k)), d.ngMinlength) {
      var o = l(d.ngMinlength), p = function (a) {
          return !Ic(a) && a.length < o ? (e.$setValidity('minlength', !1), c) : (e.$setValidity('minlength', !0), a);
        };
      e.$parsers.push(p), e.$formatters.push(p);
    }
    if (d.ngMaxlength) {
      var q = l(d.ngMaxlength), r = function (a) {
          return !Ic(a) && a.length > q ? (e.$setValidity('maxlength', !1), c) : (e.$setValidity('maxlength', !0), a);
        };
      e.$parsers.push(r), e.$formatters.push(r);
    }
  }
  function Kc(a, b, d, e, f, g) {
    if (Jc(a, b, d, e, f, g), e.$parsers.push(function (a) {
        var b = Ic(a);
        return b || Qd.test(a) ? (e.$setValidity('number', !0), '' === a ? null : b ? a : parseFloat(a)) : (e.$setValidity('number', !1), c);
      }), e.$formatters.push(function (a) {
        return Ic(a) ? '' : '' + a;
      }), d.min) {
      var h = parseFloat(d.min), i = function (a) {
          return !Ic(a) && h > a ? (e.$setValidity('min', !1), c) : (e.$setValidity('min', !0), a);
        };
      e.$parsers.push(i), e.$formatters.push(i);
    }
    if (d.max) {
      var j = parseFloat(d.max), k = function (a) {
          return !Ic(a) && a > j ? (e.$setValidity('max', !1), c) : (e.$setValidity('max', !0), a);
        };
      e.$parsers.push(k), e.$formatters.push(k);
    }
    e.$formatters.push(function (a) {
      return Ic(a) || u(a) ? (e.$setValidity('number', !0), a) : (e.$setValidity('number', !1), c);
    });
  }
  function Lc(a, b, d, e, f, g) {
    Jc(a, b, d, e, f, g);
    var h = function (a) {
      return Ic(a) || Od.test(a) ? (e.$setValidity('url', !0), a) : (e.$setValidity('url', !1), c);
    };
    e.$formatters.push(h), e.$parsers.push(h);
  }
  function Mc(a, b, d, e, f, g) {
    Jc(a, b, d, e, f, g);
    var h = function (a) {
      return Ic(a) || Pd.test(a) ? (e.$setValidity('email', !0), a) : (e.$setValidity('email', !1), c);
    };
    e.$formatters.push(h), e.$parsers.push(h);
  }
  function Nc(a, b, c, d) {
    q(c.name) && b.attr('name', i()), b.bind('click', function () {
      b[0].checked && a.$apply(function () {
        d.$setViewValue(c.value);
      });
    }), d.$render = function () {
      var a = c.value;
      b[0].checked = a == d.$viewValue;
    }, c.$observe('value', d.$render);
  }
  function Oc(a, b, c, d) {
    var e = c.ngTrueValue, f = c.ngFalseValue;
    t(e) || (e = !0), t(f) || (f = !1), b.bind('click', function () {
      a.$apply(function () {
        d.$setViewValue(b[0].checked);
      });
    }), d.$render = function () {
      b[0].checked = d.$viewValue;
    }, d.$formatters.push(function (a) {
      return a === e;
    }), d.$parsers.push(function (a) {
      return a ? e : f;
    });
  }
  function Pc(a, b) {
    return a = 'ngClass' + a, Gc(function (d, e, f) {
      function g(a) {
        (b === !0 || d.$index % 2 === b) && (j && !J(a, j) && h(j), i(a)), j = H(a);
      }
      function h(a) {
        s(a) && !w(a) && (a = D(a, function (a, b) {
          return a ? b : void 0;
        })), e.removeClass(w(a) ? a.join(' ') : a);
      }
      function i(a) {
        s(a) && !w(a) && (a = D(a, function (a, b) {
          return a ? b : void 0;
        })), a && e.addClass(w(a) ? a.join(' ') : a);
      }
      var j = c;
      d.$watch(f[a], g, !0), f.$observe('class', function () {
        var b = d.$eval(f[a]);
        g(b, b);
      }), 'ngClass' !== a && d.$watch('$index', function (c, e) {
        var g = 1 & c;
        1 & g !== e && (g === b ? i(d.$eval(f[a])) : h(d.$eval(f[a])));
      });
    });
  }
  var Qc = function (a) {
      return t(a) ? a.toLowerCase() : a;
    }, Rc = function (a) {
      return t(a) ? a.toUpperCase() : a;
    }, Sc = function (a) {
      return t(a) ? a.replace(/[A-Z]/g, function (a) {
        return String.fromCharCode(32 | a.charCodeAt(0));
      }) : a;
    }, Tc = function (a) {
      return t(a) ? a.replace(/[a-z]/g, function (a) {
        return String.fromCharCode(-33 & a.charCodeAt(0));
      }) : a;
    };
  'i' !== 'I'.toLowerCase() && (Qc = Sc, Rc = Tc);
  var Uc, Vc, Wc, Xc, Yc = l((/msie (\d+)/.exec(Qc(navigator.userAgent)) || [])[1]), Zc = [].slice, $c = [].push, _c = Object.prototype.toString, ad = a.angular || (a.angular = {}), bd = [
      '0',
      '0',
      '0'
    ];
  n.$inject = [], o.$inject = [], Xc = 9 > Yc ? function (a) {
    return a = a.nodeName ? a : a[0], a.scopeName && 'HTML' != a.scopeName ? Rc(a.scopeName + ':' + a.nodeName) : a.nodeName;
  } : function (a) {
    return a.nodeName ? a.nodeName : a[0].nodeName;
  };
  var cd = /[A-Z]/g, dd = {
      full: '1.0.7',
      major: 1,
      minor: 0,
      dot: 7,
      codeName: 'monochromatic-rainbow'
    }, ed = fb.cache = {}, fd = fb.expando = 'ng-' + new Date().getTime(), gd = 1, hd = a.document.addEventListener ? function (a, b, c) {
      a.addEventListener(b, c, !1);
    } : function (a, b, c) {
      a.attachEvent('on' + b, c);
    }, id = a.document.removeEventListener ? function (a, b, c) {
      a.removeEventListener(b, c, !1);
    } : function (a, b, c) {
      a.detachEvent('on' + b, c);
    }, jd = /([\:\-\_]+(.))/g, kd = /^moz([A-Z])/, ld = fb.prototype = {
      ready: function (b) {
        function c() {
          d || (d = !0, b());
        }
        var d = !1;
        this.bind('DOMContentLoaded', c), fb(a).bind('load', c);
      },
      toString: function () {
        var a = [];
        return e(this, function (b) {
          a.push('' + b);
        }), '[' + a.join(', ') + ']';
      },
      eq: function (a) {
        return a >= 0 ? Uc(this[a]) : Uc(this[this.length + a]);
      },
      length: 0,
      push: $c,
      sort: [].sort,
      splice: [].splice
    }, md = {};
  e('multiple,selected,checked,disabled,readOnly,required'.split(','), function (a) {
    md[Qc(a)] = a;
  });
  var nd = {};
  e('input,select,option,textarea,button,form'.split(','), function (a) {
    nd[Rc(a)] = !0;
  }), e({
    data: lb,
    inheritedData: rb,
    scope: function (a) {
      return rb(a, '$scope');
    },
    controller: qb,
    injector: function (a) {
      return rb(a, '$injector');
    },
    removeAttr: function (a, b) {
      a.removeAttribute(b);
    },
    hasClass: mb,
    css: function (a, b, d) {
      if (b = db(b), !r(d)) {
        var e;
        return 8 >= Yc && (e = a.currentStyle && a.currentStyle[b], '' === e && (e = 'auto')), e = e || a.style[b], 8 >= Yc && (e = '' === e ? c : e), e;
      }
      a.style[b] = d;
    },
    attr: function (a, b, d) {
      var e = Qc(b);
      if (md[e]) {
        if (!r(d))
          return a[b] || (a.attributes.getNamedItem(b) || n).specified ? e : c;
        d ? (a[b] = !0, a.setAttribute(b, e)) : (a[b] = !1, a.removeAttribute(e));
      } else if (r(d))
        a.setAttribute(b, d);
      else if (a.getAttribute) {
        var f = a.getAttribute(b, 2);
        return null === f ? c : f;
      }
    },
    prop: function (a, b, c) {
      return r(c) ? (a[b] = c, void 0) : a[b];
    },
    text: k(9 > Yc ? function (a, b) {
      if (1 == a.nodeType) {
        if (q(b))
          return a.innerText;
        a.innerText = b;
      } else {
        if (q(b))
          return a.nodeValue;
        a.nodeValue = b;
      }
    } : function (a, b) {
      return q(b) ? a.textContent : (a.textContent = b, void 0);
    }, { $dv: '' }),
    val: function (a, b) {
      return q(b) ? a.value : (a.value = b, void 0);
    },
    html: function (a, b) {
      if (q(b))
        return a.innerHTML;
      for (var c = 0, d = a.childNodes; c < d.length; c++)
        hb(d[c]);
      a.innerHTML = b;
    }
  }, function (a, b) {
    fb.prototype[b] = function (b, d) {
      var e, f;
      if ((2 == a.length && a !== mb && a !== qb ? b : d) !== c) {
        for (e = 0; e < this.length; e++)
          a(this[e], b, d);
        return this;
      }
      if (s(b)) {
        for (e = 0; e < this.length; e++)
          if (a === lb)
            a(this[e], b);
          else
            for (f in b)
              a(this[e], f, b[f]);
        return this;
      }
      return this.length ? a(this[0], b, d) : a.$dv;
    };
  }), e({
    removeData: jb,
    dealoc: hb,
    bind: function Fe(a, c, d) {
      var f = kb(a, 'events'), g = kb(a, 'handle');
      f || kb(a, 'events', f = {}), g || kb(a, 'handle', g = tb(a, f)), e(c.split(' '), function (c) {
        var e = f[c];
        if (!e) {
          if ('mouseenter' == c || 'mouseleave' == c) {
            var h = b.body.contains || b.body.compareDocumentPosition ? function (a, b) {
                var c = 9 === a.nodeType ? a.documentElement : a, d = b && b.parentNode;
                return a === d || !(!d || 1 !== d.nodeType || !(c.contains ? c.contains(d) : a.compareDocumentPosition && 16 & a.compareDocumentPosition(d)));
              } : function (a, b) {
                if (b)
                  for (; b = b.parentNode;)
                    if (b === a)
                      return !0;
                return !1;
              };
            f[c] = [];
            var i = {
                mouseleave: 'mouseout',
                mouseenter: 'mouseover'
              };
            Fe(a, i[c], function (a) {
              var b = this, d = a.relatedTarget;
              (!d || d !== b && !h(b, d)) && g(a, c);
            });
          } else
            hd(a, c, g), f[c] = [];
          e = f[c];
        }
        e.push(d);
      });
    },
    unbind: ib,
    replaceWith: function (a, b) {
      var c, d = a.parentNode;
      hb(a), e(new fb(b), function (b) {
        c ? d.insertBefore(b, c.nextSibling) : d.replaceChild(b, a), c = b;
      });
    },
    children: function (a) {
      var b = [];
      return e(a.childNodes, function (a) {
        1 === a.nodeType && b.push(a);
      }), b;
    },
    contents: function (a) {
      return a.childNodes || [];
    },
    append: function (a, b) {
      e(new fb(b), function (b) {
        1 === a.nodeType && a.appendChild(b);
      });
    },
    prepend: function (a, b) {
      if (1 === a.nodeType) {
        var c = a.firstChild;
        e(new fb(b), function (b) {
          c ? a.insertBefore(b, c) : (a.appendChild(b), c = b);
        });
      }
    },
    wrap: function (a, b) {
      b = Uc(b)[0];
      var c = a.parentNode;
      c && c.replaceChild(b, a), b.appendChild(a);
    },
    remove: function (a) {
      hb(a);
      var b = a.parentNode;
      b && b.removeChild(a);
    },
    after: function (a, b) {
      var c = a, d = a.parentNode;
      e(new fb(b), function (a) {
        d.insertBefore(a, c.nextSibling), c = a;
      });
    },
    addClass: ob,
    removeClass: nb,
    toggleClass: function (a, b, c) {
      q(c) && (c = !mb(a, b)), (c ? ob : nb)(a, b);
    },
    parent: function (a) {
      var b = a.parentNode;
      return b && 11 !== b.nodeType ? b : null;
    },
    next: function (a) {
      if (a.nextElementSibling)
        return a.nextElementSibling;
      for (var b = a.nextSibling; null != b && 1 !== b.nodeType;)
        b = b.nextSibling;
      return b;
    },
    find: function (a, b) {
      return a.getElementsByTagName(b);
    },
    clone: gb,
    triggerHandler: function (a, b) {
      var c = (kb(a, 'events') || {})[b];
      e(c, function (b) {
        b.call(a, null);
      });
    }
  }, function (a, b) {
    fb.prototype[b] = function (b, d) {
      for (var e, f = 0; f < this.length; f++)
        e == c ? (e = a(this[f], b, d), e !== c && (e = Uc(e))) : pb(e, a(this[f], b, d));
      return e == c ? this : e;
    };
  }), vb.prototype = {
    put: function (a, b) {
      this[ub(a)] = b;
    },
    get: function (a) {
      return this[ub(a)];
    },
    remove: function (a) {
      var b = this[a = ub(a)];
      return delete this[a], b;
    }
  }, wb.prototype = {
    push: function (a, b) {
      var c = this[a = ub(a)];
      c ? c.push(b) : this[a] = [b];
    },
    shift: function (a) {
      var b = this[a = ub(a)];
      return b ? 1 == b.length ? (delete this[a], b[0]) : b.shift() : void 0;
    },
    peek: function (a) {
      var b = this[ub(a)];
      return b ? b[0] : void 0;
    }
  };
  var od = /^function\s*[^\(]*\(\s*([^\)]*)\)/m, pd = /,/, qd = /^\s*(_?)(\S+?)\1\s*$/, rd = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/gm, sd = 'Non-assignable model expression: ';
  Eb.$inject = ['$provide'];
  var td = /^(x[\:\-_]|data[\:\-_])/i, ud = /^([^:]+):\/\/(\w+:{0,1}\w*@)?(\{?[\w\.-]*\}?)(:([0-9]+))?(\/[^\?#]*)?(\?([^#]*))?(#(.*))?$/, vd = /^([^\?#]*)?(\?([^#]*))?(#(.*))?$/, wd = vd, xd = {
      http: 80,
      https: 443,
      ftp: 21
    };
  Qb.prototype = {
    $$replace: !1,
    absUrl: Tb('$$absUrl'),
    url: function (a, b) {
      if (q(a))
        return this.$$url;
      var c = vd.exec(a);
      return c[1] && this.path(decodeURIComponent(c[1])), (c[2] || c[1]) && this.search(c[3] || ''), this.hash(c[5] || '', b), this;
    },
    protocol: Tb('$$protocol'),
    host: Tb('$$host'),
    port: Tb('$$port'),
    path: Ub('$$path', function (a) {
      return '/' == a.charAt(0) ? a : '/' + a;
    }),
    search: function (a, b) {
      return q(a) ? this.$$search : (r(b) ? null === b ? delete this.$$search[a] : this.$$search[a] = b : this.$$search = t(a) ? S(a) : a, this.$$compose(), this);
    },
    hash: Ub('$$hash', o),
    replace: function () {
      return this.$$replace = !0, this;
    }
  }, Rb.prototype = m(Qb.prototype), Sb.prototype = m(Rb.prototype);
  var yd = {
      'null': function () {
        return null;
      },
      'true': function () {
        return !0;
      },
      'false': function () {
        return !1;
      },
      undefined: n,
      '+': function (a, b, d, e) {
        return d = d(a, b), e = e(a, b), r(d) ? r(e) ? d + e : d : r(e) ? e : c;
      },
      '-': function (a, b, c, d) {
        return c = c(a, b), d = d(a, b), (r(c) ? c : 0) - (r(d) ? d : 0);
      },
      '*': function (a, b, c, d) {
        return c(a, b) * d(a, b);
      },
      '/': function (a, b, c, d) {
        return c(a, b) / d(a, b);
      },
      '%': function (a, b, c, d) {
        return c(a, b) % d(a, b);
      },
      '^': function (a, b, c, d) {
        return c(a, b) ^ d(a, b);
      },
      '=': n,
      '==': function (a, b, c, d) {
        return c(a, b) == d(a, b);
      },
      '!=': function (a, b, c, d) {
        return c(a, b) != d(a, b);
      },
      '<': function (a, b, c, d) {
        return c(a, b) < d(a, b);
      },
      '>': function (a, b, c, d) {
        return c(a, b) > d(a, b);
      },
      '<=': function (a, b, c, d) {
        return c(a, b) <= d(a, b);
      },
      '>=': function (a, b, c, d) {
        return c(a, b) >= d(a, b);
      },
      '&&': function (a, b, c, d) {
        return c(a, b) && d(a, b);
      },
      '||': function (a, b, c, d) {
        return c(a, b) || d(a, b);
      },
      '&': function (a, b, c, d) {
        return c(a, b) & d(a, b);
      },
      '|': function (a, b, c, d) {
        return d(a, b)(a, b, c(a, b));
      },
      '!': function (a, b, c) {
        return !c(a, b);
      }
    }, zd = {
      n: '\n',
      f: '\f',
      r: '\r',
      t: '\t',
      v: '\x0B',
      '\'': '\'',
      '"': '"'
    }, Ad = {}, Bd = a.XMLHttpRequest || function () {
      try {
        return new ActiveXObject('Msxml2.XMLHTTP.6.0');
      } catch (a) {
      }
      try {
        return new ActiveXObject('Msxml2.XMLHTTP.3.0');
      } catch (b) {
      }
      try {
        return new ActiveXObject('Msxml2.XMLHTTP');
      } catch (c) {
      }
      throw new Error('This browser does not support XMLHttpRequest.');
    };
  sc.$inject = ['$provide'], uc.$inject = ['$locale'], vc.$inject = ['$locale'];
  var Cd = '.', Dd = {
      yyyy: yc('FullYear', 4),
      yy: yc('FullYear', 2, 0, !0),
      y: yc('FullYear', 1),
      MMMM: zc('Month'),
      MMM: zc('Month', !0),
      MM: yc('Month', 2, 1),
      M: yc('Month', 1, 1),
      dd: yc('Date', 2),
      d: yc('Date', 1),
      HH: yc('Hours', 2),
      H: yc('Hours', 1),
      hh: yc('Hours', 2, -12),
      h: yc('Hours', 1, -12),
      mm: yc('Minutes', 2),
      m: yc('Minutes', 1),
      ss: yc('Seconds', 2),
      s: yc('Seconds', 1),
      EEEE: zc('Day'),
      EEE: zc('Day', !0),
      a: Bc,
      Z: Ac
    }, Ed = /((?:[^yMdHhmsaZE']+)|(?:'(?:[^']|'')*')|(?:E+|y+|M+|d+|H+|h+|m+|s+|a|Z))(.*)/, Fd = /^\d+$/;
  Cc.$inject = ['$locale'];
  var Gd = p(Qc), Hd = p(Rc);
  Fc.$inject = ['$parse'];
  var Id = p({
      restrict: 'E',
      compile: function (a, c) {
        return 8 >= Yc && (c.href || c.name || c.$set('href', ''), a.append(b.createComment('IE fix'))), function (a, b) {
          b.bind('click', function (a) {
            b.attr('href') || a.preventDefault();
          });
        };
      }
    }), Jd = {};
  e(md, function (a, b) {
    var c = Fb('ng-' + b);
    Jd[c] = function () {
      return {
        priority: 100,
        compile: function () {
          return function (a, d, e) {
            a.$watch(e[c], function (a) {
              e.$set(b, !!a);
            });
          };
        }
      };
    };
  }), e([
    'src',
    'href'
  ], function (a) {
    var b = Fb('ng-' + a);
    Jd[b] = function () {
      return {
        priority: 99,
        link: function (c, d, e) {
          e.$observe(b, function (b) {
            b && (e.$set(a, b), Yc && d.prop(a, e[a]));
          });
        }
      };
    };
  });
  var Kd = {
      $addControl: n,
      $removeControl: n,
      $setValidity: n,
      $setDirty: n
    };
  Hc.$inject = [
    '$element',
    '$attrs',
    '$scope'
  ];
  var Ld = function (a) {
      return [
        '$timeout',
        function (b) {
          var d = {
              name: 'form',
              restrict: 'E',
              controller: Hc,
              compile: function () {
                return {
                  pre: function (a, d, e, f) {
                    if (!e.action) {
                      var g = function (a) {
                        a.preventDefault ? a.preventDefault() : a.returnValue = !1;
                      };
                      hd(d[0], 'submit', g), d.bind('$destroy', function () {
                        b(function () {
                          id(d[0], 'submit', g);
                        }, 0, !1);
                      });
                    }
                    var h = d.parent().controller('form'), i = e.name || e.ngForm;
                    i && (a[i] = f), h && d.bind('$destroy', function () {
                      h.$removeControl(f), i && (a[i] = c), k(f, Kd);
                    });
                  }
                };
              }
            };
          return a ? k(H(d), { restrict: 'EAC' }) : d;
        }
      ];
    }, Md = Ld(), Nd = Ld(!0), Od = /^(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?$/, Pd = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/, Qd = /^\s*(\-|\+)?(\d+|(\d*(\.\d*)))\s*$/, Rd = {
      text: Jc,
      number: Kc,
      url: Lc,
      email: Mc,
      radio: Nc,
      checkbox: Oc,
      hidden: n,
      button: n,
      submit: n,
      reset: n
    }, Sd = [
      '$browser',
      '$sniffer',
      function (a, b) {
        return {
          restrict: 'E',
          require: '?ngModel',
          link: function (c, d, e, f) {
            f && (Rd[Qc(e.type)] || Rd.text)(c, d, e, f, b, a);
          }
        };
      }
    ], Td = 'ng-valid', Ud = 'ng-invalid', Vd = 'ng-pristine', Wd = 'ng-dirty', Xd = [
      '$scope',
      '$exceptionHandler',
      '$attrs',
      '$element',
      '$parse',
      function (a, b, c, d, f) {
        function g(a, b) {
          b = b ? '-' + Y(b, '-') : '', d.removeClass((a ? Ud : Td) + b).addClass((a ? Td : Ud) + b);
        }
        this.$viewValue = Number.NaN, this.$modelValue = Number.NaN, this.$parsers = [], this.$formatters = [], this.$viewChangeListeners = [], this.$pristine = !0, this.$dirty = !1, this.$valid = !0, this.$invalid = !1, this.$name = c.name;
        var h = f(c.ngModel), i = h.assign;
        if (!i)
          throw Error(sd + c.ngModel + ' (' + R(d) + ')');
        this.$render = n;
        var j = d.inheritedData('$formController') || Kd, k = 0, l = this.$error = {};
        d.addClass(Vd), g(!0), this.$setValidity = function (a, b) {
          l[a] !== !b && (b ? (l[a] && k--, k || (g(!0), this.$valid = !0, this.$invalid = !1)) : (g(!1), this.$invalid = !0, this.$valid = !1, k++), l[a] = !b, g(b, a), j.$setValidity(a, b, this));
        }, this.$setViewValue = function (c) {
          this.$viewValue = c, this.$pristine && (this.$dirty = !0, this.$pristine = !1, d.removeClass(Vd).addClass(Wd), j.$setDirty()), e(this.$parsers, function (a) {
            c = a(c);
          }), this.$modelValue !== c && (this.$modelValue = c, i(a, c), e(this.$viewChangeListeners, function (a) {
            try {
              a();
            } catch (c) {
              b(c);
            }
          }));
        };
        var m = this;
        a.$watch(function () {
          var b = h(a);
          if (m.$modelValue !== b) {
            var c = m.$formatters, d = c.length;
            for (m.$modelValue = b; d--;)
              b = c[d](b);
            m.$viewValue !== b && (m.$viewValue = b, m.$render());
          }
        });
      }
    ], Yd = function () {
      return {
        require: [
          'ngModel',
          '^?form'
        ],
        controller: Xd,
        link: function (a, b, c, d) {
          var e = d[0], f = d[1] || Kd;
          f.$addControl(e), b.bind('$destroy', function () {
            f.$removeControl(e);
          });
        }
      };
    }, Zd = p({
      require: 'ngModel',
      link: function (a, b, c, d) {
        d.$viewChangeListeners.push(function () {
          a.$eval(c.ngChange);
        });
      }
    }), $d = function () {
      return {
        require: '?ngModel',
        link: function (a, b, c, d) {
          if (d) {
            c.required = !0;
            var e = function (a) {
              return c.required && (Ic(a) || a === !1) ? (d.$setValidity('required', !1), void 0) : (d.$setValidity('required', !0), a);
            };
            d.$formatters.push(e), d.$parsers.unshift(e), c.$observe('required', function () {
              e(d.$viewValue);
            });
          }
        }
      };
    }, _d = function () {
      return {
        require: 'ngModel',
        link: function (a, b, d, f) {
          var g = /\/(.*)\//.exec(d.ngList), h = g && new RegExp(g[1]) || d.ngList || ',', i = function (a) {
              var b = [];
              return a && e(a.split(h), function (a) {
                a && b.push(B(a));
              }), b;
            };
          f.$parsers.push(i), f.$formatters.push(function (a) {
            return w(a) ? a.join(', ') : c;
          });
        }
      };
    }, ae = /^(true|false|\d+)$/, be = function () {
      return {
        priority: 100,
        compile: function (a, b) {
          return ae.test(b.ngValue) ? function (a, b, c) {
            c.$set('value', a.$eval(c.ngValue));
          } : function (a, b, c) {
            a.$watch(c.ngValue, function (a) {
              c.$set('value', a, !1);
            });
          };
        }
      };
    }, ce = Gc(function (a, b, d) {
      b.addClass('ng-binding').data('$binding', d.ngBind), a.$watch(d.ngBind, function (a) {
        b.text(a == c ? '' : a);
      });
    }), de = [
      '$interpolate',
      function (a) {
        return function (b, c, d) {
          var e = a(c.attr(d.$attr.ngBindTemplate));
          c.addClass('ng-binding').data('$binding', e), d.$observe('ngBindTemplate', function (a) {
            c.text(a);
          });
        };
      }
    ], ee = [function () {
        return function (a, b, c) {
          b.addClass('ng-binding').data('$binding', c.ngBindHtmlUnsafe), a.$watch(c.ngBindHtmlUnsafe, function (a) {
            b.html(a || '');
          });
        };
      }], fe = Pc('', !0), ge = Pc('Odd', 0), he = Pc('Even', 1), ie = Gc({
      compile: function (a, b) {
        b.$set('ngCloak', c), a.removeClass('ng-cloak');
      }
    }), je = [function () {
        return {
          scope: !0,
          controller: '@'
        };
      }], ke = [
      '$sniffer',
      function (a) {
        return {
          priority: 1000,
          compile: function () {
            a.csp = !0;
          }
        };
      }
    ], le = {};
  e('click dblclick mousedown mouseup mouseover mouseout mousemove mouseenter mouseleave'.split(' '), function (a) {
    var b = Fb('ng-' + a);
    le[b] = [
      '$parse',
      function (c) {
        return function (d, e, f) {
          var g = c(f[b]);
          e.bind(Qc(a), function (a) {
            d.$apply(function () {
              g(d, { $event: a });
            });
          });
        };
      }
    ];
  });
  var me = Gc(function (a, b, c) {
      b.bind('submit', function () {
        a.$apply(c.ngSubmit);
      });
    }), ne = [
      '$http',
      '$templateCache',
      '$anchorScroll',
      '$compile',
      function (a, b, c, d) {
        return {
          restrict: 'ECA',
          terminal: !0,
          compile: function (e, f) {
            var g = f.ngInclude || f.src, h = f.onload || '', i = f.autoscroll;
            return function (e, f) {
              var j, k = 0, l = function () {
                  j && (j.$destroy(), j = null), f.html('');
                };
              e.$watch(g, function (g) {
                var m = ++k;
                g ? a.get(g, { cache: b }).success(function (a) {
                  m === k && (j && j.$destroy(), j = e.$new(), f.html(a), d(f.contents())(j), !r(i) || i && !e.$eval(i) || c(), j.$emit('$includeContentLoaded'), e.$eval(h));
                }).error(function () {
                  m === k && l();
                }) : l();
              });
            };
          }
        };
      }
    ], oe = Gc({
      compile: function () {
        return {
          pre: function (a, b, c) {
            a.$eval(c.ngInit);
          }
        };
      }
    }), pe = Gc({
      terminal: !0,
      priority: 1000
    }), qe = [
      '$locale',
      '$interpolate',
      function (a, b) {
        var c = /{}/g;
        return {
          restrict: 'EA',
          link: function (d, f, g) {
            var h = g.count, i = f.attr(g.$attr.when), j = g.offset || 0, k = d.$eval(i), l = {}, m = b.startSymbol(), n = b.endSymbol();
            e(k, function (a, d) {
              l[d] = b(a.replace(c, m + h + '-' + j + n));
            }), d.$watch(function () {
              var b = parseFloat(d.$eval(h));
              return isNaN(b) ? '' : (b in k || (b = a.pluralCat(b - j)), l[b](d, f, !0));
            }, function (a) {
              f.text(a);
            });
          }
        };
      }
    ], re = Gc({
      transclude: 'element',
      priority: 1000,
      terminal: !0,
      compile: function (a, b, c) {
        return function (a, b, d) {
          var e, f, g, h, i = d.ngRepeat, j = i.match(/^\s*(.+)\s+in\s+(.*)\s*$/);
          if (!j)
            throw Error('Expected ngRepeat in form of \'_item_ in _collection_\' but got \'' + i + '\'.');
          if (e = j[1], f = j[2], j = e.match(/^(?:([\$\w]+)|\(([\$\w]+)\s*,\s*([\$\w]+)\))$/), !j)
            throw Error('\'item\' in \'item in collection\' should be identifier or (key, value) but got \'' + e + '\'.');
          g = j[3] || j[1], h = j[2];
          var k = new wb();
          a.$watch(function (a) {
            var d, e, i, j, l, m, n, o, p = a.$eval(f), q = b, r = new wb();
            if (w(p))
              n = p || [];
            else {
              n = [];
              for (l in p)
                p.hasOwnProperty(l) && '$' != l.charAt(0) && n.push(l);
              n.sort();
            }
            for (i = n.length - 1, d = 0, e = n.length; e > d; d++)
              l = p === n ? d : n[d], m = p[l], o = k.shift(m), o ? (j = o.scope, r.push(m, o), d === o.index ? q = o.element : (o.index = d, q.after(o.element), q = o.element)) : j = a.$new(), j[g] = m, h && (j[h] = l), j.$index = d, j.$first = 0 === d, j.$last = d === i, j.$middle = !(j.$first || j.$last), o || c(j, function (a) {
                q.after(a), o = {
                  scope: j,
                  element: q = a,
                  index: d
                }, r.push(m, o);
              });
            for (l in k)
              if (k.hasOwnProperty(l))
                for (n = k[l]; n.length;)
                  m = n.pop(), m.element.remove(), m.scope.$destroy();
            k = r;
          });
        };
      }
    }), se = Gc(function (a, b, c) {
      a.$watch(c.ngShow, function (a) {
        b.css('display', Q(a) ? '' : 'none');
      });
    }), te = Gc(function (a, b, c) {
      a.$watch(c.ngHide, function (a) {
        b.css('display', Q(a) ? 'none' : '');
      });
    }), ue = Gc(function (a, b, c) {
      a.$watch(c.ngStyle, function (a, c) {
        c && a !== c && e(c, function (a, c) {
          b.css(c, '');
        }), a && b.css(a);
      }, !0);
    }), ve = p({
      restrict: 'EA',
      require: 'ngSwitch',
      controller: [
        '$scope',
        function () {
          this.cases = {};
        }
      ],
      link: function (a, b, c, d) {
        var e, f, g, h = c.ngSwitch || c.on;
        a.$watch(h, function (h) {
          f && (g.$destroy(), f.remove(), f = g = null), (e = d.cases['!' + h] || d.cases['?']) && (a.$eval(c.change), g = a.$new(), e(g, function (a) {
            f = a, b.append(a);
          }));
        });
      }
    }), we = Gc({
      transclude: 'element',
      priority: 500,
      require: '^ngSwitch',
      compile: function (a, b, c) {
        return function (a, d, e, f) {
          f.cases['!' + b.ngSwitchWhen] = c;
        };
      }
    }), xe = Gc({
      transclude: 'element',
      priority: 500,
      require: '^ngSwitch',
      compile: function (a, b, c) {
        return function (a, b, d, e) {
          e.cases['?'] = c;
        };
      }
    }), ye = Gc({
      controller: [
        '$transclude',
        '$element',
        function (a, b) {
          a(function (a) {
            b.append(a);
          });
        }
      ]
    }), ze = [
      '$http',
      '$templateCache',
      '$route',
      '$anchorScroll',
      '$compile',
      '$controller',
      function (a, b, c, d, e, f) {
        return {
          restrict: 'ECA',
          terminal: !0,
          link: function (a, b, g) {
            function h() {
              k && (k.$destroy(), k = null);
            }
            function i() {
              b.html(''), h();
            }
            function j() {
              var g = c.current && c.current.locals, j = g && g.$template;
              if (j) {
                b.html(j), h();
                var m, n = e(b.contents()), o = c.current;
                k = o.scope = a.$new(), o.controller && (g.$scope = k, m = f(o.controller, g), b.children().data('$ngControllerController', m)), n(k), k.$emit('$viewContentLoaded'), k.$eval(l), d();
              } else
                i();
            }
            var k, l = g.onload || '';
            a.$on('$routeChangeSuccess', j), j();
          }
        };
      }
    ], Ae = [
      '$templateCache',
      function (a) {
        return {
          restrict: 'E',
          terminal: !0,
          compile: function (b, c) {
            if ('text/ng-template' == c.type) {
              var d = c.id, e = b[0].text;
              a.put(d, e);
            }
          }
        };
      }
    ], Be = p({ terminal: !0 }), Ce = [
      '$compile',
      '$parse',
      function (a, d) {
        var g = /^\s*(.*?)(?:\s+as\s+(.*?))?(?:\s+group\s+by\s+(.*))?\s+for\s+(?:([\$\w][\$\w\d]*)|(?:\(\s*([\$\w][\$\w\d]*)\s*,\s*([\$\w][\$\w\d]*)\s*\)))\s+in\s+(.*)$/, h = { $setViewValue: n };
        return {
          restrict: 'E',
          require: [
            'select',
            '?ngModel'
          ],
          controller: [
            '$element',
            '$scope',
            '$attrs',
            function (a, b, c) {
              var d, e, f = this, g = {}, i = h;
              f.databound = c.ngModel, f.init = function (a, b, c) {
                i = a, d = b, e = c;
              }, f.addOption = function (b) {
                g[b] = !0, i.$viewValue == b && (a.val(b), e.parent() && e.remove());
              }, f.removeOption = function (a) {
                this.hasOption(a) && (delete g[a], i.$viewValue == a && this.renderUnknownOption(a));
              }, f.renderUnknownOption = function (b) {
                var c = '? ' + ub(b) + ' ?';
                e.val(c), a.prepend(e), a.val(c), e.prop('selected', !0);
              }, f.hasOption = function (a) {
                return g.hasOwnProperty(a);
              }, b.$on('$destroy', function () {
                f.renderUnknownOption = n;
              });
            }
          ],
          link: function (h, i, j, k) {
            function l(a, b, c, d) {
              c.$render = function () {
                var a = c.$viewValue;
                d.hasOption(a) ? (y.parent() && y.remove(), b.val(a), '' === a && o.prop('selected', !0)) : q(a) && o ? b.val('') : d.renderUnknownOption(a);
              }, b.bind('change', function () {
                a.$apply(function () {
                  y.parent() && y.remove(), c.$setViewValue(b.val());
                });
              });
            }
            function m(a, b, c) {
              var d;
              c.$render = function () {
                var a = new vb(c.$viewValue);
                e(b.find('option'), function (b) {
                  b.selected = r(a.get(b.value));
                });
              }, a.$watch(function () {
                J(d, c.$viewValue) || (d = H(c.$viewValue), c.$render());
              }), b.bind('change', function () {
                a.$apply(function () {
                  var a = [];
                  e(b.find('option'), function (b) {
                    b.selected && a.push(b.value);
                  }), c.$setViewValue(a);
                });
              });
            }
            function n(b, e, h) {
              function i() {
                var a, d, g, i, j, r, s, u, y, z, A, B, C, D, E = { '': [] }, F = [''], G = h.$modelValue, H = p(b) || [], I = m ? f(H) : H, J = {}, K = !1;
                for (t && (K = new vb(G)), z = 0; u = I.length, u > z; z++)
                  J[l] = H[m ? J[m] = I[z] : z], a = n(b, J) || '', (d = E[a]) || (d = E[a] = [], F.push(a)), t ? A = K.remove(o(b, J)) != c : (A = G === o(b, J), K = K || A), D = k(b, J), D = D === c ? '' : D, d.push({
                    id: m ? I[z] : z,
                    label: D,
                    selected: A
                  });
                for (t || (v || null === G ? E[''].unshift({
                    id: '',
                    label: '',
                    selected: !K
                  }) : K || E[''].unshift({
                    id: '?',
                    label: '',
                    selected: !0
                  })), y = 0, s = F.length; s > y; y++) {
                  for (a = F[y], d = E[a], q.length <= y ? (i = {
                      element: x.clone().attr('label', a),
                      label: d.label
                    }, j = [i], q.push(j), e.append(i.element)) : (j = q[y], i = j[0], i.label != a && i.element.attr('label', i.label = a)), B = null, z = 0, u = d.length; u > z; z++)
                    g = d[z], (r = j[z + 1]) ? (B = r.element, r.label !== g.label && B.text(r.label = g.label), r.id !== g.id && B.val(r.id = g.id), B[0].selected !== g.selected && B.prop('selected', r.selected = g.selected)) : ('' === g.id && v ? C = v : (C = w.clone()).val(g.id).attr('selected', g.selected).text(g.label), j.push(r = {
                      element: C,
                      label: g.label,
                      id: g.id,
                      selected: g.selected
                    }), B ? B.after(C) : i.element.append(C), B = C);
                  for (z++; j.length > z;)
                    j.pop().element.remove();
                }
                for (; q.length > y;)
                  q.pop()[0].element.remove();
              }
              var j;
              if (!(j = u.match(g)))
                throw Error('Expected ngOptions in form of \'_select_ (as _label_)? for (_key_,)?_value_ in _collection_\' but got \'' + u + '\'.');
              var k = d(j[2] || j[1]), l = j[4] || j[6], m = j[5], n = d(j[3] || ''), o = d(j[2] ? j[1] : l), p = d(j[7]), q = [[{
                      element: e,
                      label: ''
                    }]];
              v && (a(v)(b), v.removeClass('ng-scope'), v.remove()), e.html(''), e.bind('change', function () {
                b.$apply(function () {
                  var a, d, f, g, i, j, k, n, r = p(b) || [], s = {};
                  if (t)
                    for (f = [], j = 0, n = q.length; n > j; j++)
                      for (a = q[j], i = 1, k = a.length; k > i; i++)
                        (g = a[i].element)[0].selected && (d = g.val(), m && (s[m] = d), s[l] = r[d], f.push(o(b, s)));
                  else
                    d = e.val(), '?' == d ? f = c : '' == d ? f = null : (s[l] = r[d], m && (s[m] = d), f = o(b, s));
                  h.$setViewValue(f);
                });
              }), h.$render = i, b.$watch(i);
            }
            if (k[1]) {
              for (var o, p = k[0], s = k[1], t = j.multiple, u = j.ngOptions, v = !1, w = Uc(b.createElement('option')), x = Uc(b.createElement('optgroup')), y = w.clone(), z = 0, A = i.children(), B = A.length; B > z; z++)
                if ('' == A[z].value) {
                  o = v = A.eq(z);
                  break;
                }
              if (p.init(s, v, y), t && (j.required || j.ngRequired)) {
                var C = function (a) {
                  return s.$setValidity('required', !j.required || a && a.length), a;
                };
                s.$parsers.push(C), s.$formatters.unshift(C), j.$observe('required', function () {
                  C(s.$viewValue);
                });
              }
              u ? n(h, i, s) : t ? m(h, i, s) : l(h, i, s, p);
            }
          }
        };
      }
    ], De = [
      '$interpolate',
      function (a) {
        var b = {
            addOption: n,
            removeOption: n
          };
        return {
          restrict: 'E',
          priority: 100,
          compile: function (c, d) {
            if (q(d.value)) {
              var e = a(c.text(), !0);
              e || d.$set('value', c.text());
            }
            return function (a, c, d) {
              var f = '$selectController', g = c.parent(), h = g.data(f) || g.parent().data(f);
              h && h.databound ? c.prop('selected', !1) : h = b, e ? a.$watch(e, function (a, b) {
                d.$set('value', a), a !== b && h.removeOption(b), h.addOption(a);
              }) : h.addOption(d.value), c.bind('$destroy', function () {
                h.removeOption(d.value);
              });
            };
          }
        };
      }
    ], Ee = p({
      restrict: 'E',
      terminal: !0
    });
  Z(), bb(ad), Uc(b).ready(function () {
    W(b, X);
  });
}(window, document), angular.element(document).find('head').append('<style type="text/css">@charset "UTF-8";[ng\\:cloak],[ng-cloak],[data-ng-cloak],[x-ng-cloak],.ng-cloak,.x-ng-cloak{display:none;}ng\\:form{display:block;}</style>'), angular.module('ui.config', []).value('ui.config', {}), angular.module('ui.filters', ['ui.config']), angular.module('ui.directives', ['ui.config']), angular.module('ui', [
  'ui.filters',
  'ui.directives',
  'ui.config'
]), angular.module('ui.directives').directive('uiAnimate', [
  'ui.config',
  '$timeout',
  function (a, b) {
    var c = {};
    return angular.isString(a.animate) ? c['class'] = a.animate : a.animate && (c = a.animate), {
      restrict: 'A',
      link: function (a, d, e) {
        var f = {};
        e.uiAnimate && (f = a.$eval(e.uiAnimate), angular.isString(f) && (f = { 'class': f })), f = angular.extend({ 'class': 'ui-animate' }, c, f), d.addClass(f['class']), b(function () {
          d.removeClass(f['class']);
        }, 20, !1);
      }
    };
  }
]), angular.module('ui.directives').directive('uiCalendar', [
  'ui.config',
  '$parse',
  function (a) {
    return a.uiCalendar = a.uiCalendar || {}, {
      require: 'ngModel',
      restrict: 'A',
      link: function (b, c, d) {
        function e() {
          b.calendar = c.html('');
          var e = b.calendar.fullCalendar('getView');
          e && (e = e.name);
          var g, h = {
              defaultView: e,
              eventSources: f
            };
          g = d.uiCalendar ? b.$eval(d.uiCalendar) : {}, angular.extend(h, a.uiCalendar, g), b.calendar.fullCalendar(h);
        }
        var f = b.$eval(d.ngModel), g = 0, h = function () {
            var a = b.$eval(d.equalsTracker);
            return g = 0, angular.forEach(f, function (a) {
              angular.isArray(a) && (g += a.length);
            }), angular.isNumber(a) ? g + f.length + a : g + f.length;
          };
        e(), b.$watch(h, function () {
          e();
        });
      }
    };
  }
]), angular.module('ui.directives').directive('uiCodemirror', [
  'ui.config',
  '$timeout',
  function (a, b) {
    'use strict';
    var c = [
        'cursorActivity',
        'viewportChange',
        'gutterClick',
        'focus',
        'blur',
        'scroll',
        'update'
      ];
    return {
      restrict: 'A',
      require: 'ngModel',
      link: function (d, e, f, g) {
        var h, i, j, k, l;
        if ('textarea' !== e[0].type)
          throw new Error('uiCodemirror3 can only be applied to a textarea element');
        h = a.codemirror || {}, i = angular.extend({}, h, d.$eval(f.uiCodemirror)), j = function (a) {
          return function (b, c) {
            var e = b.getValue();
            e !== g.$viewValue && (g.$setViewValue(e), d.$apply()), 'function' == typeof a && a(b, c);
          };
        }, k = function () {
          l = CodeMirror.fromTextArea(e[0], i), l.on('change', j(i.onChange));
          for (var a, h = 0, k = c.length; k > h; ++h)
            a = i['on' + c[h].charAt(0).toUpperCase() + c[h].slice(1)], void 0 !== a && 'function' == typeof a && l.on(c[h], a);
          g.$formatters.push(function (a) {
            if (angular.isUndefined(a) || null === a)
              return '';
            if (angular.isObject(a) || angular.isArray(a))
              throw new Error('ui-codemirror cannot use an object or an array as a model');
            return a;
          }), g.$render = function () {
            l.setValue(g.$viewValue);
          }, f.uiRefresh && d.$watch(f.uiRefresh, function (a, c) {
            a !== c && b(l.refresh);
          });
        }, b(k);
      }
    };
  }
]), angular.module('ui.directives').directive('uiCurrency', [
  'ui.config',
  'currencyFilter',
  function (a, b) {
    var c = {
        pos: 'ui-currency-pos',
        neg: 'ui-currency-neg',
        zero: 'ui-currency-zero'
      };
    return a.currency && angular.extend(c, a.currency), {
      restrict: 'EAC',
      require: 'ngModel',
      link: function (a, d, e, f) {
        var g, h, i;
        g = angular.extend({}, c, a.$eval(e.uiCurrency)), h = function (a) {
          var c;
          return c = 1 * a, d.toggleClass(g.pos, c > 0), d.toggleClass(g.neg, 0 > c), d.toggleClass(g.zero, 0 === c), '' === a ? d.text('') : d.text(b(c, g.symbol)), !0;
        }, f.$render = function () {
          i = f.$viewValue, d.val(i), h(i);
        };
      }
    };
  }
]), angular.module('ui.directives').directive('uiDate', [
  'ui.config',
  function (a) {
    'use strict';
    var b;
    return b = {}, angular.isObject(a.date) && angular.extend(b, a.date), {
      require: '?ngModel',
      link: function (b, c, d, e) {
        var f = function () {
            return angular.extend({}, a.date, b.$eval(d.uiDate));
          }, g = function () {
            var a = f();
            if (e) {
              var d = function () {
                b.$apply(function () {
                  var a = c.datepicker('getDate');
                  c.datepicker('setDate', c.val()), e.$setViewValue(a), c.blur();
                });
              };
              if (a.onSelect) {
                var g = a.onSelect;
                a.onSelect = function (a, c) {
                  d(), b.$apply(function () {
                    g(a, c);
                  });
                };
              } else
                a.onSelect = d;
              c.bind('change', d), e.$render = function () {
                var a = e.$viewValue;
                if (angular.isDefined(a) && null !== a && !angular.isDate(a))
                  throw new Error('ng-Model value must be a Date object - currently it is a ' + typeof a + ' - use ui-date-format to convert it from a string');
                c.datepicker('setDate', a);
              };
            }
            c.datepicker('destroy'), c.datepicker(a), e && e.$render();
          };
        b.$watch(f, g, !0);
      }
    };
  }
]).directive('uiDateFormat', [
  'ui.config',
  function (a) {
    var b = {
        require: 'ngModel',
        link: function (b, c, d, e) {
          var f = d.uiDateFormat || a.dateFormat;
          f ? (e.$formatters.push(function (a) {
            return angular.isString(a) ? $.datepicker.parseDate(f, a) : void 0;
          }), e.$parsers.push(function (a) {
            return a ? $.datepicker.formatDate(f, a) : void 0;
          })) : (e.$formatters.push(function (a) {
            return angular.isString(a) ? new Date(a) : void 0;
          }), e.$parsers.push(function (a) {
            return a ? a.toISOString() : void 0;
          }));
        }
      };
    return b;
  }
]), angular.module('ui.directives').directive('uiEvent', [
  '$parse',
  function (a) {
    return function (b, c, d) {
      var e = b.$eval(d.uiEvent);
      angular.forEach(e, function (d, e) {
        var f = a(d);
        c.bind(e, function (a) {
          var c = Array.prototype.slice.call(arguments);
          c = c.splice(1), b.$apply(function () {
            f(b, {
              $event: a,
              $params: c
            });
          });
        });
      });
    };
  }
]), angular.module('ui.directives').directive('uiIf', [function () {
    return {
      transclude: 'element',
      priority: 1000,
      terminal: !0,
      restrict: 'A',
      compile: function (a, b, c) {
        return function (a, b, d) {
          var e, f;
          a.$watch(d.uiIf, function (d) {
            e && (e.remove(), e = void 0), f && (f.$destroy(), f = void 0), d && (f = a.$new(), c(f, function (a) {
              e = a, b.after(a);
            }));
          });
        };
      }
    };
  }]), angular.module('ui.directives').directive('uiJq', [
  'ui.config',
  '$timeout',
  function (a, b) {
    return {
      restrict: 'A',
      compile: function (c, d) {
        if (!angular.isFunction(c[d.uiJq]))
          throw new Error('ui-jq: The "' + d.uiJq + '" function does not exist');
        var e = a.jq && a.jq[d.uiJq];
        return function (a, c, d) {
          function f() {
            b(function () {
              c[d.uiJq].apply(c, g);
            }, 0, !1);
          }
          var g = [];
          d.uiOptions ? (g = a.$eval('[' + d.uiOptions + ']'), angular.isObject(e) && angular.isObject(g[0]) && (g[0] = angular.extend({}, e, g[0]))) : e && (g = [e]), d.ngModel && c.is('select,input,textarea') && c.on('change', function () {
            c.trigger('input');
          }), d.uiRefresh && a.$watch(d.uiRefresh, function () {
            f();
          }), f();
        };
      }
    };
  }
]), angular.module('ui.directives').factory('keypressHelper', [
  '$parse',
  function (a) {
    var b = {
        8: 'backspace',
        9: 'tab',
        13: 'enter',
        27: 'esc',
        32: 'space',
        33: 'pageup',
        34: 'pagedown',
        35: 'end',
        36: 'home',
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
        45: 'insert',
        46: 'delete'
      }, c = function (a) {
        return a.charAt(0).toUpperCase() + a.slice(1);
      };
    return function (d, e, f, g) {
      var h, i = [];
      h = e.$eval(g['ui' + c(d)]), angular.forEach(h, function (b, c) {
        var d, e;
        e = a(b), angular.forEach(c.split(' '), function (a) {
          d = {
            expression: e,
            keys: {}
          }, angular.forEach(a.split('-'), function (a) {
            d.keys[a] = !0;
          }), i.push(d);
        });
      }), f.bind(d, function (a) {
        var c = a.metaKey || a.altKey, f = a.ctrlKey, g = a.shiftKey, h = a.keyCode;
        'keypress' === d && !g && h >= 97 && 122 >= h && (h -= 32), angular.forEach(i, function (d) {
          var h = d.keys[b[a.keyCode]] || d.keys[a.keyCode.toString()] || !1, i = d.keys.alt || !1, j = d.keys.ctrl || !1, k = d.keys.shift || !1;
          h && i == c && j == f && k == g && e.$apply(function () {
            d.expression(e, { $event: a });
          });
        });
      });
    };
  }
]), angular.module('ui.directives').directive('uiKeydown', [
  'keypressHelper',
  function (a) {
    return {
      link: function (b, c, d) {
        a('keydown', b, c, d);
      }
    };
  }
]), angular.module('ui.directives').directive('uiKeypress', [
  'keypressHelper',
  function (a) {
    return {
      link: function (b, c, d) {
        a('keypress', b, c, d);
      }
    };
  }
]), angular.module('ui.directives').directive('uiKeyup', [
  'keypressHelper',
  function (a) {
    return {
      link: function (b, c, d) {
        a('keyup', b, c, d);
      }
    };
  }
]), function () {
  function a(a, b, c, d) {
    angular.forEach(b.split(' '), function (b) {
      var e = { type: 'map-' + b };
      google.maps.event.addListener(c, b, function (b) {
        d.triggerHandler(angular.extend({}, e, b)), a.$$phase || a.$apply();
      });
    });
  }
  function b(b, d) {
    c.directive(b, [function () {
        return {
          restrict: 'A',
          link: function (c, e, f) {
            c.$watch(f[b], function (b) {
              a(c, d, b, e);
            });
          }
        };
      }]);
  }
  var c = angular.module('ui.directives');
  c.directive('uiMap', [
    'ui.config',
    '$parse',
    function (b, c) {
      var d = 'bounds_changed center_changed click dblclick drag dragend dragstart heading_changed idle maptypeid_changed mousemove mouseout mouseover projection_changed resize rightclick tilesloaded tilt_changed zoom_changed', e = b.map || {};
      return {
        restrict: 'A',
        link: function (b, f, g) {
          var h = angular.extend({}, e, b.$eval(g.uiOptions)), i = new google.maps.Map(f[0], h), j = c(g.uiMap);
          j.assign(b, i), a(b, d, i, f);
        }
      };
    }
  ]), c.directive('uiMapInfoWindow', [
    'ui.config',
    '$parse',
    '$compile',
    function (b, c, d) {
      var e = 'closeclick content_change domready position_changed zindex_changed', f = b.mapInfoWindow || {};
      return {
        link: function (b, g, h) {
          var i = angular.extend({}, f, b.$eval(h.uiOptions));
          i.content = g[0];
          var j = c(h.uiMapInfoWindow), k = j(b);
          k || (k = new google.maps.InfoWindow(i), j.assign(b, k)), a(b, e, k, g), g.replaceWith('<div></div>');
          var l = k.open;
          k.open = function (a, c, e, f, h, i) {
            d(g.contents())(b), l.call(k, a, c, e, f, h, i);
          };
        }
      };
    }
  ]), b('uiMapMarker', 'animation_changed click clickable_changed cursor_changed dblclick drag dragend draggable_changed dragstart flat_changed icon_changed mousedown mouseout mouseover mouseup position_changed rightclick shadow_changed shape_changed title_changed visible_changed zindex_changed'), b('uiMapPolyline', 'click dblclick mousedown mousemove mouseout mouseover mouseup rightclick'), b('uiMapPolygon', 'click dblclick mousedown mousemove mouseout mouseover mouseup rightclick'), b('uiMapRectangle', 'bounds_changed click dblclick mousedown mousemove mouseout mouseover mouseup rightclick'), b('uiMapCircle', 'center_changed click dblclick mousedown mousemove mouseout mouseover mouseup radius_changed rightclick'), b('uiMapGroundOverlay', 'click dblclick');
}(), angular.module('ui.directives').directive('uiMask', [function () {
    return {
      require: 'ngModel',
      link: function (a, b, c, d) {
        d.$render = function () {
          var e = d.$viewValue || '';
          b.val(e), b.mask(a.$eval(c.uiMask));
        }, d.$parsers.push(function (a) {
          var c = b.isMaskValid() || angular.isUndefined(b.isMaskValid()) && b.val().length > 0;
          return d.$setValidity('mask', c), c ? a : void 0;
        }), b.bind('keyup', function () {
          a.$apply(function () {
            d.$setViewValue(b.mask());
          });
        });
      }
    };
  }]), angular.module('ui.directives').directive('uiReset', [
  'ui.config',
  function (a) {
    var b = null;
    return void 0 !== a.reset && (b = a.reset), {
      require: 'ngModel',
      link: function (a, c, d, e) {
        var f;
        f = angular.element('<a class="ui-reset" />'), c.wrap('<span class="ui-resetwrap" />').after(f), f.bind('click', function (c) {
          c.preventDefault(), a.$apply(function () {
            d.uiReset ? e.$setViewValue(a.$eval(d.uiReset)) : e.$setViewValue(b), e.$render();
          });
        });
      }
    };
  }
]), angular.module('ui.directives').directive('uiRoute', [
  '$location',
  '$parse',
  function (a, b) {
    return {
      restrict: 'AC',
      compile: function (c, d) {
        var e;
        if (d.uiRoute)
          e = 'uiRoute';
        else if (d.ngHref)
          e = 'ngHref';
        else {
          if (!d.href)
            throw new Error('uiRoute missing a route or href property on ' + c[0]);
          e = 'href';
        }
        return function (c, d, f) {
          function g(b) {
            (hash = b.indexOf('#')) > -1 && (b = b.substr(hash + 1)), j = function () {
              i(c, a.path().indexOf(b) > -1);
            }, j();
          }
          function h(b) {
            (hash = b.indexOf('#')) > -1 && (b = b.substr(hash + 1)), j = function () {
              var d = new RegExp('^' + b + '$', ['i']);
              i(c, d.test(a.path()));
            }, j();
          }
          var i = b(f.ngModel || f.routeModel || '$uiRoute').assign, j = angular.noop;
          switch (e) {
          case 'uiRoute':
            f.uiRoute ? h(f.uiRoute) : f.$observe('uiRoute', h);
            break;
          case 'ngHref':
            f.ngHref ? g(f.ngHref) : f.$observe('ngHref', g);
            break;
          case 'href':
            g(f.href);
          }
          c.$on('$routeChangeSuccess', function () {
            j();
          });
        };
      }
    };
  }
]), angular.module('ui.directives').directive('uiScrollfix', [
  '$window',
  function (a) {
    'use strict';
    return {
      link: function (b, c, d) {
        var e = c.offset().top;
        d.uiScrollfix ? '-' === d.uiScrollfix.charAt(0) ? d.uiScrollfix = e - d.uiScrollfix.substr(1) : '+' === d.uiScrollfix.charAt(0) && (d.uiScrollfix = e + parseFloat(d.uiScrollfix.substr(1))) : d.uiScrollfix = e, angular.element(a).on('scroll.ui-scrollfix', function () {
          var b;
          if (angular.isDefined(a.pageYOffset))
            b = a.pageYOffset;
          else {
            var e = document.compatMode && 'BackCompat' !== document.compatMode ? document.documentElement : document.body;
            b = e.scrollTop;
          }
          !c.hasClass('ui-scrollfix') && b > d.uiScrollfix ? c.addClass('ui-scrollfix') : c.hasClass('ui-scrollfix') && b < d.uiScrollfix && c.removeClass('ui-scrollfix');
        });
      }
    };
  }
]), angular.module('ui.directives').directive('uiSelect2', [
  'ui.config',
  '$timeout',
  function (a, b) {
    var c = {};
    return a.select2 && angular.extend(c, a.select2), {
      require: '?ngModel',
      compile: function (a, d) {
        var e, f, g, h = a.is('select'), i = void 0 !== d.multiple;
        return a.is('select') && (f = a.find('option[ng-repeat], option[data-ng-repeat]'), f.length && (g = f.attr('ng-repeat') || f.attr('data-ng-repeat'), e = jQuery.trim(g.split('|')[0]).split(' ').pop())), function (a, d, f, g) {
          var j = angular.extend({}, c, a.$eval(f.uiSelect2));
          if (h ? (delete j.multiple, delete j.initSelection) : i && (j.multiple = !0), g && (g.$render = function () {
              h ? d.select2('val', g.$modelValue) : i ? g.$modelValue ? angular.isArray(g.$modelValue) ? d.select2('data', g.$modelValue) : d.select2('val', g.$modelValue) : d.select2('data', []) : angular.isObject(g.$modelValue) ? d.select2('data', g.$modelValue) : d.select2('val', g.$modelValue);
            }, e && a.$watch(e, function (a) {
              a && b(function () {
                d.select2('val', g.$viewValue), d.trigger('change');
              });
            }), !h && (d.bind('change', function () {
              a.$apply(function () {
                g.$setViewValue(d.select2('data'));
              });
            }), j.initSelection))) {
            var k = j.initSelection;
            j.initSelection = function (a, b) {
              k(a, function (a) {
                g.$setViewValue(a), b(a);
              });
            };
          }
          f.$observe('disabled', function (a) {
            d.select2(a && 'disable' || 'enable');
          }), f.ngMultiple && a.$watch(f.ngMultiple, function () {
            d.select2(j);
          }), d.val(a.$eval(f.ngModel)), b(function () {
            d.select2(j), j.initSelection || h || g.$setViewValue(d.select2('data'));
          });
        };
      }
    };
  }
]), angular.module('ui.directives').directive('uiShow', [function () {
    return function (a, b, c) {
      a.$watch(c.uiShow, function (a) {
        a ? b.addClass('ui-show') : b.removeClass('ui-show');
      });
    };
  }]).directive('uiHide', [function () {
    return function (a, b, c) {
      a.$watch(c.uiHide, function (a) {
        a ? b.addClass('ui-hide') : b.removeClass('ui-hide');
      });
    };
  }]).directive('uiToggle', [function () {
    return function (a, b, c) {
      a.$watch(c.uiToggle, function (a) {
        a ? b.removeClass('ui-hide').addClass('ui-show') : b.removeClass('ui-show').addClass('ui-hide');
      });
    };
  }]), angular.module('ui.directives').directive('uiSortable', [
  'ui.config',
  function (a) {
    return {
      require: '?ngModel',
      link: function (b, c, d, e) {
        var f, g, h, i, j, k, l, m, n;
        j = angular.extend({}, a.sortable, b.$eval(d.uiSortable)), e && (e.$render = function () {
          c.sortable('refresh');
        }, h = function (a, b) {
          b.item.sortable = { index: b.item.index() };
        }, i = function (a, b) {
          b.item.sortable.resort = e;
        }, f = function (a, b) {
          b.item.sortable.relocate = !0, e.$modelValue.splice(b.item.index(), 0, b.item.sortable.moved);
        }, g = function (a, b) {
          b.item.sortable.moved = 1 === e.$modelValue.length ? e.$modelValue.splice(0, 1)[0] : e.$modelValue.splice(b.item.sortable.index, 1)[0];
        }, onStop = function (a, c) {
          if (c.item.sortable.resort && !c.item.sortable.relocate) {
            var d, e;
            e = c.item.sortable.index, d = c.item.index(), d > e && d--, c.item.sortable.resort.$modelValue.splice(d, 0, c.item.sortable.resort.$modelValue.splice(e, 1)[0]);
          }
          (c.item.sortable.resort || c.item.sortable.relocate) && b.$apply();
        }, m = j.start, j.start = function (a, b) {
          h(a, b), 'function' == typeof m && m(a, b);
        }, _stop = j.stop, j.stop = function (a, b) {
          onStop(a, b), 'function' == typeof _stop && _stop(a, b);
        }, n = j.update, j.update = function (a, b) {
          i(a, b), 'function' == typeof n && n(a, b);
        }, k = j.receive, j.receive = function (a, b) {
          f(a, b), 'function' == typeof k && k(a, b);
        }, l = j.remove, j.remove = function (a, b) {
          g(a, b), 'function' == typeof l && l(a, b);
        }), c.sortable(j);
      }
    };
  }
]), angular.module('ui.directives').directive('uiTinymce', [
  'ui.config',
  function (a) {
    return a.tinymce = a.tinymce || {}, {
      require: 'ngModel',
      link: function (b, c, d, e) {
        var f, g = {
            onchange_callback: function (a) {
              a.isDirty() && (a.save(), e.$setViewValue(c.val()), b.$$phase || b.$apply());
            },
            handle_event_callback: function () {
              return this.isDirty() && (this.save(), e.$setViewValue(c.val()), b.$$phase || b.$apply()), !0;
            },
            setup: function (a) {
              a.onSetContent.add(function (a) {
                a.isDirty() && (a.save(), e.$setViewValue(c.val()), b.$$phase || b.$apply());
              });
            }
          };
        f = d.uiTinymce ? b.$eval(d.uiTinymce) : {}, angular.extend(g, a.tinymce, f), setTimeout(function () {
          c.tinymce(g);
        });
      }
    };
  }
]), angular.module('ui.directives').directive('uiValidate', function () {
  return {
    restrict: 'A',
    require: 'ngModel',
    link: function (a, b, c, d) {
      var e, f, g = {}, h = a.$eval(c.uiValidate);
      h && (angular.isString(h) && (h = { validator: h }), angular.forEach(h, function (b, c) {
        e = function (e) {
          return a.$eval(b, { $value: e }) ? (d.$setValidity(c, !0), e) : (d.$setValidity(c, !1), void 0);
        }, g[c] = e, d.$formatters.push(e), d.$parsers.push(e);
      }), c.uiValidateWatch && (f = a.$eval(c.uiValidateWatch), angular.isString(f) ? a.$watch(f, function () {
        angular.forEach(g, function (a) {
          a(d.$modelValue);
        });
      }) : angular.forEach(f, function (b, c) {
        a.$watch(b, function () {
          g[c](d.$modelValue);
        });
      })));
    }
  };
}), angular.module('ui.filters').filter('format', function () {
  return function (a, b) {
    if (!a)
      return a;
    var c, d = a.toString();
    return void 0 === b ? d : angular.isArray(b) || angular.isObject(b) ? (c = angular.isArray(b) && '$' || ':', angular.forEach(b, function (a, b) {
      d = d.split(c + b).join(a);
    }), d) : d.split('$0').join(b);
  };
}), angular.module('ui.filters').filter('highlight', function () {
  return function (a, b, c) {
    return b || angular.isNumber(b) ? (a = a.toString(), b = b.toString(), c ? a.split(b).join('<span class="ui-match">' + b + '</span>') : a.replace(new RegExp(b, 'gi'), '<span class="ui-match">$&</span>')) : a;
  };
}), angular.module('ui.filters').filter('inflector', function () {
  function a(a) {
    return a.replace(/^([a-z])|\s+([a-z])/g, function (a) {
      return a.toUpperCase();
    });
  }
  function b(a, b) {
    return a.replace(/[A-Z]/g, function (a) {
      return b + a;
    });
  }
  var c = {
      humanize: function (c) {
        return a(b(c, ' ').split('_').join(' '));
      },
      underscore: function (a) {
        return a.substr(0, 1).toLowerCase() + b(a.substr(1), '_').toLowerCase().split(' ').join('_');
      },
      variable: function (b) {
        return b = b.substr(0, 1).toLowerCase() + a(b.split('_').join(' ')).substr(1).split(' ').join('');
      }
    };
  return function (a, b) {
    return b !== !1 && angular.isString(a) ? (b = b || 'humanize', c[b](a)) : a;
  };
}), angular.module('ui.filters').filter('unique', function () {
  return function (a, b) {
    if (b === !1)
      return a;
    if ((b || angular.isUndefined(b)) && angular.isArray(a)) {
      var c = [], d = function (a) {
          return angular.isObject(a) && angular.isString(b) ? a[b] : a;
        };
      angular.forEach(a, function (a) {
        for (var b = !1, e = 0; e < c.length; e++)
          if (angular.equals(d(c[e]), d(a))) {
            b = !0;
            break;
          }
        b || c.push(a);
      }), a = c;
    }
    return a;
  };
}), angular.module('http-auth-interceptor', []).provider('authService', function () {
  var a = [], b = [];
  this.addIgnoreUrlExpression = function (a) {
    return angular.isFunction(a) && b.push(a), this;
  }, this.shouldIgnoreUrl = function (a) {
    var c, d, e = b.length;
    for (d = 0; e > d; d++)
      if (c = b[d], c(a) === !0)
        return !0;
    return !1;
  }, this.pushToBuffer = function (b, c) {
    a.push({
      config: b,
      deferred: c
    });
  }, this.$get = [
    '$rootScope',
    '$injector',
    function (b, c) {
      function d(a, b) {
        f = f || c.get('$http'), f(a).then(function (a) {
          b.resolve(a);
        });
      }
      function e() {
        var b;
        for (b = 0; b < a.length; ++b)
          d(a[b].config, a[b].deferred);
        a = [];
      }
      var f;
      return {
        loginConfirmed: function (a) {
          b.$broadcast('event:auth-loginConfirmed', a), e();
        }
      };
    }
  ];
}).config([
  '$httpProvider',
  'authServiceProvider',
  function (a, b) {
    var c = [
        '$rootScope',
        '$q',
        function (a, c) {
          function d(a) {
            return a;
          }
          function e(d) {
            if (401 === d.status) {
              var e = c.defer();
              return b.shouldIgnoreUrl(d) || b.pushToBuffer(d.config, e), a.$broadcast('event:auth-loginRequired'), e.promise;
            }
            return c.reject(d);
          }
          return function (a) {
            return a.then(d, e);
          };
        }
      ];
    a.responseInterceptors.push(c);
  }
]), !function (a) {
  'use strict';
  a(function () {
    a.support.transition = function () {
      var a = function () {
          var a, b = document.createElement('bootstrap'), c = {
              WebkitTransition: 'webkitTransitionEnd',
              MozTransition: 'transitionend',
              OTransition: 'oTransitionEnd otransitionend',
              transition: 'transitionend'
            };
          for (a in c)
            if (void 0 !== b.style[a])
              return c[a];
        }();
      return a && { end: a };
    }();
  });
}(window.jQuery), !function (a) {
  'use strict';
  var b = function (b, c) {
    this.options = c, this.$element = a(b).delegate('[data-dismiss="modal"]', 'click.dismiss.modal', a.proxy(this.hide, this)), this.options.remote && this.$element.find('.modal-body').load(this.options.remote);
  };
  b.prototype = {
    constructor: b,
    toggle: function () {
      return this[this.isShown ? 'hide' : 'show']();
    },
    show: function () {
      var b = this, c = a.Event('show');
      this.$element.trigger(c), this.isShown || c.isDefaultPrevented() || (this.isShown = !0, this.escape(), this.backdrop(function () {
        var c = a.support.transition && b.$element.hasClass('fade');
        b.$element.parent().length || b.$element.appendTo(document.body), b.$element.show(), c && b.$element[0].offsetWidth, b.$element.addClass('in').attr('aria-hidden', !1), b.enforceFocus(), c ? b.$element.one(a.support.transition.end, function () {
          b.$element.focus().trigger('shown');
        }) : b.$element.focus().trigger('shown');
      }));
    },
    hide: function (b) {
      b && b.preventDefault(), b = a.Event('hide'), this.$element.trigger(b), this.isShown && !b.isDefaultPrevented() && (this.isShown = !1, this.escape(), a(document).off('focusin.modal'), this.$element.removeClass('in').attr('aria-hidden', !0), a.support.transition && this.$element.hasClass('fade') ? this.hideWithTransition() : this.hideModal());
    },
    enforceFocus: function () {
      var b = this;
      a(document).on('focusin.modal', function (a) {
        b.$element[0] === a.target || b.$element.has(a.target).length || b.$element.focus();
      });
    },
    escape: function () {
      var a = this;
      this.isShown && this.options.keyboard ? this.$element.on('keyup.dismiss.modal', function (b) {
        27 == b.which && a.hide();
      }) : this.isShown || this.$element.off('keyup.dismiss.modal');
    },
    hideWithTransition: function () {
      var b = this, c = setTimeout(function () {
          b.$element.off(a.support.transition.end), b.hideModal();
        }, 500);
      this.$element.one(a.support.transition.end, function () {
        clearTimeout(c), b.hideModal();
      });
    },
    hideModal: function () {
      var a = this;
      this.$element.hide(), this.backdrop(function () {
        a.removeBackdrop(), a.$element.trigger('hidden');
      });
    },
    removeBackdrop: function () {
      this.$backdrop && this.$backdrop.remove(), this.$backdrop = null;
    },
    backdrop: function (b) {
      var c = this.$element.hasClass('fade') ? 'fade' : '';
      if (this.isShown && this.options.backdrop) {
        var d = a.support.transition && c;
        if (this.$backdrop = a('<div class="modal-backdrop ' + c + '" />').appendTo(document.body), this.$backdrop.click('static' == this.options.backdrop ? a.proxy(this.$element[0].focus, this.$element[0]) : a.proxy(this.hide, this)), d && this.$backdrop[0].offsetWidth, this.$backdrop.addClass('in'), !b)
          return;
        d ? this.$backdrop.one(a.support.transition.end, b) : b();
      } else
        !this.isShown && this.$backdrop ? (this.$backdrop.removeClass('in'), a.support.transition && this.$element.hasClass('fade') ? this.$backdrop.one(a.support.transition.end, b) : b()) : b && b();
    }
  };
  var c = a.fn.modal;
  a.fn.modal = function (c) {
    return this.each(function () {
      var d = a(this), e = d.data('modal'), f = a.extend({}, a.fn.modal.defaults, d.data(), 'object' == typeof c && c);
      e || d.data('modal', e = new b(this, f)), 'string' == typeof c ? e[c]() : f.show && e.show();
    });
  }, a.fn.modal.defaults = {
    backdrop: !0,
    keyboard: !0,
    show: !0
  }, a.fn.modal.Constructor = b, a.fn.modal.noConflict = function () {
    return a.fn.modal = c, this;
  }, a(document).on('click.modal.data-api', '[data-toggle="modal"]', function (b) {
    var c = a(this), d = c.attr('href'), e = a(c.attr('data-target') || d && d.replace(/.*(?=#[^\s]+$)/, '')), f = e.data('modal') ? 'toggle' : a.extend({ remote: !/#/.test(d) && d }, e.data(), c.data());
    b.preventDefault(), e.modal(f).one('hide', function () {
      c.focus();
    });
  });
}(window.jQuery), !function (a) {
  'use strict';
  function b() {
    a(d).each(function () {
      c(a(this)).removeClass('open');
    });
  }
  function c(b) {
    var c, d = b.attr('data-target');
    return d || (d = b.attr('href'), d = d && /#/.test(d) && d.replace(/.*(?=#[^\s]*$)/, '')), c = d && a(d), c && c.length || (c = b.parent()), c;
  }
  var d = '[data-toggle=dropdown]', e = function (b) {
      var c = a(b).on('click.dropdown.data-api', this.toggle);
      a('html').on('click.dropdown.data-api', function () {
        c.parent().removeClass('open');
      });
    };
  e.prototype = {
    constructor: e,
    toggle: function () {
      var d, e, f = a(this);
      if (!f.is('.disabled, :disabled'))
        return d = c(f), e = d.hasClass('open'), b(), e || d.toggleClass('open'), f.focus(), !1;
    },
    keydown: function (b) {
      var e, f, g, h, i;
      if (/(38|40|27)/.test(b.keyCode) && (e = a(this), b.preventDefault(), b.stopPropagation(), !e.is('.disabled, :disabled'))) {
        if (g = c(e), h = g.hasClass('open'), !h || h && 27 == b.keyCode)
          return 27 == b.which && g.find(d).focus(), e.click();
        f = a('[role=menu] li:not(.divider):visible a', g), f.length && (i = f.index(f.filter(':focus')), 38 == b.keyCode && i > 0 && i--, 40 == b.keyCode && i < f.length - 1 && i++, ~i || (i = 0), f.eq(i).focus());
      }
    }
  };
  var f = a.fn.dropdown;
  a.fn.dropdown = function (b) {
    return this.each(function () {
      var c = a(this), d = c.data('dropdown');
      d || c.data('dropdown', d = new e(this)), 'string' == typeof b && d[b].call(c);
    });
  }, a.fn.dropdown.Constructor = e, a.fn.dropdown.noConflict = function () {
    return a.fn.dropdown = f, this;
  }, a(document).on('click.dropdown.data-api', b).on('click.dropdown.data-api', '.dropdown form', function (a) {
    a.stopPropagation();
  }).on('click.dropdown-menu', function (a) {
    a.stopPropagation();
  }).on('click.dropdown.data-api', d, e.prototype.toggle).on('keydown.dropdown.data-api', d + ', [role=menu]', e.prototype.keydown);
}(window.jQuery), !function (a) {
  'use strict';
  function b(b, c) {
    var d, e = a.proxy(this.process, this), f = a(b).is('body') ? a(window) : a(b);
    this.options = a.extend({}, a.fn.scrollspy.defaults, c), this.$scrollElement = f.on('scroll.scroll-spy.data-api', e), this.selector = (this.options.target || (d = a(b).attr('href')) && d.replace(/.*(?=#[^\s]+$)/, '') || '') + ' .nav li > a', this.$body = a('body'), this.refresh(), this.process();
  }
  b.prototype = {
    constructor: b,
    refresh: function () {
      var b, c = this;
      this.offsets = a([]), this.targets = a([]), b = this.$body.find(this.selector).map(function () {
        var b = a(this), d = b.data('target') || b.attr('href'), e = /^#\w/.test(d) && a(d);
        return e && e.length && [[
            e.position().top + (!a.isWindow(c.$scrollElement.get(0)) && c.$scrollElement.scrollTop()),
            d
          ]] || null;
      }).sort(function (a, b) {
        return a[0] - b[0];
      }).each(function () {
        c.offsets.push(this[0]), c.targets.push(this[1]);
      });
    },
    process: function () {
      var a, b = this.$scrollElement.scrollTop() + this.options.offset, c = this.$scrollElement[0].scrollHeight || this.$body[0].scrollHeight, d = c - this.$scrollElement.height(), e = this.offsets, f = this.targets, g = this.activeTarget;
      if (b >= d)
        return g != (a = f.last()[0]) && this.activate(a);
      for (a = e.length; a--;)
        g != f[a] && b >= e[a] && (!e[a + 1] || b <= e[a + 1]) && this.activate(f[a]);
    },
    activate: function (b) {
      var c, d;
      this.activeTarget = b, a(this.selector).parent('.active').removeClass('active'), d = this.selector + '[data-target="' + b + '"],' + this.selector + '[href="' + b + '"]', c = a(d).parent('li').addClass('active'), c.parent('.dropdown-menu').length && (c = c.closest('li.dropdown').addClass('active')), c.trigger('activate');
    }
  };
  var c = a.fn.scrollspy;
  a.fn.scrollspy = function (c) {
    return this.each(function () {
      var d = a(this), e = d.data('scrollspy'), f = 'object' == typeof c && c;
      e || d.data('scrollspy', e = new b(this, f)), 'string' == typeof c && e[c]();
    });
  }, a.fn.scrollspy.Constructor = b, a.fn.scrollspy.defaults = { offset: 10 }, a.fn.scrollspy.noConflict = function () {
    return a.fn.scrollspy = c, this;
  }, a(window).on('load', function () {
    a('[data-spy="scroll"]').each(function () {
      var b = a(this);
      b.scrollspy(b.data());
    });
  });
}(window.jQuery), !function (a) {
  'use strict';
  var b = function (b) {
    this.element = a(b);
  };
  b.prototype = {
    constructor: b,
    show: function () {
      var b, c, d, e = this.element, f = e.closest('ul:not(.dropdown-menu)'), g = e.attr('data-target');
      g || (g = e.attr('href'), g = g && g.replace(/.*(?=#[^\s]*$)/, '')), e.parent('li').hasClass('active') || (b = f.find('.active:last a')[0], d = a.Event('show', { relatedTarget: b }), e.trigger(d), d.isDefaultPrevented() || (c = a(g), this.activate(e.parent('li'), f), this.activate(c, c.parent(), function () {
        e.trigger({
          type: 'shown',
          relatedTarget: b
        });
      })));
    },
    activate: function (b, c, d) {
      function e() {
        f.removeClass('active').find('> .dropdown-menu > .active').removeClass('active'), b.addClass('active'), g ? (b[0].offsetWidth, b.addClass('in')) : b.removeClass('fade'), b.parent('.dropdown-menu') && b.closest('li.dropdown').addClass('active'), d && d();
      }
      var f = c.find('> .active'), g = d && a.support.transition && f.hasClass('fade');
      g ? f.one(a.support.transition.end, e) : e(), f.removeClass('in');
    }
  };
  var c = a.fn.tab;
  a.fn.tab = function (c) {
    return this.each(function () {
      var d = a(this), e = d.data('tab');
      e || d.data('tab', e = new b(this)), 'string' == typeof c && e[c]();
    });
  }, a.fn.tab.Constructor = b, a.fn.tab.noConflict = function () {
    return a.fn.tab = c, this;
  }, a(document).on('click.tab.data-api', '[data-toggle="tab"], [data-toggle="pill"]', function (b) {
    b.preventDefault(), a(this).tab('show');
  });
}(window.jQuery), !function (a) {
  'use strict';
  var b = function (a, b) {
    this.init('tooltip', a, b);
  };
  b.prototype = {
    constructor: b,
    init: function (b, c, d) {
      var e, f, g, h, i;
      for (this.type = b, this.$element = a(c), this.options = this.getOptions(d), this.enabled = !0, g = this.options.trigger.split(' '), i = g.length; i--;)
        h = g[i], 'click' == h ? this.$element.on('click.' + this.type, this.options.selector, a.proxy(this.toggle, this)) : 'manual' != h && (e = 'hover' == h ? 'mouseenter' : 'focus', f = 'hover' == h ? 'mouseleave' : 'blur', this.$element.on(e + '.' + this.type, this.options.selector, a.proxy(this.enter, this)), this.$element.on(f + '.' + this.type, this.options.selector, a.proxy(this.leave, this)));
      this.options.selector ? this._options = a.extend({}, this.options, {
        trigger: 'manual',
        selector: ''
      }) : this.fixTitle();
    },
    getOptions: function (b) {
      return b = a.extend({}, a.fn[this.type].defaults, this.$element.data(), b), b.delay && 'number' == typeof b.delay && (b.delay = {
        show: b.delay,
        hide: b.delay
      }), b;
    },
    enter: function (b) {
      var c, d = a.fn[this.type].defaults, e = {};
      return this._options && a.each(this._options, function (a, b) {
        d[a] != b && (e[a] = b);
      }, this), c = a(b.currentTarget)[this.type](e).data(this.type), c.options.delay && c.options.delay.show ? (clearTimeout(this.timeout), c.hoverState = 'in', this.timeout = setTimeout(function () {
        'in' == c.hoverState && c.show();
      }, c.options.delay.show), void 0) : c.show();
    },
    leave: function (b) {
      var c = a(b.currentTarget)[this.type](this._options).data(this.type);
      return this.timeout && clearTimeout(this.timeout), c.options.delay && c.options.delay.hide ? (c.hoverState = 'out', this.timeout = setTimeout(function () {
        'out' == c.hoverState && c.hide();
      }, c.options.delay.hide), void 0) : c.hide();
    },
    show: function () {
      var b, c, d, e, f, g, h = a.Event('show');
      if (this.hasContent() && this.enabled) {
        if (this.$element.trigger(h), h.isDefaultPrevented())
          return;
        switch (b = this.tip(), this.setContent(), this.options.animation && b.addClass('fade'), f = 'function' == typeof this.options.placement ? this.options.placement.call(this, b[0], this.$element[0]) : this.options.placement, b.detach().css({
            top: 0,
            left: 0,
            display: 'block'
          }), this.options.container ? b.appendTo(this.options.container) : b.insertAfter(this.$element), c = this.getPosition(), d = b[0].offsetWidth, e = b[0].offsetHeight, f) {
        case 'bottom':
          g = {
            top: c.top + c.height,
            left: c.left + c.width / 2 - d / 2
          };
          break;
        case 'top':
          g = {
            top: c.top - e,
            left: c.left + c.width / 2 - d / 2
          };
          break;
        case 'left':
          g = {
            top: c.top + c.height / 2 - e / 2,
            left: c.left - d
          };
          break;
        case 'right':
          g = {
            top: c.top + c.height / 2 - e / 2,
            left: c.left + c.width
          };
        }
        this.applyPlacement(g, f), this.$element.trigger('shown');
      }
    },
    applyPlacement: function (a, b) {
      var c, d, e, f, g = this.tip(), h = g[0].offsetWidth, i = g[0].offsetHeight;
      g.offset(a).addClass(b).addClass('in'), c = g[0].offsetWidth, d = g[0].offsetHeight, 'top' == b && d != i && (a.top = a.top + i - d, f = !0), 'bottom' == b || 'top' == b ? (e = 0, a.left < 0 && (e = -2 * a.left, a.left = 0, g.offset(a), c = g[0].offsetWidth, d = g[0].offsetHeight), this.replaceArrow(e - h + c, c, 'left')) : this.replaceArrow(d - i, d, 'top'), f && g.offset(a);
    },
    replaceArrow: function (a, b, c) {
      this.arrow().css(c, a ? 50 * (1 - a / b) + '%' : '');
    },
    setContent: function () {
      var a = this.tip(), b = this.getTitle();
      a.find('.tooltip-inner')[this.options.html ? 'html' : 'text'](b), a.removeClass('fade in top bottom left right');
    },
    hide: function () {
      function b() {
        var b = setTimeout(function () {
            c.off(a.support.transition.end).detach();
          }, 500);
        c.one(a.support.transition.end, function () {
          clearTimeout(b), c.detach();
        });
      }
      var c = this.tip(), d = a.Event('hide');
      return this.$element.trigger(d), d.isDefaultPrevented() ? void 0 : (c.removeClass('in'), a.support.transition && this.$tip.hasClass('fade') ? b() : c.detach(), this.$element.trigger('hidden'), this);
    },
    fixTitle: function () {
      var a = this.$element;
      (a.attr('title') || 'string' != typeof a.attr('data-original-title')) && a.attr('data-original-title', a.attr('title') || '').attr('title', '');
    },
    hasContent: function () {
      return this.getTitle();
    },
    getPosition: function () {
      var b = this.$element[0];
      return a.extend({}, 'function' == typeof b.getBoundingClientRect ? b.getBoundingClientRect() : {
        width: b.offsetWidth,
        height: b.offsetHeight
      }, this.$element.offset());
    },
    getTitle: function () {
      var a, b = this.$element, c = this.options;
      return a = b.attr('data-original-title') || ('function' == typeof c.title ? c.title.call(b[0]) : c.title);
    },
    tip: function () {
      return this.$tip = this.$tip || a(this.options.template);
    },
    arrow: function () {
      return this.$arrow = this.$arrow || this.tip().find('.tooltip-arrow');
    },
    validate: function () {
      this.$element[0].parentNode || (this.hide(), this.$element = null, this.options = null);
    },
    enable: function () {
      this.enabled = !0;
    },
    disable: function () {
      this.enabled = !1;
    },
    toggleEnabled: function () {
      this.enabled = !this.enabled;
    },
    toggle: function (b) {
      var c = b ? a(b.currentTarget)[this.type](this._options).data(this.type) : this;
      c.tip().hasClass('in') ? c.hide() : c.show();
    },
    destroy: function () {
      this.hide().$element.off('.' + this.type).removeData(this.type);
    }
  };
  var c = a.fn.tooltip;
  a.fn.tooltip = function (c) {
    return this.each(function () {
      var d = a(this), e = d.data('tooltip'), f = 'object' == typeof c && c;
      e || d.data('tooltip', e = new b(this, f)), 'string' == typeof c && e[c]();
    });
  }, a.fn.tooltip.Constructor = b, a.fn.tooltip.defaults = {
    animation: !0,
    placement: 'top',
    selector: !1,
    template: '<div class="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
    trigger: 'hover focus',
    title: '',
    delay: 0,
    html: !1,
    container: !1
  }, a.fn.tooltip.noConflict = function () {
    return a.fn.tooltip = c, this;
  };
}(window.jQuery), !function (a) {
  'use strict';
  var b = function (a, b) {
    this.init('popover', a, b);
  };
  b.prototype = a.extend({}, a.fn.tooltip.Constructor.prototype, {
    constructor: b,
    setContent: function () {
      var a = this.tip(), b = this.getTitle(), c = this.getContent();
      a.find('.popover-title')[this.options.html ? 'html' : 'text'](b), a.find('.popover-content')[this.options.html ? 'html' : 'text'](c), a.removeClass('fade top bottom left right in');
    },
    hasContent: function () {
      return this.getTitle() || this.getContent();
    },
    getContent: function () {
      var a, b = this.$element, c = this.options;
      return a = ('function' == typeof c.content ? c.content.call(b[0]) : c.content) || b.attr('data-content');
    },
    tip: function () {
      return this.$tip || (this.$tip = a(this.options.template)), this.$tip;
    },
    destroy: function () {
      this.hide().$element.off('.' + this.type).removeData(this.type);
    }
  });
  var c = a.fn.popover;
  a.fn.popover = function (c) {
    return this.each(function () {
      var d = a(this), e = d.data('popover'), f = 'object' == typeof c && c;
      e || d.data('popover', e = new b(this, f)), 'string' == typeof c && e[c]();
    });
  }, a.fn.popover.Constructor = b, a.fn.popover.defaults = a.extend({}, a.fn.tooltip.defaults, {
    placement: 'right',
    trigger: 'click',
    content: '',
    template: '<div class="popover"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
  }), a.fn.popover.noConflict = function () {
    return a.fn.popover = c, this;
  };
}(window.jQuery), !function (a) {
  'use strict';
  var b = function (b, c) {
    this.options = a.extend({}, a.fn.affix.defaults, c), this.$window = a(window).on('scroll.affix.data-api', a.proxy(this.checkPosition, this)).on('click.affix.data-api', a.proxy(function () {
      setTimeout(a.proxy(this.checkPosition, this), 1);
    }, this)), this.$element = a(b), this.checkPosition();
  };
  b.prototype.checkPosition = function () {
    if (this.$element.is(':visible')) {
      var b, c = a(document).height(), d = this.$window.scrollTop(), e = this.$element.offset(), f = this.options.offset, g = f.bottom, h = f.top, i = 'affix affix-top affix-bottom';
      'object' != typeof f && (g = h = f), 'function' == typeof h && (h = f.top()), 'function' == typeof g && (g = f.bottom()), b = null != this.unpin && d + this.unpin <= e.top ? !1 : null != g && e.top + this.$element.height() >= c - g ? 'bottom' : null != h && h >= d ? 'top' : !1, this.affixed !== b && (this.affixed = b, this.unpin = 'bottom' == b ? e.top - d : null, this.$element.removeClass(i).addClass('affix' + (b ? '-' + b : '')));
    }
  };
  var c = a.fn.affix;
  a.fn.affix = function (c) {
    return this.each(function () {
      var d = a(this), e = d.data('affix'), f = 'object' == typeof c && c;
      e || d.data('affix', e = new b(this, f)), 'string' == typeof c && e[c]();
    });
  }, a.fn.affix.Constructor = b, a.fn.affix.defaults = { offset: 0 }, a.fn.affix.noConflict = function () {
    return a.fn.affix = c, this;
  }, a(window).on('load', function () {
    a('[data-spy="affix"]').each(function () {
      var b = a(this), c = b.data();
      c.offset = c.offset || {}, c.offsetBottom && (c.offset.bottom = c.offsetBottom), c.offsetTop && (c.offset.top = c.offsetTop), b.affix(c);
    });
  });
}(window.jQuery), !function (a) {
  'use strict';
  var b = '[data-dismiss="alert"]', c = function (c) {
      a(c).on('click', b, this.close);
    };
  c.prototype.close = function (b) {
    function c() {
      d.trigger('closed').remove();
    }
    var d, e = a(this), f = e.attr('data-target');
    f || (f = e.attr('href'), f = f && f.replace(/.*(?=#[^\s]*$)/, '')), d = a(f), b && b.preventDefault(), d.length || (d = e.hasClass('alert') ? e : e.parent()), d.trigger(b = a.Event('close')), b.isDefaultPrevented() || (d.removeClass('in'), a.support.transition && d.hasClass('fade') ? d.on(a.support.transition.end, c) : c());
  };
  var d = a.fn.alert;
  a.fn.alert = function (b) {
    return this.each(function () {
      var d = a(this), e = d.data('alert');
      e || d.data('alert', e = new c(this)), 'string' == typeof b && e[b].call(d);
    });
  }, a.fn.alert.Constructor = c, a.fn.alert.noConflict = function () {
    return a.fn.alert = d, this;
  }, a(document).on('click.alert.data-api', b, c.prototype.close);
}(window.jQuery), !function (a) {
  'use strict';
  var b = function (b, c) {
    this.$element = a(b), this.options = a.extend({}, a.fn.button.defaults, c);
  };
  b.prototype.setState = function (a) {
    var b = 'disabled', c = this.$element, d = c.data(), e = c.is('input') ? 'val' : 'html';
    a += 'Text', d.resetText || c.data('resetText', c[e]()), c[e](d[a] || this.options[a]), setTimeout(function () {
      'loadingText' == a ? c.addClass(b).attr(b, b) : c.removeClass(b).removeAttr(b);
    }, 0);
  }, b.prototype.toggle = function () {
    var a = this.$element.closest('[data-toggle="buttons-radio"]');
    a && a.find('.active').removeClass('active'), this.$element.toggleClass('active');
  };
  var c = a.fn.button;
  a.fn.button = function (c) {
    return this.each(function () {
      var d = a(this), e = d.data('button'), f = 'object' == typeof c && c;
      e || d.data('button', e = new b(this, f)), 'toggle' == c ? e.toggle() : c && e.setState(c);
    });
  }, a.fn.button.defaults = { loadingText: 'loading...' }, a.fn.button.Constructor = b, a.fn.button.noConflict = function () {
    return a.fn.button = c, this;
  }, a(document).on('click.button.data-api', '[data-toggle^=button]', function (b) {
    var c = a(b.target);
    c.hasClass('btn') || (c = c.closest('.btn')), c.button('toggle');
  });
}(window.jQuery), !function (a) {
  'use strict';
  var b = function (b, c) {
    this.$element = a(b), this.options = a.extend({}, a.fn.collapse.defaults, c), this.options.parent && (this.$parent = a(this.options.parent)), this.options.toggle && this.toggle();
  };
  b.prototype = {
    constructor: b,
    dimension: function () {
      var a = this.$element.hasClass('width');
      return a ? 'width' : 'height';
    },
    show: function () {
      var b, c, d, e;
      if (!this.transitioning && !this.$element.hasClass('in')) {
        if (b = this.dimension(), c = a.camelCase([
            'scroll',
            b
          ].join('-')), d = this.$parent && this.$parent.find('> .accordion-group > .in'), d && d.length) {
          if (e = d.data('collapse'), e && e.transitioning)
            return;
          d.collapse('hide'), e || d.data('collapse', null);
        }
        this.$element[b](0), this.transition('addClass', a.Event('show'), 'shown'), a.support.transition && this.$element[b](this.$element[0][c]);
      }
    },
    hide: function () {
      var b;
      !this.transitioning && this.$element.hasClass('in') && (b = this.dimension(), this.reset(this.$element[b]()), this.transition('removeClass', a.Event('hide'), 'hidden'), this.$element[b](0));
    },
    reset: function (a) {
      var b = this.dimension();
      return this.$element.removeClass('collapse')[b](a || 'auto')[0].offsetWidth, this.$element[null !== a ? 'addClass' : 'removeClass']('collapse'), this;
    },
    transition: function (b, c, d) {
      var e = this, f = function () {
          'show' == c.type && e.reset(), e.transitioning = 0, e.$element.trigger(d);
        };
      this.$element.trigger(c), c.isDefaultPrevented() || (this.transitioning = 1, this.$element[b]('in'), a.support.transition && this.$element.hasClass('collapse') ? this.$element.one(a.support.transition.end, f) : f());
    },
    toggle: function () {
      this[this.$element.hasClass('in') ? 'hide' : 'show']();
    }
  };
  var c = a.fn.collapse;
  a.fn.collapse = function (c) {
    return this.each(function () {
      var d = a(this), e = d.data('collapse'), f = a.extend({}, a.fn.collapse.defaults, d.data(), 'object' == typeof c && c);
      e || d.data('collapse', e = new b(this, f)), 'string' == typeof c && e[c]();
    });
  }, a.fn.collapse.defaults = { toggle: !0 }, a.fn.collapse.Constructor = b, a.fn.collapse.noConflict = function () {
    return a.fn.collapse = c, this;
  }, a(document).on('click.collapse.data-api', '[data-toggle=collapse]', function (b) {
    var c, d = a(this), e = d.attr('data-target') || b.preventDefault() || (c = d.attr('href')) && c.replace(/.*(?=#[^\s]+$)/, ''), f = a(e).data('collapse') ? 'toggle' : d.data();
    d[a(e).hasClass('in') ? 'addClass' : 'removeClass']('collapsed'), a(e).collapse(f);
  });
}(window.jQuery), !function (a) {
  'use strict';
  var b = function (b, c) {
    this.$element = a(b), this.$indicators = this.$element.find('.carousel-indicators'), this.options = c, 'hover' == this.options.pause && this.$element.on('mouseenter', a.proxy(this.pause, this)).on('mouseleave', a.proxy(this.cycle, this));
  };
  b.prototype = {
    cycle: function (b) {
      return b || (this.paused = !1), this.interval && clearInterval(this.interval), this.options.interval && !this.paused && (this.interval = setInterval(a.proxy(this.next, this), this.options.interval)), this;
    },
    getActiveIndex: function () {
      return this.$active = this.$element.find('.item.active'), this.$items = this.$active.parent().children(), this.$items.index(this.$active);
    },
    to: function (b) {
      var c = this.getActiveIndex(), d = this;
      if (!(b > this.$items.length - 1 || 0 > b))
        return this.sliding ? this.$element.one('slid', function () {
          d.to(b);
        }) : c == b ? this.pause().cycle() : this.slide(b > c ? 'next' : 'prev', a(this.$items[b]));
    },
    pause: function (b) {
      return b || (this.paused = !0), this.$element.find('.next, .prev').length && a.support.transition.end && (this.$element.trigger(a.support.transition.end), this.cycle(!0)), clearInterval(this.interval), this.interval = null, this;
    },
    next: function () {
      return this.sliding ? void 0 : this.slide('next');
    },
    prev: function () {
      return this.sliding ? void 0 : this.slide('prev');
    },
    slide: function (b, c) {
      var d, e = this.$element.find('.item.active'), f = c || e[b](), g = this.interval, h = 'next' == b ? 'left' : 'right', i = 'next' == b ? 'first' : 'last', j = this;
      if (this.sliding = !0, g && this.pause(), f = f.length ? f : this.$element.find('.item')[i](), d = a.Event('slide', {
          relatedTarget: f[0],
          direction: h
        }), !f.hasClass('active')) {
        if (this.$indicators.length && (this.$indicators.find('.active').removeClass('active'), this.$element.one('slid', function () {
            var b = a(j.$indicators.children()[j.getActiveIndex()]);
            b && b.addClass('active');
          })), a.support.transition && this.$element.hasClass('slide')) {
          if (this.$element.trigger(d), d.isDefaultPrevented())
            return;
          f.addClass(b), f[0].offsetWidth, e.addClass(h), f.addClass(h), this.$element.one(a.support.transition.end, function () {
            f.removeClass([
              b,
              h
            ].join(' ')).addClass('active'), e.removeClass([
              'active',
              h
            ].join(' ')), j.sliding = !1, setTimeout(function () {
              j.$element.trigger('slid');
            }, 0);
          });
        } else {
          if (this.$element.trigger(d), d.isDefaultPrevented())
            return;
          e.removeClass('active'), f.addClass('active'), this.sliding = !1, this.$element.trigger('slid');
        }
        return g && this.cycle(), this;
      }
    }
  };
  var c = a.fn.carousel;
  a.fn.carousel = function (c) {
    return this.each(function () {
      var d = a(this), e = d.data('carousel'), f = a.extend({}, a.fn.carousel.defaults, 'object' == typeof c && c), g = 'string' == typeof c ? c : f.slide;
      e || d.data('carousel', e = new b(this, f)), 'number' == typeof c ? e.to(c) : g ? e[g]() : f.interval && e.pause().cycle();
    });
  }, a.fn.carousel.defaults = {
    interval: 5000,
    pause: 'hover'
  }, a.fn.carousel.Constructor = b, a.fn.carousel.noConflict = function () {
    return a.fn.carousel = c, this;
  }, a(document).on('click.carousel.data-api', '[data-slide], [data-slide-to]', function (b) {
    var c, d, e = a(this), f = a(e.attr('data-target') || (c = e.attr('href')) && c.replace(/.*(?=#[^\s]+$)/, '')), g = a.extend({}, f.data(), e.data());
    f.carousel(g), (d = e.attr('data-slide-to')) && f.data('carousel').pause().to(d).cycle(), b.preventDefault();
  });
}(window.jQuery), !function (a) {
  'use strict';
  var b = function (b, c) {
    this.$element = a(b), this.options = a.extend({}, a.fn.typeahead.defaults, c), this.matcher = this.options.matcher || this.matcher, this.sorter = this.options.sorter || this.sorter, this.highlighter = this.options.highlighter || this.highlighter, this.updater = this.options.updater || this.updater, this.source = this.options.source, this.$menu = a(this.options.menu), this.shown = !1, this.listen();
  };
  b.prototype = {
    constructor: b,
    select: function () {
      var a = this.$menu.find('.active').attr('data-value');
      return this.$element.val(this.updater(a)).change(), this.hide();
    },
    updater: function (a) {
      return a;
    },
    show: function () {
      var b = a.extend({}, this.$element.position(), { height: this.$element[0].offsetHeight });
      return this.$menu.insertAfter(this.$element).css({
        top: b.top + b.height,
        left: b.left
      }).show(), this.shown = !0, this;
    },
    hide: function () {
      return this.$menu.hide(), this.shown = !1, this;
    },
    lookup: function () {
      var b;
      return this.query = this.$element.val(), !this.query || this.query.length < this.options.minLength ? this.shown ? this.hide() : this : (b = a.isFunction(this.source) ? this.source(this.query, a.proxy(this.process, this)) : this.source, b ? this.process(b) : this);
    },
    process: function (b) {
      var c = this;
      return b = a.grep(b, function (a) {
        return c.matcher(a);
      }), b = this.sorter(b), b.length ? this.render(b.slice(0, this.options.items)).show() : this.shown ? this.hide() : this;
    },
    matcher: function (a) {
      return ~a.toLowerCase().indexOf(this.query.toLowerCase());
    },
    sorter: function (a) {
      for (var b, c = [], d = [], e = []; b = a.shift();)
        b.toLowerCase().indexOf(this.query.toLowerCase()) ? ~b.indexOf(this.query) ? d.push(b) : e.push(b) : c.push(b);
      return c.concat(d, e);
    },
    highlighter: function (a) {
      var b = this.query.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, '\\$&');
      return a.replace(new RegExp('(' + b + ')', 'ig'), function (a, b) {
        return '<strong>' + b + '</strong>';
      });
    },
    render: function (b) {
      var c = this;
      return b = a(b).map(function (b, d) {
        return b = a(c.options.item).attr('data-value', d), b.find('a').html(c.highlighter(d)), b[0];
      }), b.first().addClass('active'), this.$menu.html(b), this;
    },
    next: function () {
      var b = this.$menu.find('.active').removeClass('active'), c = b.next();
      c.length || (c = a(this.$menu.find('li')[0])), c.addClass('active');
    },
    prev: function () {
      var a = this.$menu.find('.active').removeClass('active'), b = a.prev();
      b.length || (b = this.$menu.find('li').last()), b.addClass('active');
    },
    listen: function () {
      this.$element.on('focus', a.proxy(this.focus, this)).on('blur', a.proxy(this.blur, this)).on('keypress', a.proxy(this.keypress, this)).on('keyup', a.proxy(this.keyup, this)), this.eventSupported('keydown') && this.$element.on('keydown', a.proxy(this.keydown, this)), this.$menu.on('click', a.proxy(this.click, this)).on('mouseenter', 'li', a.proxy(this.mouseenter, this)).on('mouseleave', 'li', a.proxy(this.mouseleave, this));
    },
    eventSupported: function (a) {
      var b = a in this.$element;
      return b || (this.$element.setAttribute(a, 'return;'), b = 'function' == typeof this.$element[a]), b;
    },
    move: function (a) {
      if (this.shown) {
        switch (a.keyCode) {
        case 9:
        case 13:
        case 27:
          a.preventDefault();
          break;
        case 38:
          a.preventDefault(), this.prev();
          break;
        case 40:
          a.preventDefault(), this.next();
        }
        a.stopPropagation();
      }
    },
    keydown: function (b) {
      this.suppressKeyPressRepeat = ~a.inArray(b.keyCode, [
        40,
        38,
        9,
        13,
        27
      ]), this.move(b);
    },
    keypress: function (a) {
      this.suppressKeyPressRepeat || this.move(a);
    },
    keyup: function (a) {
      switch (a.keyCode) {
      case 40:
      case 38:
      case 16:
      case 17:
      case 18:
        break;
      case 9:
      case 13:
        if (!this.shown)
          return;
        this.select();
        break;
      case 27:
        if (!this.shown)
          return;
        this.hide();
        break;
      default:
        this.lookup();
      }
      a.stopPropagation(), a.preventDefault();
    },
    focus: function () {
      this.focused = !0;
    },
    blur: function () {
      this.focused = !1, !this.mousedover && this.shown && this.hide();
    },
    click: function (a) {
      a.stopPropagation(), a.preventDefault(), this.select(), this.$element.focus();
    },
    mouseenter: function (b) {
      this.mousedover = !0, this.$menu.find('.active').removeClass('active'), a(b.currentTarget).addClass('active');
    },
    mouseleave: function () {
      this.mousedover = !1, !this.focused && this.shown && this.hide();
    }
  };
  var c = a.fn.typeahead;
  a.fn.typeahead = function (c) {
    return this.each(function () {
      var d = a(this), e = d.data('typeahead'), f = 'object' == typeof c && c;
      e || d.data('typeahead', e = new b(this, f)), 'string' == typeof c && e[c]();
    });
  }, a.fn.typeahead.defaults = {
    source: [],
    items: 8,
    menu: '<ul class="typeahead dropdown-menu"></ul>',
    item: '<li><a href="#"></a></li>',
    minLength: 1
  }, a.fn.typeahead.Constructor = b, a.fn.typeahead.noConflict = function () {
    return a.fn.typeahead = c, this;
  }, a(document).on('focus.typeahead.data-api', '[data-provide="typeahead"]', function () {
    var b = a(this);
    b.data('typeahead') || b.typeahead(b.data());
  });
}(window.jQuery), window.Picker = function (a, b, c) {
  function d(e, f, g, h) {
    function i() {
      return d._.node('div', d._.node('div', d._.node('div', d._.node('div', p.component.nodes(k.open), m.box), m.wrap), m.frame), m.holder);
    }
    function j(a) {
      a.stopPropagation(), 'focus' == a.type && p.$root.addClass(m.focused), p.open();
    }
    if (!e)
      return d;
    var k = { id: Math.abs(~~(1000000000 * Math.random())) }, l = g ? a.extend(!0, {}, g.defaults, h) : h || {}, m = a.extend({}, d.klasses(), l.klass), n = a(e), o = function () {
        return this.start();
      }, p = o.prototype = {
        constructor: o,
        $node: n,
        start: function () {
          return k && k.start ? p : (k.methods = {}, k.start = !0, k.open = !1, k.type = e.type, e.autofocus = e == document.activeElement, e.type = 'text', e.readOnly = !0, p.component = new g(p, l), p.$root = a(d._.node('div', i(), m.picker)).on({
            focusin: function (a) {
              p.$root.removeClass(m.focused), a.stopPropagation();
            },
            mousedown: function (a) {
              a.target != p.$root.children()[0] && a.stopPropagation();
            },
            click: function (b) {
              var c = b.target, f = c.attributes.length ? a(c) : a(c).closest('[data-pick]'), g = f.data();
              c != p.$root.children()[0] && (b.stopPropagation(), p.$root.find(document.activeElement).length || e.focus(), g.nav && !f.hasClass(m.navDisabled) ? p.set('highlight', p.component.item.highlight, { nav: g.nav }) : d._.isInteger(g.pick) && !f.hasClass(m.disabled) ? p.set('select', g.pick).close(!0) : g.clear && p.clear().close(!0));
            }
          }), p._hidden = l.formatSubmit ? a('<input type=hidden name=' + e.name + (l.hiddenSuffix || '_submit') + (n.data('value') ? ' value="' + d._.trigger(p.component.formats.toString, p.component, [
            l.formatSubmit,
            p.component.item.select
          ]) + '"' : '') + '>')[0] : c, n.addClass(m.input).on('focus.P' + k.id + ' click.P' + k.id, j).on('change.P' + k.id, function () {
            p._hidden && (p._hidden.value = e.value ? d._.trigger(p.component.formats.toString, p.component, [
              l.formatSubmit,
              p.component.item.select
            ]) : '');
          }).on('keydown.P' + k.id, function (a) {
            var b = a.keyCode, c = /^(8|46)$/.test(b);
            return 27 == b ? (p.close(), !1) : ((32 == b || c || !k.open && p.component.key[b]) && (a.preventDefault(), a.stopPropagation(), c ? p.clear().close() : p.open()), void 0);
          }).val(n.data('value') ? d._.trigger(p.component.formats.toString, p.component, [
            l.format,
            p.component.item.select
          ]) : e.value).after(p._hidden).data(f, p), l.container ? a(l.container).append(p.$root) : n.after(p.$root), p.on({
            start: p.component.onStart,
            render: p.component.onRender,
            stop: p.component.onStop,
            open: p.component.onOpen,
            close: p.component.onClose,
            set: p.component.onSet
          }).on({
            start: l.onStart,
            render: l.onRender,
            stop: l.onStop,
            open: l.onOpen,
            close: l.onClose,
            set: l.onSet
          }), e.autofocus && p.open(), p.trigger('start').trigger('render'));
        },
        render: function (a) {
          return a ? p.$root.html(i()) : p.$root.find('.' + m.box).html(p.component.nodes(k.open)), p.trigger('render');
        },
        stop: function () {
          return k.start ? (p.close(), p._hidden && p._hidden.parentNode.removeChild(p._hidden), p.$root.remove(), n.removeClass(m.input).off('.P' + k.id).removeData(f), e.type = k.type, e.readOnly = !1, p.trigger('stop'), k.methods = {}, k.start = !1, p) : p;
        },
        open: function (a) {
          return k.open ? p : (n.addClass(m.active), p.$root.addClass(m.opened), a !== !1 && (k.open = !0, n.focus(), b.on('click.P' + k.id + ' focusin.P' + k.id, function (a) {
            a.target != e && a.target != document && p.close();
          }).on('keydown.P' + k.id, function (a) {
            var b = a.keyCode, c = p.component.key[b], f = a.target;
            27 == b ? p.close(!0) : f != e || !c && 13 != b ? p.$root.find(f).length && 13 == b && (a.preventDefault(), f.click()) : (a.preventDefault(), c ? d._.trigger(p.component.key.go, p, [c]) : p.$root.find('.' + m.highlighted).hasClass(m.disabled) || p.set('select', p.component.item.highlight).close());
          })), p.trigger('open'));
        },
        close: function (a) {
          return a && (n.off('focus.P' + k.id).focus(), setTimeout(function () {
            n.on('focus.P' + k.id, j);
          }, 0)), n.removeClass(m.active), p.$root.removeClass(m.opened + ' ' + m.focused), k.open && (k.open = !1, b.off('.P' + k.id)), p.trigger('close');
        },
        clear: function () {
          return p.set('clear');
        },
        set: function (a, b, c) {
          var e, f, g = d._.isObject(a), h = g ? a : {};
          if (a) {
            g || (h[a] = b);
            for (e in h)
              f = h[e], p.component.item[e] && p.component.set(e, f, c || {}), ('select' == e || 'clear' == e) && n.val('clear' == e ? '' : d._.trigger(p.component.formats.toString, p.component, [
                l.format,
                p.component.get(e)
              ])).trigger('change');
            p.render();
          }
          return p.trigger('set', h);
        },
        get: function (a, b) {
          return a = a || 'value', null != k[a] ? k[a] : 'value' == a ? e.value : p.component.item[a] ? 'string' == typeof b ? d._.trigger(p.component.formats.toString, p.component, [
            b,
            p.component.get(a)
          ]) : p.component.get(a) : void 0;
        },
        on: function (a, b) {
          var c, e, f = d._.isObject(a), g = f ? a : {};
          if (a) {
            f || (g[a] = b);
            for (c in g)
              e = g[c], k.methods[c] = k.methods[c] || [], k.methods[c].push(e);
          }
          return p;
        },
        trigger: function (a, b) {
          var c = k.methods[a];
          return c && c.map(function (a) {
            d._.trigger(a, p, [b]);
          }), p;
        }
      };
    return new o();
  }
  return d.klasses = function (a) {
    return a = a || 'picker', {
      picker: a,
      opened: a + '--opened',
      focused: a + '--focused',
      input: a + '__input',
      active: a + '__input--active',
      holder: a + '__holder',
      frame: a + '__frame',
      wrap: a + '__wrap',
      box: a + '__box'
    };
  }, d._ = {
    group: function (a) {
      for (var b, c = '', e = d._.trigger(a.min, a); e <= d._.trigger(a.max, a, [e]); e += a.i)
        b = d._.trigger(a.item, a, [e]), c += d._.node(a.node, b[0], b[1], b[2]);
      return c;
    },
    node: function (a, b, c, d) {
      return b ? (b = Array.isArray(b) ? b.join('') : b, c = c ? ' class="' + c + '"' : '', d = d ? ' ' + d : '', '<' + a + c + d + '>' + b + '</' + a + '>') : '';
    },
    lead: function (a) {
      return (10 > a ? '0' : '') + a;
    },
    trigger: function (a, b, c) {
      return 'function' == typeof a ? a.apply(b, c || []) : a;
    },
    digits: function (a) {
      return /\d/.test(a[1]) ? 2 : 1;
    },
    isObject: function (a) {
      return {}.toString.call(a).indexOf('Object') > -1;
    },
    isDate: function (a) {
      return {}.toString.call(a).indexOf('Date') > -1 && this.isInteger(a.getDate());
    },
    isInteger: function (a) {
      return {}.toString.call(a).indexOf('Number') > -1 && 0 === a % 1;
    }
  }, d.extend = function (b, c) {
    a.fn[b] = function (e, f) {
      var g = this.data(b);
      return 'picker' == e ? g : g && 'string' == typeof e ? (d._.trigger(g[e], g, [f]), this) : this.each(function () {
        var f = a(this);
        f.data(b) || new d(this, b, c, e);
      });
    }, a.fn[b].defaults = c.defaults;
  }, d;
}(jQuery, jQuery(document)), function () {
  function a(a, b) {
    var c = this, d = a.$node[0].value, e = a.$node.data('value'), f = e || d, g = e ? b.formatSubmit : b.format;
    c.settings = b, c.queue = {
      min: 'measure create',
      max: 'measure create',
      now: 'now create',
      select: 'parse create validate',
      highlight: 'navigate create validate',
      view: 'create validate viewset',
      disable: 'flipItem',
      enable: 'flipItem'
    }, c.item = {}, c.item.disable = (b.disable || []).slice(0), c.item.enable = -function (a) {
      return a[0] === !0 ? a.shift() : -1;
    }(c.item.disable), c.set('min', b.min).set('max', b.max).set('now').set('select', f || c.item.now, {
      format: g,
      data: function (a) {
        return f && (a.indexOf('mm') > -1 || a.indexOf('m') > -1);
      }(c.formats.toArray(g))
    }), c.key = {
      40: 7,
      38: -7,
      39: 1,
      37: -1,
      go: function (a) {
        c.set('highlight', [
          c.item.highlight.year,
          c.item.highlight.month,
          c.item.highlight.date + a
        ], { interval: a }), this.render();
      }
    }, a.on('render', function () {
      a.$root.find('.' + b.klass.selectMonth).on('change', function () {
        a.set('highlight', [
          a.get('view').year,
          this.value,
          a.get('highlight').date
        ]), a.$root.find('.' + b.klass.selectMonth).focus();
      }), a.$root.find('.' + b.klass.selectYear).on('change', function () {
        a.set('highlight', [
          this.value,
          a.get('view').month,
          a.get('highlight').date
        ]), a.$root.find('.' + b.klass.selectYear).focus();
      });
    }).on('open', function () {
      a.$root.find('button, select').attr('disabled', !1);
    }).on('close', function () {
      a.$root.find('button, select').attr('disabled', !0);
    });
  }
  var b = 7, c = 6;
  a.prototype.set = function (a, b, c) {
    var d = this;
    return d.item['enable' == a ? 'disable' : 'flip' == a ? 'enable' : a] = d.queue[a].split(' ').map(function (e) {
      return b = d[e](a, b, c);
    }).pop(), 'select' == a ? d.set('highlight', d.item.select, c) : 'highlight' == a ? d.set('view', d.item.highlight, c) : ('flip' == a || 'min' == a || 'max' == a || 'disable' == a || 'enable' == a) && d.item.select && d.item.highlight && d.set('select', d.item.select, c).set('highlight', d.item.highlight, c), d;
  }, a.prototype.get = function (a) {
    return this.item[a];
  }, a.prototype.create = function (a, b, c) {
    var d, e = this;
    return b = void 0 === b ? a : b, b == -1 / 0 || 1 / 0 == b ? d = b : Picker._.isObject(b) && Picker._.isInteger(b.pick) ? b = b.obj : Array.isArray(b) ? (b = new Date(b[0], b[1], b[2]), b = Picker._.isDate(b) ? b : e.create().obj) : b = Picker._.isInteger(b) || Picker._.isDate(b) ? e.normalize(new Date(b), c) : e.now(a, b, c), {
      year: d || b.getFullYear(),
      month: d || b.getMonth(),
      date: d || b.getDate(),
      day: d || b.getDay(),
      obj: d || b,
      pick: d || b.getTime()
    };
  }, a.prototype.now = function (a, b, c) {
    return b = new Date(), c && c.rel && b.setDate(b.getDate() + c.rel), this.normalize(b, c);
  }, a.prototype.navigate = function (a, b, c) {
    if (Picker._.isObject(b)) {
      for (var d = new Date(b.year, b.month + (c && c.nav ? c.nav : 0), 1), e = d.getFullYear(), f = d.getMonth(), g = b.date; Picker._.isDate(d) && new Date(e, f, g).getMonth() !== f;)
        g -= 1;
      b = [
        e,
        f,
        g
      ];
    }
    return b;
  }, a.prototype.normalize = function (a) {
    return a.setHours(0, 0, 0, 0), a;
  }, a.prototype.measure = function (a, b) {
    var c = this;
    return b ? Picker._.isInteger(b) && (b = c.now(a, b, { rel: b })) : b = 'min' == a ? -1 / 0 : 1 / 0, b;
  }, a.prototype.viewset = function (a, b) {
    return this.create([
      b.year,
      b.month,
      1
    ]);
  }, a.prototype.validate = function (a, b, c) {
    var d, e, f, g, h = this, i = b, j = c && c.interval ? c.interval : 1, k = -1 === h.item.enable, l = h.item.min, m = h.item.max, n = k && h.item.disable.filter(function (a) {
        if (Array.isArray(a)) {
          var c = h.create(a).pick;
          c < b.pick ? d = !0 : c > b.pick && (e = !0);
        }
        return Picker._.isInteger(a);
      }).length;
    if (!c.nav && (!k && h.disabled(b) || k && h.disabled(b) && (n || d || e) || b.pick <= l.pick || b.pick >= m.pick))
      for (k && !n && (!e && j > 0 || !d && 0 > j) && (j *= -1); h.disabled(b) && (Math.abs(j) > 1 && (b.month < i.month || b.month > i.month) && (b = i, j = Math.abs(j) / j), b.pick <= l.pick ? (f = !0, j = 1) : b.pick >= m.pick && (g = !0, j = -1), !f || !g);)
        b = h.create([
          b.year,
          b.month,
          b.date + j
        ]);
    return b;
  }, a.prototype.disabled = function (a) {
    var b = this, c = b.item.disable.filter(function (c) {
        return Picker._.isInteger(c) ? a.day === (b.settings.firstDay ? c : c - 1) % 7 : Array.isArray(c) ? a.pick === b.create(c).pick : void 0;
      }).length;
    return a.pick < b.item.min.pick || a.pick > b.item.max.pick || -1 === b.item.enable ? !c : c;
  }, a.prototype.parse = function (a, b, c) {
    var d = this, e = {};
    if (!b || Picker._.isInteger(b) || Array.isArray(b) || Picker._.isDate(b) || Picker._.isObject(b) && Picker._.isInteger(b.pick))
      return b;
    if (!c || !c.format)
      throw 'Need a formatting option to parse this..';
    return d.formats.toArray(c.format).map(function (a) {
      var c = d.formats[a], f = c ? Picker._.trigger(c, d, [
          b,
          e
        ]) : a.replace(/^!/, '').length;
      c && (e[a] = b.substr(0, f)), b = b.substr(f);
    }), [
      e.yyyy || e.yy,
      +(e.mm || e.m) - (c.data ? 1 : 0),
      e.dd || e.d
    ];
  }, a.prototype.formats = function () {
    function a(a, b, c) {
      var d = a.match(/\w+/)[0];
      return c.mm || c.m || (c.m = b.indexOf(d)), d.length;
    }
    function b(a) {
      return a.match(/\w+/)[0].length;
    }
    return {
      d: function (a, b) {
        return a ? Picker._.digits(a) : b.date;
      },
      dd: function (a, b) {
        return a ? 2 : Picker._.lead(b.date);
      },
      ddd: function (a, c) {
        return a ? b(a) : this.settings.weekdaysShort[c.day];
      },
      dddd: function (a, c) {
        return a ? b(a) : this.settings.weekdaysFull[c.day];
      },
      m: function (a, b) {
        return a ? Picker._.digits(a) : b.month + 1;
      },
      mm: function (a, b) {
        return a ? 2 : Picker._.lead(b.month + 1);
      },
      mmm: function (b, c) {
        var d = this.settings.monthsShort;
        return b ? a(b, d, c) : d[c.month];
      },
      mmmm: function (b, c) {
        var d = this.settings.monthsFull;
        return b ? a(b, d, c) : d[c.month];
      },
      yy: function (a, b) {
        return a ? 2 : ('' + b.year).slice(2);
      },
      yyyy: function (a, b) {
        return a ? 4 : b.year;
      },
      toArray: function (a) {
        return a.split(/(d{1,4}|m{1,4}|y{4}|yy|!.)/g);
      },
      toString: function (a, b) {
        var c = this;
        return c.formats.toArray(a).map(function (a) {
          return Picker._.trigger(c.formats[a], c, [
            0,
            b
          ]) || a.replace(/^!/, '');
        }).join('');
      }
    };
  }(), a.prototype.flipItem = function (a, b) {
    var c = this, d = c.item.disable, e = -1 === c.item.enable;
    return 'flip' == b ? c.item.enable = e ? 1 : -1 : !e && 'enable' == a || e && 'disable' == a ? d = c.removeDisabled(d, b) : (!e && 'disable' == a || e && 'enable' == a) && (d = c.addDisabled(d, b)), d;
  }, a.prototype.addDisabled = function (a, b) {
    var c = this;
    return b.map(function (b) {
      c.filterDisabled(a, b).length || a.push(b);
    }), a;
  }, a.prototype.removeDisabled = function (a, b) {
    var c = this;
    return b.map(function (b) {
      a = c.filterDisabled(a, b, 1);
    }), a;
  }, a.prototype.filterDisabled = function (a, b, c) {
    var d = Array.isArray(b);
    return a.filter(function (a) {
      var e = !d && b === a || d && Array.isArray(a) && b.toString() === a.toString();
      return c ? !e : e;
    });
  }, a.prototype.nodes = function (a) {
    var d = this, e = d.settings, f = d.item.now, g = d.item.select, h = d.item.highlight, i = d.item.view, j = d.item.disable, k = d.item.min, l = d.item.max, m = function (a) {
        return e.firstDay && a.push(a.shift()), Picker._.node('thead', Picker._.group({
          min: 0,
          max: b - 1,
          i: 1,
          node: 'th',
          item: function (b) {
            return [
              a[b],
              e.klass.weekdays
            ];
          }
        }));
      }((e.showWeekdaysFull ? e.weekdaysFull : e.weekdaysShort).slice(0)), n = function (a) {
        return Picker._.node('div', ' ', e.klass['nav' + (a ? 'Next' : 'Prev')] + (a && i.year >= l.year && i.month >= l.month || !a && i.year <= k.year && i.month <= k.month ? ' ' + e.klass.navDisabled : ''), 'data-nav=' + (a || -1));
      }, o = function (b) {
        return e.selectMonths ? Picker._.node('select', Picker._.group({
          min: 0,
          max: 11,
          i: 1,
          node: 'option',
          item: function (a) {
            return [
              b[a],
              0,
              'value=' + a + (i.month == a ? ' selected' : '') + (i.year == k.year && a < k.month || i.year == l.year && a > l.month ? ' disabled' : '')
            ];
          }
        }), e.klass.selectMonth, a ? '' : 'disabled') : Picker._.node('div', b[i.month], e.klass.month);
      }, p = function () {
        var b = i.year, c = e.selectYears === !0 ? 5 : ~~(e.selectYears / 2);
        if (c) {
          var d = k.year, f = l.year, g = b - c, h = b + c;
          if (d > g && (h += d - g, g = d), h > f) {
            var j = g - d, m = h - f;
            g -= j > m ? m : j, h = f;
          }
          return Picker._.node('select', Picker._.group({
            min: g,
            max: h,
            i: 1,
            node: 'option',
            item: function (a) {
              return [
                a,
                0,
                'value=' + a + (b == a ? ' selected' : '')
              ];
            }
          }), e.klass.selectYear, a ? '' : 'disabled');
        }
        return Picker._.node('div', b, e.klass.year);
      };
    return Picker._.node('div', n() + n(1) + o(e.showMonthsShort ? e.monthsShort : e.monthsFull) + p(), e.klass.header) + Picker._.node('table', m + Picker._.node('tbody', Picker._.group({
      min: 0,
      max: c - 1,
      i: 1,
      node: 'tr',
      item: function (a) {
        var c = e.firstDay && 0 === d.create([
            i.year,
            i.month,
            1
          ]).day ? -7 : 0;
        return [Picker._.group({
            min: b * a - i.day + c + 1,
            max: function () {
              return this.min + b - 1;
            },
            i: 1,
            node: 'td',
            item: function (a) {
              return a = d.create([
                i.year,
                i.month,
                a + (e.firstDay ? 1 : 0)
              ]), [Picker._.node('div', a.date, function (b) {
                  return b.push(i.month == a.month ? e.klass.infocus : e.klass.outfocus), f.pick == a.pick && b.push(e.klass.now), g && g.pick == a.pick && b.push(e.klass.selected), h && h.pick == a.pick && b.push(e.klass.highlighted), (j && d.disabled(a) || a.pick < k.pick || a.pick > l.pick) && b.push(e.klass.disabled), b.join(' ');
                }([e.klass.day]), 'data-pick=' + a.pick)];
            }
          })];
      }
    })), e.klass.table) + Picker._.node('div', Picker._.node('button', e.today, e.klass.buttonToday, 'data-pick=' + f.pick + (a ? '' : ' disabled')) + Picker._.node('button', e.clear, e.klass.buttonClear, 'data-clear=1' + (a ? '' : ' disabled')), e.klass.footer);
  }, a.defaults = function (a) {
    return {
      monthsFull: [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
      ],
      monthsShort: [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec'
      ],
      weekdaysFull: [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday'
      ],
      weekdaysShort: [
        'Sun',
        'Mon',
        'Tue',
        'Wed',
        'Thu',
        'Fri',
        'Sat'
      ],
      today: 'Today',
      clear: 'Clear',
      format: 'd mmmm, yyyy',
      klass: {
        table: a + 'table',
        header: a + 'header',
        navPrev: a + 'nav--prev',
        navNext: a + 'nav--next',
        navDisabled: a + 'nav--disabled',
        month: a + 'month',
        year: a + 'year',
        selectMonth: a + 'select--month',
        selectYear: a + 'select--year',
        weekdays: a + 'weekday',
        day: a + 'day',
        disabled: a + 'day--disabled',
        selected: a + 'day--selected',
        highlighted: a + 'day--highlighted',
        now: a + 'day--today',
        infocus: a + 'day--infocus',
        outfocus: a + 'day--outfocus',
        footer: a + 'footer',
        buttonClear: a + 'button--clear',
        buttonToday: a + 'button--today'
      }
    };
  }(Picker.klasses().picker + '__'), Picker.extend('pickadate', a);
}();