import fs from "fs";
import path from "path";
import sizeOf from "image-size";

const galleryLocation = "images";

export async function get(req, res, next) {
  fs.readdir(
    path.resolve("./static", galleryLocation, "thumbnails"),
    (error, files) => {
      res.setHeader("Content-Type", "application/json");
      if (error) res.end(JSON.stringify({ error }));

      res.end(
        JSON.stringify(
          files.map((file) => {
            const size = sizeOf(
              path.resolve("static", galleryLocation, "thumbnails", file)
            );
            return {
              fileName: file.replace(path.extname(file), ""),
              extension: path.extname(file),
              path: `${galleryLocation}`,
              ...size,
            };
          })
        )
      );
    }
  );
}
