(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["sjt"] = factory();
	else
		root["sjt"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__tokentypes__ = __webpack_require__(1);


function Tokenizer (input) {
  this.input = input
  this.index = 0
  this.context = null
  this.eof = false
}

var pp = Tokenizer.prototype

pp.nextToken = function () {
  this.eatSpaces()
  return (
    this.readCloseTag() ||
    this.readTagName() ||
    this.readAttrName() ||
    this.readAttrEqual() ||
    this.readAttrString() ||
    this.readGT() ||
    this.readSlashGT() ||
    this.readLCB() ||
    this.readRCB() ||
    this.readText() ||
    this.readEOF() ||
    this.error()
  )
}

/*
 * Return next token, but keep the index untouched
 */
pp.peekToken = function () {
  var index = this.index
  var token = this.nextToken()
  this.index = index
  return token
}

/*
 * Read token one by one
 */

pp.readTagName = function () {
  if (this.char() === '<') {
    this.index++
    this.eatSpaces()
    var start = this.index
    while (this.char().match(/[\w\d]/)) {
      this.index++
    }
    var tagName = this.input.slice(start, this.index)
    this.setContext(__WEBPACK_IMPORTED_MODULE_0__tokentypes__["a" /* default */].TK_TAG_NAME)
    return {
      type: __WEBPACK_IMPORTED_MODULE_0__tokentypes__["a" /* default */].TK_TAG_NAME,
      label: tagName
    }
  }
}

pp.readAttrName = function () {
  if (this.inContext(__WEBPACK_IMPORTED_MODULE_0__tokentypes__["a" /* default */].TK_TAG_NAME) && this.char()) {
    var reg = /[\w\-\d]/
    if (!reg.test(this.char())) return
    var start = this.index
    while (this.char() && reg.test(this.char())) {
      this.index++
    }
    return {
      type: __WEBPACK_IMPORTED_MODULE_0__tokentypes__["a" /* default */].TK_ATTR_NAME,
      label: this.input.slice(start, this.index)
    }
  }
}

pp.readAttrEqual = function () {
  if (this.inContext(__WEBPACK_IMPORTED_MODULE_0__tokentypes__["a" /* default */].TK_TAG_NAME) && this.char() === '=') {
    this.index++
    return {
      type: __WEBPACK_IMPORTED_MODULE_0__tokentypes__["a" /* default */].TK_ATTR_EQUAL,
      label: '='
    }
  }
}

pp.readAttrString = function () {
  if (this.inContext(__WEBPACK_IMPORTED_MODULE_0__tokentypes__["a" /* default */].TK_TAG_NAME) && /['"]/.test(this.char())) {
    var quote = this.char()
    var start = this.index
    this.index++
    while (!isUndefined(this.char()) && this.char() !== quote) {
      this.index++
    }
    this.index++
    return {
      type: __WEBPACK_IMPORTED_MODULE_0__tokentypes__["a" /* default */].TK_ATTR_STRING,
      label: this.input.slice(start + 1, this.index - 1)
    }
  }
}

pp.readCloseTag = function () {
  return this.captureByRegx(
    /^\<\s*?\/\s*?[\w\d-]+?\s*?\>/, 
    __WEBPACK_IMPORTED_MODULE_0__tokentypes__["a" /* default */].TK_CLOSE_TAG
  )
}

pp.readGT = function () {
  if (this.char() === '>') {
    this.index++
    this.setContext(__WEBPACK_IMPORTED_MODULE_0__tokentypes__["a" /* default */].TK_GT)
    return {
      type: __WEBPACK_IMPORTED_MODULE_0__tokentypes__["a" /* default */].TK_GT,
      label: '>'
    }
  }
}

pp.readSlashGT = function () {
  return this.captureByRegx(
    /^\/\>/,
    __WEBPACK_IMPORTED_MODULE_0__tokentypes__["a" /* default */].TK_SLASH_GT
  )
}

pp.readLCB = function () {
  return this.captureByRegx(
    /^\{/,
    __WEBPACK_IMPORTED_MODULE_0__tokentypes__["a" /* default */].TK_LCB
  )
}

pp.readRCB = function () {
  return this.captureByRegx(
    /^\}/,
    __WEBPACK_IMPORTED_MODULE_0__tokentypes__["a" /* default */].TK_RCB
  )
}

pp.readText = function () {
  if (!this.inContext(__WEBPACK_IMPORTED_MODULE_0__tokentypes__["a" /* default */].TK_TAG_NAME)) {
    var start = this.index
    if (!this.char()) return
    this.index++
    while (
      this.char() && !(/[\<\{\}]/.test(this.char()))
    ) {
      this.index++
    }
    return {
      type: __WEBPACK_IMPORTED_MODULE_0__tokentypes__["a" /* default */].TK_TEXT,
      label: this.input.slice(start, this.index)
    }
  }
}

pp.readEOF = function () {
  if (this.index >= this.input.length) {
    this.eof = true
    return {
      type: __WEBPACK_IMPORTED_MODULE_0__tokentypes__["a" /* default */].TK_EOF,
      label: '$'
    }
  }
}

/* 
 * Helpers Functions
 */

pp.eatSpaces = function () {
  while (/\s/.test(this.char())) {
    this.index++
  }
}

pp.setContext = function (type) {
  this.context = type
}

pp.inContext = function (type) {
  return this.context === type
}

pp.char = function () {
  return this.input[this.index]
}

pp.captureByRegx = function (regx, type) {
  var input = this.input.slice(this.index)
  var capture = input.match(regx)
  if (capture) {
    capture = capture[0]
    this.index += capture.length
    this.setContext(type)
    return {
      type: type,
      label: capture
    }
  }
}

pp.restoreContext = function (type) {
  this.setContext(type)
}


pp.test = function () {
  while(!this.eof) {
    console.log(this.nextToken())
  }
}

pp.error = function () {
  throw new Error('Unexpected token: \'' + this.char() + '\'')
}

function isUndefined (value) {
  return value === void 666
}

/* harmony default export */ __webpack_exports__["a"] = (Tokenizer);

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
  TK_TEXT: 1, // 文本节点
  TK_LCB: 2, // {
  TK_RCB: 3, // }
  TK_GT: 4, // >
  TK_SLASH_GT: 5, // />
  TK_TAG_NAME: 6, // <div|<span|<img|...
  TK_ATTR_NAME: 7, // 属性名
  TK_ATTR_EQUAL: 8, // =
  TK_ATTR_STRING: 9, // "string"
  TK_CLOSE_TAG: 10, // </div>|</span>|</a>|...
  TK_EOF: 100 // end of file
});

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util__ = __webpack_require__(5);

var codeGenMethods = {}

function CodeGen(astRoot) {
    this.nodeIndex = 1
    this.lines = []
    this.walkRoot(astRoot)
    this.body = this.lines.join('\n');
}

var pp = CodeGen.prototype

pp.walkRoot = function(astRoot) {
    this.walk(astRoot, '  ', '0', true)
}

pp.walk = function(node, indent, parentIndex, initFlag) {
    if (typeof node === 'string') {
        return node
    } else if (node.type === "Node") {
        return this.genNode(node, indent, parentIndex, initFlag)
    } else {
        return this['gen' + node.type](node, indent, parentIndex)
    }
}

pp.walkExpr = function(node) {
    if (typeof node === 'string') {
        return node
    } else {
        return this.genNodeOneLiner(node, " ", 0)
    }
}

pp.genStat = function(node, indent, parentIndex) {
    var self = this
    __WEBPACK_IMPORTED_MODULE_0__util__["a" /* default */].each(node.members, function(item) {
        self.walk(item, indent, parentIndex)
    })
}

pp.genNode = function(node, indent, parentIndex, initFlag) {
    if (initFlag) {
        this.genNodeInit(node, indent, parentIndex)
    } else {
        return this.genNodeOneLiner(node, indent, parentIndex)
    }
}

pp.genNodeInit = function(node, indent, parentIndex) {
    var currentIndex = this.nodeIndex++
        var tagName = node.name
    if (!/^[A-Z]/.test(node.name)) {
        tagName = "\"" + node.name + "\""
    }
    this.lines.push("React.createElement(")
    this.lines.push(inc(indent) + tagName + ",")
    this.lines.push(inc(indent) + this.getAttrs(node))
    if (node.body.members) {
        var self = this
        __WEBPACK_IMPORTED_MODULE_0__util__["a" /* default */].each(node.body.members, function(item) {
            self.append(",")
            self.lines.push(inc(indent) + self.walk(item, indent, parentIndex))
        })
    }
    this.lines.push(indent + ")")
}

pp.genNodeOneLiner = function(node, indent, parentIndex) {
    var str = "";
    var currentIndex = this.nodeIndex++
        var tagName = node.name
    if (!/^[A-Z]/.test(node.name)) {
        tagName = "\"" + node.name + "\""
    }
    var pre = "React.createElement(" + tagName + ",";
    str += pre
    str += this.getAttrs(node)
    if (node.body) {
        var self = this
        __WEBPACK_IMPORTED_MODULE_0__util__["a" /* default */].each(node.body.members, function(item) {
            var body = self.walk(item, inc(indent), currentIndex, false)
            if (body) {
                str += "," + body
            }
        })
    }
    str += ")"
    return str
}

pp.genString = function(node, indent, parentIndex) {
    var line = node
    this.lines.push(line)
}

pp.append = function(str) {
    this.lines[this.lines.length - 1] = this.lines[this.lines.length - 1] + str
}

pp.genExpr = function(expr, indent, parentIndex) {
    var self = this
    var str = ""
    __WEBPACK_IMPORTED_MODULE_0__util__["a" /* default */].each(expr.members, function(item) {
        str = str + self.walkExpr(item)
    })
    return str
}

pp.getValue = function(value) {
    if (typeof value === "string") {
        return "\"" + value + "\""
    } else {
        return this.genExpr(value)
    }
}

pp.getAttrs = function(node, indent) {
    var str = '{'
    var attrs = node.attributes
    var i = 0;
    for (var key in attrs) {
        var attrStr = this.getValue(attrs[key])
        if (/\-/.test(key)) {
            key = "\"" + key + "\""
        }
        if (i++ != 0) {
            str += (', ' + key + ': ' + attrStr)
        } else {
            str += (key + ': ' + attrStr)
        }
    }
    str += '}'

    if (i === 0) {
        return "null"
    } else {
        return str;
    }
}

function inc(indent) {
    return indent + '  '
}

var keyIndex = 0

function getKey() {
    return 'key' + keyIndex++
}




/* harmony default export */ __webpack_exports__["a"] = (CodeGen);


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__tokenizer__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__tokentypes__ = __webpack_require__(1);



var typesName = {}
typesName[__WEBPACK_IMPORTED_MODULE_1__tokentypes__["a" /* default */].TK_TEXT] = "text node"
typesName[__WEBPACK_IMPORTED_MODULE_1__tokentypes__["a" /* default */].TK_LCB] = "left curly brace"
typesName[__WEBPACK_IMPORTED_MODULE_1__tokentypes__["a" /* default */].TK_RCB] = "right curly brace"
typesName[__WEBPACK_IMPORTED_MODULE_1__tokentypes__["a" /* default */].TK_GT] = ">"
typesName[__WEBPACK_IMPORTED_MODULE_1__tokentypes__["a" /* default */].TK_SLASH_GT] = "/>"
typesName[__WEBPACK_IMPORTED_MODULE_1__tokentypes__["a" /* default */].TK_TAG_NAME] = "open tag name"
typesName[__WEBPACK_IMPORTED_MODULE_1__tokentypes__["a" /* default */].TK_ATTR_NAME] = "attribute name"
typesName[__WEBPACK_IMPORTED_MODULE_1__tokentypes__["a" /* default */].TK_ATTR_EQUAL] = "="
typesName[__WEBPACK_IMPORTED_MODULE_1__tokentypes__["a" /* default */].TK_ATTR_STRING] = "attribute string"
typesName[__WEBPACK_IMPORTED_MODULE_1__tokentypes__["a" /* default */].TK_CLOSE_TAG] = "close tag"
typesName[__WEBPACK_IMPORTED_MODULE_1__tokentypes__["a" /* default */].TK_EOF] = "EOF"

function Parser (input) {
  this.tokens = new __WEBPACK_IMPORTED_MODULE_0__tokenizer__["a" /* default */](input)
}

var pp = Parser.prototype

pp.is = function (type) {
  return (this.tokens.peekToken().type === type)
}

pp.parse = function () {
  this.tokens.index = 0
  var root = this.parseProgram()
  this.eat(__WEBPACK_IMPORTED_MODULE_1__tokentypes__["a" /* default */].TK_EOF)
  return root
}

pp.parseProgram = function () {
  if (this.is(__WEBPACK_IMPORTED_MODULE_1__tokentypes__["a" /* default */].TK_TAG_NAME)) {
    var node = this.parseNode()
    return node
  }else {
    // error
  }
}

pp.parseStat = function () {
  var stat = {
    type: 'Stat',
    members: []
  }
  if (
    this.is(__WEBPACK_IMPORTED_MODULE_1__tokentypes__["a" /* default */].TK_TAG_NAME) ||
    this.is(__WEBPACK_IMPORTED_MODULE_1__tokentypes__["a" /* default */].TK_TEXT) ||
    this.is(__WEBPACK_IMPORTED_MODULE_1__tokentypes__["a" /* default */].TK_LCB)
  ) {
    pushMembers(stat.members, [this.parseFrag()])
    pushMembers(stat.members, this.parseStat().members)
  } else {// TODO: Follow check
    // end
  }
  return stat
}

/*
 * push stat's memeber and concat all text
 */
function pushMembers (target, candidates) {
  for (var i = 0, len = candidates.length; i < len; i++) {
    var lasIdx = target.length - 1
    if (
      isString(target[lasIdx]) && 
      isString(candidates[i])
    ) {
      target[lasIdx] += candidates[i]
    } else {
      target.push(candidates[i])
    }
  }
}

function isString (str) {
  return typeof str === 'string'
}

pp.parseFrag = function () {
  if (this.is(__WEBPACK_IMPORTED_MODULE_1__tokentypes__["a" /* default */].TK_TAG_NAME)) return this.parseNode()
  else if (this.is(__WEBPACK_IMPORTED_MODULE_1__tokentypes__["a" /* default */].TK_LCB)) {
    this.eat(__WEBPACK_IMPORTED_MODULE_1__tokentypes__["a" /* default */].TK_LCB)
    return this.parseExpr()
  }
  else if (this.is(__WEBPACK_IMPORTED_MODULE_1__tokentypes__["a" /* default */].TK_TEXT)) {
    var token = this.eat(__WEBPACK_IMPORTED_MODULE_1__tokentypes__["a" /* default */].TK_TEXT)
    return token.label
  } else {
    this.parseError('parseFrag')
  }
}

/*
 * Node -> OpenTag NodeTail
 */

pp.parseNode = function () {
  var token = this.tokens.peekToken()
  var node = {
    type: 'Node',
    name: token.label
  }
  this.parseOpenTag(node)
  this.parseNodeTail(node)
  return node
}

/*
 * OpenTag -> tagName Attrs
 */

pp.parseOpenTag = function (node) {
  this.eat(__WEBPACK_IMPORTED_MODULE_1__tokentypes__["a" /* default */].TK_TAG_NAME)
  node.attributes = this.parseAttrs()
}

/*
 * NodeTail -> '>' Stat closeTag
 *           | '/>'
 */

pp.parseNodeTail = function (node) {
  if (this.is(__WEBPACK_IMPORTED_MODULE_1__tokentypes__["a" /* default */].TK_GT)) {
    this.eat(__WEBPACK_IMPORTED_MODULE_1__tokentypes__["a" /* default */].TK_GT)
    node.body = this.parseStat()
    this.eat(__WEBPACK_IMPORTED_MODULE_1__tokentypes__["a" /* default */].TK_CLOSE_TAG)
  } else if (this.is(__WEBPACK_IMPORTED_MODULE_1__tokentypes__["a" /* default */].TK_SLASH_GT)) {
    this.eat(__WEBPACK_IMPORTED_MODULE_1__tokentypes__["a" /* default */].TK_SLASH_GT)
  } else {
    this.parseError('parseNodeTail')
  }
}

pp.parseAttrs = function () {
  var attrs = {}
  if (this.is(__WEBPACK_IMPORTED_MODULE_1__tokentypes__["a" /* default */].TK_ATTR_NAME)) {
    extend(attrs, this.parseAttr())
    extend(attrs, this.parseAttrs())
  } else if (
    this.is(__WEBPACK_IMPORTED_MODULE_1__tokentypes__["a" /* default */].TK_GT) ||
    this.is(__WEBPACK_IMPORTED_MODULE_1__tokentypes__["a" /* default */].TK_SLASH_GT)
  ) {
    // do nothing
  } else {
    this.parseError('parseAttrs')
  }
  return attrs
}

pp.parseAttr = function () {
  var attr = {}
  var token = this.eat(__WEBPACK_IMPORTED_MODULE_1__tokentypes__["a" /* default */].TK_ATTR_NAME)
  var value = this.parseValue()
  attr[token.label] = value
  return attr
}

/*
 * Expr -> ExprFrag Expr | ε
 * ExprFrag -> text | Node
 */

pp.parseExpr = function () {
  var expr = {
    type: 'Expr',
    members: []
  }
  if (this.is(__WEBPACK_IMPORTED_MODULE_1__tokentypes__["a" /* default */].TK_RCB)) {
     this.eat(__WEBPACK_IMPORTED_MODULE_1__tokentypes__["a" /* default */].TK_RCB)
  } else{
     pushMembers(expr.members, [this.parseExprFrag()])
     pushMembers(expr.members, this.parseExpr().members)
  }
  return expr
}

pp.parseExprFrag = function () {
  if (this.is(__WEBPACK_IMPORTED_MODULE_1__tokentypes__["a" /* default */].TK_TAG_NAME)) return this.parseNode()
  else if (this.is(__WEBPACK_IMPORTED_MODULE_1__tokentypes__["a" /* default */].TK_TEXT)) {
    var token = this.eat(__WEBPACK_IMPORTED_MODULE_1__tokentypes__["a" /* default */].TK_TEXT)
    return token.label
  } else {
    this.parseError('parseExprFrag')
  }
}

pp.parseValue = function () {
  if (
    this.is(__WEBPACK_IMPORTED_MODULE_1__tokentypes__["a" /* default */].TK_ATTR_EQUAL)
  ) {
    this.eat(__WEBPACK_IMPORTED_MODULE_1__tokentypes__["a" /* default */].TK_ATTR_EQUAL)
    if (this.is(__WEBPACK_IMPORTED_MODULE_1__tokentypes__["a" /* default */].TK_LCB)){
      this.eat(__WEBPACK_IMPORTED_MODULE_1__tokentypes__["a" /* default */].TK_LCB)
      var expr = this.parseExpr()
      this.tokens.restoreContext(__WEBPACK_IMPORTED_MODULE_1__tokentypes__["a" /* default */].TK_TAG_NAME)
      return expr
    }else {
      var token = this.eat(__WEBPACK_IMPORTED_MODULE_1__tokentypes__["a" /* default */].TK_ATTR_STRING)
      return token.label
    }
  } else if (
    this.is(__WEBPACK_IMPORTED_MODULE_1__tokentypes__["a" /* default */].TK_GT) ||
    this.is(__WEBPACK_IMPORTED_MODULE_1__tokentypes__["a" /* default */].TK_SLASH_GT) ||
    this.is(__WEBPACK_IMPORTED_MODULE_1__tokentypes__["a" /* default */].TK_ATTR_NAME)
  ) {
    // do nothing
  } else {
    this.parseError('parseValue')
  }
}

pp.error = function (msg) {
  throw new Error('Parse Error: ' + msg)
}

pp.parseError = function (name) {
  var token = this.tokens.peekToken()
  this.error('in ' + name + ', unexpected token \'' + token.label + '\'')
}

pp.eat = function (type) {
  var token = this.tokens.nextToken()
  if (token.type !== type) {
    this.error('expect a(n) ' + typesName[type] + ', but got a(n) ' + typesName[token.type])
  }
  return token
}

function extend (src, dest) {
  for (var key in dest) {
    if (dest.hasOwnProperty(key)) {
      src[key] = dest[key]
    }
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Parser);

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__parser__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__tokenizer__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__codegen__ = __webpack_require__(2);




var transpiler = {}

transpiler.transpile = function (code) {
	var astRoot = (new __WEBPACK_IMPORTED_MODULE_0__parser__["a" /* default */](code)).parse()
	var code = new __WEBPACK_IMPORTED_MODULE_2__codegen__["a" /* default */](astRoot)
	/**
	 * dev code
	 */
	// console.log(astRoot)
	// var textarea = document.querySelector("#codegen")
	// textarea.value = code.body
	return code
}


/* harmony default export */ __webpack_exports__["default"] = (transpiler);

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {var _ = {}

_.each = function (list, callback) {
  for (var i = 0, len = list.length; i < len; i++) {
    callback(list[i], i)
  }
}

/**
 * Shallowly copy properties to object
 * @param {Object} dest
 * @param {Object} src
 * @return {Object} - The result of extending `src` to `dest`.
 */

_.extend = function (dest, src) {
  for (var key in src) {
    if (src.hasOwnProperty(key)) {
      dest[key] = src[key]
    }
  }
  return dest
}

if (process.env.NODE_ENV) {
  _.nextTick = process.nextTick
} else {
  var nextTick = window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame

  if (nextTick) {
    _.nextTick = function () {
      nextTick.apply(window, arguments)
    }
  } else {
    _.nextTick = function (func) {
      // for IE, setTimeout is a cool object instead of function
      // so you cannot simply use nextTick.apply
      setTimeout(func)
    }
  }
}

/* harmony default export */ __webpack_exports__["a"] = (_);
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(6)))

/***/ }),
/* 6 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ })
/******/ ]);
});