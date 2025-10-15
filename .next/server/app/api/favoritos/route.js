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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ GET),\n/* harmony export */   POST: () => (/* binding */ POST),\n/* harmony export */   getUserIdFromRequest: () => (/* binding */ getUserIdFromRequest)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var _lib_prisma__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/lib/prisma */ \"(rsc)/./lib/prisma.ts\");\n/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! jsonwebtoken */ \"(rsc)/./node_modules/jsonwebtoken/index.js\");\n/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(jsonwebtoken__WEBPACK_IMPORTED_MODULE_2__);\n\n\n\nconst JWT_SECRET = process.env.JWT_SECRET; // sem fallback em prod\nfunction getUserIdFromRequest(request) {\n    const token = request.cookies.get(\"token\")?.value;\n    if (!token) {\n        const err = new Error(\"Token não encontrado\");\n        err.status = 401;\n        throw err;\n    }\n    try {\n        const decoded = jsonwebtoken__WEBPACK_IMPORTED_MODULE_2___default().verify(token, JWT_SECRET);\n        const userId = decoded.sub || decoded.id; // << chave aqui\n        if (!userId) {\n            const err = new Error(\"Token inválido (sem id/sub)\");\n            err.status = 401;\n            throw err;\n        }\n        return userId;\n    } catch  {\n        const err = new Error(\"Token inválido/expirado\");\n        err.status = 401;\n        throw err;\n    }\n}\nasync function GET(request) {\n    try {\n        const userId = getUserIdFromRequest(request);\n        // GET: listar favoritos com dados do curso\n        const favoritos = await _lib_prisma__WEBPACK_IMPORTED_MODULE_1__.prisma.favorito.findMany({\n            where: {\n                usuarioId: userId\n            },\n            include: {\n                curso: {\n                    include: {\n                        categoria: true,\n                        // << ajuste aqui: navegar pela pivô\n                        instrutores: {\n                            include: {\n                                instrutor: {\n                                    select: {\n                                        id: true,\n                                        nome: true\n                                    }\n                                }\n                            }\n                        },\n                        _count: {\n                            select: {\n                                usuarioCursos: true,\n                                avaliacoes: true\n                            }\n                        }\n                    }\n                }\n            },\n            orderBy: {\n                data: \"desc\"\n            }\n        });\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            data: favoritos\n        });\n    } catch (err) {\n        const status = err?.status ?? 500;\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: err?.message ?? \"Erro interno do servidor\"\n        }, {\n            status\n        });\n    }\n}\nasync function POST(request) {\n    try {\n        const userId = getUserIdFromRequest(request);\n        const { cursoId } = await request.json();\n        if (!cursoId) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: \"ID do curso é obrigatório\"\n            }, {\n                status: 400\n            });\n        }\n        const whereComposite = {\n            usuarioId_cursoId: {\n                usuarioId: userId,\n                cursoId\n            }\n        };\n        const existente = await _lib_prisma__WEBPACK_IMPORTED_MODULE_1__.prisma.favorito.findUnique({\n            where: whereComposite,\n            include: {\n                curso: {\n                    include: {\n                        categoria: true,\n                        instrutores: {\n                            include: {\n                                instrutor: {\n                                    select: {\n                                        id: true,\n                                        nome: true\n                                    }\n                                }\n                            }\n                        },\n                        _count: {\n                            select: {\n                                usuarioCursos: true,\n                                avaliacoes: true\n                            }\n                        }\n                    }\n                }\n            }\n        });\n        if (existente) {\n            await _lib_prisma__WEBPACK_IMPORTED_MODULE_1__.prisma.favorito.delete({\n                where: whereComposite\n            });\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                action: \"removed\",\n                favorito: existente\n            });\n        }\n        const novo = await _lib_prisma__WEBPACK_IMPORTED_MODULE_1__.prisma.favorito.create({\n            data: {\n                usuario: {\n                    connect: {\n                        id: userId\n                    }\n                },\n                curso: {\n                    connect: {\n                        id: cursoId\n                    }\n                }\n            },\n            include: {\n                curso: {\n                    include: {\n                        categoria: true,\n                        instrutores: {\n                            include: {\n                                instrutor: {\n                                    select: {\n                                        id: true,\n                                        nome: true\n                                    }\n                                }\n                            }\n                        },\n                        _count: {\n                            select: {\n                                usuarioCursos: true,\n                                avaliacoes: true\n                            }\n                        }\n                    }\n                }\n            }\n        });\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            action: \"added\",\n            favorito: novo\n        });\n    } catch (err) {\n        const status = err?.status ?? 500;\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: err?.message ?? \"Erro interno do servidor\"\n        }, {\n            status\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUM5RDtnQkFDRjtZQUNGO1FBQ0Y7UUFFQSxJQUFJVSxXQUFXO1lBQ2IsTUFBTTVDLCtDQUFNQSxDQUFDcUIsUUFBUSxDQUFDeUIsTUFBTSxDQUFDO2dCQUFFdkIsT0FBT21CO1lBQWU7WUFDckQsT0FBTzNDLHFEQUFZQSxDQUFDc0MsSUFBSSxDQUFDO2dCQUFFVSxRQUFRO2dCQUFXMUIsVUFBVXVCO1lBQVU7UUFDcEU7UUFFQSxNQUFNSSxPQUFPLE1BQU1oRCwrQ0FBTUEsQ0FBQ3FCLFFBQVEsQ0FBQzRCLE1BQU0sQ0FBQztZQUN4Q2IsTUFBTTtnQkFDSmMsU0FBUztvQkFBRUMsU0FBUzt3QkFBRWpDLElBQUlGO29CQUFPO2dCQUFFO2dCQUNuQ1UsT0FBTztvQkFBRXlCLFNBQVM7d0JBQUVqQyxJQUFJdUI7b0JBQVE7Z0JBQUU7WUFDcEM7WUFDQWhCLFNBQVM7Z0JBQ1BDLE9BQU87b0JBQ0xELFNBQVM7d0JBQ1BFLFdBQVc7d0JBQ1hDLGFBQWE7NEJBQ1hILFNBQVM7Z0NBQUVJLFdBQVc7b0NBQUVDLFFBQVE7d0NBQUVaLElBQUk7d0NBQU1hLE1BQU07b0NBQUs7Z0NBQUU7NEJBQUU7d0JBQzdEO3dCQUNBQyxRQUFROzRCQUFFRixRQUFRO2dDQUFFRyxlQUFlO2dDQUFNQyxZQUFZOzRCQUFLO3dCQUFFO29CQUM5RDtnQkFDRjtZQUNGO1FBQ0Y7UUFFQSxPQUFPbkMscURBQVlBLENBQUNzQyxJQUFJLENBQUM7WUFBRVUsUUFBUTtZQUFTMUIsVUFBVTJCO1FBQUs7SUFDN0QsRUFBRSxPQUFPckMsS0FBVTtRQUNqQixNQUFNRSxTQUFTRixLQUFLRSxVQUFVO1FBQzlCLE9BQU9kLHFEQUFZQSxDQUFDc0MsSUFBSSxDQUN0QjtZQUFFQyxPQUFPM0IsS0FBSzRCLFdBQVc7UUFBMkIsR0FDcEQ7WUFBRTFCO1FBQU87SUFFYjtBQUNGIiwic291cmNlcyI6WyJDOlxcVXNlcnNcXEdhYnJpZWwgVG9ycmVzXFxEZXNrdG9wXFxNZXVzIENsaWVudGVzXFxFcmlja1xcw4FyZWEgZGUgTWVtYnJvc1xcYXJlYV9kZV9tZW1icm9zXFxhcHBcXGFwaVxcZmF2b3JpdG9zXFxyb3V0ZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZXh0UmVxdWVzdCwgTmV4dFJlc3BvbnNlIH0gZnJvbSBcIm5leHQvc2VydmVyXCI7XHJcbmltcG9ydCB7IHByaXNtYSB9IGZyb20gXCJAL2xpYi9wcmlzbWFcIjtcclxuaW1wb3J0IGp3dCBmcm9tIFwianNvbndlYnRva2VuXCI7XHJcblxyXG5jb25zdCBKV1RfU0VDUkVUID0gcHJvY2Vzcy5lbnYuSldUX1NFQ1JFVCE7IC8vIHNlbSBmYWxsYmFjayBlbSBwcm9kXHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0VXNlcklkRnJvbVJlcXVlc3QocmVxdWVzdDogTmV4dFJlcXVlc3QpIHtcclxuICBjb25zdCB0b2tlbiA9IHJlcXVlc3QuY29va2llcy5nZXQoXCJ0b2tlblwiKT8udmFsdWU7XHJcbiAgaWYgKCF0b2tlbikge1xyXG4gICAgY29uc3QgZXJyOiBhbnkgPSBuZXcgRXJyb3IoXCJUb2tlbiBuw6NvIGVuY29udHJhZG9cIik7XHJcbiAgICBlcnIuc3RhdHVzID0gNDAxO1xyXG4gICAgdGhyb3cgZXJyO1xyXG4gIH1cclxuXHJcbiAgdHJ5IHtcclxuICAgIGNvbnN0IGRlY29kZWQgPSBqd3QudmVyaWZ5KHRva2VuLCBKV1RfU0VDUkVUKSBhcyB7XHJcbiAgICAgIHN1Yj86IHN0cmluZztcclxuICAgICAgaWQ/OiBzdHJpbmc7XHJcbiAgICAgIGVtYWlsPzogc3RyaW5nO1xyXG4gICAgfTtcclxuICAgIGNvbnN0IHVzZXJJZCA9IGRlY29kZWQuc3ViIHx8IGRlY29kZWQuaWQ7IC8vIDw8IGNoYXZlIGFxdWlcclxuICAgIGlmICghdXNlcklkKSB7XHJcbiAgICAgIGNvbnN0IGVycjogYW55ID0gbmV3IEVycm9yKFwiVG9rZW4gaW52w6FsaWRvIChzZW0gaWQvc3ViKVwiKTtcclxuICAgICAgZXJyLnN0YXR1cyA9IDQwMTtcclxuICAgICAgdGhyb3cgZXJyO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHVzZXJJZDtcclxuICB9IGNhdGNoIHtcclxuICAgIGNvbnN0IGVycjogYW55ID0gbmV3IEVycm9yKFwiVG9rZW4gaW52w6FsaWRvL2V4cGlyYWRvXCIpO1xyXG4gICAgZXJyLnN0YXR1cyA9IDQwMTtcclxuICAgIHRocm93IGVycjtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBHRVQocmVxdWVzdDogTmV4dFJlcXVlc3QpIHtcclxuICB0cnkge1xyXG4gICAgY29uc3QgdXNlcklkID0gZ2V0VXNlcklkRnJvbVJlcXVlc3QocmVxdWVzdCk7XHJcblxyXG4gICAgLy8gR0VUOiBsaXN0YXIgZmF2b3JpdG9zIGNvbSBkYWRvcyBkbyBjdXJzb1xyXG4gICAgY29uc3QgZmF2b3JpdG9zID0gYXdhaXQgcHJpc21hLmZhdm9yaXRvLmZpbmRNYW55KHtcclxuICAgICAgd2hlcmU6IHsgdXN1YXJpb0lkOiB1c2VySWQgfSxcclxuICAgICAgaW5jbHVkZToge1xyXG4gICAgICAgIGN1cnNvOiB7XHJcbiAgICAgICAgICBpbmNsdWRlOiB7XHJcbiAgICAgICAgICAgIGNhdGVnb3JpYTogdHJ1ZSxcclxuICAgICAgICAgICAgLy8gPDwgYWp1c3RlIGFxdWk6IG5hdmVnYXIgcGVsYSBwaXbDtFxyXG4gICAgICAgICAgICBpbnN0cnV0b3Jlczoge1xyXG4gICAgICAgICAgICAgIGluY2x1ZGU6IHtcclxuICAgICAgICAgICAgICAgIGluc3RydXRvcjogeyBzZWxlY3Q6IHsgaWQ6IHRydWUsIG5vbWU6IHRydWUgfSB9LFxyXG4gICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIF9jb3VudDoge1xyXG4gICAgICAgICAgICAgIHNlbGVjdDoge1xyXG4gICAgICAgICAgICAgICAgdXN1YXJpb0N1cnNvczogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIGF2YWxpYWNvZXM6IHRydWUsXHJcbiAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgfSxcclxuICAgICAgfSxcclxuICAgICAgb3JkZXJCeTogeyBkYXRhOiBcImRlc2NcIiB9LCAvLyBzZXUgY2FtcG8gbm8gRmF2b3JpdG9cclxuICAgIH0pO1xyXG5cclxuICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7IGRhdGE6IGZhdm9yaXRvcyB9KTtcclxuICB9IGNhdGNoIChlcnI6IGFueSkge1xyXG4gICAgY29uc3Qgc3RhdHVzID0gZXJyPy5zdGF0dXMgPz8gNTAwO1xyXG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKFxyXG4gICAgICB7IGVycm9yOiBlcnI/Lm1lc3NhZ2UgPz8gXCJFcnJvIGludGVybm8gZG8gc2Vydmlkb3JcIiB9LFxyXG4gICAgICB7IHN0YXR1cyB9XHJcbiAgICApO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIFBPU1QocmVxdWVzdDogTmV4dFJlcXVlc3QpIHtcclxuICB0cnkge1xyXG4gICAgY29uc3QgdXNlcklkID0gZ2V0VXNlcklkRnJvbVJlcXVlc3QocmVxdWVzdCk7XHJcbiAgICBjb25zdCB7IGN1cnNvSWQgfSA9IGF3YWl0IHJlcXVlc3QuanNvbigpO1xyXG4gICAgaWYgKCFjdXJzb0lkKSB7XHJcbiAgICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbihcclxuICAgICAgICB7IGVycm9yOiBcIklEIGRvIGN1cnNvIMOpIG9icmlnYXTDs3Jpb1wiIH0sXHJcbiAgICAgICAgeyBzdGF0dXM6IDQwMCB9XHJcbiAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3Qgd2hlcmVDb21wb3NpdGUgPSB7XHJcbiAgICAgIHVzdWFyaW9JZF9jdXJzb0lkOiB7IHVzdWFyaW9JZDogdXNlcklkLCBjdXJzb0lkIH0sXHJcbiAgICB9O1xyXG5cclxuICAgIGNvbnN0IGV4aXN0ZW50ZSA9IGF3YWl0IHByaXNtYS5mYXZvcml0by5maW5kVW5pcXVlKHtcclxuICAgICAgd2hlcmU6IHdoZXJlQ29tcG9zaXRlLFxyXG4gICAgICBpbmNsdWRlOiB7XHJcbiAgICAgICAgY3Vyc286IHtcclxuICAgICAgICAgIGluY2x1ZGU6IHtcclxuICAgICAgICAgICAgY2F0ZWdvcmlhOiB0cnVlLFxyXG4gICAgICAgICAgICBpbnN0cnV0b3Jlczoge1xyXG4gICAgICAgICAgICAgIGluY2x1ZGU6IHsgaW5zdHJ1dG9yOiB7IHNlbGVjdDogeyBpZDogdHJ1ZSwgbm9tZTogdHJ1ZSB9IH0gfSxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgX2NvdW50OiB7IHNlbGVjdDogeyB1c3VhcmlvQ3Vyc29zOiB0cnVlLCBhdmFsaWFjb2VzOiB0cnVlIH0gfSxcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgfSxcclxuICAgICAgfSxcclxuICAgIH0pO1xyXG5cclxuICAgIGlmIChleGlzdGVudGUpIHtcclxuICAgICAgYXdhaXQgcHJpc21hLmZhdm9yaXRvLmRlbGV0ZSh7IHdoZXJlOiB3aGVyZUNvbXBvc2l0ZSB9KTtcclxuICAgICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgYWN0aW9uOiBcInJlbW92ZWRcIiwgZmF2b3JpdG86IGV4aXN0ZW50ZSB9KTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBub3ZvID0gYXdhaXQgcHJpc21hLmZhdm9yaXRvLmNyZWF0ZSh7XHJcbiAgICAgIGRhdGE6IHtcclxuICAgICAgICB1c3VhcmlvOiB7IGNvbm5lY3Q6IHsgaWQ6IHVzZXJJZCB9IH0sXHJcbiAgICAgICAgY3Vyc286IHsgY29ubmVjdDogeyBpZDogY3Vyc29JZCB9IH0sXHJcbiAgICAgIH0sXHJcbiAgICAgIGluY2x1ZGU6IHtcclxuICAgICAgICBjdXJzbzoge1xyXG4gICAgICAgICAgaW5jbHVkZToge1xyXG4gICAgICAgICAgICBjYXRlZ29yaWE6IHRydWUsXHJcbiAgICAgICAgICAgIGluc3RydXRvcmVzOiB7XHJcbiAgICAgICAgICAgICAgaW5jbHVkZTogeyBpbnN0cnV0b3I6IHsgc2VsZWN0OiB7IGlkOiB0cnVlLCBub21lOiB0cnVlIH0gfSB9LFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBfY291bnQ6IHsgc2VsZWN0OiB7IHVzdWFyaW9DdXJzb3M6IHRydWUsIGF2YWxpYWNvZXM6IHRydWUgfSB9LFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICB9LFxyXG4gICAgICB9LFxyXG4gICAgfSk7XHJcblxyXG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgYWN0aW9uOiBcImFkZGVkXCIsIGZhdm9yaXRvOiBub3ZvIH0pO1xyXG4gIH0gY2F0Y2ggKGVycjogYW55KSB7XHJcbiAgICBjb25zdCBzdGF0dXMgPSBlcnI/LnN0YXR1cyA/PyA1MDA7XHJcbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oXHJcbiAgICAgIHsgZXJyb3I6IGVycj8ubWVzc2FnZSA/PyBcIkVycm8gaW50ZXJubyBkbyBzZXJ2aWRvclwiIH0sXHJcbiAgICAgIHsgc3RhdHVzIH1cclxuICAgICk7XHJcbiAgfVxyXG59XHJcbiJdLCJuYW1lcyI6WyJOZXh0UmVzcG9uc2UiLCJwcmlzbWEiLCJqd3QiLCJKV1RfU0VDUkVUIiwicHJvY2VzcyIsImVudiIsImdldFVzZXJJZEZyb21SZXF1ZXN0IiwicmVxdWVzdCIsInRva2VuIiwiY29va2llcyIsImdldCIsInZhbHVlIiwiZXJyIiwiRXJyb3IiLCJzdGF0dXMiLCJkZWNvZGVkIiwidmVyaWZ5IiwidXNlcklkIiwic3ViIiwiaWQiLCJHRVQiLCJmYXZvcml0b3MiLCJmYXZvcml0byIsImZpbmRNYW55Iiwid2hlcmUiLCJ1c3VhcmlvSWQiLCJpbmNsdWRlIiwiY3Vyc28iLCJjYXRlZ29yaWEiLCJpbnN0cnV0b3JlcyIsImluc3RydXRvciIsInNlbGVjdCIsIm5vbWUiLCJfY291bnQiLCJ1c3VhcmlvQ3Vyc29zIiwiYXZhbGlhY29lcyIsIm9yZGVyQnkiLCJkYXRhIiwianNvbiIsImVycm9yIiwibWVzc2FnZSIsIlBPU1QiLCJjdXJzb0lkIiwid2hlcmVDb21wb3NpdGUiLCJ1c3VhcmlvSWRfY3Vyc29JZCIsImV4aXN0ZW50ZSIsImZpbmRVbmlxdWUiLCJkZWxldGUiLCJhY3Rpb24iLCJub3ZvIiwiY3JlYXRlIiwidXN1YXJpbyIsImNvbm5lY3QiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./app/api/favoritos/route.ts\n");

