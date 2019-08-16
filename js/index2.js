// JavaScript Document
(function($){
    var _introduceBol,
        _area2Obj = {};
    $(function(){
        _area2Obj = {};
        _area2Obj.step = "home";
        _area2Obj.nowProductNum = 0;
        _area2Obj.manPhotoArr = [];
        _area2Obj.womanPhotoArr = [];
        setMove();
        setButton();
        setEventListener();
    });

    function setMove(){
        jssor_slider_starter('slider1_container', {$PauseOnHover:0});
        $('.photoarea-left li').each(function(i) {
            new PhotoBanner($(this), 315);
        });

        $('.photoarea-center li').each(function(i) {
            new PhotoBanner($(this), 337);
        });

        $('.photoarea-right li').each(function(i) {
            new PhotoBanner($(this), 330);
        });
        // $('.introduce-content').automove({paused:true});
    }

    function setButton(){
        $('.cloth .box').on('click', function(e){
            e.preventDefault();
            if(_area2Obj.step != "home") return;
            $('.cloth').fadeOut();
            if($(this).hasClass('man_box')){
                _area2Obj.step = "man";
                if(!_area2Obj.manSlider){
                    _area2Obj.manSlider = jssor_slider_starter('slider_man', {$AutoPlay:false});
                }
                
                $('.man-all').fadeIn();
            }else if($(this).hasClass('woman_box')){
                _area2Obj.step = "woman";
                if(!_area2Obj.womanSlider){
                    _area2Obj.womanSlider = jssor_slider_starter('slider_woman', {$AutoPlay:false});
                }
                $('.woman-all').fadeIn();
            }
        });

        /*$('#slider_man .man_slides a').on('click', function(e){
            //if(_area2Obj.step != "man") return;
            console.log(this.id);
        });*/
        $('#slider_man .man_slides a').each(function(i) {
            var clickFunStr = 'manClick("_id_")';
            clickFunStr = clickFunStr.replace("_id_", this.id);
            $(this).attr('onclick', clickFunStr);
            _area2Obj.manPhotoArr.push(false);
        });

        $('#slider_man .leftBtn').on('click', function(e){
            if(_area2Obj.step != "man") return;
            _area2Obj.manSlider.$Prev();
        });

        $('#slider_man .rightBtn').on('click', function(e){
            if(_area2Obj.step != "man") return;
            _area2Obj.manSlider.$Next();
        });

        /*$('#slider_woman .woman_slides a').on('click', function(e){
            if(_area2Obj.step != "man") return;
            console.log(this.id);
        });*/

        $('#slider_woman .woman_slides a').each(function(i) {
            var clickFunStr = 'womanClick("_id_")';
            clickFunStr = clickFunStr.replace("_id_", this.id);
            $(this).attr('onclick', clickFunStr);
            _area2Obj.womanPhotoArr.push(false);
        });

        $('#slider_woman .leftBtn').on('click', function(e){
            if(_area2Obj.step != "woman") return;
            _area2Obj.womanSlider.$Prev();
        });
        
        $('#slider_woman .rightBtn').on('click', function(e){
            if(_area2Obj.step != "woman") return;
            _area2Obj.womanSlider.$Next();
        });

        //product_view
        $('.product_view .leftBtn').on('click', function(e){
            e.preventDefault();
            _area2Obj.productChangeType = "prev";
            _area2Obj.nowProductNum--;
            changeProductPhoto();
        });

        $('.product_view .rightBtn').on('click', function(e){
            e.preventDefault();
            _area2Obj.productChangeType = "next";
            _area2Obj.nowProductNum++;
            changeProductPhoto();
        });

        $('.product_view .closebtn').on('click', function(e){
            e.preventDefault();
            $('.product_view').fadeOut();
        });

        clickCheck();
    }

    function setEventListener(){
        $(window).scroll(scrollChange).trigger('scroll');
    }

    function scrollChange(){
        if(_introduceBol) return;
        var dis = $(window).height() + $(document).scrollTop();
        // if(dis > 1000){
        //     $('.introduce-content').automove_play();
        //     _introduceBol = true;
        // }
    }

    function clickCheck(){
        var downStr = "mousedown",
            upStr = "mouseup",
            moveStr = "mouseup";
        //if ('ontouchstart' in document.documentElement) {
        if(Fun.detectmobile.isMobile){
            downStr = "touchstart",
            upStr = "touchend",
            moveStr = "touchmove";
            FastClick.attach(document.body);
        }
        $(document).on(downStr, function(e) {
            _area2Obj.downBol = true;
            _area2Obj.prevPosition = {};
            _area2Obj.prevPosition.x = e.pageX;
            _area2Obj.prevPosition.y = e.pageY;
            if (_area2Obj.prevPosition.x == undefined) {
                _area2Obj.prevPosition.x = e.originalEvent.changedTouches[0].pageX;
                _area2Obj.prevPosition.y = e.originalEvent.changedTouches[0].pageY;
            }
            setClickTimer();
        })/*.on(upStr, function(e) {
            if (checkClick()) {
                clearClickTimer();
                _settings.onClickCallback(e);
            }
        })*/.on(moveStr, function(e){
            if(_area2Obj.downBol){
                _area2Obj.nowPosition = {};
                _area2Obj.nowPosition.x = e.pageX;
                _area2Obj.nowPosition.y = e.pageY;
                if (_area2Obj.nowPosition.x == undefined) {
                    _area2Obj.nowPosition.x = e.originalEvent.changedTouches[0].pageX;
                    _area2Obj.nowPosition.y = e.originalEvent.changedTouches[0].pageY;
                }
                var disNum = parseInt(Math.sqrt(Math.pow(_area2Obj.prevPosition.x - _area2Obj.nowPosition.x, 2) + Math.pow(_area2Obj.prevPosition.y - _area2Obj.nowPosition.y, 2)));
                if (disNum > 20) {
                    clearClickTimer();
                }
            }
        })

        function setClickTimer() {
            clearClickTimer();
            _area2Obj.downBol = true;
            _area2Obj.clickTimer = window.setTimeout(clearClickTimer, 300);
        }

        function clearClickTimer() {
            if (_area2Obj.clickTimer) {
                window.clearTimeout(_area2Obj.clickTimer);
            }
            delete _area2Obj.downBol;
        }

    }

    function jssor_slider_starter(containerId, opt) {
        opt = opt || {};
        var options = {
            $AutoPlay: true, //[Optional] Whether to auto play, to enable slideshow, this option must be set to true, default value is false
            $AutoPlayInterval: 5000,
            $SlideDuration: 1000, //[Optional] Specifies default duration (swipe) for slide in milliseconds, default value is 500

            $BulletNavigatorOptions: { //[Optional] Options to specify and enable navigator or not
                $Class: $JssorBulletNavigator$, //[Required] Class to create navigator instance
                $ChanceToShow: 2, //[Required] 0 Never, 1 Mouse Over, 2 Always
                $AutoCenter: 1, //[Optional] Auto center navigator in parent container, 0 None, 1 Horizontal, 2 Vertical, 3 Both, default value is 0
                $Steps: 1, //[Optional] Steps to go for each navigation request, default value is 1
                $Lanes: 1, //[Optional] Specify lanes to arrange items, default value is 1
                $SpacingX: 10, //[Optional] Horizontal space between each item in pixel, default value is 0
                $SpacingY: 10, //[Optional] Vertical space between each item in pixel, default value is 0
                $Orientation: 1 //[Optional] The orientation of the navigator, 1 horizontal, 2 vertical, default value is 1
            }
        };
        options = $.extend({}, options, opt)
        return new $JssorSlider$(containerId, options);
    }

    function changeProductPhoto(){
        var changeEle = $('.product_view .product_bigImg img'),
            url = "images/",
            pageNum = "#slider__num1_ .btnProduct_num2_",
            masterSlider;
        if(_area2Obj.step == "man"){
            _area2Obj.nowProductArr = _area2Obj.manPhotoArr;
            masterSlider = _area2Obj.manSlider;
            url += "product_man__num_.jpg";
        }else if(_area2Obj.step == "woman"){
            _area2Obj.nowProductArr = _area2Obj.womanPhotoArr;
            masterSlider = _area2Obj.womanSlider;
            url += "product_woman__num_.jpg";
        }

        if(_area2Obj.nowProductNum < 1){
            _area2Obj.nowProductNum = _area2Obj.nowProductArr.length;
        }

        if(_area2Obj.nowProductNum > _area2Obj.nowProductArr.length){
            _area2Obj.nowProductNum = 1;
        }

        url = url.replace("_num_", Fun.str_pad(_area2Obj.nowProductNum, 2, "0"));

        if(!_area2Obj.nowProductArr[_area2Obj.nowProductNum -1]){
            _area2Obj.nowProductArr[_area2Obj.nowProductNum -1] = url;
            Fun.loadingChange(true);
            Fun.loadImg(url, productCallback);
        }else{
            //changeEle.attr('src', url);
            productChangeShow(url);
        }

        pageNum = pageNum.replace("_num2_", Fun.str_pad(_area2Obj.nowProductNum, 2, "0"));
        pageNum = pageNum.replace("_num1_", _area2Obj.step);
        pageNum = $(pageNum).parent().attr('class');
        pageNum = parseInt(pageNum.substr(pageNum.length - 1, 2));
        if(_area2Obj.nowPageNum){
            if(pageNum != _area2Obj.nowPageNum){
                _area2Obj.nowPageNum = pageNum;
                masterSlider.$PlayTo(_area2Obj.nowPageNum - 1);
            }
        }else{
            _area2Obj.nowPageNum = pageNum;
        }
    }

    function productCallback(pBol){
        pBol = pBol || false;
        Fun.loadingChange(false);
        if(pBol){
            //$('.product_view .product_bigImg img').attr("src", _area2Obj.nowProductArr[_area2Obj.nowProductNum -1]);
            productChangeShow(_area2Obj.nowProductArr[_area2Obj.nowProductNum -1]);
        }else{

        }
        console.log(pBol);
    }

    function productChangeShow(pSrc){
        var nowImgEle = $('.product_view .product_bigImg img');
        if(_area2Obj.productChangeType){
            var newEle = '<img src="_src_">';
            newEle = newEle.replace("_src_", pSrc);
            newEle = $(newEle);
            $('.product_view .product_bigImg').append(newEle);
            setProductTMX(nowImgEle, false);
            setProductTMX(newEle, true)
            /*if(_area2Obj.productChangeType == "prev"){
                setProductTMX(nowImgEle, false)
            }else if(_area2Obj.productChangeType == "next"){

            }*/
        }else{
            nowImgEle.attr("src", pSrc);
        }
    }

    function setProductTMX(pEle, pBol) {
        pBol = pBol || false;
        var strMove = {},
            endMove = {},
            moveNum = 300;
        if(pBol) {
            if(_area2Obj.productChangeType == "prev"){
                strMove.left = -moveNum
            }else if(_area2Obj.productChangeType == "next"){
                strMove.left = moveNum;
            }
            //strMove.left = _moveObj.w;
            /*strMove.onStart = setProductComplete;
            strMove.onStartParams = [pEle, pBol];*/
            strMove.alpha = 0;
            endMove.left = 0;
            endMove.alpha = 1;
            endMove.ease = Circ.easeOut;
        } else {
            if(_area2Obj.productChangeType == "prev"){
                endMove.left = moveNum;
            }else if(_area2Obj.productChangeType == "next"){
                endMove.left = -moveNum;
            }
            //strMove.left = 0;
            //endMove.left = -_moveObj.w;
            endMove.alpha = 0;
            endMove.onComplete = setProductComplete;
            endMove.onCompleteParams = [pEle, pBol];
            endMove.ease = Circ.easeOut;
        }
        TweenMax.fromTo(pEle, 1, strMove, endMove);
    }

    function setProductComplete(pEle, pBol) {
        if (pBol) {
            pEle.show();
        } else {
            pEle.hide();
            pEle.remove();
        }
    }

    //window fun
    window.manClick = function(pId){
        delete _area2Obj.productChangeType;
        console.log(_area2Obj.downBol);
        if(!_area2Obj.downBol) return;
        $('.product_view').fadeIn();
        _area2Obj.nowProductNum = parseInt(pId, 10);
        changeProductPhoto();
    }

    window.womanClick = function(pId){
        if(!_area2Obj.downBol) return;
        $('.product_view').fadeIn();
        _area2Obj.nowProductNum = parseInt(pId, 10);
        changeProductPhoto();
    }

    //PhotoBanner
    function PhotoBanner(pEle, pW){
        var _moveObj = {};
        _moveObj.nowNum = 0;
        _moveObj.w = pW;
        _moveObj.photos = pEle.children();
        _moveObj.photosLength = _moveObj.photos.length;
        _moveObj.nowEle = _moveObj.photos.eq(_moveObj.nowNum);
        _moveObj.delayTimer = parseInt(Math.random() * 3);
        _moveObj.timerNum = parseInt((3 + Math.random() * 3) * 1000);
        _moveObj.photos.hide().eq(0).show();

        function loop(){
            stopTimer();
            _moveObj.nowNum++;
            if(_moveObj.nowNum >= _moveObj.photos.length) _moveObj.nowNum = 0;
            setTMX(_moveObj.nowEle, false);
            _moveObj.nowEle = _moveObj.photos.eq(_moveObj.nowNum)
            setTMX(_moveObj.nowEle, true);
            _moveObj.delayTimer = 0;
        };

        function startTimer(){
            _moveObj.loopTimer = window.setTimeout(loop, _moveObj.timerNum);
        }

        function stopTimer(){
            if(_moveObj.loopTimer){
                window.clearTimeout(_moveObj.loopTimer);
                delete _moveObj.loopTimer
            }
        }

        function setTMX(pEle, pBol){
            pBol = pBol || false;
            var strMove = {}, endMove = {};
            if(pBol){
                strMove.left = _moveObj.w;
                strMove.onStart = complete;
                strMove.onStartParams = [pEle, pBol];
                endMove.left = 0;
            }else{
                strMove.left = 0;
                endMove.left = -_moveObj.w;
                endMove.onComplete = complete;
                endMove.onCompleteParams = [pEle, pBol];
            }

            TweenMax.fromTo(pEle, 1, strMove, endMove);
        }

        function complete(pEle, pBol){
            if(pBol){
                pEle.show();
            }else{
                pEle.hide();
                startTimer();
            }
        }
        startTimer();
    }

})(jQuery);