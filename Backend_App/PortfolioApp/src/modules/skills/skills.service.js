import { SkillsModel } from "../../DB/models/skills.model.js";

export const getSkills = async () => {

  const skills = await SkillsModel.findOne();

  if (!skills) {
    throw new Error('Skills data not found');
  }

  return skills;
};





export const updateSkills = async (data) => {

  const skills = await SkillsModel.findOneAndUpdate(
    {},
    data,
    {
      new: true,
      runValidators: true,
        upsert: true,
    }
  );

  if (!skills) {
    throw new Error('Skills data not found');
  }

  return skills;
};