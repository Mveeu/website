export async function onRequestPost(context) {
  const formData = await context.request.formData();
  const answer = formData.get("answer");

  const normalized = answer?.trim().toLowerCase();
  const correctAnswer = "michael";

  if (normalized === correctAnswer) {
    return Response.redirect(new URL("/success", context.request.url), 302);
  }

  return Response.redirect(new URL("/?error=1", context.request.url), 302);
}
