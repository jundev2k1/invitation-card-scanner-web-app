import { Button, Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components";
import { EyeIcon } from "@/icons";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { ExportConfig, ImportConfig } from "../../type";
import { PreviewHeader } from "./table/PreviewHeader";
import { PreviewTable } from "./table/PreviewTable";

interface PreviewConfigProps {
  setting: ExportConfig | ImportConfig | null,
  type: 'export' | 'import'
}

export const PreviewConfig = ({ setting, type }: PreviewConfigProps) => {
  const t = useTranslations("dataTransfer");
  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      <Button leftIcon={<EyeIcon />} onClick={() => setOpen(true)} variant="outline">
        {t('export.preview')}
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-7xl! h-[80vh] flex flex-col p-0">
          <div className="p-6 pb-0">
            <DialogTitle>{t('export.preview')}</DialogTitle>
            <DialogDescription>{setting?.description}</DialogDescription>
          </div>

          <div className="flex-1 overflow-hidden p-6">
            <PreviewHeader config={setting} type={type} />
            <PreviewTable config={setting as ExportConfig} type={type} />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
