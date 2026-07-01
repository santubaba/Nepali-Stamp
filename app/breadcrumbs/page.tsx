"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
export default function BreadCrumb({ showHome = true }) {
  const pathname = usePathname();
  const path = pathname.split("/").filter((item) => item !== "");

  return (
    <div className="inline-flex ">
      {showHome && <Link href={"/"}> Home </Link>}
      {path.map((item, index) => {
        const href = "/" + path.slice(0, index + 1).join("/");
        const isLast = index === path.length - 1;

        return (
          <div key={item}>
            <span> / </span>
            {isLast ? <span>{item}</span> : <Link href={href}>{item}</Link>}
          </div>
        );
      })}
    </div>
  );
}
