import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import * as THREE from 'three';
import { BufferGeometry, LoadingManager, MeshBasicMaterial, Texture, TextureLoader } from 'three';
import { MatSliderChange } from '@angular/material';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader';

@Component({
    selector: 'app-three',
    templateUrl: './three.component.html',
    styleUrls: ['./three.component.scss']
})
export class ThreeComponent implements AfterViewInit {

    private static readonly RANGE = 10;

    minHeight = 0;
    maxHeight = 100;

    maxRotation = Math.PI;

    @ViewChild('canvas', {static: true})
    private canvasRef: ElementRef;

    private scene: THREE.Scene;
    private camera: THREE.Camera;
    private displayObject: THREE.Mesh;
    private renderer: THREE.WebGLRenderer;

    rotationValue: number = 0;
    cameraValue: number = 30;

    constructor() {
    }

    private get canvas(): HTMLCanvasElement {
        return this.canvasRef.nativeElement;
    }

    public ngAfterViewInit() {
        this.createScene();
        // this.createCube(1);
        this.createCylinder();
        // this.readStl();
    }

    public animate() {
        requestAnimationFrame(() => this.animate());
        // let factor = Math.sin(this.cameraValue * 90 * (Math.PI / 180));
        // this.camera.rotation.y = (90 * factor) * (Math.PI / 180);
        // this.camera.rotation.x = (90 * factor) * (Math.PI / 180);
        // let zPosition = ThreeComponent.HEIGHT - (ThreeComponent.HEIGHT * factor);
        // let xPosition = ThreeComponent.HEIGHT * factor;
        // this.camera.position.x = xPosition;
        // this.camera.position.x = this.cameraValue;
        // this.camera.position.z = ThreeComponent.Z_HEIGHT - (Math.abs(this.cameraValue) * (ThreeComponent.Z_HEIGHT / ThreeComponent.RANGE));
        // this.cube.rotation.x += 0.1;
        this.render();
    }

    private createScene() {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, this.getAspectRatio(), 0.5, this.maxHeight);
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize(this.canvas.offsetWidth, this.canvas.offsetHeight);
        this.camera.position.z = this.cameraValue;
        this.canvas.appendChild(this.renderer.domElement);
    }

    private createCube(size: number) {
        const axesTextures = [
            {name: 'r.png', rotation: Math.PI / 2, index: 0},
            {name: 'l.png', rotation: -Math.PI / 2, index: 1},
            {name: 'a.png', rotation: Math.PI, index: 2},
            {name: 'p.png', rotation: 0, index: 3},
            {name: 's.png', rotation: 0, index: 4},
            {name: 'i.png', rotation: 0, index: 5}
        ];
        const materials: Array<THREE.MeshBasicMaterial> = new Array<THREE.MeshBasicMaterial>();
        const loadingManager: LoadingManager = new LoadingManager(() => {
            const geometry = new THREE.BoxBufferGeometry(size, size, size, 1, 1, 1);
            this.displayObject = new THREE.Mesh(geometry, materials);
            this.displayObject.position.set(1, 1, 2);
            this.scene.add(this.displayObject);
            this.animate();
        });
        const textureLoader = new TextureLoader(loadingManager);
        textureLoader.setPath('/assets/images/');

        for (const textureData of axesTextures) {
            textureLoader.load(textureData.name, (texture: Texture) => {
                texture.rotation = textureData.rotation;
                texture.center = new THREE.Vector2(0.5, 0.5);
                materials.push(new MeshBasicMaterial({map: texture}));
            }, (progress: ProgressEvent) => {
                console.log(`${progress.loaded}, ${progress.total}`);
            }, (error: ErrorEvent) => {
                console.error(error.message);
            });
        }
    }

    private readStl() {
        const loader = new STLLoader();
        loader.load('./assets/stls/shaft.stl', (geometry: BufferGeometry) => {
            const materials = [];
            const nGeometryGroups = geometry.groups.length;
            // for (let i = 0; i < nGeometryGroups; i++) {
            //     // let material = new THREE.MeshBasicMaterial({color: 0xFF0000});
            //     let material = new THREE.MeshLambertMaterial({color: 0xB0B0B0,side: THREE.DoubleSide});
            //     materials.push(material);
            // }
            const material = new THREE.MeshBasicMaterial({color: 0xFF0000, side: THREE.DoubleSide});
            this.displayObject = new THREE.Mesh(geometry, material);
            this.scene.add(this.displayObject);
            this.animate();
        }, (progress: ProgressEvent) => {
            console.log(`${progress.loaded}, ${progress.total}`);
        }, (error: ErrorEvent) => {
            console.error(error.message);
        });
    }

    private createCylinder() {
        const geometry = new THREE.CylinderGeometry(1, 1, 30, 32);
        const material = new THREE.MeshBasicMaterial({color: 0xFF0000});
        // let material = new THREE.MeshLambertMaterial({color: 0xFF0000});
        this.displayObject = new THREE.Mesh(geometry, material);
        this.scene.add(this.displayObject);
        this.animate();
    }

    private render() {
        this.renderer.render(this.scene, this.camera);
    }

    private getAspectRatio(): number {
        return this.canvas.clientWidth / this.canvas.clientHeight;
    }

    public onResize() {
    }

    onCameraChange(event: MatSliderChange) {
        this.cameraValue = event.value;
        this.camera.position.z = this.cameraValue;
    }

    onRotationChange(event: MatSliderChange) {
        this.rotationValue = event.value;
        this.displayObject.rotation.z += this.rotationValue;
    }
}
