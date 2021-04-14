import "./style.css";
import * as BABYLON from "@babylonjs/core";
import "@babylonjs/loaders";
import { createGround, createHousings } from "./village";
import { createCar } from "./car";

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
    camera.lowerRadiusLimit = 2;
    camera.radius = 20;
    camera.alpha = Math.PI / 4;
    camera.beta = Math.PI / 3;
    camera.attachControl(true);

    new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0));

    createGround();
    createHousings();

    const { car } = createCar();
    car.rotation.x = -Math.PI / 2;
    car.rotation.y = -Math.PI / 2;
    car.position.x = 3;
    car.position.z = -8;
    car.position.y = 0.16;
    for (const wheel of car.getChildren()) {
        scene.beginAnimation(wheel, 0, 30, true);
    }

    const animCar = new BABYLON.Animation(
        "carAnimation",
        "position.z",
        30,
        BABYLON.Animation.ANIMATIONTYPE_FLOAT,
        BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE
    );
    const carKeys = [];
    carKeys.push({
        frame: 0,
        value: -8,
    });
    carKeys.push({
        frame: 150,
        value: 8,
    });
    animCar.setKeys(carKeys);
    car.animations = [];
    car.animations.push(animCar);
    scene.beginAnimation(car, 0, 210, true);

    BABYLON.SceneLoader.ImportMesh(
        "RootNode",
        "./assets/low-poly_racoon_run_animation/",
        "scene.gltf",
        scene,
        ([racoon]) => {
            racoon.scaling = new BABYLON.Vector3(0.25, 0.25, 0.25);
        }
    );

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
