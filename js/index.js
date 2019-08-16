// JavaScript Document
(function($){
    var _introduceBol,
        _area2Obj = {};
    $(function(){
        _area2Obj = {};
        _area2Obj.step = "home";
        _area2Obj.nowProductNum = 0;
        _area2Obj.nowClickNum = 0;
        _area2Obj.nowImageNum = 0;
        _area2Obj.a519PhotoArr = [];
        _area2Obj.a519LoadPhotoArr = [];
        _area2Obj.motionPhotoArr = [];
        _area2Obj.motionLoadPhotoArr = [];
        _area2Obj.coolPhotoArr = [];
        _area2Obj.coolLoadPhotoArr = [];
        _area2Obj.formenPhotoArr = [];
        _area2Obj.formenLoadPhotoArr = [];
        _area2Obj.forwomenPhotoArr = [];
        _area2Obj.forwomenLoadPhotoArr = [];

        _area2Obj.coolImagePhotoArr = [];
        _area2Obj.coolImageLoadPhotoArr = [];
        _area2Obj.formenImagePhotoArr = [];
        _area2Obj.formenImageLoadPhotoArr = [];
        _area2Obj.forwomenImagePhotoArr = [];
        _area2Obj.forwomenImageLoadPhotoArr = [];

        _area2Obj.a519PhotoNum = 1;
        _area2Obj.motionPhotoNum = 1;
        _area2Obj.coolPhotoNum = 18;
        _area2Obj.formenPhotoNum = 61;
        _area2Obj.forwomenPhotoNum = 54;

        _area2Obj.coolImagePhotoNum = 18;
        _area2Obj.formenImagePhotoNum = 13;
        _area2Obj.forwomenImagePhotoNum = 12;
        _area2Obj.imageRandom = 2 + Math.floor( Math.random() * 3 );
        setMove();
        setButton();
        setEventListener();
        // console.log('_area2Obj.imageRandom = ', _area2Obj.imageRandom);

        if (Fun.detectmobile.isMobile) {
            $('.wrapper').addClass('mobile');
            orientation();
        }

        $(window).on('orientationchange resize', orientation);

        function orientation() {
            if(window.innerWidth > window.innerHeight){
            $('.product_view').addClass('horizontal');
            } else {
                $('.product_view').removeClass('horizontal');
            }
        }

        $(window).scroll(function(){
            var scrollTop = $(window).scrollTop();
            var windowHeight = $(window).height();
            var scrollPosition = scrollTop + windowHeight;
            var index = 0;
            $(".animate").each(function(i, element) {
                var j_this = $(this);
                if( scrollPosition > j_this.offset().top) {
                    index = i;
                    j_this.not(".show").addClass("show"); 
                }
            });
            if ($('.s2-l-1').hasClass('show')) {
                // alert('aa');
                $('.s2-l-2, .s2-l-3, .s3').addClass("show");
            }
        }).scroll();

        var j_product_view = $('.product_view'),
            startX,
            endX;

        j_product_view.on("touchstart", touchStart);
        j_product_view.on("touchend", touchEnd);

        function touchStart() {
            // event.preventDefault();
            startX = event.targetTouches[0].pageX;
        }

        function touchEnd() {
            event.preventDefault();
            endX = event.changedTouches[0].pageX;
            moveX = endX - startX;
        
            if( moveX > 50 ){
                $('.leftBtn').click();       
            }
            
            if( moveX < -50 ){
                $('.rightBtn').click();        
            }
        }

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

        $('.519, .motion, .cool, .formen, .forwomen').on('click', function(e) {
            e.preventDefault();
            // if(_area2Obj.step != "home") return;
            _area2Obj.nowClickNum = 0;
            if ( $(this).hasClass('519') ) {
                _area2Obj.step = "a519";
            } else if ( $(this).hasClass('motion') ) {
                _area2Obj.step = "motion";
            } else if ( $(this).hasClass('cool') ) {
                _area2Obj.step = "cool";
            } else if ( $(this).hasClass('formen') ) {
                _area2Obj.step = "formen";
            } else if ( $(this).hasClass('forwomen') ) {
                _area2Obj.step = "forwomen";
            }
        });

        $('.519, .motion, .cool, .formen, .forwomen').each(function(i) {
            var clickFunStr = 'productClick("_id_")';
            clickFunStr = clickFunStr.replace("_id_", 1);
            $(this).attr('onclick', clickFunStr);
        });
        for (var i = 1; i <= _area2Obj.a519PhotoNum; i++) {
            var imgUrl = "images/R2/519.jpg";
            _area2Obj.a519PhotoArr.push(imgUrl);
            _area2Obj.a519LoadPhotoArr.push(false);
        }
        for (var i = 1; i <= _area2Obj.motionPhotoNum; i++) {
            var imgUrl = "images/R2/Motion.jpg";
            _area2Obj.motionPhotoArr.push(imgUrl);
            _area2Obj.motionLoadPhotoArr.push(false);
        }
        for (var i = 1; i <= _area2Obj.coolPhotoNum; i++) {
            var imgUrl = "images/R2/cool-" + Fun.str_pad(i, 2, "0") + ".jpg";
            // imgUrl = "images/R2/cool-_img_.jpg";
            _area2Obj.coolPhotoArr.push(imgUrl);
            _area2Obj.coolLoadPhotoArr.push(false);
        }
        for (var i = 1; i <= _area2Obj.formenPhotoNum; i++) {
            var imgUrl = "images/R2/formen-" + Fun.str_pad(i, 2, "0") + ".jpg";
            _area2Obj.formenPhotoArr.push(imgUrl);
            _area2Obj.formenLoadPhotoArr.push(false);
        }
        for (var i = 1; i <= _area2Obj.forwomenPhotoNum; i++) {
            var imgUrl = "images/R2/forwomen-" + Fun.str_pad(i, 2, "0") + ".jpg";
            _area2Obj.forwomenPhotoArr.push(imgUrl);
            _area2Obj.forwomenLoadPhotoArr.push(false);
        }
        for (var i = 1; i <= _area2Obj.coolImagePhotoNum; i++) {
            var imgUrl = "images/R2/coolimage-" + Fun.str_pad(i, 2, "0") + ".jpg";
            _area2Obj.coolImagePhotoArr.push(imgUrl);
            _area2Obj.coolImageLoadPhotoArr.push(false);
        }
        for (var i = 1; i <= _area2Obj.formenImagePhotoNum; i++) {
            var imgUrl = "images/R2/formenimage-" + Fun.str_pad(i, 2, "0") + ".jpg";
            _area2Obj.formenImagePhotoArr.push(imgUrl);
            _area2Obj.formenImageLoadPhotoArr.push(false);
        }
        for (var i = 1; i <= _area2Obj.forwomenImagePhotoNum; i++) {
            var imgUrl = "images/R2/forwomenimage-" + Fun.str_pad(i, 2, "0") + ".jpg";
            _area2Obj.forwomenImagePhotoArr.push(imgUrl);
            _area2Obj.forwomenImageLoadPhotoArr.push(false);
        }
        // console.log('_area2Obj.a519PhotoArr = ', _area2Obj.a519PhotoArr);
        // console.log('_area2Obj.motionPhotoArr = ', _area2Obj.motionPhotoArr);
        // console.log('_area2Obj.coolPhotoArr = ', _area2Obj.coolPhotoArr);
        // console.log('_area2Obj.formenPhotoArr = ', _area2Obj.formenPhotoArr);
        // console.log('_area2Obj.forwomenPhotoArr = ', _area2Obj.forwomenPhotoArr);

        // console.log('_area2Obj.a519LoadPhotoArr = ', _area2Obj.a519LoadPhotoArr);
        // console.log('_area2Obj.motionLoadPhotoArr = ', _area2Obj.motionLoadPhotoArr);
        // console.log('_area2Obj.coolLoadPhotoArr = ', _area2Obj.coolLoadPhotoArr);
        // console.log('_area2Obj.formenLoadPhotoArr = ', _area2Obj.formenLoadPhotoArr);
        // console.log('_area2Obj.forwomenLoadPhotoArr = ', _area2Obj.forwomenLoadPhotoArr);

        var getRandomArr = function (pArr) {
            var random, spliceItem, newArr = [];
            for(var i = pArr.length; i > 0; i--) {
                random = Math.floor( Math.random() * i );
                spliceItem = pArr.splice(random, 1).toString();
                newArr.push(spliceItem);
            }
            return newArr;
        }

        _area2Obj.a519PhotoArr = getRandomArr(_area2Obj.a519PhotoArr);
        _area2Obj.motionPhotoArr = getRandomArr(_area2Obj.motionPhotoArr);
        _area2Obj.coolPhotoArr = getRandomArr(_area2Obj.coolPhotoArr);
        _area2Obj.formenPhotoArr = getRandomArr(_area2Obj.formenPhotoArr);
        _area2Obj.forwomenPhotoArr = getRandomArr(_area2Obj.forwomenPhotoArr);

        _area2Obj.coolImagePhotoArr = getRandomArr(_area2Obj.coolImagePhotoArr);
        _area2Obj.formenImagePhotoArr = getRandomArr(_area2Obj.formenImagePhotoArr);
        _area2Obj.forwomenImagePhotoArr = getRandomArr(_area2Obj.forwomenImagePhotoArr);

        // console.log('_area2Obj.a519PhotoArr = ', _area2Obj.a519PhotoArr);
        // console.log('_area2Obj.motionPhotoArr = ', _area2Obj.motionPhotoArr);
        // console.log('_area2Obj.coolPhotoArr = ', _area2Obj.coolPhotoArr);
        // console.log('_area2Obj.formenPhotoArr = ', _area2Obj.formenPhotoArr);
        // console.log('_area2Obj.coolImagePhotoArr = ', _area2Obj.coolImagePhotoArr);
        // console.log('_area2Obj.formenImagePhotoArr = ', _area2Obj.formenImagePhotoArr);
        // console.log('_area2Obj.forwomenImagePhotoArr = ', _area2Obj.forwomenImagePhotoArr);

        $('.leftBtn').on('click', function(e){
            // if(_area2Obj.step != "man") return;
            // _area2Obj.manSlider.$Prev();
        });

        $('.rightBtn').on('click', function(e){
            // if(_area2Obj.step != "man") return;
            // _area2Obj.manSlider.$Next();
        });

        //product_view
        $('.product_view .leftBtn').on('click', function(e){
            e.preventDefault();
            _area2Obj.productChangeType = "prev";
            _area2Obj.nowProductNum--;
            _area2Obj.nowClickNum++;
            changeProductPhoto();
            return false;
        });

        $('.product_view .rightBtn').on('click', function(e){
            e.preventDefault();
            _area2Obj.productChangeType = "next";
            _area2Obj.nowProductNum++;
            _area2Obj.nowClickNum++;
            changeProductPhoto();
            return false;
        });

        $('.product_view .closebtn, .popup-bg').on('click', function(e){
            e.preventDefault();
            $('.product_view').fadeOut();
            $('body').css({
                'overflow': 'auto'
            });
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

    var url = "";
    function changeProductPhoto(){
        var changeEle = $('.product_view .product_bigImg img'),
            // url = "images/501/",
            // url = "",
            pageNum = "#slider__num1_ .btnProduct_num2_",
            masterSlider;
        // 避免看ProductPhoto時，後面的頁面滑動
        $('body').css({
            'overflow': 'hidden'
        });
        switch(_area2Obj.step){
            case "a519":
                _area2Obj.nowProductArr = _area2Obj.a519PhotoArr;
                _area2Obj.nowLoadProductArr = _area2Obj.a519LoadPhotoArr;
            break;
            case "motion":
                _area2Obj.nowProductArr = _area2Obj.motionPhotoArr;
                _area2Obj.nowLoadProductArr = _area2Obj.motionLoadPhotoArr;
            break;
            case "cool":
                _area2Obj.nowProductArr = _area2Obj.coolPhotoArr;
                _area2Obj.nowLoadProductArr = _area2Obj.coolLoadPhotoArr;
                _area2Obj.nowImagePhotoArr = _area2Obj.coolImagePhotoArr; 
            break;
            case "formen":
                _area2Obj.nowProductArr = _area2Obj.formenPhotoArr;
                _area2Obj.nowLoadProductArr = _area2Obj.formenLoadPhotoArr;
                _area2Obj.nowImagePhotoArr = _area2Obj.formenImagePhotoArr; 
            break;
            case "forwomen":
                _area2Obj.nowProductArr = _area2Obj.forwomenPhotoArr;
                _area2Obj.nowLoadProductArr = _area2Obj.forwomenLoadPhotoArr;
                _area2Obj.nowImagePhotoArr = _area2Obj.forwomenImagePhotoArr; 
            break;
        }

        if (_area2Obj.nowProductArr.length == 1) {
            $('.leftBtn, .rightBtn').hide();
        } else {
            $('.leftBtn, .rightBtn').show();
        }

        // if(_area2Obj.step == "a519"){
        //     _area2Obj.nowProductArr = _area2Obj.a519PhotoArr;
        //     _area2Obj.nowLoadProductArr = _area2Obj.a519LoadPhotoArr;
        // } else if (_area2Obj.step == "motion"){
        //     _area2Obj.nowProductArr = _area2Obj.motionPhotoArr;
        //     _area2Obj.nowLoadProductArr = _area2Obj.motionLoadPhotoArr;
        // } else if (_area2Obj.step == "cool"){
        //     _area2Obj.nowProductArr = _area2Obj.coolPhotoArr;
        //     _area2Obj.nowLoadProductArr = _area2Obj.coolLoadPhotoArr;
        // } else if (_area2Obj.step == "formen"){
        //     _area2Obj.nowProductArr = _area2Obj.formenPhotoArr;
        //     _area2Obj.nowLoadProductArr = _area2Obj.formenLoadPhotoArr;
        // } else if (_area2Obj.step == "forwomen"){
        //     _area2Obj.nowProductArr = _area2Obj.forwomenPhotoArr;
        //     _area2Obj.nowLoadProductArr = _area2Obj.forwomenLoadPhotoArr;
        // }

        // console.log('_area2Obj.a519LoadPhotoArr = ', _area2Obj.a519LoadPhotoArr);
        // console.log('_area2Obj.nowLoadProductArr = ', _area2Obj.nowLoadProductArr);

        // 展示形象圖
        if ( _area2Obj.nowClickNum % _area2Obj.imageRandom == 0 && _area2Obj.nowClickNum != 0 ) {
            if(_area2Obj.nowImageNum > _area2Obj.nowImagePhotoArr.length - 1){
                _area2Obj.nowImageNum = 0;
            }

            url = _area2Obj.nowImagePhotoArr[_area2Obj.nowImageNum];
            _area2Obj.imageRandom = 2 + Math.floor( Math.random() * 3 );
            _area2Obj.nowClickNum = 0;
            _area2Obj.nowImageNum++;
            _area2Obj.nowProductNum--;

        } else {
            if(_area2Obj.nowProductNum < 1){
                _area2Obj.nowProductNum = _area2Obj.nowProductArr.length;
            }

            if(_area2Obj.nowProductNum > _area2Obj.nowProductArr.length){
                _area2Obj.nowProductNum = 1;
            }
            url = _area2Obj.nowProductArr[_area2Obj.nowProductNum - 1];
        }

        // console.log('url = ', url);
        console.log('_area2Obj.imageRandom = ', _area2Obj.imageRandom);

        if(!_area2Obj.nowLoadProductArr[_area2Obj.nowProductNum -1]){
            // _area2Obj.nowProductArr[_area2Obj.nowProductNum -1] = url;
            Fun.loadingChange(true);
            Fun.loadImg(url, productCallback);
        }else{
            //changeEle.attr('src', url);
            productChangeShow(url);
        }
    }

    function productCallback(pBol){
        pBol = pBol || false;
        Fun.loadingChange(false);
        // console.log("productCallback");
        if(pBol){
            //$('.product_view .product_bigImg img').attr("src", _area2Obj.nowProductArr[_area2Obj.nowProductNum -1]);
            // productChangeShow(_area2Obj.nowProductArr[_area2Obj.nowProductNum -1]);
            productChangeShow(url);

        }else{

        }
    }

    function productChangeShow(pSrc){
        var nowImgEle = $('.product_view .product_bigImg img');
        if(_area2Obj.productChangeType){
            var newEle = '<img src="_src_">';
            newEle = newEle.replace("_src_", pSrc);
            newEle = $(newEle);
            $('.product_view .product_bigImg').append(newEle);
            setProductTMX(nowImgEle, false);
            setProductTMX(newEle, true);
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
    window.productClick = function(pId){
        delete _area2Obj.productChangeType;
        // console.log(_area2Obj.downBol);
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