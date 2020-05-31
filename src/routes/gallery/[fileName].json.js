import fs from "fs";
import path from "path";
import sizeOf from "image-size";

const thumbsLocation = "images/thumbnails";

function strip(file) {
  return file.replace(path.extname(file), "");
}

export async function get(req, res) {
  const { fileName } = req.params;
  const imagePath = `static/images/fullsize/${fileName}.jpg`;
  const size = sizeOf(imagePath);
  const isPortrait = size.height > size.width;

  fs.readdir(path.resolve("./static", thumbsLocation), (error, files) => {
    res.setHeader("Content-Type", "application/json");
    if (error) res.end(JSON.stringify({ error }));

    const currentIdx = files.findIndex((file) => strip(file) === fileName);
    const last = files.length - 1;
    const previous = strip(
      currentIdx === last ? files[0] : files[currentIdx + 1]
    );
    const next = strip(currentIdx === 0 ? files[last] : files[currentIdx - 1]);

    res.end(
      JSON.stringify({
        fileName,
        imagePath,
        isPortrait,
        ...size,
        next,
        previous,
      })
    );
  });
}
