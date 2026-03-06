import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Separator,
  Tabs
} from '@/components';
import { useTranslations } from 'next-intl';
import { SelectModule } from '../../select-module/SelectModule';
import { useImportSettings } from './useImportSettings';

export const ImportSettings = () => {
  const t = useTranslations('dataTransfer');
  const {
    tabItems,
    handleConfigChange,
  } = useImportSettings();

  return (
    <Card className="flex flex-col h-full">
      {/* Header */}
      <CardHeader>
        <CardTitle>{t('import.title')}</CardTitle>
        <CardDescription>{t('import.desc')}</CardDescription>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col space-y-6">
        {/* Module & Setting Selector */}
        <SelectModule mode="import" onModuleChange={handleConfigChange} />

        <Separator />

        {/* Wizard Tabs */}
        <div className="flex-1 flex flex-col">
          <Tabs
            items={tabItems}
            defaultValue="upload"
            listClassName="grid w-full grid-cols-4 mb-6"
            contentClassName="flex-1"
          />
        </div>
      </CardContent>
    </Card>
  );
};
