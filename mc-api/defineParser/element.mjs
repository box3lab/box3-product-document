/// @ts-check
import _icons from "./icons.json" assert {type: "json"}
import _defines from "./defines.json" assert {type: "json"}
const PREFIX = location.href.includes("github.io") ? "/box3-docs/" : "/";
const ALL_APIS = Object.keys(_defines.defines);
/**
 * @typedef Icon
 * @property {string} iconName 该图标的类名，决定了渲染的图标种类。若为空，则没有图标
 * @property {string} color 图标字体颜色
 * @property {string} protectedColor `protect`变体字体颜色
 * @property {string} hiddenColor `hidden`字体变体颜色
 * @property {string} hiddenProtectedColor `hidden.protect`变体字体颜色
 * @exports icons
 */
/**
 * @typedef Define
 * @property {string} api API组
 * @property {string} defineName 定义名称
 * @property {string[]} content 定义内容
 */
/**
 * 生成用于`private`变种的颜色
 * @param {string} color 颜色
 * @returns {string} 用于`private`变种的颜色
 */
function generatePrivateColor(color) {
    if (!color || color === 'unset')
        return 'unset';
    let result = '#';
    if (color.startsWith('#'))
        color = color.trim().replace('#', '').toLowerCase();
    if (color.length <= 3)
        color = `${color[0] ?? '0'}${color[0] ?? '0'}${color[1] ?? '0'}${color[1] ?? '0'}${color[2] ?? '0'}${color[2] ?? '0'}`;
    /**@type {number} */
    let _0x00 = Number.parseInt(color.slice(0, 6), 16),
        /**@type {number} */
        _0x01 = 0;
    for (let i = 0; i < 3; ++i) {
        _0x01 += _0x00 & 0xff;
        _0x00 >>= 8;
    }
    _0x01 /= 3;
    result += Math.floor(_0x01).toString(16).repeat(3);
    result += color.slice(6);
    return result;
}
/**
 * 构建图标样式表
 * @returns {Map<string, Icon>}
 */
function buildIconTable() {
    /**@type {string[]!} */
    let icons = Object.keys(_icons), check = 0,
        /** @type {Map<string, Icon>}*/
        result = new Map();
    while (true) {
        if (check > icons.length) {
            console.warn(`警告：存在未知图标 ${icons.join(',\n')}`);
            break;
        }
        let icon = icons.shift();
        if (icon === undefined) // 要不是为了过ts-check 我才不这么写
            break;
        if (icon.length <= 0) {
            console.error("图标名称不能为空");
            continue;
        }
        if (typeof _icons[icon] === "string") {
            // 解析继承
            let index1 = icon.indexOf('>'), index2 = icon.indexOf('.');
            if (index1 >= 0) {
                if (index2 >= 0) {
                    console.error("语法错误：“>”和“.”语法不允许同时使用 图标", icon);
                    continue;
                }
                // 解析局部继承
                let _0x00 = icon.slice(0, index1), _0x01 = icon.slice(index1 + 1);
                if (result.has(_0x00)) // 是否解析过其继承的图标
                    result.set(_0x01, Object.assign({}, result.get(_0x00), { iconName: _icons[icon] }));
                else {
                    icons.push(icon);
                    ++check;
                }
            } else if (index2 >= 0) {
                let _0x00 = icon.slice(0, index2);
                if (result.has(_0x00)) {
                    result.set(icon, Object.assign({}, result.get(_0x00), { iconName: _icons[icon] }));
                } else {
                    icons.push(icon); // 暂时放到后面解析
                    ++check;
                }
            } else if (result.has(_icons[icon])) // 是否解析过其继承的图标
                // @ts-ignore
                result.set(icon, result.get(_icons[icon]));
            else {
                icons.push(icon); // 暂时放到后面解析
                ++check;
            }

        } else {
            if (icon.includes(">")) {
                console.error("语法错误：不允许完全创建新图标使用继承 图标", icon);
                continue;
            }
            if (icon.includes(".")) {
                console.error("语法错误：不允许完全创建新图标使用变种 图标", icon);
                continue;
            }
            let color = _icons[icon][1] || 'unset',
                protectedColor = _icons[icon][2] || color,
                hiddenColor = _icons[icon][3] || generatePrivateColor(color),
                hiddenProtectedColor = _icons[icon][4] || hiddenColor;
            result.set(icon, {
                iconName: _icons[icon][0],
                color,
                protectedColor,
                hiddenColor,
                hiddenProtectedColor
            });
        }
    }
    return result;
}
/**
 * @type {Map<string, Icon>}
 */
const ICONS = buildIconTable();

/**
 * 寻找定义名称
 * @param {string} defineName 定义名称
 * @param {string[]} allowAPIs 允许的定义命名空间
 * @returns {Define?}
 */
