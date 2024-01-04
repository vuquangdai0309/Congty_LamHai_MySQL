
// JavaScript để cân chỉnh chiều cao
window.onload = function () {
    setEqualHeight(document.querySelectorAll('.responsive-image'));
};

function setEqualHeight(elements) {
    let maxHeight = 0;

    elements.forEach(function (element) {
        const elementHeight = element.clientHeight;
        maxHeight = Math.max(maxHeight, elementHeight);
    });

    elements.forEach(function (element) {
        element.style.height = maxHeight + 'px';
    });
}
