import * as MRE from '@microsoft/mixed-reality-extension-sdk';

export default abstract class SDKObject {
	private assets: MRE.AssetContainer;

	public constructor(assets: MRE.AssetContainer) {
		this.assets = assets;
	}

	public getAssets(): MRE.AssetContainer {
		return this.assets;
	}

	public getContext(): MRE.Context {
		return this.assets.context;
	}

	public updateButtons(): void {
		//to be overwriten
	}

	public welcomeUser(user: MRE.User): void {
		//to be overwriten;
	}

	public onUserJoin(user: MRE.User): void {
		this.updateButtons();
		this.welcomeUser(user);
	}

}
