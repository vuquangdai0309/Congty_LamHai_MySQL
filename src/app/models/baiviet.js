const connection = require('../../config/db/index');
const BaiVietModel = {
  getAllBaiViets: (callback) => {
    const query = `
    SELECT baiviet.*, category.name AS category
        FROM baiviet
        JOIN category ON baiviet.category_id = category._id
        WHERE baiviet.is_deleted = 0 ORDER BY STR_TO_DATE(baiviet.createdAt, "%d-%m-%Y")
    `
    connection.query(query, callback);
  },
  trashGetAllBaiViets: (callback) => {
    const query = ` SELECT baiviet.*, category.name AS category
    FROM baiviet
    JOIN category ON baiviet.category_id = category._id
    WHERE baiviet.is_deleted = 1 `;
    connection.query(query, callback);
  },
  getBaiVietById: (BaiVietId, callback) => {
    const query = 'SELECT * FROM baiviet WHERE _id = ?';
    connection.query(query, [BaiVietId], callback);
  },

  addBaiViet: (BaiViet, callback) => {
    BaiViet.date = new Date()
    const query = 'INSERT INTO baiviet (title, image,category_id,content,slug,date,createdAt) VALUES (?,?,?,?,?,?,?)';
    const values = [BaiViet.title, BaiViet.image, BaiViet.category_id, BaiViet.content, BaiViet.slug, BaiViet.date, BaiViet.createdAt];
    connection.query(query, values, callback);
  },

  updateBaiViet: (BaiVietId, BaiViet, callback) => {
    BaiViet.date = new Date()
    const query = 'UPDATE baiviet SET title = ?, image = ?,content = ?,category_id = ?,slug = ?,date = ?,createdAt =?  WHERE _id = ?';
    const values = [BaiViet.title, BaiViet.image, BaiViet.content, BaiViet.category_id, BaiViet.slug, BaiViet.date, BaiViet.createdAt, BaiVietId];
    connection.query(query, values, callback);
  },

  deleteBaiViet: (BaiVietId, callback) => {
    const query = 'UPDATE baiviet SET is_deleted = 1 WHERE _id = ?';
    connection.query(query, [BaiVietId], callback);
  },
  deleteAllBaiVietsWithId: (idsToDelete, callback) => {
    const query = 'UPDATE baiviet SET is_deleted = 1 WHERE _id IN (?)';
    connection.query(query, [idsToDelete], callback);
  },
  restoreBaiViet: (BaiVietId, callback) => {
    const query = 'UPDATE baiviet SET is_deleted = 0 WHERE _id = ?';
    connection.query(query, [BaiVietId], callback);
  },
  forceDestroyBaiViet: (BaiVietId, callback) => {
    const query = 'DELETE FROM baiviet WHERE _id = ?';
    connection.query(query, [BaiVietId], callback);
  },
  forceDestroyAllSelectedBaiViet: (BaiVietId, callback) => {
    const query = 'DELETE FROM baiviet WHERE _id IN (?)';
    connection.query(query, [BaiVietId], callback);
  },
  restoreAllSelectedBaiViet: (BaiVietId, callback) => {
    const query = 'UPDATE baiviet SET is_deleted = 0 WHERE _id IN (?)';
    connection.query(query, [BaiVietId], callback);
  },
  //tìm kiếm trang admin
  searchBaiVietByName: (title, callback) => {
    const sql =
      `
    SELECT baiviet.*, category.name AS category
    FROM baiviet
    JOIN category ON baiviet.category_id = category._id
    WHERE baiviet.is_deleted = 0 AND title LIKE ?
    `
    const searchName = '%' + title + '%';
    connection.query(sql, [searchName], callback);
  },
  //tìm kiếm trang client
  searchBaiVietByNameClient: (title, callback) => {
    const sql = 'SELECT * FROM baiviet WHERE is_deleted =0 AND title LIKE ?';
    const searchName = '%' + title + '%';
    connection.query(sql, [searchName], callback)
  },
  // lấy những bản ghi có loại là dịch vụ
  getAllDichVu: (callback) => {
    const query = 'SELECT * FROM baiviet WHERE is_deleted =0 AND category_id = ?'
    connection.query(query, 2, callback);
  },

  // lấy những bản ghi có loại là tin tức
  getAllTinTuc: (callback) => {
    const query = 'SELECT * FROM baiviet WHERE is_deleted =0 AND category_id = ? ORDER BY STR_TO_DATE(createdAt, "%d-%m-%Y")'
    connection.query(query, 3, callback);
  },
  // lấy những bản ghi có loại là giới thiệu
  getAllGioiThieu: (callback) => {
    const query = 'SELECT * FROM baiviet WHERE is_deleted =0 AND category_id = ?'
    connection.query(query, 1, callback);
  },
  // lấy 5 bản ghi có loại là tin tức mới nhất
  getTinTucNew: (quantity, callback) => {
    const query = `SELECT * FROM baiviet WHERE is_deleted =0 AND category_id = ? ORDER BY STR_TO_DATE(createdAt, "%d-%m-%Y") LIMIT ${quantity}`
    connection.query(query, 3, callback);
  },
  getTow_TinTucNew: (quantity, callback) => {
    const query = `SELECT * FROM baiviet WHERE is_deleted =0 AND category_id = ? ORDER BY STR_TO_DATE(createdAt, "%d-%m-%Y") DESC LIMIT ${quantity}`
    connection.query(query, 3, callback);
  },
  // lấy chi tiết bài viết
  getDetailBaiViet: (slug, callback) => {
    const query = 'SELECT * FROM baiviet WHERE slug = ?';
    connection.query(query, [slug], callback)
  },
  // đếm số lượng bài viết tin tức
  countBaiVietTinTuc: (callback) => {
    const query = `SELECT COUNT(*) AS baivietCount FROM baiviet WHERE category_id = 3 AND is_deleted = 0`;
    connection.query(query, (error, results, fields) => {
      if (error) {
        return callback(error, null);
      }
      const baivietCount = results[0].baivietCount;
      callback(null, baivietCount);
    });
  },

  // đếm số lượng bài viết tin tức
  countBaiVietDichVu: (callback) => {
    const query = `SELECT COUNT(*) AS baivietCount FROM baiviet WHERE category_id = 2 AND is_deleted = 0`;
    connection.query(query, (error, results, fields) => {
      if (error) {
        return callback(error, null);
      }
      const baivietCount = results[0].baivietCount;
      callback(null, baivietCount);
    });
  }

};

// Export model để sử dụng ở nơi khác trong ứng dụng
module.exports = BaiVietModel;