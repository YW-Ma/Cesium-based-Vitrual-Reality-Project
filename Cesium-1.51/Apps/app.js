let view = new Cesium.Viewer('cesiumContainer',{
    baseLayerPicker: true,
    terrainProvider : Cesium.createWorldTerrain(),
    // imageryProvider: new Cesium.ArcGisMapServerImageryProvider({
    //         url: 'http://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer'
    //     })
});

var scene = view.scene;

var entity;
//var positionProperty;

var terrainProvider;

//
var positions;
 
var modelMatrix = Cesium.Transforms.eastNorthUpToFixedFrame(
    // Cesium.Cartesian3.fromDegrees(138.847899,36.470642, 820));
    Cesium.Cartesian3.fromDegrees(-73.998114468289017509, 40.674512895646692812, 0));
var model = scene.primitives.add(Cesium.Model.fromGltf({
    url : './temp/test2.gltf',//如果为bgltf则为.bgltf
    modelMatrix : modelMatrix,
    scale : 0.001
}));

// Create an initial camera view
// var initialPosition = new Cesium.Cartesian3.fromDegrees(138.847899,36.470642, 820);
var initialPosition = new Cesium.Cartesian3.fromDegrees(-73.998114468289017509, 40.674512895646692812, 0);
var initialOrientation = new Cesium.HeadingPitchRoll.fromDegrees(0,0,0);
var homeCameraView = {
    destination : initialPosition,
    orientation : {
        heading : initialOrientation.heading,
        pitch : initialOrientation.pitch,
        roll : initialOrientation.roll
    }
};

view.scene.camera.setView(homeCameraView);
view.camera.flyTo({
    // destination: Cesium.Cartesian3.fromDegrees(138.847899,36.470642, 820),
    destination: Cesium.Cartesian3.fromDegrees(-73.998114468289017509, 40.674512895646692812, 10),
    orientation: new Cesium.HeadingPitchRoll(0, -1.5, 0),
    endTransform: Cesium.Matrix4.IDENTITY
});

// 小车旋转角度
let radian = Cesium.Math.toRadians(5.0);
// 小车的速度
let speed = 0.1;
// 速度矢量
let speedVector = new Cesium.Cartesian3();
let first_speed = speedVector;
// 起始位置
// let position = Cesium.Cartesian3.fromDegrees(138.850899,36.473642, 820);
let position = Cesium.Cartesian3.fromDegrees(-73.99811136781227, 40.6745141286953,-0.4);
let position2 = Cesium.Cartesian3.fromDegrees(-73.99811136781227, 40.6745291286953,-0.4);


// 用于设置小车方向
let hpRoll = new Cesium.HeadingPitchRoll();
let hpRoll2 = new Cesium.HeadingPitchRoll();
let fixedFrameTransforms =  Cesium.Transforms.localFrameToFixedFrameGenerator('north', 'west');
// 添加小车模型
// let carPrimitive = scene.primitives.add(Cesium.Model.fromGltf({
//     url: '../Apps/SampleData/models/CesiumMilkTruck/CesiumMilkTruck-kmc.glb',
//     modelMatrix: Cesium.Transforms.headingPitchRollToFixedFrame(position, hpRoll, Cesium.Ellipsoid.WGS84, fixedFrameTransforms),
//     scale:0.1
//     // minimumPixelSize:128
// }));

let carPrimitive = scene.primitives.add(Cesium.Model.fromGltf({
    url: './temp/ae86.gltf',
    modelMatrix: Cesium.Transforms.headingPitchRollToFixedFrame(position, hpRoll, Cesium.Ellipsoid.WGS84, fixedFrameTransforms),
    scale:0.0023
    // minimumPixelSize:128
}));

let car2 = scene.primitives.add(Cesium.Model.fromGltf({
    url: './temp/ae86.gltf',
    modelMatrix: Cesium.Transforms.headingPitchRollToFixedFrame(position2, hpRoll2, Cesium.Ellipsoid.WGS84, fixedFrameTransforms),
    scale:0.0023
    // minimumPixelSize:128
}));

/**/

let window1 = scene.primitives.add(Cesium.Model.fromGltf({
    id:"window1",
    url: './temp/window7.gltf',
    modelMatrix: modelMatrix,
    scale:0.001
    // minimumPixelSize:128
}));
let aircon = scene.primitives.add(Cesium.Model.fromGltf({
    id:"test3.gltf",
    url: './temp/test3.gltf',
    modelMatrix: modelMatrix,
    scale:0.001
    // minimumPixelSize:128
}));

