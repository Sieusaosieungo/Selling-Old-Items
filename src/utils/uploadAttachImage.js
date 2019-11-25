const uuid = require('uuid');
const fs = require('fs');
const fsExtra = require('fs-extra');
const path = require('path');
const decompress = require('decompress');
const CustomError = require('../errors/CustomError');
const errorCode = require('../errors/errorCode');

const uploadAttachImage = async (imageFile, relativePath) => {
  const imageLinks = [];
  const random = uuid.v4();
  const absolutePath = path.join(
    __dirname,
    '../../static',
    relativePath,
    random,
  );

  fs.mkdirSync(absolutePath, {
    recursive: true,
  });

  const fileName = imageFile.name.trim();
  const filePath = `${absolutePath}/${fileName}`;

  const errUpload = await imageFile.mv(filePath);

  if (errUpload) {
    throw new CustomError(errorCode.BAD_REQUEST, errUpload);
  }

  await decompress(filePath, absolutePath);

  let errorInput = null;
  await Promise.all(
    fs.readdirSync(absolutePath).map(async fileUnzip => {
      if (
        !fileUnzip.match(/\.(zip)$/) &&
        !fileUnzip.match(/\.(jpg|png|jpeg)$/)
      ) {
        errorInput = 'error-ext';
      }
    }),
  );

  const files = await fs.readdirSync(absolutePath);

  const totalFiles = files.length; // return the number of files
  if (totalFiles > 4) {
    errorInput = 'error-length';
  }

  if (errorInput === 'error-ext') {
    fsExtra.removeSync(absolutePath);
    throw new CustomError(
      errorCode.BAD_REQUEST,
      'Bạn cần upload file zip chỉ có hình ảnh bên trong',
    );
  } else if (errorInput === 'error-length') {
    fsExtra.removeSync(absolutePath);
    throw new CustomError(
      errorCode.BAD_REQUEST,
      'Bạn chỉ được upload tối đa 3 file ảnh kèm theo',
    );
  }

  await Promise.all(
    fs.readdirSync(absolutePath).map(async imageUnziped => {
      if (imageUnziped.match(/\.(jpg|png|jpeg)$/)) {
        imageLinks.push(`${relativePath}/${random}/${imageUnziped}`);
      }
    }),
  );

  return imageLinks;
};

module.exports = uploadAttachImage;
