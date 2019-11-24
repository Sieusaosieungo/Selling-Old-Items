const uuid = require('uuid');
const fs = require('fs');
const path = require('path');

const uploadMainImage = async (imageFile, relativePath) => {
  let imageLink;

  try {
    const absolutePath = path.join(__dirname, '../../static', relativePath);

    fs.mkdirSync(absolutePath, {
      recursive: true,
    });

    // const fileName = imageFile.name + shortid.generate();
    const fileName = imageFile.name.trim();
    const indexOfDot = fileName.lastIndexOf('.');
    const temp =
      fileName.slice(0, indexOfDot) +
      uuid.v4() +
      fileName.slice(indexOfDot, fileName.length);

    const newName = temp.split(' ').join('-');
    const filePath = `${absolutePath}/${newName}`;

    await imageFile.mv(filePath);

    imageLink = `${relativePath}/${newName}`;
  } catch (err) {
    throw new Error(`Can't store image + ${imageFile.name}`);
  }
  return imageLink;
};

module.exports = uploadMainImage;
