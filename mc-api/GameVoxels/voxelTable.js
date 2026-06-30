import _voxelTypes from "./voxelTypes"
const { voxelTypes_Table, voxelTypes_zhcn } = _voxelTypes;
let rendered = false;
/// @ts-check

const voxelTypes = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "acacia", "add", "air", "air_duct", "ampersand", "asterisk", "at", "backslash", "bamboo", "bat_window", "bear_footprint", "biscuit", "black", "black_glass", "blue", "blue_decorative_light", "blue_gift", "blue_glass", "blue_light", "blue_surface_01", "blue_surface_02", "blueberry_juice", "board0", "board1", "board10", "board11", "board12", "board13", "board14", "board15", "board2", "board3", "board4", "board5", "board6", "board7", "board8", "board9", "board_01", "board_02", "board_03", "board_04", "board_05", "board_06", "board_07", "bookshelf", "bounce_pad", "bracket_close", "bracket_open", "brick_01", "brick_02", "brick_red", "button", "cadet_blue", "candy", "caret", "carpet_01", "carpet_02", "carpet_03", "carpet_04", "carpet_05", "carpet_06", "carpet_07", "carpet_08", "carpet_09", "carpet_10", "carpet_11", "carpet_12", "carpet_13", "coffee", "coffee_gray", "colon", "color_glass", "comma", "conveyor", "crane_lantern", "crane_roof_01", "crane_roof_02", "cross_window", "dark_brick_00", "dark_brick_01", "dark_brick_02", "dark_grass", "dark_gray", "dark_orchid", "dark_red", "dark_salmon", "dark_slate_blue", "dark_stone", "dark_surface", "dirt", "divide", "dollar", "eight", "equal", "exclamation_mark", "express_box", "fan", "firecracker", "five", "four", "fu", "geometric_window_01", "geometric_window_02", "glass", "gold_trim_brick", "grape_juice", "grass", "greater_than", "green_decorative_light", "green_glass", "green_leaf", "green_light", "greenbelt_L", "greenbelt_L1", "grey_stone_brick", "honeycomb_01", "honeycomb_02", "ice", "ice_brick", "ice_wall", "indigo_light", "lab_lamp_01", "lab_lamp_02", "lab_lamp_03", "lab_material_01", "lab_material_02", "lab_material_03", "lab_material_04", "lab_material_05", "lab_material_06", "lab_material_07", "lab_material_08", "lab_material_09", "lab_material_10", "lab_material_11", "lab_material_12", "lab_material_13", "lab_material_14", "lab_material_15", "lab_screen", "lab_wire", "lantern_01", "lantern_02", "lava01", "lava02", "leaf_01", "leaf_02", "leaf_03", "leaf_04", "leaf_05", "leaf_06", "ledfloor01", "ledfloor02", "lemon", "lemon_juice", "less_than", "light_gray", "light_grey_stone_brick", "lime_juice", "macaroon", "maroon", "medium_gray", "medium_green", "medium_orchid", "medium_purple", "medium_spring_green", "medium_violet_red", "medium_yellow", "milk", "mint_green", "mint_green_light", "multiply", "navajo_white", "nine", "olive_green", "one", "orange", "orange_juice", "orange_light", "orange_red", "palace_carving", "palace_cloud", "palace_eaves_01", "palace_eaves_02", "palace_eaves_03", "palace_eaves_04", "palace_eaves_05", "palace_eaves_06", "palace_eaves_07", "palace_eaves_08", "palace_floor", "palace_lamp", "palace_roof", "palace_window", "pale_green", "palm", "paren_close", "paren_open", "peach_juice", "percent", "period", "peru", "pink", "pink_cake", "pink_light", "plank_01", "plank_02", "plank_03", "plank_04", "plank_05", "plank_06", "plank_07", "polar_ice", "polar_region", "pound", "powder_blue", "pumpkin", "pumpkin_lantern", "purple", "purple_surface_01", "purple_surface_02", "quartz_brick", "question_mark", "quotation_mark", "rainbow_cube", "red", "red_brick", "red_brick_floor", "red_brick_wall", "red_decorative_light", "red_gift", "red_glass", "red_light", "rock", "roof_blue_04", "roof_green", "roof_grey", "roof_purple", "roof_red", "roof_yellow", "sakura_pink", "sand", "semicolon", "seven", "sienna", "six", "sky_blue", "slash", "snow", "snowflake_lamp", "snowland", "snowman_body", "snowman_head", "soy_sauce", "spiderweb", "stained_glass", "stainless_steel", "star_lamp", "stone", "stone_brick_01", "stone_brick_02", "stone_pillar_03", "stone_pillar_04", "stone_pillar_05", "stone_pillar_06", "stone_wall", "stone_wall_01", "strawberry_juice", "stripe_01", "stripe_02", "stripe_03", "stripe_04", "stripe_05", "subtract", "television", "three", "tilde", "toolbox", "traditional_window", "treasure_chest", "turquoise", "two", "warm_yellow_light", "water", "white", "white_grass", "white_light", "window", "windygrass", "winter_leaf", "wood", "wooden_box", "woodstone_12", "yellow_decorative_light", "yellow_grass", "yellow_green", "yellow_light", "zero"];
const voxelTypes_Arena = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "acacia", "add", "air", "air_duct", "ampersand", "asterisk", "at", "backslash", "bamboo", "barrier", "bat_window", "bear_footprint", "biscuit", "black", "black_glass", "blue", "blue_decorative_light", "blue_gift", "blue_glass", "blue_grass", "blue_grass_all", "blue_light", "blue_surface_01", "blue_surface_02", "blueberry_juice", "board0", "board1", "board10", "board11", "board12", "board13", "board14", "board15", "board2", "board3", "board4", "board5", "board6", "board7", "board8", "board9", "board_01", "board_02", "board_03", "board_04", "board_05", "board_06", "board_07", "bookshelf", "bounce_pad", "bracket_close", "bracket_open", "brick_01", "brick_02", "brick_red", "button", "cadet_blue", "candy", "caret", "carpet_01", "carpet_02", "carpet_03", "carpet_04", "carpet_05", "carpet_06", "carpet_07", "carpet_08", "carpet_09", "carpet_10", "carpet_11", "carpet_12", "carpet_13", "coffee", "coffee_gray", "colon", "color_glass", "comma", "conveyor", "crane_lantern", "crane_roof_01", "crane_roof_02", "cross_window", "dark_blue_grass", "dark_blue_grass_all", "dark_brick_00", "dark_brick_01", "dark_brick_02", "dark_grass", "dark_grass_all", "dark_grass_rock", "dark_grass_sand", "dark_gray", "dark_orchid", "dark_purple_grass", "dark_purple_grass_all", "dark_red", "dark_red_grass", "dark_red_grass_all", "dark_salmon", "dark_sand", "dark_slate_blue", "dark_stone", "dark_surface", "dark_volcanic_rock", "dark_yellow_grass", "dark_yellow_grass_all", "dirt", "divide", "dollar", "eight", "equal", "exclamation_mark", "express_box", "fan", "firecracker", "five", "four", "fu", "geometric_window_01", "geometric_window_02", "glass", "gold_trim_brick", "grape_juice", "grass", "grass_all", "grass_rock", "grass_sand", "greater_than", "green_decorative_light", "green_glass", "green_leaf", "green_light", "greenbelt_L", "greenbelt_L1", "grey_stone_brick", "honeycomb_01", "honeycomb_02", "ice", "ice_brick", "ice_wall", "indigo_light", "lab_lamp_01", "lab_lamp_02", "lab_lamp_03", "lab_material_01", "lab_material_02", "lab_material_03", "lab_material_04", "lab_material_05", "lab_material_06", "lab_material_07", "lab_material_08", "lab_material_09", "lab_material_10", "lab_material_11", "lab_material_12", "lab_material_13", "lab_material_14", "lab_material_15", "lab_screen", "lab_wire", "lantern_01", "lantern_02", "lava01", "lava02", "leaf_01", "leaf_02", "leaf_03", "leaf_04", "leaf_05", "leaf_06", "ledfloor01", "ledfloor02", "lemon", "lemon_juice", "less_than", "light_blue_grass", "light_blue_grass_all", "light_dirt", "light_gray", "light_grey_stone_brick", "light_purple_grass_", "light_purple_grass_all", "light_sand", "light_volcanic_rock", "lime_juice", "macaroon", "maroon", "medium_gray", "medium_green", "medium_orchid", "medium_purple", "medium_spring_green", "medium_violet_red", "medium_yellow", "milk", "mint_green", "mint_green_light", "multiply", "navajo_white", "nine", "olive_green", "one", "orange", "orange_grass", "orange_grass_all", "orange_juice", "orange_light", "orange_red", "palace_carving", "palace_cloud", "palace_eaves_01", "palace_eaves_02", "palace_eaves_03", "palace_eaves_04", "palace_eaves_05", "palace_eaves_06", "palace_eaves_07", "palace_eaves_08", "palace_floor", "palace_lamp", "palace_roof", "palace_window", "pale_green", "palm", "paren_close", "paren_open", "peach_juice", "percent", "period", "peru", "pink", "pink_cake", "pink_grass", "pink_grass_all", "pink_light", "plank_01", "plank_02", "plank_03", "plank_04", "plank_05", "plank_06", "plank_07", "polar_ice", "polar_region", "pound", "powder_blue", "pumpkin", "pumpkin_lantern", "purple", "purple_grass", "purple_grass_all", "purple_surface_01", "purple_surface_02", "quartz_brick", "question_mark", "quotation_mark", "rainbow_cube", "red", "red_brick", "red_brick_floor", "red_brick_wall", "red_decorative_light", "red_gift", "red_glass", "red_light", "rock", "roof_blue_04", "roof_green", "roof_grey", "roof_purple", "roof_red", "roof_yellow", "sakura_pink", "sand", "sand_stones", "semicolon", "seven", "sienna", "six", "sky_blue", "slash", "snow", "snow_grass", "snow_land", "snowflake_lamp", "snowland", "snowman_body", "snowman_head", "soy_sauce", "special_grass_01", "special_grass_02", "special_grass_03", "special_grass_04", "special_grass_05", "special_grass_06", "special_grass_07", "special_grass_08", "special_grass_09", "special_grass_10", "special_grass_11", "special_grass_12", "special_grass_13", "special_grass_14", "special_grass_15", "special_grass_16", "special_land_01", "special_sand_01", "special_sand_02", "special_sand_03", "special_sand_04", "special_sand_05", "spiderweb", "stained_glass", "stainless_steel", "star_lamp", "stone", "stone_brick_01", "stone_brick_02", "stone_pillar_03", "stone_pillar_04", "stone_pillar_05", "stone_pillar_06", "stone_wall", "stone_wall_01", "strawberry_juice", "stripe_01", "stripe_02", "stripe_03", "stripe_04", "stripe_05", "subtract", "television", "three", "tilde", "toolbox", "traditional_window", "treasure_chest", "turquoise", "two", "warm_yellow_light", "water", "white", "white_grass", "white_light", "window", "windygrass", "winter_leaf", "withered_grass", "withered_grass_land", "wood", "wooden_box", "woodstone_12", "yellow_decorative_light", "yellow_grass", "yellow_green", "yellow_light", "zero"];

