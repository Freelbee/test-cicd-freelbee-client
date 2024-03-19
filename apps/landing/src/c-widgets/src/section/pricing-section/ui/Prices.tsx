import { Color, Text } from "@freelbee/shared/ui-kit";

export const FreelbeMonthlyPrice = () => (
    <Text font='body' color={Color.BLUE}><Text font='title2'>0</Text>%</Text>
);

export const FreelbeTransactionPrice = () => (
    <Text font='body' color={Color.GRAY_600}>
        from <Text font='body' color={Color.BLUE}><Text font='title2'>2.99</Text>%</Text>
    </Text>
);

export const OtherMonthlyPrice = () => (
    <Text font='body' color={Color.GRAY_600}><Text font='title2' color={Color.GRAY_600}>40</Text>$</Text>
);

export const OtherTransactionPrice = () => (
    <Text font='body' color={Color.GRAY_600}>
          from <Text font='title2' color={Color.GRAY_600}>3</Text>% or $<Text font='title2' color={Color.GRAY_600}>5</Text>
    </Text>
);
