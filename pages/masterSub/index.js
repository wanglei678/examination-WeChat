// index.js
// 获取应用实例
import { commonVedio } from "./config";
import { primaryVedio, juniorVedio, highVedio } from "../master/config";
const app = getApp();

Page({
  data: {
    chapterList: [],
  },
  // 事件处理函数
  bindViewTap() {
    wx.navigateTo({
      url: "../logs/logs",
    });
  },
  onLoad(option) {
    console.log(option);
    this.getDataList();
  },
  getDataList() {
    const master = wx.getStorageSync("master");
    switch (master.id) {
      case "0":
        this.setData({ chapterList: commonVedio });
        break;
      case "1":
        wx.setNavigationBarTitle({
          title: "初级实操指南",
        });
        this.setData({ chapterList: primaryVedio });
        break;
      case "2":
        wx.setNavigationBarTitle({
          title: "中级监控实操指南",
        });
        this.setData({ chapterList: juniorVedio });
        break;
      case "3":
        wx.setNavigationBarTitle({
          title: "中级维保实操指南",
        });
        this.setData({ chapterList: highVedio });
        break;
      default:
        break;
    }
  },
  handleChapterClick(e) {
    const { item = {} } = e.currentTarget.dataset;
    console.log("......e", e);
    wx.navigateTo({
      url: "/pages/master/index?id=" + item,
    });
  },
  playOtherVedio() {
    const { showFullscreenBtn = [], hidePoster = [] } = this.data;
    showFullscreenBtn[1] = true;
    hidePoster[1] = true;
    this.setData({
      hidePoster,
      showFullscreenBtn,
    });
  },
});
