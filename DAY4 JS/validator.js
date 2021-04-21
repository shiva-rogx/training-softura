;(function(root, factory){
    var define = define || {};
    if( typeof define === 'function' && define.amd )
        define([], factory);
    else if( typeof exports === 'object' && typeof module === 'object' )
        module.exports = factory();
    else if(typeof exports === 'object')
        exports["FormValidator"] = factory();
    else
        root.FormValidator = factory();
}(this, function(){
    
    var urlRegex = new RegExp(
        "^" +
            "(?:(?:(?:https?|ftp):)?\\/\\/)" +
            "(?:\\S+(?::\\S*)?@)?" +
            "(?:" +
            "(?!(?:10|127)(?:\\.\\d{1,3}){3})" +
            "(?!(?:169\\.254|192\\.168)(?:\\.\\d{1,3}){2})" +
            "(?!172\\.(?:1[6-9]|2\\d|3[0-1])(?:\\.\\d{1,3}){2})" +
            "(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])" +
            "(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}" +
            "(?:\\.(?:[1-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))" +
            "|" +
            "(?:" +
                "(?:" +
                "[a-z0-9\\u00a1-\\uffff]" +
                "[a-z0-9\\u00a1-\\uffff_-]{0,62}" +
                ")?" +
                "[a-z0-9\\u00a1-\\uffff]\\." +
            ")+" +
            "(?:[a-z\\u00a1-\\uffff]{2,}\\.?)" +
            ")" +
            "(?::\\d{2,5})?" +
            "(?:[/?#]\\S*)?" +
        "$", "i"
    );

    function FormValidator( settings, formElm ){
        this.data = {}; 

        this.DOM = {
            scope : formElm
        };

        this.settings = this.extend({}, this.defaults, settings || {});
        this.texts = this.extend({}, this.texts, this.settings.texts || {});

        this.settings.events && this.events();
    }

    FormValidator.prototype = {
       
        texts : {
            invalid         : 'input is not as expected',
            short           : 'input is too short',
            long            : 'input is too long',
            checked         : 'must be checked',
            empty           : 'please put something here',
            select          : 'Please select an option',
            number_min      : 'too low',
            number_max      : 'too high',
            url             : 'invalid URL',
            number          : 'not a number',
            email           : 'email address is invalid',
            email_repeat    : 'emails do not match',
            date            : 'invalid date',
            time            : 'invalid time',
            password_repeat : 'passwords do not match',
            no_match        : 'no match',
            complete        : 'input is not complete'
        },

        defaults : {
            alerts : true,
            events : false,
            regex : {
                url          : urlRegex,
                phone        : /^\+?([0-9]|[-|' '])+$/i,
                numeric      : /^[0-9]+$/i,
                alphanumeric : /^[a-zA-Z0-9]+$/i,
                time         : /^([0-1][0-9]|2[0-3]):[0-5][0-9]$/,
                email        : {
                    illegalChars : /[\(\)\<\>\,\;\:\\\/\"\[\]]/,
                    filter       : /^.+@.+\..{2,24}$/ 
                }
            },
            classes : {
                item  : 'field',
                alert : 'alert',
                bad   : 'bad'
            }
        },

       
        tests : {
            sameAsPlaceholder : function( field, data ){
                if( field.getAttribute('placeholder') )
                    return data.value != field.getAttribute('placeholder') || this.texts.empty;
                else
                    return true
            },

            hasValue : function( value ){
                return value ? true : this.texts.empty
            },

                      linked : function(a, b, type){
                if( b != a ){
                    return this.texts[type + '_repeat'] || this.texts.no_match
                }
                return true
            },

            email : function(field, data){
                var i, emails = data.value.trim().split(' ')

                if( !field.multiple && emails.length > 1 )
                return this.texts.email

                for( var i = 0; i < emails.length; i++ )
                    if ( !this.settings.regex.email.filter.test( emails[i] ) || emails[i].match( this.settings.regex.email.illegalChars ) )
                        return this.texts.email

                return true
            },

           
            text : function(field, data){
                var that = this;
               
                if( data.validateWords ){
                    var words = data.value.split(' ');
                   
                    var wordsLength = function(len){
                        for( var w = words.length; w--; )
                            if( words[w].length < len )
                                return that.texts.short;
                        return true;
                    };

                    if( words.length < data.validateWords || !wordsLength(2) )
                        return this.texts.complete;

                    return true;
                }

                if( data.lengthRange && data.value.length < data.lengthRange[0] ){
                    return this.texts.short;
                }

               
                if( data.lengthRange && data.lengthRange[1] && data.value.length > data.lengthRange[1] ){
                    return this.texts.long;
                }

               
                if( data.lengthLimit && data.lengthLimit.length ){
                    while( data.lengthLimit.length ){
                        if( data.lengthLimit.pop() == data.value.length ){
                            return true;
                        }
                    }

                    return this.texts.complete;
                }

                if( data.pattern ){
                    var regex = this.settings.regex[data.pattern];

                    if( !regex )
                        regex = data.pattern;

                    try{
                        var jsRegex = new RegExp(regex).test(data.value);
                        if( data.value && !jsRegex ){
                            return this.texts.invalid
                        }
                    }
                    catch(err){
                        console.warn(err, field, 'regex is invalid');
                        return this.texts.invalid
                    }
                }

                return true;
            },

            number : function( field, data ){
                var a = data.value;

               
                if( isNaN(parseFloat(a)) && !isFinite(a) ){
                    return this.texts.number;
                }
                else if( data.lengthRange && a.length < data.lengthRange[0] ){
                    return this.texts.short;
                }
               
                else if( data.lengthRange && data.lengthRange[1] && a.length > data.lengthRange[1] ){
                    return this.texts.long;
                }
                else if( data.minmax[0] && (a|0) < data.minmax[0] ){
                    return this.texts.number_min;
                }
                else if( data.minmax[1] && (a|0) > data.minmax[1] ){
                    return this.texts.number_max;
                }

                return true;
            },

                
            time : function( field, data ){
                var pattern = this.settings.regex.time;
                if( pattern.test(data.value) )
                    return true;
                else
                    return this.texts.time
            },

            url : function( field, data ){
                if( !this.settings.regex.url.test(data.value) )
                    return this.texts.url;

                return true
            },

            hidden : function( field, data ){
                if( data.lengthRange && data.value.length < data.lengthRange[0] )
                    return this.texts.short;

                if( data.pattern ){
                    if( data.pattern == 'alphanumeric' && !this.settings.regex.alphanumeric.test(data.value) )
                        return this.texts.invalid;
                }

                return true
            },

            select : function( field, data ){
                return data.value ? true : this.texts.select;
            },

            checkbox : function( field, data ){
                if( field.checked ) return true;

                return this.texts.checked
            }
        },

        /**
         * bind events on form elements
         * @param  {Array/String} types   
         * @param  {Object} formElm       
         * @return {[type]}               
         */
        events : function( types, formElm ){
            var that = this;

            types   = types   || this.settings.events;
            formElm = formElm || this.DOM.scope;

            if( !formElm || !types ) return;

            if( types instanceof Array )
                types.forEach(bindEventByType);
            else if( typeof types == 'string' )
                bindEventByType(types)

            function bindEventByType( type ){
                formElm.addEventListener(type, function(e){
                   
                    setTimeout(that.checkField.bind(that), 0, e.target)
                }, true)
            }
        },

        /**
         * Marks an field as invalid
         * @param  {DOM Object} field
         * @param  {String} text
         * @return {String} - useless string (should be the DOM node added for warning)
         */
        mark : function( field, text ){
            if( !text || !field )
                return false;

            var that = this;

            var item = this.closest(field, '.' + this.settings.classes.item) || field,
                alert = item.querySelector('.'+this.settings.classes.alert),
                warning;

            if( this.settings.alerts ){
                if( alert )
                    alert.innerHTML = text;
                else{
                    warning = '<div class="'+ this.settings.classes.alert +'">' + text + '</div>';
                    item.insertAdjacentHTML('beforeend', warning);
                }
            }

            item.classList.remove(this.settings.classes.bad);
            setTimeout(function(){
                item.classList.add( that.settings.classes.bad );
            });

            return warning;
        },
        unmark : function( field ){
            var warning;

            if( !field ){
                console.warn('no "field" argument, null or DOM object not found');
                return false;
            }

            var fieldWrap = this.closest(field, '.' + this.settings.classes.item);

            if( fieldWrap ){
                warning = fieldWrap.querySelector('.'+ this.settings.classes.alert);
                fieldWrap.classList.remove(this.settings.classes.bad);
            }

            if( warning )
                warning.parentNode.removeChild(warning);
        },

        /**
         * removes unmarks all fields
         * @return {[type]} [description]
         */
        reset : function( formElm ){
            var fieldsToCheck,
                that = this;

            formElm = formElm || this.DOM.scope;
            fieldsToCheck = this.filterFormElements( formElm.elements );

            fieldsToCheck.forEach(function(elm){
                that.unmark(elm);
            });
        },

        /**
         * Normalize types if needed & return the results of the test (per field)
         * @param  {String} type  [form field type]
         * @param  {*}      value
         * @return {Boolean} - validation test result
         */
        testByType : function( field, data ){
            data = this.extend({}, data); // clone the data

            var type = data.type;

            if( type == 'tel' )
                data.pattern = data.pattern || 'phone';

            if( !type || type == 'password' || type == 'tel' || type == 'search' || type == 'file' )
                type = 'text';

            return this.tests[type] ? this.tests[type].call(this, field, data) : true;
        },

        prepareFieldData : function( field ){
            var nodeName = field.nodeName.toLowerCase(),
                id = Math.random().toString(36).substr(2,9);

            field["_validatorId"] = id;
            this.data[id] = {};

            this.data[id].value   = field.value.replace(/^\s+|\s+$/g, "");  
            this.data[id].valid   = true;                                  
            this.data[id].type    = field.type;             
            this.data[id].pattern = field.pattern;

            if( nodeName === "select" )
                this.data[id].type = "select";

            else if( nodeName === "textarea" )
                this.data[id].type = "text";

            this.data[id].validateWords  = field.getAttribute('data-validate-words')        || 0;
            this.data[id].lengthRange    = field.getAttribute('data-validate-length-range') ? (field.getAttribute('data-validate-length-range')+'').split(',') : [1];
            this.data[id].lengthLimit    = field.getAttribute('data-validate-length')       ? (field.getAttribute('data-validate-length')+'').split(',')       : false;
            this.data[id].minmax         = field.getAttribute('data-validate-minmax')       ? (field.getAttribute('data-validate-minmax')+'').split(',')       : false; // for type 'number', defines the minimum and/or maximum for the value as a number.
            this.data[id].validateLinked = field.getAttribute('data-validate-linked');

            return this.data[id];
        },

        /**
         * Find the closeset element, by selector
         * @param  {Object} el       [DOM node]
         * @param  {String} selector [CSS-valid selector]
         * @return {Object}          [Found element or null if not found]
         */
        closest : function(el, selector){
            var matchesFn;

            ['matches','webkitMatchesSelector','mozMatchesSelector','msMatchesSelector','oMatchesSelector'].some(function(fn){
                if( typeof document.body[fn] == 'function' ){
                    matchesFn = fn;
                    return true;
                }
                return false;
            })

            while (el) {
                if (el && el[matchesFn](selector))
                    return el;

                el = el.parentElement
            }

            return null;
        },

        extend : function( target, varArgs ){
            if( !target )
                throw new TypeError('Cannot convert undefined or null to object');

            var to = Object(target),
                nextKey, nextSource, index;

            for( index = 1; index < arguments.length; index++ ){
                nextSource = arguments[index];

                if( nextSource != null ) 
                    for( nextKey in nextSource )
                        if( Object.prototype.hasOwnProperty.call(nextSource, nextKey) )
                            to[nextKey] = nextSource[nextKey];
            }

            return to;
        },

        checkField : function( field, silent ){
            if( field.type !='hidden' && !field.clientWidth )
                return { valid:true, error:"" }

            field = this.filterFormElements( [field] )[0];

            if( !field )
                return { valid:true, error:"" }

            var linkedTo,
                testResult,
                optional = field.className.indexOf('optional') != -1,
                data = this.prepareFieldData( field ),
                form = this.closest(field, 'form'); 

            testResult = this.tests.hasValue.call(this, data.value);

          
            if( testResult === true )
                testResult = this.tests.sameAsPlaceholder.call(this, field, data );

            data.valid = optional || testResult === true;

            if( optional && !data.value ){
                return { valid:true, error:"" }
            }

            if( testResult !== true )
                data.valid = false;

             if( data.valid ){
                testResult = this.testByType(field, data);
                data.valid = testResult === true ? true : false;
            }

            if( data.valid && data.validateLinked ){
                if( data['validateLinked'].indexOf('#') == 0 )
                    linkedTo = document.body.querySelector(data['validateLinked'])
                else if( form.length )
                    linkedTo = form.querySelector('[name=' + data['validateLinked'] + ']');
                else
                    linkedTo = document.body.querySelector('[name=' + data['validateLinked'] + ']');

                testResult = this.tests.linked.call(this, field.value, linkedTo.value, data.type );
                data.valid = testResult === true ? true : false;
            }

            if( !silent )
                this[data.valid ? "unmark" : "mark"]( field, testResult ); // mark / unmark the field

            return {
                valid : data.valid,
                error : data.valid === true ? "" : testResult
            };
        },

        /**
         * Only allow certain form elements which are actual inputs to be validated
         * @param  {HTMLCollection} form fields Array [description]
         * @return {Array}                            [description]
         */
        filterFormElements : function( fields ){
            var i,
                fieldsToCheck = [];

            for( i = fields.length; i--; ) {
                var isAllowedElement = fields[i].nodeName.match(/input|textarea|select/gi),
                    isRequiredAttirb = fields[i].hasAttribute('required'),
                    isDisabled = fields[i].hasAttribute('disabled'),
                    isOptional = fields[i].className.indexOf('optional') != -1;

                if( isAllowedElement && (isRequiredAttirb || isOptional) && !isDisabled )
                    fieldsToCheck.push(fields[i]);
            }

            return fieldsToCheck;
        },

        checkAll : function( formElm ){
            if( !formElm ){
                console.warn('element not found');
                return false;
            }

            var that = this,
                result = {
                    valid  : true,  
                    fields : []   
                },
                fieldsToCheck = this.filterFormElements( formElm.elements );
                fieldsToCheck.forEach(function(elm, i){
                var fieldData = that.checkField(elm);

                result.valid = !!(result.valid * fieldData.valid);
                result.fields.push({
                    field   : elm,
                    error   : fieldData.error,
                    valid   : !!fieldData.valid
                })
            });

            return result;
        }
    }    
    return FormValidator;
}));
