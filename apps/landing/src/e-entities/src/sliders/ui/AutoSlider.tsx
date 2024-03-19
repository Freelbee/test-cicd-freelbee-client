'use client';

import styled from "styled-components";

// import { ReactComponent as ArrIcon} from '@public/ui-kit/arrow-icons/arrRounded.svg';

// import { Color } from "@freelbee/shared";
import { A11y, Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import 'swiper/css';

import 'swiper/css/navigation';

interface Props {
    children: Array<JSX.Element>
}

export const AutoSlider = ({children}: Props) => (
    <Container>
        <Swiper
            navigation={{
                prevEl: '.prev_s',
                nextEl: '.next_s',
            }}
            slidesPerView='auto'
            loop
            spaceBetween={16}
            centeredSlides
            autoplay={{
                delay: 1000,
                pauseOnMouseEnter: true
            }}
            speed={1200}
            modules={[Navigation, Autoplay, A11y]}
            breakpoints={{
                768: {
                    spaceBetween: 32,
                }
            }}
        >
            {children.map((card, idx) => (
                <SwiperSlide style={{height: 'auto'}} key={idx}>
                    {card}
                </SwiperSlide>
            ))}
        </Swiper>  
        <ButtonsContainer>
            {/* <PrevButton className="prev_s" aria-label="prev slide"><ArrIcon/></PrevButton>
            <NextButton className="next_s" aria-label="next slide"><ArrIcon/></NextButton> */}
        </ButtonsContainer>      
    </Container>);


const Container = styled.div`
    margin-bottom: 32px;

    .swiper {
        overflow: visible;
    }

    .swiper-slide {
        width: auto;
    }
`;

const ButtonsContainer = styled.div`
    margin-top: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 16px;
`;

// const NextButton = styled.button`
//     cursor: pointer;
//     width: 40px;
//     height: 40px;
//     border-radius: 50%;
//     background-color: ${Color.WHITE};
//     display: inline-flex;
//     align-items: center;
//     justify-content: center;

//     svg {
//         width: 18px;
//         height: 18px;
//         stroke: ${Color.GRAY_800};
//         transition: stroke 0.3s;
//     }

//     &:hover {
//         stroke: ${Color.GRAY_900};
//     }
// `;


// const PrevButton = styled(NextButton)`
//     transform: rotate(180deg);
// `;