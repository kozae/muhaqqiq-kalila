import { awsConfig } from "kalila-config";
import { Amplify } from "aws-amplify";

import route from "@client/route";
import { persistStorage } from "pages-tool-store-worker";
console.log("configuring amplify");
Amplify.configure(awsConfig);

function propagateRoute() {
  const path = window.location.pathname.split("/").filter(Boolean);
  route.next(path);
}

propagateRoute();

document.addEventListener("astro:page-load", (e) => {
  propagateRoute();
});

await persistStorage();
