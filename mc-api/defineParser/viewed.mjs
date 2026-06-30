// @ts-check
/**
 * 储存页面内所以定义对应hash的映射
 * @type {Map<string, number>}
 */
const HashMap = new Map(), PAGE_STORAGE_KEY = `viewed:${location.pathname}`;
var viewed = {};

/**
 * @enum {number}
 */
const VIEWED_RESULT = {
    NOT: 0,
    RRVISED: 1,
    YES: 2
}

HashMap.set("", 0);

/**
 * 分配hash
 * @param {string} content hash内容
 */
function assignHash(content) {
    if (HashMap.has(content)) {
        /**@type {number} */
        // @ts-ignore
        let _0x00 = HashMap.get(content);
        console.log(content, '已存在', _0x00);
        ++_0x00;
        HashMap.set(content, _0x00);
        return content + _0x00;
    } else {
        HashMap.set(content, 1);
        return content;
    }
}

/**
 * 为定义生成hash
 * @param {HTMLQuoteElement} element 要生成hash的元素
 */
function generateHash(element) {
    /**@type {import("./element.mjs").IconElement | import("./element.mjs").DefineElement | null} */
    let child = element.querySelector('docs-icon, docs-def'),
        content = encodeURIComponent(child?.content ?? "") + (element.dataset["platform"] ?? "");
    if (HashMap.has(content)) {
        /**@type {number} */
        // @ts-ignore
        let _0x00 = HashMap.get(content);
        ++_0x00;
        HashMap.set(content, _0x00);
        return content + _0x00;
    } else {
        HashMap.set(content, 1);
        return content;
    }
}

/**
 * 获取元素内容
 * @param {HTMLElement} element 要获取内容的元素
 * @returns {string}
 */
function getContent(element) {
    if (element.dataset["viewed:content"])
        return element.dataset["viewed:content"];
    // @ts-ignore
    let content = "";
    for (let child of element.childNodes) {
        // @ts-ignore
        if (child.tagName === "DOCS-DEF" || child.tagName === "DOCS-ICON")
            // @ts-ignore
            content += child.content;
        else
            content += child.textContent;
    }
    content = content.replaceAll(/\s/g, "");
    element.dataset["viewed:content"] = content;
    return content;
}

/**
 * 检查定义是否被浏览过
 * @param {string} hash 定义hash
 * @param {string} content 定义内容
 * @returns {VIEWED_RESULT} 定义是否被浏览过
 */
function isViewed(hash, content) {
    if (viewed[hash]){
        if (viewed[hash] === content)
            return VIEWED_RESULT.YES;
        else
            return VIEWED_RESULT.RRVISED;
    } else 
        return VIEWED_RESULT.NOT;
}
/**
 * 清除`.new`类
 * @param {MouseEvent} event 鼠标事件
 */

function clearNewClass(event) {
        /**@type {HTMLElement} */
    // @ts-ignore
    let node = event.currentTarget;
    node.classList.remove("new", "revised");
}
/**
 * 将定义标记为[已浏览]
 * @param {MouseEvent} event 鼠标事件
 */
function view(event) {
    /**@type {HTMLElement} */
    // @ts-ignore
    let node = event.currentTarget,
        content = getContent(node),
        hash = node.getAttribute("anchor");
    if (hash === null){
        console.error("元素无hash 内容：", content);
        return;
    }
    viewed[hash] = content;
    try {
        localStorage.setItem(PAGE_STORAGE_KEY, JSON.stringify(viewed));
    } catch (error) {
        console.error("[Viewed] SaveError:", error);
    }
    node.addEventListener("mouseleave", clearNewClass, {once: true});
}

function clearHashMap(){
    HashMap.clear();
}

let viewStorage = localStorage.getItem(PAGE_STORAGE_KEY);
if (viewStorage !== null) {
    Object.assign(viewed, JSON.parse(viewStorage));
}
export { assignHash, generateHash, isViewed, view, clearHashMap, getContent, VIEWED_RESULT }