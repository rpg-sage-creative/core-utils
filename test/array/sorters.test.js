import { or, sortAsPrimitive, sortPrimitive } from "../../build/index.js";

describe("array", () => {
	describe("sorters", () => {

		const _input = [2,1,null,"2",true,null,undefined,2,null,"1",1,false,true];

		test(`sortPrimitive`, () => {
			const input = _input.slice();
			const expected = [false,true,true,1,1,"1",2,2,"2",null,null,null,undefined];
			expect(input).not.toStrictEqual(expected);
			input.sort(sortPrimitive);
			expect(input).toStrictEqual(expected);
		});

		test(`sortPrimitive() (reversed)`, () => {
			const input = _input.slice();
			const expected = [undefined,null,null,null,"2",2,2,"1",1,1,true,true,false];
			expect(input).not.toStrictEqual(expected);
			input.sort(sortPrimitive).reverse();
			expect(input).toStrictEqual(expected);
		});

		test(`sortAsPrimitive("string")`, () => {
			const input = _input.slice();
			const expected = [1,"1",1,2,"2",2,false,true,true,null,null,null,undefined];
			expect(input).not.toStrictEqual(expected);
			input.sort(sortAsPrimitive("string"));
			expect(input).toStrictEqual(expected);
		});

		test(`sortPrimitive (dates)`, () => {
			const input = [283334400001,new Date(1978,11,24),283334400000,new Date(1978,11,24)];
			const expected = [new Date(1978,11,24),283334400000,new Date(1978,11,24),283334400001];
			expect(input).not.toStrictEqual(expected);
			input.sort(sortPrimitive);
			expect(input).toStrictEqual(expected);
		});

		test(`or((a,b)=>sortPrimitive(a.level,b.level),(a,b)=>sortPrimitive(a.name,b.name))`, () => {
			const input = [{level:0,name:"Zero"},{level:1,name:"Zero"},{level:0,name:"zero"},{level:0,name:"one"},{level:1,name:"zero"},{level:1,name:"one"}];
			const expected = [{ level: 0, name: "one" },{ level: 0, name: "Zero" },{ level: 0, name: "zero" },{ level: 1, name: "one" },{ level: 1, name: "Zero" },{ level: 1, name: "zero" }];
			expect(input).not.toStrictEqual(expected);
			input.sort(or((a,b)=>sortPrimitive(a.level,b.level),(a,b)=>sortPrimitive(a.name,b.name)));
			expect(input).toStrictEqual(expected);
		});
	});
});
