import BarChatIncomes from "@/components/charts/BarChatIncomes";
import BarChatOutcomes from "@/components/charts/BarChatOutcomes";
import BarChatSaving from "@/components/charts/BarChatSaving";

export default function Home() {
  return (
    <div className="grid lg:grid-rows-[1fr_1fr] grid-rows-[1fr_1fr_1fr_1fr] lg:grid-cols-[50%_50%] grid-cols-[100%] justify-items-center min-h-screen p-8 pb-10 gap-16 sm:p-10 max-w-7xl ">
      <BarChatSaving />
      <BarChatIncomes />
      <BarChatOutcomes />
    </div>
  );
}
