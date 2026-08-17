import { unlink } from 'node:fs/promises';
import { resolve } from 'node:path';
import { HomeModel } from '../../DB/models/home.model.js';
import { NotFoundException } from '../../common/utils/index.js';


export const getHome = async () => {

  const home = await HomeModel.findOne();

  if (!home) {
    throw new Error('Home data not found');
  }

  return home;
};

export const updateHome = async (data) => {

  const home = await HomeModel.findOneAndUpdate(
    {},
    data,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!home) {
    throw new Error('Home data not found');
  }

  return home;
};


const deleteOldFile = async (fileUrl) => {
  if (!fileUrl) return;

  try {
    const filePath = resolve(`.${fileUrl}`);
    await unlink(filePath);
  } catch (error) {
    if (error.code !== 'ENOENT') {
      console.error('Unexpected error deleting old file:', fileUrl, error);
    }
  }
};

export const uploadProfileImage = async (fileUrl) => {

  const currentHome = await HomeModel.findOne();

  await deleteOldFile(currentHome?.profileImage);

  const home = await HomeModel.findOneAndUpdate(
    {},
    { profileImage: fileUrl },
    { new: true }
  );

  if (!home) {
    throw NotFoundException('message:{Home data not found}');
  }

  return home;
};

export const uploadResume = async (fileUrl) => {

  const currentHome = await HomeModel.findOne();

  await deleteOldFile(currentHome?.resume);

  const home = await HomeModel.findOneAndUpdate(
    {},
    { resume: fileUrl },
    { new: true }
  );

  if (!home) {
    throw NotFoundException('message:{Home data not found}');
  }

  return home;
};


export const getResumeForDownload = async () => {

  const home = await HomeModel.findOne();

  if (!home) {
    throw NotFoundException('Home data not found');
  }

  if (!home.resume) {
   throw NotFoundException('Resume not found');
  }

  const filePath =  resolve(`..${home.resume}`);

  return filePath;
};