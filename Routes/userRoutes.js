import express from 'express'
import Users from '../models/user.js'
import capitalizeProperties from '../utils/capitalize.js'

const router = express.Router()

router.get('/getall', async (req, res) => {
    try {
        const user = await Users.find({})
        if (!user) return res.status(500).send({ err: 'Erro na consulta de usuários'})
        return res.status(200).send(user)
    } catch (error) {
        return res.status(500).send(error)
    }
})

// you can find a user by username or data 
router.get('/finduser', async (req, res) => {
    const {username, created} = req.query 

    if (!username && !created) return res.status(400).send({err: 'Username or created required!'})
    
    try {
        const user = Users.find({username}) 
        if (!user) return res.status(400).send({err: "Usuário não encontrado!"}) 
        return res.status(200).send(user)
    } catch (error) {
        return res.status(500).send(error)
    }
})

router.post('/create', async (req, res) => {
    const {username, email} = req.query
    const query = req.query

    if (!username || !email) return res.status(400).send({msg: 'Username and email required!'})

    try {
        const user = await Users.find({username}) || await Users.findOne({email})
        if (user) return res.send({msg: 'Usuário já registrado'})
    
        const createdUser = await Users.create(query)
        return res.status(202).send(createdUser)
    } catch (error) {
        return res.status(500).send(error)
    }
})

router.delete('/delete', async (req, res) => {
    const {username, email} = req.query
    
    const capitalize = capitalizeProperties(req)

    try {
        if (!username && !email) return res.status(400).send({msg: 'Username or email required'})
        const user = await Users.findOneAndDelete({username}) || await Users.findOneAndDelete({email}) 
        if (!user) return res.status(400).send({msg: `${capitalize} não encontrado!`})
        return res.status(410).send({msg: 'Usuário deletado'})  
    } catch (error) {
        return res.status(500).send(error)  
    }
})

export default router