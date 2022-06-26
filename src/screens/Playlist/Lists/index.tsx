import { tracks } from '../../../../data';
import React from 'react';
import ListItem from './ListItem';

export const Lists = () => {
  return <ListItem data={tracks} />;
};
