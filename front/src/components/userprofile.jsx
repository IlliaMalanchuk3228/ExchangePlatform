import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import axios from 'axios';
import { Link } from 'react-router-dom';
import backendurl from '../config';
import Spinner from '../shared/LoadingSpinner.js';
import GameList from './GameList';
import Modal from '../components/Modal';
import sitelogo from '../assets/logo.png';
const UserProfile = () => {
    const storage = localStorage.getItem('userData');
    if (!storage)
        return (
            <Link to="/" exact component={GameList}>
                {' '}
            </Link>
        );
    const { token, userId } = JSON.parse(storage);
    const [user, setUser] = useState(null);
    const [inventory, setInventory] = useState([]);
    const [offers, setOffers] = useState(null);
    const [loading, setloading] = useState(false);
    const [tradeLink, setTradeLink] = useState('');
    const [modalActive, setModalActive] = useState(false);
    const [currentGame, setCurrentGame] = useState(null);
    const [offerPrice, setOfferPrice] = useState(null);

    const createOffer = () => {
        axios
            .post(
                backendurl + '/offer/create',
                {
                    creatorid: userId,
                    gameid: currentGame.toString(),
                    price: offerPrice,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
            .then(() => {
                window.location.reload();
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                setloading(false);
            });
    };

    const deleteOffer = (offerId) => {
        axios
            .post(backendurl + '/offer/' + offerId, {userId},{
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
                console.log('getting deleteing offer', res);
                window.location.reload();
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                setloading(false);
            });
    };

    const changeTradeLink = () => {
        setloading(true);
        axios
            .put(
                backendurl + '/myaccount/' + userId,
                { trade_link: tradeLink },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
            .then((res) => {
                console.log(res);
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
            .get(backendurl + '/myaccount/' + userId, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
                setUser(res.data.user);
                setInventory(res.data.inventory);
                setTradeLink(res.data.user.trade_link);
                setloading(false);
            })
            .catch((err) => {
                console.log(err);
                setloading(false);
            })
            .finally(() => {
                setloading(false);
            });
        axios
            .get(backendurl + '/offer/byUser/' + userId)
            .then((res) => {
                console.log('offers: ', res.data);
                setOffers(res.data);
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
            {loading && <Spinner />}

            {!loading && (
                <>
                    <div
                        type="text/javascript"
                        id="hde-kb-widget"
                        data-host="hatterkeys.helpdeskeddy.com"
                        data-lang="ru"
                    ></div>
                    <div id="gamepage">
                        <div id="frame2">
                            <div id="avatar">
                                <img src={user?.ava_link} />
                            </div>
                            <div
                                style={{
                                    marginTop: '300px',
                                    marginLeft: '30%',
                                }}
                            >
                                <h1>Balance: {user?.balance}$</h1>
                            </div>
                            <a href="https://steamcommunity.com/tradeoffer/new/?partner=127482772&token=C5-x5yNt">
                                <div
                                    style={{
                                        marginTop: '10px',
                                        marginLeft: '30%',
                                    }}
                                >
                                    <button className="myButton">
                                        Добавить игру
                                    </button>
                                </div>
                            </a>
                        </div>

                        <div id="profilename">{user?.steam_name}</div>
                        <div id="Alloffers1"> Ссылка на обмен:</div>
                        <div id="lookinsteam1">
                            <input
                                onChange={(event) => {
                                    setTradeLink(event.target.value);
                                }}
                                value={tradeLink}
                                size="40"
                            />
                        </div>
                        <div id="lookinsteam2">
                            <input
                                type="submit"
                                onClick={changeTradeLink}
                                value="Cохранить"
                                id="searchblank1"
                            />
                        </div>
                        <div id="genres1"> Инвентарь:</div>
                        <div id="inventory">
                            {inventory &&
                                inventory.map((game) => {
                                    console.log(game);
                                    return (
                                        <>
                                            <div id="inventory_card">
                                                <div id="card1img">
                                                    <img
                                                        src={game?.imagelink}
                                                    />
                                                </div>
                                                <div
                                                    style={{
                                                        marginTop: '10px',
                                                    }}
                                                >
                                                    <button
                                                        onClick={() => {
                                                            setModalActive(
                                                                true
                                                            );
                                                            setCurrentGame(
                                                                game.gameid
                                                            );
                                                        }}
                                                        className="myButton"
                                                    >
                                                        Создать предложение
                                                    </button>
                                                </div>
                                            </div>
                                        </>
                                    );
                                })}
                        </div>
                        <div id="genres2"> Предложения:</div>
                        <div id="userOffer">
                            {offers?.map((offer) => (
                                <>
                                    <div id="user_offer_card">
                                        <div id="card1img">
                                            <img
                                                src={offer?.imagelink}
                                                alt={offer?.title}
                                            />
                                        </div>
                                        <div style={{ marginTop: '10px' }}>
                                            {offer?.title}
                                        </div>
                                        <div style={{ marginTop: '10px' }}>
                                            <button
                                                onClick={() => {
                                                    deleteOffer(offer.orderid);
                                                }}
                                                className="myButton"
                                            >
                                                Удалить предложение
                                            </button>
                                        </div>
                                    </div>
                                </>
                            ))}
                        </div>
                    </div>
                    <Modal active={modalActive} setActive={setModalActive}>
                        <div id="modalcontent">
                            <div>
                                {' '}
                                <img
                                    src={sitelogo}
                                    alt="logo"
                                    className="gamepageimg"
                                />
                            </div>
                            <div id="sellprice">Введите цену продажи:</div>
                            <div>
                                <input
                                    type="number"
                                    onChange={(event) => {
                                        setOfferPrice(event.target.value);
                                    }}
                                    name="name"
                                    id="searchblank1"
                                />
                            </div>
                            <input
                                type="Submit"
                                onClick={() => {
                                    createOffer();
                                }}
                                value="Продать"
                                id="sellbutton"
                            />
                        </div>
                    </Modal>
                    <Footer />
                </>
            )}
        </>
    );
};

export default UserProfile;
