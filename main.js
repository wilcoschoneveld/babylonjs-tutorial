import "./style.css";
import * as BABYLON from "@babylonjs/core";

function createGround() {
    const matGround = new BABYLON.StandardMaterial("matGroud");
    matGround.diffuseColor = new BABYLON.Color3(0.1, 0.5, 0.1);

    const ground = BABYLON.MeshBuilder.CreateGround("ground", { width: 10, height: 10 });

    ground.material = matGround;
}

function createHouse() {
    const roofMat = new BABYLON.StandardMaterial("roofMat");
    roofMat.diffuseTexture = new BABYLON.Texture("https://assets.babylonjs.com/environments/roof.jpg");
    const boxMat = new BABYLON.StandardMaterial("boxMat");
    boxMat.diffuseTexture = new BABYLON.Texture("https://assets.babylonjs.com/environments/cubehouse.png");
    const faceUV = [
        new BABYLON.Vector4(0.5, 0.0, 0.75, 1.0), //rear face
        new BABYLON.Vector4(0.0, 0.0, 0.25, 1.0), //front face
        new BABYLON.Vector4(0.25, 0, 0.5, 1.0), //right side
        new BABYLON.Vector4(0.75, 0, 1.0, 1.0), //left side
    ];

    const box = BABYLON.MeshBuilder.CreateBox("box", { faceUV, wrap: true });
    box.position.y = 0.5;
    box.material = boxMat;

    const roof = BABYLON.MeshBuilder.CreateCylinder("roof", {
        diameter: 1.3,
        height: 1.1,
        tessellation: 3,
    });
    roof.scaling.x = 0.5;
    roof.rotation.z = BABYLON.Tools.ToRadians(90);
    roof.position.y = 1.15;
    roof.material = roofMat;
}

function createScene() {
    const scene = new BABYLON.Scene(engine);
    // Add a camera to the scene and attach it to the canvas
    const camera = new BABYLON.ArcRotateCamera(
        "camera",
        -Math.PI / 2,
        Math.PI / 2.5,
        3,
        new BABYLON.Vector3(0, 0, 0),
        scene
    );
    camera.attachControl(true);

    new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0));

    createGround();
    createHouse();

    return scene;
}

const canvas = document.getElementById("root"); // Get the canvas element
const engine = new BABYLON.Engine(canvas, true); // Generate the BABYLON 3D engine
// Add your code here matching the playground format
const scene = createScene(); //Call the createScene function
// Register a render loop to repeatedly render the scene
engine.runRenderLoop(function () {
    scene.render();
});
// Watch for browser/canvas resize events
window.addEventListener("resize", function () {
    engine.resize();
});
