import { atom, atomFamily, useRecoilState, useSetRecoilState } from 'recoil';
import { selectedElementPropertiesRStateSelector } from '../../EditProperties';
import { Drag } from '../Drag';
import { Resize } from '../Resize';
import { RectangleContainer } from './RectangleContainer';
import { RectangleInner } from './RectangleInner';

export type ElementStyle = {
  position: { top: number; left: number };
  size: { width: number; height: number };
};

export type RetangleElement = { style: ElementStyle };

export const selectedElementIdRStateAtom = atom<string | null>({
  key: 'selectedElementIdRStateAtom_key',
  default: null,
});

export const elementDataRStateAtomFamily = atomFamily<RetangleElement, string>({
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

export const Rectangle = ({ id }: { id: string }) => {
  const [selectedElementId, setSelectedElementId] = useRecoilState(selectedElementIdRStateAtom);
  const [elementData, setElementData] = useRecoilState(elementDataRStateAtomFamily(id));
  const elementIsSelected = id === selectedElementId;
  const setSelectedElementProperties = useSetRecoilState(selectedElementPropertiesRStateSelector);

  return (
    <RectangleContainer
      position={elementData.style.position}
      size={elementData.style.size}
      onSelect={() => {
        setSelectedElementId(id);
      }}
    >
      <Resize
        selected={elementIsSelected}
        onResize={(style) => {
          setSelectedElementProperties({
            style: style,
          });
        }}
        position={elementData.style.position}
        size={elementData.style.size}
      >
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
            <RectangleInner selected={elementIsSelected} />
          </div>
        </Drag>
      </Resize>
    </RectangleContainer>
  );
};
