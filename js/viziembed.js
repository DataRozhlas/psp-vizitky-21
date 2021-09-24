const embeds = document.getElementsByClassName('irozhlas-embed');

function share(url) {
    window.open(url, 'Sdílení', 'width=550,height=450,scrollbars=no');
};

[].forEach.call(embeds, (e) => {
    const id = e.classList[2];
    const filtered = data[id];
    if (!filtered) {
        return;
    };

    e.innerHTML = `<ul><li><div class="right"><h2><span>${filtered.jmeno}</span></h2><span class="strana">${filtered.partaj}</span><span class="supplemental">${filtered.povolani}</span>
    <span class="share">Sdílet na <a href="javascript:share('https://www.facebook.com/sharer/sharer.php?u=https://www.irozhlas.cz/volby/parlamentni-volby-2021/kandidati-vizitky/?${id}');">Facebook</a> | <a href="javascript:share('https://twitter.com/intent/tweet?text=${filtered.jmeno} (${filtered.partaj})&url=https://www.irozhlas.cz/volby/parlamentni-volby-2021/kandidati-vizitky/?${id}');">Twitter</a> | <a href="javascript:navigator.clipboard.writeText('https://www.irozhlas.cz/volby/parlamentni-volby-2021/kandidati-vizitky/?${id}')">Zkopírovat odkaz na vizitku</a></span>
    ${(filtered.afile != '' ? '<audio class="player" src="https://data.irozhlas.cz/psp-vizitky-21/media/audio/' + filtered.afile + '" preload="none" controls="yes"></audio>' : '')}</div><div class="left"><img width="120" height="180" alt="${filtered.jmeno}" src="https://data.irozhlas.cz/psp-vizitky-21/media/foto/${filtered.file}"></div></li></ul>`;
})