import React from 'react';
import fourbrickkatalog from './../assets/4brickkatalog.png';
import sixbrickskatalog from './../assets/6brickskatalog.png';

const Sidebar = () => (
    <div id="frame1">
        <div
            type="text/javascript"
            id="hde-kb-widget"
            data-host="hatterkeys.helpdeskeddy.com"
            data-lang="ru"
        ></div>
        <div id="aside">
            <div id="sections">
                <img src={fourbrickkatalog} id="sectionsimg" alt="sections" />
                <div id="sectionstext">Разделы</div>
                <div id="sectionstext1">
                    <a href="https://steamcommunity.com/id/moi_gospodin/">
                        Steam
                    </a>
                </div>
                <div id="sectionstext2">
                    <a href="https://www.ubisoft.com/ru-ru/">Uplay</a>
                </div>
                <div id="sectionstext3">
                    <a href="https://www.origin.com/rus/ru-ru/store">Origin</a>
                </div>
                <div id="sectionstext4">
                    <a href="https://www.epicgames.com/store/ru/">EGS</a>
                </div>
            </div>
            <div id="categories">
                <img
                    src={sixbrickskatalog}
                    id="categoriesimg"
                    alt="categories"
                />
                <div id="categoriestext">Категории</div>
                <div id="categoriestext1">
                    <a href="https://www.youtube.com/watch?v=bJ1wGeNIeC8&ab_channel=EthanBlue">
                        Дешевле 100 руб
                    </a>
                </div>
                <div id="categoriestext2">
                    <a href="https://www.youtube.com/watch?v=X8HSnP1SiI0&ab_channel=ACGTA">
                        Дешевле 300 руб
                    </a>
                </div>
                <div id="categoriestext3">
                    <a href="https://www.youtube.com/watch?v=ZNldWPTJlFE&ab_channel=memesbycowbelly">
                        Дешевле 500 руб
                    </a>
                </div>
                <div id="categoriestext4">
                    <a href="https://www.youtube.com/watch?v=_czzkqPjvS4&ab_channel=shidbot420">
                        Одиночная
                    </a>
                </div>
                <div id="categoriestext5">
                    <a href="https://www.youtube.com/watch?v=hIYiovihEeU&ab_channel=Ahao">
                        Мультиплеер
                    </a>
                </div>
            </div>
        </div>
    </div>
);

export default Sidebar;
