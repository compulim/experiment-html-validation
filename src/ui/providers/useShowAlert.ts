import useAlertContext from './private/useAlertContext';

export default function useShowAlert() {
  const { showAlert } = useAlertContext();

  return showAlert;
}
