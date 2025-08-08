import BarChatIncomes from "@/components/charts/BarChatIncomes";
import BarChatOutcomes from "@/components/charts/BarChatOutcomes";
import BarChatSaving from "@/components/charts/BarChatSaving";
import Period from "@/components/period/Period";
import { queryChatsRSC } from "@/lib/fetch-data";

export default async function Home() {
  const incomeFetch = await queryChatsRSC('2025-02-05T20:10:21.817Z', '2025-02-05T20:10:21.817Z', 'month')
  console.log('incomeFetch', incomeFetch)

  // const input = await mutateRSC(variables)
  //   console.log('input', input)


  return (
    <div className="grid grid-rows-[1fr_1fr] lg:grid-cols-[45%_45%] grid-cols-[100%] justify-items-center min-h-screen p-8 pb-10 gap-16 sm:p-10 max-w-7xl ">
      <BarChatSaving incomeFetch={incomeFetch} />
      <Period />
      <BarChatIncomes />
      <BarChatOutcomes />
    </div>
  );
}
