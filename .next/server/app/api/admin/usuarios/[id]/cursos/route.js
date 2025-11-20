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
exports.id = "app/api/admin/usuarios/[id]/cursos/route";
exports.ids = ["app/api/admin/usuarios/[id]/cursos/route"];
exports.modules = {

/***/ "(rsc)/./app/api/admin/usuarios/[id]/cursos/route.ts":
/*!*****************************************************!*\
  !*** ./app/api/admin/usuarios/[id]/cursos/route.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   PATCH: () => (/* binding */ PATCH)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var _lib_prisma__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/lib/prisma */ \"(rsc)/./lib/prisma.ts\");\n/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! jsonwebtoken */ \"(rsc)/./node_modules/jsonwebtoken/index.js\");\n/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(jsonwebtoken__WEBPACK_IMPORTED_MODULE_2__);\n\n\n\nasync function ensureAdmin(req) {\n    const token = req.cookies.get(\"token\")?.value;\n    if (!token) {\n        return {\n            error: next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: \"Token de autenticação não encontrado\"\n            }, {\n                status: 401\n            })\n        };\n    }\n    try {\n        const decoded = jsonwebtoken__WEBPACK_IMPORTED_MODULE_2___default().verify(token, process.env.JWT_SECRET);\n        const user = await _lib_prisma__WEBPACK_IMPORTED_MODULE_1__[\"default\"].user.findUnique({\n            where: {\n                id: decoded.sub\n            },\n            select: {\n                role: true\n            }\n        });\n        if (!user || user.role !== \"admin\") {\n            return {\n                error: next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                    error: \"Acesso negado. Apenas administradores.\"\n                }, {\n                    status: 403\n                })\n            };\n        }\n        return {\n            userId: decoded.sub\n        };\n    } catch (error) {\n        return {\n            error: next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: \"Token inválido\"\n            }, {\n                status: 401\n            })\n        };\n    }\n}\n// PATCH - Suspender ou reativar matrículas de cursos do usuário\nasync function PATCH(request, { params }) {\n    const auth = await ensureAdmin(request);\n    if (\"error\" in auth) {\n        return auth.error;\n    }\n    try {\n        const { id: userId } = await params;\n        const body = await request.json();\n        const { cursoIds, suspenso, reembolsado } = body;\n        if (!Array.isArray(cursoIds) || cursoIds.length === 0) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: \"Lista de cursos é obrigatória\"\n            }, {\n                status: 400\n            });\n        }\n        // Validar que pelo menos um campo foi enviado\n        if (suspenso === undefined && reembolsado === undefined) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: \"É necessário informar 'suspenso' ou 'reembolsado'\"\n            }, {\n                status: 400\n            });\n        }\n        // Verificar se o usuário existe\n        const user = await _lib_prisma__WEBPACK_IMPORTED_MODULE_1__[\"default\"].user.findUnique({\n            where: {\n                id: userId\n            },\n            select: {\n                id: true,\n                name: true\n            }\n        });\n        if (!user) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: \"Usuário não encontrado\"\n            }, {\n                status: 404\n            });\n        }\n        // Preparar dados para atualização\n        const updateData = {};\n        if (suspenso !== undefined) updateData.suspenso = suspenso;\n        if (reembolsado !== undefined) updateData.reembolsado = reembolsado;\n        // Atualizar o status das matrículas\n        const result = await _lib_prisma__WEBPACK_IMPORTED_MODULE_1__[\"default\"].usuarioCurso.updateMany({\n            where: {\n                usuarioId: userId,\n                cursoId: {\n                    in: cursoIds\n                }\n            },\n            data: updateData\n        });\n        // Determinar mensagem de sucesso\n        let acao = \"\";\n        if (reembolsado !== undefined) {\n            acao = reembolsado ? \"marcada(s) como reembolsada(s)\" : \"desmarcada(s) como reembolsada(s)\";\n        } else if (suspenso !== undefined) {\n            acao = suspenso ? \"suspensa(s)\" : \"reativada(s)\";\n        }\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            message: `${result.count} matrícula(s) ${acao} com sucesso`,\n            updatedCount: result.count\n        });\n    } catch (error) {\n        console.error(\"Erro ao atualizar status das matrículas:\", error);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: \"Erro interno do servidor\"\n        }, {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL2FkbWluL3VzdWFyaW9zL1tpZF0vY3Vyc29zL3JvdXRlLnRzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQXdEO0FBQ3RCO0FBQ0g7QUFFL0IsZUFBZUcsWUFBWUMsR0FBZ0I7SUFDekMsTUFBTUMsUUFBUUQsSUFBSUUsT0FBTyxDQUFDQyxHQUFHLENBQUMsVUFBVUM7SUFDeEMsSUFBSSxDQUFDSCxPQUFPO1FBQ1YsT0FBTztZQUNMSSxPQUFPVCxxREFBWUEsQ0FBQ1UsSUFBSSxDQUN0QjtnQkFBRUQsT0FBTztZQUF1QyxHQUNoRDtnQkFBRUUsUUFBUTtZQUFJO1FBRWxCO0lBQ0Y7SUFFQSxJQUFJO1FBQ0YsTUFBTUMsVUFBVVYsMERBQVUsQ0FBQ0csT0FBT1MsUUFBUUMsR0FBRyxDQUFDQyxVQUFVO1FBR3hELE1BQU1DLE9BQU8sTUFBTWhCLG1EQUFNQSxDQUFDZ0IsSUFBSSxDQUFDQyxVQUFVLENBQUM7WUFDeENDLE9BQU87Z0JBQUVDLElBQUlSLFFBQVFTLEdBQUc7WUFBQztZQUN6QkMsUUFBUTtnQkFBRUMsTUFBTTtZQUFLO1FBQ3ZCO1FBRUEsSUFBSSxDQUFDTixRQUFRQSxLQUFLTSxJQUFJLEtBQUssU0FBUztZQUNsQyxPQUFPO2dCQUNMZCxPQUFPVCxxREFBWUEsQ0FBQ1UsSUFBSSxDQUN0QjtvQkFBRUQsT0FBTztnQkFBeUMsR0FDbEQ7b0JBQUVFLFFBQVE7Z0JBQUk7WUFFbEI7UUFDRjtRQUVBLE9BQU87WUFBRWEsUUFBUVosUUFBUVMsR0FBRztRQUFDO0lBQy9CLEVBQUUsT0FBT1osT0FBTztRQUNkLE9BQU87WUFDTEEsT0FBT1QscURBQVlBLENBQUNVLElBQUksQ0FBQztnQkFBRUQsT0FBTztZQUFpQixHQUFHO2dCQUFFRSxRQUFRO1lBQUk7UUFDdEU7SUFDRjtBQUNGO0FBRUEsZ0VBQWdFO0FBQ3pELGVBQWVjLE1BQ3BCQyxPQUFvQixFQUNwQixFQUFFQyxNQUFNLEVBQXVDO0lBRS9DLE1BQU1DLE9BQU8sTUFBTXpCLFlBQVl1QjtJQUMvQixJQUFJLFdBQVdFLE1BQU07UUFDbkIsT0FBT0EsS0FBS25CLEtBQUs7SUFDbkI7SUFFQSxJQUFJO1FBQ0YsTUFBTSxFQUFFVyxJQUFJSSxNQUFNLEVBQUUsR0FBRyxNQUFNRztRQUM3QixNQUFNRSxPQUFPLE1BQU1ILFFBQVFoQixJQUFJO1FBQy9CLE1BQU0sRUFBRW9CLFFBQVEsRUFBRUMsUUFBUSxFQUFFQyxXQUFXLEVBQUUsR0FBR0g7UUFFNUMsSUFBSSxDQUFDSSxNQUFNQyxPQUFPLENBQUNKLGFBQWFBLFNBQVNLLE1BQU0sS0FBSyxHQUFHO1lBQ3JELE9BQU9uQyxxREFBWUEsQ0FBQ1UsSUFBSSxDQUN0QjtnQkFBRUQsT0FBTztZQUFnQyxHQUN6QztnQkFBRUUsUUFBUTtZQUFJO1FBRWxCO1FBRUEsOENBQThDO1FBQzlDLElBQUlvQixhQUFhSyxhQUFhSixnQkFBZ0JJLFdBQVc7WUFDdkQsT0FBT3BDLHFEQUFZQSxDQUFDVSxJQUFJLENBQ3RCO2dCQUFFRCxPQUFPO1lBQW9ELEdBQzdEO2dCQUFFRSxRQUFRO1lBQUk7UUFFbEI7UUFFQSxnQ0FBZ0M7UUFDaEMsTUFBTU0sT0FBTyxNQUFNaEIsbURBQU1BLENBQUNnQixJQUFJLENBQUNDLFVBQVUsQ0FBQztZQUN4Q0MsT0FBTztnQkFBRUMsSUFBSUk7WUFBTztZQUNwQkYsUUFBUTtnQkFBRUYsSUFBSTtnQkFBTWlCLE1BQU07WUFBSztRQUNqQztRQUVBLElBQUksQ0FBQ3BCLE1BQU07WUFDVCxPQUFPakIscURBQVlBLENBQUNVLElBQUksQ0FDdEI7Z0JBQUVELE9BQU87WUFBeUIsR0FDbEM7Z0JBQUVFLFFBQVE7WUFBSTtRQUVsQjtRQUVBLGtDQUFrQztRQUNsQyxNQUFNMkIsYUFBNEQsQ0FBQztRQUNuRSxJQUFJUCxhQUFhSyxXQUFXRSxXQUFXUCxRQUFRLEdBQUdBO1FBQ2xELElBQUlDLGdCQUFnQkksV0FBV0UsV0FBV04sV0FBVyxHQUFHQTtRQUV4RCxvQ0FBb0M7UUFDcEMsTUFBTU8sU0FBUyxNQUFNdEMsbURBQU1BLENBQUN1QyxZQUFZLENBQUNDLFVBQVUsQ0FBQztZQUNsRHRCLE9BQU87Z0JBQ0x1QixXQUFXbEI7Z0JBQ1htQixTQUFTO29CQUNQQyxJQUFJZDtnQkFDTjtZQUNGO1lBQ0FlLE1BQU1QO1FBQ1I7UUFFQSxpQ0FBaUM7UUFDakMsSUFBSVEsT0FBTztRQUNYLElBQUlkLGdCQUFnQkksV0FBVztZQUM3QlUsT0FBT2QsY0FBYyxtQ0FBbUM7UUFDMUQsT0FBTyxJQUFJRCxhQUFhSyxXQUFXO1lBQ2pDVSxPQUFPZixXQUFXLGdCQUFnQjtRQUNwQztRQUVBLE9BQU8vQixxREFBWUEsQ0FBQ1UsSUFBSSxDQUFDO1lBQ3ZCcUMsU0FBUyxHQUFHUixPQUFPUyxLQUFLLENBQUMsY0FBYyxFQUFFRixLQUFLLFlBQVksQ0FBQztZQUMzREcsY0FBY1YsT0FBT1MsS0FBSztRQUM1QjtJQUNGLEVBQUUsT0FBT3ZDLE9BQU87UUFDZHlDLFFBQVF6QyxLQUFLLENBQUMsNENBQTRDQTtRQUMxRCxPQUFPVCxxREFBWUEsQ0FBQ1UsSUFBSSxDQUN0QjtZQUFFRCxPQUFPO1FBQTJCLEdBQ3BDO1lBQUVFLFFBQVE7UUFBSTtJQUVsQjtBQUNGIiwic291cmNlcyI6WyJDOlxcVXNlcnNcXEdhYnJpZWwgVG9ycmVzXFxEZXNrdG9wXFxNZXVzIENsaWVudGVzXFxFcmlja1xcw4FyZWEgZGUgTWVtYnJvc1xcYXJlYV9kZV9tZW1icm9zXFxhcHBcXGFwaVxcYWRtaW5cXHVzdWFyaW9zXFxbaWRdXFxjdXJzb3NcXHJvdXRlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5leHRSZXF1ZXN0LCBOZXh0UmVzcG9uc2UgfSBmcm9tIFwibmV4dC9zZXJ2ZXJcIjtcclxuaW1wb3J0IHByaXNtYSBmcm9tIFwiQC9saWIvcHJpc21hXCI7XHJcbmltcG9ydCBqd3QgZnJvbSBcImpzb253ZWJ0b2tlblwiO1xyXG5cclxuYXN5bmMgZnVuY3Rpb24gZW5zdXJlQWRtaW4ocmVxOiBOZXh0UmVxdWVzdCkge1xyXG4gIGNvbnN0IHRva2VuID0gcmVxLmNvb2tpZXMuZ2V0KFwidG9rZW5cIik/LnZhbHVlO1xyXG4gIGlmICghdG9rZW4pIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIGVycm9yOiBOZXh0UmVzcG9uc2UuanNvbihcclxuICAgICAgICB7IGVycm9yOiBcIlRva2VuIGRlIGF1dGVudGljYcOnw6NvIG7Do28gZW5jb250cmFkb1wiIH0sXHJcbiAgICAgICAgeyBzdGF0dXM6IDQwMSB9XHJcbiAgICAgICksXHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgdHJ5IHtcclxuICAgIGNvbnN0IGRlY29kZWQgPSBqd3QudmVyaWZ5KHRva2VuLCBwcm9jZXNzLmVudi5KV1RfU0VDUkVUISkgYXMge1xyXG4gICAgICBzdWI6IHN0cmluZztcclxuICAgIH07XHJcbiAgICBjb25zdCB1c2VyID0gYXdhaXQgcHJpc21hLnVzZXIuZmluZFVuaXF1ZSh7XHJcbiAgICAgIHdoZXJlOiB7IGlkOiBkZWNvZGVkLnN1YiB9LFxyXG4gICAgICBzZWxlY3Q6IHsgcm9sZTogdHJ1ZSB9LFxyXG4gICAgfSk7XHJcblxyXG4gICAgaWYgKCF1c2VyIHx8IHVzZXIucm9sZSAhPT0gXCJhZG1pblwiKSB7XHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgZXJyb3I6IE5leHRSZXNwb25zZS5qc29uKFxyXG4gICAgICAgICAgeyBlcnJvcjogXCJBY2Vzc28gbmVnYWRvLiBBcGVuYXMgYWRtaW5pc3RyYWRvcmVzLlwiIH0sXHJcbiAgICAgICAgICB7IHN0YXR1czogNDAzIH1cclxuICAgICAgICApLFxyXG4gICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB7IHVzZXJJZDogZGVjb2RlZC5zdWIgfTtcclxuICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgZXJyb3I6IE5leHRSZXNwb25zZS5qc29uKHsgZXJyb3I6IFwiVG9rZW4gaW52w6FsaWRvXCIgfSwgeyBzdGF0dXM6IDQwMSB9KSxcclxuICAgIH07XHJcbiAgfVxyXG59XHJcblxyXG4vLyBQQVRDSCAtIFN1c3BlbmRlciBvdSByZWF0aXZhciBtYXRyw61jdWxhcyBkZSBjdXJzb3MgZG8gdXN1w6FyaW9cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIFBBVENIKFxyXG4gIHJlcXVlc3Q6IE5leHRSZXF1ZXN0LFxyXG4gIHsgcGFyYW1zIH06IHsgcGFyYW1zOiBQcm9taXNlPHsgaWQ6IHN0cmluZyB9PiB9XHJcbikge1xyXG4gIGNvbnN0IGF1dGggPSBhd2FpdCBlbnN1cmVBZG1pbihyZXF1ZXN0KTtcclxuICBpZiAoXCJlcnJvclwiIGluIGF1dGgpIHtcclxuICAgIHJldHVybiBhdXRoLmVycm9yO1xyXG4gIH1cclxuXHJcbiAgdHJ5IHtcclxuICAgIGNvbnN0IHsgaWQ6IHVzZXJJZCB9ID0gYXdhaXQgcGFyYW1zO1xyXG4gICAgY29uc3QgYm9keSA9IGF3YWl0IHJlcXVlc3QuanNvbigpO1xyXG4gICAgY29uc3QgeyBjdXJzb0lkcywgc3VzcGVuc28sIHJlZW1ib2xzYWRvIH0gPSBib2R5O1xyXG5cclxuICAgIGlmICghQXJyYXkuaXNBcnJheShjdXJzb0lkcykgfHwgY3Vyc29JZHMubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbihcclxuICAgICAgICB7IGVycm9yOiBcIkxpc3RhIGRlIGN1cnNvcyDDqSBvYnJpZ2F0w7NyaWFcIiB9LFxyXG4gICAgICAgIHsgc3RhdHVzOiA0MDAgfVxyXG4gICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIFZhbGlkYXIgcXVlIHBlbG8gbWVub3MgdW0gY2FtcG8gZm9pIGVudmlhZG9cclxuICAgIGlmIChzdXNwZW5zbyA9PT0gdW5kZWZpbmVkICYmIHJlZW1ib2xzYWRvID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKFxyXG4gICAgICAgIHsgZXJyb3I6IFwiw4kgbmVjZXNzw6FyaW8gaW5mb3JtYXIgJ3N1c3BlbnNvJyBvdSAncmVlbWJvbHNhZG8nXCIgfSxcclxuICAgICAgICB7IHN0YXR1czogNDAwIH1cclxuICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBWZXJpZmljYXIgc2UgbyB1c3XDoXJpbyBleGlzdGVcclxuICAgIGNvbnN0IHVzZXIgPSBhd2FpdCBwcmlzbWEudXNlci5maW5kVW5pcXVlKHtcclxuICAgICAgd2hlcmU6IHsgaWQ6IHVzZXJJZCB9LFxyXG4gICAgICBzZWxlY3Q6IHsgaWQ6IHRydWUsIG5hbWU6IHRydWUgfSxcclxuICAgIH0pO1xyXG5cclxuICAgIGlmICghdXNlcikge1xyXG4gICAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oXHJcbiAgICAgICAgeyBlcnJvcjogXCJVc3XDoXJpbyBuw6NvIGVuY29udHJhZG9cIiB9LFxyXG4gICAgICAgIHsgc3RhdHVzOiA0MDQgfVxyXG4gICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIFByZXBhcmFyIGRhZG9zIHBhcmEgYXR1YWxpemHDp8Ojb1xyXG4gICAgY29uc3QgdXBkYXRlRGF0YTogeyBzdXNwZW5zbz86IGJvb2xlYW47IHJlZW1ib2xzYWRvPzogYm9vbGVhbiB9ID0ge307XHJcbiAgICBpZiAoc3VzcGVuc28gIT09IHVuZGVmaW5lZCkgdXBkYXRlRGF0YS5zdXNwZW5zbyA9IHN1c3BlbnNvO1xyXG4gICAgaWYgKHJlZW1ib2xzYWRvICE9PSB1bmRlZmluZWQpIHVwZGF0ZURhdGEucmVlbWJvbHNhZG8gPSByZWVtYm9sc2FkbztcclxuXHJcbiAgICAvLyBBdHVhbGl6YXIgbyBzdGF0dXMgZGFzIG1hdHLDrWN1bGFzXHJcbiAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBwcmlzbWEudXN1YXJpb0N1cnNvLnVwZGF0ZU1hbnkoe1xyXG4gICAgICB3aGVyZToge1xyXG4gICAgICAgIHVzdWFyaW9JZDogdXNlcklkLFxyXG4gICAgICAgIGN1cnNvSWQ6IHtcclxuICAgICAgICAgIGluOiBjdXJzb0lkcyxcclxuICAgICAgICB9LFxyXG4gICAgICB9LFxyXG4gICAgICBkYXRhOiB1cGRhdGVEYXRhLFxyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gRGV0ZXJtaW5hciBtZW5zYWdlbSBkZSBzdWNlc3NvXHJcbiAgICBsZXQgYWNhbyA9IFwiXCI7XHJcbiAgICBpZiAocmVlbWJvbHNhZG8gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICBhY2FvID0gcmVlbWJvbHNhZG8gPyBcIm1hcmNhZGEocykgY29tbyByZWVtYm9sc2FkYShzKVwiIDogXCJkZXNtYXJjYWRhKHMpIGNvbW8gcmVlbWJvbHNhZGEocylcIjtcclxuICAgIH0gZWxzZSBpZiAoc3VzcGVuc28gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICBhY2FvID0gc3VzcGVuc28gPyBcInN1c3BlbnNhKHMpXCIgOiBcInJlYXRpdmFkYShzKVwiO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7XHJcbiAgICAgIG1lc3NhZ2U6IGAke3Jlc3VsdC5jb3VudH0gbWF0csOtY3VsYShzKSAke2FjYW99IGNvbSBzdWNlc3NvYCxcclxuICAgICAgdXBkYXRlZENvdW50OiByZXN1bHQuY291bnQsXHJcbiAgICB9KTtcclxuICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgY29uc29sZS5lcnJvcihcIkVycm8gYW8gYXR1YWxpemFyIHN0YXR1cyBkYXMgbWF0csOtY3VsYXM6XCIsIGVycm9yKTtcclxuICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbihcclxuICAgICAgeyBlcnJvcjogXCJFcnJvIGludGVybm8gZG8gc2Vydmlkb3JcIiB9LFxyXG4gICAgICB7IHN0YXR1czogNTAwIH1cclxuICAgICk7XHJcbiAgfVxyXG59XHJcbiJdLCJuYW1lcyI6WyJOZXh0UmVzcG9uc2UiLCJwcmlzbWEiLCJqd3QiLCJlbnN1cmVBZG1pbiIsInJlcSIsInRva2VuIiwiY29va2llcyIsImdldCIsInZhbHVlIiwiZXJyb3IiLCJqc29uIiwic3RhdHVzIiwiZGVjb2RlZCIsInZlcmlmeSIsInByb2Nlc3MiLCJlbnYiLCJKV1RfU0VDUkVUIiwidXNlciIsImZpbmRVbmlxdWUiLCJ3aGVyZSIsImlkIiwic3ViIiwic2VsZWN0Iiwicm9sZSIsInVzZXJJZCIsIlBBVENIIiwicmVxdWVzdCIsInBhcmFtcyIsImF1dGgiLCJib2R5IiwiY3Vyc29JZHMiLCJzdXNwZW5zbyIsInJlZW1ib2xzYWRvIiwiQXJyYXkiLCJpc0FycmF5IiwibGVuZ3RoIiwidW5kZWZpbmVkIiwibmFtZSIsInVwZGF0ZURhdGEiLCJyZXN1bHQiLCJ1c3VhcmlvQ3Vyc28iLCJ1cGRhdGVNYW55IiwidXN1YXJpb0lkIiwiY3Vyc29JZCIsImluIiwiZGF0YSIsImFjYW8iLCJtZXNzYWdlIiwiY291bnQiLCJ1cGRhdGVkQ291bnQiLCJjb25zb2xlIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./app/api/admin/usuarios/[id]/cursos/route.ts\n");

