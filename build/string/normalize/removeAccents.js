const AccentsRegExp = /[\u0300-\u036f]/g;
export function removeAccents(value) {
    return value.normalize('NFD').replace(AccentsRegExp, '');
}
