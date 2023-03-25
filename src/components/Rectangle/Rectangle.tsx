import { atom, atomFamily, useRecoilState } from 'recoil';
import { Drag } from '../Drag';
import { RectangleContainer } from './RectangleContainer';
import { RectangleInner } from './RectangleInner';

export type ElementStyle = {
  position: { top: number; left: number };
  size: { width: number; height: number };
};

export type Element = { style: ElementStyle };

export const selectedElementIdRStateAtom = atom<number | null>({
  key: 'selectedElementIdRStateAtom_key',
  default: null,
});

export const elementDataRStateAtomFamily = atomFamily<Element, number>({
  key: 'elementDataRStateAtomFamily_key',
  default: {
    style: {
      position: {
        left: 100,
        top: 50,
      },
      size: {
        width: 100,
        height: 100,
      },
    },
  },
});

export const Rectangle = ({ id }: { id: number }) => {
  const [selectedElementId, setSelectedElementId] = useRecoilState(selectedElementIdRStateAtom);
  const [elementData, setElementData] = useRecoilState(elementDataRStateAtomFamily(id));

  return (
    <Drag
      position={elementData.style.position}
      onDrag={(position) => {
        setElementData((el) => ({
          ...el,
          style: {
            ...el.style,
            position,
          },
        }));
      }}
    >
      <div>
        <RectangleContainer
          position={elementData.style.position}
          size={elementData.style.size}
          onSelect={() => {
            setSelectedElementId(id);
          }}
        >
          <RectangleInner selected={id === selectedElementId} />
        </RectangleContainer>
      </div>
    </Drag>
  );
};
