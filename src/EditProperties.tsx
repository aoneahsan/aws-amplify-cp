import { InputGroup, InputRightElement, NumberInput, NumberInputField, Text, VStack } from '@chakra-ui/react';
import { selector, selectorFamily, useRecoilState, useRecoilValue } from 'recoil';
import { elementDataRStateAtomFamily, selectedElementIdRStateAtom } from './components/Rectangle/Rectangle';
import getLodash from 'lodash/get';
import setLodash from 'lodash/set';
import produce from 'immer';
import { ImageInfo, ImageInfoFallback } from './ImageInfo';
import { Suspense } from 'react';

export const editPropertiesRStateSelectorFamily = selectorFamily<any, { propertyPath: string; elementId: string }>({
  key: 'editPropertiesRStateSelectorFamily_key',
  get:
    ({ propertyPath, elementId }) =>
    ({ get }) => {
      if (elementId) {
        const elementData = get(elementDataRStateAtomFamily(elementId));

        if (elementData) {
          return getLodash(elementData, propertyPath);
        }
      }
    },
  set:
    ({ propertyPath, elementId }) =>
    ({ set, get }, updatedPropertyValue) => {
      if (elementId) {
        const elementData = get(elementDataRStateAtomFamily(elementId));
        if (elementData) {
          const updatedElementStyles = produce(elementData, (draft) => {
            setLodash(draft, propertyPath, updatedPropertyValue);
          });
          set(elementDataRStateAtomFamily(elementId), updatedElementStyles);
        }
      }
    },
});

export const getImageAspectRatioRStateSelector = selector({
  key: 'getImageAspectRatioRStateSelector_key',
  get: ({ get }) => {
    const;
  },
});

export const editSizePropertyRStateSelectorFamily = selectorFamily<
  any,
  { dimension: 'width' | 'height'; elementId: string }
>({
  key: 'editSizePropertyRStateSelectorFamily_key',
  get:
    ({ dimension, elementId }) =>
    ({ get }) => {
      return get(editPropertiesRStateSelectorFamily({ elementId, propertyPath: `style.size.${dimension}` }));
    },
  set:
    ({ dimension, elementId }) =>
    ({ set, get }, updatedPropertyValue) => {
      const hasImage = get(hasImageRStateSelector) !== undefined;

      if (hasImage) {
        const size = editPropertiesRStateSelectorFamily({ elementId, propertyPath: 'style.size' });
        let { width, height } = get(size);
        width = isNaN(width) ? 100 : width < 100 ? 100 : width;
        height = isNaN(height) ? 100 : height < 100 ? 100 : height;
        updatedPropertyValue = isNaN(updatedPropertyValue)
          ? 100
          : updatedPropertyValue < 100
          ? 100
          : updatedPropertyValue;

        const aspectRatio = width / height;

        if (dimension === 'width') {
          set(editPropertiesRStateSelectorFamily({ elementId, propertyPath: 'style.size' }), {
            width: updatedPropertyValue,
            height: Math.round(updatedPropertyValue / aspectRatio),
          });
        } else {
          set(editPropertiesRStateSelectorFamily({ elementId, propertyPath: 'style.size' }), {
            height: updatedPropertyValue,
            width: Math.round(updatedPropertyValue * aspectRatio),
          });
        }
      } else {
        set(
          editPropertiesRStateSelectorFamily({ elementId, propertyPath: `style.size.${dimension}` }),
          updatedPropertyValue,
        );
      }
    },
});

const hasImageRStateSelector = selector({
  key: 'hasImageRStateSelector_key',
  get: ({ get }) => {
    const elementId = get(selectedElementIdRStateAtom);
    if (elementId) {
      const element = get(elementDataRStateAtomFamily(elementId));

      if (element) {
        return element.image !== undefined;
      }
    }
  },
});

export const EditProperties = () => {
  const selectedElementId = useRecoilValue(selectedElementIdRStateAtom);
  const hasImage = useRecoilValue(hasImageRStateSelector);
  if (!selectedElementId) return null;

  return (
    <Card>
      <Section heading='Position'>
        <Property label='Top' propertyPath='style.position.top' elementId={selectedElementId} />
        <Property label='Left' propertyPath='style.position.left' elementId={selectedElementId} />
      </Section>
      <Section heading='Size'>
        <SizeProperty label='Width' dimension='width' elementId={selectedElementId} />
        <SizeProperty label='Height' dimension='height' elementId={selectedElementId} />
      </Section>
      {hasImage && (
        <Section heading='Image'>
          <Suspense fallback={<ImageInfoFallback />}>
            <ImageInfo />
          </Suspense>
        </Section>
      )}
    </Card>
  );
};

const Section: React.FC<{ heading: string }> = ({ heading, children }) => {
  return (
    <VStack spacing={2} align='flex-start'>
      <Text fontWeight='500'>{heading}</Text>
      {children}
    </VStack>
  );
};

const Property = ({ label, propertyPath, elementId }: { label: string; propertyPath: string; elementId: string }) => {
  const [propertyValue, setPropertyValue] = useRecoilState(
    editPropertiesRStateSelectorFamily({ propertyPath, elementId }),
  );
  return <PropertyInput label={label} value={propertyValue} onChange={(val) => setPropertyValue(val)} />;
};

const SizeProperty = ({
  label,
  dimension,
  elementId,
}: {
  label: string;
  dimension: 'width' | 'height';
  elementId: string;
}) => {
  const [propertyValue, setPropertyValue] = useRecoilState(
    editSizePropertyRStateSelectorFamily({ dimension, elementId }),
  );
  return <PropertyInput label={label} value={propertyValue} onChange={(val) => setPropertyValue(val)} />;
};

const PropertyInput = ({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (val: number) => void;
}) => {
  return (
    <div>
      <Text fontSize='14px' fontWeight='500' mb='2px'>
        {label}
      </Text>
      <InputGroup size='sm' variant='filled'>
        <NumberInput value={value} onChange={(_, value) => onChange(value)}>
          <NumberInputField borderRadius='md' />
          <InputRightElement pointerEvents='none' children='px' lineHeight='1' fontSize='12px' />
        </NumberInput>
      </InputGroup>
    </div>
  );
};

const Card: React.FC = ({ children }) => (
  <VStack
    position='absolute'
    top='20px'
    right='20px'
    backgroundColor='white'
    padding={2}
    boxShadow='md'
    borderRadius='md'
    spacing={3}
    align='flex-start'
    onClick={(e) => e.stopPropagation()}
  >
    {children}
  </VStack>
);
