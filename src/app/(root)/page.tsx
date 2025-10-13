import TenderHomePageWithTabs from "@/components/main/tender-homepage/TenderHomePageWithTabs";
import { dummyTenderData } from "@/constants";

export default async function SupplierHomePage() {

  return (
    <TenderHomePageWithTabs
      publishedDraftData={dummyTenderData}
      // currentAccountBids={currentAccountBids}
    />
  );
  //return <SupplierHomeComponent data={publishedDraftData} />;
}
