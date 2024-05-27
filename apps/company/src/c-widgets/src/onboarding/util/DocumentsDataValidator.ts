import { AbstractValidator, IRule, RequiredRule } from "@freelbee/features";
import { DocumentsData } from "../interface/DocumentsData";
import { CompanyDocumentType } from "../interface/CompanyDocumentTypeEnum";

export class DocumentsDataValidator extends AbstractValidator<DocumentsData>
{
    protected rules () : {[key in keyof DocumentsData]?: IRule[]}
    {
        return {
            [CompanyDocumentType.REGISTRATION]: [new RequiredRule()],
            [CompanyDocumentType.ADDRESS]: [ new RequiredRule()],
            [CompanyDocumentType.SHAREHOLDER_REGISTRY]: [ new RequiredRule()],
            [CompanyDocumentType.DIRECTOR_REGISTRY]: [new RequiredRule()],
        };
    }
}