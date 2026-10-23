import { cp, mkdir } from 'node:fs/promises';
await mkdir('dist', { recursive: true });
for (const name of ['index.html','styles.css','football.css','opening.css','journal.css','app.js','opening.js','blog','about','robots.txt','sitemap.xml']) await cp(name, `dist/${name}`, { recursive: true });
await mkdir('dist/assets', { recursive: true });
for (const name of ['korea-team-poster.webp','kick-opening-audio.mp4','kick-poster.jpg','yarangi-guide.webp','yarangi-players.webp','yarangi-cheer.webp']) await cp(`assets/${name}`, `dist/assets/${name}`);
console.log('Static site prepared in dist/');
