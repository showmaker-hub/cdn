/*=====================================================================
* FileName: autoload.js
* FileInstructions: live2d模型初始化加载文件
*=======================================================================*/

/*----------------------------------------------------------------------*/
// 注意：live2d_path 参数应使用绝对路径
// const live2d_path = "https://cdn.jsdelivr.net/gh/stevenjoezhang/live2d-widget@latest/";
// const live2d_path = "/live2d-widget/";

/* 1.在example文件夹中本地调试时用,以 / 作为根目录,以vscode为例就是自己设定的工作文件夹为根目录 */
// const live2d_path = "/hexofiles/hexo-qidaink-live2d/live2d-widget/";  /* http://127.0.0.1:5500/hexofiles/hexo-qidaink-live2d/live2d-widget/autoload.js */

/* 2.在Hexo站点source目录下作为本地引用时用,以 / 作为根目录 */
// const live2d_path = "/live2d-widget/";  

/* 3.在Hexo站点引用 CDN 链接 */
const live2d_path = "https://unpkg.com/hexo-qidaink-live2d@1.1.0/live2d-widget/";

/*----------------------------------------------------------------------*/
// 封装异步加载资源的方法
function loadExternalResource(url, type) {
	return new Promise((resolve, reject) => {
		let tag;

		if (type === "css") {
			tag = document.createElement("link");
			tag.rel = "stylesheet";
			tag.href = url;
		}
		else if (type === "js") {
			tag = document.createElement("script");
			tag.src = url;
		}
		if (tag) {
			tag.onload = () => resolve(url);
			tag.onerror = () => reject(url);
			document.head.appendChild(tag);
		}
	});
}

/*----------------------------------------------------------------------*/
// 加载 waifu.css live2d.min.js waifu-tips.js
// initWidget 第一个参数为 waifu-tips.json 的路径，第二个参数为 API 地址
// API 后端可自行搭建，参考 https://github.com/fghrsh/live2d_api
// 初始化看板娘会自动加载指定目录下的 waifu-tips.json
if (screen.width >= 768) {
	Promise.all([
		loadExternalResource(live2d_path + "waifu.css", "css"),
		loadExternalResource(live2d_path + "live2d.min.js", "js"),
		loadExternalResource(live2d_path + "waifu-tips.js", "js")
	]).then(() => {
		initWidget({
			waifuPath: live2d_path + "waifu-tips.json",
			//apiPath: "https://live2d.fghrsh.net/api/",
			// cdnPath: "https://cdn.jsdelivr.net/gh/fghrsh/live2d_api/"
			cdnPath: "https://qidaink-live2d-api.vercel.app/"
		});
	});
}
/*----------------------------------------------------------------------*/
console.log(`
	Live2d加载成功(ฅ>ω<*ฅ)!
`);
