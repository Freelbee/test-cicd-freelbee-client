'use client';

import { useState } from "react";
import Image from "next/image";
import styled from "styled-components";
import { AnimatePresence, motion } from "framer-motion";

import { ReactComponent as TabletIcon} from '../assets/desktop.svg';
import { ReactComponent as MobileIcon} from '../assets/mobile.svg';
import{ ReactComponent as  DeskIcon }from '../assets/tablet.svg';
import { DeviceType } from "../interface/DeviceType";
import { Breakpoint, ButtonStyleEnum, Color, mediaBreakpointDown, vw } from "@freelbee/shared/ui-kit";
import { IconButton } from "@freelbee/shared/ui-kit";

import desktopSrc from "@landing/assets/images/main/devices/desktop.png";
import tabletSrc from "@landing/assets/images/main/devices/tablet.png";
import mobileSrc from "@landing/assets/images/main/devices/phone.png";

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
                    Icon={<DeskIcon stroke={current === DeviceType.DESKTOP ? Color.EMERALD : Color.GRAY_600}/>} 
                    label="desktop image" />
                <IconButton 
                    onClick={() => setCurrent(DeviceType.TABLET)}
                    styleType={ButtonStyleEnum.ROUND_STROKE_WHITE} 
                    Icon={<TabletIcon stroke={current === DeviceType.TABLET ? Color.EMERALD : Color.GRAY_600}/>} 
                    label="tablet image" />
                <IconButton 
                    onClick={() => setCurrent(DeviceType.MOBILE)}
                    styleType={ButtonStyleEnum.ROUND_STROKE_WHITE} 
                    Icon={<MobileIcon stroke={current === DeviceType.MOBILE ? Color.EMERALD : Color.GRAY_600}/>} 
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
    height: 700px;

    ${mediaBreakpointDown(Breakpoint.xMedium)} {
        height: ${(vw(705, Breakpoint.xMedium))};
    }

    ${mediaBreakpointDown(Breakpoint.Medium)} {
        height: ${(vw(600, Breakpoint.Medium))};
    }

    ${mediaBreakpointDown(Breakpoint.Tablet)} {
        height: ${(vw(700, Breakpoint.Tablet))};
        width: 100%;
    }

    ${mediaBreakpointDown(Breakpoint.xMobile)} {
        height: ${(vw(600, Breakpoint.xMobile))};
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
  margin-left: 300px;

    ${mediaBreakpointDown(Breakpoint.Large)} {
        margin-left: ${vw(300, Breakpoint.Large)};
    }

    ${mediaBreakpointDown(Breakpoint.xMedium)} {
        margin-left: ${vw(250, Breakpoint.xMedium)};
    }

  ${mediaBreakpointDown(Breakpoint.Tablet)} {
    margin-left: 0px;
    justify-content: center;
    margin-bottom: 32px;
  }
`;

const DesktopWrapper = styled(motion.div)`
  position: absolute;  
  width: 815px;
  height: 489px;

  ${mediaBreakpointDown(Breakpoint.xMedium)} {
    width: ${vw(815, Breakpoint.xMedium)};
    height: ${vw(489, Breakpoint.xMedium)};
  }

  ${mediaBreakpointDown(Breakpoint.Tablet)} {
    width: ${vw(953, Breakpoint.Tablet)};
    height: ${vw(574, Breakpoint.Tablet)};
  }
`;

const TabletWrapper = styled(motion.div)`
  position: absolute; 
  width: 674px;
  height: 466px;
  right: 30px;

  ${mediaBreakpointDown(Breakpoint.Large)} {
    right: ${vw(10, Breakpoint.Large)};
  }

  ${mediaBreakpointDown(Breakpoint.xMedium)} {
    width: ${vw(674, Breakpoint.xMedium)};
    height: ${vw(466, Breakpoint.xMedium)};
    right: -${vw(30, Breakpoint.xMedium)};
  }

  ${mediaBreakpointDown(Breakpoint.Tablet)} {
    width: ${vw(699, Breakpoint.Tablet)};
    height: ${vw(484, Breakpoint.Tablet)};
    right: 0;
  }
`;

const MobileWrapper = styled(motion.div)`
  position: absolute; 
  width: 561px;
  height: 603px;
  right: 10%;

    ${mediaBreakpointDown(Breakpoint.Large)} {
    right: ${vw(65, Breakpoint.Large)};
    }

  ${mediaBreakpointDown(Breakpoint.xMedium)} {
    width: ${vw(561, Breakpoint.xMedium)};
    height: ${vw(603, Breakpoint.xMedium)};
    right: ${vw(25, Breakpoint.Large)};
  }

  ${mediaBreakpointDown(Breakpoint.Tablet)} {
    width: ${vw(561, Breakpoint.Tablet)};
    height: ${vw(603, Breakpoint.Tablet)};
    right: 7%;
  }
`;