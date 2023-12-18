# main.ts vue引入报错
https://www.pipipi.net/22748.html
```
修改tsconfig.json 中
compilerOptions.moduleResolution="node";
tsconfig.node.json
compilerOptions.moduleResolution="node";
```
# main.ts 引入App.vue报错
添加.d.ts类型
```
// vue3 报错提示 找不到模块“./XXX.vue”或其相应的类型声明
// 报错原因：typescript 只能理解 .ts 文件，无法理解 .vue文件
declare module '*.vue' {
    import type { DefineComponent } from 'vue'
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
    const component: DefineComponent<{}, {}, any>
    export default component
}
```
# TailwindCss 安装
1.下载tailwindcss包并初始化
```cmd
pnpm install -D tailwindcss@latest postcss@latest autoprefixer@latest
pnpm tailwindcss init
```
2.添加index.css文件并在main.ts中导入
```css
--tailwindcss/index.css

@tailwind base;

@tailwind components;

@tailwind utilities;
```
```typescript
-- main.ts
import './tailwindcss/index.css'

```
3.添加tailwindcss配置文件 tailwind.config.js
```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}


```

# tailwind报错  Loading PostCSS Plugin failed: Cannot find module 'tailwindcss'
```javascript

node:internal/process/promises:289
            triggerUncaughtException(err, true /* fromPromise */);
            ^

[Failed to load PostCSS config: Failed to load PostCSS config (searchPath: D:/code/front/project_study/PPTist_study): [Error] Loading PostCSS Plugin failed: Cannot find module 'tailwindcss'
Require stack:
- D:\code\front\project_study\PPTist_study\postcss.config.js

(@D:\code\front\project_study\PPTist_study\postcss.config.js)
Error: Loading PostCSS Plugin failed: Cannot find module 'tailwindcss'
Require stack:
- D:\code\front\project_study\PPTist_study\postcss.config.js

(@D:\code\front\project_study\PPTist_study\postcss.config.js)
    at load (file:///D:/code/front/project_study/PPTist_study/node_modules/.pnpm/vite@4.4.11_@types+node@20.5.1_sass@1.69.1/node_modules/vite/dist/node/chunks/dep-2b82a1ce.js:36424:11)
    at file:///D:/code/front/project_study/PPTist_study/node_modules/.pnpm/vite@4.4.11_@types+node@20.5.1_sass@1.69.1/node_modules/vite/dist/node/chunks/dep-2b82a1ce.js:36449:16
    at Array.map (<anonymous>)
    at plugins (file:///D:/code/front/project_study/PPTist_study/node_modules/.pnpm/vite@4.4.11_@types+node@20.5.1_sass@1.69.1/node_modules/vite/dist/node/chunks/dep-2b82a1ce.js:36448:8)
    at processResult (file:///D:/code/front/project_study/PPTist_study/node_modules/.pnpm/vite@4.4.11_@types+node@20.5.1_sass@1.69.1/node_modules/vite/dist/node/chunks/dep-2b82a1ce.js:36518:14)
    at file:///D:/code/front/project_study/PPTist_study/node_modules/.pnpm/vite@4.4.11_@types+node@20.5.1_sass@1.69.1/node_modules/vite/dist/node/chunks/dep-2b82a1ce.js:36642:14]

```

```
解决方案：tailwindcss未引入package.json导致未安装tailwindcss,重新安装tailwindcss
```