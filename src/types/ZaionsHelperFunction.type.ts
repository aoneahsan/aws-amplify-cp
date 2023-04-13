export type ZCapDialogPropsType = {
  title?: string;
  message?: string;
  type?: 'alert' | 'confirm' | 'prompt';
  buttonTitle?: string;
  okButtonTitle?: string;
  cancelButtonTitle?: string;
  inputText?: string;
  inputPlaceholder?: string;
};
