import { IonInput } from '@ionic/react';
import classNames from 'classnames';
import { useFormikContext } from 'formik';
import React from 'react';
import { IGenericObject } from '@/types/Generic';

interface IZPasswordFieldProps {
  fieldKey: string;
}

const ZPasswordField: React.FC<IZPasswordFieldProps> = ({ fieldKey }) => {
  const { values, handleChange, handleBlur, errors, touched } =
    useFormikContext<IGenericObject>();

  return (
    <IonInput
      required
      name={fieldKey}
      value={values[fieldKey]}
      aria-label={fieldKey}
      labelPlacement='floating'
      onIonInput={handleChange}
      type='password'
      helperText={`Enter ${fieldKey} here`}
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

export default ZPasswordField;
