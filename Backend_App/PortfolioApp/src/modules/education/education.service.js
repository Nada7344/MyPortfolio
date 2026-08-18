import { NotFoundException } from "../../common/utils/index.js";
import { EducationModel } from "../../DB/models/education.model.js";

export const getAllEducation = async () => {
  return await EducationModel.find({ isDeleted: false }).sort({ order: 1 });
};

export const getEducationById = async (id) => {
  const item = await EducationModel.findOne({ _id: id, isDeleted: false });

  if (!item) {
    NotFoundException({ message: 'Education item not found' });
  }

  return item;
};

export const createEducation = async (data) => {
  return await EducationModel.create(data);
};

export const updateEducation = async (id, data) => {
  const item = await EducationModel.findOneAndUpdate(
    { _id: id, isDeleted: false },
    data,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!item) {
    NotFoundException({ message: 'Education item not found' });
  }

  return item;
};

export const deleteEducation = async (id) => {
  const item = await EducationModel.findOneAndUpdate(
    { _id: id, isDeleted: false },
    { isDeleted: true, deletedAt: new Date() },
    { new: true }
  );

  if (!item) {
    NotFoundException({ message: 'Education item not found' });
  }

  return item;
};

export const restoreEducation = async (id) => {
  const item = await EducationModel.findOneAndUpdate(
    { _id: id, isDeleted: true },
    { isDeleted: false, deletedAt: null },
    { new: true } 
  );

  if (!item) {
    NotFoundException({ message: 'Education item not found in trash' });
  }

  return item;
};