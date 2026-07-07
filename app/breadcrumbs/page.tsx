"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

interface BreadCrumbProps {
  showHome?: boolean;
  className?: string;
}

export default function BreadCrumb({
  showHome = true,
  className = "",
}: BreadCrumbProps) {
  const pathname = usePathname();
  const path = pathname.split("/").filter((item) => item !== "");

  const formatLabel = (label: string): string =>
    label
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

  return (
    <div className={`inline-flex items-center ${className}`}>
      {showHome && <Link href="/">Home</Link>}

      {path.map((item, index) => {
        const href = "/" + path.slice(0, index + 1).join("/");
        const isLast = index === path.length - 1;

        return (
          <div key={item} className="inline-flex items-center">
            <span className="mx-2"> / </span>

            {isLast ? (
              <span>{formatLabel(item)}</span>
            ) : (
              <Link href={href}>{formatLabel(item)}</Link>
            )}
          </div>
        );
      })}
    </div>
  );
}