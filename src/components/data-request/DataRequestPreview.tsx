import React from 'react';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FileText, FileDown, BarChart2, Link as LinkIcon, CalendarIcon, User, Mail, Phone, Activity } from 'lucide-react';
import { DataRequestPreviewData } from '@/components/prediction-result/types';
import ComparisonChartPreview from './ComparisonChartPreview';
import { useLanguage } from '@/contexts/LanguageContext';
import { format } from 'date-fns';
import { zhCN } from 'date-fns/locale';

interface DataRequestPreviewProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  data: DataRequestPreviewData;
  onConfirm: () => void;
}

const DataRequestPreview: React.FC<DataRequestPreviewProps> = ({
  open,
  onOpenChange,
  data,
  onConfirm
}) => {
  const { t, language } = useLanguage();
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">{t('data_request_preview')}</DialogTitle>
          <DialogDescription>
            {t('confirm_content_accuracy')}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          {/* 基本信息 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-2">{t('supplier_info')}</h3>
              <Card>
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm font-medium">{t('supplier_name_label')}</p>
                      <p className="p-2 bg-muted/40 rounded mt-1">{data.supplier}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-2">{t('product_info')}</h3>
              <Card>
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm font-medium">{t('product_name_label')}</p>
                      <p className="p-2 bg-muted/40 rounded mt-1">{data.product}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          
          {/* 联系信息 */}
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-2">{t('contact_info_label')}</h3>
            <Card>
              <CardContent className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <div className="flex items-center space-x-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <p className="text-sm font-medium">{t('contact_name_label')}</p>
                    </div>
                    <p className="p-2 bg-muted/40 rounded mt-1">{data.contact.name}</p>
                  </div>
                  
                  <div>
                    <div className="flex items-center space-x-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <p className="text-sm font-medium">{t('contact_email_label')}</p>
                    </div>
                    <p className="p-2 bg-muted/40 rounded mt-1">{data.contact.email}</p>
                  </div>
                  
                  {data.contact.phone && (
                    <div>
                      <div className="flex items-center space-x-2">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <p className="text-sm font-medium">{t('contact_phone_label')}</p>
                      </div>
                      <p className="p-2 bg-muted/40 rounded mt-1">{data.contact.phone}</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* 请求详情 */}
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-2">{t('request_details_label')}</h3>
            <Card>
              <CardContent className="p-4">
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium">{t('requested_data')}</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {data.dataItems.map((item, index) => (
                        <Badge key={index} variant="outline" className="px-2 py-1">
                          <FileText className="h-3 w-3 mr-1" />
                          {item}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* 紧急程度 - 从邮件内容中提取 */}
                    <div>
                      <p className="text-sm font-medium">{t('urgency_level_label')}</p>
                      <div className="flex items-center mt-2">
                        <Activity className="h-4 w-4 mr-2 text-muted-foreground" />
                        <Badge 
                          variant="outline" 
                          className={`
                            ${data.content.includes('高优先级') ? 'bg-red-50 text-red-700 border-red-200' : ''}
                            ${data.content.includes('常规优先级') ? 'bg-amber-50 text-amber-700 border-amber-200' : ''}
                            ${data.content.includes('低优先级') ? 'bg-green-50 text-green-700 border-green-200' : ''}
                          `}
                        >
                          {data.content.includes('高优先级') && t('urgency_high')}
                          {data.content.includes('常规优先级') && t('urgency_medium')}
                          {data.content.includes('低优先级') && t('urgency_low')}
                        </Badge>
                      </div>
                    </div>
                    
                    {data.deadline && (
                      <div>
                        <p className="text-sm font-medium">{t('response_deadline_label')}</p>
                        <div className="flex items-center mt-2">
                          <CalendarIcon className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span>{data.deadline}</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* 邮件主题和内容 */}
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-2">{t('email_info')}</h3>
            <Card>
              <CardContent className="p-4">
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium">{t('email_subject')}</p>
                    <p className="p-2 bg-muted/40 rounded mt-1">{data.subject}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">{t('email_content')}</p>
                    <div className="p-2 bg-muted/40 rounded mt-1 whitespace-pre-line">
                      {data.content}
                    </div>
                    {/* 添加对比图到邮件内容 */}
                    <div className="mt-4 p-3 border border-dashed rounded-md">
                      <p className="text-sm font-medium mb-2">{t('carbon_footprint_chart')}</p>
                      <div className="h-48">
                        <ComparisonChartPreview 
                          competitorsData={data.competitorsData}
                          industryBenchmarks={data.industryBenchmarks}
                          height="100%"
                        />
                      </div>
                      <p className="text-xs text-muted-foreground mt-2 italic">
                        {t('chart_note')}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        
        <DialogFooter className="flex space-x-2 justify-end">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            {t('return_to_edit')}
          </Button>
          <Button onClick={onConfirm}>
            {t('confirm_send')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DataRequestPreview;
