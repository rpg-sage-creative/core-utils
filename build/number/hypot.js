export function hypot(x, y, z) {
    const xy = Math.hypot(x, y);
    if (typeof (z) === "number") {
        return Math.hypot(xy, z);
    }
    return xy;
}
