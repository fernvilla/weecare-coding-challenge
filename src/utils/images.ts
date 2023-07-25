// Replaces the last part of the image url with the given dimension to better fit the screen
export const generateImageWithSizeFromUrl = (image: string, dimension: number) => {
  const imageParts = image.split('/');

  imageParts[imageParts.length - 1] = `${dimension}x${dimension}bb.jpg`;

  return imageParts.join('/');
};
