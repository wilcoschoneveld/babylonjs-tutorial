import * as BABYLON from "@babylonjs/core";
import { Vector3 } from "@babylonjs/core";

export function createFountain() {
    const fountainProfile = [
        new BABYLON.Vector3(0, 0, 0),
        new BABYLON.Vector3(10, 0, 0),
        new BABYLON.Vector3(10, 4, 0),
        new BABYLON.Vector3(8, 4, 0),
        new BABYLON.Vector3(8, 1, 0),
        new BABYLON.Vector3(1, 2, 0),
        new BABYLON.Vector3(1, 15, 0),
        new BABYLON.Vector3(3, 17, 0),
    ];

    const fountain = BABYLON.MeshBuilder.CreateLathe("fountain", {
        shape: fountainProfile,
        sideOrientation: BABYLON.Mesh.DOUBLESIDE,
    });

    fountain.scaling = new Vector3(0.02, 0.02, 0.02);
    fountain.position.x = 2;
    fountain.position.z = 2.13;

    const particleSystem = new BABYLON.ParticleSystem("fountainWater", 5000);
    particleSystem.particleTexture = new BABYLON.Texture("https://playground.babylonjs.com/textures/flare.png");

    particleSystem.emitter = new BABYLON.Vector3(2, 0.32, 2.13); // the point at the top of the fountain
    particleSystem.minEmitBox = new BABYLON.Vector3(-0.01, 0, -0.01); // minimum box dimensions
    particleSystem.maxEmitBox = new BABYLON.Vector3(0.01, 0, 0.01); // maximum box dimensions

    particleSystem.color1 = new BABYLON.Color4(0.7, 0.8, 1.0, 1.0);
    particleSystem.color2 = new BABYLON.Color4(0.2, 0.5, 1.0, 1.0);
    particleSystem.blendMode = BABYLON.ParticleSystem.BLENDMODE_ONEONE;

    particleSystem.minSize = 0.005;
    particleSystem.maxSize = 0.03;
    particleSystem.minLifeTime = 0.3;
    particleSystem.maxLifeTime = 0.8;

    particleSystem.emitRate = 1500;

    particleSystem.direction1 = new BABYLON.Vector3(-1, 8, 1);
    particleSystem.direction2 = new BABYLON.Vector3(1, 8, -1);
    particleSystem.minEmitPower = 0.1;
    particleSystem.maxEmitPower = 0.3;
    particleSystem.updateSpeed = 0.01;
    particleSystem.gravity = new BABYLON.Vector3(0, -9.81, 0);
    particleSystem.start();
}
