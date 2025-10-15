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
exports.id = "app/api/admin/alunos/route";
exports.ids = ["app/api/admin/alunos/route"];
exports.modules = {

/***/ "(rsc)/./app/api/admin/alunos/route.ts":
/*!***************************************!*\
  !*** ./app/api/admin/alunos/route.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ GET)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var _lib_prisma__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/lib/prisma */ \"(rsc)/./lib/prisma.ts\");\n/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! jsonwebtoken */ \"(rsc)/./node_modules/jsonwebtoken/index.js\");\n/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(jsonwebtoken__WEBPACK_IMPORTED_MODULE_2__);\n\n\n\nasync function GET(req) {\n    try {\n        const token = req.cookies.get(\"token\")?.value;\n        if (!token) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: \"Token de autenticacao nao encontrado\"\n            }, {\n                status: 401\n            });\n        }\n        let userId;\n        try {\n            const decoded = jsonwebtoken__WEBPACK_IMPORTED_MODULE_2___default().verify(token, process.env.JWT_SECRET);\n            userId = decoded.sub;\n        } catch  {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: \"Token invalido\"\n            }, {\n                status: 401\n            });\n        }\n        const user = await _lib_prisma__WEBPACK_IMPORTED_MODULE_1__[\"default\"].user.findUnique({\n            where: {\n                id: userId\n            },\n            select: {\n                role: true\n            }\n        });\n        if (!user || user.role !== \"admin\") {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: \"Acesso negado. Apenas administradores podem acessar.\"\n            }, {\n                status: 403\n            });\n        }\n        const alunos = await _lib_prisma__WEBPACK_IMPORTED_MODULE_1__[\"default\"].user.findMany({\n            where: {\n                role: \"student\"\n            },\n            include: {\n                userInfo: true,\n                usuarioCursos: {\n                    include: {\n                        curso: {\n                            select: {\n                                id: true,\n                                titulo: true,\n                                cursoModulos: {\n                                    select: {\n                                        modulo: {\n                                            select: {\n                                                aulaModulos: {\n                                                    select: {\n                                                        aulaId: true\n                                                    }\n                                                }\n                                            }\n                                        }\n                                    }\n                                }\n                            }\n                        },\n                        usuarioCursoAulas: {\n                            select: {\n                                aulaId: true,\n                                assistido: true\n                            }\n                        }\n                    }\n                }\n            },\n            orderBy: {\n                createdAt: \"desc\"\n            }\n        });\n        const data = alunos.map((aluno)=>{\n            const cursosDetalhados = aluno.usuarioCursos.map((uc)=>{\n                const aulaIds = new Set();\n                uc.curso?.cursoModulos.forEach((cm)=>{\n                    cm.modulo?.aulaModulos?.forEach((am)=>{\n                        if (am.aulaId) {\n                            aulaIds.add(am.aulaId);\n                        }\n                    });\n                });\n                const totalAulasCurso = aulaIds.size;\n                const aulasAssistidas = uc.usuarioCursoAulas.filter((aula)=>aula.assistido).length;\n                const progressoCalculado = totalAulasCurso > 0 ? Math.round(Math.min(aulasAssistidas, totalAulasCurso) / totalAulasCurso * 100) : Math.max(0, Math.min(100, uc.progresso ?? 0));\n                return {\n                    id: uc.cursoId,\n                    titulo: uc.curso?.titulo ?? \"\",\n                    status: uc.status,\n                    progresso: progressoCalculado,\n                    aulasAssistidas,\n                    totalAulas: totalAulasCurso,\n                    dataInicio: uc.dataInicio,\n                    dataCompra: uc.dataCompra\n                };\n            });\n            const totalCursos = cursosDetalhados.length;\n            const totalConcluidos = cursosDetalhados.filter((curso)=>curso.status === \"concluido\").length;\n            const progressoMedio = totalCursos > 0 ? Math.round(cursosDetalhados.reduce((acc, curso)=>acc + curso.progresso, 0) / totalCursos) : 0;\n            return {\n                id: aluno.id,\n                nome: aluno.name,\n                email: aluno.email,\n                telefone: aluno.phone,\n                criadoEm: aluno.createdAt,\n                atualizadoEm: aluno.updatedAt,\n                totalCursos,\n                totalConcluidos,\n                progressoMedio,\n                info: aluno.userInfo ? {\n                    bio: aluno.userInfo.bio,\n                    avatar: aluno.userInfo.avatar,\n                    cidade: aluno.userInfo.cidade,\n                    estado: aluno.userInfo.estado,\n                    pais: aluno.userInfo.pais\n                } : null,\n                cursos: cursosDetalhados\n            };\n        });\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            alunos: data\n        });\n    } catch (error) {\n        console.error(\"Erro ao buscar alunos:\", error);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: \"Erro interno ao buscar alunos\"\n        }, {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFRN0UsS0FBSyxDQUFDLDBCQUEwQkE7UUFDeEMsT0FBT1YscURBQVlBLENBQUNTLElBQUksQ0FDdEI7WUFBRUMsT0FBTztRQUFnQyxHQUN6QztZQUFFQyxRQUFRO1FBQUk7SUFFbEI7QUFDRiIsInNvdXJjZXMiOlsiQzpcXFVzZXJzXFxHYWJyaWVsIFRvcnJlc1xcRGVza3RvcFxcTWV1cyBDbGllbnRlc1xcRXJpY2tcXMOBcmVhIGRlIE1lbWJyb3NcXGFyZWFfZGVfbWVtYnJvc1xcYXBwXFxhcGlcXGFkbWluXFxhbHVub3NcXHJvdXRlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5leHRSZXF1ZXN0LCBOZXh0UmVzcG9uc2UgfSBmcm9tIFwibmV4dC9zZXJ2ZXJcIjtcbmltcG9ydCBwcmlzbWEgZnJvbSBcIkAvbGliL3ByaXNtYVwiO1xuaW1wb3J0IGp3dCBmcm9tIFwianNvbndlYnRva2VuXCI7XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBHRVQocmVxOiBOZXh0UmVxdWVzdCkge1xuICB0cnkge1xuICAgIGNvbnN0IHRva2VuID0gcmVxLmNvb2tpZXMuZ2V0KFwidG9rZW5cIik/LnZhbHVlO1xuXG4gICAgaWYgKCF0b2tlbikge1xuICAgICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKFxuICAgICAgICB7IGVycm9yOiBcIlRva2VuIGRlIGF1dGVudGljYWNhbyBuYW8gZW5jb250cmFkb1wiIH0sXG4gICAgICAgIHsgc3RhdHVzOiA0MDEgfVxuICAgICAgKTtcbiAgICB9XG5cbiAgICBsZXQgdXNlcklkOiBzdHJpbmc7XG5cbiAgICB0cnkge1xuICAgICAgY29uc3QgZGVjb2RlZCA9IGp3dC52ZXJpZnkodG9rZW4sIHByb2Nlc3MuZW52LkpXVF9TRUNSRVQhKSBhcyB7XG4gICAgICAgIHN1Yjogc3RyaW5nO1xuICAgICAgfTtcblxuICAgICAgdXNlcklkID0gZGVjb2RlZC5zdWI7XG4gICAgfSBjYXRjaCB7XG4gICAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyBlcnJvcjogXCJUb2tlbiBpbnZhbGlkb1wiIH0sIHsgc3RhdHVzOiA0MDEgfSk7XG4gICAgfVxuXG4gICAgY29uc3QgdXNlciA9IGF3YWl0IHByaXNtYS51c2VyLmZpbmRVbmlxdWUoe1xuICAgICAgd2hlcmU6IHsgaWQ6IHVzZXJJZCB9LFxuICAgICAgc2VsZWN0OiB7IHJvbGU6IHRydWUgfSxcbiAgICB9KTtcblxuICAgIGlmICghdXNlciB8fCB1c2VyLnJvbGUgIT09IFwiYWRtaW5cIikge1xuICAgICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKFxuICAgICAgICB7IGVycm9yOiBcIkFjZXNzbyBuZWdhZG8uIEFwZW5hcyBhZG1pbmlzdHJhZG9yZXMgcG9kZW0gYWNlc3Nhci5cIiB9LFxuICAgICAgICB7IHN0YXR1czogNDAzIH1cbiAgICAgICk7XG4gICAgfVxuXG4gICAgY29uc3QgYWx1bm9zID0gYXdhaXQgcHJpc21hLnVzZXIuZmluZE1hbnkoe1xuICAgICAgd2hlcmU6IHsgcm9sZTogXCJzdHVkZW50XCIgfSxcbiAgICAgIGluY2x1ZGU6IHtcbiAgICAgICAgdXNlckluZm86IHRydWUsXG4gICAgICAgIHVzdWFyaW9DdXJzb3M6IHtcbiAgICAgICAgICBpbmNsdWRlOiB7XG4gICAgICAgICAgICBjdXJzbzoge1xuICAgICAgICAgICAgICBzZWxlY3Q6IHtcbiAgICAgICAgICAgICAgICBpZDogdHJ1ZSxcbiAgICAgICAgICAgICAgICB0aXR1bG86IHRydWUsXG4gICAgICAgICAgICAgICAgY3Vyc29Nb2R1bG9zOiB7XG4gICAgICAgICAgICAgICAgICBzZWxlY3Q6IHtcbiAgICAgICAgICAgICAgICAgICAgbW9kdWxvOiB7XG4gICAgICAgICAgICAgICAgICAgICAgc2VsZWN0OiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBhdWxhTW9kdWxvczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3Q6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdWxhSWQ6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdXN1YXJpb0N1cnNvQXVsYXM6IHtcbiAgICAgICAgICAgICAgc2VsZWN0OiB7XG4gICAgICAgICAgICAgICAgYXVsYUlkOiB0cnVlLFxuICAgICAgICAgICAgICAgIGFzc2lzdGlkbzogdHJ1ZSxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgICBvcmRlckJ5OiB7IGNyZWF0ZWRBdDogXCJkZXNjXCIgfSxcbiAgICB9KTtcblxuICAgIGNvbnN0IGRhdGEgPSBhbHVub3MubWFwKChhbHVubykgPT4ge1xuICAgICAgY29uc3QgY3Vyc29zRGV0YWxoYWRvcyA9IGFsdW5vLnVzdWFyaW9DdXJzb3MubWFwKCh1YykgPT4ge1xuICAgICAgICBjb25zdCBhdWxhSWRzID0gbmV3IFNldDxzdHJpbmc+KCk7XG5cbiAgICAgICAgdWMuY3Vyc28/LmN1cnNvTW9kdWxvcy5mb3JFYWNoKChjbSkgPT4ge1xuICAgICAgICAgIGNtLm1vZHVsbz8uYXVsYU1vZHVsb3M/LmZvckVhY2goKGFtKSA9PiB7XG4gICAgICAgICAgICBpZiAoYW0uYXVsYUlkKSB7XG4gICAgICAgICAgICAgIGF1bGFJZHMuYWRkKGFtLmF1bGFJZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGNvbnN0IHRvdGFsQXVsYXNDdXJzbyA9IGF1bGFJZHMuc2l6ZTtcbiAgICAgICAgY29uc3QgYXVsYXNBc3Npc3RpZGFzID0gdWMudXN1YXJpb0N1cnNvQXVsYXMuZmlsdGVyKFxuICAgICAgICAgIChhdWxhKSA9PiBhdWxhLmFzc2lzdGlkb1xuICAgICAgICApLmxlbmd0aDtcblxuICAgICAgICBjb25zdCBwcm9ncmVzc29DYWxjdWxhZG8gPVxuICAgICAgICAgIHRvdGFsQXVsYXNDdXJzbyA+IDBcbiAgICAgICAgICAgID8gTWF0aC5yb3VuZChcbiAgICAgICAgICAgICAgICAoTWF0aC5taW4oYXVsYXNBc3Npc3RpZGFzLCB0b3RhbEF1bGFzQ3Vyc28pIC8gdG90YWxBdWxhc0N1cnNvKSAqXG4gICAgICAgICAgICAgICAgICAxMDBcbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgOiBNYXRoLm1heCgwLCBNYXRoLm1pbigxMDAsIHVjLnByb2dyZXNzbyA/PyAwKSk7XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBpZDogdWMuY3Vyc29JZCxcbiAgICAgICAgICB0aXR1bG86IHVjLmN1cnNvPy50aXR1bG8gPz8gXCJcIixcbiAgICAgICAgICBzdGF0dXM6IHVjLnN0YXR1cyxcbiAgICAgICAgICBwcm9ncmVzc286IHByb2dyZXNzb0NhbGN1bGFkbyxcbiAgICAgICAgICBhdWxhc0Fzc2lzdGlkYXMsXG4gICAgICAgICAgdG90YWxBdWxhczogdG90YWxBdWxhc0N1cnNvLFxuICAgICAgICAgIGRhdGFJbmljaW86IHVjLmRhdGFJbmljaW8sXG4gICAgICAgICAgZGF0YUNvbXByYTogdWMuZGF0YUNvbXByYSxcbiAgICAgICAgfTtcbiAgICAgIH0pO1xuXG4gICAgICBjb25zdCB0b3RhbEN1cnNvcyA9IGN1cnNvc0RldGFsaGFkb3MubGVuZ3RoO1xuICAgICAgY29uc3QgdG90YWxDb25jbHVpZG9zID0gY3Vyc29zRGV0YWxoYWRvcy5maWx0ZXIoXG4gICAgICAgIChjdXJzbykgPT4gY3Vyc28uc3RhdHVzID09PSBcImNvbmNsdWlkb1wiXG4gICAgICApLmxlbmd0aDtcbiAgICAgIGNvbnN0IHByb2dyZXNzb01lZGlvID1cbiAgICAgICAgdG90YWxDdXJzb3MgPiAwXG4gICAgICAgICAgPyBNYXRoLnJvdW5kKFxuICAgICAgICAgICAgICBjdXJzb3NEZXRhbGhhZG9zLnJlZHVjZShcbiAgICAgICAgICAgICAgICAoYWNjLCBjdXJzbykgPT4gYWNjICsgY3Vyc28ucHJvZ3Jlc3NvLFxuICAgICAgICAgICAgICAgIDBcbiAgICAgICAgICAgICAgKSAvIHRvdGFsQ3Vyc29zXG4gICAgICAgICAgICApXG4gICAgICAgICAgOiAwO1xuXG4gICAgICByZXR1cm4ge1xuICAgICAgICBpZDogYWx1bm8uaWQsXG4gICAgICAgIG5vbWU6IGFsdW5vLm5hbWUsXG4gICAgICAgIGVtYWlsOiBhbHVuby5lbWFpbCxcbiAgICAgICAgdGVsZWZvbmU6IGFsdW5vLnBob25lLFxuICAgICAgICBjcmlhZG9FbTogYWx1bm8uY3JlYXRlZEF0LFxuICAgICAgICBhdHVhbGl6YWRvRW06IGFsdW5vLnVwZGF0ZWRBdCxcbiAgICAgICAgdG90YWxDdXJzb3MsXG4gICAgICAgIHRvdGFsQ29uY2x1aWRvcyxcbiAgICAgICAgcHJvZ3Jlc3NvTWVkaW8sXG4gICAgICAgIGluZm86IGFsdW5vLnVzZXJJbmZvXG4gICAgICAgICAgPyB7XG4gICAgICAgICAgICAgIGJpbzogYWx1bm8udXNlckluZm8uYmlvLFxuICAgICAgICAgICAgICBhdmF0YXI6IGFsdW5vLnVzZXJJbmZvLmF2YXRhcixcbiAgICAgICAgICAgICAgY2lkYWRlOiBhbHVuby51c2VySW5mby5jaWRhZGUsXG4gICAgICAgICAgICAgIGVzdGFkbzogYWx1bm8udXNlckluZm8uZXN0YWRvLFxuICAgICAgICAgICAgICBwYWlzOiBhbHVuby51c2VySW5mby5wYWlzLFxuICAgICAgICAgICAgfVxuICAgICAgICAgIDogbnVsbCxcbiAgICAgICAgY3Vyc29zOiBjdXJzb3NEZXRhbGhhZG9zLFxuICAgICAgfTtcbiAgICB9KTtcblxuICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7IGFsdW5vczogZGF0YSB9KTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb25zb2xlLmVycm9yKFwiRXJybyBhbyBidXNjYXIgYWx1bm9zOlwiLCBlcnJvcik7XG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKFxuICAgICAgeyBlcnJvcjogXCJFcnJvIGludGVybm8gYW8gYnVzY2FyIGFsdW5vc1wiIH0sXG4gICAgICB7IHN0YXR1czogNTAwIH1cbiAgICApO1xuICB9XG59XG4iXSwibmFtZXMiOlsiTmV4dFJlc3BvbnNlIiwicHJpc21hIiwiand0IiwiR0VUIiwicmVxIiwidG9rZW4iLCJjb29raWVzIiwiZ2V0IiwidmFsdWUiLCJqc29uIiwiZXJyb3IiLCJzdGF0dXMiLCJ1c2VySWQiLCJkZWNvZGVkIiwidmVyaWZ5IiwicHJvY2VzcyIsImVudiIsIkpXVF9TRUNSRVQiLCJzdWIiLCJ1c2VyIiwiZmluZFVuaXF1ZSIsIndoZXJlIiwiaWQiLCJzZWxlY3QiLCJyb2xlIiwiYWx1bm9zIiwiZmluZE1hbnkiLCJpbmNsdWRlIiwidXNlckluZm8iLCJ1c3VhcmlvQ3Vyc29zIiwiY3Vyc28iLCJ0aXR1bG8iLCJjdXJzb01vZHVsb3MiLCJtb2R1bG8iLCJhdWxhTW9kdWxvcyIsImF1bGFJZCIsInVzdWFyaW9DdXJzb0F1bGFzIiwiYXNzaXN0aWRvIiwib3JkZXJCeSIsImNyZWF0ZWRBdCIsImRhdGEiLCJtYXAiLCJhbHVubyIsImN1cnNvc0RldGFsaGFkb3MiLCJ1YyIsImF1bGFJZHMiLCJTZXQiLCJmb3JFYWNoIiwiY20iLCJhbSIsImFkZCIsInRvdGFsQXVsYXNDdXJzbyIsInNpemUiLCJhdWxhc0Fzc2lzdGlkYXMiLCJmaWx0ZXIiLCJhdWxhIiwibGVuZ3RoIiwicHJvZ3Jlc3NvQ2FsY3VsYWRvIiwiTWF0aCIsInJvdW5kIiwibWluIiwibWF4IiwicHJvZ3Jlc3NvIiwiY3Vyc29JZCIsInRvdGFsQXVsYXMiLCJkYXRhSW5pY2lvIiwiZGF0YUNvbXByYSIsInRvdGFsQ3Vyc29zIiwidG90YWxDb25jbHVpZG9zIiwicHJvZ3Jlc3NvTWVkaW8iLCJyZWR1Y2UiLCJhY2MiLCJub21lIiwibmFtZSIsImVtYWlsIiwidGVsZWZvbmUiLCJwaG9uZSIsImNyaWFkb0VtIiwiYXR1YWxpemFkb0VtIiwidXBkYXRlZEF0IiwiaW5mbyIsImJpbyIsImF2YXRhciIsImNpZGFkZSIsImVzdGFkbyIsInBhaXMiLCJjdXJzb3MiLCJjb25zb2xlIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./app/api/admin/alunos/route.ts\n");

