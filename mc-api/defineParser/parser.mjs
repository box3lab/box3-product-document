/// @ts-check

import defines from "./defines.json" assert {type: "json"}
import { IconElement, findDefine } from "./element.mjs"
import { assignHash, isViewed, view, getContent, VIEWED_RESULT } from "../viewed.mjs"
const PREFIX = location.href.includes("github.io") ? "/box3-docs/" : "/";
const FIND_NEXT = (content) => typeof content === "string" && getCharType(content) > 0 && !content.startsWith("#");
/**@type {(event: MouseEvent) => void} */
const SET_HASH = (event) => {
    // @ts-ignore
    location.hash = event.currentTarget?.getAttribute("anchor") ?? "";
}
/**
 * 获取字符类型  
 * 0: 空格  
 * 1: 字母/_/$/数字  
 * 2: 符号
 * @param {any} char 字符
 * @returns {number} 字符类型
 */
function getCharType(char) {
    if (typeof char !== 'string' || char.length <= 0)
        return -1;
    if (char[0] === ' ' || char[0] === '\t' || char[0] === '\n' || char[0] === '\r')
        return 0;
    if (char[0].match(/[a-zA-Z_$0-9]/))
        return 1;
    return 2;
}
/**
 * 根据条件寻找指定内容
 * @template {string | Node} T
 * @param {T[]} contents 内容集
 * @param {number} index 开始查找的编号
 * @param {number} step 查找步进；若为负，向前查找
 * @param {(content: T) => boolean} callbackfn 开始查找的编号
 * @returns {T | null}
 */
function findContent(contents, index, step, callbackfn) {
    for (let i = index; i >= 0 && i <= contents.length; i += step) {
        if (callbackfn(contents[i]))
            return contents[i];
    }
    return null;
}

/**
 * 清除元素所有子元素
 * @param {Node} element 要清除子元素的元素
 */

function clearChildren(element) {
    while (element.hasChildNodes()) {
        element.firstChild?.remove();
    }
}

/**
 * 加载HTML元素 并读取其内容
 * @param {Node} element 包含代码的元素
 * @returns {{
 * contents: (string | Node)[],
 * classList: string[],
 * platforms: string[]
 * }}
 */
