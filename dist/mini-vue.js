/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/reactive/effect.js":
/*!********************************!*\
  !*** ./src/reactive/effect.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "effect": () => (/* binding */ effect),
/* harmony export */   "track": () => (/* binding */ track),
/* harmony export */   "trigger": () => (/* binding */ trigger)
/* harmony export */ });
let activeEffect

function effect(fn){
  const effectFn = ()=>{
    try{
      activeEffect = effectFn
      return fn()
    } finally {
      
    }
  }
  effectFn()
  return effectFn
}

const targetMap = new WeakMap()
function track(target,key){
  if(!activeEffect) return

  let depsMap = targetMap.get(target)
  if(!depsMap){
    targetMap.set(target,(depsMap = new Map()))
  }
  let deps = depsMap.get(key)
  if(!deps){
    depsMap.set(key,(deps = new Set()))
  }
  console.log(targetMap)
  deps.add(activeEffect)
}

function trigger(target,key){
  const depsMap = targetMap.get(target)
  if(!depsMap){
    return
  }

  const deps = depsMap.get(key)
  if(!deps){
    return
  }

  deps.forEach(effect=>{
    effect()
  })
}

/***/ }),

/***/ "./src/reactive/reactive.js":
/*!**********************************!*\
  !*** ./src/reactive/reactive.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "reactive": () => (/* binding */ reactive)
/* harmony export */ });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils */ "./src/utils/index.js");
/* harmony import */ var _effect__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./effect */ "./src/reactive/effect.js");


function reactive(target){
  if(!(0,_utils__WEBPACK_IMPORTED_MODULE_0__.isObject)(target)){
    return target;
  }

  const proxy = new Proxy(target,{
    get(target,key,receiver){
      const res = Reflect.get(target,key,receiver)
      ;(0,_effect__WEBPACK_IMPORTED_MODULE_1__.track)(target,key)
      return res
    },
    set(target,key,value,receiver){
      const res = Reflect.set(target,key,value,receiver)
      ;(0,_effect__WEBPACK_IMPORTED_MODULE_1__.trigger)(target,key)
      return res
    },
  })
  return proxy
}

/***/ }),

/***/ "./src/utils/index.js":
/*!****************************!*\
  !*** ./src/utils/index.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "isObject": () => (/* binding */ isObject)
/* harmony export */ });
function isObject(obj) {
  return typeof obj === 'object' && obj !== null
}

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _reactive_reactive__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./reactive/reactive */ "./src/reactive/reactive.js");
/* harmony import */ var _reactive_effect__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./reactive/effect */ "./src/reactive/effect.js");



const observed =(window.observed = (0,_reactive_reactive__WEBPACK_IMPORTED_MODULE_0__.reactive)({
  count:0
}))

;(0,_reactive_effect__WEBPACK_IMPORTED_MODULE_1__.effect)(()=>{
  console.log('onserved.count is',observed.count)
})
})();

/******/ })()
;