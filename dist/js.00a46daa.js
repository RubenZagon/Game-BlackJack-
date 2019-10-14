// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"js/Elements/deck.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Deck = exports.Card = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// Clase del objeto deck y cards
var RANKS = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
var STICKS = ['♥', '♠', '♦', '♣'];

var Card =
/*#__PURE__*/
function () {
  function Card() {
    var r = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    var s = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

    _classCallCheck(this, Card);

    this.rank = r, this.stick = s;
  }

  _createClass(Card, [{
    key: "getRank",
    value: function getRank() {
      return this.rank;
    }
  }]);

  return Card;
}();

exports.Card = Card;

var Deck =
/*#__PURE__*/
function () {
  function Deck(b) {
    _classCallCheck(this, Deck);

    this.deck = b;
  }

  _createClass(Deck, [{
    key: "setValue",
    value: function setValue(card) {
      var rank = card.rank;
      var value = 0;

      switch (rank) {
        case 'A':
          value = 11;
          break;

        case 'J':
          value = 10;
          break;

        case 'Q':
          value = 10;
          break;

        case 'K':
          value = 10;
          break;

        default:
          value = parseInt(rank);
      }

      return value;
    }
  }, {
    key: "generateDeck",
    value: function generateDeck() {
      var deck = [];

      for (var i = 0; i < STICKS.length; i++) {
        for (var j = 0; j < RANKS.length; j++) {
          var card = new Card(RANKS[j]);
          deck.push({
            //Tengo que hacerlo así para poder leer luego los valores de 'rank', 'stick', y 'value' sin que me salga undefined
            'rank': RANKS[j],
            'stick': STICKS[i],
            'value': this.setValue(card)
          });
        }
      }

      return deck;
    }
  }, {
    key: "shuffle",
    value: function shuffle() {
      var deck = this.generateDeck();
      var shuffled = [];

      while (deck.length > 0) {
        var randomPosition = Math.floor(Math.random() * deck.length);
        shuffled.unshift(deck[randomPosition]);
        deck.splice(randomPosition, 1);
      }

      return shuffled;
    }
  }]);

  return Deck;
}();

exports.Deck = Deck;
},{}],"js/Elements/players.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Player = void 0;

