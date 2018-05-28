import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const Types = Schema.Types;

const PostObject = {
    user: {
        type: Types.ObjectId,
        ref: 'users'
    },
    text: {
        type: Types.String,
        required: true
    },
    name: {
        type: Types.String
    },
    avatar: {
        type: Types.String
    },
    likes: [
        {
            user: {
                type: Types.ObjectId,
                required: true,
                ref: 'users'
            }
        }
    ],
    comments: [
        {
            user: {
                type: Types.ObjectId,
                required: true,
                ref: 'users'
            },
            text: {
                type: Types.String,
                required: true
            },
            name: {
                type: Types.String,
                required: true
            },
            avatar: {
                type: Types.String,
            },
            date: {
                type: Types.Date,
                default: Date.now
            }
        }
    ],
    date: {
        type: Types.Date,
        default: Date.now
    }
};

const PostSchema = new Schema(PostObject);
const post = mongoose.model('posts', PostSchema);
export default post;