<template>
  <div>
    <div id="world"></div>
    aaaaaa
  </div>
</template>
<script>
import * as THREE from "three";
export default {
  data() {
    return {
      camera: null, //相机
      scene: null, //场景对象
      renderer: null, //渲染器
      mesh: null, //网格模型
      container: null, //页面容器
      controls: null, //控制器
      fieldOfView: null,
      aspectRatio: null,
      nearPlane: null,
      farPlane: null,
      HEIGHT: null, //高度
      WIDTH: null, //宽度
      Colors: {
        red: 0xf25346,
        yellow: 0xedeb27,
        white: 0xd8d0d1,
        brown: 0x59332e,
        pink: 0xf5986e,
        brownDark: 0x23190f,
        blue: 0x68c3c0,
        green: 0x458248,
        purple: 0x551a8b,
        lightgreen: 0x629265
      },
      shadowLight: null,
      sky: null,
      forest: null,
      land: null,
      orbit: null,
      airplane: null,
      sun: null,
      fox: null,
      mousePos: { x: 0, y: 0 },
      offSet: -600
    };
  },
  methods: {
    createScene() {
      this.HEIGHT = window.innerHeight;
      this.WIDTH = window.innerWidth;
      //创建场景
      this.scene = new THREE.Scene();
      //将FOV雾效果添加到场景中。与样式表中的BG颜色相同。
      this.scene.fog = new THREE.Fog(0xf7d9aa, 100, 950);
      // 创建摄影机
      this.aspectRatio = this.WIDTH / this.HEIGHT;
      this.fieldOfView = 60;
      this.nearPlane = 1;
      this.farPlane = 10000;
      this.camera = new THREE.PerspectiveCamera(
        this.fieldOfView,
        this.aspectRatio,
        this.nearPlane,
        this.farPlane
      );
      //定位摄像机
      this.camera.position.x = 0;
      this.camera.position.y = 150;
      this.camera.position.z = 100;

      // 创建渲染器

      this.renderer = new THREE.WebGLRenderer({
        // Alpha使背景透明，抗锯齿性能很强
        alpha: true,
        antialias: true
      });
      //将渲染器的大小设置为全屏
      this.renderer.setSize(this.WIDTH, this.HEIGHT);
      //启用阴影渲染
      this.renderer.shadowMap.enabled = true;
      // 将渲染器添加到DOM中的world div
      this.container = document.getElementById("world");
      this.container.appendChild(this.renderer.domElement);

      //响应式倾听器
      window.addEventListener("resize", this.handleWindowResize, false);
    },
    handleWindowResize() {
      //响应函数
      this.HEIGHT = window.innerHeight;
      this.WIDTH = window.innerWidth;
      this.renderer.setSize(this.WIDTH, this.HEIGHT);
      this.camera.aspect = this.WIDTH / this.HEIGHT;
      this.camera.updateProjectionMatrix();
    },
    createLights() {
      // Gradient coloured light - Sky, Ground, Intensity
      this.hemisphereLight = new THREE.HemisphereLight(0xaaaaaa, 0x000000, 0.9);
      // Parallel rays
      this.shadowLight = new THREE.DirectionalLight(0xffffff, 0.9);

      this.shadowLight.position.set(0, 350, 350);
      this.shadowLight.castShadow = true;

      // define the visible area of the projected shadow
      this.shadowLight.shadow.camera.left = -650;
      this.shadowLight.shadow.camera.right = 650;
      this.shadowLight.shadow.camera.top = 650;
      this.shadowLight.shadow.camera.bottom = -650;
      this.shadowLight.shadow.camera.near = 1;
      this.shadowLight.shadow.camera.far = 1000;

      // Shadow map size
      this.shadowLight.shadow.mapSize.width = 2048;
      this.shadowLight.shadow.mapSize.height = 2048;

      // Add the lights to the scene
      this.scene.add(this.hemisphereLight);

      this.scene.add(this.shadowLight);
    },
    load() {
      var geom = new THREE.CylinderGeometry(600, 600, 1700, 40, 10);
      //rotate on the x axis
      geom.applyMatrix(new THREE.Matrix4().makeRotationX(-Math.PI / 2));
      //create a material
      var mat = new THREE.MeshPhongMaterial({
        color: this.Colors.lightgreen,
        shading: THREE.FlatShading
      });

      //create a mesh of the object
      this.mesh = new THREE.Mesh(geom, mat);
      //receive shadows
      this.mesh.receiveShadow = true;
    },

    Orbit() {
      var geom = new THREE.Object3D();

      this.mesh = geom;
      //this.mesh.add(sun);
    },
    Sun() {
      this.mesh = new THREE.Object3D();
      var sunGeom = new THREE.SphereGeometry(400, 20, 10);
      var sunMat = new THREE.MeshPhongMaterial({
        color: "0xedeb27",
        shading: THREE.FlatShading
      });
      var sun = new THREE.Mesh(sunGeom, sunMat);
      //sun.applyMatrix(new THREE.Matrix4().makeRotationX(-Math.PI/2));
      sun.castShadow = false;
      sun.receiveShadow = false;
      this.mesh.add(sun);
    },
    Cloud() {
      // Create an empty container for the cloud
      this.mesh = new THREE.Object3D();
      // Cube geometry and material
      var geom = new THREE.DodecahedronGeometry(20, 0);
      var mat = new THREE.MeshPhongMaterial({
        color: this.Colors.white
      });

      var nBlocs = 3 + Math.floor(Math.random() * 3);

      for (var i = 0; i < nBlocs; i++) {
        //Clone mesh geometry
        var m = new THREE.Mesh(geom, mat);
        //Randomly position each cube
        m.position.x = i * 15;
        m.position.y = Math.random() * 10;
        m.position.z = Math.random() * 10;
        m.rotation.z = Math.random() * Math.PI * 2;
        m.rotation.y = Math.random() * Math.PI * 2;

        //Randomly scale the cubes
        var s = 0.1 + Math.random() * 0.9;
        m.scale.set(s, s, s);
        this.mesh.add(m);
      }
    },
    Sky() {
      this.mesh = new THREE.Object3D();

      // Number of cloud groups
      this.nClouds = 25;

      // Space the consistenly
      let stepAngle = (Math.PI * 2) / this.nClouds;

      // Create the Clouds

      for (var i = 0; i < this.nClouds; i++) {
        var c = new this.Cloud();

        //set rotation and position using trigonometry
        let a = stepAngle * i;
        // this is the distance between the center of the axis and the cloud itself
        let h = 800 + Math.random() * 200;
        c.mesh.position.y = Math.sin(a) * h;
        c.mesh.position.x = Math.cos(a) * h;

        // rotate the cloud according to its position
        c.mesh.rotation.z = a + Math.PI / 2;

        // random depth for the clouds on the z-axis
        c.mesh.position.z = -400 - Math.random() * 400;

        // random scale for each cloud
        var s = 1 + Math.random() * 2;
        c.mesh.scale.set(s, s, s);

        this.mesh.add(c.mesh);
      }
    },
    Tree() {
      this.mesh = new THREE.Object3D();

      var matTreeLeaves = new THREE.MeshPhongMaterial({
        color: this.Colors.green,
        shading: THREE.FlatShading
      });

      var geonTreeBase = new THREE.BoxGeometry(10, 20, 10);
      var matTreeBase = new THREE.MeshBasicMaterial({
        color: this.Colors.brown
      });
      var treeBase = new THREE.Mesh(geonTreeBase, matTreeBase);
      treeBase.castShadow = true;
      treeBase.receiveShadow = true;
      this.mesh.add(treeBase);

      var geomTreeLeaves1 = new THREE.CylinderGeometry(1, 12 * 3, 12 * 3, 4);
      var treeLeaves1 = new THREE.Mesh(geomTreeLeaves1, matTreeLeaves);
      treeLeaves1.castShadow = true;
      treeLeaves1.receiveShadow = true;
      treeLeaves1.position.y = 20;
      this.mesh.add(treeLeaves1);

      var geomTreeLeaves2 = new THREE.CylinderGeometry(1, 9 * 3, 9 * 3, 4);
      var treeLeaves2 = new THREE.Mesh(geomTreeLeaves2, matTreeLeaves);
      treeLeaves2.castShadow = true;
      treeLeaves2.position.y = 40;
      treeLeaves2.receiveShadow = true;
      this.mesh.add(treeLeaves2);

      var geomTreeLeaves3 = new THREE.CylinderGeometry(1, 6 * 3, 6 * 3, 4);
      var treeLeaves3 = new THREE.Mesh(geomTreeLeaves3, matTreeLeaves);
      treeLeaves3.castShadow = true;
      treeLeaves3.position.y = 55;
      treeLeaves3.receiveShadow = true;
      this.mesh.add(treeLeaves3);
    },
    Flower() {
      this.mesh = new THREE.Object3D();

      var geomStem = new THREE.BoxGeometry(5, 50, 5, 1, 1, 1);
      var matStem = new THREE.MeshPhongMaterial({
        color: this.Colors.green,
        shading: THREE.FlatShading
      });
      var stem = new THREE.Mesh(geomStem, matStem);
      stem.castShadow = false;
      stem.receiveShadow = true;
      this.mesh.add(stem);

      var geomPetalCore = new THREE.BoxGeometry(10, 10, 10, 1, 1, 1);
      var matPetalCore = new THREE.MeshPhongMaterial({
        color: this.Colors.yellow,
        shading: THREE.FlatShading
      });
      var petalCore = new THREE.Mesh(geomPetalCore, matPetalCore);
      petalCore.castShadow = false;
      petalCore.receiveShadow = true;
      var petalColors = [this.Colors.red, this.Colors.yellow, this.Colors.blue];
      var petalColor = petalColors[Math.floor(Math.random() * 3)];

      var geomPetal = new THREE.BoxGeometry(15, 20, 5, 1, 1, 1);
      var matPetal = new THREE.MeshBasicMaterial({ color: petalColor });
      geomPetal.vertices[5].y -= 4;
      geomPetal.vertices[4].y -= 4;
      geomPetal.vertices[7].y += 4;
      geomPetal.vertices[6].y += 4;
      geomPetal.translate(12.5, 0, 3);

      var petals = [];
      for (var i = 0; i < 4; i++) {
        petals[i] = new THREE.Mesh(geomPetal, matPetal);
        petals[i].rotation.z = (i * Math.PI) / 2;
        petals[i].castShadow = true;
        petals[i].receiveShadow = true;
      }

      petalCore.add(petals[0], petals[1], petals[2], petals[3]);
      petalCore.position.y = 25;
      petalCore.position.z = 3;
      this.mesh.add(petalCore);
    },
    Forest() {
      this.mesh = new THREE.Object3D();

      // Number of Trees
      this.nTrees = 300;

      // Space the consistenly
      var stepAngle = (Math.PI * 2) / this.nTrees;

      // Create the Trees

      for (var i = 0; i < this.nTrees; i++) {
        let t = new this.Tree();

        //set rotation and position using trigonometry
        let a = stepAngle * i;
        // this is the distance between the center of the axis and the tree itself
        let h = 605;
        t.mesh.position.y = Math.sin(a) * h;
        t.mesh.position.x = Math.cos(a) * h;

        // rotate the tree according to its position
        t.mesh.rotation.z = a + (Math.PI / 2) * 3;

        //Andreas Trigo funtime
        //t.mesh.rotation.z = Math.atan2(t.mesh.position.y, t.mesh.position.x)-Math.PI/2;

        // random depth for the tree on the z-axis
        t.mesh.position.z = 0 - Math.random() * 600;

        // random scale for each tree
        let s = 0.3 + Math.random() * 0.75;
        t.mesh.scale.set(s, s, s);

        this.mesh.add(t.mesh);
      }
    },
    AirPlane() {
      this.mesh = new THREE.Object3D();

      // Create the cabin
      var geomCockpit = new THREE.BoxGeometry(80, 50, 50, 1, 1, 1);
      var matCockpit = new THREE.MeshPhongMaterial({
        color: "0xf25346",
        shading: THREE.FlatShading
      });
      geomCockpit.vertices[4].y -= 10;
      geomCockpit.vertices[4].z += 20;
      geomCockpit.vertices[5].y -= 10;
      geomCockpit.vertices[5].z -= 20;
      geomCockpit.vertices[6].y += 30;
      geomCockpit.vertices[6].z += 20;
      geomCockpit.vertices[7].y += 30;
      geomCockpit.vertices[7].z -= 20;
      var cockpit = new THREE.Mesh(geomCockpit, matCockpit);
      cockpit.castShadow = true;
      cockpit.receiveShadow = true;
      this.mesh.add(cockpit);

      // Create the engine
      var geomEngine = new THREE.BoxGeometry(20, 50, 50, 1, 1, 1);
      var matEngine = new THREE.MeshPhongMaterial({
        color: "0xd8d0d1",
        shading: THREE.FlatShading
      });
      var engine = new THREE.Mesh(geomEngine, matEngine);
      engine.position.x = 40;
      engine.castShadow = true;
      engine.receiveShadow = true;
      this.mesh.add(engine);

      // Create the tail
      var geomTailPlane = new THREE.BoxGeometry(15, 20, 5, 1, 1, 1);
      var matTailPlane = new THREE.MeshPhongMaterial({
        color: "0xf25346",
        shading: THREE.FlatShading
      });
      var tailPlane = new THREE.Mesh(geomTailPlane, matTailPlane);
      tailPlane.position.set(-35, 25, 0);
      tailPlane.castShadow = true;
      tailPlane.receiveShadow = true;
      this.mesh.add(tailPlane);

      // Create the wing
      var geomSideWing = new THREE.BoxGeometry(40, 4, 150, 1, 1, 1);
      var matSideWing = new THREE.MeshPhongMaterial({
        color: "0xf25346",
        shading: THREE.FlatShading
      });

      var sideWingTop = new THREE.Mesh(geomSideWing, matSideWing);
      var sideWingBottom = new THREE.Mesh(geomSideWing, matSideWing);
      sideWingTop.castShadow = true;
      sideWingTop.receiveShadow = true;
      sideWingBottom.castShadow = true;
      sideWingBottom.receiveShadow = true;

      sideWingTop.position.set(20, 12, 0);
      sideWingBottom.position.set(20, -3, 0);
      this.mesh.add(sideWingTop);
      this.mesh.add(sideWingBottom);

      var geomWindshield = new THREE.BoxGeometry(3, 15, 20, 1, 1, 1);
      var matWindshield = new THREE.MeshPhongMaterial({
        color: "0xd8d0d1",
        transparent: true,
        opacity: 0.3,
        shading: THREE.FlatShading
      });
      var windshield = new THREE.Mesh(geomWindshield, matWindshield);
      windshield.position.set(5, 27, 0);

      windshield.castShadow = true;
      windshield.receiveShadow = true;

      this.mesh.add(windshield);

      var geomPropeller = new THREE.BoxGeometry(20, 10, 10, 1, 1, 1);
      geomPropeller.vertices[4].y -= 5;
      geomPropeller.vertices[4].z += 5;
      geomPropeller.vertices[5].y -= 5;
      geomPropeller.vertices[5].z -= 5;
      geomPropeller.vertices[6].y += 5;
      geomPropeller.vertices[6].z += 5;
      geomPropeller.vertices[7].y += 5;
      geomPropeller.vertices[7].z -= 5;
      var matPropeller = new THREE.MeshPhongMaterial({
        color: "0x59332e",
        shading: THREE.FlatShading
      });
      this.propeller = new THREE.Mesh(geomPropeller, matPropeller);
      this.propeller.castShadow = true;
      this.propeller.receiveShadow = true;

      var geomBlade1 = new THREE.BoxGeometry(1, 100, 10, 1, 1, 1);
      var geomBlade2 = new THREE.BoxGeometry(1, 10, 100, 1, 1, 1);
      var matBlade = new THREE.MeshPhongMaterial({
        color: "0x23190f",
        shading: THREE.FlatShading
      });

      var blade1 = new THREE.Mesh(geomBlade1, matBlade);
      blade1.position.set(8, 0, 0);
      blade1.castShadow = true;
      blade1.receiveShadow = true;

      var blade2 = new THREE.Mesh(geomBlade2, matBlade);
      blade2.position.set(8, 0, 0);
      blade2.castShadow = true;
      blade2.receiveShadow = true;
      this.propeller.add(blade1, blade2);
      this.propeller.position.set(50, 0, 0);
      this.mesh.add(this.propeller);

      var wheelProtecGeom = new THREE.BoxGeometry(30, 15, 10, 1, 1, 1);
      var wheelProtecMat = new THREE.MeshPhongMaterial({
        color: "0xd8d0d1",
        shading: THREE.FlatShading
      });
      var wheelProtecR = new THREE.Mesh(wheelProtecGeom, wheelProtecMat);
      wheelProtecR.position.set(25, -20, 25);
      this.mesh.add(wheelProtecR);

      var wheelTireGeom = new THREE.BoxGeometry(24, 24, 4);
      var wheelTireMat = new THREE.MeshPhongMaterial({
        color: "0x23190f",
        shading: THREE.FlatShading
      });
      var wheelTireR = new THREE.Mesh(wheelTireGeom, wheelTireMat);
      wheelTireR.position.set(25, -28, 25);

      var wheelAxisGeom = new THREE.BoxGeometry(10, 10, 6);
      var wheelAxisMat = new THREE.MeshPhongMaterial({
        color: "0x59332e",
        shading: THREE.FlatShading
      });
      var wheelAxis = new THREE.Mesh(wheelAxisGeom, wheelAxisMat);
      wheelTireR.add(wheelAxis);

      this.mesh.add(wheelTireR);

      var wheelProtecL = wheelProtecR.clone();
      wheelProtecL.position.z = -wheelProtecR.position.z;
      this.mesh.add(wheelProtecL);

      var wheelTireL = wheelTireR.clone();
      wheelTireL.position.z = -wheelTireR.position.z;
      this.mesh.add(wheelTireL);

      var wheelTireB = wheelTireR.clone();
      wheelTireB.scale.set(0.5, 0.5, 0.5);
      wheelTireB.position.set(-35, -5, 0);
      this.mesh.add(wheelTireB);

      var suspensionGeom = new THREE.BoxGeometry(4, 20, 4);
      suspensionGeom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 10, 0));
      var suspensionMat = new THREE.MeshPhongMaterial({
        color: "0xf25346",
        shading: THREE.FlatShading
      });
      var suspension = new THREE.Mesh(suspensionGeom, suspensionMat);
      suspension.position.set(-35, -5, 0);
      suspension.rotation.z = -0.3;
      this.mesh.add(suspension);
    },
    Fox() {
      this.mesh = new THREE.Object3D();

      var redFurMat = new THREE.MeshPhongMaterial({
        color: "0xf25346",
        shading: THREE.FlatShading
      });

      // Create the Body
      var geomBody = new THREE.BoxGeometry(100, 50, 50, 1, 1, 1);
      var body = new THREE.Mesh(geomBody, redFurMat);
      body.castShadow = true;
      body.receiveShadow = true;
      this.mesh.add(body);

      // Create the Chest
      var geomChest = new THREE.BoxGeometry(50, 60, 70, 1, 1, 1);
      var chest = new THREE.Mesh(geomChest, redFurMat);
      chest.position.x = 60;
      chest.castShadow = true;
      chest.receiveShadow = true;
      this.mesh.add(chest);

      // Create the Head
      var geomHead = new THREE.BoxGeometry(40, 55, 50, 1, 1, 1);
      this.head = new THREE.Mesh(geomHead, redFurMat);
      this.head.position.set(80, 35, 0);
      this.head.castShadow = true;
      this.head.receiveShadow = true;

      // Create the Snout
      var geomSnout = new THREE.BoxGeometry(40, 30, 30, 1, 1, 1);
      var snout = new THREE.Mesh(geomSnout, redFurMat);
      geomSnout.vertices[0].y -= 5;
      geomSnout.vertices[0].z += 5;
      geomSnout.vertices[1].y -= 5;
      geomSnout.vertices[1].z -= 5;
      geomSnout.vertices[2].y += 5;
      geomSnout.vertices[2].z += 5;
      geomSnout.vertices[3].y += 5;
      geomSnout.vertices[3].z -= 5;
      snout.castShadow = true;
      snout.receiveShadow = true;
      snout.position.set(30, 0, 0);
      this.head.add(snout);

      // Create the Nose
      var geomNose = new THREE.BoxGeometry(10, 15, 20, 1, 1, 1);
      var matNose = new THREE.MeshPhongMaterial({
        color: this.Colors.brown,
        shading: THREE.FlatShading
      });
      var nose = new THREE.Mesh(geomNose, matNose);
      nose.position.set(55, 0, 0);
      this.head.add(nose);

      // Create the Ears
      var geomEar = new THREE.BoxGeometry(10, 40, 30, 1, 1, 1);
      var earL = new THREE.Mesh(geomEar, redFurMat);
      earL.position.set(-10, 40, -18);
      this.head.add(earL);
      earL.rotation.x = -Math.PI / 10;
      geomEar.vertices[1].z += 5;
      geomEar.vertices[4].z += 5;
      geomEar.vertices[0].z -= 5;
      geomEar.vertices[5].z -= 5;

      // Create the Ear Tips
      var geomEarTipL = new THREE.BoxGeometry(10, 10, 20, 1, 1, 1);
      var matEarTip = new THREE.MeshPhongMaterial({
        color: this.Colors.white,
        shading: THREE.FlatShading
      });
      var earTipL = new THREE.Mesh(geomEarTipL, matEarTip);
      earTipL.position.set(0, 25, 0);
      earL.add(earTipL);

      var earR = earL.clone();
      earR.position.z = -earL.position.z;
      earR.rotation.x = -earL.rotation.x;
      this.head.add(earR);

      this.mesh.add(this.head);

      // Create the tail
      var geomTail = new THREE.BoxGeometry(80, 40, 40, 2, 1, 1);
      geomTail.vertices[4].y -= 10;
      geomTail.vertices[4].z += 10;
      geomTail.vertices[5].y -= 10;
      geomTail.vertices[5].z -= 10;
      geomTail.vertices[6].y += 10;
      geomTail.vertices[6].z += 10;
      geomTail.vertices[7].y += 10;
      geomTail.vertices[7].z -= 10;
      this.tail = new THREE.Mesh(geomTail, redFurMat);
      this.tail.castShadow = true;
      this.tail.receiveShadow = true;

      // Create the tail Tip
      var geomTailTip = new THREE.BoxGeometry(20, 40, 40, 1, 1, 1);
      var matTailTip = new THREE.MeshPhongMaterial({
        color: this.Colors.white,
        shading: THREE.FlatShading
      });
      var tailTip = new THREE.Mesh(geomTailTip, matTailTip);
      tailTip.position.set(80, 0, 0);
      tailTip.castShadow = true;
      tailTip.receiveShadow = true;
      this.tail.add(tailTip);
      this.tail.position.set(-40, 10, 0);
      geomTail.translate(40, 0, 0);
      geomTailTip.translate(10, 0, 0);
      this.tail.rotation.z = Math.PI / 1.5;
      this.mesh.add(this.tail);

      // Create the Legs
      var geomLeg = new THREE.BoxGeometry(20, 60, 20, 1, 1, 1);
      this.legFR = new THREE.Mesh(geomLeg, redFurMat);
      this.legFR.castShadow = true;
      this.legFR.receiveShadow = true;

      // Create the feet
      var geomFeet = new THREE.BoxGeometry(20, 20, 20, 1, 1, 1);
      var matFeet = new THREE.MeshPhongMaterial({
        color: this.Colors.white,
        shading: THREE.FlatShading
      });
      var feet = new THREE.Mesh(geomFeet, matFeet);
      feet.position.set(0, 0, 0);
      feet.castShadow = true;
      feet.receiveShadow = true;
      this.legFR.add(feet);
      this.legFR.position.set(70, -12, 25);
      geomLeg.translate(0, 40, 0);
      geomFeet.translate(0, 80, 0);
      this.legFR.rotation.z = 16;
      this.mesh.add(this.legFR);

      this.legFL = this.legFR.clone();
      this.legFL.position.z = -this.legFR.position.z;
      this.legFL.rotation.z = -this.legFR.rotation.z;
      this.mesh.add(this.legFL);

      this.legBR = this.legFR.clone();
      this.legBR.position.x = -this.legFR.position.x + 50;
      this.legBR.rotation.z = -this.legFR.rotation.z;
      this.mesh.add(this.legBR);

      this.legBL = this.legFL.clone();
      this.legBL.position.x = -this.legFL.position.x + 50;
      this.legBL.rotation.z = -this.legFL.rotation.z;
      this.mesh.add(this.legBL);
    },
    createSky() {
      this.sky = new this.Sky();
      console.log(this.sky);
      this.sky.mesh.position.y = this.offSet;
      this.scene.add(this.sky.mesh);
    },
    createLand() {
      this.land = this.Land();
      console.log(this.land);
      this.land.mesh.position.y = this.offSet;
      this.scene.add(this.land.mesh);
    },
    createOrbit() {
      this.orbit = this.Orbit();
      this.orbit.mesh.position.y = this.offSet;
      this.orbit.mesh.rotation.z = -Math.PI / 6;
      this.scene.add(this.orbit.mesh);
    },
    createForest() {
      this.forest = this.Forest();
      this.forest.mesh.position.y = this.offSet;
      this.scene.add(this.forest.mesh);
    },
    createSun() {
      this.sun = this.Sun();
      this.sun.mesh.scale.set(1, 1, 0.3);
      this.sun.mesh.position.set(0, -30, -850);
      this.scene.add(this.sun.mesh);
    },
    createPlane() {
      this.airplane = this.AirPlane();
      console.log(this.airplane);
      this.airplane.mesh.scale.set(0.35, 0.35, 0.35);
      this.airplane.mesh.position.set(-40, 110, -250);
      // airplane.mesh.rotation.z = Math.PI/15;
      this.scene.add(this.airplane.mesh);
    },
    createFox() {
      this.fox = new this.Fox();
      this.fox.mesh.scale.set(0.35, 0.35, 0.35);
      this.fox.mesh.position.set(-40, 110, -250);
      this.scene.add(this.fox.mesh);
    },
    updatePlane() {
      let targetY = this.normalize(this.mousePos.y, -0.75, 0.75, 50, 190);
      let targetX = this.normalize(this.mousePos.x, -0.75, 0.75, -100, -20);

      // Move the plane at each frame by adding a fraction of the remaining distance
      this.airplane.mesh.position.y +=
        (targetY - this.airplane.mesh.position.y) * 0.1;

      this.airplane.mesh.position.x +=
        (targetX - this.airplane.mesh.position.x) * 0.1;

      // Rotate the plane proportionally to the remaining distance
      this.airplane.mesh.rotation.z =
        (targetY - this.airplane.mesh.position.y) * 0.0128;
      this.airplane.mesh.rotation.x =
        (this.airplane.mesh.position.y - targetY) * 0.0064;
      this.airplane.mesh.rotation.y =
        (this.airplane.mesh.position.x - targetX) * 0.0064;

      this.airplane.propeller.rotation.x += 0.3;
    },
    normalize(v, vmin, vmax, tmin, tmax) {
      var nv = Math.max(Math.min(v, vmax), vmin);
      var dv = vmax - vmin;
      var pc = (nv - vmin) / dv;
      var dt = tmax - tmin;
      var tv = tmin + pc * dt;
      return tv;
    },
    loop() {
      this.land.mesh.rotation.z += 0.005;
      this.orbit.mesh.rotation.z += 0.001;
      this.sky.mesh.rotation.z += 0.003;
      this.forest.mesh.rotation.z += 0.005;
      this.updatePlane();

      this.renderer.render(this.scene, this.camera);
      requestAnimationFrame(this.loop);
    },
    handleMouseMove(event) {
      var tx = -1 + (event.clientX / this.WIDTH) * 2;
      var ty = 1 - (event.clientY / this.HEIGHT) * 2;
      this.mousePos = { x: tx, y: ty };
    }
  },
  mounted() {
    this.createScene();
    this.createLights();
    this.createPlane();
    this.createOrbit();
    this.createSun();
    this.createLand();
    this.createForest();
    this.createSky();
    this.loop();

    document.addEventListener("mousemove", this.handleMouseMove, false);
  }
};
</script>

<style>
#world {
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: linear-gradient(#e4e0ba, #f7d9aa);
}
</style>
