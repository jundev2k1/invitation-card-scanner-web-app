"use client";
import { FormPassword, FormRadioGroup, FormTextArea, FormTextBox } from "@/app/components";
import { LoaderIcon } from "@/app/components/icons";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Sex } from "@/types";
import { useTranslations } from "next-intl";
import { FormProvider } from "react-hook-form";
import { useRegisterPage } from "./useRegisterPage";

export default function RegisterPage() {
  const {
    form,
    isSubmitting,
    registerButtonRef,
    onSubmit,
    redirectToLoginPage
  } = useRegisterPage();
  const t = useTranslations();

  const sexOptions = [
    { value: Sex.MALE, label: t("user.enum.gender.MALE") },
    { value: Sex.FEMALE, label: t("user.enum.gender.FEMALE") },
    { value: Sex.OTHER, label: t("user.enum.gender.OTHER") },
  ];

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-linear-to-br from-gray-950 via-indigo-950 to-purple-950">
      {/* Background decorative orbs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-32 -top-48 h-96 w-96 rounded-full bg-purple-600 opacity-20 blur-3xl" />
        <div className="absolute -right-32 bottom-32 h-80 w-80 rounded-full bg-cyan-500 opacity-20 blur-3xl" />
      </div>

      <div className="relative flex min-h-screen items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <Card className="mx-auto w-full max-w-lg border border-slate-700 bg-slate-900/80 backdrop-blur-lg shadow-2xl transition-all hover:shadow-purple-500/20 hover:border-purple-500/40">
          <CardHeader className="space-y-4 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-linear-to-br from-purple-600 to-indigo-600 text-white shadow-md">
              <span className="text-3xl font-bold tracking-tight">NT</span>
            </div>
            <CardTitle className="text-3xl font-bold tracking-tight text-white">
              {t('auth.register.title')}
            </CardTitle>
            <CardDescription className="text-slate-400">
              {t('auth.register.desc')}
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <FormProvider {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                  {/* Username - required */}
                  <div className="space-y-2">
                    <FormTextBox
                      name="username"
                      label={t('auth.register.form.lbUsername')}
                      className="border-slate-700 bg-slate-950 text-white placeholder:text-slate-500 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30 focus:ring-offset-2 focus:ring-offset-slate-950 transition-all"
                      placeholder="user01"
                      autoComplete="username"
                      autoFocus
                      isRequired
                    />
                  </div>

                  {/* Email - required */}
                  <div className="space-y-2">
                    <FormTextBox
                      name="email"
                      label={t('auth.register.form.lbEmail')}
                      className="border-slate-700 bg-slate-950 text-white placeholder:text-slate-500 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30 focus:ring-offset-2 focus:ring-offset-slate-950 transition-all"
                      placeholder="user01@example.com"
                      autoComplete="email"
                      isRequired
                    />
                  </div>

                  {/* Password */}
                  <div className="space-y-2 md:col-span-2">
                    <FormPassword
                      name="password"
                      label={t('auth.register.form.lbPassword')}
                      className="border-slate-700 bg-slate-950 pr-10 text-white placeholder:text-slate-500 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30 focus:ring-offset-2 focus:ring-offset-slate-950 transition-all"
                      placeholder="••••••••"
                      autoComplete="new-password"
                      isRequired
                    />
                  </div>

                  {/* Nickname */}
                  <div className="space-y-2">
                    <FormTextBox
                      name="nickname"
                      label={t('auth.register.form.lbNickname')}
                      className="border-slate-700 bg-slate-950 text-white placeholder:text-slate-500 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30 focus:ring-offset-2 focus:ring-offset-slate-950 transition-all"
                      placeholder="User 01"
                      autoComplete="nickname"
                    />
                  </div>

                  {/* Phone Number */}
                  <div className="space-y-2">
                    <FormTextBox
                      name="phoneNumber"
                      label={t('auth.register.form.lbPhoneNumber')}
                      className="border-slate-700 bg-slate-950 text-white placeholder:text-slate-500 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30 focus:ring-offset-2 focus:ring-offset-slate-950 transition-all"
                      autoComplete="phoneNumber"
                      placeholder="0969456789"
                    />
                  </div>

                  {/* Sex - Radio Group */}
                  <div className="space-y-2 md:col-span-2">
                    <FormRadioGroup
                      name="sex"
                      label={t('auth.register.form.lbGender')}
                      options={sexOptions}
                      className="flex gap-3"
                    />
                  </div>

                  {/* Bio */}
                  <div className="space-y-2 md:col-span-2">
                    <FormTextArea
                      name="bio"
                      label={t('auth.register.form.lbBio')}
                      className="min-h-20 border-slate-700 bg-slate-950 text-white placeholder:text-slate-500 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30 focus:ring-offset-2 focus:ring-offset-slate-950 transition-all resize-none"
                      placeholder="Example bio."
                      maxLength={4000}
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  ref={registerButtonRef}
                  disabled={isSubmitting}
                  className={cn(
                    "w-full bg-linear-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-lg shadow-purple-500/30 transition-all mt-2 cursor-pointer",
                    isSubmitting && "opacity-70 cursor-not-allowed"
                  )}
                >
                  {isSubmitting && <LoaderIcon className="mr-2 h-5 w-5 animate-spin" />}
                  {isSubmitting ? t('auth.register.form.btnSignUpLoading') : t('auth.register.form.btnSignUp')}
                </Button>
              </form>
            </FormProvider>
          </CardContent>

          <CardFooter className="flex justify-center border-t border-slate-800 pt-6 text-sm text-slate-400">
            {t('auth.register.footer.haveAccount')}
            <Button
              variant="link"
              className="ml-1.5 text-purple-400 hover:text-purple-300 cursor-pointer"
              onClick={redirectToLoginPage}
            >
              {t('auth.register.footer.signIn')}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
