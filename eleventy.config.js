export default async function(eleventyConfig) {
	eleventyConfig.addPassthroughCopy("robots.txt");
	eleventyConfig.addWatchTarget("**/*.{css,js}");
	eleventyConfig.addFilter("forceCapitalize", value => {
		value ??= '';
		return value.charAt(0).toUpperCase() + value.slice(1)
	})
}