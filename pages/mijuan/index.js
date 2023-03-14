// index.js
// 获取应用实例
import { simulationList } from "../config/chapter";
const app = getApp();

Page({
  data: {
    datalist: [],
  },
  // 事件处理函数
  bindViewTap() {
    wx.navigateTo({
      url: "../logs/logs",
    });
  },
  onLoad(option) {
    //获取题目信息

    this.getRecord(option);
  },
  getRecord(res) {
    const user = wx.getStorageSync("user");
    let req = {
      grade: user.grade,
    };
    simulationList(req).then((resp) => {
      console.log("ddddddd", resp);
      const { data = [], status } = resp;
      if (status == 200) {
        this.setData({ datalist: data });
      }
    });
  },
  goToTest(e){
    console.log("ssssss",e)
    const item=e.currentTarget.dataset.value
    wx.navigateTo({
      url: "/pages/mockTest/index?id=0&mnid="+item.id,
    });
  }
});
