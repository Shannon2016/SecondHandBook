var util = require('../../utils/util.js')
var app = getApp();
Page({
    /**
     * 页面的初始数据
     */
    data: {
        flag:0,
        show:false,
        currentDate: new Date().getTime(),
        formatter(type, value) {
        if (type === 'year') {
            return `${value}年`;
        } else if (type === 'month') {
            return `${value}月`;
        }
        return value;
        },
        uploadedImages: [],
        imgBoolean: true,

        picFilePath: "",
        bookType: 0,
        bookName: "",
        bookPress: "",
        bookDate: "选择日期",
        bookAuthor: "",
        bookDepreciation: 0,
        bookISBN: "",
        bookPrice: 0.00,
        bookDescription: "",
    },
    confirmCloseTimePicker:function(){
        this.setData({
            show: false,
            flag:this.data.flag+1
        })
    },
    
    cancelCloseTimePicker:function(){
        this.setData({
            show: false
        })
    },
    showTimePicker:function(){
        this.setData({
            show:true
        })
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
    getBookDate: function (event) {
        console.log(event)
        var date = new Date(event.detail)
        this.setData({
            bookDate: (date.getYear()+1900)+'-'+(date.getMonth()+1)+'-'+date.getDate()
        });
        console.log(this.data.bookDate);
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
  
        if(this.judge()){
            wx.uploadFile({
                url: app.globalData.URLPREFIX + 'files/upload',
                filePath: picFilePath,
                name: 'newPic',
                header:{
                    Cookie:app.globalData.cookie
                },
                method:'POST',
                success(res){
                    res.data = JSON.parse(res.data);
                    console.log(res.data.data[0])

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
                            imageURL: app.globalData.PICPREFIX + res.data.data[0],
                            press: press,
                            author: author,
                            publishedDate: date,
                            depreciation: level,
                            ISBN: ISBN,
                            price: price,
                            description: description
                        },
                        success(res) {
                            if(res.data.code === 0){
                                wx.redirectTo({
                                    url: '/pages/person-center/my-sell/my-sell',
                                })
                            }
                            else{
                                wx.showToast({
                                    title: '网络连接错误',
                                })
                            }
                        }
                    })
                },
                fail(res){
                    wx.showToast({
                        title: '网络连接错误',
                    })
                }
            })
            
        }

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

    //判断输入是否正确
    judge: function () {
        var that = this;
        //类型不能为空
        if (that.data.bookType <= 0) {
            wx.showToast({
                title: "请选择书的类型",
                image: '../../image/tan.png',
                mask: false,
            });
            return false;
        }
        //书名不能为空
        if (that.data.bookName.length <= 0) {
            wx.showToast({
                title: "书名不能为空",
                image: '../../image/tan.png',
                mask: false,
            });
            return false;
        }
        //出版社不能为空
        if (that.data.bookPress.length <= 0) {
            wx.showToast({
                title: "出版社不能为空",
                image: '../../image/tan.png',
                mask: false,
            });
            return false;
        }

        //出版日期不能为空
        if (that.data.bookDate) {
        }else{
            wx.showToast({
                title: "日期不能为空",
                image: '../../image/tan.png',
                mask: false,
            });
        }


        //作者不能为空
        if (that.data.bookAuthor.length <= 0) {
            wx.showToast({
                title: "作者不能为空",
                image: '../../image/tan.png',
                mask: false,
            });
            return false;
        }
        //图书新旧范围1——10
        if (that.data.bookDepreciation <= 0 || that.data.bookDepreciation > 10) {
            wx.showToast({
                title: "图书新旧输入错误",
                image: '../../image/tan.png',
                mask: false,
            });
            return false;
        }

        //图书号不能为空
        if (that.data.bookISBN.length <= 0) {
            wx.showToast({
                title: "图书号不能为空",
                image: '../../image/tan.png',
                mask: false,
            });
            return false;
        }
        else if (that.data.bookISBN.length < 13) {
            wx.showToast({
                title: "图书号格式错误",
                image: '../../image/tan.png',
                mask: false,
            });
            return false;
        }

        //价格>0
        if (that.data.bookPrice <= 0) {
            wx.showToast({
                title: "价格输入错误",
                image: '../../image/tan.png',
                mask: false,
            });
            return false;
        }
        return true;
    }



})