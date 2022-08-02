import myRequest from '../fetch/myRequest.js'

export default {
	getPersonListPage(ref){
		return myRequest({
			url: 'person/list/page',
			method: 'POST',
			data: ref
		})
	},
	getPersonListAll(ref){
		return myRequest({
			url: 'person/list/all',
			method: 'POST',
			data: ref
		})
	},
	addPerson(ref){
		return myRequest({
			url:'person/add',
			method: 'POST',
			data: ref
		})
	},
	deletePerson(ref){
		return myRequest({
			url:'person/delete',
			method: 'POST',
			data: ref
		})
	},
	modifyPerson(ref){
		return myRequest({
			url:'person/modify',
			method: 'POST',
			data: ref
		})
	}
	
}