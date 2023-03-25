import { Icon, IconButton, VStack } from '@chakra-ui/react';
import { Square } from 'react-feather';
import { useSetRecoilState } from 'recoil';
import { elementsRStateAtom } from './Canvas';

export const Toolbar = () => {
  const setElements = useSetRecoilState(elementsRStateAtom);

  const addNewElement = () => {
    setElements((elements) => [...elements, elements.length.toString()]);
  };

  return (
    <VStack
      position="absolute"
      top="20px"
      left="20px"
      backgroundColor="white"
      padding={2}
      boxShadow="md"
      borderRadius="md"
      spacing={2}
    >
      <IconButton
        onClick={addNewElement}
        aria-label="Add rectangle"
        icon={<Icon style={{ width: 24, height: 24 }} as={Square} />}
      />
    </VStack>
  );
};
