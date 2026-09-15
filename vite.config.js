import { defineConfig } from 'vite';
import { resolve } from 'node:path';
export default defineConfig({root:'site',base:'./',server:{host:'0.0.0.0',allowedHosts:['terminal.local']},build:{outDir:'../dist',emptyOutDir:true,rollupOptions:{input:{home:resolve('site/index.html'),shop:resolve('site/shop.html')}}}});
