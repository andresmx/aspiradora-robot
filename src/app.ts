import * as MRE from '@microsoft/mixed-reality-extension-sdk';
import Roomba from './Roomba';

export default class LearningWorld {
	private assets: MRE.AssetContainer;
	constructor(private context: MRE.Context) {
		this.assets = new MRE.AssetContainer(this.context);

		this.context.onStarted(() => {
			this.started();
			//this.testing();
		});
	}

	private started() {
		const roomba = new Roomba(this.assets);
		this.assets.context.onUserJoined((user: MRE.User) =>
			roomba.onUserJoin(user)
		);

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

	private testing() {
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
				})
			}
		}
	}
}
