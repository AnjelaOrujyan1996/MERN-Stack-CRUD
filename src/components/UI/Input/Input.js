import React from 'react'
import classes from './Input.css'

function isInvalid({valid, touched, shouldValidate}) {
    console.log(shouldValidate, 'shouldValidate');
    return !valid && shouldValidate && touched
}

const Input = props => {
    const inputType = props.type || 'text'
    const cls = [classes.Input]
    const htmlFor = `${inputType}-${Math.random()}`

    if (isInvalid(props)) {
        console.log('invalid input ')
        cls.push(classes.invalid)
    }

    return (
        <div className={cls.join(' ')}>
            {props.type !== 'radio' && <label htmlFor={htmlFor}>{props.label}</label>}
            {props.type !== 'radio' && <br/>}
            <input name={props.name}
                   type={inputType}
                   id={htmlFor}
                   value={props.value}
                   onChange={props.onChange}
                   className={props.type !== 'radio' ? 'form-control mr-3': 'mr-3'}/>
            {props.type === 'radio' && <label className='mr-3' htmlFor={htmlFor}>{props.label}</label>}


            {
                isInvalid(props)
                    ? <span>{props.errorMessage || 'Enter true value'}</span>
                    : null
            }
        </div>
    )
}

export default Input
