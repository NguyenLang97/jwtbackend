import rolesApiService from '../service/rolesApiService';

const createFunc = async (req, res) => {
  try {
    // validate
    let data = await rolesApiService.createNewRoles(req.body);
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
  createFunc
};
