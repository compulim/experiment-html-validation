import { ChangeEventHandler, FormEventHandler, Fragment, useCallback, useState } from 'react';
import useShowAlert from './providers/useShowAlert';

const App = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const [value, setValue] = useState('');
  const showAlert = useShowAlert();

  const handleSubmit = useCallback<FormEventHandler<HTMLFormElement>>(
    event => {
      event.preventDefault();

      const formElement = event.target as HTMLFormElement;
      const isValid = formElement.checkValidity();

      console.log('form.checkValidity()', isValid);

      if (isValid) {
        console.log('form.onSubmit');
        showAlert('');

        return formElement.reset();
      }

      // // TODO: On every "onSubmit", we should clear and renarrate.
      // //       Then, on every click, the end-user will hear "cannot submit". Rather than the first click.
      // setErrorMessage(isValid ? '' : 'Cannot submit');
      showAlert('Sorry, I cannot submit this form.');
    },
    [setErrorMessage]
  );

  const handleTextBoxChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
    ({ target, target: { value } }) => {
      const errorMessage = +value ? '' : 'Give me number.';

      target.setCustomValidity(errorMessage);
      setErrorMessage('');

      setValue(value);
    },
    [setErrorMessage, setValue]
  );

  const handleTextBoxInvalid = useCallback<FormEventHandler<HTMLInputElement>>(event => {
    const inputElement = event.target as HTMLInputElement;

    console.log('input[type="text"].onInvalid', inputElement.validationMessage, inputElement.validity);
  }, []);

  return (
    <Fragment>
      <h1>Hello, World!</h1>
      <form aria-errormessage="error-message" aria-invalid={!!errorMessage} noValidate={true} onSubmit={handleSubmit}>
        <input
          autoFocus={true}
          onChange={handleTextBoxChange}
          onInvalid={handleTextBoxInvalid}
          placeholder="Type a number"
          required={true}
          type="text"
          value={value}
        />
        <input name="abc" type="hidden" />
        <input type="submit" value="Send" />
        {/* WORKING: <div aria-live="assertive" aria-relevant="all"> */}
        {/* Edge + Narrator: "aria-relevant" must be at least "additions removals".
                             If "text" is present, will narrate "group" which is not desirable.
                             "group" is not suppressable by "aria-labelledby" or "aria-roledescription" */}
        {/* WORKING: <div role="alert">{errorMessage}</div> */}
      </form>
    </Fragment>
  );
};

export default App;
