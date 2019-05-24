// pages/cart/cart.js
const app = getApp();

Page({

    /**
     * 页面的初始数据
     */
    data: {
        chooseItemIndex: [],
        checkFlag: false,
        totalPrice: 0,
        topImg: {
            mode: 'scaleToFill',
            src: '../../image/6.jpg'
        },
        cartInfoList: []
    },
    onClose(event) {
        const { position, instance } = event.detail;
        switch (position) {
            case 'cell':
                instance.close();
                break;
            case 'right':
                Dialog.confirm({
                    message: '确定删除吗？'
                }).then(() => {
                    instance.close();
                });
                break;
        }
    },
    getCartInfoList: function() {
        var that = this;
        wx.request({
          url: app.globalData.URLPREFIX + 'shoppingcart/getMy',
          method:'GET',
          header:{
              Cookie:app.globalData.cookie
          },
          success(res) {
            console.log(res);
            for(var i of res.data.data){
                i.picSrc = i.imagePath;
            }
            console.log(res.data.data);
            that.setData({
                cartInfoList: res.data.data
            })
          }
        })

    },
    getSum: function () {
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
    checkAll: function () {
        if (this.data.checkFlag === false) {
            var tmp=[]
            for (var i in this.data.cartInfoList) {
                tmp.push(i.toString());
            }
            this.setData({
                checkFlag: true,
                chooseItemIndex :tmp
            })
            console.log(1);
            this.getSum();
        } else {
            this.setData({
                checkFlag: false,
                totalPrice: 0,
                chooseItemIndex:[]
            })
        }
    },
    checkboxChange: function(e) {
        this.setData({
            chooseItemIndex: e.detail.value
        })
        this.getSum();
    },
    goOrder: function () {
        if (this.data.chooseItemIndex.length > 0) {
            var tmp = this.data.chooseItemIndex.join();
            wx.navigateTo({
                url: '../order/order?index=' + tmp + '&total=' + this.data.totalPrice.toString(),
            })
        } else {
            wx.showToast({
                title: '请选择您的图书',
                icon: 'none',
                duration: 2000
            });
            // wx.hideToast()
        }
    },

    onLoad: function(options) {
    },

    onShow:function(){
        this.getCartInfoList();
    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {
        wx.stopPullDownRefresh()
    }
})