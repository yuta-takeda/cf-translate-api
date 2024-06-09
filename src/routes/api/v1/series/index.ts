import { Hono } from "hono"
import type { Bindings } from "../../../../types"

export const series = new Hono<{ Bindings: Bindings }>()

series.get("/:name", async (c) => {
  try {
    const name = await c.req.param("name")
    console.log(name)
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
