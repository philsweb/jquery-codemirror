(function ($) {
    $.fn.codemirrorInit = function (options) {

        $(this).init.prototype = $.extend({}, $(this).init.prototype, {

            codemirror: function () {
                var $this = this;
                return {
                    setValue: function (value) {
                        for (var i = 0; i < $this.length; i++) {
                            $.data($this[i], 'codemirror').setValue(value);
                        }
                    },
                    getValue: function () {
                        if (this.length > 1) {
                            throw new Error("Only one DOM element can be selected");
                        }
                        return $.data($this[0], 'codemirror').getValue();
                    },
                    setOption: function (option, value) {
                        $.each($this, function (key, element) {
                            $.data(element, 'codemirror').setOption(option, value);
                        });
                    },
                    setOptions: function (optionsObject) {
                        $.each($this, function (key, element) {
                            $.each(optionsObject, function (option, value) {
                                $.data(element, 'codemirror').setOption(option, value);
                            });
                        });
                    }
                }
            }
        });

        var defaults = {
            mode: "text/html",
            lineNumbers: true,
            lineWrapping: true
        };

        function getLocalConfigs(element) {
            var configJson = $(element).attr('codemirror-config');

            if (configJson === undefined) {
                return {};
            }

            var isJson = true;
            try {
                var json = $.parseJSON(configJson);
            }
            catch (error) {
                isJson = false;
            }

            if (isJson) {
                return $.parseJSON(configJson);
            }

            return {};

        }

        return this.each(function () {

            var basicConfigs = $.extend({}, defaults, options);
            var localConfigs = getLocalConfigs(this);
            var configs = $.extend({}, basicConfigs, localConfigs);

            $.data(this, 'codemirror', CodeMirror(this, configs));

        });
    };

})(jQuery);