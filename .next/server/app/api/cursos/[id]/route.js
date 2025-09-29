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
exports.id = "app/api/cursos/[id]/route";
exports.ids = ["app/api/cursos/[id]/route"];
exports.modules = {

/***/ "(rsc)/./app/api/cursos/[id]/route.ts":
/*!**************************************!*\
  !*** ./app/api/cursos/[id]/route.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ GET)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var _lib_prisma__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/lib/prisma */ \"(rsc)/./lib/prisma.ts\");\n/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! jsonwebtoken */ \"(rsc)/./node_modules/jsonwebtoken/index.js\");\n/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(jsonwebtoken__WEBPACK_IMPORTED_MODULE_2__);\n\n\n\nasync function GET(request, { params }) {\n    try {\n        const { id } = await params;\n        // Verificar token de autenticação\n        const token = request.cookies.get(\"token\")?.value;\n        if (!token) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: \"Token de autenticação não encontrado\"\n            }, {\n                status: 401\n            });\n        }\n        let userId;\n        try {\n            const decoded = jsonwebtoken__WEBPACK_IMPORTED_MODULE_2___default().verify(token, process.env.JWT_SECRET);\n            userId = decoded.sub;\n        } catch (error) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: \"Token inválido\"\n            }, {\n                status: 401\n            });\n        }\n        // Verificar se o usuário tem acesso ao curso\n        const usuarioCurso = await _lib_prisma__WEBPACK_IMPORTED_MODULE_1__.prisma.usuarioCurso.findFirst({\n            where: {\n                usuarioId: userId,\n                cursoId: id\n            }\n        });\n        if (!usuarioCurso) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: \"Você não tem acesso a este curso\"\n            }, {\n                status: 403\n            });\n        }\n        const curso = await _lib_prisma__WEBPACK_IMPORTED_MODULE_1__.prisma.curso.findUnique({\n            where: {\n                id\n            },\n            include: {\n                categoria: true,\n                instrutores: {\n                    // ✅ CORRIGIDO: plural\n                    include: {\n                        instrutor: {\n                            // ✅ Acessa o instrutor da relação\n                            select: {\n                                id: true,\n                                nome: true,\n                                bio: true,\n                                avatar: true,\n                                redesSociais: true\n                            }\n                        }\n                    }\n                },\n                cursoModulos: {\n                    // ✅ CORRIGIDO: relação correta\n                    include: {\n                        modulo: {\n                            include: {\n                                aulaModulos: {\n                                    include: {\n                                        aula: true\n                                    },\n                                    orderBy: {\n                                        id: \"asc\"\n                                    }\n                                }\n                            }\n                        }\n                    }\n                },\n                _count: {\n                    select: {\n                        usuarioCursos: true,\n                        avaliacoes: true\n                    }\n                }\n            }\n        });\n        if (!curso) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: \"Curso não encontrado\"\n            }, {\n                status: 404\n            });\n        }\n        // Ordenar módulos e aulas manualmente no JavaScript\n        if (curso.cursoModulos) {\n            curso.cursoModulos.sort((a, b)=>(a.modulo?.ordem || 0) - (b.modulo?.ordem || 0));\n            curso.cursoModulos.forEach((cm)=>{\n                if (cm.modulo?.aulaModulos) {\n                    cm.modulo.aulaModulos.sort((a, b)=>(a.aula?.ordem || 0) - (b.aula?.ordem || 0));\n                }\n            });\n        }\n        // Calcular média de avaliações\n        const avaliacoes = await _lib_prisma__WEBPACK_IMPORTED_MODULE_1__.prisma.cursoAvaliacao.findMany({\n            where: {\n                cursoId: curso.id\n            },\n            select: {\n                nota: true\n            }\n        });\n        const mediaAvaliacoes = avaliacoes.length > 0 ? avaliacoes.reduce((sum, av)=>sum + av.nota, 0) / avaliacoes.length : 0;\n        // Buscar algumas avaliações recentes\n        const avaliacoesRecentes = await _lib_prisma__WEBPACK_IMPORTED_MODULE_1__.prisma.cursoAvaliacao.findMany({\n            where: {\n                cursoId: curso.id\n            },\n            include: {\n                usuario: {\n                    select: {\n                        id: true,\n                        name: true\n                    }\n                }\n            },\n            orderBy: {\n                data: \"desc\"\n            },\n            take: 5\n        });\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            data: {\n                ...curso,\n                mediaAvaliacoes: Math.round(mediaAvaliacoes * 10) / 10,\n                avaliacoesRecentes\n            },\n            usuarioCurso\n        });\n    } catch (error) {\n        console.error(\"Erro ao buscar curso:\", error);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: \"Erro interno do servidor\"\n        }, {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QWEsTUFBTTNDLCtDQUFNQSxDQUFDa0QsY0FBYyxDQUFDQyxRQUFRLENBQUM7WUFDdEQ3QixPQUFPO2dCQUFFRSxTQUFTQyxNQUFNcEIsRUFBRTtZQUFDO1lBQzNCMEIsUUFBUTtnQkFBRXFCLE1BQU07WUFBSztRQUN2QjtRQUVBLE1BQU1DLGtCQUNKVixXQUFXVyxNQUFNLEdBQUcsSUFDaEJYLFdBQVdZLE1BQU0sQ0FBQyxDQUFDQyxLQUFLQyxLQUFPRCxNQUFNQyxHQUFHTCxJQUFJLEVBQUUsS0FBS1QsV0FBV1csTUFBTSxHQUNwRTtRQUVOLHFDQUFxQztRQUNyQyxNQUFNSSxxQkFBcUIsTUFBTTFELCtDQUFNQSxDQUFDa0QsY0FBYyxDQUFDQyxRQUFRLENBQUM7WUFDOUQ3QixPQUFPO2dCQUFFRSxTQUFTQyxNQUFNcEIsRUFBRTtZQUFDO1lBQzNCc0IsU0FBUztnQkFDUGdDLFNBQVM7b0JBQ1A1QixRQUFRO3dCQUNOMUIsSUFBSTt3QkFDSnVELE1BQU07b0JBQ1I7Z0JBQ0Y7WUFDRjtZQUNBcEIsU0FBUztnQkFBRXFCLE1BQU07WUFBTztZQUN4QkMsTUFBTTtRQUNSO1FBRUEsT0FBTy9ELHFEQUFZQSxDQUFDVyxJQUFJLENBQUM7WUFDdkJtRCxNQUFNO2dCQUNKLEdBQUdwQyxLQUFLO2dCQUNSNEIsaUJBQWlCVSxLQUFLQyxLQUFLLENBQUNYLGtCQUFrQixNQUFNO2dCQUNwREs7WUFDRjtZQUNBdEM7UUFDRjtJQUNGLEVBQUUsT0FBT1QsT0FBTztRQUNkc0QsUUFBUXRELEtBQUssQ0FBQyx5QkFBeUJBO1FBQ3ZDLE9BQU9aLHFEQUFZQSxDQUFDVyxJQUFJLENBQ3RCO1lBQUVDLE9BQU87UUFBMkIsR0FDcEM7WUFBRUMsUUFBUTtRQUFJO0lBRWxCO0FBQ0YiLCJzb3VyY2VzIjpbIkM6XFxVc2Vyc1xcR2FicmllbCBUb3JyZXNcXERlc2t0b3BcXE1ldXMgQ2xpZW50ZXNcXEVyaWNrXFzDgXJlYSBkZSBNZW1icm9zXFxhcmVhX2RlX21lbWJyb3NcXGFwcFxcYXBpXFxjdXJzb3NcXFtpZF1cXHJvdXRlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5leHRSZXF1ZXN0LCBOZXh0UmVzcG9uc2UgfSBmcm9tIFwibmV4dC9zZXJ2ZXJcIjtcclxuaW1wb3J0IHsgcHJpc21hIH0gZnJvbSBcIkAvbGliL3ByaXNtYVwiO1xyXG5pbXBvcnQgand0IGZyb20gXCJqc29ud2VidG9rZW5cIjtcclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBHRVQoXHJcbiAgcmVxdWVzdDogTmV4dFJlcXVlc3QsXHJcbiAgeyBwYXJhbXMgfTogeyBwYXJhbXM6IFByb21pc2U8eyBpZDogc3RyaW5nIH0+IH1cclxuKSB7XHJcbiAgdHJ5IHtcclxuICAgIGNvbnN0IHsgaWQgfSA9IGF3YWl0IHBhcmFtcztcclxuXHJcbiAgICAvLyBWZXJpZmljYXIgdG9rZW4gZGUgYXV0ZW50aWNhw6fDo29cclxuICAgIGNvbnN0IHRva2VuID0gcmVxdWVzdC5jb29raWVzLmdldChcInRva2VuXCIpPy52YWx1ZTtcclxuICAgIGlmICghdG9rZW4pIHtcclxuICAgICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKFxyXG4gICAgICAgIHsgZXJyb3I6IFwiVG9rZW4gZGUgYXV0ZW50aWNhw6fDo28gbsOjbyBlbmNvbnRyYWRvXCIgfSxcclxuICAgICAgICB7IHN0YXR1czogNDAxIH1cclxuICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICBsZXQgdXNlcklkOiBzdHJpbmc7XHJcbiAgICB0cnkge1xyXG4gICAgICBjb25zdCBkZWNvZGVkID0gand0LnZlcmlmeSh0b2tlbiwgcHJvY2Vzcy5lbnYuSldUX1NFQ1JFVCEpIGFzIHtcclxuICAgICAgICBzdWI6IHN0cmluZztcclxuICAgICAgfTtcclxuICAgICAgdXNlcklkID0gZGVjb2RlZC5zdWI7XHJcbiAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyBlcnJvcjogXCJUb2tlbiBpbnbDoWxpZG9cIiB9LCB7IHN0YXR1czogNDAxIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIFZlcmlmaWNhciBzZSBvIHVzdcOhcmlvIHRlbSBhY2Vzc28gYW8gY3Vyc29cclxuICAgIGNvbnN0IHVzdWFyaW9DdXJzbyA9IGF3YWl0IHByaXNtYS51c3VhcmlvQ3Vyc28uZmluZEZpcnN0KHtcclxuICAgICAgd2hlcmU6IHtcclxuICAgICAgICB1c3VhcmlvSWQ6IHVzZXJJZCxcclxuICAgICAgICBjdXJzb0lkOiBpZCxcclxuICAgICAgfSxcclxuICAgIH0pO1xyXG5cclxuICAgIGlmICghdXN1YXJpb0N1cnNvKSB7XHJcbiAgICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbihcclxuICAgICAgICB7IGVycm9yOiBcIlZvY8OqIG7Do28gdGVtIGFjZXNzbyBhIGVzdGUgY3Vyc29cIiB9LFxyXG4gICAgICAgIHsgc3RhdHVzOiA0MDMgfVxyXG4gICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGN1cnNvID0gYXdhaXQgcHJpc21hLmN1cnNvLmZpbmRVbmlxdWUoe1xyXG4gICAgICB3aGVyZTogeyBpZCB9LFxyXG4gICAgICBpbmNsdWRlOiB7XHJcbiAgICAgICAgY2F0ZWdvcmlhOiB0cnVlLFxyXG4gICAgICAgIGluc3RydXRvcmVzOiB7XHJcbiAgICAgICAgICAvLyDinIUgQ09SUklHSURPOiBwbHVyYWxcclxuICAgICAgICAgIGluY2x1ZGU6IHtcclxuICAgICAgICAgICAgaW5zdHJ1dG9yOiB7XHJcbiAgICAgICAgICAgICAgLy8g4pyFIEFjZXNzYSBvIGluc3RydXRvciBkYSByZWxhw6fDo29cclxuICAgICAgICAgICAgICBzZWxlY3Q6IHtcclxuICAgICAgICAgICAgICAgIGlkOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgbm9tZTogdHJ1ZSwgLy8g4pyFIENPUlJJR0lETzogXCJub21lXCJcclxuICAgICAgICAgICAgICAgIGJpbzogdHJ1ZSwgLy8g4pyFIENPUlJJR0lETzogY2FtcG9zIGNvcnJldG9zXHJcbiAgICAgICAgICAgICAgICBhdmF0YXI6IHRydWUsXHJcbiAgICAgICAgICAgICAgICByZWRlc1NvY2lhaXM6IHRydWUsXHJcbiAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgfSxcclxuICAgICAgICBjdXJzb01vZHVsb3M6IHtcclxuICAgICAgICAgIC8vIOKchSBDT1JSSUdJRE86IHJlbGHDp8OjbyBjb3JyZXRhXHJcbiAgICAgICAgICBpbmNsdWRlOiB7XHJcbiAgICAgICAgICAgIG1vZHVsbzoge1xyXG4gICAgICAgICAgICAgIGluY2x1ZGU6IHtcclxuICAgICAgICAgICAgICAgIGF1bGFNb2R1bG9zOiB7XHJcbiAgICAgICAgICAgICAgICAgIGluY2x1ZGU6IHtcclxuICAgICAgICAgICAgICAgICAgICBhdWxhOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICBvcmRlckJ5OiB7IGlkOiBcImFzY1wiIH0sIC8vIG91IG91dHJvIGNhbXBvIGRlIG9yZGVtXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgX2NvdW50OiB7XHJcbiAgICAgICAgICBzZWxlY3Q6IHtcclxuICAgICAgICAgICAgdXN1YXJpb0N1cnNvczogdHJ1ZSxcclxuICAgICAgICAgICAgYXZhbGlhY29lczogdHJ1ZSxcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgfSxcclxuICAgICAgfSxcclxuICAgIH0pO1xyXG5cclxuICAgIGlmICghY3Vyc28pIHtcclxuICAgICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKFxyXG4gICAgICAgIHsgZXJyb3I6IFwiQ3Vyc28gbsOjbyBlbmNvbnRyYWRvXCIgfSxcclxuICAgICAgICB7IHN0YXR1czogNDA0IH1cclxuICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBPcmRlbmFyIG3Ds2R1bG9zIGUgYXVsYXMgbWFudWFsbWVudGUgbm8gSmF2YVNjcmlwdFxyXG4gICAgaWYgKGN1cnNvLmN1cnNvTW9kdWxvcykge1xyXG4gICAgICBjdXJzby5jdXJzb01vZHVsb3Muc29ydChcclxuICAgICAgICAoYSwgYikgPT4gKGEubW9kdWxvPy5vcmRlbSB8fCAwKSAtIChiLm1vZHVsbz8ub3JkZW0gfHwgMClcclxuICAgICAgKTtcclxuXHJcbiAgICAgIGN1cnNvLmN1cnNvTW9kdWxvcy5mb3JFYWNoKChjbSkgPT4ge1xyXG4gICAgICAgIGlmIChjbS5tb2R1bG8/LmF1bGFNb2R1bG9zKSB7XHJcbiAgICAgICAgICBjbS5tb2R1bG8uYXVsYU1vZHVsb3Muc29ydChcclxuICAgICAgICAgICAgKGEsIGIpID0+IChhLmF1bGE/Lm9yZGVtIHx8IDApIC0gKGIuYXVsYT8ub3JkZW0gfHwgMClcclxuICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBDYWxjdWxhciBtw6lkaWEgZGUgYXZhbGlhw6fDtWVzXHJcbiAgICBjb25zdCBhdmFsaWFjb2VzID0gYXdhaXQgcHJpc21hLmN1cnNvQXZhbGlhY2FvLmZpbmRNYW55KHtcclxuICAgICAgd2hlcmU6IHsgY3Vyc29JZDogY3Vyc28uaWQgfSxcclxuICAgICAgc2VsZWN0OiB7IG5vdGE6IHRydWUgfSxcclxuICAgIH0pO1xyXG5cclxuICAgIGNvbnN0IG1lZGlhQXZhbGlhY29lcyA9XHJcbiAgICAgIGF2YWxpYWNvZXMubGVuZ3RoID4gMFxyXG4gICAgICAgID8gYXZhbGlhY29lcy5yZWR1Y2UoKHN1bSwgYXYpID0+IHN1bSArIGF2Lm5vdGEsIDApIC8gYXZhbGlhY29lcy5sZW5ndGhcclxuICAgICAgICA6IDA7XHJcblxyXG4gICAgLy8gQnVzY2FyIGFsZ3VtYXMgYXZhbGlhw6fDtWVzIHJlY2VudGVzXHJcbiAgICBjb25zdCBhdmFsaWFjb2VzUmVjZW50ZXMgPSBhd2FpdCBwcmlzbWEuY3Vyc29BdmFsaWFjYW8uZmluZE1hbnkoe1xyXG4gICAgICB3aGVyZTogeyBjdXJzb0lkOiBjdXJzby5pZCB9LFxyXG4gICAgICBpbmNsdWRlOiB7XHJcbiAgICAgICAgdXN1YXJpbzoge1xyXG4gICAgICAgICAgc2VsZWN0OiB7XHJcbiAgICAgICAgICAgIGlkOiB0cnVlLFxyXG4gICAgICAgICAgICBuYW1lOiB0cnVlLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICB9LFxyXG4gICAgICB9LFxyXG4gICAgICBvcmRlckJ5OiB7IGRhdGE6IFwiZGVzY1wiIH0sIFxyXG4gICAgICB0YWtlOiA1LFxyXG4gICAgfSk7XHJcblxyXG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHtcclxuICAgICAgZGF0YToge1xyXG4gICAgICAgIC4uLmN1cnNvLFxyXG4gICAgICAgIG1lZGlhQXZhbGlhY29lczogTWF0aC5yb3VuZChtZWRpYUF2YWxpYWNvZXMgKiAxMCkgLyAxMCxcclxuICAgICAgICBhdmFsaWFjb2VzUmVjZW50ZXMsXHJcbiAgICAgIH0sXHJcbiAgICAgIHVzdWFyaW9DdXJzbyxcclxuICAgIH0pO1xyXG4gIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICBjb25zb2xlLmVycm9yKFwiRXJybyBhbyBidXNjYXIgY3Vyc286XCIsIGVycm9yKTtcclxuICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbihcclxuICAgICAgeyBlcnJvcjogXCJFcnJvIGludGVybm8gZG8gc2Vydmlkb3JcIiB9LFxyXG4gICAgICB7IHN0YXR1czogNTAwIH1cclxuICAgICk7XHJcbiAgfVxyXG59XHJcbiJdLCJuYW1lcyI6WyJOZXh0UmVzcG9uc2UiLCJwcmlzbWEiLCJqd3QiLCJHRVQiLCJyZXF1ZXN0IiwicGFyYW1zIiwiaWQiLCJ0b2tlbiIsImNvb2tpZXMiLCJnZXQiLCJ2YWx1ZSIsImpzb24iLCJlcnJvciIsInN0YXR1cyIsInVzZXJJZCIsImRlY29kZWQiLCJ2ZXJpZnkiLCJwcm9jZXNzIiwiZW52IiwiSldUX1NFQ1JFVCIsInN1YiIsInVzdWFyaW9DdXJzbyIsImZpbmRGaXJzdCIsIndoZXJlIiwidXN1YXJpb0lkIiwiY3Vyc29JZCIsImN1cnNvIiwiZmluZFVuaXF1ZSIsImluY2x1ZGUiLCJjYXRlZ29yaWEiLCJpbnN0cnV0b3JlcyIsImluc3RydXRvciIsInNlbGVjdCIsIm5vbWUiLCJiaW8iLCJhdmF0YXIiLCJyZWRlc1NvY2lhaXMiLCJjdXJzb01vZHVsb3MiLCJtb2R1bG8iLCJhdWxhTW9kdWxvcyIsImF1bGEiLCJvcmRlckJ5IiwiX2NvdW50IiwidXN1YXJpb0N1cnNvcyIsImF2YWxpYWNvZXMiLCJzb3J0IiwiYSIsImIiLCJvcmRlbSIsImZvckVhY2giLCJjbSIsImN1cnNvQXZhbGlhY2FvIiwiZmluZE1hbnkiLCJub3RhIiwibWVkaWFBdmFsaWFjb2VzIiwibGVuZ3RoIiwicmVkdWNlIiwic3VtIiwiYXYiLCJhdmFsaWFjb2VzUmVjZW50ZXMiLCJ1c3VhcmlvIiwibmFtZSIsImRhdGEiLCJ0YWtlIiwiTWF0aCIsInJvdW5kIiwiY29uc29sZSJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./app/api/cursos/[id]/route.ts\n");

