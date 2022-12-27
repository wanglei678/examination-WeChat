// index.js
// 获取应用实例
const app = getApp();

Page({
  data: {
    motto: "Hello World",
    bannerImg: "",
    userInfo: {},
    hasUserInfo: false,
    testData: [], //
  },
  // 事件处理函数
  bindViewTap() {
    wx.navigateTo({
      url: "../logs/logs",
    });
  },
  onLoad() {
    //获取题目信息
    const arr = [];
    for (let index = 0; index < 10; index++) {
      const obj = {
        id: index + 1,
        title: `这道题目答案是A吗?${index}<br> <img src="/images/saved.png"></img> `,
        type: "judge",
        option: ["正确", "错误"],
        answer: "正确",
        analysis: "巴拉巴拉小魔仙巴拉巴拉小巴拉巴拉小魔仙魔仙",
      };
      if (index == 1) {
        obj.type = "select";
        obj.option = ["1111", "2222", "3333", "44444"];
        obj.answer = "1111";
      }
      if (index == 2) {
        obj.type = "multiple";
        obj.option = ["1111", "2222", "3333", "44444"];
        obj.answer = "1111";
        obj.choosedOption = [];
      }
      arr.push(obj);
    }
    this.setData({ testData: arr });
  },
  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: "展示用户信息", // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res);
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true,
        });
      },
    });
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
