const asyncHandler = require("express-async-handler");

const Goal = require("../model/goalModel");

const getGoal = async (req, res) => {
  const goals = await Goal.find();
  //res.status(200).json({ message: "Get goals" });
  res.status(200).json(goals);
};

const setGoal = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    //res.status(400).json({ message: "Please add a text value" });
    res.status(400);
    throw new Error("Please add a text field");
  }

  const goal = await Goal.create({
    text: req.body.text,
  });
  //res.status(200).json({ message: "Set goals" });
  res.status(200).json(goal);
});

const updateGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);

  if (!goal) {
    res.status(400);
    throw new Error("Goal not found");
  }

  const updateGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  //res.status(200).json({ message: `Update goals ${req.params.id}` });
  res.status(200).json(updateGoal);
});

const deleteGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);

  if (!goal) {
    res.status(400);
    throw new Error("Goal not found");
  }

  await goal.deleteOne();

  //res.status(200).json({ message: `Delete goals ${req.params.id}` });
  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getGoal,
  setGoal,
  updateGoal,
  deleteGoal,
};
