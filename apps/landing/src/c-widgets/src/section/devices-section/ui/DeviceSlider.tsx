'use client';

import { useState } from "react";
import Image from "next/image";
import styled from "styled-components";
import { AnimatePresence, motion } from "framer-motion";

import { ReactComponent as TabletIcon} from '../assets/desktop.svg';
import { ReactComponent as MobileIcon} from '../assets/mobile.svg';
import{ ReactComponent as  DeskIcon }from '../assets/tablet.svg';
import { DeviceType } from "../interface/DeviceType";
import { Breakpoint, ButtonStyleEnum, mediaBreakpointDown, vw } from "@freelbee/shared/ui-kit";
import { IconButton } from '@freelbee/features/common';

import desktopSrc from "@landing/assets/images/main/devices/desktop.png";
import tabletSrc from "@landing/assets/images/main/devices/tablet.png";
import mobileSrc from "@landing/assets/images/main/devices/mobile2.png";

const appearence = {
    initial: { opacity: 0, x: '100px' },
    animate: { opacity: 1, x: '0px' },
    exit: { opacity: 0, x: '-100px' },
    transition: { bounce: 0 },
};

export const DeviceSlider = () => {
    const [current, setCurrent] = useState<DeviceType>(DeviceType.DESKTOP);

    const Slides = {
        [DeviceType.DESKTOP]: <DesktopWrapper {...appearence} key={DeviceType.DESKTOP}>
            <Image
              src={desktopSrc}
              alt='desktop' fill />
        </DesktopWrapper>,
        [DeviceType.TABLET]: <TabletWrapper {...appearence} key={DeviceType.TABLET}>
            <Image src={tabletSrc} alt='tablet' fill />
        </TabletWrapper>,
        [DeviceType.MOBILE]: <MobileWrapper {...appearence} key={DeviceType.MOBILE}>
            <Image src={mobileSrc} alt='mobile' fill />
        </MobileWrapper>,
    };

    return (
        <Container>
            <NavContainer>
                <IconButton
                    onClick={() => setCurrent(DeviceType.DESKTOP)}
                    styleType={ButtonStyleEnum.ROUND_STROKE_WHITE}
                    Icon={<DeskIcon/>}
                    label="desktop image" />
                <IconButton
                    onClick={() => setCurrent(DeviceType.TABLET)}
                    styleType={ButtonStyleEnum.ROUND_STROKE_WHITE}
                    Icon={<TabletIcon/>}
                    label="tablet image" />
                <IconButton
                    onClick={() => setCurrent(DeviceType.MOBILE)}
                    styleType={ButtonStyleEnum.ROUND_STROKE_WHITE}
                    Icon={<MobileIcon/>}
                    label="mobile image" />
            </NavContainer>

            <SliderWrapper>
                <AnimatePresence>
                    {Slides[current]}
                </AnimatePresence>
            </SliderWrapper>
        </Container>
    );
};

const Container = styled.div`
    height: 730px;

    ${mediaBreakpointDown(Breakpoint.Medium)} {
        height: ${(vw(700, Breakpoint.Medium))};
    }

    ${mediaBreakpointDown(Breakpoint.Tablet)} {
        height: ${(vw(730, Breakpoint.Tablet))};
        width: 100%;
        overflow: hidden;
    }

    ${mediaBreakpointDown(Breakpoint.xMobile)} {
        height: ${(vw(730, Breakpoint.xMobile))};
    }
`;


const SliderWrapper = styled.div`
    position: relative;
`;


const NavContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 8px;
  margin-bottom: 40px;
  margin-left: 370px;

    ${mediaBreakpointDown(Breakpoint.Large)} {
        margin-left: ${vw(370, Breakpoint.Large)};
    }

  ${mediaBreakpointDown(Breakpoint.Tablet)} {
    margin-left: 0px;
    justify-content: center;
    margin-bottom: 32px;
  }
`;

const DesktopWrapper = styled(motion.div)`
  position: absolute;
  width: 953px;
  height: 574px;

  ${mediaBreakpointDown(Breakpoint.xMedium)} {
    width: ${vw(953, Breakpoint.xMedium)};
    height: ${vw(574, Breakpoint.xMedium)};
  }

  ${mediaBreakpointDown(Breakpoint.Tablet)} {
    width: ${vw(953, Breakpoint.Tablet)};
    height: ${vw(574, Breakpoint.Tablet)};
  }
`;

const TabletWrapper = styled(motion.div)`
  position: absolute;
  width: 699px;
  height: 484px;
  right: -100px;

  ${mediaBreakpointDown(Breakpoint.Large)} {
    right: -${vw(100, Breakpoint.Large)};
  }

  ${mediaBreakpointDown(Breakpoint.xMedium)} {
    width: ${vw(699, Breakpoint.xMedium)};
    height: ${vw(484, Breakpoint.xMedium)};
    right: -${vw(80, Breakpoint.xMedium)};
  }

  ${mediaBreakpointDown(Breakpoint.Tablet)} {
    width: ${vw(699, Breakpoint.Tablet)};
    height: ${vw(484, Breakpoint.Tablet)};
    right: 0;
  }
`;

const MobileWrapper = styled(motion.div)`
  position: absolute;
  width: 595px;
  height: 631px;
  right: -50px;

    ${mediaBreakpointDown(Breakpoint.Large)} {
    right: -${vw(50, Breakpoint.Large)};
    }

  ${mediaBreakpointDown(Breakpoint.xMedium)} {
    width: ${vw(595, Breakpoint.xMedium)};
    height: ${vw(631, Breakpoint.xMedium)};
    right: -${vw(30, Breakpoint.xMedium)};
  }

  ${mediaBreakpointDown(Breakpoint.Tablet)} {
    width: ${vw(595, Breakpoint.Tablet)};
    height: ${vw(631, Breakpoint.Tablet)};
    right: 6%;
  }
`;