/***/ }),

/***/ "(rsc)/./lib/prisma.ts":
/*!***********************!*\
  !*** ./lib/prisma.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__),\n/* harmony export */   prisma: () => (/* binding */ prisma)\n/* harmony export */ });\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @prisma/client */ \"@prisma/client\");\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_prisma_client__WEBPACK_IMPORTED_MODULE_0__);\n\nconst globalForPrisma = globalThis;\nconst prisma = globalForPrisma.prisma || new _prisma_client__WEBPACK_IMPORTED_MODULE_0__.PrismaClient({\n    log: [\n        \"query\",\n        \"error\",\n        \"warn\"\n    ]\n});\nif (true) globalForPrisma.prisma = prisma;\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (prisma);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvcHJpc21hLnRzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBOEM7QUFFOUMsTUFBTUMsa0JBQWtCQztBQUVqQixNQUFNQyxTQUNYRixnQkFBZ0JFLE1BQU0sSUFDdEIsSUFBSUgsd0RBQVlBLENBQUM7SUFDZkksS0FBSztRQUFDO1FBQVM7UUFBUztLQUFPO0FBQ2pDLEdBQUc7QUFFTCxJQUFJQyxJQUFxQyxFQUFFSixnQkFBZ0JFLE1BQU0sR0FBR0E7QUFFcEUsaUVBQWVBLE1BQU1BLEVBQUMiLCJzb3VyY2VzIjpbIkM6XFxVc2Vyc1xcR2FicmllbCBUb3JyZXNcXERlc2t0b3BcXE1ldXMgQ2xpZW50ZXNcXEVyaWNrXFzDgXJlYSBkZSBNZW1icm9zXFxhcmVhX2RlX21lbWJyb3NcXGxpYlxccHJpc21hLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFByaXNtYUNsaWVudCB9IGZyb20gXCJAcHJpc21hL2NsaWVudFwiO1xyXG5cclxuY29uc3QgZ2xvYmFsRm9yUHJpc21hID0gZ2xvYmFsVGhpcyBhcyB1bmtub3duIGFzIHsgcHJpc21hOiBQcmlzbWFDbGllbnQgfTtcclxuXHJcbmV4cG9ydCBjb25zdCBwcmlzbWEgPVxyXG4gIGdsb2JhbEZvclByaXNtYS5wcmlzbWEgfHxcclxuICBuZXcgUHJpc21hQ2xpZW50KHtcclxuICAgIGxvZzogW1wicXVlcnlcIiwgXCJlcnJvclwiLCBcIndhcm5cIl0sXHJcbiAgfSk7XHJcblxyXG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSBnbG9iYWxGb3JQcmlzbWEucHJpc21hID0gcHJpc21hO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgcHJpc21hO1xyXG4iXSwibmFtZXMiOlsiUHJpc21hQ2xpZW50IiwiZ2xvYmFsRm9yUHJpc21hIiwiZ2xvYmFsVGhpcyIsInByaXNtYSIsImxvZyIsInByb2Nlc3MiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./lib/prisma.ts\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fadmin%2Fusuarios%2F%5Bid%5D%2Fcursos%2Froute&page=%2Fapi%2Fadmin%2Fusuarios%2F%5Bid%5D%2Fcursos%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fadmin%2Fusuarios%2F%5Bid%5D%2Fcursos%2Froute.ts&appDir=C%3A%5CUsers%5CGabriel%20Torres%5CDesktop%5CMeus%20Clientes%5CErick%5C%C3%81rea%20de%20Membros%5Carea_de_membros%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CGabriel%20Torres%5CDesktop%5CMeus%20Clientes%5CErick%5C%C3%81rea%20de%20Membros%5Carea_de_membros&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fadmin%2Fusuarios%2F%5Bid%5D%2Fcursos%2Froute&page=%2Fapi%2Fadmin%2Fusuarios%2F%5Bid%5D%2Fcursos%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fadmin%2Fusuarios%2F%5Bid%5D%2Fcursos%2Froute.ts&appDir=C%3A%5CUsers%5CGabriel%20Torres%5CDesktop%5CMeus%20Clientes%5CErick%5C%C3%81rea%20de%20Membros%5Carea_de_membros%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CGabriel%20Torres%5CDesktop%5CMeus%20Clientes%5CErick%5C%C3%81rea%20de%20Membros%5Carea_de_membros&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var C_Users_Gabriel_Torres_Desktop_Meus_Clientes_Erick_rea_de_Membros_area_de_membros_app_api_admin_usuarios_id_cursos_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/admin/usuarios/[id]/cursos/route.ts */ \"(rsc)/./app/api/admin/usuarios/[id]/cursos/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/admin/usuarios/[id]/cursos/route\",\n        pathname: \"/api/admin/usuarios/[id]/cursos\",\n        filename: \"route\",\n        bundlePath: \"app/api/admin/usuarios/[id]/cursos/route\"\n    },\n    resolvedPagePath: \"C:\\\\Users\\\\Gabriel Torres\\\\Desktop\\\\Meus Clientes\\\\Erick\\\\Área de Membros\\\\area_de_membros\\\\app\\\\api\\\\admin\\\\usuarios\\\\[id]\\\\cursos\\\\route.ts\",\n    nextConfigOutput,\n    userland: C_Users_Gabriel_Torres_Desktop_Meus_Clientes_Erick_rea_de_Membros_area_de_membros_app_api_admin_usuarios_id_cursos_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZhcGklMkZhZG1pbiUyRnVzdWFyaW9zJTJGJTVCaWQlNUQlMkZjdXJzb3MlMkZyb3V0ZSZwYWdlPSUyRmFwaSUyRmFkbWluJTJGdXN1YXJpb3MlMkYlNUJpZCU1RCUyRmN1cnNvcyUyRnJvdXRlJmFwcFBhdGhzPSZwYWdlUGF0aD1wcml2YXRlLW5leHQtYXBwLWRpciUyRmFwaSUyRmFkbWluJTJGdXN1YXJpb3MlMkYlNUJpZCU1RCUyRmN1cnNvcyUyRnJvdXRlLnRzJmFwcERpcj1DJTNBJTVDVXNlcnMlNUNHYWJyaWVsJTIwVG9ycmVzJTVDRGVza3RvcCU1Q01ldXMlMjBDbGllbnRlcyU1Q0VyaWNrJTVDJUMzJTgxcmVhJTIwZGUlMjBNZW1icm9zJTVDYXJlYV9kZV9tZW1icm9zJTVDYXBwJnBhZ2VFeHRlbnNpb25zPXRzeCZwYWdlRXh0ZW5zaW9ucz10cyZwYWdlRXh0ZW5zaW9ucz1qc3gmcGFnZUV4dGVuc2lvbnM9anMmcm9vdERpcj1DJTNBJTVDVXNlcnMlNUNHYWJyaWVsJTIwVG9ycmVzJTVDRGVza3RvcCU1Q01ldXMlMjBDbGllbnRlcyU1Q0VyaWNrJTVDJUMzJTgxcmVhJTIwZGUlMjBNZW1icm9zJTVDYXJlYV9kZV9tZW1icm9zJmlzRGV2PXRydWUmdHNjb25maWdQYXRoPXRzY29uZmlnLmpzb24mYmFzZVBhdGg9JmFzc2V0UHJlZml4PSZuZXh0Q29uZmlnT3V0cHV0PSZwcmVmZXJyZWRSZWdpb249Jm1pZGRsZXdhcmVDb25maWc9ZTMwJTNEISIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUErRjtBQUN2QztBQUNxQjtBQUM2RjtBQUMxSztBQUNBO0FBQ0E7QUFDQSx3QkFBd0IseUdBQW1CO0FBQzNDO0FBQ0EsY0FBYyxrRUFBUztBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsWUFBWTtBQUNaLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSxRQUFRLHNEQUFzRDtBQUM5RDtBQUNBLFdBQVcsNEVBQVc7QUFDdEI7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUMwRjs7QUFFMUYiLCJzb3VyY2VzIjpbIiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBcHBSb3V0ZVJvdXRlTW9kdWxlIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvcm91dGUtbW9kdWxlcy9hcHAtcm91dGUvbW9kdWxlLmNvbXBpbGVkXCI7XG5pbXBvcnQgeyBSb3V0ZUtpbmQgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9yb3V0ZS1raW5kXCI7XG5pbXBvcnQgeyBwYXRjaEZldGNoIGFzIF9wYXRjaEZldGNoIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvbGliL3BhdGNoLWZldGNoXCI7XG5pbXBvcnQgKiBhcyB1c2VybGFuZCBmcm9tIFwiQzpcXFxcVXNlcnNcXFxcR2FicmllbCBUb3JyZXNcXFxcRGVza3RvcFxcXFxNZXVzIENsaWVudGVzXFxcXEVyaWNrXFxcXMOBcmVhIGRlIE1lbWJyb3NcXFxcYXJlYV9kZV9tZW1icm9zXFxcXGFwcFxcXFxhcGlcXFxcYWRtaW5cXFxcdXN1YXJpb3NcXFxcW2lkXVxcXFxjdXJzb3NcXFxccm91dGUudHNcIjtcbi8vIFdlIGluamVjdCB0aGUgbmV4dENvbmZpZ091dHB1dCBoZXJlIHNvIHRoYXQgd2UgY2FuIHVzZSB0aGVtIGluIHRoZSByb3V0ZVxuLy8gbW9kdWxlLlxuY29uc3QgbmV4dENvbmZpZ091dHB1dCA9IFwiXCJcbmNvbnN0IHJvdXRlTW9kdWxlID0gbmV3IEFwcFJvdXRlUm91dGVNb2R1bGUoe1xuICAgIGRlZmluaXRpb246IHtcbiAgICAgICAga2luZDogUm91dGVLaW5kLkFQUF9ST1VURSxcbiAgICAgICAgcGFnZTogXCIvYXBpL2FkbWluL3VzdWFyaW9zL1tpZF0vY3Vyc29zL3JvdXRlXCIsXG4gICAgICAgIHBhdGhuYW1lOiBcIi9hcGkvYWRtaW4vdXN1YXJpb3MvW2lkXS9jdXJzb3NcIixcbiAgICAgICAgZmlsZW5hbWU6IFwicm91dGVcIixcbiAgICAgICAgYnVuZGxlUGF0aDogXCJhcHAvYXBpL2FkbWluL3VzdWFyaW9zL1tpZF0vY3Vyc29zL3JvdXRlXCJcbiAgICB9LFxuICAgIHJlc29sdmVkUGFnZVBhdGg6IFwiQzpcXFxcVXNlcnNcXFxcR2FicmllbCBUb3JyZXNcXFxcRGVza3RvcFxcXFxNZXVzIENsaWVudGVzXFxcXEVyaWNrXFxcXMOBcmVhIGRlIE1lbWJyb3NcXFxcYXJlYV9kZV9tZW1icm9zXFxcXGFwcFxcXFxhcGlcXFxcYWRtaW5cXFxcdXN1YXJpb3NcXFxcW2lkXVxcXFxjdXJzb3NcXFxccm91dGUudHNcIixcbiAgICBuZXh0Q29uZmlnT3V0cHV0LFxuICAgIHVzZXJsYW5kXG59KTtcbi8vIFB1bGwgb3V0IHRoZSBleHBvcnRzIHRoYXQgd2UgbmVlZCB0byBleHBvc2UgZnJvbSB0aGUgbW9kdWxlLiBUaGlzIHNob3VsZFxuLy8gYmUgZWxpbWluYXRlZCB3aGVuIHdlJ3ZlIG1vdmVkIHRoZSBvdGhlciByb3V0ZXMgdG8gdGhlIG5ldyBmb3JtYXQuIFRoZXNlXG4vLyBhcmUgdXNlZCB0byBob29rIGludG8gdGhlIHJvdXRlLlxuY29uc3QgeyB3b3JrQXN5bmNTdG9yYWdlLCB3b3JrVW5pdEFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MgfSA9IHJvdXRlTW9kdWxlO1xuZnVuY3Rpb24gcGF0Y2hGZXRjaCgpIHtcbiAgICByZXR1cm4gX3BhdGNoRmV0Y2goe1xuICAgICAgICB3b3JrQXN5bmNTdG9yYWdlLFxuICAgICAgICB3b3JrVW5pdEFzeW5jU3RvcmFnZVxuICAgIH0pO1xufVxuZXhwb3J0IHsgcm91dGVNb2R1bGUsIHdvcmtBc3luY1N0b3JhZ2UsIHdvcmtVbml0QXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcywgcGF0Y2hGZXRjaCwgIH07XG5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWFwcC1yb3V0ZS5qcy5tYXAiXSwibmFtZXMiOltdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fadmin%2Fusuarios%2F%5Bid%5D%2Fcursos%2Froute&page=%2Fapi%2Fadmin%2Fusuarios%2F%5Bid%5D%2Fcursos%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fadmin%2Fusuarios%2F%5Bid%5D%2Fcursos%2Froute.ts&appDir=C%3A%5CUsers%5CGabriel%20Torres%5CDesktop%5CMeus%20Clientes%5CErick%5C%C3%81rea%20de%20Membros%5Carea_de_membros%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CGabriel%20Torres%5CDesktop%5CMeus%20Clientes%5CErick%5C%C3%81rea%20de%20Membros%5Carea_de_membros&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

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
var __webpack_require__ = require("../../../../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/semver","vendor-chunks/jsonwebtoken","vendor-chunks/lodash.includes","vendor-chunks/jws","vendor-chunks/lodash.once","vendor-chunks/jwa","vendor-chunks/lodash.isinteger","vendor-chunks/ecdsa-sig-formatter","vendor-chunks/lodash.isplainobject","vendor-chunks/ms","vendor-chunks/lodash.isstring","vendor-chunks/lodash.isnumber","vendor-chunks/lodash.isboolean","vendor-chunks/safe-buffer","vendor-chunks/buffer-equal-constant-time"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fadmin%2Fusuarios%2F%5Bid%5D%2Fcursos%2Froute&page=%2Fapi%2Fadmin%2Fusuarios%2F%5Bid%5D%2Fcursos%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fadmin%2Fusuarios%2F%5Bid%5D%2Fcursos%2Froute.ts&appDir=C%3A%5CUsers%5CGabriel%20Torres%5CDesktop%5CMeus%20Clientes%5CErick%5C%C3%81rea%20de%20Membros%5Carea_de_membros%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CGabriel%20Torres%5CDesktop%5CMeus%20Clientes%5CErick%5C%C3%81rea%20de%20Membros%5Carea_de_membros&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();