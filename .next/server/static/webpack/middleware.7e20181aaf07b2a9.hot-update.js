"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("middleware",{

/***/ "(middleware)/./middleware.ts":
/*!***********************!*\
  !*** ./middleware.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   config: () => (/* binding */ config),\n/* harmony export */   middleware: () => (/* binding */ middleware)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(middleware)/./node_modules/next/dist/esm/api/server.js\");\n\nfunction middleware(req) {\n    const token = req.cookies.get(\"token\")?.value;\n    // se não houver token, redireciona para login\n    if (!token) {\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.redirect(new URL(\"/login\", req.url));\n    }\n    return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.next();\n}\n// só aplica em rotas protegidas\nconst config = {\n    matcher: [\n        \"/dashboard/:path*\",\n        \"/area-membros/:path*\"\n    ]\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKG1pZGRsZXdhcmUpLy4vbWlkZGxld2FyZS50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7QUFBMkM7QUFHcEMsU0FBU0MsV0FBV0MsR0FBZ0I7SUFDekMsTUFBTUMsUUFBUUQsSUFBSUUsT0FBTyxDQUFDQyxHQUFHLENBQUMsVUFBVUM7SUFFeEMsOENBQThDO0lBQzlDLElBQUksQ0FBQ0gsT0FBTztRQUNWLE9BQU9ILHFEQUFZQSxDQUFDTyxRQUFRLENBQUMsSUFBSUMsSUFBSSxVQUFVTixJQUFJTyxHQUFHO0lBQ3hEO0lBRUEsT0FBT1QscURBQVlBLENBQUNVLElBQUk7QUFDMUI7QUFFQSxnQ0FBZ0M7QUFDekIsTUFBTUMsU0FBUztJQUNwQkMsU0FBUztRQUFDO1FBQXFCO0tBQXVCO0FBQ3hELEVBQUUiLCJzb3VyY2VzIjpbIkM6XFxVc2Vyc1xcR2FicmllbCBUb3JyZXNcXERlc2t0b3BcXE1ldXMgQ2xpZW50ZXNcXEVyaWNrXFzDgXJlYSBkZSBNZW1icm9zXFxhcmVhX2RlX21lbWJyb3NcXG1pZGRsZXdhcmUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmV4dFJlc3BvbnNlIH0gZnJvbSBcIm5leHQvc2VydmVyXCI7XHJcbmltcG9ydCB0eXBlIHsgTmV4dFJlcXVlc3QgfSBmcm9tIFwibmV4dC9zZXJ2ZXJcIjtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBtaWRkbGV3YXJlKHJlcTogTmV4dFJlcXVlc3QpIHtcclxuICBjb25zdCB0b2tlbiA9IHJlcS5jb29raWVzLmdldChcInRva2VuXCIpPy52YWx1ZTtcclxuXHJcbiAgLy8gc2UgbsOjbyBob3V2ZXIgdG9rZW4sIHJlZGlyZWNpb25hIHBhcmEgbG9naW5cclxuICBpZiAoIXRva2VuKSB7XHJcbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLnJlZGlyZWN0KG5ldyBVUkwoXCIvbG9naW5cIiwgcmVxLnVybCkpO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIE5leHRSZXNwb25zZS5uZXh0KCk7XHJcbn1cclxuXHJcbi8vIHPDsyBhcGxpY2EgZW0gcm90YXMgcHJvdGVnaWRhc1xyXG5leHBvcnQgY29uc3QgY29uZmlnID0ge1xyXG4gIG1hdGNoZXI6IFtcIi9kYXNoYm9hcmQvOnBhdGgqXCIsIFwiL2FyZWEtbWVtYnJvcy86cGF0aCpcIl0sXHJcbn07XHJcbiJdLCJuYW1lcyI6WyJOZXh0UmVzcG9uc2UiLCJtaWRkbGV3YXJlIiwicmVxIiwidG9rZW4iLCJjb29raWVzIiwiZ2V0IiwidmFsdWUiLCJyZWRpcmVjdCIsIlVSTCIsInVybCIsIm5leHQiLCJjb25maWciLCJtYXRjaGVyIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(middleware)/./middleware.ts\n");

/***/ })

});