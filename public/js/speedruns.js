/******/ (function(modules) { // webpackBootstrap
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/speedruns.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/speedruns.js":
/*!*****************************!*\
  !*** ./src/js/speedruns.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("var speedruns = (function () {\r\n  var view = [];\r\n\r\n  function init() {\r\n    cacheDom();\r\n    bindEvents();\r\n    fetchSpeedrunStreams(\"\");\r\n  };\r\n\r\n  function cacheDom() {\r\n    $backButton = $(\"#back-button\");\r\n    $nextButton = $(\"#next-button\");\r\n  };\r\n\r\n  function bindEvents(){\r\n    $nextButton.on(\"click\", handleNextButtonClick);\r\n    $backButton.on(\"click\", handleBackButtonClick);\r\n  };\r\n\r\n  function handleBackButtonClick(){\r\n    var cursor = view.pagination.cursor;\r\n    var params = `&before=${cursor}`;\r\n    fetchSpeedrunStreams(params);\r\n  }\r\n\r\n  function handleNextButtonClick(){\r\n    var cursor = view.pagination.cursor;\r\n    var params = `&after=${cursor}`;\r\n    fetchSpeedrunStreams(params);\r\n  }\r\n\r\n  function fetchSpeedrunStreams(additionalParams) {\r\n    var url = `${\"http://localhost:9000\"}/streams?community_id=6e940c4a-c42f-47d2-af83-0a2c7e47c421`\r\n      + additionalParams;\r\n\r\n    $.ajax({\r\n      url: url,\r\n    })\r\n    .done(function(response) {\r\n      view = response;\r\n      renderStreams();\r\n    })\r\n    .fail(function() {\r\n      alert( \"error\" );\r\n    });\r\n  };\r\n\r\n  function renderStreams() {\r\n    var template = `\r\n    <table class='table is-narrow is-striped'>\r\n      <thead>\r\n        <tr>\r\n          <th>Name</th>\r\n          <th>Title</th>\r\n          <th>Viewers</th>\r\n        </tr>\r\n      </thead>\r\n      <tbody>\r\n        ${makeTemplate(view.data)}\r\n      </tbody>\r\n    </table>\r\n    `;\r\n\r\n    $(\"#target\").html(template);\r\n  };\r\n\r\n  function makeTemplate(data){\r\n    let baseUrl = \"https://www.twitch.tv/\"\r\n    let newList = '';\r\n    data.forEach(function(object){\r\n      newList += `<tr>\r\n                  <td>\r\n                    <a href=\"${baseUrl + object.user_name}\">\r\n                      ${object.user_name}\r\n                    </a>\r\n                  </td>\r\n                  <td>${object.title}</td>\r\n                  <td>${object.viewer_count}</td>\r\n                  </tr>`\r\n    });\r\n    return newList;\r\n  }\r\n\r\n  return {\r\n    init: init\r\n  }\r\n})()\r\n\r\nspeedruns.init();\r\n\n\n//# sourceURL=webpack:///./src/js/speedruns.js?");

/***/ })

/******/ });