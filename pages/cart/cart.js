// pages/cart/cart.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    chooseItemIndex:[],
    checkFlag: false,
    totalPrice:0,
    topImg:{
      mode:'scaleToFill',
      src:'../../image/6.jpg'
    },
    cartInfoList:[]
  },
  getCartInfoList: function(){
    this.setData({
      cartInfoList: [{
        picSrc: "../../image/book1.png",
        bookName: "共产党宣言",
        author: "cuteBug",
        press: "BIT",
        price: 15.5
      }, {
        picSrc: "../../image/book11.png",
        bookName: "博弈论",
        author: "cuteBug",
        press: "BIT",
        price: 16
      }, {
        picSrc: "../../image/book18.png",
        bookName: "围城",
        author: "cuteBug",
        press: "BIT",
        price: 17
      }, {
        picSrc: "../../image/book4.png",
        bookName: "中国哲学史",
        author: "cuteBug",
        press: "BIT",
        price: 18.7
      }, {
        picSrc: "../../image/book4.png",
        bookName: "图书4",
        author: "cuteBug",
        press: "BIT",
        price: 18.7
      }
      ]
    })
  },
  getSum: function(){
    var tmp = 0;
    for (var i = 0; i < this.data.chooseItemIndex.length; i++) {
      var index = parseInt(this.data.chooseItemIndex[i]);
      tmp += this.data.cartInfoList[index].price;
    }
    tmp = tmp.toFixed(2)
    this.setData({
      totalPrice: tmp
    })
  },
  checkAll: function(){
    if (this.data.checkFlag === false){
      this.setData({
        checkFlag:true
      })
      this.data.chooseItemIndex = [];
      for (var i = 0; i < this.data.cartInfoList.length; i ++){
        this.data.chooseItemIndex.push(i.toString());
      }
      this.getSum();
    }else{
      this.setData({
        checkFlag:false
      })
      this.data.chooseItemIndex = [];
      this.setData({
        totalPrice: 0
      })
    }
  },
  checkboxChange: function (e) {
    this.data.chooseItemIndex=e.detail.value;
    this.getSum();
  },
  goOrder:function(){
    if (this.data.chooseItemIndex.length > 0){
      var tmp = this.data.chooseItemIndex[0];
      for(var i = 1; i < this.data.chooseItemIndex.length; i ++){
        tmp += ',' + this.data.chooseItemIndex[i];
      }
      wx.navigateTo({
        url: '../order/order?index=' + tmp + '&total=' + this.data.totalPrice.toString(),
      })
    }else{
      wx.showToast({
        title: '请选择您的图书',
        icon: 'none',
        duration: 2000
      });
      // wx.hideToast()
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getCartInfoList();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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

  }
})