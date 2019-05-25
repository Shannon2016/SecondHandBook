var app = getApp()

Page({

    /**
     * 页面的初始数据
     */
    data: {
        // books: [{
        //         picSrc: "/image/book1.png",
        //         name: "共产党宣言",
        //         author: "马克思 恩格斯",
        //         price: "15.00",
        //         description: "双击编辑文本双击编辑文本双击编辑文本双击编辑文本双击编辑文本双击编辑文本",
        //         level: 1,
        //         id: 1,
        //     }
        // ],
        classifyStyle: [{
                bgColor: '#fbfbfb',
                color: '#606266',
                fontSize: '28rpx'
            },
            {
                bgColor: '#fbfbfb',
                color: '#606266',
                fontSize: '28rpx'
            },
            {
                bgColor: '#fbfbfb',
                color: '#606266',
                fontSize: '28rpx'
            },
            {
                bgColor: '#fbfbfb',
                color: '#606266',
                fontSize: '28rpx'
            },
            {
                bgColor: '#fbfbfb',
                color: '#606266',
                fontSize: '28rpx'
            },
            {
                bgColor: '#fbfbfb',
                color: '#606266',
                fontSize: '28rpx'
            },
            {
                bgColor: '#fbfbfb',
                color: '#606266',
                fontSize: '28rpx'
            },
            {
                bgColor: '#fbfbfb',
                color: '#606266',
                fontSize: '28rpx'
            },
            {
                bgColor: '#fbfbfb',
                color: '#606266',
                fontSize: '28rpx'
            },
            {
                bgColor: 'rgb(75, 199, 168)',
                color: '#fff',
                fontSize: '30rpx'
            },
        ],
        searchValue: ''
    },

    getBookList: function() {
        var that = this;
        wx.request({
            url: app.globalData.URLPREFIX + 'sells/getAll',
            header: {
                Cookie: app.globalData.cookie
            },
            method: 'GET',
            success(res) {
                console.log(res)
                for (var i = 0; i < res.data.data.length; i++) {
                    res.data.data[i].picSrc = res.data.data[i].imagePath
                    res.data.data[i].name = res.data.data[i].bookName
                    res.data.data[i].level = res.data.data[i].depreciation
                }
                that.setData({
                    books: res.data.data
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
    },

    onShow: function() {
        this.getBookList()
    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {
        wx.stopPullDownRefresh()

        var classifyStyle = this.data.classifyStyle
        for (var i = 1; i < 9; i++)
            classifyStyle[i] = classifyStyle[0]
        this.setData({
            classifyStyle: classifyStyle
        })

        // TODO 应使用异步获取
        this.getBookList()
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

    /**
     * 根据书单分类来显示
     */
    showClassifyBook: function(event) {
        var type = parseInt(event.currentTarget.dataset.type)

        var classifyStyle = this.data.classifyStyle
        for (var i = 1; i < 9; i++)
            classifyStyle[i] = classifyStyle[0]
        classifyStyle[type] = classifyStyle[9]
        this.setData({
            classifyStyle: classifyStyle
        })

        var that = this;
        wx.request({
            url: app.globalData.URLPREFIX + 'sells/getByCategory',
            header: {
                Cookie: app.globalData.cookie
            },
            method: 'GET',
            data: {
                category: type
            },
            success(res) {
                for (var i = 0; i < res.data.data.length; i++) {
                    res.data.data[i].picSrc = res.data.data[i].imagePath
                    res.data.data[i].name = res.data.data[i].bookName
                    res.data.data[i].level = res.data.data[i].depreciation
                }
                that.setData({
                    books: res.data.data
                })

            }
        })
    },

    /**
     * 跳转到图书详情子页面
     */
    showBookDetail: function(event) {
        var bookIndex = event.currentTarget.dataset.bookIndex
        var bookDetail = JSON.stringify(this.data.books[bookIndex])

        wx.navigateTo({
            url: '/pages/mall/book-detail/book-detail?bookDetail=' + escape(bookDetail),
        })
    }
})