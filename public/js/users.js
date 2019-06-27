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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/users.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/users.js":
/*!*************************!*\
  !*** ./src/js/users.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("var users = (function () {\r\n  var user = {};\r\n\r\n  function init() {\r\n    cacheDom();\r\n    bindEvents();\r\n  };\r\n\r\n  function cacheDom() {\r\n    $searchForm = $(\"#form\");\r\n    $usernameInput = $(\"#usernameInput\");\r\n  };\r\n\r\n  function bindEvents(){\r\n    $searchForm.on(\"submit\", handleSearchFormSubmit);\r\n  };\r\n\r\n  function handleSearchFormSubmit(evt){\r\n    evt.preventDefault();\r\n    var login = $usernameInput.val();\r\n    fetchUserData(login);\r\n  }\r\n\r\n  function fetchUserData(login) {\r\n    var url = `${\"http://localhost:9000\"}/users?name=${login}`;\r\n    $.ajax({\r\n      url: url\r\n    })\r\n    .done(function(response) {\r\n      user = response.data[0];\r\n      render();\r\n    })\r\n    .fail(function() {\r\n      alert( \"error\" );\r\n    });\r\n  };\r\n\r\n  function render() {\r\n    var template = `\r\n      <div class=\"card\">\r\n        <div class=\"card-content\">\r\n          <div class=\"media\">\r\n            <div class=\"media-left\">\r\n              <figure class=\"image is-48x48\">\r\n                <img src=\"${user.profile_image_url}\" alt=\"Placeholder image\" style=\"border-radius: 50%;\">\r\n              </figure>\r\n            </div>\r\n            <div class=\"media-content\">\r\n              <p class=\"title is-4\">${user.display_name}</p>\r\n            </div>\r\n          </div>\r\n\r\n          <div class=\"content\">\r\n            <table>\r\n              <tbody>\r\n                <tr>\r\n                  <td class=\"has-text-weight-bold\">ID</td>\r\n                  <td>${user.id}</td>\r\n                </tr>\r\n                <tr>\r\n                  <td class=\"has-text-weight-bold\">View Count</td>\r\n                  <td>${user.view_count}</td>\r\n                </tr>\r\n              </tbody>\r\n            </table>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    `;\r\n\r\n    $(\"#target\").html(template);\r\n  };\r\n\r\n  return {\r\n    init: init\r\n  }\r\n})()\r\n\r\nusers.init();\r\n\n\n//# sourceURL=webpack:///./src/js/users.js?");

/***/ })

/******/ });