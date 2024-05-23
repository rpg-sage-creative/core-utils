function getName(ctor) {
    return ctor.name.split(".")[0];
}
export function applyMixins(ctor, mixins, options = {}) {
    const { exitOnConflict = true, logPropertyMap = "conflict", resolutionMethod = "mixin" } = options;
    let conflicts = false;
    const propertyMap = new Map();
    const initialPropertyNames = Object.getOwnPropertyNames(ctor.prototype);
    initialPropertyNames.forEach(name => propertyMap.set(name, [getName(ctor)]));
    mixins.forEach(mixin => {
        Object.getOwnPropertyNames(mixin.prototype).forEach(name => {
            if (name === "constructor") {
                return;
            }
            let apply = false;
            if (Object.hasOwn(ctor.prototype, name)) {
                if (resolutionMethod === "none" || (resolutionMethod === "mixin" && initialPropertyNames.includes(name))) {
                    console.error(`error:: Mixin Conflict: Overriding ${getName(ctor)}.${name} with ${getName(mixin)}.${name}`);
                    conflicts = true;
                }
                else {
                    apply = true;
                }
            }
            else {
                apply = true;
            }
            if (apply) {
                Object.defineProperty(ctor.prototype, name, Object.getOwnPropertyDescriptor(mixin.prototype, name) ?? Object.create(null));
                propertyMap.set(name, (propertyMap.get(name) ?? []).concat([getName(mixin)]));
            }
        });
    });
    if (logPropertyMap === true || (conflicts && logPropertyMap === "conflict")) {
        [...propertyMap].forEach(([key, stack]) => console.debug(`debug:: ${key}: ${stack.join(" -> ")}`));
    }
    if (conflicts && exitOnConflict) {
        process.exit(1);
    }
}
