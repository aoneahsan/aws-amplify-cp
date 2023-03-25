import { Icon, IconButton, VStack } from '@chakra-ui/react';
import { Image, Square } from 'react-feather';
import { useRecoilCallback, useRecoilValue } from 'recoil';
import { elementsRStateAtom } from './Canvas';
import { editPropertiesRStateSelectorFamily } from './EditProperties';
import { getRandomImage } from './util';

export const Toolbar = () => {
  const elements = useRecoilValue(elementsRStateAtom);

  const addNewElement = useRecoilCallback(({ set }) => (type: 'rectangle' | 'image') => {
    // insert a new element
    set(elementsRStateAtom, (oldVal) => [...oldVal, oldVal.length.toString()]);

    // now check if it's a image requested, if yes then update the image property of newly added element
    if (type === 'image') {
      set(editPropertiesRStateSelectorFamily({ propertyPath: 'image', elementId: elements.length.toString() }), {
        ...getRandomImage(),
      });
    }
  });

  return (
    <VStack
      position='absolute'
      top='20px'
      left='20px'
      backgroundColor='white'
      padding={2}
      boxShadow='md'
      borderRadius='md'
      spacing={2}
    >
      <IconButton
        onClick={() => addNewElement('rectangle')}
        aria-label='Add rectangle'
        icon={<Icon style={{ width: 24, height: 24 }} as={Square} />}
      />
      <IconButton
        onClick={() => addNewElement('image')}
        aria-label='Add Image'
        icon={<Icon style={{ width: 24, height: 24 }} as={Image} />}
      />
    </VStack>
  );
};
