# 数据跨端通讯

:::warning
服务端 API 文档：[ServerRemoteChannel](https://docs.box3lab.com/api/RemoteChannel/Server/)

客户端 API 文档：[ClientRemoteChannel](https://docs.box3lab.com/api/RemoteChannel/Client/)
:::

## 改进说明

:::tip
**修改原因：**  
由于官方原先提供的 d.ts 文件中，该 API 接口通讯信息被统一声明为`any`类型。

然而，在大多数情况下，为了确保当前通讯信息格式的一致性，我们采用了泛型来约束，从而提升了代码的可读性和检查准确性。
:::

## 使用指南

### 基本用法

#### 客户端向服务端发送数据

![](/QQ20241022-195207.png)

#### 服务端接收数据

##### 无类型约束

![](/QQ20241022-195257.png)

##### 带类型约束

![](/QQ20241022-195414.png)

## 最佳实践

- 建议在开发过程中始终使用类型约束
- 确保客户端和服务端使用相同的类型定义
- 定期检查 API 文档以获取最新更新
