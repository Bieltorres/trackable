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
exports.id = "app/api/cursos/route";
exports.ids = ["app/api/cursos/route"];
exports.modules = {

/***/ "(rsc)/./app/api/cursos/route.ts":
/*!*********************************!*\
  !*** ./app/api/cursos/route.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ GET)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var _lib_prisma__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/lib/prisma */ \"(rsc)/./lib/prisma.ts\");\n\n\nasync function GET(request) {\n    try {\n        const { searchParams } = new URL(request.url);\n        const categoria = searchParams.get(\"categoria\");\n        const nivel = searchParams.get(\"nivel\");\n        const search = searchParams.get(\"search\");\n        const page = parseInt(searchParams.get(\"page\") || \"1\");\n        const limit = parseInt(searchParams.get(\"limit\") || \"10\");\n        const skip = (page - 1) * limit;\n        const where = {\n            status: \"publicado\"\n        };\n        if (categoria) {\n            where.categoria = {\n                nome: categoria\n            };\n        }\n        if (nivel) {\n            where.nivel = nivel;\n        }\n        if (search) {\n            where.OR = [\n                {\n                    titulo: {\n                        contains: search,\n                        mode: \"insensitive\"\n                    }\n                },\n                {\n                    descricao: {\n                        contains: search,\n                        mode: \"insensitive\"\n                    }\n                }\n            ];\n        }\n        const [cursos, total] = await Promise.all([\n            _lib_prisma__WEBPACK_IMPORTED_MODULE_1__[\"default\"].curso.findMany({\n                where,\n                include: {\n                    categoria: true,\n                    _count: {\n                        select: {\n                            usuarioCursos: true,\n                            avaliacoes: true\n                        }\n                    }\n                },\n                orderBy: {\n                    createdAt: \"desc\"\n                },\n                skip,\n                take: limit\n            }),\n            _lib_prisma__WEBPACK_IMPORTED_MODULE_1__[\"default\"].curso.count({\n                where\n            })\n        ]);\n        // Calcular média de avaliações para cada curso\n        const cursosComMedia = await Promise.all(cursos.map(async (curso)=>{\n            const avaliacoes = await _lib_prisma__WEBPACK_IMPORTED_MODULE_1__[\"default\"].cursoAvaliacao.findMany({\n                where: {\n                    cursoId: curso.id\n                },\n                select: {\n                    nota: true\n                }\n            });\n            const mediaAvaliacoes = avaliacoes.length > 0 ? avaliacoes.reduce((sum, av)=>sum + av.nota, 0) / avaliacoes.length : 0;\n            return {\n                ...curso,\n                mediaAvaliacoes: Math.round(mediaAvaliacoes * 10) / 10\n            };\n        }));\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            data: cursosComMedia,\n            total,\n            page,\n            limit,\n            totalPages: Math.ceil(total / limit)\n        });\n    } catch (error) {\n        console.error(\"Erro ao buscar cursos:\", error);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: \"Erro interno do servidor\"\n        }, {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL2N1cnNvcy9yb3V0ZS50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7QUFBd0Q7QUFDdEI7QUFFM0IsZUFBZUUsSUFBSUMsT0FBb0I7SUFDNUMsSUFBSTtRQUNGLE1BQU0sRUFBRUMsWUFBWSxFQUFFLEdBQUcsSUFBSUMsSUFBSUYsUUFBUUcsR0FBRztRQUM1QyxNQUFNQyxZQUFZSCxhQUFhSSxHQUFHLENBQUM7UUFDbkMsTUFBTUMsUUFBUUwsYUFBYUksR0FBRyxDQUFDO1FBQy9CLE1BQU1FLFNBQVNOLGFBQWFJLEdBQUcsQ0FBQztRQUNoQyxNQUFNRyxPQUFPQyxTQUFTUixhQUFhSSxHQUFHLENBQUMsV0FBVztRQUNsRCxNQUFNSyxRQUFRRCxTQUFTUixhQUFhSSxHQUFHLENBQUMsWUFBWTtRQUNwRCxNQUFNTSxPQUFPLENBQUNILE9BQU8sS0FBS0U7UUFFMUIsTUFBTUUsUUFBYTtZQUNqQkMsUUFBUTtRQUNWO1FBRUEsSUFBSVQsV0FBVztZQUNiUSxNQUFNUixTQUFTLEdBQUc7Z0JBQ2hCVSxNQUFNVjtZQUNSO1FBQ0Y7UUFFQSxJQUFJRSxPQUFPO1lBQ1RNLE1BQU1OLEtBQUssR0FBR0E7UUFDaEI7UUFFQSxJQUFJQyxRQUFRO1lBQ1ZLLE1BQU1HLEVBQUUsR0FBRztnQkFDVDtvQkFBRUMsUUFBUTt3QkFBRUMsVUFBVVY7d0JBQVFXLE1BQU07b0JBQWM7Z0JBQUU7Z0JBQ3BEO29CQUFFQyxXQUFXO3dCQUFFRixVQUFVVjt3QkFBUVcsTUFBTTtvQkFBYztnQkFBRTthQUN4RDtRQUNIO1FBRUEsTUFBTSxDQUFDRSxRQUFRQyxNQUFNLEdBQUcsTUFBTUMsUUFBUUMsR0FBRyxDQUFDO1lBQ3hDekIsbURBQU1BLENBQUMwQixLQUFLLENBQUNDLFFBQVEsQ0FBQztnQkFDcEJiO2dCQUNBYyxTQUFTO29CQUNQdEIsV0FBVztvQkFDWHVCLFFBQVE7d0JBQ05DLFFBQVE7NEJBQ05DLGVBQWU7NEJBQ2ZDLFlBQVk7d0JBQ2Q7b0JBQ0Y7Z0JBQ0Y7Z0JBQ0FDLFNBQVM7b0JBQ1BDLFdBQVc7Z0JBQ2I7Z0JBQ0FyQjtnQkFDQXNCLE1BQU12QjtZQUNSO1lBQ0FaLG1EQUFNQSxDQUFDMEIsS0FBSyxDQUFDVSxLQUFLLENBQUM7Z0JBQUV0QjtZQUFNO1NBQzVCO1FBRUQsK0NBQStDO1FBQy9DLE1BQU11QixpQkFBaUIsTUFBTWIsUUFBUUMsR0FBRyxDQUN0Q0gsT0FBT2dCLEdBQUcsQ0FBQyxPQUFPWjtZQUNoQixNQUFNTSxhQUFhLE1BQU1oQyxtREFBTUEsQ0FBQ3VDLGNBQWMsQ0FBQ1osUUFBUSxDQUFDO2dCQUN0RGIsT0FBTztvQkFBRTBCLFNBQVNkLE1BQU1lLEVBQUU7Z0JBQUM7Z0JBQzNCWCxRQUFRO29CQUFFWSxNQUFNO2dCQUFLO1lBQ3ZCO1lBRUEsTUFBTUMsa0JBQ0pYLFdBQVdZLE1BQU0sR0FBRyxJQUNoQlosV0FBV2EsTUFBTSxDQUFDLENBQUNDLEtBQUtDLEtBQU9ELE1BQU1DLEdBQUdMLElBQUksRUFBRSxLQUM5Q1YsV0FBV1ksTUFBTSxHQUNqQjtZQUVOLE9BQU87Z0JBQ0wsR0FBR2xCLEtBQUs7Z0JBQ1JpQixpQkFBaUJLLEtBQUtDLEtBQUssQ0FBQ04sa0JBQWtCLE1BQU07WUFDdEQ7UUFDRjtRQUdGLE9BQU81QyxxREFBWUEsQ0FBQ21ELElBQUksQ0FBQztZQUN2QkMsTUFBTWQ7WUFDTmQ7WUFDQWI7WUFDQUU7WUFDQXdDLFlBQVlKLEtBQUtLLElBQUksQ0FBQzlCLFFBQVFYO1FBQ2hDO0lBQ0YsRUFBRSxPQUFPMEMsT0FBTztRQUNkQyxRQUFRRCxLQUFLLENBQUMsMEJBQTBCQTtRQUN4QyxPQUFPdkQscURBQVlBLENBQUNtRCxJQUFJLENBQ3RCO1lBQUVJLE9BQU87UUFBMkIsR0FDcEM7WUFBRXZDLFFBQVE7UUFBSTtJQUVsQjtBQUNGIiwic291cmNlcyI6WyJDOlxcVXNlcnNcXEdhYnJpZWwgVG9ycmVzXFxEZXNrdG9wXFxNZXVzIENsaWVudGVzXFxFcmlja1xcw4FyZWEgZGUgTWVtYnJvc1xcYXJlYV9kZV9tZW1icm9zXFxhcHBcXGFwaVxcY3Vyc29zXFxyb3V0ZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZXh0UmVxdWVzdCwgTmV4dFJlc3BvbnNlIH0gZnJvbSBcIm5leHQvc2VydmVyXCI7XHJcbmltcG9ydCBwcmlzbWEgZnJvbSBcIkAvbGliL3ByaXNtYVwiO1xyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIEdFVChyZXF1ZXN0OiBOZXh0UmVxdWVzdCkge1xyXG4gIHRyeSB7XHJcbiAgICBjb25zdCB7IHNlYXJjaFBhcmFtcyB9ID0gbmV3IFVSTChyZXF1ZXN0LnVybCk7XHJcbiAgICBjb25zdCBjYXRlZ29yaWEgPSBzZWFyY2hQYXJhbXMuZ2V0KFwiY2F0ZWdvcmlhXCIpO1xyXG4gICAgY29uc3Qgbml2ZWwgPSBzZWFyY2hQYXJhbXMuZ2V0KFwibml2ZWxcIik7XHJcbiAgICBjb25zdCBzZWFyY2ggPSBzZWFyY2hQYXJhbXMuZ2V0KFwic2VhcmNoXCIpO1xyXG4gICAgY29uc3QgcGFnZSA9IHBhcnNlSW50KHNlYXJjaFBhcmFtcy5nZXQoXCJwYWdlXCIpIHx8IFwiMVwiKTtcclxuICAgIGNvbnN0IGxpbWl0ID0gcGFyc2VJbnQoc2VhcmNoUGFyYW1zLmdldChcImxpbWl0XCIpIHx8IFwiMTBcIik7XHJcbiAgICBjb25zdCBza2lwID0gKHBhZ2UgLSAxKSAqIGxpbWl0O1xyXG5cclxuICAgIGNvbnN0IHdoZXJlOiBhbnkgPSB7XHJcbiAgICAgIHN0YXR1czogXCJwdWJsaWNhZG9cIixcclxuICAgIH07XHJcblxyXG4gICAgaWYgKGNhdGVnb3JpYSkge1xyXG4gICAgICB3aGVyZS5jYXRlZ29yaWEgPSB7XHJcbiAgICAgICAgbm9tZTogY2F0ZWdvcmlhLFxyXG4gICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChuaXZlbCkge1xyXG4gICAgICB3aGVyZS5uaXZlbCA9IG5pdmVsO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChzZWFyY2gpIHtcclxuICAgICAgd2hlcmUuT1IgPSBbXHJcbiAgICAgICAgeyB0aXR1bG86IHsgY29udGFpbnM6IHNlYXJjaCwgbW9kZTogXCJpbnNlbnNpdGl2ZVwiIH0gfSxcclxuICAgICAgICB7IGRlc2NyaWNhbzogeyBjb250YWluczogc2VhcmNoLCBtb2RlOiBcImluc2Vuc2l0aXZlXCIgfSB9LFxyXG4gICAgICBdO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IFtjdXJzb3MsIHRvdGFsXSA9IGF3YWl0IFByb21pc2UuYWxsKFtcclxuICAgICAgcHJpc21hLmN1cnNvLmZpbmRNYW55KHtcclxuICAgICAgICB3aGVyZSxcclxuICAgICAgICBpbmNsdWRlOiB7XHJcbiAgICAgICAgICBjYXRlZ29yaWE6IHRydWUsXHJcbiAgICAgICAgICBfY291bnQ6IHtcclxuICAgICAgICAgICAgc2VsZWN0OiB7XHJcbiAgICAgICAgICAgICAgdXN1YXJpb0N1cnNvczogdHJ1ZSxcclxuICAgICAgICAgICAgICBhdmFsaWFjb2VzOiB0cnVlLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIG9yZGVyQnk6IHtcclxuICAgICAgICAgIGNyZWF0ZWRBdDogXCJkZXNjXCIsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBza2lwLFxyXG4gICAgICAgIHRha2U6IGxpbWl0LFxyXG4gICAgICB9KSxcclxuICAgICAgcHJpc21hLmN1cnNvLmNvdW50KHsgd2hlcmUgfSksXHJcbiAgICBdKTtcclxuXHJcbiAgICAvLyBDYWxjdWxhciBtw6lkaWEgZGUgYXZhbGlhw6fDtWVzIHBhcmEgY2FkYSBjdXJzb1xyXG4gICAgY29uc3QgY3Vyc29zQ29tTWVkaWEgPSBhd2FpdCBQcm9taXNlLmFsbChcclxuICAgICAgY3Vyc29zLm1hcChhc3luYyAoY3Vyc28pID0+IHtcclxuICAgICAgICBjb25zdCBhdmFsaWFjb2VzID0gYXdhaXQgcHJpc21hLmN1cnNvQXZhbGlhY2FvLmZpbmRNYW55KHtcclxuICAgICAgICAgIHdoZXJlOiB7IGN1cnNvSWQ6IGN1cnNvLmlkIH0sXHJcbiAgICAgICAgICBzZWxlY3Q6IHsgbm90YTogdHJ1ZSB9LFxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBjb25zdCBtZWRpYUF2YWxpYWNvZXMgPVxyXG4gICAgICAgICAgYXZhbGlhY29lcy5sZW5ndGggPiAwXHJcbiAgICAgICAgICAgID8gYXZhbGlhY29lcy5yZWR1Y2UoKHN1bSwgYXYpID0+IHN1bSArIGF2Lm5vdGEsIDApIC9cclxuICAgICAgICAgICAgICBhdmFsaWFjb2VzLmxlbmd0aFxyXG4gICAgICAgICAgICA6IDA7XHJcblxyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAuLi5jdXJzbyxcclxuICAgICAgICAgIG1lZGlhQXZhbGlhY29lczogTWF0aC5yb3VuZChtZWRpYUF2YWxpYWNvZXMgKiAxMCkgLyAxMCxcclxuICAgICAgICB9O1xyXG4gICAgICB9KVxyXG4gICAgKTtcclxuXHJcbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oe1xyXG4gICAgICBkYXRhOiBjdXJzb3NDb21NZWRpYSxcclxuICAgICAgdG90YWwsXHJcbiAgICAgIHBhZ2UsXHJcbiAgICAgIGxpbWl0LFxyXG4gICAgICB0b3RhbFBhZ2VzOiBNYXRoLmNlaWwodG90YWwgLyBsaW1pdCksXHJcbiAgICB9KTtcclxuICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgY29uc29sZS5lcnJvcihcIkVycm8gYW8gYnVzY2FyIGN1cnNvczpcIiwgZXJyb3IpO1xyXG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKFxyXG4gICAgICB7IGVycm9yOiBcIkVycm8gaW50ZXJubyBkbyBzZXJ2aWRvclwiIH0sXHJcbiAgICAgIHsgc3RhdHVzOiA1MDAgfVxyXG4gICAgKTtcclxuICB9XHJcbn1cclxuIl0sIm5hbWVzIjpbIk5leHRSZXNwb25zZSIsInByaXNtYSIsIkdFVCIsInJlcXVlc3QiLCJzZWFyY2hQYXJhbXMiLCJVUkwiLCJ1cmwiLCJjYXRlZ29yaWEiLCJnZXQiLCJuaXZlbCIsInNlYXJjaCIsInBhZ2UiLCJwYXJzZUludCIsImxpbWl0Iiwic2tpcCIsIndoZXJlIiwic3RhdHVzIiwibm9tZSIsIk9SIiwidGl0dWxvIiwiY29udGFpbnMiLCJtb2RlIiwiZGVzY3JpY2FvIiwiY3Vyc29zIiwidG90YWwiLCJQcm9taXNlIiwiYWxsIiwiY3Vyc28iLCJmaW5kTWFueSIsImluY2x1ZGUiLCJfY291bnQiLCJzZWxlY3QiLCJ1c3VhcmlvQ3Vyc29zIiwiYXZhbGlhY29lcyIsIm9yZGVyQnkiLCJjcmVhdGVkQXQiLCJ0YWtlIiwiY291bnQiLCJjdXJzb3NDb21NZWRpYSIsIm1hcCIsImN1cnNvQXZhbGlhY2FvIiwiY3Vyc29JZCIsImlkIiwibm90YSIsIm1lZGlhQXZhbGlhY29lcyIsImxlbmd0aCIsInJlZHVjZSIsInN1bSIsImF2IiwiTWF0aCIsInJvdW5kIiwianNvbiIsImRhdGEiLCJ0b3RhbFBhZ2VzIiwiY2VpbCIsImVycm9yIiwiY29uc29sZSJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./app/api/cursos/route.ts\n");

