import BarChatIncomes from "@/components/charts/BarChatIncomes";
import BarChatOutcomes from "@/components/charts/BarChatOutcomes";
import BarChatSaving from "@/components/charts/BarChatSaving";
import Period from "@/components/period/Period";
// import { mutateRSC, queryRSC } from "@/lib/fetch-data";

// const variables = {
//   datum: new Date('2020-09-12'),
//   categories: [
//     {
//       title: "Earned Income",
//       entities: [
//         {
//           description: "Salary/ Wages",
//           tooltip: "Income from full-time or part-time employment.",
//           sum: 12121,
//         },
//         {
//           description: "Overtime",
//           tooltip: "Additional earnings for working beyond standard hours.",
//           sum: 3232,
//         },
//       ],
//     },
//   ],
// };

export default async function Home() {
  // const incomes = await queryRSC()
  // console.log('incomes', incomes)
  
  // const input = await mutateRSC(variables)
  //   console.log('input', input)
  

  return (
    <div className="grid grid-rows-[1fr_1fr] lg:grid-cols-[45%_45%] grid-cols-[100%] justify-items-center min-h-screen p-8 pb-10 gap-16 sm:p-10 max-w-7xl ">
      <BarChatSaving />
      <Period />
      <BarChatIncomes />
      <BarChatOutcomes />
    </div>
  );
}
