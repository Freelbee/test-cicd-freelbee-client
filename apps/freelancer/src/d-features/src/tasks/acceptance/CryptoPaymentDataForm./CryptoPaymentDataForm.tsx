'use client';

import { Input } from "@freelbee/shared/ui-kit";
import { useAppSelector } from "../../../store";

export const CryptoPaymentDataForm = () => {

    const {displayedTask} = useAppSelector(state => state.taskSliceReducer);

    if(!displayedTask) return <></>;
    
  return (
    <div>
         <Input 
          label="Wallet adress for debiting funds" 
          isRequired
          placeholder="Enter the wallet adress" 
          value={''} 
          setValue={() => {}} />   

          
    </div>
  )
}