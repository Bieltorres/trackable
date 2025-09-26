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
exports.id = "app/api/auth/update-profile/route";
exports.ids = ["app/api/auth/update-profile/route"];
exports.modules = {

/***/ "(rsc)/./app/api/auth/update-profile/route.ts":
/*!**********************************************!*\
  !*** ./app/api/auth/update-profile/route.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   POST: () => (/* binding */ POST)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var _lib_prisma__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/lib/prisma */ \"(rsc)/./lib/prisma.ts\");\n/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! jsonwebtoken */ \"(rsc)/./node_modules/jsonwebtoken/index.js\");\n/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(jsonwebtoken__WEBPACK_IMPORTED_MODULE_2__);\n\n\n\nasync function POST(req) {\n    try {\n        const { name, phone, birthdate, userInfo } = await req.json();\n        if (!name || typeof name !== \"string\" || name.trim().length === 0) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: \"Nome é obrigatório\"\n            }, {\n                status: 400\n            });\n        }\n        // Verificar token de autenticação\n        const token = req.cookies.get(\"token\")?.value;\n        if (!token) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: \"Token de autenticação não encontrado\"\n            }, {\n                status: 401\n            });\n        }\n        let userId;\n        try {\n            const decoded = jsonwebtoken__WEBPACK_IMPORTED_MODULE_2___default().verify(token, process.env.JWT_SECRET);\n            userId = decoded.sub;\n        } catch (error) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: \"Token inválido\"\n            }, {\n                status: 401\n            });\n        }\n        // Buscar usuário\n        const user = await _lib_prisma__WEBPACK_IMPORTED_MODULE_1__[\"default\"].user.findUnique({\n            where: {\n                id: userId\n            }\n        });\n        if (!user) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: \"Usuário não encontrado\"\n            }, {\n                status: 404\n            });\n        }\n        // Preparar dados para atualização do usuário\n        const userData = {\n            name: name.trim()\n        };\n        if (phone !== undefined) {\n            userData.phone = phone;\n        }\n        if (birthdate !== undefined) {\n            userData.birthdate = birthdate ? new Date(birthdate) : null;\n        }\n        // Atualizar informações do usuário\n        const updatedUser = await _lib_prisma__WEBPACK_IMPORTED_MODULE_1__[\"default\"].user.update({\n            where: {\n                id: userId\n            },\n            data: userData,\n            select: {\n                id: true,\n                name: true,\n                email: true,\n                role: true,\n                phone: true,\n                birthdate: true\n            }\n        });\n        // Atualizar ou criar UserInfo se fornecido\n        let updatedUserInfo = null;\n        if (userInfo) {\n            const userInfoData = {\n                bio: userInfo.bio || null,\n                cep: userInfo.cep || null,\n                rua: userInfo.rua || null,\n                cidade: userInfo.cidade || null,\n                estado: userInfo.estado || null,\n                pais: userInfo.pais || \"Brasil\"\n            };\n            updatedUserInfo = await _lib_prisma__WEBPACK_IMPORTED_MODULE_1__[\"default\"].userInfo.upsert({\n                where: {\n                    userId\n                },\n                update: userInfoData,\n                create: {\n                    userId,\n                    ...userInfoData\n                }\n            });\n        }\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            message: \"Informações atualizadas com sucesso\",\n            user: updatedUser,\n            userInfo: updatedUserInfo\n        });\n    } catch (error) {\n        console.error(\"Erro em update-profile:\", error);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: \"Erro interno\"\n        }, {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL2F1dGgvdXBkYXRlLXByb2ZpbGUvcm91dGUudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBd0Q7QUFDdEI7QUFDSDtBQUV4QixlQUFlRyxLQUFLQyxHQUFnQjtJQUN6QyxJQUFJO1FBQ0YsTUFBTSxFQUFFQyxJQUFJLEVBQUVDLEtBQUssRUFBRUMsU0FBUyxFQUFFQyxRQUFRLEVBQUUsR0FBRyxNQUFNSixJQUFJSyxJQUFJO1FBRTNELElBQUksQ0FBQ0osUUFBUSxPQUFPQSxTQUFTLFlBQVlBLEtBQUtLLElBQUksR0FBR0MsTUFBTSxLQUFLLEdBQUc7WUFDakUsT0FBT1gscURBQVlBLENBQUNTLElBQUksQ0FDdEI7Z0JBQUVHLE9BQU87WUFBcUIsR0FDOUI7Z0JBQUVDLFFBQVE7WUFBSTtRQUVsQjtRQUVBLGtDQUFrQztRQUNsQyxNQUFNQyxRQUFRVixJQUFJVyxPQUFPLENBQUNDLEdBQUcsQ0FBQyxVQUFVQztRQUN4QyxJQUFJLENBQUNILE9BQU87WUFDVixPQUFPZCxxREFBWUEsQ0FBQ1MsSUFBSSxDQUN0QjtnQkFBRUcsT0FBTztZQUF1QyxHQUNoRDtnQkFBRUMsUUFBUTtZQUFJO1FBRWxCO1FBRUEsSUFBSUs7UUFDSixJQUFJO1lBQ0YsTUFBTUMsVUFBVWpCLDBEQUFVLENBQUNZLE9BQU9PLFFBQVFDLEdBQUcsQ0FBQ0MsVUFBVTtZQUN4REwsU0FBU0MsUUFBUUssR0FBRztRQUN0QixFQUFFLE9BQU9aLE9BQU87WUFDZCxPQUFPWixxREFBWUEsQ0FBQ1MsSUFBSSxDQUN0QjtnQkFBRUcsT0FBTztZQUFpQixHQUMxQjtnQkFBRUMsUUFBUTtZQUFJO1FBRWxCO1FBRUEsaUJBQWlCO1FBQ2pCLE1BQU1ZLE9BQU8sTUFBTXhCLG1EQUFNQSxDQUFDd0IsSUFBSSxDQUFDQyxVQUFVLENBQUM7WUFDeENDLE9BQU87Z0JBQUVDLElBQUlWO1lBQU87UUFDdEI7UUFFQSxJQUFJLENBQUNPLE1BQU07WUFDVCxPQUFPekIscURBQVlBLENBQUNTLElBQUksQ0FDdEI7Z0JBQUVHLE9BQU87WUFBeUIsR0FDbEM7Z0JBQUVDLFFBQVE7WUFBSTtRQUVsQjtRQUVBLDZDQUE2QztRQUM3QyxNQUFNZ0IsV0FBZ0I7WUFBRXhCLE1BQU1BLEtBQUtLLElBQUk7UUFBRztRQUUxQyxJQUFJSixVQUFVd0IsV0FBVztZQUN2QkQsU0FBU3ZCLEtBQUssR0FBR0E7UUFDbkI7UUFFQSxJQUFJQyxjQUFjdUIsV0FBVztZQUMzQkQsU0FBU3RCLFNBQVMsR0FBR0EsWUFBWSxJQUFJd0IsS0FBS3hCLGFBQWE7UUFDekQ7UUFFQSxtQ0FBbUM7UUFDbkMsTUFBTXlCLGNBQWMsTUFBTS9CLG1EQUFNQSxDQUFDd0IsSUFBSSxDQUFDUSxNQUFNLENBQUM7WUFDM0NOLE9BQU87Z0JBQUVDLElBQUlWO1lBQU87WUFDcEJnQixNQUFNTDtZQUNOTSxRQUFRO2dCQUNOUCxJQUFJO2dCQUNKdkIsTUFBTTtnQkFDTitCLE9BQU87Z0JBQ1BDLE1BQU07Z0JBQ04vQixPQUFPO2dCQUNQQyxXQUFXO1lBQ2I7UUFDRjtRQUVBLDJDQUEyQztRQUMzQyxJQUFJK0Isa0JBQWtCO1FBQ3RCLElBQUk5QixVQUFVO1lBQ1osTUFBTStCLGVBQWU7Z0JBQ25CQyxLQUFLaEMsU0FBU2dDLEdBQUcsSUFBSTtnQkFDckJDLEtBQUtqQyxTQUFTaUMsR0FBRyxJQUFJO2dCQUNyQkMsS0FBS2xDLFNBQVNrQyxHQUFHLElBQUk7Z0JBQ3JCQyxRQUFRbkMsU0FBU21DLE1BQU0sSUFBSTtnQkFDM0JDLFFBQVFwQyxTQUFTb0MsTUFBTSxJQUFJO2dCQUMzQkMsTUFBTXJDLFNBQVNxQyxJQUFJLElBQUk7WUFDekI7WUFFQVAsa0JBQWtCLE1BQU1yQyxtREFBTUEsQ0FBQ08sUUFBUSxDQUFDc0MsTUFBTSxDQUFDO2dCQUM3Q25CLE9BQU87b0JBQUVUO2dCQUFPO2dCQUNoQmUsUUFBUU07Z0JBQ1JRLFFBQVE7b0JBQ043QjtvQkFDQSxHQUFHcUIsWUFBWTtnQkFDakI7WUFDRjtRQUNGO1FBRUEsT0FBT3ZDLHFEQUFZQSxDQUFDUyxJQUFJLENBQUM7WUFDdkJ1QyxTQUFTO1lBQ1R2QixNQUFNTztZQUNOeEIsVUFBVThCO1FBQ1o7SUFDRixFQUFFLE9BQU8xQixPQUFPO1FBQ2RxQyxRQUFRckMsS0FBSyxDQUFDLDJCQUEyQkE7UUFDekMsT0FBT1oscURBQVlBLENBQUNTLElBQUksQ0FBQztZQUFFRyxPQUFPO1FBQWUsR0FBRztZQUFFQyxRQUFRO1FBQUk7SUFDcEU7QUFDRiIsInNvdXJjZXMiOlsiQzpcXFVzZXJzXFxHYWJyaWVsIFRvcnJlc1xcRGVza3RvcFxcTWV1cyBDbGllbnRlc1xcRXJpY2tcXMOBcmVhIGRlIE1lbWJyb3NcXGFyZWFfZGVfbWVtYnJvc1xcYXBwXFxhcGlcXGF1dGhcXHVwZGF0ZS1wcm9maWxlXFxyb3V0ZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZXh0UmVxdWVzdCwgTmV4dFJlc3BvbnNlIH0gZnJvbSBcIm5leHQvc2VydmVyXCI7XHJcbmltcG9ydCBwcmlzbWEgZnJvbSBcIkAvbGliL3ByaXNtYVwiO1xyXG5pbXBvcnQgand0IGZyb20gXCJqc29ud2VidG9rZW5cIjtcclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBQT1NUKHJlcTogTmV4dFJlcXVlc3QpIHtcclxuICB0cnkge1xyXG4gICAgY29uc3QgeyBuYW1lLCBwaG9uZSwgYmlydGhkYXRlLCB1c2VySW5mbyB9ID0gYXdhaXQgcmVxLmpzb24oKTtcclxuXHJcbiAgICBpZiAoIW5hbWUgfHwgdHlwZW9mIG5hbWUgIT09IFwic3RyaW5nXCIgfHwgbmFtZS50cmltKCkubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbihcclxuICAgICAgICB7IGVycm9yOiBcIk5vbWUgw6kgb2JyaWdhdMOzcmlvXCIgfSxcclxuICAgICAgICB7IHN0YXR1czogNDAwIH1cclxuICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBWZXJpZmljYXIgdG9rZW4gZGUgYXV0ZW50aWNhw6fDo29cclxuICAgIGNvbnN0IHRva2VuID0gcmVxLmNvb2tpZXMuZ2V0KFwidG9rZW5cIik/LnZhbHVlO1xyXG4gICAgaWYgKCF0b2tlbikge1xyXG4gICAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oXHJcbiAgICAgICAgeyBlcnJvcjogXCJUb2tlbiBkZSBhdXRlbnRpY2HDp8OjbyBuw6NvIGVuY29udHJhZG9cIiB9LFxyXG4gICAgICAgIHsgc3RhdHVzOiA0MDEgfVxyXG4gICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIGxldCB1c2VySWQ6IHN0cmluZztcclxuICAgIHRyeSB7XHJcbiAgICAgIGNvbnN0IGRlY29kZWQgPSBqd3QudmVyaWZ5KHRva2VuLCBwcm9jZXNzLmVudi5KV1RfU0VDUkVUISkgYXMgeyBzdWI6IHN0cmluZyB9O1xyXG4gICAgICB1c2VySWQgPSBkZWNvZGVkLnN1YjtcclxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbihcclxuICAgICAgICB7IGVycm9yOiBcIlRva2VuIGludsOhbGlkb1wiIH0sXHJcbiAgICAgICAgeyBzdGF0dXM6IDQwMSB9XHJcbiAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gQnVzY2FyIHVzdcOhcmlvXHJcbiAgICBjb25zdCB1c2VyID0gYXdhaXQgcHJpc21hLnVzZXIuZmluZFVuaXF1ZSh7XHJcbiAgICAgIHdoZXJlOiB7IGlkOiB1c2VySWQgfSxcclxuICAgIH0pO1xyXG5cclxuICAgIGlmICghdXNlcikge1xyXG4gICAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oXHJcbiAgICAgICAgeyBlcnJvcjogXCJVc3XDoXJpbyBuw6NvIGVuY29udHJhZG9cIiB9LFxyXG4gICAgICAgIHsgc3RhdHVzOiA0MDQgfVxyXG4gICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIFByZXBhcmFyIGRhZG9zIHBhcmEgYXR1YWxpemHDp8OjbyBkbyB1c3XDoXJpb1xyXG4gICAgY29uc3QgdXNlckRhdGE6IGFueSA9IHsgbmFtZTogbmFtZS50cmltKCkgfTtcclxuICAgIFxyXG4gICAgaWYgKHBob25lICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgdXNlckRhdGEucGhvbmUgPSBwaG9uZTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgaWYgKGJpcnRoZGF0ZSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHVzZXJEYXRhLmJpcnRoZGF0ZSA9IGJpcnRoZGF0ZSA/IG5ldyBEYXRlKGJpcnRoZGF0ZSkgOiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIEF0dWFsaXphciBpbmZvcm1hw6fDtWVzIGRvIHVzdcOhcmlvXHJcbiAgICBjb25zdCB1cGRhdGVkVXNlciA9IGF3YWl0IHByaXNtYS51c2VyLnVwZGF0ZSh7XHJcbiAgICAgIHdoZXJlOiB7IGlkOiB1c2VySWQgfSxcclxuICAgICAgZGF0YTogdXNlckRhdGEsXHJcbiAgICAgIHNlbGVjdDoge1xyXG4gICAgICAgIGlkOiB0cnVlLFxyXG4gICAgICAgIG5hbWU6IHRydWUsXHJcbiAgICAgICAgZW1haWw6IHRydWUsXHJcbiAgICAgICAgcm9sZTogdHJ1ZSxcclxuICAgICAgICBwaG9uZTogdHJ1ZSxcclxuICAgICAgICBiaXJ0aGRhdGU6IHRydWUsXHJcbiAgICAgIH0sXHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBBdHVhbGl6YXIgb3UgY3JpYXIgVXNlckluZm8gc2UgZm9ybmVjaWRvXHJcbiAgICBsZXQgdXBkYXRlZFVzZXJJbmZvID0gbnVsbDtcclxuICAgIGlmICh1c2VySW5mbykge1xyXG4gICAgICBjb25zdCB1c2VySW5mb0RhdGEgPSB7XHJcbiAgICAgICAgYmlvOiB1c2VySW5mby5iaW8gfHwgbnVsbCxcclxuICAgICAgICBjZXA6IHVzZXJJbmZvLmNlcCB8fCBudWxsLFxyXG4gICAgICAgIHJ1YTogdXNlckluZm8ucnVhIHx8IG51bGwsXHJcbiAgICAgICAgY2lkYWRlOiB1c2VySW5mby5jaWRhZGUgfHwgbnVsbCxcclxuICAgICAgICBlc3RhZG86IHVzZXJJbmZvLmVzdGFkbyB8fCBudWxsLFxyXG4gICAgICAgIHBhaXM6IHVzZXJJbmZvLnBhaXMgfHwgXCJCcmFzaWxcIixcclxuICAgICAgfTtcclxuXHJcbiAgICAgIHVwZGF0ZWRVc2VySW5mbyA9IGF3YWl0IHByaXNtYS51c2VySW5mby51cHNlcnQoe1xyXG4gICAgICAgIHdoZXJlOiB7IHVzZXJJZCB9LFxyXG4gICAgICAgIHVwZGF0ZTogdXNlckluZm9EYXRhLFxyXG4gICAgICAgIGNyZWF0ZToge1xyXG4gICAgICAgICAgdXNlcklkLFxyXG4gICAgICAgICAgLi4udXNlckluZm9EYXRhLFxyXG4gICAgICAgIH0sXHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7IFxyXG4gICAgICBtZXNzYWdlOiBcIkluZm9ybWHDp8O1ZXMgYXR1YWxpemFkYXMgY29tIHN1Y2Vzc29cIixcclxuICAgICAgdXNlcjogdXBkYXRlZFVzZXIsXHJcbiAgICAgIHVzZXJJbmZvOiB1cGRhdGVkVXNlckluZm9cclxuICAgIH0pO1xyXG4gIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICBjb25zb2xlLmVycm9yKFwiRXJybyBlbSB1cGRhdGUtcHJvZmlsZTpcIiwgZXJyb3IpO1xyXG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgZXJyb3I6IFwiRXJybyBpbnRlcm5vXCIgfSwgeyBzdGF0dXM6IDUwMCB9KTtcclxuICB9XHJcbn1cclxuIl0sIm5hbWVzIjpbIk5leHRSZXNwb25zZSIsInByaXNtYSIsImp3dCIsIlBPU1QiLCJyZXEiLCJuYW1lIiwicGhvbmUiLCJiaXJ0aGRhdGUiLCJ1c2VySW5mbyIsImpzb24iLCJ0cmltIiwibGVuZ3RoIiwiZXJyb3IiLCJzdGF0dXMiLCJ0b2tlbiIsImNvb2tpZXMiLCJnZXQiLCJ2YWx1ZSIsInVzZXJJZCIsImRlY29kZWQiLCJ2ZXJpZnkiLCJwcm9jZXNzIiwiZW52IiwiSldUX1NFQ1JFVCIsInN1YiIsInVzZXIiLCJmaW5kVW5pcXVlIiwid2hlcmUiLCJpZCIsInVzZXJEYXRhIiwidW5kZWZpbmVkIiwiRGF0ZSIsInVwZGF0ZWRVc2VyIiwidXBkYXRlIiwiZGF0YSIsInNlbGVjdCIsImVtYWlsIiwicm9sZSIsInVwZGF0ZWRVc2VySW5mbyIsInVzZXJJbmZvRGF0YSIsImJpbyIsImNlcCIsInJ1YSIsImNpZGFkZSIsImVzdGFkbyIsInBhaXMiLCJ1cHNlcnQiLCJjcmVhdGUiLCJtZXNzYWdlIiwiY29uc29sZSJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./app/api/auth/update-profile/route.ts\n");

