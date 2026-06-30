/**
 * Define Parser - 定义解释器
 * 此文件不进行两项目之间同步
 * @version 1.1
 */

/// @ts-check

import { IconElement, DefineElement } from "./element.mjs"
import { parse } from "./parser.mjs"
import { clearHashMap } from "./viewed.mjs"


console.log('定义解释器 v1.1');

window.customElements.define('docs-icon', IconElement);
window.customElements.define('docs-def', DefineElement);
console.log('自定义元素注册成功');


/**
 * 调用此方法对页面进行解析
 * 至于在哪里调用，这不是我能解决的事
 */
function parseNode() {
    clearHashMap();
    console.time('解析元素');
    document.querySelectorAll('blockquote, .parse').forEach(element => {
        try {
            let _0x00 = document.createElement('div');
            let elements = [];
            if (element.tagName === 'BLOCKQUOTE' && element.firstElementChild?.tagName === 'P')
                elements = Array.from(element.children).filter(e => e.textContent?.trim().startsWith('!p'));
            else if (element.textContent?.trim().startsWith('!p') || element.classList.contains('parse'))
                elements.push(element);
            if (elements.length <= 0)
                return;
            for (let _0x01 of elements) {
                _0x00.appendChild(parse(_0x01));
            }
            if (element.parentElement === null)
                console.warn('父元素是null');
            element.parentElement?.replaceChild(_0x00, element);
            //clearChildren(element);
            //element.appendChild(_0x00);
        } catch (error) {
            console.error('解析元素时出现错误', error);
        }
    });
    console.timeEnd('解析元素');
}