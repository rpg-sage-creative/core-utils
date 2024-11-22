export function getDayOfYear(dt = new Date()) {
    const oneJanDate = new Date(dt.getFullYear(), 0, 1);
    const dateOnly = new Date(dt.getFullYear(), dt.getMonth(), dt.getDate());
    return Math.ceil((dateOnly.getTime() - oneJanDate.getTime()) / 86400000) + 1;
}
