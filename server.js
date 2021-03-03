const express = require('express')
const app = express()

const orm = require('./app/orm')

const PORT = process.env.PORT || 8080

// will share any static html files with the browser
app.use(express.static('public'))
// accept incoming POST requests
app.use(express.urlencoded({ extended: true }))
app.use(express.json())


// ======================= Member ===================================
// show all members
app.get('/api/members', async function (req, res) {
    const membersList = await orm.getMembers()
 
   
    res.send(membersList)
})

// to get memeber info by passing 

app.get('/api/member/:memberID', async function (req, res) {
    const id = req.params.memberID
    const member = await orm.getMember(id)
    res.send(member)
})

// add new member
app.post('/api/addmember/member', async (req, res) => {
    const rawData = req.body
    await orm.addMember(rawData)
    res.redirect('/allmembers.html')
})

// edit a member whose id is 'memberID'
app.post('/api/member/:memberID/update', function (req, res) {
    console.log('catching update url...')
    const id = parseInt(req.params.memberID)
    const data = req.body
    orm.updateMember(id, data)
    res.redirect('/allmembers.html')
})

app.get('/api/members', async function (req, res) {
    const membersList = await orm.getMembers()
    console.log(`[GET /api/quote] membersList`)
    res.send(membersList)
})

app.delete('/api/member/:id', function (req, res) {
    
    const memberId = req.params.id
    console.log(`[deleteMember]: ${memberId}`)
    orm.deleteMember(memberId)
    res.send('/allmembers.html')
})
// ======================== Member End ==============================


//==================== Book ======================

// Update book when member borrows  - Faisal

app.put("/api/borrow", async function (req, res) {
    const bookID = req.body.bookID.trim();
    const memberID = req.body.memberID.trim();
    console.log(bookID, memberID)
    const result = await orm.borrowBook(bookID, memberID)
    console.log("book has been updated")
    res.redirect('/index.html')
});

app.get('/api/availablebooks', async function (req, res) {
    const availableBooksList = await orm.getAvailableBook()
    console.log(`[GET /api/quote] availableBooksList`)
    res.send(availableBooksList)
})

app.get('/api/categoriesList', async function (req, res) {
    const categoriesList = await orm.getCategoriesList()
    console.log(`[GET /api/quote] categoriesList`)
    res.send(categoriesList)
})


//=====================CATEGORY====================

//          adding Category
app.post('/api/addcategory', async (req, res) => {
    const data = req.body
    console.log(data)
    let result = await orm.addCategory(data)

    res.redirect('/allcategory.html')
})
//          delete Category
app.delete('/api/deletecategory/:id', async (req, res) => {
    let id = req.params.id
    // console.log(id)
    let result = await orm.deleteCategory(id)
    res.send(result)

})
//             update Category

app.post('/api/category/:id/update', async (req, res) => {

    let data = req.body
    let id = req.params.id
    let result = await orm.updateCategory(id, data)

    res.redirect('/allcategory.html')
    
})

app.get('/api/category/:id', async (req, res) => {
    let id = req.params.id
    let result = await orm.getCategory(id)
    console.log(result)
    res.send(result)
})

//              category GET list

app.get('/api/categories', async (req, res) => {
    const data = await orm.viewCategories()
    res.send(data)


})
//===================END===================================


//======================Book============================


//                  addBook
app.post('/api/addbook', async (req, res) => {
    const bookData = req.body
    await orm.addBook(bookData)
    res.redirect('/index.html')
})
//                  updateBook
app.put('api/updatebook/:id', async (req, res) => {
    let data = req.body
    let id = req.params.id
    await orm.updateBook(id, data)
})
//                  deleteBook
app.delete('api/deletebook/:id', async (req, res) => {
    let id = req.params.id
    await orm.deleteBooks(id)
})

//                  viewBook by member
app.get('api/viewbook/member', async (req, res) => {
    await orm.viewBookMember()
})

//                  viewBook by name

app.get('api/viewbook/name', async (req, res) => {
    await orm.viewBookName()
    // need parameter for memeberName
})

//                  viewBook by category

app.get('api/viewbook/category', async (req, res) => {
    await orm.viewBookCategory()
    // need parameter for categoryName
})

// ===================END===================================


// Listener ==================================================
app.listen(PORT, function () {
    console.log(`Serving content on http://localhost:${PORT}`)
})
