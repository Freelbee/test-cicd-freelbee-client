'use client';

import { Suspense } from 'react';
import styled from 'styled-components';

import { ReactComponent as Logo} from '@landing/assets/icons/logo/freelbee-logo.svg';

import { Breakpoint, Color, mediaBreakpointDown, typography } from '@freelbee/shared/ui-kit';

import { bankTransfer } from '../data/bank-transfer';
import { contractorsManagement } from '../data/contractors-management';
import { freelbeeTable } from '../data/freelbee';
import { moneyTransfer } from '../data/money-transfer';
import { CellTitle } from '../intreface/TableCell';

import { ActionButton } from './ActionButton';

export const FullTable = () => {

    const renderItems = (items: Array<string>) => items.map((el, idx) => <Item key={idx}>{el}</Item>);

    return (
        <Container>
            <Table>
                <tbody>
                    <tr>
                        <th></th>
                        <th><Logo /></th>
                        <th>Bank transfers</th>
                        <th>Money transfer platforms
                            <span>(e.g. Wise, PayPal, Payoneer)</span>
                        </th>
                        <th>Popular contractor management services</th>
                    </tr>
                    <tr>
                        <th>{CellTitle['Budget-friendly']}</th>
                        <td>{renderItems(freelbeeTable['Budget-friendly'])}</td>
                        <td>{renderItems(bankTransfer['Budget-friendly'])}</td>
                        <td>{renderItems(moneyTransfer['Budget-friendly'])}</td>
                        <td>{renderItems(contractorsManagement['Budget-friendly'])}</td>
                    </tr>

                    <tr>
                        <th>{CellTitle['One-stop solution']}</th>
                        <td>{renderItems(freelbeeTable['One-stop solution'])}</td>
                        <td>{renderItems(bankTransfer['One-stop solution'])}</td>
                        <td>{renderItems(moneyTransfer['One-stop solution'])}</td>
                        <td>{renderItems(contractorsManagement['One-stop solution'])}</td>
                    </tr>

                    <tr>
                        <th>{CellTitle['No borders']}</th>
                        <td>{renderItems(freelbeeTable['No borders'])}</td>
                        <td>{renderItems(bankTransfer['No borders'])}</td>
                        <td>{renderItems(moneyTransfer['No borders'])}</td>
                        <td>{renderItems(contractorsManagement['No borders'])}</td>
                    </tr>

                    <tr>
                        <th>{CellTitle['Cryptocurrency payments']}</th>
                        <td>{renderItems(freelbeeTable['Cryptocurrency payments'])}</td>
                        <td>{renderItems(bankTransfer['Cryptocurrency payments'])}</td>
                        <td>{renderItems(moneyTransfer['Cryptocurrency payments'])}</td>
                        <td>{renderItems(contractorsManagement['Cryptocurrency payments'])}</td>
                    </tr>
                </tbody>

            </Table>

            <Suspense fallback={<></>}>
                <ActionButton />
            </Suspense>

        </Container>
    );
};

const Container = styled.div`
    display: grid;
    place-items: center;
    ${mediaBreakpointDown(Breakpoint.Medium)} {
        display: none;
    }
`;

const Table = styled.table`
    border-collapse: collapse;
    margin-bottom: 32px;

    th {
        vertical-align: top;
        padding: 20px;
        ${typography.heading3};
        color: ${Color.BLUE};
        text-align: left;
        border: 1px solid ${Color.GRAY_400};

        svg {
            width: 147px;
        }

        &:nth-child(2) {
            background-color: ${Color.WHITE};
        }
    }

    tr:first-child th {
        ${typography.heading1};
        color: ${Color.GRAY_900};

        span {
            display: block;
            padding-top: 16px;
            ${typography.body};
            color: ${Color.GRAY_600};
        }
    }

    td {
        vertical-align: top;
        padding: 20px;
        ${typography.body};
        color: ${Color.GRAY_900};
        text-align: left;
        border: 1px solid ${Color.GRAY_400};

        &:nth-child(2) {
            background-color: ${Color.WHITE};
        }
    }
`;

const Item = styled.span`
    display: block;
    &:not(:last-child){
        padding-bottom: 20px;
    }
`;
