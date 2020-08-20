import availablePrintSizes from './availablePrintSizes';

function rounder(x, dp) {
    return (Math.round(x * Math.pow(10, dp))) / Math.pow(10, dp)
}

function calcDimensions(width, height) {
    const dpi = 300;

    const h1 = (height / dpi) * 2.54;
    const h2 = (width / dpi) * 2.54;
    const h3 = height / dpi;
    const h4 = width / dpi;

    return {
        cm: {
            y: rounder(h1, 2),
            x: rounder(h2, 2),
        },
        in: {
            y: rounder(h3, 2),
            x: rounder(h4, 2),
        }
    }
}

function calcPrice(cost) {
    // not sure of postage or VAT but hopefully this will 
    // cover it!
    const postage = 10;
    return Math.ceil(cost + 30 + postage);
}

export default function calcPrintSize(...args) {
    const {in: {x, y}} = calcDimensions(...args)
    const [longestEdge, shortestEdge] = x > y ? [x, y] : [y, x];

    return availablePrintSizes.filter(available => {

        let matchScore = ((longestEdge / shortestEdge) - (available.x / available.y));
        matchScore < 0 ? matchScore = matchScore * -1 : matchScore;
        return matchScore < 0.05 && longestEdge > available.x && shortestEdge > available.y

    }).map(print => ({...print, price: calcPrice(print.price)}));
}
