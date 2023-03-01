import userApiService from '../service/userApiService';

const readFunc = async (req, res) => {
  try {
    if (req.query.page && req.query.limit) {
      let page = req.query.page;
      let limit = req.query.limit;

      let data = await userApiService.getUserWithPagination(+page, +limit);

      return res.status(200).json({
        EM: data.EM, // error message
        EC: data.EC, // error code
        DT: data.DT //data
      });
    } else {
      let data = await userApiService.getAllUser();

      return res.status(200).json({
        EM: data.EM, // error message
        EC: data.EC, // error code
        DT: data.DT //data
      });
    }
  } catch (error) {
    console.log(error);

    // server no se hien cac dong nay
    return res.status(500).json({
      EM: 'error from server', // error message
      EC: '-1', // error code
      DT: '' //data
    });
  }
};
const createFunc = async (req, res) => {
  try {
    // validate
    let data = await userApiService.createNewUser(req.body);
    console.log('data', data);
    return res.status(200).json({
      EM: data.EM, // error message
      EC: data.EC, // error code
      DT: data.DT //data
    });
  } catch (error) {
    console.log(error);
    // server no se hien cac dong nay
    return res.status(500).json({
      EM: 'error from server', // error message
      EC: '-1', // error code
      DT: '' //data
    });
  }
};
const updateFunc = async (req, res) => {
  try {
    let users = await userApiService.getAllUser();
  } catch (error) {
    console.log(error);
    // server no se hien cac dong nay
    return res.status(500).json({
      EM: 'error from server', // error message
      EC: '-1', // error code
      DT: '' //data
    });
  }
};
const deleteFunc = async (req, res) => {
  try {
    let data = await userApiService.deleteUser(req.body.id);
    return res.status(200).json({
      EM: data.EM, // error message
      EC: data.EC, // error code
      DT: data.DT //data
    });
  } catch (error) {
    console.log(error);
    // server no se hien cac dong nay
    return res.status(500).json({
      EM: 'error from server', // error message
      EC: '-1', // error code
      DT: '' //data
    });
  }
};

module.exports = {
  readFunc,
  createFunc,
  updateFunc,
  deleteFunc
};
