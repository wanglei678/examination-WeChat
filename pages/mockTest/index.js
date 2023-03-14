// index.js
// 获取应用实例
import { imgDomain } from "../config/chapter";
import { getOneMockTest } from "../config/mock";
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
  onLoad(option) {
    //获取题目信息
    console.log("mock", option);
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
    this.getDenseVolume(option);
  },
  //获取一套试卷
  async getDenseVolume(option) {
    //根据等级获取 option.id  :0 密卷 1:真题 2:模拟
    const user = wx.getStorageSync("user");
    const resp = await getOneMockTest({
      grade: user.grade === "null" ? 1 : user.grade,
      type: option.id,
      mnid:option.mnid
    });
    const { data = [] } = resp;
    console.log("getDenseList", data);
    const arr = data.map((item) => {
      let { type="", options, analysis,title } = item;
      const obj = { ...item };
      analysis = analysis.replace(/\<img/g, "<img class='img_style'");
      analysis = analysis.replace(/imgpath\//g, imgDomain());
      if (options.indexOf("***") > 0) {
        obj.options = options.split("***");
      } else {
        try {
          obj.options = JSON.parse(options);
        } catch (error) {
          console.log("报错的json",options)
        }
        
      }
      if (options.indexOf("<img") > -1) {
        obj.optionType = "img";
        let option = options.replace("<img>", "").replace("</img>", "");
        option = JSON.parse(option)[0];
        obj.option = imgDomain() + option.trim()+".png";
        obj.options = ["A", "B", "C", "D"];
      }
      if (title.indexOf("<img") > -1) {
        let reg = /<img>([\s\S]*?)<\/img>/g;
        let arr = title.match(reg) || [];
        if (arr && arr.length > 0) {
          arr.map((item) => {
            const text = item.replace("<img>", "").replace("</img>", "");
            // console.log("ddddddd", text);
            if (text && text.length > 3) {
              const src = imgDomain() + text;
              const img = `<img class='img_style' src="${src}"/>`;
              obj.title = title.replace(item, img);
            }
          });
        }
      }
      if (type == "多选题") {
        obj.type = "multiple";
      } else if (type == "判断题") {
        obj.type = "judge";
      } else {
        obj.type = "select";
      }
      obj.analysis = analysis;
      return obj;
    });
    this.setData({ testData: arr });
  },
  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通关该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
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
