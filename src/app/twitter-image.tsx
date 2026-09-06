import { ImageResponse } from "next/og";
import { OgArtwork } from "./og-artwork";

export const alt = "OpenRemap — ECU binaries, without the black box · Harness v1.0.0 pending";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function TwitterImage() {
  return new ImageResponse(<OgArtwork />, { ...size });
}
