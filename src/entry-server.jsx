import { StrictMode } from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router";
import App from "./App.jsx";

/**
 * Renders one route to an HTML string at build time.
 *
 * The head tags are collected separately rather than rendered into the markup:
 * usePageMeta runs in effects, which never fire during renderToString, so the
 * prerender script derives the head from the same route data instead.
 */
export function render(url) {
    return renderToString(
        <StrictMode>
            <StaticRouter location={url}>
                <App />
            </StaticRouter>
        </StrictMode>
    );
}

export { getRoutes } from "./routes.js";
export { routeMeta } from "./lib/routeMeta.js";
