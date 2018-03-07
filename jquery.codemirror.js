/*!
 CodeMirror jQuery Plugin
 @name  jquery.codemirror.js
 @description a jQuery plugin for using CodeMirror
 @version 1.0.2
 @copyright (c) 2018 Philipp Nikolajev (https://nikolajev.ee)
 @license Licensed under the MIT (http://www.opensource.org/licenses/mit-license.php) license.
 */
(function ($) {
    $.fn.codemirrorInit = function (codemirrorOptions, jqueryCodemirrorOptions) {

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

        // Defaults

        var codemirrorDefaults = {
            mode: "text/html",
            lineNumbers: true,
            lineWrapping: true
        };


        // Private methods

        function getConfigAttrTitle(element, preferredTitle) {
            if ($(element).is("[" + preferredTitle + "]")) {
                return preferredTitle;
            }

            if ($(element).is("[" + preferredTitle + "-config" + "]")) {
                return preferredTitle + "-config";
            }

            return null;
        }

        function parseJsonConfig(configJson) {
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

        function getCodemirrorElementConfigs(element) {

            var codemirrorConfigAttrTitle = getConfigAttrTitle(element, 'codemirror');

            var configJson = (codemirrorConfigAttrTitle === null) ? undefined : $(element).attr(codemirrorConfigAttrTitle);

            return parseJsonConfig(configJson);
        }

        function getJqueryCodemirrorElementConfigs(element) {

            var codemirrorConfigAttrTitle = getConfigAttrTitle(element, 'jquery-codemirror');

            var configJson = (codemirrorConfigAttrTitle === null) ? undefined : $(element).attr(codemirrorConfigAttrTitle);

            return parseJsonConfig(configJson);
        }

        function copyToClipboard(value) {
            var $temp = $("<textarea>");
            $('body').append($temp.css({opacity: 0, zIndex: -9999}));

            $temp.val(value).select();
            document.execCommand("copy");
            $temp.remove();
        }

        // Element iteration

        return this.each(function () {

            var basicCodemirrorConfigs = $.extend({}, codemirrorDefaults, codemirrorOptions);
            var elementCodemirrorConfigs = getCodemirrorElementConfigs(this);
            var codemirrorConfigs = $.extend({}, basicCodemirrorConfigs, elementCodemirrorConfigs);

            $.data(this, 'codemirror', CodeMirror(this, codemirrorConfigs));

            var jqueryCodemirrorConfigs = $.extend({}, jqueryCodemirrorOptions, getJqueryCodemirrorElementConfigs(this));
            $(this).children('.CodeMirror').css(jqueryCodemirrorConfigs);

            // Buttons
            var buttonsWrapper = $('<div>');
            var buttons = $('<div>');
            var copyToClipboardButton = $('<div title="Copy to clipboard">');
            $(this).prepend(buttonsWrapper.addClass("codemirror-buttons-wrapper").append(
                buttons.addClass("codemirror-buttons").append(
                    copyToClipboardButton.addClass("codemirror-button").addClass("copy-to-clipboard")
                )
            ));

            buttonsWrapper.css('pointer-events', 'none');
            copyToClipboardButton.css('pointer-events', 'auto');

            $(this).mouseenter(function () {
                $(this).children('.codemirror-buttons-wrapper').first().show();
            });

            $(this).mouseleave(function () {
                $(this).children('.codemirror-buttons-wrapper').first().hide();
            });

            $(this).find('.copy-to-clipboard').click(function () {
                copyToClipboard($(this).parent().parent().parent().codemirror().getValue());
            });
        });
    };

})(jQuery);
