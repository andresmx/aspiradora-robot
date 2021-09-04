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
const Roomba_1 = __importDefault(require("./Roomba"));
class LearningWorld {
    constructor(context) {
        this.context = context;
        this.assets = new MRE.AssetContainer(this.context);
        this.context.onStarted(() => {
            this.started();
            //this.testing();
        });
    }
    started() {
        const roomba = new Roomba_1.default(this.assets);
        this.assets.context.onUserJoined((user) => roomba.onUserJoin(user));
        /*const box = MRE.Actor.CreatePrimitive(this.assets,{
            definition:{
                shape: MRE.PrimitiveShape.Sphere,
                dimensions:{x:0.5,y:0.5,z:0.5}
            },
            addCollider:true,
            actor:{
                transform:{local:{position:{x:0,y:3,z:4}}},
                rigidBody:{
                    enabled:true,
                    useGravity:true,
                    mass: 1,
                    detectCollisions: true,
                },
                grabbable: true
            }
        });*/
        //box.rigidBody.addForce({x:0,y:0,z:100});
        /*box.collider.onTrigger("trigger-enter",()=>{
            //box.destroy();
        })*/
    }
    testing() {
        for (let i = 0; i < 25; i++) {
            for (let j = 0; j < 25; j++) {
                MRE.Actor.CreatePrimitive(this.assets, {
                    definition: {
                        shape: MRE.PrimitiveShape.Sphere,
                        dimensions: { x: 0.1, y: 0.1, z: 0.1 },
                        uSegments: 10,
                        vSegments: 10
                    },
                    addCollider: true,
                    actor: {
                        transform: {
                            local: {
                                position: {
                                    x: i / 10 - 0.5,
                                    y: 0.5,
                                    z: j / 10
                                }
                            }
                        },
                        rigidBody: {
                            enabled: true,
                            useGravity: true
                        }
                    }
                });
            }
        }
    }
}
exports.default = LearningWorld;
//# sourceMappingURL=app.js.map