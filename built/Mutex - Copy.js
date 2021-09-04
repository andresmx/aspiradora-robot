"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mutex = void 0;
class Mutex {
    constructor() {
        this.mutex = Promise.resolve();
        /*async dispatch(fn: (() => T) | (() => PromiseLike<T>)): Promise<T> {
          const unlock = await this.lock();
          try {
            return await Promise.resolve(fn());
          } finally {
            unlock();
          }
        }*/
    }
    lock() {
        let begin = unlock => { };
        this.mutex = this.mutex.then(() => {
            return new Promise(begin);
        });
        return new Promise(res => {
            begin = res;
        });
    }
}
exports.Mutex = Mutex;
//# sourceMappingURL=Mutex - Copy.js.map