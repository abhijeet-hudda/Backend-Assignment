import { asyncHandler } from "../utils/asynchandler.js";
import { ApiError } from "../utils/APIError.js";
import { ApiResponse } from "../utils/APIResponse.js";
import { Task } from "../models/task.model.js";


// 🔹 Create Task
export const createTask = asyncHandler(async (req, res) => {
  const { title, description, status, priority } = req.body;
  if (!title || title.trim() === "") {
    throw new ApiError(400, "Title is required");
  }
  const task = await Task.create({
    title,
    description,
    status,
    priority,
    user: req.user._id,
  });

  return res
    .status(201)
    .json(new ApiResponse(201, task, "Task created successfully"));
});



// 🔹 Get All Tasks (with filtering + pagination)
export const getTasks = asyncHandler(async (req, res) => {
  const { status, priority, page = 1, limit = 10 } = req.query;

  const query = { user: req.user._id };

  if (status) query.status = status;
  if (priority) query.priority = priority;

  const tasks = await Task.find(query)
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(Number(limit));

  const total = await Task.countDocuments(query);

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        total,
        page: Number(page),
        pages: Math.ceil(total / limit),
        tasks,
      },
      "Tasks fetched successfully"
    )
  );
});

export const getTaskById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const task = await Task.findById(id);

  if (!task) {
    throw new ApiError(404, "Task not found");
  }
  if (task.user.toString() !== req.user._id.toString()) {
    throw new ApiError(403, "Unauthorized access");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, task, "Task fetched successfully"));
});



//  Update Task
export const updateTask = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { title, description, status, priority, completed } = req.body;

  const task = await Task.findById(id);

  if (!task) {
    throw new ApiError(404, "Task not found");
  }
  if (task.user.toString() !== req.user._id.toString()) {
    throw new ApiError(403, "Unauthorized access");
  }
  if (title !== undefined) task.title = title;
  if (description !== undefined) task.description = description;
  if (status !== undefined) task.status = status;
  if (priority !== undefined) task.priority = priority;
  if (completed !== undefined) task.completed = completed;

  await task.save();

  return res
    .status(200)
    .json(new ApiResponse(200, task, "Task updated successfully"));
});



// 🔹 Delete Task
export const deleteTask = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const task = await Task.findById(id);
  if (!task) {
    throw new ApiError(404, "Task not found");
  }
  if (task.user.toString() !== req.user._id.toString()) {
    throw new ApiError(403, "Unauthorized access");
  }
  await task.deleteOne();
  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Task deleted successfully"));
});