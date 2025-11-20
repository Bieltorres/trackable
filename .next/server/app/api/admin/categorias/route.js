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
exports.id = "app/api/admin/categorias/route";
exports.ids = ["app/api/admin/categorias/route"];
exports.modules = {

/***/ "(rsc)/./app/api/admin/categorias/route.ts":
/*!*******************************************!*\
  !*** ./app/api/admin/categorias/route.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ GET),\n/* harmony export */   POST: () => (/* binding */ POST)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var _lib_prisma__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/lib/prisma */ \"(rsc)/./lib/prisma.ts\");\n/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! jsonwebtoken */ \"(rsc)/./node_modules/jsonwebtoken/index.js\");\n/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(jsonwebtoken__WEBPACK_IMPORTED_MODULE_2__);\n\n\n\nasync function GET(req) {\n    try {\n        // Verificar token de autenticação\n        const token = req.cookies.get(\"token\")?.value;\n        if (!token) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: \"Token de autenticação não encontrado\"\n            }, {\n                status: 401\n            });\n        }\n        let userId;\n        try {\n            const decoded = jsonwebtoken__WEBPACK_IMPORTED_MODULE_2___default().verify(token, process.env.JWT_SECRET);\n            userId = decoded.sub;\n        } catch (error) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: \"Token inválido\"\n            }, {\n                status: 401\n            });\n        }\n        const user = await _lib_prisma__WEBPACK_IMPORTED_MODULE_1__[\"default\"].user.findUnique({\n            where: {\n                id: userId\n            },\n            select: {\n                role: true\n            }\n        });\n        if (!user || user.role !== \"admin\") {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: \"Acesso negado. Apenas administradores.\"\n            }, {\n                status: 403\n            });\n        }\n        const categorias = await _lib_prisma__WEBPACK_IMPORTED_MODULE_1__[\"default\"].categoria.findMany({\n            orderBy: {\n                nome: \"asc\"\n            }\n        });\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            categorias\n        });\n    } catch (error) {\n        console.error(\"Erro ao buscar categorias:\", error);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: \"Erro interno do servidor\"\n        }, {\n            status: 500\n        });\n    }\n}\nasync function POST(req) {\n    try {\n        // Verificar token de autenticação\n        const token = req.cookies.get(\"token\")?.value;\n        if (!token) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: \"Token de autenticação não encontrado\"\n            }, {\n                status: 401\n            });\n        }\n        let userId;\n        try {\n            const decoded = jsonwebtoken__WEBPACK_IMPORTED_MODULE_2___default().verify(token, process.env.JWT_SECRET);\n            userId = decoded.sub;\n        } catch (error) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: \"Token inválido\"\n            }, {\n                status: 401\n            });\n        }\n        const user = await _lib_prisma__WEBPACK_IMPORTED_MODULE_1__[\"default\"].user.findUnique({\n            where: {\n                id: userId\n            },\n            select: {\n                role: true\n            }\n        });\n        if (!user || user.role !== \"admin\") {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: \"Acesso negado. Apenas administradores.\"\n            }, {\n                status: 403\n            });\n        }\n        const { nome, cor, icone, customSvgUrl } = await req.json();\n        if (!nome) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: \"Nome da categoria é obrigatório\"\n            }, {\n                status: 400\n            });\n        }\n        // Verificar se já existe uma categoria com esse nome\n        const categoriaExistente = await _lib_prisma__WEBPACK_IMPORTED_MODULE_1__[\"default\"].categoria.findUnique({\n            where: {\n                nome\n            }\n        });\n        if (categoriaExistente) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: \"Já existe uma categoria com esse nome\"\n            }, {\n                status: 400\n            });\n        }\n        const categoria = await _lib_prisma__WEBPACK_IMPORTED_MODULE_1__[\"default\"].categoria.create({\n            data: {\n                nome,\n                cor: cor || \"#3B82F6\",\n                icone: icone || \"BookOpen\",\n                customSvgUrl: customSvgUrl || null\n            }\n        });\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            categoria\n        });\n    } catch (error) {\n        console.error(\"Erro ao criar categoria:\", error);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: \"Erro interno do servidor\"\n        }, {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL2FkbWluL2NhdGVnb3JpYXMvcm91dGUudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQXdEO0FBQ3RCO0FBQ0g7QUFFeEIsZUFBZUcsSUFBSUMsR0FBZ0I7SUFDeEMsSUFBSTtRQUNGLGtDQUFrQztRQUNsQyxNQUFNQyxRQUFRRCxJQUFJRSxPQUFPLENBQUNDLEdBQUcsQ0FBQyxVQUFVQztRQUN4QyxJQUFJLENBQUNILE9BQU87WUFDVixPQUFPTCxxREFBWUEsQ0FBQ1MsSUFBSSxDQUN0QjtnQkFBRUMsT0FBTztZQUF1QyxHQUNoRDtnQkFBRUMsUUFBUTtZQUFJO1FBRWxCO1FBRUEsSUFBSUM7UUFDSixJQUFJO1lBQ0YsTUFBTUMsVUFBVVgsMERBQVUsQ0FBQ0csT0FBT1UsUUFBUUMsR0FBRyxDQUFDQyxVQUFVO1lBR3hETCxTQUFTQyxRQUFRSyxHQUFHO1FBQ3RCLEVBQUUsT0FBT1IsT0FBTztZQUNkLE9BQU9WLHFEQUFZQSxDQUFDUyxJQUFJLENBQUM7Z0JBQUVDLE9BQU87WUFBaUIsR0FBRztnQkFBRUMsUUFBUTtZQUFJO1FBQ3RFO1FBRUEsTUFBTVEsT0FBTyxNQUFNbEIsbURBQU1BLENBQUNrQixJQUFJLENBQUNDLFVBQVUsQ0FBQztZQUN4Q0MsT0FBTztnQkFBRUMsSUFBSVY7WUFBTztZQUNwQlcsUUFBUTtnQkFBRUMsTUFBTTtZQUFLO1FBQ3ZCO1FBRUEsSUFBSSxDQUFDTCxRQUFRQSxLQUFLSyxJQUFJLEtBQUssU0FBUztZQUNsQyxPQUFPeEIscURBQVlBLENBQUNTLElBQUksQ0FDdEI7Z0JBQUVDLE9BQU87WUFBeUMsR0FDbEQ7Z0JBQUVDLFFBQVE7WUFBSTtRQUVsQjtRQUVBLE1BQU1jLGFBQWEsTUFBTXhCLG1EQUFNQSxDQUFDeUIsU0FBUyxDQUFDQyxRQUFRLENBQUM7WUFDakRDLFNBQVM7Z0JBQ1BDLE1BQU07WUFDUjtRQUNGO1FBRUEsT0FBTzdCLHFEQUFZQSxDQUFDUyxJQUFJLENBQUM7WUFBRWdCO1FBQVc7SUFDeEMsRUFBRSxPQUFPZixPQUFPO1FBQ2RvQixRQUFRcEIsS0FBSyxDQUFDLDhCQUE4QkE7UUFDNUMsT0FBT1YscURBQVlBLENBQUNTLElBQUksQ0FDdEI7WUFBRUMsT0FBTztRQUEyQixHQUNwQztZQUFFQyxRQUFRO1FBQUk7SUFFbEI7QUFDRjtBQUVPLGVBQWVvQixLQUFLM0IsR0FBZ0I7SUFDekMsSUFBSTtRQUNGLGtDQUFrQztRQUNsQyxNQUFNQyxRQUFRRCxJQUFJRSxPQUFPLENBQUNDLEdBQUcsQ0FBQyxVQUFVQztRQUN4QyxJQUFJLENBQUNILE9BQU87WUFDVixPQUFPTCxxREFBWUEsQ0FBQ1MsSUFBSSxDQUN0QjtnQkFBRUMsT0FBTztZQUF1QyxHQUNoRDtnQkFBRUMsUUFBUTtZQUFJO1FBRWxCO1FBRUEsSUFBSUM7UUFDSixJQUFJO1lBQ0YsTUFBTUMsVUFBVVgsMERBQVUsQ0FBQ0csT0FBT1UsUUFBUUMsR0FBRyxDQUFDQyxVQUFVO1lBR3hETCxTQUFTQyxRQUFRSyxHQUFHO1FBQ3RCLEVBQUUsT0FBT1IsT0FBTztZQUNkLE9BQU9WLHFEQUFZQSxDQUFDUyxJQUFJLENBQUM7Z0JBQUVDLE9BQU87WUFBaUIsR0FBRztnQkFBRUMsUUFBUTtZQUFJO1FBQ3RFO1FBRUEsTUFBTVEsT0FBTyxNQUFNbEIsbURBQU1BLENBQUNrQixJQUFJLENBQUNDLFVBQVUsQ0FBQztZQUN4Q0MsT0FBTztnQkFBRUMsSUFBSVY7WUFBTztZQUNwQlcsUUFBUTtnQkFBRUMsTUFBTTtZQUFLO1FBQ3ZCO1FBRUEsSUFBSSxDQUFDTCxRQUFRQSxLQUFLSyxJQUFJLEtBQUssU0FBUztZQUNsQyxPQUFPeEIscURBQVlBLENBQUNTLElBQUksQ0FDdEI7Z0JBQUVDLE9BQU87WUFBeUMsR0FDbEQ7Z0JBQUVDLFFBQVE7WUFBSTtRQUVsQjtRQUVBLE1BQU0sRUFBRWtCLElBQUksRUFBRUcsR0FBRyxFQUFFQyxLQUFLLEVBQUVDLFlBQVksRUFBRSxHQUFHLE1BQU05QixJQUFJSyxJQUFJO1FBRXpELElBQUksQ0FBQ29CLE1BQU07WUFDVCxPQUFPN0IscURBQVlBLENBQUNTLElBQUksQ0FDdEI7Z0JBQUVDLE9BQU87WUFBa0MsR0FDM0M7Z0JBQUVDLFFBQVE7WUFBSTtRQUVsQjtRQUVBLHFEQUFxRDtRQUNyRCxNQUFNd0IscUJBQXFCLE1BQU1sQyxtREFBTUEsQ0FBQ3lCLFNBQVMsQ0FBQ04sVUFBVSxDQUFDO1lBQzNEQyxPQUFPO2dCQUFFUTtZQUFLO1FBQ2hCO1FBRUEsSUFBSU0sb0JBQW9CO1lBQ3RCLE9BQU9uQyxxREFBWUEsQ0FBQ1MsSUFBSSxDQUN0QjtnQkFBRUMsT0FBTztZQUF3QyxHQUNqRDtnQkFBRUMsUUFBUTtZQUFJO1FBRWxCO1FBRUEsTUFBTWUsWUFBWSxNQUFNekIsbURBQU1BLENBQUN5QixTQUFTLENBQUNVLE1BQU0sQ0FBQztZQUM5Q0MsTUFBTTtnQkFDSlI7Z0JBQ0FHLEtBQUtBLE9BQU87Z0JBQ1pDLE9BQU9BLFNBQVM7Z0JBQ2hCQyxjQUFjQSxnQkFBZ0I7WUFDaEM7UUFDRjtRQUVBLE9BQU9sQyxxREFBWUEsQ0FBQ1MsSUFBSSxDQUFDO1lBQUVpQjtRQUFVO0lBQ3ZDLEVBQUUsT0FBT2hCLE9BQU87UUFDZG9CLFFBQVFwQixLQUFLLENBQUMsNEJBQTRCQTtRQUMxQyxPQUFPVixxREFBWUEsQ0FBQ1MsSUFBSSxDQUN0QjtZQUFFQyxPQUFPO1FBQTJCLEdBQ3BDO1lBQUVDLFFBQVE7UUFBSTtJQUVsQjtBQUNGIiwic291cmNlcyI6WyJDOlxcVXNlcnNcXEdhYnJpZWwgVG9ycmVzXFxEZXNrdG9wXFxNZXVzIENsaWVudGVzXFxFcmlja1xcw4FyZWEgZGUgTWVtYnJvc1xcYXJlYV9kZV9tZW1icm9zXFxhcHBcXGFwaVxcYWRtaW5cXGNhdGVnb3JpYXNcXHJvdXRlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5leHRSZXF1ZXN0LCBOZXh0UmVzcG9uc2UgfSBmcm9tIFwibmV4dC9zZXJ2ZXJcIjtcclxuaW1wb3J0IHByaXNtYSBmcm9tIFwiQC9saWIvcHJpc21hXCI7XHJcbmltcG9ydCBqd3QgZnJvbSBcImpzb253ZWJ0b2tlblwiO1xyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIEdFVChyZXE6IE5leHRSZXF1ZXN0KSB7XHJcbiAgdHJ5IHtcclxuICAgIC8vIFZlcmlmaWNhciB0b2tlbiBkZSBhdXRlbnRpY2HDp8Ojb1xyXG4gICAgY29uc3QgdG9rZW4gPSByZXEuY29va2llcy5nZXQoXCJ0b2tlblwiKT8udmFsdWU7XHJcbiAgICBpZiAoIXRva2VuKSB7XHJcbiAgICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbihcclxuICAgICAgICB7IGVycm9yOiBcIlRva2VuIGRlIGF1dGVudGljYcOnw6NvIG7Do28gZW5jb250cmFkb1wiIH0sXHJcbiAgICAgICAgeyBzdGF0dXM6IDQwMSB9XHJcbiAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgbGV0IHVzZXJJZDogc3RyaW5nO1xyXG4gICAgdHJ5IHtcclxuICAgICAgY29uc3QgZGVjb2RlZCA9IGp3dC52ZXJpZnkodG9rZW4sIHByb2Nlc3MuZW52LkpXVF9TRUNSRVQhKSBhcyB7XHJcbiAgICAgICAgc3ViOiBzdHJpbmc7XHJcbiAgICAgIH07XHJcbiAgICAgIHVzZXJJZCA9IGRlY29kZWQuc3ViO1xyXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgZXJyb3I6IFwiVG9rZW4gaW52w6FsaWRvXCIgfSwgeyBzdGF0dXM6IDQwMSB9KTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCB1c2VyID0gYXdhaXQgcHJpc21hLnVzZXIuZmluZFVuaXF1ZSh7XHJcbiAgICAgIHdoZXJlOiB7IGlkOiB1c2VySWQgfSxcclxuICAgICAgc2VsZWN0OiB7IHJvbGU6IHRydWUgfSxcclxuICAgIH0pO1xyXG5cclxuICAgIGlmICghdXNlciB8fCB1c2VyLnJvbGUgIT09IFwiYWRtaW5cIikge1xyXG4gICAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oXHJcbiAgICAgICAgeyBlcnJvcjogXCJBY2Vzc28gbmVnYWRvLiBBcGVuYXMgYWRtaW5pc3RyYWRvcmVzLlwiIH0sXHJcbiAgICAgICAgeyBzdGF0dXM6IDQwMyB9XHJcbiAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgY2F0ZWdvcmlhcyA9IGF3YWl0IHByaXNtYS5jYXRlZ29yaWEuZmluZE1hbnkoe1xyXG4gICAgICBvcmRlckJ5OiB7XHJcbiAgICAgICAgbm9tZTogXCJhc2NcIixcclxuICAgICAgfSxcclxuICAgIH0pO1xyXG5cclxuICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7IGNhdGVnb3JpYXMgfSk7XHJcbiAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJvIGFvIGJ1c2NhciBjYXRlZ29yaWFzOlwiLCBlcnJvcik7XHJcbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oXHJcbiAgICAgIHsgZXJyb3I6IFwiRXJybyBpbnRlcm5vIGRvIHNlcnZpZG9yXCIgfSxcclxuICAgICAgeyBzdGF0dXM6IDUwMCB9XHJcbiAgICApO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIFBPU1QocmVxOiBOZXh0UmVxdWVzdCkge1xyXG4gIHRyeSB7XHJcbiAgICAvLyBWZXJpZmljYXIgdG9rZW4gZGUgYXV0ZW50aWNhw6fDo29cclxuICAgIGNvbnN0IHRva2VuID0gcmVxLmNvb2tpZXMuZ2V0KFwidG9rZW5cIik/LnZhbHVlO1xyXG4gICAgaWYgKCF0b2tlbikge1xyXG4gICAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oXHJcbiAgICAgICAgeyBlcnJvcjogXCJUb2tlbiBkZSBhdXRlbnRpY2HDp8OjbyBuw6NvIGVuY29udHJhZG9cIiB9LFxyXG4gICAgICAgIHsgc3RhdHVzOiA0MDEgfVxyXG4gICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIGxldCB1c2VySWQ6IHN0cmluZztcclxuICAgIHRyeSB7XHJcbiAgICAgIGNvbnN0IGRlY29kZWQgPSBqd3QudmVyaWZ5KHRva2VuLCBwcm9jZXNzLmVudi5KV1RfU0VDUkVUISkgYXMge1xyXG4gICAgICAgIHN1Yjogc3RyaW5nO1xyXG4gICAgICB9O1xyXG4gICAgICB1c2VySWQgPSBkZWNvZGVkLnN1YjtcclxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7IGVycm9yOiBcIlRva2VuIGludsOhbGlkb1wiIH0sIHsgc3RhdHVzOiA0MDEgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgdXNlciA9IGF3YWl0IHByaXNtYS51c2VyLmZpbmRVbmlxdWUoe1xyXG4gICAgICB3aGVyZTogeyBpZDogdXNlcklkIH0sXHJcbiAgICAgIHNlbGVjdDogeyByb2xlOiB0cnVlIH0sXHJcbiAgICB9KTtcclxuXHJcbiAgICBpZiAoIXVzZXIgfHwgdXNlci5yb2xlICE9PSBcImFkbWluXCIpIHtcclxuICAgICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKFxyXG4gICAgICAgIHsgZXJyb3I6IFwiQWNlc3NvIG5lZ2Fkby4gQXBlbmFzIGFkbWluaXN0cmFkb3Jlcy5cIiB9LFxyXG4gICAgICAgIHsgc3RhdHVzOiA0MDMgfVxyXG4gICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHsgbm9tZSwgY29yLCBpY29uZSwgY3VzdG9tU3ZnVXJsIH0gPSBhd2FpdCByZXEuanNvbigpO1xyXG5cclxuICAgIGlmICghbm9tZSkge1xyXG4gICAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oXHJcbiAgICAgICAgeyBlcnJvcjogXCJOb21lIGRhIGNhdGVnb3JpYSDDqSBvYnJpZ2F0w7NyaW9cIiB9LFxyXG4gICAgICAgIHsgc3RhdHVzOiA0MDAgfVxyXG4gICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIFZlcmlmaWNhciBzZSBqw6EgZXhpc3RlIHVtYSBjYXRlZ29yaWEgY29tIGVzc2Ugbm9tZVxyXG4gICAgY29uc3QgY2F0ZWdvcmlhRXhpc3RlbnRlID0gYXdhaXQgcHJpc21hLmNhdGVnb3JpYS5maW5kVW5pcXVlKHtcclxuICAgICAgd2hlcmU6IHsgbm9tZSB9LFxyXG4gICAgfSk7XHJcblxyXG4gICAgaWYgKGNhdGVnb3JpYUV4aXN0ZW50ZSkge1xyXG4gICAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oXHJcbiAgICAgICAgeyBlcnJvcjogXCJKw6EgZXhpc3RlIHVtYSBjYXRlZ29yaWEgY29tIGVzc2Ugbm9tZVwiIH0sXHJcbiAgICAgICAgeyBzdGF0dXM6IDQwMCB9XHJcbiAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgY2F0ZWdvcmlhID0gYXdhaXQgcHJpc21hLmNhdGVnb3JpYS5jcmVhdGUoe1xyXG4gICAgICBkYXRhOiB7XHJcbiAgICAgICAgbm9tZSxcclxuICAgICAgICBjb3I6IGNvciB8fCBcIiMzQjgyRjZcIixcclxuICAgICAgICBpY29uZTogaWNvbmUgfHwgXCJCb29rT3BlblwiLFxyXG4gICAgICAgIGN1c3RvbVN2Z1VybDogY3VzdG9tU3ZnVXJsIHx8IG51bGwsXHJcbiAgICAgIH0sXHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyBjYXRlZ29yaWEgfSk7XHJcbiAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJvIGFvIGNyaWFyIGNhdGVnb3JpYTpcIiwgZXJyb3IpO1xyXG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKFxyXG4gICAgICB7IGVycm9yOiBcIkVycm8gaW50ZXJubyBkbyBzZXJ2aWRvclwiIH0sXHJcbiAgICAgIHsgc3RhdHVzOiA1MDAgfVxyXG4gICAgKTtcclxuICB9XHJcbn1cclxuIl0sIm5hbWVzIjpbIk5leHRSZXNwb25zZSIsInByaXNtYSIsImp3dCIsIkdFVCIsInJlcSIsInRva2VuIiwiY29va2llcyIsImdldCIsInZhbHVlIiwianNvbiIsImVycm9yIiwic3RhdHVzIiwidXNlcklkIiwiZGVjb2RlZCIsInZlcmlmeSIsInByb2Nlc3MiLCJlbnYiLCJKV1RfU0VDUkVUIiwic3ViIiwidXNlciIsImZpbmRVbmlxdWUiLCJ3aGVyZSIsImlkIiwic2VsZWN0Iiwicm9sZSIsImNhdGVnb3JpYXMiLCJjYXRlZ29yaWEiLCJmaW5kTWFueSIsIm9yZGVyQnkiLCJub21lIiwiY29uc29sZSIsIlBPU1QiLCJjb3IiLCJpY29uZSIsImN1c3RvbVN2Z1VybCIsImNhdGVnb3JpYUV4aXN0ZW50ZSIsImNyZWF0ZSIsImRhdGEiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./app/api/admin/categorias/route.ts\n");

