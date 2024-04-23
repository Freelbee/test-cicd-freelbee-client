import React, {useContext} from "react";
import styled, {css} from "styled-components";

import AcceptSaasTaskDto from "@logic/dtos/tasks/saasTasks/AcceptSaasTaskDto";
import TransakCryptoCurrency from "@logic/models/TransakCryptoCurrency/TransakCryptoCurrency";
import {useFetchCryptoCurrenciesQuery} from "@logic/service/API/paTransakApi/paTransakApi";
import {
    useAcceptSaasTaskMutation,
    useGetContractByTaskIdMutation
} from "@logic/service/API/taskAPI/taskAPI";

import {useAppSelector} from "@store/hooks/hooks";

import Button from "@src/common/buttons/Button";
import {ButtonStyle} from "@src/common/buttons/buttonStyles";
import {Input} from "@src/common/inputs/BaseInput/Input";
import {Checkbox} from "@src/common/inputs/Checkbox/Checkbox";
import Select from "@src/common/selectors/Select/Select";
import SelectWithInput from "@src/common/selectors/SelectWithInput/SelectWithInput";
import {Heading2, Heading3} from "@src/common/texts/typography/heading";
import {Text} from "@src/common/texts/typography/Typography";
import {Tooltip} from "@src/common/Tooltip/Tooltip";
import {InfoIconSize, InfoWithIcon} from "@src/personal/common/components/InfoWithIcon/InfoWithIcon";
import {
    ContainerField,
    CoupleButtonsContainer
} from "@src/personal/common/saasTaskViews/components/containers/saasTaskContainers";
import {Colors} from "@src/styledComponents/base/Colors";
import {
    SaasFreelancerDisplayedTaskContext,
    SaasFreelancerDisplayedTaskViewType
} from "@freelancerSrc/pages/sassTasks/context/SaasDisplayedTaskContext";

import DownloadIcon from "@public/icons/account/company-account/download.svg";
import TransakIcon from "@public/icons/account/company-account/saasPaymentMethods/transakIcon.svg";
import WarningIcon from "@public/icons/baseUI/alert-icons/warnicon.svg";

const singerMock: Array<string> = ['Test'];

