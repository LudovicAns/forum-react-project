import {loginValidation, registerValidation, updateValidation} from "../validation/User.js";
import {UserRepository} from "../model/dao/repository/UserRepository.js";
import JwtService from "./JwtService.js";

export const UserService = {
    register: async function (user) {
        if (!user) {
            throw new Error('User is required');
        }

        const validation = registerValidation(user);

        if (!validation.success) {
            throw new Error(`Field '${validation.error.issues[0].path[0]}' : ${validation.error.issues[0].message}`);
        }

        if (await UserRepository.getByUsername(user.username)) {
            throw new Error('Username is already taken');
        }

        if (await UserRepository.getByEmail(user.email)) {
            throw new Error('Email is already taken');
        }

        return await UserRepository.create(user);
    },

    login: async function (data) {
        if (!data) {
            throw new Error('Credentials is required');
        }

        const validation = loginValidation(data);

        if (!validation.success) {
            throw new Error(`Field '${validation.error.issues[0].path[0]}' : ${validation.error.issues[0].message}`);
        }

        let user = null;

        if (data.username) {
            user = await UserRepository.getByUsername(data.username);
        } else if (data.email) {
            user = await UserRepository.getByEmail(data.email);
        }

        if (!user) {
            throw new Error('Login and/or password is incorrect');
        }

        const match = await new Promise((resolve, reject) => {
            user.comparePassword(data.password, (err, isMatch) => {
                if (err) {
                    return reject(err);
                }
                resolve(isMatch);
            });
        });

        if (!match) {
            throw new Error('Login and/or password is incorrect');
        }

        return {
            token: JwtService.sign({id: user.id}),
            user: user,
        };
    },

    getAll: async function () {

    },

    getById: async function (id) {
        if (!id) {
            throw new Error('Id is required');
        }

        return await UserRepository.getById(id);
    },

    update: async function (id, data) {
        if (!id) {
            throw new Error('Id is required');
        }

        if (!data) {
            throw new Error('Data is required');
        }

        const validation = updateValidation(data);

        if (!validation.success) {
            throw new Error(`Field '${validation.error.issues[0].path[0]}' : ${validation.error.issues[0].message}`);
        }

        let user = await UserRepository.getById(id);

        if (!user) {
            throw new Error('User not found');
        }

        if (data.description) {
            user.description = data.description;
        }

        if (data.avatar) {
            user.avatar = data.avatar;
        }

        if (data.username) {
            user.username = data.username;
        }

        if (data.email) {
            user.email = data.email;
        }

        if (data.password) {
            user.password = data.password;
        }

        return await UserRepository.update(id, user);
    },

    delete: async function () {

    }
}