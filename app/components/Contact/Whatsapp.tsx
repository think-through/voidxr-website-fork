import React from "react";
import { motion } from "framer-motion";
import styles from "../../css/contact/main.module.css";
import Image from "next/image";
import wArrow from "../../../public/images/arrow.svg";

const Whatsapp = () => {
    return (
        <motion.div className={`${styles.section} ${styles.section_1}`}>
            <motion.div className={styles.description}>
                <p className={styles.title}>¿Quieres hablar?</p>
                <p className={styles.text}>Contactanos por Whatsapp</p>
            </motion.div>
            <motion.div className={styles.buttons_wrapper}>
                <button className={styles.button_1}>WHATSAPP</button>
                <button className={styles.button_2}>
                    <Image
                        className={styles.arrow_button}
                        width={1000}
                        height={1000}
                        src={wArrow}
                        alt="arrow"
                    />
                </button>
            </motion.div>
        </motion.div>
    );
};

export default Whatsapp;
