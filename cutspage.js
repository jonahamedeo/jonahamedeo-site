// ✅ Select first 50 images from HTML before anything is cloned
const originalImages = Array.from(document.querySelectorAll('.CUT')).slice(0, 50);
const container = document.querySelector('.image-container');

// Motion speed
const speed = 0.4;

// Container dimensions
let containerWidth = container.clientWidth;
let containerHeight = container.clientHeight;

// Track floating image data
const imageData = originalImages.map(img => ({
  element: img,
  x: Math.random() * (containerWidth - 100),
  y: Math.random() * (containerHeight - 100),
  dx: (Math.random() < 0.5 ? -1 : 1) * (Math.random() * 0.3 + 0.2),
  dy: (Math.random() < 0.5 ? -1 : 1) * (Math.random() * 0.3 + 0.2)
}));

// Animate movement
function updatePositions() {
  imageData.forEach(data => {
    const el = data.element;
    data.x += data.dx * speed;
    data.y += data.dy * speed;

    if (data.x <= 0 || data.x + el.offsetWidth >= containerWidth) data.dx *= -1;
    if (data.y <= 0 || data.y + el.offsetHeight >= containerHeight) data.dy *= -1;

    el.style.position = 'absolute';
    el.style.left = `${data.x}px`;
    el.style.top = `${data.y}px`;
  });

  requestAnimationFrame(updatePositions);
}

// Recalculate boundaries on resize
window.addEventListener('resize', () => {
  containerWidth = container.clientWidth;
  containerHeight = container.clientHeight;
});

// Start floating animation
updatePositions();

// Add inspect popup to floating images
originalImages.forEach(image => {
  image.addEventListener('click', (e) => {
    if (!document.querySelector('.popup')) {
      const popup = document.createElement('div');
      popup.classList.add('popup');
      popup.innerHTML = `
        <div class="popup-content">
          <img src="${e.target.src}" class="popup-image">
          <span class="close-popup">X</span>
        </div>
      `;
      document.body.appendChild(popup);
      document.querySelector('.close-popup').addEventListener('click', () => popup.remove());
      popup.addEventListener('click', () => popup.remove());
    }
  });
});

// ✅ Build grid below (EXCLUDING floating 50)
const allImages = Array.from(document.querySelectorAll('.CUT'));
const gridOnlyImages = allImages.slice(50); // Exclude the 50 floating ones

const gridContainer = document.createElement('div');
gridContainer.id = 'image-grid';
document.body.appendChild(gridContainer);

// Build grid with clones
gridOnlyImages.forEach((image) => {
  const gridItem = document.createElement('div');
  gridItem.classList.add('grid-item');

  const clone = image.cloneNode(true);
  clone.classList.add('CUT');

  // Add popup to clone
  clone.addEventListener('click', (e) => {
    if (!document.querySelector('.popup')) {
      const popup = document.createElement('div');
      popup.classList.add('popup');
      popup.innerHTML = `
        <div class="popup-content">
          <img src="${e.target.src}" class="popup-image">
          <span class="close-popup">X</span>
        </div>
      `;
      document.body.appendChild(popup);
      document.querySelector('.close-popup').addEventListener('click', () => popup.remove());
      popup.addEventListener('click', () => popup.remove());
    }
  });

  gridItem.appendChild(clone);
  gridContainer.appendChild(gridItem);
});
