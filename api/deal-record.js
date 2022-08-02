import myRequest from '../fetch/myRequest.js'

export default {
	returnDealRecordPage(ref){
		return myRequest({
			url: 'statistic/list/page',
			method: 'POST',
			data: ref
		})
	},
	returnDealRecordAll(ref){
		return myRequest({
			url: 'deal-record/list/all',
			method: 'POST',
			data: ref
		})
	},
	addDealRecord(ref){
		return myRequest({
			url:'deal-record/add',
			method: 'POST',
			data: ref
		})
	},
	deleteDealRecord(ref){
		return myRequest({
			url:'deal-record/delete',
			method: 'POST',
			data: ref
		})
	},
	modifyDealRecord(ref){
		return myRequest({
			url:'deal-record/modify',
			method: 'POST',
			data: ref
		})
	}
	
}