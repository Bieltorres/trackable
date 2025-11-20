/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "app/api/upload/thumbnail/route";
exports.ids = ["app/api/upload/thumbnail/route"];
exports.modules = {

/***/ "(rsc)/./app/api/upload/thumbnail/route.ts":
/*!*******************************************!*\
  !*** ./app/api/upload/thumbnail/route.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   POST: () => (/* binding */ POST),\n/* harmony export */   runtime: () => (/* binding */ runtime)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var _aws_sdk_client_s3__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @aws-sdk/client-s3 */ \"@aws-sdk/client-s3\");\n/* harmony import */ var _aws_sdk_client_s3__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_aws_sdk_client_s3__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _lib_s3__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/lib/s3 */ \"(rsc)/./lib/s3.ts\");\n// app/api/upload/thumbnail/route.ts\nconst runtime = \"nodejs\";\n\n\n\nasync function POST(req) {\n    try {\n        const BUCKET = process.env.AWS_S3_BUCKET;\n        const formData = await req.formData();\n        const file = formData.get(\"thumbnail\");\n        if (!file) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: \"Nenhum arquivo recebido\"\n            }, {\n                status: 400\n            });\n        }\n        // Validar tipo de imagem\n        if (!file.type.startsWith(\"image/\")) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: \"Apenas arquivos de imagem são permitidos\"\n            }, {\n                status: 400\n            });\n        }\n        const bytes = await file.arrayBuffer();\n        const buffer = Buffer.from(bytes);\n        // Gerar nome único para o arquivo\n        const extension = file.name.split(\".\").pop();\n        const key = `thumbnails/${Date.now()}-${Math.random().toString(36).substring(7)}.${extension}`;\n        await _lib_s3__WEBPACK_IMPORTED_MODULE_2__.s3.send(new _aws_sdk_client_s3__WEBPACK_IMPORTED_MODULE_1__.PutObjectCommand({\n            Bucket: BUCKET,\n            Key: key,\n            Body: buffer,\n            ContentType: file.type\n        }));\n        const url = `https://${BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            url\n        });\n    } catch (err) {\n        console.error(\"Erro ao enviar thumbnail para S3:\", err);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: err?.message ?? \"Falha no upload\"\n        }, {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL3VwbG9hZC90aHVtYm5haWwvcm91dGUudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsb0NBQW9DO0FBQzdCLE1BQU1BLFVBQVUsU0FBUztBQUVXO0FBQ1c7QUFDeEI7QUFFdkIsZUFBZUksS0FBS0MsR0FBWTtJQUNyQyxJQUFJO1FBQ0YsTUFBTUMsU0FBU0MsUUFBUUMsR0FBRyxDQUFDQyxhQUFhO1FBQ3hDLE1BQU1DLFdBQVcsTUFBTUwsSUFBSUssUUFBUTtRQUNuQyxNQUFNQyxPQUFPRCxTQUFTRSxHQUFHLENBQUM7UUFFMUIsSUFBSSxDQUFDRCxNQUFNO1lBQ1QsT0FBT1YscURBQVlBLENBQUNZLElBQUksQ0FDdEI7Z0JBQUVDLE9BQU87WUFBMEIsR0FDbkM7Z0JBQUVDLFFBQVE7WUFBSTtRQUVsQjtRQUVBLHlCQUF5QjtRQUN6QixJQUFJLENBQUNKLEtBQUtLLElBQUksQ0FBQ0MsVUFBVSxDQUFDLFdBQVc7WUFDbkMsT0FBT2hCLHFEQUFZQSxDQUFDWSxJQUFJLENBQ3RCO2dCQUFFQyxPQUFPO1lBQTJDLEdBQ3BEO2dCQUFFQyxRQUFRO1lBQUk7UUFFbEI7UUFFQSxNQUFNRyxRQUFRLE1BQU1QLEtBQUtRLFdBQVc7UUFDcEMsTUFBTUMsU0FBU0MsT0FBT0MsSUFBSSxDQUFDSjtRQUUzQixrQ0FBa0M7UUFDbEMsTUFBTUssWUFBWVosS0FBS2EsSUFBSSxDQUFDQyxLQUFLLENBQUMsS0FBS0MsR0FBRztRQUMxQyxNQUFNQyxNQUFNLENBQUMsV0FBVyxFQUFFQyxLQUFLQyxHQUFHLEdBQUcsQ0FBQyxFQUFFQyxLQUFLQyxNQUFNLEdBQUdDLFFBQVEsQ0FBQyxJQUFJQyxTQUFTLENBQUMsR0FBRyxDQUFDLEVBQUVWLFdBQVc7UUFFOUYsTUFBTXBCLHVDQUFFQSxDQUFDK0IsSUFBSSxDQUNYLElBQUloQyxnRUFBZ0JBLENBQUM7WUFDbkJpQyxRQUFRN0I7WUFDUjhCLEtBQUtUO1lBQ0xVLE1BQU1qQjtZQUNOa0IsYUFBYTNCLEtBQUtLLElBQUk7UUFDeEI7UUFHRixNQUFNdUIsTUFBTSxDQUFDLFFBQVEsRUFBRWpDLE9BQU8sSUFBSSxFQUFFQyxRQUFRQyxHQUFHLENBQUNnQyxVQUFVLENBQUMsZUFBZSxFQUFFYixLQUFLO1FBRWpGLE9BQU8xQixxREFBWUEsQ0FBQ1ksSUFBSSxDQUFDO1lBQUUwQjtRQUFJO0lBQ2pDLEVBQUUsT0FBT0UsS0FBVTtRQUNqQkMsUUFBUTVCLEtBQUssQ0FBQyxxQ0FBcUMyQjtRQUNuRCxPQUFPeEMscURBQVlBLENBQUNZLElBQUksQ0FDdEI7WUFBRUMsT0FBTzJCLEtBQUtFLFdBQVc7UUFBa0IsR0FDM0M7WUFBRTVCLFFBQVE7UUFBSTtJQUVsQjtBQUNGIiwic291cmNlcyI6WyJDOlxcVXNlcnNcXEdhYnJpZWwgVG9ycmVzXFxEZXNrdG9wXFxNZXVzIENsaWVudGVzXFxFcmlja1xcw4FyZWEgZGUgTWVtYnJvc1xcYXJlYV9kZV9tZW1icm9zXFxhcHBcXGFwaVxcdXBsb2FkXFx0aHVtYm5haWxcXHJvdXRlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIGFwcC9hcGkvdXBsb2FkL3RodW1ibmFpbC9yb3V0ZS50c1xyXG5leHBvcnQgY29uc3QgcnVudGltZSA9IFwibm9kZWpzXCI7XHJcblxyXG5pbXBvcnQgeyBOZXh0UmVzcG9uc2UgfSBmcm9tIFwibmV4dC9zZXJ2ZXJcIjtcclxuaW1wb3J0IHsgUHV0T2JqZWN0Q29tbWFuZCB9IGZyb20gXCJAYXdzLXNkay9jbGllbnQtczNcIjtcclxuaW1wb3J0IHsgczMgfSBmcm9tIFwiQC9saWIvczNcIjtcclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBQT1NUKHJlcTogUmVxdWVzdCkge1xyXG4gIHRyeSB7XHJcbiAgICBjb25zdCBCVUNLRVQgPSBwcm9jZXNzLmVudi5BV1NfUzNfQlVDS0VUITtcclxuICAgIGNvbnN0IGZvcm1EYXRhID0gYXdhaXQgcmVxLmZvcm1EYXRhKCk7XHJcbiAgICBjb25zdCBmaWxlID0gZm9ybURhdGEuZ2V0KFwidGh1bWJuYWlsXCIpIGFzIEZpbGU7XHJcblxyXG4gICAgaWYgKCFmaWxlKSB7XHJcbiAgICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbihcclxuICAgICAgICB7IGVycm9yOiBcIk5lbmh1bSBhcnF1aXZvIHJlY2ViaWRvXCIgfSxcclxuICAgICAgICB7IHN0YXR1czogNDAwIH1cclxuICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBWYWxpZGFyIHRpcG8gZGUgaW1hZ2VtXHJcbiAgICBpZiAoIWZpbGUudHlwZS5zdGFydHNXaXRoKFwiaW1hZ2UvXCIpKSB7XHJcbiAgICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbihcclxuICAgICAgICB7IGVycm9yOiBcIkFwZW5hcyBhcnF1aXZvcyBkZSBpbWFnZW0gc8OjbyBwZXJtaXRpZG9zXCIgfSxcclxuICAgICAgICB7IHN0YXR1czogNDAwIH1cclxuICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBieXRlcyA9IGF3YWl0IGZpbGUuYXJyYXlCdWZmZXIoKTtcclxuICAgIGNvbnN0IGJ1ZmZlciA9IEJ1ZmZlci5mcm9tKGJ5dGVzKTtcclxuXHJcbiAgICAvLyBHZXJhciBub21lIMO6bmljbyBwYXJhIG8gYXJxdWl2b1xyXG4gICAgY29uc3QgZXh0ZW5zaW9uID0gZmlsZS5uYW1lLnNwbGl0KFwiLlwiKS5wb3AoKTtcclxuICAgIGNvbnN0IGtleSA9IGB0aHVtYm5haWxzLyR7RGF0ZS5ub3coKX0tJHtNYXRoLnJhbmRvbSgpLnRvU3RyaW5nKDM2KS5zdWJzdHJpbmcoNyl9LiR7ZXh0ZW5zaW9ufWA7XHJcblxyXG4gICAgYXdhaXQgczMuc2VuZChcclxuICAgICAgbmV3IFB1dE9iamVjdENvbW1hbmQoe1xyXG4gICAgICAgIEJ1Y2tldDogQlVDS0VULFxyXG4gICAgICAgIEtleToga2V5LFxyXG4gICAgICAgIEJvZHk6IGJ1ZmZlcixcclxuICAgICAgICBDb250ZW50VHlwZTogZmlsZS50eXBlLFxyXG4gICAgICB9KVxyXG4gICAgKTtcclxuXHJcbiAgICBjb25zdCB1cmwgPSBgaHR0cHM6Ly8ke0JVQ0tFVH0uczMuJHtwcm9jZXNzLmVudi5BV1NfUkVHSU9OfS5hbWF6b25hd3MuY29tLyR7a2V5fWA7XHJcblxyXG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgdXJsIH0pO1xyXG4gIH0gY2F0Y2ggKGVycjogYW55KSB7XHJcbiAgICBjb25zb2xlLmVycm9yKFwiRXJybyBhbyBlbnZpYXIgdGh1bWJuYWlsIHBhcmEgUzM6XCIsIGVycik7XHJcbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oXHJcbiAgICAgIHsgZXJyb3I6IGVycj8ubWVzc2FnZSA/PyBcIkZhbGhhIG5vIHVwbG9hZFwiIH0sXHJcbiAgICAgIHsgc3RhdHVzOiA1MDAgfVxyXG4gICAgKTtcclxuICB9XHJcbn1cclxuIl0sIm5hbWVzIjpbInJ1bnRpbWUiLCJOZXh0UmVzcG9uc2UiLCJQdXRPYmplY3RDb21tYW5kIiwiczMiLCJQT1NUIiwicmVxIiwiQlVDS0VUIiwicHJvY2VzcyIsImVudiIsIkFXU19TM19CVUNLRVQiLCJmb3JtRGF0YSIsImZpbGUiLCJnZXQiLCJqc29uIiwiZXJyb3IiLCJzdGF0dXMiLCJ0eXBlIiwic3RhcnRzV2l0aCIsImJ5dGVzIiwiYXJyYXlCdWZmZXIiLCJidWZmZXIiLCJCdWZmZXIiLCJmcm9tIiwiZXh0ZW5zaW9uIiwibmFtZSIsInNwbGl0IiwicG9wIiwia2V5IiwiRGF0ZSIsIm5vdyIsIk1hdGgiLCJyYW5kb20iLCJ0b1N0cmluZyIsInN1YnN0cmluZyIsInNlbmQiLCJCdWNrZXQiLCJLZXkiLCJCb2R5IiwiQ29udGVudFR5cGUiLCJ1cmwiLCJBV1NfUkVHSU9OIiwiZXJyIiwiY29uc29sZSIsIm1lc3NhZ2UiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./app/api/upload/thumbnail/route.ts\n");

