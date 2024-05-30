import { Color, Heading1, Text} from "@freelbee/shared/ui-kit";

export const DocumentsStepTitle = () => {

    return (
        <>
            <Text font='captions' color={Color.GRAY_600}>3 of 4 Legal information</Text>
            <Heading1>Documents</Heading1>  
            <Text font='bodyMedium'>You can attach documents in pdf, png and jpg;</Text> 
            <Text font='body'>{`
                Attached documents should not contain special characters > < * : ^ + \\ = & /
            `}</Text>
            
        </>
    );
};