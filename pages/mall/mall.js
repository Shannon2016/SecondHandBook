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
            },
            {
                picSrc: "/image/book11.png",
                name: "博弈论",
                author: "让·梯若尔",
                price: "16.00",
                description: "双击编辑文本双击编辑文本双击编辑文本双击编辑文本双击编辑文本双击编辑文本",
                level: 6,
            },
            {
                picSrc: "/image/book18.png",
                name: "围城",
                author: "钱钟书",
                price: "17.00",
                description: "双击编辑文本双击编辑文本双击编辑文本双击编辑文本双击编辑文本双击编辑文本",
                level: 4,
            },
            {
                picSrc: "/image/book4.png",
                name: "中国哲学史",
                author: "冯友兰",
                price: "18.00",
                description: "双击编辑文本双击编辑文本双击编辑文本双击编辑文本双击编辑文本双击编辑文本",
                level: 3,
            },
        ]
    },

    showBookDetail: function(event) {
        var bookIndex = event.currentTarget.dataset.bookIndex
        var bookDetail = JSON.stringify(this.data.books[bookIndex])

        wx.navigateTo({
            url: '/pages/mall/book-detail/book-detail?bookDetail=' + escape(bookDetail),
        })
    }
})