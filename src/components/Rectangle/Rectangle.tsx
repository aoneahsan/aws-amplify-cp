import { Suspense } from 'react';
import { atom, atomFamily, selectorFamily, useRecoilState, useSetRecoilState } from 'recoil';
import { editPropertiesRStateSelectorFamily } from '../../EditProperties';
import { getImageDimensions } from '../../util';
import { Drag } from '../Drag';
import { Resize } from '../Resize';
import { RectangleLoading } from './ReactangleLoading';
import { RectangleContainer } from './RectangleContainer';
import { RectangleInner } from './RectangleInner';

export type ElementStyle = {
  position: { top: number; left: number };
  size: { width: number; height: number };
};

export type RetangleElement = { style: ElementStyle; image?: { id: string; src: string } };

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

export const rectangleImageSizeRStateSelector = selectorFamily<
  { width: number; height: number } | null,
  string | undefined
>({
  key: 'rectangleImageSizeRStateSelector_key',
  get: (imageSrc) => async () => {
    if (imageSrc) {
      const imageSize = await getImageDimensions(imageSrc);
      return imageSize;
    } else {
      return null;
    }
  },
});

export const Rectangle = ({ id }: { id: string }) => {
  const [selectedElementId, setSelectedElementId] = useRecoilState(selectedElementIdRStateAtom);
  const [elementData, setElementData] = useRecoilState(elementDataRStateAtomFamily(id));
  const elementIsSelected = id === selectedElementId;
  const setPropertyValue = useSetRecoilState(
    editPropertiesRStateSelectorFamily({ propertyPath: 'style', elementId: id }),
  );

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
          setPropertyValue(style);
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
            <Suspense fallback={<RectangleLoading selected={elementIsSelected} />}>
              <RectangleInner selected={elementIsSelected} elementData={elementData} elementId={id} />
            </Suspense>
          </div>
        </Drag>
      </Resize>
    </RectangleContainer>
  );
};
