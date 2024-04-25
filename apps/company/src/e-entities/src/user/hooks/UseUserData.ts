'use client'

import { UserData, UserDataPropsType} from "@freelbee/entities";
import { UserType } from "packages/e-entities/src/user/interface/UserType";
import { QueryStatus } from "@reduxjs/toolkit/query";
import { useGetUserQuery } from "@company/entities";

const DEFAULT: UserData = {
    "id": 0,
    "email": '',
    "userData": {
        "id": 0,
        "status": null,
        "type": UserType.DEFAULT,
        "signature": "",
        "props": {
            [UserDataPropsType.FIRST_NAME]: "",
            [UserDataPropsType.LAST_NAME]: "",
            [UserDataPropsType.PHONE_NUMBER]: "",
            [UserDataPropsType.BIRTH_DATE]: "",
        }
    }
};

export const useUserData = (): [UserData, QueryStatus] => {
    const {data, status} = useGetUserQuery();
    const user = data || DEFAULT;

    // To-Do убрать когда все будет работать со статусами и показом онбоардинга
    if(!user.userData) {
        user.userData = DEFAULT.userData
    }

    return [user, status];
}
