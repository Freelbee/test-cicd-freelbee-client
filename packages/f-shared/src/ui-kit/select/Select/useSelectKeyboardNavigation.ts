import { KeyboardEventHandler, MutableRefObject, useCallback } from 'react';

enum KeyboardNavDirection {
    UP = 'UP',
    DOWN = 'DOWN'
}

interface KeyboardNavigationProps {
    listboxRef: MutableRefObject<HTMLDivElement | null>,
    toggleOpenFn: () => void;
    isSelectOpened: boolean;
    optionSelector?: string;
}

/**
 * @description навигация по селекту с клавиатуры: Space - открыть/закрыть выпадающий список, ArrowUp|ArrowDown - перемещение по опциям селекта, если список открыт, Enter - выбор опции, когда она находится в фокусе
 * @param listboxRef - реф прикрепляется непосредственно к контейнеру, содержащему опции
 * @param toggleOpenFn - функция для смены состояния селекта(открыт/закрыт)
 * @param isSelectOpened - текущее состояние селекта(открыт/закрыт)
 * @param optionSelector - селектор, используемый для получения списка опций селекта. По умолчанию используется [role = 'option'] - должны быть проставлены role = 'option' и aria-selected={boolean} у опций селекта
 * @return функции-обработчики на keyDown
 *  - handleSpaceOpen - открытие и закрытие селекта при нажатии на пробел 
 *  - navigateOptions - навигация стрелками по опциям
 */
export const useSelectKeyboardNavigation = (props: KeyboardNavigationProps) => {

    const {
        listboxRef, 
        toggleOpenFn, 
        isSelectOpened, 
        optionSelector = "[role = 'option']"} = props;

    const handleSpaceOpen: KeyboardEventHandler<HTMLDivElement> = useCallback((e) => {
        if (e.code === 'Space') {
            e.preventDefault();
            toggleOpenFn();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const getKeyboardNavigationDirection = useCallback((keyCode: string): KeyboardNavDirection | null => {
        if (keyCode === 'ArrowDown') {
            return KeyboardNavDirection.DOWN;
        }

        if (keyCode === 'ArrowUp') {
            return KeyboardNavDirection.UP;
        }

        return null;
    }, []);

    const navigateOptions: KeyboardEventHandler<HTMLDivElement> = useCallback((e) => {
        if (!listboxRef.current || !isSelectOpened) return;

        const direction = getKeyboardNavigationDirection(e.code);

        if (!direction) return;

        e.preventDefault();
        const options = Array.from(listboxRef.current.querySelectorAll<HTMLElement>(optionSelector));

        if (!options.length) return;

        const activeElement = document.activeElement;
        const currentActiveIdx = options.findIndex(el => el === activeElement);

        if (currentActiveIdx === -1) {
            options[0].focus();
            return;
        }

        if (direction === KeyboardNavDirection.DOWN) {
            currentActiveIdx === options.length - 1 ?
                options[0].focus()
                : options[currentActiveIdx + 1]?.focus();
        } else {
            currentActiveIdx === 0 ?
                options[options.length - 1].focus()
                : options[currentActiveIdx - 1]?.focus();
        }
    }, [getKeyboardNavigationDirection, isSelectOpened, listboxRef, optionSelector]);

    return {
        handleSpaceOpen,
        navigateOptions
    };
};