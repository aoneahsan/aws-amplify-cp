import { IonButton } from '@ionic/react';
import classNames from 'classnames';
import { useFormikContext } from 'formik';
import React from 'react';

interface IZSubmitButtonProps {
  dummyProp_NOT_NEEDED___ADDED_FOR_DEMO?: string;
  buttonText?: string;
}

const ZSubmitButton: React.FC<IZSubmitButtonProps> = ({ buttonText }) => {
  const { submitForm, isSubmitting, isValid } = useFormikContext();
  return (
    <>
      <IonButton
        type='submit'
        expand='block'
        className={classNames('mt-8')}
        onClick={() => {
          void submitForm();
        }}
        disabled={isSubmitting || !isValid}
      >
        {buttonText ?? 'Submit'}
      </IonButton>
    </>
  );
};

export default ZSubmitButton;
