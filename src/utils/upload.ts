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
        const regex = /(?:\s*-\s*)+|\s/gm; // Remove dashes and white spaces
        return callback(
          null,
          file.fieldname +
            `-${res.toString('hex')}-${file.originalname.replace(regex, '_')}`,
        );
      }
    });
  },
});

const fileFilter = (
  _req: any,
  file: { mimetype: string },
  callback: (arg0: null, arg1: boolean) => void,
) => {
  if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png') {
    callback(null, true);
  } else {
    callback(null, false);
  }
};

export const upload = multer({
  storage,
  limits: {
    // fileSize: 10 * 1024 * 1024, // 3 MB
    // files: 2,
    // fields: 8,
  },
  // fileFilter,
});
