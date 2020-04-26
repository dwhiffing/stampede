/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _boot = __webpack_require__(1);

	var _boot2 = _interopRequireDefault(_boot);

	var _load = __webpack_require__(2);

	var _load2 = _interopRequireDefault(_load);

	var _play = __webpack_require__(3);

	var _play2 = _interopRequireDefault(_play);

	var _menu = __webpack_require__(11);

	var _menu2 = _interopRequireDefault(_menu);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	(function () {
	  var game = new Phaser.Game(64, 64, Phaser.CANVAS, '');

	  game.state.add('boot', _boot2.default);
	  game.state.add('load', _load2.default);
	  game.state.add('menu', _menu2.default);
	  game.state.add('play', _play2.default);
	  game.state.start('boot');

	  var up = document.getElementById('up');
	  var down = document.getElementById('down');
	  var shoot = document.getElementById('shoot');

	  var touchStart = function touchStart(key) {
	    return function () {
	      return game.inputManager.start(key);
	    };
	  };
	  var touchEnd = function touchEnd(key) {
	    return function () {
	      return game.inputManager.end(key);
	    };
	  };
	  var attachUpDown = function attachUpDown(el, key) {
	    el.addEventListener('touchstart', touchStart(key));
	    el.addEventListener('touchend', touchEnd(key));
	    el.addEventListener('mousedown', touchStart(key));
	    el.addEventListener('mouseup', touchEnd(key));
	  };

	  document.addEventListener('mouseup', function () {
	    game.inputManager.end('up');
	    game.inputManager.end('down');
	    game.inputManager.end('shoot');
	    game.inputManager.end('button');
	    game.inputManager.end('reset');
	  });

	  attachUpDown(up, 'up');
	  attachUpDown(down, 'down');
	  attachUpDown(shoot, 'shoot');
	  attachUpDown(button, 'shoot');
	  attachUpDown(reset, 'reset');

	  // 1270x1600
	  var setStyle = function setStyle(el, style) {
	    el.setAttribute('style', '' + style);
	  };

	  var background = document.getElementById('background');
	  var app = document.getElementById('app');
	  var controls = document.getElementById('controls');

	  var resizeFn = function resizeFn() {
	    var _document$documentEle = document.documentElement,
	        fullWidth = _document$documentEle.clientWidth,
	        fullHeight = _document$documentEle.clientHeight;
	    // let ratio = fullHeight <= fullWidth && 1220*fullWidth/1220 < fullHeight ? fullHeight/1600 : fullWidth/1220

	    var ratio = fullWidth / 1220;
	    if (1600 * ratio > fullHeight) {
	      ratio = fullHeight / 1600;
	    }
	    var canvasSize = 540 * ratio;
	    setStyle(background, 'width: ' + 1220 * ratio + 'px; height: ' + 1600 * ratio + 'px;padding:' + 120 * ratio + 'px;padding-top: ' + 290 * ratio + 'px;margin-top:' + -(1600 * ratio) / 2 + 'px;margin-left:' + -(1220 * ratio) / 2 + 'px');
	    setStyle(app, 'width: ' + canvasSize + 'px; height: ' + canvasSize + 'px');
	    setStyle(controls, 'left: ' + 200 * ratio + 'px;right: ' + 140 * ratio + 'px; bottom: ' + 200 * ratio + 'px; top: ' + 1030 * ratio + 'px');
	    setStyle(up, 'height: ' + 170 * ratio + 'px;');
	    setStyle(down, 'height: ' + 170 * ratio + 'px;');
	    setStyle(shoot, 'height: ' + 170 * ratio + 'px;width: ' + 170 * ratio + 'px;');
	    setStyle(button, 'height: ' + 170 * ratio + 'px;width: ' + 170 * ratio + 'px;right:' + 230 * ratio + 'px;top:' + 120 * ratio + 'px');
	    setStyle(reset, 'height: ' + 80 * ratio + 'px;width: ' + 80 * ratio + 'px;right:' + 70 * ratio + 'px;top:' + 280 * ratio + 'px');
	  };
	  resizeFn();

	  window.addEventListener('resize', resizeFn);
	})();

