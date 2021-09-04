import * as MRE from '@microsoft/mixed-reality-extension-sdk';
export default abstract class SDKObject {
    private assets;
    constructor(assets: MRE.AssetContainer);
    getAssets(): MRE.AssetContainer;
    getContext(): MRE.Context;
    updateButtons(): void;
    welcomeUser(user: MRE.User): void;
    onUserJoin(user: MRE.User): void;
}
//# sourceMappingURL=SDKObject.d.ts.map