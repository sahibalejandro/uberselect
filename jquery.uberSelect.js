/**
 * jQuery UberSelect v1.0
 *
 * @author Sahib J. Leo - http://sahib.io
 * @example http://labs.sahib.io/uberselect
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3
 * @param  {Object} $ jQuery instance
 */
(function ($)
{
    var methods = {
        init: function (options)
        {
            options = $.extend({
                'css_class': 'uberselect'
            }, options);

            return this.each(function ()
            {
                var select = $(this);
                var uberselect, uberlabel;

                /**
                 * Sets the value of the label, based on the value of the
                 * select box.
                 */
                function set_label_text()
                {
                    uberlabel.text(select.find('option:selected').text());
                }

                select.wrap('<div class="'+ options.css_class +'"></div>');
                uberselect = select.parent();
                uberlabel  = $('<div>');
                uberselect.prepend(uberlabel);

                // Style original select
                select.css({
                    'border': 0,
                    'opacity': 0,
                    'width': '100%',
                    'height': '100%'
                });

                // Style uberselect
                uberselect.css({
                    'position': 'relative'
                });

                // Style uberlabel
                uberlabel.css({
                    'position': 'absolute',
                    'top': 0,
                    'left': 0
                });

                // Sets text label when select options
                select.on('change', function (e)
                {
                    set_label_text();
                });

                // Sets the default selected value when plugin starts
                set_label_text();
            });
        }
    };

    $.fn.uberSelect = function (method)
    {
        if (methods[method]) {
            methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            methods.init.apply(this, arguments);
        } else {
            $.error('Method ' + method + ' does not exists in jQuery.uberSelect');
        }
    };
}(jQuery));
