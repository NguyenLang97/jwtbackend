import db from '../models';
import bcrypt from 'bcryptjs';

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
      phone: rawUserData.phone
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

module.exports = {
  registerNewUser
};
