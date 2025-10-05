// 1️⃣ Find all books in a specific genre (e.g. Fiction)
db.books.find({ genre: "Fiction" })

// 2️⃣ Find books published after a certain year (e.g. after 1950)
db.books.find({ published_year: { $gt: 1950 } })

// 3️⃣ Find books by a specific author (e.g. George Orwell)
db.books.find({ author: "George Orwell" })

// 4️⃣ Update the price of a specific book (e.g. The Hobbit)
db.books.updateOne(
  { title: "The Hobbit" },
  { $set: { price: 16.99 } }
)

// 5️⃣ Delete a book by its title (e.g. Moby Dick)
db.books.deleteOne({ title: "Moby Dick" })

// 1️⃣ Find books that are both in stock and published after 2010
db.books.find({
  in_stock: true,
  published_year: { $gt: 2010 }
})

// 2️⃣ Projection: return only title, author, and price fields
db.books.find(
  {},
  { title: 1, author: 1, price: 1, _id: 0 }
)

// 3️⃣ Sorting by price ascending
db.books.find().sort({ price: 1 })

// 4️⃣ Sorting by price descending
db.books.find().sort({ price: -1 })

// 5️⃣ Pagination - page 1 (5 books per page)
db.books.find().skip(0).limit(5)

// 6️⃣ Pagination - page 2 (5 books per page)
db.books.find().skip(5).limit(5)

// 1️⃣ Average price of books by genre
db.books.aggregate([
  { $group: { _id: "$genre", avgPrice: { $avg: "$price" } } },
  { $sort: { avgPrice: -1 } }
])

// 2️⃣ Author with the most books
db.books.aggregate([
  { $group: { _id: "$author", totalBooks: { $sum: 1 } } },
  { $sort: { totalBooks: -1 } },
  { $limit: 1 }
])

// 3️⃣ Group books by publication decade and count
db.books.aggregate([
  {
    $group: {
      _id: { $floor: { $divide: ["$published_year", 10] } },
      count: { $sum: 1 }
    }
  },
  {
    $project: {
      decade: { $multiply: ["$_id", 10] },
      count: 1,
      _id: 0
    }
  },
  { $sort: { decade: 1 } }
])

// 1️⃣ Create an index on the title field
db.books.createIndex({ title: 1 })

// 2️⃣ Create a compound index on author and published_year
db.books.createIndex({ author: 1, published_year: -1 })

// 3️⃣ Use explain() to show performance difference before & after indexing
db.books.find({ title: "The Hobbit" }).explain("executionStats")


