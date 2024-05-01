/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!**************************************!*\
  !*** ./src/background/background.ts ***!
  \**************************************/
chrome.runtime.onMessage.addListener((msg, sender, sendRes) => {
    console.log(msg), console.log(sender), sendRes("from Background script");
});

/******/ })()
;
//# sourceMappingURL=background.js.map