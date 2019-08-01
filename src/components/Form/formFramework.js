export function createControl(config, validation) {
  var tmp = validate(config.value, validation)
  return {
    ...config,
    validation,
    valid: tmp,
    touched: false,
  }
}

export function validate(value, validation = null) {
  if (!validation) {
    return true
  }

  let isValid = true

  if (validation.required) {
    if(typeof value === 'string') {
      isValid = value.trim() !== '' && isValid
    } else {
      isValid = value !== '' && isValid
    }
  }

  return isValid
}

export function validateForm(formControls) {
  let isFormValid = true

  for (let control in formControls) {
    if (formControls.hasOwnProperty(control)) {
      isFormValid = formControls[control].valid && isFormValid
    }
  }

  return isFormValid
}
