
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Activity, Calendar, Clock, FileCheck, Users } from 'lucide-react';

const WorkspaceOrderManagement: React.FC = () => {
  const { t } = useLanguage();
  
  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6">{t('order_management')}</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {t('total_orders')}
            </CardTitle>
            <FileCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">25</div>
            <p className="text-xs text-muted-foreground">
              +3 {t('from_last_month')}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {t('pending_orders')}
            </CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7</div>
            <p className="text-xs text-muted-foreground">
              -2 {t('from_last_month')}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {t('active_clients')}
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">
              +2 {t('from_last_month')}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {t('completed_this_month')}
            </CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">
              +1 {t('from_last_month')}
            </p>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="upcoming">
        <TabsList className="mb-6">
          <TabsTrigger value="upcoming">{t('upcoming_deadlines')}</TabsTrigger>
          <TabsTrigger value="activity">{t('recent_activity')}</TabsTrigger>
          <TabsTrigger value="notes">{t('client_notes')}</TabsTrigger>
        </TabsList>
        
        <TabsContent value="upcoming">
          <Card>
            <CardHeader>
              <CardTitle>{t('upcoming_deadlines')}</CardTitle>
              <CardDescription>
                {t('upcoming_deadlines_desc')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center p-3 border rounded-lg">
                    <div className="p-2 bg-primary/10 rounded-full mr-4">
                      <Calendar className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium">ORD-2023-00{i} · 绿能科技</h4>
                      <p className="text-sm text-muted-foreground">
                        {t('due_in_days', { days: i * 2 })}
                      </p>
                    </div>
                    <Button size="sm" variant="outline" className="ml-auto">
                      {t('view')}
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="activity">
          <Card>
            <CardHeader>
              <CardTitle>{t('recent_activity')}</CardTitle>
              <CardDescription>
                {t('recent_activity_desc')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border-l-2 border-primary pl-4 ml-2 space-y-4">
                  {[
                    { action: t('order_status_changed'), time: '2 hours ago' },
                    { action: t('new_order_received'), time: '1 day ago' },
                    { action: t('report_generated'), time: '2 days ago' },
                    { action: t('client_data_updated'), time: '3 days ago' }
                  ].map((activity, i) => (
                    <div key={i} className="relative">
                      <div className="absolute -left-[22px] w-3 h-3 bg-primary rounded-full"></div>
                      <h4 className="text-sm font-medium">{activity.action}</h4>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="notes">
          <Card>
            <CardHeader>
              <CardTitle>{t('client_notes')}</CardTitle>
              <CardDescription>
                {t('client_notes_desc')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { client: '绿环包装科技', note: t('sample_note_1') },
                  { client: '自然家居集团', note: t('sample_note_2') },
                  { client: '绿能科技', note: t('sample_note_3') }
                ].map((note, i) => (
                  <div key={i} className="p-3 border rounded-lg">
                    <h4 className="font-medium">{note.client}</h4>
                    <p className="text-sm text-muted-foreground mt-1">{note.note}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default WorkspaceOrderManagement;
