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

        /**
         * Initialize uberSelect on the specified elements.
         *
         * @param {Object} options
         * @returns {jQuery}
         */
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

                add_placeholder($select);

                $select.uberSelect('update');
            });
        },

        /**
         * Updates the label using the text from the selected option, if no option is selected
         * the placeholder is used if it's available.
         *
         * @returns {jQuery}
         */
        update: function () {
            return this.each(function () {
                var $select = $(this);
                var data = $select.data('uberselect');
                var option = this.options.item(this.selectedIndex);

                // Try to append a placeholder when no options are available on the select box.
                // If also no placeholder is provided then just set the label text to an empty
                // string.
                if (!option) {
                    var $placeholderOption = add_placeholder($select);

                    if ($placeholderOption) {
                        option = $placeholderOption[0];
                    } else {
                        data.label.text('');
                        return;
                    }
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

    /**
     * Add the placeholder option on the specified select box.
     *
     * @param jQuery $select
     * @returns {jQuery|null}
     */
    function add_placeholder($select)
    {
        var placeholder = $select.attr('placeholder');
        var $placeholderOption = null;
        var $default = $select.find('option[selected]');

        if (placeholder) {
            $placeholderOption = $('<option>').val('').text(placeholder);
            $select.prepend($placeholderOption);
            $placeholderOption.attr('disabled', 'disabled');
        }

        // Select the placeholder option if no option is already selected
        if ($default.length == 0 && placeholder) {
            $placeholderOption.attr('selected', 'selected');
        }

        return $placeholderOption;
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
