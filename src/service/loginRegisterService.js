require('dotenv').config();
import db from '../models';
import bcrypt from 'bcryptjs';
import { Op } from 'sequelize';
import { getGroupWithRoles } from './JWTService';
import { createJWT } from '../middleware/JWTAction';

const salt = bcrypt.genSaltSync(10);

const hashUserPassword = (userPassword) => {
  return bcrypt.hashSync(userPassword, salt);
};

const checkEmailExist = async (userEmail) => {
  let user = await db.User.findOne({
    where: { email: userEmail }
  });

  if (user) return true;
  return false;
};

const checkPhoneExist = async (userPhone) => {
  let user = await db.User.findOne({
    where: { phone: userPhone }
  });

  if (user) return true;
  return false;
};

const registerNewUser = async (rawUserData) => {
  try {
    // check email/phonenumber are exist
    let isEmailExist = await checkEmailExist(rawUserData.email);
    if (isEmailExist) {
      return {
        EM: 'The Email is already exist',
        EC: 1
      };
    }

    let isPhoneExist = await checkPhoneExist(rawUserData.phone);
    if (isPhoneExist) {
      return {
        EM: 'The Phone number is already exist',
        EC: 1
      };
    }
    //   hash user password
    let hashPassword = hashUserPassword(rawUserData.password);

    //   create new user
    await db.User.create({
      email: rawUserData.email,
      username: rawUserData.username,
      password: hashPassword,
      phone: rawUserData.phone,
      groupId: 4
    });

    return {
      EM: 'A user is created successfully!!',
      EC: 0
    };
  } catch (error) {
    console.log(error);
    return {
      EM: 'Something wrongs in service...',
      EC: -2
    };
  }
};

const checkPassword = (inputPassword, hashPassword) => {
  return bcrypt.compareSync(inputPassword, hashPassword); // true or false
};

const handleUserLogin = async (rawData) => {
  try {
    // check email/phonenumber are exist
    let user = await db.User.findOne({
      where: {
        [Op.or]: [{ email: rawData.valueLogin }, { phone: rawData.valueLogin }]
      }
    });
    if (user) {
      let isCorrectPassword = checkPassword(rawData.password, user.password);

      if (isCorrectPassword === true) {
        // test roles
        let groupWithRoles = await getGroupWithRoles(user);
        let payload = {
          email: user.email,
          groupWithRoles,
          expiresIn: process.env.JWT_EXPIRES_IN
        };
        let token = createJWT(payload);
        return {
          EM: 'OKOK!',
          EC: 0,
          DT: {
            access_token: token,
            groupWithRoles,
            email: user.email,
            username: user.username
          }
        };
      }
    }

    return {
      EM: 'Your email/phone number or password is incorrect!',
      EC: 1,
      DT: ''
    };
  } catch (error) {
    console.log(error);
    return {
      EM: 'Something wrongs in service...',
      EC: -2
    };
  }
};

module.exports = {
  registerNewUser,
  handleUserLogin,
  hashUserPassword,
  checkPhoneExist,
  checkEmailExist
};
