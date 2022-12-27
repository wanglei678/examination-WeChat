var app = getApp();
Component({
  options: {
    multipleSlots: false, // 在组件定义时的选项中启用多slot支持
  },
  //组件的属性列表
  properties: {},
  // 组件的初始数据
  data: {
    course: [
      { key: "expert", label: "专家精讲" },
      { key: "chapter", label: "章节练习" },
    ],
    onlineTest: [
      { key: "simulation", label: "模拟考试" },
      { key: "real", label: "真题在线" },
      { key: "pass", label: "通关密卷" },
    ],
    operationExercise: [
      { key: "primary", label: "初级实操" },
      { key: "middle", label: "中级监控实操" },
      { key: "high", label: "中级维保实操" },
    ],
    imgDomain: app.globalData.imgDomain, //图片域名
    totalDisount: "0.0",
  },
  pageLifetimes: {
    show: function () {
      // 页面被展示
      // this.getCardBanner();
      // this.getTotalDiscount();
    },
  },
  lifetimes: {
    attached() {
      // this.getCardBanner();
      // this.getTotalDiscount();
    },
  },

  //组件的方法列表
  methods: {
    //事件处理函数
    handleSelfLearn(e) {
      const index = e.target.dataset.index;
      console.log(".....", index);
      if (index == 0) {
        wx.navigateTo({
          url: "/pages/master/index",
        });
      } else {
        wx.navigateTo({
          url: "/pages/chapter/index?key=1",
        });
      }
    },
    handleSelfTest(e) {
      const index = e.target.dataset.index;
      console.log(".....", index);
      // pages/static/index
      wx.navigateTo({
        url: "/pages/static/index?id=" + index,
      });
    },
  },
});
