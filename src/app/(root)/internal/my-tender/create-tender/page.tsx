import PageBackHeader from "@/components/main/AppBackHeader";
import TenderForm from "@/components/main/tender/TenderForm";

type Props = {};

const page = (props: Props) => {
  return (
    <div className="p-6 text-gray-100 bg-[#0b0b0b] max-h-screen w-full">
      <PageBackHeader title="Create New Tender"/>
      <TenderForm />
    </div>
  );
};

export default page;
