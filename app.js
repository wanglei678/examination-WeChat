// app.js
App({
  onLaunch() {
    // 展示本地存储能力
    const token = wx.getStorageSync("acc");
    // 获取用户信息
    if (token) {
      wx.redirectTo({
        url: "/pages/index/index",
      });
    } else {
      wx.redirectTo({
        url: "/pages/login/index",
      });
    }
  },
  globalData: {
    userInfo: {
      type: "primary", //用户课程类别 primary 初级 junior 中级 high 高级
    },
    typeMap: {
      primary: "初级监控",
      junior: "中级监控",
      high: "中级维保",
    },
    questionType: {
      judge: "判断",
      select: "单选",
      multiple: "多选",
    },
    examType: {
      0: "模拟",
      1: "真题",
      2: "密卷",
    },
  },
});
