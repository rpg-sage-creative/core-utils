/** [ { input:string; options?:{ mode:, key?: }, expected:KeyValueArg|null }] */
const parseKeyValueArgTests = [
	{ input:`a=b`,   options:undefined,        expected:{ arg:`a=b`, index:-1, isKeyValue:true, key:`a`, keyRegex:/^a$/i, value:`b` } },
	{ input:`a=b`,   options:{mode:"strict"},  expected:undefined },
	{ input:`a=b`,   options:{mode:"default"}, expected:{ arg:`a=b`, index:-1, isKeyValue:true, key:`a`, keyRegex:/^a$/i, value:`b` } },
	{ input:`a=b`,   options:{mode:"sloppy"},  expected:{ arg:`a=b`, index:-1, isKeyValue:true, key:`a`, keyRegex:/^a$/i, value:`b` } },

	{ input:`a="b"`, options:undefined,        expected:{ arg:`a="b"`, index:-1, isKeyValue:true, key:`a`, keyRegex:/^a$/i, value:`b` } },
	{ input:`a="b"`, options:{mode:"strict"},  expected:{ arg:`a="b"`, index:-1, isKeyValue:true, key:`a`, keyRegex:/^a$/i, value:`b` } },
	{ input:`a="b"`, options:{mode:"default"}, expected:{ arg:`a="b"`, index:-1, isKeyValue:true, key:`a`, keyRegex:/^a$/i, value:`b` } },
	{ input:`a="b"`, options:{mode:"sloppy"},  expected:{ arg:`a="b"`, index:-1, isKeyValue:true, key:`a`, keyRegex:/^a$/i, value:`b` } },

	{ input:`a='b'`, options:undefined,        expected:{ arg:`a='b'`, index:-1, isKeyValue:true, key:`a`, keyRegex:/^a$/i, value:`b` } },
	{ input:`a='b'`, options:{mode:"strict"},  expected:{ arg:`a='b'`, index:-1, isKeyValue:true, key:`a`, keyRegex:/^a$/i, value:`b` } },
	{ input:`a='b'`, options:{mode:"default"}, expected:{ arg:`a='b'`, index:-1, isKeyValue:true, key:`a`, keyRegex:/^a$/i, value:`b` } },
	{ input:`a='b'`, options:{mode:"sloppy"},  expected:{ arg:`a='b'`, index:-1, isKeyValue:true, key:`a`, keyRegex:/^a$/i, value:`b` } },

	{ input:`a=b`,   options:{key:"a"},        expected:{ arg:`a=b`, index:-1, isKeyValue:true, key:`a`, keyRegex:/^a$/i, value:`b` } },
	{ input:`a=b`,   options:{key:"A"},        expected:{ arg:`a=b`, index:-1, isKeyValue:true, key:`a`, keyRegex:/^a$/i, value:`b` } },
	{ input:`a=b`,   options:{key:"b"},        expected:undefined },

	{ input:`a=`,    options:undefined,        expected:undefined },
	{ input:`a= `,   options:undefined,        expected:undefined },
	{ input:`a= "`,  options:undefined,        expected:undefined },
	{ input:`a= b"`, options:undefined,        expected:undefined },
	{ input:`a= b"`, options:{mode:"sloppy"},  expected:undefined },

	{ input:`a= "''"`, options:undefined, expected:undefined },
	{ input:`a= '""'`, options:{mode:"sloppy"}, expected:{ arg:`a= '""'`, index:-1, isKeyValue:true, key:`a`, keyRegex:/^a$/i, value:`""` } },
	{ input:`a= "''"`, options:{key:"a",mode:"sloppy"}, expected:{ arg:`a= "''"`, index:-1, isKeyValue:true, key:`a`, keyRegex:/^a$/i, value:`''` } },
	{ input:`a= "''"`, options:{key:"b",mode:"sloppy"}, expected:undefined },

	{ input:`a=""`, options:undefined, expected:{ arg:`a=""`, index:-1, isKeyValue:true, key:`a`, keyRegex:/^a$/i, value:`` } },
	{ input:`a=''`, options:undefined, expected:{ arg:`a=''`, index:-1, isKeyValue:true, key:`a`, keyRegex:/^a$/i, value:`` } },
	{ input:`a=$$%$$%$%$`, options:undefined, expected:{ arg:`a=$$%$$%$%$`, index:-1, isKeyValue:true, key:`a`, keyRegex:/^a$/i, value:`$$%$$%$%$`, } },
	{ input:`a="$$%$$%$%$"`, options:undefined, expected:{ arg:`a="$$%$$%$%$"`, index:-1, isKeyValue:true, key:`a`, keyRegex:/^a$/i, value:`$$%$$%$%$` } },
	{ input:`a='$$%$$%$%$'`, options:undefined, expected:{ arg:`a='$$%$$%$%$'`, index:-1, isKeyValue:true, key:`a`, keyRegex:/^a$/i, value:`$$%$$%$%$` } },
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