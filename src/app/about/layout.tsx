import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "All About Me!",
};

export default function AboutLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
