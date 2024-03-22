import { useLocale } from "next-intl";
import { useEffect, useState } from "react";

interface Props {
  postDate: Date;
}

const TimeAgo: React.FC<Props> = ({ postDate }) => {
  const [timeAgo, setTimeAgo] = useState<string>("");
  const locale = useLocale();
  const isArabic = locale === "ar";

  useEffect(() => {
    const calculateTimeAgo = () => {
      const now = new Date();
      const timeDiff = now.getTime() - postDate?.getTime();

      const seconds = Math.floor(timeDiff / 1000);
      const minutes = Math.floor(seconds / 60);
      const hours = Math.floor(minutes / 60);
      const days = Math.floor(hours / 24);
      const weeks = Math.floor(days / 7);
      const months = Math.floor(days / 30);

      const secondsPhrase = `قبل ${seconds} ${
        seconds > 3 && seconds <= 10 ? "ثواني" : "ثانية"
      }`;
      const minutesPhrase = `قبل ${minutes} ${
        minutes === 2
          ? "دقيقتين"
          : `${minutes >= 3 && minutes <= 10 ? "دقائق" : "دقيقة"}`
      }`;
      const hoursPhrase = `قبل ${hours} ${
        hours === 2
          ? "ساعتين"
          : `${hours >= 3 && hours <= 10 ? "ساعات" : "ساعة"}`
      }`;
      const daysPhrase = `قبل ${days} ${
        days === 2 ? "يومان" : `${days >= 3 && days <= 10 ? "أيام" : "يوم"}`
      }`;
      const weeksPhrase = `قبل ${weeks} ${
        weeks === 2
          ? "إسبوعان"
          : `${weeks >= 3 && weeks <= 10 ? "أسابيع" : "إسبوع"}`
      }`;
      const monthsPhrase = `قبل ${months} ${
        months === 2
          ? "شهران"
          : `${months >= 3 && months <= 10 ? "أشهر" : "شهر"}`
      }`;

      if (months > 0) {
        setTimeAgo(
          `${
            isArabic
              ? monthsPhrase
              : `${months} ${months === 1 ? "month" : "months"} ago`
          }`
        );
      } else if (weeks > 0) {
        setTimeAgo(
          `${
            isArabic
              ? weeksPhrase
              : `${weeks} ${weeks === 1 ? "week" : "weeks"} ago`
          }`
        );
      } else if (days > 0) {
        setTimeAgo(
          `${
            isArabic ? daysPhrase : `${days} ${days === 1 ? "day" : "days"} ago`
          }`
        );
      } else if (hours > 0) {
        setTimeAgo(
          `${
            isArabic
              ? hoursPhrase
              : `${hours} ${hours === 1 ? "hour" : "hours"} ago`
          }`
        );
      } else if (minutes > 0) {
        setTimeAgo(
          `${
            isArabic
              ? minutesPhrase
              : `${minutes} ${minutes === 1 ? "minute" : "minutes"} ago`
          }`
        );
      } else {
        setTimeAgo(
          `${
            isArabic
              ? secondsPhrase
              : `${seconds} ${seconds === 1 ? "second" : "seconds"} ago`
          }`
        );
      }
    };

    const intervalId = setInterval(calculateTimeAgo, 60000); // Update every minute

    calculateTimeAgo(); // Initial calculation

    return () => clearInterval(intervalId);
  }, [isArabic, postDate]);

  return <span>{timeAgo}</span>;
};

export default TimeAgo;
