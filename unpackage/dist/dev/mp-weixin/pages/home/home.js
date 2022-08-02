"use strict";
var common_vendor = require("../../common/vendor.js");
var static_tableData = require("../../static/tableData.js");
const _sfc_main = {
  data() {
    return {
      soc: [{ value: 0, text: "\u4F9B\u5E94\u5546" }, { value: 1, text: "\u5BA2\u6237" }],
      supplersList: [{ value: 0, text: "\u5F20\u4E09" }, { value: 1, text: "\u674E\u56DB" }],
      customersList: [{ value: 0, text: "\u8D3E\u65AF\u4E01" }, { value: 1, text: "\u7F57\u4F2F\u7279" }],
      goodsList: [{ value: 0, text: "\u82F9\u679C" }, { value: 1, text: "\u9999\u8549" }],
      FormData: {
        date: "",
        socType: 0,
        personType: 0,
        goodsType: 0
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
    changesoc(e) {
      console.log(e);
    },
    submit(ref) {
      common_vendor.index.showToast({
        title: `\u6821\u9A8C\u901A\u8FC7`
      });
    },
    change(e) {
      this.getData(e.current);
    },
    search() {
      this.getData(1, this.searchVal);
    },
    deleteItem(e) {
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
      let total = static_tableData.tableData.length;
      let data = static_tableData.tableData.filter((item, index) => {
        const idx = index - (pageCurrent - 1) * pageSize;
        return idx < pageSize && idx >= 0;
      });
      if (value) {
        data = [];
        static_tableData.tableData.forEach((item) => {
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
  const _easycom_uni_section2 = common_vendor.resolveComponent("uni-section");
  const _easycom_uni_datetime_picker2 = common_vendor.resolveComponent("uni-datetime-picker");
  const _easycom_uni_forms_item2 = common_vendor.resolveComponent("uni-forms-item");
  const _easycom_uni_data_select2 = common_vendor.resolveComponent("uni-data-select");
  const _easycom_uni_forms2 = common_vendor.resolveComponent("uni-forms");
  const _easycom_uni_collapse_item2 = common_vendor.resolveComponent("uni-collapse-item");
  const _easycom_uni_collapse2 = common_vendor.resolveComponent("uni-collapse");
  const _easycom_uni_th2 = common_vendor.resolveComponent("uni-th");
  const _easycom_uni_tr2 = common_vendor.resolveComponent("uni-tr");
  const _easycom_uni_td2 = common_vendor.resolveComponent("uni-td");
  const _easycom_uni_table2 = common_vendor.resolveComponent("uni-table");
  const _easycom_uni_pagination2 = common_vendor.resolveComponent("uni-pagination");
  (_easycom_uni_section2 + _easycom_uni_datetime_picker2 + _easycom_uni_forms_item2 + _easycom_uni_data_select2 + _easycom_uni_forms2 + _easycom_uni_collapse_item2 + _easycom_uni_collapse2 + _easycom_uni_th2 + _easycom_uni_tr2 + _easycom_uni_td2 + _easycom_uni_table2 + _easycom_uni_pagination2)();
}
const _easycom_uni_section = () => "../../components/uni-section/uni-section.js";
const _easycom_uni_datetime_picker = () => "../../uni_modules/uni-datetime-picker/components/uni-datetime-picker/uni-datetime-picker.js";
const _easycom_uni_forms_item = () => "../../uni_modules/uni-forms/components/uni-forms-item/uni-forms-item.js";
const _easycom_uni_data_select = () => "../../uni_modules/uni-data-select/components/uni-data-select/uni-data-select.js";
const _easycom_uni_forms = () => "../../uni_modules/uni-forms/components/uni-forms/uni-forms.js";
const _easycom_uni_collapse_item = () => "../../uni_modules/uni-collapse/components/uni-collapse-item/uni-collapse-item.js";
const _easycom_uni_collapse = () => "../../uni_modules/uni-collapse/components/uni-collapse/uni-collapse.js";
const _easycom_uni_th = () => "../../uni_modules/uni-table/components/uni-th/uni-th.js";
const _easycom_uni_tr = () => "../../uni_modules/uni-table/components/uni-tr/uni-tr.js";
const _easycom_uni_td = () => "../../uni_modules/uni-table/components/uni-td/uni-td.js";
const _easycom_uni_table = () => "../../uni_modules/uni-table/components/uni-table/uni-table.js";
const _easycom_uni_pagination = () => "../../uni_modules/uni-pagination/components/uni-pagination/uni-pagination.js";
if (!Math) {
  (_easycom_uni_section + _easycom_uni_datetime_picker + _easycom_uni_forms_item + _easycom_uni_data_select + _easycom_uni_forms + _easycom_uni_collapse_item + _easycom_uni_collapse + _easycom_uni_th + _easycom_uni_tr + _easycom_uni_td + _easycom_uni_table + _easycom_uni_pagination)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.p({
      title: "\u65E5\u671F\uFF1A" + $data.FormData.date,
      type: "line"
    }),
    b: common_vendor.o(_ctx.maskClick),
    c: common_vendor.o(($event) => $data.FormData.date = $event),
    d: common_vendor.p({
      type: "date",
      ["clear-icon"]: false,
      modelValue: $data.FormData.date
    }),
    e: common_vendor.p({
      name: "date"
    }),
    f: common_vendor.o($options.changesoc),
    g: common_vendor.o(($event) => $data.FormData.socType = $event),
    h: common_vendor.p({
      localdata: $data.soc,
      modelValue: $data.FormData.socType
    }),
    i: $data.FormData.socType == 0
  }, $data.FormData.socType == 0 ? {
    j: common_vendor.o(($event) => $data.FormData.personType = $event),
    k: common_vendor.p({
      localdata: $data.supplersList,
      modelValue: $data.FormData.personType
    })
  } : {}, {
    l: $data.FormData.socType == 1
  }, $data.FormData.socType == 1 ? {
    m: common_vendor.o(($event) => $data.FormData.personType = $event),
    n: common_vendor.p({
      localdata: $data.customersList,
      modelValue: $data.FormData.personType
    })
  } : {}, {
    o: common_vendor.o(($event) => $data.FormData.goodsType = $event),
    p: common_vendor.p({
      localdata: $data.goodsList,
      modelValue: $data.FormData.goodsType
    }),
    q: common_vendor.p({
      modelValue: _ctx.formData
    }),
    r: common_vendor.o((...args) => $options.submit && $options.submit(...args)),
    s: common_vendor.p({
      title: "\u67E5\u8BE2\u6761\u4EF6",
      ["show-animation"]: true
    }),
    t: common_vendor.p({
      width: "60px",
      align: "center"
    }),
    v: common_vendor.p({
      width: "40px",
      align: "center"
    }),
    w: common_vendor.p({
      width: "50px",
      align: "center"
    }),
    x: common_vendor.p({
      width: "40px",
      align: "center"
    }),
    y: common_vendor.p({
      width: "40px",
      align: "center"
    }),
    z: common_vendor.f($data.tableData, (item, index, i0) => {
      return {
        a: common_vendor.t(item.date),
        b: "4b8eb086-18-" + i0 + "," + ("4b8eb086-17-" + i0),
        c: common_vendor.t(item.goods),
        d: "4b8eb086-19-" + i0 + "," + ("4b8eb086-17-" + i0),
        e: common_vendor.t(item.price),
        f: "4b8eb086-20-" + i0 + "," + ("4b8eb086-17-" + i0),
        g: common_vendor.t(item.amount),
        h: "4b8eb086-21-" + i0 + "," + ("4b8eb086-17-" + i0),
        i: "4b8eb086-22-" + i0 + "," + ("4b8eb086-17-" + i0),
        j: index,
        k: "4b8eb086-17-" + i0 + ",4b8eb086-10"
      };
    }),
    A: common_vendor.p({
      align: "center"
    }),
    B: common_vendor.p({
      align: "center"
    }),
    C: common_vendor.p({
      align: "center"
    }),
    D: common_vendor.o(($event) => $options.deleteItem(_ctx.e)),
    E: common_vendor.p({
      align: "center"
    }),
    F: common_vendor.sr("table", "4b8eb086-10"),
    G: common_vendor.p({
      loading: $data.loading,
      emptyText: "\u6682\u65E0\u66F4\u591A\u6570\u636E"
    }),
    H: common_vendor.o($options.change),
    I: common_vendor.p({
      ["show-icon"]: true,
      ["page-size"]: $data.pageSize,
      current: $data.pageCurrent,
      total: $data.total
    })
  });
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/uni_app_pro/Hellouni/pages/home/home.vue"]]);
wx.createPage(MiniProgramPage);
