const pathByTypeFn = (type) => {
  let pathSlice;
  let path;
  if (type === "jpeg" || type === "png") {
    pathSlice = "upload/uploadPhotos/slice";
    path = "upload/uploadPhotos/photos";
  } else if (type === "mp4") {
    pathSlice = "upload/uploadVideo/slice";
    path = "upload/uploadVideo/videos";
  }

  return { pathSlice, path };
};

module.exports = {
  pathByTypeFn,
};
