<template>
	<uni-section title="进货商进货表" type="circle">
		<view class="example">
			<uni-forms ref="Form" :rules="rules" :modelValue="FormData">
				<uni-section :title="'进货日期：' + FormData.date" type="line"></uni-section>
				<uni-forms-item class="date-select" name="date">
					<uni-datetime-picker type="date" :clear-icon="false" v-model="FormData.date"/>
				</uni-forms-item>
				
				<cuihai-combox label="供应商：" labelWidth="65px" emptyTips="无匹配选项" :isJSON="false"
					placeholder="请选择供应商" :candidates="suppliersNameList" @getValue="getSupValue"></cuihai-combox>
				
				<cuihai-combox label="商品：" labelWidth="65px" emptyTips="无匹配选项" :isJSON="false"
					placeholder="请选择商品" :candidates="goodsNameList" @getValue="getGoodsValue"></cuihai-combox>
					
				<uni-forms-item label="单价" required name="price" class="price">
					<uni-easyinput v-model="FormData.price" placeholder="请输入进货单价" />
				</uni-forms-item>
				<uni-forms-item label="数量" required name="quantity" class="amount">
					<uni-easyinput v-model="FormData.quantity" placeholder="请输入数量" />
				</uni-forms-item>
			</uni-forms>
			<view class="button-group">
				<button class="bSub" type="primary" size="default" @click="submit('Form')">提交</button>
			</view>
		</view>
	</uni-section>
</template>

<script>
	import person from '../../api/person.js'
	import goods from '../../api/goods.js'
	import dealRecord from '../../api/deal-record.js'
	export default {
		data() {
			return {
				suppliersList: [],
				suppliersNameList: [],
				goodsNameList: [],
				goodsList: [],
				FormData: {
					date: '',
					personName: '',
					goodId: 0,
					goodName: '',
					price: 0,
					quantity: 0,
					type: 0
				},
				rules: {
					price:{
						rules: [{
							required: true,
							errorMessage: '数量不能为空'
						},
						{
							format: 'number',
							errorMessage: '单价必须为数字',
						}]
					},
					quantity: {
						rules: [{
							required: true,
							errorMessage: '数量不能为空'
						},
						{
							format: 'number',
							errorMessage: '数量必须为数字',
						}]
					}
				}
			};
		},
		onReady() {
			this.loadSup()
			this.loadGoods()
		},
		
		onPullDownRefresh() {
			this.loadSup()
			this.loadGoods()
			uni.stopPullDownRefresh()
		},
		methods: {
			loadSup(){
				person.getPersonListAll({attachment:this.FormData.type}).then(res=>{
					this.suppliersList=[]
					this.suppliersNameList=[]
					res.forEach(item=>{
						this.suppliersList.push(item)
						this.suppliersNameList.push(item.name)
					})
				})
			},
			loadGoods(){
				goods.returnGoodsListAll({}).then(res=>{
					this.goodsList=[]
					this.goodsNameList=[]
					res.forEach(item=>{
						this.goodsList.push(item)
						this.goodsNameList.push(item.name)
					})
				})
			},
			getSupValue(e) {
				this.FormData.personName = e
				var index = this.suppliersList.findIndex(item=>{
					if(item.name==e){
						return true
					}
				})
				this.FormData.personId = this.suppliersList[index].id
			},
			getGoodsValue(e) {
				this.FormData.goodName = e
				var index = this.goodsList.findIndex(item=>{
					if(item.name==e){
						return true
					}
				})
				this.FormData.goodId = this.goodsList[index].id
				console.log(this.FormData.goodId)
				this.FormData.price = this.goodsList[index].buyPrice
			},
			submit(ref) {
				this.$refs[ref].validate().then(res => {
					console.log('success', res);
					uni.showToast({
						title: `校验通过`
					})
				}).catch(err => {
					console.log('err', err);
				})
				dealRecord.addDealRecord(this.FormData).then(res=>{
					console.log(this.FormData.personId)
					// console.log("成功")
				})
			}
		}
	}
</script>

<style lang="scss">
	.example{
		margin: 10px;
	}
	.date-select {
		background-color: #fff;
		padding: 10px;
	}
	.button-group{
		margin-top: 20px;
		border-radius: 10%;
	}
	.bSub{
		margin-left: 50%;
		margin-right: 20%;
		margin-bottom: 10px;
	}	
	.price{
		margin: 4px;
	}
	.amount{
		margin: 4px;
	}
</style>


