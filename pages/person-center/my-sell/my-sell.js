Page({

    /**
     * 页面的初始数据
     */
    data: {
        books: [{
                picSrc: "/image/book1.png",
                name: "共产党宣言",
                author: "马克思 恩格斯",
                press: "xxx",
                price: "15.00",
                state: "待售",
                color: "#07a2a4"
            },
            {
                picSrc: "/image/book11.png",
                name: "博弈论",
                author: "让·梯若尔",
                press: "xxx",
                price: "16.00",
                state: "待售",
                color: "#07a2a4"
            },
            {
                picSrc: "/image/book18.png",
                name: "围城",
                author: "钱钟书",
                press: "xxx",
                price: "17.00",
                state: "已售",
                color: "#bbb"
            },
            {
                picSrc: "/image/book4.png",
                name: "中国哲学史",
                author: "冯友兰",
                press: "xxx",
                price: "18.00",
                state: "已售",
                color: "#bbb"
            },
        ]
    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {
        wx.stopPullDownRefresh()
    },

    catchAddNewSellTap: function() {
        wx.navigateTo({
            url: '/pages/add-new-sell/add-new-sell',
        })
    }
})