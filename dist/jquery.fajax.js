;(function($) {

    $.fn.fajax = function(options) {

        options = $.extend({
            resetOnSuccess: true,
        }, options);

        return this.each(function() {

            $(this).on('submit', function(e) {

                var $form = $(this);
                var action = $form.attr('action');
                var method;
                var data;
                var dataType;
                
                e.preventDefault();

                if ($form.attr('method') === undefined) {
                    method = 'GET';
                } else {
                    method = $form.attr('method').toUpperCase();
                }

                if (method === 'GET') {
                    dataType = $form.serialize();
                } else {
                    data = new FormData(this);
                }
                
                if (dataType === 'jsonp') {
                    dataType = 'jsonp';
                }
                var success = options.success;

                $.extend(options, {
                    url: action,
                    type: method,
                    data: data,
                    dataType: dataType,
                    processData: false,
                    contentType: false,
                    success: function(data) {
                        success(data);
                        if (options.resetOnSuccess) {
                            $form[0].reset();
                        }
                    },
                });

                $.ajax(options);
            });

        });

    };

})(jQuery);
