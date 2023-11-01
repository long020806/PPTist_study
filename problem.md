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