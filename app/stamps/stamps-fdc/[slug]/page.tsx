import stamps from "../mock-data";
import { notFound } from "next/navigation";
import StampDetailClient from "../StampDetailClient";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function StampDetail({ params }: PageProps) {
  const { slug } = await params;

  const stamp = stamps.find((s) => s.slug === slug);
  if (!stamp) notFound();

  const featuredStamps = stamps
    .filter((item) => item.featured && item.id !== stamp.id)
    .slice(0, 5);

  return <StampDetailClient stamp={stamp} featuredStamps={featuredStamps} />;
}