import bcrypt from 'bcryptjs';
import mysql from 'mysql2/promise';
import bluebird from 'bluebird';
import db from '../models';

// create the connection, specify bluebird as Promise

const salt = bcrypt.genSaltSync(10);

const hashUserPassword = (userPassword) => {
  return bcrypt.hashSync(userPassword, salt);
};

const createNewUser = async (email, password, username) => {
  let hashPass = hashUserPassword(password);
  // const connection = await mysql.createConnection({
  //   host: 'localhost',
  //   user: 'root',
  //   database: 'jwt',
  //   Promise: bluebird
  // });
  try {
    // const [rows, fields] = await connection.execute(
    //   'INSERT INTO user (email, password, username) VALUES (?, ?, ?)',
    //   [email, hashPass, username]
    // );
    // return rows;
    await db.User.create({
      email: email,
      password: hashPass,
      username: username
    });
  } catch (error) {
    console.log('check error', error);
  }
};

const getUserList = async () => {
  // const connection = await mysql.createConnection({
  //   host: 'localhost',
  //   user: 'root',
  //   database: 'jwt',
  //   Promise: bluebird
  // });

  // try {
  //   const [rows, fields] = await connection.execute('Select * from User ');
  //   return rows;
  // } catch (error) {
  //   console.log('check error', error);
  // }

  let newUser = await db.User.findOne({
    where: { id: 1 },
    // cach 1
    // include: db.Group,

    // cach 2
    attributes: ['id', 'username', 'email'],
    include: { model: db.Group, attributes: ['id', 'name', 'description'] },
    raw: true,
    nest: true
  });

  let roles = await db.Role.findAll({
    include: { model: db.Group, where: { id: 1 } },
    raw: true,
    nest: true
  });

  let users = [];
  users = await db.User.findAll();
  return users;
};

const deleteUser = async (userId) => {
  // const connection = await mysql.createConnection({
  //   host: 'localhost',
  //   user: 'root',
  //   database: 'jwt',
  //   Promise: bluebird
  // });

  // try {
  //   const [rows, fields] = await connection.execute(
  //     'DELETE FROM user WHERE id = ?',
  //     [id]
  //   );
  //   return rows;
  // } catch (error) {
  //   console.log('check error', error);
  // }
  await db.User.destroy({
    where: {
      id: userId
    }
  });
};

const getUserById = async (id) => {
  // const connection = await mysql.createConnection({
  //   host: 'localhost',
  //   user: 'root',
  //   database: 'jwt',
  //   Promise: bluebird
  // });

  // try {
  //   const [rows, fields] = await connection.execute(
  //     'SELECT * FROM user WHERE id = ?',
  //     [id]
  //   );
  //   return rows;
  // } catch (error) {
  //   console.log('check error', error);
  // }

  let user = {};
  user = await db.User.findOne({
    where: { id: id }
  });
  // return user.get({ plain: true });
  // convert sang Object JS
  return user;
};

const updateUserInfor = async (email, username, id) => {
  // const connection = await mysql.createConnection({
  //   host: 'localhost',
  //   user: 'root',
  //   database: 'jwt',
  //   Promise: bluebird
  // });

  // try {
  //   const [rows, fields] = await connection.execute(
  //     'UPDATE user SET email = ?, username = ? WHERE id = ?',
  //     [email, username, id]
  //   );
  //   return rows;
  // } catch (error) {
  //   console.log('check error', error);
  // }

  await db.User.update(
    { email: email, username: username },
    {
      where: {
        id: id
      }
    }
  );
};

module.exports = {
  createNewUser,
  getUserList,
  deleteUser,
  getUserById,
  updateUserInfor
};
