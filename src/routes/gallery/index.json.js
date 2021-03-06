import fs from "fs";
import path from "path";
import sizeOf from "image-size";

const thumbsLocation = "images/thumbnails";

export async function get(req, res, next) {
    fs.readdir(path.resolve("./static", thumbsLocation), (error, files) => {
        res.setHeader("Content-Type", "application/json");
        if (error) {
            res.end([]);
        } else {
            res.end(
                JSON.stringify(
                    files && files.length
                        ? files.map((file) => {
                            const size = sizeOf(
                                path.resolve("static", thumbsLocation, file)
                            );
                            return {
                                fileName: file.replace(path.extname(file), ""),
                                isPortrait: size.height > size.width,
                                ...size,
                            };
                        })
                        : []
                )
            );
        }
    });
}