export default function SigingOfTheAgreement () {

    const {data: user} = useAppSelector((state) => state.userSlice);
    const [signature, setSignature] = React.useState<string>(user.signature ?? '');
    const [crypto, setCrypto] = React.useState<TransakCryptoCurrency>();
    const {displayedTask, saasDisplayedFreelancerView, setSaasDisplayedFreelancerView, setDisplayedTask} = useContext(SaasFreelancerDisplayedTaskContext);
    const [walletAddress, setWalletAddress] = React.useState<string>('');
    const [isAgreementAccepted, setIsAgreementAccepted] = React.useState<boolean>(false);
    const [isLoading, setIsLoading] = React.useState<boolean>(false);

    const {data: cryptoCurrencies = []} = useFetchCryptoCurrenciesQuery();

    const [acceptTask] = useAcceptSaasTaskMutation();
    const [getContract] = useGetContractByTaskIdMutation();

    const handleRequest = async () => {
        if(!crypto || walletAddress === '' || !signature) return;
        const body: AcceptSaasTaskDto = {
            freelancerSignature: signature,
            freelancerPaymentDetailsAndCurrency: {
                walletAddress,
                cryptoCurrencySymbol: crypto!.symbol,
                blockchainNetwork: crypto!.network,
            },
        };
        setIsLoading(true);
        await acceptTask({body, taskId: displayedTask!.id})
            .unwrap()
            .then(()=>{
                setDisplayedTask(null);
                setSaasDisplayedFreelancerView(SaasFreelancerDisplayedTaskViewType.VIEW_TASK_DETAILS);
                setCrypto(undefined);
                setWalletAddress('');
                setIsAgreementAccepted(false);
            })
            .catch((err)=>{
                console.log(err);
            })
            .finally(()=>{
                setIsLoading(false);
            });
    };

    const renderCryptoCurrency = (crypto: TransakCryptoCurrency) => (
        <PaymentCryptoContainer>
            <PaymentCryptoContainerSide>
                <ImageWrapper>
                    <img src={crypto.iconUrl} alt={''} />
                </ImageWrapper>
                <Text font={'body'} color={Colors.GRAY_900}>{crypto.symbol}</Text>
            </PaymentCryptoContainerSide>
            <PaymentCryptoNetwork>
                <Text font={'body'} color={Colors.GRAY_600}>{crypto.network}</Text>
            </PaymentCryptoNetwork>
        </PaymentCryptoContainer>
    );

    const getSignatureAlert = () => (
        <SignatureAlertContainer>
            Signature <Tooltip
                onHover
                message={'Enter your signature'}>
                <WarnIcon>
                    <WarningIcon/>
                </WarnIcon>
            </Tooltip>
        </SignatureAlertContainer>
    );


    const downloadPreviewContract = async () => {
        getContract(displayedTask!.id!);
    };

    if(saasDisplayedFreelancerView !== SaasFreelancerDisplayedTaskViewType.VIEW_AGREEMENT_DETAILS) {
        return null;
    }

    const isDisabled = !isAgreementAccepted || !walletAddress || !crypto || !signature;

    return (
        <>
            <ContainerField>
                <Heading2>
                    Signing of the agreement
                </Heading2>
                <Text font='heading3' styles={receivingStyles}>
                    Method of receiving funds: <Text font={'body'} color={Colors.GRAY_900} styles={receivingStyles}>
                        <TransakIcon/>Transak · Crypto</Text>
                </Text>
                <Text font='heading3'>
                    Reward: <Text font='body'> {displayedTask?.price}  {displayedTask?.companyCurrency}</Text>
                </Text>
                <Input placeholder={'Enter the wallet address'} value={walletAddress} setValue={setWalletAddress} label={'Wallet address for debiting funds'}/>
                <Select
                    label={'Payment currency'}
                    isRequired
                    defaultValue={crypto}
                    items={cryptoCurrencies}
                    placeholder={''}
                    onSelect={(item) => {
                        setCrypto(item);
                    }}
                    searcher={(item, value) => item.symbol.toLowerCase().includes(value.toLowerCase()) || item.network.toLowerCase().includes(value.toLowerCase())}
                    listRender={renderCryptoCurrency}
                />

                <TermsContainer>
                    <Heading3 color={Colors.GRAY_900}>Contract</Heading3>

                    <DownloadContainer onClick={()=>downloadPreviewContract()}>
                        <DownloadIcon/>
                        <Text font={'body'} color={Colors.BLUE}>Download</Text>
                    </DownloadContainer>
                </TermsContainer>

                <SelectWithInput
                    value={signature}
                    setValue={setSignature}
                    text={getSignatureAlert()}
                    isRequired
                    placeholder={'Enter signature'}
                    getStringValue={(item) => item}
                    listRender={(item) => <Text font={'body'}>{item}</Text>}
                    items={singerMock}
                />
            </ContainerField>

            <AgreementContainer>
                <Checkbox

                    isCheck={isAgreementAccepted}
                    onChange={() => setIsAgreementAccepted(!isAgreementAccepted)}
                />
                {
                    displayedTask?.customContractFile && (
                        <Text font='body'>
                            By putting a tick in the box, I agree with the terms and conditions of the downloaded text of the Contract.
                            I guarantee, that all the data I've provided in this Task form is correct and fully comply with the downloaded text of the Contract.
                            In case of any contradictions between the data provided in the Task form and in the text of the downloaded Contract,
                            the data provided in the Task form shall prevail.
                            For the sake of clearence for settlement purposes Freelbee shall use only the data provided in the Task form.
                        </Text>
                    )
                }
                {
                    !displayedTask?.customContractFile && (
                        <Text font='body'>
                            By putting a tick in the box, I agree with the terms and conditions of the Contract.
                            All the data I've provided is correct.
                            I understand that when I click the "Sign and accept" button, I am entering into a Contract with Client as a Contractor on the terms and conditions described therein.
                        </Text>
                    )
                }

            </AgreementContainer>

            <ContainerField>
                <InfoWithIcon
                    iconSize={InfoIconSize.M}
                    Icon={WarningIcon}
                    textColor={Colors.GRAY_900}
                    background={Colors.BG_REPORTS_BLUE}
                    text={'You will receive payment in crypto'}
                />
                <CoupleButtonsContainer>
                    <Button
                        isLoading={isLoading}
                        styleType={ButtonStyle.GREEN}
                        isWide
                        disabled={isDisabled || isLoading}
                        onClick={handleRequest}
                    >
                        Sign and accept
                    </Button>
                    <Button
                        disabled={isLoading}
                        styleType={ButtonStyle.STROKE_WHITE}
                        isWide
                        onClick={() => setSaasDisplayedFreelancerView(SaasFreelancerDisplayedTaskViewType.VIEW_TASK_DETAILS)}
                    >
                        Back
                    </Button>
                </CoupleButtonsContainer>
            </ContainerField>
        </>
    );
}


const receivingStyles = css`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const PaymentCryptoContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

const PaymentCryptoContainerSide = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

const PaymentCryptoNetwork = styled.div`
  display: flex;
  padding: 2px 8px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 10px;
  background: ${Colors.GRAY_300};
`;

const TermsContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const DownloadContainer = styled.div`
  display: flex;
  gap: 4px;
  align-items: center;
    cursor: pointer;
`;

const AgreementContainer = styled.div`
    width: 100%;
  display: grid;
    grid-template-columns: 16px 1fr;
  gap: 8px;
  margin: 10px 0;
  //align-items: center;
`;


const SignatureAlertContainer = styled.div`
    display: flex;
  align-items: center;
  gap: 4px;
`;

const WarnIcon = styled.div`
  position: relative;
  height: 18px;
  width: 18px;
    svg {
        flex-shrink: 0;
        width: 18px;
        height: 18px;
      
        path {
          stroke: ${Colors.GRAY_600}; 
        }
    }
`;

const ImageWrapper = styled.div`
    width: 24px;
    height: 24px;
    position: relative;
    img {
        position: absolute;
        top: 0;
        left: 0;
        width: 24px;
        height: 24px;
    }
`;