function load(element) {
    /**@type {(string | Node)[]} */
    var contents = [],
        /**@type {string[]} */
        classList = [],
        /**@type {string[]} */
        platforms = [],
        notFoundContent = true, startTime = Date.now();
    for (let child of element.childNodes) {
        if (child instanceof Text) {
            if (child.textContent !== null) {
                let _0x00 = child.textContent.trim();
                if (_0x00.length > 0) {
                    for (let _0x01 = 0; _0x01 < _0x00.length;) {
                        if (Date.now() - startTime > 1e3) {
                            console.error('读取超时');
                            break;
                        }
                        if (notFoundContent && _0x00[_0x01] === '!') {
                            /**当前位置 @type {number} */
                            let _0x02 = _0x01 + 1;
                            for (; _0x02 <= _0x00.length; ++_0x02) {
                                let _0x12 = getCharType(_0x00[_0x02]);
                                if (_0x12 < 1) {
                                    _0x01 = _0x02;
                                    break;
                                }
                            }
                        } else if (_0x00[_0x01] === '.') {
                            /**当前位置 @type {number} */
                            let _0x02 = _0x01 + 1;
                            if (_0x00[_0x02] === '.' && _0x00[_0x01 + 2] === '.') {
                                contents.push('...');
                                _0x01 += 3;
                            } else
                                for (; _0x02 <= _0x00.length; ++_0x02) {
                                    let _0x12 = getCharType(_0x00[_0x02]);
                                    if (_0x12 < 1) {
                                        if (notFoundContent)
                                            classList.push(_0x00.substring(_0x01 + 1, _0x02));
                                        else
                                            contents.push(_0x00.substring(_0x01, _0x02));
                                        _0x01 = _0x02;
                                        break;
                                    }
                                }
                        } else if (notFoundContent && _0x00[_0x01] === '@') {
                            /**当前位置 @type {number} */
                            let _0x02 = _0x01 + 1;
                            for (; _0x02 <= _0x00.length; ++_0x02) {
                                let _0x12 = getCharType(_0x00[_0x02]);
                                if (_0x12 != 1) {
                                    platforms.push(_0x00.substring(_0x01 + 1, _0x02));
                                    _0x01 = _0x02;
                                    break;
                                }
                            }
                        } else if (_0x00[_0x01] === '#') {
                            /**当前位置 @type {number} */
                            let _0x02 = _0x01 + 1;
                            for (; _0x02 <= _0x00.length; ++_0x02) {
                                let _0x12 = getCharType(_0x00[_0x02]);
                                if (_0x12 != 1 && _0x00[_0x02] !== ".") {
                                    contents.push(_0x00.substring(_0x01, _0x02));
                                    _0x01 = _0x02;
                                    break;
                                }
                            }
                        } else if (_0x00[_0x01] === '\'' || _0x00[_0x01] === '"' || _0x00[_0x01] === '`') {
                            /**当前位置 @type {number} */
                            let _0x02 = _0x01 + 1,
                                /**起始符号 */
                                _0x03 = _0x00[_0x01];
                            for (; _0x02 <= _0x00.length; ++_0x02) {
                                if (_0x00[_0x02] === _0x03) {
                                    ++_0x02;
                                    contents.push(_0x00.substring(_0x01, _0x02));
                                    _0x01 = _0x02;
                                    break;
                                }
                            }
                        } else {
                            /**当前位置 @type {number} */
                            let _0x02 = _0x01 + 1;
                            let _0x11 = getCharType(_0x00[_0x01]);
                            for (; _0x02 <= _0x00.length; _0x02++) {
                                let _0x12 = getCharType(_0x00[_0x02]);
                                // 按照字符类型分割 若前面是字母 则不分割
                                if (_0x12 !== _0x11 || ['\'', '"', '`'].includes(_0x00[_0x02])) {
                                    if (_0x01 < _0x02) {
                                        if (getCharType(_0x01) >= 1)
                                            notFoundContent = false;
                                        contents.push(_0x00.substring(_0x01, _0x02));
                                    }
                                    _0x01 = _0x02;
                                    break;
                                }
                            }
                        }
                    }
                }
            }
        } else {
            contents.push(child);
        }
    }
    return {
        contents,
        classList,
        platforms
    };
}
/**
 * 解析代码
 * @param {Node} element 包含代码的元素
 * @returns {HTMLElement}
 */
