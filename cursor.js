const dpkCursor = document.createElement("div");
dpkCursor.classList.add("dpkCursor");
document.body.appendChild(dpkCursor);


function initCursor(speedOption = 0.25) {

    let dpkCursorMouse = { x: -100, y: -100 };
    let dpkCursorPos = { x: 0, y: 0 };
    let speed = speedOption;

    //center the circle around cursor

    window.addEventListener("mousemove", (e) => {
        dpkCursorMouse.x = e.x;
        dpkCursorMouse.y = e.y;
    });

    document.querySelectorAll('a, button, .name h1').forEach(element => {
        element.addEventListener('mouseover', () => {
            dpkCursor.classList.add('hover');
        });
        element.addEventListener('mouseout', () => {
            dpkCursor.classList.remove('hover');
        });
    });
    document.querySelectorAll('.job-timeline').forEach(element => {
        element.addEventListener('mouseover', () => {
            dpkCursor.classList.add('hidden');
        });
        element.addEventListener('mouseout', () => {
            dpkCursor.classList.remove('hidden');
        });
    });

    const updatePosition = () => {
        dpkCursorPos.x += (dpkCursorMouse.x - dpkCursorPos.x) * speed;
        dpkCursorPos.y += (dpkCursorMouse.y - dpkCursorPos.y) * speed;
        dpkCursor.style.transform = `translate3d(calc(${dpkCursorPos.x}px - 50%) ,calc(${dpkCursorPos.y}px - 50%),0)`;
    };

    function loop() {
        updatePosition();
        requestAnimationFrame(loop);
    }
    requestAnimationFrame(loop);

}


initCursor(0.15);
