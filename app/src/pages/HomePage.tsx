import React from 'react';

import { Alignment, Direction, Stack, Text } from '@kibalabs/ui-react';

export function HomePage(): React.ReactElement {
  return (
    <Stack direction={Direction.Vertical} childAlignment={Alignment.Center} contentAlignment={Alignment.Center} isFullHeight={true} isFullWidth={true}>
      <Text variant='header1'>🦞 Clawk</Text>
      <Text variant='note'>Autonomous prediction market agent</Text>
    </Stack>
  );
}
