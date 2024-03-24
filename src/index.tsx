import { FileSystemRouter } from "bun";
import Page from "src/pages";
import renderToString from "preact-render-to-string";

const { outputs } = await Bun.build({
  entrypoints: ["./pages/main.tsx"],
  format: "esm",
  sourcemap: "inline",
});

const router = new FileSystemRouter({
  dir: "./pages",
  style: "nextjs",
});

console.log(router.routes);

Bun.serve({
  async fetch(request) {
    const { pathname } = new URL(request.url);

    for (const output of outputs) {
      if (output.path.substring(1) === pathname) {
        return new Response(output);
      }
    }

    return new Response(
      `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Document</title>
      <script type="text/javascript">
        // create window.aroma here
      </script>
    </head>
    <body>
      ${renderToString(<Page />)}
      <script src="/main.js"></script>
    </body>
    </html>
    `,
      {
        headers: {
          "Content-Type": "text/html",
        },
      }
    );
  },
});
