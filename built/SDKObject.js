"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SDKObject {
    constructor(assets) {
        this.assets = assets;
    }
    getAssets() {
        return this.assets;
    }
    getContext() {
        return this.assets.context;
    }
    updateButtons() {
        //to be overwriten
    }
    welcomeUser(user) {
        //to be overwriten;
    }
    onUserJoin(user) {
        this.updateButtons();
        this.welcomeUser(user);
    }
}
exports.default = SDKObject;
//# sourceMappingURL=SDKObject.js.map