let window2 = scene.primitives.add(Cesium.Model.fromGltf({
    id:"window2",
    url: './temp/window2.gltf',
    modelMatrix: modelMatrix,
    scale:0.001
    // minimumPixelSize:128
}));

let window3 = scene.primitives.add(Cesium.Model.fromGltf({
    id:"window3",
    url: './temp/window3.gltf',
    modelMatrix: modelMatrix,
    scale:0.001
    // minimumPixelSize:128
}));

let window4 = scene.primitives.add(Cesium.Model.fromGltf({
    id:"window4",
    url: './temp/window4.gltf',
    modelMatrix: modelMatrix,
    scale:0.001
    // minimumPixelSize:128
}));

let window5 = scene.primitives.add(Cesium.Model.fromGltf({
    id:"window5",
    url: './temp/window5.gltf',
    modelMatrix: modelMatrix,
    scale:0.001
    // minimumPixelSize:128
}));


var handler = new Cesium.ScreenSpaceEventHandler(view.scene.canvas);
        handler.setInputAction(function(click) {
           // 处理鼠标按下事件
           // 获取鼠标当前位置
            //console.log('1111');
            var pick = view.scene.pick(click.position);
            //选中某模型   pick选中的对象
            if(pick && pick.id){
                console.log(pick.id);
                speedVector = Cesium.Cartesian3.multiplyByScalar(Cesium.Cartesian3.UNIT_X,speed,speedVector);
                position = Cesium.Matrix4.multiplyByPoint(pick.primitive.modelMatrix ,speedVector, position);
                Cesium.Transforms.eastNorthUpToFixedFrame(position, Cesium.Ellipsoid.WGS84, pick.primitive.modelMatrix);
            }
         }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

        handler.setInputAction(function(click) {
           // 处理鼠标按下事件
           // 获取鼠标当前位置
            //console.log('1111');
            var pick = view.scene.pick(click.position);
            //选中某模型   pick选中的对象
            if(pick && pick.id){
                console.log(pick.id);
                speedVector = Cesium.Cartesian3.multiplyByScalar(Cesium.Cartesian3.UNIT_X,-1*speed,speedVector);
                position = Cesium.Matrix4.multiplyByPoint(pick.primitive.modelMatrix ,speedVector, position);
                Cesium.Transforms.eastNorthUpToFixedFrame(position, Cesium.Ellipsoid.WGS84, pick.primitive.modelMatrix);
            }
         }, Cesium.ScreenSpaceEventType.RIGHT_CLICK);
/**/

// 小车状态标志
let flag = {
    moveUp:false,
    moveDown:false,
    moveLeft:false,
    moveRight:false
};


let flag2 = {
    moveUp:false,
    moveDown:false,
    moveLeft:false,
    moveRight:false
};
var c_flag=0;//判断是哪个小车在动 1和2为取值
var push=0;//判断是不是要推动小车
// 根据键盘按键返回标志
function setFlagStatus(key,value) {
    switch (key.keyCode){
    case 84:
        // 小车1推动小车2
        push=1;
        break;
    case 82:
        // 小车1不推动小车2
        push=0;
        break;
    case 37:
        // 左
        flag.moveLeft = value;
        c_flag=1;
        break;
    case 65:
    //左
        flag2.moveLeft = value;
        c_flag=2;
        break;
    case 38:
        // 上
        flag.moveUp = value;
        c_flag=1;
        break;
    case 87:
        // 上
        flag2.moveUp = value;
        c_flag=2;
        break;
    case 39:
        // 右
        flag.moveRight = value;
        c_flag=1;
        break;
    case 68:
        // 右
        flag2.moveRight = value;
        c_flag=2;
        break;
    case 40:
     // 下
        flag.moveDown = value;
        c_flag=1;
        break;
     case 83:
     // 下
        flag2.moveDown = value;
        c_flag=2;
        break;

        

    }
}

var la;
var lo;
var hi;

document.addEventListener('keydown',(e)=>{
    setFlagStatus(e, true);
    // console.log("xyz:",position,"\nla:",la,"\nlo",lo,"\nhi:",hi);
});

document.addEventListener('keyup',(e)=>{
    setFlagStatus(e, false);
    // console.log({la:la,lo:lo});
});
// 对帧添加监听事件
view.clock.onTick.addEventListener((clock)=>{

    if(flag.moveUp){

        if(flag.moveLeft){
            hpRoll.heading -= radian;
        }

        if(flag.moveRight){
            hpRoll.heading += radian;
        }
        moveCar(true);
    }
    if(flag2.moveUp){

        if(flag2.moveLeft){
            hpRoll2.heading -= radian;
        }

        if(flag2.moveRight){
            hpRoll2.heading += radian;
        }
        moveCar(true);
    }

    if(flag.moveDown){
        if(flag.moveLeft){
            hpRoll.heading -= radian;
        }

        if(flag.moveRight){
            hpRoll.heading += radian;
        }
        moveCar(false);
    }
    if(flag2.moveDown){
        if(flag2.moveLeft){
            hpRoll2.heading -= radian;
        }

        if(flag2.moveRight){
            hpRoll2.heading += radian;
        }
        moveCar(false);
    }

});

// 移动小车
var ellipsoid = view.scene.globe.ellipsoid;
//速度标志
var s_flag=0;
//var tp=position;
//var t_speed=speedVector;

function moveCar(isUP) {
    // 计算速度矩阵
    if (!s_flag) {
    	if(isUP>0){
            speedVector = Cesium.Cartesian3.multiplyByScalar(Cesium.Cartesian3.UNIT_X,speed,speedVector);
	    }else{
            speedVector = Cesium.Cartesian3.multiplyByScalar(Cesium.Cartesian3.UNIT_X,-speed,speedVector);
	    }
    }else{
    	if(isUP>0){
        	speedVector = Cesium.Cartesian3.multiplyByScalar(Cesium.Cartesian3.UNIT_X,-2*speed,speedVector);
	    }else{
	        speedVector = Cesium.Cartesian3.multiplyByScalar(Cesium.Cartesian3.UNIT_X,2*speed,speedVector);
	    }
    	s_flag=0;
    }

    var collide=0;
    
    // 根据速度计算出下一个位置的坐标
    if (c_flag==1) {
        position = Cesium.Matrix4.multiplyByPoint(carPrimitive.modelMatrix ,speedVector, position);
        var wgs84 = ellipsoid.cartesianToCartographic(position);
        lo =Cesium.Math.toDegrees(wgs84.longitude);
        la =Cesium.Math.toDegrees(wgs84.latitude);

        var wgs842 = ellipsoid.cartesianToCartographic(position2);
        lo2 =Cesium.Math.toDegrees(wgs842.longitude);
        la2 =Cesium.Math.toDegrees(wgs842.latitude);

        hi=wgs84.height;
        
        output={long:lo-lo2,lati:la-la2}
        console.log(output)
        //{long: -0.0000012625563670098927, lati: -0.000007608711896978093}
        //{long: 0.000002917964863513589, lati: 0.000007966570080952806}
        if(push==1)
        {
            //((-0.000001<lo-lo2&&lo-lo2<0.0000029)&&(-0.000007<la-la2&&la-la2<0.000007))||
            if (!(lo>=-73.9982840763837&&lo<=-73.99794665924084  &&  la>=40.67445121805186&&la<=40.67457703933874)||(lo>=-73.99807549730306&&lo<=-73.99802465616926  &&  la>=40.67447014246891&&la<=40.67450357602567)||(lo>=-73.99807549730306&&lo<=-73.99801931243387  &&  la>=40.67452138021343&&la<=40.674555114019654)||(lo>=-73.99819257805258&&lo<=-73.9981449478431  &&  la>=40.67447087300144&&la<=40.674504192100436)||(lo>=-73.99818444545389&&lo<=-73.9981449478431  &&  la>=40.67452275130136&&la<=40.674557465678824)) {
                // if (lo<=(138.848899+0.001)&&lo>=(138.848899-0.001)&&la<=(36.470642+0.004)&&la>=(36.470642-0.004)) {
                    // alert("碰上了！！");
                    if (s_flag) {
                        Cesium.Transforms.headingPitchRollToFixedFrame(position, hpRoll, Cesium.Ellipsoid.WGS84, fixedFrameTransforms, carPrimitive.modelMatrix);
                    }
                    s_flag=1;
               }
                //小车移动
                else
                {
                    if(((-0.000001<lo-lo2&&lo-lo2<0.0000029)&&(-0.000007<la-la2&&la-la2<0.000007))){
                        position2 = Cesium.Matrix4.multiplyByPoint(car2.modelMatrix ,speedVector, position2);
                        Cesium.Transforms.headingPitchRollToFixedFrame(position2, hpRoll2, Cesium.Ellipsoid.WGS84, fixedFrameTransforms, car2.modelMatrix);
                        
                    }
                    Cesium.Transforms.headingPitchRollToFixedFrame(position, hpRoll, Cesium.Ellipsoid.WGS84, fixedFrameTransforms, carPrimitive.modelMatrix);    
                }
        
                //c_flag=0;
        }
        else
        {
            if (((-0.000001<lo-lo2&&lo-lo2<0.0000029)&&(-0.000007<la-la2&&la-la2<0.000007))||!(lo>=-73.9982840763837&&lo<=-73.99794665924084  &&  la>=40.67445121805186&&la<=40.67457703933874)||(lo>=-73.99807549730306&&lo<=-73.99802465616926  &&  la>=40.67447014246891&&la<=40.67450357602567)||(lo>=-73.99807549730306&&lo<=-73.99801931243387  &&  la>=40.67452138021343&&la<=40.674555114019654)||(lo>=-73.99819257805258&&lo<=-73.9981449478431  &&  la>=40.67447087300144&&la<=40.674504192100436)||(lo>=-73.99818444545389&&lo<=-73.9981449478431  &&  la>=40.67452275130136&&la<=40.674557465678824)) {
                // if (lo<=(138.848899+0.001)&&lo>=(138.848899-0.001)&&la<=(36.470642+0.004)&&la>=(36.470642-0.004)) {
                    // alert("碰上了！！");
                    if (s_flag) {
                        Cesium.Transforms.headingPitchRollToFixedFrame(position, hpRoll, Cesium.Ellipsoid.WGS84, fixedFrameTransforms, carPrimitive.modelMatrix);
                    }
                    s_flag=1;
               }
                //小车移动
                else
                {
                    Cesium.Transforms.headingPitchRollToFixedFrame(position, hpRoll, Cesium.Ellipsoid.WGS84, fixedFrameTransforms, carPrimitive.modelMatrix);
                }
        
                //c_flag=0;
        }

    }
    
    if (c_flag==2) {
        position2 = Cesium.Matrix4.multiplyByPoint(car2.modelMatrix ,speedVector, position2);
        var wgs84 = ellipsoid.cartesianToCartographic(position2);
        lo =Cesium.Math.toDegrees(wgs84.longitude);
        la =Cesium.Math.toDegrees(wgs84.latitude);
        hi=wgs84.height;

        var wgs841 = ellipsoid.cartesianToCartographic(position);
        lo1 =Cesium.Math.toDegrees(wgs841.longitude);
        la1 =Cesium.Math.toDegrees(wgs841.latitude);
    
        if (((-0.000001<lo-lo1&&lo-lo1<0.000001)&&(-0.000001<la-la1&&la-la1<0.000001))||!(lo>=-73.9982840763837&&lo<=-73.99794665924084  &&  la>=40.67445121805186&&la<=40.67457703933874)||(lo>=-73.99807549730306&&lo<=-73.99802465616926  &&  la>=40.67447014246891&&la<=40.67450357602567)||(lo>=-73.99807549730306&&lo<=-73.99801931243387  &&  la>=40.67452138021343&&la<=40.674555114019654)||(lo>=-73.99819257805258&&lo<=-73.9981449478431  &&  la>=40.67447087300144&&la<=40.674504192100436)||(lo>=-73.99818444545389&&lo<=-73.9981449478431  &&  la>=40.67452275130136&&la<=40.674557465678824)) {
        // if (lo<=(138.848899+0.001)&&lo>=(138.848899-0.001)&&la<=(36.470642+0.004)&&la>=(36.470642-0.004)) {
            // alert("碰上了！！");
            if (s_flag) {
                Cesium.Transforms.headingPitchRollToFixedFrame(position2, hpRoll2, Cesium.Ellipsoid.WGS84, fixedFrameTransforms, car2.modelMatrix);
            }
            s_flag=1;
       }
        //小车移动
        else
        {
            Cesium.Transforms.headingPitchRollToFixedFrame(position2, hpRoll2, Cesium.Ellipsoid.WGS84, fixedFrameTransforms, car2.modelMatrix);
        }
        //c_flag=0;
    }
}
// function collision()
// {
//     if((-0.001<(position.x-position2.x)<0.001)&&(-0.001<(position.y-position2.y)<0.001)&&(-0.001<(position.z-position2.z)<0.001))
//     {
//         return 1;
//     }
//     else
//     {
//         return 0;
//     }
// }


// DrawPosition();

// function DrawPosition() {
//     //得到当前三维场景
//     var scene = view.scene;
//     //得到当前三维场景的椭球体
//     var ellipsoid = scene.globe.ellipsoid;
//     var entity = view.entities.add({
//         label : {
//             show : false
//         }
//     });
//     var longitudeString = null;
//     var latitudeString = null;
//     var height = null;
//     var cartesian = null;
//     // 定义当前场景的画布元素的事件处理
//     var handler = new Cesium.ScreenSpaceEventHandler(scene.canvas);
//     handler.setInputAction(function(evt) {
//         var scene = view.scene;
//         if (scene.mode !== Cesium.SceneMode.MORPHING) {
//             var pickedObject = scene.pick(evt.position);
//             if (scene.pickPositionSupported && Cesium.defined(pickedObject) && pickedObject.node) {
//                 var cartesian = view.scene.pickPosition(evt.position);
//                 if (Cesium.defined(cartesian)) {
//                     var cartographic = Cesium.Cartographic.fromCartesian(cartesian);
//                     var lng = Cesium.Math.toDegrees(cartographic.longitude);
//                     var lat = Cesium.Math.toDegrees(cartographic.latitude);
//                     var height = cartographic.height;//模型高度
//                     var mapPosition={x:lng,y:lat,z:height}
//                 }
//             }
//         }
//     }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
//     //设置鼠标滚动事件的处理函数，这里负责监听高度值变化
//     handler.setInputAction(function(wheelment) {
//         height = Math.ceil(view.camera.positionCartographic.height);
//         entity.position = cartesian;
//         entity.label.show = true;
//         entity.label.text = '(' + longitudeString + ', ' + latitudeString + "," + height + ')' ;
//     }, Cesium.ScreenSpaceEventType.WHEEL);
// }


//小车爬升
    // terrainProvider = Cesium.createWorldTerrain();
    // positions = [
    //     position
    // ];
    // //var promise = 
    // Cesium.sampleTerrain(terrainProvider, 11, positions);
    // position=positions[0];

    // let position = Cesium.Cartesian3.fromDegrees(138.848899,36.470642, 820);
    // let position = Cesium.Cartesian3.fromDegrees(-73.999114468289017509, 40.674512895646692812,0);

    // LU    {la: 40.674573944492856, lo: -73.99828511023466}


    // L D   {la: 40.674448488557644, lo: -73.9982840763837}


    // R U    {la: 40.67445121805186, lo: -73.99794230429896}


    // R D    {la: 40.67457703933874, lo: -73.99794665924084}  

    //桌子： LU{la: 40.674553682527986, lo: -73.99818444545389}     {la: 40.674555114019654, lo: -73.99801931243387}     
    //      LD{la: 40.674522647402604, lo: -73.99818380606717}      {la: 40.67452138021343, lo: -73.99806437494863}     
    //      RU{la: 40.674557465678824, lo: -73.9981501322688}       {la: 40.67455342889202, lo: -73.9980313414943}      
    //      RD{la: 40.67452275130136, lo: -73.99815401118714}       {la: 40.674521558119835, lo: -73.99803589076478} 
    
    //      LU{la: 40.67450501656769, lo: -73.9981951685883}        {la: 40.67450357602567, lo: -73.99807241285733}
    //      RU{la: 40.674504192100436, lo: -73.99815236311674}      {la: 40.67450998731821, lo: -73.99802465616926}
    //      RD{la: 40.67447087300144, lo: -73.99815236311674}       {la: 40.67447014246891, lo: -73.99802465616266}
    //      LD{la: 40.67446611218291, lo: -73.99819257805258}       {la: 40.67446707861774, lo: -73.99806290693041}
    