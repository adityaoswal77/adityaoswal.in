import { ImageResponse } from "next/og";
import { getPost } from "@/content/writing";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Aditya Oswal — Writing";

export default function Image({ params }: { params: { slug: string } }) {
  const title = getPost(params.slug)?.title ?? "Writing";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          background: "#000000",
          color: "#ffffff",
        }}
      >
        <div style={{ display: "flex", fontSize: 28, color: "#a1a1aa", letterSpacing: "0.08em" }}>
          ADITYAOSWAL.IN / WRITING
        </div>
        <div style={{ display: "flex", fontSize: 76, lineHeight: 1.1, fontWeight: 600, maxWidth: "1000px" }}>
          {title}
        </div>
        <div style={{ display: "flex", fontSize: 28, color: "#a1a1aa" }}>Aditya Oswal</div>
      </div>
    ),
    size
  );
}
