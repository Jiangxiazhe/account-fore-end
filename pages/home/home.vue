<template>
		<uni-forms :modelValue="FormData">
			<uni-section :title="'日期：'" type="line"></uni-section>
			<uni-forms-item name="date">
				<uni-datetime-picker type="daterange" v-model="FormData.attachment.dateRange"/>
			</uni-forms-item>
			<uni-data-select
				v-model="FormData.attachment.type"
				:localdata="soc"
				@change="changesoc"
				></uni-data-select>
			<cuihai-combox v-if="FormData.attachment.type==0" label="供应商：" labelWidth="80px" emptyTips="无匹配选项" :isJSON="false"
				placeholder="请选择供应商" :candidates="suppliersNameList" @getValue="getValue"></cuihai-combox>
			<cuihai-combox v-if="FormData.attachment.type==1" label="客户：" labelWidth="80px" emptyTips="无匹配选项" :isJSON="false"
				placeholder="请选择客户" :candidates="customersNameList" @getValue="getValue"></cuihai-combox>
			<cuihai-combox label="商品：" labelWidth="80px" emptyTips="无匹配选项" :isJSON="false"
				placeholder="请选择商品" :candidates="goodsNameList" @getValue="getGoodsValue"></cuihai-combox>
		</uni-forms>
		
		<button class="submit" type="primary" size="default" @click="submit">查询</button>
	
	<view class="uni-container">
		<uni-table ref="table" :loading="loading" emptyText="暂无更多数据">
			<uni-tr>
				<uni-th width="67px" align="center">日期</uni-th>
				<uni-th width="40px" align="center">名字</uni-th>
				<uni-th width="50px" align="center">商品</uni-th>
				<uni-th width="50px" align="center">价格</uni-th>
				<uni-th width="50px" align="center">数量</uni-th>
				<uni-th width="50px" align="center">管理</uni-th>
			</uni-tr>
			<uni-tr v-for="(item, index) in tableData" :key="index">
				<uni-td align="center">{{ item.date }}</uni-td>
				<uni-td>
					<view align="center" class="name">{{ item.personName }}</view>
				</uni-td>
				<uni-td>
					<view align="center" class="name">{{ item.goodName }}</view>
				</uni-td>
				<uni-td align="center">{{ item.price }}</uni-td>
				<uni-td align="center">{{ item.quantity }}</uni-td>
				<uni-td align="center">
					<button class="uni-button" size="mini" type="warn" @click="deleteItem(index)">删除</button>
				</uni-td>
			</uni-tr>
		</uni-table>
	</view>
	<view class="uni-pagination-box"><uni-pagination show-icon :page-size="this.FormData.pageSize" :current="this.FormData.pageCurrent" :total="total" @change="change" /></view>
	<view class="statistic" style="background:cornflowerblue; padding:20rpx;">
		<text selectable="true">总价为 {{this.totalAmount}}</text>
	</view>
	<button class="submit" type="primary" size="default" @click="copyText">复制</button>
	<view style="text-align: center;">
		<text v-for="(item, index) in tableData" :key="index" selectable="true">
			{{item.goodName}}{{item.price}}×{{item.quantity}}={{item.price*item.quantity}}\n
		</text>
		<text selectable="true">总计 {{this.totalAmount}}</text>
	</view>

</template>

