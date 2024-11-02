import type { ComponentProps } from 'react'

import { Checkbox } from '~/components/ui/checkbox'
import { fieldController, FieldInfo, FieldLabel, Form, Submit } from '~/components/ui/form'
import { createFormBuilderFactory } from '~/components/ui/form-builder'
import { Input } from '~/components/ui/input'
import { InputPassword } from '~/components/ui/input-password'
import { cx } from '~/libs/utils'
import type { CheckboxProps } from '~/components/ui/checkbox'
import type { DeepKeyValueName, FieldLabelProps, FormFieldProps, FormProps, SubmitProps } from '~/components/ui/form'
import type { InputProps } from '~/components/ui/input'

const createFancyFormBuilder = createFormBuilderFactory({
  base: {
    form: FancyForm,
    submit: FancyFormSubmit,
  },
  fields: {
    text: FancyFormTextInput,
    password: FancyFormPasswordInput,
    checkbox: FancyFormCheckbox,
  },
})

type FancyFormFieldBaseProps = {
  label: string
  description: string
  info: string
  disabled?: boolean
}

type FancyFormTextInputProps = FancyFormFieldBaseProps & {
  inputProps?: InputProps
}

function FancyFormTextInput<
  TFormData,
  TName extends DeepKeyValueName<TFormData, any>,
>({ name, form, label, disabled, description, info, inputProps, ...fieldProps }:
  FormFieldProps<TFormData, TName> & FancyFormTextInputProps,
) {
  return (
    <form.Field<TName, any, any>
      {...fieldProps}
      name={name}
      children={(field) => {
        const controller = fieldController.input(form, field)

        return (
          <FancyField>
            <FancyFieldBody>
              <FieldLabel field={field} label={label} />
              <FancyFieldDesc>{description}</FancyFieldDesc>
              <Input
                {...controller}
                {...inputProps}
                disabled={inputProps?.disabled || controller.disabled || disabled}
                className={cx(inputProps?.className)}
              />
            </FancyFieldBody>
            <FancyFieldFooter>
              <FieldInfo field={field} placeholder={info} />
            </FancyFieldFooter>
          </FancyField>
        )
      }}
    />
  )
}

function FancyFormPasswordInput<
  TFormData,
  TName extends DeepKeyValueName<TFormData, any>,
>({ name, form, label, disabled, description, info, inputProps, ...fieldProps }:
  FormFieldProps<TFormData, TName> & FancyFormTextInputProps,
) {
  return (
    <form.Field<TName, any, any>
      {...fieldProps}
      name={name}
      children={(field) => {
        const controller = fieldController.input(form, field)

        return (
          <FancyField>
            <FancyFieldBody>
              <FieldLabel field={field} label={label} />
              <FancyFieldDesc>{description}</FancyFieldDesc>
              <InputPassword
                {...controller}
                {...inputProps}
                disabled={inputProps?.disabled || controller.disabled || disabled}
                className={cx(inputProps?.className)}
              />
            </FancyFieldBody>
            <FancyFieldFooter>
              <FieldInfo field={field} placeholder={info} />
            </FancyFieldFooter>
          </FancyField>
        )
      }}
    />
  )
}

type FancyFormCheckboxProps = FancyFormFieldBaseProps & {
  checkboxProps?: CheckboxProps
}

function FancyFormCheckbox<
  TFormData,
  TName extends DeepKeyValueName<TFormData, any>,
>({ name, form, label, disabled, description, info, checkboxProps, ...fieldProps }:
  FormFieldProps<TFormData, TName> & FancyFormCheckboxProps,
) {
  return (
    <form.Field<TName, any, any>
      {...fieldProps}
      name={name}
      children={(field) => {
        const controller = fieldController.checkbox(form, field)

        return (
          <FancyField>
            <FancyFieldBody>
              <FancyFieldLabel field={field} label={label} />
              <div className='flex flex-row-reverse items-center justify-end gap-3'>
                <FancyFieldDesc>{description}</FancyFieldDesc>
                <Checkbox
                  {...controller}
                  {...checkboxProps}
                  disabled={checkboxProps?.disabled || controller.disabled || disabled}
                  className={cx( checkboxProps?.className)}
                />
              </div>
            </FancyFieldBody>
            <FancyFieldFooter>
              <FieldInfo field={field} placeholder={info} />
            </FancyFieldFooter>
          </FancyField>
        )
      }}
    />
  )
}

function FancyForm({ className, ...props }: FormProps) {
  return (
    <Form className={cx('space-y-6 lg:max-w-lg', className)} {...props} />
  )
}

function FancyFormSubmit({ className, ...props }: SubmitProps) {
  return (
    <Submit className={cx('w-full', className)} {...props} />
  )
}

function FancyField({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div className={cx('rounded-md border', className)} {...props} />
  )
}

function FancyFieldBody({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div className={cx('space-y-4 p-6', className)} {...props} />
  )
}

function FancyFieldLabel({ className, ...props }: FieldLabelProps) {
  return (
    <FieldLabel className={cx('text-xl font-semibold', className)} {...props} />
  )
}

function FancyFieldDesc({ className, ...props }: ComponentProps<'p'>) {
  return (
    <p className={cx('text-sm text-muted-foreground', className)} {...props} />
  )
}

function FancyFieldFooter({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div className={cx('border-t px-6 py-4', className)} {...props} />
  )
}

export { createFancyFormBuilder }
export { FancyFormCheckbox, FancyFormPasswordInput, FancyFormTextInput }
export { FancyField, FancyFieldBody, FancyFieldDesc, FancyFieldFooter, FancyFieldLabel, FancyForm }