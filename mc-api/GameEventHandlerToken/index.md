<script setup>
import '/style.css'
</script>
# S-事件监听
:::info
**GameEventHandlerToken**，作为 <font id="Event">事件</font>方法的统一返回类型（如onXXX方法），支持后续的监听操作。
:::


## 方法

#### <font id="API" />cancel()<font id="Type">:  void</font>
取消该事件监听


---


#### <font id="API" />resume()<font id="Type">:  void</font>
恢复该事件监听


---


#### <font id="API" />active()<font id="Type">: boolean</font>
检测该事件监听是否是活动状态

**返回值**

| **类型** | **说明** |
| --- | --- |
| boolean | 是否是活动状态 |

