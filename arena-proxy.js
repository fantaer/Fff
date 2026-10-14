export default {
  async fetch(request) {
    const headers = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Cache-Control": "no-store"
    };

    if (request.method === "OPTIONS") {
      return new Response(null, { headers });
    }

    if (request.method !== "GET") {
      return new Response("Method not allowed", {
        status: 405,
        headers
      });
    }

    const upstream =
      "https://raw.githubusercontent.com/fantaer/Arenamultistuff/ca823f7ade701c1d6288667bffc50c18fc8f9147/Arena.js";

    try {
      const response = await fetch(upstream);

      if (!response.ok) {
        return new Response("Arena source unavailable", {
          status: 502,
          headers
        });
      }

      headers["Content-Type"] = "application/javascript; charset=utf-8";

      return new Response(await response.arrayBuffer(), {
        status: 200,
        headers
      });
    } catch {
      return new Response("Arena fetch failed", {
        status: 502,
        headers
      });
    }
  }
};