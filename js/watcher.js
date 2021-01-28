class Watcher {
    constructor(vm, exp, cb) {
        this.cb = cb;
        this.vm = vm;
        this.exp = exp;
        this.value = this.get();  // 将自己添加到订阅器的操作
    }
    update() {
        this.run();
    }
    run() {
        var value = this.vm.data[this.exp];
        var oldVal = this.value;
        if (value !== oldVal) {
            this.value = value;
            console.log(value, oldVal, 'z支付方法的');
            this.cb.call(this.vm, value, oldVal);
        }  
    }
    get() {
        Dep.target = this;  // 缓存自己
        var value = this.vm.data[this.exp]  // 强制执行监听器里的get函数
        Dep.target = null;  // 释放自己
        return value;
    }
}
