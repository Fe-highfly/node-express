var course = {
        init: function() {
            this.banner();
        },
        banner: function() {
            var swiper = new Swiper('.swiper-container', {
                autoplay: 1000,
                pagination: '.swiper-pagination',
                nextButton: '.swiper-button-next',
                prevButton: '.swiper-button-prev',
                slidesPerView: 1,
                paginationClickable: true,
                spaceBetween: 30,
                loop: true
            });
        },
        showFont: function(obj) {
            obj.on('onmouseover', function() {

            })
        }
    }
    // 初始化
course.init()