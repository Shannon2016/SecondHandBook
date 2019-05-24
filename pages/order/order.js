// pages/order/order.js

var app = getApp();

Page({

    /**
     * 页面的初始数据
     */
    data: {
        orderIndex: [],
        totalPrice: 0,
        orderInfoList: [],
        inputName:'',
        inputAddress:'',
        inputPhone:''
    },

    bindInputName: function (e) {
        this.setData({
            inputName: e.detail.value
        })
    },
    bindInputPhone: function (e) {
        this.setData({
            inputPhone: e.detail.value
        })
    },
    bindInputAddress: function (e) {
        this.setData({
            inputAddress: e.detail.value
        })
    },

    onConfirm: function () {
        var that = this;
        wx.showModal({
            title: '提示',
            content: '是否确认支付？',
            success(res) {
                if (res.confirm) {
                    console.log(that.data);
                    for(var i of that.data.orderInfoList){
                        wx.request({
                        url: app.globalData.URLPREFIX + 'orders/add',
                        method:'POST',
                        header:{
                            Cookie:app.globalData.cookie
                        },
                        data:{
                            bookId: i.id,
                            buyerName:that.data.inputName,
                            phoneNumber:that.data.inputPhone,
                            address:that.data.inputAddress
                        },
                        success:console.log
                        })
                    }
                } else if (res.cancel) {
                    console.log('用户点击取消')
                }
            }
        })
    },
    getOrderInfoList: function() {
        var tmp = []; //购物车列表

        var that = this;
        console.log(app.globalData.URLPREFIX);
        wx.request({
            url: app.globalData.URLPREFIX + 'shoppingcart/getMy',
            method: 'GET',
            header: {
                Cookie: app.globalData.cookie
            },
            success(res) {
                console.log(res);
                for (var i of res.data.data) {
                    i.picSrc = i.imagePath;
                }
                console.log(res.data.data);
                for(i of that.data.orderIndex){
                    tmp.push(res.data.data[parseInt(i)])
                }

                that.setData({
                    orderInfoList: tmp
                })
            }
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            totalPrice: parseFloat(options.total).toFixed(2),
            orderIndex: options.index.split(',')
        })
    },
    onShow: function(){
        this.getOrderInfoList();
    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {
        wx.stopPullDownRefresh()
    }
})