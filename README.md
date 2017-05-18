
# dashboard-js
Script for creating tables and dashboards.
Using session storage for saving data.

<h3>Options:</h3>
<table>
<tr>
<td>selector</td>
<td>string</td>
<td>//Using for session storage name, needed if you using more then 1 dashboard/table on you site<br>
//Default "one_";<br>
//NOTE: if dont add this option then latest init would rewrite all previos data in session storage</td>
</tr>
<tr>
<td>search   </td>
<td>true/false </td>
<td>//search block def: 'false'</td>
</tr>
<tr><td>searchAppend</td> -
<td>Jquery element</td>
<td>//parent block to append search *</td></tr>
<tr>
<td>searchClass</td>  -
<td>string</td>
<td>//class for search block<br>
//def: ''</td></tr>
<tr>
<td>checkbox</td> -
<td>true/false</td>
<td>//enable select rows and adding checkboxes to them def:false</td></tr>
<tr>
<td>pagination</td> -
<td>true/false</td>
<td>//enable pagination def:false</td></tr>
<tr>
<td>paginationAppend</td> -
<td>Jquery element</td>
<td>//parent block to append pagination*</td></tr>
<tr>
<td>paginationClass</td>  -
<td>string</td>
<td>//class for search block def:'';</td></tr>
<tr>
<td>itemsPerPage</td> -
<td>number</td>
<td>//number of rows at 1page def:10;</td></tr>
<tr>
<td>showPagItems</td> -
<td>number</td>
<td>//number of page buttons in pagination before use input to put page def:5</td></tr>
<tr>
<td>options</td> -
<td>true/false</td>
<td>//add button with list of column that u can add or remove dynamicly def:false</td></tr>
<tr>
<td>optionsAppend</td> -
<td>Jquery element</td>
<td>//parent block to append options button*</td></tr>
<tr>
<td>optionsClass</td> -
<td>string</td>
<td>//class for options block</td></tr>
<tr>
<td>calculate</td> -
<td>true/false</td>
<td>//if u need to calculate of some columns value (avaible only for with "checkbox" option)</td>
	</tr>
<tr>
<td>calcData</td> -
<td>Objec with this params:</td></tr>
<tr>
<td>container</td> -
<td>Jqery elemnt</td>
<td>//block where append summ</td></tr>
<tr>
<td>columnName</td> -
<td>string</td>
<td>//name of JSON column amount of what needed to calculate</td></tr>
</table>

