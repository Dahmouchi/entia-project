export const dynamic = "force-dynamic";
export const revalidate = 0;

import { getSectionsIsVisible } from "@/actions/landing";
import FullPageScrollExample from "@/components/HomePage";

const Home = async () => {
  const res = await getSectionsIsVisible();
  return <FullPageScrollExample sections={res.data || []} />;
};

export default Home;
