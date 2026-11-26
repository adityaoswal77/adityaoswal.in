import { Overview } from "@/components/directions/Overview";
import { postSummaries } from "../posts";

export default function OverviewDirection() {
  return <Overview posts={postSummaries()} />;
}
