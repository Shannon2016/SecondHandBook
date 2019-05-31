const app = getApp();
Page({

    data: {
        userInfo: {},
        // orders: [{
        //         picSrc: "/image/book1.png",
        //         name: "共产党宣言",
        //         consignee: "xxx",
        //         adress: "xxxxxxx",
        //         price: "15.00"
        //     },
        //     {
        //         picSrc: "/image/book11.png",
        //         name: "博弈论",
        //         consignee: "xxx",
        //         adress: "xxxxxxx",
        //         price: "16.00"
        //     },
        // ]
    },

    onLoad:function(){
        this.getMyOrderList()
    },
    onShow: function(){
        this.getMyOrderList();
    },
    
    onPullDownRefresh: function() {
        wx.stopPullDownRefresh()

        this.getMyOrderList()
    },

    getMyOrderList:function(){
        var that = this;
        wx.request({
            url: app.globalData.URLPREFIX + 'orders/getMy',
            header: {
                Cookie: app.globalData.cookie
            },
            method: 'GET',
            success(res) {
                console.log(res)
                if (res.data.code !== 0) {
                    wx.showToast({
                        title: '网络连接错误',
                        icon: 'none'
                    })
                    return
                }
                
                for (var i = 0; i < res.data.data.length; i++) {
                    res.data.data[i].picSrc = res.data.data[i].imageURL
                    res.data.data[i].name = res.data.data[i].bookName
                    res.data.data[i].consignee = res.data.data[i].buyerName
                    res.data.data[i].price = res.data.data[i].cost
                }
                that.setData({
                    orders: res.data.data
                })

                console.log("输出 res.data.data 信息")
                console.log(res.data.data)
            }
        })
    }
})