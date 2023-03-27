import { Container, Heading, Text } from '@chakra-ui/layout';
import { Button } from '@chakra-ui/react';
import { Select } from '@chakra-ui/select';
import { Suspense } from 'react';
import { FallbackProps } from 'react-error-boundary';
import { atom, selector, useRecoilState, useRecoilValue } from 'recoil';
import { getWeather } from '../../fakeApi';

type UserDataType = {
  name: string;
  phone: string;
  address: {
    city: string;
    zipcode: string;
  };
};

const userIdAtom = atom<number | undefined>({
  key: 'userIdAtom_key',
  default: undefined,
});

const userDataSelector = selector<UserDataType | undefined>({
  key: 'userDataSelector_key',
  get: async ({ get }) => {
    const userId = get(userIdAtom);
    if (userId === 4) {
      throw new Error('User is Invalid (this error is thrown for development reason).');
    } else if (userId) {
      const data = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`).then((res) => res.json());
      return data;
    }
  },
});

const userCityWeatherSelector = selector<number | undefined>({
  key: 'userCityWeatherSelector_key',
  get: async ({ get }) => {
    const userData = get(userDataSelector);
    if (userData) {
      const weatherInfo = await getWeather(userData.address.zipcode);
      return weatherInfo;
    }
  },
});

const UserCityWeatherComp = () => {
  const cityWeather = useRecoilValue(userCityWeatherSelector);
  if (!cityWeather) return null;

  return (
    <Text>
      Phone: <b>{cityWeather} degree centigrade</b>
    </Text>
  );
};

const UserDataComponent = () => {
  const userData = useRecoilValue(userDataSelector);
  if (!userData) return null;

  return (
    <>
      <div>
        <Heading as='h2' size='md' mb={1}>
          User data:
        </Heading>
        <Text>
          Name: <b>{userData.name}</b>
        </Text>
        <Text>
          Phone: <b>{userData.phone}</b>
        </Text>
        <Suspense fallback={<>Fetching User City Weather Info...</>}>
          <UserCityWeatherComp />
        </Suspense>
      </div>
    </>
  );
};

export const ErrorBoundaryFallbackComponent = ({ error, resetErrorBoundary }: FallbackProps) => {
  return (
    <>
      <h1>Something went wrong</h1>
      <p>{error}</p>
      <Button onClick={resetErrorBoundary}>Okay</Button>
    </>
  );
};

export const Async = () => {
  const [userId, setUserId] = useRecoilState(userIdAtom);

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
        {/* <option value='4'>User 4</option> */}
      </Select>
      {userId !== undefined && (
        <Suspense fallback={<>Loading User Data...</>}>
          {/* <ErrorBoundary
            FallbackComponent={ErrorBoundaryFallbackComponent}
            resetKeys={[userId]}
            onReset={() => {
              setUserId(undefined);
            }}
          > */}
          <UserDataComponent />
          {/* </ErrorBoundary> */}
        </Suspense>
      )}
    </Container>
  );
};
