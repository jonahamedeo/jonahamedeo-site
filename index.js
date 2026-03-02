document.addEventListener('DOMContentLoaded', function () {
    const items = document.querySelectorAll('.item');
 
    function getRadius() {
        // Larger radius for desktop, smaller for mobile
        return window.innerWidth > 768
            ? 250 // Desktop radius
            : window.innerWidth * 0.30; // Mobile radius
    }
 
    let radius = getRadius();
    let angle = 0;
 
    function updatePositions() {
        angle += 0.005;
 
        items.forEach((item, index) => {
            const itemAngle = angle + (index * (Math.PI * 2)) / items.length;
            const xPos = radius * Math.cos(itemAngle);
            const yPos = radius * Math.sin(itemAngle);
            item.style.transform = `translate(-50%, -50%) translate(${xPos}px, ${yPos}px)`;
        });
 
        requestAnimationFrame(updatePositions);
    }
 
    updatePositions();
 
    window.addEventListener('resize', () => {
        radius = getRadius();
    });
 });
 
 