$(document).on("ready", function(){
    for(var i=0; i<config.colNum; i++){
        var divEle = $("<div></div>").appendTo($("#main"));
        divEle.attr({"id": "img_box_"+i, "class": "column"});
        createImage(divEle);
        createImage(divEle);
        createImage(divEle);
        createImage(divEle);
    }
})

$(window).on("load",function(){
    init();
    window.onscroll = function(){
        for(var i=0; i<config.colNum; i++){
            var eleColumn = ($("#img_box_" + i));
            appendCheck(eleColumn);
            appendCheck(eleColumn);
            appendCheck(eleColumn);
        }
    }


    
})

var config = {
    'colMargin' : '15',
    'colNum' : '4',
    'rowMargin' : '30',
};

function init(){

    var imgWidth = $(".column>a>img").width();
    var Margin = config.colMargin+"px "+config.rowMargin/2+"px";
    var MainWidth = parseInt(config.colMargin)*parseInt(config.colNum)*2 + imgWidth*parseInt(config.colNum);


    setMargin(Margin);
    setMainWidth(MainWidth);
}

function setMainWidth(MainWidth){
    $("#main").css({"width": MainWidth, "margin": "0 auto"});
}  

function setMargin(Margin){
    $(".column").css("margin", Margin);
} 



function createUrl(){
    var num=parseInt(10 * Math.random()).toString();
    var url = "./image/img"+num+".png";
    return url;
}

function createImage(parEle){
    var url = createUrl();
    var aEle = $("<a></a>").appendTo(parEle);
    var imgEle = $("<img/>").appendTo(aEle);
    aEle.attr("href","#");
    imgEle.attr("src",url);
}

function appendCheck(eleColumn){
    var body = $("body");
    if(eleColumn.offset().top + eleColumn.height() < body.scrollTop() + $(window).height()){
        createImage(eleColumn);
    }
}
