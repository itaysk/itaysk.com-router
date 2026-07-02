const BLOG_ORIGIN = "https://itaysk.github.io"
const ABOUT_ORIGIN = "https://about-3l8.pages.dev"

export default {
  async fetch(request) {
    const url = new URL(request.url)

    if (url.pathname === "/blog-legacy") {
      url.pathname = "/blog-legacy/"
      return Response.redirect(url.toString(), 301)
    }

    if (url.pathname.startsWith("/blog-legacy/")) {
      return proxy(request, `${BLOG_ORIGIN}${url.pathname}${url.search}`)
    }

    return proxy(request, `${ABOUT_ORIGIN}${url.pathname}${url.search}`)
  },
}

function proxy(request, target) {
  return fetch(new Request(target, request))
}
