const mediaUrl = "http://43.136.29.210/media";
function commomVideo() {
  let arr = [
    {
      title: "职业道德",
      url: `${mediaUrl}/base/modular1/`,
    },
    {
      title: "消防工作概述",
      url: `${mediaUrl}/base/modular2/`,
    },
    {
      title: "燃烧和火灾基本知识",
      url: `${mediaUrl}/base/modular3/`,
    },
    {
      title: "建筑防火基本知识",
      url: `${mediaUrl}/base/modular4/`,
    },
    {
      title: "电气消防基本知识",
      url: `${mediaUrl}/base/modular5/`,
    },
    {
      title: "消防设施基本知识",
      url: `${mediaUrl}/base/modular6/`,
    },
    {
      title: "初起火灾处置基本知识",
      url: `${mediaUrl}/base/modular7/`,
    },
  ];
  return arr;
}

module.exports = {
  commonVedio: commomVideo(),
};
