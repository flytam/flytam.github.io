const {
    fromEvent,
    operators: { map, takeUntil, concatAll, withLatestFrom }
} = rxjs;

const target = document.getElementById("drag");

const mouseDown = fromEvent(target, "mousedown");
const mouseMove = fromEvent(document, "mousemove");
const mouseUp = fromEvent(document, "mouseup");

mouseDown
    .pipe(
        map(e => {
            const { left, top } = e.target.getBoundingClientRect();
            const clickOffsetX = e.clientX - left;
            const clickOffsetY = e.clientY - top;
            return {
                clickOffsetX,
                clickOffsetY
            };
        }),
        map(({ clickOffsetX, clickOffsetY }) => {
            return mouseMove.pipe(
                takeUntil(mouseUp),
                map(moveEvent => ({
                    x: moveEvent.clientX - clickOffsetX,
                    y: moveEvent.clientY - clickOffsetY
                }))
            );
        }),
        concatAll()
    )
    .subscribe(({ x, y }) => {
        target.style.left = `${x}px`;
        target.style.top = `${y}px`;
    });
