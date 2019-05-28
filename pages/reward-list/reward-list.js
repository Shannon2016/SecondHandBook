const app = getApp()

function myRequest({
    url,
    data=null,
    method='get'
}) {
    return new Promise((success, fail) => {
        wx.request({
            url: app.globalData.URLPREFIX + url,
            header: {
                'Cookie': app.globalData.cookie
            },
            data,
            method,
            success,
            fail
        })
    })
}


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
    getRewardList: function () {
        var that = this;
        wx.request({
            url: app.globalData.URLPREFIX + 'rewards/getAll',
            header:{
                Cookie:app.globalData.cookie
            },
            method:'GET',
            success(res){
                console.log(res)
                if (res.data.code !== 0) {
                    wx.showToast({
                        title: '网络连接错误',
                    })
                    return;
                }
                for(var i of res.data.data){
                    i.name = i.bookName;
                    i.picSrc = i.imagePath
                }
                that.setData({
                    books:res.data.data
                })
            },
            fail(res){
                console.log(res)
                wx.showToast({
                    title: '网络连接错误',
                })
            }
        })
    },

    onShow(){
        this.getRewardList();
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
        var book = this.data.books[index];
        book.ISBN = book.isbn;
        book.imageURL = book.imagePath;
        book.remaining = 1;
        myRequest({
            url:'sells/add',
            data:book,
            method:'POST'
        }).then(res=>{
            // console.log(res.data.code)
            if(res.data.code === 0){
                wx.showToast({
                    title: '售卖成功',
                })
                setTimeout(()=>{
                    wx.switchTab({
                        url: '/pages/mall/mall',
                    })
                },2000)
            }
        })
    },

    catchAddRewardTap: function() {
        wx.navigateTo({
            url: '/pages/add-reward/add-reward',
        })
    }
})