/** [ { input:string; options?:{ mode:, key?: }, expected:KeyValueArg|null }] */
const parseKeyValueArgTests = [
	{ input:`a=b`,            expected:{ raw:`a=b`, index:-1, isKeyValue:true, key:`a`, value:`b` } },

	{ input:`a="b"`,          expected:{ raw:`a="b"`, index:-1, isKeyValue:true, key:`a`, value:`b` } },

	{ input:`a='b'`,          expected:{ raw:`a='b'`, index:-1, isKeyValue:true, key:`a`, value:`b` } },

	{ input:`a=`,             expected:undefined },
	{ input:`a= `,            expected:undefined },
	{ input:`a= "`,           expected:undefined },
	{ input:`a= b"`,          expected:undefined },

	{ input:`a= "''"`,        expected:undefined },
	{ input:`a= '""'`,        expected:undefined },

	{ input:`a=""`,           expected:{ raw:`a=""`, index:-1, isKeyValue:true, key:`a`, value:null } },
	{ input:`a=''`,           expected:{ raw:`a=''`, index:-1, isKeyValue:true, key:`a`, value:null } },
	{ input:`a=$$%$$%$%$`,    expected:{ raw:`a=$$%$$%$%$`, index:-1, isKeyValue:true, key:`a`, value:`$$%$$%$%$`, } },
	{ input:`a="$$%$$%$%$"`,  expected:{ raw:`a="$$%$$%$%$"`, index:-1, isKeyValue:true, key:`a`, value:`$$%$$%$%$` } },
	{ input:`a='$$%$$%$%$'`,  expected:{ raw:`a='$$%$$%$%$'`, index:-1, isKeyValue:true, key:`a`, value:`$$%$$%$%$` } },
];

const parseKeyValueArgsTests = [

].concat(parseKeyValueArgTests.map(({ input, options, expected }) => ({ input, options, expected:expected?[expected]:[] })));

const isKeyValueArgTests = [

].concat(parseKeyValueArgTests.map(({ input, options, expected }) => ({ input, options, expected:!!expected })));

export function getTests(which) {
	switch(which) {
		case "isKeyValueArg": return isKeyValueArgTests;
		case "parseKeyValueArg": return parseKeyValueArgTests;
		case "parseKeyValueArgs": return parseKeyValueArgsTests;
		default: return [];
	}
}