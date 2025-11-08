import { Hono } from "hono";
import { cors } from "hono/cors";

const app = new Hono();

app.use(cors());

app.get("/", (c) => {
  return c.text(`Hello Hono from Bun ${process.versions.bun}!`);
});

app.get("/hello", async (c) => {
  return c.json({
    message: "Hello BHVR!",
    success: true,
  });
});

export default app;
