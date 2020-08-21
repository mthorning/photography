import fs from "fs";
import path from "path";
import sizeOf from "image-size";
import {ExifImage} from "exif";
import calcPrintSize from "../../utils/calcPrintSize"

function splitSize({ImageDescription}) {
    const cropSizeMatch = ImageDescription && ImageDescription.match(/\[\d+,\ ?\d+\]/);
    const cropSize = cropSizeMatch ? cropSizeMatch[0] : null;
    const printSizes = cropSize ? calcPrintSize(...JSON.parse(cropSize)) : []
    const description = ImageDescription && ImageDescription.replace(cropSize, '');
    return {printSizes, description};
}

function getExif(image) {
    return new Promise((resolve, reject) => {
        try {
            new ExifImage({image}, function (error, data) {
                if (error) {
                    reject(error);
                } else {
                    const {exif, image} = data;
                    const {printSizes, description} = splitSize(image);
                    resolve({
                        shutter: exif.ExposureTime,
                        apperture: exif.FNumber,
                        iso: exif.ISO,
                        focalLength: exif.FocalLength,
                        description,
                        printSizes,
                        exif,
                    });
                }
            });
        } catch (error) {
            reject(error);
        }
    });
}

const thumbsLocation = "images/thumbnails";

function strip(file) {
    return file.replace(path.extname(file), "");
}

function sendResponse(res, response) {
    res.end(JSON.stringify(response));
}

export function get(req, res) {
    const {fileName} = req.params;
    const imagePath = `static/images/fullsize/${fileName}.jpg`;
    const metaPromise = getExif(imagePath);
    const size = sizeOf(imagePath);
    const isPortrait = size.height > size.width;

    fs.readdir(path.resolve("./static", thumbsLocation), (error, files) => {
        res.setHeader("Content-Type", "application/json");
        if (error) res.end(JSON.stringify({error}));

        const currentIdx = files.findIndex((file) => strip(file) === fileName);
        const last = files.length - 1;
        const next = strip(currentIdx === last ? files[0] : files[currentIdx + 1]);
        const previous = strip(
            currentIdx === 0 ? files[last] : files[currentIdx - 1]
        );

        const response = {
            fileName,
            imagePath,
            isPortrait,
            ...size,
            next,
            previous,
        };

        Promise.all([metaPromise])
            .then(([meta]) => {
                sendResponse(res, {
                    ...response,
                    meta,
                });
            })
            .catch((error) => {
                console.error("Something happened", error);
                sendResponse(res, response);
            });
    });
}
