import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle, Separator } from "@/components";
import { useTranslations } from "next-intl";
import { SelectModule } from "../../select-module/SelectModule";

export const ImportSettings = () => {
  const t = useTranslations('dataTransfer');
  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('import.title')}</CardTitle>
        <CardDescription>{t('import.desc')}</CardDescription>
      </CardHeader>
      <CardContent>
        <SelectModule mode="import" onModuleChange={() => { }} />

        <Separator className="my-4" />

        <p className="text-muted-foreground">
          Import config UI sẽ được triển khai ở đây (matching key, vùng dữ liệu, action
          column A / _action, v.v.)
        </p>
        <div className="mt-6 flex gap-4">
          <Button variant="outline">{t('actions.preview')}</Button>
          <Button>{t('actions.save')}</Button>
        </div>
      </CardContent>
    </Card>
  )
}