/***/ }),

/***/ "(rsc)/./lib/prisma.ts":
/*!***********************!*\
  !*** ./lib/prisma.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__),\n/* harmony export */   prisma: () => (/* binding */ prisma)\n/* harmony export */ });\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @prisma/client */ \"@prisma/client\");\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_prisma_client__WEBPACK_IMPORTED_MODULE_0__);\n\nconst globalForPrisma = globalThis;\nconst prisma = globalForPrisma.prisma || new _prisma_client__WEBPACK_IMPORTED_MODULE_0__.PrismaClient({\n    log: [\n        \"query\",\n        \"error\",\n        \"warn\"\n    ]\n});\nif (true) globalForPrisma.prisma = prisma;\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (prisma);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvcHJpc21hLnRzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBOEM7QUFFOUMsTUFBTUMsa0JBQWtCQztBQUVqQixNQUFNQyxTQUNYRixnQkFBZ0JFLE1BQU0sSUFDdEIsSUFBSUgsd0RBQVlBLENBQUM7SUFDZkksS0FBSztRQUFDO1FBQVM7UUFBUztLQUFPO0FBQ2pDLEdBQUc7QUFFTCxJQUFJQyxJQUFxQyxFQUFFSixnQkFBZ0JFLE1BQU0sR0FBR0E7QUFFcEUsaUVBQWVBLE1BQU1BLEVBQUMiLCJzb3VyY2VzIjpbIkM6XFxVc2Vyc1xcR2FicmllbCBUb3JyZXNcXERlc2t0b3BcXE1ldXMgQ2xpZW50ZXNcXEVyaWNrXFzDgXJlYSBkZSBNZW1icm9zXFxhcmVhX2RlX21lbWJyb3NcXGxpYlxccHJpc21hLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFByaXNtYUNsaWVudCB9IGZyb20gXCJAcHJpc21hL2NsaWVudFwiO1xyXG5cclxuY29uc3QgZ2xvYmFsRm9yUHJpc21hID0gZ2xvYmFsVGhpcyBhcyB1bmtub3duIGFzIHsgcHJpc21hOiBQcmlzbWFDbGllbnQgfTtcclxuXHJcbmV4cG9ydCBjb25zdCBwcmlzbWEgPVxyXG4gIGdsb2JhbEZvclByaXNtYS5wcmlzbWEgfHxcclxuICBuZXcgUHJpc21hQ2xpZW50KHtcclxuICAgIGxvZzogW1wicXVlcnlcIiwgXCJlcnJvclwiLCBcIndhcm5cIl0sXHJcbiAgfSk7XHJcblxyXG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSBnbG9iYWxGb3JQcmlzbWEucHJpc21hID0gcHJpc21hO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgcHJpc21hO1xyXG4iXSwibmFtZXMiOlsiUHJpc21hQ2xpZW50IiwiZ2xvYmFsRm9yUHJpc21hIiwiZ2xvYmFsVGhpcyIsInByaXNtYSIsImxvZyIsInByb2Nlc3MiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./lib/prisma.ts\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fcursos%2F%5Bid%5D%2Froute&page=%2Fapi%2Fcursos%2F%5Bid%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fcursos%2F%5Bid%5D%2Froute.ts&appDir=C%3A%5CUsers%5CGabriel%20Torres%5CDesktop%5CMeus%20Clientes%5CErick%5C%C3%81rea%20de%20Membros%5Carea_de_membros%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CGabriel%20Torres%5CDesktop%5CMeus%20Clientes%5CErick%5C%C3%81rea%20de%20Membros%5Carea_de_membros&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fcursos%2F%5Bid%5D%2Froute&page=%2Fapi%2Fcursos%2F%5Bid%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fcursos%2F%5Bid%5D%2Froute.ts&appDir=C%3A%5CUsers%5CGabriel%20Torres%5CDesktop%5CMeus%20Clientes%5CErick%5C%C3%81rea%20de%20Membros%5Carea_de_membros%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CGabriel%20Torres%5CDesktop%5CMeus%20Clientes%5CErick%5C%C3%81rea%20de%20Membros%5Carea_de_membros&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var C_Users_Gabriel_Torres_Desktop_Meus_Clientes_Erick_rea_de_Membros_area_de_membros_app_api_cursos_id_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/cursos/[id]/route.ts */ \"(rsc)/./app/api/cursos/[id]/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/cursos/[id]/route\",\n        pathname: \"/api/cursos/[id]\",\n        filename: \"route\",\n        bundlePath: \"app/api/cursos/[id]/route\"\n    },\n    resolvedPagePath: \"C:\\\\Users\\\\Gabriel Torres\\\\Desktop\\\\Meus Clientes\\\\Erick\\\\Área de Membros\\\\area_de_membros\\\\app\\\\api\\\\cursos\\\\[id]\\\\route.ts\",\n    nextConfigOutput,\n    userland: C_Users_Gabriel_Torres_Desktop_Meus_Clientes_Erick_rea_de_Membros_area_de_membros_app_api_cursos_id_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZhcGklMkZjdXJzb3MlMkYlNUJpZCU1RCUyRnJvdXRlJnBhZ2U9JTJGYXBpJTJGY3Vyc29zJTJGJTVCaWQlNUQlMkZyb3V0ZSZhcHBQYXRocz0mcGFnZVBhdGg9cHJpdmF0ZS1uZXh0LWFwcC1kaXIlMkZhcGklMkZjdXJzb3MlMkYlNUJpZCU1RCUyRnJvdXRlLnRzJmFwcERpcj1DJTNBJTVDVXNlcnMlNUNHYWJyaWVsJTIwVG9ycmVzJTVDRGVza3RvcCU1Q01ldXMlMjBDbGllbnRlcyU1Q0VyaWNrJTVDJUMzJTgxcmVhJTIwZGUlMjBNZW1icm9zJTVDYXJlYV9kZV9tZW1icm9zJTVDYXBwJnBhZ2VFeHRlbnNpb25zPXRzeCZwYWdlRXh0ZW5zaW9ucz10cyZwYWdlRXh0ZW5zaW9ucz1qc3gmcGFnZUV4dGVuc2lvbnM9anMmcm9vdERpcj1DJTNBJTVDVXNlcnMlNUNHYWJyaWVsJTIwVG9ycmVzJTVDRGVza3RvcCU1Q01ldXMlMjBDbGllbnRlcyU1Q0VyaWNrJTVDJUMzJTgxcmVhJTIwZGUlMjBNZW1icm9zJTVDYXJlYV9kZV9tZW1icm9zJmlzRGV2PXRydWUmdHNjb25maWdQYXRoPXRzY29uZmlnLmpzb24mYmFzZVBhdGg9JmFzc2V0UHJlZml4PSZuZXh0Q29uZmlnT3V0cHV0PSZwcmVmZXJyZWRSZWdpb249Jm1pZGRsZXdhcmVDb25maWc9ZTMwJTNEISIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUErRjtBQUN2QztBQUNxQjtBQUM0RTtBQUN6SjtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IseUdBQW1CO0FBQzNDO0FBQ0EsY0FBYyxrRUFBUztBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsWUFBWTtBQUNaLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSxRQUFRLHNEQUFzRDtBQUM5RDtBQUNBLFdBQVcsNEVBQVc7QUFDdEI7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUMwRjs7QUFFMUYiLCJzb3VyY2VzIjpbIiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBcHBSb3V0ZVJvdXRlTW9kdWxlIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvcm91dGUtbW9kdWxlcy9hcHAtcm91dGUvbW9kdWxlLmNvbXBpbGVkXCI7XG5pbXBvcnQgeyBSb3V0ZUtpbmQgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9yb3V0ZS1raW5kXCI7XG5pbXBvcnQgeyBwYXRjaEZldGNoIGFzIF9wYXRjaEZldGNoIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvbGliL3BhdGNoLWZldGNoXCI7XG5pbXBvcnQgKiBhcyB1c2VybGFuZCBmcm9tIFwiQzpcXFxcVXNlcnNcXFxcR2FicmllbCBUb3JyZXNcXFxcRGVza3RvcFxcXFxNZXVzIENsaWVudGVzXFxcXEVyaWNrXFxcXMOBcmVhIGRlIE1lbWJyb3NcXFxcYXJlYV9kZV9tZW1icm9zXFxcXGFwcFxcXFxhcGlcXFxcY3Vyc29zXFxcXFtpZF1cXFxccm91dGUudHNcIjtcbi8vIFdlIGluamVjdCB0aGUgbmV4dENvbmZpZ091dHB1dCBoZXJlIHNvIHRoYXQgd2UgY2FuIHVzZSB0aGVtIGluIHRoZSByb3V0ZVxuLy8gbW9kdWxlLlxuY29uc3QgbmV4dENvbmZpZ091dHB1dCA9IFwiXCJcbmNvbnN0IHJvdXRlTW9kdWxlID0gbmV3IEFwcFJvdXRlUm91dGVNb2R1bGUoe1xuICAgIGRlZmluaXRpb246IHtcbiAgICAgICAga2luZDogUm91dGVLaW5kLkFQUF9ST1VURSxcbiAgICAgICAgcGFnZTogXCIvYXBpL2N1cnNvcy9baWRdL3JvdXRlXCIsXG4gICAgICAgIHBhdGhuYW1lOiBcIi9hcGkvY3Vyc29zL1tpZF1cIixcbiAgICAgICAgZmlsZW5hbWU6IFwicm91dGVcIixcbiAgICAgICAgYnVuZGxlUGF0aDogXCJhcHAvYXBpL2N1cnNvcy9baWRdL3JvdXRlXCJcbiAgICB9LFxuICAgIHJlc29sdmVkUGFnZVBhdGg6IFwiQzpcXFxcVXNlcnNcXFxcR2FicmllbCBUb3JyZXNcXFxcRGVza3RvcFxcXFxNZXVzIENsaWVudGVzXFxcXEVyaWNrXFxcXMOBcmVhIGRlIE1lbWJyb3NcXFxcYXJlYV9kZV9tZW1icm9zXFxcXGFwcFxcXFxhcGlcXFxcY3Vyc29zXFxcXFtpZF1cXFxccm91dGUudHNcIixcbiAgICBuZXh0Q29uZmlnT3V0cHV0LFxuICAgIHVzZXJsYW5kXG59KTtcbi8vIFB1bGwgb3V0IHRoZSBleHBvcnRzIHRoYXQgd2UgbmVlZCB0byBleHBvc2UgZnJvbSB0aGUgbW9kdWxlLiBUaGlzIHNob3VsZFxuLy8gYmUgZWxpbWluYXRlZCB3aGVuIHdlJ3ZlIG1vdmVkIHRoZSBvdGhlciByb3V0ZXMgdG8gdGhlIG5ldyBmb3JtYXQuIFRoZXNlXG4vLyBhcmUgdXNlZCB0byBob29rIGludG8gdGhlIHJvdXRlLlxuY29uc3QgeyB3b3JrQXN5bmNTdG9yYWdlLCB3b3JrVW5pdEFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MgfSA9IHJvdXRlTW9kdWxlO1xuZnVuY3Rpb24gcGF0Y2hGZXRjaCgpIHtcbiAgICByZXR1cm4gX3BhdGNoRmV0Y2goe1xuICAgICAgICB3b3JrQXN5bmNTdG9yYWdlLFxuICAgICAgICB3b3JrVW5pdEFzeW5jU3RvcmFnZVxuICAgIH0pO1xufVxuZXhwb3J0IHsgcm91dGVNb2R1bGUsIHdvcmtBc3luY1N0b3JhZ2UsIHdvcmtVbml0QXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcywgcGF0Y2hGZXRjaCwgIH07XG5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWFwcC1yb3V0ZS5qcy5tYXAiXSwibmFtZXMiOltdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fcursos%2F%5Bid%5D%2Froute&page=%2Fapi%2Fcursos%2F%5Bid%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fcursos%2F%5Bid%5D%2Froute.ts&appDir=C%3A%5CUsers%5CGabriel%20Torres%5CDesktop%5CMeus%20Clientes%5CErick%5C%C3%81rea%20de%20Membros%5Carea_de_membros%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CGabriel%20Torres%5CDesktop%5CMeus%20Clientes%5CErick%5C%C3%81rea%20de%20Membros%5Carea_de_membros&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

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
var __webpack_require__ = require("../../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/semver","vendor-chunks/jsonwebtoken","vendor-chunks/jws","vendor-chunks/ecdsa-sig-formatter","vendor-chunks/safe-buffer","vendor-chunks/ms","vendor-chunks/lodash.once","vendor-chunks/lodash.isstring","vendor-chunks/lodash.isplainobject","vendor-chunks/lodash.isnumber","vendor-chunks/lodash.isinteger","vendor-chunks/lodash.isboolean","vendor-chunks/lodash.includes","vendor-chunks/jwa","vendor-chunks/buffer-equal-constant-time"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fcursos%2F%5Bid%5D%2Froute&page=%2Fapi%2Fcursos%2F%5Bid%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fcursos%2F%5Bid%5D%2Froute.ts&appDir=C%3A%5CUsers%5CGabriel%20Torres%5CDesktop%5CMeus%20Clientes%5CErick%5C%C3%81rea%20de%20Membros%5Carea_de_membros%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CGabriel%20Torres%5CDesktop%5CMeus%20Clientes%5CErick%5C%C3%81rea%20de%20Membros%5Carea_de_membros&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();