export function loadScript(url, moduleName) {
    const promise = new Promise((resolve, reject) => {
        const scriptTag = document.createElement('script');
        scriptTag.onerror = () => reject(new Error(`Failed to download js from url ${url}`));
        scriptTag.onload = resolve;
        scriptTag.async = true;
        scriptTag.src = url;
        document.getElementById('root').append(scriptTag);
    });

    return promise.then(() => {
        if(global[moduleName]) {
            return global[moduleName];
        }
        throw new Error(`Failed to load module ${moduleName} from ${url}`);
    });
}