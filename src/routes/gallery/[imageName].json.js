import exif from "jpeg-exif";

export async function get(req, res, next) {
  const { imageName } = req.params;
  const path = `/images/fullsize/${imageName}.jpg`;
  exif.parse("./static" + path, (error, data) => {
    console.log("hello", error, data);
    res.setHeader("Content-Type", "application/json");
    if (error) res.end(JSON.stringify({ error }));
    res.end(JSON.stringify({ name: imageName, path, data }));
  });
}
