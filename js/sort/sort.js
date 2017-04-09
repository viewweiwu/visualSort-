((window, Util, Squre) => {
    const util = new Util();
    class Sort {
        constructor(type, opts) {
            this.arr = opts.arr;
            this.type = type;
            this.sortedArr = [...opts.arr]; // 拷贝数组
            this.squres = this._createSqures(); // 在页面上创建方块 
            this.snaps = this._getSnaps(); // 创建快照
            this.containerEl = opts.el; // 父容器
            this.color1 = opts.color1 || "pink";
            this.color2 = opts.color2 || "orange";
            this.color3 = opts.color3 || "yellowgreen";
            this.index = 0;
            this._renderSqures();
            this._initStyle();
        }
        _createSqures() {
            return this.arr.map((obj, i) => {
                let height = obj * 10;
                return new Squre(this.type + i, height, obj, obj > 5 ? false : true);
            });
        }
        _renderSqures() {
            let html = "";
            let el;
            this.squres.forEach(obj => html += obj.dom);
            this.containerEl.innerHTML = html;
            el = this.containerEl.querySelectorAll(".squre");
            this.squres.forEach((obj, i) => obj.el = el[i]);
        }
        _initStyle() {
            let totalWidth = 0;
            this.squres.forEach((obj, i) => {
                obj.setPosition(10 + totalWidth);
                totalWidth += parseInt(obj.width) + 20;
            });
            this.containerEl.style.width = totalWidth + "px";
        }
        _getSnaps() {
            // 由子类实现
        }
        _createSnap() {
            // 由子类实现
        }
        draw() {
            // 由子类实现
        }
        loop(index = 0) {
            if (index <= this.snaps.length - 1) {
                let obj = this.snaps[index];
                index += 1;
                this.index = index;
                this.draw(obj);
                this.timer = setTimeout(() => this.loop(index), 400);
            } else {
                return;
            }
        }
        stopSort() {
            this.timer && clearTimeout(this.timer);
        }
        continueSort() {
            this.stopSort();
            this.loop(this.index);
        }
        resetSort() {
            this.index = 0;
            this.draw(this.snaps[0]);
            this.stopSort();
        }
        prev() {
            this.index -= 1;
            this.draw(this.snaps[this.index]);
            this.stopSort();
        }
        next() {
            this.index += 1;
            this.draw(this.snaps[this.index]);
            this.stopSort();
        }
    }

    window.Sort = Sort;
})(window, Util, Squre);