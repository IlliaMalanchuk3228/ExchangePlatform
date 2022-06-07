import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Switch, Route, Link } from 'react-router-dom';
import Game1 from '../components/Game1';
import backendurl from '../config';
import Spinner from '../shared/LoadingSpinner.js';

const GameList = () => {
    const [loading, setloading] = useState(false);
    const [games, setGames] = useState(null);
    const [searchgames, setSearchGames] = useState('');

    const updateStateValue = () => {
        console.log(searchgames);
        setloading(true);
        axios
            .post(`${backendurl}/game/search`, { gameName: searchgames })
            .then((res) => {
                console.log(res);
                setGames(res.data);
                setloading(false);
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                setloading(false);
            });
    };

    useEffect(() => {
        setloading(true);
        axios
            .get(`${backendurl}/game/page?page=1`)
            .then((res) => {
                console.log(res);
                setGames(res.data);
                setloading(false);
            })
            .catch((err) => {
                console.log(err);
                setloading(false);
            })
            .finally(() => {
                setloading(false);
            });
    }, []);

    return (
        <>
            <div
                type="text/javascript"
                id="hde-kb-widget"
                data-host="hatterkeys.helpdeskeddy.com"
                data-lang="ru"
            ></div>
            {loading && <Spinner />}
            {!loading && (
                <div id="site_title_bar_wrapper1">
                    <div id="navbar2">
                        <div id="menu2">
                            <div id="search"></div>
                            <div id="search1">
                                <input
                                    type="search"
                                    name="q"
                                    placeholder="Поиск по сайту"
                                    value={null}
                                    id="searchblank"
                                    onChange={(event) => {
                                        setSearchGames(event.target.value);
                                    }}
                                />
                                <input
                                    type="submit"
                                    value="Найти"
                                    id="searchblank"
                                    onClick={updateStateValue}
                                />
                            </div>
                            <div id="sort">
                                {' '}
                                <div id="sort1">
                                    Сортировка:
                                    <a className="arrow arrow-up" href="#">
                                        по возрастанию
                                    </a>
                                    <a className="arrow arrow-down" href="#">
                                        по убыванию
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <div id="cards">
                {games &&
                    games.map((game) => (
                        <>
                            <Link to={'/games/' + game.gameid}>
                                <div id="card1">
                                    <div id="card1img">
                                        <img
                                            src={game.imagelink}
                                            alt={game.title}
                                        />
                                    </div>
                                    <div id="card1txt">{game.title}</div>
                                </div>
                            </Link>
                        </>
                    ))}
            </div>

            <Switch>
                <Route exact path="/games/:id" component={Game1} />
            </Switch>
        </>
    );
};

(function () {
    function a() {
        var b = document.createElement('script');
        b.charset = 'utf-8';
        b.src = '//hatterkeys.helpdeskeddy.com/custom/kb-widget-init.js';
        b.type = 'text/javascript';
        b.async = !0;
        var a = document.getElementById('hde-kb-widget');
        a.parentNode.insertBefore(b, a);
    }

    window.attachEvent
        ? window.attachEvent('onload', a)
        : window.addEventListener('load', a, !1);
})();

export default GameList;
