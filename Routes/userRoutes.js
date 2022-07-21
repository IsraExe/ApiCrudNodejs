import express from 'express'
import Users from '../models/user.js'
import capitalizeProperties from '../utils/capitalize.js'

const router = express.Router()

router.get('/getall', async (req, res) => {
    try {
        const AllUsers = await Users.find({})
        if (!AllUsers) return res.status(500).send({ err: 'Erro na consulta de usuários'})
        return res.status(200).send(AllUsers)
    } catch (error) {
        return res.status(500).send(error)
    }
})
 
router.get('/finduser', async (req, res) => {
    const {username} = req.query 

    if (!username ) return res.status(400).send({err: 'Username or created required!'})
    
    try {
        const schemaUsersTree = Users.find({}).schema.tree
        console.log(Object.keys(schemaUsersTree))
        const userFound = await Users.findOne({username}) 
        if (!userFound) return res.status(400).send({err: "Usuário não encontrado!"}) 
        return res.status(200).send(userFound)
    } catch (error) {
        return res.status(500).send(error)
    }
})

router.post('/create', async (req, res) => {
    const {username, email} = req.query
    const query = req.query

    if (!username || !email) return res.status(400).send({msg: 'Username and email required!'})

    try {
        const checkUserExists = await Users.find({username}) || await Users.findOne({email})
        if (checkUserExists) return res.send({msg: 'Usuário já registrado'})
        
        const createdUser = await Users.create(query)
        return res.status(202).send(createdUser)
    } catch (error) {
        return res.status(500).send(error)
    }
})

router.patch('/update/:username', async (req, res) => {
    const fields = ['username', 'email'];

    const username = req.params.username;
    const query = req.query;
    const params = Object.keys(query);

    if (params.length === 0) return res.status(400).send({ message: 'Empty query' });

    for (let param of params) {
        if (!fields.includes(param)) return res.status(406).send({ message: 'Algum campo inserido não existe ou não pode ser alterado!' });
    }

    try {
        const user = await Users.findOne({ username });

        if (user) {
            const updatedUser = await Users.findByIdAndUpdate(user.id, query, { new: true });
            
            return res.status(202).send(updatedUser);
        } else {
            return res.status(406).send({ message: 'User not found' });
        }
    } catch (err) {
        return res.status(400).send({ message: err.message });
    }
})

router.delete('/delete', async (req, res) => {
    const {username, email} = req.query
    
    const capitalize = capitalizeProperties(req)

    try {
        if (!username && !email) return res.status(400).send({msg: 'Username or email required'})
        const checkUser = await Users.findOneAndDelete({username}) || await Users.findOneAndDelete({email}) 
        if (!checkUser) return res.status(400).send({msg: `${capitalize} não encontrado!`})
        return res.status(410).send({msg: 'Usuário deletado'})  
    } catch (error) {
        return res.status(500).send(error)  
    }
})

export default router