(function ($) {
  "use strict";

  /*-------------------------------------
  	Google Map
  	-------------------------------------*/
  $(".map-box").each(function () {
    var $this = $(this),
      key = $this.data("key"),
      lat = $this.data("lat"),
      lng = $this.data("lng"),
      mrkr = $this.data("mrkr");

    $this
      .gmap3({
        center: [-37.81618, 144.95692],
        zoom: 12,
        scrollwheel: false,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        styles: [
          {
            featureType: "all",
            elementType: "labels.text.fill",
            stylers: [
              {
                saturation: 36,
              },
              {
                color: "#333333",
              },
              {
                lightness: 40,
              },
            ],
          },
          {
            featureType: "all",
            elementType: "labels.text.stroke",
            stylers: [
              {
                visibility: "on",
              },
              {
                color: "#ffffff",
              },
              {
                lightness: 16,
              },
            ],
          },
          {
            featureType: "all",
            elementType: "labels.icon",
            stylers: [
              {
                visibility: "off",
              },
            ],
          },
          {
            featureType: "administrative",
            elementType: "geometry.fill",
            stylers: [
              {
                color: "#fefefe",
              },
              {
                lightness: 20,
              },
            ],
          },
          {
            featureType: "administrative",
            elementType: "geometry.stroke",
            stylers: [
              {
                color: "#fefefe",
              },
              {
                lightness: 17,
              },
              {
                weight: 1.2,
              },
            ],
          },
          {
            featureType: "administrative.country",
            elementType: "geometry.stroke",
            stylers: [
              {
                saturation: "-9",
              },
            ],
          },
          {
            featureType: "landscape",
            elementType: "geometry",
            stylers: [
              {
                color: "#e8e8e8",
              },
              {
                lightness: 20,
              },
            ],
          },
          {
            featureType: "landscape.natural.landcover",
            elementType: "geometry.fill",
            stylers: [
              {
                saturation: "-4",
              },
              {
                color: "#cdcdcd",
              },
            ],
          },
          {
            featureType: "poi",
            elementType: "geometry",
            stylers: [
              {
                color: "#d4f1c9",
              },
              {
                lightness: 21,
              },
            ],
          },
          {
            featureType: "poi.park",
            elementType: "geometry",
            stylers: [
              {
                color: "#d4f1c9",
              },
              {
                lightness: 21,
              },
            ],
          },
          {
            featureType: "road.highway",
            elementType: "geometry.fill",
            stylers: [
              {
                color: "#ffeea4",
              },
              {
                lightness: 60,
              },
            ],
          },
          {
            featureType: "road.highway",
            elementType: "geometry.stroke",
            stylers: [
              {
                color: "#f5d681",
              },
              {
                lightness: 30,
              },
              {
                weight: 1,
              },
            ],
          },
          {
            featureType: "road.arterial",
            elementType: "geometry",
            stylers: [
              {
                color: "#ffffff",
              },
              {
                lightness: 18,
              },
            ],
          },
          {
            featureType: "road.local",
            elementType: "geometry",
            stylers: [
              {
                color: "#ffffff",
              },
              {
                lightness: 16,
              },
            ],
          },
          {
            featureType: "transit",
            elementType: "geometry",
            stylers: [
              {
                color: "#f2f2f2",
              },
              {
                lightness: 19,
              },
            ],
          },
          {
            featureType: "water",
            elementType: "geometry",
            stylers: [
              {
                color: "#aadaff",
              },
              {
                lightness: 17,
              },
            ],
          },
        ],
      })
      .marker(function (map) {
        return {
          position: map.getCenter(),
          icon: mrkr,
        };
      });
  });

  /*-------------------------------------
    Contact Form initiating
    -------------------------------------*/
  var contactForm = $("#contact-form");
  if (contactForm.length) {
    contactForm.validator().on("submit", function (e) {
      var $this = $(this),
        $target = contactForm.find(".form-response");
      if (e.isDefaultPrevented()) {
        $target.html(
          "<div class='alert alert-success'><p>Please select all required field.</p></div>"
        );
      } else {
        $.ajax({
          url: "php/mailer.php",
          type: "POST",
          data: contactForm.serialize(),
          beforeSend: function () {
            $target.html(
              "<div class='alert alert-info'><p>Loading ...</p></div>"
            );
          },
          success: function (text) {
            if (text === "success") {
              $this[0].reset();
              $target.html(
                "<div class='alert alert-success'><p>Message has been sent successfully.</p></div>"
              );
            } else {
              $target.html(
                "<div class='alert alert-success'><p>" + text + "</p></div>"
              );
            }
          },
        });
        return false;
      }
    });
  }

  /*-------------------------------------
    Select2
    -------------------------------------*/
  if ($("select.select2").length) {
    $("select.select2").select2({
      theme: "classic",
      dropdownAutoWidth: true,
      width: "100%",
    });
  }

  /*-------------------------------------
    TweenMax Mouse Effect
    -------------------------------------*/
  $(".motion-effects-wrap").mousemove(function (e) {
    parallaxIt(e, ".motion-effects1", -100);
    parallaxIt(e, ".motion-effects2", -200);
    parallaxIt(e, ".motion-effects3", 100);
    parallaxIt(e, ".motion-effects4", 200);
    parallaxIt(e, ".motion-effects5", -50);
    parallaxIt(e, ".motion-effects6", 50);
  });

  function parallaxIt(e, target_class, movement) {
    var $wrap = $(e.target).parents(".motion-effects-wrap");
    if (!$wrap.length) return;
    var $target = $wrap.find(target_class);
    var relX = e.pageX - $wrap.offset().left;
    var relY = e.pageY - $wrap.offset().top;

    TweenMax.to($target, 1, {
      x: ((relX - $wrap.width() / 2) / $wrap.width()) * movement,
      y: ((relY - $wrap.height() / 2) / $wrap.height()) * movement,
    });
  }

  /*-------------------------------------
    Quantity Holder
    -------------------------------------*/
  $("#quantity-holder")
    .on("click", ".quantity-plus", function () {
      let $holder = $(this).parents(".quantity-holder");
      let $target = $holder.find("input.quantity-input");
      let $quantity = parseInt($target.val(), 10);
      if ($.isNumeric($quantity) && $quantity > 0) {
        $quantity = $quantity + 1;
        $target.val($quantity);
      } else {
        $target.val($quantity);
      }
    })
    .on("click", ".quantity-minus", function () {
      let $holder = $(this).parents(".quantity-holder");
      let $target = $holder.find("input.quantity-input");
      let $quantity = parseInt($target.val(), 10);
      if ($.isNumeric($quantity) && $quantity >= 2) {
        $quantity = $quantity - 1;
        $target.val($quantity);
      } else {
        $target.val(1);
      }
    });

  /*-------------------------------------
    Mobile Menu Toggle
    -------------------------------------*/
  $(".sidebarBtn").on("click", function (e) {
    e.preventDefault();
    if ($(".rt-slide-nav").is(":visible")) {
      $(".rt-slide-nav").slideUp();
      $("body").removeClass("slidemenuon");
    } else {
      $(".rt-slide-nav").slideDown();
      $("body").addClass("slidemenuon");
    }
  });

  /*-------------------------------------
    Mobile Menu Dropdown
    -------------------------------------*/
  var a = $(".offscreen-navigation .menu");

  if (a.length) {
    a.children("li").addClass("menu-item-parent");
    a.find(".menu-item-has-children > a").on("click", function (e) {
      e.preventDefault();
      $(this).toggleClass("opened");
      var n = $(this).next(".sub-menu"),
        s = $(this).closest(".menu-item-parent").find(".sub-menu");
      a.find(".sub-menu").not(s).slideUp(250).prev("a").removeClass("opened"),
        n.slideToggle(250);
    });
    a.find(".menu-item:not(.menu-item-has-children) > a").on(
      "click",
      function (e) {
        $(".rt-slide-nav").slideUp();
        $("body").removeClass("slidemenuon");
      }
    );
  }

  /*-------------------------------------
    Calendar
    -------------------------------------*/
  var datePicker = $(".rt-date");
  if (datePicker.length) {
    datePicker.datetimepicker({
      format: "Y-m-d",
      timepicker: false,
    });
  }

  /*-------------------------------------
    Jquery Advance Serch Box
    -------------------------------------*/
  $("#rt-filter").on("click", function () {
    var _self = $(this);
    _self.parents(".adv-filter-wrap").find(".filter-form").slideToggle();
  });

  /*--------------------------------------
  	Isotope initialization
  	--------------------------------------*/
  var $container = $(".isotope-wrap");
  if ($container.length > 0) {
    var $isotope;
    var blogGallerIso = $(".featuredContainer", $container).imagesLoaded(
      function () {
        var selectero =
          $container
            .find(".isotope-classes-tab .nav-item:first-child")
            .data("filter") || "*";

        $isotope = $(".featuredContainer", $container).isotope({
          filter: selectero,
          transitionDuration: "1s",
          hiddenStyle: {
            opacity: 0,
            transform: "scale(0.001)",
          },
          visibleStyle: {
            transform: "scale(1)",
            opacity: 1,
          },
        });
      }
    );
    $container.find(".isotope-classes-tab").on("click", "a", function () {
      var $this = $(this);
      $this.parent(".isotope-classes-tab").find("a").removeClass("current");
      $this.addClass("current");
      var selector = $this.attr("data-filter");
      $isotope.isotope({
        filter: selector,
      });
      return false;
    });
  }

  /*-------------------------------------
    WOW
    -------------------------------------*/
  var wow = new WOW({
    boxClass: "wow",
    animateClass: "animated",
    offset: 0,
    mobile: false,
    live: true,
    scrollContainer: null,
  });

  /*-------------------------------------
    Window Load and Resize
    -------------------------------------*/
  $(window).on("load resize", function () {
    $("body")
      .imagesLoaded()
      .done(function (instance) {
        wow.init();
      });

    // Modal
    $("#myModal").modal("show");

    // Page Preloader
    $("#preloader").fadeOut("slow", function () {
      $(this).remove();
    });

    // Popup
    var yPopup = $(".popup-youtube");
    if (yPopup.length) {
      yPopup.magnificPopup({
        disableOn: 200,
        type: "iframe",
        mainClass: "mfp-fade",
        removalDelay: 160,
        preloader: false,
        fixedContentPos: false,
      });
    }

    // Masonry
    $(".masonry-items").masonry({
      itemSelector: ".masonry-item",
      columnWidth: ".masonry-item",
    });
  });

  /*-------------------------------------
	On Scroll 
	-------------------------------------*/
  $(window).on("scroll", function () {
    if ($("header").hasClass("sticky-on")) {
      var stickyPlaceHolder = $("#sticky-placeholder"),
        menu = $("#navbar-wrap"),
        menuH = menu.outerHeight(),
        topbarH = $("#topbar-wrap").outerHeight() || 0,
        targrtScroll = topbarH,
        header = $("header");
      if ($(window).scrollTop() > targrtScroll) {
        header.addClass("sticky");
        stickyPlaceHolder.height(menuH);
      } else {
        header.removeClass("sticky");
        stickyPlaceHolder.height(0);
      }
    }
  });

  /*-------------------------------------
    Count Up
    -------------------------------------*/
  var counterContainer = $(".counter");
  if (counterContainer.length) {
    counterContainer.counterUp({
      delay: 50,
      time: 5000,
    });
  }

  /*-------------------------------------
    Section background image 
    -------------------------------------*/
  imageFunction();

  function imageFunction() {
    $("[data-bg-image]").each(function () {
      var img = $(this).data("bg-image");
      $(this).css({
        backgroundImage: "url(" + img + ")",
      });
    });
  }

  /*---------------------------------------
    Background Parallax
    --------------------------------------- */
  if ($(".parallaxie").length) {
    $(".parallaxie").parallaxie({
      speed: 0.5,
      offset: 0,
    });
  }

  /*-------------------------------------
    Slick Slider
	-------------------------------------*/
  if ($.fn.slick) {
    $(".slick-carousel").each(function () {
      let $carousel = $(this);
      $carousel.imagesLoaded(function () {
        var data = $carousel.data("slick"),
          slidesToShow = data.slidesToShow,
          slidesToXL = data.slidesToXL,
          slidesToLG = data.slidesToLG,
          slidesToM = data.slidesToM,
          slidesToSM = data.slidesToSM,
          slidesToXS = data.slidesToXS;
        $carousel.not(".slick-initialized").slick({
          prevArrow:
            '<span class="slick-prev slick-navigation"><i class="fas fa-chevron-left"></i></span>',
          nextArrow:
            '<span class="slick-next slick-navigation"><i class="fas fa-chevron-right"></i></span>',
          slidesToShow: slidesToShow,
          slidesToScroll: 1,
          speed: 1000,
          infinite: true,
          centerMode: true,
          centerPadding: "0px",
          pauseOnHover: true,
          cssEase: "ease-in-out",
          responsive: [
            {
              breakpoint: 1440,
              settings: {
                slidesToShow: slidesToXL,
                slidesToScroll: 1,
              },
            },
            {
              breakpoint: 1200,
              settings: {
                slidesToShow: slidesToLG,
                slidesToScroll: 1,
              },
            },
            {
              breakpoint: 992,
              settings: {
                slidesToShow: slidesToM,
                slidesToScroll: 1,
              },
            },
            {
              breakpoint: 768,
              settings: {
                slidesToShow: slidesToSM,
                slidesToScroll: 1,
              },
            },
            {
              breakpoint: 576,
              settings: {
                slidesToShow: slidesToXS,
                slidesToScroll: 1,
              },
            },
          ],
        });
      });
    });
  }

  /*-------------------------------------
    Swiper Slider
	-------------------------------------*/
  var swiperOk = typeof Swiper === "function" ? true : false;
  if (swiperOk) {
    var bannerText = new Swiper(".banner-text", {
      spaceBetween: 0,
      speed: 500,
      effect: "fade",
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
        renderBullet: function (index, className) {
          return (
            '<span class="' + className + '">' + 0 + (index + 1) + "</span>"
          );
        },
      },
    });
    var bannerFigure = new Swiper(".banner-figure", {
      spaceBetween: 0,
      speed: 500,
      effect: "fade",
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
        renderBullet: function (index, className) {
          return (
            '<span class="' + className + '">' + 0 + (index + 1) + "</span>"
          );
        },
      },
    });

    var testimonial_carousel = new Swiper(".testimonial-carousel", {
      effect: "coverflow",
      centeredSlides: true,
      slidesPerView: "1",
      loop: true,
      speed: 1000,
      breakpoints: {
        768: {
          slidesPerView: 1.5,
        },
        992: {
          slidesPerView: 2,
        },
      },
      autoplay: {
        delay: 2000,
      },
      coverflowEffect: {
        rotate: 0,
        stretch: 90,
        depth: 200,
        modifier: 1.5,
        slideShadows: false,
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
    });
  }

  /*-------------------------------------
    Product View
    -------------------------------------*/
  $(".view-trigger").on("click", function (e) {
    var self = $(this),
      data = self.attr("data-type"),
      target = $("#view-wrap");
    self.parents(".layout-switcher").find("li.active").removeClass("active");
    self.parent("li").addClass("active");
    target
      .children(".row")
      .find(">div")
      .animate(
        {
          opacity: 0,
        },
        200,
        function () {
          if (data === "grid-box") {
            target.removeClass("list-box");
            target.addClass("grid-box");
          } else if (data === "list-box") {
            target.removeClass("grid-box");
            target.addClass("list-box");
          }
          target.children(".row").find(">div").animate(
            {
              opacity: 1,
            },
            100
          );
        }
      );
    e.preventDefault();
    return false;
  });

  /*-------------------------------------
     Countdown activation code
	-------------------------------------*/
  var eventCounter = $("#countdown");
  if (eventCounter.length) {
    eventCounter.countdown("2021/12/1", function (e) {
      $(this).html(
        e.strftime(
          "<div class='countdown-section'><h2>%D</h2> <p>Day%!D</p> </div><div class='countdown-section'><h2>%H</h2> <p>Hour%!H</p> </div><div class='countdown-section'><h2>%M</h2> <p>Minutes</p> </div><div class='countdown-section'><h2>%S</h2> <p>Second</p> </div>"
        )
      );
    });
  }

  /*-------------------------------------
  	Jquery Serch Box
  	-------------------------------------*/
  $('a[href="#template-search"]').on("click", function (event) {
    event.preventDefault();
    var target = $("#template-search");
    target.addClass("open");
    setTimeout(function () {
      target.find("input").focus();
    }, 600);
    return false;
  });
  $("#template-search, #template-search button.close").on(
    "click keyup",
    function (event) {
      if (
        event.target === this ||
        event.target.className === "close" ||
        event.keyCode === 27
      ) {
        $(this).removeClass("open");
      }
    }
  );
})(jQuery);
