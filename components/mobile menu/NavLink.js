import Link from "next/link";

export default function NavLink({ item, onClick, className }) {
  return item.link.includes("http") ? (
    <a
      className={`${className} w-full block text-white text-2xl italic font-semibold border border-transparent hover:border-theme-red px-1 skew-x-[-10deg] leading-[2.375rem]`}
      href={item.link}
      onClick={onClick}
      rel="noreferrer"
      target="_blank"
    >
      <span className="skew-x-[10deg] block">{item.title}</span>
    </a>
  ) : (
    <Link
      className={`${className} w-full block text-white text-2xl italic font-semibold border border-transparent hover:border-theme-red px-1 skew-x-[-10deg] leading-[2.375rem]`}
      href={item.link}
      onClick={onClick}
    >
      <span className="skew-x-[10deg] block">{item.title}</span>
    </Link>
  );
}
