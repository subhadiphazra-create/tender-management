import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SupplierHomeComponent from "./SupplierHomeComponent";

interface Props {
  publishedDraftData: any;
  currentAccountBids?: any;
}

const TenderHomePageWithTabs = ({
  publishedDraftData,
  currentAccountBids,
}: Props) => {
  return (
    <Tabs defaultValue="allTenders" className="w-full p-3">
      <TabsList className="bg-gray-900 border border-gray-800">
        <TabsTrigger value="allTenders">All Tenders</TabsTrigger>
        <TabsTrigger value="myTenders">My Bids</TabsTrigger>
        <TabsTrigger value="config">Tenders from External Sources</TabsTrigger>
      </TabsList>
      <TabsContent value="allTenders">
        <SupplierHomeComponent/>
      </TabsContent>
      <TabsContent value="myTenders">
        <SupplierHomeComponent />
      </TabsContent>
      {/* <TabsContent value="config"><ConfigurationTenderPage /></TabsContent> */}
    </Tabs>
  );
};

export default TenderHomePageWithTabs;
