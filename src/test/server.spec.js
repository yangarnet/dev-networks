import { expect, assert } from 'chai';
import { ObjectID } from 'mongodb';
import request from 'supertest';
import server from '../server';
import user from '../models/user';
import profile from '../models/profile';
import post from '../models/post';
import prepareUser from './seeds/user-seed';

describe('test USER route and user controller', () => {

    before(done => {
        user.remove().then(() => done());
    });

    after(done => {
        user.remove().then(() => done());
    });

    describe('test cases of user registeration', () => {
        it('should register a valid user', (done) => {
            let user = {
                name: 'john doe',
                email: 'john.doe@gmail.com',
                password: 'Passw0rd!',
                confirmedPassword: 'Passw0rd!'
            };
            request(server)
                .post('/api/user/register')
                .set('Content-Type', 'application/json')
                .send(user)
                .expect(200)
                .expect(response => {
                    expect(response.body).to.be.not.null;
                    expect(response.body.user).to.be.not.null;
                    expect(response.body.user).to.have.property('name', 'john doe');
                    expect(response.body.user).to.have.property('email', 'john.doe@gmail.com');
                })
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    done();
                })
        }).timeout(5000);

        it('should NOT register a new user if user email already taken', (done) => {
            let user = {
                name: 'john doe',
                email: 'john.doe@gmail.com',
                password: 'Passw0rd!',
                confirmedPassword: 'Passw0rd!'
            };
            request(server)
                .post('/api/user/register')
                .set('Content-Type', 'application/json')
                .send(user)
                .expect(400)
                .expect(res => {
                    expect(res.body).to.be.not.null;
                    expect(res.body).to.have.property('name', 'Error');
                    expect(res.body).to.have.property('msg', 'Error: email john.doe@gmail.com already registered');
                    done();
                })
                .catch(err => done(err));
        });

        it('should NOT register a new user when user name is empty', (done) => {
            let user = {
                name: '',
                email: 'john.doe@gmail.com',
                password: 'Passw0rd!',
                confirmedPassword: 'Passw0rd!'
            };
            request(server)
                .post('/api/user/register')
                .set('Content-Type', 'application/json')
                .send(user)
                .expect(400)
                .expect(res => {
                    expect(res).to.not.be.null;
                    expect(res.body).to.be.not.null;
                    expect(res.body.errors).to.not.null;
                    expect(res.body.isValid).to.be.false;
                    expect(res.body.errors).to.have.property('name', 'please input your user name');
                })
                .end(() => done())
        });

        it('should NOT register a new user when email is empty', (done) => {
            let user = {
                name: 'john.doe',
                email: '',
                password: 'Passw0rd!',
                confirmedPassword: 'Passw0rd!'
            };
            request(server)
                .post('/api/user/register')
                .set('Content-Type', 'application/json')
                .send(user)
                .expect(400)
                .expect(res => {
                    expect(res).to.not.be.null;
                    expect(res.body).to.be.not.null;
                    expect(res.body.errors).to.not.null;
                    expect(res.body.isValid).to.be.false;
                    expect(res.body.errors).to.have.property('email', 'please input an email address');
                })
                .end(() => done())
        });

        it('should NOT register a new user when email is invalid', (done) => {
            let user = {
                name: 'john.doe',
                email: 'email at com',
                password: 'Passw0rd!',
                confirmedPassword: 'Passw0rd!'
            };
            request(server)
                .post('/api/user/register')
                .set('Content-Type', 'application/json')
                .send(user)
                .expect(400)
                .expect(res => {
                    expect(res).to.not.be.null;
                    expect(res.body).to.be.not.null;
                    expect(res.body.errors).to.not.null;
                    expect(res.body.isValid).to.be.false;
                    expect(res.body.errors).to.have.property('email', 'please provide a valid email address');
                    done();
                })
                .catch(e => done(e))
        });

        it('should NOT register a new user when password is empty', (done) => {
            let user = {
                name: 'john.doe',
                email: 'email.test@gmail.com',
                password: '',
                confirmedPassword: 'Passw0rd!'
            };
            request(server)
                .post('/api/user/register')
                .set('Content-Type', 'application/json')
                .send(user)
                .expect(400)
                .expect(res => {
                    expect(res).to.not.be.null;
                    expect(res.body).to.be.not.null;
                    expect(res.body.errors).to.not.null;
                    expect(res.body.isValid).to.be.false;
                    expect(res.body.errors).to.have.property('password', 'please input a password');
                    expect(res.body.errors).to.have.property('passwordNotMatched', 'password should be matched');
                    done();
                })
                .catch(e => done(e))
        });
        it('should NOT register a new user when password not matched', (done) => {
            let user = {
                name: 'john.doe',
                email: 'email.test@gmail.com',
                password: 'Password!',
                confirmedPassword: 'Passw0rd!'
            };
            request(server)
                .post('/api/user/register')
                .set('Content-Type', 'application/json')
                .send(user)
                .expect(400)
                .expect(res => {
                    expect(res).to.not.be.null;
                    expect(res.body).to.be.not.null;
                    expect(res.body.errors).to.not.null;
                    expect(res.body.isValid).to.be.false;
                    expect(res.body.errors).to.have.property('passwordNotMatched', 'password should be matched');
                    done();
                })
                .catch(e => done(e))
        });

        it('should NOT register a new user when password is less then 6 characters', (done) => {
            let user = {
                name: 'john.doe',
                email: 'email.test@gmail.com',
                password: 'Pass!',
                confirmedPassword: 'Pass!'
            };
            request(server)
                .post('/api/user/register')
                .set('Content-Type', 'application/json')
                .send(user)
                .expect(400)
                .expect(res => {
                    expect(res).to.not.be.null;
                    expect(res.body).to.be.not.null;
                    expect(res.body.errors).to.not.null;
                    expect(res.body.isValid).to.be.false;
                    expect(res.body.errors).to.have.property('password', 'password must be at least 6 characters');
                    done();
                })
                .catch(e => done(e))
        });
    });

    describe('test cases of user login', () => {

        it('should login the user with correct details', (done) => {
            let login = {
                email: 'john.doe@gmail.com',
                password: 'Passw0rd!'
            }
            request(server).post('/api/user/login')
                .set('Content-Type', 'application/json')
                .send(login)
                .expect(200)
                .expect(response => {
                    expect(response.body).to.be.not.null;
                    expect(response.body).to.have.property('success', true);
                    assert.isTrue(response.body.success);
                    expect(response.body.token).to.be.not.empty;
                    expect(response.body.token).to.contain('Bearer', 'the token begins with Bearer');
                })
                .end(done);
        });

        it('should deny user login with incorrect email address', (done) => {
            let login = {
                email: 'john.doe.invalid@gmail.com',
                password: 'Passw0rd!'
            }
            request(server).post('/api/user/login')
                .set('Content-Type', 'application/json')
                .send(login)
                .expect(404)
                .expect(response => {
                    expect(response.body).to.be.not.null;
                    expect(response.body.email).to.be.not.empty;
                    expect(response.body).to.have.property('email', 'User not found');
                })
                .end(done);
        });

        it('should deny user login with incorrect password', (done) => {
            let login = {
                email: 'john.doe@gmail.com',
                password: 'Passw0rd!@@'
            }
            request(server).post('/api/user/login')
                .set('Content-Type', 'application/json')
                .send(login)
                .expect(400)
                .expect(response => {
                    expect(response.body).to.be.not.null;
                    expect(response.body.password).to.be.not.empty;
                    expect(response.body).to.have.property('password', 'invalid password');
                })
                .end(done);
        });

        it('should deny user login with empty password', (done) => {
            let login = {
                email: 'john.doe@gmail.com',
                password: ''
            };
            request(server)
                .post('/api/user/login')
                .set('Content-Type', 'application/json')
                .send(login)
                .expect(400)
                .expect(response => {
                    expect(response.body).to.be.not.null;
                    expect(response.body).to.have.property('password', 'please input a password')
                })
                .end(done);
        });

        it('should deny user login with when password does not meet requirement', (done) => {
            let login = {
                email: 'john.doe@gmail.com',
                password: '1234'
            };
            request(server)
                .post('/api/user/login')
                .set('Content-Type', 'application/json')
                .send(login)
                .expect(400)
                .expect(response => {
                    expect(response.body).to.be.not.null;
                    expect(response.body).to.have.property('password', 'password must be at least 6 characters')
                })
                .end(done);
        });

        it('should deny user login with empty email', (done) => {
            let login = {
                email: '',
                password: 'Password!!'
            };
            request(server)
                .post('/api/user/login')
                .set('Content-Type', 'application/json')
                .send(login)
                .expect(400)
                .expect(response => {
                    expect(response.body).to.be.not.null;
                    expect(response.body).to.have.property('email', 'please input an email address')
                })
                .end(done);
        });
    });
});


