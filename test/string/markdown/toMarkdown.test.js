import { toLiteral } from "../../../build/index.js";
import { toMarkdown } from "../../../build/index.js";

describe("string", () => {
	describe("markdown", () => {

			const tests = [
				{
					input:
`
<h1>Header 1</h1>
<h2>Header 2</h2>
<h3>Header 3</h3>
<h4>Header 4</h4>
<blockquote>line 1
line 2</blockquote>
<b>bold</b> and <strong>strong</strong>
<i>italics
more</i>
<code>code</code>
<footer>footer</footer>
<s>s</s> or <strike>strike</strike>
line<br>break
<a href="https://rpgsage.io">RPG Sage Site</a>
<a href="https://rpgsage.io" title="cool site bro">RPG Sage Site</a>
line<br/>break
<u>underline</u>
<ul><li>first</li><li>second</li></ul>
<ul><li>first</li><ol><li>first child first</li><li>first child second</li></ol><li>second</li></ul>
\ttabbed
<ol><li>first</li><li>second</li></ol>
<ol start="5"><li>first</li><li>second</li></ol>
`,
					expected:
`

# Header 1

## Header 2

### Header 3

__**Header 4**__


> line 1
> line 2

**bold** and **strong**
*italics
more*
\`code\`
-# footer
~~s~~ or ~~strike~~
line
break
[RPG Sage Site](https://rpgsage.io)
[RPG Sage Site](https://rpgsage.io "cool site bro")
line
break
__underline__

- first
- second

- first
  1. first child first
  2. first child second
- second
 \u00A0 \u00A0tabbed

1. first
2. second

5. first
6. second
`
				},
			];

			tests.forEach(({ input, expected }) => {
				test(`toMarkdown()`, () => {
					expect(toMarkdown(input)).toBe(expected);
				});
			});

	});
});