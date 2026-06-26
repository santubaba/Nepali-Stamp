import Link from "next/link";
export default function Footer() {
  return (
    <>
      <footer className="bg-brand-text h-100 ">
        <div className="flex items-center gap-2 p-2 text-lg font-semibold font-body">
          <div className="w-10 h-10 bg-brand-primary"></div>
          <Link href="/" className="text-brand-bg">Nepali Stamp</Link>
        </div>
      </footer>
    </>
  );
}
