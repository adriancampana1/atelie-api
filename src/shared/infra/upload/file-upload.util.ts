import { extname, join } from 'path';
import { existsSync, mkdirSync, unlinkSync } from 'fs';
import { diskStorage, type StorageEngine } from 'multer';
import { randomBytes } from 'crypto';

export const getUploadRoot = () => join(process.cwd(), 'uploads');

export const ensureDirSync = (dir: string) => {
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
  }
};

export const storageFactory = (
  subfolder: 'materials' | 'final-products',
): StorageEngine => {
  const destination = join(getUploadRoot(), subfolder);
  ensureDirSync(destination);
  return diskStorage({
    destination,
    filename: (_req, file, cb) => {
      const ext = extname(file.originalname) || '';
      const unique = `${Date.now()}-${randomBytes(6).toString('hex')}`;
      cb(null, `${unique}${ext}`);
    },
  });
};

export const imageFileFilter = (_req: any, file: any, cb: any) => {
  if (!file || !file.mimetype || !file.mimetype.startsWith('image/')) {
    cb(new Error('Somente arquivos de imagem são permitidos.'), false);
    return;
  }
  cb(null, true);
};

export const buildPublicUrl = (
  req: any,
  subfolder: 'materials' | 'final-products',
  filename: string,
) => `${req.protocol}://${req.get('host')}/uploads/${subfolder}/${filename}`;

export const deleteLocalFileByUrl = (url?: string | null) => {
  if (!url) return;
  // Only attempt deletion for local uploaded files
  const marker = '/uploads/';
  const idx = url.indexOf(marker);
  if (idx === -1) return;
  const relativePath = url.substring(idx + marker.length); // e.g., 'materials/abc.png'
  const filePath = join(getUploadRoot(), relativePath);
  try {
    if (existsSync(filePath)) unlinkSync(filePath);
  } catch {
    // Ignore deletion errors silently
  }
};
