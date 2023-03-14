// index.js
// 获取应用实例
import { getChapterList } from "../config/chapter";
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
    const user = wx.getStorageSync("user");
    const grade = user.grade == "null" ? "1" : user.grade;
    const data = [{ name: "消防设施操作员基础知识", id: "0" }];
    const obj = {
      id: grade,
    };
    // if (grade == 1) {
    //   obj.name = "初级消防设施操作员实操课";
    // }
    // if (grade == 2) {
    //   obj.name = "中级监控消防设施操作员实操课";
    // }
    // if (grade == 3) {
    //   obj.name = "中级维保消防设施操作员实操课";
    // }
    // data.push(obj);
    this.setData({ chapterList: data });
    // const req = {
    //   grade: user.grade || "1",
    // };
    // getChapterList(req).then((resp) => {
    //   console.log("...", resp);
    //   const { data = [], status } = resp;
    //   if (status == 200) {
    //     this.setData({ chapterList: data });
    //   }
    // });
  },
  handleChapterClick(e) {
    const { chapterList = [] } = this.data;
    const { item = {} } = e.currentTarget.dataset;
    console.log("......e", e);
    console.log(item);
    wx.setStorageSync("master", item)
    wx.navigateTo({
      url: "/pages/masterSub/index",
    });

    // this.setData({
    //   hidePoster,
    //   showFullscreenBtn,
    // });
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
