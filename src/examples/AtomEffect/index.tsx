import { Button } from '@chakra-ui/button';
import { Input } from '@chakra-ui/input';
import { Box, Divider, Heading, VStack } from '@chakra-ui/layout';
import React, { useState } from 'react';
import { atom, AtomEffect, atomFamily, useRecoilCallback, useRecoilState, useRecoilValue } from 'recoil';

type ItemType = {
  label: string;
  checked: boolean;
};

const persistRStateInLocalStorage: AtomEffect<any> = ({ node, onSet, setSelf }) => {
  const storedValue = localStorage.getItem(node.key);
  if (storedValue) {
    setSelf(JSON.parse(storedValue));
  }

  onSet((newValue, oldValue, isReset) => {
    if (isReset) {
      console.log({ oldValue });
      localStorage.removeItem(node.key);
    } else {
      localStorage.setItem(node.key, JSON.stringify(newValue));
    }
  });
};

const idsState = atom<number[]>({
  key: 'ids',
  default: [],
  effects: [persistRStateInLocalStorage],
});

const itemState = atomFamily<ItemType, number>({
  key: 'item',
  default: { label: '', checked: false },
  effects: [persistRStateInLocalStorage],
});

export const AtomEffects = () => {
  const ids = useRecoilValue(idsState);
  const nextId = ids.length;

  const insertItem = useRecoilCallback(({ set }) => (label: string) => {
    set(idsState, [...ids, nextId]);
    set(itemState(nextId), { label, checked: false });
  });

  const resetListWithListItems = useRecoilCallback(({ reset }) => () => {
    if (ids.length) {
      for (let i = 0; i < ids.length; i++) {
        // remove all list items
        reset(itemState(ids[i]));
      }

      // now remove list items ids
      reset(idsState);
    }
  });

  return (
    <Container onClear={resetListWithListItems}>
      {ids.map((id) => (
        <Item key={id} id={id} />
      ))}
      <NewItemInput
        onInsert={(label) => {
          insertItem(label);
        }}
      />
    </Container>
  );
};

const Container: React.FC<{ onClear: () => void }> = ({ children, onClear }) => {
  return (
    <Box display='flex' flexDir='column' alignItems='center' pt={10}>
      <Box width='400px' backgroundColor='yellow.100' p={5} borderRadius='lg'>
        <Heading size='lg' mb={4}>
          Shopping List
        </Heading>
        <VStack spacing={3} divider={<Divider borderColor='rgba(86, 0, 0, 0.48)' />}>
          {children}
        </VStack>
      </Box>
      <Button variant='link' mt={3} onClick={onClear}>
        Clear list
      </Button>
    </Box>
  );
};

type ItemProps = {
  id: number;
};

const Item = ({ id }: ItemProps) => {
  const [item, setItem] = useRecoilState(itemState(id));

  return (
    <Box
      rounded='md'
      textDecoration={item.checked ? 'line-through' : ''}
      opacity={item.checked ? 0.5 : 1}
      _hover={{ textDecoration: 'line-through' }}
      cursor='pointer'
      width='100%'
      onClick={() => setItem({ ...item, checked: !item.checked })}
    >
      {item.label}
    </Box>
  );
};

const NewItemInput = ({ onInsert }: { onInsert: (label: string) => void }) => {
  const [value, setValue] = useState('');

  return (
    <Input
      value={value}
      placeholder='New item'
      padding={0}
      height='auto'
      border='none'
      _focus={{ border: 'none' }}
      _placeholder={{ color: 'rgba(86, 0, 0, 0.48)' }}
      onChange={(e) => {
        setValue(e.currentTarget.value);
      }}
      onKeyPress={({ key }) => {
        if (key === 'Enter') {
          onInsert(value);
          setValue('');
        }
      }}
    />
  );
};
