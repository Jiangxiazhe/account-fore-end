import myRequest from '../fetch/myRequest.js'

export default {
	returnGoodsListPage(ref){
		return myRequest({
			url: 'goods/list/page',
			method: 'POST',
			data: ref
		})
	},
	returnGoodsListAll(ref){
		return myRequest({
			url: 'goods/list/all',
			method: 'POST',
			data: ref
		})
	},
	addGoods(ref){
		return myRequest({
			url:'goods/add',
			method: 'POST',
			data: ref
		})
	},
	deleteGoods(ref){
		return myRequest({
			url:'goods/delete',
			method: 'POST',
			data: ref
		})
	},
	modifyGoods(ref){
		return myRequest({
			url:'goods/modify',
			method: 'POST',
			data: ref
		})
	}
	
}