import React from 'react';
import Svg, { Path } from 'react-native-svg';

import { IconProps } from './interfaces';

export const Plus: React.FC<IconProps> = ({
  size = 30,
  fill = 'rgb(0, 0, 0)',
}: IconProps) => {
  return (
    <Svg width={size} height={size} fill={fill} viewBox="0 0 512 512">
      <Path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
    </Svg>
  );
};
