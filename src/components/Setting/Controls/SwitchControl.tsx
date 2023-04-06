import { Box, Flex, Switch, Text } from "@chakra-ui/react";
import { ControlProps } from "../../../types";

export function SwitchControl<T>({
  label,
  name,
  value,
  onChange,
}: ControlProps<T>) {
  return (
    <Flex pos="relative" mb="4" minH="7">
      <Box minW="44" h="7">
        <Text color="#312e2b" fontWeight="400" fontSize="sm">
          {label}
        </Text>
      </Box>
      <Box h="6" ml="auto">
        <Switch
          name={name as string}
          size="lg"
          colorScheme="green"
          value={value}
          isChecked={value === 1}
          onChange={(e) => onChange(name, +e.target.checked)}
        />
      </Box>
    </Flex>
  );
}
