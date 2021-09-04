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
const SDKObject_1 = __importDefault(require("./SDKObject"));
const testing = false; //just to show the sensor if testing/ debuging
class Sensor extends SDKObject_1.default {
    constructor(assets, position, size, parent, rotation) {
        super(assets);
        this.onTriger = 0;
        this.makeSensor(position, size, parent.id, rotation);
    }
    makeSensor(position, size, parentId, rotation) {
        this.sensorActor = MRE.Actor.CreatePrimitive(super.getAssets(), {
            definition: {
                shape: MRE.PrimitiveShape.Box,
                dimensions: size
            },
            addCollider: true,
            actor: {
                parentId: parentId,
                transform: {
                    local: {
                        position: {
                            x: position.x,
                            y: position.y * 0.7,
                            z: position.z
                        },
                        rotation: rotation
                    }
                },
                appearance: {
                    enabled: testing
                },
                collider: {
                    geometry: {
                        shape: MRE.ColliderType.Box,
                        size: size
                    },
                    isTrigger: true,
                    enabled: true,
                    eventSubscriptions: ["trigger-enter", "trigger-exit"]
                },
                rigidBody: {
                    detectCollisions: true,
                    enabled: true,
                    useGravity: false
                }
            }
        });
        this.sensorActor.subscribe("rigidbody");
        this.sensorActor.subscribe("collider");
        this.sensorActor.collider.onTrigger("trigger-enter", () => {
            //console.log("trigger-enter");
            this.onTriger++;
        });
        this.sensorActor.collider.onTrigger("trigger-exit", () => {
            this.onTriger--;
            if (this.isOnTriger()) {
                this.callAfterHit();
            }
            setTimeout(() => {
                if (this.isOnTriger()) {
                    //add something that will recreate the ball
                    //console.log("I missed my ball.");
                    this.theBall.destroy();
                    this.makeTheBall(parentId);
                }
            }, 500);
            //console.log("trigger-exit");
        });
        this.makeBoundary(position, parentId);
        this.makeTheBall(parentId);
    }
    makeTheBall(parentId) {
        this.theBall = MRE.Actor.CreatePrimitive(super.getAssets(), {
            definition: {
                shape: MRE.PrimitiveShape.Sphere,
                dimensions: {
                    x: 0.5, y: 0.5, z: 0.5
                },
            },
            addCollider: true,
            actor: {
                parentId: parentId,
                transform: { local: { position: { x: 0, y: 0.8, z: 0.8 } } },
                rigidBody: {
                    enabled: true,
                    useGravity: true
                },
                appearance: {
                    enabled: testing
                }
            }
        });
    }
    makeBoundary(position, parentId) {
        const width = 0.48;
        const heightRatio = 2.2;
        //side
        MRE.Actor.CreatePrimitive(super.getAssets(), {
            definition: {
                shape: MRE.PrimitiveShape.Cylinder,
                dimensions: { x: 0.02, y: 0.02, z: 0.2 },
            },
            addCollider: true,
            actor: {
                parentId: parentId,
                transform: {
                    local: { position: { x: width / 2, y: position.y * heightRatio * 1.35, z: 0.8 } }
                },
                appearance: {
                    enabled: testing
                }
            }
        });
        //other side
        MRE.Actor.CreatePrimitive(super.getAssets(), {
            definition: {
                shape: MRE.PrimitiveShape.Cylinder,
                dimensions: { x: 0.02, y: 0.02, z: 0.2 },
            },
            addCollider: true,
            actor: {
                parentId: parentId,
                transform: {
                    local: { position: { x: -width / 2, y: position.y * heightRatio * 1.35, z: 0.8 } }
                },
                appearance: {
                    enabled: testing
                }
            }
        });
        //front
        MRE.Actor.CreatePrimitive(super.getAssets(), {
            definition: {
                shape: MRE.PrimitiveShape.Cylinder,
                dimensions: { x: 0.2, y: 0.02, z: 0.02 },
            },
            addCollider: true,
            actor: {
                parentId: parentId,
                transform: {
                    local: { position: { x: 0, y: position.y * heightRatio * 1.4, z: 1 } }
                },
                appearance: {
                    enabled: testing
                }
            }
        });
        //bottom
        MRE.Actor.CreatePrimitive(super.getAssets(), {
            definition: {
                shape: MRE.PrimitiveShape.Cylinder,
                dimensions: { x: 0.2, y: 0.02, z: 0.02 },
            },
            addCollider: true,
            actor: {
                parentId: parentId,
                transform: {
                    local: { position: { x: 0, y: position.y * -0.1, z: 0.8 } }
                },
                appearance: {
                    enabled: testing
                }
            }
        });
    }
    setActionOnHit(functi) {
        this.callAfterHit = functi;
    }
    isOnTriger() {
        return this.onTriger === 0;
    }
    updateButtons() {
        //nothing to do
    }
    welcomeUser(user) {
        //nothing to do
    }
}
exports.default = Sensor;
//# sourceMappingURL=Sensor.js.map