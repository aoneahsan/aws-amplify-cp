import {atom, useRecoilState, useRecoilValue} from 'recoil';

const darkModeRState = atom({
  key: 'darkModeRState_key',
  default: false,
});

const DarkModeSwitch = () => {
  const [darkMode, setDarkMode] = useRecoilState(darkModeRState);
  return (
    <>
      <input
        type="checkbox"
        checked={darkMode}
        onChange={(event) => {
          setDarkMode(event.target.checked);
        }}
      />
    </>
  );
};

const UIBUtton = () => {
  const darkMode = useRecoilValue(darkModeRState);

  return (
    <>
      <button
        style={{
          width: '300px',
          height: '100px',
          backgroundColor: darkMode ? 'black' : 'wheat',
          color: darkMode ? 'white' : 'black',
          fontWeight: 'bold',
        }}
      >
        My UI Button
      </button>
    </>
  );
};

export const Atoms = () => {
  return (
    <>
      <h1>Atoms Example!</h1>
      <br />
      <DarkModeSwitch />
      <br />
      <UIBUtton />
    </>
  );
};
