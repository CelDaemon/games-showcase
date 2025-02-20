import slugify from "@sindresorhus/slugify";
function lens(object, path) {
	return path.split(".").reduce((object, key) => object && object[key] ? object[key] : null, object);
}

export default async function(eleventyConfig) {
	eleventyConfig.addFilter("contains", (object, value, key = '') => lens(object, key)?.includes(value));
	eleventyConfig.addFilter("flatMap", lens);
	eleventyConfig.addPassthroughCopy("robots.txt");
	eleventyConfig.addPassthroughCopy("css/*.css");
	eleventyConfig.addFilter("forceCapitalize", value => {
		value ??= '';
		return value.charAt(0).toUpperCase() + value.slice(1);
	});
	eleventyConfig.addFilter("gameUrl", game => {
		if(!game || typeof game.name !== "string") throw new Error("Could not generate game url for invalid game");
		return `/game/${slugify(game.name, {decamelize: false})}/`;
	});
	eleventyConfig.addFilter("tagUrl", tag => {
		if(typeof tag !== "string") throw new Error("Could not generate tag url for invalid tag");
		return `/tag/${slugify(tag, {decamelize: false})}/`;
	})
}