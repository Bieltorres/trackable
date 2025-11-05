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
exports.id = "app/api/anotacoes/route";
exports.ids = ["app/api/anotacoes/route"];
exports.modules = {

/***/ "(rsc)/./app/api/anotacoes/route.ts":
/*!************************************!*\
  !*** ./app/api/anotacoes/route.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ GET),\n/* harmony export */   POST: () => (/* binding */ POST)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var _lib_prisma__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/lib/prisma */ \"(rsc)/./lib/prisma.ts\");\n/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! jsonwebtoken */ \"(rsc)/./node_modules/jsonwebtoken/index.js\");\n/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(jsonwebtoken__WEBPACK_IMPORTED_MODULE_2__);\n\n\n\nconst JWT_SECRET = process.env.JWT_SECRET || \"your-secret-key\";\nasync function getUserFromToken(request) {\n    const token = request.cookies.get(\"token\")?.value;\n    if (!token) {\n        throw new Error(\"Token nao encontrado\");\n    }\n    try {\n        const decoded = jsonwebtoken__WEBPACK_IMPORTED_MODULE_2___default().verify(token, JWT_SECRET);\n        const userId = decoded.sub || decoded.id;\n        if (!userId) {\n            throw new Error(\"Token sem identificador de usuário\");\n        }\n        return userId;\n    } catch  {\n        throw new Error(\"Token invalido\");\n    }\n}\nasync function GET(request) {\n    try {\n        const userId = await getUserFromToken(request);\n        const { searchParams } = new URL(request.url);\n        const cursoId = searchParams.get(\"cursoId\");\n        const aulaId = searchParams.get(\"aulaId\");\n        const anotacoes = await _lib_prisma__WEBPACK_IMPORTED_MODULE_1__.prisma.anotacao.findMany({\n            where: {\n                usuarioId: userId,\n                ...cursoId ? {\n                    cursoId\n                } : {},\n                ...aulaId ? {\n                    aulaId\n                } : {}\n            },\n            include: {\n                curso: {\n                    select: {\n                        id: true,\n                        titulo: true,\n                        categoria: {\n                            select: {\n                                nome: true\n                            }\n                        }\n                    }\n                },\n                aula: {\n                    select: {\n                        id: true,\n                        titulo: true\n                    }\n                }\n            },\n            orderBy: {\n                dataCriacao: \"desc\"\n            }\n        });\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            data: anotacoes\n        });\n    } catch (error) {\n        console.error(\"Erro ao buscar anotacoes:\", error);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: \"Erro interno do servidor\"\n        }, {\n            status: 500\n        });\n    }\n}\nasync function POST(request) {\n    try {\n        const userId = await getUserFromToken(request);\n        const { titulo, conteudo, cursoId, aulaId, cor, corTexto } = await request.json();\n        if (!titulo || !conteudo || !cursoId) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: \"Campos obrigatorios: titulo, conteudo, cursoId\"\n            }, {\n                status: 400\n            });\n        }\n        const novaAnotacao = await _lib_prisma__WEBPACK_IMPORTED_MODULE_1__.prisma.anotacao.create({\n            data: {\n                titulo,\n                conteudo,\n                cursoId,\n                aulaId: aulaId || null,\n                usuarioId: userId,\n                cor: cor || \"bg-blue-100\",\n                corTexto: corTexto || \"text-blue-800\"\n            },\n            include: {\n                curso: {\n                    select: {\n                        id: true,\n                        titulo: true,\n                        categoria: {\n                            select: {\n                                nome: true\n                            }\n                        }\n                    }\n                },\n                aula: {\n                    select: {\n                        id: true,\n                        titulo: true\n                    }\n                }\n            }\n        });\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            data: novaAnotacao\n        });\n    } catch (error) {\n        console.error(\"Erro ao criar anotacao:\", error);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: \"Erro interno do servidor\"\n        }, {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O2dDQUNORyxNQUFNOzRCQUNSO3dCQUNGO29CQUNGO2dCQUNGO2dCQUNBQyxNQUFNO29CQUNKSixRQUFRO3dCQUNOZCxJQUFJO3dCQUNKZSxRQUFRO29CQUNWO2dCQUNGO1lBQ0Y7UUFDRjtRQUVBLE9BQU9oQyxxREFBWUEsQ0FBQ3NDLElBQUksQ0FBQztZQUFFQyxNQUFNUTtRQUFhO0lBQ2hELEVBQUUsT0FBT1AsT0FBTztRQUNkQyxRQUFRRCxLQUFLLENBQUMsMkJBQTJCQTtRQUN6QyxPQUFPeEMscURBQVlBLENBQUNzQyxJQUFJLENBQ3RCO1lBQUVFLE9BQU87UUFBMkIsR0FDcEM7WUFBRUUsUUFBUTtRQUFJO0lBRWxCO0FBQ0YiLCJzb3VyY2VzIjpbIkM6XFxVc2Vyc1xcR2FicmllbCBUb3JyZXNcXERlc2t0b3BcXE1ldXMgQ2xpZW50ZXNcXEVyaWNrXFzDgXJlYSBkZSBNZW1icm9zXFxhcmVhX2RlX21lbWJyb3NcXGFwcFxcYXBpXFxhbm90YWNvZXNcXHJvdXRlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5leHRSZXF1ZXN0LCBOZXh0UmVzcG9uc2UgfSBmcm9tIFwibmV4dC9zZXJ2ZXJcIjtcbmltcG9ydCB7IHByaXNtYSB9IGZyb20gXCJAL2xpYi9wcmlzbWFcIjtcbmltcG9ydCBqd3QgZnJvbSBcImpzb253ZWJ0b2tlblwiO1xuXG5jb25zdCBKV1RfU0VDUkVUID0gcHJvY2Vzcy5lbnYuSldUX1NFQ1JFVCB8fCBcInlvdXItc2VjcmV0LWtleVwiO1xuXG5hc3luYyBmdW5jdGlvbiBnZXRVc2VyRnJvbVRva2VuKHJlcXVlc3Q6IE5leHRSZXF1ZXN0KSB7XG4gIGNvbnN0IHRva2VuID0gcmVxdWVzdC5jb29raWVzLmdldChcInRva2VuXCIpPy52YWx1ZTtcblxuICBpZiAoIXRva2VuKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiVG9rZW4gbmFvIGVuY29udHJhZG9cIik7XG4gIH1cblxuICB0cnkge1xuICAgIGNvbnN0IGRlY29kZWQgPSBqd3QudmVyaWZ5KHRva2VuLCBKV1RfU0VDUkVUKSBhcyB7XG4gICAgICBzdWI/OiBzdHJpbmc7XG4gICAgICBpZD86IHN0cmluZztcbiAgICB9O1xuICAgIGNvbnN0IHVzZXJJZCA9IGRlY29kZWQuc3ViIHx8IGRlY29kZWQuaWQ7XG4gICAgaWYgKCF1c2VySWQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIlRva2VuIHNlbSBpZGVudGlmaWNhZG9yIGRlIHVzdcOhcmlvXCIpO1xuICAgIH1cbiAgICByZXR1cm4gdXNlcklkO1xuICB9IGNhdGNoIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJUb2tlbiBpbnZhbGlkb1wiKTtcbiAgfVxufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gR0VUKHJlcXVlc3Q6IE5leHRSZXF1ZXN0KSB7XG4gIHRyeSB7XG4gICAgY29uc3QgdXNlcklkID0gYXdhaXQgZ2V0VXNlckZyb21Ub2tlbihyZXF1ZXN0KTtcbiAgICBjb25zdCB7IHNlYXJjaFBhcmFtcyB9ID0gbmV3IFVSTChyZXF1ZXN0LnVybCk7XG4gICAgY29uc3QgY3Vyc29JZCA9IHNlYXJjaFBhcmFtcy5nZXQoXCJjdXJzb0lkXCIpO1xuICAgIGNvbnN0IGF1bGFJZCA9IHNlYXJjaFBhcmFtcy5nZXQoXCJhdWxhSWRcIik7XG5cbiAgICBjb25zdCBhbm90YWNvZXMgPSBhd2FpdCBwcmlzbWEuYW5vdGFjYW8uZmluZE1hbnkoe1xuICAgICAgd2hlcmU6IHtcbiAgICAgICAgdXN1YXJpb0lkOiB1c2VySWQsXG4gICAgICAgIC4uLihjdXJzb0lkID8geyBjdXJzb0lkIH0gOiB7fSksXG4gICAgICAgIC4uLihhdWxhSWQgPyB7IGF1bGFJZCB9IDoge30pLFxuICAgICAgfSxcbiAgICAgIGluY2x1ZGU6IHtcbiAgICAgICAgY3Vyc286IHtcbiAgICAgICAgICBzZWxlY3Q6IHtcbiAgICAgICAgICAgIGlkOiB0cnVlLFxuICAgICAgICAgICAgdGl0dWxvOiB0cnVlLFxuICAgICAgICAgICAgY2F0ZWdvcmlhOiB7XG4gICAgICAgICAgICAgIHNlbGVjdDoge1xuICAgICAgICAgICAgICAgIG5vbWU6IHRydWUsXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICAgIGF1bGE6IHtcbiAgICAgICAgICBzZWxlY3Q6IHtcbiAgICAgICAgICAgIGlkOiB0cnVlLFxuICAgICAgICAgICAgdGl0dWxvOiB0cnVlLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgICAgb3JkZXJCeTogeyBkYXRhQ3JpYWNhbzogXCJkZXNjXCIgfSxcbiAgICB9KTtcblxuICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7IGRhdGE6IGFub3RhY29lcyB9KTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb25zb2xlLmVycm9yKFwiRXJybyBhbyBidXNjYXIgYW5vdGFjb2VzOlwiLCBlcnJvcik7XG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKFxuICAgICAgeyBlcnJvcjogXCJFcnJvIGludGVybm8gZG8gc2Vydmlkb3JcIiB9LFxuICAgICAgeyBzdGF0dXM6IDUwMCB9XG4gICAgKTtcbiAgfVxufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gUE9TVChyZXF1ZXN0OiBOZXh0UmVxdWVzdCkge1xuICB0cnkge1xuICAgIGNvbnN0IHVzZXJJZCA9IGF3YWl0IGdldFVzZXJGcm9tVG9rZW4ocmVxdWVzdCk7XG4gICAgY29uc3QgeyB0aXR1bG8sIGNvbnRldWRvLCBjdXJzb0lkLCBhdWxhSWQsIGNvciwgY29yVGV4dG8gfSA9XG4gICAgICBhd2FpdCByZXF1ZXN0Lmpzb24oKTtcblxuICAgIGlmICghdGl0dWxvIHx8ICFjb250ZXVkbyB8fCAhY3Vyc29JZCkge1xuICAgICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKFxuICAgICAgICB7IGVycm9yOiBcIkNhbXBvcyBvYnJpZ2F0b3Jpb3M6IHRpdHVsbywgY29udGV1ZG8sIGN1cnNvSWRcIiB9LFxuICAgICAgICB7IHN0YXR1czogNDAwIH1cbiAgICAgICk7XG4gICAgfVxuXG4gICAgY29uc3Qgbm92YUFub3RhY2FvID0gYXdhaXQgcHJpc21hLmFub3RhY2FvLmNyZWF0ZSh7XG4gICAgICBkYXRhOiB7XG4gICAgICAgIHRpdHVsbyxcbiAgICAgICAgY29udGV1ZG8sXG4gICAgICAgIGN1cnNvSWQsXG4gICAgICAgIGF1bGFJZDogYXVsYUlkIHx8IG51bGwsXG4gICAgICAgIHVzdWFyaW9JZDogdXNlcklkLFxuICAgICAgICBjb3I6IGNvciB8fCBcImJnLWJsdWUtMTAwXCIsXG4gICAgICAgIGNvclRleHRvOiBjb3JUZXh0byB8fCBcInRleHQtYmx1ZS04MDBcIixcbiAgICAgIH0sXG4gICAgICBpbmNsdWRlOiB7XG4gICAgICAgIGN1cnNvOiB7XG4gICAgICAgICAgc2VsZWN0OiB7XG4gICAgICAgICAgICBpZDogdHJ1ZSxcbiAgICAgICAgICAgIHRpdHVsbzogdHJ1ZSxcbiAgICAgICAgICAgIGNhdGVnb3JpYToge1xuICAgICAgICAgICAgICBzZWxlY3Q6IHtcbiAgICAgICAgICAgICAgICBub21lOiB0cnVlLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgICBhdWxhOiB7XG4gICAgICAgICAgc2VsZWN0OiB7XG4gICAgICAgICAgICBpZDogdHJ1ZSxcbiAgICAgICAgICAgIHRpdHVsbzogdHJ1ZSxcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9KTtcblxuICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7IGRhdGE6IG5vdmFBbm90YWNhbyB9KTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb25zb2xlLmVycm9yKFwiRXJybyBhbyBjcmlhciBhbm90YWNhbzpcIiwgZXJyb3IpO1xuICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbihcbiAgICAgIHsgZXJyb3I6IFwiRXJybyBpbnRlcm5vIGRvIHNlcnZpZG9yXCIgfSxcbiAgICAgIHsgc3RhdHVzOiA1MDAgfVxuICAgICk7XG4gIH1cbn1cbiJdLCJuYW1lcyI6WyJOZXh0UmVzcG9uc2UiLCJwcmlzbWEiLCJqd3QiLCJKV1RfU0VDUkVUIiwicHJvY2VzcyIsImVudiIsImdldFVzZXJGcm9tVG9rZW4iLCJyZXF1ZXN0IiwidG9rZW4iLCJjb29raWVzIiwiZ2V0IiwidmFsdWUiLCJFcnJvciIsImRlY29kZWQiLCJ2ZXJpZnkiLCJ1c2VySWQiLCJzdWIiLCJpZCIsIkdFVCIsInNlYXJjaFBhcmFtcyIsIlVSTCIsInVybCIsImN1cnNvSWQiLCJhdWxhSWQiLCJhbm90YWNvZXMiLCJhbm90YWNhbyIsImZpbmRNYW55Iiwid2hlcmUiLCJ1c3VhcmlvSWQiLCJpbmNsdWRlIiwiY3Vyc28iLCJzZWxlY3QiLCJ0aXR1bG8iLCJjYXRlZ29yaWEiLCJub21lIiwiYXVsYSIsIm9yZGVyQnkiLCJkYXRhQ3JpYWNhbyIsImpzb24iLCJkYXRhIiwiZXJyb3IiLCJjb25zb2xlIiwic3RhdHVzIiwiUE9TVCIsImNvbnRldWRvIiwiY29yIiwiY29yVGV4dG8iLCJub3ZhQW5vdGFjYW8iLCJjcmVhdGUiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./app/api/anotacoes/route.ts\n");

