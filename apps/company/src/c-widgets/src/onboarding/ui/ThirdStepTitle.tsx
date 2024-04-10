import { Color, Heading1, Text} from "@freelbee/shared/ui-kit";

export const ThirdStepTitle = () => {

    return (
        <>
            <Text font='captions' color={Color.GRAY_600}>1 of 2 Onboarding</Text>
            <Heading1>Determination of the country of residence</Heading1>   
            <Text font='body'>
                The choice of tax residence depends on the choice of tax status in your jurisdiction
            </Text>       
        </>
    );
};