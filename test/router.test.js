import assert from "node:assert/strict"
import worker from "../src/index.js"

const originalFetch = globalThis.fetch
const fetched = []

globalThis.fetch = async (request) => {
  fetched.push(request)
  return new Response("proxied")
}

try {
  const redirect = await worker.fetch(new Request("https://itaysk.com/blog-legacy?ref=test"))
  assert.equal(redirect.status, 301)
  assert.equal(redirect.headers.get("location"), "https://itaysk.com/blog-legacy/?ref=test")

  fetched.length = 0
  await worker.fetch(new Request("https://itaysk.com/blog-legacy/2017/04/28/post?x=1"))
  assert.equal(fetched[0].url, "https://itaysk.github.io/blog-legacy/2017/04/28/post?x=1")

  fetched.length = 0
  await worker.fetch(new Request("https://itaysk.com/speaking?year=2026"))
  assert.equal(fetched[0].url, "https://about-3l8.pages.dev/speaking?year=2026")
} finally {
  globalThis.fetch = originalFetch
}
