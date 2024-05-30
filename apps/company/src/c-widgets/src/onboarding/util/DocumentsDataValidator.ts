import { AbstractValidator, IRule, RequiredRule, ValidFileDataRule,  } from "@freelbee/features";
import { DocumentsData } from "../interface/DocumentsData";
import { CompanyDocumentType } from "../interface/CompanyDocumentTypeEnum";

export class DocumentsDataValidator extends AbstractValidator<DocumentsData>
{
    protected rules () : {[key in keyof DocumentsData]?: IRule[]}
    {
        return {
            [CompanyDocumentType.REGISTRATION]: [new RequiredRule(), new ValidFileDataRule()],
            [CompanyDocumentType.ADDRESS]: [ new RequiredRule(), new ValidFileDataRule()],
            [CompanyDocumentType.SHAREHOLDER_REGISTRY]: [ new RequiredRule(), new ValidFileDataRule()],
            [CompanyDocumentType.DIRECTOR_REGISTRY]: [new RequiredRule(), new ValidFileDataRule()],
        };
    }
}