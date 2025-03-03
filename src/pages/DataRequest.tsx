
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { 
  Mail, 
  Phone, 
  Send, 
  FileText, 
  Clock, 
  CheckCircle, 
  X, 
  AlertCircle, 
  Download, 
  Upload
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

const DataRequest = () => {
  const [activeTab, setActiveTab] = useState('create');
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [selectedTemplate, setSelectedTemplate] = useState('template1');
  const { toast } = useToast();

  // 处理创建请求
  const handleCreateRequest = () => {
    toast({
      title: "请求已创建",
      description: "您的数据请求已成功创建并发送。",
    });
    setActiveTab('manage');
  };

  // 处理选择请求
  const handleSelectRequest = (request) => {
    setSelectedRequest(request);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">数据请求管理</h1>
        
        <Tabs defaultValue="create" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-2 mb-8">
            <TabsTrigger value="create">创建请求</TabsTrigger>
            <TabsTrigger value="manage">管理请求</TabsTrigger>
          </TabsList>
          
          {/* 创建请求选项卡 */}
          <TabsContent value="create" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* 左侧配置区 */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>请求配置</CardTitle>
                  <CardDescription>
                    设置您的数据请求详情，包括目标供应商、请求数据项和请求方式
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-3">
                    <label className="text-sm font-medium">目标供应商</label>
                    <Select defaultValue="supplier1">
                      <SelectTrigger>
                        <SelectValue placeholder="选择供应商" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="supplier1">上海绿能科技有限公司</SelectItem>
                        <SelectItem value="supplier2">江苏新材料科技股份有限公司</SelectItem>
                        <SelectItem value="supplier3">广东高效能源有限公司</SelectItem>
                        <SelectItem value="supplier4">北京清洁能源技术有限公司</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-3">
                    <label className="text-sm font-medium">产品信息</label>
                    <Select defaultValue="product1">
                      <SelectTrigger>
                        <SelectValue placeholder="选择产品" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="product1">太阳能电池板 Model-SE300</SelectItem>
                        <SelectItem value="product2">复合材料 XM-200</SelectItem>
                        <SelectItem value="product3">锂电池组件 LB-500</SelectItem>
                        <SelectItem value="product4">风力发电机叶片 FP-120</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-3">
                    <label className="text-sm font-medium">请求数据项</label>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="data1" className="rounded border-gray-300" defaultChecked />
                        <label htmlFor="data1">产品碳足迹数据</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="data2" className="rounded border-gray-300" defaultChecked />
                        <label htmlFor="data2">生产工艺信息</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="data3" className="rounded border-gray-300" defaultChecked />
                        <label htmlFor="data3">原材料组成</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="data4" className="rounded border-gray-300" />
                        <label htmlFor="data4">能源消耗数据</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="data5" className="rounded border-gray-300" />
                        <label htmlFor="data5">运输信息</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="data6" className="rounded border-gray-300" />
                        <label htmlFor="data6">第三方验证报告</label>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <label className="text-sm font-medium">请求方式</label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      <Button variant="outline" className="flex flex-col h-20 justify-center items-center space-y-1 bg-primary/5">
                        <Mail className="h-5 w-5" />
                        <span className="text-xs">邮件</span>
                      </Button>
                      <Button variant="outline" className="flex flex-col h-20 justify-center items-center space-y-1">
                        <Phone className="h-5 w-5" />
                        <span className="text-xs">短信</span>
                      </Button>
                      <Button variant="outline" className="flex flex-col h-20 justify-center items-center space-y-1">
                        <Send className="h-5 w-5" />
                        <span className="text-xs">微信</span>
                      </Button>
                      <Button variant="outline" className="flex flex-col h-20 justify-center items-center space-y-1">
                        <Send className="h-5 w-5" />
                        <span className="text-xs">钉钉</span>
                      </Button>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <label className="text-sm font-medium">联系人信息</label>
                    <Input placeholder="联系人邮箱" defaultValue="contact@greenenergy.com" />
                  </div>
                  
                  <div className="space-y-3">
                    <label className="text-sm font-medium">请求截止日期</label>
                    <Input type="date" defaultValue={new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]} />
                  </div>
                </CardContent>
              </Card>
              
              {/* 右侧内容编辑区 */}
              <Card>
                <CardHeader>
                  <CardTitle>请求内容编辑</CardTitle>
                  <CardDescription>
                    自定义您的请求内容和附加信息
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-3">
                    <label className="text-sm font-medium">请求模板选择</label>
                    <Select value={selectedTemplate} onValueChange={setSelectedTemplate}>
                      <SelectTrigger>
                        <SelectValue placeholder="选择模板" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="template1">标准请求模板</SelectItem>
                        <SelectItem value="template2">详细数据请求模板</SelectItem>
                        <SelectItem value="template3">简要请求模板</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-3">
                    <label className="text-sm font-medium">请求主题</label>
                    <Input placeholder="请求主题" defaultValue="产品碳足迹数据请求 - 太阳能电池板 Model-SE300" />
                  </div>
                  
                  <div className="space-y-3">
                    <label className="text-sm font-medium">请求内容</label>
                    <Textarea 
                      placeholder="请输入请求内容" 
                      className="min-h-[200px]"
                      defaultValue={`尊敬的供应商：

您好！我们是贵司产品的采购方，正在进行供应链碳足迹评估工作。我们的系统对贵司的太阳能电池板 Model-SE300 进行了碳足迹预测分析。为了确保数据准确性，我们希望能获取贵司的实际碳足迹数据。

我们的预测结果显示，该产品的碳足迹约为 45.6 kgCO2e/件。如果贵司有实际测算数据，请提供给我们，以便我们更准确地评估整体供应链的碳排放情况。

感谢您的配合！`}
                    />
                  </div>
                  
                  <div className="space-y-3">
                    <label className="text-sm font-medium">附件上传</label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                      <Upload className="h-8 w-8 mx-auto text-gray-400" />
                      <p className="mt-2 text-sm text-gray-500">点击上传或拖放文件至此处</p>
                      <p className="text-xs text-gray-400 mt-1">支持 PDF, Excel, Word 格式</p>
                      <Button variant="outline" size="sm" className="mt-3">
                        选择文件
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="flex justify-end space-x-3 mt-6">
              <Button variant="outline">保存草稿</Button>
              <Button variant="outline">预览</Button>
              <Button onClick={handleCreateRequest}>发送请求</Button>
            </div>
          </TabsContent>
          
          {/* 管理请求选项卡 */}
          <TabsContent value="manage">
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
                          <Badge className={statusMap[request.status].color}>
                            {statusMap[request.status].label}
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
                        <Badge className={statusMap[selectedRequest.status].color}>
                          {statusMap[selectedRequest.status].label}
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
                              {methodMap[selectedRequest.method].icon && (
                                <methodMap[selectedRequest.method].icon className="h-4 w-4 mr-2" />
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
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default DataRequest;