function parse(element) {
    var { contents, classList, platforms } = load(element);
    /**@type {(HTMLQuoteElement | null)[]} */
    var resultNodes = [], platformCount = 0,
        /**@type {string | null} */
        // @ts-ignore
        anchorContent = findContent(contents, 0, 1, FIND_NEXT);
    const USE_CUSTOM_PLATFORM = platforms.length > 0;
    for (let index in defines.config.platformList) {
        let platform = defines.config.platformList[index];
        if (USE_CUSTOM_PLATFORM && !platforms.includes(platform)) {
            resultNodes.push(null);
            continue;
        }
        if (!USE_CUSTOM_PLATFORM && defines.config.platforms[platform].disabled) {
            resultNodes.push(null);
            continue;
        }
        if (!USE_CUSTOM_PLATFORM && defines.config.platforms[platform].checkURL && !RegExp(defines.config.platforms[platform].checkURL).test(location.pathname)) {
            resultNodes.push(null);
            continue;
        }
        let node = document.createElement('blockquote'), _0x01 = document.createElement('div');
        if (classList.length > 0)
            node.classList.add(...classList);
        else {
            let elementClass = defines.config.platforms[platform].class;
            if (elementClass)
                node.setAttribute('class', elementClass);
        }
        node.dataset["platform"] = platform;
        ++platformCount;
        resultNodes.push(node);
    }
    let chars = [];
    for (let platform_index in defines.config.platformList) { // 枚举映射
        let platform = defines.config.platformList[platform_index], node = resultNodes[platform_index];
        if (node === null)
            continue;
        for (let i in contents) {
            let index = Number(i), content = contents[index],
                /**@type {string[]} */
                allowAPIs = defines.config.platforms[platform].allowAPIs;
            if (typeof content !== "string") {
                node.appendChild(content.cloneNode(true));
                continue;
            }
            if (content.startsWith("#")) {
                if (node.lastElementChild instanceof IconElement)
                    node.lastElementChild.icon = content.substring(1);
                continue;
            }
            /**@type {string} */
            let showContent = content;
            if (content in defines.nameMap && defines.nameMap[content][platform_index])
                showContent = defines.nameMap[content][platform_index];
            let define = findDefine(showContent, allowAPIs), checkDefine = findDefine(showContent),
                /**@type {string} */
                // @ts-ignore
                front = findContent(contents, index - 1, -1, FIND_NEXT) ?? "",
                /**@type {string} */
                // @ts-ignore
                back = findContent(contents, index + 1, 1, FIND_NEXT) ?? "";
            if (getCharType(content) !== 1) {
                node.appendChild(document.createTextNode(content));
                if (content.includes('('))
                    chars.push('(');
                if (content.includes('['))
                    chars.push('[');
                if (content === '<')
                    chars.push('<');
                if (content.includes(')') && chars[chars.length - 1] === '(')
                    chars.pop();
                if (content.includes(']') && chars[chars.length - 1] === '[')
                    chars.pop();
                if (content === '>')
                    chars.pop();
                continue;
            }
            if (!(back.startsWith(":") || back.startsWith("(") || back.startsWith("?:")) && checkDefine) {
                if (define !== null) {
                    /**@type {import("./element.mjs").DefineElement} */
                    // @ts-ignore
                    let def = document.createElement('docs-def');
                    def.allowAPIs = allowAPIs;
                    def._cache = define;
                    def.content = showContent;
                    node.appendChild(def);
                    continue;
                } else if (!USE_CUSTOM_PLATFORM) {
                    resultNodes[platform_index] = null;
                    --platformCount;
                    break;
                }
            }
            /**@type {import("./element.mjs").IconElement} */
            // @ts-ignore
            let icon = document.createElement('docs-icon');
            if (back === "in" || back === "of")
                icon.icon = "index";
            else if (back.startsWith("("))
                icon.icon = "method";
            else if (back.endsWith(":")) {
                if (chars[chars.length - 1] === '(')
                    icon.icon = "arg";
                else
                    icon.icon = "property";
            }
            icon.content = showContent;
            node.appendChild(icon);
        }
    }
    let div = document.createElement('div');
    if (anchorContent !== null && !div.hasAttribute("anchor")) {
        let anchor = assignHash(anchorContent + (platforms.length ? ("-" + platforms.join("-")) : ""));
        div.setAttribute("anchor", anchor);
        div.addEventListener("click", SET_HASH);
    }
    div.setAttribute('class', 'code');
    for (let node of resultNodes)
        if (node !== null) {
            if (anchorContent !== null && !node.hasAttribute("anchor")) {
                let anchor = assignHash(`${anchorContent}@${node.dataset["platform"] ?? ""}`),
                    viewed = isViewed(anchor, getContent(node));
                node.setAttribute("anchor", anchor);
                if (viewed !== VIEWED_RESULT.YES) {
                    node.classList.add(viewed === VIEWED_RESULT.NOT ? "new" : "revised");
                    node.addEventListener("mouseenter", view, { once: true });
                }
            }
            div.appendChild(node);
        }
    if (platformCount <= 0) {
        let node = document.createElement('blockquote');
        if (classList.length > 0)
            node.setAttribute('class', classList.join(' '));
        node.classList.add('error');
        node.title = "如果你看到这个，说明解析出错了\n请联系编者人员修复";
        // @ts-ignore
        div.appendChild(node);
        for (let i in contents) {
            let index = Number(i), content = contents[index];
            if (typeof content !== "string") {
                node.appendChild(content.cloneNode(true));
                continue;
            }
            if (getCharType(content) !== 1) {
                if (node.lastElementChild instanceof Text)
                    node.lastElementChild.textContent += content;
                else
                    node.appendChild(document.createTextNode(content));
                continue;
            }
            /**@type {import("./element.mjs").IconElement} */
            // @ts-ignore
            let icon = document.createElement('docs-icon');
            icon.icon = "error";
            icon.content = content;
            node.appendChild(icon);
        }
        /*if (anchorContent !== null) {
            let anchor = assignHash(anchorContent + "@error");
            node.setAttribute("anchor", anchor);
            node.addEventListener("click", SET_HASH);
        }*/
    }

    return div;
}
/**
 * 解析代码，并生成只有一行的代码块
 * @deprecated 可能不会做
 * @template {Node} T
 * @param {T} element 包含代码的元素
 * @returns {T}
 */
function parseInline(element) {
    return element;
}
export { parse };