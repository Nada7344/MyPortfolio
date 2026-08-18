import { NotFoundException } from "../../common/utils/index.js";
import { ProjectModel } from "../../DB/models/project.model.js";

export const getAllProjects = async () => {
  return await ProjectModel.find({ isDeleted: false }).sort({ order: 1 });
};

export const getProjectById = async (id) => {
  const project = await ProjectModel.findOne({ _id: id, isDeleted: false });

  if (!project) {
    throw NotFoundException({ message: 'Project not found' });
  }

  return project;
};

export const createProject = async (data) => {
  return await ProjectModel.create(data);
};

export const updateProject = async (id, data) => {
  const project = await ProjectModel.findOneAndUpdate(
    { _id: id, isDeleted: false },
    data,
    { new: true, runValidators: true }
  );

  if (!project) {
    throw NotFoundException({ message: 'Project not found' });
  }

  return project;
};

export const deleteProject = async (id) => {
  const project = await ProjectModel.findOneAndUpdate(
    { _id: id, isDeleted: false },
    { isDeleted: true, deletedAt: new Date() },
    { new: true }
  );

  if (!project) {
    throw NotFoundException({ message: 'Project not found' });
  }

  return project;
};

export const restoreProject = async (id) => {
  const project = await ProjectModel.findOneAndUpdate(
    { _id: id, isDeleted: true },
    { isDeleted: false, deletedAt: null },
    { new: true }
  );

  if (!project) {
    throw NotFoundException({ message: 'Project not found in trash' });
  }

  return project;
};