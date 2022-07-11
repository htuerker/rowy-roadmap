import { useLoaderData } from "@remix-run/react";

export function loader({ params }: any) {
  const { id } = params;
  return { foo: id };
}

export default function Item() {
  const { foo } = useLoaderData();
  return <>Hello, {foo}!</>;
}
