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
        inputPhone:'',
        flag:-1 // 用于判断是从购物车下单还是直接购买下单
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

    judge: function(){
        if (this.data.inputName.length > 30 || this.data.inputName.length < 1){
            wx.showToast({
                title: "请正确填写姓名",
                image: '../../image/tan.png',
                mask: false,
            });
            return false;
        }

        if (this.data.inputPhone.length !== 11) {
            wx.showToast({
                title: "手机号码11位",
                image: '../../image/tan.png',
                mask: false,
            });
            return false;
        }

        if (this.data.inputAddress.length > 250 || this.data.inputAddress.length < 1){
            wx.showToast({
                title: "请正确填写地址",
                image: '../../image/tan.png',
                mask: false,
            });
            return false;
        }
        return true;
    },

    onConfirm: function () {
        if(this.judge()){
            var that = this;
            console.log(that.data.orderInfoList);
            wx.showModal({
                title: '提示',
                content: '是否确认支付？',
                success(res) {
                    if (res.confirm) {
                        console.log(that.data);
                        if(that.data.flag === 2){
                        for(var i of that.data.orderInfoList){
                            console.log(i);
                            wx.request({
                                url: app.globalData.URLPREFIX + 'orders/addFromCart',
                                method:'POST',
                                header:{
                                    Cookie:app.globalData.cookie
                                },
                                data:{
                                    number:i.number,
                                    bookId: i.bookId,
                                    buyerName:that.data.inputName,
                                    phoneNumber:that.data.inputPhone,
                                    address:that.data.inputAddress
                                },
                                success(res){
                                    console.log(res)
                                    if(res.data.code === 0){
                                        wx.redirectTo({
                                            url: '/pages/person-center/my-order/my-order',
                                        })
                                    }else{
                                        wx.showToast({
                                            title: '网络连接错误',
                                            icon: 'none'
                                        })
                                    }
                                }
                            })
                        }
                    }
                    else if(that.data.flag === 1){
                        console.log(that.data.orderInfoList)
                            console.log(that.data.orderInfoList[0].id)
                            wx.request({
                                url: app.globalData.URLPREFIX + 'orders/addDirectly',
                                method: 'POST',
                                header: {
                                    Cookie: app.globalData.cookie
                                },
                                data: {
                                    number: 1,
                                    bookId: that.data.orderInfoList[0].id,
                                    buyerName: that.data.inputName,
                                    phoneNumber: that.data.inputPhone,
                                    address: that.data.inputAddress
                                },
                                success(res) {
                                    console.log(res)
                                    if (res.data.code === 0) {
                                        wx.redirectTo({
                                            url: '/pages/person-center/my-order/my-order',
                                        })
                                    }
                                    else{
                                    wx.showToast({
                                        title: '网络连接错误',
                                        icon: 'none'
                                    })
                                    }
                                },
                                fail(res){
                                    console.log(res);
                                    wx.showToast({
                                        title: '网络连接错误',
                                        icon: 'none'
                                    })
                                }
                            })
                        }
                    } 
                    else if (res.cancel) {
                        console.log('用户点击取消')
                    }
                }
            })
        }
    },
    getOrderInfoList: function() {
        var tmp = []; //购物车列表

        var that = this;
        wx.request({
            url: app.globalData.URLPREFIX + 'shoppingcart/getMy',
            method: 'GET',
            header: {
                Cookie: app.globalData.cookie
            },
            success(res) {
                if (res.data.code !== 0) {
                    wx.showToast({
                        title: '网络连接错误',
                        icon: 'none'
                    })
                    return;
                }
                console.log(res);
                for (var i of res.data.data) {
                    i.picSrc = i.imagePath;
                }
                console.log(res.data.data);
                for(i of that.data.orderIndex){
                    tmp.push(res.data.data[parseInt(i)])
                }
                if(tmp.length > 0){
                    that.setData({
                        orderInfoList: tmp
                    }) 
                }
            },
            fail(res){
                wx.showToast({
                    title: '网络连接错误',
                    icon: 'none'
                })
            }
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        if (options.bookName) {
            var tmp = [];
            options.number = 1;
            tmp.push(options)
            this.setData({
                orderInfoList: tmp,
                orderIndex:[],
                totalPrice:parseFloat(options.price).toFixed(2),
                flag :1 //直接下订单
            })
        }
        else{
            this.setData({
                totalPrice: parseFloat(options.total).toFixed(2),
                orderIndex: options.index.split(','),
                flag:2 //购物车
            })
        }
    },
    onShow: function(options){
        this.getOrderInfoList();
        console.log(this.data.orderInfoList)
    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {
        wx.stopPullDownRefresh()
    }
})