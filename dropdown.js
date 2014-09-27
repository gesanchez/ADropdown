/**
 * 
 * @author German Sanchez
 * @version 0.1
 * @see https://github.com/gesanchez
 * @see https://github.com/gesanchez/ADropdown
 * @description Angular directive for show dropdowns of options
 * @
 */

(function(){
    var app = angular.module('dropdown',[]);
    
    app.directive('dropdown', function() {
        return {
            restrict: 'A',
            link: function(scope, elem, attrs) {
                var $element = $(elem),
                    $dropdown = $element.next('.dropdown'),
                    document_width = $(document).width(),
                    document_height = $(document).height(),
                    dropdown_size = {width: $dropdown.outerWidth(true), height: $dropdown.outerHeight()};
            
                $dropdown.hide().css('visibility','visible');
                               
                elem.on('click', function(e){
                    if ($dropdown.is(':visible')){
                        $dropdown.fadeOut();
                    }else{
                        adjust();
                        $dropdown.stop().fadeIn();
                    }
                });
                                
                angular.element(window).on('resize', function(){
                    if ($dropdown.is(':visible')){
                        document_width = $(document).width();
                        document_height = $(document).height();
                        adjust();
                    }
                });
                
                angular.element(document).on('click', function(e){
                    if ($dropdown.is(':visible')){
                        if ($element.get(0) !== e.target){
                            $dropdown.stop().fadeOut();
                        }
                    }
                });
                
                function adjust(){
                    
                    console.log('asdasdsad');
                    var left = 0, top = 0, new_left = 0, new_top = 0;
                    
                    if (($element.offset().left - (dropdown_size.width - $element.outerWidth())) < 20){
                        
                        $dropdown.removeClass('left').addClass('right');
                        
                        new_left = ($element.offset().left - (24 - $element.outerWidth()) - ($element.outerWidth() / 2));
                        new_top = $element.offset().top + $element.outerHeight() + 15;
                        left = (new_left < 0) ? Math.max($element.offset().left, new_left) : new_left;
                        top = (new_top > document_height) ? $element.offset().top - dropdown_size.height - 15 : new_top;
                        
                        if (new_top > document_height){ $dropdown.addClass('top'); }else{ $dropdown.removeClass('top'); }
                        
                        $dropdown.css({
                            left: left,
                            'top' : top
                        });
                        
                    }else{
                        $dropdown.removeClass('right').addClass('left');
                        
                        new_left = ($element.offset().left + ($element.outerWidth() - dropdown_size.width) + (24 - $element.outerWidth()) + ($element.outerWidth() / 2));
                        left = (new_left +  dropdown_size.width > document_width) ? Math.min(new_left, ($element.offset().left + $element.outerWidth() - dropdown_size.width)) : new_left;
                        new_top = $element.offset().top + $element.outerHeight() + 15;
                        top = (new_top > document_height) ? $element.offset().top - dropdown_size.height - 15 : new_top;
                        
                        if (new_top > document_height){ $dropdown.addClass('top'); }else{ $dropdown.removeClass('top'); }
                        
                        $dropdown.css({
                            left : left,
                            'top' : top
                        });
                    }
                }
            }
        };
    });
})();