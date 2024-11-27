import { getUrlRegex } from "../../../build/index.js";
import { toString } from "../../toString.mjs";

describe("string", () => {
	describe("url", () => {

		const regex = getUrlRegex({ anchored:true });

		const goodUrls = [
			"http://google.com/q?word=text#marked",
			"https://google.com:80/q?word=text#marked",
			"ftp://google.com:80/q?word=text#marked",
			"sftp://google.com:80/q?word=text#marked",
		];
		goodUrls.forEach(url => {
			test(`${toString(regex)}.test(${url}) === true`, () => {
				expect(regex.test(url)).toBe(true);
				expect(regex.exec(url)[0]).toBe(url);
			});
		});

		const badUrls = [
			// port too long
			"https://google.com:655350/q?word=text#marked",
			// shttp not valid
			"shttp://google.com:80/q?word=text#marked",
			// ftps not valid
			"ftps://google.com:80/q?word=text#marked",
		];
		badUrls.forEach(url => {
			test(`${toString(regex)}.test(${url}) === false`, () => {
				expect(regex.test(url)).toBe(false);
				expect(regex.exec(url)).toBeNull();
			});
		});

		const wrapRegex = getUrlRegex({ wrapChars:"<>" });

		const wrapGoodUrls = [
			"<http://google.com/q?word=text#marked>",
			"<https://google.com:80/q?word=text#marked>"
		];
		wrapGoodUrls.forEach(url => {
			test(`${toString(wrapRegex)}.test(${url}) === true`, () => {
				expect(wrapRegex.test(url)).toBe(true);
				expect(wrapRegex.exec(url)[0]).toBe(url);
			});
		});

		const wrapBadUrls = [
			"http://google.com/q?word=text#marked",
			"https://google.com:80/q?word=text#marked"
		];
		wrapBadUrls.forEach(url => {
			test(`${toString(wrapRegex)}.test(${url}) === false`, () => {
				expect(wrapRegex.test(url)).toBe(false);
				expect(wrapRegex.exec(url)).toBeNull();
			});
		});

		const wrapOptionalRegex = getUrlRegex({ wrapChars:"<>", wrapOptional:true });

		const wrapOptionalGoodUrls = [
			"http://google.com/q?word=text#marked",
			"<https://google.com:80/q?word=text#marked>"
		];
		wrapOptionalGoodUrls.forEach(url => {
			test(`${toString(wrapOptionalRegex)}.test(${url}) === true`, () => {
				expect(wrapOptionalRegex.test(url)).toBe(true);
				expect(wrapOptionalRegex.exec(url)[0]).toBe(url);
			});
		});

		const wrapOptionalBadUrls = [
			"ftps://google.com/q?word=text#marked",
			"<ftps://google.com:80/q?word=text#marked>"
		];
		wrapOptionalBadUrls.forEach(url => {
			test(`${toString(wrapOptionalRegex)}.test(${url}) === false`, () => {
				expect(wrapOptionalRegex.test(url)).toBe(false);
				expect(wrapOptionalRegex.exec(url)).toBeNull();
			});
		});

		const anchoredWrapOptionalRegex = getUrlRegex({ anchored:true, wrapChars:"<>", wrapOptional:true });
		const anchoredWrapOptionalGoodUrls = [
			"https://cdn.discordapp.com/attachments/1173111558428184678/1204632128369983578/image.png?ex=65d57018&is=65c2fb18&hm=dfe49eddd9d55f29dd00a6d12e1bcc6e64218b7598b62827c32b15c5f0d466e3&",
		];
		anchoredWrapOptionalGoodUrls.forEach(url => {
			test(`${toString(anchoredWrapOptionalRegex)}.test(${url}) === true`, () => {
				expect(anchoredWrapOptionalRegex.test(url)).toBe(true);
				expect(anchoredWrapOptionalRegex.exec(url)[0]).toBe(url);
			});
		});

	});
});
