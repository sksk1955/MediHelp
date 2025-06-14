import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import chatRouter from './routes/chatRoute.js'

// App config
const app = express()
const port = process.env.PORT || 4000

// Middleware
app.use(express.json())
app.use(cors({
  origin: [
    'https://your-medihelp-frontend.onrender.com'],
  methods: ['GET', 'POST', 'OPTIONS'],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization']
}))

// Preflight handler
app.options('*', cors())

// API endpoints
app.use('/api', chatRouter);

// Health check route
app.get('/', (req, res) => {
  res.send('API Working')
})

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: err.message
  })
})

// Start server
app.listen(port, () => console.log(`Server started on PORT: ${port}`))