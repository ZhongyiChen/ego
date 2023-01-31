/**
 * @author 陈忠艺 <ego@chenzhongyi.net>
 * 
 * 超链接的处理与生成。
 */

/**
 * 查询参数集合
 */
class SearchParams{
  /**
   * 
   * @param {EgoUrl} source - 来源 URL 对象
   */
  constructor(source) {
    this._source = source;

    this._params = null;
  }
  append() {

  }
  delete() {

  }
  entries() {

  }
  forEach() {

  }
  get() {

  }
  getAll() {

  }
  has() {

  }
  keys() {

  }
  set() {

  }
  sort() {

  }
  toString() {

  }
  values() {

  }
}

/**
 * 普通的 URL 处理，类似于 js 运行时提供的 URL 接口。格式为：
 * 
 * [protocol]://[login]@[host]:[port]/[pathname][file]?[search]#[hash]
 * 
 * 其中，
 * 
 * [login] = [user]:[password]
 */
export class EgoUrl {
  constructor(url = '') {
    if (!url) return;

    this._protocol = '';
    this._host = '';
    this._port = '';
    this._pathname = '';
    this._search = '';
    this._searchParams = null;
    this._hash = '';

    let index = url.indexOf('#');

    if (-1 !== index) {
      // 存在 hash
      this._initHash(url.slice(index));
      url = url.slice(0, index);
    }

    index = url.indexOf('?');

    if (-1 !== index) {
      // 存在 search
      this._initSearch(url.slice(index));
      url = url.slice(0, index);
    }
  }
  _initSearch(v) {
    if ('?' === v) v = '';

    this._search = v;
  }
  _initHash(v) {
    if ('#' === v) v = '';

    this._hash = v;
  }
  get search() {
    return this._search;
  }
  set search(v = '') {
    let s = v;

    if (s && '?' !== s[0]) s = '?' + s;

    this._initSearch(s);

    return s;
  }
  get searchParams() {
    if (!this._searchParams) {
      this._searchParams = new SearchParams(this);
    }

    return this._searchParams;
  }
  set searchParams(v) {
    return v;
  }
  get hash() {
    return this._hash;
  }
  set hash(v = '') {
    let s = v;

    if (s && '#' !== s[0]) s = '#' + s;

    this._initHash(s);

    return v;
  }
}