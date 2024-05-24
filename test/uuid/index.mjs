import { NIL_UUID, UuidMatcher, assert, isNilUuid, isNonNilUuid, isUuid, orNilUuid, runTests } from "../../build/index.js";

runTests(async function test_uuid() {
	const validUuid = "3eb327b2-ecf6-40b0-a026-95b4dab9a141";
	const invalidUuid = "BOB";
	assert(isUuid(NIL_UUID), `isUuid(NIL_UUID) --> false`);
	assert(isNilUuid(NIL_UUID), `isNilUuid(NIL_UUID) --> false`);
	assert(!isNonNilUuid(NIL_UUID), `isNonNilUuid(NIL_UUID) --> true`);

	assert(isUuid(validUuid), `isUuid("${validUuid}") --> false`);
	assert(!isNilUuid(validUuid), `isNilUuid("${validUuid}") --> true`);
	assert(isNonNilUuid(validUuid), `isNonNilUuid("${validUuid}") --> false`);

	assert(orNilUuid(validUuid) === validUuid, `orNilUuid("${validUuid}") === "${validUuid}" -> false`);
	assert(orNilUuid(invalidUuid) === NIL_UUID, `orNilUuid("${invalidUuid}") === NIL_UUID -> false`);

	// assert(isUuid(randomUuid()), `isUuid(randomUuid()) --> false`);
	// assert(!isNilUuid(randomUuid()), `isNilUuid(randomUuid()) --> true`);
	// assert(isNonNilUuid(randomUuid()), `isNonNilUuid(randomUuid()) --> false`);

	const matcher = new UuidMatcher(validUuid);
	const tester = value => matcher.matches(value);
	assert(true, tester, validUuid);
	assert(false, tester, invalidUuid);
	assert(true, tester, matcher);
	assert(false, tester, null);
}, true);
