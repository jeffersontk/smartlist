import { Center, Skeleton, VStack } from "native-base";

export function ListSkeleton() {
  return (
    <Center w="100%">
      <VStack w="90%" maxW="400" space={4} overflow="hidden">
        <Skeleton rounded="md" />
        <Skeleton rounded="md" />
        <Skeleton rounded="md" />
        <Skeleton rounded="md" />
        <Skeleton rounded="md" />
        <Skeleton rounded="md" />
        <Skeleton rounded="md" />
        <Skeleton rounded="md" />
        <Skeleton rounded="md" />
        <Skeleton rounded="md" />
      </VStack>
    </Center>
  );
}
