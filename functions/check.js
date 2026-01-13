export async function onRequestPost(context) {
  const formData = await context.request.formData();
  const answer = formData.get("answer");
  
  // Normalize the input: remove extra spaces and convert to lowercase [cite: 27, 47]
  const normalized = answer?.trim().toLowerCase();
  const correctAnswer = "michael"; // Stored securely on the server [cite: 27, 47]

  if (normalized === correctAnswer) {
    // 1. Prepare a redirect to the success page [cite: 27, 48]
    const response = new Response(null, {
      status: 302,
      headers: { "Location": "/success" }
    });

    // 2. Set a secure authorization cookie 
    // 'HttpOnly' prevents JS access; 'Secure' requires HTTPS; 'SameSite=Strict' prevents CSRF
    response.headers.append(
      "Set-Cookie", 
      "kinser_auth=true; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=3600"
    );
    
    return response;
  }

  // If wrong, redirect back to home with an error flag [cite: 27, 49]
  return Response.redirect(new URL("/?error=1", context.request.url), 302);
}
