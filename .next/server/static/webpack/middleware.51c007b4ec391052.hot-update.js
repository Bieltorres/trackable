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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   config: () => (/* binding */ config),\n/* harmony export */   middleware: () => (/* binding */ middleware)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(middleware)/./node_modules/next/dist/esm/api/server.js\");\n\nfunction middleware(req) {\n    const token = req.cookies.get(\"token\")?.value;\n    // se não houver token, redireciona para login\n    if (!token) {\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.redirect(new URL(\"/login\", req.url));\n    }\n    // caso contrário, continua normalmente\n    return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.next();\n}\n// define onde o middleware deve rodar\nconst config = {\n    matcher: [\n        \"/dashboard/:path*\",\n        \"/area-membros/:path*\"\n    ]\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKG1pZGRsZXdhcmUpLy4vbWlkZGxld2FyZS50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7QUFBMkM7QUFHcEMsU0FBU0MsV0FBV0MsR0FBZ0I7SUFDekMsTUFBTUMsUUFBUUQsSUFBSUUsT0FBTyxDQUFDQyxHQUFHLENBQUMsVUFBVUM7SUFFeEMsOENBQThDO0lBQzlDLElBQUksQ0FBQ0gsT0FBTztRQUNWLE9BQU9ILHFEQUFZQSxDQUFDTyxRQUFRLENBQUMsSUFBSUMsSUFBSSxVQUFVTixJQUFJTyxHQUFHO0lBQ3hEO0lBRUEsdUNBQXVDO0lBQ3ZDLE9BQU9ULHFEQUFZQSxDQUFDVSxJQUFJO0FBQzFCO0FBRUEsc0NBQXNDO0FBQy9CLE1BQU1DLFNBQVM7SUFDcEJDLFNBQVM7UUFBQztRQUFxQjtLQUF1QjtBQUN4RCxFQUFFIiwic291cmNlcyI6WyJDOlxcVXNlcnNcXEdhYnJpZWwgVG9ycmVzXFxEZXNrdG9wXFxNZXVzIENsaWVudGVzXFxFcmlja1xcw4FyZWEgZGUgTWVtYnJvc1xcYXJlYV9kZV9tZW1icm9zXFxtaWRkbGV3YXJlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5leHRSZXNwb25zZSB9IGZyb20gXCJuZXh0L3NlcnZlclwiO1xyXG5pbXBvcnQgdHlwZSB7IE5leHRSZXF1ZXN0IH0gZnJvbSBcIm5leHQvc2VydmVyXCI7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gbWlkZGxld2FyZShyZXE6IE5leHRSZXF1ZXN0KSB7XHJcbiAgY29uc3QgdG9rZW4gPSByZXEuY29va2llcy5nZXQoXCJ0b2tlblwiKT8udmFsdWU7XHJcblxyXG4gIC8vIHNlIG7Do28gaG91dmVyIHRva2VuLCByZWRpcmVjaW9uYSBwYXJhIGxvZ2luXHJcbiAgaWYgKCF0b2tlbikge1xyXG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5yZWRpcmVjdChuZXcgVVJMKFwiL2xvZ2luXCIsIHJlcS51cmwpKTtcclxuICB9XHJcblxyXG4gIC8vIGNhc28gY29udHLDoXJpbywgY29udGludWEgbm9ybWFsbWVudGVcclxuICByZXR1cm4gTmV4dFJlc3BvbnNlLm5leHQoKTtcclxufVxyXG5cclxuLy8gZGVmaW5lIG9uZGUgbyBtaWRkbGV3YXJlIGRldmUgcm9kYXJcclxuZXhwb3J0IGNvbnN0IGNvbmZpZyA9IHtcclxuICBtYXRjaGVyOiBbXCIvZGFzaGJvYXJkLzpwYXRoKlwiLCBcIi9hcmVhLW1lbWJyb3MvOnBhdGgqXCJdLCAvLyByb3RhcyBxdWUgZXhpZ2VtIGxvZ2luXHJcbn07XHJcbiJdLCJuYW1lcyI6WyJOZXh0UmVzcG9uc2UiLCJtaWRkbGV3YXJlIiwicmVxIiwidG9rZW4iLCJjb29raWVzIiwiZ2V0IiwidmFsdWUiLCJyZWRpcmVjdCIsIlVSTCIsInVybCIsIm5leHQiLCJjb25maWciLCJtYXRjaGVyIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(middleware)/./middleware.ts\n");

/***/ })

});