EXAMPLE JSON:
<code>
var dataJson = {
        'header': [
            {
                'name': 'Transaction ID',
                'class': 'dsh-link',
                'type': 'link',
                'showAlways': 'true',
                'show': 'true',
                'search': 'true'
            },
            {
                'name': 'Business Name',
                'class': 'dsh-company',
                'sort': 'true',
                'type': 'company',
                'sortType': 'company',
                'showAlways': 'true',
                'show': 'true',
                'search': 'true'
            },
            {
                'name': 'From',
                'class': 'dsh-company dsh-social',
                'sort': 'true',
                'sortType': 'company',
                'type': 'company',
                'showAlways': 'true',
                'show': 'true',
                'search': 'true'
            },
            {
                'name': 'Confirmed Amount',
                'class': 'dsh-standart',
                'sort': 'false',
                'type': 'money',
                'showAlways': 'false',
                'show': 'true'
            },
            {
                'name': 'Payable',
                'class': 'dsh-standart',
                'type': 'money',
                'showAlways': 'false',
                'show': 'true'
            },
            {
                'name': 'Feedback',
                'class': 'dsh-feedback',
                'type': 'feedback',
                'showAlways': 'false',
                'show': 'true'
            },
            {
                'name': 'Action',
                'class': 'dsh-action',
                'sort': 'false',
                'type': 'btn-popup',
                'showAlways': 'true',
                'show': 'false'
            },
        ],
        'items': [
            {
                "id": 0,
                "options": [61871439, {
                    "img": "member2.jpg",
                    "link": "#",
                    "name": "ixtjaqk dqiqt",
                    "adress": "709 hdmbujm, brtkuuqvx"
                }, {
                    "img": "member2.jpg",
                    "link": "#",
                    "social": "facebook",
                    "name": "spnqjms wcgfz",
                    "adress": "228 diskmcw, kfcbvkies"
                }, 51.1, 38.62, 3.8, "Make Referral"]
            },
            {
                "id": 1,
                "options": [35626820, {
                    "img": "member2.jpg",
                    "link": "#",
                    "name": "uvndnys unrvj",
                    "adress": "996 wecktcd, lgvsrxxtt"
                }, {
                    "img": "member2.jpg",
                    "link": "#",
                    "social": "linkedin",
                    "name": "slmkotp resgv",
                    "adress": "513 tlvxunr, hveyfnadz"
                }, 95.8, 65.63, 2.9,
					"Make Referral"]
            },
            {
                "id": 2,
                "options": [59914277, {
                    "img": "member2.jpg",
                    "link": "#",
                    "name": "qixleze jzazv",
                    "adress": "956 bnzmqeo, lfrzrqwrh"
                }, {
                    "img": "member2.jpg",
                    "link": "#",
                    "social": "vkontakte",
                    "name": "jslklbd tqghq",
                    "adress": "909 mvacpcs, igkrkuhkw"
                }, 77.2, 65.59, 4.6,
					"Make Referral"]
            },
            {
                "id": 3,
                "options": [73628632, {
                    "img": "member2.jpg",
                    "link": "#",
                    "name": "idhqvei qehso",
                    "adress": "551 eqtypvk, ulrzhzgfm"
                }, {
                    "img": "member2.jpg",
                    "link": "#",
                    "social": "odnoklassniki",
                    "name": "ufvhgii omyon",
                    "adress": "120 fnmaoay, autordhco"
                }, 28.7, 51.21, 1.2,
					"Make Referral"]
            },
            {
                "id": 4,
                "options": [60862117, {
                    "img": "member2.jpg",
                    "link": "#",
                    "name": "kjgfjgs tjedb",
                    "adress": "857 uwdkccl, cqkihehrx"
                }, {
                    "img": "member2.jpg",
                    "link": "#",
                    "social": "twitch",
                    "name": "lxweuew umpyg",
                    "adress": "106 olvrylk, hhlqohxqm"
                }, 28.7, 66.74, 2.8,
					"Make Referral"]
            },
            {
                "id": 5,
                "options": [94559485, {
                    "img": "member2.jpg",
                    "link": "#",
                    "name": "bfvywvj apljm",
                    "adress": "250 cbukakc, rqnbhsgph"
                }, {
                    "img": "member2.jpg",
                    "link": "#",
                    "social": "youtube",
                    "name": "xuxiums rgldc",
                    "adress": "452 hfzxzdr, epcfjqtwk"
                }, 37.5, 94.56, 4.2,
					"Make Referral"]
            },
            {
                "id": 6,
                "options": [14954375, {
                    "img": "member2.jpg",
                    "link": "#",
                    "name": "gsdlmof sxylx",
                    "adress": "188 urqkjhk, qjqyifoik"
                }, {
                    "img": "member2.jpg",
                    "link": "#",
                    "social": "instagram",
                    "name": "pkkfbke lhqnj",
                    "adress": "729 bekslad, zlnfypuhy"
                }, 55, 16.2, 4.2,
					"Make Referral"]
            },
            {
                "id": 7,
                "options": [89265566, {
                    "img": "member2.jpg",
                    "link": "#",
                    "name": "ryjjfpd xmdwf",
                    "adress": "610 quxbntw, fvjlsstru"
                }, {
                    "img": "member2.jpg",
                    "link": "#",
                    "social": "google-plus",
                    "name": "cgmpwez olxfs",
                    "adress": "518 dswwnep, fuhlpgsgf"
                }, 38.6, 41.84, 4.2, "Make Referral"]
            },
            {
                "id": 8,
                "options": [64299697, {
                    "img": "member2.jpg",
                    "link": "#",
                    "name": "qtmkord euasx",
                    "adress": "358 sqctbtb, hjtqsbzaw"
                }, {
                    "img": "member2.jpg",
                    "link": "#",
                    "social": "twitter",
                    "name": "fxwlwpm blqlr",
                    "adress": "112 vkwegms, drrynciyx"
                }, 20.3, 83.64, 4.8, "Make Referral"]
            },
            {
                "id": 9,
                "options": [43270498, {
                    "img": "member2.jpg",
                    "link": "#",
                    "name": "mbnwswb bvemc",
                    "adress": "827 zgqiaox, ljzqpbdik"
                }, {
                    "img": "member2.jpg",
                    "link": "#",
                    "social": "twitter",
                    "name": "nlovqyf ypfxs",
                    "adress": "573 djrcwgi, przzqdgiu"
                }, 53.3, 30.81, 3.5, "Make Referral"]
            },
            {
                "id": 10,
                "options": [88187880, {
                    "img": "member2.jpg",
                    "link": "#",
                    "name": "fnrcwna frdwc",
                    "adress": "381 bxnryec, fepevsgch"
                }, {
                    "img": "member2.jpg",
                    "link": "#",
                    "social": "twitter",
                    "name": "xwfhnvm yrlno",
                    "adress": "395 ydimlxh, edcsssycx"
                }, 89.8, 24.33, 2.6,
					"Make Referral"]
            },
            {
                "id": 11,
                "options": [29696550, {
                    "img": "member2.jpg",
                    "link": "#",
                    "name": "gxoopjf swoix",
                    "adress": "155 hnttsxt, zydbwjgzr"
                }, {
                    "img": "member2.jpg",
                    "link": "#",
                    "social": "twitter",
                    "name": "ndbqmgy pwqtn",
                    "adress": "361 wrjhguz, djfwbvgex"
                }, 40.8, 99.11, 4.6,
					"Make Referral"]
            },
            {
                "id": 12,
                "options": [24839745, {
                    "img": "member2.jpg",
                    "link": "#",
                    "name": "xzdrcxy svmqm",
                    "adress": "694 gwrzmyf, wppshnzni"
                }, {
                    "img": "member2.jpg",
                    "link": "#",
                    "social": "twitter",
                    "name": "pzsqsel tpcwv",
                    "adress": "502 mtdwooa, lmabfwzll"
                }, 78.7, 65.88, 3.8,
					"Make Referral"]
            },
            {
                "id": 13,
                "options": [82952790, {
                    "img": "member2.jpg",
                    "link": "#",
                    "name": "athunza mwdrq",
                    "adress": "667 edgdtlg, lshkiqksk"
                }, {
                    "img": "member2.jpg",
                    "link": "#",
                    "social": "twitter",
                    "name": "xnatfdh rafut",
                    "adress": "658 tedmvqq, houtzwylx"
                }, 13.9, 55.37, 2.1,
					"Make Referral"]
            },
            {
                "id": 14,
                "options": [88424955, {
                    "img": "member2.jpg",
                    "link": "#",
                    "name": "bvkznxy sjwwv",
                    "adress": "613 csjihbb, bytolxhtw"
                }, {
                    "img": "member2.jpg",
                    "link": "#",
                    "social": "twitter",
                    "name": "efpbfmr dbkgn",
                    "adress": "980 yfhyecg, qeosgdiem"
                }, 83.1, 42.4, 1.1, "Make Referral"]
            },
            {
                "id": 15,
                "options": [75573733, {
                    "img": "member2.jpg",
                    "link": "#",
                    "name": "bmgemgt xoyxf",
                    "adress": "223 vapzaky, xrojtjfis"
                }, {
                    "img": "member2.jpg",
                    "link": "#",
                    "social": "twitter",
                    "name": "stgprgh ztmqa",
                    "adress": "808 rpanzek, mnkygpzyh"
                }, 20.3, 50.69, 1.5, "Make Referral"]
            },
            {
                "id": 16,
                "options": [73363590, {
                    "img": "member2.jpg",
                    "link": "#",
                    "name": "djjymvj yxikl",
                    "adress": "213 hvkrfib, tqzhbmtgp"
                }, {
                    "img": "member2.jpg",
                    "link": "#",
                    "social": "twitter",
                    "name": "rlzabrl sajln",
                    "adress": "906 cegfljk, htijyzwut"
                }, 82.4, 81.89, 4.6,
					"Make Referral"]
            },
            {
                "id": 17,
                "options": [62949887, {
                    "img": "member2.jpg",
                    "link": "#",
                    "name": "etmixck bioac",
                    "adress": "946 ludvhta, jvjuuorov"
                }, {
                    "img": "member2.jpg",
                    "link": "#",
                    "social": "twitter",
                    "name": "gaautzg oilii",
                    "adress": "258 vvliavy, orjtshboo"
                }, 38.1, 66.6, 1.4,
					"Make Referral"]
            },
            {
                "id": 18,
                "options": [62648581, {
                    "img": "member2.jpg",
                    "link": "#",
                    "name": "fxbhdjf nousf",
                    "adress": "297 qruqkwk, gdaimvkij"
                }, {
                    "img": "member2.jpg",
                    "link": "#",
                    "social": "twitter",
                    "name": "yiskwgo dhwtp",
                    "adress": "245 pgnqasw, lsmenjzwq"
                }, 99.7, 57.92, 3.4,
					"Make Referral"]
            },
            {
                "id": 19,
                "options": [87718617, {
                    "img": "member2.jpg",
                    "link": "#",
                    "name": "oascfoo jitop",
                    "adress": "753 mssfabw, qodiuurch"
                },
                    {
                        "img": "member2.jpg",
                        "link": "#",
                        "social": "twitter",
                        "name": "rpjaznl vdmtf",
                        "adress": "306 lqnyotk, wxzftffwt"
                    }, 72, 99.82, 4.2, "Make Referral"]
            }
        ]
    }
</code>

EXAMPLE Init:
<code>
dashboard.init(
$('.js-init-dashboard'),
dataJson,
{
selector: 'users_',
pagination: true,
itemsPerPage: 10,
showPagItems: 5,
options: true,
search: true
}
);
<code>
