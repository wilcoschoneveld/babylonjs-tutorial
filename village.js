import * as BABYLON from "@babylonjs/core";

export function createGround() {
    const matGround = new BABYLON.StandardMaterial("matGroud");
    matGround.diffuseColor = new BABYLON.Color3(0.1, 0.5, 0.1);

    const ground = BABYLON.MeshBuilder.CreateGround("ground", { width: 15, height: 15 });

    ground.material = matGround;
}

export function createHouse(width) {
    const roofMat = new BABYLON.StandardMaterial("roofMat");
    roofMat.diffuseTexture = new BABYLON.Texture("https://assets.babylonjs.com/environments/roof.jpg");
    const boxMat = new BABYLON.StandardMaterial("boxMat");

    boxMat.diffuseTexture = new BABYLON.Texture(
        width == 2
            ? "https://assets.babylonjs.com/environments/semihouse.png"
            : "https://assets.babylonjs.com/environments/cubehouse.png"
    );

    const faceUV =
        width == 2
            ? [
                  new BABYLON.Vector4(0.6, 0.0, 1.0, 1.0), //rear face
                  new BABYLON.Vector4(0.0, 0.0, 0.4, 1.0), //front face
                  new BABYLON.Vector4(0.4, 0, 0.6, 1.0), //right side
                  new BABYLON.Vector4(0.4, 0, 0.6, 1.0), //left side
              ]
            : [
                  new BABYLON.Vector4(0.5, 0.0, 0.75, 1.0), //rear face
                  new BABYLON.Vector4(0.0, 0.0, 0.25, 1.0), //front face
                  new BABYLON.Vector4(0.25, 0, 0.5, 1.0), //right side
                  new BABYLON.Vector4(0.75, 0, 1.0, 1.0), //left side
              ];

    const box = BABYLON.MeshBuilder.CreateBox("box", { faceUV, wrap: true });
    box.scaling.x = width;
    box.position.y = 0.5;
    box.material = boxMat;

    const roof = BABYLON.MeshBuilder.CreateCylinder("roof", {
        diameter: 1.3,
        height: width + 0.1,
        tessellation: 3,
    });
    roof.scaling.x = 0.5;
    roof.rotation.z = BABYLON.Tools.ToRadians(90);
    roof.position.y = 1.15;
    roof.material = roofMat;

    return BABYLON.Mesh.MergeMeshes([box, roof], true, false, null, false, true);
}

export function createHousings() {
    const houseSingle = createHouse(1);
    houseSingle.rotation.y = -Math.PI / 16;
    houseSingle.position.x = -6.8;
    houseSingle.position.z = 2.5;

    const houseDouble = createHouse(2);
    houseDouble.rotation.y = -Math.PI / 16;
    houseDouble.position.x = -4.5;
    houseDouble.position.z = 3;

    const places = [
        //each entry is an array [house type, rotation, x, z]
        [1, -Math.PI / 16, -6.8, 2.5],
        [2, -Math.PI / 16, -4.5, 3],
        [2, -Math.PI / 16, -1.5, 4],
        [2, -Math.PI / 3, 1.5, 6],
        [2, (15 * Math.PI) / 16, -6.4, -1.5],
        [1, (15 * Math.PI) / 16, -4.1, -1],
        [2, (15 * Math.PI) / 16, -2.1, -0.5],
        [1, (5 * Math.PI) / 4, 0, -1],
        [1, Math.PI + Math.PI / 2.5, 0.5, -3],
        [2, Math.PI + Math.PI / 2.1, 0.75, -5],
        [1, Math.PI + Math.PI / 2.25, 0.75, -7],
        [2, Math.PI / 1.9, 4.75, -1],
        [1, Math.PI / 1.95, 4.5, -3],
        [2, Math.PI / 1.9, 4.75, -5],
        [1, Math.PI / 1.9, 4.75, -7],
        [2, -Math.PI / 3, 5.25, 2],
        [1, -Math.PI / 3, 6, 4],
    ];

    places.forEach(([type, angle, x, z], i) => {
        const house = type == 1 ? houseSingle : houseDouble;

        const instance = house.createInstance(`house${i}`);
        instance.rotation.y = angle;
        instance.position.x = x;
        instance.position.z = z;
    });
}
