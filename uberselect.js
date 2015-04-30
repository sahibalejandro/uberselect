/**
 * @author Sahib J. Leo <sahib@sahib.io>
 * Date: 4/29/15, 12:07 PM
 */
var uberSelect = function ($) {
    var boxCss = {
        position: 'relative'
    };

    var defaults = {
        className: 'uberselect'
    };

    var selectCss = {
        top:      0,
        left:     0,
        opacity:  0,
        width:    '100%',
        height:   '100%',
        border:   'none',
        position: 'absolute'
    };

    var labelCss = {
        display:      'block',
        overflow:     'hidden',
        whiteSpace:   'nowrap',
        textOverflow: 'ellipsis'
    }

    var methods = {

        init: function (options) {
            options = $.extend({}, defaults, options);

            return this.each(function () {
                var $select = $(this);
                var $box = $('<div>');
                var $label = $('<span>');
                var className = $select.data('uberselect') || options.className;

                $label.appendTo($box);
                $select.after($box).appendTo($box);

                $box.addClass(className);
                $box.css(boxCss);
                $label.css(labelCss);
                $select.css(selectCss);

                $select.data({
                    'uberselect': {
                        'label': $label,
                        'box':   $box
                    }
                });

                // Update label when option changes.
                $select.on('change', function (e) {
                    $(this).uberSelect('update');
                });

                // Mock box focus
                $select.on('focus', function (e) {
                    $(this).data('uberselect').box.addClass('focus');
                })

                // Mock box blur
                $select.on('blur', function (e) {
                    $(this).data('uberselect').box.removeClass('focus');
                })

                // Prepend the placeholder option
                var placeholder = $select.attr('placeholder');
                if (placeholder) {
                    var $placeholderOption = $('<option>').val('').text(placeholder);
                    $select.prepend($placeholderOption);
                    $placeholderOption.attr('disabled', 'disabled');
                }

                // Select the placeholder option if no option is already selected
                var $default = $select.find('option[selected]');
                if (!$default.length && placeholder) {
                    $placeholderOption.attr('selected', 'selected');
                }

                $select.uberSelect('update');
            });
        },

        update: function () {
            return this.each(function () {
                var $select = $(this);
                var data = $select.data('uberselect');
                var option = this.options.item(this.selectedIndex);

                if (!option) {
                    return;
                }

                // Update label text.
                data.label.text(option.text);

                // Add the "placeholder" CSS class if the current option is the placeholder.
                if (option.value == '') {
                    data.box.addClass('placeholder');
                } else {
                    data.box.removeClass('placeholder');
                }
            });
        }
    };

    $.fn.uberSelect = function (method) {
        if (methods[method]) {
            methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            methods.init.apply(this, arguments);
        } else {
            $.error('Method ' + method + ' does not exists in jQuery.uberSelect');
        }

        return this;
    };

    // Automatic initialization
    $('select[data-uberselect]').uberSelect();
};

if (typeof module === "object" && typeof module.exports === "object") {
    uberSelect(require('jquery'));
} else {
    uberSelect(jQuery);
}
