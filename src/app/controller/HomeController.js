const { render } = require('node-sass')
const BaiViet = require('../models/baiviet')
class HomeController {
    index(req, res, next) {
        res.render('home')

    }
    lienhe(req, res, next) {
        res.render('lienhe/lienhe')
    }
    gioithieu(req, res) {
        BaiViet.getAllGioiThieu((err, baiviet) => {
            if (err) {
                console.log('Lỗi truy vấn ', err)
            }
            else {
                res.render('news/detail', { baiviet: baiviet[0] })
            }
        })
    }

    baiviet(req, res, next) {
        const slug = req.params.slug

        BaiViet.getDetailBaiViet(slug, (err, baiviet) => {
            if (err) {
                console.log('Lỗi truy vấn ', err)
            }
            else {
                res.render('news/detail', { baiviet: baiviet[0] })
            }
        })

    }
    tintuc(req, res, next) {
        const page = parseInt(req.query.page) || 1; // Trang hiện tại
        const pageSize = 6; // Kích thước trang
        const startIndex = (page - 1) * pageSize;
        const endIndex = page * pageSize;

        BaiViet.getAllTinTuc((err, data) => {
            if (err) {
                console.log('Lỗi truy vấn ', err)
            }
            else {
                const totalPages = Math.ceil(data.length / pageSize);
                const pages = Array.from({ length: totalPages }, (_, index) => {
                    return {
                        number: index + 1,
                        active: index + 1 === page,
                    };
                });
                const paginatedData = data.slice(startIndex, endIndex);
                paginatedData.title = 'test'
                // Chuẩn bị dữ liệu để truyền vào template
                const viewData = {

                    tintuc: paginatedData,
                    pagination: {
                        prev: page > 1 ? page - 1 : null,
                        next: endIndex < data.length ? page + 1 : null,
                        pages: pages,
                    },
                };
                // Render template và truyền dữ liệu
                res.render('news/store', viewData);
            }
        })

    }
    timkiem(req, res, next) {
        const page = parseInt(req.query.page) || 1;
        const pageSize = 9;
        const startIndex = (page - 1) * pageSize;
        const endIndex = page * pageSize;
        const searchTerm = req.query.search || '';
        BaiViet.searchBaiVietByNameClient(searchTerm, (err, data) => {
            if (err) {
                console.log('Lỗi truy vấn ', err)
            }
            else {
                const totalPages = Math.ceil(data.length / pageSize);
                const pages = Array.from({ length: totalPages }, (_, index) => {
                    return {
                        number: index + 1,
                        active: index + 1 === page,
                        isDots: index + 1 > 5
                    };
                });
                const paginatedData = data.slice(startIndex, endIndex);
                // Chuẩn bị dữ liệu để truyền vào template
                const viewData = {
                    data: paginatedData,
                    searchTerm,

                    pagination: {
                        // valuecurrent: searchTerm,
                        prev: page > 1 ? page - 1 : null,
                        next: endIndex < data.length ? page + 1 : null,
                        pages: pages,
                    },
                };
                // Render template và truyền dữ liệu
                res.render('search/search', viewData);
            }
        })
    }
    error404(req, res) {
        res.render('error404/error')
    }
}
module.exports = new HomeController