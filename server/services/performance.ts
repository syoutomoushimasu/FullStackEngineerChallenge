import { Review, Performance } from '../database/models';

export const addPerformance = async (
  employeeId: string, 
  reviewedByArr: string[], 
  title: string
) => {
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

export const getPerformanceList = async () => {
  const performances = await Performance.findAll();

  if (performances.length > 0) {
    const result = await Promise.all(
      performances.map(async (p) => {
        const reviewers = await Review.findAll({
          where: {
            performanceId: p.id
          }
        });
        return {
          id: p.id,
          title: p.title,
          employeeId: p.employeeId,
          reviewers
        };
      })
    );
    return result;
  }

  return performances;
};

export const updatePerformance = async (performanceId: string, title: string) => {
  await Performance.update(
    {
      title
    },
    {
      where: {
        id: performanceId
      }
    }
  );
  return true;
}
