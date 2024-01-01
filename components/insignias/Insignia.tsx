import React from 'react'
import classNames from 'classnames'
import styles from './insignias.module.scss'
import { Tooltip } from '@material-ui/core';

const Insignia = ({ data }) => {
    const { id, name, isNew } = data
    return (
        <Tooltip title={name} placement="top">
            <div className={classNames("Insignia", {
                [styles.Insignia]: true,
                [styles[id]]: true,
                [styles.new]: isNew,
            })}>
            </div>
        </Tooltip>
    );
}

export default Insignia
