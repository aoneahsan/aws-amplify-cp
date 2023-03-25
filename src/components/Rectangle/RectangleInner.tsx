import { Box } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { editPropertiesRStateSelectorFamily } from '../../EditProperties';
import { getBorderColor } from '../../util';
import { rectangleImageSizeRStateSelector, RetangleElement } from './Rectangle';

export const RectangleInner = ({
  selected,
  elementData,
  elementId,
}: {
  selected: boolean;
  elementData: RetangleElement;
  elementId: string;
}) => {
  const setSize = useSetRecoilState(editPropertiesRStateSelectorFamily({ propertyPath: 'style.size', elementId }));
  const imageSize = useRecoilValue(rectangleImageSizeRStateSelector(elementData.image?.src));

  useEffect(() => {
    if (imageSize) {
      setSize(imageSize);
    }

    // eslint-disable-next-line
  }, [imageSize]);

  return (
    <Box
      position='absolute'
      border={`1px solid ${getBorderColor(selected)}`}
      transition='0.1s border-color ease-in-out'
      width='100%'
      height='100%'
      display='flex'
      padding='2px'
    >
      <Box
        flex='1'
        border='3px dashed #101010'
        borderRadius='255px 15px 225px 15px/15px 225px 15px 255px'
        backgroundColor='white'
        backgroundImage={`url('${elementData.image?.src}')`}
        backgroundSize='100% 100%'
        objectFit={'cover'}
      />
    </Box>
  );
};
