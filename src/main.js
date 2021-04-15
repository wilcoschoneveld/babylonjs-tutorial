import "./style.css";
import * as BABYLON from "@babylonjs/core";
import "@babylonjs/loaders";
import { createSky, createGround, createHousings } from "./village";
import { createCar } from "./car";
import { showWorldAxis } from "./utility";
import { createFountain } from "./fountain";
import { createLamp } from "./lamp";

async function createScene() {
    const scene = new BABYLON.Scene(engine);
    // Add a camera to the scene and attach it to the canvas
    const camera = new BABYLON.ArcRotateCamera(
        //
        "camera",
        0,
        Math.PI / 3,
        20,
        new BABYLON.Vector3(0, 0, 0),
        scene
    );
    camera.lowerRadiusLimit = 2;
    camera.attachControl(true);

    const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0));
    light.intensity = 0.3;

    showWorldAxis(scene, 0.5);

    createSky();
    createGround();
    createHousings();
    createFountain();

    const lamp1 = createLamp();
    lamp1.position = new BABYLON.Vector3(2, 0, -1);

    const lamp2 = createLamp();
    lamp2.position = new BABYLON.Vector3(2.4, 0, 4.8);

    const lamp3 = createLamp();
    lamp3.position = new BABYLON.Vector3(-5, 0, 0.15);
    lamp3.rotation.y = BABYLON.Tools.ToRadians(-80);

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

    BABYLON.SceneLoader.ImportMesh("RootNode", "./low-poly_racoon_run_animation/", "scene.gltf", scene, ([racoon]) => {
        racoon.scaling = new BABYLON.Vector3(0.25, 0.25, -0.25);
        racoon.position.x = 0.7;

        scene.onBeforeRenderObservable.add(() => {
            racoon.movePOV(0, 0, 0.015);
            racoon.rotate(BABYLON.Axis.Y, BABYLON.Tools.ToRadians(1));
        });
    });

    function onPointerClick() {
        console.log(scene.pointerX, scene.pointerY);
        const pickInfo = scene.pick(scene.pointerX, scene.pointerY, (mesh) => mesh.name === "largeGround");
        console.log(
            //
            pickInfo.pickedPoint.x.toFixed(2),
            pickInfo.pickedPoint.y.toFixed(2),
            pickInfo.pickedPoint.z.toFixed(2)
        );
    }

    canvas.addEventListener("pointerdown", onPointerClick);

    scene.onDispose = function () {
        canvas.removeEventListener("pointerdown", onPointerClick);
    };

    const xr = await scene.createDefaultXRExperienceAsync({
        floorMeshes: [scene.getMeshByName("ground")],
    });

    return scene;
}

async function bootstrap() {
    // Add your code here matching the playground format
    const scene = await createScene(); //Call the createScene function
    // Register a render loop to repeatedly render the scene
    engine.runRenderLoop(function () {
        scene.render();
    });
    // Watch for browser/canvas resize events
    window.addEventListener("resize", function () {
        engine.resize();
    });
}

const canvas = document.getElementById("root"); // Get the canvas element
const engine = new BABYLON.Engine(canvas, true); // Generate the BABYLON 3D engine
bootstrap();
