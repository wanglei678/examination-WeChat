// index.js
// 获取应用实例
const app = getApp();

Page({
  data: {
    firstPwd: "",
    secondPwd: "",
  },
  bindFirstCode(e) {
    this.setData({
      firstPwd: e.detail.value.trim(),
    });
  },
  bindSecondCode(e) {
    this.setData({
      secondPwd: e.detail.value.trim(),
    });
  },
  onLoad(option) {
    //获取题目信息
    console.log("dsfdsfd", option);
    //根据id来查询统计数据
    const obj = {
      total: 10,
      pass: 10,
      average: 10,
      id: option.id,
    };
    this.setData({ testData: obj });
  },
  submitPwd(e) {
    const { firstPwd, secondPwd } = this.data;
    if (!firstPwd || !secondPwd) {
      return;
    }
    if (firstPwd != secondPwd) {
      wx.showToast({
        title: "两次输入不一致!",
        icon: "error",
        duration: 2000,
      });
    } else {
      wx.showToast({
        title: "请重新登录!",
        icon: "success",
        duration: 2000,
      });
    }
  },
  getUserInfo(e) {
    // 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
    console.log(e);
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true,
    });
  },
});
