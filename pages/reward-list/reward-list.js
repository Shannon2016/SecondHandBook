const app = getApp()

Page({

    /**
     * 页面的初始数据
     */
    data: {
        books: [{
                picSrc: "../../image/book1.png",
                name: "共产党宣言",
                author: "马克思 恩格斯",
                press: "xxx",
                price: "15.00"
            },
            {
                picSrc: "../../image/book11.png",
                name: "博弈论",
                author: "让·梯若尔",
                press: "xxx",
                price: "16.00"
            },
            {
                picSrc: "../../image/book18.png",
                name: "围城",
                author: "钱钟书",
                press: "xxx",
                price: "17.00"
            },
            {
                picSrc: "../../image/book4.png",
                name: "中国哲学史",
                author: "冯友兰",
                press: "xxx",
                price: "18.00"
            },
        ]
    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {
        wx.stopPullDownRefresh()
    },

    searchInput: function(event) {
        this.setData({
            searchValue: event.detail.value
        })
    },

    searchBook: function() {
        var str = this.data.searchValue
        var value = app.inputStrHandle(str)
        console.log(value)
    },

    catchToSellBookTap: function(event) {
        var index = parseInt(event.currentTarget.dataset.index)
        wx.showToast({
            title: '去卖此书' + index.toString(),
        })
        wx.switchTab({
            url: '/pages/mall/mall',
        })
    },

    catchAddRewardTap: function() {
        wx.navigateTo({
            url: '/pages/add-reward/add-reward',
        })
    }
})