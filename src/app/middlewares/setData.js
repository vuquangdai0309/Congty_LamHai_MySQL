const BaiViet = require('../models/baiviet')
const setCommonData = (req, res, next) => {
    // Truy vấn dữ liệu chung nếu cần
    BaiViet.getAllDichVu((err, dichvu) => {
        if (err) {
            console.log('lỗi truy vấn', err)
        }
        BaiViet.getTinTucNew(5, (err, latestPosts) => {
            if (err) {
                console.log('lỗi truy vấn', err)
            }
            BaiViet.getTow_TinTucNew(2, (err, TintucNew) => {
                if (err) {
                    console.log('lỗi truy vấn', err)
                }
                else {
                    // Truyền dữ liệu cho tất cả các trang
                    res.locals = Object.assign(res.locals, { dichvu, latestPosts,TintucNew });
                    // Tiếp tục xử lý middleware tiếp theo
                    next();
                }
            })

        })
    })
};

module.exports = setCommonData;