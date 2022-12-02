import crypto from 'crypto';
import fs from 'fs';
import multer from 'multer';
import path from 'node:path';

const storage = multer.diskStorage({
  destination(req, file, callback) {
    const folderPath = path.resolve(
      __dirname,
      '..',
      '..',
      'uploads',
      `${file.fieldname}s`,
    );
    fs.mkdirSync(folderPath, { recursive: true });

    callback(null, folderPath);
  },

  filename(req, file, callback) {
    crypto.randomBytes(5, (err, res) => {
      if (err) {
        return callback(null, err.message);
      } else {
        return callback(
          null,
          file.fieldname + `-${res.toString('hex')}-${file.originalname}`,
        );
      }
    });
  },
});

export const upload = multer({
  storage,
});
