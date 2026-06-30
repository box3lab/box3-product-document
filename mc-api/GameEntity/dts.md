# GameEntity / GamePlayerEntity / GamePlayer（d.ts 对齐）

> 本页内容从 `mc-api/globals.d.ts` 抽取，作为当前模块的权威签名。

```typescript
interface GameEntity {
  // ── 身份 / Identity ──

  /**
   * 实体 UUID (字符串格式, 只读)。
   * Entity UUID as a string (e.g. "550e8400-e29b-41d4-a716-446655440000"), readonly.
   */
  readonly id: string;

  /**
   * 是否为玩家实体。返回 true 后 player 属性自动收窄为非 null。
   * True if this entity is a player. After a truthy check, `player` is narrowed to non-null.
   */
  isPlayer(): this is GamePlayerEntity;

  /**
   * 实体类型标识符 (如 "minecraft:zombie", 只读)。
   * Entity type identifier (e.g. "minecraft:zombie"), readonly.
   */
  readonly entityType: string;

  // ── 位置 & 运动 / Position & Movement ──

  /**
   * 当前坐标 (世界坐标, 只读, 可通过 .set() 修改)。
   * Current world‑space position. Readonly ref — mutate via .set(), cannot reassign.
   */
  readonly position: GameVector3;

  /**
   * 当前速度 (运动向量, 只读, 可通过 .set() 修改)。
   * Current velocity (motion vector). Readonly ref — mutate via .set(), cannot reassign.
   */
  readonly velocity: GameVector3;

  /**
   * 包围盒半尺寸 (x=宽/2, y=高/2, z=宽/2, 只读)。
   * Bounding‑box half‑extents (x=width/2, y=height/2, z=width/2), readonly.
   */
  readonly bounds: GameVector3;

  /**
   * 是否在地面上 (只读)。
   * True if the entity is standing on a block, readonly.
   */
  readonly onGround: boolean;

  /**
   * 视线起始点 (眼部位置, 只读)。
   * Eye position (raycast origin for the entity's view), readonly.
   */
  readonly eyePosition: GameVector3;

  // ── 生命状态 / Lifecycle ──

  /**
   * 当前生命值。
   * Current health (HP).
   */
  hp: number;

  /**
   * 最大生命值。
   * Maximum health.
   */
  maxHp: number;

  /**
   * 实体是否已被移除/销毁 (true = 已移除, 只读)。
   * Whether the entity has been removed / destroyed (true = removed), readonly.
   */
  readonly destroyed: boolean;

  /**
   * 设置实体着火 tick 数 (0 = 灭火)。
   * Sets the remaining fire ticks (0 = extinguish).
   */
  setFire(ticks: number): void;

  /** 灭火。Extinguishes any fire on the entity. */
  clearFire(): void;

  // ── 伤害 & 恢复 / Damage & Healing ──

  /**
   * 对实体造成伤害。
   * Deals generic damage to the entity.
   * @param amount - 伤害值 (半心) / damage amount in half‑hearts
   */
  hurt(amount: number): void;

  /**
   * 治疗实体。
   * Heals the entity.
   * @param amount - 治疗量 (半心) / healing amount in half‑hearts
   */
  heal(amount: number): void;

  // ── 外观 / Appearance ──

  /**
   * 是否不可见 (隐身)。
   * True if the entity is invisible.
   */
  meshInvisible: boolean;

  /** 是否发光 (轮廓高亮)。Whether glow outline is active. */
  glowing: boolean;

  /**
   * 名称标签文本 (空字符串 = 无)。
   * Custom name tag text (empty string = none).
   */
  nameTag: string;
  setNameTag(name: string): void;

  // ── 物理 / Physics ──

  /**
   * 是否参与碰撞 (默认 true)。
   * Whether the entity participates in collisions (default true).
   */
  collides: boolean;

  /**
   * 是否固定 (默认 false, true 时禁用重力并每 tick 清零速度)。
   * Whether the entity is fixed in place (default false; disables gravity + zeros velocity each tick).
   */
  fixed: boolean;

  /**
   * 是否受重力影响 (默认 true)。
   * Whether gravity affects the entity (default true).
   */
  gravity: boolean;

  /** 摩擦系数 (默认 0.0)。Friction coefficient. */
  friction: number;

  /** 质量 (默认 1.0)。Mass. */
  mass: number;

  /** 弹性系数 (默认 0.0)。Restitution (bounciness). */
  restitution: number;

  // ── 无敌 & 持久化 / Invulnerability & Persistence ──

  /** 是否无敌。Whether the entity is invulnerable to damage. */
  invulnerable: boolean;

  /**
   * 设置为持久化实体 (防止被自然清除)。
   * Marks the entity as persistent (prevents it from being despawned naturally).
   * @remarks 仅写方法, 无 getter。Write‑only method, no getter available.
   */
  setPersistent(v: boolean): void;

  // ── 标签 / Tags ──

  /** 添加一个标签。Adds a scoreboard tag. */
  addTag(tag: string): void;

  /** 移除一个标签。Removes a scoreboard tag. */
  removeTag(tag: string): void;

  /** 检查是否拥有指定标签。Checks whether the entity has the given tag. */
  hasTag(tag: string): boolean;

  /** 获取所有标签。Returns all tags as a string array. */
  tags(): string[];

  // ── 效果 / Effects ──

  /**
   * 添加状态效果。
   * Applies a status effect to the entity.
   * @param effectId - 效果 ID (如 "minecraft:speed")
   * @param duration - 持续时间 (tick)
   * @param amplifier - 等级 (0 = 一级)
   * @param hideParticles - 是否隐藏粒子 (可选, 默认 false)
   */
  addEffect(
    effectId: string,
    duration: number,
    amplifier: number,
    hideParticles?: boolean,
  ): void;

  // ── 属性 / Attributes ──

  /**
   * 读取实体属性值。
   * Reads a registered entity attribute value.
   * @param attributeId - 属性 ID (如 "minecraft:generic.max_health")
   * @returns 当前属性值, 不支持的实体返回 0
   */
  getAttribute(attributeId: string): number;

  /**
   * 设置实体属性基础值。
   * Sets the base value of a registered entity attribute.
   * @param attributeId - 属性 ID (如 "minecraft:generic.movement_speed")
   * @param value - 新基础值 / new base value
   * @remarks 仅对 LivingEntity 有效。Only works on living entities.
   */
  setAttribute(attributeId: string, value: number): void;

  // ── 装备 / Equipment ──

  /**
   * 给生物设置装备。
   * Equips an item onto a mob's equipment slot.
   * @param slot - 槽位名称 / slot name:
   *   "mainhand", "offhand", "head"/"helmet"/"helm",
   *   "chest"/"chestplate", "legs"/"leggings", "feet"/"boots"
   * @param itemId - 物品 ID (如 "minecraft:diamond_sword")
   */
  setEquipment(slot: string, itemId: string): void;

  /**
   * 设置装备掉落概率。
   * Sets the drop chance for an equipment slot.
   * @param slot - 槽位名称 或 "all" / slot name or "all" for every slot
   * @param chance - 掉落概率 (0‑1) / drop chance (0–1)
   */
  setDropChance(slot: string, chance: number): void;

  // ── 导航 & AI / Navigation & AI ──

  /**
   * 让生物导航到指定坐标。
   * Orders a pathfinder mob to navigate to the given coordinates.
   * @param x, y, z - 目标坐标
   * @param speed - 移动速度倍率
   * @returns 路径计算成功返回 true, 非 PathfinderMob 返回 false
   */
  navigateTo(x: number, y: number, z: number, speed: number): boolean;
  /** GameVector3 重载。GameVector3 overload. */
  navigateTo(pos: GameVector3, speed: number): boolean;

  /**
   * 设置生物的当前攻击目标。
   * Sets the mob's attack target (the mob will pathfind to and attack it).
   */
  setTarget(target: GameEntity): void;

  /** 清除攻击目标, 停止追击。Clears the attack target, stopping pursuit. */
  clearTarget(): void;

  /**
   * 获取当前攻击目标 (可能为 null)。
   * Returns the mob's current attack target, or null.
   */
  getTarget(): GameEntity | null;

  /**
   * 启用或禁用生物 AI (寻路/目标等)。
   * Enables or disables the mob's AI (pathfinding, goals, etc.).
   */
  setAI(enabled: boolean): void;

  // ── 朝向 / Look direction ──

  /**
   * 让实体看向指定坐标。
   * Makes the entity look at a point in space.
   */
  lookAt(x: number, y: number, z: number): void;
  lookAt(pos: GameVector3): void;

  // ── 生命周期 / Lifecycle ──

  /**
   * 销毁实体 (触发 onDestroy 回调)。
   * Destroys the entity (triggers any registered onDestroy callback).
   */
  destroy(): void;

  setOnDestroy(handler: (entity: GameEntity) => void): void;

  // ── 玩家代理 / Player proxy ──

  /**
   * 玩家接口 (仅当 isPlayer 为 true 时非 null)。
   * The player interface — non‑null only when isPlayer is true.
   */
  player: GamePlayer | null;
}

/**
 * 玩家实体 — GameEntity 的子类型, 保证 player 属性非 null。
 * A player entity — subtype of GameEntity with a guaranteed non‑null `player`.
 */
type GamePlayerEntity = GameEntity & { player: GamePlayer };

// ================================================================
//  §4  Player — 玩家
// ================================================================

/**
 * 玩家扩展接口 (通过 entity.player 访问)。
 * Player‑specific interface — accessed via `entity.player`.
 */
interface GamePlayer {
  // ── 身份 / Identity ──

  /** 玩家名 (只读)。Player display name, readonly. */
  readonly name: string;
  /** 玩家 UUID (与 entity.id 相同, 只读)。Player UUID (same as entity.id), readonly. */
  readonly userId: string;

  // ── 位置 & 运动 / Position & Movement ──

  /**
   * 当前坐标 (世界坐标, 只读, 可通过 .set() 修改)。
   * Current world‑space position. Readonly ref — mutate via .set(), cannot reassign.
   */
  readonly position: GameVector3;

  /**
   * 当前速度 (运动向量, 只读, 可通过 .set() 修改)。
   * Current velocity (motion vector). Readonly ref — mutate via .set(), cannot reassign.
   */
  readonly velocity: GameVector3;

  /**
   * 包围盒半尺寸 (只读)。
   * Bounding‑box half‑extents, readonly.
   */
  readonly bounds: GameVector3;

  /**
   * 是否在地面上 (只读)。
   * True if the player is standing on a block, readonly.
   */
  readonly onGround: boolean;

  // ── 外观 / Appearance ──

  /**
   * 是否隐身。
   * Whether the player is invisible.
   */
  invisible: boolean;

  /**
   * 模型缩放比例 (MC 原生, 非 Box3 scale)。
   * Player model scale (Minecraft native, not Box3 scale).
   */
  readonly scale: number;

  // ── 移动 / Movement ──

  /** 行走速度 (基础值)。Walk speed (base attribute value). */
  walkSpeed: number;

  /**
   * 疾跑速度 (≈ walkSpeed × 1.3)。
   * Run/sprint speed (≈ walkSpeed × 1.3).
   */
  runSpeed: number;

  /**
   * 跳跃力度。
   * Jump power (jump strength attribute).
   */
  jumpPower: number;

  /**
   * 当前移动状态。
   * Current movement state.
   * @returns "FLYING" | "GROUND" | "SWIM" | "FALL" | "JUMP"
   */
  readonly moveState: string;

  /**
   * 当前行走状态。
   * Current walk state.
   * @returns "NONE" | "CROUCH" | "WALK" | "RUN"
   */
  readonly walkState: string;

  // ── 跳跃 / 潜行 / 游泳 / Jump / Sneak / Swim ──

  /**
   * 是否允许跳跃 (默认 true, false 时清除跳跃力)。
   * Whether jumping is enabled (default true; when false, jump strength is zeroed).
   */
  enableJump: boolean;

  /** 潜行速度 (默认 0.0, MC 下无独立潜行速度)。Crouch speed (stored as custom prop). */
  crouchSpeed: number;

  /** 游泳速度 (映射到 WATER_MOVEMENT_EFFICIENCY 属性)。Swim speed (maps to WATER_MOVEMENT_EFFICIENCY attribute). */
  swimSpeed: number;

  // ── 飞行 & 碰撞 / Flying & Collision ──

  /** 是否允许飞行。Whether flight is enabled. */
  canFly: boolean;

  /** 是否正在飞行。Whether the player is currently flying. */
  flying: boolean;

  /** 飞行速度。Flying speed. */
  flySpeed: number;

  /**
   * 碰撞开关 (通过队伍碰撞规则实现)。
   * Collision toggle (implemented via team collision rules).
   */
  collision: boolean;

  /** 是否为观察者模式。Whether the player is in spectator mode. */
  readonly spectator: boolean;

  /** 是否禁用飞行 (不允许且自动关闭飞行)。Whether flying is disabled entirely. */
  disableFly: boolean;

  // ── 游戏模式 / Game Mode ──

  /**
   * 游戏模式字符串 (如 "survival", "creative", "adventure", "spectator")。
   * Game mode as a string (e.g. "survival", "creative", "adventure", "spectator").
   * 也可以接受数字 (0=survival, 1=creative, 2=adventure, 3=spectator)。
   */
  gameMode: string | number;

  /**
   * 当前维度 ID (如 "minecraft:overworld")。
   * Current dimension identifier.
   */
  dimension: string;

  // ── 相机 / Camera ──

  /**
   * 相机模式。
   * Camera mode.
   * @default "FPS"
   */
  cameraMode: string;

  /**
   * 相机跟随的实体 (在 FOLLOW 模式下)。
   * The entity the camera follows (when in FOLLOW mode).
   */
  cameraEntity: GameEntity | null;

  /** 相机俯仰角。Camera pitch (vertical rotation). */
  cameraPitch: number;

  /** 相机偏航角。Camera yaw (horizontal rotation). */
  cameraYaw: number;

  /**
   * 玩家面朝方向 (单位向量)。
   * Direction the player is facing (unit vector).
   */
  readonly facingDirection: GameVector3;

  /**
   * 玩家视线前方 5 格处的目标点。
   * A point 5 blocks ahead of the player's eyes (look‑at target).
   */
  readonly cameraTarget: GameVector3;

  // ── 生命 / Vital stats ──

  /** 饥饿值 (0‑20)。Food level (0–20). */
  food: number;

  /** 饱和度 (0‑20)。Saturation level (0–20). */
  saturation: number;

  /** 当前生命值。Current health. */
  hp: number;
  /** 最大生命值。Maximum health. */
  maxHp: number;

  // ── 经验 / Experience ──

  /** 经验等级 (与 /xp 命令相同)。Experience level (same as /xp command). */
  xp: number;

  /** 增加经验等级。Adds experience levels to the player. */
  addExperienceLevels(levels: number): void;

  // ── 传送 / Teleport ──

  /**
   * 将玩家传送到指定坐标。
   * Teleports the player to the given coordinates.
   */
  teleport(pos: GameVector3): void;

  // ── 重生 / Respawn ──

  /**
   * 是否已死亡。
   * Whether the player is dead or dying.
   */
  readonly dead: boolean;

  /**
   * 重生点坐标 (可读写)。
   * Spawn point coordinates (readable & writable).
   */
  spawnPoint: GameVector3;

  /**
   * 设置重生点。
   * Sets the player's respawn point.
   */
  setRespawnPoint(pos: GameVector3): void;

  /**
   * 强制重生 (仅在死亡状态下有效)。
   * Forces a respawn (only works when dead).
   */
  respawn(): void;

  // ── 踢出 / Kick ──

  /** 踢出玩家 (默认理由 "Kicked")。Kicks the player with default reason. */
  kick(): void;
  /** 踢出玩家 (自定义理由)。Kicks the player with a custom reason. */
  kick(reason: string): void;

  // ── 消息 / Messaging ──

  /**
   * 发送仅该玩家可见的聊天消息。
   * Sends a chat message visible only to this player.
   */
  directMessage(msg: string): void;

  /**
   * 在动作栏 (快捷栏上方) 显示文字。
   * Displays text in the action bar (above the hotbar).
   */
  actionBar(message: string): void;

  /**
   * 显示屏幕标题。
   * Displays a screen title.
   * @param title - 主标题
   * @param subtitle - 副标题
   * @param fadeIn - 淡入 tick (可选, 默认 10)
   * @param stay - 停留 tick (可选, 默认 70)
   * @param fadeOut - 淡出 tick (可选, 默认 20)
   */
  title(
    title: string,
    subtitle: string,
    fadeIn?: number,
    stay?: number,
    fadeOut?: number,
  ): void;

  /**
   * 弹出对话面板 (简化版, MC 目前仅发送文本)。
   * Shows a dialog panel — simplified; currently just sends text in MC.
   * @param config.content - 对话内容
   * @param config.options - 选项数组
   * @returns 用户选择结果 { index, value }
   */
  dialog(config: { content?: string; options?: string[] }): {
    index: number;
    value: string;
  };

  // ── 链接 / Link ──

  /**
   * 向玩家发送可点击的 URL 链接。
   * Sends a clickable URL link to the player.
   */
  link(href: string): void;

  // ── 计分板名称 / Tab list name ──

  /**
   * 设置玩家在 TAB 列表中的显示名称 (支持颜色代码)。
   * Sets the player's display name in the tab list (supports color codes).
   */
  setPlayerListName(name: string): void;

  // ── 朝向 / Look direction ──

  /**
   * 让玩家看向指定坐标。
   * Makes the player look at a point in space.
   */
  lookAt(x: number, y: number, z: number): void;
  lookAt(pos: GameVector3): void;

  // ── 执行命令 / Command ──

  /**
   * 以玩家身份执行 Minecraft 命令。
   * Executes a Minecraft command as this player.
   */
  runCommand(cmd: string): void;

  // ── 物品栏 / Inventory ──

  /**
   * 给予玩家物品。
   * Gives an item to the player.
   * @param itemId - 物品 ID (如 "minecraft:diamond")
   * @param count - 数量 (1‑64)
   */
  giveItem(itemId: string, count: number): void;

  /**
   * 给予玩家自定义物品 (基于 resourcepacks/box3js-items/items.json 配置)。
   * Gives a custom item defined in the resource pack's items.json.
   * Items are vanilla paper with custom_model_data + name/lore/food components.
   * @param id - 自定义物品 ID (如 "arena_trophy")
   * @param count - 数量 (1‑64)
   */
  giveCustomItem(id: string, count: number): void;

  /**
   * 给予玩家附魔物品。
   * Gives an enchanted item to the player.
   * @param itemId - 物品 ID
   * @param count - 数量
   * @param enchants - 附魔对象 (如 { "minecraft:sharpness": 5 })
   */
  giveEnchantedItem(
    itemId: string,
    count: number,
    enchants: Record<string, number>,
  ): void;

  /**
   * 给予玩家带自定义名称和描述的命名物品。
   * Gives an item with a custom name and lore.
   * @param itemId - 物品 ID
   * @param count - 数量
   * @param customName - 自定义名称
   * @param lore - 描述文字数组
   */
  giveNamedItem(
    itemId: string,
    count: number,
    customName: string,
    lore: string[],
  ): void;

  /**
   * 获取手持物品信息。
   * Returns info about the currently held item.
   * @returns { id: string, count: number }
   */
  getHeldItem(): { id: string; count: number };

  /** 清空背包。Clears the player's inventory. */
  clearInventory(): void;

  /** 管理员权限等级 (0-4)。0=普通玩家, 4=最高权限。Server operator permission level (0–4). */
  opLevel: number;

  // ── 效果 / Effects ──

  /**
   * 添加状态效果。
   * Applies a status effect.
   * @param effectId - 效果 ID (如 "minecraft:speed")
   * @param duration - 持续时间 (tick)
   * @param amplifier - 等级 (0 = 一级)
   * @param hideParticles - 是否隐藏粒子 (可选, 默认 false)
   */
  addEffect(
    effectId: string,
    duration: number,
    amplifier: number,
    hideParticles?: boolean,
  ): void;

  /** 清除所有状态效果。Removes all status effects. */
  clearEffects(): void;

  // ── 声音 / Sound ──

  /**
   * 向该玩家播放声音。
   * Plays a sound for this player only.
   * @param path - 声音 ID (如 "minecraft:block.note_block.pling")
   * @param volume - 音量 (0‑1)
   * @param pitch - 音高 (0.5‑2)
   */
  playSound(path: string, volume: number, pitch: number): void;

  // ── 聊天 / Chat ──

  /**
   * 为该玩家注册聊天处理器 (覆盖全局 onChat)。
   * Registers a per‑player chat handler (overrides global onChat for this player).
   * @returns GameEventHandlerToken
   */
  onChat(
    handler: (
      entity: GamePlayerEntity,
      message: string,
      tick: number,
    ) => boolean | void,
  ): GameEventHandlerToken;

  // ── 成就 / Advancements ──

  /**
   * 授予该玩家一个成就/进度。
   * Grants an advancement to this player by resource location (e.g. "minecraft:story/mine_stone").
   */
  grantAdvancement(advancementId: string): void;

  /**
   * 撤销该玩家的一个成就/进度。
   * Revokes an advancement from this player.
   */
  revokeAdvancement(advancementId: string): void;
}

```
