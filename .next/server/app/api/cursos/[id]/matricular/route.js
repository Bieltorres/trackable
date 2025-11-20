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
exports.id = "app/api/cursos/[id]/matricular/route";
exports.ids = ["app/api/cursos/[id]/matricular/route"];
exports.modules = {

/***/ "(rsc)/./app/api/cursos/[id]/matricular/route.ts":
/*!*************************************************!*\
  !*** ./app/api/cursos/[id]/matricular/route.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   POST: () => (/* binding */ POST)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var _lib_prisma__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/lib/prisma */ \"(rsc)/./lib/prisma.ts\");\n/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! jsonwebtoken */ \"(rsc)/./node_modules/jsonwebtoken/index.js\");\n/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(jsonwebtoken__WEBPACK_IMPORTED_MODULE_2__);\n\n\n\nasync function POST(request, { params }) {\n    try {\n        const { id: cursoId } = await params;\n        // Verificar autenticação\n        const token = request.cookies.get(\"token\")?.value;\n        if (!token) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: \"Token de autenticação não encontrado\"\n            }, {\n                status: 401\n            });\n        }\n        let userId;\n        try {\n            const decoded = jsonwebtoken__WEBPACK_IMPORTED_MODULE_2___default().verify(token, process.env.JWT_SECRET);\n            userId = decoded.sub;\n        } catch (err) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: \"Token inválido\"\n            }, {\n                status: 401\n            });\n        }\n        // Buscar o curso\n        const curso = await _lib_prisma__WEBPACK_IMPORTED_MODULE_1__.prisma.curso.findUnique({\n            where: {\n                id: cursoId\n            },\n            select: {\n                id: true,\n                titulo: true,\n                preco: true,\n                gratuito: true,\n                status: true\n            }\n        });\n        if (!curso) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: \"Curso não encontrado\"\n            }, {\n                status: 404\n            });\n        }\n        // Verificar se o curso está publicado\n        if (curso.status !== \"publicado\") {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: \"Este curso não está disponível no momento\"\n            }, {\n                status: 400\n            });\n        }\n        // Verificar se é gratuito\n        const isGratuito = curso.gratuito || !curso.preco || Number(curso.preco) === 0;\n        if (!isGratuito) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: \"Este curso não é gratuito. É necessário efetuar o pagamento.\"\n            }, {\n                status: 400\n            });\n        }\n        // Verificar se o usuário já está matriculado\n        const matriculaExistente = await _lib_prisma__WEBPACK_IMPORTED_MODULE_1__.prisma.usuarioCurso.findUnique({\n            where: {\n                usuarioId_cursoId: {\n                    usuarioId: userId,\n                    cursoId: cursoId\n                }\n            }\n        });\n        if (matriculaExistente) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: \"Você já está matriculado neste curso\"\n            }, {\n                status: 400\n            });\n        }\n        // Criar a matrícula\n        const matricula = await _lib_prisma__WEBPACK_IMPORTED_MODULE_1__.prisma.usuarioCurso.create({\n            data: {\n                usuarioId: userId,\n                cursoId: cursoId,\n                status: \"nao-iniciado\",\n                dataCompra: new Date(),\n                precoGago: 0,\n                progresso: 0,\n                suspenso: false,\n                reembolsado: false\n            }\n        });\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            message: \"Matrícula realizada com sucesso!\",\n            matricula: {\n                id: matricula.id,\n                cursoId: matricula.cursoId,\n                status: matricula.status\n            }\n        });\n    } catch (error) {\n        console.error(\"Erro ao matricular no curso:\", error);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: \"Erro interno do servidor\"\n        }, {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL2N1cnNvcy9baWRdL21hdHJpY3VsYXIvcm91dGUudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBd0Q7QUFDbEI7QUFDUDtBQUV4QixlQUFlRyxLQUNwQkMsT0FBb0IsRUFDcEIsRUFBRUMsTUFBTSxFQUF1QztJQUUvQyxJQUFJO1FBQ0YsTUFBTSxFQUFFQyxJQUFJQyxPQUFPLEVBQUUsR0FBRyxNQUFNRjtRQUU5Qix5QkFBeUI7UUFDekIsTUFBTUcsUUFBUUosUUFBUUssT0FBTyxDQUFDQyxHQUFHLENBQUMsVUFBVUM7UUFDNUMsSUFBSSxDQUFDSCxPQUFPO1lBQ1YsT0FBT1IscURBQVlBLENBQUNZLElBQUksQ0FDdEI7Z0JBQUVDLE9BQU87WUFBdUMsR0FDaEQ7Z0JBQUVDLFFBQVE7WUFBSTtRQUVsQjtRQUVBLElBQUlDO1FBQ0osSUFBSTtZQUNGLE1BQU1DLFVBQVVkLDBEQUFVLENBQUNNLE9BQU9VLFFBQVFDLEdBQUcsQ0FBQ0MsVUFBVTtZQUd4REwsU0FBU0MsUUFBUUssR0FBRztRQUN0QixFQUFFLE9BQU9DLEtBQUs7WUFDWixPQUFPdEIscURBQVlBLENBQUNZLElBQUksQ0FBQztnQkFBRUMsT0FBTztZQUFpQixHQUFHO2dCQUFFQyxRQUFRO1lBQUk7UUFDdEU7UUFFQSxpQkFBaUI7UUFDakIsTUFBTVMsUUFBUSxNQUFNdEIsK0NBQU1BLENBQUNzQixLQUFLLENBQUNDLFVBQVUsQ0FBQztZQUMxQ0MsT0FBTztnQkFBRW5CLElBQUlDO1lBQVE7WUFDckJtQixRQUFRO2dCQUNOcEIsSUFBSTtnQkFDSnFCLFFBQVE7Z0JBQ1JDLE9BQU87Z0JBQ1BDLFVBQVU7Z0JBQ1ZmLFFBQVE7WUFDVjtRQUNGO1FBRUEsSUFBSSxDQUFDUyxPQUFPO1lBQ1YsT0FBT3ZCLHFEQUFZQSxDQUFDWSxJQUFJLENBQ3RCO2dCQUFFQyxPQUFPO1lBQXVCLEdBQ2hDO2dCQUFFQyxRQUFRO1lBQUk7UUFFbEI7UUFFQSxzQ0FBc0M7UUFDdEMsSUFBSVMsTUFBTVQsTUFBTSxLQUFLLGFBQWE7WUFDaEMsT0FBT2QscURBQVlBLENBQUNZLElBQUksQ0FDdEI7Z0JBQUVDLE9BQU87WUFBNEMsR0FDckQ7Z0JBQUVDLFFBQVE7WUFBSTtRQUVsQjtRQUVBLDBCQUEwQjtRQUMxQixNQUFNZ0IsYUFBYVAsTUFBTU0sUUFBUSxJQUFJLENBQUNOLE1BQU1LLEtBQUssSUFBSUcsT0FBT1IsTUFBTUssS0FBSyxNQUFNO1FBQzdFLElBQUksQ0FBQ0UsWUFBWTtZQUNmLE9BQU85QixxREFBWUEsQ0FBQ1ksSUFBSSxDQUN0QjtnQkFBRUMsT0FBTztZQUErRCxHQUN4RTtnQkFBRUMsUUFBUTtZQUFJO1FBRWxCO1FBRUEsNkNBQTZDO1FBQzdDLE1BQU1rQixxQkFBcUIsTUFBTS9CLCtDQUFNQSxDQUFDZ0MsWUFBWSxDQUFDVCxVQUFVLENBQUM7WUFDOURDLE9BQU87Z0JBQ0xTLG1CQUFtQjtvQkFDakJDLFdBQVdwQjtvQkFDWFIsU0FBU0E7Z0JBQ1g7WUFDRjtRQUNGO1FBRUEsSUFBSXlCLG9CQUFvQjtZQUN0QixPQUFPaEMscURBQVlBLENBQUNZLElBQUksQ0FDdEI7Z0JBQUVDLE9BQU87WUFBdUMsR0FDaEQ7Z0JBQUVDLFFBQVE7WUFBSTtRQUVsQjtRQUVBLG9CQUFvQjtRQUNwQixNQUFNc0IsWUFBWSxNQUFNbkMsK0NBQU1BLENBQUNnQyxZQUFZLENBQUNJLE1BQU0sQ0FBQztZQUNqREMsTUFBTTtnQkFDSkgsV0FBV3BCO2dCQUNYUixTQUFTQTtnQkFDVE8sUUFBUTtnQkFDUnlCLFlBQVksSUFBSUM7Z0JBQ2hCQyxXQUFXO2dCQUNYQyxXQUFXO2dCQUNYQyxVQUFVO2dCQUNWQyxhQUFhO1lBQ2Y7UUFDRjtRQUVBLE9BQU81QyxxREFBWUEsQ0FBQ1ksSUFBSSxDQUFDO1lBQ3ZCaUMsU0FBUztZQUNUVCxXQUFXO2dCQUNUOUIsSUFBSThCLFVBQVU5QixFQUFFO2dCQUNoQkMsU0FBUzZCLFVBQVU3QixPQUFPO2dCQUMxQk8sUUFBUXNCLFVBQVV0QixNQUFNO1lBQzFCO1FBQ0Y7SUFDRixFQUFFLE9BQU9ELE9BQU87UUFDZGlDLFFBQVFqQyxLQUFLLENBQUMsZ0NBQWdDQTtRQUM5QyxPQUFPYixxREFBWUEsQ0FBQ1ksSUFBSSxDQUN0QjtZQUFFQyxPQUFPO1FBQTJCLEdBQ3BDO1lBQUVDLFFBQVE7UUFBSTtJQUVsQjtBQUNGIiwic291cmNlcyI6WyJDOlxcVXNlcnNcXEdhYnJpZWwgVG9ycmVzXFxEZXNrdG9wXFxNZXVzIENsaWVudGVzXFxFcmlja1xcw4FyZWEgZGUgTWVtYnJvc1xcYXJlYV9kZV9tZW1icm9zXFxhcHBcXGFwaVxcY3Vyc29zXFxbaWRdXFxtYXRyaWN1bGFyXFxyb3V0ZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZXh0UmVxdWVzdCwgTmV4dFJlc3BvbnNlIH0gZnJvbSBcIm5leHQvc2VydmVyXCI7XHJcbmltcG9ydCB7IHByaXNtYSB9IGZyb20gXCJAL2xpYi9wcmlzbWFcIjtcclxuaW1wb3J0IGp3dCBmcm9tIFwianNvbndlYnRva2VuXCI7XHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gUE9TVChcclxuICByZXF1ZXN0OiBOZXh0UmVxdWVzdCxcclxuICB7IHBhcmFtcyB9OiB7IHBhcmFtczogUHJvbWlzZTx7IGlkOiBzdHJpbmcgfT4gfVxyXG4pIHtcclxuICB0cnkge1xyXG4gICAgY29uc3QgeyBpZDogY3Vyc29JZCB9ID0gYXdhaXQgcGFyYW1zO1xyXG5cclxuICAgIC8vIFZlcmlmaWNhciBhdXRlbnRpY2HDp8Ojb1xyXG4gICAgY29uc3QgdG9rZW4gPSByZXF1ZXN0LmNvb2tpZXMuZ2V0KFwidG9rZW5cIik/LnZhbHVlO1xyXG4gICAgaWYgKCF0b2tlbikge1xyXG4gICAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oXHJcbiAgICAgICAgeyBlcnJvcjogXCJUb2tlbiBkZSBhdXRlbnRpY2HDp8OjbyBuw6NvIGVuY29udHJhZG9cIiB9LFxyXG4gICAgICAgIHsgc3RhdHVzOiA0MDEgfVxyXG4gICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIGxldCB1c2VySWQ6IHN0cmluZztcclxuICAgIHRyeSB7XHJcbiAgICAgIGNvbnN0IGRlY29kZWQgPSBqd3QudmVyaWZ5KHRva2VuLCBwcm9jZXNzLmVudi5KV1RfU0VDUkVUISkgYXMge1xyXG4gICAgICAgIHN1Yjogc3RyaW5nO1xyXG4gICAgICB9O1xyXG4gICAgICB1c2VySWQgPSBkZWNvZGVkLnN1YjtcclxuICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyBlcnJvcjogXCJUb2tlbiBpbnbDoWxpZG9cIiB9LCB7IHN0YXR1czogNDAxIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIEJ1c2NhciBvIGN1cnNvXHJcbiAgICBjb25zdCBjdXJzbyA9IGF3YWl0IHByaXNtYS5jdXJzby5maW5kVW5pcXVlKHtcclxuICAgICAgd2hlcmU6IHsgaWQ6IGN1cnNvSWQgfSxcclxuICAgICAgc2VsZWN0OiB7XHJcbiAgICAgICAgaWQ6IHRydWUsXHJcbiAgICAgICAgdGl0dWxvOiB0cnVlLFxyXG4gICAgICAgIHByZWNvOiB0cnVlLFxyXG4gICAgICAgIGdyYXR1aXRvOiB0cnVlLFxyXG4gICAgICAgIHN0YXR1czogdHJ1ZSxcclxuICAgICAgfSxcclxuICAgIH0pO1xyXG5cclxuICAgIGlmICghY3Vyc28pIHtcclxuICAgICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKFxyXG4gICAgICAgIHsgZXJyb3I6IFwiQ3Vyc28gbsOjbyBlbmNvbnRyYWRvXCIgfSxcclxuICAgICAgICB7IHN0YXR1czogNDA0IH1cclxuICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBWZXJpZmljYXIgc2UgbyBjdXJzbyBlc3TDoSBwdWJsaWNhZG9cclxuICAgIGlmIChjdXJzby5zdGF0dXMgIT09IFwicHVibGljYWRvXCIpIHtcclxuICAgICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKFxyXG4gICAgICAgIHsgZXJyb3I6IFwiRXN0ZSBjdXJzbyBuw6NvIGVzdMOhIGRpc3BvbsOtdmVsIG5vIG1vbWVudG9cIiB9LFxyXG4gICAgICAgIHsgc3RhdHVzOiA0MDAgfVxyXG4gICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIFZlcmlmaWNhciBzZSDDqSBncmF0dWl0b1xyXG4gICAgY29uc3QgaXNHcmF0dWl0byA9IGN1cnNvLmdyYXR1aXRvIHx8ICFjdXJzby5wcmVjbyB8fCBOdW1iZXIoY3Vyc28ucHJlY28pID09PSAwO1xyXG4gICAgaWYgKCFpc0dyYXR1aXRvKSB7XHJcbiAgICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbihcclxuICAgICAgICB7IGVycm9yOiBcIkVzdGUgY3Vyc28gbsOjbyDDqSBncmF0dWl0by4gw4kgbmVjZXNzw6FyaW8gZWZldHVhciBvIHBhZ2FtZW50by5cIiB9LFxyXG4gICAgICAgIHsgc3RhdHVzOiA0MDAgfVxyXG4gICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIFZlcmlmaWNhciBzZSBvIHVzdcOhcmlvIGrDoSBlc3TDoSBtYXRyaWN1bGFkb1xyXG4gICAgY29uc3QgbWF0cmljdWxhRXhpc3RlbnRlID0gYXdhaXQgcHJpc21hLnVzdWFyaW9DdXJzby5maW5kVW5pcXVlKHtcclxuICAgICAgd2hlcmU6IHtcclxuICAgICAgICB1c3VhcmlvSWRfY3Vyc29JZDoge1xyXG4gICAgICAgICAgdXN1YXJpb0lkOiB1c2VySWQsXHJcbiAgICAgICAgICBjdXJzb0lkOiBjdXJzb0lkLFxyXG4gICAgICAgIH0sXHJcbiAgICAgIH0sXHJcbiAgICB9KTtcclxuXHJcbiAgICBpZiAobWF0cmljdWxhRXhpc3RlbnRlKSB7XHJcbiAgICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbihcclxuICAgICAgICB7IGVycm9yOiBcIlZvY8OqIGrDoSBlc3TDoSBtYXRyaWN1bGFkbyBuZXN0ZSBjdXJzb1wiIH0sXHJcbiAgICAgICAgeyBzdGF0dXM6IDQwMCB9XHJcbiAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gQ3JpYXIgYSBtYXRyw61jdWxhXHJcbiAgICBjb25zdCBtYXRyaWN1bGEgPSBhd2FpdCBwcmlzbWEudXN1YXJpb0N1cnNvLmNyZWF0ZSh7XHJcbiAgICAgIGRhdGE6IHtcclxuICAgICAgICB1c3VhcmlvSWQ6IHVzZXJJZCxcclxuICAgICAgICBjdXJzb0lkOiBjdXJzb0lkLFxyXG4gICAgICAgIHN0YXR1czogXCJuYW8taW5pY2lhZG9cIixcclxuICAgICAgICBkYXRhQ29tcHJhOiBuZXcgRGF0ZSgpLFxyXG4gICAgICAgIHByZWNvR2FnbzogMCxcclxuICAgICAgICBwcm9ncmVzc286IDAsXHJcbiAgICAgICAgc3VzcGVuc286IGZhbHNlLFxyXG4gICAgICAgIHJlZW1ib2xzYWRvOiBmYWxzZSxcclxuICAgICAgfSxcclxuICAgIH0pO1xyXG5cclxuICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7XHJcbiAgICAgIG1lc3NhZ2U6IFwiTWF0csOtY3VsYSByZWFsaXphZGEgY29tIHN1Y2Vzc28hXCIsXHJcbiAgICAgIG1hdHJpY3VsYToge1xyXG4gICAgICAgIGlkOiBtYXRyaWN1bGEuaWQsXHJcbiAgICAgICAgY3Vyc29JZDogbWF0cmljdWxhLmN1cnNvSWQsXHJcbiAgICAgICAgc3RhdHVzOiBtYXRyaWN1bGEuc3RhdHVzLFxyXG4gICAgICB9LFxyXG4gICAgfSk7XHJcbiAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJvIGFvIG1hdHJpY3VsYXIgbm8gY3Vyc286XCIsIGVycm9yKTtcclxuICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbihcclxuICAgICAgeyBlcnJvcjogXCJFcnJvIGludGVybm8gZG8gc2Vydmlkb3JcIiB9LFxyXG4gICAgICB7IHN0YXR1czogNTAwIH1cclxuICAgICk7XHJcbiAgfVxyXG59XHJcbiJdLCJuYW1lcyI6WyJOZXh0UmVzcG9uc2UiLCJwcmlzbWEiLCJqd3QiLCJQT1NUIiwicmVxdWVzdCIsInBhcmFtcyIsImlkIiwiY3Vyc29JZCIsInRva2VuIiwiY29va2llcyIsImdldCIsInZhbHVlIiwianNvbiIsImVycm9yIiwic3RhdHVzIiwidXNlcklkIiwiZGVjb2RlZCIsInZlcmlmeSIsInByb2Nlc3MiLCJlbnYiLCJKV1RfU0VDUkVUIiwic3ViIiwiZXJyIiwiY3Vyc28iLCJmaW5kVW5pcXVlIiwid2hlcmUiLCJzZWxlY3QiLCJ0aXR1bG8iLCJwcmVjbyIsImdyYXR1aXRvIiwiaXNHcmF0dWl0byIsIk51bWJlciIsIm1hdHJpY3VsYUV4aXN0ZW50ZSIsInVzdWFyaW9DdXJzbyIsInVzdWFyaW9JZF9jdXJzb0lkIiwidXN1YXJpb0lkIiwibWF0cmljdWxhIiwiY3JlYXRlIiwiZGF0YSIsImRhdGFDb21wcmEiLCJEYXRlIiwicHJlY29HYWdvIiwicHJvZ3Jlc3NvIiwic3VzcGVuc28iLCJyZWVtYm9sc2FkbyIsIm1lc3NhZ2UiLCJjb25zb2xlIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./app/api/cursos/[id]/matricular/route.ts\n");

