export function getQuotePairs() {
    return [
        { chars: `''`, isSingle: true, isDouble: false, isFancy: false, isExtended: false },
        { chars: `‘’`, isSingle: true, isDouble: false, isFancy: true, isExtended: false },
        { chars: `""`, isSingle: false, isDouble: true, isFancy: false, isExtended: false },
        { chars: `“”`, isSingle: false, isDouble: true, isFancy: true, isExtended: false },
        { chars: `„“`, isSingle: false, isDouble: true, isFancy: false, isExtended: true },
        { chars: `„”`, isSingle: false, isDouble: true, isFancy: false, isExtended: true },
    ];
}
