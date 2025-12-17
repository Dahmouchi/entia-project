import { SectionManager } from "../../_components/SectionManager";
import { getSections } from "@/actions/landing";

const Index = async () => {
  const sections = await getSections();

  return <SectionManager initialSections={sections.data || []} />;
};

export default Index;
