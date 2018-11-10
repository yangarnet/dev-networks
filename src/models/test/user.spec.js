import mongoose from 'mongoose';
import { expect, assert } from 'chai';
import user from '../user';

describe('save user to mongo db', () => {
    let dbconn;
    before(async () => {
        try {
            dbconn = await mongoose.connect(process.env.MONGODB_URL);
            console.log('you are connected to test mongodb');
        } catch (err) {
            console.log('connect to test mongodb error');
        }
    });

    after(async () => {
        await user.remove();
        dbconn.disconnect();
    });

    it('should save a valid user into mongodb', async () => {
        const newuser = new user({
            name: 'garnet-test',
            email: 'yangarnet@gmail.com',
            password: 'password'
        });
        await newuser.save();

        const result = await user.findOne({ email: 'yangarnet@gmail.com' });
        expect(result).to.be.not.null;
        expect(result).to.have.property('name', 'garnet-test');
    });

    it('should NOT save a existing user into db', async () => {
        const newuser = new user({
            name: 'garnet-test',
            email: 'yangarnet@gmail.com',
            password: 'password'
        });
        try {
            await newuser.save();
        } catch (err) {
            expect(err).to.be.not.null;
            expect(err).to.have.property('name', 'MongoError');
            expect(err).to.have.property('errmsg');
            const errmsg = err.errmsg;
            expect(errmsg).to.contains('duplicate key error collection');
        }
    });
});
