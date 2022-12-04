import React, {FC} from 'react';
import styles from "../../SideBar.module.css"
import {classLister} from "../../../../helpers/classList";
import {openSubMenuHandler} from "../../handlers/OpenSidebarHandler";
import Link from "next/link";

const SidebarWorker = () => {
    const classes = classLister(styles)

    return (
        <>
            <ul className={classes("nav-links")}>
                <li>
                    <div className={classes("iocn-link")}>
                        <a href="">
                            <i className='bx bx-collection'></i>
                            <span className={classes("link_name")}>Application</span>
                        </a>
                        <i className='bx bxs-chevron-down arrow hide' onClick={openSubMenuHandler}></i>
                    </div>
                    <ul className={classes("sub-menu") + " submenu_list"}>
                        <li><a className={classes("link_name")} href="">Application</a></li>
                        <li><Link href="/main/other/application/editor">Editor</Link></li>
                        <li><Link href="/main/other/application/mailbox/index">Mail Box</Link></li>
                        <li><Link href="/main/other/application/chat">Chat</Link></li>
                        <li><Link href="/main/other/application/faq">FAQ</Link></li>
                    </ul>
                </li>
                <li>
                    <div className={classes("iocn-link")}>
                        <a href="/main/other/board">
                            <i className='bx bx-clipboard'></i>
                            <span className={classes("link_name")}>Board</span>
                        </a>
                        <i className='bx bxs-chevron-down arrow hide'  onClick={openSubMenuHandler}></i>
                        <ul className={classes("sub-menu") + " submenu_list"}>
                            <li><Link className={classes("link_name")} href="/main/other/board">Board</Link></li>
                        </ul>
                    </div>
                </li>
                <li>
                    <div className={classes("iocn-link")}>
                        <a href="/main/other/calendar">
                            <i className='bx bx-calendar'></i>
                            <span className={classes("link_name")}>Calender</span>
                        </a>
                        <i className='bx bxs-chevron-down arrow hide'  onClick={openSubMenuHandler}></i>
                        <ul className={classes("sub-menu") + " submenu_list"}>
                            <li><Link className={classes("link_name")} href="/main/other/calendar">Calender</Link></li>
                        </ul>
                    </div>
                </li>
                <li>
                    <div className={classes("iocn-link")}>
                        <a href="">
                            <i className='bx bx-package'></i>
                            <span className={classes("link_name")}>Inventory</span>
                        </a>
                        <i className='bx bxs-chevron-down arrow hide'  onClick={openSubMenuHandler}></i>
                    </div>
                    <ul className={classes("sub-menu") + " submenu_list"}>
                        <li><a className={classes("link_name")} href="">Inventory</a></li>
                        <li><Link href="/main/seller/priority">Priority</Link></li>
                        <li><Link href="/main/seller/parts">Parts</Link></li>
                    </ul>
                </li>
                <li>
                    <div className={classes("iocn-link")}>
                        <a href="">
                            <i className='bx bx-color'></i>
                            <span className={classes("link_name")}>Models</span>
                        </a>
                        <i className='bx bxs-chevron-down arrow hide'  onClick={openSubMenuHandler}></i>
                    </div>
                    <ul className={classes("sub-menu") + " submenu_list"}>
                        <li><a className={classes("link_name")} href="">Models</a></li>
                        <li><Link href="/main/seller/partmodels">Parts</Link></li>
                    </ul>
                </li>
                <li>
                    <div className={classes("iocn-link")}>
                        <a href="">
                            <i className='bx bx-package'></i>
                            <span className={classes("link_name")}>Actions</span>
                        </a>
                        <i className='bx bxs-move arrow hide'  onClick={openSubMenuHandler}></i>
                    </div>
                    <ul className={classes("sub-menu") + " submenu_list"}>
                        <li><a className={classes("link_name")} href="">Actions</a></li>
                        <li><Link href="/main/seller/send">Send</Link></li>
                        <li><Link href="/main/seller/return">Return</Link></li>
                    </ul>
                </li>
            </ul>
        </>
    );
};

export default SidebarWorker;