Page({

    /**
     * 页面的初始数据
     */
    data: {
        level: ["一", "二", "三", "四", "五", "六", "七", "八", "九", "十"]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var bookDetail = JSON.parse(unescape(options.bookDetail))
        this.setData({
            bookDetail: bookDetail
        })
    },

    catchToCartTap: function () {
        wx.switchTab({
            url: '/pages/cart/cart',
        })
    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {
        wx.stopPullDownRefresh()
    },

    catchAddCartTap: function () {
        //我又动手了
        console.log(this.data.bookDetail)
        var app = getApp();
        wx.request({
            url: app.globalData.URLPREFIX + 'shoppingcart/add',
            header: {
                Cookie: app.globalData.cookie
            },
            method: 'POST',
            data: {
                bookId: this.data.bookDetail.id,
                number: 1
            },
            success(res) {
                console.log(res);
                if (res.data.code !== 0) {
                    wx.showToast({
                        title: '网络连接错误',
                        icon: 'none'
                    })
                    return
                }
            }
        })

        var bookList = wx.getStorageSync('bookList')
        var bookId = this.data.bookDetail.id

        if (bookList) {
            var count = bookList.length

            for (var i = 0; i < count; i++) {
                if (bookList[i] == bookId) {
                    wx.showToast({
                        title: '购物车中已有',
                    })
                    return
                }
            }

            bookList[count] = bookId
        } else {
            bookList = []
            bookList[0] = bookId
            wx.showToast({
                title: '已加入购物车',
            })
        }

        wx.setStorageSync('bookList', bookList)
    },

    catchBuyTap: function () {
        var book = this.data.bookDetail;
        wx.redirectTo({
            url: '/pages/order/order?price=' + book.price + '&picSrc='+ book.picSrc + '&bookName='+book.name+'&author='+book.author+'&press='+book.press+'&id='+book.id 
        })
    }
})