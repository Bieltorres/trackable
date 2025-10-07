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
exports.id = "app/api/favoritos/route";
exports.ids = ["app/api/favoritos/route"];
exports.modules = {

/***/ "(rsc)/./app/api/favoritos/route.ts":
/*!************************************!*\
  !*** ./app/api/favoritos/route.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ GET),\n/* harmony export */   POST: () => (/* binding */ POST)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/.pnpm/next@15.2.4_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/next/dist/api/server.js\");\n/* harmony import */ var _lib_prisma__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/lib/prisma */ \"(rsc)/./lib/prisma.ts\");\n/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! jsonwebtoken */ \"(rsc)/./node_modules/jsonwebtoken/index.js\");\n/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(jsonwebtoken__WEBPACK_IMPORTED_MODULE_2__);\n\n\n\nconst JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';\nasync function getUserFromToken(request) {\n    const token = request.cookies.get('token')?.value;\n    if (!token) {\n        throw new Error('Token não encontrado');\n    }\n    try {\n        const decoded = jsonwebtoken__WEBPACK_IMPORTED_MODULE_2___default().verify(token, JWT_SECRET);\n        return decoded.id;\n    } catch (error) {\n        throw new Error('Token inválido');\n    }\n}\nasync function GET(request) {\n    try {\n        const userId = await getUserFromToken(request);\n        const favoritos = await _lib_prisma__WEBPACK_IMPORTED_MODULE_1__.prisma.favorito.findMany({\n            where: {\n                usuarioId: userId\n            },\n            include: {\n                curso: {\n                    include: {\n                        categoria: true,\n                        instrutor: {\n                            select: {\n                                id: true,\n                                name: true\n                            }\n                        },\n                        _count: {\n                            select: {\n                                usuarioCursos: true,\n                                avaliacoes: true\n                            }\n                        }\n                    }\n                }\n            },\n            orderBy: {\n                createdAt: 'desc'\n            }\n        });\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            data: favoritos\n        });\n    } catch (error) {\n        console.error('Erro ao buscar favoritos:', error);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: 'Erro interno do servidor'\n        }, {\n            status: 500\n        });\n    }\n}\nasync function POST(request) {\n    try {\n        const userId = await getUserFromToken(request);\n        const { cursoId } = await request.json();\n        if (!cursoId) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: 'ID do curso é obrigatório'\n            }, {\n                status: 400\n            });\n        }\n        // Verificar se já existe\n        const favoritoExistente = await _lib_prisma__WEBPACK_IMPORTED_MODULE_1__.prisma.favorito.findFirst({\n            where: {\n                usuarioId: userId,\n                cursoId: cursoId\n            }\n        });\n        if (favoritoExistente) {\n            // Remover favorito\n            await _lib_prisma__WEBPACK_IMPORTED_MODULE_1__.prisma.favorito.delete({\n                where: {\n                    id: favoritoExistente.id\n                }\n            });\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                message: 'Favorito removido',\n                action: 'removed',\n                favorito: favoritoExistente\n            });\n        } else {\n            // Adicionar favorito\n            const novoFavorito = await _lib_prisma__WEBPACK_IMPORTED_MODULE_1__.prisma.favorito.create({\n                data: {\n                    usuarioId: userId,\n                    cursoId: cursoId\n                },\n                include: {\n                    curso: true\n                }\n            });\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                message: 'Favorito adicionado',\n                action: 'added',\n                favorito: novoFavorito\n            });\n        }\n    } catch (error) {\n        console.error('Erro ao alterar favorito:', error);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: 'Erro interno do servidor'\n        }, {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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UUFBUXJCLEtBQUssQ0FBQyw2QkFBNkJBO1FBQzNDLE9BQU9oQixxREFBWUEsQ0FBQ21DLElBQUksQ0FDdEI7WUFBRW5CLE9BQU87UUFBMkIsR0FDcEM7WUFBRXNCLFFBQVE7UUFBSTtJQUVsQjtBQUNGIiwic291cmNlcyI6WyJDOlxcVXNlcnNcXEdhYnJpZWwgVG9ycmVzXFxEZXNrdG9wXFxNZXVzIENsaWVudGVzXFxFcmlja1xcw4FyZWEgZGUgTWVtYnJvc1xcYXJlYV9kZV9tZW1icm9zXFxhcHBcXGFwaVxcZmF2b3JpdG9zXFxyb3V0ZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZXh0UmVxdWVzdCwgTmV4dFJlc3BvbnNlIH0gZnJvbSAnbmV4dC9zZXJ2ZXInO1xyXG5pbXBvcnQgeyBwcmlzbWEgfSBmcm9tICdAL2xpYi9wcmlzbWEnO1xyXG5pbXBvcnQgand0IGZyb20gJ2pzb253ZWJ0b2tlbic7XHJcblxyXG5jb25zdCBKV1RfU0VDUkVUID0gcHJvY2Vzcy5lbnYuSldUX1NFQ1JFVCB8fCAneW91ci1zZWNyZXQta2V5JztcclxuXHJcbmFzeW5jIGZ1bmN0aW9uIGdldFVzZXJGcm9tVG9rZW4ocmVxdWVzdDogTmV4dFJlcXVlc3QpIHtcclxuICBjb25zdCB0b2tlbiA9IHJlcXVlc3QuY29va2llcy5nZXQoJ3Rva2VuJyk/LnZhbHVlO1xyXG4gIFxyXG4gIGlmICghdG9rZW4pIHtcclxuICAgIHRocm93IG5ldyBFcnJvcignVG9rZW4gbsOjbyBlbmNvbnRyYWRvJyk7XHJcbiAgfVxyXG5cclxuICB0cnkge1xyXG4gICAgY29uc3QgZGVjb2RlZCA9IGp3dC52ZXJpZnkodG9rZW4sIEpXVF9TRUNSRVQpIGFzIHsgaWQ6IHN0cmluZyB9O1xyXG4gICAgcmV0dXJuIGRlY29kZWQuaWQ7XHJcbiAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgIHRocm93IG5ldyBFcnJvcignVG9rZW4gaW52w6FsaWRvJyk7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gR0VUKHJlcXVlc3Q6IE5leHRSZXF1ZXN0KSB7XHJcbiAgdHJ5IHtcclxuICAgIGNvbnN0IHVzZXJJZCA9IGF3YWl0IGdldFVzZXJGcm9tVG9rZW4ocmVxdWVzdCk7XHJcblxyXG4gICAgY29uc3QgZmF2b3JpdG9zID0gYXdhaXQgcHJpc21hLmZhdm9yaXRvLmZpbmRNYW55KHtcclxuICAgICAgd2hlcmU6IHsgdXN1YXJpb0lkOiB1c2VySWQgfSxcclxuICAgICAgaW5jbHVkZToge1xyXG4gICAgICAgIGN1cnNvOiB7XHJcbiAgICAgICAgICBpbmNsdWRlOiB7XHJcbiAgICAgICAgICAgIGNhdGVnb3JpYTogdHJ1ZSxcclxuICAgICAgICAgICAgaW5zdHJ1dG9yOiB7XHJcbiAgICAgICAgICAgICAgc2VsZWN0OiB7XHJcbiAgICAgICAgICAgICAgICBpZDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIG5hbWU6IHRydWUsXHJcbiAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgX2NvdW50OiB7XHJcbiAgICAgICAgICAgICAgc2VsZWN0OiB7XHJcbiAgICAgICAgICAgICAgICB1c3VhcmlvQ3Vyc29zOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgYXZhbGlhY29lczogdHJ1ZSxcclxuICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICB9LFxyXG4gICAgICB9LFxyXG4gICAgICBvcmRlckJ5OiB7IGNyZWF0ZWRBdDogJ2Rlc2MnIH0sXHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyBkYXRhOiBmYXZvcml0b3MgfSk7XHJcbiAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm8gYW8gYnVzY2FyIGZhdm9yaXRvczonLCBlcnJvcik7XHJcbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oXHJcbiAgICAgIHsgZXJyb3I6ICdFcnJvIGludGVybm8gZG8gc2Vydmlkb3InIH0sXHJcbiAgICAgIHsgc3RhdHVzOiA1MDAgfVxyXG4gICAgKTtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBQT1NUKHJlcXVlc3Q6IE5leHRSZXF1ZXN0KSB7XHJcbiAgdHJ5IHtcclxuICAgIGNvbnN0IHVzZXJJZCA9IGF3YWl0IGdldFVzZXJGcm9tVG9rZW4ocmVxdWVzdCk7XHJcbiAgICBjb25zdCB7IGN1cnNvSWQgfSA9IGF3YWl0IHJlcXVlc3QuanNvbigpO1xyXG5cclxuICAgIGlmICghY3Vyc29JZCkge1xyXG4gICAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oXHJcbiAgICAgICAgeyBlcnJvcjogJ0lEIGRvIGN1cnNvIMOpIG9icmlnYXTDs3JpbycgfSxcclxuICAgICAgICB7IHN0YXR1czogNDAwIH1cclxuICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBWZXJpZmljYXIgc2UgasOhIGV4aXN0ZVxyXG4gICAgY29uc3QgZmF2b3JpdG9FeGlzdGVudGUgPSBhd2FpdCBwcmlzbWEuZmF2b3JpdG8uZmluZEZpcnN0KHtcclxuICAgICAgd2hlcmU6IHtcclxuICAgICAgICB1c3VhcmlvSWQ6IHVzZXJJZCxcclxuICAgICAgICBjdXJzb0lkOiBjdXJzb0lkLFxyXG4gICAgICB9LFxyXG4gICAgfSk7XHJcblxyXG4gICAgaWYgKGZhdm9yaXRvRXhpc3RlbnRlKSB7XHJcbiAgICAgIC8vIFJlbW92ZXIgZmF2b3JpdG9cclxuICAgICAgYXdhaXQgcHJpc21hLmZhdm9yaXRvLmRlbGV0ZSh7XHJcbiAgICAgICAgd2hlcmU6IHsgaWQ6IGZhdm9yaXRvRXhpc3RlbnRlLmlkIH0sXHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHtcclxuICAgICAgICBtZXNzYWdlOiAnRmF2b3JpdG8gcmVtb3ZpZG8nLFxyXG4gICAgICAgIGFjdGlvbjogJ3JlbW92ZWQnLFxyXG4gICAgICAgIGZhdm9yaXRvOiBmYXZvcml0b0V4aXN0ZW50ZSxcclxuICAgICAgfSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAvLyBBZGljaW9uYXIgZmF2b3JpdG9cclxuICAgICAgY29uc3Qgbm92b0Zhdm9yaXRvID0gYXdhaXQgcHJpc21hLmZhdm9yaXRvLmNyZWF0ZSh7XHJcbiAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgdXN1YXJpb0lkOiB1c2VySWQsXHJcbiAgICAgICAgICBjdXJzb0lkOiBjdXJzb0lkLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgaW5jbHVkZToge1xyXG4gICAgICAgICAgY3Vyc286IHRydWUsXHJcbiAgICAgICAgfSxcclxuICAgICAgfSk7XHJcblxyXG4gICAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oe1xyXG4gICAgICAgIG1lc3NhZ2U6ICdGYXZvcml0byBhZGljaW9uYWRvJyxcclxuICAgICAgICBhY3Rpb246ICdhZGRlZCcsXHJcbiAgICAgICAgZmF2b3JpdG86IG5vdm9GYXZvcml0byxcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm8gYW8gYWx0ZXJhciBmYXZvcml0bzonLCBlcnJvcik7XHJcbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oXHJcbiAgICAgIHsgZXJyb3I6ICdFcnJvIGludGVybm8gZG8gc2Vydmlkb3InIH0sXHJcbiAgICAgIHsgc3RhdHVzOiA1MDAgfVxyXG4gICAgKTtcclxuICB9XHJcbn1cclxuIl0sIm5hbWVzIjpbIk5leHRSZXNwb25zZSIsInByaXNtYSIsImp3dCIsIkpXVF9TRUNSRVQiLCJwcm9jZXNzIiwiZW52IiwiZ2V0VXNlckZyb21Ub2tlbiIsInJlcXVlc3QiLCJ0b2tlbiIsImNvb2tpZXMiLCJnZXQiLCJ2YWx1ZSIsIkVycm9yIiwiZGVjb2RlZCIsInZlcmlmeSIsImlkIiwiZXJyb3IiLCJHRVQiLCJ1c2VySWQiLCJmYXZvcml0b3MiLCJmYXZvcml0byIsImZpbmRNYW55Iiwid2hlcmUiLCJ1c3VhcmlvSWQiLCJpbmNsdWRlIiwiY3Vyc28iLCJjYXRlZ29yaWEiLCJpbnN0cnV0b3IiLCJzZWxlY3QiLCJuYW1lIiwiX2NvdW50IiwidXN1YXJpb0N1cnNvcyIsImF2YWxpYWNvZXMiLCJvcmRlckJ5IiwiY3JlYXRlZEF0IiwianNvbiIsImRhdGEiLCJjb25zb2xlIiwic3RhdHVzIiwiUE9TVCIsImN1cnNvSWQiLCJmYXZvcml0b0V4aXN0ZW50ZSIsImZpbmRGaXJzdCIsImRlbGV0ZSIsIm1lc3NhZ2UiLCJhY3Rpb24iLCJub3ZvRmF2b3JpdG8iLCJjcmVhdGUiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./app/api/favoritos/route.ts\n");