/***/ }),

/***/ "(rsc)/./lib/s3.ts":
/*!*******************!*\
  !*** ./lib/s3.ts ***!
  \*******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   s3: () => (/* binding */ s3)\n/* harmony export */ });\n/* harmony import */ var _aws_sdk_client_s3__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @aws-sdk/client-s3 */ \"@aws-sdk/client-s3\");\n/* harmony import */ var _aws_sdk_client_s3__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_aws_sdk_client_s3__WEBPACK_IMPORTED_MODULE_0__);\n// lib/s3.ts\n\nconst s3 = new _aws_sdk_client_s3__WEBPACK_IMPORTED_MODULE_0__.S3Client({\n    region: process.env.AWS_REGION,\n    credentials: {\n        accessKeyId: process.env.AWS_ACCESS_KEY_ID,\n        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY\n    }\n});\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvczMudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsWUFBWTtBQUNrQztBQUV2QyxNQUFNQyxLQUFLLElBQUlELHdEQUFRQSxDQUFDO0lBQzdCRSxRQUFRQyxRQUFRQyxHQUFHLENBQUNDLFVBQVU7SUFDOUJDLGFBQWE7UUFDWEMsYUFBYUosUUFBUUMsR0FBRyxDQUFDSSxpQkFBaUI7UUFDMUNDLGlCQUFpQk4sUUFBUUMsR0FBRyxDQUFDTSxxQkFBcUI7SUFDcEQ7QUFDRixHQUFHIiwic291cmNlcyI6WyJDOlxcVXNlcnNcXEdhYnJpZWwgVG9ycmVzXFxEZXNrdG9wXFxNZXVzIENsaWVudGVzXFxFcmlja1xcw4FyZWEgZGUgTWVtYnJvc1xcYXJlYV9kZV9tZW1icm9zXFxsaWJcXHMzLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIGxpYi9zMy50c1xyXG5pbXBvcnQgeyBTM0NsaWVudCB9IGZyb20gXCJAYXdzLXNkay9jbGllbnQtczNcIjtcclxuXHJcbmV4cG9ydCBjb25zdCBzMyA9IG5ldyBTM0NsaWVudCh7XHJcbiAgcmVnaW9uOiBwcm9jZXNzLmVudi5BV1NfUkVHSU9OISwgLy8gdXMtZWFzdC0xIG5vIHNldSAuZW52XHJcbiAgY3JlZGVudGlhbHM6IHtcclxuICAgIGFjY2Vzc0tleUlkOiBwcm9jZXNzLmVudi5BV1NfQUNDRVNTX0tFWV9JRCEsXHJcbiAgICBzZWNyZXRBY2Nlc3NLZXk6IHByb2Nlc3MuZW52LkFXU19TRUNSRVRfQUNDRVNTX0tFWSEsXHJcbiAgfSxcclxufSk7XHJcbiJdLCJuYW1lcyI6WyJTM0NsaWVudCIsInMzIiwicmVnaW9uIiwicHJvY2VzcyIsImVudiIsIkFXU19SRUdJT04iLCJjcmVkZW50aWFscyIsImFjY2Vzc0tleUlkIiwiQVdTX0FDQ0VTU19LRVlfSUQiLCJzZWNyZXRBY2Nlc3NLZXkiLCJBV1NfU0VDUkVUX0FDQ0VTU19LRVkiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./lib/s3.ts\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fupload%2Fthumbnail%2Froute&page=%2Fapi%2Fupload%2Fthumbnail%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fupload%2Fthumbnail%2Froute.ts&appDir=C%3A%5CUsers%5CGabriel%20Torres%5CDesktop%5CMeus%20Clientes%5CErick%5C%C3%81rea%20de%20Membros%5Carea_de_membros%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CGabriel%20Torres%5CDesktop%5CMeus%20Clientes%5CErick%5C%C3%81rea%20de%20Membros%5Carea_de_membros&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fupload%2Fthumbnail%2Froute&page=%2Fapi%2Fupload%2Fthumbnail%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fupload%2Fthumbnail%2Froute.ts&appDir=C%3A%5CUsers%5CGabriel%20Torres%5CDesktop%5CMeus%20Clientes%5CErick%5C%C3%81rea%20de%20Membros%5Carea_de_membros%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CGabriel%20Torres%5CDesktop%5CMeus%20Clientes%5CErick%5C%C3%81rea%20de%20Membros%5Carea_de_membros&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var C_Users_Gabriel_Torres_Desktop_Meus_Clientes_Erick_rea_de_Membros_area_de_membros_app_api_upload_thumbnail_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/upload/thumbnail/route.ts */ \"(rsc)/./app/api/upload/thumbnail/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/upload/thumbnail/route\",\n        pathname: \"/api/upload/thumbnail\",\n        filename: \"route\",\n        bundlePath: \"app/api/upload/thumbnail/route\"\n    },\n    resolvedPagePath: \"C:\\\\Users\\\\Gabriel Torres\\\\Desktop\\\\Meus Clientes\\\\Erick\\\\Área de Membros\\\\area_de_membros\\\\app\\\\api\\\\upload\\\\thumbnail\\\\route.ts\",\n    nextConfigOutput,\n    userland: C_Users_Gabriel_Torres_Desktop_Meus_Clientes_Erick_rea_de_Membros_area_de_membros_app_api_upload_thumbnail_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZhcGklMkZ1cGxvYWQlMkZ0aHVtYm5haWwlMkZyb3V0ZSZwYWdlPSUyRmFwaSUyRnVwbG9hZCUyRnRodW1ibmFpbCUyRnJvdXRlJmFwcFBhdGhzPSZwYWdlUGF0aD1wcml2YXRlLW5leHQtYXBwLWRpciUyRmFwaSUyRnVwbG9hZCUyRnRodW1ibmFpbCUyRnJvdXRlLnRzJmFwcERpcj1DJTNBJTVDVXNlcnMlNUNHYWJyaWVsJTIwVG9ycmVzJTVDRGVza3RvcCU1Q01ldXMlMjBDbGllbnRlcyU1Q0VyaWNrJTVDJUMzJTgxcmVhJTIwZGUlMjBNZW1icm9zJTVDYXJlYV9kZV9tZW1icm9zJTVDYXBwJnBhZ2VFeHRlbnNpb25zPXRzeCZwYWdlRXh0ZW5zaW9ucz10cyZwYWdlRXh0ZW5zaW9ucz1qc3gmcGFnZUV4dGVuc2lvbnM9anMmcm9vdERpcj1DJTNBJTVDVXNlcnMlNUNHYWJyaWVsJTIwVG9ycmVzJTVDRGVza3RvcCU1Q01ldXMlMjBDbGllbnRlcyU1Q0VyaWNrJTVDJUMzJTgxcmVhJTIwZGUlMjBNZW1icm9zJTVDYXJlYV9kZV9tZW1icm9zJmlzRGV2PXRydWUmdHNjb25maWdQYXRoPXRzY29uZmlnLmpzb24mYmFzZVBhdGg9JmFzc2V0UHJlZml4PSZuZXh0Q29uZmlnT3V0cHV0PSZwcmVmZXJyZWRSZWdpb249Jm1pZGRsZXdhcmVDb25maWc9ZTMwJTNEISIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUErRjtBQUN2QztBQUNxQjtBQUNpRjtBQUM5SjtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IseUdBQW1CO0FBQzNDO0FBQ0EsY0FBYyxrRUFBUztBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsWUFBWTtBQUNaLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSxRQUFRLHNEQUFzRDtBQUM5RDtBQUNBLFdBQVcsNEVBQVc7QUFDdEI7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUMwRjs7QUFFMUYiLCJzb3VyY2VzIjpbIiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBcHBSb3V0ZVJvdXRlTW9kdWxlIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvcm91dGUtbW9kdWxlcy9hcHAtcm91dGUvbW9kdWxlLmNvbXBpbGVkXCI7XG5pbXBvcnQgeyBSb3V0ZUtpbmQgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9yb3V0ZS1raW5kXCI7XG5pbXBvcnQgeyBwYXRjaEZldGNoIGFzIF9wYXRjaEZldGNoIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvbGliL3BhdGNoLWZldGNoXCI7XG5pbXBvcnQgKiBhcyB1c2VybGFuZCBmcm9tIFwiQzpcXFxcVXNlcnNcXFxcR2FicmllbCBUb3JyZXNcXFxcRGVza3RvcFxcXFxNZXVzIENsaWVudGVzXFxcXEVyaWNrXFxcXMOBcmVhIGRlIE1lbWJyb3NcXFxcYXJlYV9kZV9tZW1icm9zXFxcXGFwcFxcXFxhcGlcXFxcdXBsb2FkXFxcXHRodW1ibmFpbFxcXFxyb3V0ZS50c1wiO1xuLy8gV2UgaW5qZWN0IHRoZSBuZXh0Q29uZmlnT3V0cHV0IGhlcmUgc28gdGhhdCB3ZSBjYW4gdXNlIHRoZW0gaW4gdGhlIHJvdXRlXG4vLyBtb2R1bGUuXG5jb25zdCBuZXh0Q29uZmlnT3V0cHV0ID0gXCJcIlxuY29uc3Qgcm91dGVNb2R1bGUgPSBuZXcgQXBwUm91dGVSb3V0ZU1vZHVsZSh7XG4gICAgZGVmaW5pdGlvbjoge1xuICAgICAgICBraW5kOiBSb3V0ZUtpbmQuQVBQX1JPVVRFLFxuICAgICAgICBwYWdlOiBcIi9hcGkvdXBsb2FkL3RodW1ibmFpbC9yb3V0ZVwiLFxuICAgICAgICBwYXRobmFtZTogXCIvYXBpL3VwbG9hZC90aHVtYm5haWxcIixcbiAgICAgICAgZmlsZW5hbWU6IFwicm91dGVcIixcbiAgICAgICAgYnVuZGxlUGF0aDogXCJhcHAvYXBpL3VwbG9hZC90aHVtYm5haWwvcm91dGVcIlxuICAgIH0sXG4gICAgcmVzb2x2ZWRQYWdlUGF0aDogXCJDOlxcXFxVc2Vyc1xcXFxHYWJyaWVsIFRvcnJlc1xcXFxEZXNrdG9wXFxcXE1ldXMgQ2xpZW50ZXNcXFxcRXJpY2tcXFxcw4FyZWEgZGUgTWVtYnJvc1xcXFxhcmVhX2RlX21lbWJyb3NcXFxcYXBwXFxcXGFwaVxcXFx1cGxvYWRcXFxcdGh1bWJuYWlsXFxcXHJvdXRlLnRzXCIsXG4gICAgbmV4dENvbmZpZ091dHB1dCxcbiAgICB1c2VybGFuZFxufSk7XG4vLyBQdWxsIG91dCB0aGUgZXhwb3J0cyB0aGF0IHdlIG5lZWQgdG8gZXhwb3NlIGZyb20gdGhlIG1vZHVsZS4gVGhpcyBzaG91bGRcbi8vIGJlIGVsaW1pbmF0ZWQgd2hlbiB3ZSd2ZSBtb3ZlZCB0aGUgb3RoZXIgcm91dGVzIHRvIHRoZSBuZXcgZm9ybWF0LiBUaGVzZVxuLy8gYXJlIHVzZWQgdG8gaG9vayBpbnRvIHRoZSByb3V0ZS5cbmNvbnN0IHsgd29ya0FzeW5jU3RvcmFnZSwgd29ya1VuaXRBc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzIH0gPSByb3V0ZU1vZHVsZTtcbmZ1bmN0aW9uIHBhdGNoRmV0Y2goKSB7XG4gICAgcmV0dXJuIF9wYXRjaEZldGNoKHtcbiAgICAgICAgd29ya0FzeW5jU3RvcmFnZSxcbiAgICAgICAgd29ya1VuaXRBc3luY1N0b3JhZ2VcbiAgICB9KTtcbn1cbmV4cG9ydCB7IHJvdXRlTW9kdWxlLCB3b3JrQXN5bmNTdG9yYWdlLCB3b3JrVW5pdEFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MsIHBhdGNoRmV0Y2gsICB9O1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1hcHAtcm91dGUuanMubWFwIl0sIm5hbWVzIjpbXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fupload%2Fthumbnail%2Froute&page=%2Fapi%2Fupload%2Fthumbnail%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fupload%2Fthumbnail%2Froute.ts&appDir=C%3A%5CUsers%5CGabriel%20Torres%5CDesktop%5CMeus%20Clientes%5CErick%5C%C3%81rea%20de%20Membros%5Carea_de_membros%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CGabriel%20Torres%5CDesktop%5CMeus%20Clientes%5CErick%5C%C3%81rea%20de%20Membros%5Carea_de_membros&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "(ssr)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "../app-render/after-task-async-storage.external":