describe('test PROFILE route and profile controller', () => {
    before(prepareUser);

    it('should allow new user to create a new profile', (done) => {
        let login = {
            email: 'john.kelly@gmail.com',
            password: '1234567890'
        };
        let token = '';
        request(server)
            .post('/api/user/login')
            .set('Content-Type', 'application/json')
            .send(login)
            .expect(200)
            .expect(response => {
                expect(response.body).to.be.not.null;
                expect(response.body).to.have.property('success', true);
                assert.isTrue(response.body.success);
                expect(response.body.token).to.be.not.empty;
                expect(response.body.token).to.contain('Bearer', 'the token begins with Bearer');
                token = response.body.token;
                // get the authorization token first
            })
            .end(() => {
                // then do other request in the end()
                let userProfile = {
                    handle: 'John Kelly',
                    status: 'developer',
                    skills: 'javascript, react, nodejs',
                    bio: 'male',
                    webSite: 'https://www.youtube.com'
                };
                request(server)
                    .post('/api/profile')
                    .set('Content-Type', 'application/json')
                    .set('Authorization', token)
                    .send(userProfile)
                    .expect(201)
                    .end((err, response) => {
                        if (err) {
                            done(err);
                        }
                        expect(response.body).to.be.not.empty;
                        expect(response.body.handle).to.be.equal('John Kelly');
                        expect(response.body.status).to.be.equal('developer');
                        expect(response.body.bio).to.be.equal('male');
                        expect(response.body.skills).to.be.a('array').with.lengthOf(3);
                        expect(response.body.experiences).to.be.a('array').with.lengthOf(0);
                        expect(response.body.education).to.be.a('array').with.lengthOf(0);
                        expect(response.body.user).to.be.not.null;

                        // check to make sure the profile had been written into db
                        let userId = response.body.user;
                        profile.find({ user: userId })
                            .then((result) => {
                                expect(result).to.be.not.null;
                                expect(result).to.be.a('array').with.lengthOf(1);
                                expect(result[0].handle).to.be.equal('John Kelly');
                                expect(result[0].status).to.be.equal('developer');
                                expect(result[0].bio).to.be.equal('male');
                                expect(result[0].skills).to.be.a('array').with.lengthOf(3);
                                expect(result[0].experiences).to.be.a('array').with.lengthOf(0);
                                expect(result[0].education).to.be.a('array').with.lengthOf(0);
                                done();
                            })
                            .catch(err => done(err));
                    });
            });
    });
});

describe('test POST route and profile controller', () => { });
