import { ObjectID } from 'mongodb';
import user from '../../models/user';
import profile from '../../models/profile'

const users = [
    {
        name: 'john doe',
        email: 'john.doe@gmail.com',
        password: 'password',
        confirmedPassword: 'password',
    },
    {
        name: 'john kelly',
        email: 'john.kelly@gmail.com',
        password: '1234567890',
        confirmedPassword: '1234567890'
    }
];

const prepareUser = async () => {
    await user.remove();
    await profile.remove();
    const user1 = new user(users[0]);
    const user2 = new user(users[1]);
    await user1.save();
    await user2.save();
};

export default prepareUser;
