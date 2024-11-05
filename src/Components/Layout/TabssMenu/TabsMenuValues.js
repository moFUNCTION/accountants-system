import { IoAnalyticsOutline } from "react-icons/io5";
import { BiChat } from "react-icons/bi";
import { FaUsers } from "react-icons/fa6";
import { CiUser } from "react-icons/ci";
import { FaUserTie } from "react-icons/fa";
import { ImUserTie } from "react-icons/im";
import { MdPassword, MdQuiz } from "react-icons/md";

export const TabsValues = [
  {
    title: "الحساب",
    Icon: CiUser,
    href: "/user",
  },
  {
    title: "تغيير الرقم السري",
    Icon: MdPassword,
    href: "/user",
  },
  {
    title: "المحادثات",
    Icon: BiChat,
    href: "/chat",
  },
  {
    title: "الاحصائيات",
    Icon: IoAnalyticsOutline,
    href: "/analytics",
  },
  {
    title: "المستخدمين",
    Icon: FaUsers,
    childsLinks: [
      {
        title: "المحاسبين",
        Icon: FaUserTie,
        href: "/analytics/totalalyOutcome",
      },
      {
        title: "العملاء",
        Icon: ImUserTie,
      },
    ],
  },
  {
    title: "طلبيات المحاسبين",
    Icon: MdQuiz,
    href: "/accounants-applications",
  },
  {
    title: "طلبيات الشركات",
    Icon: MdQuiz,
    href: "/companies-applications",
  },
];
