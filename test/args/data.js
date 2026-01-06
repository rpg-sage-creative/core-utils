/** [ { input:string; options?:{ mode:, key?: }, expected:KeyValueArg|null }] */
const parseKeyValueArgTests = [
	{ input:`a=b`,            expected:{ raw:`a=b`, index:-1, isKeyValue:true, key:`a`, value:`b` } },
	{ input:`a.1=b`,          expected:{ raw:`a.1=b`, index:-1, isKeyValue:true, key:`a.1`, value:`b` } },
	{ input:`a-1=b`,          expected:{ raw:`a-1=b`, index:-1, isKeyValue:true, key:`a-1`, value:`b` } },
	{ input:`-a1=b`,          expected:undefined },
	{ input:`.a1=b`,          expected:undefined },

	{ input:`a="b"`,          expected:{ raw:`a="b"`, index:-1, isKeyValue:true, key:`a`, value:`b` } },
	{ input:`a="b\\"b"`,      expected:{ raw:`a="b\\"b"`, index:-1, isKeyValue:true, key:`a`, value:`b"b` } },

	{ input:`a='b'`,          expected:{ raw:`a='b'`, index:-1, isKeyValue:true, key:`a`, value:`b` } },
	{ input:`a='b\\'b'`,      expected:{ raw:`a='b\\'b'`, index:-1, isKeyValue:true, key:`a`, value:`b'b` } },

	{ input:`a=`,             expected:undefined },
	{ input:`a= `,            expected:undefined },
	{ input:`a= "`,           expected:undefined },
	{ input:`a= b"`,          expected:undefined },

	{ input:`a= "''"`,        expected:undefined },
	{ input:`a= '""'`,        expected:undefined },

	{ input:`a=""`,           expected:{ raw:`a=""`, index:-1, isKeyValue:true, key:`a`, value:null } },
	{ input:`a=''`,           expected:{ raw:`a=''`, index:-1, isKeyValue:true, key:`a`, value:null } },
	{ input:`a=$$%$$%$%$`,    expected:undefined },
	{ input:`a="$$%$$%$%$"`,  expected:{ raw:`a="$$%$$%$%$"`, index:-1, isKeyValue:true, key:`a`, value:`$$%$$%$%$` } },
	{ input:`a='$$%$$%$%$'`,  expected:{ raw:`a='$$%$$%$%$'`, index:-1, isKeyValue:true, key:`a`, value:`$$%$$%$%$` } },
];

const parseKeyValueArgsTests = [
	{ input:`arg1=0`, expected:[
		{ raw:`arg1=0`, index:-1, isKeyValue:true, key:`arg1`, value:"0" },
	] },
	{ input:`arg.1=0`, expected:[
		{ raw:`arg.1=0`, index:-1, isKeyValue:true, key:`arg.1`, value:"0" },
	] },
	{ input:`arg-1=0`, expected:[
		{ raw:`arg-1=0`, index:-1, isKeyValue:true, key:`arg-1`, value:"0" },
	] },
	{ input:`arg2="blah"`, expected:[
		{ raw:`arg2="blah"`, index:-1, isKeyValue:true, key:`arg2`, value:"blah" },
	] },
	{ input:`arg1=0 arg2="blah"`, expected:[
		{ raw:`arg1=0`, index:-1, isKeyValue:true, key:`arg1`, value:"0" },
		{ raw:`arg2="blah"`, index:-1, isKeyValue:true, key:`arg2`, value:"blah" },
	] },

	{ input:`[macroName arg1=0]`, expected:[
		{ raw:`arg1=0`, index:-1, isKeyValue:true, key:`arg1`, value:"0" },
	] },
	{ input:`[macroName arg2="blah"]`, expected:[
		{ raw:`arg2="blah"`, index:-1, isKeyValue:true, key:`arg2`, value:"blah" },
	] },
	{ input:`[macroName arg1=0 arg2="blah"]`, expected:[
		{ raw:`arg1=0`, index:-1, isKeyValue:true, key:`arg1`, value:"0" },
		{ raw:`arg2="blah"`, index:-1, isKeyValue:true, key:`arg2`, value:"blah" },
	] },
	{ input:`[macroName arg1=0arg2="blah"]`, expected:[
		{ raw:`arg1=0arg2`, index:-1, isKeyValue:true, key:`arg1`, value:"0arg2" },
	] },
	{ input:`[macroName  arg2="blah"arg1=0]`, expected:[
		{ raw:`arg2="blah"`, index:-1, isKeyValue:true, key:`arg2`, value:"blah" },
		{ raw:`arg1=0`, index:-1, isKeyValue:true, key:`arg1`, value:"0" },
	] },
	{ input:`[macroName  arg2='"blah"arg1=0']`, expected:[
		{ raw:`arg2='"blah"arg1=0'`, index:-1, isKeyValue:true, key:`arg2`, value:"\"blah\"arg1=0" },
	] },
];

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