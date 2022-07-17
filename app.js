import express from 'express'
import userRoute from './Routes/userRoutes.js'

const port = 3000
const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get('/', (req, res) => {
    return res.status(200).send({msg: 'Está API já está no ar!'})
})

app.use('/user', userRoute)

app.listen(port, () => {
    console.log(`Rodando na porta ${port}`)
})