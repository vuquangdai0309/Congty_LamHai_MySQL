const connection = require('../../config/db/index')
const CategoryModel = {
    getAllCategorys: (callback) => {
        const query = 'SELECT * FROM category';
        connection.query(query, callback);
    },
}
module.exports = CategoryModel