var host;
if (location.href.split('?')[0].indexOf('irozhlas') == -1) {
    host = location.href.split('?')[0];
} else {
    host = 'https://data.irozhlas.cz/psp-vizitky-21/';
}

function share(url) {
    window.open(url, 'Sdílení', 'width=550,height=450,scrollbars=no');
};

var muNames = {
    'Praha': '1',
    'Středočeský': '2',
    'Jihočeský': '3',
    'Plzeňský': '4',
    'Karlovarský': '5',
    'Ústecký': '6',
    'Liberecký': '7',
    'Královéhradecký': '8',
    'Pardubický': '9',
    'Vysočina': '10',
    'Jihomoravský': '11',
    'Olomoucký': '12',
    'Zlínský': '13',
    'Moravskoslezský': '14',
};

//social sharing
function makeSelect() {
    var id = location.href.split('?')[1];
    if (id != null) {
        var filtered = data[id]

        if (!filtered) {
            return;
        }

        var out = '<h1>Kraj ' + Object.keys(muNames)[parseInt(id.split('_')[0]) - 1] + '</h1><ul>';
        out += '<li><div class="right"><h2><span class="cislo">'
            + id.split('_')[1]
            + '</span> <span>'
            + filtered.jmeno
            + '</span></h2><span class="strana">'
            + filtered.partaj
            + '</span> <span class="supplemental">'
            + filtered.povolani
            + (filtered.pozn != null ? '<div><span class="supplemental">' + filtered.pozn + '</span></div>' : '')
            + '</span>'
            + (filtered.afile != '' ? '<div><audio class="player" src="' + host + 'media/audio/' + filtered.afile + '" preload="none" controls="yes"></audio></div>' : '')
            + '</div><div class="left"><img width="120" height="180" alt="'
            + filtered.jmeno
            + '" src="'
            + host + 'media/foto/'
            + filtered.file
            + '"></div></li>'
        out += '</ul>'
        $('.linked').html(out);
    }
}

function makeTable(obvod) {
    $('.linked').html('');
    var out = '<h1>Kraj ' + obvod + '</h1><ul>';
    if (!Object.keys(muNames).includes(obvod)) {
        out += 'Vizitky se připravují.'
    }
    var mID = muNames[obvod]
    var sel = Object.keys(data).filter((e) => e.split('_')[0] === mID)
    sel.sort((a, b) => parseInt(a.split('_')[1]) - parseInt(b.split('_')[1]))
    sel.forEach((per) => {
        out += '<li><div class="right"><h2><span class="cislo">'
            + per.split('_')[1]
            + '</span><span>'
            + data[per].jmeno
            + '</span></h2><span class="strana">'
            + data[per].partaj
            + '</span> <span class="supplemental">'
            + data[per].povolani
            + (data[per].pozn != null ? '<div><span class="supplemental">' + data[per].pozn + '</span></div>' : '')
            + '</span>'
            + '<span class="share">Sdílet na <a href="javascript:share(\'https://www.facebook.com/sharer/sharer.php?u=' + location.href.split('?')[0] + '?' + per + '\');'
            + '">Facebook</a> | <a href="javascript:share(\'https://twitter.com/intent/tweet?text=' + data[per].jmeno + ' (' + data[per].partaj + ') ' + '&url='
            + location.href.split('?')[0] + '?' + per + '\');">Twitter</a> | <a href="javascript:navigator.clipboard.writeText(\'https://www.irozhlas.cz/volby/parlamentni-volby-2021/kandidati-vizitky/?'
            + per + '\')">Zkopírovat odkaz na vizitku</a></span>'
            + (data[per].afile != '' ? '<div><audio class="player" src="' + host + 'media/audio/' + data[per].afile + '" preload="none" controls="yes"></audio></div>' : '')
            + '</div><div class="left"><img width="120" height="180" alt="'
            + data[per].jmeno
            + '" src="'
            + host + 'media/foto/'
            + data[per].file
            + '"></div></li>'
    })
    out += '</ul>'
    document.getElementById('bottom').innerHTML = out;
    $('.player').click(function () {
        var kandId = this.src.split('/').slice(-1)[0].split('.')[0];
        ga('gtm1.send', 'event', 'ondemand', 'play', 'Sněmovní volby 2021 - vizitka kandidáta ' + kandId);
    });
}

var mapka;

function selectMap(kraj) {
    if (kraj != undefined) {
        mapka.series[0].data.forEach(function (e) {
            if (e.NAZ_CZNUTS3 == kraj) {
                mapka.series[0].data[mapka.series[0].data.indexOf(e)].select(true, false)
            }
        })
    }
};

var obvodyInfo = [];
Object.values(obvody.features).forEach(function (e) {
    obvodyInfo.push({ 'NAZ_CZNUTS3': e.properties.NAZ_CZNUTS3 })
});

mapka = Highcharts.mapChart('container', {
    title: {
        text: ''
    },
    subtitle: {
        align: 'center',
        useHTML: true,
        text: '<i>kliknutím do mapy vyberte kraj</i>'
    },
    legend: {
        enabled: false
    },
    credits: {
        enabled: false
    },
    plotOptions: {
        series: {
            allowPointSelect: false,
            states: {
                hover: {
                    color: '#ab0000',
                    brightness: 0.2,
                    enabled: true
                },
                select: {
                    color: '#ab0000'
                }
            }
        }
    },
    series: [{
        type: 'map',
        color: '#08519c',
        tooltip: {
            headerFormat: '',
            pointFormat: 'Kraj {point.NAZ_CZNUTS3}'
        },
        data: obvodyInfo,
        mapData: obvody,
        name: ' ',
        joinBy: ['NAZ_CZNUTS3', 'NAZ_CZNUTS3'],
        events: {
            click: function (e) {
                if ('point' in e.target) {
                    makeTable(e.target.point.properties.NAZ_CZNUTS3)
                    $('#select select').val(e.target.point.properties.NAZ_CZNUTS3).change();
                }
            },
            touchstart: function (e) {
                if ('point' in e.target) {
                    makeTable(e.target.point.properties.NAZ_CZNUTS3)
                    $('#select select').val(e.target.point.properties.NAZ_CZNUTS3).change();
                }
            }
        }
    }]
});

var selHTML = '<select><option value="#">Vyberte kraj...</option>'
obvody.features.forEach(function (e) {
    selHTML += `<option value="${e.properties.NAZ_CZNUTS3}">Kraj ${e.properties.NAZ_CZNUTS3}</option>`
})
selHTML += '</select>'
document.getElementById('select').innerHTML = selHTML;

document.getElementById('select').addEventListener('change', function (e) {
    if (e.target.value != '#') {
        selectMap(e.target.value)
        makeTable(e.target.value)
    }
})

makeSelect()