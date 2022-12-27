// app.js
App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync("logs") || [];
    logs.unshift(Date.now());
    wx.setStorageSync("logs", logs);

    // 登录
    wx.login({
      success: (res) => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      },
    });
  },
  globalData: {
    userInfo: {
      type: "primary", //用户课程类别 primary 初级 middle 中级 high 高级
    },
    typeMap: {
      primary: "初级监控",
      middle: "中级监控",
      high: "中级维保",
    },
    questionType: {
      judge: "判断",
      select: "单选",
      multiple: "多选",
    },
  },
});
