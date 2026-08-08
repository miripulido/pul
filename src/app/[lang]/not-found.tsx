import Link from 'next/link';

// Rendered inside the locale layout, so Nav/Footer are present.
export default function NotFound() {
  return (
    <div className="wrap py-32 sm:py-48">
      <span className="eyebrow">404</span>
      <h1 className="mt-6 text-h1 font-medium tracking-tightest max-w-[14ch]">
        This page could not be found.
      </h1>
      <Link href="/" className="btn mt-10">
        Home <span aria-hidden>→</span>
      </Link>
    </div>
  );
}
