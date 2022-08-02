<template>
	<uni-section title="客户表" type="circle">
		<view class="example">
			<uni-forms ref="Form" :rules="rules" :modelValue="FormData">
				<uni-section :title="'日期：' + FormData.date" type="line"></uni-section>
				<uni-forms-item class="date-select" name="date">
					<uni-datetime-picker type="date" :clear-icon="false" v-model="FormData.date"/>
				</uni-forms-item>
				
				<cuihai-combox label="客户：" labelWidth="65px" emptyTips="无匹配选项" :isJSON="false"
					placeholder="请选择客户" :candidates="customersNameList" @getValue="getCusValue"></cuihai-combox>
			
				<cuihai-combox label="商品：" labelWidth="65px" emptyTips="无匹配选项" :isJSON="false"
					placeholder="请选择商品" :candidates="goodsNameList" @getValue="getGoodsValue"></cuihai-combox>

				<uni-forms-item label="单价" required name="price" class="price">
					<uni-easyinput v-model="FormData.price" placeholder="请输入出售单价" />
				</uni-forms-item>
				<uni-forms-item label="数量" required name="quantity" class="quantity">
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
				customersNameList: [],
				customersList: [],
				goodsNameList: [],
				goodsList: [],
				FormData: {
					date: '',
					goodId: 0,
					personId: 0,
					goodName: '',
					price: 0,
					quantity: 0,
					type: 1
				},
				rules: {
					price:{
						rules: [{
							required: true,
							errorMessage: '数量不能为空'
						},
						{
							format: 'number',
							errorMessage: '数量必须为数字',
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
			}
		},
		onReady() {
			this.loadCus()
			this.loadGoods()
		},
		onPullDownRefresh() {
			this.loadCus()
			this.loadGoods()
			uni.stopPullDownRefresh()
		},
		methods: {
			loadCus(){
				person.getPersonListAll({attachment:this.FormData.type}).then(res=>{
					this.customersList=[]
					this.customersNameList=[]
					res.forEach(item=>{
						this.customersList.push(item)
						this.customersNameList.push(item.name)
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
			getCusValue(e) {
				this.FormData.personName = e
				var index = this.customersList.findIndex(item=>{
					if(item.name==e){
						return true
					}
				})
				this.FormData.personId = this.customersList[index].id
			},
			getGoodsValue(e) {
				console.log(e)
				this.FormData.goodName = e
				var index = this.goodsList.findIndex(item=>{
					if(item.name==e){
						return true
					}
				})
				this.FormData.goodId = this.goodsList[index].id
				console.log(this.FormData.goodId)
				this.FormData.price = this.goodsList[index].sellPrice
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
				})
			}
		}
	};
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
	.quantity{
		margin: 4px;
	}
</style>




