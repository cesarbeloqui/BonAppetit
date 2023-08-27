const server = require('./src/app.js')
const { conn } = require('./src/db.js')
require('dotenv').config()
const { PORT } = process.env

// Syncing all the models at once.
conn
	.sync({ force: true, alter: true })
	.then(() => {
		server.listen(PORT || 3001, () => {
			console.log(`Server listening at ${PORT}`)
		})
	})
	.catch((error) => console.log(error.message))
