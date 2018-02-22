addLoadEvent(sliding);

function sliding(){
    var container = document.getElementById("container");
    var images = container.getElementsByTagName("img");

    //获得单张图片的宽度

    var imageWidth = images[0].offsetWidth;

    //获得单张漏出宽度

    var showWidth = 200;

    //获得容器的总宽度

    var boxWidth = imageWidth + (images.length - 1) * showWidth;
    container.style.width = boxWidth + "px";

    //计算每个图片距离左边的初始位置。第一张初始left为0，所以循环由第二个图i＝1开始。
    function setLeft(){
        for(var i = 1;i < images.length;i++){
            images[i].style.left = imageWidth + showWidth * (i - 1) + "px";
        }
    }
    setLeft();

    //计算每个门打开时移动的距离
    var openWidth = imageWidth - showWidth;

    for(var i = 0;i < images.length;i++){

            //立即调用
        (function(i){
            images[i].onmouseover = function(){

                //复位
                setLeft();

                //打开
                for(var j=1;j<=i;j++){
                    images[j].style.left = parseInt(images[j].style.left) - openWidth + "px";
                }
            };
        })(i)
    }


}
