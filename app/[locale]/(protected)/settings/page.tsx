"use client";

import { PageContent, Separator } from "@/components";
import { useTranslations } from "next-intl";
import NotificationSettings from "./_elements/email-settings/NotificationSettings";
import GeneralSettings from "./_elements/general-settings/GeneralSettings";

export default function SettingsPage() {
  const t = useTranslations("settings");
  return (
    <PageContent
      title={t("title")}
      description={t("description")}
      breadcrumbs={[{ label: t("title"), href: "#" }]}
      noWrapper
    >
      <>
        <div className="space-y-8">
          {/* Section 1: General */}
          <section id="general" className="space-y-6">
            <GeneralSettings />
            <Separator className="my-8" />
          </section>

          {/* Section 2: Email & Notification */}
          <section id="notifications" className="space-y-6">
            <NotificationSettings />
          </section>
        </div>
      </>
    </PageContent>
  );
}
