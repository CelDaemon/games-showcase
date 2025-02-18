import EleventyVite from "@11ty/eleventy-plugin-vite";


export default function(config) {
    config.addPlugin(EleventyVite);
    config.addPassthroughCopy("**/*.css")
}