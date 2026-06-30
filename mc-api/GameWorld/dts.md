# GameWorld / RaycastResult（d.ts 对齐）

> 本页内容从 `mc-api/globals.d.ts` 抽取，作为当前模块的权威签名。

```typescript
interface GameWorld {
  // ── 世界属性 / World properties ──

  /** 服务器 MOTD。Server MOTD string. */
  projectName(): string;

  /** 服务器 MOTD (可读写, 同 projectName)。Server MOTD (read/write, alias of projectName). */
  serverId: string;

  /** 当前服务端 tick 计数。Current server tick count. */
  currentTick(): number;

  /**
   * 降雨强度 (0‑1)。
   * Rain density (0–1).
   */
  rainDensity: number;

  /**
   * 雷暴强度 (0‑1)。
   * Thunder density (0–1).
   */
  thunderDensity: number;

  /** 清除天气 (晴天)。Clears weather to clear skies. */
  clearWeather(): void;

  // ── 时间 / Time ──

  /**
   * 当前游戏内时间 (tick, 0‑24000)。
   * Current in‑game time in ticks (0–24000).
   */
  time: number;

  /**
   * 时间流速 (1=正常, 0=停止)。
   * Time scale (1 = normal, 0 = frozen).
   */
  timeScale: number;

  /**
   * 设置游戏内时间 (tick, 0‑24000)。
   * Sets the in-game time in ticks.
   * @param time - 0=黎明, 6000=正午, 12000=黄昏, 18000=午夜
   */
  setTime(time: number): void;

  // ── 难度 / Difficulty ──

  /**
   * 当前难度。
   * Current difficulty ("peaceful" | "easy" | "normal" | "hard").
   */
  difficulty: string;

  // ── 出生点 / Spawn ──

  /**
   * 世界出生点坐标。
   * World spawn point coordinates.
   */
  readonly spawnPoint: GameVector3;

  /**
   * 设置世界出生点。
   * Sets the world spawn point.
   */
  setWorldSpawn(pos: GameVector3): void;

  // ── 游戏规则 (MC 扩展) / Game Rules (MC extension) ──

  /**
   * 读取游戏规则。
   * Reads a game‑rule value.
   * @param name - 规则名 / rule name (see setGameRule for the list)
   */
  getGameRule(name: string): boolean | null;

  /**
   * 设置游戏规则。
   * Sets a game rule.
   * @param name - supported: doDaylightCycle | doWeatherCycle | keepInventory |
   *               doMobSpawning | doFireTick | mobGriefing | doImmediateRespawn
   * @param value - boolean or string "true"/"false"
   */
  setGameRule(name: string, value: boolean | string): void;

  // ── 音效属性 / Sound Properties ──

  /** 环境音效路径 (每 200 tick 在世界出生点自动播放, 0.3 音量)。Ambient sound — auto-plays at world spawn every 200 ticks at 0.3 volume. */
  ambientSound: string;

  /** 玩家加入音效路径 (玩家加入时自动播放)。Player join sound — auto-plays when a player joins. */
  playerJoinSound: string;

  /** 玩家离开音效路径 (玩家离开时自动播放)。Player leave sound — auto-plays when a player leaves. */
  playerLeaveSound: string;

  /** 方块放置音效路径 (放置方块时自动播放)。Block place sound — auto-plays when a block is placed. */
  placeVoxelSound: string;

  /** 方块破坏音效路径 (破坏方块时自动播放)。Block break sound — auto-plays when a block is broken. */
  breakVoxelSound: string;

  // ── 实体生成 / Entity Spawning ──

  /**
   * 在指定位置生成实体。
   * Spawns an entity at the given position.
   * @param type - 实体类型 ID (如 "minecraft:zombie")
   * @param pos - 生成坐标
   * @returns 生成的实体包装, 失败返回 null
   */
  spawnEntity(type: string, pos: GameVector3): GameEntity | null;

  /**
   * 使用完整配置对象生成实体。
   * Spawns an entity with a full configuration object.
   * @param config - { type, position, velocity, fixed, gravity, friction, mass, restitution, collides, meshInvisible, hp, maxHp, tags }
   */
  createEntity(config: {
    type?: string;
    position?: GameVector3;
    velocity?: GameVector3;
    fixed?: boolean;
    gravity?: boolean;
    friction?: number;
    mass?: number;
    restitution?: number;
    collides?: boolean;
    meshInvisible?: boolean;
    hp?: number;
    maxHp?: number;
    tags?: string[];
  }): GameEntity | null;

  // ── 消息 & 声音 / Broadcasting ──

  /**
   * 向全服广播消息。
   * Sends a chat message to all players.
   */
  say(message: string): void;

  // ── 自定义物品 / Custom Items ──

  /**
   * 从资源包加载自定义物品配置 (基于数据组件, 无需 DeferredRegister, 无注册表同步问题)。
   * Loads custom item definitions from a resource pack's items.json.
   * Items use minecraft:paper as base with custom_model_data for model switching.
   * Models & textures must be provided via the resource pack (resourcepacks/<packName>/).
   *
   * JSON 格式使用 Minecraft 原版组件 ID 作为 key:
   *   "minecraft:custom_model_data", "minecraft:custom_name", "minecraft:lore",
   *   "minecraft:max_stack_size", "minecraft:enchantment_glint_override",
   *   "minecraft:rarity", "minecraft:food": { nutrition, saturation, can_always_eat, eat_seconds }
   *
   * @param packName - 资源包目录名 (如 "box3js-items"), 会在 resourcepacks/<packName>/items.json 查找
   */
  loadCustomItems(packName: string): void;

  // ── 结构 & 成就 / Structure & Advancement ──

  /**
   * 在指定位置放置数据包中的 .nbt 结构。
   * Places an .nbt structure from current datapacks at the given position.
   * Structure must exist under data/<namespace>/structure/<id>.nbt
   */
  placeStructure(x: number, y: number, z: number, structureId: string): void;
  placeStructure(pos: GameVector3, structureId: string): void;

  /**
   * 为指定玩家授予成就/进度。
   * Grants a datapack advancement to a player by name.
   */
  grantAdvancement(playerName: string, advancementId: string): void;

  /**
   * 按物品名搜索配方 ID 列表。
   * Searches recipe IDs matching a filter string.
   * @param filter - 搜索关键词 (匹配配方 ID)
   */
  listRecipes(filter: string): string[];

  /**
   * 移除指定 ID 的配方 (黑名单机制, 服务器重载后需重新移除)。
   * Removes a recipe by ID (blacklisted; re‑apply after server reload).
   * @param recipeId - 配方 ID, 例如 "minecraft:iron_pickaxe"
   * @returns 是否成功加入黑名单
   */
  removeRecipe(recipeId: string): boolean;

  /**
   * 清除所有配方黑名单, 恢复全部原始配方。
   * Clears the recipe blacklist and restores all original recipes.
   */
  clearRecipes(): void;

  /**
   * 在指定位置向全服播放声音。
   * Plays a sound for all players at a location.
   * @param path - 声音 ID
   * @param x, y, z - 声源坐标
   * @param volume - 音量 (0‑1)
   * @param pitch - 音高 (0.5‑2)
   */
  playSound(
    path: string,
    x: number,
    y: number,
    z: number,
    volume: number,
    pitch: number,
  ): void;
  playSound(
    path: string,
    pos: GameVector3,
    volume: number,
    pitch: number,
  ): void;

  // ── 命令 / Command ──

  /**
   * 以服务端身份执行命令。
   * Executes a Minecraft command as the server.
   */
  runCommand(cmd: string): void;

  // ── 实体查询 / Entity Queries ──

  /**
   * 查询所有匹配选择器的实体 (目前仅限玩家)。
   * Selects all entities matching a selector (currently only players).
   * @param selector - "*" (所有玩家) | "#uuid" | ".tag"
   */
  querySelectorAll(selector: string): GameEntity[];

  /**
   * 查询第一个匹配的实体 (或 null)。
   * Selects the first matching entity, or null.
   */
  querySelector(selector: string): GameEntity | null;

  /**
   * 查询指定区域内的所有实体。
   * Returns all entities inside an AABB defined by two corners.
   */
  entitiesInArea(pos1: GameVector3, pos2: GameVector3): GameEntity[];

  /**
   * 查询指定半径内的所有实体。
   * Returns all entities within a radius around a point.
   */
  entitiesInRadius(
    x: number,
    y: number,
    z: number,
    radius: number,
  ): GameEntity[];
  entitiesInRadius(pos: GameVector3, radius: number): GameEntity[];

  // ── 搜索与音效 / Search & Sound ──

  /**
   * 播放音效 (简写或完整配置)。
   * Plays a sound (string shorthand or full config object).
   * @param config - 音效路径字符串 或 { path, position, volume, pitch }
   */
  sound(
    config:
      | string
      | {
          path: string;
          position?: GameVector3;
          volume?: number;
          pitch?: number;
        },
  ): void;

  /**
   * 查询包围盒内的所有实体。
   * Returns all entities inside a GameBounds3.
   */
  searchBox(bounds: GameBounds3): GameEntity[];

  // ── 射线检测 / Raycast ──

  /**
   * 从起点向指定方向发射射线, 返回碰撞结果。
   * Casts a ray and returns hit information.
   * @param origin - 起点
   * @param direction - 方向向量 (自动归一化)
   * @param maxDistance - 最大距离 (可选, 默认 5)
   * @returns { hit, x, y, z, normalX, normalY, normalZ, distance, entity?, voxel? }
   */
  raycast(
    origin: GameVector3,
    direction: GameVector3,
    maxDistance?: number,
  ): RaycastResult;

  // ── 生物群系 / Biome ──

  /**
   * 获取指定位置的生物群系 ID。
   * Returns the biome identifier at the given position.
   */
  getBiome(x: number, y: number, z: number): string;
  getBiome(pos: GameVector3): string;

  // ── 爆炸 / Explosion ──

  /**
   * 在指定位置制造爆炸。
   * Creates an explosion at the given position.
   * @param x, y, z - 爆炸中心
   * @param power - 爆炸强度
   * @param fire - 是否产生火焰 (可选, 默认 false)
   */
  explode(x: number, y: number, z: number, power: number, fire?: boolean): void;
  explode(pos: GameVector3, power: number, fire?: boolean): void;

  // ── 粒子 / Particles ──

  /**
   * 在指定位置生成粒子。
   * Spawns particles at a given location.
   * @param type - 粒子 ID (如 "minecraft:flame")
   * @param x, y, z - 位置
   * @param count - 数量
   * @param dx - X 扩散范围
   * @param dy - Y 扩散范围
   * @param dz - Z 扩散范围
   * @param speed - 粒子速度
   */
  spawnParticle(
    type: string,
    x: number,
    y: number,
    z: number,
    count: number,
    dx: number,
    dy: number,
    dz: number,
    speed: number,
  ): void;
  spawnParticle(
    type: string,
    pos: GameVector3,
    count: number,
    dx: number,
    dy: number,
    dz: number,
    speed: number,
  ): void;

  /**
   * 在指定圆环上生成粒子。
   * Spawns particles in a circle.
   * @param x, y, z - 圆心
   * @param radius - 半径
   * @param type - 粒子 ID
   * @param count - 数量
   */
  spawnParticleCircle(
    x: number,
    y: number,
    z: number,
    radius: number,
    type: string,
    count: number,
  ): void;
  spawnParticleCircle(
    pos: GameVector3,
    radius: number,
    type: string,
    count: number,
  ): void;

  // ── 烟花 / Fireworks ──

  /**
   * 在指定位置发射烟花。
   * Launches a firework rocket.
   * @param x, y, z - 发射位置
   * @param color - 颜色名称: "red" | "blue" | "green" | "yellow" | "gold" | "white" | "aqua" | "pink" | "purple"
   * @param shape - 形状: "ball" | "large_ball" | "star" | "creeper" | "burst"
   */
  launchFirework(
    x: number,
    y: number,
    z: number,
    color: string,
    shape: string,
  ): void;
  launchFirework(pos: GameVector3, color: string, shape: string): void;

  // ── 闪电 / Lightning ──

  /**
   * 在指定位置召唤闪电。
   * Summons a lightning bolt at the given position.
   * @param x, y, z - 位置
   * @param damage - 伤害值 (可选, 仅对实体造成)
   * @returns 是否成功
   */
  strikeLightning(x: number, y: number, z: number, damage?: number): boolean;
  strikeLightning(pos: GameVector3, damage?: number): boolean;

  // ── 掉落物 / Drop Item ──

  /**
   * 在指定位置生成掉落物。
   * Drops an item stack at the given position.
   * @param x, y, z - 位置
   * @param itemId - 物品 ID
   * @param count - 数量
   */
  dropItem(
    x: number,
    y: number,
    z: number,
    itemId: string,
    count: number,
  ): void;
  dropItem(pos: GameVector3, itemId: string, count: number): void;

  // ── 弹射物 / Projectile ──

  /**
   * 从起点向目标发射弹射物。
   * Launches a projectile from origin toward a target.
   * @param type - 弹射物类型 (如 "minecraft:arrow")
   * @param x, y, z - 发射位置
   * @param tx, ty, tz - 目标位置
   * @param speed - 速度
   * @returns 弹射物实体, 失败返回 null
   */
  launchProjectile(
    type: string,
    x: number,
    y: number,
    z: number,
    tx: number,
    ty: number,
    tz: number,
    speed: number,
  ): GameEntity | null;
  launchProjectile(
    type: string,
    pos: GameVector3,
    target: GameVector3,
    speed: number,
  ): GameEntity | null;

  // ── 计分板 / Scoreboard ──

  /**
   * 添加计分板目标 (默认 dummy 标准)。
   * Adds a scoreboard objective (default dummy criteria).
   */
  addScoreboard(name: string): void;

  /**
   * 添加计分板目标 (自定义标准)。
   * Adds a scoreboard objective with a custom criteria.
   */
  addScoreboard(name: string, criteria: string): void;

  /** 移除计分板目标。Removes a scoreboard objective. */
  removeScoreboard(name: string): void;

  /**
   * 设置实体/名称的分数。
   * Sets the score of an entity or name for a given objective.
   */
  setScore(
    entityOrName: string | GameEntity,
    objectiveName: string,
    value: number,
  ): void;

  /**
   * 获取分数。
   * Gets the score of an entity or name for a given objective.
   */
  getScore(entityOrName: string | GameEntity, objectiveName: string): number;

  /**
   * 在指定显示位置展示计分板。
   * Displays a scoreboard objective in a display slot.
   * @param slot - "sidebar" | "list" | "belowname"
   */
  showScoreboard(slot: string, objectiveName: string): void;

  /**
   * 从显示位置隐藏计分板。
   * Hides a scoreboard from a display slot.
   */
  hideScoreboard(slot: string): void;

  /**
   * 列出计分板上所有玩家的分数。
   * Lists all player scores for a given objective.
   * @returns Array<{ name: string, value: number }>
   */
  listScores(objectiveName: string): Array<{ name: string; value: number }>;

  // ── Boss 血条 / Boss Bar ──

  /**
   * 显示或更新 Boss 血条。
   * Shows or updates a boss bar.
   * @param name - 血条 ID
   * @param text - 显示文字
   * @param progress - 进度 (0‑1)
   * @param color - 颜色: "red" | "blue" | "green" | "yellow" | "purple" | "pink" | "white"
   */
  showBossbar(
    name: string,
    text: string,
    progress: number,
    color: string,
  ): void;

  /** 移除 Boss 血条。Removes a boss bar by ID. */
  removeBossbar(name: string): void;

  // ── 队伍 / Teams ──

  /**
   * 创建一个队伍。
   * Creates a scoreboard team.
   * @param name - 队伍名
   * @param color - 颜色 (如 "aqua", "red", "blue" 等)
   */
  createTeam(name: string, color: string): void;

  /** 删除队伍。Removes a team. */
  removeTeam(name: string): void;

  /**
   * 将实体/名称加入队伍。
   * Adds an entity or name to a team.
   */
  joinTeam(entityOrName: string | GameEntity, teamName: string): void;

  /**
   * 将实体/名称移出队伍。
   * Removes an entity or name from its current team.
   */
  leaveTeam(entityOrName: string | GameEntity): void;

  /**
   * 获取实体/名称所在的队伍名 (不在任何队伍返回 null)。
   * Returns the team name of an entity or name, or null.
   */
  getTeamOf(entityOrName: string | GameEntity): string | null;

  // ── 世界边界 / World Border ──

  /** 当前边界大小。Current world border size. */
  borderSize: number;

  /**
   * 设置边界中心。
   * Sets the world border center.
   */
  setBorderCenter(x: number, z: number): void;

  /**
   * 缩放边界到目标大小 (带动画)。
   * Shrinks/grows the world border to a target size over time.
   * @param targetSize - 目标大小
   * @param seconds - 动画秒数
   */
  shrinkBorder(targetSize: number, seconds: number): void;

  /**
   * 边界伤害 (每秒造成的伤害值)。
   * World border damage per block per second.
   */
  setBorderDamage(damage: number): void;

  /**
   * 边界警告距离 (方块数)。
   * World border warning distance in blocks.
   */
  setBorderWarning(blocks: number): void;

  // ── 定时器 / Timers ──

  /**
   * 设置一次性延时回调。
   * Schedules a one‑shot delayed callback.
   * @param handler - 回调函数
   * @param ticks - 延迟 tick 数
   * @returns 定时器 ID (可用于 clearTimeout)
   */
  setTimeout(handler: () => void, ticks: number): number;

  /**
   * 设置循环定时回调。
   * Schedules a recurring interval callback.
   * @param handler - 回调函数
   * @param ticks - 间隔 tick 数
   * @returns 定时器 ID (可用于 clearInterval)
   */
  setInterval(handler: () => void, ticks: number): number;

  /** 取消 setTimeout。Clears a timeout by ID. */
  clearTimeout(id: number): void;

  /** 取消 setInterval。Clears an interval by ID. */
  clearInterval(id: number): void;

  // ── 项目间消息 / Cross‑project Messaging ──

  /**
   * 向另一个项目发送消息。
   * Sends a message to another script project.
   * @param target - 目标项目名 (不含路径)
   * @param data - 数据 (任意 JSON 可序列化的值)
   */
  sendMessage(target: string, data: unknown): void;

  // ═══════════════════════════════════════════════════
  //  事件注册 / Event Registration
  //  所有 onXxx() 返回 GameEventHandlerToken, 调用 .cancel() 取消监听。
  //  All onXxx() return GameEventHandlerToken; call .cancel() to unregister.
  // ═══════════════════════════════════════════════════

  /**
   * 注册每 tick 回调 (每秒 20 次)。
   * Registers a callback invoked every tick (20 times/sec).
   * @returns GameEventHandlerToken — 调用 .cancel() 取消
   */
  onTick(handler: (info: TickInfo) => void): GameEventHandlerToken;

  /**
   * 注册玩家加入回调。
   * Registers a callback invoked when a player joins the server.
   * @returns GameEventHandlerToken — 调用 .cancel() 取消
   */
  onPlayerJoin(
    handler: (entity: GamePlayerEntity, tick: number) => void,
  ): GameEventHandlerToken;

  /**
   * 注册玩家离开回调。
   * Registers a callback invoked when a player leaves the server.
   * @returns GameEventHandlerToken — 调用 .cancel() 取消
   */
  onPlayerLeave(
    handler: (entity: GamePlayerEntity, tick: number) => void,
  ): GameEventHandlerToken;

  /**
   * 注册聊天消息回调 (包括 /me 消息)。
   * Registers a callback for chat messages (including /me).
   * @param handler - (entity, message, tick) => void
   * @returns GameEventHandlerToken — 调用 .cancel() 取消
   */
  onChat(
    handler: (entity: GamePlayerEntity, message: string, tick: number) => void,
  ): GameEventHandlerToken;

  /**
   * 注册玩家重生回调。
   * Registers a callback invoked when a player respawns.
   * @returns GameEventHandlerToken — 调用 .cancel() 取消
   */
  onPlayerRespawn(
    handler: (entity: GamePlayerEntity, tick: number) => void,
  ): GameEventHandlerToken;

  /**
   * 注册方块右键激活回调。
   * Registers a callback invoked when a player right‑clicks a block.
   * @returns GameEventHandlerToken — 调用 .cancel() 取消
   */
  onBlockActivate(
    handler: (
      entity: GamePlayerEntity,
      x: number,
      y: number,
      z: number,
      voxel: string,
      tick: number,
    ) => void,
  ): GameEventHandlerToken;

  /**
   * 注册方块破坏回调。
   * Registers a callback invoked when a player breaks a block.
   * @returns GameEventHandlerToken — 调用 .cancel() 取消
   */
  onVoxelDestroy(
    handler: (
      entity: GamePlayerEntity,
      x: number,
      y: number,
      z: number,
      voxel: string,
      tick: number,
    ) => void,
  ): GameEventHandlerToken;

  /**
   * 注册方块放置回调。
   * Registers a callback invoked when a player places a block.
   * @returns GameEventHandlerToken — 调用 .cancel() 取消
   */
  onBlockPlace(
    handler: (
      entity: GamePlayerEntity,
      x: number,
      y: number,
      z: number,
      voxel: string,
      voxelId: number,
      tick: number,
    ) => void,
  ): GameEventHandlerToken;

  /**
   * 注册方块接触回调 (玩家移动到新方块时触发)。
   * Registers a callback invoked when a player's block position changes.
   * @returns GameEventHandlerToken — 调用 .cancel() 取消
   */
  onVoxelContact(
    handler: (
      entity: GamePlayerEntity,
      voxelId: number,
      x: number,
      y: number,
      z: number,
      contactType: number,
      force: number,
      tick: number,
    ) => void,
  ): GameEventHandlerToken;

  /**
   * 注册实体交互回调 (玩家右键实体)。
   * Registers a callback invoked when a player right‑clicks an entity.
   * @returns GameEventHandlerToken — 调用 .cancel() 取消
   */
  onInteract(
    handler: (
      entity: GamePlayerEntity,
      target: GameEntity,
      tick: number,
    ) => void,
  ): GameEventHandlerToken;

  /**
   * 注册实体死亡回调。
   * Registers a callback invoked when an entity dies.
   * @returns GameEventHandlerToken — 调用 .cancel() 取消
   */
  onEntityDeath(
    handler: (
      entity: GameEntity,
      killer: GameEntity | null,
      tick: number,
    ) => void,
  ): GameEventHandlerToken;

  /**
   * 注册实体受伤回调。
   * Registers a callback invoked when an entity takes damage.
   * @returns GameEventHandlerToken — 调用 .cancel() 取消
   */
  onEntityDamage(
    handler: (
      entity: GameEntity,
      amount: number,
      source: string,
      attacker: GameEntity | null,
      tick: number,
    ) => void,
  ): GameEventHandlerToken;

  /**
   * 注册流体进入回调 (玩家进入水/熔岩)。
   * Registers a callback invoked when a player enters a fluid.
   * @returns GameEventHandlerToken — 调用 .cancel() 取消
   */
  onFluidEnter(
    handler: (
      entity: GamePlayerEntity,
      fluid: string,
      x: number,
      y: number,
      z: number,
      tick: number,
    ) => void,
  ): GameEventHandlerToken;

  /**
   * 注册流体离开回调 (玩家离开水/熔岩)。
   * Registers a callback invoked when a player leaves a fluid.
   * @returns GameEventHandlerToken — 调用 .cancel() 取消
   */
  onFluidLeave(
    handler: (
      entity: GamePlayerEntity,
      fluid: string,
      x: number,
      y: number,
      z: number,
      tick: number,
    ) => void,
  ): GameEventHandlerToken;

  /**
   * 注册实体接触回调 (两个实体碰撞)。
   * Registers a callback invoked when two entities come into contact.
   * @returns GameEventHandlerToken — 调用 .cancel() 取消
   */
  onEntityContact(
    handler: (entityA: GameEntity, entityB: GameEntity, tick: number) => void,
  ): GameEventHandlerToken;

  /**
   * 注册实体分离回调 (两个实体不再碰撞)。
   * Registers a callback invoked when two entities separate after contact.
   * @returns GameEventHandlerToken — 调用 .cancel() 取消
   */
  onEntitySeparate(
    handler: (entityA: GameEntity, entityB: GameEntity, tick: number) => void,
  ): GameEventHandlerToken;

  /**
   * 注册按钮按下回调 — 当玩家按下指定按钮时触发。
   * Registers a callback for button presses from any player.
   * @param handler — `(entity, button, tick) => void`
   *
   * `button` 参数值是 {@link GameButtonType} 中的字符串常量之一：
   * WALK / RUN / CROUCH / JUMP / FLY / ACTION0 / ACTION1
   * @returns GameEventHandlerToken — 调用 .cancel() 取消
   */
  onButtonPressed(
    handler: (entity: GamePlayerEntity, button: string, tick: number) => void,
  ): GameEventHandlerToken;

  /**
   * 注册跨项目消息回调。
   * Registers a callback for messages from other script projects.
   * @returns GameEventHandlerToken — 调用 .cancel() 取消
   */
  onMessage(
    handler: (sender: string, data: unknown) => void,
  ): GameEventHandlerToken;
}

/**
 * raycast() 返回结果。
 * Return type of world.raycast().
 */
interface RaycastResult {
  /** 是否命中。True if something was hit. */
  hit: boolean;
  /** 命中点 X 坐标。Hit point X coordinate. */
  x: number;
  /** 命中点 Y 坐标。Hit point Y coordinate. */
  y: number;
  /** 命中点 Z 坐标。Hit point Z coordinate. */
  z: number;
  /** 表面法线 X 分量。Surface normal X component. */
  normalX: number;
  /** 表面法线 Y 分量。Surface normal Y component. */
  normalY: number;
  /** 表面法线 Z 分量。Surface normal Z component. */
  normalZ: number;
  /** 命中距离。Distance from origin to hit point. */
  distance: number;
  /** 命中的方块 ID (命中方块时为数字)。Hit block ID (number when a block was hit). */
  voxel?: number;
  /** 命中的实体 (命中实体时)。The entity that was hit (when an entity was hit). */
  entity?: GameEntity;
}

```
