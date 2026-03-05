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
import { useState } from 'react';
import { ImportConfig } from '../../../type';
import { SelectModule } from '../../select-module/SelectModule';
import { MappingStep } from '../steps/mapping-step/MappingStep';
import { RangeStep } from '../steps/range-step/RangeStep';
import { UploadStep } from '../steps/upload-step/UploadStep';
import { ValidateStep } from '../steps/validate-step/ValidateStep';

export const ImportSettings = () => {
  const t = useTranslations('dataTransfer');
  const [selectedConfig, setSelectedConfig] = useState<ImportConfig | null>(null);

  const handleConfigChange = (conf: ImportConfig | null) => {
    setSelectedConfig(conf);
  };

  const tabItems = [
    {
      value: 'upload',
      label: t('import.step.upload'),
      content: <UploadStep />,
    },
    {
      value: 'mapping',
      label: t('import.step.mapping'),
      content: <MappingStep config={selectedConfig} parsedHeaders={['ID', 'Title', 'Date', 'Status']} />,
    },
    {
      value: 'range',
      label: t('import.step.range'),
      content: <RangeStep config={selectedConfig} />,
    },
    {
      value: 'validate',
      label: t('import.step.validate'),
      content: <ValidateStep config={selectedConfig} />,
    },
  ];

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
