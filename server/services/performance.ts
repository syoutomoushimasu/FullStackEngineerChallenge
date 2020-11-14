import { Review, Performance, Feedback } from '../database/models';

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

export const getPerformanceListByEmployeeId = async (
  employeeId: string
) => {
  const performances = await Performance.findAll();

  if (performances.length > 0) {
    const result = await Promise.all(
      performances.map(async p => {
        const reviewers = await Review.findAll({
          where: {
            performanceId: p.id
          }
        });
        const filterReviewers = reviewers.filter(r => {
          return String(r.employeeId) === String(employeeId);
        });
        const feedbackRecord = await Feedback.findOne({
          where: {
            performanceId: p.id,
            reviewerId: employeeId
          }
        });
        // filter out by
        // the employee is in the reviewer list
        // and the employee didn't write feedback
        if (filterReviewers.length > 0 && !feedbackRecord) {
          return {
            id: p.id,
            title: p.title,
            employeeId: p.employeeId,
            reviewers
          };
        } else {
          return null;
        }
      })
    );
    // console.log('getPerformanceListByEmployeeId result..', result)
    return result.filter(r => r !==null);
  }
  return performances;
};

export const updatePerformance = async (
  performanceId: string,
  title: string
) => {
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

export const createPerformanceFeedback = async (
  feedback: string,
  reviewerId: string,
  performanceId: string
) => {
  await Feedback.create({
    feedback,
    reviewerId,
    performanceId
  });
  return true;
}

export const getPerformanceFeedback = async (
  performanceId: string
) => {
  const result = await Feedback.findAll({
    where: {
      performanceId
    }
  })
  return result;
}
