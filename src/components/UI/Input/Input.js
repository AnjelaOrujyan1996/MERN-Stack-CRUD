import React from 'react'
import classes from './Input.css'

function isInvalid({valid, touched, shouldValidate}) {
    return !valid && shouldValidate && touched
}

const Input = props => {
    const inputType = props.type || 'text'
    const cls = [classes.Input]
    const htmlFor = `${inputType}-${Math.random()}`

    if (isInvalid(props)) {
        cls.push(classes.invalid)
    }

    return (
        <div className={cls.join(' ')}>
            {props.type !== 'radio' && <div className='d-flex align-items-start'>
                <label htmlFor={htmlFor}>{props.label}</label>  { props.validation && props.validation.required && <span className="glyphicon glyphicon-asterisk asterisk" aria-hidden="true"/> }
            </div>}
            {props.type !== 'radio' && <br/>}
            <input name={props.name}
                   type={inputType}
                   id={htmlFor}
                   value={props.value}
                   onClick={props.onChange}
                   onChange={props.onChange}
                   className={props.type !== 'radio' ? 'form-control mr-3' : 'mr-3'}
                   checked={props.checked}/>
            {props.type === 'radio' && <label className='mr-3' htmlFor={htmlFor}>{props.label} </label>}


            {
                isInvalid(props)
                    ? <p className='color-red'>{props.errorMessage || 'Enter true value'}</p>
                    : null
            }
        </div>
    )
}

export default Input
