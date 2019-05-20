Page({

    /**
     * 页面的初始数据
     */
    data: {
        books: [{
                picSrc: "/image/book1.png",
                name: "共产党宣言",
                author: "马克思 恩格斯",
                price: "15.00",
                description: "双击编辑文本双击编辑文本双击编辑文本双击编辑文本双击编辑文本双击编辑文本",
                level: 1,
                id: 1,
            },
            {
                picSrc: "/image/book11.png",
                name: "博弈论",
                author: "让·梯若尔",
                price: "16.00",
                description: "双击编辑文本双击编辑文本双击编辑文本双击编辑文本双击编辑文本双击编辑文本",
                level: 6,
                id: 2,
            },
            {
                picSrc: "/image/book18.png",
                name: "围城",
                author: "钱钟书",
                price: "17.00",
                description: "双击编辑文本双击编辑文本双击编辑文本双击编辑文本双击编辑文本双击编辑文本",
                level: 4,
                id: 3,
            },
            {
                picSrc: "/image/book4.png",
                name: "中国哲学史",
                author: "冯友兰",
                price: "18.00",
                description: "双击编辑文本双击编辑文本双击编辑文本双击编辑文本双击编辑文本双击编辑文本",
                level: 3,
                id: 4,
            },
        ]
    },

    onLoad: function() {
        var userInfo = wx.getStorageSync('userInfo')

        if (!userInfo) {
            wx.redirectTo({
                url: '/pages/index/index',
            })
        }
    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {
        wx.stopPullDownRefresh()
    },


    searchBook: function() {
        // TODO getSellsByWord(string keyword)
        // this.setData({books:books})

        wx.showToast({
            title: '搜索图书',
        })
    },

    showClassifyBook: function(event) {
        var type = parseInt(event.currentTarget.dataset.type)

        wx.showToast({
            title: type.toString(),
        })
    },

    showBookDetail: function(event) {
        var bookIndex = event.currentTarget.dataset.bookIndex
        var bookDetail = JSON.stringify(this.data.books[bookIndex])

        wx.navigateTo({
            url: '/pages/mall/book-detail/book-detail?bookDetail=' + escape(bookDetail),
        })
    }
})