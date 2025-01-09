export const formValidation = ({
  passSelectedEmployee,
  passSelectedBoat,
  selectedTaskType,
  noteText,
  dueDate,
}) => {
  let errors = {};

  if (
    passSelectedEmployee &&
    (passSelectedEmployee?.id || passSelectedEmployee?._id)
  ) {
    errors = {};
  } else {
    errors.employee = "Select Employee";
    errors.updateEmployee = "Select Employee";
  }

  // if(passSelectedBoat && (passSelectedBoat?.id || passSelectedBoat?._id)){
  //   errors = {};
  // }
  // else{
  //   errors.boat = "Select boat";
  //   errors.updateBoat = "Select boat";
  // }

  if (!selectedTaskType) {
    errors.task = "Select task";
  }

  if (!noteText) {
    errors.note = "Add note text";
  }

  if (!dueDate?.unix) {
    errors.dueDate = "Select due date";
  }

  return errors;
};
