import availablePrintSizes from './availablePrintSizes';

function rounder(x, dp) {
    return (Math.round(x * Math.pow(10, dp))) / Math.pow(10, dp)
}

// function calcDimensions(pixelWidth, pixelHeight) {
//     const minDPI = 150;

//     const h3 = pixelHeight / minDPI;
//     const h4 = pixelWidth / minDPI;

//     return {
//         inches: {
//             y: rounder(h3, 2),
//             x: rounder(h4, 2),
//         }
//     }
// }

function calcDPI(pixels, inches) {
    return Math.sqrt((pixels.x * pixels.y) / (inches.x * inches.y));
}

function calcPrice(cost) {
    // not sure of postage or VAT but hopefully this will 
    // cover it!
    const postage = 10;
    return Math.ceil(cost + 30 + postage);
}

export default function calcPrintSize(a, b) {
    const [pixelWidth, pixelHeight] = a > b ? [a, b] : [b, a];
    // const {inches: {x, y}} = calcDimensions(pixelWidth, pixelHeight)

    return availablePrintSizes.map(print => ({
        ...print,
        cropSize: `${pixelWidth} x ${pixelHeight}`,
        price: calcPrice(print.price),
        imgRatio: (pixelWidth / pixelHeight).toFixed(2),
        paperRatio: (print.x / print.y).toFixed(2),
        dpi: Math.round(calcDPI({x: pixelWidth, y: pixelHeight}, {x: print.x, y: print.y}))
    })).filter(print => {
        const diff = print.imgRatio - print.paperRatio
        console.log(diff);
        return diff < 0 ? diff > -0.05 : diff < 0.05
    });
}
