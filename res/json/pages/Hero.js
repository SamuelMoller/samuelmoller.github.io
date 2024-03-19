// =====================================================================================================
// Samuel Möller, 2024
// 
// =====================================================================================================

export class Hero {
    constructor(arg1, arg2) {
        this.arg1 = arg1;
        this.arg2 = arg2;
        if (arg2) {
            this.init();
        }
    }

// =====================================================================================================
    init() {
        let self = this;
        _init(self.arg1);

        function _init(element) {
            $(element).append("<div id='hero'></div>");
            $("#hero").append("<img id='hero-img' src='res/img/jpg/cartoon-ships.jpg'>");
        }
    }
}