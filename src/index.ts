import { Hono } from 'hono'

type Bindings = {
  TRANSLATION_DB: TRANSLATION_DB
}

const app = new Hono<{ Bindings: Bindings }>()

app.get("/api/v1/artist/:name", async (c) => {
  try {
    const name = await c.req.param("name")
    const { results } = await c.env.TRANSLATION_DB.prepare("SELECT * FROM artists WHERE english_name = ? LIMIT ?")
                               .bind(name, 1)
                               .all()
    const output = { name: results[0]?.japanese_name }
    return c.json(output)
  } catch (e) {
    console.log(e)
    return c.json({ err: e }, 500)
  }
})

app.get("/api/v1/group/:name", async (c) => {
  try {
    const name = await c.req.param("name")
    const { results } = await c.env.TRANSLATION_DB.prepare("SELECT * FROM groups WHERE english_name = ? LIMIT ?")
                               .bind(name, 1)
                               .all()
    const output = { name: results[0]?.japanese_name }
    return c.json(output)
  } catch (e) {
    console.log(e)
    return c.json({ err: e }, 500)
  }
})

app.get("/api/v1/series/:name", async (c) => {
  try {
    const name = await c.req.param("name")
    const { results } = await c.env.TRANSLATION_DB.prepare("SELECT * FROM series WHERE english_name = ? LIMIT ?")
                               .bind(name, 1)
                               .all()
    const output = { name: results[0]?.japanese_name }
    return c.json(output)
  } catch (e) {
    console.log(e)
    return c.json({ err: e }, 500)
  }
})

export default app
