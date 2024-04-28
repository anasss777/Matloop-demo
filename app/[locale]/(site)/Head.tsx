import { useTranslations } from "next-intl";

export default function Head() {
  const t = useTranslations("head");

  return (
    <head>
      <title>{t("title")}</title>
      <meta content="width=device-width, initial-scale=1" name="viewport" />
      <meta name="description" content={t("description")} />
      <link rel="icon" href="/images/logo.ico" sizes="any" as="image" />
      {/* <link
        href="https://fonts.googleapis.com/css2?family=Aref+Ruqaa:wght@400;700&family=Dancing+Script:wght@400..700&family=Gulzar&family=McLaren&family=Montserrat:wght@300&family=Tajawal:wght@200;300;400;500;700;800;900&display=swap"
        rel="stylesheet"
      /> */}
    </head>
  );
}
