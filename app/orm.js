const db = require('./connection')('library_managment_system', 'password123')



// ====================fatih=============================
// async function addCategory(input) {
//     return db.query('INSERT INTO category (category_name,category_des) values (?)', [input.category_name, input.category_des])
// }

// async function deleteCategory(id) {
//     return db.query(`DELETE FROM category WHERE id='${id}'`)

// }

// async function updateCategory(id, input) {
//     return db.query(`UPDATE category SET category_name = '${input.category_name}' AND category_des='${input.category_des}' WHERE id = ${id}`)
// }

// ===============================george==================================================
// the pramater is a object {memberID, firstName, lastName, phoneNum, email, address}
async function addMember(data) {
    let result = await db.query('INSERT INTO member (firstName, lastName, phoneNumber, email, address) VALUES (?,?,?,?,?)',
        [data.firstName, data.lastName, data.phoneNumber, data.email, data.address])
    console.log(result)
}





// ================================end==================================================

module.exports = { addMember }

