/**
   #----------------------------------------------------#
   |        Created by jaehee on 15. 5. 18              |
   #----------------------------------------------------#
 */

$(function(){

    /*var btn = $("h4 .dlt");
    var tb = $(".dowork");
    var tbody = tb.find("tbody");
    tbody.hide();
    btn.each( function (idx) {
        var target = $(this);
        tbody.eq(0).show();
        target.click(function(){
            tbody.eq(idx).toggle();
            var txt = $(this).find("span").text();
            $(this).find("span").text("List Close");
            if( txt.match("List Close") ){
                $(this).find("span").text("List Open");
            }
            return false;
        })

    });*/

    /**
     #----------------------------------------------------#
     |        Generator auto Number & 진척률 & 기타          |
     #----------------------------------------------------#
     */
    var tbody = $('.dowork tbody');
    var tds = tbody.find('td:last-child'),
        groupTotal = tds.length,
        comTotal = tds.find('.complete').length;
    var groupProgress = (comTotal/groupTotal) * 100;

    $('.total').html('<span>' + comTotal + '</span> 총 완료(진행) 본수 / ' + '<span>' + groupTotal + '</span> 총 본수 ::: ' + '<span>' + groupProgress + '%' + '</span> 종합 진척률')

    tbody.each(function(){

        $(this).find('tr:odd').addClass('odd');
        var linkTds = $(this).find('tr')
        var linkArray = $.makeArray(linkTds);

        for(var i =0; i < linkArray.length; i ++) {
            var tds =  $(linkArray[i]).find('td'),
                depthStr = tds.eq(1).text(),
                diretory = tds.eq(2).text(),
                depthEm = depthStr.substr(depthStr.lastIndexOf('>') + 1);

            tds.eq(1).html(depthStr.replace(depthEm,'<b style="color:#000;">' + depthEm + '</b>'));
            tds.eq(2).wrapInner('<a href="' + diretory + '" target="_blank"> </a> ')
        }

        var tdList = $(this).find('td:first-child');
        tdList.text(function(idx){
            return idx + 1;
        });


        var state = $(this).find('td:last-child'),
            total = state.length,
            fin = state.find('.complete').length,
            finRate = (fin / total) * 100;
        var progress = $(this).closest('table').prev().children('.progress');

        progress.text('진척률 : ' + ~~finRate + ' %');

        state.find('.undecided').text('');
        state.find('.inProgress').text('중');
        state.find('.edit').text('수');
        state.find('.complete').text('완');

    })


    // tab-content include
    $.get('layout.html', function(data) {
        $('.inc-conts').html(data);
    })

    var tab = $('.guide-tap');
    tab.on('click','li a', function(){
        tab.find('a').removeClass('on');
        $(this).addClass('on');
        var url = $(this).attr('href'),
            title = $(this).find('span').text(),
            type = $('#header h1');

        type.html('<span class="gd-bar"></span>' + title);

        $.get(url, function(data) {
            $('.inc-conts').html(data);
            SyntaxHighlighter.autoloader(
                "css								../js/shBrushCss.js",
                "js jscript javascript				../js/shBrushJScript.js",
                "xml xhtml xslt html				../js/shBrushXml.js"
            );
            SyntaxHighlighter.config.space = ' ';
            //SyntaxHighlighter.defaults['gutter'] = false;
            SyntaxHighlighter.all();

        })
        return false;
    })


});

(function($){

    /**
     #----------------------------------------------------#
     |                   퍼블리셔 담담자 보기                  |
     #----------------------------------------------------#
     */
    $.extend($.fn, {
        personSel : function(){

            return this.each(function(){
                var _self = $(this);
                var person;
                _self.find("select").change(function () {
                    $(this).find("option:selected").each(function () {
                        person = $(this).text();
                    });

                    var pub = $(this).closest('.dowork').find('.pub');

                    pub.each(function(){
                        var pubName = $(this).text();
                        if(pubName == person) {
                            $(this).parent().show();
                        } else{
                            $(this).parent().hide();
                        }
                    });
                    if(person == '담당자') pub.parent().show(); // 담당자 전체보기
                })
            });
        }
    })
}(jQuery))



$(function(){
    $('.dowork').personSel();
})