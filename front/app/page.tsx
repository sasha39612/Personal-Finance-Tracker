'use client'
import { useState, useEffect } from "react";
import BarChartIncomes from "@/components/charts/BarChartIncomes";
import BarChartOutcomes from "@/components/charts/BarChartOutcomes";
import BarChartSaving from "@/components/charts/BarChartSaving";
import Period from "@/components/period/Period";
import { queryChatsIncomeRSC, queryChatsOutcomeRSC } from "@/lib/fetch-data";
import { IncomeCharts, OutcomeChats, SavingChats } from "@/lib/types";
import getSavings from "@/lib/get-savings";

export default function Home() {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [selectedPeriod, setSelectedPeriod] = useState('day');
  const [incomeFetch, setIncomeFetch] = useState<IncomeCharts>({ labels: [''], datasets: [] });
  const [outcomeFetch, setOutcomeFetch] = useState<OutcomeChats>({ labels: [''], datasets: [] });
  const [savingFetch, setSavingFetch] = useState<SavingChats>({ labels: [''], datasets: [] });

  useEffect(() => {
    async function fetchData() {
      const income = await queryChatsIncomeRSC(startDate, endDate, selectedPeriod);
      const outcome = await queryChatsOutcomeRSC(startDate, endDate, selectedPeriod);
      setIncomeFetch(income);
      setOutcomeFetch(outcome);
    }
    fetchData();
  }, [startDate, endDate, selectedPeriod]);

  useEffect(() => {
    const saving = getSavings(incomeFetch, outcomeFetch);
    setSavingFetch(saving);
  }, [incomeFetch, outcomeFetch]);

  return (
    <div className="grid grid-rows-[1fr_1fr] lg:grid-cols-[45%_45%] grid-cols-[100%] justify-items-center min-h-screen p-8 pb-10 gap-16 sm:p-10 max-w-7xl ">
      <BarChartSaving savingFetch={savingFetch} />
      <Period setStartDate={setStartDate} setEndDate={setEndDate} setSelectedPeriod={setSelectedPeriod} />
      <BarChartIncomes incomeFetch={incomeFetch} />
      <BarChartOutcomes outcomeFetch={outcomeFetch} />
    </div>
  );
}
