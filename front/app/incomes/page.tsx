import IncomesForm from "@/components/incomes/IncomesForm"
import { incomes } from '../../datum/dates';

const Incomes = () => {
  return <IncomesForm incomes={incomes} />
}

export default Incomes;
