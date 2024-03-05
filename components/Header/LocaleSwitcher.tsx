import Image from "next/image";
import { useLocale } from "next-intl";
import { createSharedPathnamesNavigation } from "next-intl/navigation";

export const locales = ["ar", "en"];
const { Link, usePathname } = createSharedPathnamesNavigation({ locales });

function LocaleSwitcher() {
  const pathname = usePathname();
  const locale = useLocale();

  return (
    <li className="group relative hidden lg:block">
      {locale === "ar" ? (
        <Link
          href={pathname}
          locale="en"
          className="lg:contrast-[95%] hover:contrast-125"
        >
          <Image
            src="/images/locale/uk.png"
            alt="en"
            width={35}
            height={35}
            className="object-scale-down hover:scale-105 transition-all duration-300 ease-linear"
          />
        </Link>
      ) : (
        <Link
          href={pathname}
          locale="ar"
          className="lg:contrast-[95%] hover:contrast-125"
        >
          <Image
            src="/images/locale/ksa.png"
            alt="ar"
            width={70}
            height={70}
            className="object-scale-down hover:scale-105 transition-all duration-300 ease-linear"
          />
        </Link>
      )}
    </li>
  );
}

export default LocaleSwitcher;
