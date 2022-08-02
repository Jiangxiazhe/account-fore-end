<template>
	<uni-collapse>
		<navigator url="/pages/addGoods/addGoods" hover-class="navigator-hover">
						<button type="default">添加商品列表</button>
					</navigator>
		<uni-collapse-item title="添加供应商/客户" :show-animation="true">
		<view class="example">
			<uni-forms ref="myForm" :rules="rules" :modelValue="myFormData">
				<uni-forms-item label="类型">
					<uni-data-select v-model="myFormData.type" :localdata="range"></uni-data-select>
				</uni-forms-item>
				<uni-forms-item label="名字" required name="name" labelWidth="50px">
					<uni-easyinput v-model="myFormData.name" placeholder="请输入姓名" />
				</uni-forms-item>
				<uni-forms-item label="联系方式" labelWidth="70px">
					<uni-easyinput v-model="myFormData.contact" placeholder="请输入手机号码" />
				</uni-forms-item>
				<uni-forms-item label="居住地址" labelWidth="70px">
					<uni-easyinput v-model="myFormData.address" placeholder="请输入居住地址" />
				</uni-forms-item>
			</uni-forms>
				<button class="bchange" type="primary" size="default" @click="open('myForm')">提交</button>
		</view>
	</uni-collapse-item>
	</uni-collapse>
	<button class="bsub" type="primary" size="mini" @click="changesoc">切换</button>
	<view class="uni-container">
		<uni-table ref="table" :loading="loading" emptyText="暂无更多数据">
			<uni-tr>
				<uni-th width="70px" align="center">类型</uni-th>
				<uni-th width="70px" align="center">姓名</uni-th>
				<uni-th width="80px" align="center">联系方式</uni-th>
				<uni-th width="80px" align="center">居住地址</uni-th>
				<uni-th width="90px" align="center">管理</uni-th>
			</uni-tr>
			<uni-tr v-for="(item, index) in tableData" :key="index">
				<uni-td  align="center">{{ range[PageForm.attachment].text }}</uni-td>
				<uni-td>
					<view class="name" align="center">{{ item.name }}</view>
				</uni-td>
				<uni-td align="center">{{ item.contact }}</uni-td>
				<uni-td align="center">{{ item.address }}</uni-td>
				<uni-td align="center">
				<view class="uni-group">
					<!-- <button class="uni-button" size="mini" type="primary" @click="updateItem(index)">修改</button> -->
					<button class="uni-button" size="mini" type="warn" @click="deleteItem(index)">删除</button>
				</view>
				</uni-td>
			</uni-tr>
		</uni-table>
	<view class="uni-pagination-box">
		<uni-pagination show-icon :page-size="PageForm.pageSize" :current="PageForm.pageCurrent" :total="total" @change="change" />
	</view>
	</view>
</template>

<script>
	import person from '../../api/person.js'
	export default {
		data(){
			return {
				range: [{value:0,text:"供应商"},{value:1,text:"客户"}],
				myFormData: {
					name: '',
					contact: '',
					type: 0,
					address: '',
				},
				PageForm: {
					attachment: 0,
					// 每页数据量
					size: 10,
					// 当前页
					current: 1,
				},
				rules: {
					name: {
						rules: [{
							required: true,
							errorMessage: '名字不能为空'
						}]
					}
				},
				tableData:[],
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
			changesoc(){
				if(this.PageForm.attachment==0){
					this.PageForm.attachment=1
				}else{
					this.PageForm.attachment=0
				}
				this.getData(1)
			},
			addPerson(ref) {
				this.$refs[ref].validate().then(res => {
					uni.showToast({
						title: `校验通过`
					})
				}).catch(err => {
					console.log('err', err);
				})
				person.addPerson(this.myFormData).then(res=>{
					console.log(res)
				})
			},
			open(ref){
				let that=this
				uni.showModal({
					title: '确认是否添加',
					content: '类别:'+this.range[this.myFormData.type].text+'\n名字:'+this.myFormData.name+'\n联系方式:'+this.myFormData.contact+'\n居住地址:'+this.myFormData.address,
					success: function (res) {
						if (res.confirm) {
							console.log('用户点击确定');
							that.addPerson(ref);
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				})
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
			//修改项目
			updateItem(e){
				console.log(e)
			},
			//删除项目
			deleteItem(e){
				let that = this
				uni.showModal({
					title: '确认是否删除',
					content: '类别: '+this.range[this.tableData[e].type].text+'\n名字: '+this.tableData[e].name+'\n联系方式: '+this.tableData[e].contact+'\n居住地址: '+this.tableData[e].address,
					success: function (res) {
						if (res.confirm) {
							console.log('用户点击确定');
							const idlist= [that.tableData[e].id]
							const data={id:idlist}
							person.deletePerson(data).then(res=>
								that.getData(that.PageForm.current)
							)
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				})
			},
			getData(pageCurrent, value = '') {
				this.loading = false
				this.PageForm.current = pageCurrent
				person.getPersonListPage(this.PageForm).then(res=>{
					console.log(res)
					this.tableData=[]
					res.records.forEach(item => this.tableData.push(item))
					this.total=res.total
					this.loading = false
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
	}
</script>

<style>
	.uni-data-select{
		margin: 5px;
	}
	.uni-forms-item{
		margin: 10px;
	}
	.bsub{
		margin-top: 10px;
		margin-left: 10%;
	}
	.bchange{
		margin-left: 50%;
		margin-right: 20%;
		margin-bottom: 10px;
	}
</style>
