"use client";

import React, { useEffect } from "react";
import { useNavigation } from "../utils/navigationContext";
import {
    motion,
    useAnimate,
    usePresence,
    AnimationSequence,
    Spring,
} from "framer-motion";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import styles from "../css/about.module.css";

import Welcome from "../components/About/Welcome";
import Manifest from "../components/About/Manifest";
import Process from "../components/About/Process";
import Services from "../components/About/Services";
import PreFooterLink from "../components/PreFooterLink";
import VideoDispatcher from "../components/Home/VideoDispatcher";
import { Category } from "@/app/Strapi/interfaces/Entities/Category";
import { Project } from "../Strapi/interfaces/Entities/Project";
import dynamic from "next/dynamic";

const Footer = dynamic(() => import("../components/footer"), { ssr: false });

type Props = {
    projects: Project[];
    categories: Category[];
};

const transitionSpringPhysics: Spring = {
    type: "spring",
    mass: 0.5,
    stiffness: 20,
    damping: 2,
};

export const AboutView = (props: Props) => {
    const { navigationEvent } = useNavigation();
    const pathname = usePathname();
    const [isPresent, safeToRemove] = usePresence();
    const [scope2, animate] = useAnimate();
    const [scope3] = useAnimate();

    const router = useRouter();

    useEffect(() => {
        const sequence: AnimationSequence = [
            [
                scope2.current,
                { height: "0%", top: "50%", backgroundColor: "black" },
                { duration: 0.4 },
            ],
            [
                scope3.current,
                { height: "0%", bottom: "50%", backgroundColor: "black" },
                { at: "<", duration: 0.4 },
            ],
        ];

        animate(sequence);
        return () => {
            if (!isPresent) {
                safeToRemove();
            }
        };
    });

    useEffect(() => {
        if (navigationEvent.href !== pathname) {
            const sequence: AnimationSequence = [
                [
                    scope2.current,
                    { height: "51%", top: "0", backgroundColor: "black" },
                    { duration: 0.4 },
                ],
                [
                    scope3.current,
                    { height: "51%", bottom: "0", backgroundColor: "black" },
                    { at: "<", duration: 0.4 },
                ],
            ];

            animate(sequence).then(() => {
                router.push(navigationEvent.href);
            });
        }
    }, [navigationEvent, pathname]);

    return (
        <motion.div
            key={pathname}
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 1 }}
            className={styles.main}
        >
            <motion.div
                ref={scope2}
                style={{
                    width: "100%",
                    height: "52%",
                    position: "fixed",
                    zIndex: 50,
                    left: 0,
                    top: 0,
                }}
                transition={transitionSpringPhysics}
                className="courtain"
            />
            <motion.div
                ref={scope3}
                style={{
                    width: "100%",
                    height: "52%",
                    zIndex: 50,
                    position: "fixed",
                    left: 0,
                    bottom: 0,
                }}
                transition={transitionSpringPhysics}
                className="courtain"
            />
            <Welcome />
            <VideoDispatcher section="about" />
            <Services categories={props.categories} projects={props.projects} />
            <Manifest />
            <Process />
            <PreFooterLink href="/projects" text="PROYECTOS" />
            <Footer />
        </motion.div>
    );
};
