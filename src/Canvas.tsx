import { createContext } from 'react';
import { atom, useRecoilValue, useSetRecoilState } from 'recoil';
import { RetangleElement, Rectangle, selectedElementIdRStateAtom } from './components/Rectangle/Rectangle';
import { PageContainer } from './PageContainer';
import { Toolbar } from './Toolbar';

type ElementsContextType = {
  elements: RetangleElement[];
  addElement: () => void;
  setElement: SetElement;
};

export const ElementsContext = createContext<ElementsContextType>({
  elements: [],
  addElement: () => {},
  setElement: () => {},
});

export type SetElement = (indexToSet: number, newElement: RetangleElement) => void;

export const elementsRStateAtom = atom<string[]>({
  key: 'elementsRStateAtom_key',
  default: [],
});

function Canvas() {
  const elements = useRecoilValue(elementsRStateAtom);
  const setSelectedElementId = useSetRecoilState(selectedElementIdRStateAtom);

  return (
    <PageContainer
      onClick={() => {
        setSelectedElementId(null);
      }}
    >
      <Toolbar />
      {elements.map((elId) => (
        <Rectangle key={elId} id={elId} />
      ))}
    </PageContainer>
  );
}

export default Canvas;
