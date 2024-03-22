"use client";

import { ApplicationModal, BenefitsSection, CompareSection, ComparisonTableSection, CountersSection, CountriesSection, CurrenciesAndMethodsSection, DevicesSection, FAQSection, IndustriesSection, InsideSection, MeetSection, SecuritySection, StartSection, StepsSection, WhoNeedsSection } from "@landing/widgets";
import { Suspense } from "react";

export const Main = () => {
  return (
    <main>
      <Suspense fallback={<></>}>
          <ApplicationModal />
      </Suspense>
     
     <StartSection />
     <CountersSection />
     <CurrenciesAndMethodsSection />
     
     <BenefitsSection />
     <IndustriesSection />
     <WhoNeedsSection />
     <MeetSection />
     <StepsSection />
     <CountriesSection />
     <InsideSection />
     <ComparisonTableSection />
     <SecuritySection />
     <CompareSection />
     <DevicesSection />
     <FAQSection /> 
  </main>
  );
};
