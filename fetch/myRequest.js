//fetch.js 192.168.2.103
 
const BaseUrl = 'http://192.168.31.33:7011/v1/'  //设置基本的url路径
 
export default ({ //对页面穿过来的参数进行解构
	url,
	method,
	data,
	header
}) => {
	return new Promise(function(resolve, reject) {
		uni.request({
			url: BaseUrl + url,  // 开发者服务器接口地址
			method: method,   
			timeout: 60000, //请求超时时间
			dataType: "json", 
			responseType: 'text',
			data: data,  //请求的参数
			withCredentials:true,
			header: {  //设置请求的 header
				'x-token':'15315345646',//自定义请求头信息
			},
			success(res) {//对请求请求到的信息进行处理
				if (res.data.code == "0") {
					uni.showToast({
						title: `请求成功!`
					})
					resolve(res.data.data)
				}else if(res.data.code != "0"){
					uni.showToast({
						title: `出现错误，请重试!`
					})
				}
			},
			fail(err) {
				console.log("无法连接至服务器")
				reject(err.errMsg)
			}
		})
	})
}