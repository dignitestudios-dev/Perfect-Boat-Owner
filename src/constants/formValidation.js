export const formValidation = ({ passSelectedEmployee, passSelectedBoat, selectedTaskType, noteText, dueDate }) => {
    console.log("🚀 ~ formValidation ~ passSelectedBoat:", passSelectedBoat?._id)
    console.log("🚀 ~ formValidation ~ passSelectedEmployee:", passSelectedEmployee?._id)
    let errors = {};
  
    if (!passSelectedEmployee?.id) {
      errors.employee = "Select Employee";
    }
    if (!passSelectedEmployee?._id) {
        errors.updateEmployee = "Select Employee";
      }
  
    if (!passSelectedBoat?.id) {
      errors.boat = "Select boat";
    }
    if (!passSelectedBoat?._id) {
        errors.updateBoat = "Select boat";
      }
  
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