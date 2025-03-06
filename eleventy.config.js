import slugify from "@sindresorhus/slugify";
import {eleventyImageTransformPlugin} from "@11ty/eleventy-img"
import {extname, basename, relative} from 'path';
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
	eleventyConfig.addFilter("contains", (object, value, key = "") => lens(object, key)?.includes(value) ?? false);
	eleventyConfig.addFilter("flatMap", lens);
	eleventyConfig.addPassthroughCopy("robots.txt");
	eleventyConfig.addPassthroughCopy("css/*.css");
	eleventyConfig.addShortcode("warn", (...args) => eleventyConfig.logger.warn(...args));
	eleventyConfig.addFilter("forceCapitalize", value => {
		value ??= '';
		return value.charAt(0).toUpperCase() + value.slice(1);
	});
	eleventyConfig.addFilter("gameUrl", memoize(game => {
		if(!game || typeof game.name !== "string") throw new Error("Could not generate game url for invalid game");
		return `/game/${slugify(game.name, {decamelize: false})}/`;
	}));
	eleventyConfig.addFilter("tagUrl", memoize(tag => {
		if(typeof tag !== "string") throw new Error("Could not generate tag url for invalid tag");
		return `/tag/${slugify(tag, {decamelize: false})}/`;
	}));
	eleventyConfig.addTransform("prettier", (content, output) => {
		const extension = extname(output);
		if(extension !== ".html") return content;
		return format(content, { parser: 'html', htmlWhitespaceSensitivity: 'ignore' });
	});
	eleventyConfig.addPlugin(eleventyImageTransformPlugin,
		{
			filenameFormat: (id, src, width, format, options) => {
				const relativeSrc = relative('img', src);
				const genericSrc = relativeSrc.substring(0, relativeSrc.lastIndexOf('.'));
				if(width) return `${genericSrc}-${id}-${width}.${format}`;
				return `${genericSrc}-${id}.${format}`;
			}
		}
	);
}