import mongoose, {Schema} from "mongoose";
import bcrypt from "bcrypt";

const UserSchema = new Schema({
    username: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    avatar: {type: String, default: null},
    description: {type: String, default: null},
}, {
    timestamps: true,
    toJSON: {virtuals: true},
    toObject: {virtuals: true}
});

UserSchema.virtual('posts', {
    ref: 'Post',
    localField: '_id',
    foreignField: 'author'
});

UserSchema.virtual('comments', {
    ref: 'Comment',
    localField: '_id',
    foreignField: 'author'
})

UserSchema.pre('save', async function (next) {
    const user = this;

    if (!user.isModified('password')) return next();

    try {
        const salt = await bcrypt.genSaltSync(10);
        user.password = await bcrypt.hashSync(user.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

UserSchema.pre('findOneAndUpdate', async function (next) {
    const update = this.getUpdate();

    if (update.password) {
        const salt = await bcrypt.genSaltSync(10);
        update.password = await bcrypt.hashSync(update.password, salt);
        next();
    }
})

UserSchema.methods.comparePassword = function (candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
        if (err) return cb(err);
        cb(null, isMatch);
    })
}

export const UserModel = mongoose.model('User', UserSchema)