const User = require('../models/User');
const bcrypt = require('bcrypt');
const { prepareUserData } = require('../utils/userUtils');

const getAccount = async(req, res) => {
    try{
        const {id} = req.params;
        const user = await User.findById(id)

        if(!user) {
            return res.status(400).json({message: 'User not identified'})
        }
        
        res.json(user);


    }catch(err) {
        res.status(500).json({message: err.message})
    }
}

const newAccount = async(req , res) => {
    const { email, password, name, age, avatar } = req.body;
    try{
        const userData = await prepareUserData({ email, password, name, age, avatar });
        const user = new User(userData)

        const newUser = await user.save();
        res.status(201).json(newUser);
    } catch (err) {
        res.status(400).json({message: err.message})
    }
}

const updateUser = async(req , res) => {
    const { email, password, name, age, avatar } = req.body;
    try{
        const {id} = req.params;
        const updateData = await prepareUserData({ email, password, name, age, avatar });

        const updatedUser = await User.findByIdAndUpdate(
            id,
            updateData,
            { new: true }
        );

        if (!updatedUser){
            return res.status(400).json({message: 'No user found'})
        }
        res.status(200).json({message: 'User updated successfully', updatedUser})
    }catch(err) {
        res.status(500).json({message: err.message})
    }
}

const deleteMyUser = async (req, res) => {
    try{
        const {id} = req.params;
        const {password} = req.body;

        const user = await User.findById(id);

        if(!user) {
            return res.status(404).json({message: 'No user found'});
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) {
            return res.status(401).json({message: 'Incorrect password'})
        }

        await User.findByIdAndDelete(id);
        res.status(200).json({message: 'User deleted successfully'});
    } catch(err) {
        res.status(500).json({message: err.message})
    }
}

module.exports = {
    getAccount,
    newAccount,
    updateUser,
    deleteMyUser
}




// ○
// POST /user/login – Login using email and password
// ○
// GET /user/logout – Logout the authenticated user
// ○
// GET /user/profile – Get the authenticated user’s profile
// ○
// PUT /user/profile – Update the authenticated user’s profile
// ○
// DELETE /user/profile – Delete the authenticated user’s account
// ○
// POST /user/oauth/google – Login via Google OAuth
// ○
// GET /user/all – (admin only) List all users
// ○
// DELETE /user/{userId} – (admin only) Delete a specific user
// ○
// PUT /user/{userId}/role – (admin only) Update the user’s role (e.g., regular → admin)