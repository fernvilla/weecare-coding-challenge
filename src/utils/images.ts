export const generateImageWithSizeFromUrl = (image: string, dimension: number) => {
  const imageParts = image.split('/');

  imageParts[imageParts.length - 1] = `${dimension}x${dimension}bb.jpg`;

  return imageParts.join('/');
};
