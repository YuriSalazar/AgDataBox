const connection = require('../DataBase/connection');
const crypto = require('crypto');
const { create } = require('./SessionController');
const { index } = require('./CultureController');

module.exports = {
    async create(req,res){
        const{name,year} = req.body;
        const user_id = req.headers.authorization;
        const id = crypto.randomBytes(4).toString('HEX');

        await connection('machine').insert({
            id,
            name,
            year,
            user_id
        })

        return res.json({id});
    },

    async index(req,res){
        const machines = await connection('machine').select('*');
        return res.json(machines);
    },

    async delete(req,res){
        
        const {id} = req.params;
     
        try{
        await connection('machine').where('id',id).delete();

        return res.status(204).send();

        }catch(error){
            console.log(error);
            return res.status(401).send();
        }
        
    }
}