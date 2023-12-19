import { serve, ServerRequest } from "https://deno.land/std/http/server.ts";
import MistralClient from '@mistralai/mistralai';

const apiKey = Deno.env.get("MISTRAL_API_KEY");
const client = new MistralClient(apiKey);
const server = serve({ port: 8000 });
console.log("Server running on http://localhost:8000");

async function handleApiRequest(req: ServerRequest) {
    try {
        const body = await Deno.readAll(req.body);
        const { message } = JSON.parse(new TextDecoder().decode(body));

        const chatResponse = await client.chat({
            model: 'mistral-tiny',
            messages: [{ role: 'user', content: message }],
        });

        await req.respond({
            status: 200,
            headers: new Headers({ "Content-Type": "application/json" }),
            body: JSON.stringify({
                message: chatResponse.choices[0].message.content,
                tokens: chatResponse.choices[0].message.tokens
            })
        });
    } catch (error) {
        console.error('Error:', error);
        await req.respond({ status: 500, body: 'Server error' });
    }
}

async function handleFileRequest(req: ServerRequest, filePath: string) {
    try {
        const content = await Deno.readFile(filePath);
        await req.respond({ body: content });
    } catch (error) {
        console.error('Error serving file:', error);
        await req.respond({ status: 404, body: 'File not found' });
    }
}

for await (const req of server) {
    if (req.url === "/api/chat" && req.method === "POST") {
        await handleApiRequest(req);
    } else if (req.url === "/" || req.url === "/index.html") {
        await handleFileRequest(req, "./index.html");
    } else if (req.url === "/script.js") {
        await handleFileRequest(req, "./script.js");
    } else if (req.url === "/style.css") {
        await handleFileRequest(req, "./style.css");
    } else {
        await req.respond({ status: 404, body: 'Not found' });
    }
}
