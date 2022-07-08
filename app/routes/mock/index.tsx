import { ActionFunction, redirect } from "@remix-run/node";
import { Form } from "@remix-run/react";
import { useState } from "react";

export const action: ActionFunction = async ({ request }) => {
  const data = await request.formData();
  console.log({ test: Object.fromEntries(data) });
  return redirect("/");
};

export default function Index() {
  const [input, setInput] = useState("");
  return (
    <Form method="post" action="/mock?index">
      <input
        name="input1"
        value={input}
        placeholder="input1"
        onChange={(e) => setInput(e.target.value)}
      />
      <button type="submit" name="_action" value="upvote">
        Submit
      </button>
    </Form>
  );
}
