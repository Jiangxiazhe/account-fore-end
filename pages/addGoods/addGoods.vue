<template>
	<view class="aGoods">
		<uni-forms ref="myForm" :rules="rules" :modelValue="myFormData">
			<uni-forms-item label="商品名字" required name="name" labelWidth="80px">
				<uni-easyinput v-model="myFormData.name" placeholder="请输入商品名字" />
			</uni-forms-item>
			<uni-forms-item label="单位" labelWidth="80px">
				<uni-data-select
					v-model="myFormData.unitType"
					:localdata="unit"
					></uni-data-select>
			</uni-forms-item>
			<uni-forms-item label="预期进价" labelWidth="80px">
				<uni-easyinput v-model="myFormData.buyPrice" placeholder="请输入预期进价" />
			</uni-forms-item>
			<uni-forms-item label="预期售价" labelWidth="80px">
				<uni-easyinput v-model="myFormData.sellPrice" placeholder="请输入预期售价" />
			</uni-forms-item>
		</uni-forms>
			
		<view class="button-group">
			<button class="bfresh" type="primary" size="default" @click="fresh">刷新</button>
			<button class="bsub" type="primary" size="default" @click="open('myForm')">提交</button>
			
		</view>
		<view class="uni-container">
			<uni-table ref="table" :loading="loading" emptyText="暂无更多数据">
				<uni-tr>
					<uni-th width="60px" align="center">商品名字</uni-th>
					<uni-th width="70px" align="center">进货单价</uni-th>
					<uni-th width="70px" align="center">出售单价</uni-th>
					<uni-th width="50px" align="center">单位</uni-th>
					<uni-th width="90px" align="center">管理</uni-th>
				</uni-tr>
				<uni-tr v-for="(item, index) in goodsList" :key="index">
					
					<uni-td>
						<view class="name" align="center">{{ item.name }}</view>
					</uni-td>
					<uni-td>
						<view class="name" align="center">{{ item.buyPrice }}</view>
					</uni-td>
					<uni-td>
						<view class="name" align="center">{{ item.sellPrice }}</view>
					</uni-td>
					<uni-td>
						<view class="name" align="center">{{ item.unitDesc }}</view>
					</uni-td>
					
					<uni-td align="center">
					<view class="uni-group">
						<!-- <button class="uni-button" size="mini" type="primary" @click="updateItem(index)">修改</button> -->
						<button class="uni-button" size="mini" type="warn" @click="deleteItem(index)">删除</button>
					</view>
					</uni-td>
				</uni-tr>
			</uni-table>
			<view class="uni-pagination-box"><uni-pagination show-icon :page-size="myFormData.pageSize" :current="myFormData.pageCurrent" :total="total" @change="change" /></view>
		</view>
	</view>
</template>

<script>
	import goods from '../../api/goods.js'
	export default {
		data() {
			return {
				goodsList:[],
				unit: [{value:0,text:"市斤"},{value:1,text:"公斤"},{value:2,text:"件"}],
				myFormData: {
					name: '',
					unitType: 0,
					buyPrice: 0,
					sellPrice: 0
				},
				PageForm: {
					current: 1,
					aize: 10
				},
				rules: {
					name: {
						rules: [{
							required: true,
							errorMessage: '名字不能为空'
						}]
					}
				},
				searchVal: '',
				// 数据总量
				total: 0,
				loading: false
			}
		},
		onReady() {
			this.getData(1)
		},
		onPullDownRefresh() {
			this.getData(1)
			uni.stopPullDownRefresh()
		},
		methods: {
			fresh(){
				this.getData(this.PageForm.current)
			},
			// changeUnit(){
			// },
			submit(ref) {
				this.$refs[ref].validate().then(res => {
					uni.showToast({
						title: `校验通过`
					})
				}).catch(err => {
					console.log('err', err);
				})
				goods.addGoods(this.myFormData).then(res=>{
					console.log(res)
					this.fresh()
				})
			},
			open(ref){
				let that=this
				uni.showModal({
					title: '确认是否添加',
					content: '商品名字: '+this.myFormData.name+'\n进货单价: '+this.myFormData.buyPrice+'\n出售单价: '+this.myFormData.sellPrice+'\n单位: '+this.unit[this.myFormData.unitType].text,
					success: function (res) {
						if (res.confirm) {
							console.log('用户点击确定');
							that.submit(ref);
							
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},
			// 分页触发
			change(e) {
				console.log(e.current)
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
					content: '商品: '+this.goodsList[e].name+'\n进货单价: '+this.goodsList[e].buyPrice+'\n出售单价: '+this.goodsList[e].sellPrice+'\n单位: '+this.goodsList[e].unitDesc,
					success: function (res) {
						if (res.confirm) {
							console.log('用户点击确定')
							const idlist= [that.goodsList[e].id]
							const data={id:idlist}
							goods.deleteGoods(data).then(res=>{
								that.fresh()
							})
						} else if (res.cancel) {
							console.log('用户点击取消')
						}
					}
				})
			},
			// 获取数据
			getData(pageCurrent, value = '') {
				this.loading = false
				console.log("0")
				this.PageForm.current = pageCurrent
				goods.returnGoodsListPage(this.PageForm).then(res=>{
					this.goodsList=[]
					res.records.forEach(item => this.goodsList.push(item))
					this.total=res.total
					this.loading = false
				})
			},
		}
	}
</script>

<style>
	.button-group{
		display: flex;
		margin-bottom: 10px;
	}
	.aGoods{
		margin: 5px;
	}
	.bsub{
		margin-left: 50%;
	}
	.navigator{
		background-color: aquamarine;
	}
</style>
