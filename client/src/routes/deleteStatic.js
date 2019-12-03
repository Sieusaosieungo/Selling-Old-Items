const fs = require('fs-extra');
const path = require('path');

function deleteStatic() {
  const staticPath = path.join(__dirname, '../../static');

  fs.remove(staticPath);
}

module.exports = {
  deleteStatic,
};
