
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
import { FileText, FileDown, BarChart2, Link as LinkIcon, CalendarIcon, User, Mail, Phone } from 'lucide-react';
import { DataRequestPreviewData } from '@/components/prediction-result/types';

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
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">数据请求预览</DialogTitle>
          <DialogDescription>
            请确认以下内容是否准确，准确无误后点击发送
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          {/* 基本信息 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-2">供应商信息</h3>
              <Card>
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm font-medium">供应商名称</p>
                      <p>{data.supplier}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">产品名称</p>
                      <p>{data.product}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-2">联系方式</h3>
              <Card>
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-2 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">联系人</p>
                        <p>{data.contact.name}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">邮箱</p>
                        <p>{data.contact.email}</p>
                      </div>
                    </div>
                    {data.contact.phone && (
                      <div className="flex items-center">
                        <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">电话</p>
                          <p>{data.contact.phone}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          
          {/* 请求数据项 */}
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-2">请求数据项</h3>
            <Card>
              <CardContent className="p-4">
                <div className="flex flex-wrap gap-2">
                  {data.dataItems.map((item, index) => (
                    <Badge key={index} variant="outline" className="bg-primary/10 border-primary/20">
                      {item}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* 竞品对比数据 */}
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-2">竞品对比数据</h3>
            <Card>
              <CardContent className="p-4">
                <div className="space-y-3">
                  {data.competitorsData.map((competitor, index) => (
                    <div key={index} className="flex justify-between items-center border-b pb-2 last:border-0 last:pb-0">
                      <span>{competitor.name}</span>
                      <div className="flex items-center">
                        <span className="font-medium">{competitor.carbonValue}</span>
                        <span className="text-sm text-muted-foreground ml-1">{competitor.unit}</span>
                        <Badge 
                          className={`ml-2 ${
                            competitor.difference.startsWith('-') 
                              ? 'bg-green-100 text-green-800 hover:bg-green-200 border-green-200' 
                              : 'bg-amber-100 text-amber-800 hover:bg-amber-200 border-amber-200'
                          }`}
                        >
                          {competitor.difference}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* 行业基准数据 */}
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-2">行业基准数据</h3>
            <Card>
              <CardContent className="p-4">
                <div className="space-y-3">
                  {data.industryBenchmarks.map((benchmark, index) => (
                    <div key={index} className="flex justify-between items-center border-b pb-2 last:border-0 last:pb-0">
                      <span>{benchmark.name}</span>
                      <div className="flex items-center">
                        <span className="font-medium">{benchmark.value}</span>
                        <span className="text-sm text-muted-foreground ml-1">{benchmark.unit}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* 相关报告链接 */}
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-2">相关报告链接</h3>
            <Card>
              <CardContent className="p-4">
                <div className="space-y-3">
                  {data.reportLinks.map((link, index) => (
                    <div key={index} className="flex items-center">
                      {link.type === 'prediction' ? (
                        <BarChart2 className="h-4 w-4 mr-2 text-blue-600" />
                      ) : link.type === 'ilcd' ? (
                        <FileDown className="h-4 w-4 mr-2 text-green-600" />
                      ) : (
                        <FileText className="h-4 w-4 mr-2 text-gray-600" />
                      )}
                      <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline flex items-center">
                        {link.name}
                        <LinkIcon className="h-3 w-3 ml-1" />
                      </a>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* 截止日期 */}
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-2">截止日期</h3>
            <Card>
              <CardContent className="p-4 flex items-center">
                <CalendarIcon className="h-4 w-4 mr-2 text-muted-foreground" />
                <span>{data.deadline}</span>
              </CardContent>
            </Card>
          </div>
          
          {/* 邮件主题和内容 */}
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-2">邮件信息</h3>
            <Card>
              <CardContent className="p-4">
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium">邮件主题</p>
                    <p className="p-2 bg-muted/40 rounded mt-1">{data.subject}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">邮件内容</p>
                    <div className="p-2 bg-muted/40 rounded mt-1 whitespace-pre-line">
                      {data.content}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        
        <DialogFooter className="flex space-x-2 justify-end">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            返回编辑
          </Button>
          <Button onClick={onConfirm}>
            确认发送
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DataRequestPreview;
