import React from 'react';
import style from './style/login.module.css';

function Spinner() {
    return (
        <div className={style.skChase}>
            <div className={style.skChaseDot}></div>
            <div className={style.skChaseDot}></div>
            <div className={style.skChaseDot}></div>
            <div className={style.skChaseDot}></div>
            <div className={style.skChaseDot}></div>
            <div className={style.skChaseDot}></div>
        </div>
    );
}

export default Spinner;