/***/ }),

/***/ "(rsc)/./lib/prisma.ts":
/*!***********************!*\
  !*** ./lib/prisma.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__),\n/* harmony export */   prisma: () => (/* binding */ prisma)\n/* harmony export */ });\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @prisma/client */ \"@prisma/client\");\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_prisma_client__WEBPACK_IMPORTED_MODULE_0__);\n\nconst globalForPrisma = globalThis;\nconst prisma = globalForPrisma.prisma || new _prisma_client__WEBPACK_IMPORTED_MODULE_0__.PrismaClient({\n    log: [\n        \"query\",\n        \"error\",\n        \"warn\"\n    ]\n});\nif (true) globalForPrisma.prisma = prisma;\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (prisma);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvcHJpc21hLnRzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBOEM7QUFFOUMsTUFBTUMsa0JBQWtCQztBQUVqQixNQUFNQyxTQUNYRixnQkFBZ0JFLE1BQU0sSUFDdEIsSUFBSUgsd0RBQVlBLENBQUM7SUFDZkksS0FBSztRQUFDO1FBQVM7UUFBUztLQUFPO0FBQ2pDLEdBQUc7QUFFTCxJQUFJQyxJQUFxQyxFQUFFSixnQkFBZ0JFLE1BQU0sR0FBR0E7QUFFcEUsaUVBQWVBLE1BQU1BLEVBQUMiLCJzb3VyY2VzIjpbIkM6XFxVc2Vyc1xcR2FicmllbCBUb3JyZXNcXERlc2t0b3BcXE1ldXMgQ2xpZW50ZXNcXEVyaWNrXFzDgXJlYSBkZSBNZW1icm9zXFxhcmVhX2RlX21lbWJyb3NcXGxpYlxccHJpc21hLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFByaXNtYUNsaWVudCB9IGZyb20gXCJAcHJpc21hL2NsaWVudFwiO1xyXG5cclxuY29uc3QgZ2xvYmFsRm9yUHJpc21hID0gZ2xvYmFsVGhpcyBhcyB1bmtub3duIGFzIHsgcHJpc21hOiBQcmlzbWFDbGllbnQgfTtcclxuXHJcbmV4cG9ydCBjb25zdCBwcmlzbWEgPVxyXG4gIGdsb2JhbEZvclByaXNtYS5wcmlzbWEgfHxcclxuICBuZXcgUHJpc21hQ2xpZW50KHtcclxuICAgIGxvZzogW1wicXVlcnlcIiwgXCJlcnJvclwiLCBcIndhcm5cIl0sXHJcbiAgfSk7XHJcblxyXG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSBnbG9iYWxGb3JQcmlzbWEucHJpc21hID0gcHJpc21hO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgcHJpc21hO1xyXG4iXSwibmFtZXMiOlsiUHJpc21hQ2xpZW50IiwiZ2xvYmFsRm9yUHJpc21hIiwiZ2xvYmFsVGhpcyIsInByaXNtYSIsImxvZyIsInByb2Nlc3MiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./lib/prisma.ts\n");

