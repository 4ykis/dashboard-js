/**
 * Created by 4ykis on 28.04.17.
 */

//dshjs
(function($) {
    jQuery.fn.dshjs = function(json, options) {
        var THIS = this;
        options = $.extend({
            selector        :'default_',
            searchAppend    :undefined,
            searchClass     :'',
            checkbox        :false,
            pagination      :false,
            paginationAppend:undefined,
            paginationClass :'',
            itemsPerPage    :10,
            showPagItems    :5,
            calculate       :false,
            calcData        :{
                container :this,
                columnName:' '
            },
            options         :false,
            optionsAppend   :undefined,
            optionsClass    :'',


            sorting: false,

            afterInit:function() { return false },
            beforeInit:function() { return false },
        }, options);


        method = {
            afterInit:function(bl){
                console.log(bl);
                options.afterInit(bl);
            },
            beforeInit:function(bl){
                options.beforeInit(bl);
            }
        };

        if( json === undefined ) {
            console.error('No Json Data for dashboard.js');
            return;
        }

        var createStorage = function(json) {
            var jsonString = JSON.stringify(json);
            sessionStorage.setItem(options.selector + 'dshjs-data', jsonString);
            sessionStorage.setItem(options.selector + 'default-dshjs-data', jsonString);

            if( !Boolean(sessionStorage.getItem(options.selector + 'pagination')) && options.pagination ) {
                var pagination = {
                    'start'  :1,
                    'step'   :options.itemsPerPage,
                    'current':1
                };
                pagination     = JSON.stringify(pagination);
                sessionStorage.setItem(options.selector + 'pagination', pagination);
            }

            if( !Boolean(sessionStorage.getItem(options.selector + 'checked')) && options.checkbox ) {
                var checked = [];
                checked     = JSON.stringify(checked);
                sessionStorage.setItem(options.selector + 'checked', checked);
            }

            if( options.options && !Boolean(sessionStorage.getItem(options.selector + 'options')) ) {
                var opt = [];
                var d   = JSON.parse(sessionStorage.getItem(options.selector + 'dshjs-data'));
                for( var i = 0; i < d.header.length; ++i ) {
                    if( d.header[i].showAlways == 'true' || d.header[i].show == 'true' ) {
                        opt.push(i);
                    }
                }
                opt = JSON.stringify(opt);
                sessionStorage.setItem(options.selector + 'options', opt);
            } else if( !options.options ) {
                var opt = [];
                var d   = JSON.parse(sessionStorage.getItem(p.selector + 'dshjs-data'));
                for( var i = 0; i < d.header.length; ++i ) {
                    opt.push(i);
                }
                opt = JSON.stringify(opt);
                sessionStorage.setItem(options.selector + 'options', opt);
            }
        };

        var createContainer = function(b) {
            var table = '<div class="dsh-table"></div>';
            b.prepend($('<div class="dsh-options-block"></div>'));
            b.append($(table));
            b.append($('<div class="dsh-footer"></div>'));
        };

        var createHeader = function(block) {
            var d         = JSON.parse(sessionStorage.getItem(options.selector + 'dshjs-data'));
            var opt       = JSON.parse(sessionStorage.getItem(options.selector + 'options'));
            opt           = (Boolean(opt)) ? opt : [];
            var table     = block.find('.dsh-table');
            var container = '<div class="dsh-table-head"></div>';
            var _svg      = '<svg width="10px" height="6px">' +
                '<path d="M 0 0 L 5 6 L 10 0" stroke="black" fill="transparent"></path>' +
                '</svg>';
            var column    = '';

            if( options.checkbox ) {
                column += '<div class="dsh-table-col --non"></div>';
            }

            $.each(d.header, function(i) {
                debugger;
                if( find(opt, i) !== -1 ) {
                    debugger;
                    var svg      = (d.header[i].sort === 'true') ? _svg : '';
                    var pointer  = (d.header[i].sort === 'true') ? 'js-dshjs-sort pointer-cursor' : '';
                    var sortType = (d.header[i].sort === 'true') ? 'data-dshjs-sort="' + d.header[i].sortType + '"' : '';
                    var hclass   = (Boolean(d.header[i].headClass)) ? d.header[i].headClass : '';
                    column += '<div class="dsh-table-col ' + hclass + pointer + '" ' + sortType + ' data-dshjs-col-number="' + i + '" data-dshjs-sort-id="">' +
                        d.header[i].name + ' ' + svg + '</div>';
                }
                //console.log(d.header[i]);
            });

            var endRow = $(container).append(column);
            //console.log(column);
            table.prepend(endRow);

            function find(arr, el) {
                for( var i = 0; i < arr.length; ++i ) {
                    if( arr[i] == el ) {
                        return i;
                    }
                }
                return -1;
            }
        };

        var createItems = function(block, p) {
            var d       = JSON.parse(sessionStorage.getItem(p.selector + 'dshjs-data'));
            var opt     = JSON.parse(sessionStorage.getItem(p.selector + 'options'));
            opt         = (Boolean(opt)) ? opt : [];
            var checked = JSON.parse(sessionStorage.getItem(p.selector + 'checked'));
            var storage = JSON.parse(sessionStorage.getItem(p.selector + 'pagination'));

            // console.log(d.items);

            var table = block.find('.dsh-table');
            var check = '';

            function find(arr, val) {
                for( var k = 0; k < arr.length; k++ ) {
                    if( arr[k] === val ) {
                        return k;
                    }
                }
                return -1;
            }

            $.each(d.items, function(i) {
                if( p.checkbox ) {
                    if( find(checked, d.items[i].id) !== -1 ) {
                        check = 'checked="checked"';
                    } else {
                        check = '';
                    }
                }

                var checkbox = '<input class="js-calc-price-inp" type="checkbox" ' + check + '>' +
                    '<span class="dsh-checkbox">' +
                    '<i class="icon-checked"></i>' +
                    '</span>';
                if( Boolean(storage) ) {
                    if( i + 1 >= +storage.start && i + 1 < +storage.start + +storage.step ) {
                        createCol(i, checkbox);
                    }
                } else {
                    createCol(i, checkbox);
                }


            });

            function createCol(i, checkbox) {
                var container = (p.checkbox) ? '<label></label>' : '<div></div>';
                container     = $(container).addClass('dsh-table-items').attr('data-dshjs-id', d.items[i].id);
                var column    = (p.checkbox) ? checkbox : '';
                $.each(d.items[i].options, function(j) {
                    if( find(opt, j) !== -1 ) {
                        var options    = d.items[i].options;
                        var type       = d.header[j].type;
                        var colContent = '';
                        // console.log(type, type=='btn-icons');
                        switch(type) {
                            case 'link':
                                colContent = '<a href="">' + options[j] + '</a>';
                                break;
                            case 'feedback':
                                if( options[j] >= 0 ) {
                                    colContent = '<div class="customer-rating rating">' +
                                        '<span class="rating-value">' + options[j] + '</span>' +
                                        '<span class="rating-votes" >';
                                    for( var k = 0; k < Math.round(+options[j]); ++k ) {
                                        colContent += '<i class="icon-star2 active" ></i>';
                                    }
                                    if( Math.round(+options[j]) < 5 ) {
                                        for( k = 0; k < 5 - Math.round(+options[j]); ++k ) {
                                            colContent += '<i class="icon-star2" ></i>';
                                        }
                                    }
                                    colContent += '</span>' +
                                        '<a href="" class="rating-counts">Respond</a>' +
                                        '</div>';
                                } else if( options[j] == -1 ) {
                                    colContent = '<div class="customer-rating rating"><a class="rating-counts" href="#"><i class="icon-dialog"></i> Leave feedback</a></div>';
                                } else if( options[j] == 'removed' ) {
                                    colContent = '<div class="customer-rating rating"><span class="rating-counts">Removed</span></div>';
                                } else {
                                    colContent = '';
                                }
                                break;
                            case 'company':
                                var opacity = (options[j].adress == 'suspended') ? 'style="opacity:.5;"' : '';
                                colContent  = '<a href="">' +
                                    '<div ' + opacity + ' ><img src="' + options[j].img + '" alt="" width="35" height="35">';
                                if( options[j].social !== undefined || options[j].social == '' ) {
                                    colContent += '<span class="social-icon icon-' + options[j].social + '"></span>';
                                }
                                colContent += '</div><div >' +
                                    '<p class="name" ' + opacity + '>' + options[j].name + '</p>';
                                if( options[j].adress !== undefined || options[j].adress == '' ) {
                                    if( options[j].adress !== 'suspended' ) {
                                        colContent += '<p class="adress">' + options[j].adress + '</p>';
                                    } else {
                                        colContent += '<p class="adress" style="color: #f33333;text-transform: uppercase;">' + options[j].adress + '</p>';
                                    }

                                }
                                colContent += '</div></a>';
                                break;
                            case 'money':
                                if( options[j] == -1 ) {
                                    colContent = '<p><em></em></p>'
                                } else {
                                    colContent = '<p>$<em>' + options[j] + '</em></p>';
                                }
                                break;
                            case 'btn-link':
                                if( options[j] !== 0 ) {
                                    colContent = '<a href="#" class="btn btn-sm">' + options[j] + '</a>';
                                } else {
                                    colContent = '';
                                }
                                break;
                            case 'btn-popup':
                                if( options[j] !== 0 ) {
                                    colContent = '<div class="btn btn-sm">' + options[j] + '</div>';
                                } else {
                                    colContent = '';
                                }
                                break;
                            case 'btn-icons':
                                if( options[j].length !== 0 ) {
                                    $.each(options[j], function() {
                                        switch(this.type) {
                                            case 'info':
                                                var target = (Boolean(this.target) ) ? this.target : "_self";
                                                colContent += '<a href="' + this.link + '" target="' + target + '" class="dsh-action-btn-i dsh-action-link" data-tooltip="' + this.tooltip + '"><i class="icon2-info"></i></a>';
                                                break;
                                            case 'hide':
                                                colContent += '<div class="dsh-action-btn-i dsh-action-hide js-dsh-action-hide" data-tooltip="' + this.tooltip + '"><i class="icon2-hide"></i></div>';
                                                break;
                                            case 'accept':
                                                colContent += '<div class="dsh-action-btn-i dsh-action-hide js-dsh-action-accept" data-tooltip="' + this.tooltip + '"><i class="icon-plus"></i></div>';
                                                break;
                                            case 'delete':
                                                colContent += '<div class="dsh-action-btn-i dsh-action-hide js-dsh-action-delete" data-tooltip="' + this.tooltip + '"><i class="icon-rubbish-bin"></i></div>';
                                                break;
                                            case 'confirm':
                                                colContent += '<div class="dsh-action-btn-i dsh-action-hide js-dsh-action-confirm" data-tooltip="' + this.tooltip + '"><i class="icon2-confirm"></i></div>';
                                                break;
                                            case 'pay':
                                                colContent += '<div class="dsh-action-btn-i dsh-action-hide js-dsh-action-pay" data-tooltip="' + this.tooltip + '"><i class="icon2-dollar"></i></div>';
                                                break;
                                            default:
                                                console.error('wrong type in JSON for ' + '%c btn-icons', 'color:green');
                                        }
                                    });
                                    // console.log(colContent);
                                }
                                break;
                            case 'status':
                                if( options[j].text !== 0 ) {
                                    colContent = '<p style="color:' + options[j].color + '">' + options[j].text + '</p>';
                                } else {
                                    colContent = '';
                                }
                                break;
                            default:
                                colContent = '<p>' + options[j] + '</p>';
                        }
                        column += '<div class="dsh-table-col ' + d.header[j].class +
                            '" data-dshjs-col-name="' + d.header[j].name +
                            '">' + colContent + '</div>'
                    }
                });
                // console.log(column);
                var endRow = container.append(column);
                table.append(endRow);
            }
        };

        var checkedSave       = function(p) {
            $('.dsh-table-items input').on('change', function(e) {
                var data = sessionStorage.getItem(p.selector + 'checked');
                if( Boolean(data) ) {
                    data = JSON.parse(data);
                } else {
                    data = [];
                }
                var id = $(this).parent().data('dshjs-id');

                if( $(this).is(':checked') ) {
                    data.push(id);
                } else {
                    var data = data.filter(function(el) {
                        return el !== id;
                    });
                }
                sessionStorage.setItem(p.selector + 'checked', JSON.stringify(data));
                // console.log(data);
                dashboard.calculate(p)
            })
        };
        var createPagination  = function(block, p) {
            var d            = JSON.parse(sessionStorage.getItem(p.selector + 'dshjs-data'));
            var pagContainer = ( typeof(p.paginationAppend) == 'object' ) ? p.paginationAppend : block.find('.dsh-footer');
            var count        = p.itemsPerPage;
            var pagination;
            if( d.items.length > count ) {
                var pages    = Math.ceil(d.items.length / count);
                var arrLeft  = '<div class="dsh-pagination ' + p.paginationClass + '"><a class="js-dshjs-arr-left arrow-i"><i class="icon-arrow-back"></i></a>';
                var arrRight = '<a class="js-dshjs-arr-right arrow-i"><i class="icon-back"></i></a></div>';
                pagination   = arrLeft + '<div class="js-dshjs-pag-field">';
                if( pages > p.showPagItems ) {
                    pagination += '<input type="text" value="1"> of ' + pages;
                } else {
                    for( var i = 0; i < pages; ++i ) {
                        pagination += '<a href="javascript:;" data-dshjs-page-id="' + (i + 1) + '">' + (i + 1) + '</a>';
                    }
                }
                pagination += '</div>' + arrRight;
                // console.log(pagination);
                pagContainer.append(pagination);

                if( pages > p.showPagItems ) {
                    pagContainer.addClass('dsh-js-input');
                    paginationInputFunc($('.js-dshjs-pag-field input'));
                } else {
                    pagContainer.addClass('dsh-js-items');
                }

                paginationArrows(block, p);
                paginationNumbers(block, p);
            }
            function paginationInputFunc(inp) {
                inp.on('keyup', function(e) {
                    if( /\D/g.test(this.value) ) {
                        // Filter non-digits from input value.
                        this.value = this.value.replace(/\D/g, '');
                    }
                });
                inp.on('change', function(e) {
                    if( +this.value > pages ) {
                        this.value = pages;
                    } else if( +this.value < 1 ) {
                        this.value = 1;
                    }
                });
            }
        };
        var createSearch      = function(block, p) {
            var d     = JSON.parse(sessionStorage.getItem(p.selector + 'dshjs-data'));
            var table = block;
            block     = ( typeof(p.searchAppend) == 'object' ) ? p.searchAppend : block.find('.dsh-options-block');

            var searchIcon = '<i class="icon-search"></i>';
            var input      = '<input type="text" class="dsh-search-field" placeholder="Search">';
            var search     = '<label class="dsh-search">' + searchIcon + input + '</label>';
            block.prepend($(search));

            search        = block.find('.dsh-search-field');
            var searchCol = [];
            $.each(d.header, function(i) {
                if( Boolean(d.header[i].search) ) {
                    searchCol.push(i);
                }
            });
            search.on('keyup', function() {
                var d           = JSON.parse(sessionStorage.getItem(p.selector + 'default-dshjs-data'));
                var searchValue = $(this).val().toLowerCase();
                var data        = {};
                data.header     = d.header;
                data.items      = d.items.filter(function(elem) {
                    for( var i = 0; i < searchCol.length; ++i ) {
                        // console.log( elem.options[searchCol[i]],d.header[searchCol[i]].type);
                        if( d.header[searchCol[i]].type == 'company' ) {
                            var searchQuery = elem.options[searchCol[i]].name;
                        } else {
                            var searchQuery = elem.options[searchCol[i]];
                        }
                        searchQuery = searchQuery.toString().toLowerCase();
                        if( searchQuery.indexOf(searchValue) !== -1 ) {
                            return true;
                        }
                    }
                    return false;
                });
                data            = JSON.stringify(data);
                sessionStorage.setItem(p.selector + 'dshjs-data', data);


                clear(table);
                createItems(table, p);
                if( p.pagination ) {
                    // console.log(p.pagination);
                    clearPagination(table, p);
                    createPagination(table, p);
                }

            });
        };
        var paginationArrows  = function(block, p) {
            var d   = JSON.parse(sessionStorage.getItem(p.selector + 'dshjs-data'));
            var pag = sessionStorage.getItem(p.selector + 'pagination');
            pag     = JSON.parse(pag);
            if( pag.current !== 1 ) {
                $('.js-dshjs-arr-left').addClass('disable');
            } else if( pag.current !== Math.ceil(d.items.length / p.itemsPerPage) ) {
                $('.js-dshjs-arr-right').addClass('disable');
            }
            $('.js-dshjs-arr-left').on('click', function() {
                var pag = sessionStorage.getItem(p.selector + 'pagination');
                pag     = JSON.parse(pag);
                if( pag.current !== 1 ) {
                    pag.current--;
                    pag.start = +pag.start - +pag.step;
                }
                pag = JSON.stringify(pag);
                sessionStorage.setItem(p.selector + 'pagination', pag);

                $('.js-dshjs-pag-field a').removeClass('active');
                clear(block);
                createItems(block, p);
                activePage(block, p);
                checkedSave(p);
            });
            $('.js-dshjs-arr-right').on('click', function() {
                var pag = sessionStorage.getItem(p.selector + 'pagination');
                pag     = JSON.parse(pag);
                if( pag.current !== Math.ceil(d.items.length / p.itemsPerPage) ) {
                    pag.current++;
                    pag.start = +pag.start + +pag.step;
                }
                pag = JSON.stringify(pag);
                sessionStorage.setItem(p.selector + 'pagination', pag);

                $('.js-dshjs-pag-field a').removeClass('active');
                clear(block);
                createItems(block, p);
                activePage(block, p);
                checkedSave(p);
            });
        };
        var paginationNumbers = function(block, p) {
            var d            = JSON.parse(sessionStorage.getItem(p.selector + 'dshjs-data'));
            var pagContainer = ( typeof(p.paginationAppend) == 'object' ) ? p.paginationAppend : block.find('.dsh-footer');

            // console.log(pagContainer);
            if( pagContainer.hasClass('dsh-js-input') ) {
                var pag = sessionStorage.getItem(p.selector + 'pagination');
                pag     = JSON.parse(pag);
                $('.js-dshjs-pag-field input').on('change', function() {
                    var pag = sessionStorage.getItem(p.selector + 'pagination');
                    pag     = JSON.parse(pag);
                    var id  = +$(this).val();
                    var difference;
                    if( id > pag.current ) {
                        difference = id - pag.current;
                        pag.start  = pag.start + pag.step * difference;
                    } else {
                        difference = pag.current - id;
                        pag.start  = pag.start - pag.step * difference;
                    }
                    pag.current = id;

                    pag = JSON.stringify(pag);
                    sessionStorage.setItem(p.selector + 'pagination', pag);

                    clear(block);
                    createItems(block, p);
                    activePage(block, p);
                    checkedSave(p);
                });

            } else if( pagContainer.hasClass('dsh-js-items') ) {
                $('.js-dshjs-pag-field a').on('click', function() {
                    var pag = sessionStorage.getItem(p.selector + 'pagination');
                    pag     = JSON.parse(pag);
                    // console.log('click');
                    $('.js-dshjs-pag-field a').removeClass('active');
                    var id = $(this).data('dshjs-page-id');
                    var difference;
                    if( id > pag.current ) {
                        difference = id - pag.current;
                        pag.start  = pag.start + pag.step * difference;
                    } else {
                        difference = pag.current - id;
                        pag.start  = pag.start - pag.step * difference;
                    }
                    pag.current = id;


                    pag = JSON.stringify(pag);
                    sessionStorage.setItem(p.selector + 'pagination', pag);

                    clear(block);
                    createItems(block, p);
                    activePage(block, p);
                    checkedSave(p);
                });
            }
        };
        var clear             = function(block) {
            block.find('.dsh-table-items').remove();
        };
        var clearHeader       = function(block) {
            block.find('.dsh-table-head').remove();
        };
        var clearPagination   = function(block, p) {
            var pagContainer = ( typeof(p.paginationAppend) == 'object' ) ? p.paginationAppend : block.find('.dsh-footer');
            pagContainer.find('.dsh-pagination').remove();
        };
        var calculate         = function(p) {
            var d = JSON.parse(sessionStorage.getItem(p.selector + 'dshjs-data'));
            if( p.checkbox ) {
                var checked = JSON.parse(sessionStorage.getItem(p.selector + 'checked'));
                var name    = p.calcData.columnName;
                var colID   = findVal(d.header, name);
                var summ    = 0;
                $.each(d.items, function(i) {
                    if( findEl(checked, d.items[i].id) !== -1 ) {
                        summ += d.items[i].options[colID] * 100;
                    }
                    p.calcData.container.text(summ / 100);
                });
            } else {
                var name  = p.calcData.columnName;
                var colID = findVal(d.header, name);
                var summ  = 0;
                $.each(d.items, function(i) {
                    summ += d.items[i].options[colID] * 100;
                });
                p.calcData.container.text(summ / 100);
            }

            function findVal(arr, val) {
                for( var k = 0; k < arr.length; k++ ) {
                    if( arr[k].name === val ) {
                        return k;
                    }
                }
                return -1;
            }

            function findEl(arr, val) {
                for( var k = 0; k < arr.length; k++ ) {
                    if( arr[k] === val ) {
                        return k;
                    }
                }
                return -1;
            }


        };
        var sorting           = function(block, p) {
            if( $('.js-dshjs-sort').length ) {
                $('.js-dshjs-sort').on('click', function(e) {
                    var type   = $(this).data('dshjs-sort');
                    var col    = $(this).data('dshjs-col-number');
                    var d      = JSON.parse(sessionStorage.getItem(p.selector + 'dshjs-data'));
                    var sortID = this.getAttribute('data-dshjs-sort-id');
                    var header = d.header;
                    var items  = d.items;

                    switch(type) {
                        case 'text':
                            if( sortID == '' || sortID == 'DESC' ) {
                                function sortFunc(a, b) {
                                    var res = (a.options[col] > b.options[col]) ? 1 : -1;
                                    return res;
                                }

                                $('.js-dshjs-sort').attr('data-dshjs-sort-id', '');
                                $(this).attr('data-dshjs-sort-id', 'ASC');
                            } else {
                                function sortFunc(a, b) {
                                    var res = (a.options[col] < b.options[col]) ? 1 : -1;
                                    return res;
                                }

                                $('.js-dshjs-sort').attr('data-dshjs-sort-id', '');
                                $(this).attr('data-dshjs-sort-id', 'DESC');
                            }
                            break;
                        case 'date':
                            if( sortID == '' || sortID == 'DESC' ) {
                                function sortFunc(a, b) {
                                    var _a = a.options[col].split('.').reverse().join();
                                    var _b = b.options[col].split('.').reverse().join();
                                    return (_a > _b) ? 1 : -1;
                                }

                                $('.js-dshjs-sort').attr('data-dshjs-sort-id', '');
                                $(this).attr('data-dshjs-sort-id', 'ASC');
                            } else {
                                function sortFunc(a, b) {
                                    var _a = a.options[col].split('.').reverse().join();
                                    var _b = b.options[col].split('.').reverse().join();
                                    return (_a < _b) ? 1 : -1;
                                }

                                $('.js-dshjs-sort').attr('data-dshjs-sort-id', '');
                                $(this).attr('data-dshjs-sort-id', 'DESC');
                            }
                            break;
                        case 'number':
                            if( sortID == '' || sortID == 'DESC' ) {
                                function sortFunc(a, b) {
                                    var res = (a.options[col] > b.options[col]) ? 1 : -1;
                                    return res;
                                }

                                $('.js-dshjs-sort').attr('data-dshjs-sort-id', '');
                                $(this).attr('data-dshjs-sort-id', 'ASC');
                            } else {
                                function sortFunc(a, b) {
                                    var res = (a.options[col] < b.options[col]) ? 1 : -1;
                                    return res;
                                }

                                $('.js-dshjs-sort').attr('data-dshjs-sort-id', '');
                                $(this).attr('data-dshjs-sort-id', 'DESC');
                            }
                            break;
                        case 'option':
                            if( sortID == '' || sortID == 'DESC' ) {
                                function sortFunc(a, b) {
                                    var res = (a.options[col] > b.options[col]) ? 1 : -1;
                                    return res;
                                }

                                $('.js-dshjs-sort').attr('data-dshjs-sort-id', '');
                                $(this).attr('data-dshjs-sort-id', 'ASC');
                            } else {
                                function sortFunc(a, b) {
                                    var res = (a.options[col] < b.options[col]) ? 1 : -1;
                                    return res;
                                }

                                $('.js-dshjs-sort').attr('data-dshjs-sort-id', '');
                                $(this).attr('data-dshjs-sort-id', 'DESC');
                            }
                            break;
                        case 'feedback':
                            break;
                        default:
                            console.warn('Wrong sort type');
                    }

                    // console.log(sortFunc);


                    items = items.sort(sortFunc);

                    var data = { 'header':header, 'items':items };
                    data     = JSON.stringify(data);
                    sessionStorage.setItem(p.selector + 'dshjs-data', data);
                    dashboard.clear(block);
                    dashboard.createItems(block, p);

                });
            }
        };
        var activePage        = function(block, p) {
            var pagContainer = ( typeof(p.paginationAppend) == 'object' ) ? p.paginationAppend : block.find('.dsh-footer');
            var pag          = sessionStorage.getItem(p.selector + 'pagination');
            pag              = JSON.parse(pag);
            var active       = pag.current;
            if( pagContainer.hasClass('dsh-js-input') ) {
                $('.js-dshjs-pag-field input').val(active);
            } else if( pagContainer.hasClass('dsh-js-items') ) {
                $('.js-dshjs-pag-field a').eq(active - 1).addClass('active');
            }
            // console.log(pag);
        };
        var optionsInit       = function(block, p) {
            var d          = JSON.parse(sessionStorage.getItem(p.selector + 'dshjs-data'));
            var opt        = JSON.parse(sessionStorage.getItem(p.selector + 'options'));
            var table      = block;
            block          = ( typeof(p.optionsAppend) == 'object' ) ? p.optionsAppend : block.find('.dsh-options-block');
            var svg        = '<svg width="10px" height="6px">' +
                '<path d="M 0 0 L 5 6 L 10 0" stroke="#8d9ba5" fill="transparent"></path>' +
                '</svg>';
            var optionList = '<div class="dsh-options--list">';
            for( var i = 0; i < d.header.length; ++i ) {
                if( d.header[i].showAlways !== 'true' ) {
                    if( d.header[i].show == 'true' && find(opt, i) !== -1 ) {
                        var check = true;
                    } else {
                        var check = false
                    }
                    optionList += AddCheck(d.header[i].name, i, check);
                }
            }

            var options = '<div class="dsh-options js-dsh-option-btn"> Options' + svg + optionList + '</div>';

            block.append($(options));

            $.each($('.js-dshjs-options'), function() {
                $(this).on('change', function() {
                    var c  = JSON.parse(sessionStorage.getItem(p.selector + 'options'));
                    var id = $(this).data('dshjs-col-number');
                    if( find(c, id) !== -1 ) {
                        c = c.filter(function(el) {
                            return el !== id
                        });
                    } else {
                        c.push(id);
                    }

                    c = JSON.stringify(c);
                    sessionStorage.setItem(p.selector + 'options', c);
                    clear(table);
                    createItems(table, p);
                    clearHeader(table);
                    createHeader(table, p);
                })
            });
            var btn = $('.js-dsh-option-btn');
            btn.on('click', function() {
                $(this).find('.dsh-options--list').stop().fadeToggle();
                // console.log('click');
            });
            $(window).on('click', function(e) {
                // console.log(e.target);
                var item = $('.js-dsh-option-btn,.js-dsh-option-btn *');
                // console.log(item);
                if( !item.is(e.target) && item.has(e.target).length === 0 ) {
                    btn.find('.dsh-options--list').stop().fadeOut();
                }
            });

            function find(arr, val) {
                for( var k = 0; k < arr.length; k++ ) {
                    if( arr[k] === val ) {
                        return k;
                    }
                }
                return -1;
            }

            function AddCheck(name, id, check) {
                check        = (check) ? check : false;
                var checkbox = ' <div class="checkbox-group"><label><input class="js-dshjs-options" ' +
                    'data-dshjs-col-number="' + id + '" type="checkbox" ';
                if( check ) {
                    checkbox += 'checked="checked"';
                }
                checkbox += '><span><i class="icon-checked"></i></span>' + name + '<label></div>';
                return checkbox;
            }

        };

        var init = function() {
            console.dir(options);
            console.dir(json);
            createStorage(json);
            createContainer(THIS);
            method.beforeInit();

            createHeader(THIS);
            createItems(THIS, options);

            if( options.pagination ) {
                createPagination(THIS, options);
                // console.log('pagination done');
                activePage(THIS, options);
                // console.log('active done');
            }
            if( options.sorting ){
                sorting(THIS, options);
            }
            // console.log('sorting init done');
            if( options.checkbox ) {
                checkedSave(options);
                // console.log('checked Save done');
            }
            if( options.search ) {
                createSearch(THIS, options);
                // console.log('search done');
            }
            if( options.calculate ) {
                calculate(options);
                // console.log('calculate init done');
            }
            if( options.options ) {
                optionsInit(THIS, options);
                // console.log('options init done ');
            }

            method.afterInit(THIS);


        };

        return this.each(init);
    }
})(jQuery);
