import { Container, Heading, Text } from '@chakra-ui/layout';
import { Select } from '@chakra-ui/select';
import { Suspense, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { selectorFamily, useRecoilValue } from 'recoil';

type UserDataType = {
  name: string;
  phone: string;
};

const userDataSelector = selectorFamily<UserDataType, number>({
  key: 'userDataSelector_key',
  get: (userId) => async () => {
    const data = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`).then((res) => res.json());
    return data;
  },
});

const UserDataComponent = ({ userId }: { userId: number }) => {
  const userData = useRecoilValue(userDataSelector(userId));
  return (
    <>
      <div>
        <Heading as='h2' size='md' mb={1}>
          User data:
        </Heading>
        <Text>
          <b>Name:</b> <b>{userData.name}</b>
        </Text>
        <Text>
          <b>Phone:</b> <b>{userData.phone}</b>
        </Text>
      </div>
    </>
  );
};

export const Async = () => {
  const [userId, setUserId] = useState<number | undefined>();

  return (
    <Container py={10}>
      <Heading as='h1' mb={4}>
        View Profile
      </Heading>
      <Heading as='h2' size='md' mb={1}>
        Choose a user:
      </Heading>
      <Select
        placeholder='Choose a user'
        mb={4}
        value={userId}
        onChange={(event) => {
          const value = event.target.value;
          setUserId(value ? parseInt(value) : undefined);
        }}
      >
        <option value='1'>User 1</option>
        <option value='2'>User 2</option>
        <option value='3'>User 3</option>
      </Select>
      {userId !== undefined && (
        // <ErrorBoundary fallback={}>
        <Suspense fallback={<>Loading User Data...</>}>
          <UserDataComponent userId={userId} />
        </Suspense>
        // </ErrorBoundary>
      )}
    </Container>
  );
};