var _deck = require("./deck.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Player =
/*#__PURE__*/
function () {
  function Player() {
    var h = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

    _classCallCheck(this, Player);

    this.hand = h;
  }

  _createClass(Player, [{
    key: "pickCard",
    value: function pickCard(gameDeck) {
      var someCard = gameDeck.pop();
      this.hand.push(someCard);
    }
  }, {
    key: "renderCard",
    value: function renderCard(divContainer) {
      divContainer.innerHTML = ''; //Borra contenido

      for (var pos = 0; pos < this.hand.length; pos++) {
        var rank = this.hand[pos].rank,
            stick = this.hand[pos].stick,
            element = divContainer; //Construir carta en HTML

        var div = document.createElement('div');
        cardIsRed(stick, div);
        div.textContent = "".concat(rank).concat(stick);
        element.appendChild(div);
      }
    }
  }]);

  return Player;
}();

exports.Player = Player;

var cardIsRed = function cardIsRed(stick, div) {
  if (stick == '♥' || stick == '♦') {
    div.className = "card cardRed";
  } else {
    div.className = "card";
  }
};
},{"./deck.js":"js/Elements/deck.js"}],"js/index.js":[function(require,module,exports) {
"use strict";

var _deck = require("./Elements/deck.js");

var _players = require("./Elements/players.js");

// ########    VARIABLES GLOBALES   ##############
var deck = new _deck.Deck(),
    gameDeck = deck.shuffle();
var player = new _players.Player(),
    crupier = new _players.Player();
var pointsPlayer, pointsCrupier; // ########    SELECTORES HTML   ##############

var CONTAINER = {
  CardsPlayer: document.querySelector('.cardsPlayer'),
  CardsCrupier: document.querySelector('.cardsCrupier')
};
var BUTTONS = {
  pedir: document.querySelector('.pedir'),
  plantarse: document.querySelector('.plantarse'),
  restart: document.querySelector('.restart'),
  divBotonera: document.querySelector('.botonera')
};
var SCORE = {
  player: document.querySelector('.pointsPlayer'),
  crupier: document.querySelector('.pointsCrupier')
};
var WINNER = document.querySelector('.winner'); // ########    FUNCIONES   ##############

var firstRound = function firstRound() {
  player.pickCard(gameDeck);
  player.pickCard(gameDeck);
  player.renderCard(CONTAINER.CardsPlayer);
  crupier.pickCard(gameDeck);
  crupier.renderCard(CONTAINER.CardsCrupier);
  refreshScore(player, crupier);
  printScore();

  if (pointsPlayer == 21) {
    askPlayer();
  }
};

var printScore = function printScore() {
  SCORE.crupier.textContent = pointsCrupier;
  SCORE.player.textContent = pointsPlayer;
};

var refreshScore = function refreshScore(player, crupier) {
  pointsPlayer = watchPunctuation(player);
  pointsCrupier = watchPunctuation(crupier);
}; //Valorar puntuación


var watchPunctuation = function watchPunctuation(playerObj) {
  var points = 0;

  for (var i = 0; i < playerObj.hand.length; i++) {
    points = points + playerObj.hand[i].value;
  }

  return points;
};

var playerPickCard = function playerPickCard() {
  player.pickCard(gameDeck);
  player.renderCard(CONTAINER.CardsPlayer);
  askPlayer();
}; //Preguntar al jugador si continuar o no


var askPlayer = function askPlayer(yesOrNot) {
  var answer = yesOrNot;
  pointsPlayer = watchPunctuation(player);
  whoIsTheWinner(pointsPlayer, pointsCrupier);

  if (pointsPlayer == 21) {
    disabledBtn();
  }

  if (answer == false) {
    disabledBtn();
  }
};

var reload = function reload() {
  window.location.reload(false);
};

var disabledBtn = function disabledBtn() {
  BUTTONS.pedir.disabled = true;
  BUTTONS.plantarse.disabled = true;
  BUTTONS.pedir.classList.add('hidden');
  BUTTONS.plantarse.classList.add('hidden');
  BUTTONS.restart.classList.remove('hidden');
  BUTTONS.restart.addEventListener('click', reload);
  printInHTMLTheWinner(pointsPlayer, pointsCrupier);
};

var notExceed21 = function notExceed21(playerValue) {
  if (playerValue <= 21) {
    return true;
  } else {
    disabledBtn();
  }
};

var whoIsTheWinner = function whoIsTheWinner(pointsPlayer, pointsCrupier) {
  printScore();
  notExceed21(pointsPlayer);

  if (pointsPlayer == 21) {
    disabledBtn();
  } else if (pointsPlayer === pointsCrupier) {
    disabledBtn();
  } else if (pointsPlayer > 21) {
    disabledBtn();
  } else if (pointsPlayer > pointsCrupier) {
    disabledBtn();
  } else {
    disabledBtn();
  }
};

var printInHTMLTheWinner = function printInHTMLTheWinner(pointsPlayer, pointsCrupier) {
  var pPlayer = pointsPlayer,
      pCrupier = pointsCrupier; //¿Quien es el ganador?

  if (pPlayer == 21) {
    WINNER.textContent = 'BLACKJACK';
  } else if (pPlayer === pCrupier) {
    WINNER.textContent = 'EMPATE';
  } else if (pPlayer > 21) {
    WINNER.textContent = 'Gana CRUPIER';
  } else if (pPlayer > pCrupier) {
    WINNER.textContent = 'Gana JUGADOR';
  } else {
    WINNER.textContent = 'Gana CRUPIER';
  } // Imprime jugador en pantalla


  WINNER.classList.remove('hidden');
};

var crupierRound = function crupierRound() {
  // IA del crupier
  // - Despues de que el jugador se plane comienza su turno
  // - Si tienes menos de 16 sigue pidiendo, y con 17 se planta
  for (var i = 0; pointsCrupier < 15; i++) {
    refreshScore(player, crupier);

    if (pointsCrupier < 16) {
      crupier.pickCard(gameDeck);
      crupier.renderCard(CONTAINER.CardsCrupier);
      printScore();
    }

    whoIsTheWinner(pointsPlayer, pointsCrupier);
  }
};

firstRound();

var getCard = function getCard() {
  return playerPickCard();
};

var passTurn = function passTurn() {
  return askPlayer(false);
};

BUTTONS.pedir.addEventListener('click', getCard);
BUTTONS.plantarse.addEventListener('click', passTurn);
BUTTONS.plantarse.addEventListener('click', crupierRound);
},{"./Elements/deck.js":"js/Elements/deck.js","./Elements/players.js":"js/Elements/players.js"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "61947" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","js/index.js"], null)
//# sourceMappingURL=/js.00a46daa.js.map