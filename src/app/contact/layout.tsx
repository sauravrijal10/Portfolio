import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Drop Me a Line!",
};

export default function ContactLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
