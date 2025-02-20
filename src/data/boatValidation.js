export const validateForms = (forms) => {
  let isValid = true;
  const validatedForms = forms.map((form) => {
    let errors = {};
    if (!form.name) errors.name = "Boat Name is required";
    if (!form.make) errors.make = "Make is required";
    if (!form.size) errors.size = "Size is required";
    if (!form.location) errors.location = "Location is required";
    if (!form.boatType) errors.boatType = "Boat type is required";
    if (!form.year) errors.year = "Year is required";
    if (Object.keys(errors).length > 0) isValid = false;
    return { ...form, errors };
  });
  return { validatedForms, isValid };
};

export const validateManagers = (forms) => {
  let isValid = true;
  const validatedForms = forms.map((form) => {
    let errors = {};
    if (!form.name) errors.name = "Name is required";
    if (!form.email) errors.email = "Email is required";
    if (!form.jobtitle) errors.jobtitle = "Job title is required";
    if (!form.location) errors.location = "Location is required";
    if (!form.phone) errors.phone = "Phone Number is required";
    // if (!form.year) errors.year = "Year is required";
    if (Object.keys(errors).length > 0) isValid = false;
    return { ...form, errors };
  });
  return { validatedForms, isValid };
};
