import { Employee } from '../database/models';

export const addEmployee = async (name: string, email: string) => {
  const employee = await Employee.findAll({
    where: {
      name
    }
  })
  if (employee.length > 0) {
    return false;
  } else {
    await Employee.create({
      name,
      email
    });
    return true;
  }
}

export const getEmployeeList = async () => {
  const employees = await Employee.findAll();
  return employees;
}

export const updateEmployee = async (name: string, email: string) => {
  await Employee.update(
    {
      email
    },
    {
      where: {
        name
      }
    }
  )
  return true;
}

export const deleteEmployee = async (name: string) => {
  await Employee.destroy({
    where: {
      name
    }
  })
  return true;
}
