import { CounterpartyDocumentType } from "@freelbee/entities";

export interface CounterpartyDocumentLinkDto {
  documentType: CounterpartyDocumentType;
  documentLink: string;
}
