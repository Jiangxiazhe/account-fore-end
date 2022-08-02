"use strict";
var common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      range: [
        { value: 0, text: "\u8304\u5B50" },
        { value: 1, text: "\u756A\u8304" },
        { value: 2, text: "\u83E0\u841D" }
      ],
      dynamicFormData: {
        date: "",
        name: "",
        value: [],
        prices: [],
        amounts: []
      },
      dynamicLists: [],
      dynamicRules: {
        type: {
          rules: [{
            required: true,
            errorMessage: "\u540D\u5B57\u4E0D\u80FD\u4E3A\u7A7A"
          }, {
            format: false,
            errorMessage: "\u540D\u5B57\u683C\u5F0F\u9519\u8BEF"
          }]
        },
        name: {
          rules: [{
            required: true,
            errorMessage: "\u540D\u5B57\u4E0D\u80FD\u4E3A\u7A7A"
          }, {
            format: false,
            errorMessage: "\u540D\u5B57\u683C\u5F0F\u9519\u8BEF"
          }]
        }
      }
    };
  },
  methods: {
    add() {
      this.dynamicLists.push({
        label: "\u79CD\u7C7B",
        rules: [{
          "required": true,
          errorMessage: "\u5FC5\u586B"
        }],
        id: Date.now()
      });
    },
    del(id) {
      let index = this.dynamicLists.findIndex((v) => v.id === id);
      this.dynamicLists.splice(index, 1);
    },
    submit(ref) {
      this.$refs[ref].validate().then((res) => {
        console.log("success", res);
        common_vendor.index.showToast({
          title: `\u6821\u9A8C\u901A\u8FC7`
        });
      }).catch((err) => {
        console.log("err", err);
      });
    }
  }
};
if (!Array) {
  const _easycom_uni_section2 = common_vendor.resolveComponent("uni-section");
  const _easycom_uni_datetime_picker2 = common_vendor.resolveComponent("uni-datetime-picker");
  const _easycom_uni_forms_item2 = common_vendor.resolveComponent("uni-forms-item");
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  const _easycom_uni_data_select2 = common_vendor.resolveComponent("uni-data-select");
  const _easycom_uni_forms2 = common_vendor.resolveComponent("uni-forms");
  (_easycom_uni_section2 + _easycom_uni_datetime_picker2 + _easycom_uni_forms_item2 + _easycom_uni_easyinput2 + _easycom_uni_data_select2 + _easycom_uni_forms2)();
}
const _easycom_uni_section = () => "../../components/uni-section/uni-section.js";
const _easycom_uni_datetime_picker = () => "../../uni_modules/uni-datetime-picker/components/uni-datetime-picker/uni-datetime-picker.js";
const _easycom_uni_forms_item = () => "../../uni_modules/uni-forms/components/uni-forms-item/uni-forms-item.js";
const _easycom_uni_easyinput = () => "../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js";
const _easycom_uni_data_select = () => "../../uni_modules/uni-data-select/components/uni-data-select/uni-data-select.js";
const _easycom_uni_forms = () => "../../uni_modules/uni-forms/components/uni-forms/uni-forms.js";
if (!Math) {
  (_easycom_uni_section + _easycom_uni_datetime_picker + _easycom_uni_forms_item + _easycom_uni_easyinput + _easycom_uni_data_select + _easycom_uni_forms)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.p({
      title: "\u65E5\u671F\uFF1A" + $data.dynamicFormData.date,
      type: "line"
    }),
    b: common_vendor.o(_ctx.maskClick),
    c: common_vendor.o(($event) => $data.dynamicFormData.date = $event),
    d: common_vendor.p({
      type: "date",
      ["clear-icon"]: false,
      modelValue: $data.dynamicFormData.date
    }),
    e: common_vendor.p({
      name: "date"
    }),
    f: common_vendor.o(($event) => $data.dynamicFormData.name = $event),
    g: common_vendor.p({
      placeholder: "\u8BF7\u8F93\u5165\u59D3\u540D",
      modelValue: $data.dynamicFormData.name
    }),
    h: common_vendor.p({
      label: "\u540D\u5B57",
      required: true,
      name: "name"
    }),
    i: common_vendor.f($data.dynamicLists, (item, index, i0) => {
      return {
        a: "7e5add6e-8-" + i0 + "," + ("7e5add6e-7-" + i0),
        b: common_vendor.o(($event) => $data.dynamicFormData.value[index] = $event),
        c: common_vendor.p({
          localdata: $data.range,
          modelValue: $data.dynamicFormData.value[index]
        }),
        d: "7e5add6e-7-" + i0 + ",7e5add6e-1",
        e: "7e5add6e-10-" + i0 + "," + ("7e5add6e-9-" + i0),
        f: common_vendor.o(($event) => $data.dynamicFormData.prices[index] = $event),
        g: common_vendor.p({
          placeholder: "\u8BF7\u8F93\u5165\u5355\u4EF7",
          modelValue: $data.dynamicFormData.prices[index]
        }),
        h: "7e5add6e-9-" + i0 + ",7e5add6e-1",
        i: "7e5add6e-12-" + i0 + "," + ("7e5add6e-11-" + i0),
        j: common_vendor.o(($event) => $data.dynamicFormData.amounts[index] = $event),
        k: common_vendor.p({
          placeholder: "\u8BF7\u8F93\u5165\u6570\u91CF",
          modelValue: $data.dynamicFormData.amounts[index]
        }),
        l: "7e5add6e-11-" + i0 + ",7e5add6e-1",
        m: common_vendor.o(($event) => $options.del(item.id)),
        n: item.id,
        o: item.label + " " + index
      };
    }),
    j: common_vendor.p({
      label: "\u79CD\u7C7B"
    }),
    k: common_vendor.p({
      label: "\u5355\u4EF7"
    }),
    l: common_vendor.p({
      label: "\u6570\u91CF"
    }),
    m: common_vendor.sr("dynamicForm", "7e5add6e-1,7e5add6e-0"),
    n: common_vendor.p({
      rules: $data.dynamicRules,
      modelValue: $data.dynamicFormData
    }),
    o: common_vendor.o((...args) => $options.add && $options.add(...args)),
    p: common_vendor.o(($event) => $options.submit("dynamicForm")),
    q: common_vendor.p({
      title: "\u5BA2\u6237\u8868",
      type: "circle"
    })
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/uni_app_pro/Hellouni/pages/customers/customers.vue"]]);
wx.createPage(MiniProgramPage);
