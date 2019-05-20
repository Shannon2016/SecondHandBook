// pages/order/order.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        orderIndex: [],
        totalPrice: 0,
        inputName: '',
        inputPhone: '',
        inputAddress: '',
        orderInfoList: []
    },

    onConfirm: function() {
        wx.showModal({
            title: '提示',
            content: '是否确认支付？',
            success(res) {
                if (res.confirm) {
                    console.log('用户点击确定')
                } else if (res.cancel) {
                    console.log('用户点击取消')
                }
            }
        })
    },
    getOrderInfoList: function() {
        var tmp = [{
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
        }]; //购物车列表

        var tmp2 = [];
        for (var i = 0; i < this.data.orderIndex.length; i++) {
            tmp2.push(tmp[parseInt(this.data.orderIndex[i])]);
        }

        this.setData({
            orderInfoList: tmp2
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        this.setData({
            totalPrice: parseFloat(options.total).toFixed(2),
            orderIndex: options.index.split(',')
        })
        this.getOrderInfoList();
    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {
        wx.stopPullDownRefresh()
    }
})