"use client";

import {
  Alert,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  FormNumber,
  FormPassword,
  FormSwitch,
  FormTextBox,
  Separator,
} from "@/components";
import { InfoIcon, KeyIcon, SendIcon, ServerIcon } from "@/icons";
import { useTranslations } from "next-intl";
import { FormProvider } from "react-hook-form";
import { useNotificationSettings } from "./useNotificationSettings";

export default function NotificationSettings() {
  const t = useTranslations("settings.notifications");

  const {
    form,
    handleSave,
    isLoading,
  } = useNotificationSettings();

  return (
    <Card className="border-none shadow-lg">
      <CardHeader className="pb-4">
        <CardTitle className="text-2xl">{t("title")}</CardTitle>
        <CardDescription>{t("description")}</CardDescription>
      </CardHeader>

      <CardContent className="space-y-10 pt-2">
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(handleSave)} className="space-y-10">

            {/* ==================== SMTP Configuration Section ==================== */}
            <section className="space-y-6">
              {/* Section heading with icon */}
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium flex items-center gap-2">
                    <ServerIcon className="h-5 w-5 text-muted-foreground" />
                    {t("smtp.title")}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {t("smtp.desc")}
                  </p>
                </div>
              </div>

              {/* SMTP fields grid */}
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <FormTextBox
                    name="smtpHost"
                    label={t("smtp.host.label")}
                    placeholder="smtp.gmail.com"
                  />
                  <p className="text-xs text-muted-foreground">
                    {t("smtp.host.desc")}
                  </p>
                </div>

                <div className="space-y-2">
                  <FormNumber
                    name="smtpPort"
                    label={t("smtp.port.label")}
                    placeholder="587"
                  />
                  <p className="text-xs text-muted-foreground">
                    {t("smtp.port.desc")}
                  </p>
                </div>
              </div>

              {/* From Email field */}
              <div className="space-y-2">
                <FormTextBox
                  name="fromEmail"
                  label={t("fromEmail.label")}
                  placeholder="no-reply@yourapp.com"
                  type="email"
                />
                <p className="text-xs text-muted-foreground">
                  {t("fromEmail.desc")}
                </p>
              </div>
            </section>

            <Separator className="my-8" />

            {/* ==================== Zalo OA Configuration Section ==================== */}
            <section className="space-y-6">
              {/* Section heading with icon */}
              <div>
                <h3 className="text-lg font-medium flex items-center gap-2">
                  <SendIcon className="h-5 w-5 text-muted-foreground" />
                  {t("zaloOA.title")}
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {t("zaloOA.desc")}
                </p>
              </div>

              {/* Help alert with link to Zalo docs */}
              <Alert
                variant="default"
                icon={<InfoIcon />}
                title={t("zaloOA.help.title")}
              >
                {t("zaloOA.help.desc")}{" "}
                <a
                  href="https://developers.zalo.me/docs/api/official-account-api"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline text-primary hover:text-primary/80"
                >
                  {t("zaloOA.help.link")}
                </a>
              </Alert>

              {/* Zalo fields grid */}
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <FormPassword
                    name="zaloOAToken"
                    label={
                      <>
                        <KeyIcon className="h-4 w-4" />
                        {t("zaloOA.token.label")}
                      </>
                    }
                    placeholder="your-zalo-oa-access-token"
                  />
                  <p className="text-xs text-muted-foreground">
                    {t("zaloOA.token.desc")}
                  </p>
                </div>

                <div className="space-y-2">
                  <FormTextBox
                    name="zaloOAID"
                    label={t("zaloOA.oaId.label")}
                    placeholder="your-oa-id"
                  />
                  <p className="text-xs text-muted-foreground">
                    {t("zaloOA.oaId.desc")}
                  </p>
                </div>
              </div>

              {/* Enable toggle */}
              <div className="flex items-center justify-between pt-2">
                <div className="space-y-0.5">
                  <FormSwitch
                    name="enableZalo"
                    label={t("enableZalo.label")}
                  />
                  <p className="text-sm text-muted-foreground ml-10">
                    {t("enableZalo.desc")}
                  </p>
                </div>
              </div>
            </section>

            <Separator className="my-8" />

            {/* ==================== Form Actions ==================== */}
            <div className="flex justify-end">
              <Button
                type="submit"
                disabled={isLoading}
                className="min-w-45"
              >
                {isLoading ? t("saving") : t("saveChanges")}
              </Button>
            </div>
          </form>
        </FormProvider>
      </CardContent>
    </Card>
  );
}
