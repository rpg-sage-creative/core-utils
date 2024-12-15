import { EphemeralMap } from "./EphemeralMap.js";
let _cacheSet;
export class Cache {
    _cache;
    _msToLive;
    constructor(msToLive) {
        this._msToLive = msToLive;
        const cacheSet = _cacheSet ?? (_cacheSet = new WeakSet());
        cacheSet.add(this);
    }
    clear() {
        const cache = this._cache;
        const size = cache?.size ?? 0;
        if (size > 0) {
            cache.clear();
            return true;
        }
        return false;
    }
    delete(key) {
        return this._cache?.delete(key) ?? false;
    }
    destroy() {
        _cacheSet?.delete(this);
        this._cache?.clear();
        this._cache = null;
    }
    get(key) {
        const map = this.getOrCreateCache();
        if (!map.has(key)) {
            return undefined;
        }
        return map.get(key);
    }
    async getOrFetch(key, fn) {
        const map = this.getOrCreateCache();
        if (!map.has(key)) {
            map.set(key, await fn());
        }
        return map.get(key);
    }
    getOrSet(key, fn) {
        const map = this.getOrCreateCache();
        if (!map.has(key)) {
            map.set(key, fn());
        }
        return map.get(key);
    }
    getOrCreateCache() {
        if (!this._cache) {
            if (this._msToLive) {
                this._cache = new EphemeralMap(this._msToLive);
            }
            else {
                this._cache = new Map();
            }
        }
        return this._cache;
    }
    static clear() {
        if (_cacheSet) {
            Set.prototype.forEach.call(_cacheSet, (cache) => cache.clear());
        }
    }
}
