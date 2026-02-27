import { defaultLocale } from "@/i18n/request";
import { CookieStore } from "@/lib/cookies";
import { RouteUtil } from "@/utils/route";
import { useRouter } from "next/navigation";

export default function Home() {
  const locale = CookieStore.language || defaultLocale;
  const router = useRouter();
  router.push(RouteUtil.getDashboardRoute(locale));
}
