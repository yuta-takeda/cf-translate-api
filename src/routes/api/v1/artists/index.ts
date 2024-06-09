import { Hono } from "hono"
import type { Bindings } from "../../../../types"
import { recordHistory } from "../../../../common/recordHistories"

export const artists = new Hono<{ Bindings: Bindings }>()

artists.get("/:name", async (c) => {
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

artists.post("/", async (c) => {
  try {
    const body = await c.req.json()
    const { englishName, japaneseName } = body

    const now = new Date().toISOString()
    const query = `INSERT INTO artists (english_name, japanese_name, updated_at) VALUES (?, ?, ?)
        ON CONFLICT (english_name) DO UPDATE SET japanese_name = ?, updated_at = ?`
    await c.env.TRANSLATION_DB.prepare(query)
           .bind(englishName, japaneseName, now, japaneseName, now)
           .run()
    await recordHistory(c.env.TRANSLATION_DB, englishName, japaneseName, "artists", c.req.header("CF-Connecting-IP"), now)

    return c.json({ result: "ok" })
  } catch (e) {
    console.log(e)
    return c.json({ result: "error" }, 500)
  }
})
