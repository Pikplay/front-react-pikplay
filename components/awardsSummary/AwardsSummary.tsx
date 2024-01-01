import React, { useEffect, useState } from 'react'
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide } from "@material-ui/core";
import Medals from '../medals/Medals'
import confetti from 'canvas-confetti'
import ReactTyped from 'react-typed'
import styles from './styles.module.scss'
import zIndex from '@material-ui/core/styles/zIndex';
import CoinIcon from '../CoinIcon/CoinIcon';
import Button from '../button/Button'
import { animatePrince } from '../../lib/utils'
import classNames from 'classnames';
import ProfileSummaryExperience from '../profileSummaryExperience/ProfileSummaryExperience';
import { motion, AnimatePresence } from "framer-motion"
import SpecialButton from '../specialButton/SpecialButton';

const AwardsSummary = ({ callback }) => {

    const gainedCoins = 5
    const currentUserCoins = 10

    const startConfetti = () => {
        var count = 200;
        var defaults = {
            origin: { y: 0.7 },
            zIndex: 1301
        };

        function fire(particleRatio, opts) {
            confetti({
                ...defaults,
                ...opts,
                particleCount: Math.floor(count * particleRatio)
            });
        }

        fire(0.25, {
            spread: 26,
            startVelocity: 55,
        });
        fire(0.2, {
            spread: 60,
        });
        fire(0.35, {
            spread: 100,
            decay: 0.91,
            scalar: 0.8
        });
        fire(0.1, {
            spread: 120,
            startVelocity: 25,
            decay: 0.92,
            scalar: 1.2
        });
        fire(0.1, {
            spread: 120,
            startVelocity: 45,
        });
        confetti({ ...defaults })
    }

    useEffect(() => {
        setTimeout(() => {
            startConfetti()
        }, 500)
    }, [])

    const handleUpdateExperience = () => {
        handlePickRewardUp()
        callback(1)
    }

    const message = "Recibiste 5 Pikcoins para redimir en productos de la tienda JuanchoFenix. ¡Felicitaciones!"
    const handlePickRewardUp = () => {
        // Sumando coins al Coins del header
        const element = document.querySelector('#PreviewProfile--Coins .number-coins')
        const fromNumber = element?.innerHTML
        const targetNumber = currentUserCoins + gainedCoins
        animatePrince(element, targetNumber, fromNumber)

        // Restando coins
        const secondElement = document.querySelector('#AwardsSummary .number-coins')
        animatePrince(secondElement, 0, gainedCoins)
    }

    return (
        <>
            <div>
                <div className={styles.title}>
                    ¡Nueva liga!
                </div>
                <div className={styles.subtitle}>
                    BRONCE
                </div>
                <div className={styles.experienceGained}>
                    <b>5%</b>
                    &nbsp;
                    Experiencia Obtenida
                </div>
                <div className={styles.image1}>
                    <CoinIcon coins={gainedCoins} />
                    {/* <Medals medal={"bronze"} /> */}
                </div>
            </div>
            <div className={styles.box}>
                <img src="/images/type_notification/coupon_gift_available.png" alt="bronze" />
                <p className={styles.description}>
                    <ReactTyped strings={[message]} typeSpeed={20} />
                </p>
            </div>

            <DialogActions>
                <button className={styles.main_button} color="modal" onClick={handleUpdateExperience}>
                    RECOGER PREMIOS...
                </button>
            </DialogActions>
        </>
    )
}

const variants = {
    enter: (direction: number) => {
        return {
            x: direction > 0 ? 100 : -100,
            opacity: 0
        };
    },
    center: {
        zIndex: 1,
        x: 0,
        opacity: 1
    },
    exit: (direction: number) => {
        return {
            zIndex: 0,
            x: direction < 0 ? 100 : -100,
            opacity: 0
        };
    }
}

const ModalComponent = (props) => {
    const { setSummaryAwardsOpen } = props
    const [[page, direction], setPage] = useState([0, 0]);
    const Transition = React.forwardRef(function Transition(props, ref) {
        return <Slide direction="left" ref={ref} {...props} />;
    })

    const callback = (number) => {
        // setTimeout(() => {
        setPage([number, 1])
        // }, 1000)
    }

    return <Dialog
        open={true}
        TransitionComponent={Transition}
        onClose={() => setSummaryAwardsOpen(false)}
    >
        <DialogContent>
            <div id="AwardsSummary" className={styles.AwardsSummary}>
                <div className={styles.bg_city}></div>
                <DialogContentText id="alert-dialog-slide-description" className={styles.content}>
                    <AnimatePresence initial={true} custom={direction}>
                        {page === 0 && <AwardsSummary callback={callback} />}
                        {page === 1 && <PreviewProfileSummaryExperience
                            gainExperience={200}
                            callback={callback}
                            setSummaryAwardsOpen={setSummaryAwardsOpen}
                        />}
                    </AnimatePresence>
                </DialogContentText>
            </div>
        </DialogContent>
    </Dialog>
}

const PreviewProfileSummaryExperience = ({ callback, setSummaryAwardsOpen, gainExperience }) => {
    return <motion.div variants={variants}>
        <ProfileSummaryExperience gainExperience={gainExperience} />
        <DialogActions>
            <button className={styles.main_button} onClick={() => callback(0)}>
                Atras
            </button>
            <button className={styles.main_button}>
                CONTINUAR...
            </button>
        </DialogActions>
    </motion.div>
}

export default ModalComponent;
