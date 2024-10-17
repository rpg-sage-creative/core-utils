import { HasIdCore, assert, runTests, startAsserting } from "../../build/index.js";

class HasIdCoreTester extends HasIdCore { }

runTests(async function test_class() {
	const snowflake = "1234567890123456";
	const uuid = "1b6ace60-64cf-4a52-ab74-db0349655157";

	const hasSnowflakeCore = new HasIdCoreTester({ id:snowflake, objectType:"SnowflakeTester" });
	const snowflakeCoreTester = value => hasSnowflakeCore.equals(value);
	const hasUuidCore = new HasIdCoreTester({ id:uuid, objectType:"UuidTester" });
	const uuidCoreTester = value => hasUuidCore.equals(value);

	startAsserting("HasIdCore<snowflake>.equals");
	assert(true, snowflakeCoreTester, hasSnowflakeCore);
	assert(true, snowflakeCoreTester, snowflake);
	assert(false, snowflakeCoreTester, hasUuidCore);
	assert(false, snowflakeCoreTester, uuid);

	startAsserting("HasIdCore<uuid>.equals");
	assert(false, uuidCoreTester, hasSnowflakeCore);
	assert(false, uuidCoreTester, snowflake);
	assert(true, uuidCoreTester, hasUuidCore);
	assert(true, uuidCoreTester, uuid);

	const hasMultiCore = new HasIdCoreTester({ id:"garbage", did:snowflake, uuid:uuid, objectType:"MultiTester" });
	const multiCoreTester = value => hasMultiCore.equals(value);

	startAsserting("HasIdCore<multi>.equals");
	assert(false, multiCoreTester, "garbage");
	assert(true, multiCoreTester, snowflake);
	assert(true, multiCoreTester, uuid);

}, true);