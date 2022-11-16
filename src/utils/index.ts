// 获取图片
export function getIcon(name: string) {
    return new URL(`/src/assets/${name}`, import.meta.url).href;
}