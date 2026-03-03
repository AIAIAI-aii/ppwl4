import { Elysia } from "elysia"
import { openapi } from "@elysiajs/openapi";


const app = new Elysia()
.use(openapi())
// Global Logger
app.onRequest(({ request }) => {
    console.log("📥", request.method, request.url)
    console.log("🕒", new Date().toISOString())
})

app.onRequest(({ request, set }) => {
    if (request.headers.get("x-block") === "true") {
        set.status = 403
        return { message: "Blocked" }
    }
})

app.get("/", () => "Hello Middleware")

app.listen(3000)
console.log("Server running at http://localhost:3000")
