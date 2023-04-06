import { Box, Flex, Select, Text } from "@chakra-ui/react";
import { ControlSelectProps } from "../../../types";

export function SelectControl<T>({
  name,
  label,
  value,
  options,
  onChange,
}: ControlSelectProps<T>) {
  return (
    <Flex pos="relative" mb="4" minH="7">
      <Box minW="44" h="7">
        <Text color="#312e2b" fontWeight="400" fontSize="sm">
          {label}
        </Text>
      </Box>
      <Select
        name={name as string}
        pos="relative"
        w="full"
        h="7"
        borderRadius="sm"
        border="1px solid #dbd9d7"
        fontSize="sm"
        lineHeight="shorter"
        sx={{ _focus: { borderColor: "#bdbcb8" } }}
        iconColor="#a7a6a2"
        value={value}
        onChange={(e) => onChange(name, e.target.value)}
      >
        {options?.map((item, idx) => (
          <option key={idx} value={item.value}>
            {item.label}
          </option>
        ))}
      </Select>
    </Flex>
  );
}
