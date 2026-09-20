import Link from "next/link";
import { MinusIcon } from "lucide-react";
import { ROUTES } from "@/lib/routes";
import { Logo } from "./logo";

const FOOTER_LINKS = {
  links: [
    {
      href: ROUTES.home,
      title: "Home",
    },
    {
      href: ROUTES.signin,
      title: "Sign In",
    },
    {
      href: ROUTES.dashboard,
      title: "Dashboard",
    },
  ],
  product: [
    {
      href: ROUTES.howItWorksSection,
      title: "How it Works",
    },
    {
      href: ROUTES.featuresSection,
      title: "Features",
    },
  ],
};

export function Footer() {
  return (
    <footer className="p-16 rounded-4xl bg-black text-white grid grid-cols-4 justify-center">
      <div className="space-y-6 mx-auto">
        <div className="space-y-2">
          <Logo />
          <p className="">
            Built to make classroom attendance faster, <br /> and harder to
            fake.
          </p>
        </div>
        <p className="text-xs">&copy; {new Date().getFullYear()} Attend</p>
      </div>
      <div className="space-y-4 mx-auto">
        <h1 className="font-semibold text-xl">Product</h1>
        <div className="flex flex-col items-start justify-start text-base">
          {FOOTER_LINKS.product.map((product) => (
            <Link key={product.href} href={product.href} className="flex gap-1">
              <MinusIcon />{" "}
              <span className="hover:underline text-sm">{product.title}</span>
            </Link>
          ))}
        </div>
      </div>
      <div className="space-y-4 mx-auto">
        <h1 className="font-semibold text-xl">Links</h1>
        <div className="flex flex-col items-start justify-start text-base">
          {FOOTER_LINKS.links.map((link) => (
            <Link key={link.href} href={link.href} className="flex gap-1">
              <MinusIcon />{" "}
              <span className="hover:underline text-sm">{link.title}</span>
            </Link>
          ))}
        </div>
      </div>
      <div className="font_changaone text-xl mx-auto">
        <p>Made out of chaos by</p>
        <Link
          href={"https://rohit-og-portfolio.vercel.app"}
          target="_blank"
          className="text-2xl text-warning underline underline-offset-2 decoration-warning"
        >
          Rohit Mondal
        </Link>
      </div>
    </footer>
  );
}
