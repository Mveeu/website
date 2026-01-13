export async function onRequest(context) {
  const url = new URL(context.request.url);
  const cookie = context.request.headers.get("Cookie") || "";

  // If the user is trying to reach the success page [cite: 58]
  if (url.pathname.startsWith("/success")) {
    // Check if they have our specific authorization cookie [cite: 50, 60]
    if (!cookie.includes("kinser_auth=true")) {
      // If no valid cookie, redirect them back to the landing page 
      return Response.redirect(new URL("/", context.request.url), 302);
    }
  }

  // If they have the cookie or are visiting the landing page, proceed normally [cite: 30]
  return context.next();
}
