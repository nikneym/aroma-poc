import { hydrate } from "preact";
import Page from "./index";

function Entrypoint() {
  return <Page />;
}

// Since we're server-side rendering the HTML, we can just hydrate here
// https://preactjs.com/guide/v10/api-reference/#hydrate
hydrate(<Entrypoint />, document.body);
