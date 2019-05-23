var app = getApp()

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
        ],

        searchValue:''
    },

    //大佬我对你的代码动手辣
    getBookList: function () {
        var that = this;
        wx.request({
            url: app.globalData.URLPREFIX + 'sells/getAll',
            header: {
                Cookie: app.globalData.cookie
            },
            method: 'GET',
            success(res) {
                for (var i = 0; i < res.data.data.length; i++) {
                    res.data.data[i].picSrc = res.data.data[i].imagePath;
                    console.log(res.data.data[i].picSrc);
                    res.data.data[i].name = res.data.data[i].bookName;
                    res.data.data[i].level = res.data.data[i].depreciation;
                    res.data.data[i].id = i + 1;

                }
                that.setData({
                    books:res.data.data
                })
            }
        })
    },

    onLoad: function() {
        var userInfo = wx.getStorageSync('userInfo')

        if (!userInfo) {
            wx.redirectTo({
                url: '/pages/index/index',
            })
        }
        this.getBookList();
    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {
        wx.stopPullDownRefresh()
    },

    searchInput:function(event){
        this.setData({
            searchValue:event.detail.value
        })
    },

    searchBook: function() {
        var str = this.data.searchValue
        var value = app.inputStrHandle(str)
        console.log(value)
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