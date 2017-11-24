// pages/seo/seo.js
var _wxcharts = require('../../mars/plugins/wxcharts')
Page({
  /**
   * 页面的初始数据
   */
 data:{
        areaIndex:0,  
        area:['2017/11/16~2017/11/16','2018/11/16~2018/11/16','2019/11/16~2019/11/16','2020/11/16~2020/11/16'],
        listData:[
                  {"num":"01","keys":"text1","type":"10","rank":true},
                  {"num":"02","keys":"text2","type":"10","rank":false},
                  {"num":"03","keys":"text3","type":"10","rank":true},
                  {"num":"04","keys":"text4","type":"10","rank":false},
                  {"num":"05","keys":"text5","type":"10","rank":true},
                  {"num":"06","keys":"text6","type":"10","rank":false},
                  {"num":"07","keys":"text7","type":"10","rank":true},        
         ],
         listData2:[
                   {"num":"08","keys":"text1","type":"10","rank":true,"flag":'true'},
                  {"num":"09","keys":"text2","type":"10","rank":false,"flag":'true'},
                  {"num":"10","keys":"text3","type":"10","rank":true,"flag":'true'},
                  {"num":"11","keys":"text4","type":"10","rank":false,"flag":'true'},
                  {"num":"12","keys":"text5","type":"10","rank":true,"flag":'true'},
                  {"num":"13","keys":"text6","type":"10","rank":false,"flag":'true'},
                  {'flag':false}
         ],
         today:true,
         yesterday:false,
         theseday:false,
          scrollTop: 0,
          floorstatus: false,
          onsem: false,
          onseo: true,
          showinfo:false,
          lineshow: [
                           { "lineGraphcategories":['2012', '2013', '2014', '2015', '2016', '2017','2018']},
                            {  "lineGraphname":"关键词","lineGraphdata":[0.15, 0.2, 0.45, 0.37, 0.4, 0.8,1.68]},
                            {  'lineGraphname':"流量",'lineGraphdata':[0.30, 0.37, 0.65, 0.78, 0.69, 0.94,1.45]},
                            {  'lineGraphname':"增长数",'lineGraphdata': [0.60, 0.37, 0.95, 0.78, 0.19, 0.94,1.12]},
                            {'lineGraphtitle':"效果概览(十万)"},
                            {'min':0}
              ],
          loadingHidden: true,
          showLoading: false,

  // selectdata:true,
  // firstdata:'2017/11/06 ~ 2017/11/06',
  // selectArea:false,
  },

/*关闭底部关键词*/
shutinfo:function(){
  this.setData({
    showinfo:false
  })
      this.seokeywords()
},
/*展示每个关键词*/
showinfo:function(){
  // console.log(1111)
  this.setData({
    showinfo:true
  })
},



  /*seo和sem之间的按钮切换*/
  semdatachange:function(e){
    // wx.navigator({
    //   url: './../sem/sem'
    // }),
        this.setData({
          onsem:true,
          onseo:false
        })
  },
  seodatachange:function(e){
    this.setData({
      onsem:false,
      onseo:true
    })
  },
/*  今天昨天近七天点击切换*/
today:function(e){
            var that = this
      console.log(111);
          this.setData({
                 loadingHidden:false,
                 today:true,
                 yesterday:false,
                 theseday:false,
          })
    //       ,
    // setTimeout(function () {
    //   that.setData({
    //     loadingHidden: true
    //   });
    //   that.update();
    // }, 3000);
  
  
},

yesterday: function (e) {
  this.setData({
            today:false,
         yesterday:true,
         theseday:false,
         showLoading: true

  })
},
theseday: function (e) {
  this.setData({
         today:false,
         yesterday:false,
         theseday:true,
  })
},
  /*返回顶层*/
  goTop: function (e) {
    this.setData({
      scrollTop: 0
    })
    // console.log(111);
  },
  scroll: function (e) {
    if (e.detail.scrollTop > 500) {
      this.setData({
        floorstatus: true
      });
    } else {
      this.setData({
        floorstatus: false
      });
    }
  },
  getMore: function () {
    
  },
  // 下拉
      bindPickerChange:function(e){  
        this.setData({  
            areaIndex: e.detail.value  
        })  
    } ,
 //点击选择类型
 clickdata:function(){
  var selectdata = this.data.selectdata;
  if(selectdata == true){
   this.setData({
   selectArea:true,
   selectdata:false,
 })
  }else{
   this.setData({
   selectArea:false,
   selectdata:true,
 })
  }
 } ,
 //点击切换
 mySelect:function(e){
  this.setData({
   firstdata:e.target.dataset.me,
   selectdata:true,
   selectArea:false,
  })
 },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.setData({
    //   loadingHidden: false
    // })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
      this.lineShow()
      this.thesaurus()
      this.rank()
      this.seokeywords()
      // this.setData({
      //   loadingHidden: true
      // }) 
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    this.setData({
      loadingHidden:false
    })
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  /**
   * @Explain：获取设备信息
   */
  getDeviceInfo: function () {
    let that = this
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          deviceW: res.windowWidth,
          deviceH: res.windowHeight
        })
      }
    })
  },
  lineShow: function (e) {
    var that=this;
    let line = {
      canvasId: 'lineGraph',
      type: 'line',
      categories: that.data.lineshow[0].lineGraphcategories,
      series: [{
        name:  that.data.lineshow[1].lineGraphname,
        data:  that.data.lineshow[1].lineGraphdata,
        format: function (val) {
          return val.toFixed(2) + '万';
        }
      }, {
        name:  that.data.lineshow[2].lineGraphname,
        data:  that.data.lineshow[2].lineGraphdata,
        format: function (val) {
          return val.toFixed(2) + '万';
        }
      }, {
        name:  that.data.lineshow[3].lineGraphname,
        data:that.data.lineshow[3].lineGraphdata ,
        format: function (val) {
          return val.toFixed(2) + '万';
        }
      }],
      yAxis: {
        title: that.data.lineshow[4].lineGraphtitle,
        format: function (val) {
          return val.toFixed(2);
        },
        min: 0,
      },
      width: 300,
      height: 200,
    }
    new _wxcharts(line)
  },
   thesaurus: function () {
    let line = {
      canvasId: 'thesaurus',
      type: 'line',
      categories: ['2012', '2013', '2014', '2015', '2016', '2017','2018'],
      series: [{
        name: '成交量1',
        data: [0.15, 0.2, 0.45, 0.37, 0.4, 0.8,1.68],
        format: function (val) {
          return val.toFixed(2) + '万';
        }
      }, {
        name: '成交量2',
        data: [0.30, 0.37, 0.65, 0.78, 0.69, 0.94,1.45],
        format: function (val) {
          return val.toFixed(2) + '万';
        }
      }, {
        name: '成交量3',
        data: [0.60, 0.37, 0.95, 0.78, 0.19, 0.94,1.12],
        format: function (val) {
          return val.toFixed(2) + '万';
        }
      }],
      yAxis: {
        title: '词库概览 (十万)',
        format: function (val) {
          return val.toFixed(2);
        },
        min: 0,
      },
      width: 300,
      height: 200,
      fontSize:20
    }
    new _wxcharts(line)
  },
   rank: function () {
    let line = {
      canvasId: 'rank',
      type: 'line',
      categories: ['2012', '2013', '2014', '2015', '2016', '2017','2018'],
      series: [{
        name: '成交量1',
        data: [0.15, 0.2, 0.45, 0.37, 0.4, 0.8,1.68],
        format: function (val) {
          return val.toFixed(2) + '万';
        }
      }, {
        name: '成交量2',
        data: [0.30, 0.37, 0.65, 0.78, 0.69, 0.94,1.45],
        format: function (val) {
          return val.toFixed(2) + '万';
        }
      }, {
        name: '成交量3',
        data: [0.60, 0.37, 0.95, 0.78, 0.19, 0.94,1.12],
        format: function (val) {
          return val.toFixed(2) + '万';
        }
      }],
      yAxis: {
        title: '关键词排名 (十万)',
        format: function (val) {
          return val.toFixed(2);
        },
        min: 0,
      },
      width: 300,
      height: 200,
      fontSize:20
    }
    new _wxcharts(line)
  },
   seokeywords: function () {
    let line = {
      canvasId: 'seokeywords',
      type: 'line',
      categories: ['01', '02', '03', '04', '05', '06','07'],
      series: [{
        name: '成交量1',
        data: [0.15, 0.2, 0.45, 0.37, 0.4, 0.8,1.68],
        format: function (val) {
          return val.toFixed(2) + '万';
        }
      }],
      yAxis: {
        title: '关键词排名 (十万)',
        format: function (val) {
          return val.toFixed(2);
        },
        min: 0,
      },
      width: 220,
      height: 160,
    }
    new _wxcharts(line)
  }
})