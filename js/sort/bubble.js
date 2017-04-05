((window) => {
    const util = new Util();
    class Bubble extends Sort {
        constructor(arr, el, selectedColor = "#6cf", doneColor = "#f60") {
            super(...arguments);
        }

        _getSnaps() {
            /**
             * 定义父类的获取快照方法
             */
            let arr = this.sortedArr;
            let snaps = [];
            let i, j;
            for (i = 0; i < arr.length; i++) {
                for (j = 0; j < arr.length - i - 1; j++) {
                    snaps.push(this._createSnap(j, j + 1, arr));
                    if (arr[j] > arr[j + 1]) {
                        util.swap(arr, j, j + 1);
                        snaps.push(this._createSnap(j, j + 1, arr, true));
                    }

                }
                snaps.push(this._createSnap(j, j, arr, false, true));
            }
            return snaps;
        }
    }

    window.Bubble = Bubble;
})(window);