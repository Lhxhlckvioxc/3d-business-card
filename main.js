import * as THREE from 'three';

let scene, camera, renderer, card;

function init() {
    // Create scene
    scene = new THREE.Scene();

    // Create camera
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    // Create renderer
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // Set the renderer's DOM element background to a video
    const video = document.createElement('video');
    video.src = '/assets/floater.mp4'; // Path to your video
    video.loop = true;
    video.muted = true;
    video.play();

    const videoTexture = new THREE.VideoTexture(video);
    videoTexture.minFilter = THREE.LinearFilter;
    videoTexture.magFilter = THREE.LinearFilter;
    videoTexture.format = THREE.RGBFormat;

    // Set the scene's background to the video texture
    scene.background = videoTexture;

    // Define rounded rectangle shape
    const shape = new THREE.Shape();
    const x = -1.5, y = -1; // Start point
    const width = 3, height = 2, radius = 0.2; // Size and radius

    shape.moveTo(x, y + radius);
    shape.lineTo(x, y + height - radius);
    shape.quadraticCurveTo(x, y + height, x + radius, y + height);
    shape.lineTo(x + width - radius, y + height);
    shape.quadraticCurveTo(x + width, y + height, x + width, y + height - radius);
    shape.lineTo(x + width, y + radius);
    shape.quadraticCurveTo(x + width, y, x + width - radius, y);
    shape.lineTo(x + radius, y);
    shape.quadraticCurveTo(x, y, x, y + radius);

    // Create geometry
    const geometry = new THREE.BoxGeometry(3, 2, 0.05); // Slimmer depth

    // Load textures from the public/assets directory
    const frontTexture = new THREE.TextureLoader().load('/assets/1.png');
    const backTexture = new THREE.TextureLoader().load('/assets/2.png');

    // Create materials for each face
    const materials = [
        new THREE.MeshBasicMaterial({ map: frontTexture }), // right
        new THREE.MeshBasicMaterial({ map: backTexture }),  // left
        new THREE.MeshBasicMaterial({ color: 0xffffff }),   // top
        new THREE.MeshBasicMaterial({ color: 0xffffff }),   // bottom
        new THREE.MeshBasicMaterial({ map: frontTexture }), // front
        new THREE.MeshBasicMaterial({ map: backTexture })   // back
    ];

    // Apply materials to geometry
    card = new THREE.Mesh(geometry, materials);
    scene.add(card);

    window.addEventListener('resize', onWindowResize, false);

    animate();
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
    requestAnimationFrame(animate);
    card.rotation.y += 0.01;
    renderer.render(scene, camera);
}

init();

