const BASE_URL = process.env.NEXT_PUBLIC_MINIO_URL;

export const getFileUrl = (filePath: string): string => {
  const upload = `${BASE_URL}${filePath}`;
  return upload;
};

export const getFileExtension = (filename?: string) => {
  if (!filename) return "";
  return filename.split(".").pop()?.toLowerCase() ?? "";
};

export const isExtensionAllowed = (file: File, allowedExtensions: string[]) => {
  if (allowedExtensions.length === 0) return true;
  const ext = getFileExtension(file.name);
  return allowedExtensions.includes(ext);
};

export const extensionToMimeMap: Record<string, string> = {
  // ===== Images =====
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  png: "image/png",
  gif: "image/gif",
  webp: "image/webp",
  bmp: "image/bmp",
  svg: "image/svg+xml",
  ico: "image/x-icon",
  tif: "image/tiff",
  tiff: "image/tiff",
  heic: "image/heic",
  heif: "image/heif",

  // ===== Documents =====
  pdf: "application/pdf",
  doc: "application/msword",
  docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  xls: "application/vnd.ms-excel",
  xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  ppt: "application/vnd.ms-powerpoint",
  pptx: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  txt: "text/plain",
  rtf: "application/rtf",
  csv: "text/csv",
  odt: "application/vnd.oasis.opendocument.text",
  ods: "application/vnd.oasis.opendocument.spreadsheet",
  odp: "application/vnd.oasis.opendocument.presentation",

  // ===== Archives =====
  zip: "application/zip",
  rar: "application/vnd.rar",
  "7z": "application/x-7z-compressed",
  tar: "application/x-tar",
  gz: "application/gzip",
  tgz: "application/gzip",

  // ===== Audio =====
  mp3: "audio/mpeg",
  wav: "audio/wav",
  ogg: "audio/ogg",
  m4a: "audio/mp4",
  aac: "audio/aac",
  flac: "audio/flac",

  // ===== Video =====
  mp4: "video/mp4",
  mov: "video/quicktime",
  avi: "video/x-msvideo",
  mkv: "video/x-matroska",
  webm: "video/webm",
  mpeg: "video/mpeg",

  // ===== Code / Web =====
  json: "application/json",
  xml: "application/xml",
  html: "text/html",
  css: "text/css",
  js: "application/javascript",
  ts: "application/typescript",

  // ===== Fonts =====
  ttf: "font/ttf",
  otf: "font/otf",
  woff: "font/woff",
  woff2: "font/woff2",
};

const extensionLabelMap: Record<string, string> = {
  doc: "Word",
  docx: "Word",
  xls: "Excel",
  xlsx: "Excel",
  ppt: "PowerPoint",
  pptx: "PowerPoint",
};

const mimeToExtensionMap: Record<string, string> = Object.entries(
  extensionToMimeMap,
).reduce(
  (acc, [ext, mime]) => {
    acc[mime] = ext;
    return acc;
  },
  {} as Record<string, string>,
);

export const mapExtensionsToAccept = (extensions: string[]): string[] => {
  return extensions.flatMap((ext) => {
    const cleanExt = ext.toLowerCase().replace(".", "");
    const mime = extensionToMimeMap[cleanExt];

    if (!mime) {
      return [`.${cleanExt}`];
    }

    return [mime, `.${cleanExt}`];
  });
};

export const getAcceptString = (accept: string[]): string => {
  if (!accept || accept.length === 0) return "Supported files";

  const labels = new Set<string>();

  accept.forEach((type) => {
    let ext: string | undefined;

    if (type.startsWith(".")) {
      ext = type.replace(".", "").toLowerCase();
    } else {
      ext = mimeToExtensionMap[type];
    }

    if (!ext) return;

    if (extensionLabelMap[ext]) {
      labels.add(extensionLabelMap[ext]);
    } else {
      labels.add(ext.toUpperCase());
    }
  });

  if (labels.size === 0) return "Supported files";

  return Array.from(labels).join(", ");
};
