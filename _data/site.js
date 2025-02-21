import process from 'process';
console.log(`Site URL: ${process.env.SITE_URL}`);
export default {url: process.env.SITE_URL};