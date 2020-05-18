import fs from "fs";
import path from "path";
import sizeOf from "image-size";

const thumbsLocation = "images/thumbnails";

export async function get(req, res, next) {
  fs.readdir(path.resolve("./static", thumbsLocation), (error, files) => {
    res.setHeader("Content-Type", "application/json");
    if (error) res.end(JSON.stringify({ error }));

    res.end(
      JSON.stringify(
        files.map((file) => {
          const size = sizeOf(path.resolve("static", thumbsLocation, file));
          return {
            fileName: file.replace(path.extname(file), ""),
            extension: path.extname(file),
            ...size,
          };
        })
      )
    );
  });
}
