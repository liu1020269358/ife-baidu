(function(window) {

    function Album(){
        this.LAYOUT = {
            PUZZLE    : 1,
            WATERFALL : 2,
            BARREL    : 3,
            
        }

        this.container = "container";
        this.image = [];
        this.baseImage = [];
        this.option = {}
    }
//将jquery对象转化为dom对象
    function ndtrarr(doms){
        var DOMS = [];
        for(i=0; i<doms.length; i++){
            DOMS.push(doms[i])
        }
        return DOMS;
    }
//puzzle布局时用到的一些函数
    function puzzleAddClass(imgEles){
        for(var i=0; i<imgEles.length; i++){
            imgEles.parent().parent().eq(i).addClass(function(){return "puzzle-img pic_"+i}); 
            $(".pic_"+i).css("background-image", function(){return "url("+$(".pic_"+i+">a>img").attr("src")+")"})
        }
    }

    function setPuzzleSize(container, width, height){
        container.css({"width": width, "height": height});
    }
//waterfall布局时用到的一些函数
    function wfAppendCheck(eleColumn, url, option){
        if(typeof url != "undefined"){
            var body = $("body");
            if(eleColumn.offset().top + eleColumn.height() < body.scrollTop() + $(window).height()){
                wfcreateImg(eleColumn, url, option);
                return true;
            }  
        }
            
    }

    function wfcreateImg(parEle, url, option){
        var aEle = $("<a></a>").appendTo(parEle);
        var imgEle = $("<img/>").appendTo(aEle);
        if (typeof option != "undefined"){
            aEle.css("margin", function(){return option.gutterX+"px "+option.gutterY+"px"})
        }
        
        imgEle.attr("src",url);
    }
//barrel布局时用到的一些函数
    function loadImg(option, imgHeight, imgWidth, imgArr){
        var temNum = option.barrelMin;
        var temWidth = getTemWidth(temNum, imgHeight, imgWidth, option.barrelLow);
        var temSum = temWidth.sum;
        var temConWidth = option.containerWidth;        
        while(temSum < temConWidth){
            temNum += 1;
            temWidth = getTemWidth(temNum, imgHeight, imgWidth, option.barrelLow);
            temSum = temWidth.sum;
            temConWidth = option.containerWidth - 2*temNum*option.gutterX;         
        }
        
        temNum -= 1;
        temWidth = getTemWidth(temNum, imgHeight, imgWidth, option.barrelLow);
        temSum = temWidth.sum;
        temConWidth = option.containerWidth - 2*temNum*option.gutterX;

        var showHight = getShowHight(temConWidth, temSum, option.barrelLow);
        var aDiv = $("<div></div>").appendTo($("#container"));
        for(var i=0; i<temNum; i++){
            var aImg = imgArr[i];
            var aA = $("<a></a>")
            aA.append($(aImg).attr("height", showHight));
            aDiv.append(aA);
            aDiv.addClass("row_img")
        }

        for(var i=0; i<temNum; i++){
            imgWidth.shift();
            imgHeight.shift();
            imgArr.shift();
        }
        return {imgWidth: imgWidth,
                imgHeight: imgHeight,
                imgArr: imgArr};
    }

    function getShowHight(containerWidth, temWidth, barrelLow){
        return containerWidth*barrelLow/temWidth;
    }

    function scarelWidth(x1, y1, x2){
        return x2 * y1 / x1;
    }

    function getTemWidth(num, imgHeight, imgWidth, rowHeight){
        var arr = [];
        var temWidth = imgWidth.slice(0 , num);
        var temHeight = imgHeight.slice(0 ,num);
        var len = temWidth.length;
        for(i=0; i<len; i++){
            x1 = temHeight[i];
            y1 = temWidth[i];
            x2 = rowHeight;
            arr.push(scarelWidth(x1, y1, x2))
        }
        return {
            widthArr: arr,
            sum: arr.reduce(function(m, n){return m+n})
        }  
    }
    
    /**
     * 获取相册最外层的元素
     * @return {jQuery} 相册最外层元素对应的jQuery对象
     */  
    Album.prototype.getContainer = function(){
        container = $("#"+this.container);
        return container;
    }

    /**
     * 初始化并设置相册
     * 当相册原本包含图片时，该方法会替换原有图片
     * @param {(string|string[])} image  一张图片的 URL 或多张图片 URL 组成的数组
     * @param {object}            option 配置项
     */
    Album.prototype.setImage = function(image, option){
        this.image = [];
        this.baseImage = [];
        this.image = image;
        for(i of image){
            this.baseImage.push(i);
        }
        this.option = option;
        if(typeof image === "string"){
            this.setImage([image], option);
        }else{
            container = this.getContainer();
            if(this.getImageDomElements().length != 0){
                container.attr("class","");
                container.removeAttr("style");
                container.html("");
                $(window).unbind("scroll");
            }

            switch(option.layout){
                case this.LAYOUT.PUZZLE:
                    for(var i=0; i<image.length; i++){
                        container.append("<div><a href='#'><img src='"+image[i]+"' /></a></div>")
                    };
                    break;
                case this.LAYOUT.WATERFALL:
                    for(var i=0; i<option.waterfallColumn; i++){
                        var divEle = $("<div></div>").appendTo(container);
                        divEle.attr({"id": "img_box_"+i, "class": "column"});
                    }
                    break;
                case this.LAYOUT.BARREL:
                    break;

            }
            this.setLayout(option.layout);
            this.setGutter(option.gutterX, option.gutterY);
        }     
    }

    /**
     * 获取相册所有图像对应的 DOM 元素
     * @return {HTMLImageElement[]} 相册所有图像对应的 DOM 元素组成的数组
     */
    Album.prototype.getImageDomElements = function(){
        var container = this.getContainer()
        var imgBox = container.find("img");
        return ndtrarr(imgBox);
    };

    /**
     * 向相册添加图片
     * @param {(string|string[])} image 一张图片的 URL 或多张图片 URL 组成的数组
     */
    Album.prototype.addImage = function(image){
        if(typeof img === "string"){
            image = [image];
        }      
        for(i of image){
            this.baseImage.push(i);     
        } 
        this.setImage(this.baseImage, this.option);         
    }

    /**
     * 移除相册中的图片
     * @param  {(HTMLElement|HTMLElement[])} image 需要移除的图片
     * @return {boolean} 是否全部移除成功
     */
    Album.prototype.removeImage = function(image){
        try{
            if(image instanceof HTMLElement ){
                image = [image];
            }
            for(var i=0; i<image.length; i++){
                var imgjQ = $(image[i]);
                this.baseImage.splice(this.baseImage.indexOf(imgjQ.attr("src")), 1);
                this.setImage(this.baseImage, this.option);   
            } 
            return true; 
        }catch(error){
            return false;
        }        
    }

    /**
     * 设置相册的布局
     * @param {number} layout 布局值，IfeAlbum.LAYOUT 中的值
     */
    Album.prototype.setLayout = function(layout){
        
        switch (layout){
            case this.LAYOUT.PUZZLE: 
                this.setPuzzle();
                break;
            case this.LAYOUT.WATERFALL:
                this.setWaterfall();
                break;
            case this.LAYOUT.BARREL:
                this.setBarrel();
                break;
        }
    }
    /**
     * 获取相册的布局
     * @return {number} 布局枚举类型的值
     */
    Album.prototype.getLayout = function(){
        var layout = this.getContainer().attr("class");
        if(layout.indexOf("puzzle")>-1){
            return 1;
        }else if(layout.indexOf("waterfall")>-1){
            return 2;
        }else if(layout.indexOf("barrel")>-1){
            return 3;
        }
    }

    /**
     * 设置图片之间的间距
     * puzzle布局无效
     * @param {number}  x  图片之间的横向间距
     * @param {number}  y  图片之间的纵向间距，如果是 undefined 则等同于 x
     */
    Album.prototype.setGutter = function(x, y){
        if(typeof y == "undefined"){
            y = x;
        }
        var container = this.getContainer();
        var imgBox=container.find("a");
        imgBox.css("margin", function(){return y+"px "+x+"px"})
    }

    /**
     * 设置木桶模式每行图片数的下限
     * @param {number} min 最少图片数（含）
     */   
    Album.prototype.setBarrelBin = function(min){
        this.option.barrelMin = min;
        this.setImage(this.baseImage, this.option)
    }

    /**
     * 获取木桶模式每行图片数的下限
     * @return {number} 最少图片数（含）
     */
    Album.prototype.getBarrelBinMin = function(){
        return this.option.barrelMin
    }

    /**
     * 设置木桶模式每行高度的上下限，单位像素
     * @param {number} min 最小高度
     */
    Album.prototype.setBarrelHeight = function(low){
        this.option.barrelLow = low;
        this.setImage(this.baseImage, this.option)
    }

    /**
     * 获取木桶模式每行高度的下限
     * @return {number} 最少图片数（含）
     */
    Album.prototype.getBarrelHeight = function(){
        return this.option.barrelLow
    }

    /**
     * 设置puzzle布局
     */
    Album.prototype.setPuzzle = function(){
        imgEles = $(this.getImageDomElements());
        container = $(this.getContainer());
        setPuzzleSize(container, this.option.containerWidth, this.option.containerHeight)
        var num = imgEles.length;

        switch (num){
            case 0:
                alert(0);
                break;
            case 1:
                container.addClass("puzzle_1");
                puzzleAddClass(imgEles);
                break;
            case 2:
                container.addClass("puzzle_2");
                puzzleAddClass(imgEles);
                break;
            case 3:
                container.addClass("puzzle_3");
                puzzleAddClass(imgEles);
                break
            case 4:
                container.addClass("puzzle_4");
                puzzleAddClass(imgEles);
                break;
            case 5:
                container.addClass("puzzle_5");
                puzzleAddClass(imgEles);
                break;
            case 6:
                container.addClass("puzzle_6");
                puzzleAddClass(imgEles);
                break; 
            default:
                alert("over six");
        }
    }

    /**
     * 设置waterfall布局
     */
    Album.prototype.setWaterfall = function(){
        var imgUrl = this.image;
        var container = this.getContainer();
        container.addClass("waterfall");
        var option = this.option;


        if(imgUrl.length<20){
            alert("lower 20")
        }else{
            var colNum = $(".column").length
            for(var i=0; i<colNum; i++){
                var parEle = $("#img_box_"+i);
                wfAppendCheck(parEle, imgUrl[0], option);
                imgUrl.shift();
                wfAppendCheck(parEle, imgUrl[0], option);
                imgUrl.shift();
                wfAppendCheck(parEle, imgUrl[0], option);
                imgUrl.shift();
                wfAppendCheck(parEle, imgUrl[0], option);
                imgUrl.shift();
                
            }
            $(window).on("scroll", function(){
                for(var i=0; i<colNum; i++){
                    var parEle = $("#img_box_"+i);
                    if(wfAppendCheck(parEle, imgUrl[0], option)){
                        imgUrl.shift();
                    }
                }
            })     
        }           
    }

    /**
     * 设置barrel布局
     */
    Album.prototype.setBarrel = function(){
        var imgWidth = [];
        var imgHeight = [];
        var imgArr = [];
        var option = this.option;
        var container = this.getContainer();
        var setGutter = this.setGutter;

        container.addClass("barrel");
        for(i of this.baseImage){
            var newImg = new Image();
            newImg.src = i;
            imgArr.push(newImg);  
        }
        var last = imgArr.length - 1;
        imgArr[last].onload = function(){
            container.html("");
            imgArr.map(function(x){
                imgWidth.push(x.width);
                imgHeight.push(x.height);
            })
            var re = loadImg(option, imgHeight, imgWidth, imgArr);
            while (re.imgWidth.length > 0){
                re = loadImg(option, imgHeight, imgWidth, imgArr);
            }
            container.find("a").css("margin", function(){
                return option.gutterY + "px " + option.gutterX+"px"
            })
            imgArr = [];                              
        }   
    }

    if(typeof window.Album === "undefined"){
        window.Album = new Album();
    }
    
}(window))

