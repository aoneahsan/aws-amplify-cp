import { Container, Heading, Text } from '@chakra-ui/layout';
import { Select } from '@chakra-ui/select';
import { Suspense } from 'react';
import { atom, selector, useRecoilState, useRecoilValue } from 'recoil';

const userIdState = atom<number | undefined>({
  key: 'userId',
  default: undefined,
});

const userDataSelector = selector({
  key: 'userDataSelector_key',
  get: async ({ get }) => {
    const userId = get(userIdState);
    console.log({ userId });
    if (userId) {
      const data = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`).then((res) => res.json());
      return data;
    }
  },
});

const UserDataComponent = () => {
  const userData = useRecoilValue(userDataSelector);
  return (
    <>
      {userData && (
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
      )}
    </>
  );
};

export const Async = () => {
  const [userId, setUserId] = useRecoilState(userIdState);

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
        <Suspense fallback={<>Loading User Data...</>}>
          <UserDataComponent />
        </Suspense>
      )}
    </Container>
  );
};
