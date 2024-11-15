const NotFoundError = require("../errors/NotFoundError.js");
const ValidationError = require("../errors/ValidationError.js");
const Device = require("../models/device.model.js");

// Create a new device
async function createDevice(req, response) {
  const userId = req.userId;

  const { deviceName, deviceType, deviceId } = req.body;
  if (!deviceName || !deviceType) {
    throw new ValidationError({ message: "Required fields must be filled" });
  }

  const newDevice = await Device.findById(deviceId);
  if (!newDevice) throw NotFoundError({ message: "Not found error" });

  newDevice.user_id = userId;
  newDevice.device_name = deviceName;
  newDevice.device_type = deviceType;

  await newDevice.save();

  return response
    .status(200)
    .json({ message: "Add device successfully", data: newDevice });
}

// Get all devices
async function getAllDevices(req, res) {
  try {
    const userId = req.userId;
    const devices = await Device.find({ user_id: userId }).populate("user_id");

    var result = devices.map((device) => {
      device = device.toJSON();
      device.user = device.user_id;
      delete device.user.password;
      delete device.user_id;

      return device;
    });
    res.status(200).json(result);
  } catch (error) {
    throw error;
  }
}

// Get a device by ID
async function getDeviceById(req, res) {
  try {
    const userId = req.userId;
    const device = await Device.findOne({
      _id: req.params.id,
      user_id: userId,
    }).populate("user_id");
    if (!device) {
      return res.status(404).json({ message: "Device not found" });
    }
    res.status(200).json(device);
  } catch (error) {
    throw error;
  }
}

// Update a device
async function updateDevice(req, res) {
  try {
    const userId = req.userId;
    const { deviceType, deviceName } = req.body;
    const deviceId = req.params.id;

    const device = await Device.findOne({
      user_id: userId,
      _id: deviceId,
    });
    if (!device) throw new NotFoundError({ message: "Not found device" });

    deviceType && (device.device_type = deviceType);
    deviceName && (device.device_name = deviceName);

    await device.save();

    return res.status(200).json({ newData: device });
  } catch (error) {
    throw error;
  }
}

// Delete a device
async function deleteDevice(req, res) {
  try {
    const deviceId = req.params.id;
    const userId = req.userId;

    const result = await Device.deleteOne({ user_id: userId, _id: deviceId });
    if (result.deletedCount === 1) {
      return res.status(200).json({ message: "Delete device successfully" });
    } else {
      throw new NotFoundError({ message: "Not found device" });
    }
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createDevice,
  getAllDevices,
  getDeviceById,
  updateDevice,
  deleteDevice,
};
