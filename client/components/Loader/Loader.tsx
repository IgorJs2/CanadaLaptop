import React, {useEffect} from 'react';
import {classLister} from "../../helpers/classList";
import styles from "./style.module.css"


const Loader = () => {

    const classList = classLister(styles)

    return (
        <div className="w-full hfull bg-main-dark-2 flex justify-center items-center pb-96 text-5xl">
            <h1 className={classList("loader-h1")}>
                <span className={classList("let1", "loader-span")}>l</span>
                <span className={classList("let2", "loader-span")}>o</span>
                <span className={classList("let3", "loader-span")}>a</span>
                <span className={classList("let4", "loader-span")}>d</span>
                <span className={classList("let5", "loader-span")}>i</span>
                <span className={classList("let6", "loader-span")}>n</span>
                <span className={classList("let7", "loader-span")}>g</span>
            </h1>
        </div>
    );
};

export default Loader;