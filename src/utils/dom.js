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
 * NOOP
 */
function noop() {}

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
 * 获取 dom 元素中 data-* 属性的数据
 * 
 * @param {Element} dom - 元素
 * @param {string} name - data-*
 * 
 * @returns {string}
 */
export function extractDataContent(dom, name) {
  if (!dom) return void 0;
  if (dom.dataset) return dom.dataset[name];

  return dom.getAttribute(`data-${name}`);
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
 * 比较典型的是被编码后的字符串含有：
 * | 编码 | 解码 |
 * --------------
 * | &lt; | <   |
 * | &gt; | >   |
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

/**
 * 加载脚本地址
 * 
 * @param {string} src - 脚本地址
 * @param {Function} resolve - 加载完成的回调
 * @param {Function} reject - 加载失败的回调
 */
export function loadScript(src, resolve = noop, reject = noop) {
  if (!src) {
    reject(new Error('src is required'));
    return;
  }
  if (document.getElementById(src)) {
    resolve();
    return;
  }

  const script = document.createElement('script');

  script.type = 'text/javascript';
  script.onerror = (err) => {
    reject(err);
  }
  if (script.readyState) {
    // IE
    script.onreadystatechange = (event) => {
      if (script.readyState === 'loaded' || script.readyState === 'complete') {
        script.onreadystatechange = null;
        resolve(event);
      }
    };
  } else {
    script.onload = (event) => {
      resolve(event);
    };
  }
  script.id = src;
  script.src = src;
  document.head.appendChild(script);
}

/**
 * 加载脚本地址 Promise 化
 * 
 * @param {string} src - 脚本地址
 * 
 * @returns {Promise<Event>}
 */
export function loadScriptPromisify(src) {
  return new Promise((resolve, reject) => loadScript(src, resolve, reject));
}

/**
 * 加载单张图片
 * 
 * @param {string} src - 图片地址
 * @param {Function} resolve - 加载完成的回调
 * @param {Function} reject - 加载失败的回调
 * 
 * @returns {HTMLImageElement} 图片
 */
export function loadImg(src, resolve = noop, reject = noop) {
  const img = new Image();

  img.src = src;

  if (img.complete) {
    resolve(img);
    return img;
  }

  img.addEventListener('error', () => reject(new Error(`Cannot find image with ${src}`)));
  img.addEventListener('load', () => resolve(img));

  return img;
}

/**
 * 加载单张图片 Promise 化
 * 
 * @param {string} src 图片地址
 * 
 * @returns {Promise<Image>}
 */
export function loadImgPromisify(src) {
  return new Promise((resolve, reject) => loadImg(src, resolve, reject));
}
