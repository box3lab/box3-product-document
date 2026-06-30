<script setup>
import '/style.css'
</script>

# S-📟 控制台输出

**GameConsole** 是服务端脚本的日志输出接口，用于在控制台打印调试与运行信息。

你可以通过全局对象 `console` 来使用这些功能。

## 类定义

```typescript
declare const console: GameConsole;
interface GameConsole {
  // ...
}
```

## 方法列表

### 日志输出

- [`log`](#log) : 输出普通日志
- [`debug`](#debug) : 输出调试日志 (前缀 [DEBUG])
- [`warn`](#warn) : 输出警告日志 (前缀 [WARN])
- [`error`](#error) : 输出错误日志 (前缀 [ERROR])

### 控制台操作

- [`clear`](#clear) : 清除控制台
- [`assert`](#assert) : 条件断言

---

#### <font id="API" />log(<font id="Type">...args: unknown[]</font>)<font id="Type">: void</font>{#log}

输出普通日志。

#### <font id="API" />debug(<font id="Type">...args: unknown[]</font>)<font id="Type">: void</font>{#debug}

输出调试日志，前缀 `[DEBUG]`。

#### <font id="API" />warn(<font id="Type">...args: unknown[]</font>)<font id="Type">: void</font>{#warn}

输出警告日志，前缀 `[WARN]`。

#### <font id="API" />error(<font id="Type">...args: unknown[]</font>)<font id="Type">: void</font>{#error}

输出错误日志 (输出到 stderr)，前缀 `[ERROR]`。

#### <font id="API" />clear()<font id="Type">: void</font>{#clear}

清除控制台输出 (发送 ANSI 清屏序列)。

#### <font id="API" />assert(<font id="Type">condition: boolean, ...args: unknown[]</font>)<font id="Type">: void</font>{#assert}

断言: 条件为 false 时输出错误日志。

**输入参数**

| **_参数_** | **_必填_** | **_默认值_** | **_类型_** | **_说明_** |
| ---------- | ---------- | ------------ | ---------- | ---------- |
| condition  | 是         |              | boolean    | 要测试的条件 |
| ...args    | 否         |              | unknown[]  | 失败时输出的额外参数 |