/**
 * @typedef TableRowOptions
 * @property {string[]} color 单元格颜色
 * @property {string[]} lightColor 单元格文本光源颜色
 * @property {string[]} borderColor 单元格文本下划线颜色
 * @property {string[][]} classList 单元格classList
 * @property {string[]} elementTag 单元格标签。若为空，则为文本标签
 * @property {number[]} colSpan 此单元格必须跨越的列数
 * @property {boolean[]} enableCopy 此单元格右击时是否将其内容复制到剪切板
 * @property {boolean[]} width 此单元格宽度占整个表格的百分比，范围[0, 100]
 */

/**
 * 创建一行单元格
 * @param {Partial<TableRowOptions>} option 选项
 * @param {string[]} datas 单元格内容，支持HTML
 * @returns {HTMLTableRowElement}
 */
function createTableRow(option, ...datas) {
  const tr = document.createElement('tr');
  for (const index in datas) {
    let useSpecialElement = option.elementTag?.[index] && typeof option.elementTag[index] == "string";
    const data = datas[index];
    const td = document.createElement('td'),
      textNode = document.createTextNode(data),
      // @ts-ignore
      innerElement = document.createElement(useSpecialElement ? option.elementTag[index] : "span");
    innerElement.appendChild(textNode);
    td.appendChild(innerElement);
    if (option.colSpan?.[index] && typeof option.colSpan[index] === "number" && !isNaN(option.colSpan[index]))
      td.colSpan = option.colSpan[index];
    td.classList.add('voxelTableData');
    if (option.color?.[index] && typeof option.color[index] === "string") {
      innerElement.classList.add('coloredWord');
      innerElement.style.backgroundColor = option.color[index];
    }
    if (option.lightColor?.[index] && typeof option.lightColor[index] === "string") {
      innerElement.style.boxShadow = `0px 0px 10px ${option.lightColor[index]}`;
    }
    if (option.borderColor?.[index] && typeof option.borderColor[index] === "string") {
      innerElement.style.borderBottom = `3px solid ${option.borderColor[index]}`;
    }
    if (option.classList?.[index]) {
      let _0x00 = option.classList[index].filter(x => Boolean(x));
      if (_0x00.length > 0)
        td.classList.add(..._0x00);
    }
    if (option.enableCopy?.[index]) {
      td.setAttribute("title", "右键单击可复制此处内容");
      td.addEventListener('contextmenu', (ev) => {
        ev.preventDefault();
        navigator.clipboard.writeText(data);
        // @ts-ignore
        alert$.next("复制成功：" + data);
      });
    }
    if (option.width?.[index] && typeof option.width[index] == "number" && option.width[index] >= 0 && option.width[index] <= 100) {
      td.style.width = `${option.width[index]}%`;
    }
    tr.appendChild(td);
  }
  return tr;
}
function build() {
  console.log('方块速查表 v4');
  const el = document.getElementById('voxelTable');
  if (el instanceof HTMLElement) {
    while (el.hasChildNodes())
      // @ts-ignore
      el.removeChild(el.firstChild);
    console.log('方块速查表开始渲染');
    const table = document.createElement('table'),
      thead = document.createElement('thead'),
      tbody = document.createElement('tbody'),
      caption = document.createElement('caption'),
      tfoot = document.createElement('tfoot'),
      colgroup = document.createElement('colgroup');
    for (let width of [35, 15, 15, 35]) {
      let el = document.createElement('col');
      el.style.width = `${width}%`;
      colgroup.appendChild(el);
    }
    table.id = 'voxelsTable';
    caption.innerText = '方块速查表';
    thead.appendChild(createTableRow({}, '名称', 'id', '类别', '翻译/描述'));
    let voxelNames = [];
    for (const name of voxelTypes)
      if (!voxelNames.includes(name))
        voxelNames.push(name);
    for (const name of voxelTypes_Arena)
      if (!voxelNames.includes(name))
        voxelNames.push(name);
    voxelNames.sort((a, b) => {
      if (voxelTypes_Table[a][1] !== voxelTypes_Table[b][1])
        return Number(voxelTypes_Table[a][1] > voxelTypes_Table[b][1]) - 0.5;
      else
        return Number(voxelTypes.includes(a)) | Number(Number(voxelTypes_Arena.includes(a)) << 1) - Number(voxelTypes.includes(b)) | (Number(voxelTypes_Arena.includes(b)) << 1);
    });
    for (const voxelName of voxelNames) {
      /**@type {string}*/
      let description = voxelTypes_zhcn?.[voxelName] ?? voxelName,
        _0x10 = Number(voxelTypes.includes(voxelName)) | (Number(voxelTypes_Arena.includes(voxelName)) << 1),
        type = voxelTypes_Table[voxelName][1] ?? '',
        color = "",
        lightColor = "",
        borderColor = "",
        classList = [['', 'old-only', 'pro-only', ''][_0x10], "voxel-name"];
      for (let i = 2; i < voxelTypes_Table[voxelName].length; ++i) { // 解析标签和属性
        const _0x00 = voxelTypes_Table[voxelName][i];
        if (typeof _0x00 === "string") {
          switch (_0x00[0]) {
            case ':': {
              let _0x01 = _0x00.split('=');
              switch (_0x01[0]) {
                case ":color":
                  color = _0x01[1];
                  break;
                case ":light":
                  lightColor = _0x01[1];
                  break;
                case ":fluid":
                  borderColor = _0x01[1];
                  break;
              }
              break;
            }
            case '.':
              if (_0x00.length <= 1)
                break;
              classList.push(_0x00.substring(1));
              break;
          }
        }
      }
      tbody.appendChild(createTableRow({
        color: [color],
        classList: [classList, [], [], [], _0x10 === 3 ? [] : ['bold']],
        elementTag: ['code', 'code'],
        enableCopy: [true, true],
        lightColor: [lightColor],
        borderColor: [borderColor]
      }, voxelName, voxelTypes_Table[voxelName][0], type, description));
    }
    tfoot.appendChild(createTableRow({ colSpan: [5] }, `上次更新于 2025/07/04 已收录${voxelNames.length}种方块`));
    table.appendChild(caption);
    table.appendChild(colgroup);
    table.appendChild(thead);
    table.appendChild(tbody);
    table.appendChild(tfoot);
    el.appendChild(table);
    console.log('方块速查表渲染完成');
  }
  return el;
}

export function createColGroup() {
  if (rendered)
    return;
  document.getElementById('voxBotten').remove();
  const el = build();
  rendered = true;
  el.style.maxHeight = '20000px';
  setTimeout(() => el.style.maxHeight = 'unset', 2e3);
}