import { useContext, useEffect, useState } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/Countdown.module.css';

let countdownTimeout: NodeJS.Timeout;

export function Countdown(){
    const { startNewChallenge } = useContext(ChallengesContext);

    const [time, setTime] = useState(0.1 * 60);
    const [isActive, setIsAtive] = useState(false);
    const [hasFinished, setHasFinished] = useState(false);

    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('');
    const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('');

    function startCountdown(){
        setIsAtive(true);
    }

    function resetCountdow(){
        clearTimeout(countdownTimeout);
        setIsAtive(false);
        setTime(0.1 * 60);
    }

    useEffect(() => {
        if(isActive && time >0){
            countdownTimeout = setTimeout(() => {
                setTime(time-1)
            },1000)
        } else if(isActive && time === 0){
            setHasFinished(true);
            setIsAtive(false);
            startNewChallenge();
        }
    }, [isActive, time]);

    return (
        <div>
            <div className={styles.countdownContainer}>    
                <div>
                    <span>{minuteLeft}</span>
                    <span>{minuteRight}</span>
                </div>        
                <span>:</span>
                <div>
                    <span>{secondLeft}</span>
                    <span>{secondRight}</span>
                </div>       
            </div>

            { hasFinished ? (
                 <button 
                    disabled
                    className={`${styles.countdowButton} ${styles.countdowButtonSucess}`}                 
                >
                    Ciclo encerrado
                    <img src="icons/sucess.svg" /> 
                </button>
            ) : (
                <>
                    { isActive ? (
                        <button 
                            type="button" 
                            className={`${styles.countdowButton} ${styles.countdowButtonActive}`}
                            onClick={resetCountdow}
                        >
                            Abandonar ciclo
                            <img src="icons/close.svg" />
                        </button>
                    ) : (
                        <button 
                        type="button" 
                        className={styles.countdowButton}
                        onClick={startCountdown}
                    >
                        Iniciar um ciclo  
                        <img src="icons/arrow-right.svg" />
                    </button>
                    ) }
                </>
            )}
            
        </div>
    );
}