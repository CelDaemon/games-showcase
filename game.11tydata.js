import Image from "@11ty/eleventy-img"
import {join, relative} from 'path';

export default function(env) {
    return ({
        eleventyComputed: {
            image: async (data) => {
                if(!data.game.images) return;
                const src = Object.keys(data.game.images)[0];
                if(src === undefined) return;
                return await Image(join(env.eleventy.directories.input, 'img', src), {
                    transformOnRequest: process.env.ELEVENTY_RUN_MODE === "serve",
                    formats: ['png'],
                    widths: [1920],
                    failOnError: true,
                    outputDir: join(env.eleventy.directories.output, 'img'),
                    urlPath: "/img/",
                    filenameFormat: (id, src, width, format, options) => {
                        const relativeSrc = relative('img', src);
                        const genericSrc = relativeSrc.substring(0, relativeSrc.lastIndexOf('.'));
                        if(width) return `${genericSrc}-${id}-${width}.${format}`;
                        return `${genericSrc}-${id}.${format}`;
                    }
                });
                
            }
        }
    })
}