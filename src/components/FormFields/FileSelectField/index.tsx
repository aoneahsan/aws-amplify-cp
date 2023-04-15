import { IonButton, IonCol, IonImg, IonNote, IonRow } from '@ionic/react';
import classNames from 'classnames';
import { useFormikContext } from 'formik';
import React, { useCallback } from 'react';
import { IGenericObject } from '@/types/Generic';
import { useZIonErrorAlert } from '@/ZaionsHooks/zIonic-hooks';

interface IZFileSelectFieldProps {
  fieldKey: string;
  accept?: string;
  multiple?: boolean;
  onFileSelect?: (selectedFileUrl: string) => void;
}

const ZFileSelectField: React.FC<IZFileSelectFieldProps> = ({
  fieldKey,
  accept = '*',
  multiple = false,
}) => {
  const { presentZIonErrorAlert } = useZIonErrorAlert();
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const { values, setFieldValue, setFieldTouched, errors, touched } =
    useFormikContext<IGenericObject>();

  const handleOnFileSelect = useCallback((files: FileList) => {
    const _fileReader = new FileReader();

    _fileReader.onload = () => {
      const fileUrl = _fileReader.result?.toString();
      setFieldValue(fieldKey, fileUrl, true);
    };
    _fileReader.readAsDataURL(files[0]);
  }, []);

  const openFileSelectPopup = useCallback(() => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    } else {
      presentZIonErrorAlert();
    }
  }, [fileInputRef.current]);

  return (
    <>
      <input
        type={'file'}
        hidden
        ref={fileInputRef}
        accept={accept}
        autoFocus={false}
        onChange={(event) => {
          if (event.target && event.target.files && event.target.files.length) {
            handleOnFileSelect(event.target.files);
          }
        }}
        onBlur={() => {
          if (!touched[fieldKey]) {
            setFieldTouched(fieldKey, true, true);
          }
        }}
        multiple={multiple}
        name={fieldKey}
      />
      <IonRow>
        <IonCol size='12' className={classNames('flex justify-center')}>
          {values[fieldKey] ? (
            <div
              className={classNames(
                'flex w-full justify-center items-center border-4 box-border border-solid border-gray-400 bg-gray-200 p-4'
              )}
            >
              <IonImg
                onClick={openFileSelectPopup}
                src={values[fieldKey] as string}
                style={{ height: '300px' }}
              />
            </div>
          ) : (
            <IonButton onClick={openFileSelectPopup}>
              Select Profile Image
            </IonButton>
          )}
        </IonCol>
        {touched[fieldKey] && errors[fieldKey] && (
          <IonCol>
            <IonNote color={'danger'}>{errors[fieldKey]}</IonNote>
          </IonCol>
        )}
      </IonRow>
    </>
  );
};

export default ZFileSelectField;
