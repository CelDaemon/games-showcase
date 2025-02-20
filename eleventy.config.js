function test() {

}

export default async function(eleventyConfig) {
	const lens = (object, path) => path.split(".").reduce((o, key) => o && o[key] ? o[key] : null, object);
	eleventyConfig.addFilter("contains", (object, value, key = '') => lens(object, key)?.includes(value));
	eleventyConfig.addFilter("flatMap", (object, key) => lens(object, key));
	eleventyConfig.addPassthroughCopy("robots.txt");
	eleventyConfig.addPassthroughCopy("img/*.svg");
	eleventyConfig.addWatchTarget("**/*.{css,js,svg}");
	eleventyConfig.addFilter("forceCapitalize", value => {
		value ??= '';
		return value.charAt(0).toUpperCase() + value.slice(1)
	});
}