/**
 * @author 陈忠艺 <ego@chenzhongyi.net>
 * 
 * 与操作 DOM 相关的工具函数。该类型工具函数很可能有副作用。
 */
import {
  whatTypeIs,
} from './read-write';

/**
 * 判断当前浏览器 DOM 是否支持 classList 属性
 */
const HAS_CLASSLIST = document && 'classList' in document.documentElement;

/**
 * 检查某个元素是否含有某个类名
 *
 * @param {Element} dom 元素
 * @param {string} className 样式类名
 *
 * @returns {boolean}
 */
export function hasClassName(dom, className) {
  return ` ${dom.className} `.includes(` ${className} `);
}

/**
 * 为某个元素添加某个类名
 *
 * @param {Element} dom 元素
 * @param {string} className 样式类名
 */
export function addClassName(dom, className) {
  if (HAS_CLASSLIST) {
    dom.classList.add(className);
    return;
  }

  if (hasClassName(dom, className)) return;

  dom.className = ` ${dom.className} ${className} `.trim();
}

/**
 * 为某个元素剔除某个类名
 *
 * @param {Element} dom 元素
 * @param {string} className 样式类名
 */
export function removeClassName(dom, className) {
  if (HAS_CLASSLIST) {
    dom.classList.remove(className);
    return;
  }

  if (!hasClassName(dom, className)) return;

  dom.className = ` ${dom.className} `
    .replace(new RegExp(` ${className}`, 'g'), '')
    .trim();
}

/**
 * 为某个元素交替增删某个类名
 *
 * @param {Element} dom 元素
 * @param {string} className 样式类名
 */
export function toggleClassName(dom, className) {
  if (hasClassName(dom, className)) {
    removeClassName(dom, className);
  } else {
    addClassName(dom, className);
  }
}

/**
 * 提取 meta 标签的内容值
 * 
 * @param {string} name - meta 标签的 name 或 http-equiv 的属性值
 * 
 * @returns {string}
 */
export function extractMetaContent(name) {
  const metas = document.getElementsByTagName('meta');

  if (metas[name]) return metas[name].content;

  const meta = document.querySelector(`meta[name=${name}]`) || document.querySelector(`meta[http-equiv=${name}]`);

  if (meta) return meta.getAttribute('content');
}

/**
 * 提取标签树内的文本
 * 
 * @param {string} html - DOM 片段，即某个合法的标签树
 *
 * @example
 * ---------------------------
 *  input: '<div>hello <p>world</p><a>!</a></div>'
 * output: 'hello world!'
 * ---------------------------
 * 
 * @returns {string}
 */
export function extractTextContent(html) {
  if (!html) return '';

  let div = document.createElement('div');

  div.innerHTML = html;

  const result = div.innerText || div.textContent;

  div = null;

  return result;
}

/**
 * HTML 解码
 * 
 * @param {string} encodedHtml - 被编码后的字符串
 * 
 * @returns {string} - 解码后的字符串
 */
export const decode = extractTextContent;

/**
 * 把相对路径转换为绝对路径(基于当前 location 的所在目录)
 * 
 * @param {string} path - 相对路径
 *
 * @example
 * 假设当前页面地址为 https://chenzhongyi.net/ego/hello.html?abc=123#thankyou
 * ---------------------------
 *  input: 'a'
 * output: 'https://chenzhongyi.net/ego/a'
 * ---------------------------
 *  input: 'http://a'
 * output: 'http://a/'
 * ---------------------------
 *  input: 'http://a/b'
 * output: 'http://a/b'
 * ---------------------------
 *  input: ''
 * output: 'https://chenzhongyi.net/ego/hello.html'
 * ---------------------------
 *  input: './hello.png'
 * output: 'https://chenzhongyi.net/ego/hello.png'
 * ---------------------------
 * 
 * @returns {string}
 */
export function convertAbsolutePath(path) {
  let anchor = document.createElement('a');

  anchor.href = path;

  const result = anchor.href;

  anchor = null;

  return result;
}

/**
 * 编码 SVG
 * 
 * 用于赋值图片 src 或样式 url()
 * 
 * @param {string|Element} svg - SVG 标签字符串或元素
 * 
 * @returns {string}
 */
export function encodeSvg(svg) {
  const str = ({
    string: svg,
    element: svg.outerHTML,
  })[whatTypeIs(svg)];

  return 'data:image/svg+xml,' +  
    str.replace(/"/g, "'")
      .replace(/%/g, '%25')
      .replace(/#/g, '%23')
      .replace(/{/g, '%7B')
      .replace(/}/g, '%7D')
      .replace(/</g, '%3C')
      .replace(/>/g, '%3E')
}