/*!***********************************************************************************!*\
  !*** external "next/dist/server/app-render/after-task-async-storage.external.js" ***!
  \***********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/after-task-async-storage.external.js");

/***/ }),

/***/ "../app-render/work-async-storage.external":
/*!*****************************************************************************!*\
  !*** external "next/dist/server/app-render/work-async-storage.external.js" ***!
  \*****************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-async-storage.external.js");

/***/ }),

/***/ "./work-unit-async-storage.external":
/*!**********************************************************************************!*\
  !*** external "next/dist/server/app-render/work-unit-async-storage.external.js" ***!
  \**********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-unit-async-storage.external.js");

/***/ }),

/***/ "@aws-sdk/client-s3":
/*!*************************************!*\
  !*** external "@aws-sdk/client-s3" ***!
  \*************************************/
/***/ ((module) => {

"use strict";
module.exports = require("@aws-sdk/client-s3");

/***/ }),

/***/ "next/dist/compiled/next-server/app-page.runtime.dev.js":
/*!*************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-page.runtime.dev.js" ***!
  \*************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-page.runtime.dev.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fupload%2Fthumbnail%2Froute&page=%2Fapi%2Fupload%2Fthumbnail%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fupload%2Fthumbnail%2Froute.ts&appDir=C%3A%5CUsers%5CGabriel%20Torres%5CDesktop%5CMeus%20Clientes%5CErick%5C%C3%81rea%20de%20Membros%5Carea_de_membros%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CGabriel%20Torres%5CDesktop%5CMeus%20Clientes%5CErick%5C%C3%81rea%20de%20Membros%5Carea_de_membros&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();