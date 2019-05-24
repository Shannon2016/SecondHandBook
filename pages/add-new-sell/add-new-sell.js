var util = require('../../utils/util.js')
var app = getApp();
Page({
    /**
     * 页面的初始数据
     */
    data: {
        uploadedImages: [],
        imgBoolean: true,

        picFilePath: "",
        bookType: 0,
        bookName: "",
        bookPress: "",
        bookDate: "",
        bookAuthor: "",
        bookDepreciation: 0,
        bookISBN: "",
        bookPrice: 0.00,
        bookDescription: "",
    },
    //书的类型
    getType: function (e) {
        var that = this;
        var a = parseInt(e.target.dataset.classid)
        that.setData({
            bookType: a,
        });
        console.log(that.data.bookType);
    },
    //书的名字
    getName: function (e) {
        var that = this;
        var a = e.detail.value;
        that.setData({
            bookName: a,
        });
        console.log(that.data.bookName);
    },
    //书的出版社
    getPress: function (e) {
        var that = this;
        var a = e.detail.value;
        that.setData({
            bookPress: a,
        });
        console.log(that.data.bookPress);
    },
    //书的出版日期
    getBookDate: function (e) {
        var that = this;
        var a = e.detail.value;
        var date = new Date(a);
        that.setData({
            bookDate: a,
        });
        console.log(that.data.bookDate);
    },
    //书的作者
    getAuthor: function (e) {
        var that = this;
        var a = e.detail.value;
        that.setData({
            bookAuthor: a,
        });
        console.log(that.data.bookAuthor);
    },
    //书的新旧
    getDepreciation: function (e) {
        var that = this;
        var a = parseInt(e.detail.value);
        if (a >= 1 && a <= 10)
            that.setData({
                bookDepreciation: a,
            });
        else
            console.log("错误输入");
        console.log(that.data.bookDepreciation);
    },
    //书的ISBN
    getISBN: function (e) {
        var that = this;
        var a = e.detail.value;
        that.setData({
            bookISBN: a,
        });
        console.log(that.data.bookISBN);
    },
    //书的价格
    getPrice: function (e) {
        var that = this;
        var a = parseFloat(e.detail.value);
        that.setData({
            bookPrice: a,
        });
        console.log(that.data.bookPrice);
    },
    //详细描述
    getDescription: function (e) {
        var that = this;
        var a = e.detail.value;
        that.setData({
            bookDescription: a,
        });
        console.log(that.data.bookDescription);
    },

    //提交
    addNewSell: function (userId, picFilePath, classId, name,
        press, date, author, level, ISBN, price, description) {
        var that = this;
        //获取用户名
        userId = "";
        picFilePath = that.data.picFilePath;
        classId = that.data.bookType;
        name = that.data.bookName;
        press = that.data.bookPress;
        date = that.data.bookDate;
        author = that.data.bookAuthor;
        level = that.data.bookDepreciation;
        ISBN = that.data.bookISBN;
        price = that.data.bookPrice;
        description = that.data.bookDescription;
        console.log(date);
        console.log(description);

        wx.request({
            url: app.globalData.URLPREFIX + 'sells/add',
            header: {
                Cookie: app.globalData.cookie
            },
            method: 'POST',
            data: {
                bookName: name,
                remaining: 1,
                category: classId,
                imageURL: picFilePath,
                press: press,
                author: author,
                publishedDate: date,
                depreciation: level,
                ISBN: ISBN,
                price: price,
                description: description
            },
            success(res) {
                console.log(picFilePath);
                wx.uploadFile({
                    url: app.globalData.URLPREFIX,
                    filePath: picFilePath,
                    name: picFilePath,
                    fail(res) {
                        wx.showToast({
                            title: '出错了',
                        })
                    }
                })
            }
        })

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {
        wx.stopPullDownRefresh()
    },

    //选择图片
    chooseImage: function () {
        var that = this;
        // 选择图片
        wx.chooseImage({
            count: 1, //只能选1张图片
            sizeType: 'compressed', // 上传后压缩
            sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机
            success: function (res) {
                // 返回选定照片的本地文件路径列表
                var tempFilePaths = res.tempFilePaths //tempFilePath作为img标签的src属性显示图片
                that.setData({
                    item: tempFilePaths[0],
                    imgBoolean: false,
                    picFilePath: tempFilePaths[0]
                });
                console.log(that.data.picFilePath);
            }
        })
    },
    // 图片预览
    previewImage: function (e) {
        var current = e.target.dataset.src
        wx.previewImage({
            current: current,
            urls: [current]
        })
    },
    //删除图片
    deleteImg: function (e) {
        var that = this;
        var images = that.data.uploadedImages;
        that.setData({
            uploadedImages: images,
            imgBoolean: true,
            picFilePath: ""
        });
    },


})