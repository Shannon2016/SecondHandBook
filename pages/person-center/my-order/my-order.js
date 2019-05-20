Page({

    /**
     * 页面的初始数据
     */
    data: {
        userInfo: {},
        orders: [{
                picSrc: "/image/book1.png",
                name: "共产党宣言",
                consignee: "xxx",
                adress: "xxxxxxx",
                price: "15.00"
            },
            {
                picSrc: "/image/book11.png",
                name: "博弈论",
                consignee: "xxx",
                adress: "xxxxxxx",
                price: "16.00"
            },
        ]
    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {
        wx.stopPullDownRefresh()
    }
})