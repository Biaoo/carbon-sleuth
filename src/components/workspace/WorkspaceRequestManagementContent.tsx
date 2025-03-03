
import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardFooter 
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { 
  Mail, 
  Phone, 
  Send, 
  FileText, 
  Clock, 
  Download,
} from 'lucide-react';

// 模拟数据
const mockRequests = [
  {
    id: 'req-001',
    supplier: '上海绿能科技有限公司',
    product: '太阳能电池板 Model-SE300',
    status: 'pending',
    date: '2023-11-15',
    deadline: '2023-11-30',
    method: 'email',
    contact: 'contact@greenenergy.com',
  },
  {
    id: 'req-002',
    supplier: '江苏新材料科技股份有限公司',
    product: '复合材料 XM-200',
    status: 'completed',
    date: '2023-11-10',
    deadline: '2023-11-25',
    method: 'email',
    contact: 'info@jsnewmaterial.com',
  },
  {
    id: 'req-003',
    supplier: '广东高效能源有限公司',
    product: '锂电池组件 LB-500',
    status: 'rejected',
    date: '2023-11-05',
    deadline: '2023-11-20',
    method: 'wechat',
    contact: 'gdhighpower@example.com',
  },
  {
    id: 'req-004',
    supplier: '北京清洁能源技术有限公司',
    product: '风力发电机叶片 FP-120',
    status: 'waiting',
    date: '2023-11-01',
    deadline: '2023-11-16',
    method: 'dingtalk',
    contact: 'bj_cleanenergy@example.com',
  },
];

// 状态映射
const statusMap = {
  pending: { label: '等待回复', color: 'bg-amber-500' },
  completed: { label: '已完成', color: 'bg-green-500' },
  rejected: { label: '已拒绝', color: 'bg-red-500' },
  waiting: { label: '准备发送', color: 'bg-blue-500' },
};

// 请求方式映射
const methodMap = {
  email: { label: '邮件', icon: Mail },
  sms: { label: '短信', icon: Phone },
  wechat: { label: '微信', icon: Send },
  dingtalk: { label: '钉钉', icon: Send },
};

const WorkspaceRequestManagementContent: React.FC = () => {
  const [selectedRequest, setSelectedRequest] = useState<any>(null);

  // 处理选择请求
  const handleSelectRequest = (request: any) => {
    setSelectedRequest(request);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6">请求管理</h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* 左侧请求列表 */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold mb-3">请求记录</h2>
          
          <div className="flex items-center space-x-2 mb-4">
            <Input placeholder="搜索请求..." className="max-w-xs" />
            <Select defaultValue="all">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="状态筛选" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">全部状态</SelectItem>
                <SelectItem value="pending">等待回复</SelectItem>
                <SelectItem value="completed">已完成</SelectItem>
                <SelectItem value="rejected">已拒绝</SelectItem>
                <SelectItem value="waiting">准备发送</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-3">
            {mockRequests.map((request) => (
              <Card 
                key={request.id} 
                className={`cursor-pointer transition-all ${selectedRequest?.id === request.id ? 'ring-2 ring-primary' : ''}`}
                onClick={() => handleSelectRequest(request)}
              >
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">{request.supplier}</h3>
                      <p className="text-sm text-muted-foreground mt-1">{request.product}</p>
                      <div className="flex items-center text-xs text-muted-foreground mt-2">
                        <Clock className="h-3 w-3 mr-1" />
                        <span>{request.date}</span>
                      </div>
                    </div>
                    <Badge className={statusMap[request.status as keyof typeof statusMap].color}>
                      {statusMap[request.status as keyof typeof statusMap].label}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        
        {/* 右侧请求详情 */}
        <div className="lg:col-span-2">
          {selectedRequest ? (
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>请求详情</CardTitle>
                  <Badge className={statusMap[selectedRequest.status as keyof typeof statusMap].color}>
                    {statusMap[selectedRequest.status as keyof typeof statusMap].label}
                  </Badge>
                </div>
                <CardDescription>
                  请求 ID: {selectedRequest.id}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground mb-1">供应商</h3>
                      <p className="font-medium">{selectedRequest.supplier}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground mb-1">产品</h3>
                      <p className="font-medium">{selectedRequest.product}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground mb-1">联系方式</h3>
                      <div className="flex items-center">
                        {React.createElement(
                          methodMap[selectedRequest.method as keyof typeof methodMap].icon, 
                          { className: "h-4 w-4 mr-2" }
                        )}
                        <p>{selectedRequest.contact}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground mb-1">发送日期</h3>
                      <p>{selectedRequest.date}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground mb-1">响应截止日期</h3>
                      <p>{selectedRequest.deadline}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground mb-1">响应进度</h3>
                      <Progress value={selectedRequest.status === 'completed' ? 100 : 30} className="h-2 mt-2" />
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  <h3 className="font-medium">请求内容</h3>
                  <div className="bg-muted/50 rounded-md p-4 text-sm">
                    <p>尊敬的供应商：</p>
                    <br />
                    <p>您好！我们是贵司产品的采购方，正在进行供应链碳足迹评估工作。我们的系统对贵司的{selectedRequest.product}进行了碳足迹预测分析。为了确保数据准确性，我们希望能获取贵司的实际碳足迹数据。</p>
                    <br />
                    <p>我们的预测结果显示，该产品的碳足迹约为 45.6 kgCO2e/件。如果贵司有实际测算数据，请提供给我们，以便我们更准确地评估整体供应链的碳排放情况。</p>
                    <br />
                    <p>感谢您的配合！</p>
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  <h3 className="font-medium">请求附件</h3>
                  <div className="flex items-center justify-between bg-muted/50 rounded-md p-3">
                    <div className="flex items-center">
                      <FileText className="h-5 w-5 mr-2 text-muted-foreground" />
                      <span>产品碳足迹预测报告.pdf</span>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Download className="h-4 w-4 mr-1" />
                      下载
                    </Button>
                  </div>
                </div>
                
                {selectedRequest.status === 'completed' && (
                  <>
                    <Separator />
                    <div className="space-y-4">
                      <h3 className="font-medium">供应商响应</h3>
                      <div className="bg-muted/50 rounded-md p-4 text-sm">
                        <p>感谢您的数据请求。</p>
                        <br />
                        <p>我们已审核了您的请求，并在附件中提供了我们产品的实际碳足迹数据。根据我们的测算，{selectedRequest.product}的碳足迹为 42.3 kgCO2e/件，略低于您的预测值。</p>
                        <br />
                        <p>如果您需要更详细的数据或有任何问题，请随时联系我们。</p>
                      </div>
                      <div className="flex items-center justify-between bg-muted/50 rounded-md p-3">
                        <div className="flex items-center">
                          <FileText className="h-5 w-5 mr-2 text-muted-foreground" />
                          <span>产品实际碳足迹数据.xlsx</span>
                        </div>
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4 mr-1" />
                          下载
                        </Button>
                      </div>
                    </div>
                  </>
                )}
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline">
                  发送提醒
                </Button>
                <div className="space-x-2">
                  <Button variant="outline">
                    导出详情
                  </Button>
                  {selectedRequest.status === 'pending' && (
                    <Button variant="destructive">
                      取消请求
                    </Button>
                  )}
                </div>
              </CardFooter>
            </Card>
          ) : (
            <div className="h-full flex items-center justify-center border border-dashed rounded-lg p-10">
              <div className="text-center">
                <FileText className="h-10 w-10 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">选择请求查看详情</h3>
                <p className="text-muted-foreground max-w-md">
                  从左侧列表中选择一个请求记录，查看详细信息和供应商响应
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WorkspaceRequestManagementContent;
