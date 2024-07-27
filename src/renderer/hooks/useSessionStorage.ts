export default function useSessionStorage() {
  const getItem = (key: string) => {
    return sessionStorage.getItem(key);
  };
  const setItem = (key: string, value: string) => {
    return sessionStorage.setItem(key, value);
  };
  return [getItem, setItem];
}
