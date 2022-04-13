import MealsSummary from './MealsSummary';
import MealsList from './MealsList';
import { Fragment } from 'react';

const Meals = () => {
  return (
    <Fragment>
      <MealsSummary />
      <MealsList />
    </Fragment>
  );
};

export default Meals;
