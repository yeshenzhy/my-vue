
class Observer{
    constructor(data) {
        this.data = data;
        this.walk(data);
    }
    walk(data) {
        const self = this;
        Object.keys(data).forEach(function(key) {
            self.defineReactive(data, key, data[key]);
        });
    }
    defineReactive(data, key, val) {
        var dep = new Dep();
        observe(val);
        Object.defineProperty(data, key, {
            enumerable: true,
            configurable: true,
            get: function () {
                if (Dep.target) {
                    dep.addSub(Dep.target);
                }
                return val;
            },
            set: function (newVal) {
                if (newVal === val) {
                    return;
                }
                val = newVal;
                dep.notify();
            }
        });
    }
}
class Dep {
    constructor() {
        this.subs = [];
    }
    addSub(sub) {
        this.subs.push(sub);
    }
    notify() {
        this.subs.forEach(function(sub) {
            sub.update();
        });
    }
}
Dep.target = null;

function observe(value) {
    if (!value || typeof value !== 'object') {
        return;
    }
    return new Observer(value);
};