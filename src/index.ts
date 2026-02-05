import { Hono } from "hono";
import { createDbConnection } from "./db";
import { users } from "./db/schema";

const app = new Hono();

app.get("/", async (c) => {
  const db = createDbConnection();
  const usersFound = await db.select().from(users);

  return c.json({ usersFound });
});

export default app;
