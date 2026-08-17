import { NotFoundException } from "../../common/utils/response/error.response.js";
import { AboutModel } from "../../DB/models/about.model.js";

export const getAbout = async () => {

  const about = await AboutModel.findOne();

  if (!about) {
    throw  NotFoundException({message:'About data not found'});
  }

  return about;
};


export const updateAbout = async (data) => {

  const about = await AboutModel.findOneAndUpdate(
    {},
    data,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!about) {
   throw  NotFoundException({message:'About data not found'});
  }

  return about;
};