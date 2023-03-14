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
      { key: "simulation", label: "通关密卷" },
      { key: "real", label: "真题在线" },
      { key: "pass", label: "模拟考试" },
    ],
    operationExercise: [
      { key: "1", label: "初级实操" },
      { key: "2", label: "中级监控实操" },
      { key: "3", label: "中级维保实操" },
    ],
    grade: 0,
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
      const user = wx.getStorageSync("user");
      if (user) {
        // const { operationExercise } = this.data;
        // let grade = user.grade;
        // const arr = operationExercise.filter((item) => item.key == grade);
        // this.setData({ grade, operationExercise: arr });
      }
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
          url: "/pages/masterIndex/index",
        });
      } else {
        wx.navigateTo({
          url: "/pages/chapterIndex/index",
        });
      }
    },
    handleSelfTest(e) {
      const index = e.target.dataset.index;

      wx.setStorageSync("examType", index);
      if (index == 0) {
        wx.navigateTo({
          url: "/pages/mijuan/index",
        });
      } else if (index == 1) {
        wx.showToast({
          title: "您暂无权限!",
          icon: "none",
          duration: 2000,
        });
      } else {
        // pages/static/index
        wx.navigateTo({
          url: "/pages/static/index?id=" + index,
        });
      }
    },
    handleSelfOper(e) {
      const item = e.target.dataset.item;
      console.log(".....", item);
      const user = wx.getStorageSync("user");
      if (item.key == user.grade) {
        wx.setStorageSync("master", { id: item.key });
        wx.navigateTo({
          url: "/pages/masterSub/index",
        });
      } else {
        wx.showToast({
          title: "您暂无权限!",
          icon: "none",
          duration: 2000,
        });
      }
    },
  },
});
