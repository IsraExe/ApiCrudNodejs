import mongoose from 'mongoose'
import privateVariables from '../privateVariables.js'

const dbUrl = privateVariables.dbUrl

const conexao = function() {
    mongoose.connect(dbUrl)  

    mongoose.connection.on('connected', () => {
        console.log('Aplicação conectada ao banco de dados')
    })

    mongoose.connection.on('disconnected', () => {
        console.log('Aplicação desconectada do banco de dados')
    })

    mongoose.connection.on('error', (err) => {
        console.log(err)
    })
}

export default conexao()