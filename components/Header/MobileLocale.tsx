import Image from "next/image";
import { createSharedPathnamesNavigation } from "next-intl/navigation";

export const locales = ["ar", "en"];
const { Link, usePathname } = createSharedPathnamesNavigation({ locales });

const MobileLocale = () => {
  const pathname = usePathname();
  return (
    <div className={`flex flex-row gap-2`}>
      {" "}
      <Link href={pathname} locale="en">
        <Image
          src="/images/locale/uk.png"
          alt="en"
          width={40}
          height={40}
          className="object-scale-down"
        />
      </Link>
      <Link href={pathname} locale="ar">
        <Image
          src="/images/locale/ksa.png"
          alt="ar"
          width={40}
          height={40}
          className="object-scale-down"
        />
      </Link>
    </div>
  );
};

export default MobileLocale;
