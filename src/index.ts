import { Hono } from 'hono'

type Bindings = {
  TRANSLATION_DB: TRANSLATION_DB
}

const app = new Hono<{ Bindings: Bindings }>()

app.get("/api/v1/artists", async (c) => {
  try {
    const { results } = await c.env.TRANSLATION_DB.prepare("SELECT * FROM artists").all()
    return c.json(results)
  } catch (e) {
    console.log(e)
    return c.json({ err: e }, 500)
  }
})

export default app
