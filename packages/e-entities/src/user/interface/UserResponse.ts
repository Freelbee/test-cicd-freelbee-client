import { DetailProps } from "@freelbee/shared"
import { UserStatus } from "./UserStatus"
import { UserType } from "./UserType"
import { UserDataPropsType} from "./UserDataPropType"

export interface UserResponse {
	id: number,
	email: string,
	userData: {
		id: number,
		status: UserStatus | null,
		type: UserType,
		props: DetailProps<UserDataPropsType>
	}
}

export interface UserData {
	id: number,
	email: string,
	userData: {
		id: number,
		status: UserStatus | null,
		type: UserType,
		props: Record<UserDataPropsType, string>
	}
}