/***/ }),

/***/ "(rsc)/./lib/prisma.ts":
/*!***********************!*\
  !*** ./lib/prisma.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__),\n/* harmony export */   prisma: () => (/* binding */ prisma)\n/* harmony export */ });\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @prisma/client */ \"@prisma/client\");\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_prisma_client__WEBPACK_IMPORTED_MODULE_0__);\n\nconst globalForPrisma = globalThis;\nconst prisma = globalForPrisma.prisma || new _prisma_client__WEBPACK_IMPORTED_MODULE_0__.PrismaClient({\n    log: [\n        \"query\",\n        \"error\",\n        \"warn\"\n    ]\n});\nif (true) globalForPrisma.prisma = prisma;\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (prisma);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvcHJpc21hLnRzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBOEM7QUFFOUMsTUFBTUMsa0JBQWtCQztBQUVqQixNQUFNQyxTQUNYRixnQkFBZ0JFLE1BQU0sSUFDdEIsSUFBSUgsd0RBQVlBLENBQUM7SUFDZkksS0FBSztRQUFDO1FBQVM7UUFBUztLQUFPO0FBQ2pDLEdBQUc7QUFFTCxJQUFJQyxJQUFxQyxFQUFFSixnQkFBZ0JFLE1BQU0sR0FBR0E7QUFFcEUsaUVBQWVBLE1BQU1BLEVBQUMiLCJzb3VyY2VzIjpbIkM6XFxVc2Vyc1xcR2FicmllbCBUb3JyZXNcXERlc2t0b3BcXE1ldXMgQ2xpZW50ZXNcXEVyaWNrXFzDgXJlYSBkZSBNZW1icm9zXFxhcmVhX2RlX21lbWJyb3NcXGxpYlxccHJpc21hLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFByaXNtYUNsaWVudCB9IGZyb20gXCJAcHJpc21hL2NsaWVudFwiO1xyXG5cclxuY29uc3QgZ2xvYmFsRm9yUHJpc21hID0gZ2xvYmFsVGhpcyBhcyB1bmtub3duIGFzIHsgcHJpc21hOiBQcmlzbWFDbGllbnQgfTtcclxuXHJcbmV4cG9ydCBjb25zdCBwcmlzbWEgPVxyXG4gIGdsb2JhbEZvclByaXNtYS5wcmlzbWEgfHxcclxuICBuZXcgUHJpc21hQ2xpZW50KHtcclxuICAgIGxvZzogW1wicXVlcnlcIiwgXCJlcnJvclwiLCBcIndhcm5cIl0sXHJcbiAgfSk7XHJcblxyXG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSBnbG9iYWxGb3JQcmlzbWEucHJpc21hID0gcHJpc21hO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgcHJpc21hO1xyXG4iXSwibmFtZXMiOlsiUHJpc21hQ2xpZW50IiwiZ2xvYmFsRm9yUHJpc21hIiwiZ2xvYmFsVGhpcyIsInByaXNtYSIsImxvZyIsInByb2Nlc3MiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./lib/prisma.ts\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fanotacoes%2Froute&page=%2Fapi%2Fanotacoes%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fanotacoes%2Froute.ts&appDir=C%3A%5CUsers%5CGabriel%20Torres%5CDesktop%5CMeus%20Clientes%5CErick%5C%C3%81rea%20de%20Membros%5Carea_de_membros%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CGabriel%20Torres%5CDesktop%5CMeus%20Clientes%5CErick%5C%C3%81rea%20de%20Membros%5Carea_de_membros&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fanotacoes%2Froute&page=%2Fapi%2Fanotacoes%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fanotacoes%2Froute.ts&appDir=C%3A%5CUsers%5CGabriel%20Torres%5CDesktop%5CMeus%20Clientes%5CErick%5C%C3%81rea%20de%20Membros%5Carea_de_membros%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CGabriel%20Torres%5CDesktop%5CMeus%20Clientes%5CErick%5C%C3%81rea%20de%20Membros%5Carea_de_membros&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var C_Users_Gabriel_Torres_Desktop_Meus_Clientes_Erick_rea_de_Membros_area_de_membros_app_api_anotacoes_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/anotacoes/route.ts */ \"(rsc)/./app/api/anotacoes/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/anotacoes/route\",\n        pathname: \"/api/anotacoes\",\n        filename: \"route\",\n        bundlePath: \"app/api/anotacoes/route\"\n    },\n    resolvedPagePath: \"C:\\\\Users\\\\Gabriel Torres\\\\Desktop\\\\Meus Clientes\\\\Erick\\\\Área de Membros\\\\area_de_membros\\\\app\\\\api\\\\anotacoes\\\\route.ts\",\n    nextConfigOutput,\n    userland: C_Users_Gabriel_Torres_Desktop_Meus_Clientes_Erick_rea_de_Membros_area_de_membros_app_api_anotacoes_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZhcGklMkZhbm90YWNvZXMlMkZyb3V0ZSZwYWdlPSUyRmFwaSUyRmFub3RhY29lcyUyRnJvdXRlJmFwcFBhdGhzPSZwYWdlUGF0aD1wcml2YXRlLW5leHQtYXBwLWRpciUyRmFwaSUyRmFub3RhY29lcyUyRnJvdXRlLnRzJmFwcERpcj1DJTNBJTVDVXNlcnMlNUNHYWJyaWVsJTIwVG9ycmVzJTVDRGVza3RvcCU1Q01ldXMlMjBDbGllbnRlcyU1Q0VyaWNrJTVDJUMzJTgxcmVhJTIwZGUlMjBNZW1icm9zJTVDYXJlYV9kZV9tZW1icm9zJTVDYXBwJnBhZ2VFeHRlbnNpb25zPXRzeCZwYWdlRXh0ZW5zaW9ucz10cyZwYWdlRXh0ZW5zaW9ucz1qc3gmcGFnZUV4dGVuc2lvbnM9anMmcm9vdERpcj1DJTNBJTVDVXNlcnMlNUNHYWJyaWVsJTIwVG9ycmVzJTVDRGVza3RvcCU1Q01ldXMlMjBDbGllbnRlcyU1Q0VyaWNrJTVDJUMzJTgxcmVhJTIwZGUlMjBNZW1icm9zJTVDYXJlYV9kZV9tZW1icm9zJmlzRGV2PXRydWUmdHNjb25maWdQYXRoPXRzY29uZmlnLmpzb24mYmFzZVBhdGg9JmFzc2V0UHJlZml4PSZuZXh0Q29uZmlnT3V0cHV0PSZwcmVmZXJyZWRSZWdpb249Jm1pZGRsZXdhcmVDb25maWc9ZTMwJTNEISIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUErRjtBQUN2QztBQUNxQjtBQUN5RTtBQUN0SjtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IseUdBQW1CO0FBQzNDO0FBQ0EsY0FBYyxrRUFBUztBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsWUFBWTtBQUNaLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSxRQUFRLHNEQUFzRDtBQUM5RDtBQUNBLFdBQVcsNEVBQVc7QUFDdEI7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUMwRjs7QUFFMUYiLCJzb3VyY2VzIjpbIiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBcHBSb3V0ZVJvdXRlTW9kdWxlIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvcm91dGUtbW9kdWxlcy9hcHAtcm91dGUvbW9kdWxlLmNvbXBpbGVkXCI7XG5pbXBvcnQgeyBSb3V0ZUtpbmQgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9yb3V0ZS1raW5kXCI7XG5pbXBvcnQgeyBwYXRjaEZldGNoIGFzIF9wYXRjaEZldGNoIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvbGliL3BhdGNoLWZldGNoXCI7XG5pbXBvcnQgKiBhcyB1c2VybGFuZCBmcm9tIFwiQzpcXFxcVXNlcnNcXFxcR2FicmllbCBUb3JyZXNcXFxcRGVza3RvcFxcXFxNZXVzIENsaWVudGVzXFxcXEVyaWNrXFxcXMOBcmVhIGRlIE1lbWJyb3NcXFxcYXJlYV9kZV9tZW1icm9zXFxcXGFwcFxcXFxhcGlcXFxcYW5vdGFjb2VzXFxcXHJvdXRlLnRzXCI7XG4vLyBXZSBpbmplY3QgdGhlIG5leHRDb25maWdPdXRwdXQgaGVyZSBzbyB0aGF0IHdlIGNhbiB1c2UgdGhlbSBpbiB0aGUgcm91dGVcbi8vIG1vZHVsZS5cbmNvbnN0IG5leHRDb25maWdPdXRwdXQgPSBcIlwiXG5jb25zdCByb3V0ZU1vZHVsZSA9IG5ldyBBcHBSb3V0ZVJvdXRlTW9kdWxlKHtcbiAgICBkZWZpbml0aW9uOiB7XG4gICAgICAgIGtpbmQ6IFJvdXRlS2luZC5BUFBfUk9VVEUsXG4gICAgICAgIHBhZ2U6IFwiL2FwaS9hbm90YWNvZXMvcm91dGVcIixcbiAgICAgICAgcGF0aG5hbWU6IFwiL2FwaS9hbm90YWNvZXNcIixcbiAgICAgICAgZmlsZW5hbWU6IFwicm91dGVcIixcbiAgICAgICAgYnVuZGxlUGF0aDogXCJhcHAvYXBpL2Fub3RhY29lcy9yb3V0ZVwiXG4gICAgfSxcbiAgICByZXNvbHZlZFBhZ2VQYXRoOiBcIkM6XFxcXFVzZXJzXFxcXEdhYnJpZWwgVG9ycmVzXFxcXERlc2t0b3BcXFxcTWV1cyBDbGllbnRlc1xcXFxFcmlja1xcXFzDgXJlYSBkZSBNZW1icm9zXFxcXGFyZWFfZGVfbWVtYnJvc1xcXFxhcHBcXFxcYXBpXFxcXGFub3RhY29lc1xcXFxyb3V0ZS50c1wiLFxuICAgIG5leHRDb25maWdPdXRwdXQsXG4gICAgdXNlcmxhbmRcbn0pO1xuLy8gUHVsbCBvdXQgdGhlIGV4cG9ydHMgdGhhdCB3ZSBuZWVkIHRvIGV4cG9zZSBmcm9tIHRoZSBtb2R1bGUuIFRoaXMgc2hvdWxkXG4vLyBiZSBlbGltaW5hdGVkIHdoZW4gd2UndmUgbW92ZWQgdGhlIG90aGVyIHJvdXRlcyB0byB0aGUgbmV3IGZvcm1hdC4gVGhlc2Vcbi8vIGFyZSB1c2VkIHRvIGhvb2sgaW50byB0aGUgcm91dGUuXG5jb25zdCB7IHdvcmtBc3luY1N0b3JhZ2UsIHdvcmtVbml0QXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcyB9ID0gcm91dGVNb2R1bGU7XG5mdW5jdGlvbiBwYXRjaEZldGNoKCkge1xuICAgIHJldHVybiBfcGF0Y2hGZXRjaCh7XG4gICAgICAgIHdvcmtBc3luY1N0b3JhZ2UsXG4gICAgICAgIHdvcmtVbml0QXN5bmNTdG9yYWdlXG4gICAgfSk7XG59XG5leHBvcnQgeyByb3V0ZU1vZHVsZSwgd29ya0FzeW5jU3RvcmFnZSwgd29ya1VuaXRBc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzLCBwYXRjaEZldGNoLCAgfTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YXBwLXJvdXRlLmpzLm1hcCJdLCJuYW1lcyI6W10sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fanotacoes%2Froute&page=%2Fapi%2Fanotacoes%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fanotacoes%2Froute.ts&appDir=C%3A%5CUsers%5CGabriel%20Torres%5CDesktop%5CMeus%20Clientes%5CErick%5C%C3%81rea%20de%20Membros%5Carea_de_membros%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CGabriel%20Torres%5CDesktop%5CMeus%20Clientes%5CErick%5C%C3%81rea%20de%20Membros%5Carea_de_membros&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

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

