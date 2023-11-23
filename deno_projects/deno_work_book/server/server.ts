const kv = await Deno.openKv();

Deno.serve(async (request: Request) => {
  // Create short links
  if (request.method == "POST") {
    const body = await request.text();
    const { slug, url } = JSON.parse(body);
    const result = await kv.set(["links", slug], url);
    return new Response(JSON.stringify(result));
  }

  // Redirect short links
  const slug = request.url.split("/").pop() || "";
  const url = (await kv.get(["links", slug])).value as string;
  if (url) {
    return Response.redirect(url, 301);
  } else {
    const m = !slug ? "Please provide a slug." : `Slug "${slug}" not found`;
    return new Response(m, { status: 404 });
  }
}); 

import { serve } from "https://deno.land/std/http/server.ts";

const server = serve({ port: 8000 });
console.log("Server listening on http://localhost:8000/");

for await (const request of server) {
  if (request.url === "/") {
    request.respond({ body: "Hello World!" });
    continue;
  }

  if (request.url === "/users") {
    const users = [
      { id: 1, name: "John" },
      { id: 2, name: "Jane" },
    ];
    request.respond({ body: JSON.stringify(users) });
    continue;
  }

  request.respond({ status: 404, body: "Not Found" });
}