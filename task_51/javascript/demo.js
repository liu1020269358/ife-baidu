
$(window).on('load', function(){
    
    var image = createImgArr(createIArr(100));
    var option = {
        layout: 2,
        containerWidth: 1100,
        waterfallColumn: 4, 
        gutterX: 15,
        gutterY: 20,
        barrelMin : 3,
        barrelLow : 100,
    }
    Album.setImage(image, option);
    
    for(var i=1; i<7; i++){
        puzzledemo(i)
    }


    $("#waterfall").on("click", function(){
        var image = createImgArr(createIArr(100));
        var option = {
            layout: 2,
            containerWidth: 1100,
            waterfallColumn: 4, 
            gutterX: 15,
            gutterY: 20,
            barrelMin : 3,
            barrelLow : 100,
        }
        Album.setImage(image, option);
    })

    $("#barrel").on("click", function(){
        var image = createImgArr(createBarrelNumArr())
        var option = {
            layout: 3,
            containerWidth: 1100, 
            gutterX: 15,
            gutterY: 20,
            barrelMin : 3,
            barrelLow : 150,
        }
        Album.setImage(image, option);
    })
})

function createImgArr(i){
    var image = [];
    for(var j of i){
        var img = "./image/img"+j+".png";
        image.push(img);
    }
    return image;
}

function createIArr(num){
    var i = [];
    for(var j=0; j<num; j++){
        x = parseInt(10 * Math.random());
        i.push(x);
    }
    return i;
}

function createBarrelNumArr(){
    var i = [];
    for(var j=0; j<30; j++){
        i.push(j);
    }
    return i;
}

function createPuzzleImg(i){
    var img = [];
    for(var n=0; n<i; n++){
        var aImg = "./image/img3"+n+".png";
        img.push(aImg);
    }  
    return img;
}

function puzzledemo(i){
    $("#puzzle"+i).on("click", function(){
        var image = createPuzzleImg(i);
        var option = {
            layout: 1,
            containerWidth: 500,
            containerHeight: 400,
        }
        Album.setImage(image, option);
    })
}
