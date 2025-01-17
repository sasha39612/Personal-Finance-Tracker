import BarChatIncomes from "@/components/charts/BarChatIncomes";
import BarChatOutcomes from "@/components/charts/BarChatOutcomes";
import BarChatSaving from "@/components/charts/BarChatSaving";
import Period from "@/components/period/Period";

export default function Home() {
  return (
    <div className="grid grid-rows-[1fr_1fr] lg:grid-cols-[45%_45%] grid-cols-[100%] justify-items-center min-h-screen p-8 pb-10 gap-16 sm:p-10 max-w-7xl ">
      <BarChatSaving />
      <Period />
      <BarChatIncomes />
      <BarChatOutcomes />
    </div>
  );
}
