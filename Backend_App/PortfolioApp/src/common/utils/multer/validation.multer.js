export const fileValidation = {
  image: ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'],
  pdf: ['application/pdf'],
};

export const fileFilter = (allowedTypes = []) => {
  return function (req, file, cb) {
    if (!allowedTypes.includes(file.mimetype)) {
      return cb(new Error('Invalid file format'), false);
    }
    return cb(null, true);
  };
};