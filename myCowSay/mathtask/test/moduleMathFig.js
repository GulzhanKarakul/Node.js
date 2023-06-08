const log = console.log;

export class Triangle {
    perimeter(side1, side2, side3) {
        log(side1 + side2 + side3);
    }

    area(base, height) {
        log((base * height) / 2);
    }
}

export class Circle {
    perimeter(radius) {
        log(2 * Math.PI * radius);
    }

    area(radius) {
        log(Math.PI * radius * radius);
    }
}

export class Rectangle {
    perimeter(width, height) {
        log(2 * (width + height));
    }

    area(width, height) {
        log(width * height);
    }
} 