/***/ }),

/***/ "(rsc)/./lib/prisma.ts":
/*!***********************!*\
  !*** ./lib/prisma.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__),\n/* harmony export */   prisma: () => (/* binding */ prisma)\n/* harmony export */ });\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @prisma/client */ \"@prisma/client\");\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_prisma_client__WEBPACK_IMPORTED_MODULE_0__);\n\nconst globalForPrisma = globalThis;\nconst prisma = globalForPrisma.prisma || new _prisma_client__WEBPACK_IMPORTED_MODULE_0__.PrismaClient({\n    log: [\n        \"query\",\n        \"error\",\n        \"warn\"\n    ]\n});\nif (true) globalForPrisma.prisma = prisma;\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (prisma);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvcHJpc21hLnRzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBOEM7QUFFOUMsTUFBTUMsa0JBQWtCQztBQUVqQixNQUFNQyxTQUNYRixnQkFBZ0JFLE1BQU0sSUFDdEIsSUFBSUgsd0RBQVlBLENBQUM7SUFDZkksS0FBSztRQUFDO1FBQVM7UUFBUztLQUFPO0FBQ2pDLEdBQUc7QUFFTCxJQUFJQyxJQUFxQyxFQUFFSixnQkFBZ0JFLE1BQU0sR0FBR0E7QUFFcEUsaUVBQWVBLE1BQU1BLEVBQUMiLCJzb3VyY2VzIjpbIkM6XFxVc2Vyc1xcR2FicmllbCBUb3JyZXNcXERlc2t0b3BcXE1ldXMgQ2xpZW50ZXNcXEVyaWNrXFzDgXJlYSBkZSBNZW1icm9zXFxhcmVhX2RlX21lbWJyb3NcXGxpYlxccHJpc21hLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFByaXNtYUNsaWVudCB9IGZyb20gXCJAcHJpc21hL2NsaWVudFwiO1xyXG5cclxuY29uc3QgZ2xvYmFsRm9yUHJpc21hID0gZ2xvYmFsVGhpcyBhcyB1bmtub3duIGFzIHsgcHJpc21hOiBQcmlzbWFDbGllbnQgfTtcclxuXHJcbmV4cG9ydCBjb25zdCBwcmlzbWEgPVxyXG4gIGdsb2JhbEZvclByaXNtYS5wcmlzbWEgfHxcclxuICBuZXcgUHJpc21hQ2xpZW50KHtcclxuICAgIGxvZzogW1wicXVlcnlcIiwgXCJlcnJvclwiLCBcIndhcm5cIl0sXHJcbiAgfSk7XHJcblxyXG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSBnbG9iYWxGb3JQcmlzbWEucHJpc21hID0gcHJpc21hO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgcHJpc21hO1xyXG4iXSwibmFtZXMiOlsiUHJpc21hQ2xpZW50IiwiZ2xvYmFsRm9yUHJpc21hIiwiZ2xvYmFsVGhpcyIsInByaXNtYSIsImxvZyIsInByb2Nlc3MiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./lib/prisma.ts\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fadmin%2Fcategorias%2Froute&page=%2Fapi%2Fadmin%2Fcategorias%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fadmin%2Fcategorias%2Froute.ts&appDir=C%3A%5CUsers%5CGabriel%20Torres%5CDesktop%5CMeus%20Clientes%5CErick%5C%C3%81rea%20de%20Membros%5Carea_de_membros%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CGabriel%20Torres%5CDesktop%5CMeus%20Clientes%5CErick%5C%C3%81rea%20de%20Membros%5Carea_de_membros&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fadmin%2Fcategorias%2Froute&page=%2Fapi%2Fadmin%2Fcategorias%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fadmin%2Fcategorias%2Froute.ts&appDir=C%3A%5CUsers%5CGabriel%20Torres%5CDesktop%5CMeus%20Clientes%5CErick%5C%C3%81rea%20de%20Membros%5Carea_de_membros%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CGabriel%20Torres%5CDesktop%5CMeus%20Clientes%5CErick%5C%C3%81rea%20de%20Membros%5Carea_de_membros&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var C_Users_Gabriel_Torres_Desktop_Meus_Clientes_Erick_rea_de_Membros_area_de_membros_app_api_admin_categorias_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/admin/categorias/route.ts */ \"(rsc)/./app/api/admin/categorias/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/admin/categorias/route\",\n        pathname: \"/api/admin/categorias\",\n        filename: \"route\",\n        bundlePath: \"app/api/admin/categorias/route\"\n    },\n    resolvedPagePath: \"C:\\\\Users\\\\Gabriel Torres\\\\Desktop\\\\Meus Clientes\\\\Erick\\\\Área de Membros\\\\area_de_membros\\\\app\\\\api\\\\admin\\\\categorias\\\\route.ts\",\n    nextConfigOutput,\n    userland: C_Users_Gabriel_Torres_Desktop_Meus_Clientes_Erick_rea_de_Membros_area_de_membros_app_api_admin_categorias_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZhcGklMkZhZG1pbiUyRmNhdGVnb3JpYXMlMkZyb3V0ZSZwYWdlPSUyRmFwaSUyRmFkbWluJTJGY2F0ZWdvcmlhcyUyRnJvdXRlJmFwcFBhdGhzPSZwYWdlUGF0aD1wcml2YXRlLW5leHQtYXBwLWRpciUyRmFwaSUyRmFkbWluJTJGY2F0ZWdvcmlhcyUyRnJvdXRlLnRzJmFwcERpcj1DJTNBJTVDVXNlcnMlNUNHYWJyaWVsJTIwVG9ycmVzJTVDRGVza3RvcCU1Q01ldXMlMjBDbGllbnRlcyU1Q0VyaWNrJTVDJUMzJTgxcmVhJTIwZGUlMjBNZW1icm9zJTVDYXJlYV9kZV9tZW1icm9zJTVDYXBwJnBhZ2VFeHRlbnNpb25zPXRzeCZwYWdlRXh0ZW5zaW9ucz10cyZwYWdlRXh0ZW5zaW9ucz1qc3gmcGFnZUV4dGVuc2lvbnM9anMmcm9vdERpcj1DJTNBJTVDVXNlcnMlNUNHYWJyaWVsJTIwVG9ycmVzJTVDRGVza3RvcCU1Q01ldXMlMjBDbGllbnRlcyU1Q0VyaWNrJTVDJUMzJTgxcmVhJTIwZGUlMjBNZW1icm9zJTVDYXJlYV9kZV9tZW1icm9zJmlzRGV2PXRydWUmdHNjb25maWdQYXRoPXRzY29uZmlnLmpzb24mYmFzZVBhdGg9JmFzc2V0UHJlZml4PSZuZXh0Q29uZmlnT3V0cHV0PSZwcmVmZXJyZWRSZWdpb249Jm1pZGRsZXdhcmVDb25maWc9ZTMwJTNEISIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUErRjtBQUN2QztBQUNxQjtBQUNpRjtBQUM5SjtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IseUdBQW1CO0FBQzNDO0FBQ0EsY0FBYyxrRUFBUztBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsWUFBWTtBQUNaLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSxRQUFRLHNEQUFzRDtBQUM5RDtBQUNBLFdBQVcsNEVBQVc7QUFDdEI7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUMwRjs7QUFFMUYiLCJzb3VyY2VzIjpbIiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBcHBSb3V0ZVJvdXRlTW9kdWxlIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvcm91dGUtbW9kdWxlcy9hcHAtcm91dGUvbW9kdWxlLmNvbXBpbGVkXCI7XG5pbXBvcnQgeyBSb3V0ZUtpbmQgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9yb3V0ZS1raW5kXCI7XG5pbXBvcnQgeyBwYXRjaEZldGNoIGFzIF9wYXRjaEZldGNoIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvbGliL3BhdGNoLWZldGNoXCI7XG5pbXBvcnQgKiBhcyB1c2VybGFuZCBmcm9tIFwiQzpcXFxcVXNlcnNcXFxcR2FicmllbCBUb3JyZXNcXFxcRGVza3RvcFxcXFxNZXVzIENsaWVudGVzXFxcXEVyaWNrXFxcXMOBcmVhIGRlIE1lbWJyb3NcXFxcYXJlYV9kZV9tZW1icm9zXFxcXGFwcFxcXFxhcGlcXFxcYWRtaW5cXFxcY2F0ZWdvcmlhc1xcXFxyb3V0ZS50c1wiO1xuLy8gV2UgaW5qZWN0IHRoZSBuZXh0Q29uZmlnT3V0cHV0IGhlcmUgc28gdGhhdCB3ZSBjYW4gdXNlIHRoZW0gaW4gdGhlIHJvdXRlXG4vLyBtb2R1bGUuXG5jb25zdCBuZXh0Q29uZmlnT3V0cHV0ID0gXCJcIlxuY29uc3Qgcm91dGVNb2R1bGUgPSBuZXcgQXBwUm91dGVSb3V0ZU1vZHVsZSh7XG4gICAgZGVmaW5pdGlvbjoge1xuICAgICAgICBraW5kOiBSb3V0ZUtpbmQuQVBQX1JPVVRFLFxuICAgICAgICBwYWdlOiBcIi9hcGkvYWRtaW4vY2F0ZWdvcmlhcy9yb3V0ZVwiLFxuICAgICAgICBwYXRobmFtZTogXCIvYXBpL2FkbWluL2NhdGVnb3JpYXNcIixcbiAgICAgICAgZmlsZW5hbWU6IFwicm91dGVcIixcbiAgICAgICAgYnVuZGxlUGF0aDogXCJhcHAvYXBpL2FkbWluL2NhdGVnb3JpYXMvcm91dGVcIlxuICAgIH0sXG4gICAgcmVzb2x2ZWRQYWdlUGF0aDogXCJDOlxcXFxVc2Vyc1xcXFxHYWJyaWVsIFRvcnJlc1xcXFxEZXNrdG9wXFxcXE1ldXMgQ2xpZW50ZXNcXFxcRXJpY2tcXFxcw4FyZWEgZGUgTWVtYnJvc1xcXFxhcmVhX2RlX21lbWJyb3NcXFxcYXBwXFxcXGFwaVxcXFxhZG1pblxcXFxjYXRlZ29yaWFzXFxcXHJvdXRlLnRzXCIsXG4gICAgbmV4dENvbmZpZ091dHB1dCxcbiAgICB1c2VybGFuZFxufSk7XG4vLyBQdWxsIG91dCB0aGUgZXhwb3J0cyB0aGF0IHdlIG5lZWQgdG8gZXhwb3NlIGZyb20gdGhlIG1vZHVsZS4gVGhpcyBzaG91bGRcbi8vIGJlIGVsaW1pbmF0ZWQgd2hlbiB3ZSd2ZSBtb3ZlZCB0aGUgb3RoZXIgcm91dGVzIHRvIHRoZSBuZXcgZm9ybWF0LiBUaGVzZVxuLy8gYXJlIHVzZWQgdG8gaG9vayBpbnRvIHRoZSByb3V0ZS5cbmNvbnN0IHsgd29ya0FzeW5jU3RvcmFnZSwgd29ya1VuaXRBc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzIH0gPSByb3V0ZU1vZHVsZTtcbmZ1bmN0aW9uIHBhdGNoRmV0Y2goKSB7XG4gICAgcmV0dXJuIF9wYXRjaEZldGNoKHtcbiAgICAgICAgd29ya0FzeW5jU3RvcmFnZSxcbiAgICAgICAgd29ya1VuaXRBc3luY1N0b3JhZ2VcbiAgICB9KTtcbn1cbmV4cG9ydCB7IHJvdXRlTW9kdWxlLCB3b3JrQXN5bmNTdG9yYWdlLCB3b3JrVW5pdEFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MsIHBhdGNoRmV0Y2gsICB9O1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1hcHAtcm91dGUuanMubWFwIl0sIm5hbWVzIjpbXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fadmin%2Fcategorias%2Froute&page=%2Fapi%2Fadmin%2Fcategorias%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fadmin%2Fcategorias%2Froute.ts&appDir=C%3A%5CUsers%5CGabriel%20Torres%5CDesktop%5CMeus%20Clientes%5CErick%5C%C3%81rea%20de%20Membros%5Carea_de_membros%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CGabriel%20Torres%5CDesktop%5CMeus%20Clientes%5CErick%5C%C3%81rea%20de%20Membros%5Carea_de_membros&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

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
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/semver","vendor-chunks/jsonwebtoken","vendor-chunks/lodash.includes","vendor-chunks/jws","vendor-chunks/lodash.once","vendor-chunks/jwa","vendor-chunks/lodash.isinteger","vendor-chunks/ecdsa-sig-formatter","vendor-chunks/lodash.isplainobject","vendor-chunks/ms","vendor-chunks/lodash.isstring","vendor-chunks/lodash.isnumber","vendor-chunks/lodash.isboolean","vendor-chunks/safe-buffer","vendor-chunks/buffer-equal-constant-time"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fadmin%2Fcategorias%2Froute&page=%2Fapi%2Fadmin%2Fcategorias%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fadmin%2Fcategorias%2Froute.ts&appDir=C%3A%5CUsers%5CGabriel%20Torres%5CDesktop%5CMeus%20Clientes%5CErick%5C%C3%81rea%20de%20Membros%5Carea_de_membros%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CGabriel%20Torres%5CDesktop%5CMeus%20Clientes%5CErick%5C%C3%81rea%20de%20Membros%5Carea_de_membros&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();