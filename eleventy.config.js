import slugify from "@sindresorhus/slugify";
import {eleventyImageTransformPlugin} from "@11ty/eleventy-img"
import Image from "@11ty/eleventy-img"
import {extname, relative, join, parse} from 'path';
import {format} from 'prettier';
function lens(object, path) {
	return path.split(".").reduce((object, key) => object && object[key] ? object[key] : null, object);
}
function memoize(callback) {
	let cache = new Map();

	return (...args) => {
		// Only supports single-arg functions for now.
		if (args.filter(Boolean).length > 1) {
			return callback(...args);
		}

		let [cacheKey] = args;

		if (!cache.has(cacheKey)) {
			cache.set(cacheKey, callback(...args));

			return cache.get(cacheKey);
		}

		return cache.get(cacheKey);
	};
}

export default async function(eleventyConfig) {
	function filenameFormat(id, src, width, format) {
		const srcParsed = parse(src);
		const outputName = width ? `${srcParsed.name}-${id}-${width}.${format}` : `${srcParsed.name}-${id}.${format}`;
		return join(relative(join(eleventyConfig.directories.input, 'img'), srcParsed.dir), outputName);
	}
	eleventyConfig.addFilter("contains", (object, value, key = "") => lens(object, key)?.includes(value) ?? false);
	eleventyConfig.addFilter("flatMap", lens);
	eleventyConfig.addPassthroughCopy("robots.txt");
	eleventyConfig.addPassthroughCopy("css/*.css");
	eleventyConfig.addFilter("forceCapitalize", value => {
		value ??= '';
		return value.charAt(0).toUpperCase() + value.slice(1);
	});
	eleventyConfig.addFilter("keys", obj => !obj ? null : Object.keys(obj));
	eleventyConfig.addAsyncFilter("embedImage", async src => {
		if(!src) throw new Error("Image src is invalid");
		return (await Image(join(eleventyConfig.directories.input, 'img', src), {
			transformOnRequest: process.env.ELEVENTY_RUN_MODE === "serve",
			formats: ['jpeg'],
			widths: [1920],
			failOnError: true,
			outputDir: join(eleventyConfig.directories.output, 'img'),
			urlPath: "/img/",
			filenameFormat
		})).jpeg[0]
	});
	eleventyConfig.addFilter("gameUrl", memoize(game => {
		if(!game || typeof game.title !== "string") throw new Error("Could not generate game url for invalid game");
		return `/game/${slugify(game.title, {decamelize: false})}/`;
	}));
	eleventyConfig.addFilter("tagUrl", memoize(tag => {
		if(typeof tag !== "string") throw new Error("Could not generate tag url for invalid tag");
		return `/tag/${slugify(tag, {decamelize: false})}/`;
	}));
	eleventyConfig.addTransform("prettier", (content, output) => {
		const extension = extname(output);
		if(extension !== ".html" && extension !== ".xml" && extension !== ".svg") return content;
		return format(content, { parser: 'html', htmlWhitespaceSensitivity: 'ignore' });
	});
	eleventyConfig.addPlugin(eleventyImageTransformPlugin,
		{
			filenameFormat
		}
	);
}