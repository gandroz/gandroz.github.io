var firstname = "postmaster";
var address = "zygonie.com";

var animateCompetences = function()//function(winTop)
{
    $('.progress-bar').each(function(idx, element){
        var itemBar = $(element);
        var w = itemBar.parent().width();
        var paddingOffset = parseInt(itemBar.parent().parent().css("padding-left"));
        itemBar.animate(
            { width: w * itemBar.attr('size')/100 },/*attr('size')*/
            {
                duration: 50,
                complete: function ()
                {
                    $('.line').each(function(i, el){
                        var e = $(el);
                        var o = parseInt(e.attr('pos'), 10) * w / 100 + paddingOffset - 2;
                        e.css("left", o).slideDown("fast");
                    });
                    $('.wordwrapper').each(function(i, el){
                        var e = $(el);
                        var wLoc = e.width();
                        var o = parseInt(e.attr('pos'), 10) * w / 100 + paddingOffset - wLoc / 2;
                        e.css("left", o).slideDown("fast");
                    });
                }
            });
    });
};

$(document).ready(function(){
    $('#mail').attr("href", "mailto:" + firstname + "@" + address);
    $('#courriel').attr("href", "mailto:" + firstname + "@" + address);
    
    //animateCompetences();
         
    // Menu navigation scroll animation
    //*^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^*		
    var lastId,
        topMenu = $('.navbar-default'),
        topMenuHeight = topMenu.outerHeight() + 0,
        // All list items
        menuItems = topMenu.find("a"),
        // Anchors corresponding to menu items
        scrollItems = menuItems.map(function () {
            var item = $($(this).attr("href"));
            if (item.length) { return item; }
        });

    // Bind click handler to menu items
    // so we can get a fancy scroll animation
    menuItems.click(function (e) {
        var href = $(this).attr("href"),
            offsetTop = href === "#" ? 0 : $(href).offset().top - topMenuHeight + 1;
        $('html, body').stop().animate({
            scrollTop: offsetTop
        }, 300);
        e.preventDefault();
    });

    var originalTopPadding = parseInt($('#menu').css('padding-top'));

    // Bind to scroll
    $(window).scroll(function () {
        // Get container scroll position
        var fromTop = $(this).scrollTop() + topMenuHeight + 1;
        //var distanceFromBottom = $(document).height() - $(window).height() - $(document).scrollTop();

        $('#menu').css('padding-top', Math.max(0, originalTopPadding - (fromTop - topMenuHeight) + 1) + 'px');

        // Get id of current scroll item
        var cur = scrollItems.map(function () {
            if ($(this).offset().top < fromTop)
                return this;
        });

        // Get the id of the current element
        cur = cur[cur.length - 1];
        var id = cur && cur.length ? cur[0].id : "";

        if (lastId !== id) {
            lastId = id;
            // Set/remove active class
            menuItems
              .parent().removeClass("active")
              .end().filter("[href=#" + id + "]").parent().addClass("active");
        }

        if(id === "competences")
        {
            animateCompetences();
        }

        /*if (distanceFromBottom === 0) {
            id = scrollItems[scrollItems.length - 1][0].id;
            lastId = id;
            menuItems
              .parent().removeClass("active")
              .end().filter("[href=#" + id + "]").parent().addClass("active");
        }*/
    });
});