import { Hono } from 'hono'
import { artists } from "./routes/api/v1/artists"
import { groups } from "./routes/api/v1/groups"
import { series } from "./routes/api/v1/series"

type Bindings = {
  TRANSLATION_DB: TRANSLATION_DB
}

const app = new Hono<{ Bindings: Bindings }>()

app.route("/api/v1/artists", artists)
app.route("/api/v1/groups", groups)
app.route("/api/v1/series", series)

export default app
