import { info, assert, runTests, getCodeName, getBuildInfo, getDataRoot, getEnvironmentName, getId, getPort, } from "../../build/index.js";

function assertMissingVariable(fn, arg) {
	try {
		fn(arg);
	}catch(ex) {
		assert(ex.message.startsWith("Environment Variable Missing:"), `Test Failed: ${fn.name}(${arg ?? ""})`);
	}
}

function testNoArgs() {
	info();
	info("Testing No Args:");
	// assertMissingVariable(getAwsEndpointUrl, "Map");
	assertMissingVariable(getCodeName);
	assertMissingVariable(getBuildInfo);
	assertMissingVariable(getDataRoot);
	assertMissingVariable(getEnvironmentName);
	assertMissingVariable(getId, "homeServer");
	assertMissingVariable(getId, "rollem");
	assertMissingVariable(getId, "superAdmin");
	assertMissingVariable(getId, "superUser");
	assertMissingVariable(getId, "tupperBox");
	assertMissingVariable(getPort, "Map");
}

function assertNotMissingVariable(fn, arg) {
	try {
		fn(arg);
		assert(true, `Test Succeeded: ${fn.name}`);
	}catch(ex) {
		error(ex.message);
		assert(false, `Test Failed: ${fn.name}`);
	}
}

function testArgs() {
	info();
	info("Testing Args:");
	// assertNotMissingVariable(getAwsEndpointUrl, "Map");
	assertNotMissingVariable(getCodeName);
	assertNotMissingVariable(getBuildInfo);
	assertNotMissingVariable(getDataRoot);
	assertNotMissingVariable(getEnvironmentName);
	assertNotMissingVariable(getId, "homeServer");
	assertNotMissingVariable(getId, "rollem");
	assertNotMissingVariable(getId, "superAdmin");
	assertNotMissingVariable(getId, "superUser");
	assertNotMissingVariable(getId, "tupperBox");
	assertNotMissingVariable(getPort, "Map");
}

runTests(async function test_env() {
	if (process.argv.slice(2).length) {
		testArgs();
	}else {
		testNoArgs();
	}

	// debug(getBuildInfo());
});
