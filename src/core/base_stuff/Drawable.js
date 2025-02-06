export function Drawable(Base) {
    return class extends Base {
        draw() {
            console.log("Dibujando en el lienzo: ", typeof(this));
        }
    };
}

