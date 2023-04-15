const canvas: HTMLCanvasElement = document.createElement('canvas');
const ctx: CanvasRenderingContext2D = canvas.getContext('2d')!;
const uploadedImage = document.getElementById(
  'uploadedImage'
) as HTMLImageElement;
const transformedImage = document.getElementById(
  'transformedImage'
) as HTMLImageElement;

function uploadImage(fileList: FileList): void {
  const file: File = fileList.item(0)!;
  const url = URL.createObjectURL(file);

  uploadedImage.setAttribute('src', url);
}

function invertColors(): void {
  assertValidation();

  effectHanlder((array: Uint8ClampedArray, r: number, g: number, b: number) => {
    array[r] = array[r] ^ 255; // Red
    array[g] = array[g] ^ 255; // Green
    array[b] = array[b] ^ 255; // Blue
  });
}

function grayscale(): void {
  assertValidation();

  effectHanlder((array: Uint8ClampedArray, r: number, g: number, b: number) => {
    const avg = (array[r] + array[g] + array[b]) / 3;

    array[r] = avg; // Red
    array[g] = avg; // Green
    array[b] = avg; // Blue
  });
}

function reset(): void {
  transformedImage.setAttribute('src', '');
}

function effectHanlder(
  effectCallback: (
    array: Uint8ClampedArray,
    r: number,
    g: number,
    b: number
  ) => void
): void {
  const imageData: ImageData = getImageData();
  const data = imageData.data;
  const step = 4;

  for (let i = 0; i < data.length; i += step) {
    effectCallback(data, i, i + 1, i + 2);
  }

  ctx.putImageData(imageData, 0, 0);
  const url = canvas.toDataURL();
  transformedImage.setAttribute('src', url);
}

function getImageData(): ImageData {
  canvas.width = uploadedImage.width;
  canvas.height = uploadedImage.height;
  ctx.drawImage(uploadedImage, 0, 0);

  return ctx.getImageData(0, 0, canvas.width, canvas.height);
}

function assertValidation(): void {
  if (!uploadedImage.getAttribute('src')) {
    throw new Error('Please upload an image');
  }
}
