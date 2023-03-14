// index.js
// 获取应用实例
import { getChapterTest, getBaseTest, imgDomain } from "../config/chapter";
const app = getApp();
// const optionMap=["A","B","C","D","E","F"]
Page({
  data: {
    problemList: [],
    typeMap: app.globalData.questionType,
    currentIndex: 0, //从后台获取
    current: {},
    orderMap: {
      0: "A",
      1: "B",
      2: "C",
      3: "D",
      4: "E",
      5: "F",
    },
    showFooter: false,
    showCollectionIcon: false,
    collections: [], //收藏列表
    errorList: [], //错题
    completeList: [], //做过的题目
    optionMap: ["A", "B", "C", "D", "E", "F"],
  },
  // 事件处理函数
  bindViewTap() {
    wx.navigateTo({
      url: "../logs/logs",
    });
  },
  onLoad(option) {
    console.log("章节test", imgDomain());
    //查询该章节的状态 将是否做过 如果做过了 选择的答案 choosedOption 填充到problemList里
    if (option) {
      this.getDataList(option);
    }
  },
  //根据id查询题目
  async getDataList(option) {
    const item = wx.getStorageSync("grade");
    let resp = {};
    const req = { zjid: option.id };
    if (item.id == 0) {
      resp = await getBaseTest(req);
    } else {
      resp = await getChapterTest(req);
    }
    const { data = [], status } = resp;
    if (status == 200) {
      const arr = data.map((item) => {
        let { type, options, analysis,title } = item;
        const obj = { ...item };
        analysis = analysis.replace(/\<img/g, "<img class='img_style'");
        analysis = analysis.replace(/imgpath\//g, imgDomain());
        if (options.indexOf("***") > 0) {
          obj.options = options.split("***");
        } else {
          try {
            obj.options = JSON.parse(options);
          } catch (error) {
            
          }
          
        }
        if (options.indexOf("<img") > -1) {
          obj.optionType = "img";
          let option = options.replace("<img>", "").replace("</img>", "");
          option = JSON.parse(option)[0];
          obj.option = imgDomain() + option.trim() + ".png";
          obj.options=["A",'B',"C","D"]
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
      console.log("getDataList", arr);
      this.setData({
        problemList: arr,
        current: arr[this.data.currentIndex],
      });
    }
  },
  scrollToTop() {
    this.setAction({
      scrollTop: 0,
    });
  },
  /**
   * 已选出答案
   * 1.将题目加入到已做完列表
   * 2.如果做错 加入到错题列表
   */
  handleChoose(e) {
    const {
      current = {},
      completeList = [],
      errorList = [],
      problemList = [],
      currentIndex,
      optionMap,
    } = this.data;
    if (["error", "right"].includes(current.status)) {
      return;
    }
    const { value } = e.currentTarget.dataset;
    current.choosedOption = value;
    // current.status = "complete";current.choosedOption===index
    console.log(
      "handleChoose",
      optionMap[current.choosedOption] === current.answer
    );
    console.log("handleChoose2222", current.choosedOption === value);

    completeList.push(current.id);
    if (current.answer !== optionMap[value]) {
      errorList.push(current.id);
      current.status = "error";
    } else {
      current.status = "right";
    }
    problemList[currentIndex] = { ...current };
    console.log("......e", errorList.indexOf(current.id));
    console.log("......problemList", problemList);
    this.setData({
      completeList,
      errorList,
      problemList,
      current,
    });
  },
  //多选
  handleMultipleChoose(e) {
    const {
      current = {},
      completeList = [],
      errorList = [],
      problemList = [],
      currentIndex,
    } = this.data;
    if (["error", "right"].includes(current.status)) {
      return;
    }
    const { value } = e.currentTarget.dataset;
    console.log("choosedOption", current.choosedOption);
    if (!current.choosedOption) {
      current.choosedOption = [];
    }
    if (current.choosedOption.includes(value)) {
      current.choosedOption = current.choosedOption.filter(
        (item) => item != value
      );
      current["active" + value] = 100;
    } else {
      current.choosedOption.push(value);
      current["active" + value] = value;
    }
    current.active = current.choosedOption.join("");

    const obj = { ...current };
    console.log(value);
    completeList.push(current.id);
    // if (current.answer !== value) {
    //   errorList.push(current.id);
    //   obj.status = "error";
    // } else {
    //   obj.status = "right";
    // }
    problemList[currentIndex] = obj;
    console.log("......e", errorList.indexOf(current.id));
    console.log("......problemList", current);
    this.setData({
      current,
    });
  },
  /**
   * 收藏当前这一题
   */
  collectThisProblem() {
    const { collections = [], current = {}, showCollectionIcon } = this.data;

    collections.push(current.id);
    console.log(collections, collections.includes(current.id));
    this.setData({
      collections: collections,
      showCollectionIcon: !showCollectionIcon,
    });
  },
  /**
   * 点击底部数字
   */
  handleClickFooter() {
    const { showFooter } = this.data;
    this.setData({
      showFooter: !showFooter,
    });
  },
  //选择某一题
  handleChoosePeoblem(e) {
    let { problemList = [], completeList = [] } = this.data;
    const { value } = e.currentTarget.dataset;
    console.log(".....", problemList);
    this.setData({
      current: problemList[value],
      showFooter: false,
      currentIndex: value,
    });
  },
  goToNext() {
    const { problemList = [], currentIndex, completeList = [] } = this.data;
    if (completeList.length === problemList.length) {
      wx.navigateTo({
        url: "/pages/chapterIndex/index?id=1",
      });
    } else {
      if (currentIndex == problemList.length - 1) {
        wx.showModal({
          title: "提示",
          content: "题目尚未全部完成,点击取消继续做题,点击确定返回章节!",
          success(res) {
            if (res.confirm) {
              wx.navigateTo({
                url: "/pages/chapterIndex/index?id=1",
              });
            } else if (res.cancel) {
              console.log("用户点击取消");
            }
          },
        });
        注意;
      } else {
        const index = currentIndex + 1;
        this.setData({
          current: problemList[index],
          currentIndex: index,
          showFooter: false,
        });
      }
    }
  },
  submitMultipleChoose() {
    const {
      current = {},
      optionMap,
      currentIndex,
      problemList,
      completeList,
      errorList = [],
    } = this.data;
    console.log("......", current);
    if (["error", "right"].includes(current.status)) {
      return;
    }
    if (!current.choosedOption || current.choosedOption.length == 0) {
      wx.showToast({
        title: "请先选择答案",
        icon: "error",
        duration: 500,
      });
    } else {
      completeList.push(current.id);
      //判断题目状态
      let str = "";
      const arr = current.choosedOption.sort();
      arr.map((item) => (str += optionMap[item]));
      if (str == current.answer) {
        current.status = "right";
      } else {
        current.status = "error";
        errorList.push(current.id);
      }
      problemList[currentIndex] = { ...current };
      this.setData({
        current: { ...current, showAnswer: true },
        problemList,
        errorList,
        completeList,
      });
    }
  },
});