<script>
	import person from '../../api/person.js'
	import goods from '../../api/goods.js'
	import dealRecord from '../../api/deal-record.js'
	export default {
		data() {
			return {
				soc: [{value:0,text:"供应商"},{value:1,text:"客户"}],
				suppliersList: [],
				suppliersNameList: ["所有"],
				customersList: [],
				customersNameList: ["所有"],
				goodsList: [],
				goodsNameList: ["所有"],
				FormData:{
					personName: '',
					goodName: '',
					attachment: {
						type: 0,
						dateRange: null,
						personId: null,
						goodId: null,
					},
					// 每页数据量
					size: 10,
					searchVal: '',
					// 当前页
					current: 1,
				},
				tableData: [],
				// 数据总量
				total: 0,
				loading: false,
				totalAmount: 0,
				goodsCount: 0,
			}
		},
		onReady() {
			this.loadPerson()
			this.loadGoods()
		},
		onPullDownRefresh() {
			this.loadPerson()
			this.loadGoods()
			uni.stopPullDownRefresh()
		},
		methods: {
			fresh(){
				this.getData(this.FormData.current)
			},
			copyText(){
				let text = ""
				this.tableData.forEach(item=>{
					text=text+item.goodName+item.price+"×"+item.quantity+"="+item.price*item.quantity+"\n"
				})
				text=text+"总计 "+this.totalAmount
				
				uni.setClipboardData({
					data: text,
					success: function (res) {
						console.log('复制的信息：',text );
						uni.showToast({
							 title: '复制成功',
					});
					}
				});        
			},
			getValue(e) {
				if(e=="所有"){
					this.FormData.personName = null
					this.FormData.attachment.personId = null
				}else{
					this.FormData.personName = e
					if(this.FormData.attachment.type){
						var index = this.customersList.findIndex(item=>{
							if(item.name==e){
								return true
							}
						})
						this.FormData.attachment.personId = this.customersList[index].id
					}else{
						var index = this.suppliersList.findIndex(item=>{
								if(item.name==e){
									return true
								}
							})
						this.FormData.attachment.personId = this.suppliersList[index].id
					}
					console.log(this.FormData.personName)
				}
			},
			getGoodsValue(e) {
				if(e=="所有"){
					this.FormData.goodName=null
					this.FormData.attachment.goodId=null
				}else{
					this.FormData.goodName = e
					var index = this.goodsList.findIndex(item=>{
						if(item.name==e){
							return true
						}
					})
					this.FormData.attachment.goodId = this.goodsList[index].id
				}
			},
			loadPerson(){
				person.getPersonListAll({attachment:1}).then(res=>{
					this.customersList=["所有"]
					this.customersNameList=["所有"]
					res.forEach(item=>{
						this.customersList.push(item)
						this.customersNameList.push(item.name)
					})
				})
				person.getPersonListAll({attachment:0}).then(res=>{
					this.suppliersList=["所有"]
					this.suppliersNameList=["所有"]
					res.forEach(item=>{
						this.suppliersList.push(item)
						this.suppliersNameList.push(item.name)
					})
				})
			},
			loadGoods(){
				goods.returnGoodsListAll({}).then(res=>{
					this.goodsList=["所有"]
					this.goodsNameList=["所有"]
					res.forEach(item=>{
						this.goodsList.push(item)
						this.goodsNameList.push(item.name)
					})
				})
			},
			changesoc(e){
				this.FormData.attachment.type=e
			},
			
			submit(ref) {
				uni.showToast({
					title: `校验通过`
				})
				this.getData(1)
			},
			// 分页触发
			change(e) {
				this.getData(e.current)
			},
			// 搜索
			search() {
				this.getData(1, this.searchVal)
			},
			//删除项目
			deleteItem(e){
				let that = this
				uni.showModal({
					title: '确认是否删除',
					content: '日期: '+this.tableData[e].date+'\n名字: '+this.tableData[e].personName+'\n商品: '+this.tableData[e].goodName+'\n价格: '+this.tableData[e].price+'\n数量: '+this.tableData[e].quantity,
					success: function (res) {
						if (res.confirm) {
							console.log('用户点击确定');
							const idlist= [that.tableData[e].id]
							const data={id:idlist}
							dealRecord.deleteDealRecord(data).then(res=>
								that.getData(that.FormData.current)
							)
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				})
				
			},
			// 获取数据
			getData(pageCurrent, value = '') {
				this.loading = false
				this.FormData.current = pageCurrent
				dealRecord.returnDealRecordPage(this.FormData).then(res=>{
					this.tableData = [] 
					res.pageData.records.forEach(item=>this.tableData.push(item))
					this.total = res.total
					this.loading = false
					this.totalAmount = res.totalAmount
					this.goodsCount = res.goodsCount
					// this.fresh()
				})
			},
			// 搜索
			// 	if (value) {
			// 		data = []
			// 		this.tableData.forEach(item => {
			// 			if (item.name.indexOf(value) !== -1) {
			// 				data.push(item)
			// 			}
			// 		})
			// 		total = data.length
			// 	}
			// 	setTimeout(() => {
			// 		typeof success === 'function' &&
			// 			success({
			// 				data: data,
			// 				total: total
			// 			})
			// 	}, 500)
			// }
		}
	};
</script>

<style lang="scss">
	.ds{
		height: 50rpx;
	}
	.submit{
		margin-left: 50%;
		margin-right: 20%;
		margin-bottom: 10px;
		font-size: 20px;
	}
	.statistic{
		text-align: center;
		font-size: 25px;
		font-weight: 700;
		color: white;
	}
</style>




