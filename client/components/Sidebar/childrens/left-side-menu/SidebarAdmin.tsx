import React, {FC} from 'react';
import styles from "../../SideBar.module.css"
import {classLister} from "../../../../helpers/classList";
import {openSubMenuHandler} from "../../handlers/OpenSidebarHandler";
import Link from "next/link";

type SidebarAdminType = {
}

const SidebarAdmin: FC<SidebarAdminType> = ({}) => {
    const classes = classLister(styles)

    return (
        <>
            <ul className={classes("nav-links")}>
                <li>
                    <div className={classes("iocn-link")}>
                        <a href="home">
                            <i className='bx bxs-dashboard'></i>
                            <span className={classes("link_name")}>Dashboard</span>
                        </a>
                        <i className='bx bxs-chevron-down arrow hide' onClick={openSubMenuHandler}></i>
                    </div>
                    <ul className={classes("sub-menu") + " submenu_list"}>
                        <li><a className={classes("link_name")} href="home">Dashboard</a></li>
                    </ul>
                </li>
                <li>
                    <div className={classes("iocn-link")}>
                        <a href="components/Sidebar/childrens/left-side-menu/SidebarAdmin#">
                            <i className='bx bx-collection'></i>
                            <span className={classes("link_name")}>Application</span>
                        </a>
                        <i className='bx bxs-chevron-down arrow hide' onClick={openSubMenuHandler}></i>
                    </div>
                    <ul className={classes("sub-menu") + " submenu_list"}>
                        <li><a className={classes("link_name")} href="components/Sidebar/childrens/left-side-menu/SidebarAdmin#">Application</a></li>
                        <li><Link href="/main/other/application/editor">Editor</Link></li>
                        <li><Link href="/main/other/application/mailbox">Mail Box</Link></li>
                        <li><Link href="/main/other/application/chat">Chat</Link></li>
                        <li><Link href="/main/other/application/faq">FAQ</Link></li>
                    </ul>
                </li>
                <li>
                    <div className={classes("iocn-link")}>
                        <a href="components/Sidebar/childrens/left-side-menu/SidebarAdmin#">
                            <i className='bx bx-user-plus'></i>
                            <span className={classes("link_name")}>Admins</span>
                        </a>
                        <i className='bx bxs-chevron-down arrow hide'  onClick={openSubMenuHandler}></i>
                    </div>
                    <ul className={classes("sub-menu") + " submenu_list"}>
                        <li><a className={classes("link_name")} href="components/Sidebar/childrens/left-side-menu/SidebarAdmin#">Admins</a></li>
                        <li><Link href="/main/admin/admin_list">Admin List</Link></li>
                        <li><Link href="/main/admin/add_admin">Add New Admin</Link></li>
                    </ul>
                </li>
                <li>
                    <div className={classes("iocn-link")}>
                        <a href="components/Sidebar/childrens/left-side-menu/SidebarAdmin#">
                            <i className='bx bx-sitemap'></i>
                            <span className={classes("link_name")}>Role Permission</span>
                        </a>
                        <i className='bx bxs-chevron-down arrow hide'  onClick={openSubMenuHandler}></i>
                    </div>
                    <ul className={classes("sub-menu") + " submenu_list"}>
                        <li><a className={classes("link_name")} href="components/Sidebar/childrens/left-side-menu/SidebarAdmin#">Role Permission</a></li>
                        <li><Link href="/main/admin/permission_list">Module Setting</Link></li>
                        <li><Link href="/main/admin/role_list">Role & Permission</Link></li>
                    </ul>
                </li>
                <li>
                    <div className={classes("iocn-link")}>
                        <a href="components/Sidebar/childrens/left-side-menu/SidebarAdmin#">
                            <i className='bx bx-user'></i>
                            <span className={classes("link_name")}>Users</span>
                        </a>
                        <i className='bx bxs-chevron-down arrow hide'  onClick={openSubMenuHandler}></i>
                    </div>
                    <ul className={classes("sub-menu") + " submenu_list"}>
                        <li><a className={classes("link_name")} href="components/Sidebar/childrens/left-side-menu/SidebarAdmin#">Users</a></li>
                        <li><Link href="/main/admin/user_list">User List</Link></li>
                        <li><Link href="/main/admin/add_user">Add New User</Link></li>
                    </ul>
                </li>
                <li>
                    <div className={classes("iocn-link")}>
                        <a href="/main/admin/invoice">
                            <i className='bx bx-credit-card'></i>
                            <span className={classes("link_name")}>Invoice</span>
                        </a>
                        <i className='bx bxs-chevron-down arrow hide'  onClick={openSubMenuHandler}></i>
                        <ul className={classes("sub-menu") + " submenu_list"}>
                            <li><Link href="/main/admin/invoice" className={classes("link_name")}>Invoices</Link></li>
                        </ul>
                    </div>
                </li>
                <li>
                    <div className={classes("iocn-link")}>
                        <a href="/main/admin/order">
                            <i className='bx bx-paper-plane'></i>
                            <span className={classes("link_name")}>Order</span>
                        </a>
                        <i className='bx bxs-chevron-down arrow hide'  onClick={openSubMenuHandler}></i>
                        <ul className={classes("sub-menu") + " submenu_list"}>
                            <li><Link href="/main/admin/order" className={classes("link_name")}>Orders</Link></li>
                        </ul>
                    </div>
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
                        <a href="components/Sidebar/childrens/left-side-menu/SidebarAdmin#">
                            <i className='bx bx-package'></i>
                            <span className={classes("link_name")}>Inventory</span>
                        </a>
                        <i className='bx bxs-chevron-down arrow hide'  onClick={openSubMenuHandler}></i>
                    </div>
                    <ul className={classes("sub-menu") + " submenu_list"}>
                        <li><a className={classes("link_name")} href="components/Sidebar/childrens/left-side-menu/SidebarAdmin#">Inventory</a></li>
                        <li><Link href="/main/admin/inventory_laptops">Laptops</Link></li>
                        <li><Link href="/main/admin/inventory_parts">Parts</Link></li>
                        <li><Link href="/main/admin/inventory_add_laptop">Add new Laptop</Link></li>
                        <li><Link href="/main/admin/inventory_add_part">Add new Part</Link></li>
                    </ul>
                </li>
                <li>
                    <div className={classes("iocn-link")}>
                        <a href="components/Sidebar/childrens/left-side-menu/SidebarAdmin#">
                            <i className='bx bx-color'></i>
                            <span className={classes("link_name")}>Models</span>
                        </a>
                        <i className='bx bxs-chevron-down arrow hide'  onClick={openSubMenuHandler}></i>
                    </div>
                    <ul className={classes("sub-menu") + " submenu_list"}>
                        <li><a className={classes("link_name")} href="components/Sidebar/childrens/left-side-menu/SidebarAdmin#">Models</a></li>
                        <li><Link href="/main/admin/models_laptops">Laptops</Link></li>
                        <li><Link href="/main/admin/models_parts">Parts</Link></li>
                        <li><Link href="/main/admin/models_add_laptop">Add new Laptop</Link></li>
                        <li><Link href="/main/admin/models_add_part">Add new Part</Link></li>
                    </ul>
                </li>
                {/*<li>*/}
                {/*    <div className={classes("profile-details")}>*/}
                {/*        <div className={classes("profile-content")}>*/}

                {/*        </div>*/}
                {/*        <div className={classes("name-job")}>*/}
                {/*            <div className={classes("profile_name")}>Prem Shahi</div>*/}
                {/*            <div className={classes("job")}>Web Desginer</div>*/}
                {/*        </div>*/}
                {/*        <i className='bx bx-log-out'></i>*/}
                {/*    </div>*/}
                {/*</li>*/}
            </ul>
        </>
    );
};

export default SidebarAdmin;