import process from 'process';
export default {url: process.env.SITE_URL || "http://localhost:8080", repositoryUrl: process.env.REPOSITORY_URL};