/***/ }),

/***/ "(rsc)/./lib/prisma.ts":
/*!***********************!*\
  !*** ./lib/prisma.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__),\n/* harmony export */   prisma: () => (/* binding */ prisma)\n/* harmony export */ });\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @prisma/client */ \"@prisma/client\");\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_prisma_client__WEBPACK_IMPORTED_MODULE_0__);\n\nconst globalForPrisma = globalThis;\nconst prisma = globalForPrisma.prisma || new _prisma_client__WEBPACK_IMPORTED_MODULE_0__.PrismaClient({\n    log: [\n        \"query\",\n        \"error\",\n        \"warn\"\n    ]\n});\nif (true) globalForPrisma.prisma = prisma;\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (prisma);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvcHJpc21hLnRzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBOEM7QUFFOUMsTUFBTUMsa0JBQWtCQztBQUVqQixNQUFNQyxTQUNYRixnQkFBZ0JFLE1BQU0sSUFDdEIsSUFBSUgsd0RBQVlBLENBQUM7SUFDZkksS0FBSztRQUFDO1FBQVM7UUFBUztLQUFPO0FBQ2pDLEdBQUc7QUFFTCxJQUFJQyxJQUFxQyxFQUFFSixnQkFBZ0JFLE1BQU0sR0FBR0E7QUFFcEUsaUVBQWVBLE1BQU1BLEVBQUMiLCJzb3VyY2VzIjpbIkM6XFxVc2Vyc1xcR2FicmllbCBUb3JyZXNcXERlc2t0b3BcXE1ldXMgQ2xpZW50ZXNcXEVyaWNrXFzDgXJlYSBkZSBNZW1icm9zXFxhcmVhX2RlX21lbWJyb3NcXGxpYlxccHJpc21hLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFByaXNtYUNsaWVudCB9IGZyb20gXCJAcHJpc21hL2NsaWVudFwiO1xyXG5cclxuY29uc3QgZ2xvYmFsRm9yUHJpc21hID0gZ2xvYmFsVGhpcyBhcyB1bmtub3duIGFzIHsgcHJpc21hOiBQcmlzbWFDbGllbnQgfTtcclxuXHJcbmV4cG9ydCBjb25zdCBwcmlzbWEgPVxyXG4gIGdsb2JhbEZvclByaXNtYS5wcmlzbWEgfHxcclxuICBuZXcgUHJpc21hQ2xpZW50KHtcclxuICAgIGxvZzogW1wicXVlcnlcIiwgXCJlcnJvclwiLCBcIndhcm5cIl0sXHJcbiAgfSk7XHJcblxyXG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSBnbG9iYWxGb3JQcmlzbWEucHJpc21hID0gcHJpc21hO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgcHJpc21hO1xyXG4iXSwibmFtZXMiOlsiUHJpc21hQ2xpZW50IiwiZ2xvYmFsRm9yUHJpc21hIiwiZ2xvYmFsVGhpcyIsInByaXNtYSIsImxvZyIsInByb2Nlc3MiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./lib/prisma.ts\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fadmin%2Falunos%2Froute&page=%2Fapi%2Fadmin%2Falunos%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fadmin%2Falunos%2Froute.ts&appDir=C%3A%5CUsers%5CGabriel%20Torres%5CDesktop%5CMeus%20Clientes%5CErick%5C%C3%81rea%20de%20Membros%5Carea_de_membros%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CGabriel%20Torres%5CDesktop%5CMeus%20Clientes%5CErick%5C%C3%81rea%20de%20Membros%5Carea_de_membros&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fadmin%2Falunos%2Froute&page=%2Fapi%2Fadmin%2Falunos%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fadmin%2Falunos%2Froute.ts&appDir=C%3A%5CUsers%5CGabriel%20Torres%5CDesktop%5CMeus%20Clientes%5CErick%5C%C3%81rea%20de%20Membros%5Carea_de_membros%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CGabriel%20Torres%5CDesktop%5CMeus%20Clientes%5CErick%5C%C3%81rea%20de%20Membros%5Carea_de_membros&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var C_Users_Gabriel_Torres_Desktop_Meus_Clientes_Erick_rea_de_Membros_area_de_membros_app_api_admin_alunos_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/admin/alunos/route.ts */ \"(rsc)/./app/api/admin/alunos/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/admin/alunos/route\",\n        pathname: \"/api/admin/alunos\",\n        filename: \"route\",\n        bundlePath: \"app/api/admin/alunos/route\"\n    },\n    resolvedPagePath: \"C:\\\\Users\\\\Gabriel Torres\\\\Desktop\\\\Meus Clientes\\\\Erick\\\\Área de Membros\\\\area_de_membros\\\\app\\\\api\\\\admin\\\\alunos\\\\route.ts\",\n    nextConfigOutput,\n    userland: C_Users_Gabriel_Torres_Desktop_Meus_Clientes_Erick_rea_de_Membros_area_de_membros_app_api_admin_alunos_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZhcGklMkZhZG1pbiUyRmFsdW5vcyUyRnJvdXRlJnBhZ2U9JTJGYXBpJTJGYWRtaW4lMkZhbHVub3MlMkZyb3V0ZSZhcHBQYXRocz0mcGFnZVBhdGg9cHJpdmF0ZS1uZXh0LWFwcC1kaXIlMkZhcGklMkZhZG1pbiUyRmFsdW5vcyUyRnJvdXRlLnRzJmFwcERpcj1DJTNBJTVDVXNlcnMlNUNHYWJyaWVsJTIwVG9ycmVzJTVDRGVza3RvcCU1Q01ldXMlMjBDbGllbnRlcyU1Q0VyaWNrJTVDJUMzJTgxcmVhJTIwZGUlMjBNZW1icm9zJTVDYXJlYV9kZV9tZW1icm9zJTVDYXBwJnBhZ2VFeHRlbnNpb25zPXRzeCZwYWdlRXh0ZW5zaW9ucz10cyZwYWdlRXh0ZW5zaW9ucz1qc3gmcGFnZUV4dGVuc2lvbnM9anMmcm9vdERpcj1DJTNBJTVDVXNlcnMlNUNHYWJyaWVsJTIwVG9ycmVzJTVDRGVza3RvcCU1Q01ldXMlMjBDbGllbnRlcyU1Q0VyaWNrJTVDJUMzJTgxcmVhJTIwZGUlMjBNZW1icm9zJTVDYXJlYV9kZV9tZW1icm9zJmlzRGV2PXRydWUmdHNjb25maWdQYXRoPXRzY29uZmlnLmpzb24mYmFzZVBhdGg9JmFzc2V0UHJlZml4PSZuZXh0Q29uZmlnT3V0cHV0PSZwcmVmZXJyZWRSZWdpb249Jm1pZGRsZXdhcmVDb25maWc9ZTMwJTNEISIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUErRjtBQUN2QztBQUNxQjtBQUM2RTtBQUMxSjtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IseUdBQW1CO0FBQzNDO0FBQ0EsY0FBYyxrRUFBUztBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsWUFBWTtBQUNaLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSxRQUFRLHNEQUFzRDtBQUM5RDtBQUNBLFdBQVcsNEVBQVc7QUFDdEI7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUMwRjs7QUFFMUYiLCJzb3VyY2VzIjpbIiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBcHBSb3V0ZVJvdXRlTW9kdWxlIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvcm91dGUtbW9kdWxlcy9hcHAtcm91dGUvbW9kdWxlLmNvbXBpbGVkXCI7XG5pbXBvcnQgeyBSb3V0ZUtpbmQgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9yb3V0ZS1raW5kXCI7XG5pbXBvcnQgeyBwYXRjaEZldGNoIGFzIF9wYXRjaEZldGNoIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvbGliL3BhdGNoLWZldGNoXCI7XG5pbXBvcnQgKiBhcyB1c2VybGFuZCBmcm9tIFwiQzpcXFxcVXNlcnNcXFxcR2FicmllbCBUb3JyZXNcXFxcRGVza3RvcFxcXFxNZXVzIENsaWVudGVzXFxcXEVyaWNrXFxcXMOBcmVhIGRlIE1lbWJyb3NcXFxcYXJlYV9kZV9tZW1icm9zXFxcXGFwcFxcXFxhcGlcXFxcYWRtaW5cXFxcYWx1bm9zXFxcXHJvdXRlLnRzXCI7XG4vLyBXZSBpbmplY3QgdGhlIG5leHRDb25maWdPdXRwdXQgaGVyZSBzbyB0aGF0IHdlIGNhbiB1c2UgdGhlbSBpbiB0aGUgcm91dGVcbi8vIG1vZHVsZS5cbmNvbnN0IG5leHRDb25maWdPdXRwdXQgPSBcIlwiXG5jb25zdCByb3V0ZU1vZHVsZSA9IG5ldyBBcHBSb3V0ZVJvdXRlTW9kdWxlKHtcbiAgICBkZWZpbml0aW9uOiB7XG4gICAgICAgIGtpbmQ6IFJvdXRlS2luZC5BUFBfUk9VVEUsXG4gICAgICAgIHBhZ2U6IFwiL2FwaS9hZG1pbi9hbHVub3Mvcm91dGVcIixcbiAgICAgICAgcGF0aG5hbWU6IFwiL2FwaS9hZG1pbi9hbHVub3NcIixcbiAgICAgICAgZmlsZW5hbWU6IFwicm91dGVcIixcbiAgICAgICAgYnVuZGxlUGF0aDogXCJhcHAvYXBpL2FkbWluL2FsdW5vcy9yb3V0ZVwiXG4gICAgfSxcbiAgICByZXNvbHZlZFBhZ2VQYXRoOiBcIkM6XFxcXFVzZXJzXFxcXEdhYnJpZWwgVG9ycmVzXFxcXERlc2t0b3BcXFxcTWV1cyBDbGllbnRlc1xcXFxFcmlja1xcXFzDgXJlYSBkZSBNZW1icm9zXFxcXGFyZWFfZGVfbWVtYnJvc1xcXFxhcHBcXFxcYXBpXFxcXGFkbWluXFxcXGFsdW5vc1xcXFxyb3V0ZS50c1wiLFxuICAgIG5leHRDb25maWdPdXRwdXQsXG4gICAgdXNlcmxhbmRcbn0pO1xuLy8gUHVsbCBvdXQgdGhlIGV4cG9ydHMgdGhhdCB3ZSBuZWVkIHRvIGV4cG9zZSBmcm9tIHRoZSBtb2R1bGUuIFRoaXMgc2hvdWxkXG4vLyBiZSBlbGltaW5hdGVkIHdoZW4gd2UndmUgbW92ZWQgdGhlIG90aGVyIHJvdXRlcyB0byB0aGUgbmV3IGZvcm1hdC4gVGhlc2Vcbi8vIGFyZSB1c2VkIHRvIGhvb2sgaW50byB0aGUgcm91dGUuXG5jb25zdCB7IHdvcmtBc3luY1N0b3JhZ2UsIHdvcmtVbml0QXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcyB9ID0gcm91dGVNb2R1bGU7XG5mdW5jdGlvbiBwYXRjaEZldGNoKCkge1xuICAgIHJldHVybiBfcGF0Y2hGZXRjaCh7XG4gICAgICAgIHdvcmtBc3luY1N0b3JhZ2UsXG4gICAgICAgIHdvcmtVbml0QXN5bmNTdG9yYWdlXG4gICAgfSk7XG59XG5leHBvcnQgeyByb3V0ZU1vZHVsZSwgd29ya0FzeW5jU3RvcmFnZSwgd29ya1VuaXRBc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzLCBwYXRjaEZldGNoLCAgfTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YXBwLXJvdXRlLmpzLm1hcCJdLCJuYW1lcyI6W10sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fadmin%2Falunos%2Froute&page=%2Fapi%2Fadmin%2Falunos%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fadmin%2Falunos%2Froute.ts&appDir=C%3A%5CUsers%5CGabriel%20Torres%5CDesktop%5CMeus%20Clientes%5CErick%5C%C3%81rea%20de%20Membros%5Carea_de_membros%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CGabriel%20Torres%5CDesktop%5CMeus%20Clientes%5CErick%5C%C3%81rea%20de%20Membros%5Carea_de_membros&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

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
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/semver","vendor-chunks/jsonwebtoken","vendor-chunks/jws","vendor-chunks/ecdsa-sig-formatter","vendor-chunks/safe-buffer","vendor-chunks/ms","vendor-chunks/lodash.once","vendor-chunks/lodash.isstring","vendor-chunks/lodash.isplainobject","vendor-chunks/lodash.isnumber","vendor-chunks/lodash.isinteger","vendor-chunks/lodash.isboolean","vendor-chunks/lodash.includes","vendor-chunks/jwa","vendor-chunks/buffer-equal-constant-time"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fadmin%2Falunos%2Froute&page=%2Fapi%2Fadmin%2Falunos%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fadmin%2Falunos%2Froute.ts&appDir=C%3A%5CUsers%5CGabriel%20Torres%5CDesktop%5CMeus%20Clientes%5CErick%5C%C3%81rea%20de%20Membros%5Carea_de_membros%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CGabriel%20Torres%5CDesktop%5CMeus%20Clientes%5CErick%5C%C3%81rea%20de%20Membros%5Carea_de_membros&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();