/***/ }),
/* 1 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = {
	  create: function create(game) {
	    this.game.state.start('load', true, false);
	  }
	};

/***/ }),
/* 2 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = {
	  preload: function preload() {
	    this.load.onLoadComplete.addOnce(this.onLoadComplete, this);

	    this.load.image('gate', 'images/gate.png');
	    this.load.image('rope', 'images/rope.png');
	    this.load.image('lasso', 'images/lasso.png');
	    this.load.image('road', 'images/road.png');
	    this.load.spritesheet('dog', 'images/dogs.png', 8, 6);
	    this.load.spritesheet('player', 'images/player.png', 13, 10);
	    this.load.bitmapFont('font', 'images/font.png', 'images/font.xml');
	  },
	  onLoadComplete: function onLoadComplete() {
	    this.game.state.start('play', true, false);
	  }
	};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _enemyManager = __webpack_require__(4);

	var _enemyManager2 = _interopRequireDefault(_enemyManager);

	var _input = __webpack_require__(7);

	var _input2 = _interopRequireDefault(_input);

	var _ui = __webpack_require__(8);

	var _ui2 = _interopRequireDefault(_ui);

	var _player = __webpack_require__(9);

	var _player2 = _interopRequireDefault(_player);

	var _scaledDraw = __webpack_require__(10);

	var _scaledDraw2 = _interopRequireDefault(_scaledDraw);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	  create: function create(game) {
	    this.game = game;
	    game.stage.backgroundColor = '#677545';
	    game.physics.startSystem(Phaser.Physics.ARCADE);

	    game.scale.setResizeCallback(_scaledDraw2.default.resize, this);
	    _scaledDraw2.default.init.call(this);

	    game.enemies = new _enemyManager2.default(game);
	    game.player = new _player2.default(game, 2, 30);
	    game.inputManager = new _input2.default(game);
	    game.ui = new _ui2.default(game);
	  },
	  update: function update(game) {
	    game.inputManager.update();
	    game.enemies.update();
	    game.ui.update();
	    game.input.update();
	    game.player.update();

	    if (this.game.player.lasso.shooting) {
	      game.physics.arcade.overlap(game.player.lasso, game.enemies.group, this._lassoCollide.bind(this));
	    }
	    game.physics.arcade.overlap(game.player.sprite, game.enemies.group, this._dogCollide.bind(this));
	  },
	  _lassoCollide: function _lassoCollide(lasso, dog) {
	    if (this.game.player.lasso.shooting && dog.type !== 4) {
	      dog.capture();
	      this.game.player.retractLasso();
	      this.game.ui.setScore(dog.score);
	      this.game.enemies.trySpawn(dog.row);
	    }
	  },
	  _dogCollide: function _dogCollide(player, dog) {
	    if (dog.type >= 3) {
	      this.game.player.buck();
	    } else if (!this.game.player.sprite.invulnerable) {
	      this.game.enemies.run(dog.row);
	    }
	  },
	  render: function render(game) {
	    // this._drawBodies()
	    _scaledDraw2.default.render.call(this);
	  },
	  _drawBodies: function _drawBodies() {
	    game.debug.body(game.player.sprite);
	    game.debug.body(game.player.lasso);
	    game.enemies.dogs.forEach(function (dog) {
	      return game.debug.body(dog.sprite);
	    });
	  }
	};

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _dog = __webpack_require__(5);

	var _dog2 = _interopRequireDefault(_dog);

	var _data = __webpack_require__(6);

	var _data2 = _interopRequireDefault(_data);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var rowHeight = 8;
	var startY = 13;

	var EnemyManager = function () {
	  function EnemyManager(game) {
	    _classCallCheck(this, EnemyManager);

	    this.game = game;
	    this.rows = [0, 0, 0, 0, 0, 0];

	    this.createDogs();
	    this.trySpawn();
	  }

	  _createClass(EnemyManager, [{
	    key: 'createDogs',
	    value: function createDogs() {
	      var num = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 30;

	      this.group = this.game.add.group();
	      this.dogs = [];

	      for (var i = 0; i < num; i++) {
	        var dog = new _dog2.default(this.game, 64, -10);
	        this.dogs.push(dog);
	        this.group.add(dog);
	        dog.kill();
	      }
	    }
	  }, {
	    key: 'update',
	    value: function update() {}
	  }, {
	    key: 'spawn',
	    value: function spawn(row) {
	      var _this = this;

	      setTimeout(function () {
	        var type = _this.rows[row];
	        var data = _data2.default.dog[type];
	        var y = startY + rowHeight * row;
	        var size = _this.game.rnd.integerInRange(data.size[0], data.size[1]);

	        for (var i = 0; i < size; i++) {
	          var dog = _this.dogs.filter(function (d) {
	            return !d.alive;
	          })[0];
	          var x = 64 + 10 * i;
	          dog.reset(x, y, type, row);
	        }

	        _this.rows[row]++;
	        if (type >= Object.keys(_data2.default.dog).length - 1) {
	          _this.rows[row] = 0;
	        }
	      }, this.game.rnd.integerInRange(0, 4000));
	    }
	  }, {
	    key: 'trySpawn',
	    value: function trySpawn(row) {
	      var _this2 = this;

	      if (this.getRow(row).length > 0) {
	        return;
	      }
	      if (typeof row === 'undefined') {
	        [0, 1, 2, 3, 4, 5].forEach(function (i) {
	          return _this2.spawn(i);
	        });
	      } else {
	        this.spawn(row);
	      }
	    }
	  }, {
	    key: 'getRow',
	    value: function getRow(row) {
	      return this.dogs.filter(function (d) {
	        return d.row === row && d.alive;
	      });
	    }
	  }, {
	    key: 'walk',
	    value: function walk(row) {
	      this.getRow(row).forEach(function (d) {
	        return d.walk();
	      });
	    }
	  }, {
	    key: 'run',
	    value: function run(row) {
	      this.getRow(row).forEach(function (d) {
	        return d.run();
	      });
	    }
	  }]);

	  return EnemyManager;
	}();

	exports.default = EnemyManager;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _data = __webpack_require__(6);

	var _data2 = _interopRequireDefault(_data);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Dog = function (_Phaser$Sprite) {
	  _inherits(Dog, _Phaser$Sprite);

	  function Dog(game, x, y, speed) {
	    _classCallCheck(this, Dog);

	    var _this = _possibleConstructorReturn(this, (Dog.__proto__ || Object.getPrototypeOf(Dog)).call(this, game, x, y, "dog"));

	    game.physics.arcade.enable(_this);

	    _this.body.height = 4;
	    _this.body.offset.setTo(0, 2);

	    _this.animations.add('0', [0, 1], 9, true);
	    _this.animations.add('1', [0, 1], 6, true);
	    _this.animations.add('2', [0, 1], 3, true);
	    _this.animations.add('3', [2]);
	    _this.animations.add('4', [3]);
	    return _this;
	  }

	  _createClass(Dog, [{
	    key: 'reset',
	    value: function reset(x, y, type, row) {
	      _get(Dog.prototype.__proto__ || Object.getPrototypeOf(Dog.prototype), 'reset', this).call(this, x, y);
	      this.row = row;
	      this.type = type;
	      this.animations.play(type.toString());

	      var data = _data2.default.dog[type];
	      this.speed = data.speed;
	      this.baseSpeed = data.speed;
	      this.tint = data.color;
	      this.score = data.score;
	    }
	  }, {
	    key: 'update',
	    value: function update() {
	      if (!this.alive) return;
	      if (this.speed > 0) {
	        this.checkIfStrayed();
	      } else {
	        this.checkIfCaughtUp();
	      }

	      this.x -= this.speed * this.game.ui.speed;
	    }
	  }, {
	    key: 'checkIfStrayed',
	    value: function checkIfStrayed() {
	      if (this.x < -30) {
	        if (this.type !== 4) {
	          this.game.ui.loseLife();
	        }
	        this.stray();
	      }
	    }
	  }, {
	    key: 'checkIfCaughtUp',
	    value: function checkIfCaughtUp() {
	      if (this.x > 70) {
	        this.game.enemies.walk(this.row);
	      }
	    }
	  }, {
	    key: 'stray',
	    value: function stray() {
	      this.kill();
	      this.game.enemies.trySpawn(this.row);
	      this.x = 70;
	    }
	  }, {
	    key: 'walk',
	    value: function walk() {
	      this.speed = this.baseSpeed;
	    }
	  }, {
	    key: 'run',
	    value: function run() {
	      this.speed = -this.baseSpeed;
	    }
	  }, {
	    key: 'capture',
	    value: function capture() {
	      this.x = -10;
	      this.kill();
	    }
	  }]);

	  return Dog;
	}(Phaser.Sprite);

	exports.default = Dog;

/***/ }),
/* 6 */
/***/ (function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = {
	  dog: [{
	    color: 0x3f5337,
	    speed: 0.1,
	    size: [2, 3],
	    score: 5
	  }, {
	    color: 0x86a242,
	    speed: 0.2,
	    size: [2, 3],
	    score: 10
	  }, {
	    color: 0xcee177,
	    speed: 0.3,
	    size: [1, 3],
	    score: 25
	  }, {
	    color: 0x042022,
	    speed: 0.5,
	    size: [1, 1],
	    score: 100
	  }, {
	    color: 0xcee177,
	    speed: 0.5,
	    size: [1, 1],
	    score: 0
	  }]
	};

/***/ }),
/* 7 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Input = function () {
	  function Input(game) {
	    _classCallCheck(this, Input);

	    this.game = game;
	    this.isDown = {
	      up: false,
	      down: false,
	      shoot: false
	    };
	  }

	  _createClass(Input, [{
	    key: 'update',
	    value: function update() {
	      if (this._isDown('UP') || this._isDown('W') || this.isDown['up']) {
	        this.game.player.move(true);
	      } else if (this._isDown('DOWN') || this._isDown('S') || this.isDown['down']) {
	        this.game.player.move();
	      }
	      if (this._isDown('SPACEBAR') || this._isDown('Z') || this.isDown['shoot']) {
	        this.game.player.shoot();
	      }
	      if (this._isDown('R') || this.isDown['reset']) {
	        this.game.state.start('play', true, false);
	      }
	    }
	  }, {
	    key: 'start',
	    value: function start(key) {
	      if (key === 'down' && this.isDown.up) {
	        this.isDown.up = false;
	      }
	      if (key === 'up' && this.isDown.down) {
	        this.isDown.down = false;
	      }
	      this.isDown[key] = true;
	    }
	  }, {
	    key: 'end',
	    value: function end(key) {
	      this.isDown[key] = false;
	    }
	  }, {
	    key: '_isDown',
	    value: function _isDown(key) {
	      return this.game.input.keyboard.isDown(Phaser.Keyboard[key]);
	    }
	  }]);

	  return Input;
	}();

	exports.default = Input;

/***/ }),
/* 8 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var UserInterface = function () {
	  function UserInterface(game) {
	    var _this = this;

	    _classCallCheck(this, UserInterface);

	    this.speed = 0.8;
	    this.lives = 5;
	    this.score = 0;
	    this.targetScore = 0;
	    this.nextLifeScore = 1000;

	    this.topgate = game.add.tileSprite(0, 8, 64, 4, 'gate');
	    this.bottomgate = game.add.tileSprite(0, 60, 64, 4, 'gate');
	    this.road = game.add.tileSprite(0, 10, 64, 50, 'road');
	    this.lifeText = game.add.bitmapText(2, 1, 'font', this.lives.toString(), 5);
	    this.scoreText = game.add.bitmapText(25, 1, 'font', Math.floor(this.score).toString(), 5);

	    this.topgate.sendToBack();
	    this.road.sendToBack();

	    this.gameover = function () {
	      game.state.start('menu', true, false, { score: Math.round(_this.score) });
	    };
	  }

	  _createClass(UserInterface, [{
	    key: 'update',
	    value: function update() {
	      this.bottomgate.tilePosition.x -= 0.5 * this.speed;
	      this.topgate.tilePosition.x -= 0.5 * this.speed;
	      this.road.tilePosition.x -= 0.5 * this.speed;

	      if (this.score < this.targetScore) {
	        this.score += 0.3;
	        if (this.score >= this.nextLifeScore) {
	          this.lives += 1;
	          this.speed += 0.1;
	          this.nextLifeScore += 1000;
	          this.lifeText.text = this.lives;
	        }
	        this.scoreText.text = Math.floor(this.score).toString();
	      }
	    }
	  }, {
	    key: 'loseLife',
	    value: function loseLife() {
	      this.lives -= 1;
	      if (this.lives < 0) {
	        this.gameover();
	      } else {
	        this.lifeText.text = this.lives;
	      }
	    }
	  }, {
	    key: 'setScore',
	    value: function setScore(score) {
	      this.targetScore += score;
	    }
	  }]);

	  return UserInterface;
	}();

	exports.default = UserInterface;

/***/ }),
/* 9 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var canShoot = void 0,
	    lassoOffset = void 0,
	    lassoDirection = void 0,
	    sprite = void 0,
	    lasso = void 0,
	    rope = void 0;
	var minY = 9;
	var maxY = 54;
	var speed = 0.4;
	var ropeWidth = 36;
	var lassoSpeed = 1;

	var Player = function () {
	  function Player(game, x, y) {
	    _classCallCheck(this, Player);

	    this.game = game;
	    canShoot = true;
	    lassoOffset = 0;
	    lassoDirection = -1;

	    lasso = game.add.sprite(x + 11, y - 3, 'lasso');
	    this.lasso = lasso;
	    game.physics.arcade.enable(lasso);

	    lasso.shooting = false;
	    lasso.spin = this.game.time.create(false);
	    lasso.spin.loop(80, this.spinLasso.bind(this));
	    lasso.spin.start();

	    rope = game.add.tileSprite(x + 10, y, 0, 5.5, 'rope');
	    this.rope = rope;
	    rope.width = 0;

	    sprite = game.add.sprite(x, y, 'player');
	    this.sprite = sprite;
	    sprite.animations.add('run', [0, 1], 7, true);
	    sprite.animations.add('hit', [2]);
	    game.physics.arcade.enable(sprite);

	    sprite.body.height = 5;
	    sprite.body.offset.setTo(0, 5);

	    sprite.flicker = this.game.time.create(false);
	    sprite.flicker.loop(150, this.flicker.bind(this));
	    sprite.flicker.start();
	    sprite.flicker.pause();
	    sprite.invulnerable = false;

	    sprite.animations.play('run');
	  }

	  _createClass(Player, [{
	    key: 'update',
	    value: function update() {
	      if (lasso.shooting) {
	        if (rope.width < ropeWidth) {
	          this.setLasso(lassoSpeed);
	        } else {
	          this.retractLasso();
	        }
	      } else {
	        if (rope.width > 0) {
	          this.setLasso(-lassoSpeed);
	        } else {
	          this.resetLasso();
	        }
	      }
	    }
	  }, {
	    key: 'move',
	    value: function move(up) {
	      if (up && sprite.y > minY) {
	        sprite.y -= speed;
	        rope.y -= speed;
	        lasso.y -= speed;
	      } else if (sprite.y < maxY) {
	        sprite.y += speed;
	      }
	      lasso.y = Math.round(sprite.y - 3);
	      rope.y = Math.round(sprite.y);
	    }
	  }, {
	    key: 'buck',
	    value: function buck() {
	      if (sprite.invulnerable) return;
	      sprite.flicker.resume();
	      sprite.invulnerable = true;
	      this.resetLasso();
	      lasso.alpha = 0;
	      sprite.animations.play('hit');

	      this.game.time.events.add(1500, function () {
	        sprite.invulnerable = false;
	        sprite.animations.play('run');
	        sprite.flicker.pause();
	        sprite.alpha = 1;
	        lasso.alpha = 1;
	      }, sprite);
	    }
	  }, {
	    key: 'shoot',
	    value: function shoot() {
	      if (!canShoot || sprite.invulnerable) return;
	      canShoot = false;
	      lasso.spin.pause();
	      this.lasso.shooting = true;
	    }
	  }, {
	    key: 'setLasso',
	    value: function setLasso() {
	      var speed = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

	      rope.width += speed;
	      lasso.x += speed;
	      lasso.y = sprite.y - 3 + rope.width / 4.3;
	    }
	  }, {
	    key: 'resetLasso',
	    value: function resetLasso() {
	      rope.width = 0;
	      lasso.shooting = false;
	      setTimeout(function () {
	        return canShoot = true;
	      }, 100);
	      lasso.spin.resume();
	      this.setLasso();
	    }
	  }, {
	    key: 'retractLasso',
	    value: function retractLasso() {
	      lasso.shooting = false;
	      this.setLasso();
	    }
	  }, {
	    key: 'flicker',
	    value: function flicker() {
	      sprite.alpha = sprite.alpha === 0.6 ? 0.9 : 0.6;
	    }
	  }, {
	    key: 'spinLasso',
	    value: function spinLasso() {
	      lassoOffset += lassoDirection;
	      if (lassoOffset <= -5) {
	        lassoDirection = 1;
	      } else if (lassoOffset >= -1) {
	        lassoDirection = -1;
	      }
	      lasso.x = sprite.x + 11 + lassoOffset;
	    }
	  }]);

	  return Player;
	}();

	exports.default = Player;

/***/ }),
/* 10 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var pixel = {
	  scale: 8,
	  canvas: null,
	  context: null,
	  width: 0,
	  height: 0
	};

	var scaledDraw = {
	  init: function init() {
	    this.game.canvas.style['display'] = 'none';
	    scaledDraw.resize.call(this, this.scale, {
	      width: window.innerWidth,
	      height: window.innerHeight
	    });
	  },
	  resize: function resize(scale, parentBounds) {
	    if (pixel.canvas) {
	      pixel.canvas.remove();
	    }
	    pixel.canvas = Phaser.Canvas.create(this.game.width * pixel.scale, this.game.height * pixel.scale);
	    pixel.context = pixel.canvas.getContext('2d');
	    Phaser.Canvas.addToDOM(pixel.canvas, "app");
	    Phaser.Canvas.setSmoothingEnabled(pixel.context, false);
	    pixel.width = pixel.canvas.width;
	    pixel.height = pixel.canvas.height;
	  },
	  render: function render() {
	    pixel.context.drawImage(this.game.canvas, 0, 0, this.game.width, this.game.height, 0, 0, pixel.width, pixel.height);
	  }
	};

	exports.default = scaledDraw;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _scaledDraw = __webpack_require__(10);

	var _scaledDraw2 = _interopRequireDefault(_scaledDraw);

	var _input = __webpack_require__(7);

	var _input2 = _interopRequireDefault(_input);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var score = 0;
	exports.default = {
	  init: function init() {
	    var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	    score = args.score || 0;
	  },
	  create: function create(game) {
	    this.game = game;
	    game.scale.setResizeCallback(_scaledDraw2.default.resize, this);
	    _scaledDraw2.default.init.call(this);
	    game.inputManager = new _input2.default(game);

	    game.youText = game.add.bitmapText(23, 7, 'font', "you", 5);
	    game.loseText = game.add.bitmapText(20, 14, 'font', "lose", 5);
	    game.loseText = game.add.bitmapText(16, 30, 'font', "score:", 5);
	    game.scoreText = game.add.bitmapText(20, 38, 'font', score.toString(), 5);
	  },
	  update: function update(game) {
	    if (this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR) || this.game.input.keyboard.isDown(Phaser.Keyboard.R) || this.game.input.keyboard.isDown(Phaser.Keyboard.Z) || this.game.inputManager.isDown['reset']) {
	      this.game.state.start('play', true, false);
	    }
	  },
	  render: function render(game) {
	    _scaledDraw2.default.render.call(this);
	  }
	};

/***/ })
/******/ ]);