/***/ }),

/***/ "(rsc)/./node_modules/.pnpm/next@15.2.4_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Ffavoritos%2Froute&page=%2Fapi%2Ffavoritos%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Ffavoritos%2Froute.ts&appDir=C%3A%5CUsers%5CGabriel%20Torres%5CDesktop%5CMeus%20Clientes%5CErick%5C%C3%81rea%20de%20Membros%5Carea_de_membros%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CGabriel%20Torres%5CDesktop%5CMeus%20Clientes%5CErick%5C%C3%81rea%20de%20Membros%5Carea_de_membros&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/next@15.2.4_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Ffavoritos%2Froute&page=%2Fapi%2Ffavoritos%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Ffavoritos%2Froute.ts&appDir=C%3A%5CUsers%5CGabriel%20Torres%5CDesktop%5CMeus%20Clientes%5CErick%5C%C3%81rea%20de%20Membros%5Carea_de_membros%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CGabriel%20Torres%5CDesktop%5CMeus%20Clientes%5CErick%5C%C3%81rea%20de%20Membros%5Carea_de_membros&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/.pnpm/next@15.2.4_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/.pnpm/next@15.2.4_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/.pnpm/next@15.2.4_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var C_Users_Gabriel_Torres_Desktop_Meus_Clientes_Erick_rea_de_Membros_area_de_membros_app_api_favoritos_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/favoritos/route.ts */ \"(rsc)/./app/api/favoritos/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/favoritos/route\",\n        pathname: \"/api/favoritos\",\n        filename: \"route\",\n        bundlePath: \"app/api/favoritos/route\"\n    },\n    resolvedPagePath: \"C:\\\\Users\\\\Gabriel Torres\\\\Desktop\\\\Meus Clientes\\\\Erick\\\\Área de Membros\\\\area_de_membros\\\\app\\\\api\\\\favoritos\\\\route.ts\",\n    nextConfigOutput,\n    userland: C_Users_Gabriel_Torres_Desktop_Meus_Clientes_Erick_rea_de_Membros_area_de_membros_app_api_favoritos_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvLnBucG0vbmV4dEAxNS4yLjRfcmVhY3QtZG9tQDE4LjMuMV9yZWFjdEAxOC4zLjFfX3JlYWN0QDE4LjMuMS9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZhcGklMkZmYXZvcml0b3MlMkZyb3V0ZSZwYWdlPSUyRmFwaSUyRmZhdm9yaXRvcyUyRnJvdXRlJmFwcFBhdGhzPSZwYWdlUGF0aD1wcml2YXRlLW5leHQtYXBwLWRpciUyRmFwaSUyRmZhdm9yaXRvcyUyRnJvdXRlLnRzJmFwcERpcj1DJTNBJTVDVXNlcnMlNUNHYWJyaWVsJTIwVG9ycmVzJTVDRGVza3RvcCU1Q01ldXMlMjBDbGllbnRlcyU1Q0VyaWNrJTVDJUMzJTgxcmVhJTIwZGUlMjBNZW1icm9zJTVDYXJlYV9kZV9tZW1icm9zJTVDYXBwJnBhZ2VFeHRlbnNpb25zPXRzeCZwYWdlRXh0ZW5zaW9ucz10cyZwYWdlRXh0ZW5zaW9ucz1qc3gmcGFnZUV4dGVuc2lvbnM9anMmcm9vdERpcj1DJTNBJTVDVXNlcnMlNUNHYWJyaWVsJTIwVG9ycmVzJTVDRGVza3RvcCU1Q01ldXMlMjBDbGllbnRlcyU1Q0VyaWNrJTVDJUMzJTgxcmVhJTIwZGUlMjBNZW1icm9zJTVDYXJlYV9kZV9tZW1icm9zJmlzRGV2PXRydWUmdHNjb25maWdQYXRoPXRzY29uZmlnLmpzb24mYmFzZVBhdGg9JmFzc2V0UHJlZml4PSZuZXh0Q29uZmlnT3V0cHV0PSZwcmVmZXJyZWRSZWdpb249Jm1pZGRsZXdhcmVDb25maWc9ZTMwJTNEISIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUErRjtBQUN2QztBQUNxQjtBQUN5RTtBQUN0SjtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IseUdBQW1CO0FBQzNDO0FBQ0EsY0FBYyxrRUFBUztBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsWUFBWTtBQUNaLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSxRQUFRLHNEQUFzRDtBQUM5RDtBQUNBLFdBQVcsNEVBQVc7QUFDdEI7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUMwRjs7QUFFMUYiLCJzb3VyY2VzIjpbIiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBcHBSb3V0ZVJvdXRlTW9kdWxlIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvcm91dGUtbW9kdWxlcy9hcHAtcm91dGUvbW9kdWxlLmNvbXBpbGVkXCI7XG5pbXBvcnQgeyBSb3V0ZUtpbmQgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9yb3V0ZS1raW5kXCI7XG5pbXBvcnQgeyBwYXRjaEZldGNoIGFzIF9wYXRjaEZldGNoIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvbGliL3BhdGNoLWZldGNoXCI7XG5pbXBvcnQgKiBhcyB1c2VybGFuZCBmcm9tIFwiQzpcXFxcVXNlcnNcXFxcR2FicmllbCBUb3JyZXNcXFxcRGVza3RvcFxcXFxNZXVzIENsaWVudGVzXFxcXEVyaWNrXFxcXMOBcmVhIGRlIE1lbWJyb3NcXFxcYXJlYV9kZV9tZW1icm9zXFxcXGFwcFxcXFxhcGlcXFxcZmF2b3JpdG9zXFxcXHJvdXRlLnRzXCI7XG4vLyBXZSBpbmplY3QgdGhlIG5leHRDb25maWdPdXRwdXQgaGVyZSBzbyB0aGF0IHdlIGNhbiB1c2UgdGhlbSBpbiB0aGUgcm91dGVcbi8vIG1vZHVsZS5cbmNvbnN0IG5leHRDb25maWdPdXRwdXQgPSBcIlwiXG5jb25zdCByb3V0ZU1vZHVsZSA9IG5ldyBBcHBSb3V0ZVJvdXRlTW9kdWxlKHtcbiAgICBkZWZpbml0aW9uOiB7XG4gICAgICAgIGtpbmQ6IFJvdXRlS2luZC5BUFBfUk9VVEUsXG4gICAgICAgIHBhZ2U6IFwiL2FwaS9mYXZvcml0b3Mvcm91dGVcIixcbiAgICAgICAgcGF0aG5hbWU6IFwiL2FwaS9mYXZvcml0b3NcIixcbiAgICAgICAgZmlsZW5hbWU6IFwicm91dGVcIixcbiAgICAgICAgYnVuZGxlUGF0aDogXCJhcHAvYXBpL2Zhdm9yaXRvcy9yb3V0ZVwiXG4gICAgfSxcbiAgICByZXNvbHZlZFBhZ2VQYXRoOiBcIkM6XFxcXFVzZXJzXFxcXEdhYnJpZWwgVG9ycmVzXFxcXERlc2t0b3BcXFxcTWV1cyBDbGllbnRlc1xcXFxFcmlja1xcXFzDgXJlYSBkZSBNZW1icm9zXFxcXGFyZWFfZGVfbWVtYnJvc1xcXFxhcHBcXFxcYXBpXFxcXGZhdm9yaXRvc1xcXFxyb3V0ZS50c1wiLFxuICAgIG5leHRDb25maWdPdXRwdXQsXG4gICAgdXNlcmxhbmRcbn0pO1xuLy8gUHVsbCBvdXQgdGhlIGV4cG9ydHMgdGhhdCB3ZSBuZWVkIHRvIGV4cG9zZSBmcm9tIHRoZSBtb2R1bGUuIFRoaXMgc2hvdWxkXG4vLyBiZSBlbGltaW5hdGVkIHdoZW4gd2UndmUgbW92ZWQgdGhlIG90aGVyIHJvdXRlcyB0byB0aGUgbmV3IGZvcm1hdC4gVGhlc2Vcbi8vIGFyZSB1c2VkIHRvIGhvb2sgaW50byB0aGUgcm91dGUuXG5jb25zdCB7IHdvcmtBc3luY1N0b3JhZ2UsIHdvcmtVbml0QXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcyB9ID0gcm91dGVNb2R1bGU7XG5mdW5jdGlvbiBwYXRjaEZldGNoKCkge1xuICAgIHJldHVybiBfcGF0Y2hGZXRjaCh7XG4gICAgICAgIHdvcmtBc3luY1N0b3JhZ2UsXG4gICAgICAgIHdvcmtVbml0QXN5bmNTdG9yYWdlXG4gICAgfSk7XG59XG5leHBvcnQgeyByb3V0ZU1vZHVsZSwgd29ya0FzeW5jU3RvcmFnZSwgd29ya1VuaXRBc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzLCBwYXRjaEZldGNoLCAgfTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YXBwLXJvdXRlLmpzLm1hcCJdLCJuYW1lcyI6W10sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/.pnpm/next@15.2.4_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Ffavoritos%2Froute&page=%2Fapi%2Ffavoritos%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Ffavoritos%2Froute.ts&appDir=C%3A%5CUsers%5CGabriel%20Torres%5CDesktop%5CMeus%20Clientes%5CErick%5C%C3%81rea%20de%20Membros%5Carea_de_membros%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CGabriel%20Torres%5CDesktop%5CMeus%20Clientes%5CErick%5C%C3%81rea%20de%20Membros%5Carea_de_membros&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./node_modules/.pnpm/next@15.2.4_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!*********************************************************************************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/next@15.2.4_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \*********************************************************************************************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "(ssr)/./node_modules/.pnpm/next@15.2.4_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!*********************************************************************************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/next@15.2.4_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \*********************************************************************************************************************************************************************************/
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
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next@15.2.4_react-dom@18.3.1_react@18.3.1__react@18.3.1","vendor-chunks/semver","vendor-chunks/jsonwebtoken","vendor-chunks/lodash.includes","vendor-chunks/jws","vendor-chunks/lodash.once","vendor-chunks/jwa","vendor-chunks/lodash.isinteger","vendor-chunks/ecdsa-sig-formatter","vendor-chunks/lodash.isplainobject","vendor-chunks/ms","vendor-chunks/lodash.isstring","vendor-chunks/lodash.isnumber","vendor-chunks/lodash.isboolean","vendor-chunks/safe-buffer","vendor-chunks/buffer-equal-constant-time"], () => (__webpack_exec__("(rsc)/./node_modules/.pnpm/next@15.2.4_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Ffavoritos%2Froute&page=%2Fapi%2Ffavoritos%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Ffavoritos%2Froute.ts&appDir=C%3A%5CUsers%5CGabriel%20Torres%5CDesktop%5CMeus%20Clientes%5CErick%5C%C3%81rea%20de%20Membros%5Carea_de_membros%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CGabriel%20Torres%5CDesktop%5CMeus%20Clientes%5CErick%5C%C3%81rea%20de%20Membros%5Carea_de_membros&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();