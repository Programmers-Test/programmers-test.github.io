function sol(s) {
    return s.pieces.find((p) => p.name === 'K').position === 13;
}
function win(s) {
    setTimeout(() => {
        wscreen = document.createElement('div');
        wscreen.classList.add('win');
        s.elements.main.appendChild(wscreen);
    }, 50);
}
function move(s) {
    mcnt = document.getElementById('move-count');
    mcnt.innerHTML = s.moves;
}

function init() {
    mcnt = document.getElementById('move-count');
    mcnt.innerHTML = '0';
    SlidingPuzzles(document.getElementById('game'), 'G1 K K G2/G1 K K G2/B S S R/B N L R/ P1 . . P2', {
        solution: sol,
        onVictory: win,
        onMove: move,
    });
}

btn = document.getElementById('reset');
btn.onclick = init;
init();

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e3) { throw _e3; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e4) { didErr = true; err = _e4; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var SlidingPuzzles = function () {
  "use strict";

  function t(t, e) {
    return Math.abs(t - e);
  }

  function e(t, e) {
    return Math.floor(t / e);
  }

  function n(t, e) {
    return t % e;
  }

  function i(t, e, n) {
    return e * n + t;
  }

  function o(i, o, s) {
    return [i + o, i - o, i + 1, i - 1].filter(function (c) {
      return c >= 0 && c <= o * s && t(n(i, o), n(c, o)) <= 1 && t(e(i, o), e(c, o)) <= 1;
    });
  }

  function s(t, e, n) {
    var o = Math.floor(t.width * (e[0] - n.left) / n.width),
        s = Math.floor(t.height * (e[1] - n.top) / n.height);
    return o >= 0 && o < t.width && s >= 0 && s < t.height ? i(o, s, t.width) : void 0;
  }

  function c(t, i) {
    var o = n(i, t.width),
        s = e(i, t.width);

    var _iterator = _createForOfIteratorHelper(t.pieces),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var _i = _step.value;
        if (n(_i.position, t.width) <= o && n(_i.position, t.width) + _i.width > o && e(_i.position, t.width) <= s && e(_i.position, t.width) + _i.height > s) return _i;
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
  }

  function d(t, o, s, c) {
    var d = [];

    for (var _r = n(o, t.width); _r < n(o, t.width) + s; _r++) {
      for (var _n = e(o, t.width); _n < e(o, t.width) + c; _n++) {
        d.push(i(_r, _n, t.width));
      }
    }

    return d;
  }

  function r(t, e) {
    if (void 0 === t.selected || t.selected === e || t.config.solution(t) || !1 === t.config.movable) return !1;
    var n = c(t, t.selected);
    if (!n) return !1;
    var i = t.selected - e,
        s = n.position - i,
        r = d(t, n.position, n.width, n.height),
        h = d(t, s, n.width, n.height);
    return !(!r.some(function (n) {
      return o(n, t.width, t.height).includes(e);
    }) || !h.every(function (e) {
      return e >= 0 && e < t.width * t.height;
    }) || h.some(function (e) {
      return t.occupied.includes(e) && !r.includes(e);
    }));
  }

  function h(i, o) {
    var _i$occupied;

    if (void 0 === i.selected) return;
    var s = c(i, i.selected);
    if (!s) return;
    var r = s.position - (i.selected - o),
        h = d(i, s.position, s.width, s.height),
        u = d(i, r, s.width, s.height);
    var l, f, a;
    i.occupied = i.occupied.filter(function (t) {
      return !h.includes(t);
    }), (_i$occupied = i.occupied).push.apply(_i$occupied, _toConsumableArray(u)), i.moves += (l = s.position, f = r, a = i.width, t(n(l, a), n(f, a)) + t(e(l, a), e(f, a))), s.position = r;
  }

  function u(t) {
    t.elements.board.innerHTML = "";

    var _iterator2 = _createForOfIteratorHelper(t.pieces),
        _step2;

    try {
      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
        var _i5 = _step2.value;

        var _o3 = document.createElement("sp-piece");

        _o3.classList.add(_i5.name), void 0 !== t.selected && d(t, _i5.position, _i5.width, _i5.height).includes(t.selected) && _o3.classList.add("selected"), _o3.style.transform = "translate(\n            ".concat(n(_i5.position, t.width) * (100 / _i5.width), "%,").concat(e(_i5.position, t.width) * (100 / _i5.height), "%\n        )"), _o3.style.width = 100 / t.width * _i5.width + "%", _o3.style.height = 100 / t.height * _i5.height + "%", t.config.specialEffect(_i5, _o3), t.elements.board.appendChild(_o3);
      }
    } catch (err) {
      _iterator2.e(err);
    } finally {
      _iterator2.f();
    }

    if (void 0 !== t.selected && t.config.showDests) {
      var _i2 = function (t, e) {
        if (!e) return [];
        var n = d(t, e.position, e.width, e.height),
            i = JSON.parse(JSON.stringify(t));
        return i.config = t.config, i.selected = e.position, _toConsumableArray(new Set(function t(e, n, i) {
          if (!n) return [];
          var s = [],
              u = d(e, n.position, n.width, n.height),
              l = u;

          var _iterator3 = _createForOfIteratorHelper(u),
              _step3;

          try {
            for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
              var _t = _step3.value;
              s.push.apply(s, _toConsumableArray(o(_t, e.width, e.height)));
            }
          } catch (err) {
            _iterator3.e(err);
          } finally {
            _iterator3.f();
          }

          i.push(n.position);

          for (var _i3 = 0, _s = s; _i3 < _s.length; _i3++) {
            var _n2 = _s[_i3];

            if (!i.includes(_n2) && r(e, _n2)) {
              var _o = JSON.parse(JSON.stringify(e));

              _o.config = e.config, h(_o, _n2), _o.selected = _n2, l.push.apply(l, _toConsumableArray(t(_o, c(_o, _o.selected), i)));
            }
          }

          return l;
        }(i, e, []).filter(function (t) {
          return !n.includes(t);
        })));
      }(t, c(t, t.selected));

      var _iterator4 = _createForOfIteratorHelper(_i2),
          _step4;

      try {
        for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
          var _o2 = _step4.value;

          var _i4 = document.createElement("sp-dest");

          _i4.style.transform = "translate(\n            ".concat(100 * n(_o2, t.width), "%,").concat(100 * e(_o2, t.width), "%\n        )"), _i4.style.width = 100 / t.width + "%", _i4.style.height = 100 / t.height + "%", t.elements.board.appendChild(_i4);
        }
      } catch (err) {
        _iterator4.e(err);
      } finally {
        _iterator4.f();
      }
    }
  }

  var l = function l(t) {
    var e;
    return t.clientX || 0 === t.clientX ? [t.clientX, t.clientY] : (null === (e = t.targetTouches) || void 0 === e ? void 0 : e[0]) ? [t.targetTouches[0].clientX, t.targetTouches[0].clientY] : void 0;
  };

  function f(t, e, n) {
    t.addEventListener(n, function (t) {
      if (void 0 === e.selected || void 0 === e.pos) return;
      t.preventDefault();
      var n = l(t);

      if (n) {
        var _t2 = s(e, n, e.elements.board.getBoundingClientRect()),
            _d = (i = e.pos, o = n, [Math.abs(i[0] - o[0]), Math.abs(i[1] - o[1])]);

        void 0 !== _t2 && _t2 !== e.selected && (_d[0] > 15 || _d[1] > 15) && (r(e, _t2) ? (h(e, _t2), e.selected = _t2, e.pos = n, u(e), e.config.solution(e) && e.config.onVictory(e), e.config.onMove(e)) : c(e, e.selected) === c(e, _t2) && (e.selected = _t2));
      }

      var i, o;
    }, {
      once: !1
    });
  }

  function a(t, e, n) {
    t.addEventListener(n, function () {
      e.selected = void 0, e.pos = void 0, u(e);
    }, {
      once: !1
    });
  }

  return function (i, o, c) {
    var d = function (i, o, s) {
      var c = i.replace(/\n/g, "/").split("/").map(function (t) {
        return t.replace(/\s\s+/g, " ").trimEnd().trimStart();
      }),
          d = c[0].split(" ").length,
          r = c.length,
          h = [],
          u = new Map();
      var l = 0;

      var _iterator5 = _createForOfIteratorHelper(c),
          _step5;

      try {
        for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
          var _t3 = _step5.value;

          var _iterator8 = _createForOfIteratorHelper(_t3.split(" ")),
              _step8;

          try {
            for (_iterator8.s(); !(_step8 = _iterator8.n()).done;) {
              var _e = _step8.value;
              "." == _e ? l += 1 : (u.set(l, _e), l++);
            }
          } catch (err) {
            _iterator8.e(err);
          } finally {
            _iterator8.f();
          }
        }
      } catch (err) {
        _iterator5.e(err);
      } finally {
        _iterator5.f();
      }

      var f = new Set();

      function a(i) {
        var o = [i];

        var _iterator6 = _createForOfIteratorHelper([i + d, i + 1].filter(function (o) {
          return o <= d * r && t(n(i, d), n(o, d)) <= 1 && t(e(i, d), e(o, d)) <= 1;
        })),
            _step6;

        try {
          for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
            var _s2 = _step6.value;
            f.has(_s2) || u.get(_s2) !== u.get(i) || (f.add(_s2), o.push.apply(o, _toConsumableArray(a(_s2))));
          }
        } catch (err) {
          _iterator6.e(err);
        } finally {
          _iterator6.f();
        }

        return o;
      }

      var _iterator7 = _createForOfIteratorHelper(u),
          _step7;

      try {
        for (_iterator7.s(); !(_step7 = _iterator7.n()).done;) {
          var _i6 = _step7.value;

          if (!f.has(_i6[0])) {
            var _o4 = a(_i6[0]);

            h.push({
              name: _i6[1],
              position: _i6[0],
              width: t(n(_i6[0], d), n(Math.max.apply(Math, _toConsumableArray(_o4)), d)) + 1,
              height: t(e(_i6[0], d), e(Math.max.apply(Math, _toConsumableArray(_o4)), d)) + 1
            });
          }
        }
      } catch (err) {
        _iterator7.e(err);
      } finally {
        _iterator7.f();
      }

      return {
        pieces: h,
        occupied: Array.from(u.keys()),
        moves: 0,
        width: d,
        height: r,
        elements: o,
        config: s
      };
    }(o, function (t) {
      t.innerHTML = "";
      var e = document.createElement("sp-main"),
          n = document.createElement("sp-board"),
          i = {
        main: e,
        board: n
      };
      return e.appendChild(n), t.appendChild(e), i;
    }(i), Object.assign({}, {
      solution: function solution() {
        return !1;
      },
      onMove: function onMove() {},
      specialEffect: function specialEffect() {},
      onVictory: function onVictory() {},
      movable: !0,
      showDests: !1
    }, c));

    return u(d), function (t) {
      var _loop = function _loop() {
        var e = _arr[_i7];
        t.elements.main.addEventListener(e, function (n) {
          if (!n.isTrusted || void 0 !== n.button && 0 !== n.button) return;
          if (n.touches && n.touches.length > 1) return;
          n.preventDefault(), "touchstart" === e && n.target && (f(n.target, t, "touchmove"), a(n.target, t, "touchend"));
          var i = l(n);

          if (i) {
            var _e2 = s(t, i, t.elements.board.getBoundingClientRect());

            t.selected = _e2, t.pos = i, u(t);
          }
        }, {
          passive: !1
        });
      };

      for (var _i7 = 0, _arr = ["touchstart", "mousedown"]; _i7 < _arr.length; _i7++) {
        _loop();
      }

      f(document, t, "mousemove"), a(document, t, "mouseup"), t.elements.main.addEventListener("contextmenu", function (t) {
        t.preventDefault();
      });
    }(d), {
      situation: d
    };
  };
}();
