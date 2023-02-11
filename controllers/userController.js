import ApiError from '../error/ApiError.js';
import { hash, compareSync } from 'bcrypt';
import jwt from 'jsonwebtoken';
import db from "../models/index.js";

const User = db.user;
const Basket = db.basket;


const generateJwt = (id, email, role) => {
    return jwt.sign(
        {id, email, role},
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
    )
}

export const registration = async (req, res, next) =>{
        const newUser = {
            email : req.body.email,
            password : req.body.password, 
            role: req.body.role,
          };

        if (!newUser.email || !newUser.password) {
            return next(ApiError.badRequest('Incorrect email or password'))
        }
        await User.findOne({where: {email: newUser.email}})
        .then((candidate) => {
            if (candidate) {
                return next(ApiError.badRequest('This user is already exist'))
            }
        })
   
        const hashPassword = await hash(newUser.password, 5)
        newUser.password = hashPassword;
        const user = await User.create(newUser)
        const basket = await Basket.create({userId: user.id})
        const token = generateJwt(user.id, user.email, user.role)
        res.status(200).send({token})
    }

    export const login = async (req, res, next) =>{
        const {email, password} = req.body
        const user = await User.findOne({where: {email}})
        console.log(user)
        if (!user) {
            return next(ApiError.internal('Incorrect email or password'))
        }
        let comparePassword = compareSync(password, user.password)
        if (!comparePassword) {
            return next(ApiError.internal('Incorrect email or password'))
        }
        const token = generateJwt(user.id, user.email, user.role)
        res.status(200).send({token})
    }

    export const check = async (req, res, next) =>{
        const token = generateJwt(req.user.id, req.user.email, req.user.role)
        res.status(200).send({token})
    }

