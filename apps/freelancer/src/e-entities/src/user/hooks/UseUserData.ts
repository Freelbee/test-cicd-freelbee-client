'use client';

import { UserData, UserDataPropsType } from "@freelbee/entities";
import { useGetUserQuery } from "../query/userApi";
import { UserType } from "packages/e-entities/src/user/interface/UserType";
import { QueryStatus } from "@reduxjs/toolkit/query";

const DEFAULT: UserData = {
    "id": 0,
    "email": '',
    "userData": {
        "id": 0,
        "status": null,
        "type": UserType.DEFAULT,
        "props": {
            [UserDataPropsType.FIRST_NAME]: "",
            [UserDataPropsType.LAST_NAME]: "",
            [UserDataPropsType.PHONE_NUMBER]: "",
            [UserDataPropsType.BIRTH_DATE]: "",
            [UserDataPropsType.STREET]: "",
            [UserDataPropsType.COUNTRY]: "",
            [UserDataPropsType.CITY]: "",
            [UserDataPropsType.POSTAL_CODE]: "",
            [UserDataPropsType.HOUSE_NUMBER]: ""
        }
    }
};

export const useUserData = (): [UserData, QueryStatus] => {
    const {data, status} = useGetUserQuery();
    const user = data || DEFAULT;

    return [user, status];
}