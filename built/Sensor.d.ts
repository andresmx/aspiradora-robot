import * as MRE from '@microsoft/mixed-reality-extension-sdk';
import SDKObject from './SDKObject';
export default class Sensor extends SDKObject {
    private sensorActor;
    private callAfterHit;
    private onTriger;
    private theBall;
    constructor(assets: MRE.AssetContainer, position: MRE.Vector3Like, size: MRE.Vector3Like, parent: MRE.Actor, rotation: MRE.QuaternionLike);
    makeSensor(position: MRE.Vector3Like, size: MRE.Vector3Like, parentId: MRE.Guid, rotation: MRE.QuaternionLike): void;
    private makeTheBall;
    private makeBoundary;
    setActionOnHit(functi: () => void): void;
    isOnTriger(): boolean;
    updateButtons(): void;
    welcomeUser(user: MRE.User): void;
}
//# sourceMappingURL=Sensor.d.ts.map