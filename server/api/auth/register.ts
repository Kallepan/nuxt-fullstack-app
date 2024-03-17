import { H3Event } from "h3";

export default async (event: H3Event) => {
  console.log(event);
  return "Hello World!";
};
