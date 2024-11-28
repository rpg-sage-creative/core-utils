const parseKeyValueArgTests = [
	{ input:`a=b`, options:undefined, expected:{ key:`a`, keyLower:`a`, value:`b`, clean:`a="b"` } },
	{ input:`a=b`, options:{key:"a"}, expected:{ key:`a`, keyLower:`a`, value:`b`, clean:`a="b"` } },
	{ input:`a=b`, options:{key:"A"}, expected:{ key:`a`, keyLower:`a`, value:`b`, clean:`a="b"` } },
	{ input:`a=b`, options:{key:"b"}, expected:null },
	{ input:`a=b`, options:{mode:"strict"}, expected:null },

	{ input:`a=`, options:undefined, expected:null },
	{ input:`a= `, options:undefined, expected:null },
	{ input:`a= "`, options:undefined, expected:null },
	{ input:`a= b"`, options:undefined, expected:null },
	{ input:`a= b"`, options:{mode:"sloppy"}, expected:null },

	{ input:`a= "''"`, options:undefined, expected:null },
	{ input:`a= '""'`, options:{mode:"sloppy"}, expected:{ key:`a`, keyLower:`a`, value:`""`, clean:`a="\\"\\""` } },
	{ input:`a= "''"`, options:{key:"a",mode:"sloppy"}, expected:{ key:`a`, keyLower:`a`, value:`''`, clean:`a="''"` } },
	{ input:`a= "''"`, options:{key:"b",mode:"sloppy"}, expected:null },

	{ input:`a=""`, options:undefined, expected:{ key:`a`, keyLower:`a`, value:``, clean:`a=""` } },
	{ input:`a=''`, options:undefined, expected:{ key:`a`, keyLower:`a`, value:``, clean:`a=""` } },
	{ input:`a="b"`, options:undefined, expected:{ key:`a`, keyLower:`a`, value:`b`, clean:`a="b"` } },
	{ input:`a='b'`, options:undefined, expected:{ key:`a`, keyLower:`a`, value:`b`, clean:`a="b"` } },
	{ input:`a=$$%$$%$%$`, options:undefined, expected:{ key:`a`, keyLower:`a`, value:`$$%$$%$%$`, clean:`a="$$%$$%$%$"` } },
	{ input:`a="$$%$$%$%$"`, options:undefined, expected:{ key:`a`, keyLower:`a`, value:`$$%$$%$%$`, clean:`a="$$%$$%$%$"` } },
	{ input:`a='$$%$$%$%$'`, options:undefined, expected:{ key:`a`, keyLower:`a`, value:`$$%$$%$%$`, clean:`a="$$%$$%$%$"` } },
];
const parseKeyValueArgsTests = [

].concat(parseKeyValueArgTests.map(({ input, options, expected }) => ({ input, options, expected:expected?[expected]:[] })));

export function getTests(which) {
	switch(which) {
		case "parseKeyValueArg": return parseKeyValueArgTests;
		case "parseKeyValueArgs": return parseKeyValueArgsTests;
		default: return [];
	}
}