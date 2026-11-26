import { Workspace } from "@/components/directions/Workspace";
import { postSummaries } from "../posts";

export default function WorkspaceDirection() {
  return <Workspace posts={postSummaries()} />;
}
