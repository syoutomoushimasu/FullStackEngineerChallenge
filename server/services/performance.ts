import { DatabaseError } from 'sequelize/types';
import { Performance } from '../database/models';
import { Review } from '../database/models';

export const addPerformance = async (
  employeeId: string, 
  reviewedByArr: string[], 
  title: string
) => {
  console.log('add performance', { employeeId, reviewedByArr, title })
  const performance = await Performance.findAll({
    where: {
      title
    }
  })
  if (performance.length > 0) {
    return false;
  } else {
    // performance table
    const p = await Performance.create({
      employeeId,
      title
    });
    // review table
    reviewedByArr.forEach(async employeeId => {
      await Review.create({
        employeeId,
        performanceId: p.id
      })
    })
    return true;
  }
}
