'use client';

import React from 'react';
import { textAssets } from '@/shared';
import { ListItem } from './UI';

export const LibraryListOnline = ({}) => {
  return (
    <ul className="flex flex-col gap-3">
      {textAssets.map(article => (
        <ListItem
          key={article.id}
          {...article}
        />
      ))}
    </ul>
  );
};
