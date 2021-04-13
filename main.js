import "./style.css";
import * as BABYLON from "@babylonjs/core";

const createScene = function () {
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

  new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);

  BABYLON.MeshBuilder.CreateBox("box", {}, scene);

  // Add a lights to the scene
  //Your Code
  return scene;
};

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
