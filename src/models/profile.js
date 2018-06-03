import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const STRING = Schema.Types.String;

const ProfilesSchema = new Schema({
    user: {
        type: mongoose.SchemaTypes.ObjectId,
        unique: true,
        required: true,
        ref: 'users' // ref to user collection
    },
    handle: {
        type: STRING,
        required: true,
        maxlength: 40
    },
    company: { type: STRING },
    webSite: { type: STRING },
    location: { type: STRING },
    status: { type: STRING, required: true },
    skills: { type: [STRING], required: true },
    bio: { type: STRING, required: true },
    githubusername: { type: STRING },
    experiences: [
        {
            title: { type: STRING, required: true },
            company: { type: STRING, required: true },
            location: { type: STRING },
            from: { type: Date },
            to: { type: Date },
            current: { type: Schema.Types.Boolean, default: false },
            description: { type: STRING }
        }
    ],
    education: [
        {
            school: { type: STRING, required: true },
            degree: { type: STRING, required: true },
            fieldOfStudy: { type: STRING, required: true },
            from: { type: Date },
            to: { type: Date },
            current: { type: Schema.Types.Boolean, default: false },
            description: { type: STRING }
        }
    ],
    social: {
        youtube: { type: STRING },
        twitter: { type: STRING },
        facebook: { type: STRING },
        linkedIn: { type: STRING },
        instagram: { type: STRING }
    },
    dateAdded: {
        type: Date,
        default: Date.now
    },
    lastUpdated: {
        type: Date,
        default: Date.now
    },
});

const profile = mongoose.model('profiles', ProfilesSchema);

export default profile;
