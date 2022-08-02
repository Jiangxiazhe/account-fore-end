"use strict";
var common_vendor = require("../../common/vendor.js");
var static_personData = require("../../static/personData.js");
const _sfc_main = {
  data() {
    return {
      range: [{ value: 0, text: "\u4F9B\u5E94\u5546" }, { value: 1, text: "\u5BA2\u6237" }],
      myFormData: {
        type: 0,
        name: "",
        contact: "",
        address: ""
      },
      rules: {
        name: {
          rules: [{
            required: true,
            errorMessage: "\u540D\u5B57\u4E0D\u80FD\u4E3A\u7A7A"
          }]
        }
      },
      tableData: [],
      searchVal: "",
      pageSize: 10,
      pageCurrent: 1,
      total: 14,
      loading: false
    };
  },
  onLoad() {
    this.getData(1);
  },
  methods: {
    submit(ref) {
      this.$refs[ref].validate().then((res) => {
        console.log("success", res);
        common_vendor.index.showToast({
          title: `\u6821\u9A8C\u901A\u8FC7`
        });
      }).catch((err) => {
        console.log("err", err);
      }), console.log(this.myFormData.type);
    },
    open(ref) {
      let that = this;
      common_vendor.index.showModal({
        title: "\u786E\u8BA4\u662F\u5426\u6DFB\u52A0",
        content: "\u7C7B\u522B:" + this.range[this.myFormData.type].text + "\n\u540D\u5B57:" + this.myFormData.name + "\n\u8054\u7CFB\u65B9\u5F0F:" + this.myFormData.contact + "\n\u5C45\u4F4F\u5730\u5740:" + this.myFormData.address,
        success: function(res) {
          if (res.confirm) {
            console.log("\u7528\u6237\u70B9\u51FB\u786E\u5B9A");
            that.submit(ref);
          } else if (res.cancel) {
            console.log("\u7528\u6237\u70B9\u51FB\u53D6\u6D88");
          }
        }
      });
    },
    change(e) {
      console.log(e.current);
      this.getData(e.current);
    },
    search() {
      this.getData(1, this.searchVal);
    },
    updateItem() {
    },
    deleteItem(e) {
      console.log(e.detail.index);
    },
    getData(pageCurrent, value = "") {
      this.loading = true;
      this.pageCurrent = pageCurrent;
      this.request({
        pageSize: this.pageSize,
        pageCurrent,
        value,
        success: (res) => {
          this.tableData = res.data;
          this.total = res.total;
          this.loading = false;
        }
      });
    },
    request(options) {
      const { pageSize, pageCurrent, success, value } = options;
      let total = static_personData.tableData.length;
      let data = static_personData.tableData.filter((item, index) => {
        const idx = index - (pageCurrent - 1) * pageSize;
        return idx < pageSize && idx >= 0;
      });
      if (value) {
        data = [];
        static_personData.tableData.forEach((item) => {
          if (item.name.indexOf(value) !== -1) {
            data.push(item);
          }
        });
        total = data.length;
      }
      setTimeout(() => {
        typeof success === "function" && success({
          data,
          total
        });
      }, 500);
    }
  }
};
if (!Array) {
  const _easycom_uni_data_select2 = common_vendor.resolveComponent("uni-data-select");
  const _easycom_uni_forms_item2 = common_vendor.resolveComponent("uni-forms-item");
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  const _easycom_uni_forms2 = common_vendor.resolveComponent("uni-forms");
  const _easycom_uni_collapse_item2 = common_vendor.resolveComponent("uni-collapse-item");
  const _easycom_uni_collapse2 = common_vendor.resolveComponent("uni-collapse");
  const _easycom_uni_th2 = common_vendor.resolveComponent("uni-th");
  const _easycom_uni_tr2 = common_vendor.resolveComponent("uni-tr");
  const _easycom_uni_td2 = common_vendor.resolveComponent("uni-td");
  const _easycom_uni_table2 = common_vendor.resolveComponent("uni-table");
  const _easycom_uni_pagination2 = common_vendor.resolveComponent("uni-pagination");
  (_easycom_uni_data_select2 + _easycom_uni_forms_item2 + _easycom_uni_easyinput2 + _easycom_uni_forms2 + _easycom_uni_collapse_item2 + _easycom_uni_collapse2 + _easycom_uni_th2 + _easycom_uni_tr2 + _easycom_uni_td2 + _easycom_uni_table2 + _easycom_uni_pagination2)();
}
const _easycom_uni_data_select = () => "../../uni_modules/uni-data-select/components/uni-data-select/uni-data-select.js";
const _easycom_uni_forms_item = () => "../../uni_modules/uni-forms/components/uni-forms-item/uni-forms-item.js";
const _easycom_uni_easyinput = () => "../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js";
const _easycom_uni_forms = () => "../../uni_modules/uni-forms/components/uni-forms/uni-forms.js";
const _easycom_uni_collapse_item = () => "../../uni_modules/uni-collapse/components/uni-collapse-item/uni-collapse-item.js";
const _easycom_uni_collapse = () => "../../uni_modules/uni-collapse/components/uni-collapse/uni-collapse.js";
const _easycom_uni_th = () => "../../uni_modules/uni-table/components/uni-th/uni-th.js";
const _easycom_uni_tr = () => "../../uni_modules/uni-table/components/uni-tr/uni-tr.js";
const _easycom_uni_td = () => "../../uni_modules/uni-table/components/uni-td/uni-td.js";
const _easycom_uni_table = () => "../../uni_modules/uni-table/components/uni-table/uni-table.js";
const _easycom_uni_pagination = () => "../../uni_modules/uni-pagination/components/uni-pagination/uni-pagination.js";
if (!Math) {
  (_easycom_uni_data_select + _easycom_uni_forms_item + _easycom_uni_easyinput + _easycom_uni_forms + _easycom_uni_collapse_item + _easycom_uni_collapse + _easycom_uni_th + _easycom_uni_tr + _easycom_uni_td + _easycom_uni_table + _easycom_uni_pagination)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o(($event) => $data.myFormData.type = $event),
    b: common_vendor.p({
      localdata: $data.range,
      modelValue: $data.myFormData.type
    }),
    c: common_vendor.p({
      label: "\u7C7B\u578B"
    }),
    d: common_vendor.o(($event) => $data.myFormData.name = $event),
    e: common_vendor.p({
      placeholder: "\u8BF7\u8F93\u5165\u59D3\u540D",
      modelValue: $data.myFormData.name
    }),
    f: common_vendor.p({
      label: "\u540D\u5B57",
      required: true,
      name: "name",
      labelWidth: "50px"
    }),
    g: common_vendor.o(($event) => $data.myFormData.contact = $event),
    h: common_vendor.p({
      placeholder: "\u8BF7\u8F93\u5165\u624B\u673A\u53F7\u7801",
      modelValue: $data.myFormData.contact
    }),
    i: common_vendor.p({
      label: "\u8054\u7CFB\u65B9\u5F0F",
      labelWidth: "70px"
    }),
    j: common_vendor.o(($event) => $data.myFormData.address = $event),
    k: common_vendor.p({
      placeholder: "\u8BF7\u8F93\u5165\u5C45\u4F4F\u5730\u5740",
      modelValue: $data.myFormData.address
    }),
    l: common_vendor.p({
      label: "\u5C45\u4F4F\u5730\u5740",
      labelWidth: "70px"
    }),
    m: common_vendor.sr("myForm", "5ea13dfd-2,5ea13dfd-1"),
    n: common_vendor.p({
      rules: $data.rules,
      modelValue: $data.myFormData
    }),
    o: common_vendor.o(($event) => $options.open("myForm")),
    p: common_vendor.p({
      title: "\u6DFB\u52A0\u4F9B\u5E94\u5546/\u5BA2\u6237",
      ["show-animation"]: true
    }),
    q: common_vendor.p({
      width: "70px",
      align: "center"
    }),
    r: common_vendor.p({
      width: "70px",
      align: "center"
    }),
    s: common_vendor.p({
      width: "80px",
      align: "center"
    }),
    t: common_vendor.p({
      width: "80px",
      align: "center"
    }),
    v: common_vendor.p({
      width: "90px",
      align: "center"
    }),
    w: common_vendor.f($data.tableData, (item, index, i0) => {
      return {
        a: common_vendor.t($data.range[item.type].text),
        b: "5ea13dfd-19-" + i0 + "," + ("5ea13dfd-18-" + i0),
        c: common_vendor.t(item.name),
        d: "5ea13dfd-20-" + i0 + "," + ("5ea13dfd-18-" + i0),
        e: common_vendor.t(item.contact),
        f: "5ea13dfd-21-" + i0 + "," + ("5ea13dfd-18-" + i0),
        g: common_vendor.t(item.address),
        h: "5ea13dfd-22-" + i0 + "," + ("5ea13dfd-18-" + i0),
        i: "5ea13dfd-23-" + i0 + "," + ("5ea13dfd-18-" + i0),
        j: index,
        k: "5ea13dfd-18-" + i0 + ",5ea13dfd-11"
      };
    }),
    x: common_vendor.p({
      align: "center"
    }),
    y: common_vendor.p({
      align: "center"
    }),
    z: common_vendor.p({
      align: "center"
    }),
    A: common_vendor.o((...args) => $options.updateItem && $options.updateItem(...args)),
    B: common_vendor.o((...args) => $options.deleteItem && $options.deleteItem(...args)),
    C: common_vendor.p({
      align: "center"
    }),
    D: common_vendor.sr("table", "5ea13dfd-11"),
    E: common_vendor.p({
      loading: $data.loading,
      emptyText: "\u6682\u65E0\u66F4\u591A\u6570\u636E"
    }),
    F: common_vendor.o($options.change),
    G: common_vendor.p({
      ["show-icon"]: true,
      ["page-size"]: $data.pageSize,
      current: $data.pageCurrent,
      total: $data.total
    })
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/uni_app_pro/Hellouni/pages/manage/manage.vue"]]);
wx.createPage(MiniProgramPage);
