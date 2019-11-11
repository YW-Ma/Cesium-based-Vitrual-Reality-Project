var viewer = new Cesium.Viewer('cesiumContainer');


var scene=viewer.scene;
 
var modelMatrix = Cesium.Transforms.eastNorthUpToFixedFrame(
        Cesium.Cartesian3.fromDegrees(-75.62898254394531, 40.02804946899414, 0));
var model = scene.primitives.add(Cesium.Model.fromGltf({
    url : './temp/room1.gltf',//如果为bgltf则为.bgltf
    modelMatrix : modelMatrix,
    scale : 1.0
}));
 
viewer.camera.flyTo({
    destination : Cesium.Cartesian3.fromDegrees(-75.62898254394531, 40.02804946899414, 5000)
});
