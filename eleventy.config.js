export default async function(eleventyConfig) {
	eleventyConfig.addPassthroughCopy("robots.txt");
	eleventyConfig.addWatchTarget("**/*.{css,js}");
}