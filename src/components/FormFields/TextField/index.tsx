import { IonInput } from '@ionic/react';
import classNames from 'classnames';
import { useFormikContext } from 'formik';
import React from 'react';
import { IGenericObject } from '@/types/Generic';

interface IZTextFieldProps {
  fieldKey: string;
  required?: boolean;
}

const ZTextField: React.FC<IZTextFieldProps> = ({
  fieldKey,
  required = true,
}) => {
  const { values, handleChange, handleBlur, errors, touched } =
    useFormikContext<IGenericObject>();

  return (
    <IonInput
      required={required}
      name={fieldKey}
      value={values[fieldKey]}
      label={`${fieldKey}${required ? '*' : ''}`}
      aria-label={`${fieldKey}${required ? '*' : ''}`}
      labelPlacement='floating'
      onIonInput={handleChange}
      type='text'
      helperText={`Enter ${fieldKey} here${required ? '*' : ''}`}
      errorText={errors[fieldKey]}
      onIonBlur={handleBlur}
      className={classNames({
        'ion-invalid': errors[fieldKey],
        'ion-valid': !errors[fieldKey],
        'ion-touched': touched[fieldKey],
      })}
      autocorrect={'off'}
      autocapitalize={'off'}
      autocomplete={'off'}
      clearInput
    />
  );
};

export default ZTextField;
