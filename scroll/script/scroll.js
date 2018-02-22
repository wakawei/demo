addLoadEvent(scroll);

function scroll(){
    var container = document.getElementById("container");
    var list = document.getElementById("list");
    var buttons = document.getElementById("buttons").getElementsByTagName("li");
    var prev = document.getElementById("prev");
    var next = document.getElementById("next");
    var index = 1;
    var isAnimate = false;
    var timer;


    function showButton(){

        for( var i = 0;i < buttons.length; i++){
            if(buttons[i].className == "on"){
                buttons[i].className = "";
                break;
            }
        }
        buttons[index - 1].className = "on"; //下标取值

    }

    function animate(offset){

        var newLeft = parseInt(list.style.left) + offset;
        var time = 300;
        var interval = 10;
        var speed = offset/(time/interval);

        function go(){
            if(speed > 0 && parseInt(list.style.left) < newLeft || speed < 0 && parseInt(list.style.left) > newLeft){
                list.style.left = parseInt(list.style.left) + speed + 'px';
                isAnimate = true;
                setTimeout(go,interval);
            }else{

                list.style.left = newLeft + "px";

                if(newLeft > -600){
                    list.style.left = -2400 + "px";
                }
                if(newLeft < -2400){
                    list.style.left = -600 + "px";
                }
                isAnimate = false
            }
        }

        go();
    };
    //设置自动播放定时器
    function play(){
        timer = setInterval(function(){
           next.onclick();
        },3000);
    };

    //清除定时器
    function stop(){
        clearInterval(timer);
    };

    next.onclick = function(){

        if(isAnimate){
            return;
        }

        if(index == 4){
            index = 1;
        }else{
            index += 1;
        };

        showButton();
        animate(-600);
    };

    prev.onclick = function(){

        if(isAnimate){
            return;
        }

        if(index == 1){
            index = 4
        }else{
            index -= 1;
        };

        showButton();
        animate(600);
    };

    for(var i = 0;i < buttons.length; i++){

        buttons[i].onclick = function(){
            if(this.className == "on"){
                return;
            };

            var myIndex = parseInt(this.getAttribute("index")) ;
            var offset = -600 * (myIndex - index) ;

            animate(offset);
            index = myIndex;
            showButton();
        }
    }

    container.onmouseout = play;
    container.onmouseover = stop;

    play();


}