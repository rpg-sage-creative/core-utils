const quoteTests = [
	{ unquoted:``,         quoted:`""`,             style:undefined, contents:"*" },
	{ unquoted:` `,        quoted:`" "`,            style:undefined },
	{ unquoted:`simple`,   quoted:`"simple"`,       style:undefined },
	{ unquoted:`simple`,   quoted:`"simple"`,       style:"double" },
	{ unquoted:`simple`,   quoted:`'simple'`,       style:"single" },
	{ unquoted:`"simple"`, quoted:`"\\"simple\\""`, style:undefined },
	{ unquoted:`'simple'`, quoted:`'\\'simple\\''`, style:"single" },
	{ unquoted:`sim“”ple`, quoted:`"sim“”ple"`,     style:undefined },
	{ unquoted:`sim„“ple`, quoted:`"sim„“ple"`,     style:undefined },
	{ unquoted:`sim''ple`, quoted:`"sim''ple"`,     style:undefined },

	{ unquoted:`simple "with" quotes`,              quoted:`"simple \\"with\\" quotes"`,                      style:undefined },
	{ unquoted:`simple "with \\"double\\"" quotes`, quoted:`"simple \\"with \\\\\\"double\\\\\\"\\" quotes"`, style:undefined },
	{ unquoted:`simple 'with' quotes`,              quoted:`'simple \\'with\\' quotes'`,                      style:"single" },

	{ unquoted:` " `, quoted:`" \\" "`,                                                       style:undefined },
	{ unquoted:` " \\" " `, quoted:`" \\" \\\\\\" \\" "`,                                     style:undefined },
	{ unquoted:` " \\" \\\\\\" \\" " `, quoted:`" \\" \\\\\\" \\\\\\\\\\\\\\" \\\\\\" \\" "`, style:undefined },
];

const dequoteTests = [
	{ quoted:`""`,                  unquoted:`""`,                  style:undefined, isQuoted:false }, // dequote fails due to default contents/quantifier "+"
	{ quoted:` '‘"“„ `,             unquoted:` '‘"“„ `,             style:undefined, isQuoted:false },
	{ quoted:`"'‘“„"`,              unquoted:`'‘“„`,                style:undefined, isQuoted:true },

	{ quoted:` 'normal single' `,   unquoted:` 'normal single' `,   style:undefined, isQuoted:false },
	{ quoted:` ‘fancy single’ `,    unquoted:` ‘fancy single’ `,    style:undefined, isQuoted:false },
	{ quoted:` "normal double" `,   unquoted:` "normal double" `,   style:undefined, isQuoted:false },
	{ quoted:` “fancy double” `,    unquoted:` “fancy double” `,    style:undefined, isQuoted:false },
	{ quoted:` „extended double“ `, unquoted:` „extended double“ `, style:undefined, isQuoted:false },
	{ quoted:` „extended double” `, unquoted:` „extended double” `, style:undefined, isQuoted:false },

	{ quoted:`'normal single'`,     unquoted:`normal single`,       style:undefined, isQuoted:true },
	{ quoted:`‘fancy single’`,      unquoted:`fancy single`,        style:undefined, isQuoted:true },
	{ quoted:`"normal double"`,     unquoted:`normal double`,       style:undefined, isQuoted:true },
	{ quoted:`“fancy double”`,      unquoted:`fancy double`,        style:undefined, isQuoted:true },
	{ quoted:`„extended double“`,   unquoted:`extended double`,     style:undefined, isQuoted:true },
	{ quoted:`„extended double”`,   unquoted:`extended double`,     style:undefined, isQuoted:true },
	{ quoted:`«arrow double»`,      unquoted:`arrow double`,        style:undefined, isQuoted:true },
	{ quoted:`»arrow double«`,      unquoted:`arrow double`,        style:undefined, isQuoted:true },

	{ quoted:`"normal double"`,     unquoted:`normal double`,       style:"double", isQuoted:true },
	{ quoted:`"normal double"`,     unquoted:`"normal double"`,     style:"single", isQuoted:false },

	{ quoted:`“fancy double”`,      unquoted:`fancy double`,        style:"double", isQuoted:true },
	{ quoted:`“fancy double”`,      unquoted:`“fancy double”`,      style:"strict", isQuoted:false },
	{ quoted:`“fancy double”`,      unquoted:`fancy double`,        style:"fancy",  isQuoted:true },

	{ quoted:`'normal single'`,     unquoted:`'normal single'`,     style:"double", isQuoted:false },
	{ quoted:`'normal single'`,     unquoted:`normal single`,       style:"single", isQuoted:true },

	// { quoted:``, unquoted:false, style:undefined },
];

export function getTests(which) {
	switch(which) {
		case "quote": return quoteTests;
		case "dequote": return quoteTests.concat(dequoteTests);
		case "isQuoted": return quoteTests.concat(dequoteTests);
		default: return [];
	}
}