import { ChatLanding } from "@/components/directions/ChatLanding";
import { postSummaries } from "../posts";

export default function ChatDirection() {
  return <ChatLanding posts={postSummaries()} />;
}
