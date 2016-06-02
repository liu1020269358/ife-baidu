window.onload = function(){
    init()

}





function init(){
    a = $('.album');
    a.map(function(){
        var _this = jQuery(this);
        num = _this.children().length;

        switch(num){
            case 1:
            _this.addClass('album-1');
            break;
            case 2:
            _this.addClass('album-2');
            break;
            case 3:
            _this.addClass('album-3');
            break
            case 4:
            _this.addClass('album-4');
            break;
            case 5:
            _this.addClass('album-5');
            break;
            case 6:
            _this.addClass('album-6');
            break;
        }
        
    })
}

