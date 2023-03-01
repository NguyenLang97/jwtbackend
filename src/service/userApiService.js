import db from '../models';

const getAllUser = async () => {
  try {
    let users = await db.User.findAll({
      attributes: ['id', 'username', 'email', 'phone', 'sex'],
      include: { model: db.Group, attributes: ['id', 'name', 'description'] }
    });
    if (users) {
      return {
        EM: 'get data success',
        EC: 0,
        DT: users
      };
    } else {
      return {
        EM: 'get data success',
        EC: 0,
        DT: []
      };
    }
  } catch (error) {
    console.log(error);
    return {
      EM: 'something wrongs with services',
      EC: 1,
      DT: []
    };
  }
};

const getUserWithPagination = async (page, limit) => {
  try {
    let offset = (page - 1) * limit;

    const { count, rows } = await db.User.findAndCountAll({
      offset: offset,
      limit: limit,
      attributes: ['id', 'username', 'email', 'phone', 'sex'],
      include: { model: db.Group, attributes: ['id', 'name', 'description'] }
    });

    let totalPages = Math.ceil(count / limit);
    let data = {
      totalRows: count,
      totalPages: totalPages,
      users: rows
    };

    return {
      EM: 'OKOK',
      EC: 0,
      DT: data
    };
  } catch (error) {
    console.log(error);
    return {
      EM: 'something wrongs with services',
      EC: 1,
      DT: []
    };
  }
};

const createUser = async () => {
  try {
  } catch (error) {
    console.log(error);
  }
};

const updateUser = async () => {
  try {
  } catch (error) {
    console.log(error);
  }
};

const deleteUser = async (id) => {
  try {
    let user = await db.User.findOne({
      where: {
        id: id
      }
    });

    if (user) {
      await user.destroy();
      return {
        EM: 'Delete user successeds',
        EC: 0,
        DT: []
      };
    } else {
      return {
        EM: 'User not exist',
        EC: 2,
        DT: []
      };
    }
  } catch (error) {
    console.log(error);
    return {
      EM: 'something wrongs with services',
      EC: 1,
      DT: []
    };
  }
};

module.exports = {
  getAllUser,
  createUser,
  updateUser,
  deleteUser,
  getUserWithPagination
};