/***/ }),

/***/ "(rsc)/./lib/prisma.ts":
/*!***********************!*\
  !*** ./lib/prisma.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__),\n/* harmony export */   prisma: () => (/* binding */ prisma)\n/* harmony export */ });\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @prisma/client */ \"@prisma/client\");\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_prisma_client__WEBPACK_IMPORTED_MODULE_0__);\n\nconst globalForPrisma = globalThis;\nconst prisma = globalForPrisma.prisma || new _prisma_client__WEBPACK_IMPORTED_MODULE_0__.PrismaClient({\n    log: [\n        \"query\",\n        \"error\",\n        \"warn\"\n    ]\n});\nif (true) globalForPrisma.prisma = prisma;\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (prisma);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvcHJpc21hLnRzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBOEM7QUFFOUMsTUFBTUMsa0JBQWtCQztBQUVqQixNQUFNQyxTQUNYRixnQkFBZ0JFLE1BQU0sSUFDdEIsSUFBSUgsd0RBQVlBLENBQUM7SUFDZkksS0FBSztRQUFDO1FBQVM7UUFBUztLQUFPO0FBQ2pDLEdBQUc7QUFFTCxJQUFJQyxJQUFxQyxFQUFFSixnQkFBZ0JFLE1BQU0sR0FBR0E7QUFFcEUsaUVBQWVBLE1BQU1BLEVBQUMiLCJzb3VyY2VzIjpbIkM6XFxVc2Vyc1xcR2FicmllbCBUb3JyZXNcXERlc2t0b3BcXE1ldXMgQ2xpZW50ZXNcXEVyaWNrXFzDgXJlYSBkZSBNZW1icm9zXFxhcmVhX2RlX21lbWJyb3NcXGxpYlxccHJpc21hLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFByaXNtYUNsaWVudCB9IGZyb20gXCJAcHJpc21hL2NsaWVudFwiO1xyXG5cclxuY29uc3QgZ2xvYmFsRm9yUHJpc21hID0gZ2xvYmFsVGhpcyBhcyB1bmtub3duIGFzIHsgcHJpc21hOiBQcmlzbWFDbGllbnQgfTtcclxuXHJcbmV4cG9ydCBjb25zdCBwcmlzbWEgPVxyXG4gIGdsb2JhbEZvclByaXNtYS5wcmlzbWEgfHxcclxuICBuZXcgUHJpc21hQ2xpZW50KHtcclxuICAgIGxvZzogW1wicXVlcnlcIiwgXCJlcnJvclwiLCBcIndhcm5cIl0sXHJcbiAgfSk7XHJcblxyXG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSBnbG9iYWxGb3JQcmlzbWEucHJpc21hID0gcHJpc21hO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgcHJpc21hO1xyXG4iXSwibmFtZXMiOlsiUHJpc21hQ2xpZW50IiwiZ2xvYmFsRm9yUHJpc21hIiwiZ2xvYmFsVGhpcyIsInByaXNtYSIsImxvZyIsInByb2Nlc3MiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./lib/prisma.ts\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fauth%2Fupdate-profile%2Froute&page=%2Fapi%2Fauth%2Fupdate-profile%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2Fupdate-profile%2Froute.ts&appDir=C%3A%5CUsers%5CGabriel%20Torres%5CDesktop%5CMeus%20Clientes%5CErick%5C%C3%81rea%20de%20Membros%5Carea_de_membros%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CGabriel%20Torres%5CDesktop%5CMeus%20Clientes%5CErick%5C%C3%81rea%20de%20Membros%5Carea_de_membros&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fauth%2Fupdate-profile%2Froute&page=%2Fapi%2Fauth%2Fupdate-profile%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2Fupdate-profile%2Froute.ts&appDir=C%3A%5CUsers%5CGabriel%20Torres%5CDesktop%5CMeus%20Clientes%5CErick%5C%C3%81rea%20de%20Membros%5Carea_de_membros%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CGabriel%20Torres%5CDesktop%5CMeus%20Clientes%5CErick%5C%C3%81rea%20de%20Membros%5Carea_de_membros&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var C_Users_Gabriel_Torres_Desktop_Meus_Clientes_Erick_rea_de_Membros_area_de_membros_app_api_auth_update_profile_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/auth/update-profile/route.ts */ \"(rsc)/./app/api/auth/update-profile/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/auth/update-profile/route\",\n        pathname: \"/api/auth/update-profile\",\n        filename: \"route\",\n        bundlePath: \"app/api/auth/update-profile/route\"\n    },\n    resolvedPagePath: \"C:\\\\Users\\\\Gabriel Torres\\\\Desktop\\\\Meus Clientes\\\\Erick\\\\Área de Membros\\\\area_de_membros\\\\app\\\\api\\\\auth\\\\update-profile\\\\route.ts\",\n    nextConfigOutput,\n    userland: C_Users_Gabriel_Torres_Desktop_Meus_Clientes_Erick_rea_de_Membros_area_de_membros_app_api_auth_update_profile_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZhcGklMkZhdXRoJTJGdXBkYXRlLXByb2ZpbGUlMkZyb3V0ZSZwYWdlPSUyRmFwaSUyRmF1dGglMkZ1cGRhdGUtcHJvZmlsZSUyRnJvdXRlJmFwcFBhdGhzPSZwYWdlUGF0aD1wcml2YXRlLW5leHQtYXBwLWRpciUyRmFwaSUyRmF1dGglMkZ1cGRhdGUtcHJvZmlsZSUyRnJvdXRlLnRzJmFwcERpcj1DJTNBJTVDVXNlcnMlNUNHYWJyaWVsJTIwVG9ycmVzJTVDRGVza3RvcCU1Q01ldXMlMjBDbGllbnRlcyU1Q0VyaWNrJTVDJUMzJTgxcmVhJTIwZGUlMjBNZW1icm9zJTVDYXJlYV9kZV9tZW1icm9zJTVDYXBwJnBhZ2VFeHRlbnNpb25zPXRzeCZwYWdlRXh0ZW5zaW9ucz10cyZwYWdlRXh0ZW5zaW9ucz1qc3gmcGFnZUV4dGVuc2lvbnM9anMmcm9vdERpcj1DJTNBJTVDVXNlcnMlNUNHYWJyaWVsJTIwVG9ycmVzJTVDRGVza3RvcCU1Q01ldXMlMjBDbGllbnRlcyU1Q0VyaWNrJTVDJUMzJTgxcmVhJTIwZGUlMjBNZW1icm9zJTVDYXJlYV9kZV9tZW1icm9zJmlzRGV2PXRydWUmdHNjb25maWdQYXRoPXRzY29uZmlnLmpzb24mYmFzZVBhdGg9JmFzc2V0UHJlZml4PSZuZXh0Q29uZmlnT3V0cHV0PSZwcmVmZXJyZWRSZWdpb249Jm1pZGRsZXdhcmVDb25maWc9ZTMwJTNEISIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUErRjtBQUN2QztBQUNxQjtBQUNvRjtBQUNqSztBQUNBO0FBQ0E7QUFDQSx3QkFBd0IseUdBQW1CO0FBQzNDO0FBQ0EsY0FBYyxrRUFBUztBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsWUFBWTtBQUNaLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSxRQUFRLHNEQUFzRDtBQUM5RDtBQUNBLFdBQVcsNEVBQVc7QUFDdEI7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUMwRjs7QUFFMUYiLCJzb3VyY2VzIjpbIiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBcHBSb3V0ZVJvdXRlTW9kdWxlIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvcm91dGUtbW9kdWxlcy9hcHAtcm91dGUvbW9kdWxlLmNvbXBpbGVkXCI7XG5pbXBvcnQgeyBSb3V0ZUtpbmQgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9yb3V0ZS1raW5kXCI7XG5pbXBvcnQgeyBwYXRjaEZldGNoIGFzIF9wYXRjaEZldGNoIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvbGliL3BhdGNoLWZldGNoXCI7XG5pbXBvcnQgKiBhcyB1c2VybGFuZCBmcm9tIFwiQzpcXFxcVXNlcnNcXFxcR2FicmllbCBUb3JyZXNcXFxcRGVza3RvcFxcXFxNZXVzIENsaWVudGVzXFxcXEVyaWNrXFxcXMOBcmVhIGRlIE1lbWJyb3NcXFxcYXJlYV9kZV9tZW1icm9zXFxcXGFwcFxcXFxhcGlcXFxcYXV0aFxcXFx1cGRhdGUtcHJvZmlsZVxcXFxyb3V0ZS50c1wiO1xuLy8gV2UgaW5qZWN0IHRoZSBuZXh0Q29uZmlnT3V0cHV0IGhlcmUgc28gdGhhdCB3ZSBjYW4gdXNlIHRoZW0gaW4gdGhlIHJvdXRlXG4vLyBtb2R1bGUuXG5jb25zdCBuZXh0Q29uZmlnT3V0cHV0ID0gXCJcIlxuY29uc3Qgcm91dGVNb2R1bGUgPSBuZXcgQXBwUm91dGVSb3V0ZU1vZHVsZSh7XG4gICAgZGVmaW5pdGlvbjoge1xuICAgICAgICBraW5kOiBSb3V0ZUtpbmQuQVBQX1JPVVRFLFxuICAgICAgICBwYWdlOiBcIi9hcGkvYXV0aC91cGRhdGUtcHJvZmlsZS9yb3V0ZVwiLFxuICAgICAgICBwYXRobmFtZTogXCIvYXBpL2F1dGgvdXBkYXRlLXByb2ZpbGVcIixcbiAgICAgICAgZmlsZW5hbWU6IFwicm91dGVcIixcbiAgICAgICAgYnVuZGxlUGF0aDogXCJhcHAvYXBpL2F1dGgvdXBkYXRlLXByb2ZpbGUvcm91dGVcIlxuICAgIH0sXG4gICAgcmVzb2x2ZWRQYWdlUGF0aDogXCJDOlxcXFxVc2Vyc1xcXFxHYWJyaWVsIFRvcnJlc1xcXFxEZXNrdG9wXFxcXE1ldXMgQ2xpZW50ZXNcXFxcRXJpY2tcXFxcw4FyZWEgZGUgTWVtYnJvc1xcXFxhcmVhX2RlX21lbWJyb3NcXFxcYXBwXFxcXGFwaVxcXFxhdXRoXFxcXHVwZGF0ZS1wcm9maWxlXFxcXHJvdXRlLnRzXCIsXG4gICAgbmV4dENvbmZpZ091dHB1dCxcbiAgICB1c2VybGFuZFxufSk7XG4vLyBQdWxsIG91dCB0aGUgZXhwb3J0cyB0aGF0IHdlIG5lZWQgdG8gZXhwb3NlIGZyb20gdGhlIG1vZHVsZS4gVGhpcyBzaG91bGRcbi8vIGJlIGVsaW1pbmF0ZWQgd2hlbiB3ZSd2ZSBtb3ZlZCB0aGUgb3RoZXIgcm91dGVzIHRvIHRoZSBuZXcgZm9ybWF0LiBUaGVzZVxuLy8gYXJlIHVzZWQgdG8gaG9vayBpbnRvIHRoZSByb3V0ZS5cbmNvbnN0IHsgd29ya0FzeW5jU3RvcmFnZSwgd29ya1VuaXRBc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzIH0gPSByb3V0ZU1vZHVsZTtcbmZ1bmN0aW9uIHBhdGNoRmV0Y2goKSB7XG4gICAgcmV0dXJuIF9wYXRjaEZldGNoKHtcbiAgICAgICAgd29ya0FzeW5jU3RvcmFnZSxcbiAgICAgICAgd29ya1VuaXRBc3luY1N0b3JhZ2VcbiAgICB9KTtcbn1cbmV4cG9ydCB7IHJvdXRlTW9kdWxlLCB3b3JrQXN5bmNTdG9yYWdlLCB3b3JrVW5pdEFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MsIHBhdGNoRmV0Y2gsICB9O1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1hcHAtcm91dGUuanMubWFwIl0sIm5hbWVzIjpbXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fauth%2Fupdate-profile%2Froute&page=%2Fapi%2Fauth%2Fupdate-profile%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2Fupdate-profile%2Froute.ts&appDir=C%3A%5CUsers%5CGabriel%20Torres%5CDesktop%5CMeus%20Clientes%5CErick%5C%C3%81rea%20de%20Membros%5Carea_de_membros%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CGabriel%20Torres%5CDesktop%5CMeus%20Clientes%5CErick%5C%C3%81rea%20de%20Membros%5Carea_de_membros&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

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
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/semver","vendor-chunks/jsonwebtoken","vendor-chunks/jws","vendor-chunks/ecdsa-sig-formatter","vendor-chunks/safe-buffer","vendor-chunks/ms","vendor-chunks/lodash.once","vendor-chunks/lodash.isstring","vendor-chunks/lodash.isplainobject","vendor-chunks/lodash.isnumber","vendor-chunks/lodash.isinteger","vendor-chunks/lodash.isboolean","vendor-chunks/lodash.includes","vendor-chunks/jwa","vendor-chunks/buffer-equal-constant-time"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fauth%2Fupdate-profile%2Froute&page=%2Fapi%2Fauth%2Fupdate-profile%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2Fupdate-profile%2Froute.ts&appDir=C%3A%5CUsers%5CGabriel%20Torres%5CDesktop%5CMeus%20Clientes%5CErick%5C%C3%81rea%20de%20Membros%5Carea_de_membros%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CGabriel%20Torres%5CDesktop%5CMeus%20Clientes%5CErick%5C%C3%81rea%20de%20Membros%5Carea_de_membros&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();