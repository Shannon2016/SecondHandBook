Page({

    /**
     * 页面的初始数据
     */
    data: {
        level: ["一", "二", "三", "四", "五", "六", "七", "八", "九", "十"],
        type: ["公务员", "考研", "四六级", "考律师", "基础教材", "畅销书", "会计", "其它"]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        var bookDetail = JSON.parse(unescape(options.bookDetail))
        bookDetail.pulishedDate = bookDetail.pulishedDate.substring(0, 10)
        bookDetail.type = this.data.type[bookDetail.category - 1]
        this.setData({
            bookDetail: bookDetail
        })
    },

    catchToCartTap: function() {
        wx.switchTab({
            url: '/pages/cart/cart',
        })
    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {
        wx.stopPullDownRefresh()
    },
    catchAddCartTap: function () {
        var that = this
        var app = getApp();

        /**
         * 获取当前购物车信息，判断是否已有此书籍，没有则添加
         */
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

                var bookList = res.data.data
                var bookId = that.data.bookDetail.id

                if (bookList) {
                    for (var i = 0; i < bookList.length; i++) {
                        if (bookList[i].bookId === bookId) {
                            wx.showToast({
                                title: '购物车中已有',
                            })
                            return
                        }
                    }
                }

                wx.request({
                    url: app.globalData.URLPREFIX + 'shoppingcart/add',
                    header: {
                        Cookie: app.globalData.cookie
                    },
                    method: 'POST',
                    data: {
                        bookId: that.data.bookDetail.id,
                        number: 1
                    },
                    success(res) {
                        if (res.data.code !== 0) {
                            wx.showToast({
                                title: '已放入购物车',
                            })
                            return
                        }
                    },
                    fail(res) {
                        wx.showToast({
                            title: '网络连接错误',
                            icon: 'none'
                        })
                    }
                })
            },
            fail(res) {
                wx.showToast({
                    title: '网络连接错误',
                    icon: 'none'
                })
            }
        })
    },


    catchBuyTap: function() {
        var book = this.data.bookDetail;
        wx.redirectTo({
            url: '/pages/order/order?price=' + book.price + '&picSrc=' + book.picSrc + '&bookName=' + book.name + '&author=' + book.author + '&press=' + book.press + '&id=' + book.id
        })
    }
})