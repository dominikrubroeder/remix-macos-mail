import { redirect } from "@remix-run/node";

export async function action() {
  return redirect("/");
}
