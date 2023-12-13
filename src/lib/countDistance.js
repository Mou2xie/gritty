
function countDistance(clickPoint, targetElement) {
    const distance = Math.sqrt((targetElement.getBoundingClientRect().x - clickPoint.x) ** 2 + (targetElement.getBoundingClientRect().y - clickPoint.y) ** 2);
    return distance
}

export { countDistance }