/***/ }),

/***/ "(rsc)/./lib/prisma.ts":
/*!***********************!*\
  !*** ./lib/prisma.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__),\n/* harmony export */   prisma: () => (/* binding */ prisma)\n/* harmony export */ });\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @prisma/client */ \"@prisma/client\");\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_prisma_client__WEBPACK_IMPORTED_MODULE_0__);\n\nconst globalForPrisma = globalThis;\nconst prisma = globalForPrisma.prisma || new _prisma_client__WEBPACK_IMPORTED_MODULE_0__.PrismaClient({\n    log: [\n        \"query\",\n        \"error\",\n        \"warn\"\n    ]\n});\nif (true) globalForPrisma.prisma = prisma;\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (prisma);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvcHJpc21hLnRzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBOEM7QUFFOUMsTUFBTUMsa0JBQWtCQztBQUVqQixNQUFNQyxTQUNYRixnQkFBZ0JFLE1BQU0sSUFDdEIsSUFBSUgsd0RBQVlBLENBQUM7SUFDZkksS0FBSztRQUFDO1FBQVM7UUFBUztLQUFPO0FBQ2pDLEdBQUc7QUFFTCxJQUFJQyxJQUFxQyxFQUFFSixnQkFBZ0JFLE1BQU0sR0FBR0E7QUFFcEUsaUVBQWVBLE1BQU1BLEVBQUMiLCJzb3VyY2VzIjpbIkM6XFxVc2Vyc1xcR2FicmllbCBUb3JyZXNcXERlc2t0b3BcXE1ldXMgQ2xpZW50ZXNcXEVyaWNrXFzDgXJlYSBkZSBNZW1icm9zXFxhcmVhX2RlX21lbWJyb3NcXGxpYlxccHJpc21hLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFByaXNtYUNsaWVudCB9IGZyb20gXCJAcHJpc21hL2NsaWVudFwiO1xyXG5cclxuY29uc3QgZ2xvYmFsRm9yUHJpc21hID0gZ2xvYmFsVGhpcyBhcyB1bmtub3duIGFzIHsgcHJpc21hOiBQcmlzbWFDbGllbnQgfTtcclxuXHJcbmV4cG9ydCBjb25zdCBwcmlzbWEgPVxyXG4gIGdsb2JhbEZvclByaXNtYS5wcmlzbWEgfHxcclxuICBuZXcgUHJpc21hQ2xpZW50KHtcclxuICAgIGxvZzogW1wicXVlcnlcIiwgXCJlcnJvclwiLCBcIndhcm5cIl0sXHJcbiAgfSk7XHJcblxyXG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSBnbG9iYWxGb3JQcmlzbWEucHJpc21hID0gcHJpc21hO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgcHJpc21hO1xyXG4iXSwibmFtZXMiOlsiUHJpc21hQ2xpZW50IiwiZ2xvYmFsRm9yUHJpc21hIiwiZ2xvYmFsVGhpcyIsInByaXNtYSIsImxvZyIsInByb2Nlc3MiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./lib/prisma.ts\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fcursos%2F%5Bid%5D%2Fmatricular%2Froute&page=%2Fapi%2Fcursos%2F%5Bid%5D%2Fmatricular%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fcursos%2F%5Bid%5D%2Fmatricular%2Froute.ts&appDir=C%3A%5CUsers%5CGabriel%20Torres%5CDesktop%5CMeus%20Clientes%5CErick%5C%C3%81rea%20de%20Membros%5Carea_de_membros%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CGabriel%20Torres%5CDesktop%5CMeus%20Clientes%5CErick%5C%C3%81rea%20de%20Membros%5Carea_de_membros&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fcursos%2F%5Bid%5D%2Fmatricular%2Froute&page=%2Fapi%2Fcursos%2F%5Bid%5D%2Fmatricular%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fcursos%2F%5Bid%5D%2Fmatricular%2Froute.ts&appDir=C%3A%5CUsers%5CGabriel%20Torres%5CDesktop%5CMeus%20Clientes%5CErick%5C%C3%81rea%20de%20Membros%5Carea_de_membros%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CGabriel%20Torres%5CDesktop%5CMeus%20Clientes%5CErick%5C%C3%81rea%20de%20Membros%5Carea_de_membros&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var C_Users_Gabriel_Torres_Desktop_Meus_Clientes_Erick_rea_de_Membros_area_de_membros_app_api_cursos_id_matricular_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/cursos/[id]/matricular/route.ts */ \"(rsc)/./app/api/cursos/[id]/matricular/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/cursos/[id]/matricular/route\",\n        pathname: \"/api/cursos/[id]/matricular\",\n        filename: \"route\",\n        bundlePath: \"app/api/cursos/[id]/matricular/route\"\n    },\n    resolvedPagePath: \"C:\\\\Users\\\\Gabriel Torres\\\\Desktop\\\\Meus Clientes\\\\Erick\\\\Área de Membros\\\\area_de_membros\\\\app\\\\api\\\\cursos\\\\[id]\\\\matricular\\\\route.ts\",\n    nextConfigOutput,\n    userland: C_Users_Gabriel_Torres_Desktop_Meus_Clientes_Erick_rea_de_Membros_area_de_membros_app_api_cursos_id_matricular_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZhcGklMkZjdXJzb3MlMkYlNUJpZCU1RCUyRm1hdHJpY3VsYXIlMkZyb3V0ZSZwYWdlPSUyRmFwaSUyRmN1cnNvcyUyRiU1QmlkJTVEJTJGbWF0cmljdWxhciUyRnJvdXRlJmFwcFBhdGhzPSZwYWdlUGF0aD1wcml2YXRlLW5leHQtYXBwLWRpciUyRmFwaSUyRmN1cnNvcyUyRiU1QmlkJTVEJTJGbWF0cmljdWxhciUyRnJvdXRlLnRzJmFwcERpcj1DJTNBJTVDVXNlcnMlNUNHYWJyaWVsJTIwVG9ycmVzJTVDRGVza3RvcCU1Q01ldXMlMjBDbGllbnRlcyU1Q0VyaWNrJTVDJUMzJTgxcmVhJTIwZGUlMjBNZW1icm9zJTVDYXJlYV9kZV9tZW1icm9zJTVDYXBwJnBhZ2VFeHRlbnNpb25zPXRzeCZwYWdlRXh0ZW5zaW9ucz10cyZwYWdlRXh0ZW5zaW9ucz1qc3gmcGFnZUV4dGVuc2lvbnM9anMmcm9vdERpcj1DJTNBJTVDVXNlcnMlNUNHYWJyaWVsJTIwVG9ycmVzJTVDRGVza3RvcCU1Q01ldXMlMjBDbGllbnRlcyU1Q0VyaWNrJTVDJUMzJTgxcmVhJTIwZGUlMjBNZW1icm9zJTVDYXJlYV9kZV9tZW1icm9zJmlzRGV2PXRydWUmdHNjb25maWdQYXRoPXRzY29uZmlnLmpzb24mYmFzZVBhdGg9JmFzc2V0UHJlZml4PSZuZXh0Q29uZmlnT3V0cHV0PSZwcmVmZXJyZWRSZWdpb249Jm1pZGRsZXdhcmVDb25maWc9ZTMwJTNEISIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUErRjtBQUN2QztBQUNxQjtBQUN3RjtBQUNySztBQUNBO0FBQ0E7QUFDQSx3QkFBd0IseUdBQW1CO0FBQzNDO0FBQ0EsY0FBYyxrRUFBUztBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsWUFBWTtBQUNaLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSxRQUFRLHNEQUFzRDtBQUM5RDtBQUNBLFdBQVcsNEVBQVc7QUFDdEI7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUMwRjs7QUFFMUYiLCJzb3VyY2VzIjpbIiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBcHBSb3V0ZVJvdXRlTW9kdWxlIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvcm91dGUtbW9kdWxlcy9hcHAtcm91dGUvbW9kdWxlLmNvbXBpbGVkXCI7XG5pbXBvcnQgeyBSb3V0ZUtpbmQgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9yb3V0ZS1raW5kXCI7XG5pbXBvcnQgeyBwYXRjaEZldGNoIGFzIF9wYXRjaEZldGNoIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvbGliL3BhdGNoLWZldGNoXCI7XG5pbXBvcnQgKiBhcyB1c2VybGFuZCBmcm9tIFwiQzpcXFxcVXNlcnNcXFxcR2FicmllbCBUb3JyZXNcXFxcRGVza3RvcFxcXFxNZXVzIENsaWVudGVzXFxcXEVyaWNrXFxcXMOBcmVhIGRlIE1lbWJyb3NcXFxcYXJlYV9kZV9tZW1icm9zXFxcXGFwcFxcXFxhcGlcXFxcY3Vyc29zXFxcXFtpZF1cXFxcbWF0cmljdWxhclxcXFxyb3V0ZS50c1wiO1xuLy8gV2UgaW5qZWN0IHRoZSBuZXh0Q29uZmlnT3V0cHV0IGhlcmUgc28gdGhhdCB3ZSBjYW4gdXNlIHRoZW0gaW4gdGhlIHJvdXRlXG4vLyBtb2R1bGUuXG5jb25zdCBuZXh0Q29uZmlnT3V0cHV0ID0gXCJcIlxuY29uc3Qgcm91dGVNb2R1bGUgPSBuZXcgQXBwUm91dGVSb3V0ZU1vZHVsZSh7XG4gICAgZGVmaW5pdGlvbjoge1xuICAgICAgICBraW5kOiBSb3V0ZUtpbmQuQVBQX1JPVVRFLFxuICAgICAgICBwYWdlOiBcIi9hcGkvY3Vyc29zL1tpZF0vbWF0cmljdWxhci9yb3V0ZVwiLFxuICAgICAgICBwYXRobmFtZTogXCIvYXBpL2N1cnNvcy9baWRdL21hdHJpY3VsYXJcIixcbiAgICAgICAgZmlsZW5hbWU6IFwicm91dGVcIixcbiAgICAgICAgYnVuZGxlUGF0aDogXCJhcHAvYXBpL2N1cnNvcy9baWRdL21hdHJpY3VsYXIvcm91dGVcIlxuICAgIH0sXG4gICAgcmVzb2x2ZWRQYWdlUGF0aDogXCJDOlxcXFxVc2Vyc1xcXFxHYWJyaWVsIFRvcnJlc1xcXFxEZXNrdG9wXFxcXE1ldXMgQ2xpZW50ZXNcXFxcRXJpY2tcXFxcw4FyZWEgZGUgTWVtYnJvc1xcXFxhcmVhX2RlX21lbWJyb3NcXFxcYXBwXFxcXGFwaVxcXFxjdXJzb3NcXFxcW2lkXVxcXFxtYXRyaWN1bGFyXFxcXHJvdXRlLnRzXCIsXG4gICAgbmV4dENvbmZpZ091dHB1dCxcbiAgICB1c2VybGFuZFxufSk7XG4vLyBQdWxsIG91dCB0aGUgZXhwb3J0cyB0aGF0IHdlIG5lZWQgdG8gZXhwb3NlIGZyb20gdGhlIG1vZHVsZS4gVGhpcyBzaG91bGRcbi8vIGJlIGVsaW1pbmF0ZWQgd2hlbiB3ZSd2ZSBtb3ZlZCB0aGUgb3RoZXIgcm91dGVzIHRvIHRoZSBuZXcgZm9ybWF0LiBUaGVzZVxuLy8gYXJlIHVzZWQgdG8gaG9vayBpbnRvIHRoZSByb3V0ZS5cbmNvbnN0IHsgd29ya0FzeW5jU3RvcmFnZSwgd29ya1VuaXRBc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzIH0gPSByb3V0ZU1vZHVsZTtcbmZ1bmN0aW9uIHBhdGNoRmV0Y2goKSB7XG4gICAgcmV0dXJuIF9wYXRjaEZldGNoKHtcbiAgICAgICAgd29ya0FzeW5jU3RvcmFnZSxcbiAgICAgICAgd29ya1VuaXRBc3luY1N0b3JhZ2VcbiAgICB9KTtcbn1cbmV4cG9ydCB7IHJvdXRlTW9kdWxlLCB3b3JrQXN5bmNTdG9yYWdlLCB3b3JrVW5pdEFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MsIHBhdGNoRmV0Y2gsICB9O1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1hcHAtcm91dGUuanMubWFwIl0sIm5hbWVzIjpbXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fcursos%2F%5Bid%5D%2Fmatricular%2Froute&page=%2Fapi%2Fcursos%2F%5Bid%5D%2Fmatricular%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fcursos%2F%5Bid%5D%2Fmatricular%2Froute.ts&appDir=C%3A%5CUsers%5CGabriel%20Torres%5CDesktop%5CMeus%20Clientes%5CErick%5C%C3%81rea%20de%20Membros%5Carea_de_membros%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CGabriel%20Torres%5CDesktop%5CMeus%20Clientes%5CErick%5C%C3%81rea%20de%20Membros%5Carea_de_membros&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

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
var __webpack_require__ = require("../../../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/semver","vendor-chunks/jsonwebtoken","vendor-chunks/lodash.includes","vendor-chunks/jws","vendor-chunks/lodash.once","vendor-chunks/jwa","vendor-chunks/lodash.isinteger","vendor-chunks/ecdsa-sig-formatter","vendor-chunks/lodash.isplainobject","vendor-chunks/ms","vendor-chunks/lodash.isstring","vendor-chunks/lodash.isnumber","vendor-chunks/lodash.isboolean","vendor-chunks/safe-buffer","vendor-chunks/buffer-equal-constant-time"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fcursos%2F%5Bid%5D%2Fmatricular%2Froute&page=%2Fapi%2Fcursos%2F%5Bid%5D%2Fmatricular%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fcursos%2F%5Bid%5D%2Fmatricular%2Froute.ts&appDir=C%3A%5CUsers%5CGabriel%20Torres%5CDesktop%5CMeus%20Clientes%5CErick%5C%C3%81rea%20de%20Membros%5Carea_de_membros%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CGabriel%20Torres%5CDesktop%5CMeus%20Clientes%5CErick%5C%C3%81rea%20de%20Membros%5Carea_de_membros&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();