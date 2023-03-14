// index.js
// 获取应用实例
import { getTestRecord } from "../config/mock";
const app = getApp();

Page({
  data: {
    motto: "Hello World",
    bannerImg: "",
    userInfo: {},
    hasUserInfo: false,
    testData: {}, //
  },
  // 事件处理函数
  bindViewTap() {
    wx.navigateTo({
      url: "../logs/logs",
    });
  },
  onLoad(option) {
    //获取题目信息
    console.log("dsfdsfd", option);
    switch (option.id) {
      case "0":
        wx.setNavigationBarTitle({
          title: "通关密卷",
        });
        break;
      case "1":
        wx.setNavigationBarTitle({
          title: "真题在线",
        });
        break;
      case "2":
        wx.setNavigationBarTitle({
          title: "模拟考试",
        });
        break;
      default:
        break;
    }

    this.getRecord(option);
  },
  getRecord(res) {
    const user = wx.getStorageSync("user");
    const examType = wx.getStorageSync("examType");
    console.log("user", user);
    const id = res.id;
    if (id == 2) {
      const obj={}
      if (user.grade==1) {
        obj.title="(消防设施操作员)初级技能全真模拟试题"
      }else{
        obj.title="(消防设施操作员)中级技能全真模拟试题"
      }
      this.setData({ testData: obj });
    } else {
      const req = {
        userId: user.id + "",
        grade: user.grade + "",
        examType: examType + "",
      };
      getTestRecord(req).then((resp) => {
        console.log("dsfdsfd", resp);
        const { data = [], status } = resp;
        const obj = {
          total: 0,
          pass: 0,
          average: 0,
          id: res.id,
        };
        if (!data || data.length == 0) {
          this.setData({ testData: obj });
        } else {
          //求平均值
          const pass = data.filter((item) => item.score > 60) || [];
          obj.total = data.length;
          obj.pass = pass.length;
          let average = 0,
            sum = 0;
          data.map((item) => (sum += parseFloat(item.score)));
          average = sum / data.length;
          obj.average = average.toFixed(1);
          this.setData({ testData: obj });
        }
      });
    }
  },
});
