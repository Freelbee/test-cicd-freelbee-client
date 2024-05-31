'use client';

import styled from 'styled-components';
import React, { useContext } from 'react';
import { Input, Text } from '@freelbee/shared/ui-kit';
import { CompanyNavigation } from '@admin/widgets';
import { CompanyNavigationContext, FileDownload } from '@admin/features';
import { useGetCompanyCounterpartyDocumentsQuery } from '@admin/entities';
import { CounterpartyDocumentType } from '@freelbee/entities';

export function CompanyTabPrimaryInfo() {
  const { company } = useContext(CompanyNavigationContext);
  const { data: companyDocumentLinks } = useGetCompanyCounterpartyDocumentsQuery(company.id);

  return (
    <Container>
      <CompanyNavigation />
      <Section>
        <Text font="heading2">Company info</Text>
        <Input
          label="ID"
          placeholder=""
          value={company.id.toString()}
          setValue={() => null}
          disabled
        />
        <Input
          label="Country"
          placeholder=""
          value={company.counterpartyDetail.country}
          setValue={() => null}
          disabled
        />
        <Input
          label="CEO name"
          placeholder=""
          value={company.counterpartyDetail.props.DIRECTOR_NAME}
          setValue={() => null}
          disabled
        />
        <Input
          label="Registry code"
          placeholder=""
          value={company.counterpartyDetail.props.OGRN}
          setValue={() => null}
          disabled
        />
        <Input
          label="Tax code"
          placeholder=""
          value={company.counterpartyDetail.props.TAX_NUMBER} //TODO::: or TIN !!!
          setValue={() => null}
          disabled
        />
        <Input
          label="Company address"
          placeholder=""
          value={company.counterpartyDetail.props.ADDRESS}
          setValue={() => null}
          disabled
        />
        <Input
          label="Zip code"
          placeholder=""
          value={company.counterpartyDetail.props.ZIP_CODE}
          setValue={() => null}
          disabled
        />
        <Input
          label="Status"
          placeholder=""
          value={company.counterpartyDetail.status}
          setValue={() => null}
          disabled
        />
      </Section>
      <Section>
        <Text font="heading2">CEO</Text>
        <Input
          label="Full name"
          placeholder=""
          value={company.counterpartyDetail.props.DIRECTOR_NAME}
          setValue={() => null}
          disabled
        />
        <Input
          label="E-mail"
          placeholder=""
          value={company.user.email}
          setValue={() => null}
          disabled
        />
        <Input
          label="Phone"
          placeholder=""
          value={company.user.phone}
          setValue={() => null}
          disabled
        />
      </Section>
      {companyDocumentLinks && (
        <Section>
          <Text font="heading2">Documents</Text>
          <FileDownload
            text='Director registry*'
            link={companyDocumentLinks[CounterpartyDocumentType.DIRECTOR_REGISTRY]}
          />
          <FileDownload
            text='Shareholder registry*'
            link={companyDocumentLinks[CounterpartyDocumentType.SHAREHOLDER_REGISTRY]}
          />
          <FileDownload
            text='Proof of address, Statement of information*'
            link={companyDocumentLinks[CounterpartyDocumentType.ADDRESS]}
          />
          <FileDownload
            text='Certificate of incorporation/registration*'
            link={companyDocumentLinks[CounterpartyDocumentType.REGISTRATION]}
          />
        </Section>
      )}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 32px;
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;
