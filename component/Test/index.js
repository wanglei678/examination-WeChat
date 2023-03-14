import { submitTextInfo } from "../../pages/config/mock";
import { imgDomain } from "../../pages/config/chapter";
// config/chapter
var app = getApp();
Component({
  options: {},
  //组件的属性列表
  properties: {
    problemList: {
      type: Array,
      value: [],
    },
  },
  // 组件的初始数据
  data: {
    typeMap: app.globalData.questionType,
    currentIndex: 0,
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
    dataList: [], //处理过的题目
    optionMap: ["A", "B", "C", "D", "E", "F"],
    time: 90 * 60 * 1000,
    timeStr: "90:00",
    timeId: null,
    stopFlag: false,
  },
  lifetimes: {
    // 生命周期函数，可以为函数，或一个在 methods 段中定义的方法名
    attached: function () {},
    moved: function () {},
    detached: function () {
      let { timeId } = this.data;
      clearInterval(timeId);
    },
  },
  ready: function () {
    let { currentIndex, time, timeStr } = this.data;
    // this.getDenseVolume()
    console.log("....test", this.properties.problemList);
    const dataList = this.properties.problemList.map((item) => {
      let { type, options, analysis, title } = item;
      const obj = { ...item };
      analysis = analysis.replace(/\<img/g, "<img class='img_style'");
      analysis = analysis.replace(/imgpath\//g, imgDomain());
      obj.analysis = analysis;
      return obj;
    });
    console.log("....test dataList", dataList);

    let timeId = setInterval(() => {
      if (time > 0) {
        time -= 1000;
        let ss = time / 1000; //换成s
        let m = parseInt(ss / 60);
        let s = ss % 60;
        m = m > 9 ? m : "0" + m;
        s = s > 9 ? s : "0" + s;
        timeStr = m + ":" + s;
      } else {
        this.submitInfo();
      }

      this.setData({ time, timeStr });
    }, 1000);
    this.setData({ current: dataList[currentIndex], timeId,dataList });
  },
  //组件的方法列表
  methods: {
    //交卷
    goToSubmit() {
      const self = this;
      const { completeList = [], dataList = [] } = this.data;
      if (completeList.length !== dataList.length) {
        wx.showModal({
          title: "提示",
          content: "还有题目未做完,确定要交卷吗?",
          success(res) {
            if (res.confirm) {
              console.log("用户点击确定", self.data);
              
              self.submitInfo();
            } else if (res.cancel) {
              console.log("用户点击取消");
            }
          },
        });
      } else {
        this.submitInfo();
      }
    },
    submitInfo() {
      wx.showLoading({
        title: "提交中",
      });
      clearInterval(this.data.timeId);
      const user = wx.getStorageSync("user");
      const examType = wx.getStorageSync("examType") + "";
      let userId = user.id + "";
      let grade = user.grade === "null" ? "1" : user.grade;
      let arr =
        this.data.dataList.filter((item) => item.status === "right") || [];
      let score = 0.5 * arr.length + "";
      let obj = { userId, score, examType, grade };

      submitTextInfo(obj).then((resp) => {
        console.log("obj     gggggg", resp);

        if (resp.status === 200) {
          wx.showModal({
            title: "提示",
            content: `本次模拟得分: ${score}`,
            showCancel: false,
            success(res) {
              if (res.confirm) {
                wx.switchTab({
                  url: "/pages/index/index",
                });
              } else if (res.cancel) {
                console.log("用户点击取消");
              }
            },
          });
        }
      });
    },
    async getDenseVolume(option) {
      //根据等级获取
      const resp = await getOneMockTest({ grade: option.id });
      const { data = [] } = resp;
      console.log("getDenseList", data);
      this.setData({ testData: data });
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
        dataList = [],
        currentIndex,
        optionMap,
      } = this.data;
      const { value } = e.currentTarget.dataset;
      current.choosedOption = value;
      if (["error", "right"].includes(current.status)) {
        return;
      }
      console.log(value);
      completeList.push(current.id);
      if (current.answer !== optionMap[value]) {
        errorList.push(current.id);
        current.status = "error";
      } else {
        current.status = "right";
      }
      dataList[currentIndex] = { ...current };
      console.log("......e", current.choosedOption);
      console.log("......dataList", dataList);
      this.setData({
        completeList,
        errorList,
        dataList,
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
      let { dataList = [], completeList = [] } = this.data;
      const { value } = e.currentTarget.dataset;
      console.log(".....", e, value);
      this.setData({
        current: dataList[value],
        showFooter: false,
        currentIndex: value,
      });
    },
    goToNext() {
      const { dataList = [], currentIndex } = this.data;
      console.log("goToNext",currentIndex,dataList.length)
      if (currentIndex === dataList.length - 1) {
        wx.switchTab({
          url: "/pages/index/index",
        });
      } else {
        const index = currentIndex + 1;
        this.setData({
          current: dataList[index],
          currentIndex: index,
          showFooter: false,
        });
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
      if (!current.choosedOption || current.choosedOption.length == 0) {
        wx.showToast({
          title: "请先选择答案",
          icon: "error",
          duration: 500,
        });
      }
    },
  },
});
