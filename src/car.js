import * as BABYLON from "@babylonjs/core";
import earcut from "earcut";

export function createCar() {
    //base
    const outline = [
        new BABYLON.Vector3(-0.3, 0, -0.1),
        new BABYLON.Vector3(0.2, 0, -0.1),
        ...new Array(20).fill(null).map(
            (_, i) =>
                new BABYLON.Vector3(
                    0.2 * Math.cos((i * Math.PI) / 40), // x
                    0, // y
                    0.2 * Math.sin((i * Math.PI) / 40) - 0.1 // z
                )
        ),
        new BABYLON.Vector3(0, 0, 0.1),
        new BABYLON.Vector3(-0.3, 0, 0.1),
    ];

    //face UVs
    const faceUV = [];
    faceUV[0] = new BABYLON.Vector4(0, 0.5, 0.38, 1);
    faceUV[1] = new BABYLON.Vector4(0, 0, 1, 0.5);
    faceUV[2] = new BABYLON.Vector4(0.38, 1, 0, 0.5);

    //material
    const carMat = new BABYLON.StandardMaterial("carMat");
    carMat.diffuseTexture = new BABYLON.Texture("https://assets.babylonjs.com/environments/car.png");

    const car = BABYLON.MeshBuilder.ExtrudePolygon(
        "car",
        { shape: outline, depth: 0.2, faceUV, wrap: true },
        undefined,
        earcut
    );
    car.material = carMat;

    //wheel face UVs
    const wheelUV = [];
    wheelUV[0] = new BABYLON.Vector4(0, 0, 1, 1);
    wheelUV[1] = new BABYLON.Vector4(0, 0.5, 0, 0.5);
    wheelUV[2] = new BABYLON.Vector4(0, 0, 1, 1);

    //car material
    const wheelMat = new BABYLON.StandardMaterial("wheelMat");
    wheelMat.diffuseTexture = new BABYLON.Texture("https://assets.babylonjs.com/environments/wheel.png");

    const wheelRB = BABYLON.MeshBuilder.CreateCylinder("wheelRB", { diameter: 0.125, height: 0.05, faceUV: wheelUV });
    wheelRB.material = wheelMat;
    wheelRB.parent = car;
    wheelRB.position.z = -0.1;
    wheelRB.position.x = -0.2;
    wheelRB.position.y = 0.01;

    const animWheel = new BABYLON.Animation(
        "wheelAnimation",
        "rotation.y",
        30,
        BABYLON.Animation.ANIMATIONTYPE_FLOAT,
        BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE
    );

    animWheel.setKeys([
        { frame: 0, value: 0 },
        { frame: 30, value: BABYLON.Tools.ToRadians(360) },
    ]);

    wheelRB.animations = [animWheel];

    const wheelRF = wheelRB.clone("wheelRF");
    wheelRF.position.x = 0.1;

    const wheelLB = wheelRB.clone("wheelLB");
    wheelLB.position.y = -0.2 - 0.01;

    const wheelLF = wheelRF.clone("wheelLF");
    wheelLF.position.y = -0.2 - 0.01;

    return { car };
}
