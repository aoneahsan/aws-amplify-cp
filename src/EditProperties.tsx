import { InputGroup, InputRightElement, NumberInput, NumberInputField, Text, VStack } from '@chakra-ui/react';
import { selectorFamily, useRecoilState, useRecoilValue } from 'recoil';
import { elementDataRStateAtomFamily, selectedElementIdRStateAtom } from './components/Rectangle/Rectangle';
import getLodash from 'lodash/get';
import setLodash from 'lodash/set';
import produce from 'immer';

export const editPropertiesRStateSelectorFamily = selectorFamily<any, string>({
  key: 'editPropertiesRStateSelectorFamily_key',
  get:
    (propertyPath) =>
    ({ get }) => {
      const selectedElementId = get(selectedElementIdRStateAtom);
      if (selectedElementId) {
        const elementData = get(elementDataRStateAtomFamily(selectedElementId));

        if (elementData) {
          return getLodash(elementData, propertyPath);
        }
      }
    },
  set:
    (propertyPath) =>
    ({ set, get }, updatedPropertyValue) => {
      const selectedElementId = get(selectedElementIdRStateAtom);
      if (selectedElementId) {
        const elementData = get(elementDataRStateAtomFamily(selectedElementId));
        if (elementData) {
          const updatedElementStyles = produce(elementData, (draft) => {
            setLodash(draft, propertyPath, updatedPropertyValue);
          });
          set(elementDataRStateAtomFamily(selectedElementId), updatedElementStyles);
        }
      }
    },
});

export const EditProperties = () => {
  const selectedElementId = useRecoilValue(selectedElementIdRStateAtom);
  if (!selectedElementId) return null;

  return (
    <Card>
      <Section heading='Position'>
        <Property label='Top' path='style.position.top' />
        <Property label='Left' path='style.position.left' />
      </Section>
      <Section heading='Size'>
        <Property label='Width' path='style.size.width' />
        <Property label='Height' path='style.size.height' />
      </Section>
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

const Property = ({ label, path }: { label: string; path: string }) => {
  const [propertyValue, setPropertyValue] = useRecoilState(editPropertiesRStateSelectorFamily(path));
  return (
    <div>
      <Text fontSize='14px' fontWeight='500' mb='2px'>
        {label}
      </Text>
      <InputGroup size='sm' variant='filled'>
        <NumberInput value={propertyValue} onChange={(_, value) => setPropertyValue(value)}>
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
