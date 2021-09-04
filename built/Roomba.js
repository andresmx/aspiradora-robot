"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const MRE = __importStar(require("@microsoft/mixed-reality-extension-sdk"));
const mixed_reality_extension_sdk_1 = require("@microsoft/mixed-reality-extension-sdk");
const SDKObject_1 = __importDefault(require("./SDKObject"));
const Sensor_1 = __importDefault(require("./Sensor"));
class Roomba extends SDKObject_1.default {
    constructor(assets) {
        super(assets);
        this.isOn = true;
        this.rotation = MRE.Quaternion.FromEulerAngles(0, 0, 0);
        this.createRoomba();
        this.createSensors(this.roomba);
        //this.setRoombaAnim();
        this.moveRoomba(50);
        // setTimeout(()=> this.stopMoving(),3000);
    }
    createRoomba() {
        this.roomba = MRE.Actor.CreateFromLibrary(super.getContext(), {
            resourceId: 'artifact:1766806184817328618',
            actor: {
                transform: {
                    local: {
                        scale: { x: 0.4, y: 0.4, z: 0.4 },
                        position: { x: 0, y: 0, z: 0 }
                    }
                },
            }
        });
        this.roomba.subscribe("transform");
        //this.roomba.collider.layer = MRE.CollisionLayer.Navigation
        //this.createSensors(this.roomba);
    }
    makeRoombaButton() {
        const roombaButton = this.roomba.setBehavior(MRE.ButtonBehavior);
        roombaButton.onClick(() => {
            if (this.isOn) {
                if (this.roomba) {
                    this.roomba.targetingAnimations.forEach((value) => {
                        value.stop();
                    });
                }
                this.isOn = false;
            }
            else {
                this.isOn = true;
                this.moveRoomba(50);
            }
        });
    }
    updateButtons() {
        this.makeRoombaButton();
    }
    moveRoomba(distance) {
        //this.roomba.transform.local.position = new Vector3(0,0,5);
        const velocity = 0.55;
        const duration = Math.abs(distance / velocity);
        //console.log("started moving1");
        //this.roomba.targetingAnimationsByName.get("clean").play();
        //return;
        let targetPoint = new mixed_reality_extension_sdk_1.Vector3(0, 0, distance);
        targetPoint.rotateByQuaternionToRef(this.rotation, targetPoint);
        targetPoint = targetPoint.addInPlace(this.roomba.transform.app.position);
        const prom = new Promise((resolve, reject) => {
            this.roomba.animateTo({
                transform: {
                    local: {
                        position: {
                            x: targetPoint.x,
                            y: targetPoint.y,
                            z: targetPoint.z
                        }
                    }
                }
            }, duration, MRE.AnimationEaseCurves.Linear)
                .then(() => {
                //console.log("great, it finished");
                resolve();
            });
        });
        return prom;
    }
    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    async stopMoving() {
        if (this.roomba) {
            this.roomba.targetingAnimations.forEach((value) => {
                value.stop();
            });
        }
        await this.sleep(100);
        //console.log(this.roomba.transform.app.position.z);
        await this.moveRoomba(-0.3);
        await this.sleep(100);
        //const theNewRotation = MRE.Quaternion.RotationYawPitchRoll(2 * Math.random() * Math.PI, 0, 0);
        const randomSide = (Math.round(Math.random() * 2) % 2 - 0.5) * 2; //-1 or +1
        const theNewRotation = MRE.Quaternion.FromEulerAngles(0, this.rotation.toEulerAngles().y + randomSide * (((1 / 2) * Math.random() + 0.25) * Math.PI), 0);
        //const randomQuat = randomSide*(Math.random()/2 + 0.5) + this.rotation.y;
        //const theNewRotation = new MRE.Quaternion(0,randomQuat * randomSide,0);
        //console.log(theNewRotation.y);
        MRE.Animation.AnimateTo(super.getContext(), this.roomba, {
            destination: {
                transform: { app: { rotation: theNewRotation } }
            },
            duration: 1
        }).then(() => {
            this.rotation = theNewRotation;
            this.moveRoomba(50);
        });
    }
    createSensors(parent) {
        this.frontSensor = new Sensor_1.default(super.getAssets(), {
            x: 0,
            y: 0.05,
            z: 0.8
        }, {
            x: 0.03,
            y: 0.03,
            z: 0.03
        }, parent, {
            x: 0,
            y: 0,
            z: 0,
            w: 1
        });
        this.frontSensor.setActionOnHit(this.stopMoving.bind(this));
    }
    welcomeUser(user) {
        //just because it has to be overwriten/defined.
    }
}
exports.default = Roomba;
//# sourceMappingURL=Roomba.js.map