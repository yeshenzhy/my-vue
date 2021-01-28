class myVue {
    constructor({data,methods,mounted, el }) {
        var self = this;
        this.data = data;
        this.methods = methods;
        Object.keys(this.data).forEach(function(key) {
            self.proxyKeys(key);
        });
        observe(this.data);
        new Compile(el, this);
        mounted.call(this); // 所有事情处理好后执行mounted函数
    }
    proxyKeys(key) {
        var self = this;
        Object.defineProperty(this, key, {
            enumerable: false,
            configurable: true,
            get: function () {
                return self.data[key];
            },
            set: function (newVal) {
                self.data[key] = newVal;
            }
        });
    }
}

