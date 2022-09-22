export const downloadJSON = (obj: unknown, fileName: string): void => {
  downloadFile(
    JSON.stringify(obj, null, 2),
    fileName,
    'json',
    'application/json',
  );
};

export const downloadEDI = (arr: string[], fileName: string): void => {
  downloadFile(arr.join('\n'), fileName, 'edi', 'text/plain');
};

const downloadFile = (
  buffer: BlobPart,
  fileName: string,
  ext: string,
  type: string,
): void => {
  try {
    const blob = new Blob([buffer], { type });
    const file = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = file;
    a.download = `${fileName.trim() !== '' ? fileName.trim() : 'temp'}.${
      ext?.length > 0 ? ext : 'unk'
    }`;
    a.click();
  } catch (err) {
    console.log('🚀 ~ downloadFile.ts', { err });
  }
};

export default downloadFile;
