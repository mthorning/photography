import exif from "jpeg-exif";
import sizeOf from "image-size";

export async function get(req, res, next) {
  const { fileName } = req.params;
  const path = `static/images/fullsize/${fileName}.jpg`;
  const size = sizeOf(path);
  const isPortrait = size.height > size.width;

  exif.parse(path, (error, data) => {
    res.setHeader("Content-Type", "application/json");
    if (error) res.end(JSON.stringify({ error }));
    res.end(JSON.stringify({ fileName, path, isPortrait, data, ...size }));
  });
}