/***/ }),

/***/ "(rsc)/./lib/prisma.ts":
/*!***********************!*\
  !*** ./lib/prisma.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__),\n/* harmony export */   prisma: () => (/* binding */ prisma)\n/* harmony export */ });\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @prisma/client */ \"@prisma/client\");\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_prisma_client__WEBPACK_IMPORTED_MODULE_0__);\n\nconst globalForPrisma = globalThis;\nconst prisma = globalForPrisma.prisma || new _prisma_client__WEBPACK_IMPORTED_MODULE_0__.PrismaClient({\n    log: [\n        \"query\",\n        \"error\",\n        \"warn\"\n    ]\n});\nif (true) globalForPrisma.prisma = prisma;\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (prisma);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvcHJpc21hLnRzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBOEM7QUFFOUMsTUFBTUMsa0JBQWtCQztBQUVqQixNQUFNQyxTQUNYRixnQkFBZ0JFLE1BQU0sSUFDdEIsSUFBSUgsd0RBQVlBLENBQUM7SUFDZkksS0FBSztRQUFDO1FBQVM7UUFBUztLQUFPO0FBQ2pDLEdBQUc7QUFFTCxJQUFJQyxJQUFxQyxFQUFFSixnQkFBZ0JFLE1BQU0sR0FBR0E7QUFFcEUsaUVBQWVBLE1BQU1BLEVBQUMiLCJzb3VyY2VzIjpbIkM6XFxVc2Vyc1xcR2FicmllbCBUb3JyZXNcXERlc2t0b3BcXE1ldXMgQ2xpZW50ZXNcXEVyaWNrXFzDgXJlYSBkZSBNZW1icm9zXFxhcmVhX2RlX21lbWJyb3NcXGxpYlxccHJpc21hLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFByaXNtYUNsaWVudCB9IGZyb20gXCJAcHJpc21hL2NsaWVudFwiO1xyXG5cclxuY29uc3QgZ2xvYmFsRm9yUHJpc21hID0gZ2xvYmFsVGhpcyBhcyB1bmtub3duIGFzIHsgcHJpc21hOiBQcmlzbWFDbGllbnQgfTtcclxuXHJcbmV4cG9ydCBjb25zdCBwcmlzbWEgPVxyXG4gIGdsb2JhbEZvclByaXNtYS5wcmlzbWEgfHxcclxuICBuZXcgUHJpc21hQ2xpZW50KHtcclxuICAgIGxvZzogW1wicXVlcnlcIiwgXCJlcnJvclwiLCBcIndhcm5cIl0sXHJcbiAgfSk7XHJcblxyXG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSBnbG9iYWxGb3JQcmlzbWEucHJpc21hID0gcHJpc21hO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgcHJpc21hO1xyXG4iXSwibmFtZXMiOlsiUHJpc21hQ2xpZW50IiwiZ2xvYmFsRm9yUHJpc21hIiwiZ2xvYmFsVGhpcyIsInByaXNtYSIsImxvZyIsInByb2Nlc3MiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./lib/prisma.ts\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Ffavoritos%2Froute&page=%2Fapi%2Ffavoritos%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Ffavoritos%2Froute.ts&appDir=C%3A%5CUsers%5CGabriel%20Torres%5CDesktop%5CMeus%20Clientes%5CErick%5C%C3%81rea%20de%20Membros%5Carea_de_membros%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CGabriel%20Torres%5CDesktop%5CMeus%20Clientes%5CErick%5C%C3%81rea%20de%20Membros%5Carea_de_membros&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Ffavoritos%2Froute&page=%2Fapi%2Ffavoritos%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Ffavoritos%2Froute.ts&appDir=C%3A%5CUsers%5CGabriel%20Torres%5CDesktop%5CMeus%20Clientes%5CErick%5C%C3%81rea%20de%20Membros%5Carea_de_membros%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CGabriel%20Torres%5CDesktop%5CMeus%20Clientes%5CErick%5C%C3%81rea%20de%20Membros%5Carea_de_membros&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var C_Users_Gabriel_Torres_Desktop_Meus_Clientes_Erick_rea_de_Membros_area_de_membros_app_api_favoritos_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/favoritos/route.ts */ \"(rsc)/./app/api/favoritos/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/favoritos/route\",\n        pathname: \"/api/favoritos\",\n        filename: \"route\",\n        bundlePath: \"app/api/favoritos/route\"\n    },\n    resolvedPagePath: \"C:\\\\Users\\\\Gabriel Torres\\\\Desktop\\\\Meus Clientes\\\\Erick\\\\Área de Membros\\\\area_de_membros\\\\app\\\\api\\\\favoritos\\\\route.ts\",\n    nextConfigOutput,\n    userland: C_Users_Gabriel_Torres_Desktop_Meus_Clientes_Erick_rea_de_Membros_area_de_membros_app_api_favoritos_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZhcGklMkZmYXZvcml0b3MlMkZyb3V0ZSZwYWdlPSUyRmFwaSUyRmZhdm9yaXRvcyUyRnJvdXRlJmFwcFBhdGhzPSZwYWdlUGF0aD1wcml2YXRlLW5leHQtYXBwLWRpciUyRmFwaSUyRmZhdm9yaXRvcyUyRnJvdXRlLnRzJmFwcERpcj1DJTNBJTVDVXNlcnMlNUNHYWJyaWVsJTIwVG9ycmVzJTVDRGVza3RvcCU1Q01ldXMlMjBDbGllbnRlcyU1Q0VyaWNrJTVDJUMzJTgxcmVhJTIwZGUlMjBNZW1icm9zJTVDYXJlYV9kZV9tZW1icm9zJTVDYXBwJnBhZ2VFeHRlbnNpb25zPXRzeCZwYWdlRXh0ZW5zaW9ucz10cyZwYWdlRXh0ZW5zaW9ucz1qc3gmcGFnZUV4dGVuc2lvbnM9anMmcm9vdERpcj1DJTNBJTVDVXNlcnMlNUNHYWJyaWVsJTIwVG9ycmVzJTVDRGVza3RvcCU1Q01ldXMlMjBDbGllbnRlcyU1Q0VyaWNrJTVDJUMzJTgxcmVhJTIwZGUlMjBNZW1icm9zJTVDYXJlYV9kZV9tZW1icm9zJmlzRGV2PXRydWUmdHNjb25maWdQYXRoPXRzY29uZmlnLmpzb24mYmFzZVBhdGg9JmFzc2V0UHJlZml4PSZuZXh0Q29uZmlnT3V0cHV0PSZwcmVmZXJyZWRSZWdpb249Jm1pZGRsZXdhcmVDb25maWc9ZTMwJTNEISIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUErRjtBQUN2QztBQUNxQjtBQUN5RTtBQUN0SjtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IseUdBQW1CO0FBQzNDO0FBQ0EsY0FBYyxrRUFBUztBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsWUFBWTtBQUNaLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSxRQUFRLHNEQUFzRDtBQUM5RDtBQUNBLFdBQVcsNEVBQVc7QUFDdEI7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUMwRjs7QUFFMUYiLCJzb3VyY2VzIjpbIiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBcHBSb3V0ZVJvdXRlTW9kdWxlIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvcm91dGUtbW9kdWxlcy9hcHAtcm91dGUvbW9kdWxlLmNvbXBpbGVkXCI7XG5pbXBvcnQgeyBSb3V0ZUtpbmQgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9yb3V0ZS1raW5kXCI7XG5pbXBvcnQgeyBwYXRjaEZldGNoIGFzIF9wYXRjaEZldGNoIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvbGliL3BhdGNoLWZldGNoXCI7XG5pbXBvcnQgKiBhcyB1c2VybGFuZCBmcm9tIFwiQzpcXFxcVXNlcnNcXFxcR2FicmllbCBUb3JyZXNcXFxcRGVza3RvcFxcXFxNZXVzIENsaWVudGVzXFxcXEVyaWNrXFxcXMOBcmVhIGRlIE1lbWJyb3NcXFxcYXJlYV9kZV9tZW1icm9zXFxcXGFwcFxcXFxhcGlcXFxcZmF2b3JpdG9zXFxcXHJvdXRlLnRzXCI7XG4vLyBXZSBpbmplY3QgdGhlIG5leHRDb25maWdPdXRwdXQgaGVyZSBzbyB0aGF0IHdlIGNhbiB1c2UgdGhlbSBpbiB0aGUgcm91dGVcbi8vIG1vZHVsZS5cbmNvbnN0IG5leHRDb25maWdPdXRwdXQgPSBcIlwiXG5jb25zdCByb3V0ZU1vZHVsZSA9IG5ldyBBcHBSb3V0ZVJvdXRlTW9kdWxlKHtcbiAgICBkZWZpbml0aW9uOiB7XG4gICAgICAgIGtpbmQ6IFJvdXRlS2luZC5BUFBfUk9VVEUsXG4gICAgICAgIHBhZ2U6IFwiL2FwaS9mYXZvcml0b3Mvcm91dGVcIixcbiAgICAgICAgcGF0aG5hbWU6IFwiL2FwaS9mYXZvcml0b3NcIixcbiAgICAgICAgZmlsZW5hbWU6IFwicm91dGVcIixcbiAgICAgICAgYnVuZGxlUGF0aDogXCJhcHAvYXBpL2Zhdm9yaXRvcy9yb3V0ZVwiXG4gICAgfSxcbiAgICByZXNvbHZlZFBhZ2VQYXRoOiBcIkM6XFxcXFVzZXJzXFxcXEdhYnJpZWwgVG9ycmVzXFxcXERlc2t0b3BcXFxcTWV1cyBDbGllbnRlc1xcXFxFcmlja1xcXFzDgXJlYSBkZSBNZW1icm9zXFxcXGFyZWFfZGVfbWVtYnJvc1xcXFxhcHBcXFxcYXBpXFxcXGZhdm9yaXRvc1xcXFxyb3V0ZS50c1wiLFxuICAgIG5leHRDb25maWdPdXRwdXQsXG4gICAgdXNlcmxhbmRcbn0pO1xuLy8gUHVsbCBvdXQgdGhlIGV4cG9ydHMgdGhhdCB3ZSBuZWVkIHRvIGV4cG9zZSBmcm9tIHRoZSBtb2R1bGUuIFRoaXMgc2hvdWxkXG4vLyBiZSBlbGltaW5hdGVkIHdoZW4gd2UndmUgbW92ZWQgdGhlIG90aGVyIHJvdXRlcyB0byB0aGUgbmV3IGZvcm1hdC4gVGhlc2Vcbi8vIGFyZSB1c2VkIHRvIGhvb2sgaW50byB0aGUgcm91dGUuXG5jb25zdCB7IHdvcmtBc3luY1N0b3JhZ2UsIHdvcmtVbml0QXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcyB9ID0gcm91dGVNb2R1bGU7XG5mdW5jdGlvbiBwYXRjaEZldGNoKCkge1xuICAgIHJldHVybiBfcGF0Y2hGZXRjaCh7XG4gICAgICAgIHdvcmtBc3luY1N0b3JhZ2UsXG4gICAgICAgIHdvcmtVbml0QXN5bmNTdG9yYWdlXG4gICAgfSk7XG59XG5leHBvcnQgeyByb3V0ZU1vZHVsZSwgd29ya0FzeW5jU3RvcmFnZSwgd29ya1VuaXRBc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzLCBwYXRjaEZldGNoLCAgfTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YXBwLXJvdXRlLmpzLm1hcCJdLCJuYW1lcyI6W10sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Ffavoritos%2Froute&page=%2Fapi%2Ffavoritos%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Ffavoritos%2Froute.ts&appDir=C%3A%5CUsers%5CGabriel%20Torres%5CDesktop%5CMeus%20Clientes%5CErick%5C%C3%81rea%20de%20Membros%5Carea_de_membros%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CGabriel%20Torres%5CDesktop%5CMeus%20Clientes%5CErick%5C%C3%81rea%20de%20Membros%5Carea_de_membros&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

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
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/semver","vendor-chunks/jsonwebtoken","vendor-chunks/lodash.includes","vendor-chunks/jws","vendor-chunks/lodash.once","vendor-chunks/jwa","vendor-chunks/lodash.isinteger","vendor-chunks/ecdsa-sig-formatter","vendor-chunks/lodash.isplainobject","vendor-chunks/ms","vendor-chunks/lodash.isstring","vendor-chunks/lodash.isnumber","vendor-chunks/lodash.isboolean","vendor-chunks/safe-buffer","vendor-chunks/buffer-equal-constant-time"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Ffavoritos%2Froute&page=%2Fapi%2Ffavoritos%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Ffavoritos%2Froute.ts&appDir=C%3A%5CUsers%5CGabriel%20Torres%5CDesktop%5CMeus%20Clientes%5CErick%5C%C3%81rea%20de%20Membros%5Carea_de_membros%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CGabriel%20Torres%5CDesktop%5CMeus%20Clientes%5CErick%5C%C3%81rea%20de%20Membros%5Carea_de_membros&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();