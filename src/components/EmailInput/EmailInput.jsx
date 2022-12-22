import { useState } from 'react';
import { Autocomplete } from '@mantine/core';

const EmailInput = ({ onInputChange, ...rest }) => {
  const [value, setValue] = useState('');

  const data =
    value.trim().length > 0 && !value.includes('@')
      ? [
          'gmail.com',
          'outlook.com',
          'yahoo.com',
          'hotmail.com',
          'yandex.com',
        ].map((provider) => `${value}@${provider}`)
      : [];

  return (
    <Autocomplete
      value={value}
      onChange={(value) => {
        setValue(value);
        onInputChange(value);
      }}
      data={data}
      {...rest}
    />
  );
};

export default EmailInput;
