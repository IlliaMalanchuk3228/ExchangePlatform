import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';

import SignInButton from './SignInButton';
import { AuthContext } from '../../context/auth-context';
import sitelogo from '../../assets/logo.png';
import Modal from '../../components/Modal';
import Chat from '../Chat';

const Header = () => {
    const [modalActive, setModalActive] = useState(false);
    const { isLoggedIn } = useContext(AuthContext);
    return (
        <>
            <div id="site_title_bar_wrapper">
                <div id="site_title_bar">
                    <div id="menu">
                        <Link to="/">
                            <div id="general">
                                <div id="general1">Главная</div>
                            </div>
                        </Link>{' '}
                        <Link to="/Warranty">
                            <div id="warranty">
                                <div id="warranty1">Гарантии</div>
                            </div>
                        </Link>
                        <div id="review" onClick={() => setModalActive(true)}>
                            <div id="review1">Отзывы</div>
                        </div>
                        {isLoggedIn ? (
                            <Link to="/userprofile">
                                {' '}
                                <div id="help">
                                    <div id="help1">Профиль</div>
                                </div>
                            </Link>
                        ) : (
                            <SignInButton />
                        )}
                        <div
                            type="text/javascript"
                            id="hde-kb-widget"
                            data-host="hatterkeys.helpdeskeddy.com"
                            data-lang="ru"
                        ></div>
                        <Link to="/">
                            <div id="site_title">
                                <div>
                                    <img
                                        src={sitelogo}
                                        alt="logo"
                                        className="logo"
                                    />
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>

            <Modal active={modalActive} setActive={setModalActive}>
                <div id="form">
                    <Chat></Chat>
                </div>
            </Modal>
        </>
    );
};

export default Header;
