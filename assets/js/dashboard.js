/**
 * Created by user on 28.04.17.
 */

//dshjs


var dashboard = {

    defaultParams: function (p, block) {
        if (typeof(p) == 'undefined') {
            p = {};
        }

        p.selector = ( Boolean(p.selector) ) ? p.selector : 'one_';

        p.search = ( Boolean(p.search) ) ? p.search : false;
        p.searchAppend = ( typeof(p.searchAppend) == 'object' ) ? p.searchAppend : undefined;
        p.searchClass = ( Boolean(p.searchClass) ) ? p.searchClass : '';

        p.checkbox = ( Boolean(p.checkbox) ) ? p.checkbox : false;

        p.pagination = ( Boolean(p.pagination) ) ? p.pagination : false;
        p.paginationAppend = ( typeof(p.paginationAppend) == 'object' ) ? p.paginationAppend : undefined;
        p.paginationClass = ( Boolean(p.paginationClass) ) ? p.paginationClass : '';
        p.itemsPerPage = ( Boolean(+p.itemsPerPage) && p.itemsPerPage > 0 ) ? p.itemsPerPage : 10;
        p.showPagItems = ( Boolean(+p.showPagItems) && p.showPagItems >= 3 ) ? p.showPagItems : 5;

        p.calcData = ( typeof(p.calcData) == 'object' ) ? p.calcData : {};
        p.calcData.container = ( typeof(p.calcData.container) == 'object' ) ? p.calcData.container : block;
        p.calcData.columnName = ( Boolean(p.calcData.columnName) ) ? p.calcData.columnName : ' ';

        p.options = ( Boolean(p.options) ) ? p.options : false;
        p.optionsAppend = ( typeof(p.optionsAppend) == 'object' ) ? p.optionsAppend : undefined;
        p.optionsClass = ( Boolean(p.optionsClass) ) ? p.optionsClass : '';


        return p;
    },
    createContainer: function (block) {
        var table = '<div class="dsh-table"></div>';
        block.prepend($('<div class="dsh-options-block"></div>'));
        block.append(table);
        block.append($('<div class="dsh-footer"></div>'));
    },
    createHeader: function (block, p) {
        var d = JSON.parse(sessionStorage.getItem(p.selector + 'dshjs-data'));
        var opt = JSON.parse(sessionStorage.getItem(p.selector + 'options'));
        opt = (Boolean(opt))?opt:[];
        var table = block.find('.dsh-table');
        var container = '<div class="dsh-table-head"></div>';
        var _svg = '<svg width="10px" height="6px">' +
            '<path d="M 0 0 L 5 6 L 10 0" stroke="black" fill="transparent"></path>' +
            '</svg>';
        var column = '';

        if (p.checkbox) {
            column += '<div class="dsh-table-col --non"></div>';
        }

        $.each(d.header, function (i) {
            if (find(opt, i) !== -1) {
                var svg = (d.header[i].sort === 'true') ? _svg : '';
                var pointer = (d.header[i].sort === 'true') ? 'js-dshjs-sort pointer-cursor' : '';
                var sortType = (d.header[i].sort === 'true') ? 'data-dshjs-sort="' + d.header[i].sortType + '"' : '';
                column += '<div class="dsh-table-col ' + pointer + '" ' + sortType + ' data-dshjs-col-number="' + i + '" data-dshjs-sort-id="">' +
                    d.header[i].name + ' ' + svg + '</div>';
            }
            // console.log(d.header[i]);
        });

        var endRow = $(container).append(column);
        table.prepend(endRow);

        function find(arr, el) {
            for (var i = 0; i < arr.length; ++i) {
                if (arr[i] == el) return i;
            }
            return -1;
        }
    },
    createItems: function (block, p) {
        var d = JSON.parse(sessionStorage.getItem(p.selector + 'dshjs-data'));
        var opt = JSON.parse(sessionStorage.getItem(p.selector + 'options'));
        opt = (Boolean(opt))?opt:[];
        var checked = JSON.parse(sessionStorage.getItem(p.selector + 'checked'));
        var storage = JSON.parse(sessionStorage.getItem(p.selector + 'pagination'));

        // console.log(d.items);

        var table = block.find('.dsh-table');
        var check = '';

        function find(arr, val) {
            for (var k = 0; k < arr.length; k++) {
                if (arr[k] === val) return k;
            }
            return -1;
        }

        $.each(d.items, function (i) {
            if (p.checkbox) {
                if (find(checked, d.items[i].id) !== -1) {
                    check = 'checked="checked"';
                } else {
                    check = '';
                }
            }

            var checkbox = '<input class="js-calc-price-inp" type="checkbox" ' + check + '>' +
                '<span class="dsh-checkbox">' +
                '<i class="icon-checked"></i>' +
                '</span>';
            if (Boolean(storage)) {
                if (i + 1 >= +storage.start && i + 1 < +storage.start + +storage.step) {
                    createCol(i, checkbox);
                }
            } else {
                createCol(i, checkbox);
            }


        });

        function createCol(i, checkbox) {
            var container = (p.checkbox) ? '<label></label>' : '<div></div>';
            container = $(container).addClass('dsh-table-items').attr('data-dshjs-id', d.items[i].id);
            var column = (p.checkbox) ? checkbox : '';
            $.each(d.items[i].options, function (j) {
                if( find(opt,j) !==-1 ) {
                    var options = d.items[i].options;
                    var type = d.header[j].type;
                    var colContent;
                    switch (type) {
                        case 'link':
                            colContent = '<a href="">' + options[j] + '</a>';
                            break;
                        case 'feedback':
                            if (options[j] !== 0) {
                                colContent = '<div class="customer-rating rating">' +
                                    '<span class="rating-value">' + options[j] + '</span>' +
                                    '<span class="rating-votes" >';
                                for (var k = 0; k < Math.round(+options[j]); ++k) {
                                    colContent += '<i class="icon-star2 active" ></i>';
                                }
                                if (Math.round(+options[j]) < 5) {
                                    for (k = 0; k < 5 - Math.round(+options[j]); ++k) {
                                        colContent += '<i class="icon-star2" ></i>';
                                    }
                                }
                                colContent += '</span>' +
                                    // '<a href="" class="rating-counts">Respond</a>' +
                                    '</div>';
                            } else {
                                colContent = '';
                            }
                            break;
                        case 'company':
                            colContent = '<a href="">' +
                                '<div><img src="' + options[j].img + '" alt="" width="35" height="35">';
                            if (options[j].social !== undefined || options[j].social == '') {
                                colContent += '<span class="social-icon icon-' + options[j].social + '"></span>';
                            }
                            colContent += '</div><div>' +
                                '<p class="name">' + options[j].name + '</p>';
                            if (options[j].adress !== undefined || options[j].adress == '') {
                                colContent += '<p class="adress">' + options[j].adress + '</p>';
                            }
                            colContent += '</div></a>';
                            break;
                        case 'money':
                            if (options[j] == 0) {
                                colContent = '<p><em></em></p>'
                            } else {
                                colContent = '<p>$<em>' + options[j] + '</em></p>';
                            }
                            break;
                        case 'btn-link':
                            if (options[j] !== 0) {
                                colContent = '<a href="#" class="btn btn-sm">' + options[j] + '</a>';
                            } else {
                                colContent = '';
                            }
                            break;
                        case 'btn-popup':
                            if (options[j] !== 0) {
                                colContent = '<div class="btn btn-sm">' + options[j] + '</div>';
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
            var endRow = container.append(column);
            table.append(endRow);
        }
    },
    checkedSave: function (p) {
        $('.dsh-table-items input').on('change', function (e) {
            var data = sessionStorage.getItem(p.selector + 'checked');
            if (Boolean(data)) {
                data = JSON.parse(data);
            } else {
                data = [];
            }
            var id = $(this).parent().data('dshjs-id');

            if ($(this).is(':checked')) {
                data.push(id);
            } else {
                var data = data.filter(function (el) {
                    return el !== id;
                });
            }
            sessionStorage.setItem(p.selector + 'checked', JSON.stringify(data));
            // console.log(data);
            dashboard.calculate(p)
        })
    },
    createPagination: function (block, p) {
        var d = JSON.parse(sessionStorage.getItem(p.selector + 'dshjs-data'));
        var pagContainer = ( typeof(p.paginationAppend) == 'object' ) ? p.paginationAppend : block.find('.dsh-footer');
        var count = p.itemsPerPage;
        var pagination;
        if (d.items.length > count) {
            var pages = Math.ceil(d.items.length / count);
            var arrLeft = '<div class="dsh-pagination ' + p.paginationClass + '"><a class="js-dshjs-arr-left arrow-i"><i class="icon-arrow-back"></i></a>';
            var arrRight = '<a class="js-dshjs-arr-right arrow-i"><i class="icon-back"></i></a></div>';
            pagination = arrLeft + '<div class="js-dshjs-pag-field">';
            if (pages > p.showPagItems) {
                pagination += '<input type="text" value="1"> of ' + pages;
            } else {
                for (var i = 0; i < pages; ++i) {
                    pagination += '<a href="javascript:;" data-dshjs-page-id="' + (i + 1) + '">' + (i + 1) + '</a>';
                }
            }
            pagination += '</div>' + arrRight;
            pagContainer.append(pagination);

            if (pages > p.showPagItems) {
                pagContainer.addClass('dsh-js-input');
                paginationInputFunc($('.js-dshjs-pag-field input'));
            } else {
                pagContainer.addClass('dsh-js-items');
            }

            this.paginationArrows(block, p);
            this.paginationNumbers(block, p);
        }
        function paginationInputFunc(inp) {
            inp.on('keyup', function (e) {
                if (/\D/g.test(this.value)) {
                    // Filter non-digits from input value.
                    this.value = this.value.replace(/\D/g, '');
                }
            });
            inp.on('change', function (e) {
                if (+this.value > pages) {
                    this.value = pages;
                } else if (+this.value < 1) {
                    this.value = 1;
                }
            });
        }
    },
    createSearch: function (block, p) {
        var d = JSON.parse(sessionStorage.getItem(p.selector + 'dshjs-data'));
        var table = block;
        block = ( typeof(p.searchAppend) == 'object' ) ? p.searchAppend : block.find('.dsh-options-block');

        var searchIcon = '<i class="icon-search"></i>';
        var input = '<input type="text" class="dsh-search-field" placeholder="Search">';
        var search = '<label class="dsh-search">' + searchIcon + input + '</label>';
        block.prepend($(search));

        search = block.find('.dsh-search-field');
        var searchCol = [];
        $.each(d.header, function (i) {
            if (Boolean(d.header[i].search)) {
                searchCol.push(i);
            }
        });
        search.on('keyup', function () {
            var d = JSON.parse(sessionStorage.getItem(p.selector + 'default-dshjs-data'));
            var searchValue = $(this).val().toLowerCase();
            var data = {};
            data.header = d.header;
            data.items = d.items.filter(function (elem) {
                for (var i = 0; i < searchCol.length; ++i) {
                    console.log( elem.options[searchCol[i]],d.header[searchCol[i]].type);
                    if( d.header[searchCol[i]].type == 'company' ){
                        var searchQuery = elem.options[searchCol[i]].name;
                    } else {
                        var searchQuery = elem.options[searchCol[i]];
                    }
                    searchQuery = searchQuery.toString().toLowerCase();
                    if (searchQuery.indexOf(searchValue) !== -1) {
                        return true;
                    }
                }
                return false;
            });
            data = JSON.stringify(data);
            sessionStorage.setItem(p.selector + 'dshjs-data', data);


            dashboard.clear(table);
            dashboard.createItems(table, p);
            if (p.pagination) {
                // console.log(p.pagination);
                dashboard.clearPagination(table, p);
                dashboard.createPagination(table, p);
            }

        });
    },
    paginationArrows: function (block, p) {
        var d = JSON.parse(sessionStorage.getItem(p.selector + 'dshjs-data'));
        var pag = sessionStorage.getItem(p.selector + 'pagination');
        pag = JSON.parse(pag);
        if (pag.current !== 1) {
            $('.js-dshjs-arr-left').addClass('disable');
        } else if (pag.current !== Math.ceil(d.items.length / p.itemsPerPage)) {
            $('.js-dshjs-arr-right').addClass('disable');
        }
        $('.js-dshjs-arr-left').on('click', function () {
            var pag = sessionStorage.getItem(p.selector + 'pagination');
            pag = JSON.parse(pag);
            if (pag.current !== 1) {
                pag.current--;
                pag.start = +pag.start - +pag.step;
            }
            pag = JSON.stringify(pag);
            sessionStorage.setItem(p.selector + 'pagination', pag);

            $('.js-dshjs-pag-field a').removeClass('active');
            dashboard.clear(block);
            dashboard.createItems(block, p);
            dashboard.activePage(block, p);
            dashboard.checkedSave(p);
        });
        $('.js-dshjs-arr-right').on('click', function () {
            var pag = sessionStorage.getItem(p.selector + 'pagination');
            pag = JSON.parse(pag);
            if (pag.current !== Math.ceil(d.items.length / p.itemsPerPage)) {
                pag.current++;
                pag.start = +pag.start + +pag.step;
            }
            pag = JSON.stringify(pag);
            sessionStorage.setItem(p.selector + 'pagination', pag);

            $('.js-dshjs-pag-field a').removeClass('active');
            dashboard.clear(block);
            dashboard.createItems(block, p);
            dashboard.activePage(block, p);
            dashboard.checkedSave(p);
        });
    },
    paginationNumbers: function (block, p) {
        var d = JSON.parse(sessionStorage.getItem(p.selector + 'dshjs-data'));
        var pagContainer = ( typeof(p.paginationAppend) == 'object' ) ? p.paginationAppend : block.find('.dsh-footer');

        // console.log(pagContainer);
        if (pagContainer.hasClass('dsh-js-input')) {
            var pag = sessionStorage.getItem(p.selector + 'pagination');
            pag = JSON.parse(pag);
            $('.js-dshjs-pag-field input').on('change', function () {
                var pag = sessionStorage.getItem(p.selector + 'pagination');
                pag = JSON.parse(pag);
                var id = +$(this).val();
                var difference;
                if (id > pag.current) {
                    difference = id - pag.current;
                    pag.start = pag.start + pag.step * difference;
                } else {
                    difference = pag.current - id;
                    pag.start = pag.start - pag.step * difference;
                }
                pag.current = id;


                pag = JSON.stringify(pag);
                sessionStorage.setItem(p.selector + 'pagination', pag);

                dashboard.clear(block);
                dashboard.createItems(block, p);
                dashboard.activePage(block, p);
                dashboard.checkedSave(p);
            });

        } else if (pagContainer.hasClass('dsh-js-items')) {
            $('.js-dshjs-pag-field a').on('click', function () {
                var pag = sessionStorage.getItem(p.selector + 'pagination');
                pag = JSON.parse(pag);
                console.log('click');
                $('.js-dshjs-pag-field a').removeClass('active');
                var id = $(this).data('dshjs-page-id');
                var difference;
                if (id > pag.current) {
                    difference = id - pag.current;
                    pag.start = pag.start + pag.step * difference;
                } else {
                    difference = pag.current - id;
                    pag.start = pag.start - pag.step * difference;
                }
                pag.current = id;


                pag = JSON.stringify(pag);
                sessionStorage.setItem(p.selector + 'pagination', pag);

                dashboard.clear(block);
                dashboard.createItems(block, p);
                dashboard.activePage(block, p);
                dashboard.checkedSave(p);
            });
        }
    },

    clear: function (block) {
        block.find('.dsh-table-items').remove();
    },
    clearHeader: function (block) {
        block.find('.dsh-table-head').remove();
    },
    clearPagination: function (block, p) {
        var pagContainer = ( typeof(p.paginationAppend) == 'object' ) ? p.paginationAppend : block.find('.dsh-footer');
        pagContainer.find('.dsh-pagination').remove();
    },
    calculate: function (p) {
        var d = JSON.parse(sessionStorage.getItem(p.selector + 'dshjs-data'));
        if (p.checkbox) {
            var checked = JSON.parse(sessionStorage.getItem(p.selector + 'checked'));
            var name = p.calcData.columnName;
            var colID = findVal(d.header, name);
            var summ = 0;
            $.each(d.items, function (i) {
                if (findEl(checked, d.items[i].id) !== -1) {
                    summ += d.items[i].options[colID] * 100;
                }
                p.calcData.container.text(summ / 100);
            });
        } else {
            var name = p.calcData.columnName;
            var colID = findVal(d.header, name);
            var summ = 0;
            $.each(d.items, function (i) {
                summ += d.items[i].options[colID] * 100;
            });
            p.calcData.container.text(summ / 100);
        }

        function findVal(arr, val) {
            for (var k = 0; k < arr.length; k++) {
                if (arr[k].name === val) return k;
            }
            return -1;
        }

        function findEl(arr, val) {
            for (var k = 0; k < arr.length; k++) {
                if (arr[k] === val) return k;
            }
            return -1;
        }


    },
    sorting: function (block, p) {
        if ($('.js-dshjs-sort').length) {
            $('.js-dshjs-sort').on('click', function (e) {
                var type = $(this).data('dshjs-sort');
                var col = $(this).data('dshjs-col-number');
                var d = JSON.parse(sessionStorage.getItem(p.selector + 'dshjs-data'));
                var sortID = this.getAttribute('data-dshjs-sort-id');
                var header = d.header;
                var items = d.items;

                switch (type) {
                    case 'text':
                        if (sortID == '' || sortID == 'DESC') {
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
                        if (sortID == '' || sortID == 'DESC') {
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
                        if (sortID == '' || sortID == 'DESC') {
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
                        if (sortID == '' || sortID == 'DESC') {
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

                var data = {'header': header, 'items': items};
                data = JSON.stringify(data);
                sessionStorage.setItem(p.selector + 'dshjs-data', data);
                dashboard.clear(block);
                dashboard.createItems(block, p);

            });
        }
    },

    activePage: function (block, p) {
        var pagContainer = ( typeof(p.paginationAppend) == 'object' ) ? p.paginationAppend : block.find('.dsh-footer');
        var pag = sessionStorage.getItem(p.selector + 'pagination');
        pag = JSON.parse(pag);
        var active = pag.current;
        if (pagContainer.hasClass('dsh-js-input')) {
            $('.js-dshjs-pag-field input').val(active);
        } else if (pagContainer.hasClass('dsh-js-items')) {
            $('.js-dshjs-pag-field a').eq(active - 1).addClass('active');
        }
        // console.log(pag);
    },
    optionsInit: function (block, p) {
        var d = JSON.parse(sessionStorage.getItem(p.selector + 'dshjs-data'));
        var opt = JSON.parse(sessionStorage.getItem(p.selector + 'options'));
        var table = block;
        block = ( typeof(p.optionsAppend) == 'object' ) ? p.optionsAppend : block.find('.dsh-options-block');
        var svg = '<svg width="10px" height="6px">'+
            '<path d="M 0 0 L 5 6 L 10 0" stroke="#8d9ba5" fill="transparent"></path>'+
            '</svg>';
        var optionList = '<div class="dsh-options--list">';
        for (var i=0;i<d.header.length;++i){
           if (d.header[i].showAlways !== 'true'){
               if( d.header[i].show == 'true' && find(opt,i) !==-1 ){
                   var check = true;
               } else {
                   var check = false
               }
               optionList += AddCheck(d.header[i].name,i, check);
           }
        }

        var options = '<div class="dsh-options js-dsh-option-btn"> Options' +svg+ optionList+ '</div>';

        block.append($(options));
        
        $.each($('.js-dshjs-options'),function(){
            $(this).on('change',function () {
                var c = JSON.parse(sessionStorage.getItem(p.selector + 'options'));
                var id = $(this).data('dshjs-col-number');
                if ( find(c,id) !== -1 ){
                    c = c.filter(function(el){
                       return el !== id
                    });
                } else {
                    c.push(id);
                }

                c = JSON.stringify(c);
                sessionStorage.setItem(p.selector+'options',c);
                dashboard.clear(table);
                dashboard.createItems(table,p);
                dashboard.clearHeader(table);
                dashboard.createHeader(table,p);
            })
        });
        var btn = $('.js-dsh-option-btn');
        btn.on('click',function(){
            $(this).find('.dsh-options--list').stop().fadeToggle();
            // console.log('click');
        });
        $(window).on('click',function (e) {
            // console.log(e.target);
            var item = $('.js-dsh-option-btn,.js-dsh-option-btn *');
            // console.log(item);
            if( !item.is(e.target) && item.has(e.target).length === 0){
                btn.find('.dsh-options--list').stop().fadeOut();
            }
        });

        function find(arr, val) {
            for (var k = 0; k < arr.length; k++) {
                if (arr[k] === val) return k;
            }
            return -1;
        }

        function AddCheck(name,id,check){
            check = (check)?check:false;
            var checkbox = ' <div class="checkbox-group"><label><input class="js-dshjs-options" '+
                'data-dshjs-col-number="'+id+'" type="checkbox" ';
            if(check){
                checkbox+='checked="checked"';
            }
            checkbox += '><span><i class="icon-checked"></i></span>'+name+'<label></div>';
            return checkbox;
        }

    },

    storage: function (p) {

        if (!Boolean(sessionStorage.getItem(p.selector + 'pagination')) && p.pagination) {
            var pagination = {
                'start': 1,
                'step': p.itemsPerPage,
                'current': 1
            };
            pagination = JSON.stringify(pagination);
            sessionStorage.setItem(p.selector + 'pagination', pagination);
        }

        if (!Boolean(sessionStorage.getItem(p.selector + 'checked')) && p.checkbox) {
            var checked = [];
            checked = JSON.stringify(checked);
            sessionStorage.setItem(p.selector + 'checked', checked);
        }

        if (p.options && !Boolean(sessionStorage.getItem(p.selector + 'options')) ) {
            var options = [];
            var d = JSON.parse(sessionStorage.getItem(p.selector + 'dshjs-data'));
            for (var i = 0; i < d.header.length; ++i) {
                if (d.header[i].showAlways == 'true' || d.header[i].show == 'true') {
                    options.push(i);
                }
            }
            options = JSON.stringify(options);
            sessionStorage.setItem(p.selector + 'options', options);
        } else if (!p.options){
            var options = [];
            var d = JSON.parse(sessionStorage.getItem(p.selector + 'dshjs-data'));
            for (var i = 0; i < d.header.length; ++i) {
                options.push(i);
            }
            options = JSON.stringify(options);
            sessionStorage.setItem(p.selector + 'options', options);
        }

    },
    init: function (initBlock, json, params) {
        var params = this.defaultParams(params, initBlock);
        var jsonString = JSON.stringify(json);
        sessionStorage.setItem(params.selector + 'dshjs-data', jsonString);
        sessionStorage.setItem(params.selector + 'default-dshjs-data', jsonString);
        if (json !== undefined) {
            this.storage(params);
            console.log('storage done');
            this.createContainer(initBlock);
            console.log('container done');
            this.createHeader(initBlock, params);
            console.log('header done');
            this.createItems(initBlock, params);
            console.log('items done');
            if (params.pagination) {

                this.createPagination(initBlock, params);
                console.log('pagination done');
                this.activePage(initBlock, params);
                console.log('active done');
            }
            this.sorting(initBlock, params);
            console.log('sorting init done');
            if (params.checkbox) {
                this.checkedSave(params);
                console.log('checked Save done');
            }
            if (params.search) {
                this.createSearch(initBlock, params);
                console.log('search done');
            }
            if (params.calculate) {
                this.calculate(params);
                console.log('calculate init done');
            }
            if (params.options) {
                this.optionsInit(initBlock, params);
                console.log('options init done ');
            }
        } else {
            console.error('No Json Data for dashboard.js');
            return;
        }

        // console.log(params);
    }
};


// to create random JSON for items;
function createJSON(number) {

    var items = [];
    for (var i = 0; i < number; ++i) {
        items[i] = {};
        items[i].id = i;
        items[i].options = [];
        items[i].options[0] = randNumber(8);

        items[i].options[1] = {};
        items[i].options[1].img = '../assets/img/member2.jpg';
        items[i].options[1].link = '#';
        items[i].options[1].name = randString(7) + ' ' + randString(5);
        items[i].options[1].adress = randNumber(3) + ' ' + randString(7) + ', ' + randString(9);

        items[i].options[2] = {};
        items[i].options[2].img = '../assets/img/member2.jpg';
        items[i].options[2].link = '#';
        items[i].options[2].social = 'twitter';
        items[i].options[2].name = randString(7) + ' ' + randString(5);
        items[i].options[2].adress = randNumber(3) + ' ' + randString(7) + ', ' + randString(9);

        items[i].options[3] = randNumber(3)/10;

        items[i].options[4] = randNumber(4) / 100;

        items[i].options[5] = randNumber(2) / 10;
        items[i].options[6] = 'Make Referral';
    }
    function randOption() {
        var r = Math.floor(Math.random() * 10);
        r = (r > 4) ? 'Over due' : 'Unpaid';
        return r;
    }

    function randDate() {
        var day = Math.floor(Math.random() * (31 - 1) + 1);
        day = (day < 10) ? '0' + day : day;
        var month = Math.floor(Math.random() * (13 - 1) + 1);
        month = (month < 10) ? '0' + month : month;
        var year = Math.floor(Math.random() * (100 - 10) + 10);
        month = (year < 10) ? '0' + year : year;
        return day + '.' + month + '.' + year;
    }

    function randNumber(length) {
        var max = 10, min = 10;
        for (var i = 0; i < length - 1; ++i) {
            max *= 10;
        }
        for (var i = 0; i < length - 2; ++i) {
            min *= 10;
        }
        // console.log(min,max);

        return Math.floor(Math.random() * (max - min) + min);
    }

    function randString(length) {
        return Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, length);
    }

    return JSON.stringify(items);
}