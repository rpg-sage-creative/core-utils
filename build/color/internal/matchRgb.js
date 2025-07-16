const rgbRegex = /rgb(?<rgba>a)?\((?<r>\d{1,3}),(?<g>\d{1,3}),(?<b>\d{1,3})(?:,(?<a>1(?:\.0+)?|0\.\d+))?\)/i;
export function matchRgb(value) {
    if (!value)
        return undefined;
    const groups = rgbRegex.exec(value.replace(/\s/g, ""))?.groups;
    if (!groups)
        return undefined;
    const { rgba, r, g, b, a } = groups;
    if (rgba && a === undefined)
        return undefined;
    if (!rgba && a !== undefined)
        return undefined;
    const red = +r;
    if (red < 0 || red > 255)
        return undefined;
    const green = +g;
    if (green < 0 || green > 255)
        return undefined;
    const blue = +b;
    if (blue < 0 || blue > 255)
        return undefined;
    if (rgba) {
        const alpha = +a;
        if (alpha < 0 || alpha > 1)
            return undefined;
        return { red, green, blue, alpha };
    }
    return { red, green, blue };
}
