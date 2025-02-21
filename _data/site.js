import process from 'process';
console.log(`Site URL: ${process.env.SITE_URL}`);
console.log(`Source URL: ${process.env.SOURCE_URL}`);
console.log(`Source Commit: ${process.env.SOURCE_COMMIT}`);

export default {url: process.env.SITE_URL, sourceUrl: process.env.SOURCE_URL, sourceCommit: process.env.SOURCE_COMMIT};