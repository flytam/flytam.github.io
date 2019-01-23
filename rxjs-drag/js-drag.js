const drag = document.getElementById("drag");

let isDrag = false;
let initialX = null,
    initialY = null;

drag.addEventListener("mousedown", function(e) {
    isDrag = true;
    const { left, top } = drag.getBoundingClientRect();
    initialX = e.clientX - left;
    initialY = e.clientY - top;
});

document.addEventListener("mouseup", function(e) {
    isDrag = false;
});

document.addEventListener("mousemove", function(e) {
    if (isDrag) {
        drag.style.left = `${e.clientX - initialX}px`;
        drag.style.top = `${e.clientY - initialY}px`;
    }
});
