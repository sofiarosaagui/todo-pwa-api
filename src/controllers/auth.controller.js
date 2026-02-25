import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function register(req,res){
    try {
        const {name,email,password} = req.body;
        if(!name || !email || !password){
            return res.status(400).json({message:'Por favor llena todos los campos'});
        }
        const exists = await User.findOne({email});
        if(exists) return res.status(409).json({message:'El usuario ya existe, carnal'});

        const hash = await bcrypt.hash(password,10);
        const user = new User({name,email,password:hash});
        await user.save();
        const token = jwt.sign({id:user.id},process.env.JWT_SECRET || 'changeme',{expiresIn:'7d'});

        res.status(201).json({token,user:{id:user.id,name:user.name,email:user.email}});
    } catch (error) {
        res.status(500).json({message:'error en el servidor:' + error});
    }
}

export async function login(req,res){
    try {
        const {email,password} = req.body;
        const user = await User.findOne({email});
        if(!user)return res.status(400).json({message:'Email o contrasena incorrectos'});

        const ok = await bcrypt.compare(password,user.password);
        if(!ok) return res.status(404).json({message:'Email o password incorrectos'})

        const token = jwt.sign({id:user.id},process.env.JWT_SECRET || 'changeme', {expiresIn:'7d'})
        res.status(200).json({token,user:{id:user.id,name:user.name,email:user.email}});
    } catch (error) {
                res.status(500).json({message:'error en el servidor:'.error});

    }
}

export async function profile(req,res){
    const user = await User.findById(req.userId).select('_id name email');
    return res.json({user});
}