/***/ "@prisma/client":
/*!*********************************!*\
  !*** external "@prisma/client" ***!
  \*********************************/
/***/ ((module) => {

"use strict";
module.exports = require("@prisma/client");

/***/ }),

/***/ "buffer":
/*!*************************!*\
  !*** external "buffer" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("buffer");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("crypto");

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

/***/ }),

/***/ "stream":
/*!*************************!*\
  !*** external "stream" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("stream");

/***/ }),

/***/ "util":
/*!***********************!*\
  !*** external "util" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("util");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/semver","vendor-chunks/jsonwebtoken","vendor-chunks/lodash.includes","vendor-chunks/jws","vendor-chunks/lodash.once","vendor-chunks/jwa","vendor-chunks/lodash.isinteger","vendor-chunks/ecdsa-sig-formatter","vendor-chunks/lodash.isplainobject","vendor-chunks/ms","vendor-chunks/lodash.isstring","vendor-chunks/lodash.isnumber","vendor-chunks/lodash.isboolean","vendor-chunks/safe-buffer","vendor-chunks/buffer-equal-constant-time"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fanotacoes%2Froute&page=%2Fapi%2Fanotacoes%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fanotacoes%2Froute.ts&appDir=C%3A%5CUsers%5CGabriel%20Torres%5CDesktop%5CMeus%20Clientes%5CErick%5C%C3%81rea%20de%20Membros%5Carea_de_membros%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CGabriel%20Torres%5CDesktop%5CMeus%20Clientes%5CErick%5C%C3%81rea%20de%20Membros%5Carea_de_membros&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();