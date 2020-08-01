require('dotenv').config();

const express = require('express')

const mongoose = require('mongoose');

// Import middleware
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const compression = require('compression')
const helmet = require('helmet')
const cors = require('cors')

// Setup default port
const PORT = process.env.PORT || 4000

// Create express app
const app = express()

// db setup
const MONGO_URI = `mongodb://localhost:27017/foodie`;
if (!MONGO_URI) {
  throw new Error('You must provide a mongodb URI');
}

mongoose.Promise = global.Promise;

mongoose.connect(MONGO_URI, { useNewUrlParser: true })
mongoose.connection
  .once('open', () => console.log('Connected to MongoDB instance.'))
  .on('error', error => console.log('Error connecting to MongoDB:', error));

require('./schema/groupSchema')

  // Import routes
const groupRouter = require('./routes/group-route')
const searchRouter = require('./routes/search-route')

// Implement middleware
app.use(cors())
app.use(helmet())
app.use(compression())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(bodyParser.json())

if (process.env.NODE_ENV && process.env.NODE_ENV !== 'development') {
    app.get('*', (req, res) => {
      res.sendFile('build/index.html', { root: __dirname })
  })
}

app.use('/api/group', groupRouter)

app.use('/api/search', searchRouter)

// Implement route for errors
app.use((err, req, res, next) => {
   console.error(err.stack)

   res.status(500).send('Something broke!')
})

// Start express app
app.listen(PORT, function() {
  console.log(`Server is running on: ${PORT}`)
})
