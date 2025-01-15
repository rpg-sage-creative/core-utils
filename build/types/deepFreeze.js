function canFreeze(value) {
    if (value) {
        switch (typeof (value)) {
            case "object": return true;
            case "function": return true;
            default: return false;
        }
    }
    return false;
}
export function deepFreeze(object) {
    const frozen = new WeakSet();
    const freeze = (obj) => {
        if (!frozen.has(obj)) {
            frozen.add(obj);
            const keys = Reflect.ownKeys(obj);
            for (const key of keys) {
                const value = obj[key];
                if (canFreeze(value)) {
                    freeze(value);
                }
            }
            if (!Object.isFrozen(obj)) {
                Object.freeze(obj);
            }
        }
        return obj;
    };
    if (canFreeze(object)) {
        freeze(object);
    }
    return object;
}