/***/ }),

/***/ "(rsc)/./lib/prisma.ts":
/*!***********************!*\
  !*** ./lib/prisma.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__),\n/* harmony export */   prisma: () => (/* binding */ prisma)\n/* harmony export */ });\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @prisma/client */ \"@prisma/client\");\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_prisma_client__WEBPACK_IMPORTED_MODULE_0__);\n\nconst globalForPrisma = globalThis;\nconst prisma = globalForPrisma.prisma || new _prisma_client__WEBPACK_IMPORTED_MODULE_0__.PrismaClient({\n    log: [\n        \"query\",\n        \"error\",\n        \"warn\"\n    ]\n});\nif (true) globalForPrisma.prisma = prisma;\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (prisma);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvcHJpc21hLnRzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBOEM7QUFFOUMsTUFBTUMsa0JBQWtCQztBQUVqQixNQUFNQyxTQUNYRixnQkFBZ0JFLE1BQU0sSUFDdEIsSUFBSUgsd0RBQVlBLENBQUM7SUFDZkksS0FBSztRQUFDO1FBQVM7UUFBUztLQUFPO0FBQ2pDLEdBQUc7QUFFTCxJQUFJQyxJQUFxQyxFQUFFSixnQkFBZ0JFLE1BQU0sR0FBR0E7QUFFcEUsaUVBQWVBLE1BQU1BLEVBQUMiLCJzb3VyY2VzIjpbIkM6XFxVc2Vyc1xcR2FicmllbCBUb3JyZXNcXERlc2t0b3BcXE1ldXMgQ2xpZW50ZXNcXEVyaWNrXFzDgXJlYSBkZSBNZW1icm9zXFxhcmVhX2RlX21lbWJyb3NcXGxpYlxccHJpc21hLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFByaXNtYUNsaWVudCB9IGZyb20gXCJAcHJpc21hL2NsaWVudFwiO1xyXG5cclxuY29uc3QgZ2xvYmFsRm9yUHJpc21hID0gZ2xvYmFsVGhpcyBhcyB1bmtub3duIGFzIHsgcHJpc21hOiBQcmlzbWFDbGllbnQgfTtcclxuXHJcbmV4cG9ydCBjb25zdCBwcmlzbWEgPVxyXG4gIGdsb2JhbEZvclByaXNtYS5wcmlzbWEgfHxcclxuICBuZXcgUHJpc21hQ2xpZW50KHtcclxuICAgIGxvZzogW1wicXVlcnlcIiwgXCJlcnJvclwiLCBcIndhcm5cIl0sXHJcbiAgfSk7XHJcblxyXG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSBnbG9iYWxGb3JQcmlzbWEucHJpc21hID0gcHJpc21hO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgcHJpc21hO1xyXG4iXSwibmFtZXMiOlsiUHJpc21hQ2xpZW50IiwiZ2xvYmFsRm9yUHJpc21hIiwiZ2xvYmFsVGhpcyIsInByaXNtYSIsImxvZyIsInByb2Nlc3MiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./lib/prisma.ts\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fcursos%2Froute&page=%2Fapi%2Fcursos%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fcursos%2Froute.ts&appDir=C%3A%5CUsers%5CGabriel%20Torres%5CDesktop%5CMeus%20Clientes%5CErick%5C%C3%81rea%20de%20Membros%5Carea_de_membros%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CGabriel%20Torres%5CDesktop%5CMeus%20Clientes%5CErick%5C%C3%81rea%20de%20Membros%5Carea_de_membros&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fcursos%2Froute&page=%2Fapi%2Fcursos%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fcursos%2Froute.ts&appDir=C%3A%5CUsers%5CGabriel%20Torres%5CDesktop%5CMeus%20Clientes%5CErick%5C%C3%81rea%20de%20Membros%5Carea_de_membros%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CGabriel%20Torres%5CDesktop%5CMeus%20Clientes%5CErick%5C%C3%81rea%20de%20Membros%5Carea_de_membros&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var C_Users_Gabriel_Torres_Desktop_Meus_Clientes_Erick_rea_de_Membros_area_de_membros_app_api_cursos_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/cursos/route.ts */ \"(rsc)/./app/api/cursos/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/cursos/route\",\n        pathname: \"/api/cursos\",\n        filename: \"route\",\n        bundlePath: \"app/api/cursos/route\"\n    },\n    resolvedPagePath: \"C:\\\\Users\\\\Gabriel Torres\\\\Desktop\\\\Meus Clientes\\\\Erick\\\\Área de Membros\\\\area_de_membros\\\\app\\\\api\\\\cursos\\\\route.ts\",\n    nextConfigOutput,\n    userland: C_Users_Gabriel_Torres_Desktop_Meus_Clientes_Erick_rea_de_Membros_area_de_membros_app_api_cursos_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZhcGklMkZjdXJzb3MlMkZyb3V0ZSZwYWdlPSUyRmFwaSUyRmN1cnNvcyUyRnJvdXRlJmFwcFBhdGhzPSZwYWdlUGF0aD1wcml2YXRlLW5leHQtYXBwLWRpciUyRmFwaSUyRmN1cnNvcyUyRnJvdXRlLnRzJmFwcERpcj1DJTNBJTVDVXNlcnMlNUNHYWJyaWVsJTIwVG9ycmVzJTVDRGVza3RvcCU1Q01ldXMlMjBDbGllbnRlcyU1Q0VyaWNrJTVDJUMzJTgxcmVhJTIwZGUlMjBNZW1icm9zJTVDYXJlYV9kZV9tZW1icm9zJTVDYXBwJnBhZ2VFeHRlbnNpb25zPXRzeCZwYWdlRXh0ZW5zaW9ucz10cyZwYWdlRXh0ZW5zaW9ucz1qc3gmcGFnZUV4dGVuc2lvbnM9anMmcm9vdERpcj1DJTNBJTVDVXNlcnMlNUNHYWJyaWVsJTIwVG9ycmVzJTVDRGVza3RvcCU1Q01ldXMlMjBDbGllbnRlcyU1Q0VyaWNrJTVDJUMzJTgxcmVhJTIwZGUlMjBNZW1icm9zJTVDYXJlYV9kZV9tZW1icm9zJmlzRGV2PXRydWUmdHNjb25maWdQYXRoPXRzY29uZmlnLmpzb24mYmFzZVBhdGg9JmFzc2V0UHJlZml4PSZuZXh0Q29uZmlnT3V0cHV0PSZwcmVmZXJyZWRSZWdpb249Jm1pZGRsZXdhcmVDb25maWc9ZTMwJTNEISIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUErRjtBQUN2QztBQUNxQjtBQUNzRTtBQUNuSjtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IseUdBQW1CO0FBQzNDO0FBQ0EsY0FBYyxrRUFBUztBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsWUFBWTtBQUNaLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSxRQUFRLHNEQUFzRDtBQUM5RDtBQUNBLFdBQVcsNEVBQVc7QUFDdEI7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUMwRjs7QUFFMUYiLCJzb3VyY2VzIjpbIiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBcHBSb3V0ZVJvdXRlTW9kdWxlIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvcm91dGUtbW9kdWxlcy9hcHAtcm91dGUvbW9kdWxlLmNvbXBpbGVkXCI7XG5pbXBvcnQgeyBSb3V0ZUtpbmQgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9yb3V0ZS1raW5kXCI7XG5pbXBvcnQgeyBwYXRjaEZldGNoIGFzIF9wYXRjaEZldGNoIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvbGliL3BhdGNoLWZldGNoXCI7XG5pbXBvcnQgKiBhcyB1c2VybGFuZCBmcm9tIFwiQzpcXFxcVXNlcnNcXFxcR2FicmllbCBUb3JyZXNcXFxcRGVza3RvcFxcXFxNZXVzIENsaWVudGVzXFxcXEVyaWNrXFxcXMOBcmVhIGRlIE1lbWJyb3NcXFxcYXJlYV9kZV9tZW1icm9zXFxcXGFwcFxcXFxhcGlcXFxcY3Vyc29zXFxcXHJvdXRlLnRzXCI7XG4vLyBXZSBpbmplY3QgdGhlIG5leHRDb25maWdPdXRwdXQgaGVyZSBzbyB0aGF0IHdlIGNhbiB1c2UgdGhlbSBpbiB0aGUgcm91dGVcbi8vIG1vZHVsZS5cbmNvbnN0IG5leHRDb25maWdPdXRwdXQgPSBcIlwiXG5jb25zdCByb3V0ZU1vZHVsZSA9IG5ldyBBcHBSb3V0ZVJvdXRlTW9kdWxlKHtcbiAgICBkZWZpbml0aW9uOiB7XG4gICAgICAgIGtpbmQ6IFJvdXRlS2luZC5BUFBfUk9VVEUsXG4gICAgICAgIHBhZ2U6IFwiL2FwaS9jdXJzb3Mvcm91dGVcIixcbiAgICAgICAgcGF0aG5hbWU6IFwiL2FwaS9jdXJzb3NcIixcbiAgICAgICAgZmlsZW5hbWU6IFwicm91dGVcIixcbiAgICAgICAgYnVuZGxlUGF0aDogXCJhcHAvYXBpL2N1cnNvcy9yb3V0ZVwiXG4gICAgfSxcbiAgICByZXNvbHZlZFBhZ2VQYXRoOiBcIkM6XFxcXFVzZXJzXFxcXEdhYnJpZWwgVG9ycmVzXFxcXERlc2t0b3BcXFxcTWV1cyBDbGllbnRlc1xcXFxFcmlja1xcXFzDgXJlYSBkZSBNZW1icm9zXFxcXGFyZWFfZGVfbWVtYnJvc1xcXFxhcHBcXFxcYXBpXFxcXGN1cnNvc1xcXFxyb3V0ZS50c1wiLFxuICAgIG5leHRDb25maWdPdXRwdXQsXG4gICAgdXNlcmxhbmRcbn0pO1xuLy8gUHVsbCBvdXQgdGhlIGV4cG9ydHMgdGhhdCB3ZSBuZWVkIHRvIGV4cG9zZSBmcm9tIHRoZSBtb2R1bGUuIFRoaXMgc2hvdWxkXG4vLyBiZSBlbGltaW5hdGVkIHdoZW4gd2UndmUgbW92ZWQgdGhlIG90aGVyIHJvdXRlcyB0byB0aGUgbmV3IGZvcm1hdC4gVGhlc2Vcbi8vIGFyZSB1c2VkIHRvIGhvb2sgaW50byB0aGUgcm91dGUuXG5jb25zdCB7IHdvcmtBc3luY1N0b3JhZ2UsIHdvcmtVbml0QXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcyB9ID0gcm91dGVNb2R1bGU7XG5mdW5jdGlvbiBwYXRjaEZldGNoKCkge1xuICAgIHJldHVybiBfcGF0Y2hGZXRjaCh7XG4gICAgICAgIHdvcmtBc3luY1N0b3JhZ2UsXG4gICAgICAgIHdvcmtVbml0QXN5bmNTdG9yYWdlXG4gICAgfSk7XG59XG5leHBvcnQgeyByb3V0ZU1vZHVsZSwgd29ya0FzeW5jU3RvcmFnZSwgd29ya1VuaXRBc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzLCBwYXRjaEZldGNoLCAgfTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YXBwLXJvdXRlLmpzLm1hcCJdLCJuYW1lcyI6W10sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fcursos%2Froute&page=%2Fapi%2Fcursos%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fcursos%2Froute.ts&appDir=C%3A%5CUsers%5CGabriel%20Torres%5CDesktop%5CMeus%20Clientes%5CErick%5C%C3%81rea%20de%20Membros%5Carea_de_membros%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CGabriel%20Torres%5CDesktop%5CMeus%20Clientes%5CErick%5C%C3%81rea%20de%20Membros%5Carea_de_membros&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

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
var __webpack_require__ = require("../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fcursos%2Froute&page=%2Fapi%2Fcursos%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fcursos%2Froute.ts&appDir=C%3A%5CUsers%5CGabriel%20Torres%5CDesktop%5CMeus%20Clientes%5CErick%5C%C3%81rea%20de%20Membros%5Carea_de_membros%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CGabriel%20Torres%5CDesktop%5CMeus%20Clientes%5CErick%5C%C3%81rea%20de%20Membros%5Carea_de_membros&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();