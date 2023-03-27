import { Box, Text, VStack } from '@chakra-ui/layout';
import { Skeleton } from '@chakra-ui/skeleton';
import { selector, useRecoilValue } from 'recoil';
import { callApi } from './api';
import { elementDataRStateAtomFamily, selectedElementIdRStateAtom } from './components/Rectangle/Rectangle';

const getImageIdRStateSelector = selector({
  key: 'getImageIdRStateSelector_key',
  get: ({ get }) => {
    const elementId = get(selectedElementIdRStateAtom);
    if (elementId) {
      const element = get(elementDataRStateAtomFamily(elementId));

      return element.image?.id;
    }
  },
});

const getImageInfoRStateSelector = selector({
  key: 'getImageInfoRStateSelector_key',
  get: async ({ get }) => {
    const imageId = get(getImageIdRStateSelector);
    if (imageId) {
      const imageInfo = await callApi('image-details', { queryParams: { seed: imageId } });

      return imageInfo;
    }
  },
});

export const ImageInfo = () => {
  const imageInfo = useRecoilValue(getImageInfoRStateSelector);

  if (!imageInfo) return null;

  return (
    <VStack spacing={2} alignItems='flex-start' width='100%'>
      <Info label='Author' value={imageInfo.author} />
      <Info label='Image URL' value={imageInfo.url} />
    </VStack>
  );
};

export const ImageInfoFallback = () => {
  return (
    <VStack spacing={2} alignItems='flex-start' width='100%'>
      <Info label='Author' />
      <Info label='Image URL' />
    </VStack>
  );
};

export const Info = ({ label, value }: { label: string; value?: string }) => {
  return (
    <Box width='175px'>
      <Text fontSize='14px' fontWeight='500' mb='2px'>
        {label}
      </Text>
      {value === undefined ? <Skeleton width='100%' height='21px' /> : <Text fontSize='14px'>{value}</Text>}
    </Box>
  );
};
