Cesium-based-Vitrual-Reality-Project
========
A VR Project developed on the Cesium framework.

3D Models comes from...
----
* `Room and ornaments` - Created with 3DS Max 2016
* `Windows and Doors` - Created with 3DS Max 2016
* `Desk` - Created with 3DS Max 2016
* `AE86` - Download from www.aigei.com
* `Chair` - Download from www.aigei.com

Pre-requisites
----
* [Node.js](https://nodejs.org/en/)
* Only tested with win-64 system, not sure whether or not it work properly with Linux.
* `.gltf` format models. Use [obj2gltf](https://github.com/YW-Ma/obj2gltf) to convert `.obj` file

Install
----
* Option 1: 
  * Clone
  * Unzip `1-ThirdParty_Specs_Source.zip`, `2-modules_and_Build.zip`, `3-temp.zip`, and `4-others.zip`
* Option 2:
  * Download from [release](https://github.com/YW-Ma/Cesium-based-Vitrual-Reality-Project/releases)\
Notice, maybe you need to reinstall the components in the folder`node_modules` using package.json. However, after doing this there's still a chance that the application can't fully operate -- the base map won't show up, for example. Updating [Cesium](https://www.npmjs.com/package/cesium) should help with this problem.

Usage
----
* Open the `Cesium-1.51 folder` in a terminal
* run `node server.js` in the terminal
* Open your browser and go to `http://localhost:8080/` to open the main page of Cesium
* Click `bumper cars` item
* Adjust perspective with the instruction in this image:

![](https://github.com/YW-Ma/Cesium-based-Vitrual-Reality-Project/blob/master/images/HELP2.jpg)

* Control your AE86 with the instruction in this image:

![](https://github.com/YW-Ma/Cesium-based-Vitrual-Reality-Project/blob/master/images/HELP1.jpg)
