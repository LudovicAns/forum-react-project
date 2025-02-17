import {UserModel} from "../entity/User.js";

export const UserRepository = {
    create: async function(user) {
        const newUser = new UserModel(user);
        const savedUser = await newUser.save();
        return savedUser;
    },

    getAll: async function() {
        return await UserModel.find();
    },

    getById: async function(id) {
        try {
            return await UserModel.findById(id);
        } catch (err) {
            return null;
        }
    },

    update: async function(id, newUser) {
        return await UserModel.findByIdAndUpdate(id, newUser, {new: true});
    },

    delete: async function(id) {
        return await UserModel.findByIdAndDelete(id);
    }
}