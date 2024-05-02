'use client';

import styled from 'styled-components';

import { ReactComponent as Logo} from '@freelbee/assets/icons/logo/freelbee-logo.svg';

import { Breakpoint, Color, mediaBreakpointDown, mediaBreakpointUp, typography } from '@freelbee/shared/ui-kit';

import { freelbeeTable } from '../data/freelbee';
import { CellTitle } from '../intreface/TableCell';

export const FreelbeeTable = () => {

    const renderItems = (items: Array<string>) => items.map((el, idx) => <Item key={idx}>{el}</Item>);

    return (
        <Container>
            <Head><Logo /></Head>
            <Table>
                <tbody>
                    <tr>
                        <th>{CellTitle['Budget-friendly']}</th>
                        <td>{renderItems(freelbeeTable['Budget-friendly'])}</td>
                    </tr>
                    <tr>
                        <th>{CellTitle['One-stop solution']}</th>
                        <td>{renderItems(freelbeeTable['One-stop solution'])}</td>
                    </tr>
                    <tr>
                        <th>{CellTitle['No borders']}</th>
                        <td>{renderItems(freelbeeTable['No borders'])}</td>
                    </tr>
                    <tr>
                        <th>{CellTitle['Cryptocurrency payments']}</th>
                        <td>{renderItems(freelbeeTable['Cryptocurrency payments'])}</td>
                    </tr>
                </tbody>
            </Table>
        </Container>
    );
};

const Container = styled.div`
    background-color: ${Color.WHITE};
    max-width: 730px;
    border-top-right-radius: 32px;
    border-top-left-radius: 32px;
    margin: 0 auto;

    ${mediaBreakpointUp(Breakpoint.Medium)} {
        display: none;
    }
`;

const Head = styled.div`
    padding: 20px 24px;
    border-top-right-radius: 32px;
    border-top-left-radius: 32px;
    border: 1px solid ${Color.GRAY_400};
    border-bottom: none;
    svg {
        width: 140px;
    }
`;

const Item = styled.span`
    display: block;
    &:not(:last-child) {
        padding-bottom: 8px;
    }
`;


const Table = styled.table`
border-collapse: collapse;

    th {
        padding: 10px 20px;
        ${typography.heading3};
        color: ${Color.BLUE};
        text-align: left;
        border: 1px solid ${Color.GRAY_400};
    }

    td {
        padding: 10px 20px;
        ${typography.body};
        color: ${Color.GRAY_900};
        text-align: left;
        border: 1px solid ${Color.GRAY_400};
    }

    tr:last-child {
        td, th {
            padding-bottom: 47px;
        }
    }

    ${mediaBreakpointDown(470)} {
        tr {
            display: flex;
            flex-direction:column;
        }

        tr:last-child {
        td, th {
                padding-bottom: 10px;
            }
        }
    }
`;

