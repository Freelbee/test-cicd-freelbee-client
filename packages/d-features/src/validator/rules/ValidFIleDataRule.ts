import { RuleMessage } from "packages/f-shared/src/validator/RuleMessage";
import { IRule } from "../interface/IRule";
import { FileData } from "@freelbee/shared/ui-kit";

export class ValidFileDataRule implements IRule
{
    public check (file : FileData) : boolean
    {
        return !!file.isLoaded && !file.isError && !!file.file
    }

    public message () : RuleMessage
    {
        return {
            en: `Invalid file data`,
        };
    }
}
