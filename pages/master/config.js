const mediaUrl = "http://43.136.29.210/media";
function commomVideo() {
  let arr = [
    {
      title: "职业道德",
      url: `${mediaUrl}/base/modular1/`,
      data: ["模块一-1", "模块一-2"],
      label: ["base1-1", "base1-2"],
    },
    {
      title: "消防工作概述",
      url: `${mediaUrl}/base/modular2/`,
      data: ["模块二-1", "模块二-2","模块二-3"],
      label: ["base2-1", "base2-2", "base2-3"],
    },
    {
      title: "燃烧和火灾基本知识",
      url: `${mediaUrl}/base/modular3/`,
      data: ["模块三-1", "模块三-2", "模块三-3","模块三-4", "模块三-5", "模块三-6"],
      label: ["base3-1", "base3-2", "base3-3","base3-4","base3-5","base3-6"],
    },
    {
      title: "建筑防火基本知识",
      url: `${mediaUrl}/base/modular4/`,
      data: ["模块四-1", "模块四-2","模块四-3", "模块四-4","模块四-5", "模块四-6","模块四-7", "模块四-8","模块四-9"],
      label: ["base4-1", "base4-2","base4-3", "base4-4","base4-5", "base4-6","base4-7", "base4-8", "base4-9"],
    },
    {
      title: "电气消防基本知识",
      url: `${mediaUrl}/base/modular5/`,
      data: ["模块五-1", "模块五-2","模块五-3", "模块五-4","模块五-5", "模块五-6","模块五-7"],
      label: ["base5-1", "base5-2","base5-3", "base5-4","base5-5", "base5-6","base5-7"],
    },
    {
      title: "消防设施基本知识",
      url: `${mediaUrl}/base/modular6/`,
      data: [
        "模块六-1",
        "模块六-2",
        "模块六-3",
        "模块六-4",
        "模块六-5",
        "模块六-6",
        "模块六-7",
        "模块六-8",
        "模块六-9",
        "模块六-10",
        "模块六-11",
        "模块六-12",
        "模块六-13",
        "模块六-14",
        "模块六-15",
        "模块六-16",
        "模块六-17",
        "模块六-18",
        "模块六-19",
        "模块六-20",
        "模块六-21",
      ],
      label: [
        "base6-1",
        "base6-2",
        "base6-3",
        "base6-4",
        "base6-5",
        "base6-6",
        "base6-7",
        "base6-8",
        "base6-9",
        "base6-10",
        "base6-11",
        "base6-12",
        "base6-13",
        "base6-14",
        "base6-15",
        "base6-16",
        "base6-17",
        "base6-18",
        "base6-19",
        "base6-20",
        "base6-21",
      ],
    },
    {
      title: "初起火灾处置基本知识",
      url: `${mediaUrl}/base/modular7/`,
      data: ["模块七-1","模块七-2"],
      label: ["base7-1","base7-2"],
    },
  ];
  return arr;
}
let primaryTitle = [
  "灭火器的选择与使用",
  "区域火灾报警控制器报警信号区分与报警信息查看",
  "区域火灾报警控制器报警信息核实与处理",
  "区域火灾报警控制器工作状态切换",
  "区域火灾报警控制器识别及工作状态判断",
  "使用室内消火栓、消防软管卷盘、轻便消防水龙灭火",
  "使用室外消火栓灭火",
  "消防自救呼吸器的使用",
];
const juniorTitle = [
  "防烟排烟系统工作状态判断",
  "防烟系统操作",
  "火灾报警控制器手动自动状态切换",
  "火灾自动报警系统工作状态判断",
  "排烟操作系统",
  "消防联动控制器直接手动控制盘的操作",
  "消防设置末端配电装置工作状态判断",
  "消防应急广播操作",
  "消火栓泵组电器控制柜工作状态识别与切换",
  "自动喷水灭火系统电气控制柜操作1",
  "自动喷水灭火系统电气控制柜操作2",
  "自动喷水灭火系统工作状态判断",
  "总线式消防联动控制器的手动操作",
];
function assembleVedio(type, data = []) {
  let arr = [];
  const url = `${mediaUrl}/${type}/`;

  data.map((item, i) => {
    const obj = {
      url: url,
      data: [],
      label: [],
      title: item,
    };
    obj.data.push(item);
    obj.label.push(`${type}-${i + 1}`);
    arr.push(obj);
  });
  return arr;
}
//维保
const hightTitle = [
  "防火门、防火卷帘等防火分隔设施的检查和功能测试",
  "防烟排烟系统组件的检查和功能测试",
  "火灾自动报警系统联动功能测试",
  "湿式干式自动喷水灭火系统工作压力和流量测试",
  "湿式干式自动喷水灭火系统连锁控制和联动控制功能测试",
  "消防电话系统组件检查和通话功能测试",
  "消防电梯检查和功能测试",
  "消防供水设施的检查和功能测试",
  "消防设备末端配电装置检查和供电功能测试",
  "消防应急广播系统组件检查和广播、联动控制功能测试",
  "消防应急照明和疏散指示系统组件检查和功能测试",
  "消火栓系统的检查和功能测试",
];

module.exports = {
  commonVedio: commomVideo(),
  primaryVedio: assembleVedio("primary", primaryTitle),
  juniorVedio: assembleVedio("junior", juniorTitle),
  highVedio: assembleVedio("high", hightTitle),
};