function findDefine(defineName, allowAPIs = ALL_APIS) {
    if (!defineName)
        return null;
    if (defineName in _defines.keywords) {
        return { api: "keyword", defineName, content: _defines.keywords[defineName] }
    }
    /**@type {string} */
    for (let api of allowAPIs) {
        if (!(defineName in _defines.defines[api]))
            continue;
        return { api, defineName, content: _defines.defines[api][defineName] };
    }
    return null;
}
class IconElement extends HTMLElement {
    static observedAttributes = ["icon", "content", "variant", "no-icon", "no-color"];
    /**@type {ShadowRoot}*/
    #shadow;
    /**@type {HTMLSpanElement} */
    #span;
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: "closed" }),
            span = document.createElement('span'),
            link = document.createElement('link');
        link.rel = "stylesheet";
        link.href = "/_assets/icons.css";
        span.textContent = this.content;
        span.setAttribute("title", "右键单击可复制此处内容");
        span.addEventListener('contextmenu', (ev) => {
            ev.preventDefault();
            if (this.content) {
                let content = this.content;
                if (!content)
                    return;
                navigator.clipboard.writeText(content);
                // @ts-ignore
                alert$.next("复制成功：" + content);
            }
        });
        shadow.appendChild(link);
        shadow.appendChild(span);
        this.#shadow = shadow;
        this.#span = span;
    }
    connectedCallback() {
        this.#update();
    }
    /**@param {string} value */
    set content(value) {
        this.setAttribute("content", value);
    }
    /**@param {string} value */
    set icon(value) {
        this.setAttribute("icon", value);
    }
    /**@param {boolean} value */
    set noIcon(value) {
        this.setAttribute("no-icon", value ? "on" : "off")
    }
    /**@param {boolean} value */
    set noColor(value) {
        this.setAttribute("no-color", value ? "on" : "off")
    }
    /**@returns {string} */
    get content() {
        return this.getAttribute('content')?.trim() ?? this.textContent?.trim() ?? '';
    }
    /**@returns {string} */
    get icon() {
        return this.getAttribute('icon')?.trim() ?? '';
    }
    get noIcon() {
        return this.hasAttribute("no-icon") && !["off", "false"].includes(this.getAttribute("no-icon") ?? '');
    }
    get noColor() {
        return this.hasAttribute("no-color") && !["off", "false"].includes(this.getAttribute("no-color") ?? '');
    }
    get inTitle() {
        return Boolean(this.parentElement?.className.includes('md-header__ellipsis') || this.parentElement?.parentElement?.className.includes('md-header__ellipsis'));
    }
    /**
     * 更新元素图标类
     * @returns {void}
     */
    #update() {
        let _0x00 = this.icon.split('.'),
            iconName = _0x00[0] ?? '',
            iconVariants = _0x00[1]?.split(' ') ?? [];
        if (iconName && !ICONS.has(iconName)) {
            console.warn('警告：未知图标名称', iconName);
            this.#span.setAttribute("class", ICONS.get("error")?.iconName ?? '');
            this.#span.style.color = ICONS.get("error")?.color ?? '#ffffff';
            return;
        }
        let variants = iconVariants.concat(this.getAttribute('variant')?.split(' ') ?? []), iconClass = 'kind-icon';
        this.#span.style.color = ICONS.get(iconName)?.color ?? 'unset';
        if (variants?.length && variants.length > 0 && variants[0].length > 0) { // 是否使用变种
            let check = false;
            for (let type of variants) {
                let index = `${iconName}.${type}`;
                if (ICONS.has(index)) {
                    // @ts-ignore
                    iconClass += ` ${ICONS.get(index).iconName}`;
                    break;
                }
                else {
                    // @ts-ignore
                    iconClass += ` ${ICONS.get(iconName).iconName}`;
                    if (['protected', 'generic', 'private', 'inherited'].includes(type))
                        iconClass += ' ' + type;
                }
                switch (type) {
                    case "protected":
                        if (check) {
                            // @ts-ignore
                            this.#span.style.color = ICONS.get(iconName).hiddenProtectedColor;
                            break;
                        }
                        // @ts-ignore
                        this.#span.style.color = ICONS.get(iconName).protectedColor;
                        check = true;
                        break;
                    case "hidden":
                        if (check) {
                            // @ts-ignore
                            this.#span.style.color = ICONS.get(iconName).hiddenProtectedColor;
                            break;
                        }
                        // @ts-ignore
                        this.#span.style.color = ICONS.get(iconName).hiddenColor;
                        check = true;
                        break;
                }
            }
        } else {
            iconClass += ` ${ICONS.get(iconName)?.iconName ?? ''}`;
        }
        this.#span.setAttribute("class", (this.noIcon || iconName === '') ? '' : iconClass);
        if (this.noColor || this.inTitle)
            this.#span.style.color = 'var(--md-primary-bg-color)';
    }
    /**
     * 
     * @param {string} name 
     * @param {*} oldValue 
     * @param {*} newValue 
     */
    attributeChangedCallback(name, oldValue, newValue) {
        switch (name) {
            case "icon": {
                this.#update();
                break;
            }
            case "content": {
                this.#span.textContent = this.content;
                break;
            }
            case "variant": {
                this.#update();
                break;
            }
            case "no-icon": {
                this.#update();
                break;
            }
            case "no-color": {
                this.#update();
                break;
            }
            default:
                break;
        }
    }
}
class DefineElement extends HTMLElement {
    static observedAttributes = ["content", "no-icon", "allow-apis"];
    /**@type {ShadowRoot}*/
    #shadow;
    /**@type {IconElement} */
    #icon;
    /**@type {HTMLAnchorElement} */
    #anchor;
    /**@type {Define} */
    _cache;
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: "closed" }),
            icon = document.createElement('docs-icon'),
            anchor = document.createElement('a');
        anchor.appendChild(icon);
        shadow.appendChild(anchor);
        this.#shadow = shadow;
        // @ts-ignore
        this.#icon = icon;
        this.#anchor = anchor;
        if (this.content)
            this.#update();
    }
    connectedCallback() {
        this.#update();
    }
    /**@param {string} value */
    set content(value) {
        this.setAttribute("content", value);
    }
    /**@param {boolean} value */
    set noIcon(value) {
        this.setAttribute("no-icon", value ? "on" : "off")
    }
    /**@param {boolean} value */
    set noColor(value) {
        this.setAttribute("no-color", value ? "on" : "off")
    }
    /**@returns {string} */
    get content() {
        return this.getAttribute('content')?.trim() ?? this.textContent?.trim() ?? '';
    }
    get noIcon() {
        return this.hasAttribute("no-icon") && !["off", "false"].includes(this.getAttribute("no-icon") ?? '');
    }
    get noColor() {
        return this.hasAttribute("no-color") && !["off", "false"].includes(this.getAttribute("no-color") ?? '');
    }
    get inTitle() {
        return Boolean(this.parentElement?.parentElement?.className.includes('md-header__ellipsis') || this.parentElement?.parentElement?.parentElement?.className.includes('md-header__ellipsis'));
    }
    get allowAPIs() {
        return this.getAttribute("allow-apis")?.split(' ') ?? ALL_APIS;
    }
    /**@param {string[]} value */
    set allowAPIs(value) {
        this.setAttribute("allow-apis", value.map(api => api.replaceAll(' ', '-')).join(' '));
    }
    /**
     * 更新定义内容
     * @returns {void}
     */
    #update() {
        if (!this.content) {
            this.#icon.icon = "error";
            this.#icon.content = "❌"
            this.#anchor.href = `javascript:alert$.next("❌ 找不到对应页面");`;
            return;
        }
        if (this.content in _defines.keywords) {
            this.#icon.icon = 'keyword';
            this.#icon.content = this.content;
            this.#anchor.href = PREFIX + _defines.keywords[this.content][0];
        } else {
            let define = this._cache?.defineName === this.content ? this._cache : findDefine(this.content);
            if (define === null) {
                this.#icon.icon = "error";
                this.#icon.content = this.content;
                this.#anchor.href = `javascript:alert$.next("❌ 找不到对应页面");`;
                return;
            }
            if (define.api === "keyword") {
                this.#icon.icon = "keyword";
                this.#icon.content = this.content;
                this.#icon.title = define.content[1] ?? "";
                this.#icon.noColor = true;
                if (define.content[0])
                    this.#anchor.href = PREFIX + define.content[0];
                else
                    this.#anchor.href = 'javascript:void(0);'
                return;
            }
            this.#icon.icon = define.content[0];
            this.#icon.content = this.content;
            this.#icon.title = define.content[2] ?? "";
            this.#icon.noColor = this.noColor || this.inTitle;
            if (define.content[1])
                this.#anchor.href = PREFIX + define.content[1];
            else
                this.#anchor.href = 'javascript:void(0);'
        }
    }
    /**
     * 
     * @param {string} name 
     * @param {*} oldValue 
     * @param {*} newValue 
     */
    attributeChangedCallback(name, oldValue, newValue) {
        switch (name) {
            case "no-color": {
                this.#update();
                break;
            }
            case "content": {
                this.#update();
                break;
            }
            case "allow-apis": {
                this.#update();
                break;
            }
            default:
                break;
        }
    }
}
export { IconElement, DefineElement, ICONS, findDefine };