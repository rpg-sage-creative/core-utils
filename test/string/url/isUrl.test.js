import { isUrl } from "../../../build/index.js";
import { toString } from "../../toString.mjs";

describe("string", () => {
	describe("url", () => {

		const goodUrls = [
			"http://google.com/q?word=text#marked",
			"https://google.com:80/q?word=text#marked",
			"ftp://google.com:80/q?word=text#marked",
			"sftp://google.com:80/q?word=text#marked",
			"<http://google.com/q?word=text#marked>",
			"<https://google.com:80/q?word=text#marked>",
			"https://cdn.discordapp.com/attachments/1173111558428184678/1204632128369983578/image.png?ex=65d57018&is=65c2fb18&hm=dfe49eddd9d55f29dd00a6d12e1bcc6e64218b7598b62827c32b15c5f0d466e3&",
		];
		goodUrls.forEach(url => {
			test(`isUrl(${toString(url)}) === true`, () => {
				expect(isUrl(url)).toBe(true);
			});
		});

		const badUrls = [
			// port too long
			"https://google.com:655350/q?word=text#marked",
			// shttp not valid
			"shttp://google.com:80/q?word=text#marked",
			// ftps not valid
			"ftps://google.com:80/q?word=text#marked",
			"ftps://google.com/q?word=text#marked",
			"<ftps://google.com:80/q?word=text#marked>",
		];
		badUrls.forEach(url => {
			test(`isUrl(${toString(url)}) === false`, () => {
				expect(isUrl(url)).toBe(false);
			});
		});

	});
});
