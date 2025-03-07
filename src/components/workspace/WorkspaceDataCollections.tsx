
import React from 'react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

const WorkspaceDataCollections: React.FC = () => {
  const { t } = useLanguage();
  
  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6">{t('data_collections')}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-card rounded-lg shadow-sm border border-border p-4">
          <h3 className="font-medium mb-3">{t('product_carbon_data')}</h3>
          <p className="text-sm text-muted-foreground mb-4">
            {t('product_carbon_data_desc')}
          </p>
          <div className="flex justify-between items-center">
            <span className="text-sm">{t('last_updated')}: 2023-07-20</span>
            <Button size="sm" variant="outline">{t('view')}</Button>
          </div>
        </div>
        <div className="bg-card rounded-lg shadow-sm border border-border p-4">
          <h3 className="font-medium mb-3">{t('production_process_data')}</h3>
          <p className="text-sm text-muted-foreground mb-4">
            {t('production_process_data_desc')}
          </p>
          <div className="flex justify-between items-center">
            <span className="text-sm">{t('last_updated')}: 2023-07-15</span>
            <Button size="sm" variant="outline">{t('view')}</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkspaceDataCollections;
