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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ GET)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var _lib_prisma__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/lib/prisma */ \"(rsc)/./lib/prisma.ts\");\n\n\nasync function GET(request) {\n    try {\n        const { searchParams } = new URL(request.url);\n        const categoria = searchParams.get(\"categoria\");\n        const nivel = searchParams.get(\"nivel\");\n        const search = searchParams.get(\"search\");\n        const page = parseInt(searchParams.get(\"page\") || \"1\");\n        const limit = parseInt(searchParams.get(\"limit\") || \"10\");\n        const skip = (page - 1) * limit;\n        const where = {\n            status: \"publicado\"\n        };\n        if (categoria) {\n            where.categoria = {\n                nome: categoria\n            };\n        }\n        if (nivel) {\n            where.nivel = nivel;\n        }\n        if (search) {\n            where.OR = [\n                {\n                    titulo: {\n                        contains: search,\n                        mode: \"insensitive\"\n                    }\n                },\n                {\n                    descricao: {\n                        contains: search,\n                        mode: \"insensitive\"\n                    }\n                }\n            ];\n        }\n        const [cursos, total] = await Promise.all([\n            _lib_prisma__WEBPACK_IMPORTED_MODULE_1__.prisma.curso.findMany({\n                where,\n                include: {\n                    categoria: true,\n                    _count: {\n                        select: {\n                            usuarioCursos: true,\n                            avaliacoes: true\n                        }\n                    }\n                },\n                orderBy: {\n                    createdAt: \"desc\"\n                },\n                skip,\n                take: limit\n            }),\n            _lib_prisma__WEBPACK_IMPORTED_MODULE_1__.prisma.curso.count({\n                where\n            })\n        ]);\n        // Calcular média de avaliações para cada curso\n        const cursosComMedia = await Promise.all(cursos.map(async (curso)=>{\n            const avaliacoes = await _lib_prisma__WEBPACK_IMPORTED_MODULE_1__.prisma.cursoAvaliacao.findMany({\n                where: {\n                    cursoId: curso.id\n                },\n                select: {\n                    nota: true\n                }\n            });\n            const mediaAvaliacoes = avaliacoes.length > 0 ? avaliacoes.reduce((sum, av)=>sum + av.nota, 0) / avaliacoes.length : 0;\n            return {\n                ...curso,\n                mediaAvaliacoes: Math.round(mediaAvaliacoes * 10) / 10\n            };\n        }));\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            data: cursosComMedia,\n            total,\n            page,\n            limit,\n            totalPages: Math.ceil(total / limit)\n        });\n    } catch (error) {\n        console.error(\"Erro ao buscar cursos:\", error);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: \"Erro interno do servidor\"\n        }, {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL2N1cnNvcy9yb3V0ZS50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7QUFBd0Q7QUFDbEI7QUFFL0IsZUFBZUUsSUFBSUMsT0FBb0I7SUFDNUMsSUFBSTtRQUNGLE1BQU0sRUFBRUMsWUFBWSxFQUFFLEdBQUcsSUFBSUMsSUFBSUYsUUFBUUcsR0FBRztRQUM1QyxNQUFNQyxZQUFZSCxhQUFhSSxHQUFHLENBQUM7UUFDbkMsTUFBTUMsUUFBUUwsYUFBYUksR0FBRyxDQUFDO1FBQy9CLE1BQU1FLFNBQVNOLGFBQWFJLEdBQUcsQ0FBQztRQUNoQyxNQUFNRyxPQUFPQyxTQUFTUixhQUFhSSxHQUFHLENBQUMsV0FBVztRQUNsRCxNQUFNSyxRQUFRRCxTQUFTUixhQUFhSSxHQUFHLENBQUMsWUFBWTtRQUNwRCxNQUFNTSxPQUFPLENBQUNILE9BQU8sS0FBS0U7UUFFMUIsTUFBTUUsUUFBYTtZQUNqQkMsUUFBUTtRQUNWO1FBRUEsSUFBSVQsV0FBVztZQUNiUSxNQUFNUixTQUFTLEdBQUc7Z0JBQ2hCVSxNQUFNVjtZQUNSO1FBQ0Y7UUFFQSxJQUFJRSxPQUFPO1lBQ1RNLE1BQU1OLEtBQUssR0FBR0E7UUFDaEI7UUFFQSxJQUFJQyxRQUFRO1lBQ1ZLLE1BQU1HLEVBQUUsR0FBRztnQkFDVDtvQkFBRUMsUUFBUTt3QkFBRUMsVUFBVVY7d0JBQVFXLE1BQU07b0JBQWM7Z0JBQUU7Z0JBQ3BEO29CQUFFQyxXQUFXO3dCQUFFRixVQUFVVjt3QkFBUVcsTUFBTTtvQkFBYztnQkFBRTthQUN4RDtRQUNIO1FBRUEsTUFBTSxDQUFDRSxRQUFRQyxNQUFNLEdBQUcsTUFBTUMsUUFBUUMsR0FBRyxDQUFDO1lBQ3hDekIsK0NBQU1BLENBQUMwQixLQUFLLENBQUNDLFFBQVEsQ0FBQztnQkFDcEJiO2dCQUNBYyxTQUFTO29CQUNQdEIsV0FBVztvQkFDWHVCLFFBQVE7d0JBQ05DLFFBQVE7NEJBQ05DLGVBQWU7NEJBQ2ZDLFlBQVk7d0JBQ2Q7b0JBQ0Y7Z0JBQ0Y7Z0JBQ0FDLFNBQVM7b0JBQ1BDLFdBQVc7Z0JBQ2I7Z0JBQ0FyQjtnQkFDQXNCLE1BQU12QjtZQUNSO1lBQ0FaLCtDQUFNQSxDQUFDMEIsS0FBSyxDQUFDVSxLQUFLLENBQUM7Z0JBQUV0QjtZQUFNO1NBQzVCO1FBRUQsK0NBQStDO1FBQy9DLE1BQU11QixpQkFBaUIsTUFBTWIsUUFBUUMsR0FBRyxDQUN0Q0gsT0FBT2dCLEdBQUcsQ0FBQyxPQUFPWjtZQUNoQixNQUFNTSxhQUFhLE1BQU1oQywrQ0FBTUEsQ0FBQ3VDLGNBQWMsQ0FBQ1osUUFBUSxDQUFDO2dCQUN0RGIsT0FBTztvQkFBRTBCLFNBQVNkLE1BQU1lLEVBQUU7Z0JBQUM7Z0JBQzNCWCxRQUFRO29CQUFFWSxNQUFNO2dCQUFLO1lBQ3ZCO1lBRUEsTUFBTUMsa0JBQ0pYLFdBQVdZLE1BQU0sR0FBRyxJQUNoQlosV0FBV2EsTUFBTSxDQUFDLENBQUNDLEtBQUtDLEtBQU9ELE1BQU1DLEdBQUdMLElBQUksRUFBRSxLQUM5Q1YsV0FBV1ksTUFBTSxHQUNqQjtZQUVOLE9BQU87Z0JBQ0wsR0FBR2xCLEtBQUs7Z0JBQ1JpQixpQkFBaUJLLEtBQUtDLEtBQUssQ0FBQ04sa0JBQWtCLE1BQU07WUFDdEQ7UUFDRjtRQUdGLE9BQU81QyxxREFBWUEsQ0FBQ21ELElBQUksQ0FBQztZQUN2QkMsTUFBTWQ7WUFDTmQ7WUFDQWI7WUFDQUU7WUFDQXdDLFlBQVlKLEtBQUtLLElBQUksQ0FBQzlCLFFBQVFYO1FBQ2hDO0lBQ0YsRUFBRSxPQUFPMEMsT0FBTztRQUNkQyxRQUFRRCxLQUFLLENBQUMsMEJBQTBCQTtRQUN4QyxPQUFPdkQscURBQVlBLENBQUNtRCxJQUFJLENBQ3RCO1lBQUVJLE9BQU87UUFBMkIsR0FDcEM7WUFBRXZDLFFBQVE7UUFBSTtJQUVsQjtBQUNGIiwic291cmNlcyI6WyJDOlxcVXNlcnNcXEdhYnJpZWwgVG9ycmVzXFxEZXNrdG9wXFxNZXVzIENsaWVudGVzXFxFcmlja1xcw4FyZWEgZGUgTWVtYnJvc1xcYXJlYV9kZV9tZW1icm9zXFxhcHBcXGFwaVxcY3Vyc29zXFxyb3V0ZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZXh0UmVxdWVzdCwgTmV4dFJlc3BvbnNlIH0gZnJvbSBcIm5leHQvc2VydmVyXCI7XHJcbmltcG9ydCB7IHByaXNtYSB9IGZyb20gXCJAL2xpYi9wcmlzbWFcIjtcclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBHRVQocmVxdWVzdDogTmV4dFJlcXVlc3QpIHtcclxuICB0cnkge1xyXG4gICAgY29uc3QgeyBzZWFyY2hQYXJhbXMgfSA9IG5ldyBVUkwocmVxdWVzdC51cmwpO1xyXG4gICAgY29uc3QgY2F0ZWdvcmlhID0gc2VhcmNoUGFyYW1zLmdldChcImNhdGVnb3JpYVwiKTtcclxuICAgIGNvbnN0IG5pdmVsID0gc2VhcmNoUGFyYW1zLmdldChcIm5pdmVsXCIpO1xyXG4gICAgY29uc3Qgc2VhcmNoID0gc2VhcmNoUGFyYW1zLmdldChcInNlYXJjaFwiKTtcclxuICAgIGNvbnN0IHBhZ2UgPSBwYXJzZUludChzZWFyY2hQYXJhbXMuZ2V0KFwicGFnZVwiKSB8fCBcIjFcIik7XHJcbiAgICBjb25zdCBsaW1pdCA9IHBhcnNlSW50KHNlYXJjaFBhcmFtcy5nZXQoXCJsaW1pdFwiKSB8fCBcIjEwXCIpO1xyXG4gICAgY29uc3Qgc2tpcCA9IChwYWdlIC0gMSkgKiBsaW1pdDtcclxuXHJcbiAgICBjb25zdCB3aGVyZTogYW55ID0ge1xyXG4gICAgICBzdGF0dXM6IFwicHVibGljYWRvXCIsXHJcbiAgICB9O1xyXG5cclxuICAgIGlmIChjYXRlZ29yaWEpIHtcclxuICAgICAgd2hlcmUuY2F0ZWdvcmlhID0ge1xyXG4gICAgICAgIG5vbWU6IGNhdGVnb3JpYSxcclxuICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAobml2ZWwpIHtcclxuICAgICAgd2hlcmUubml2ZWwgPSBuaXZlbDtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoc2VhcmNoKSB7XHJcbiAgICAgIHdoZXJlLk9SID0gW1xyXG4gICAgICAgIHsgdGl0dWxvOiB7IGNvbnRhaW5zOiBzZWFyY2gsIG1vZGU6IFwiaW5zZW5zaXRpdmVcIiB9IH0sXHJcbiAgICAgICAgeyBkZXNjcmljYW86IHsgY29udGFpbnM6IHNlYXJjaCwgbW9kZTogXCJpbnNlbnNpdGl2ZVwiIH0gfSxcclxuICAgICAgXTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBbY3Vyc29zLCB0b3RhbF0gPSBhd2FpdCBQcm9taXNlLmFsbChbXHJcbiAgICAgIHByaXNtYS5jdXJzby5maW5kTWFueSh7XHJcbiAgICAgICAgd2hlcmUsXHJcbiAgICAgICAgaW5jbHVkZToge1xyXG4gICAgICAgICAgY2F0ZWdvcmlhOiB0cnVlLFxyXG4gICAgICAgICAgX2NvdW50OiB7XHJcbiAgICAgICAgICAgIHNlbGVjdDoge1xyXG4gICAgICAgICAgICAgIHVzdWFyaW9DdXJzb3M6IHRydWUsXHJcbiAgICAgICAgICAgICAgYXZhbGlhY29lczogdHJ1ZSxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgfSxcclxuICAgICAgICBvcmRlckJ5OiB7XHJcbiAgICAgICAgICBjcmVhdGVkQXQ6IFwiZGVzY1wiLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc2tpcCxcclxuICAgICAgICB0YWtlOiBsaW1pdCxcclxuICAgICAgfSksXHJcbiAgICAgIHByaXNtYS5jdXJzby5jb3VudCh7IHdoZXJlIH0pLFxyXG4gICAgXSk7XHJcblxyXG4gICAgLy8gQ2FsY3VsYXIgbcOpZGlhIGRlIGF2YWxpYcOnw7VlcyBwYXJhIGNhZGEgY3Vyc29cclxuICAgIGNvbnN0IGN1cnNvc0NvbU1lZGlhID0gYXdhaXQgUHJvbWlzZS5hbGwoXHJcbiAgICAgIGN1cnNvcy5tYXAoYXN5bmMgKGN1cnNvKSA9PiB7XHJcbiAgICAgICAgY29uc3QgYXZhbGlhY29lcyA9IGF3YWl0IHByaXNtYS5jdXJzb0F2YWxpYWNhby5maW5kTWFueSh7XHJcbiAgICAgICAgICB3aGVyZTogeyBjdXJzb0lkOiBjdXJzby5pZCB9LFxyXG4gICAgICAgICAgc2VsZWN0OiB7IG5vdGE6IHRydWUgfSxcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgY29uc3QgbWVkaWFBdmFsaWFjb2VzID1cclxuICAgICAgICAgIGF2YWxpYWNvZXMubGVuZ3RoID4gMFxyXG4gICAgICAgICAgICA/IGF2YWxpYWNvZXMucmVkdWNlKChzdW0sIGF2KSA9PiBzdW0gKyBhdi5ub3RhLCAwKSAvXHJcbiAgICAgICAgICAgICAgYXZhbGlhY29lcy5sZW5ndGhcclxuICAgICAgICAgICAgOiAwO1xyXG5cclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgLi4uY3Vyc28sXHJcbiAgICAgICAgICBtZWRpYUF2YWxpYWNvZXM6IE1hdGgucm91bmQobWVkaWFBdmFsaWFjb2VzICogMTApIC8gMTAsXHJcbiAgICAgICAgfTtcclxuICAgICAgfSlcclxuICAgICk7XHJcblxyXG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHtcclxuICAgICAgZGF0YTogY3Vyc29zQ29tTWVkaWEsXHJcbiAgICAgIHRvdGFsLFxyXG4gICAgICBwYWdlLFxyXG4gICAgICBsaW1pdCxcclxuICAgICAgdG90YWxQYWdlczogTWF0aC5jZWlsKHRvdGFsIC8gbGltaXQpLFxyXG4gICAgfSk7XHJcbiAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJvIGFvIGJ1c2NhciBjdXJzb3M6XCIsIGVycm9yKTtcclxuICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbihcclxuICAgICAgeyBlcnJvcjogXCJFcnJvIGludGVybm8gZG8gc2Vydmlkb3JcIiB9LFxyXG4gICAgICB7IHN0YXR1czogNTAwIH1cclxuICAgICk7XHJcbiAgfVxyXG59XHJcbiJdLCJuYW1lcyI6WyJOZXh0UmVzcG9uc2UiLCJwcmlzbWEiLCJHRVQiLCJyZXF1ZXN0Iiwic2VhcmNoUGFyYW1zIiwiVVJMIiwidXJsIiwiY2F0ZWdvcmlhIiwiZ2V0Iiwibml2ZWwiLCJzZWFyY2giLCJwYWdlIiwicGFyc2VJbnQiLCJsaW1pdCIsInNraXAiLCJ3aGVyZSIsInN0YXR1cyIsIm5vbWUiLCJPUiIsInRpdHVsbyIsImNvbnRhaW5zIiwibW9kZSIsImRlc2NyaWNhbyIsImN1cnNvcyIsInRvdGFsIiwiUHJvbWlzZSIsImFsbCIsImN1cnNvIiwiZmluZE1hbnkiLCJpbmNsdWRlIiwiX2NvdW50Iiwic2VsZWN0IiwidXN1YXJpb0N1cnNvcyIsImF2YWxpYWNvZXMiLCJvcmRlckJ5IiwiY3JlYXRlZEF0IiwidGFrZSIsImNvdW50IiwiY3Vyc29zQ29tTWVkaWEiLCJtYXAiLCJjdXJzb0F2YWxpYWNhbyIsImN1cnNvSWQiLCJpZCIsIm5vdGEiLCJtZWRpYUF2YWxpYWNvZXMiLCJsZW5ndGgiLCJyZWR1Y2UiLCJzdW0iLCJhdiIsIk1hdGgiLCJyb3VuZCIsImpzb24iLCJkYXRhIiwidG90YWxQYWdlcyIsImNlaWwiLCJlcnJvciIsImNvbnNvbGUiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./app/api/cursos/route.ts\n");

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