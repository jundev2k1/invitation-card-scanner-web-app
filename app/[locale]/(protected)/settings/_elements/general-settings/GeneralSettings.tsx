"use client";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  FormIconTextBox,
  FormTextArea,
  FormTextBox,
  Label,
  Separator
} from "@/components";
import { ClockIcon, DollarSignIcon, MailIcon, UploadIcon } from "@/icons";
import { useTranslations } from "next-intl";
import { ChangeEvent, useState } from "react";
import { FormProvider } from "react-hook-form";
import { useGeneralSettings } from "./useGeneralSettings";

export default function GeneralSettings() {
  const t = useTranslations("settings.general");
  const { form, handleSave, isLoading } = useGeneralSettings();

  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [faviconPreview, setFaviconPreview] = useState<string | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>, type: "logo" | "favicon") => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (type === "logo") setLogoPreview(reader.result as string);
        else setFaviconPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      if (type === "logo") {
        form.setValue("logoUrl", file.name);
      } else {
        form.setValue("faviconUrl", file.name);
      }
    }
  };

  return (
    <Card className="border-none shadow-lg">
      <CardHeader className="pb-4">
        <CardTitle className="text-2xl">{t("title")}</CardTitle>
        <CardDescription>{t("desc")}</CardDescription>
      </CardHeader>

      <CardContent className="space-y-10 pt-2">
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(handleSave)}>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium">{t("branding.title")}</h3>
                  <p className="text-sm text-muted-foreground">{t("branding.desc")}</p>
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-3">
                  <Label>{t("logo.label")}</Label>
                  <div className="flex items-center gap-4">
                    <Avatar className="h-20 w-20 border">
                      <AvatarImage src={logoPreview || form.getValues("logoUrl")} alt="Logo" />
                      <AvatarFallback className="text-2xl bg-muted">
                        {form.getValues("siteName")?.toUpperCase() || "?"}
                      </AvatarFallback>
                    </Avatar>
                    <div className="space-y-2">
                      <label htmlFor="logo-upload" className="cursor-pointer flex items-center gap-2">
                        <UploadIcon className="h-4 w-4" />
                        {t("logo.upload")}
                      </label>
                      <input
                        id="logo-upload"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleFileChange(e, "logo")}
                      />
                      <p className="text-xs text-muted-foreground">{t("logo.hint")}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <Label className="text-slate-900 dark:text-muted-foreground">
                    {t("favicon.label")}
                  </Label>
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-md border bg-muted flex items-center justify-center text-2xl">
                      {faviconPreview ? (
                        <img src={faviconPreview} alt="Favicon" className="h-8 w-8" />
                      ) : (
                        "F"
                      )}
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="favicon-upload" className="cursor-pointer flex items-center gap-2">
                        <UploadIcon className="h-4 w-4" />
                        {t("favicon.upload")}
                      </label>
                      <input
                        id="favicon-upload"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleFileChange(e, "favicon")}
                      />
                      <p className="text-xs text-muted-foreground">{t("favicon.hint")}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <FormTextBox
                    name="siteName"
                    label={t("siteName.label")}
                    placeholder={t("siteName.placeholder")}
                  />
                  <p className="text-xs text-muted-foreground">{t("siteName.desc")}</p>
                </div>

                <div className="space-y-2">
                  <FormTextBox
                    name="slogan"
                    label={t("slogan.label")}
                    placeholder={t("slogan.placeholder")}
                  />
                </div>
              </div>
            </div>

            <Separator className="my-8" />

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium">{t("metadata.title")}</h3>
                <p className="text-sm text-muted-foreground">{t("metadata.desc")}</p>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <FormTextArea
                    name="description"
                    label={t("description.label")}
                    placeholder={t("description.placeholder")}
                    rows={3}
                  />
                  <p className="text-xs text-muted-foreground">{t("description.desc")}</p>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <FormTextBox
                      name="keywords"
                      label={t("keywords.label")}
                      placeholder="saas, nextjs, admin, dashboard"
                    />
                    <p className="text-xs text-muted-foreground">{t("keywords.desc")}</p>
                  </div>

                  <div className="space-y-2">
                    <FormTextBox
                      name="ogImageUrl"
                      label={t("ogImage.label")}
                      placeholder="https://your-site.com/og-image.jpg"
                    />
                  </div>
                </div>
              </div>
            </div>

            <Separator className="my-8" />

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium">{t("additional.title")}</h3>
                <p className="text-sm text-muted-foreground">{t("additional.desc")}</p>
              </div>

              <div className="grid gap-6 md:grid-cols-3">
                <div className="space-y-2">
                  <FormIconTextBox
                    name="timezone"
                    label={t("timezone.label")}
                    rightIcon={ClockIcon}
                    placeholder="Asia/Ho_Chi_Minh"
                  />
                </div>

                <div className="space-y-2">
                  <FormIconTextBox
                    name="currency"
                    label={t("currency.label")}
                    rightIcon={DollarSignIcon}
                    placeholder="VND"
                  />
                </div>

                <div className="space-y-2">
                  <FormIconTextBox
                    type="email"
                    name="supportEmail"
                    label={t("supportEmail.label")}
                    rightIcon={MailIcon}
                    placeholder="support@yourapp.com"
                  />
                </div>
              </div>
            </div>

            <Separator className="my-8" />

            <div className="flex justify-end pt-3">
              <Button
                onClick={handleSave}
                disabled={isLoading}
                size="lg"
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
