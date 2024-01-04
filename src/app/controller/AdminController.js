const Baiviet = require('../models/baiviet')

class AdminController {
    index(req, res, next) {
        Baiviet.countBaiVietTinTuc((error, Tintuc) => {
            if (error) {
                return res.status(500).send('Internal Server Error');
            }
            Baiviet.countBaiVietDichVu((error, DichVu) => {
                if (error) {
                    return res.status(500).send('Internal Server Error');
                }
                else {
                    res.render('admin/manager', { Tintuc, DichVu });
                }
            })
        })
    }
    // Promise.all([Baiviet.find({ category: { $regex: 'dịch vụ', $options: 'i' } }).countDocuments(),
    // Baiviet.find({ category: { $regex: 'tin tức', $options: 'i' } }).countDocuments(),])

    //     .then(([dichvu, tintuc]) => { res.render('admin/manager', { dichvu, tintuc }) })
    //     .catch(next)
}

module.exports = new AdminController