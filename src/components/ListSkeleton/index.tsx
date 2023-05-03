import { Center, Skeleton, VStack } from "native-base";

export function ListSkeleton() {
  return (
    <Center w="100%">
      <VStack w="100%" maxW="400" px="5" space={4} overflow="hidden">
        <Skeleton rounded="md" height="60" />
        <Skeleton rounded="md" height="60" />
        <Skeleton rounded="md" height="60" />
        <Skeleton rounded="md" height="60" />
        <Skeleton rounded="md" height="60" />
      </VStack>
    </Center>
  );
}
