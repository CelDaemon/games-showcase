export default async function(eleventyConfig) {
	eleventyConfig.addPassthroughCopy("robots.txt");
	eleventyConfig.addPassthroughCopy("**/*.svg");
	eleventyConfig.addWatchTarget("**/*.{css,js,svg}");
	eleventyConfig.addFilter("forceCapitalize", value => {
		value ??= '';
		return value.charAt(0).toUpperCase() + value.slice(1)
	})
}