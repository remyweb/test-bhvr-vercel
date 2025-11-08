import { Hono } from "hono";
import { cors } from "hono/cors";
import { serveStatic } from "hono/bun";
import type { ApiResponse } from "shared/dist";

export const app = new Hono()

.use(cors())

// API routes
.get("/api", (c) => {
	return c.text("Hello Hono!");
})

.get("/api/hello", async (c) => {
	const data: ApiResponse = {
		message: "Hello BHVR!",
		success: true,
	};

	return c.json(data, { status: 200 });
})

// Serve static files from client/dist in production
.use("/*", serveStatic({ root: "./client/dist" }))
.get("/*", serveStatic({ path: "./client/dist/index.html" }));

const port = process.env.PORT || 4000;

export default { 
	port: Number(port), 
	fetch: app.fetch, 
} 