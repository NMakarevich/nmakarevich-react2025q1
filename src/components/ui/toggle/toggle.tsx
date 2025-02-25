import { ReactNode, useState } from 'react';
import './toggle.scss';

interface Props {
  option1?: ReactNode;
  option2?: ReactNode;
  initState: boolean;
  onToggle: (isSwitched: boolean) => void;
}

function Toggle(props: Props): ReactNode {
  const { option1, option2, onToggle, initState } = props;
  const [isSwitched, setIsSwitched] = useState(initState);

  function selectValue(value: boolean) {
    if (isSwitched !== value) {
      toggle();
    }
  }

  function toggle() {
    onToggle(!isSwitched);
    setIsSwitched(!isSwitched);
  }

  return (
    <div className={'toggle'}>
      <span className={`toggle-variant`} onClick={() => selectValue(false)}>
        {option1 || ''}
      </span>
      <span
        className={`toggle-indicator ${isSwitched ? 'selected' : ''}`}
        onClick={toggle}
      ></span>
      <span className={'toggle-variant'} onClick={() => selectValue(true)}>
        {option2 || ''}
      </span>
    </div>
  );
}

export default Toggle;
