import { ReactElement, useContext, useEffect } from 'react';
import { ThemeContext } from '../../providers/theme/theme.context.ts';
import Toggle from '../ui/toggle/toggle.tsx';

function ThemeToggle(): ReactElement {
  const { isSwitched, setIsSwitched } = useContext(ThemeContext);

  useEffect(() => {
    document.documentElement.setAttribute(
      'data-theme',
      isSwitched ? 'light' : ''
    );
  }, [isSwitched]);

  return (
    <Toggle
      option1={'Dark'}
      option2={'Light'}
      onToggle={setIsSwitched}
      initState={isSwitched}
    />
  );
}

export default ThemeToggle;
