const FallAlert = require("../models/fallAlert.model.js");

// Create a new fall alert
exports.createFallAlert = async (req, res) => {
  try {
    const fallAlert = new FallAlert(req.body);
    const savedFallAlert = await fallAlert.save();
    res.status(201).json(savedFallAlert);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all fall alerts
exports.getAllFallAlerts = async (req, res) => {
  try {
    const fallAlerts = await FallAlert.find()
      .populate("user_id")
      .populate("device_id");
    res.status(200).json(fallAlerts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a fall alert by ID
exports.getFallAlertById = async (req, res) => {
  try {
    const fallAlert = await FallAlert.findById(req.params.id)
      .populate("user_id")
      .populate("device_id");
    if (!fallAlert) {
      return res.status(404).json({ message: "Fall Alert not found" });
    }
    res.status(200).json(fallAlert);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a fall alert
exports.updateFallAlert = async (req, res) => {
  try {
    const updatedFallAlert = await FallAlert.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedFallAlert) {
      return res.status(404).json({ message: "Fall Alert not found" });
    }
    res.status(200).json(updatedFallAlert);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a fall alert
exports.deleteFallAlert = async (req, res) => {
  try {
    const deletedFallAlert = await FallAlert.findByIdAndDelete(req.params.id);
    if (!deletedFallAlert) {
      return res.status(404).json({ message: "Fall Alert not found" });
    }
    res.status(200).json({ message: "Fall Alert deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
