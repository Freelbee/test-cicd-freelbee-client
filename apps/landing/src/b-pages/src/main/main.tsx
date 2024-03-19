"use client";

import { ApplicationModal, BenefitsSection, CompareSection, ComparisonTableSection, CountersSection, CountriesSection, CurrenciesAndMethodsSection, DevicesSection, FAQSection, IndustriesSection, InsideSection, MeetSection, SecuritySection, StartSection, StepsSection, WhoNeedsSection } from "@landing/widgets";
import { Suspense } from "react";

export const Main = () => {
  // rtkQueryErrorLogger();
  return (
    <main>
      <Suspense fallback={<></>}>
          <ApplicationModal />
      </Suspense>
      <StartSection />
      <CountersSection />
      <CurrenciesAndMethodsSection />
      <MeetSection />
      <WhoNeedsSection />
      <BenefitsSection />
      <StepsSection />
      <IndustriesSection />
      <CountriesSection />
      <CompareSection />
      <InsideSection />
      <ComparisonTableSection />
      <SecuritySection />
      <DevicesSection />
      <FAQSection />
  </main>
  );
};
