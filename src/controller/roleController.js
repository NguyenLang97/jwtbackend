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

const readFunc = async (req, res) => {
  try {
    let data = await rolesApiService.getAllRoles();

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

const deleteFunc = async (req, res) => {
  try {
    let data = await rolesApiService.deleteRole(req.body.id);
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

const getRoleByGroup = async (req, res) => {
  try {
    let id = req.params.groupId;
    let data = await rolesApiService.getRoleByGroup(id);
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

const assignRoleToGroup = async (req, res) => {
  try {
    let data = await rolesApiService.assignRoleToGroup(req.body.data);
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
  createFunc,
  readFunc,
  deleteFunc,
  getRoleByGroup,
  assignRoleToGroup
};
