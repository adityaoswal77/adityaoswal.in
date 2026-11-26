import { Console } from "@/components/directions/Console";
import { postSummaries } from "../posts";

export default function ConsoleDirection() {
  return <Console posts={postSummaries()} />;
}
